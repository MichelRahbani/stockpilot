"use strict";
/*
 * One consistent price per stock.
 *
 * The problem this fixes: the quote feed merges two providers. Yahoo's price is the
 * last REGULAR-session price (the close, after hours). Finnhub's price is the latest
 * trade, INCLUDING pre-market and after-hours trades. Finnhub's free tier rate-limits
 * fast, so for any one stock the price flipped between "yesterday's close" and
 * "live extended-hours price" from one request to the next. A game could fill a buy
 * at the close and a sell at the live price (a free profit on gaps like OLOX).
 *
 * Rules for US stocks:
 *   - regular session ......... newest wins (Finnhub, else Yahoo), as before.
 *   - pre-market / after-hours / closed:
 *        live price = Finnhub's latest trade when we have it;
 *        else the last live price we saw in the past 10 minutes;
 *        else Yahoo's close, flagged  stockPilotPriceStale  IF Finnhub has worked for this
 *        stock before (so a flip is possible). If Finnhub has never answered for it,
 *        Yahoo is the only source and is consistent, so it is not flagged.
 * Everything that is not a plain US stock is merged exactly as before.
 */
const REMEMBER_MS = 10 * 60 * 1000;
const LONG_CACHE_MS = 12 * 60 * 60 * 1000;
const CLASS_SHARES = new Set(["BRK.B", "BF.B", "BRK-B", "BF-B"]);

const ET = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" });

// 'pre' 4:00-9:30, 'regular' 9:30-16:00, 'post' 16:00-20:00, else 'closed' (US Eastern, weekdays).
const usSessionPhase = (nowMs) => {
  const p = Object.fromEntries(ET.formatToParts(new Date(nowMs)).map((x) => [x.type, x.value]));
  if (p.weekday === "Sat" || p.weekday === "Sun") return "closed";
  const m = parseInt(p.hour, 10) * 60 + parseInt(p.minute, 10);
  if (m >= 570 && m < 960) return "regular";
  if (m >= 240 && m < 570) return "pre";
  if (m >= 960 && m < 1200) return "post";
  return "closed";
};

// Plain US tickers only (AAPL, SPY, BATRK) plus the two class shares. Not BP.L, 7203.T, EURUSD=X, BTC-USD.
const isUsEquity = (symbol) => /^[A-Z]{1,5}$/.test(symbol) || CLASS_SHARES.has(symbol);

const validPrice = (q) => !!q && Number.isFinite(q.regularMarketPrice) && q.regularMarketPrice > 0;

// Yahoo's quote with Finnhub's fields laid over it, but never letting a null/undefined overwrite a real value.
const overlay = (symbol, yahoo, finnhub) => {
  const out = { ...(yahoo || { symbol }) };
  if (finnhub) for (const [k, v] of Object.entries(finnhub)) if (v !== null && v !== undefined) out[k] = v;
  return out;
};

const memory = new Map(); // symbol -> { price, at, finnhubSeen }

const settleQuote = (symbol, yahoo, finnhub, nowMs = Date.now(), mem = memory) => {
  const merged = overlay(symbol, yahoo, finnhub);
  if (!isUsEquity(symbol)) return merged;

  const rec = mem.get(symbol) || { price: null, at: 0, finnhubSeen: false };
  const finnhubOk = validPrice(finnhub);
  if (finnhubOk) rec.finnhubSeen = true;

  if (usSessionPhase(nowMs) === "regular") {
    if (validPrice(merged)) { rec.price = merged.regularMarketPrice; rec.at = nowMs; }
    mem.set(symbol, rec);
    return merged;
  }

  // pre-market, after-hours, or closed
  if (finnhubOk) {
    rec.price = finnhub.regularMarketPrice; rec.at = nowMs; mem.set(symbol, rec);
    return { ...merged, stockPilotExtendedHours: true };
  }
  mem.set(symbol, rec);
  if (rec.price && nowMs - rec.at < REMEMBER_MS) return { ...merged, regularMarketPrice: rec.price, stockPilotExtendedHours: true };
  if (rec.finnhubSeen) return { ...merged, stockPilotExtendedHours: true, stockPilotPriceStale: true };
  return merged;
};

// Wrap an async fetcher so successful, non-empty results are kept for 12 hours. Failures are never cached.
const longCached = (fetcher, ttlMs = LONG_CACHE_MS, now = () => Date.now()) => {
  const store = new Map();
  return async (pathName, params = {}) => {
    const key = pathName + "|" + JSON.stringify(params);
    const hit = store.get(key);
    if (hit && now() - hit.at < ttlMs) return hit.value;
    const value = await fetcher(pathName, params);
    if (value) store.set(key, { at: now(), value });
    return value;
  };
};

module.exports = { usSessionPhase, isUsEquity, settleQuote, longCached, overlay, _memory: memory };
