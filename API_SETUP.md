# StockPilot API Setup

StockPilot has a local API gateway. The website can still open as a plain `index.html` file, but real market, macro, news, and filing requests should go through the gateway when possible.

The gateway keeps provider keys out of the browser. The app checks `http://127.0.0.1:8787/health` and then routes supported requests through the gateway automatically.

## Optional Provider Keys

Create a `.env` file next to `server.js` if you want keyed provider enrichment:

```text
FINNHUB_API_KEY=your_finnhub_key_here
SEC_USER_AGENT=StockPilot your-email@example.com
CACHE_TTL_MS=60000
PORT=8787
```

What each source does:

- Yahoo public endpoints: quotes, search, and daily price history fallback.
- Finnhub, optional key: quote/profile/metric enrichment from a real data API.
- SEC EDGAR: official public company filing facts for supported US companies.
- FRED: official public macro series for rates, inflation, unemployment, and mortgages.
- Public RSS feeds: finance headlines and links to original articles.

Important: SEC requests require a real User-Agent with contact info. Replace `your-email@example.com` before relying on SEC data.

## Start The API

Double-click:

```text
start-stockpilot-api.command
```

Or run:

```bash
node server.js
```

The gateway runs at:

```text
http://127.0.0.1:8787
```

## What It Does

- Keeps API keys out of the browser.
- Adds endpoints for quotes, price history, search, RSS news, portfolio data, SEC filing facts, provider status, and FRED macro context.
- Adds CORS headers so the local `index.html` app can talk to it.
- Caches provider responses briefly to reduce repeated calls.
- Falls back safely: if the gateway is off, the app uses the existing browser data path.

## Current Endpoints

```text
/health
/api/status
/api/quotes?symbols=AAPL,NVDA
/api/history?symbol=AAPL&range=1y&interval=1d
/api/search?q=Apple
/api/news/rss?url=...
/api/portfolio?symbols=AAPL,NVDA,BND
/api/macro
/api/sec/company?symbol=AAPL
```

## Data Note

The gateway uses public market endpoints, optional keyed quote enrichment, SEC public filing facts, RSS feeds, and FRED public CSV series. These can be delayed, incomplete, revised, rate-limited, or blocked by providers. For a production version, connect licensed providers for fundamentals, filings, and real-time data.
