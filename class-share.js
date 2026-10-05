"use strict";
/*
 * Class-share tickers. The S&P 500 includes two with a dot in the name (BRK.B and
 * BF.B). The games spell them that way, but the data providers want a dash
 * (BRK-B, BF-B). Without this, history requests for them fail outright (502) and
 * BF.B quotes can come back empty.
 *
 * This is an explicit two-entry table on purpose. A general "dot becomes dash"
 * rule would break London tickers like BP.L and other exchange suffixes.
 */
const CLASS_SHARE_ALIASES = { "BRK.B": "BRK-B", "BF.B": "BF-B" };

// The spelling to send to a data provider. Everything else passes through unchanged.
const providerSymbol = (symbol) => CLASS_SHARE_ALIASES[symbol] || symbol;

// After the normal quote lookup, retry only the aliased symbols that came back empty,
// and label any result with the symbol that was originally asked for.
const rescueQuotes = async (requested, quoteMap, { fetchYahooChartQuote, getFinnhubQuoteMap }) => {
  const empty = (s) => !(quoteMap[s] && Object.keys(quoteMap[s]).length > 1);
  const needed = requested.filter((s) => CLASS_SHARE_ALIASES[s] && empty(s));
  await Promise.all(needed.map(async (s) => {
    const alt = CLASS_SHARE_ALIASES[s];
    try {
      const q = await fetchYahooChartQuote(alt);
      if (q) { quoteMap[s] = { ...q, symbol: s }; return; }
    } catch (e) { /* fall through to the second provider */ }
    try {
      const fh = await getFinnhubQuoteMap([alt]);
      if (fh && fh[alt]) quoteMap[s] = { ...(quoteMap[s] || {}), ...fh[alt], symbol: s };
    } catch (e) { /* leave it empty; same as before this existed */ }
  }));
};

module.exports = { CLASS_SHARE_ALIASES, providerSymbol, rescueQuotes };
