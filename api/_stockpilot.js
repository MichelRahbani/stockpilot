const YAHOO_CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const YAHOO_SEARCH_URL = "https://query2.finance.yahoo.com/v1/finance/search";
const FRED_GRAPH_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv";
const SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const SEC_COMPANY_FACTS_BASE_URL = "https://data.sec.gov/api/xbrl/companyfacts/";

const cache = new Map();
const ttl = () => Number(process.env.CACHE_TTL_MS || 60000);
const secUserAgent = () => process.env.SEC_USER_AGENT || "StockPilot educational app contact@example.com";
const cleanSymbol = (symbol) => String(symbol || "").trim().toUpperCase().replace(/[^A-Z0-9.\-=]/g, "");
const finiteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const cachedFetch = async (url, type = "json") => {
  const key = `${type}:${url}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < ttl()) return cached.value;
  const response = await fetch(url, {
    headers: {
      "user-agent": url.includes("sec.gov") ? secUserAgent() : "StockPilot hosted data gateway",
      accept: type === "json" ? "application/json,text/plain,*/*" : "application/rss+xml,text/xml,text/plain,*/*"
    }
  });
  if (!response.ok) throw new Error(`Provider returned ${response.status}`);
  const value = type === "json" ? await response.json() : await response.text();
  cache.set(key, { time: Date.now(), value });
  return value;
};

const providerStatus = () => ({
  gateway: "online",
  providers: {
    yahooPublic: { configured: true, role: "Quotes, search, and daily price history" },
    secEdgar: { configured: true, role: "Official public company filing facts" },
    fred: { configured: true, role: "Official public macroeconomic series" },
    rssNews: { configured: true, role: "Public finance headlines" },
    finnhub: { configured: Boolean(process.env.FINNHUB_API_KEY), role: "Optional keyed enrichment" }
  },
  updatedAt: new Date().toISOString()
});

const quotes = async (symbolsParam) => {
  const symbols = [...new Set(String(symbolsParam || "").split(",").map(cleanSymbol).filter(Boolean))].slice(0, 80);
  const url = new URL(YAHOO_QUOTE_URL);
  url.searchParams.set("symbols", symbols.join(","));
  const payload = symbols.length ? await cachedFetch(url.toString(), "json") : { quoteResponse: { result: [] } };
  return {
    ...payload,
    stockPilotMeta: { source: "Yahoo Finance public quote endpoint via hosted StockPilot API", symbols, updatedAt: new Date().toISOString() }
  };
};

const history = async ({ symbol, range, interval }) => {
  const clean = cleanSymbol(symbol);
  if (!clean) throw new Error("Missing symbol");
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(clean)}`);
  url.searchParams.set("range", range || "1y");
  url.searchParams.set("interval", interval || "1d");
  try {
    return {
      ...(await cachedFetch(url.toString(), "json")),
      stockPilotMeta: { source: "Yahoo Finance public chart endpoint via hosted StockPilot API", symbol: clean, updatedAt: new Date().toISOString() }
    };
  } catch (error) {
    const key = process.env.FINNHUB_API_KEY;
    if (!key) throw error;
    const now = Math.floor(Date.now() / 1000);
    const from = now - 365 * 86400;
    const finnhubUrl = new URL("https://finnhub.io/api/v1/stock/candle");
    finnhubUrl.searchParams.set("symbol", clean);
    finnhubUrl.searchParams.set("resolution", "D");
    finnhubUrl.searchParams.set("from", String(from));
    finnhubUrl.searchParams.set("to", String(now));
    finnhubUrl.searchParams.set("token", key);
    const payload = await cachedFetch(finnhubUrl.toString(), "json");
    if (!payload || payload.s !== "ok" || !Array.isArray(payload.t)) throw error;
    return {
      chart: {
        result: [{
          meta: { symbol: clean, regularMarketPrice: payload.c[payload.c.length - 1], chartPreviousClose: payload.c[0] },
          timestamp: payload.t,
          indicators: { quote: [{ open: payload.o, high: payload.h, low: payload.l, close: payload.c, volume: payload.v }] }
        }],
        error: null
      },
      stockPilotMeta: { source: "Finnhub stock candle endpoint via hosted StockPilot API", symbol: clean, updatedAt: new Date().toISOString() }
    };
  }
};

const search = async (q) => {
  const query = String(q || "").trim().slice(0, 80);
  const url = new URL(YAHOO_SEARCH_URL);
  url.searchParams.set("q", query);
  url.searchParams.set("quotesCount", "8");
  url.searchParams.set("newsCount", "0");
  return query ? cachedFetch(url.toString(), "json") : { quotes: [] };
};

const FRED_SERIES = {
  FEDFUNDS: { label: "Fed Funds Rate", unit: "%" },
  DGS10: { label: "10-Year Treasury Yield", unit: "%" },
  CPIAUCSL: { label: "CPI Index", unit: "index" },
  UNRATE: { label: "Unemployment Rate", unit: "%" },
  MORTGAGE30US: { label: "30-Year Mortgage Rate", unit: "%" }
};

const parseFredCsv = (csv, id) => {
  const rows = csv.trim().split(/\r?\n/).slice(1).map((line) => {
    const [date, rawValue] = line.split(",");
    const value = Number(rawValue);
    return date && Number.isFinite(value) ? { date, value } : null;
  }).filter(Boolean);
  const latest = rows[rows.length - 1];
  const yearAgo = rows.find((row) => row.date >= new Date(Date.now() - 370 * 86400000).toISOString().slice(0, 10)) || rows[Math.max(0, rows.length - 13)];
  return { id, label: FRED_SERIES[id].label, unit: FRED_SERIES[id].unit, latest, previous: rows[rows.length - 2] || null, yearAgo };
};

const macro = async () => ({
  series: await Promise.all(Object.keys(FRED_SERIES).map(async (id) => {
    const url = new URL(FRED_GRAPH_URL);
    url.searchParams.set("id", id);
    return parseFredCsv(await cachedFetch(url.toString(), "text"), id);
  })),
  stockPilotMeta: { source: "FRED public CSV via hosted StockPilot API", updatedAt: new Date().toISOString() }
});

const latestFact = (facts, tag) => {
  const units = facts?.["us-gaap"]?.[tag]?.units || {};
  const rows = Object.values(units).flat().filter((item) => item?.form && ["10-K", "10-Q"].includes(item.form) && finiteNumber(item.val) !== null && item.end).sort((a, b) => String(a.end).localeCompare(String(b.end)));
  const latest = rows[rows.length - 1];
  return latest ? { value: Number(latest.val), end: latest.end, form: latest.form, filed: latest.filed } : null;
};

const secCompany = async (symbol) => {
  const clean = cleanSymbol(symbol);
  if (!clean) throw new Error("Missing symbol");
  const tickerPayload = await cachedFetch(SEC_TICKERS_URL, "json");
  const map = Object.values(tickerPayload).reduce((memo, item) => {
    if (item?.ticker && item?.cik_str) memo[cleanSymbol(item.ticker)] = { cik: String(item.cik_str).padStart(10, "0"), title: item.title };
    return memo;
  }, {});
  const company = map[clean];
  if (!company) throw new Error(`SEC ticker mapping not found for ${clean}`);
  const payload = await cachedFetch(`${SEC_COMPANY_FACTS_BASE_URL}CIK${company.cik}.json`, "json");
  const facts = {
    revenue: latestFact(payload.facts, "Revenues") || latestFact(payload.facts, "RevenueFromContractWithCustomerExcludingAssessedTax"),
    netIncome: latestFact(payload.facts, "NetIncomeLoss"),
    assets: latestFact(payload.facts, "Assets"),
    liabilities: latestFact(payload.facts, "Liabilities"),
    equity: latestFact(payload.facts, "StockholdersEquity"),
    epsDiluted: latestFact(payload.facts, "EarningsPerShareDiluted"),
    operatingCashFlow: latestFact(payload.facts, "NetCashProvidedByUsedInOperatingActivities")
  };
  const equity = finiteNumber(facts.equity?.value);
  const liabilities = finiteNumber(facts.liabilities?.value);
  const netIncome = finiteNumber(facts.netIncome?.value);
  return {
    symbol: clean,
    cik: company.cik,
    name: company.title,
    facts,
    ratios: { roe: equity && netIncome ? (netIncome / equity) * 100 : null, debtEquity: equity && liabilities ? liabilities / equity : null },
    stockPilotMeta: { source: "SEC EDGAR companyfacts API via hosted StockPilot API", updatedAt: new Date().toISOString() }
  };
};

module.exports = { cachedFetch, providerStatus, quotes, history, search, macro, secCompany };
