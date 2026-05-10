const YAHOO_CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const YAHOO_SEARCH_URL = "https://query2.finance.yahoo.com/v1/finance/search";
const FRED_GRAPH_URL = "https://fred.stlouisfed.org/graph/fredgraph.csv";
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json";
const SEC_COMPANY_FACTS_BASE_URL = "https://data.sec.gov/api/xbrl/companyfacts/";

const memoryCache = new Map<string, { time: number; value: unknown }>();

const envValue = (key: string) => globalThis.Netlify?.env?.get?.(key) || "";
const cacheTtlMs = () => Number(envValue("CACHE_TTL_MS") || 60_000);
const finnhubKey = () => envValue("FINNHUB_API_KEY");
const secUserAgent = () => envValue("SEC_USER_AGENT") || "StockPilot educational app contact@example.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" }
  });

const text = (body: string, contentType = "text/plain; charset=utf-8", status = 200) =>
  new Response(body, {
    status,
    headers: { "content-type": contentType }
  });

const cleanSymbol = (symbol: string | null | undefined) => String(symbol || "").trim().toUpperCase().replace(/[^A-Z0-9.\-=]/g, "");

const finiteNumber = (value: unknown) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const cachedFetch = async (url: string, type = "json") => {
  const key = `${type}:${url}`;
  const cached = memoryCache.get(key);
  if (cached && Date.now() - cached.time < cacheTtlMs()) return cached.value;
  const response = await fetch(url, {
    headers: {
      "user-agent": url.includes("sec.gov") ? secUserAgent() : "StockPilot/0.1 hosted data gateway",
      accept: type === "json" ? "application/json,text/plain,*/*" : "application/rss+xml,text/xml,text/plain,*/*"
    }
  });
  if (!response.ok) throw new Error(`Provider returned ${response.status}`);
  const value = type === "json" ? await response.json() : await response.text();
  memoryCache.set(key, { time: Date.now(), value });
  return value;
};

const providerStatus = () => ({
  gateway: "online",
  providers: {
    yahooPublic: { configured: true, role: "Quotes, search, and daily price history fallback" },
    finnhub: { configured: Boolean(finnhubKey()), role: "Optional keyed quote/profile/metric enrichment" },
    secEdgar: { configured: Boolean(secUserAgent()), role: "Official public company filing facts" },
    fred: { configured: true, role: "Official public macroeconomic series" },
    rssNews: { configured: true, role: "Public finance headlines" }
  },
  updatedAt: new Date().toISOString()
});

const fetchFinnhubJson = async (pathName: string, params: Record<string, string>) => {
  const key = finnhubKey();
  if (!key) return null;
  const url = new URL(`${FINNHUB_BASE_URL}${pathName}`);
  Object.entries(params).forEach(([name, value]) => url.searchParams.set(name, value));
  url.searchParams.set("token", key);
  return cachedFetch(url.toString(), "json") as Promise<Record<string, any>>;
};

const getFinnhubSnapshot = async (symbol: string) => {
  if (!finnhubKey()) return null;
  const [quoteResult, profileResult, metricResult] = await Promise.allSettled([
    fetchFinnhubJson("/quote", { symbol }),
    fetchFinnhubJson("/stock/profile2", { symbol }),
    fetchFinnhubJson("/stock/metric", { symbol, metric: "all" })
  ]);
  const quote = quoteResult.status === "fulfilled" ? quoteResult.value || {} : {};
  const profile = profileResult.status === "fulfilled" ? profileResult.value || {} : {};
  const metrics = metricResult.status === "fulfilled" ? metricResult.value?.metric || {} : {};
  const price = finiteNumber(quote.c);
  if (!price && !profile.name && !Object.keys(metrics).length) return null;
  return {
    symbol,
    shortName: profile.name,
    longName: profile.name,
    sector: profile.finnhubIndustry,
    quoteType: "EQUITY",
    regularMarketPrice: price,
    regularMarketPreviousClose: finiteNumber(quote.pc),
    regularMarketChange: finiteNumber(quote.d),
    regularMarketChangePercent: finiteNumber(quote.dp),
    marketCap: finiteNumber(profile.marketCapitalization) ? Number(profile.marketCapitalization) * 1_000_000 : null,
    trailingPE: finiteNumber(metrics.peBasicExclExtraTTM) || finiteNumber(metrics.peTTM),
    forwardPE: finiteNumber(metrics.forwardPE),
    priceToSalesTrailing12Months: finiteNumber(metrics.psTTM) || finiteNumber(metrics.priceToSalesPerShareTTM),
    beta: finiteNumber(metrics.beta),
    dividendYield: finiteNumber(metrics.dividendYieldIndicatedAnnual) || finiteNumber(metrics.dividendYield5Y),
    epsTrailingTwelveMonths: finiteNumber(metrics.epsBasicExclExtraItemsTTM),
    stockPilotProvider: "Finnhub"
  };
};

const getQuotes = async (symbolsParam: string | null) => {
  const symbols = [...new Set(String(symbolsParam || "").split(",").map(cleanSymbol).filter(Boolean))].slice(0, 80);
  if (!symbols.length) return { quoteResponse: { result: [] }, stockPilotMeta: { source: "StockPilot hosted gateway", symbols } };
  const url = new URL(YAHOO_QUOTE_URL);
  url.searchParams.set("symbols", symbols.join(","));
  const warnings: string[] = [];
  let payload: any = { quoteResponse: { result: [] } };
  try {
    payload = await cachedFetch(url.toString(), "json");
  } catch (error: any) {
    warnings.push(`Yahoo quotes: ${error.message}`);
  }
  const quoteMap = (payload?.quoteResponse?.result || []).reduce((map: Record<string, any>, quote: any) => {
    map[cleanSymbol(quote.symbol)] = quote;
    return map;
  }, {});
  await Promise.all(
    symbols.map(async (symbol) => {
      const enriched = await getFinnhubSnapshot(symbol).catch((error) => {
        warnings.push(`Finnhub ${symbol}: ${error.message}`);
        return null;
      });
      quoteMap[symbol] = { ...(quoteMap[symbol] || { symbol }), ...(enriched || {}) };
    })
  );
  return {
    ...payload,
    quoteResponse: { ...(payload.quoteResponse || {}), result: symbols.map((symbol) => quoteMap[symbol]).filter(Boolean) },
    stockPilotMeta: {
      source: finnhubKey() ? "Yahoo public endpoint + Finnhub hosted enrichment" : "Yahoo public quote endpoint",
      symbols,
      updatedAt: new Date().toISOString(),
      providers: { finnhubConfigured: Boolean(finnhubKey()) },
      warnings
    }
  };
};

const getHistory = async (symbolParam: string | null, range: string | null, interval: string | null) => {
  const symbol = cleanSymbol(symbolParam);
  if (!symbol) throw new Error("Missing symbol");
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(symbol)}`);
  url.searchParams.set("range", range || "1y");
  url.searchParams.set("interval", interval || "1d");
  const payload = await cachedFetch(url.toString(), "json");
  return {
    ...(payload as Record<string, unknown>),
    stockPilotMeta: { source: "Yahoo Finance public chart endpoint", symbol, updatedAt: new Date().toISOString() }
  };
};

const getSearch = async (query: string | null) => {
  const cleanQuery = String(query || "").trim().slice(0, 80);
  if (!cleanQuery) return { quotes: [], stockPilotMeta: { source: "Yahoo Finance public search endpoint" } };
  const url = new URL(YAHOO_SEARCH_URL);
  url.searchParams.set("q", cleanQuery);
  url.searchParams.set("quotesCount", "8");
  url.searchParams.set("newsCount", "0");
  const payload = await cachedFetch(url.toString(), "json");
  return { ...(payload as Record<string, unknown>), stockPilotMeta: { source: "Yahoo Finance public search endpoint", query: cleanQuery } };
};

const FRED_SERIES: Record<string, { label: string; unit: string }> = {
  FEDFUNDS: { label: "Fed Funds Rate", unit: "%" },
  DGS10: { label: "10-Year Treasury Yield", unit: "%" },
  CPIAUCSL: { label: "CPI Index", unit: "index" },
  UNRATE: { label: "Unemployment Rate", unit: "%" },
  MORTGAGE30US: { label: "30-Year Mortgage Rate", unit: "%" }
};

const parseFredCsv = (csv: string, id: string) => {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [date, rawValue] = line.split(",");
      const value = Number(rawValue);
      return date && Number.isFinite(value) ? { date, value } : null;
    })
    .filter(Boolean) as Array<{ date: string; value: number }>;
  const latest = rows[rows.length - 1];
  const yearAgo = rows.find((row) => row.date >= new Date(Date.now() - 370 * 86400000).toISOString().slice(0, 10)) || rows[Math.max(0, rows.length - 13)];
  return { id, label: FRED_SERIES[id]?.label || id, unit: FRED_SERIES[id]?.unit || "", latest, previous: rows.at(-2) || null, yearAgo };
};

const getMacro = async () => {
  const series = await Promise.all(
    Object.keys(FRED_SERIES).map(async (id) => {
      const url = new URL(FRED_GRAPH_URL);
      url.searchParams.set("id", id);
      return parseFredCsv((await cachedFetch(url.toString(), "text")) as string, id);
    })
  );
  return { series, stockPilotMeta: { source: "FRED public CSV via Federal Reserve Bank of St. Louis", updatedAt: new Date().toISOString() } };
};

const getSecTickerMap = async () => {
  const payload = (await cachedFetch(SEC_TICKERS_URL, "json")) as Record<string, any>;
  return Object.values(payload).reduce((map: Record<string, any>, item: any) => {
    if (item?.ticker && item?.cik_str) map[cleanSymbol(item.ticker)] = { cik: String(item.cik_str).padStart(10, "0"), title: item.title };
    return map;
  }, {});
};

const latestFact = (facts: any, tag: string) => {
  const units = facts?.["us-gaap"]?.[tag]?.units || {};
  const rows = Object.values(units)
    .flat()
    .filter((item: any) => item?.form && ["10-K", "10-Q"].includes(item.form) && finiteNumber(item.val) !== null && item.end)
    .sort((a: any, b: any) => String(a.end).localeCompare(String(b.end)));
  const latest: any = rows.at(-1);
  return latest ? { value: Number(latest.val), end: latest.end, form: latest.form, filed: latest.filed } : null;
};

const getSecCompany = async (symbolParam: string | null) => {
  const symbol = cleanSymbol(symbolParam);
  if (!symbol) throw new Error("Missing symbol");
  const company = (await getSecTickerMap())[symbol];
  if (!company) throw new Error(`SEC ticker mapping not found for ${symbol}`);
  const payload = (await cachedFetch(`${SEC_COMPANY_FACTS_BASE_URL}CIK${company.cik}.json`, "json")) as any;
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
    symbol,
    cik: company.cik,
    name: company.title,
    facts,
    ratios: { roe: equity && netIncome ? (netIncome / equity) * 100 : null, debtEquity: equity && liabilities ? liabilities / equity : null },
    stockPilotMeta: { source: "SEC EDGAR companyfacts API", updatedAt: new Date().toISOString() }
  };
};

export default async (req: Request) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname;
    if (path === "/health") return json({ ok: true, name: "StockPilot Hosted API", providerStatus: providerStatus().providers, updatedAt: new Date().toISOString() });
    if (path === "/api/status") return json(providerStatus());
    if (path === "/api/quotes") return json(await getQuotes(url.searchParams.get("symbols")));
    if (path === "/api/history") return json(await getHistory(url.searchParams.get("symbol"), url.searchParams.get("range"), url.searchParams.get("interval")));
    if (path === "/api/search") return json(await getSearch(url.searchParams.get("q")));
    if (path === "/api/macro") return json(await getMacro());
    if (path === "/api/sec/company") return json(await getSecCompany(url.searchParams.get("symbol")));
    if (path === "/api/news/rss") return text((await cachedFetch(url.searchParams.get("url") || "", "text")) as string, "application/xml; charset=utf-8");
    return json({ error: "Endpoint not found" }, 404);
  } catch (error: any) {
    return json({ error: error.message, updatedAt: new Date().toISOString(), note: "Provider unavailable, delayed, blocked, or missing configuration." }, 502);
  }
};

export const config = {
  path: ["/health", "/api/*"]
};
