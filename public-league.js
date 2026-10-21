"use strict";
/*
 * Public standings (read only), for club websites and the embed page.
 *
 *   GET /api/public/league/<CODE>     Bullpen Fantasy league (also /fantasy/)
 *   GET /api/public/sports/<CODE>     Sports Fantasy league
 *   GET /api/public/showdown/<CODE>   Showdown
 *   GET /api/public/teams/<CODE>      Team competition
 *   GET /api/public/madness/<CODE>    Madness bracket
 *   GET /api/public/crash|puzzle|speedround|streak/top   solo game top 10
 *
 * Every answer has the same shape:
 *   { game, league: { code, name, ... }, columns: { score: "Return" },
 *     standings: [{ rank, name, score, display }],  (Madness also has rounds)
 *     updatedAt, poweredBy }
 *
 * It exposes only names that players chose and their results. No emails, ids,
 * holdings or trades. Fantasy leagues marked "classroom" are never exposed
 * (players can be minors). Numbers use the same math as the game pages.
 * If this file fails to load, server.js carries on without it.
 */
const path = require("path");
const http = require("http");

const SUPABASE_URL = process.env.SUPABASE_URL || "https://xkfxofcmrmpazfjviatq.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q";

// Sports Fantasy uses the exact same scoring file the game page uses.
let FC = null;
try { FC = require(path.join(__dirname, "sports-fantasy-core.js")); } catch (e) { FC = null; }

const CACHE_MS = 20 * 1000;
const RATE_LIMIT = 60;
const cache = new Map();
const hits = new Map();

const json = (res, status, body, extra) => {
  res.writeHead(status, Object.assign({
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=15"
  }, extra || {}));
  res.end(JSON.stringify(body));
};

const tooMany = (ip) => {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.windowStart > 60000) { hits.set(ip, { windowStart: now, count: 1 }); return false; }
  h.count += 1;
  return h.count > RATE_LIMIT;
};

const sb = async (p) => {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${p}`, {
    headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
  });
  if (!r.ok) throw new Error("data source " + r.status);
  return r.json();
};
const enc = encodeURIComponent;
const clean = (s, fallback) => String(s || fallback || "Player").slice(0, 40);
const r2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
const pctText = (n) => (n >= 0 ? "+" : "") + r2(n).toFixed(2) + "%";

class Unavailable extends Error {}

// Live prices from this same server (so the numbers match the game pages).
const livePrices = (port, tickers) => new Promise((resolve, reject) => {
  const list = Array.from(new Set(tickers.filter(Boolean)));
  if (!list.length) return resolve({});
  const out = {};
  let pending = 0, failed = false;
  for (let i = 0; i < list.length; i += 40) {
    const chunk = list.slice(i, i + 40);
    pending += 1;
    const rq = http.get({ host: "127.0.0.1", port, path: "/api/quotes?symbols=" + chunk.map(enc).join(","), timeout: 9000 }, (rs) => {
      let buf = "";
      rs.on("data", (d) => { buf += d; });
      rs.on("end", () => {
        try {
          const d = JSON.parse(buf);
          ((d && d.quoteResponse && d.quoteResponse.result) || []).forEach((q) => {
            if (q && q.symbol && q.regularMarketPrice) out[q.symbol] = q.regularMarketPrice;
          });
        } catch (e) { failed = true; }
        if (--pending === 0) failed ? reject(new Unavailable()) : resolve(out);
      });
    });
    rq.on("timeout", () => { rq.destroy(); });
    rq.on("error", () => { failed = true; if (--pending === 0) reject(new Unavailable()); });
  }
});

// Showdown, Teams and Madness all value a player the same way the pages do:
// cash plus shares times price (negative shares are shorts).
const tickersOf = (rows) => rows.flatMap((r) => Object.keys(r.holdings || {}));
const valueOf = (row, prices) => {
  let v = Number(row.cash) || 0;
  for (const [t, sh] of Object.entries(row.holdings || {})) {
    if (!prices[t]) throw new Unavailable();
    v += (Number(sh) || 0) * prices[t];
  }
  return v;
};
const returnPct = (row, prices) => {
  const start = Number(row.starting_cash) || 0;
  return start ? (valueOf(row, prices) - start) / start * 100 : 0;
};
const ranked = (list) => list.sort((a, b) => b.score - a.score).map((x, i) => Object.assign({ rank: i + 1 }, x));
const notFound = { status: 404, body: { error: "Not found. Check the code." } };

const ADAPTERS = {
  // Bullpen Fantasy (the original league game).
  async league(code) {
    const L = (await sb(`bullpen_leagues?code=eq.${enc(code)}&select=code,name,format,season,current_week,league_type&limit=1`))[0];
    if (!L) return notFound;
    if (String(L.league_type || "").toLowerCase() === "classroom") return { status: 403, body: { error: "This league is not available publicly" } };
    const members = await sb(`bullpen_members?league_code=eq.${enc(code)}&select=name,score&order=score.desc`);
    const standings = ranked((members || []).map((m) => ({ name: clean(m.name), score: r2(m.score), display: r2(m.score).toFixed(2) })));
    return { status: 200, body: { game: "league", league: { code: L.code, name: L.name, format: L.format, season: L.season, week: L.current_week || 1, players: standings.length, sub: "Week " + (L.current_week || 1) }, columns: { score: "Score" }, standings } };
  },

  // Sports Fantasy: same scoring file as the game page.
  async sports(code, ctx) {
    if (!FC) throw new Unavailable();
    const L = (await sb(`sports_fantasy_leagues?code=eq.${enc(code)}&limit=1`))[0];
    if (!L) return notFound;
    if (String(L.league_type || "").toLowerCase() === "classroom" || L.class_id) return { status: 403, body: { error: "This league is not available publicly" } };
    const rosters = await sb(`sports_fantasy_rosters?league_id=eq.${enc(L.id)}&submitted=eq.true`);
    // Exactly what the game page does: FC.loadMarket gathers prices and the S&P 500
    // benchmark from this same server, FC.rank scores every roster.
    const market = rosters.length ? await FC.loadMarket("http://127.0.0.1:" + ctx.port, rosters) : { priceMap: {}, spyNow: null, spyEst: {} };
    // Missing prices would silently distort scores, so refuse instead.
    rosters.forEach((r) => FC.picksOf(r).forEach((t) => { if (!market.priceMap[t]) throw new Unavailable(); }));
    const rank = FC.rank(rosters, L, (r) => FC.ctxFor(market, r));
    const standings = rank.map((x, i) => ({ rank: i + 1, name: clean(x.r.nickname), score: r2(x.s.score), display: (x.s.score >= 0 ? "+" : "") + r2(x.s.score).toFixed(2) }));
    return { status: 200, body: { game: "sports", league: { code: L.code, name: L.name, players: standings.length, sub: standings.length + " player" + (standings.length === 1 ? "" : "s") }, columns: { score: "Score" }, standings } };
  },

  async showdown(code, ctx) {
    const T = (await sb(`bullpen_showdown_tournaments?code=eq.${enc(code)}&limit=1`))[0];
    if (!T) return notFound;
    const entries = await sb(`bullpen_showdown_entries?tournament_id=eq.${enc(T.id)}`);
    const prices = await livePrices(ctx.port, tickersOf(entries));
    const standings = ranked(entries.map((e) => { const p = returnPct(e, prices); return { name: clean(e.nickname), score: r2(p), display: pctText(p) }; }));
    return { status: 200, body: { game: "showdown", league: { code: T.code, name: T.name, status: T.status, ends: T.end_date, players: standings.length, sub: (T.end_date ? "Ends " + T.end_date + " · " : "") + standings.length + " player" + (standings.length === 1 ? "" : "s") }, columns: { score: "Return" }, standings } };
  },

  async teams(code, ctx) {
    const C = (await sb(`bullpen_team_competitions?code=eq.${enc(code)}&limit=1`))[0];
    if (!C) return notFound;
    const teams = await sb(`bullpen_teams?competition_id=eq.${enc(C.id)}`);
    const members = teams.length ? await sb(`bullpen_team_members?team_id=in.(${teams.map((t) => enc(t.id)).join(",")})`) : [];
    const prices = await livePrices(ctx.port, tickersOf(members));
    const by = {};
    members.forEach((m) => { (by[m.team_id] = by[m.team_id] || []).push(m); });
    const standings = ranked(teams.map((t) => {
      const ms = by[t.id] || [];
      const avg = ms.length ? ms.reduce((s, m) => s + returnPct(m, prices), 0) / ms.length : 0;
      return { name: clean(t.name, "Team"), score: r2(avg), display: pctText(avg), members: ms.length };
    }));
    return { status: 200, body: { game: "teams", league: { code: C.code, name: C.name, players: standings.length, sub: "Average return per team · " + standings.length + " team" + (standings.length === 1 ? "" : "s") }, columns: { score: "Avg return" }, standings } };
  },

  async madness(code, ctx) {
    const T = (await sb(`bullpen_madness_tournaments?code=eq.${enc(code)}&limit=1`))[0];
    if (!T) return notFound;
    const entries = await sb(`bullpen_madness_entries?tournament_id=eq.${enc(T.id)}`);
    const tables = await sb(`bullpen_madness_tables?tournament_id=eq.${enc(T.id)}&order=round_number.asc,bracket.asc,table_number.asc`);
    const mem = tables.length ? await sb(`bullpen_madness_table_members?table_id=in.(${tables.map((t) => enc(t.id)).join(",")})`) : [];
    const activeIds = new Set(tables.filter((t) => t.status === "active").map((t) => t.id));
    const live = mem.filter((m) => activeIds.has(m.table_id));
    const prices = live.length ? await livePrices(ctx.port, tickersOf(live)) : {};
    const nameOf = {};
    entries.forEach((e) => { nameOf[e.id] = clean(e.nickname); });
    const byRound = {};
    tables.forEach((t) => {
      const players = mem.filter((m) => m.table_id === t.id).map((m) => {
        const done = t.status === "completed" && m.pct_return != null;
        const pct = done ? Number(m.pct_return) : (activeIds.has(t.id) ? returnPct(m, prices) : null);
        return { name: nameOf[m.entry_id] || "Player", pct: pct == null ? null : r2(pct), display: pct == null ? "" : pctText(pct), placement: m.placement || null, advanced: !!m.advanced };
      }).sort((a, b) => (a.placement || 99) - (b.placement || 99) || (b.pct || 0) - (a.pct || 0));
      (byRound[t.round_number] = byRound[t.round_number] || []).push({
        label: (t.bracket === "grand_final" ? "Grand final" : t.bracket === "losers" ? "Losers bracket" : "Winners bracket") + " · Table " + t.table_number,
        status: t.status, players
      });
    });
    const rounds = Object.keys(byRound).sort((a, b) => a - b).map((n) => ({ round: Number(n), current: Number(n) === T.current_round && T.status === "in_progress", tables: byRound[n] }));
    return { status: 200, body: { game: "madness", league: { code: T.code, name: T.name, status: T.status, round: T.current_round, players: entries.length, sub: (T.status === "in_progress" ? "Round " + T.current_round + " · " : "") + entries.length + " player" + (entries.length === 1 ? "" : "s") }, columns: { score: "Return" }, standings: [], rounds } };
  }
};
ADAPTERS.fantasy = ADAPTERS.league;

// Solo games: the same top 10 the game page itself shows.
const SOLO = {
  crash: { table: "bullpen_crash_scores", field: "final_return", order: "final_return.desc", label: "Return", fmt: (v) => pctText(v) },
  puzzle: { table: "bullpen_puzzle_scores", field: "score", order: "score.desc", label: "Score", fmt: (v) => String(v), today: true, title: "Daily puzzle" },
  speedround: { table: "bullpen_speedround_scores", field: "score", order: "score.desc", label: "Score", fmt: (v) => String(v) },
  streak: { table: "bullpen_streak_scores", field: "best_streak", order: "best_streak.desc", label: "Best streak", fmt: (v) => String(v) }
};
const TITLES = { crash: "Crash", puzzle: "Daily puzzle", speedround: "Speed round", streak: "Streak" };
const solo = async (game) => {
  const s = SOLO[game];
  const today = new Date().toISOString().split("T")[0];
  const rows = await sb(`${s.table}?${s.today ? "puzzle_date=eq." + today + "&" : ""}order=${s.order}&limit=10&select=player_name,${s.field}`);
  const standings = rows.map((r, i) => ({ rank: i + 1, name: clean(r.player_name), score: Number(r[s.field]) || 0, display: s.fmt(Number(r[s.field]) || 0) }));
  return { status: 200, body: { game, league: { code: "TOP10", name: TITLES[game] + " top 10", sub: s.today ? "Today" : "All time", players: standings.length }, columns: { score: s.label }, standings } };
};

// Returns true if it handled the request.
const handle = async (req, res) => {
  const u = new URL(req.url, "http://localhost");
  const m = u.pathname.match(/^\/api\/public\/([a-z]+)\/([A-Za-z0-9]{3,8})\/?$/);
  if (!m) return false;
  const game = m[1];
  const isSolo = SOLO[game] && m[2].toLowerCase() === "top";
  if (!isSolo && !ADAPTERS[game]) return false;
  if (req.method === "OPTIONS") { json(res, 204, {}); return true; }
  if (req.method !== "GET") { json(res, 405, { error: "GET only" }); return true; }

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (tooMany(ip)) { json(res, 429, { error: "Too many requests, try again in a minute" }, { "Retry-After": "60" }); return true; }

  const code = m[2].toUpperCase();
  const key = game + ":" + code;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) { json(res, hit.status, hit.body); return true; }
  try {
    const out = isSolo ? await solo(game) : await ADAPTERS[game](code, { port: req.socket.localPort });
    if (out.status === 200) Object.assign(out.body, { updatedAt: new Date().toISOString(), poweredBy: "StockPilot (mystockspilot.com)" });
    cache.set(key, { at: Date.now(), status: out.status, body: out.body });
    if (cache.size > 500) cache.delete(cache.keys().next().value);
    json(res, out.status, out.body);
  } catch (e) {
    json(res, 502, { error: "Standings are temporarily unavailable" });
  }
  return true;
};

module.exports = { handle };
