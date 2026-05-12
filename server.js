const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const loadEnvFile = () => {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
  });
};

loadEnvFile();

const PORT = Number(process.env.PORT || 8787);
const APP_DIR = __dirname;
const YAHOO_CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const YAHOO_SEARCH_URL = "https://query2.finance.yahoo.com/v1/finance/search";
const FRED_GRAPH_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const SEC_COMPANY_FACTS_BASE_URL = "https://data.sec.gov/api/xbrl/companyfacts/";
const CACHE_TTL_MS = Number(process.env.CACHE_TTL_MS || 60_000);
const FINNHUB_API_KEY = (process.env.FINNHUB_API_KEY || "").replace(/^["']|["']$/g, "");
const SEC_USER_AGENT = process.env.SEC_USER_AGENT || "StockPilot educational app contact@example.com";

const cache = new Map();
const STATIC_MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml; charset=utf-8",
  ".ico": "image/x-icon"
};

const send = (res, status, body, contentType = "application/json") => {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Cache-Control": "no-store",
    "Content-Type": contentType
  });
  res.end(contentType === "application/json" ? JSON.stringify(body) : body);
};

const sendStaticFile = (res, filePath) => {
  const resolved = path.resolve(APP_DIR, filePath);
  if (!resolved.startsWith(APP_DIR)) return send(res, 403, { error: "Forbidden" });
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) return send(res, 404, { error: "File not found" });
  const ext = path.extname(resolved).toLowerCase();
  const contentType = STATIC_MIME_TYPES[ext] || "application/octet-stream";
  res.writeHead(200, {
    "Cache-Control": "no-store",
    "Content-Type": contentType
  });
  fs.createReadStream(resolved).pipe(res);
};

const cleanSymbol = (symbol) => String(symbol || "").trim().toUpperCase().replace(/[^A-Z0-9.\-=]/g, "");
const finiteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const cachedFetch = async (url, type = "json") => {
  const key = `${type}:${url}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_TTL_MS) return cached.value;

  const response = await fetch(url, {
    headers: {
      "User-Agent": url.includes("sec.gov") ? SEC_USER_AGENT : "StockPilot/0.1 educational data gateway",
      "Accept": type === "json" ? "application/json,text/plain,*/*" : "application/rss+xml,text/xml,text/plain,*/*"
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
    yahooPublic: { configured: true, role: "Quotes, search, and daily price history fallback" },
    finnhub: {
      configured: Boolean(FINNHUB_API_KEY),
      role: "Optional keyed real-time quote/profile/metric enrichment kept server-side"
    },
    secEdgar: {
      configured: Boolean(SEC_USER_AGENT),
      role: "Official public company filing facts for supported US issuers"
    },
    fred: { configured: true, role: "Official public macroeconomic series" },
    rssNews: { configured: true, role: "Public finance headlines" }
  },
  updatedAt: new Date().toISOString()
});

const fetchFinnhubJson = async (pathName, params = {}) => {
  if (!FINNHUB_API_KEY) return null;
  const url = new URL(`${FINNHUB_BASE_URL}${pathName}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  url.searchParams.set("token", FINNHUB_API_KEY);
  return cachedFetch(url.toString(), "json");
};

const getFinnhubSnapshot = async (symbol) => {
  if (!FINNHUB_API_KEY) return null;
  const [quoteResult, profileResult, metricResult] = await Promise.allSettled([
    fetchFinnhubJson("/quote", { symbol }),
    fetchFinnhubJson("/stock/profile2", { symbol }),
    fetchFinnhubJson("/stock/metric", { symbol, metric: "all" })
  ]);
  const quote = quoteResult.status === "fulfilled" ? quoteResult.value : {};
  const profile = profileResult.status === "fulfilled" ? profileResult.value : {};
  const metrics = metricResult.status === "fulfilled" ? metricResult.value?.metric || {} : {};
  const price = finiteNumber(quote?.c);
  const previousClose = finiteNumber(quote?.pc);
  const marketCapMillions = finiteNumber(profile?.marketCapitalization);
  if (!price && !profile?.name && !Object.keys(metrics).length) return null;
  return {
    symbol,
    shortName: profile?.name,
    longName: profile?.name,
    sector: profile?.finnhubIndustry,
    quoteType: "EQUITY",
    regularMarketPrice: price,
    regularMarketPreviousClose: previousClose,
    regularMarketChange: finiteNumber(quote?.d),
    regularMarketChangePercent: finiteNumber(quote?.dp),
    regularMarketOpen: finiteNumber(quote?.o),
    regularMarketDayHigh: finiteNumber(quote?.h),
    regularMarketDayLow: finiteNumber(quote?.l),
    regularMarketTime: finiteNumber(quote?.t),
    marketCap: marketCapMillions ? marketCapMillions * 1_000_000 : null,
    trailingPE: finiteNumber(metrics?.peBasicExclExtraTTM) || finiteNumber(metrics?.peNormalizedAnnual) || finiteNumber(metrics?.peTTM),
    forwardPE: finiteNumber(metrics?.forwardPE),
    priceToSalesTrailing12Months: finiteNumber(metrics?.psTTM) || finiteNumber(metrics?.priceToSalesPerShareTTM),
    beta: finiteNumber(metrics?.beta),
    dividendYield: finiteNumber(metrics?.dividendYieldIndicatedAnnual) || finiteNumber(metrics?.dividendYield5Y),
    epsTrailingTwelveMonths: finiteNumber(metrics?.epsBasicExclExtraItemsTTM) || finiteNumber(metrics?.epsNormalizedAnnual),
    stockPilotProvider: "Finnhub"
  };
};

const getFinnhubQuoteMap = async (symbols) => {
  if (!FINNHUB_API_KEY) return {};
  const entries = await Promise.allSettled(symbols.map(async (symbol) => [symbol, await getFinnhubSnapshot(symbol)]));
  return entries.reduce((map, result) => {
    if (result.status === "fulfilled" && result.value?.[1]) map[result.value[0]] = result.value[1];
    return map;
  }, {});
};

const getFinnhubHistoryPayload = async (symbol, range = "1y") => {
  if (!FINNHUB_API_KEY) throw new Error("Finnhub key is not configured");
  const clean = cleanSymbol(symbol);
  const now = Math.floor(Date.now() / 1000);
  const days =
    range === "5y" ? 365 * 5 :
    range === "2y" ? 365 * 2 :
    range === "6mo" ? 183 :
    range === "3mo" ? 92 :
    365;
  const from = now - days * 86400;
  const payload = await fetchFinnhubJson("/stock/candle", {
    symbol: clean,
    resolution: "D",
    from: String(from),
    to: String(now)
  });
  if (!payload || payload.s !== "ok" || !Array.isArray(payload.t) || !payload.t.length) {
    throw new Error(`No Finnhub candle history found for ${clean}`);
  }
  return {
    chart: {
      result: [
        {
          meta: {
            symbol: clean,
            regularMarketPrice: payload.c[payload.c.length - 1],
            chartPreviousClose: payload.c[0]
          },
          timestamp: payload.t,
          indicators: {
            quote: [
              {
                open: payload.o,
                high: payload.h,
                low: payload.l,
                close: payload.c,
                volume: payload.v
              }
            ]
          }
        }
      ],
      error: null
    },
    stockPilotMeta: {
      source: "Finnhub stock candle endpoint",
      symbol: clean,
      range,
      interval: "1d",
      updatedAt: new Date().toISOString(),
      cacheSeconds: Math.round(CACHE_TTL_MS / 1000)
    }
  };
};

const getQuotePayload = async (symbols) => {
  const cleanSymbols = [...new Set(symbols.map(cleanSymbol).filter(Boolean))].slice(0, 80);
  if (!cleanSymbols.length) return { quoteResponse: { result: [] }, stockPilotMeta: { source: "Yahoo Finance public quote endpoint", symbols: [] } };
  const url = new URL(YAHOO_QUOTE_URL);
  url.searchParams.set("symbols", cleanSymbols.join(","));
  const providerErrors = [];
  let payload = { quoteResponse: { result: [] } };
  try {
    payload = await cachedFetch(url.toString(), "json");
  } catch (error) {
    providerErrors.push(`Yahoo quotes: ${error.message}`);
  }
  const quoteMap = (payload?.quoteResponse?.result || []).reduce((map, quote) => {
    map[cleanSymbol(quote.symbol)] = quote;
    return map;
  }, {});
  const finnhubMap = await getFinnhubQuoteMap(cleanSymbols).catch((error) => {
    providerErrors.push(`Finnhub: ${error.message}`);
    return {};
  });
  cleanSymbols.forEach((symbol) => {
    quoteMap[symbol] = { ...(quoteMap[symbol] || { symbol }), ...(finnhubMap[symbol] || {}) };
  });
  const result = cleanSymbols.map((symbol) => quoteMap[symbol]).filter((quote) => quote && Object.keys(quote).length > 1);
  if (!result.length && providerErrors.length) throw new Error(providerErrors.join("; "));
  return {
    ...payload,
    quoteResponse: { ...(payload.quoteResponse || {}), result },
    stockPilotMeta: {
      source: FINNHUB_API_KEY ? "Yahoo Finance public endpoint + Finnhub keyed enrichment" : "Yahoo Finance public quote endpoint",
      symbols: cleanSymbols,
      updatedAt: new Date().toISOString(),
      cacheSeconds: Math.round(CACHE_TTL_MS / 1000),
      providers: {
        yahooPublic: !providerErrors.some((error) => error.startsWith("Yahoo")),
        finnhubConfigured: Boolean(FINNHUB_API_KEY),
        finnhubUsed: Object.keys(finnhubMap).length > 0
      },
      warnings: providerErrors
    }
  };
};

const getHistoryPayload = async (symbol, range = "1y", interval = "1d") => {
  const clean = cleanSymbol(symbol);
  if (!clean) throw new Error("Missing symbol");
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(clean)}`);
  url.searchParams.set("range", range || "1y");
  url.searchParams.set("interval", interval || "1d");
  try {
    const payload = await cachedFetch(url.toString(), "json");
    return {
      ...payload,
      stockPilotMeta: {
        source: "Yahoo Finance public chart endpoint",
        symbol: clean,
        range,
        interval,
        updatedAt: new Date().toISOString(),
        cacheSeconds: Math.round(CACHE_TTL_MS / 1000)
      }
    };
  } catch (error) {
    return getFinnhubHistoryPayload(clean, range);
  }
};

const getSearchPayload = async (query) => {
  const cleanQuery = String(query || "").trim().slice(0, 80);
  if (!cleanQuery) return { quotes: [], stockPilotMeta: { source: "Yahoo Finance public search endpoint" } };
  const url = new URL(YAHOO_SEARCH_URL);
  url.searchParams.set("q", cleanQuery);
  url.searchParams.set("quotesCount", "8");
  url.searchParams.set("newsCount", "0");
  const payload = await cachedFetch(url.toString(), "json");
  return {
    ...payload,
    stockPilotMeta: {
      source: "Yahoo Finance public search endpoint",
      query: cleanQuery,
      updatedAt: new Date().toISOString(),
      cacheSeconds: Math.round(CACHE_TTL_MS / 1000)
    }
  };
};

const getRssText = async (rssUrl) => {
  const parsed = new URL(rssUrl);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported RSS URL");
  return cachedFetch(parsed.toString(), "text");
};

const readPublicUrl = async (publicUrl, type) => {
  const parsed = new URL(publicUrl);
  if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("Unsupported proxy URL");
  const allowedHosts = new Set([
    "query1.finance.yahoo.com",
    "query2.finance.yahoo.com",
    "finance.yahoo.com",
    "www.cnbc.com",
    "feeds.bbci.co.uk",
    "feeds.content.dowjones.io",
    "www.nasdaq.com"
  ]);
  if (!allowedHosts.has(parsed.hostname)) throw new Error("Host is not allowed by StockPilot gateway");
  return cachedFetch(parsed.toString(), type);
};

const FRED_SERIES = {
  FEDFUNDS: { label: "Fed Funds Rate", unit: "%" },
  DGS10: { label: "10-Year Treasury Yield", unit: "%" },
  CPIAUCSL: { label: "CPI Index", unit: "index" },
  UNRATE: { label: "Unemployment Rate", unit: "%" },
  MORTGAGE30US: { label: "30-Year Mortgage Rate", unit: "%" }
};

const parseFredCsv = (csv, id) => {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [date, rawValue] = line.split(",");
      const value = Number(rawValue);
      return date && Number.isFinite(value) ? { date, value } : null;
    })
    .filter(Boolean);
  const latest = rows[rows.length - 1];
  const yearAgo = rows.find((row) => row.date >= new Date(Date.now() - 370 * 86400000).toISOString().slice(0, 10)) || rows[Math.max(0, rows.length - 13)];
  return {
    id,
    label: FRED_SERIES[id]?.label || id,
    unit: FRED_SERIES[id]?.unit || "",
    latest,
    previous: rows.length > 1 ? rows[rows.length - 2] : null,
    yearAgo,
    changeFromYearAgo: latest && yearAgo ? latest.value - yearAgo.value : null
  };
};

const getMacroPayload = async () => {
  const series = await Promise.all(
    Object.keys(FRED_SERIES).map(async (id) => {
      const url = new URL(FRED_GRAPH_URL);
      url.searchParams.set("id", id);
      const csv = await cachedFetch(url.toString(), "text");
      return parseFredCsv(csv, id);
    })
  );
  return {
    series,
    stockPilotMeta: {
      source: "FRED public CSV via Federal Reserve Bank of St. Louis",
      updatedAt: new Date().toISOString(),
      note: "Official macro series can publish with delays and revisions."
    }
  };
};

const getSecTickerMap = async () => {
  const payload = await cachedFetch(SEC_TICKERS_URL, "json");
  return Object.values(payload).reduce((map, item) => {
    if (item?.ticker && item?.cik_str) {
      map[cleanSymbol(item.ticker)] = {
        cik: String(item.cik_str).padStart(10, "0"),
        ticker: cleanSymbol(item.ticker),
        title: item.title
      };
    }
    return map;
  }, {});
};

const latestFact = (facts, tag) => {
  const units = facts?.["us-gaap"]?.[tag]?.units || {};
  const rows = Object.values(units)
    .flat()
    .filter((item) => item?.form && ["10-K", "10-Q"].includes(item.form) && finiteNumber(item.val) !== null && item.end)
    .sort((a, b) => String(a.end).localeCompare(String(b.end)));
  const latest = rows[rows.length - 1];
  return latest
    ? {
        value: Number(latest.val),
        end: latest.end,
        form: latest.form,
        filed: latest.filed,
        frame: latest.frame || null
      }
    : null;
};

const getSecCompanyPayload = async (symbol) => {
  const clean = cleanSymbol(symbol);
  if (!clean) throw new Error("Missing symbol");
  const tickerMap = await getSecTickerMap();
  const company = tickerMap[clean];
  if (!company) throw new Error(`SEC ticker mapping not found for ${clean}`);
  const facts = await cachedFetch(`${SEC_COMPANY_FACTS_BASE_URL}CIK${company.cik}.json`, "json");
  const output = {
    symbol: clean,
    cik: company.cik,
    name: company.title,
    facts: {
      revenue: latestFact(facts.facts, "Revenues") || latestFact(facts.facts, "RevenueFromContractWithCustomerExcludingAssessedTax"),
      netIncome: latestFact(facts.facts, "NetIncomeLoss"),
      assets: latestFact(facts.facts, "Assets"),
      liabilities: latestFact(facts.facts, "Liabilities"),
      equity: latestFact(facts.facts, "StockholdersEquity"),
      epsDiluted: latestFact(facts.facts, "EarningsPerShareDiluted"),
      operatingCashFlow: latestFact(facts.facts, "NetCashProvidedByUsedInOperatingActivities")
    },
    stockPilotMeta: {
      source: "SEC EDGAR companyfacts API",
      updatedAt: new Date().toISOString(),
      note: "Official filing facts can lag market prices and may use different reporting periods."
    }
  };
  const equity = finiteNumber(output.facts.equity?.value);
  const liabilities = finiteNumber(output.facts.liabilities?.value);
  const netIncome = finiteNumber(output.facts.netIncome?.value);
  output.ratios = {
    roe: equity && netIncome ? (netIncome / equity) * 100 : null,
    debtEquity: equity && liabilities ? liabilities / equity : null
  };
  return output;
};

const handlePortfolio = async (reqUrl) => {
  const symbols = (reqUrl.searchParams.get("symbols") || "").split(",");
  const quotePayload = await getQuotePayload(symbols);
  const cleanSymbols = quotePayload.stockPilotMeta.symbols;
  const histories = await Promise.allSettled(cleanSymbols.map((symbol) => getHistoryPayload(symbol, "1y", "1d")));
  return {
    quotes: quotePayload,
    histories: histories.reduce((map, result, index) => {
      map[cleanSymbols[index]] = result.status === "fulfilled" ? result.value : { error: result.reason.message };
      return map;
    }, {}),
    stockPilotMeta: {
      source: "StockPilot API gateway",
      updatedAt: new Date().toISOString(),
      note: "Educational data gateway. Verify market data with an official source before making real decisions."
    }
  };
};

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});

  try {
    const reqUrl = new URL(req.url, `http://localhost:${PORT}`);

    if (reqUrl.pathname === "/health") {
      return send(res, 200, {
        ok: true,
        name: "StockPilot API Gateway",
        updatedAt: new Date().toISOString(),
        providerStatus: providerStatus().providers,
        endpoints: ["/api/status", "/api/quotes", "/api/history", "/api/search", "/api/news/rss", "/api/portfolio", "/api/macro", "/api/sec/company"]
      });
    }

    if (req.method === "GET" && reqUrl.pathname === "/") {
      return sendStaticFile(res, "landing.html");
    }
    if (req.method === "GET" && (reqUrl.pathname === "/app" || reqUrl.pathname === "/app/" || reqUrl.pathname === "/index.html")) {
      return sendStaticFile(res, "index.html");
    }
    if (req.method === "GET" && (reqUrl.pathname === "/trade" || reqUrl.pathname === "/trade/")) {
      return sendStaticFile(res, "trade.html");
    }

    if (req.method === "GET" && reqUrl.pathname === "/googlefa7a35b495fb0342.html") {
      return sendStaticFile(res, "googlefa7a35b495fb0342.html");
    }
    if (req.method === "GET" && reqUrl.pathname === "/sitemap.xml") {
      return sendStaticFile(res, "sitemap.xml");
    }
    if (req.method === "GET" && ["/app.js", "/styles.css", "/theme-override.css", "/logo.jpg", "/app-theme.css", "/logo-dark.jpg"].includes(reqUrl.pathname)) {
      return sendStaticFile(res, reqUrl.pathname.slice(1));
    }

    if (reqUrl.pathname === "/api/status") {
      return send(res, 200, providerStatus());
    }

    if (reqUrl.pathname === "/api/quotes") {
      return send(res, 200, await getQuotePayload((reqUrl.searchParams.get("symbols") || "").split(",")));
    }

    if (reqUrl.pathname === "/api/history") {
      return send(
        res,
        200,
        await getHistoryPayload(
          reqUrl.searchParams.get("symbol"),
          reqUrl.searchParams.get("range") || "1y",
          reqUrl.searchParams.get("interval") || "1d"
        )
      );
    }

    if (reqUrl.pathname === "/api/search") {
      return send(res, 200, await getSearchPayload(reqUrl.searchParams.get("q")));
    }

    if (reqUrl.pathname === "/api/news/rss") {
      return send(res, 200, await getRssText(reqUrl.searchParams.get("url")), "application/xml; charset=utf-8");
    }

    if (reqUrl.pathname === "/api/proxy/json") {
      return send(res, 200, await readPublicUrl(reqUrl.searchParams.get("url"), "json"));
    }

    if (reqUrl.pathname === "/api/proxy/text") {
      return send(res, 200, await readPublicUrl(reqUrl.searchParams.get("url"), "text"), "text/plain; charset=utf-8");
    }

    if (reqUrl.pathname === "/api/portfolio") {
      return send(res, 200, await handlePortfolio(reqUrl));
    }

    if (reqUrl.pathname === "/api/macro") {
      return send(res, 200, await getMacroPayload());
    }

    if (reqUrl.pathname === "/api/sec/company") {
      return send(res, 200, await getSecCompanyPayload(reqUrl.searchParams.get("symbol")));
    }

    return send(res, 404, { error: "Endpoint not found" });
  } catch (error) {
    return send(res, 502, {
      error: error.message,
      updatedAt: new Date().toISOString(),
      note: "The data provider may be unavailable, delayed, or blocking this request."
    });
  }
});

const HOST_CANDIDATES = process.env.HOST ? [process.env.HOST] : ["0.0.0.0", "127.0.0.1", "localhost"];
let hostIndex = 0;

const startServer = () => {
  const host = HOST_CANDIDATES[hostIndex];
  server.once("error", (error) => {
    if (error.code === "EPERM" && hostIndex < HOST_CANDIDATES.length - 1) {
      hostIndex += 1;
      console.error(`Could not bind ${host}:${PORT}. Trying ${HOST_CANDIDATES[hostIndex]}:${PORT}...`);
      startServer();
      return;
    }

    console.error("");
    console.error("StockPilot API could not start.");
    if (error.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already being used. Close the other StockPilot API window, then try again.`);
    } else if (error.code === "EPERM") {
      console.error(`macOS blocked access to ${host}:${PORT}. Try installing normal Node.js from https://nodejs.org, then run this command again.`);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  });

  server.listen(PORT, host, () => {
    console.log(`StockPilot API Gateway running at http://${host}:${PORT}`);
    console.log("Health check:", `http://${host}:${PORT}/health`);
    console.log("Open StockPilot:", `http://${host}:${PORT}/`);
  });
};

startServer();
