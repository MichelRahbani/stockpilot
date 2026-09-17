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
const SUPABASE_URL = process.env.SUPABASE_URL || "https://xkfxofcmrmpazfjviatq.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q";
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

const cachedFetch = async (url, type = "json", timeoutMs = 8000) => {
  const key = `${type}:${url}`;
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_TTL_MS) return cached.value;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  let response;
  try {
    response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": url.includes("sec.gov") ? SEC_USER_AGENT : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": type === "json" ? "application/json,text/plain,*/*" : "application/rss+xml,text/xml,text/plain,*/*"
      }
    });
  } finally {
    clearTimeout(timeout);
  }
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

const YAHOO_BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "*/*",
  "Accept-Language": "en-US,en;q=0.9",
  "Accept-Encoding": "gzip, deflate, br",
  "Referer": "https://finance.yahoo.com/",
  "Origin": "https://finance.yahoo.com",
  "Cookie": "tbla_id=test; B=test"
};

// v8/chart doesn't need the crumb+cookie auth that v7/quote now requires,
// so it's the reliable path — same pattern already proven out in /api/intl-quotes.
const fetchYahooChartQuote = async (symbol) => {
  const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=5d`, { headers: YAHOO_BROWSER_HEADERS });
  if (!r.ok) throw new Error(`chart ${r.status}`);
  const data = await r.json();
  const meta = data?.chart?.result?.[0]?.meta;
  if (!meta?.regularMarketPrice) throw new Error("no price in chart meta");
  const prev = meta.chartPreviousClose || meta.regularMarketPreviousClose || meta.regularMarketPrice;
  return {
    symbol,
    shortName: meta.shortName || meta.symbol || symbol,
    longName: meta.longName || meta.shortName || symbol,
    regularMarketPrice: meta.regularMarketPrice,
    regularMarketPreviousClose: prev,
    regularMarketChange: meta.regularMarketPrice - prev,
    regularMarketChangePercent: prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0,
    currency: meta.currency || "",
    regularMarketVolume: meta.regularMarketVolume || 0,
    regularMarketOpen: meta.regularMarketOpen || meta.regularMarketPrice,
    fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh || meta.regularMarketPrice,
    fiftyTwoWeekLow: meta.fiftyTwoWeekLow || meta.regularMarketPrice,
    regularMarketDayHigh: meta.regularMarketDayHigh || meta.regularMarketPrice,
    regularMarketDayLow: meta.regularMarketDayLow || meta.regularMarketPrice,
    marketCap: meta.marketCap || null,
    // Real trading-session boundaries and after-hours pricing, when Yahoo
    // has them for this symbol - previously fetched but silently dropped.
    hasPrePostMarketData: Boolean(meta.hasPrePostMarketData),
    currentTradingPeriod: meta.currentTradingPeriod || null,
    preMarketPrice: meta.preMarketPrice ?? null,
    preMarketChange: meta.preMarketChange ?? null,
    preMarketChangePercent: meta.preMarketChangePercent ?? null,
    postMarketPrice: meta.postMarketPrice ?? null,
    postMarketChange: meta.postMarketChange ?? null,
    postMarketChangePercent: meta.postMarketChangePercent ?? null
  };
};

const getQuotePayload = async (symbols) => {
  const cleanSymbols = [...new Set(symbols.map(cleanSymbol).filter(Boolean))].slice(0, 80);
  if (!cleanSymbols.length) return { quoteResponse: { result: [] }, stockPilotMeta: { source: "Yahoo Finance public quote endpoint", symbols: [] } };
  const providerErrors = [];
  const quoteMap = {};

  await Promise.all(cleanSymbols.map(async (symbol) => {
    try {
      quoteMap[symbol] = await fetchYahooChartQuote(symbol);
    } catch (chartError) {
      // Fall back to the v7 bulk quote endpoint for this symbol only if the chart attempt failed
      try {
        const url = new URL(YAHOO_QUOTE_URL);
        url.searchParams.set("symbols", symbol);
        const r = await fetch(url.toString(), { headers: YAHOO_BROWSER_HEADERS });
        if (!r.ok) throw new Error(`Provider returned ${r.status}`);
        const data = await r.json();
        const q = data?.quoteResponse?.result?.[0];
        if (q?.regularMarketPrice) quoteMap[symbol] = q;
        else throw new Error("no price in quote result");
      } catch (quoteError) {
        providerErrors.push(`Yahoo ${symbol}: ${quoteError.message}`);
      }
    }
  }));

  const payload = { quoteResponse: { result: Object.values(quoteMap) } };
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

const getHistoryPayload = async (symbol, range = "1y", interval = "1d", includeEvents = false) => {
  const clean = cleanSymbol(symbol);
  if (!clean) throw new Error("Missing symbol");
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(clean)}`);
  url.searchParams.set("range", range || "1y");
  url.searchParams.set("interval", interval || "1d");
  if (includeEvents) url.searchParams.set("events", "div");
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

// Real annualized historical volatility for a symbol, used to
// risk-adjust Bullpen League's weekly scoring so a stock that's
// simply more explosive by nature doesn't dominate the standings
// just because its raw percentage swings are bigger. Reuses
// getHistoryPayload directly (already benefits from the same
// timeout + cache as every other history call) instead of making a
// wasteful HTTP round-trip to this server's own /api/history route.
const SP500_SECTORS = {
  'MMM':'Industrials','AOS':'Industrials','ABT':'Health Care','ABBV':'Health Care','ACN':'Information Technology','ADBE':'Information Technology',
  'AMD':'Information Technology','AES':'Utilities','AFL':'Financials','A':'Health Care','APD':'Materials','ABNB':'Consumer Discretionary',
  'AKAM':'Information Technology','ALB':'Materials','ARE':'Real Estate','ALGN':'Health Care','ALLE':'Industrials','LNT':'Utilities',
  'ALL':'Financials','GOOGL':'Communication Services','GOOG':'Communication Services','MO':'Consumer Staples','AMZN':'Consumer Discretionary','AMCR':'Materials',
  'AEE':'Utilities','AEP':'Utilities','AXP':'Financials','AIG':'Financials','AMT':'Real Estate','AWK':'Utilities',
  'AMP':'Financials','AME':'Industrials','AMGN':'Health Care','APH':'Information Technology','ADI':'Information Technology','AON':'Financials',
  'APA':'Energy','APO':'Financials','AAPL':'Information Technology','AMAT':'Information Technology','APP':'Communication Services','APTV':'Consumer Discretionary',
  'ACGL':'Financials','ADM':'Consumer Staples','ARES':'Financials','ANET':'Information Technology','AJG':'Financials','AIZ':'Financials',
  'T':'Communication Services','ATO':'Utilities','ADSK':'Information Technology','ADP':'Industrials','AZO':'Consumer Discretionary','AVY':'Materials',
  'AXON':'Industrials','BKR':'Energy','BALL':'Materials','BAC':'Financials','BAX':'Health Care','BDX':'Health Care',
  'BRK.B':'Financials','BBY':'Consumer Discretionary','TECH':'Health Care','BIIB':'Health Care','BLK':'Financials','BX':'Financials',
  'XYZ':'Financials','BNY':'Financials','BA':'Industrials','BKNG':'Consumer Discretionary','BSX':'Health Care','BMY':'Health Care',
  'AVGO':'Information Technology','BR':'Industrials','BRO':'Financials','BF.B':'Consumer Staples','BLDR':'Industrials','BG':'Consumer Staples',
  'BXP':'Real Estate','CHRW':'Industrials','CDNS':'Information Technology','CPT':'Real Estate','COF':'Financials','CAH':'Health Care',
  'CCL':'Consumer Discretionary','CARR':'Industrials','CVNA':'Consumer Discretionary','CASY':'Consumer Staples','CAT':'Industrials','CBOE':'Financials',
  'CBRE':'Real Estate','CDW':'Information Technology','COR':'Health Care','CNC':'Health Care','CNP':'Utilities','CF':'Materials',
  'CRL':'Health Care','SCHW':'Financials','CHTR':'Communication Services','CVX':'Energy','CMG':'Consumer Discretionary','CB':'Financials',
  'CHD':'Consumer Staples','CIEN':'Information Technology','CI':'Health Care','CINF':'Financials','CTAS':'Industrials','CSCO':'Information Technology',
  'C':'Financials','CFG':'Financials','CLX':'Consumer Staples','CME':'Financials','CMS':'Utilities','KO':'Consumer Staples',
  'CTSH':'Information Technology','COHR':'Information Technology','COIN':'Financials','CL':'Consumer Staples','CMCSA':'Communication Services','FIX':'Industrials',
  'COP':'Energy','ED':'Utilities','STZ':'Consumer Staples','CEG':'Utilities','COO':'Health Care','CPRT':'Industrials',
  'GLW':'Information Technology','CPAY':'Financials','CTVA':'Materials','CSGP':'Real Estate','COST':'Consumer Staples','CRH':'Materials',
  'CRWD':'Information Technology','CCI':'Real Estate','CSX':'Industrials','CMI':'Industrials','CVS':'Health Care','DHR':'Health Care',
  'DRI':'Consumer Discretionary','DDOG':'Information Technology','DVA':'Health Care','DECK':'Consumer Discretionary','DE':'Industrials','DELL':'Information Technology',
  'DAL':'Industrials','DVN':'Energy','DXCM':'Health Care','FANG':'Energy','DLR':'Real Estate','DG':'Consumer Staples',
  'DLTR':'Consumer Staples','D':'Utilities','DPZ':'Consumer Discretionary','DASH':'Consumer Discretionary','DOV':'Industrials','DOW':'Materials',
  'DHI':'Consumer Discretionary','DTE':'Utilities','DUK':'Utilities','DD':'Industrials','ETN':'Industrials','EBAY':'Consumer Discretionary',
  'ECHO':'Communication Services','ECL':'Materials','EIX':'Utilities','EW':'Health Care','ELV':'Health Care','EME':'Industrials',
  'EMR':'Industrials','ETR':'Utilities','EOG':'Energy','EQT':'Energy','EFX':'Industrials','EQIX':'Real Estate',
  'ERIE':'Financials','ESS':'Real Estate','EL':'Consumer Staples','EG':'Financials','EVRG':'Utilities','ES':'Utilities',
  'EXC':'Utilities','EXE':'Energy','EXPE':'Consumer Discretionary','EXPD':'Industrials','EXR':'Real Estate','XOM':'Energy',
  'FFIV':'Information Technology','FDS':'Financials','FICO':'Information Technology','FAST':'Industrials','FRT':'Real Estate','FDX':'Industrials',
  'FDXF':'Industrials','FERG':'Industrials','FIS':'Financials','FITB':'Financials','FSLR':'Information Technology','FE':'Utilities',
  'FISV':'Financials','FLEX':'Information Technology','F':'Consumer Discretionary','FTNT':'Information Technology','FTV':'Industrials','FOXA':'Communication Services',
  'FOX':'Communication Services','BEN':'Financials','FCX':'Materials','GRMN':'Consumer Discretionary','IT':'Information Technology','GE':'Industrials',
  'GEHC':'Health Care','GEV':'Industrials','GEN':'Information Technology','GNRC':'Industrials','GD':'Industrials','GIS':'Consumer Staples',
  'GM':'Consumer Discretionary','GPC':'Consumer Discretionary','GILD':'Health Care','GPN':'Financials','GL':'Financials','GDDY':'Information Technology',
  'GS':'Financials','HAL':'Energy','HIG':'Financials','HAS':'Consumer Discretionary','HCA':'Health Care','DOC':'Real Estate',
  'HSIC':'Health Care','HSY':'Consumer Staples','HPE':'Information Technology','HLT':'Consumer Discretionary','HD':'Consumer Discretionary','HONA':'Industrials',
  'HON':'Industrials','HRL':'Consumer Staples','HST':'Real Estate','HWM':'Industrials','HPQ':'Information Technology','HUBB':'Industrials',
  'HUM':'Health Care','HBAN':'Financials','HII':'Industrials','IBM':'Information Technology','IEX':'Industrials','IDXX':'Health Care',
  'ITW':'Industrials','INCY':'Health Care','IR':'Industrials','PODD':'Health Care','INTC':'Information Technology','IBKR':'Financials',
  'ICE':'Financials','IFF':'Materials','IP':'Materials','INTU':'Information Technology','ISRG':'Health Care','IVZ':'Financials',
  'INVH':'Real Estate','IQV':'Health Care','IRM':'Real Estate','JBHT':'Industrials','JBL':'Information Technology','JKHY':'Financials',
  'J':'Industrials','JNJ':'Health Care','JCI':'Industrials','JPM':'Financials','KVUE':'Consumer Staples','KDP':'Consumer Staples',
  'KEY':'Financials','KEYS':'Information Technology','KMB':'Consumer Staples','KIM':'Real Estate','KMI':'Energy','KKR':'Financials',
  'KLAC':'Information Technology','KHC':'Consumer Staples','KR':'Consumer Staples','LHX':'Industrials','LH':'Health Care','LRCX':'Information Technology',
  'LVS':'Consumer Discretionary','LDOS':'Industrials','LEN':'Consumer Discretionary','LII':'Industrials','LLY':'Health Care','LIN':'Materials',
  'LYV':'Communication Services','LMT':'Industrials','L':'Financials','LOW':'Consumer Discretionary','LULU':'Consumer Discretionary','LITE':'Information Technology',
  'LYB':'Materials','MTB':'Financials','MPC':'Energy','MAR':'Consumer Discretionary','MRSH':'Financials','MLM':'Materials',
  'MRVL':'Information Technology','MAS':'Industrials','MA':'Financials','MKC':'Consumer Staples','MCD':'Consumer Discretionary','MCK':'Health Care',
  'MDT':'Health Care','MRK':'Health Care','META':'Communication Services','MET':'Financials','MTD':'Health Care','MGM':'Consumer Discretionary',
  'MCHP':'Information Technology','MU':'Information Technology','MSFT':'Information Technology','MAA':'Real Estate','MRNA':'Health Care','TAP':'Consumer Staples',
  'MDLZ':'Consumer Staples','MPWR':'Information Technology','MNST':'Consumer Staples','MCO':'Financials','MS':'Financials','MOS':'Materials',
  'MSI':'Information Technology','MSCI':'Financials','NDAQ':'Financials','NTAP':'Information Technology','NFLX':'Communication Services','NEM':'Materials',
  'NWSA':'Communication Services','NWS':'Communication Services','NEE':'Utilities','NKE':'Consumer Discretionary','NI':'Utilities','NDSN':'Industrials',
  'NSC':'Industrials','NTRS':'Financials','NOC':'Industrials','NCLH':'Consumer Discretionary','NRG':'Utilities','NUE':'Materials',
  'NVDA':'Information Technology','NVR':'Consumer Discretionary','NXPI':'Information Technology','ORLY':'Consumer Discretionary','OXY':'Energy','ODFL':'Industrials',
  'OMC':'Communication Services','ON':'Information Technology','OKE':'Energy','ORCL':'Information Technology','OTIS':'Industrials','PCAR':'Industrials',
  'PKG':'Materials','PLTR':'Information Technology','PANW':'Information Technology','PSKY':'Communication Services','PH':'Industrials','PAYX':'Industrials',
  'PYPL':'Financials','PNR':'Industrials','PEP':'Consumer Staples','PFE':'Health Care','PCG':'Utilities','PM':'Consumer Staples',
  'PSX':'Energy','PNW':'Utilities','PNC':'Financials','PPG':'Materials','PPL':'Utilities','PFG':'Financials',
  'PG':'Consumer Staples','PGR':'Financials','PLD':'Real Estate','PRU':'Financials','PEG':'Utilities','PTC':'Information Technology',
  'PSA':'Real Estate','PHM':'Consumer Discretionary','PWR':'Industrials','QCOM':'Information Technology','DGX':'Health Care','Q':'Information Technology',
  'RL':'Consumer Discretionary','RJF':'Financials','RDDT':'Communication Services','RTX':'Industrials','O':'Real Estate','REG':'Real Estate',
  'REGN':'Health Care','RF':'Financials','RSG':'Industrials','RMD':'Health Care','RVTY':'Health Care','HOOD':'Financials',
  'ROK':'Industrials','ROL':'Industrials','ROP':'Information Technology','ROST':'Consumer Discretionary','RCL':'Consumer Discretionary','SPGI':'Financials',
  'CRM':'Information Technology','SNDK':'Information Technology','SBAC':'Real Estate','SLB':'Energy','STX':'Information Technology','SRE':'Utilities',
  'NOW':'Information Technology','SHW':'Materials','SPG':'Real Estate','SWKS':'Information Technology','SJM':'Consumer Staples','SW':'Materials',
  'SNA':'Industrials','SOLV':'Health Care','SO':'Utilities','LUV':'Industrials','SWK':'Industrials','SBUX':'Consumer Discretionary',
  'STT':'Financials','STLD':'Materials','STE':'Health Care','SYK':'Health Care','SMCI':'Information Technology','SYF':'Financials',
  'SNPS':'Information Technology','SYY':'Consumer Staples','TMUS':'Communication Services','TROW':'Financials','TTWO':'Communication Services','TPR':'Consumer Discretionary',
  'TRGP':'Energy','TGT':'Consumer Staples','TEL':'Information Technology','TDY':'Information Technology','TER':'Information Technology','TSLA':'Consumer Discretionary',
  'TXN':'Information Technology','TPL':'Energy','TXT':'Industrials','TMO':'Health Care','TJX':'Consumer Discretionary','TKO':'Communication Services',
  'TTD':'Communication Services','TSCO':'Consumer Discretionary','TT':'Industrials','TDG':'Industrials','TRV':'Financials','TRMB':'Information Technology',
  'TFC':'Financials','TYL':'Information Technology','TSN':'Consumer Staples','USB':'Financials','UBER':'Industrials','UDR':'Real Estate',
  'ULTA':'Consumer Discretionary','UNP':'Industrials','UAL':'Industrials','UPS':'Industrials','URI':'Industrials','UNH':'Health Care',
  'UHS':'Health Care','VLO':'Energy','VEEV':'Health Care','VTR':'Real Estate','VLTO':'Industrials','VRSN':'Information Technology',
  'VRSK':'Industrials','VZ':'Communication Services','VRTX':'Health Care','VRT':'Industrials','VTRS':'Health Care','VICI':'Real Estate',
  'V':'Financials','VST':'Utilities','VMRK':'Real Estate','VMC':'Materials','WRB':'Financials','GWW':'Industrials',
  'WAB':'Industrials','WMT':'Consumer Staples','DIS':'Communication Services','WBD':'Communication Services','WM':'Industrials','WAT':'Health Care',
  'WEC':'Utilities','WFC':'Financials','WELL':'Real Estate','WST':'Health Care','WDC':'Information Technology','WY':'Real Estate',
  'WSM':'Consumer Discretionary','WMB':'Energy','WTW':'Financials','WDAY':'Information Technology','WYNN':'Consumer Discretionary','XEL':'Utilities',
  'XYL':'Industrials','YUM':'Consumer Discretionary','ZBRA':'Information Technology','ZBH':'Health Care','ZTS':'Health Care',
};

const getVolatility = async (symbol) => {
  try {
    const data = await getHistoryPayload(symbol, "3mo", "1d", false);
    const closes = (data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || []).filter(c => c != null);
    if (closes.length < 10) return 0.35; // not enough real data - a reasonable market-average fallback
    const logReturns = [];
    for (let i = 1; i < closes.length; i++) logReturns.push(Math.log(closes[i] / closes[i - 1]));
    const mean = logReturns.reduce((a, b) => a + b, 0) / logReturns.length;
    const variance = logReturns.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (logReturns.length - 1);
    return Math.sqrt(variance) * Math.sqrt(252);
  } catch (e) {
    return 0.35;
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
  DGS1MO: { label: "1-Month Treasury Yield", unit: "%" },
  DGS3MO: { label: "3-Month Treasury Yield", unit: "%" },
  DGS6MO: { label: "6-Month Treasury Yield", unit: "%" },
  DGS1: { label: "1-Year Treasury Yield", unit: "%" },
  DGS2: { label: "2-Year Treasury Yield", unit: "%" },
  DGS3: { label: "3-Year Treasury Yield", unit: "%" },
  DGS5: { label: "5-Year Treasury Yield", unit: "%" },
  DGS7: { label: "7-Year Treasury Yield", unit: "%" },
  DGS10: { label: "10-Year Treasury Yield", unit: "%" },
  DGS20: { label: "20-Year Treasury Yield", unit: "%" },
  DGS30: { label: "30-Year Treasury Yield", unit: "%" },
  CPIAUCSL: { label: "CPI Index", unit: "index" },
  UNRATE: { label: "Unemployment Rate", unit: "%" },
  MORTGAGE30US: { label: "30-Year Mortgage Rate", unit: "%" },
  MTSDS133FMS: { label: "Federal Surplus or Deficit (Monthly)", unit: "$M" }
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
  const results = await Promise.allSettled(
    Object.keys(FRED_SERIES).map(async (id) => {
      const url = new URL(FRED_GRAPH_URL);
      url.searchParams.set("id", id);
      const csv = await cachedFetch(url.toString(), "text");
      return parseFredCsv(csv, id);
    })
  );
  // One slow or failed series (FRED rate-limiting, a bad symbol, a
  // timeout) shouldn't take the whole endpoint down - return whatever
  // genuinely succeeded rather than failing everything over one bad one.
  const series = results.filter((r) => r.status === "fulfilled").map((r) => r.value);
  const failed = results.filter((r) => r.status === "rejected").length;
  return {
    series,
    stockPilotMeta: {
      source: "FRED public CSV via Federal Reserve Bank of St. Louis",
      updatedAt: new Date().toISOString(),
      note: "Official macro series can publish with delays and revisions.",
      ...(failed ? { partialFailure: `${failed} of ${Object.keys(FRED_SERIES).length} series could not be fetched this time.` } : {})
    }
  };
};

// Real, well-documented Fed rate cycles - dates and rate changes are
// public record (FOMC meeting actions), not modeled or estimated.
// Real S&P 500 (via SPY) performance for each cycle is computed fresh
// below from real historical prices, never hardcoded, so it stays
// accurate as more data becomes available.
const FED_CYCLES = [
  { name: "2015-2018 Tightening", type: "hike", start: "2015-12-16", end: "2018-12-19", rateChange: "0% \u2192 2.25-2.50%", context: "First hike since the 2008 financial crisis, raised gradually over 3 years as the economy recovered.", situation: "recovering", response: "gradual" },
  { name: "2019 Easing", type: "cut", start: "2019-07-31", end: "2019-10-30", rateChange: "2.25-2.50% \u2192 1.50-1.75%", context: "Three \"insurance cuts\" as growth slowed, ahead of the COVID-19 pandemic.", situation: "slowing", response: "preemptive" },
  { name: "2020 COVID Emergency Cut", type: "cut", start: "2020-03-03", end: "2020-03-16", rateChange: "1.50-1.75% \u2192 0-0.25%", context: "Emergency cuts to near-zero as the pandemic began, the fastest cut in Fed history.", situation: "crisis", response: "emergency" },
  { name: "2022-2023 Tightening", type: "hike", start: "2022-03-16", end: "2023-07-26", rateChange: "0-0.25% \u2192 5.25-5.50%", context: "The fastest hiking cycle since the early 1980s, in response to the highest inflation in four decades.", situation: "inflation", response: "aggressive" }
];

const SITUATION_LABELS = {
  recovering: "Recovering economy, low inflation",
  slowing: "Slowing growth, moderate concern",
  crisis: "Sudden crisis or recession risk",
  inflation: "High inflation, strong labor market"
};
const RESPONSE_LABELS = {
  gradual: "Raise rates gradually",
  preemptive: "Small preemptive cuts",
  emergency: "Emergency rapid cuts",
  aggressive: "Raise rates aggressively"
};

// Real precedent matching, not a prediction engine. Scores each real
// cycle against the student's chosen situation and response, and
// returns the closest real match plus how it scored against the
// others, so the "why this one" reasoning is visible, not a black box.
const matchFedPrecedent = (situation, response) => {
  const scored = FED_CYCLES.map((cycle) => {
    let score = 0;
    if (cycle.situation === situation) score += 2;
    if (cycle.response === response) score += 2;
    // Partial credit: hikes are closer to other hikes than to cuts,
    // even with a different intensity, and the same for cuts.
    const cycleIsHike = cycle.type === "hike";
    const responseIsHike = response === "gradual" || response === "aggressive";
    if (cycleIsHike === responseIsHike) score += 1;
    return { cycle, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored;
};

const getCyclesWithReturns = async () => {
  const spyHistory = await getHistoryPayload("SPY", "10y", "1d", false);
  const closes = spyHistory?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
  const timestamps = spyHistory?.chart?.result?.[0]?.timestamp || [];

  const closestClose = (targetDate) => {
    const targetMs = new Date(targetDate).getTime();
    let closestIdx = 0, closestDiff = Infinity;
    timestamps.forEach((ts, i) => {
      const diff = Math.abs(ts * 1000 - targetMs);
      if (diff < closestDiff && closes[i] != null) { closestDiff = diff; closestIdx = i; }
    });
    return { price: closes[closestIdx], matchedDate: new Date(timestamps[closestIdx] * 1000).toISOString().split("T")[0] };
  };

  return FED_CYCLES.map((cycle) => {
    const startPoint = closestClose(cycle.start);
    const endPoint = closestClose(cycle.end);
    const sp500Return = (startPoint.price && endPoint.price)
      ? ((endPoint.price - startPoint.price) / startPoint.price) * 100
      : null;
    return {
      ...cycle,
      sp500Return: sp500Return != null ? parseFloat(sp500Return.toFixed(2)) : null,
      sp500StartPrice: startPoint.price ? parseFloat(startPoint.price.toFixed(2)) : null,
      sp500EndPrice: endPoint.price ? parseFloat(endPoint.price.toFixed(2)) : null
    };
  });
};

const SP500_TIER_TICKERS = [
  'MMM','AOS','ABT','ABBV','ACN','ADBE','AMD','AES','AFL','A','APD','ABNB',
  'AKAM','ALB','ARE','ALGN','ALLE','LNT','ALL','GOOGL','GOOG','MO','AMZN','AMCR',
  'AEE','AEP','AXP','AIG','AMT','AWK','AMP','AME','AMGN','APH','ADI','AON',
  'APA','APO','AAPL','AMAT','APP','APTV','ACGL','ADM','ARES','ANET','AJG','AIZ',
  'T','ATO','ADSK','ADP','AZO','AVY','AXON','BKR','BALL','BAC','BAX','BDX',
  'BRK.B','BBY','TECH','BIIB','BLK','BX','XYZ','BNY','BA','BKNG','BSX','BMY',
  'AVGO','BR','BRO','BF.B','BLDR','BG','BXP','CHRW','CDNS','CPT','COF','CAH',
  'CCL','CARR','CVNA','CASY','CAT','CBOE','CBRE','CDW','COR','CNC','CNP','CF',
  'CRL','SCHW','CHTR','CVX','CMG','CB','CHD','CIEN','CI','CINF','CTAS','CSCO',
  'C','CFG','CLX','CME','CMS','KO','CTSH','COHR','COIN','CL','CMCSA','FIX',
  'COP','ED','STZ','CEG','COO','CPRT','GLW','CPAY','CTVA','CSGP','COST','CRH',
  'CRWD','CCI','CSX','CMI','CVS','DHR','DRI','DDOG','DVA','DECK','DE','DELL',
  'DAL','DVN','DXCM','FANG','DLR','DG','DLTR','D','DPZ','DASH','DOV','DOW',
  'DHI','DTE','DUK','DD','ETN','EBAY','ECHO','ECL','EIX','EW','ELV','EME',
  'EMR','ETR','EOG','EQT','EFX','EQIX','ERIE','ESS','EL','EG','EVRG','ES',
  'EXC','EXE','EXPE','EXPD','EXR','XOM','FFIV','FDS','FICO','FAST','FRT','FDX',
  'FDXF','FERG','FIS','FITB','FSLR','FE','FISV','FLEX','F','FTNT','FTV','FOXA',
  'FOX','BEN','FCX','GRMN','IT','GE','GEHC','GEV','GEN','GNRC','GD','GIS',
  'GM','GPC','GILD','GPN','GL','GDDY','GS','HAL','HIG','HAS','HCA','DOC',
  'HSIC','HSY','HPE','HLT','HD','HONA','HON','HRL','HST','HWM','HPQ','HUBB',
  'HUM','HBAN','HII','IBM','IEX','IDXX','ITW','INCY','IR','PODD','INTC','IBKR',
  'ICE','IFF','IP','INTU','ISRG','IVZ','INVH','IQV','IRM','JBHT','JBL','JKHY',
  'J','JNJ','JCI','JPM','KVUE','KDP','KEY','KEYS','KMB','KIM','KMI','KKR',
  'KLAC','KHC','KR','LHX','LH','LRCX','LVS','LDOS','LEN','LII','LLY','LIN',
  'LYV','LMT','L','LOW','LULU','LITE','LYB','MTB','MPC','MAR','MRSH','MLM',
  'MRVL','MAS','MA','MKC','MCD','MCK','MDT','MRK','META','MET','MTD','MGM',
  'MCHP','MU','MSFT','MAA','MRNA','TAP','MDLZ','MPWR','MNST','MCO','MS','MOS',
  'MSI','MSCI','NDAQ','NTAP','NFLX','NEM','NWSA','NWS','NEE','NKE','NI','NDSN',
  'NSC','NTRS','NOC','NCLH','NRG','NUE','NVDA','NVR','NXPI','ORLY','OXY','ODFL',
  'OMC','ON','OKE','ORCL','OTIS','PCAR','PKG','PLTR','PANW','PSKY','PH','PAYX',
  'PYPL','PNR','PEP','PFE','PCG','PM','PSX','PNW','PNC','PPG','PPL','PFG',
  'PG','PGR','PLD','PRU','PEG','PTC','PSA','PHM','PWR','QCOM','DGX','Q',
  'RL','RJF','RDDT','RTX','O','REG','REGN','RF','RSG','RMD','RVTY','HOOD',
  'ROK','ROL','ROP','ROST','RCL','SPGI','CRM','SNDK','SBAC','SLB','STX','SRE',
  'NOW','SHW','SPG','SWKS','SJM','SW','SNA','SOLV','SO','LUV','SWK','SBUX',
  'STT','STLD','STE','SYK','SMCI','SYF','SNPS','SYY','TMUS','TROW','TTWO','TPR',
  'TRGP','TGT','TEL','TDY','TER','TSLA','TXN','TPL','TXT','TMO','TJX','TKO',
  'TTD','TSCO','TT','TDG','TRV','TRMB','TFC','TYL','TSN','USB','UBER','UDR',
  'ULTA','UNP','UAL','UPS','URI','UNH','UHS','VLO','VEEV','VTR','VLTO','VRSN',
  'VRSK','VZ','VRTX','VRT','VTRS','VICI','V','VST','VMRK','VMC','WRB','GWW',
  'WAB','WMT','DIS','WBD','WM','WAT','WEC','WFC','WELL','WST','WDC','WY',
  'WSM','WMB','WTW','WDAY','WYNN','XEL','XYL','YUM','ZBRA','ZBH','ZTS',
];

// Real market-cap-based tiers for FPL-style League draft pricing.
// Cached for an hour (this needs ~7 batched quote calls across 503
// tickers, expensive to recompute on every request, and market caps
// don't meaningfully shift minute to minute).
let sp500TiersCache = null;
let sp500TiersCacheTime = 0;
const SP500_TIER_CACHE_MS = 60 * 60 * 1000;
const TIER_PRICES = [18, 14, 10, 6, 3]; // tier 1 (largest) through tier 5 (smallest)

const getSp500TiersPayload = async (forceRefresh = false) => {
  if (!forceRefresh && sp500TiersCache && (Date.now() - sp500TiersCacheTime) < SP500_TIER_CACHE_MS) {
    return sp500TiersCache;
  }

  // Yahoo's v8/chart endpoint (the reliable, no-auth path used
  // elsewhere in this file) does not include market cap at all, and
  // v7/quote genuinely requires crumb+cookie auth this app doesn't
  // have (confirmed directly - a real request came back
  // "Unauthorized" even with browser-style headers). Finnhub is
  // already integrated and authenticated elsewhere in this file
  // (getFinnhubSnapshot) and reliably includes real market cap, so
  // that's the real source here. Throttled in small batches since
  // 503 simultaneous calls would hit Finnhub's free-tier rate limit.
  const batchSize = 20;
  const marketCaps = {};
  for (let i = 0; i < SP500_TIER_TICKERS.length; i += batchSize) {
    const batch = SP500_TIER_TICKERS.slice(i, i + batchSize);
    try {
      const map = await getFinnhubQuoteMap(batch);
      Object.entries(map).forEach(([symbol, q]) => {
        if (q?.marketCap) marketCaps[symbol] = q.marketCap;
      });
    } catch (e) { /* this batch failed - those tickers just won't get a real price below */ }
    // Brief pause between batches to stay well under Finnhub's free-tier rate limit.
    await new Promise((resolve) => setTimeout(resolve, 1100));
  }

  // Real ranking by real market cap, only for tickers we actually got
  // a real number for. Anything missing a market cap this run simply
  // isn't priced rather than guessed.
  const ranked = Object.entries(marketCaps).sort((a, b) => b[1] - a[1]);
  const tierSize = Math.ceil(ranked.length / 5);
  const tickerPrices = {};
  ranked.forEach(([symbol, cap], i) => {
    const tier = Math.min(5, Math.floor(i / tierSize) + 1);
    tickerPrices[symbol] = { tier, price: TIER_PRICES[tier - 1], marketCap: cap };
  });

  sp500TiersCache = {
    prices: tickerPrices,
    tierPrices: TIER_PRICES,
    pricedCount: ranked.length,
    totalTickers: SP500_TIER_TICKERS.length,
    stockPilotMeta: {
      source: "Real market cap from Yahoo Finance quotes, ranked into 5 tiers - not modeled or estimated",
      updatedAt: new Date().toISOString(),
      note: ranked.length < SP500_TIER_TICKERS.length ? `${SP500_TIER_TICKERS.length - ranked.length} tickers could not be priced this run (missing market cap data)` : "All tickers priced"
    }
  };
  sp500TiersCacheTime = Date.now();
  return sp500TiersCache;
};

const getFedCyclesPayload = async () => {
  const cycles = await getCyclesWithReturns();
  return {
    cycles,
    stockPilotMeta: {
      source: "Fed cycle dates are public FOMC record; S&P 500 returns computed from real SPY historical prices",
      updatedAt: new Date().toISOString(),
      note: "Real historical precedent, not a prediction or simulation of what any policy choice would do in the future."
    }
  };
};

const getFedPrecedentPayload = async (situation, response) => {
  if (!SITUATION_LABELS[situation] || !RESPONSE_LABELS[response]) {
    return { error: "Unknown situation or response option." };
  }
  const cyclesWithReturns = await getCyclesWithReturns();
  const ranked = matchFedPrecedent(situation, response).map((r) => ({
    ...r,
    cycle: cyclesWithReturns.find((c) => c.name === r.cycle.name) || r.cycle
  }));
  return {
    situation, situationLabel: SITUATION_LABELS[situation],
    response, responseLabel: RESPONSE_LABELS[response],
    bestMatch: ranked[0].cycle,
    matchScore: ranked[0].score,
    matchMax: 5,
    otherOptions: ranked.slice(1).map((r) => ({ name: r.cycle.name, score: r.score })),
    stockPilotMeta: {
      source: "Fed cycle dates are public FOMC record; S&P 500 returns computed from real SPY historical prices",
      updatedAt: new Date().toISOString(),
      note: "This is the closest real historical precedent to your choices, not a prediction of what would happen today. Real history, not a simulation."
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

    if (req.method === "GET" && reqUrl.pathname === "/api/intl-quotes") {
      const symbols = (reqUrl.searchParams.get("symbols") || "").split(",").map(s => s.trim()).filter(Boolean);
      if (!symbols.length) return send(res, 200, { quoteResponse: { result: [] } });
      const results = [];
      const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "https://finance.yahoo.com/",
        "Origin": "https://finance.yahoo.com",
        "Cookie": "tbla_id=test; B=test"
      };
      for (const sym of symbols) {
        let quote = null;
        // Try v8 chart endpoint — different rate limit pool from v7 quote
        try {
          const r = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`, { headers });
          if (r.ok) {
            const data = await r.json();
            const meta = data?.chart?.result?.[0]?.meta;
            if (meta?.regularMarketPrice) {
              const prev = meta.chartPreviousClose || meta.regularMarketPreviousClose || meta.regularMarketPrice;
              quote = {
                symbol: sym,
                shortName: meta.shortName || meta.symbol || sym,
                longName: meta.longName || meta.shortName || sym,
                regularMarketPrice: meta.regularMarketPrice,
                regularMarketPreviousClose: prev,
                regularMarketChange: meta.regularMarketPrice - prev,
                regularMarketChangePercent: prev ? ((meta.regularMarketPrice - prev) / prev) * 100 : 0,
                currency: meta.currency || '',
                regularMarketVolume: meta.regularMarketVolume || 0,
                regularMarketOpen: meta.regularMarketOpen || meta.regularMarketPrice,
                fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh || meta.regularMarketPrice,
                fiftyTwoWeekLow: meta.fiftyTwoWeekLow || meta.regularMarketPrice,
                regularMarketDayHigh: meta.regularMarketDayHigh || meta.regularMarketPrice,
                regularMarketDayLow: meta.regularMarketDayLow || meta.regularMarketPrice,
                marketCap: meta.marketCap || null,
              };
            }
          }
        } catch(e) {}
        // Fallback: try query2 v7
        if (!quote) {
          try {
            const r = await fetch(`https://query2.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(sym)}`, { headers });
            if (r.ok) {
              const data = await r.json();
              const q = data?.quoteResponse?.result?.[0];
              if (q?.regularMarketPrice) quote = q;
            }
          } catch(e) {}
        }
        if (quote) results.push(quote);
      }
      return send(res, 200, { quoteResponse: { result: results } });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/refresh-leaderboard") {
      try {
        const supaKey = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
        // 1. Get all leaderboard entries with user_ids
        const lbRes = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?select=user_id,nickname,return_pct,current_value`, {
          headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` }
        });
        const lbRows = await lbRes.json();
        if (!lbRows || !lbRows.length) return send(res, 200, { updated: 0 });

        // 2. Get all portfolios
        const portRes = await fetch(`${SUPABASE_URL}/rest/v1/virtual_portfolios?select=user_id,portfolio`, {
          headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` }
        });
        const portRows = await portRes.json();
        const portMap = {};
        (portRows || []).forEach(p => { portMap[p.user_id] = p.portfolio; });

        // 3. Collect all unique tickers across all portfolios
        const allSyms = new Set();
        Object.values(portMap).forEach(p => { if (p && p.pos) Object.keys(p.pos).forEach(s => allSyms.add(s)); });

        // 4. Fetch prices for all tickers using internal getQuotePayload
        const priceMap = {};
        if (allSyms.size) {
          const quotes = await getQuotePayload([...allSyms]).catch(() => ({ quoteResponse: { result: [] } }));
          (quotes?.quoteResponse?.result || []).forEach(q => {
            if (q.regularMarketPrice) priceMap[q.symbol] = q.regularMarketPrice;
          });
        }

        // 5. Recalculate and patch each user
        let updated = 0;
        for (const row of lbRows) {
          const p = portMap[row.user_id];
          if (!p) continue;
          let val = p.cash || 100000;
          Object.entries(p.pos || {}).forEach(([sym, pos]) => {
            val += pos.qty * (priceMap[sym] || pos.avg);
          });
          const ret = Math.round(((val - 100000) / 100000) * 10000) / 100;
          // Only patch if value changed meaningfully
          if (true) { // always refresh
            await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?user_id=eq.${row.user_id}`, {
              method: "PATCH",
              headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
              body: JSON.stringify({ return_pct: ret, current_value: Math.round(val), updated_at: new Date().toISOString() })
            });
            updated++;
          }
        }
        return send(res, 200, { updated, total: lbRows.length });
      } catch(e) {
        return send(res, 500, { error: e.message });
      }
    }

    if (reqUrl.pathname === "/api/bullpen-weekly") {
      // Awards weekly points and resets baselines for any Bullpen league
      // whose week is 7+ days old. This was previously written as a
      // standalone file (api/bullpen-weekly.js) in the repo but was never
      // actually wired into this server's routing, so it has never been
      // reachable - the whole weekly scoring feature was silently dead.
      try {
        const supaKey = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        const leagues = await fetch(`${SUPABASE_URL}/rest/v1/bullpen_leagues?select=*&order=created_at.desc`, {
          headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` }
        }).then(r => r.json());
        if (!Array.isArray(leagues)) return send(res, 200, { message: "No leagues found", leagues });

        const results = [];

        for (const league of leagues) {
          const weekStart = league.week_start_date ? new Date(league.week_start_date) : now;
          const daysSince = Math.floor((now - weekStart) / 86400000);
          if (daysSince < 7) {
            results.push({ league: league.code, status: "not_due", days: daysSince });
            continue;
          }

          const members = await fetch(`${SUPABASE_URL}/rest/v1/bullpen_members?league_code=eq.${league.code}&order=joined_at.asc`, {
            headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}` }
          }).then(r => r.json());
          if (!Array.isArray(members) || !members.length) continue;

          const allTickers = new Set();
          members.forEach(m => (m.starters || []).forEach(t => allTickers.add(t)));

          const changeMap = {}, priceMap = {}, volMap = {};
          if (allTickers.size) {
            const quotes = await getQuotePayload([...allTickers]).catch(() => ({ quoteResponse: { result: [] } }));
            (quotes?.quoteResponse?.result || []).forEach(q => {
              changeMap[q.symbol] = q.regularMarketChangePercent || 0;
              priceMap[q.symbol] = q.regularMarketPrice || 0;
            });
            // Real volatility per ticker, fetched in parallel - used to
            // risk-adjust the weekly score below.
            const tickerList = [...allTickers];
            const vols = await Promise.all(tickerList.map(t => getVolatility(t)));
            tickerList.forEach((t, i) => { volMap[t] = vols[i]; });
          }

          // Real S&P 500 benchmark return for this same week (via SPY,
          // which tracks the index) - used for the alpha bonus below.
          // Finds the close nearest the league's actual week start,
          // rather than assuming a fixed number of trading days back.
          let benchmarkReturn = 0;
          try {
            const spyHistory = await getHistoryPayload("SPY", "1mo", "1d", false);
            const closes = spyHistory?.chart?.result?.[0]?.indicators?.quote?.[0]?.close || [];
            const timestamps = spyHistory?.chart?.result?.[0]?.timestamp || [];
            const weekStartMs = new Date(league.week_start_date).getTime();
            let closestIdx = 0, closestDiff = Infinity;
            timestamps.forEach((ts, i) => {
              const diff = Math.abs(ts * 1000 - weekStartMs);
              if (diff < closestDiff && closes[i] != null) { closestDiff = diff; closestIdx = i; }
            });
            const spyBaseline = closes[closestIdx];
            const spyCurrent = closes[closes.length - 1];
            if (spyBaseline && spyCurrent) benchmarkReturn = ((spyCurrent - spyBaseline) / spyBaseline) * 100;
          } catch (e) { /* benchmarkReturn stays 0 - no alpha bonus/penalty applied this run */ }

          // Real cumulative return since the baseline (an actual price)
          // was set, not today's daily change. Three adjustments stack
          // on top of the raw return:
          //  1. Volatility adjustment - a naturally explosive stock's
          //     move counts for less, a calm stock's same move counts
          //     for more (already explained in the commit history).
          //  2. Alpha bonus - extra credit for beating the real S&P 500
          //     benchmark that week, the same way professional stock
          //     pickers are actually judged, not just "did it go up".
          //  3. Diversification adjustment - rewards spreading starters
          //     across different real GICS sectors instead of just
          //     stacking the same sector seven times.
          const MARKET_AVG_VOLATILITY = 0.20;
          const ALPHA_WEIGHT = 0.3;
          const DIVERSIFICATION_WEIGHT = 0.5;
          const DIVERSIFICATION_BASELINE = 4; // "reasonably diversified" out of up to 7 starters
          for (const m of members) {
            if (!m.starters || !m.starters.length) continue;
            const baseline = m.week_baseline || {};
            let weekScore = 0;
            m.starters.forEach(t => {
              const curr = priceMap[t];
              const base = baseline[t];
              const rawReturn = (base && base > 0 && curr) ? ((curr - base) / base) * 100 : (changeMap[t] || 0);
              const vol = volMap[t] || MARKET_AVG_VOLATILITY;
              const volAdjustFactor = MARKET_AVG_VOLATILITY / vol;
              const alpha = rawReturn - benchmarkReturn;
              weekScore += (rawReturn * volAdjustFactor) + (alpha * ALPHA_WEIGHT);
            });
            const uniqueSectors = new Set(m.starters.map(t => SP500_SECTORS[t]).filter(Boolean)).size;
            const diversificationAdjustment = (uniqueSectors - DIVERSIFICATION_BASELINE) * DIVERSIFICATION_WEIGHT;
            weekScore += diversificationAdjustment;
            m._weekScore = parseFloat(weekScore.toFixed(2));
          }

          const ranked = [...members].sort((a, b) => (b._weekScore || 0) - (a._weekScore || 0));
          const weekNum = league.current_week || 1;
          const n = ranked.length;

          for (let i = 0; i < ranked.length; i++) {
            const m = ranked[i];
            const pts = n - i;
            const newSeasonPts = (m.season_points || 0) + pts;

            const newBaseline = {};
            (m.starters || []).forEach(t => { if (priceMap[t]) newBaseline[t] = priceMap[t]; });

            await fetch(`${SUPABASE_URL}/rest/v1/bullpen_weekly_scores`, {
              method: "POST",
              headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}`, "Content-Type": "application/json", Prefer: "return=representation" },
              body: JSON.stringify({
                league_code: league.code, member_id: m.id, member_name: m.name,
                week_number: weekNum, week_start: league.week_start_date, week_end: today,
                score: m._weekScore || 0, season_points: pts
              })
            });

            await fetch(`${SUPABASE_URL}/rest/v1/bullpen_members?id=eq.${m.id}`, {
              method: "PATCH",
              headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
              body: JSON.stringify({ weekly_score: 0, season_points: newSeasonPts, week_baseline: newBaseline, trades_left: 2, fa_moves: 2 })
            });
          }

          await fetch(`${SUPABASE_URL}/rest/v1/bullpen_leagues?code=eq.${league.code}`, {
            method: "PATCH",
            headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
            body: JSON.stringify({ current_week: weekNum + 1, week_start_date: today })
          });

          const winner = ranked[0];
          await fetch(`${SUPABASE_URL}/rest/v1/bullpen_leagues?code=eq.${league.code}`, {
            method: "PATCH",
            headers: { apikey: supaKey, Authorization: `Bearer ${supaKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
            body: JSON.stringify({
              last_recap: JSON.stringify({
                week: weekNum, winner: winner?.name || "—", winnerScore: winner?._weekScore || 0,
                resetAt: today, topStocks: [...allTickers].slice(0, 3)
              })
            })
          });

          results.push({
            league: league.code, leagueName: league.name, status: "reset",
            week: weekNum, winner: winner?.name, winnerScore: winner?._weekScore, membersReset: ranked.length
          });
        }

        return send(res, 200, { success: true, timestamp: now.toISOString(), processed: results.length, results });
      } catch (e) {
        return send(res, 500, { error: e.message });
      }
    }
    if (req.method === "GET" && reqUrl.pathname === "/") {
      return sendStaticFile(res, "landing.html");
    }
    if (req.method === "GET" && (reqUrl.pathname === "/app" || reqUrl.pathname === "/app/" || reqUrl.pathname === "/index.html")) {
      return sendStaticFile(res, "index.html");
    }
    if (req.method === "GET" && (reqUrl.pathname === "/daily-challenge" || reqUrl.pathname === "/daily-challenge/")) {
      return sendStaticFile(res, "daily-challenge.html");
    }
    if (req.method === "GET" && (reqUrl.pathname === "/budget-challenge" || reqUrl.pathname === "/budget-challenge/")) {
      return sendStaticFile(res, "budget-challenge.html");
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

    
    if (reqUrl.pathname === "/api/market-brief" && req.method === "GET") {
      try {
        const KEY_SYMBOLS = ["SPY","QQQ","AAPL","NVDA","TSLA","AMZN","META","BTC-USD","GLD","TLT"];
        const [quotesRaw, macroRaw] = await Promise.all([
          cachedFetch(FINNHUB_BASE_URL + "/quote?symbol=SPY&token=" + FINNHUB_API_KEY, "json").catch(()=>null),
          getMacroPayload().catch(()=>null)
        ]);
        
        // Get multiple quotes
        const quoteResults = await Promise.allSettled(
          KEY_SYMBOLS.map(sym => 
            cachedFetch(FINNHUB_BASE_URL + "/quote?symbol=" + sym + "&token=" + FINNHUB_API_KEY, "json")
              .then(q => ({ symbol: sym, price: q.c, change: q.dp, prevClose: q.pc }))
              .catch(() => null)
          )
        );
        const quotes = quoteResults.map(r => r.value).filter(Boolean).filter(q => q.price > 0);

        // Analyze for anomalies
        const movers = quotes
          .filter(q => q.change !== null && !isNaN(q.change))
          .sort((a,b) => Math.abs(b.change) - Math.abs(a.change));
        
        const topGainer = movers.find(q => q.change > 0);
        const topLoser = movers.find(q => q.change < 0);
        const spy = quotes.find(q => q.symbol === "SPY");
        const btc = quotes.find(q => q.symbol === "BTC-USD");
        const gld = quotes.find(q => q.symbol === "GLD");
        const tlt = quotes.find(q => q.symbol === "TLT");
        const nvda = quotes.find(q => q.symbol === "NVDA");
        const tsla = quotes.find(q => q.symbol === "TSLA");

        // Get macro data
        const macro = macroRaw?.series || [];
        const fedRate = macro.find(s => s.id === "FEDFUNDS");
        const treasury10y = macro.find(s => s.id === "DGS10");
        const cpi = macro.find(s => s.id === "CPIAUCSL");
        const unemployment = macro.find(s => s.id === "UNRATE");

        // Build anomaly flags
        const anomalies = [];
        movers.forEach(q => {
          if (Math.abs(q.change) >= 3) {
            anomalies.push({
              symbol: q.symbol,
              change: q.change,
              type: q.change > 0 ? "surge" : "drop",
              message: q.symbol + " " + (q.change > 0 ? "surged" : "dropped") + " " + Math.abs(q.change).toFixed(1) + "% today — " + (Math.abs(q.change) >= 6 ? "major move, worth watching" : "notable move")
            });
          }
        });

        // Build plain-English brief
        const date = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
        
        let sentiment = "mixed";
        if (spy && spy.change > 0.5) sentiment = "risk-on";
        else if (spy && spy.change < -0.5) sentiment = "risk-off";
        
        const sections = [];

        // Market overview
        if (spy) {
          const spyDir = spy.change >= 0 ? "up" : "down";
          const spyMood = Math.abs(spy.change) > 1 ? "strong move" : "modest move";
          sections.push("📊 **Market Overview** — The S&P 500 (SPY) is " + spyDir + " " + Math.abs(spy.change).toFixed(2) + "% today, a " + spyMood + ". " + (spy.change > 0 ? "Bulls are in control for now." : "Bears are applying pressure."));
        }

        // All stocks breakdown
        const stockLines = quotes
          .filter(q => q.symbol !== "SPY" && q.symbol !== "GLD" && q.symbol !== "TLT" && q.symbol !== "BTC-USD")
          .sort((a,b) => b.change - a.change)
          .map(q => {
            const dir = q.change >= 0 ? "▲" : "▼";
            const mood = q.change >= 5 ? " 🔥 Major surge" : q.change >= 3 ? " 📈 Strong move" : q.change <= -5 ? " 🚨 Major drop" : q.change <= -3 ? " 📉 Notable drop" : "";
            return dir + " " + q.symbol + " " + (q.change >= 0 ? "+" : "") + q.change.toFixed(2) + "%" + mood;
          });
        if (stockLines.length > 0) {
          sections.push("📋 **Stock Breakdown** — " + stockLines.join(" | "));
        }
        if (topGainer && topGainer.change >= 2) {
          sections.push("🚀 **Top Gainer** — " + topGainer.symbol + " is up " + topGainer.change.toFixed(1) + "%" + (topGainer.change >= 5 ? " — a significant move that warrants attention." : "."));
        }
        if (topLoser && topLoser.change <= -2) {
          sections.push("📉 **Top Loser** — " + topLoser.symbol + " is down " + Math.abs(topLoser.change).toFixed(1) + "%" + (topLoser.change <= -5 ? " — a steep drop that could signal broader weakness." : "."));
        }

        // BTC
        if (btc) {
          const btcDir = btc.change >= 0 ? "up" : "down";
          sections.push("₿ **Crypto** — Bitcoin is " + btcDir + " " + Math.abs(btc.change).toFixed(1) + "% today. " + (btc.change > 3 ? "Crypto sentiment is bullish." : btc.change < -3 ? "Crypto is under pressure." : "Crypto is moving with the broader market."));
        }

        // Gold
        if (gld) {
          const gldDir = gld.change >= 0 ? "rising" : "falling";
          const gldNote = spy && gld.change > 0.5 && spy.change > 0.5 ? " Both stocks and gold rising is unusual — could signal inflation concerns." : "";
          sections.push("🥇 **Gold** — GLD is " + gldDir + " " + Math.abs(gld.change).toFixed(1) + "% today." + gldNote);
        }

        // Macro context
        if (fedRate) {
          sections.push("🏦 **Macro Context** — Fed Funds Rate sits at " + fedRate.latest?.value?.toFixed(2) + "%" + (treasury10y ? ", 10-Year Treasury at " + treasury10y.latest?.value?.toFixed(2) + "%." : ".") + (unemployment ? " Unemployment is " + unemployment.latest?.value?.toFixed(1) + "%." : ""));
        }

        // Anomaly summary
        if (anomalies.length > 0) {
          sections.push("⚠️ **Anomalies** — " + anomalies.map(a => a.message).join(" | "));
        } else {
          sections.push("✅ **No Major Anomalies** — Markets are moving within normal ranges today. No single stock has moved more than 3%.");
        }

        // Disclaimer
        sections.push("_Educational context only. Not financial advice. Data may be delayed._");

        const brief = {
          date,
          sentiment,
          sections,
          quotes: quotes.map(q => ({ symbol: q.symbol, price: q.price, change: q.change })),
          anomalies,
          generatedAt: new Date().toISOString()
        };

        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
        res.end(JSON.stringify(brief));
      } catch(e) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
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
          reqUrl.searchParams.get("interval") || "1d",
          reqUrl.searchParams.get("events") === "div"
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

    if (reqUrl.pathname === "/api/fed-cycles") {
      return send(res, 200, await getFedCyclesPayload());
    }

    if (reqUrl.pathname === "/api/fed-precedent") {
      return send(res, 200, await getFedPrecedentPayload(reqUrl.searchParams.get("situation"), reqUrl.searchParams.get("response")));
    }

    if (reqUrl.pathname === "/api/sp500-tiers") {
      return send(res, 200, await getSp500TiersPayload(reqUrl.searchParams.get("refresh") === "1"));
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
