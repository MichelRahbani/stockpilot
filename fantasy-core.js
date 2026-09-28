/* StockPilot Classroom - shared fantasy scoring and roster-move logic.
   One copy of the math, used by the student hub, the teacher standings, and
   every roster move, so the numbers can never disagree between screens.

   Accounting model (fantasy dollars):
   - Each pick has a cost basis (draft_prices) and an entry price (draft_real_prices).
   - Position value = cost basis * (price now / entry price).
   - cash = budget - sum(cost basis of current picks) + realized_pnl
     (dropping or trading a stock banks its gain/loss into realized_pnl).
   - Total value = sum(position values) + cash.
   - Score = portfolio return % + alpha points + diversification points.
   Every move settles at the market value of the moment, so a move never
   changes a roster's total value on its own. Only what happens afterward does. */
(function(root){
const FC = {};
FC.SECTORS = {"MMM":"Industrials","AOS":"Industrials","ABT":"Health Care","ABBV":"Health Care","ACN":"Information Technology","ADBE":"Information Technology","AMD":"Information Technology","AES":"Utilities","AFL":"Financials","A":"Health Care","APD":"Materials","ABNB":"Consumer Discretionary","AKAM":"Information Technology","ALB":"Materials","ARE":"Real Estate","ALGN":"Health Care","ALLE":"Industrials","LNT":"Utilities","ALL":"Financials","GOOGL":"Communication Services","GOOG":"Communication Services","MO":"Consumer Staples","AMZN":"Consumer Discretionary","AMCR":"Materials","AEE":"Utilities","AEP":"Utilities","AXP":"Financials","AIG":"Financials","AMT":"Real Estate","AWK":"Utilities","AMP":"Financials","AME":"Industrials","AMGN":"Health Care","APH":"Information Technology","ADI":"Information Technology","AON":"Financials","APA":"Energy","APO":"Financials","AAPL":"Information Technology","AMAT":"Information Technology","APP":"Communication Services","APTV":"Consumer Discretionary","ACGL":"Financials","ADM":"Consumer Staples","ARES":"Financials","ANET":"Information Technology","AJG":"Financials","AIZ":"Financials","T":"Communication Services","ATO":"Utilities","ADSK":"Information Technology","ADP":"Industrials","AZO":"Consumer Discretionary","AVY":"Materials","AXON":"Industrials","BKR":"Energy","BALL":"Materials","BAC":"Financials","BAX":"Health Care","BDX":"Health Care","BRK.B":"Financials","BBY":"Consumer Discretionary","TECH":"Health Care","BIIB":"Health Care","BLK":"Financials","BX":"Financials","XYZ":"Financials","BNY":"Financials","BA":"Industrials","BKNG":"Consumer Discretionary","BSX":"Health Care","BMY":"Health Care","AVGO":"Information Technology","BR":"Industrials","BRO":"Financials","BF.B":"Consumer Staples","BLDR":"Industrials","BG":"Consumer Staples","BXP":"Real Estate","CHRW":"Industrials","CDNS":"Information Technology","CPT":"Real Estate","COF":"Financials","CAH":"Health Care","CCL":"Consumer Discretionary","CARR":"Industrials","CVNA":"Consumer Discretionary","CASY":"Consumer Staples","CAT":"Industrials","CBOE":"Financials","CBRE":"Real Estate","CDW":"Information Technology","COR":"Health Care","CNC":"Health Care","CNP":"Utilities","CF":"Materials","CRL":"Health Care","SCHW":"Financials","CHTR":"Communication Services","CVX":"Energy","CMG":"Consumer Discretionary","CB":"Financials","CHD":"Consumer Staples","CIEN":"Information Technology","CI":"Health Care","CINF":"Financials","CTAS":"Industrials","CSCO":"Information Technology","C":"Financials","CFG":"Financials","CLX":"Consumer Staples","CME":"Financials","CMS":"Utilities","KO":"Consumer Staples","CTSH":"Information Technology","COHR":"Information Technology","COIN":"Financials","CL":"Consumer Staples","CMCSA":"Communication Services","FIX":"Industrials","COP":"Energy","ED":"Utilities","STZ":"Consumer Staples","CEG":"Utilities","COO":"Health Care","CPRT":"Industrials","GLW":"Information Technology","CPAY":"Financials","CTVA":"Materials","CSGP":"Real Estate","COST":"Consumer Staples","CRH":"Materials","CRWD":"Information Technology","CCI":"Real Estate","CSX":"Industrials","CMI":"Industrials","CVS":"Health Care","DHR":"Health Care","DRI":"Consumer Discretionary","DDOG":"Information Technology","DVA":"Health Care","DECK":"Consumer Discretionary","DE":"Industrials","DELL":"Information Technology","DAL":"Industrials","DVN":"Energy","DXCM":"Health Care","FANG":"Energy","DLR":"Real Estate","DG":"Consumer Staples","DLTR":"Consumer Staples","D":"Utilities","DPZ":"Consumer Discretionary","DASH":"Consumer Discretionary","DOV":"Industrials","DOW":"Materials","DHI":"Consumer Discretionary","DTE":"Utilities","DUK":"Utilities","DD":"Industrials","ETN":"Industrials","EBAY":"Consumer Discretionary","ECHO":"Communication Services","ECL":"Materials","EIX":"Utilities","EW":"Health Care","ELV":"Health Care","EME":"Industrials","EMR":"Industrials","ETR":"Utilities","EOG":"Energy","EQT":"Energy","EFX":"Industrials","EQIX":"Real Estate","ERIE":"Financials","ESS":"Real Estate","EL":"Consumer Staples","EG":"Financials","EVRG":"Utilities","ES":"Utilities","EXC":"Utilities","EXE":"Energy","EXPE":"Consumer Discretionary","EXPD":"Industrials","EXR":"Real Estate","XOM":"Energy","FFIV":"Information Technology","FDS":"Financials","FICO":"Information Technology","FAST":"Industrials","FRT":"Real Estate","FDX":"Industrials","FDXF":"Industrials","FERG":"Industrials","FIS":"Financials","FITB":"Financials","FSLR":"Information Technology","FE":"Utilities","FISV":"Financials","FLEX":"Information Technology","F":"Consumer Discretionary","FTNT":"Information Technology","FTV":"Industrials","FOXA":"Communication Services","FOX":"Communication Services","BEN":"Financials","FCX":"Materials","GRMN":"Consumer Discretionary","IT":"Information Technology","GE":"Industrials","GEHC":"Health Care","GEV":"Industrials","GEN":"Information Technology","GNRC":"Industrials","GD":"Industrials","GIS":"Consumer Staples","GM":"Consumer Discretionary","GPC":"Consumer Discretionary","GILD":"Health Care","GPN":"Financials","GL":"Financials","GDDY":"Information Technology","GS":"Financials","HAL":"Energy","HIG":"Financials","HAS":"Consumer Discretionary","HCA":"Health Care","DOC":"Real Estate","HSIC":"Health Care","HSY":"Consumer Staples","HPE":"Information Technology","HLT":"Consumer Discretionary","HD":"Consumer Discretionary","HONA":"Industrials","HON":"Industrials","HRL":"Consumer Staples","HST":"Real Estate","HWM":"Industrials","HPQ":"Information Technology","HUBB":"Industrials","HUM":"Health Care","HBAN":"Financials","HII":"Industrials","IBM":"Information Technology","IEX":"Industrials","IDXX":"Health Care","ITW":"Industrials","INCY":"Health Care","IR":"Industrials","PODD":"Health Care","INTC":"Information Technology","IBKR":"Financials","ICE":"Financials","IFF":"Materials","IP":"Materials","INTU":"Information Technology","ISRG":"Health Care","IVZ":"Financials","INVH":"Real Estate","IQV":"Health Care","IRM":"Real Estate","JBHT":"Industrials","JBL":"Information Technology","JKHY":"Financials","J":"Industrials","JNJ":"Health Care","JCI":"Industrials","JPM":"Financials","KVUE":"Consumer Staples","KDP":"Consumer Staples","KEY":"Financials","KEYS":"Information Technology","KMB":"Consumer Staples","KIM":"Real Estate","KMI":"Energy","KKR":"Financials","KLAC":"Information Technology","KHC":"Consumer Staples","KR":"Consumer Staples","LHX":"Industrials","LH":"Health Care","LRCX":"Information Technology","LVS":"Consumer Discretionary","LDOS":"Industrials","LEN":"Consumer Discretionary","LII":"Industrials","LLY":"Health Care","LIN":"Materials","LYV":"Communication Services","LMT":"Industrials","L":"Financials","LOW":"Consumer Discretionary","LULU":"Consumer Discretionary","LITE":"Information Technology","LYB":"Materials","MTB":"Financials","MPC":"Energy","MAR":"Consumer Discretionary","MRSH":"Financials","MLM":"Materials","MRVL":"Information Technology","MAS":"Industrials","MA":"Financials","MKC":"Consumer Staples","MCD":"Consumer Discretionary","MCK":"Health Care","MDT":"Health Care","MRK":"Health Care","META":"Communication Services","MET":"Financials","MTD":"Health Care","MGM":"Consumer Discretionary","MCHP":"Information Technology","MU":"Information Technology","MSFT":"Information Technology","MAA":"Real Estate","MRNA":"Health Care","TAP":"Consumer Staples","MDLZ":"Consumer Staples","MPWR":"Information Technology","MNST":"Consumer Staples","MCO":"Financials","MS":"Financials","MOS":"Materials","MSI":"Information Technology","MSCI":"Financials","NDAQ":"Financials","NTAP":"Information Technology","NFLX":"Communication Services","NEM":"Materials","NWSA":"Communication Services","NWS":"Communication Services","NEE":"Utilities","NKE":"Consumer Discretionary","NI":"Utilities","NDSN":"Industrials","NSC":"Industrials","NTRS":"Financials","NOC":"Industrials","NCLH":"Consumer Discretionary","NRG":"Utilities","NUE":"Materials","NVDA":"Information Technology","NVR":"Consumer Discretionary","NXPI":"Information Technology","ORLY":"Consumer Discretionary","OXY":"Energy","ODFL":"Industrials","OMC":"Communication Services","ON":"Information Technology","OKE":"Energy","ORCL":"Information Technology","OTIS":"Industrials","PCAR":"Industrials","PKG":"Materials","PLTR":"Information Technology","PANW":"Information Technology","PSKY":"Communication Services","PH":"Industrials","PAYX":"Industrials","PYPL":"Financials","PNR":"Industrials","PEP":"Consumer Staples","PFE":"Health Care","PCG":"Utilities","PM":"Consumer Staples","PSX":"Energy","PNW":"Utilities","PNC":"Financials","PPG":"Materials","PPL":"Utilities","PFG":"Financials","PG":"Consumer Staples","PGR":"Financials","PLD":"Real Estate","PRU":"Financials","PEG":"Utilities","PTC":"Information Technology","PSA":"Real Estate","PHM":"Consumer Discretionary","PWR":"Industrials","QCOM":"Information Technology","DGX":"Health Care","Q":"Information Technology","RL":"Consumer Discretionary","RJF":"Financials","RDDT":"Communication Services","RTX":"Industrials","O":"Real Estate","REG":"Real Estate","REGN":"Health Care","RF":"Financials","RSG":"Industrials","RMD":"Health Care","RVTY":"Health Care","HOOD":"Financials","ROK":"Industrials","ROL":"Industrials","ROP":"Information Technology","ROST":"Consumer Discretionary","RCL":"Consumer Discretionary","SPGI":"Financials","CRM":"Information Technology","SNDK":"Information Technology","SBAC":"Real Estate","SLB":"Energy","STX":"Information Technology","SRE":"Utilities","NOW":"Information Technology","SHW":"Materials","SPG":"Real Estate","SWKS":"Information Technology","SJM":"Consumer Staples","SW":"Materials","SNA":"Industrials","SOLV":"Health Care","SO":"Utilities","LUV":"Industrials","SWK":"Industrials","SBUX":"Consumer Discretionary","STT":"Financials","STLD":"Materials","STE":"Health Care","SYK":"Health Care","SMCI":"Information Technology","SYF":"Financials","SNPS":"Information Technology","SYY":"Consumer Staples","TMUS":"Communication Services","TROW":"Financials","TTWO":"Communication Services","TPR":"Consumer Discretionary","TRGP":"Energy","TGT":"Consumer Staples","TEL":"Information Technology","TDY":"Information Technology","TER":"Information Technology","TSLA":"Consumer Discretionary","TXN":"Information Technology","TPL":"Energy","TXT":"Industrials","TMO":"Health Care","TJX":"Consumer Discretionary","TKO":"Communication Services","TTD":"Communication Services","TSCO":"Consumer Discretionary","TT":"Industrials","TDG":"Industrials","TRV":"Financials","TRMB":"Information Technology","TFC":"Financials","TYL":"Information Technology","TSN":"Consumer Staples","USB":"Financials","UBER":"Industrials","UDR":"Real Estate","ULTA":"Consumer Discretionary","UNP":"Industrials","UAL":"Industrials","UPS":"Industrials","URI":"Industrials","UNH":"Health Care","UHS":"Health Care","VLO":"Energy","VEEV":"Health Care","VTR":"Real Estate","VLTO":"Industrials","VRSN":"Information Technology","VRSK":"Industrials","VZ":"Communication Services","VRTX":"Health Care","VRT":"Industrials","VTRS":"Health Care","VICI":"Real Estate","V":"Financials","VST":"Utilities","VMRK":"Real Estate","VMC":"Materials","WRB":"Financials","GWW":"Industrials","WAB":"Industrials","WMT":"Consumer Staples","DIS":"Communication Services","WBD":"Communication Services","WM":"Industrials","WAT":"Health Care","WEC":"Utilities","WFC":"Financials","WELL":"Real Estate","WST":"Health Care","WDC":"Information Technology","WY":"Real Estate","WSM":"Consumer Discretionary","WMB":"Energy","WTW":"Financials","WDAY":"Information Technology","WYNN":"Consumer Discretionary","XEL":"Utilities","XYL":"Industrials","YUM":"Consumer Discretionary","ZBRA":"Information Technology","ZBH":"Health Care","ZTS":"Health Care"};
FC.ALPHA_WEIGHT = 0.3;
FC.DIV_WEIGHT = 0.5;
FC.divBaseline = league => Math.max(1, Math.round((league.starters_count || 7) * 4 / 7));

FC.picksOf = r => [...(r.starters || []), ...(r.bench || [])];
FC.paidOf = (r, t) => (r.draft_prices || {})[t] || 0;
FC.entryOf = (r, t) => (r.draft_real_prices || {})[t];
FC.investedOf = r => FC.picksOf(r).reduce((s, t) => s + FC.paidOf(r, t), 0);
FC.cashOf = (r, league) => (league.budget || 100) - FC.investedOf(r) + (r.realized_pnl || 0);

FC.posValue = (r, t, ctx) => {
  const paid = FC.paidOf(r, t), e = FC.entryOf(r, t), now = ctx.priceMap[t];
  return (paid && e && now != null) ? paid * now / e : paid;
};
FC.entrySpy = (r, t, ctx) => {
  const v = (r.entry_benchmark || {})[t];
  return v != null ? v : (ctx.spyEst != null ? ctx.spyEst : null);
};
// Alpha points one position has earned: weight * (share of budget) * (stock return - S&P return over the same holding period)
FC.posAlphaPts = (r, t, league, ctx) => {
  const paid = FC.paidOf(r, t), e = FC.entryOf(r, t), now = ctx.priceMap[t];
  const spyThen = FC.entrySpy(r, t, ctx);
  if (!paid || !e || now == null || !spyThen || !ctx.spyNow) return null;
  const ret = (now / e - 1) * 100, bench = (ctx.spyNow / spyThen - 1) * 100;
  return FC.ALPHA_WEIGHT * (paid / (league.budget || 100)) * (ret - bench);
};

FC.score = (r, league, ctx) => {
  const budget = league.budget || 100;
  const picks = FC.picksOf(r);
  let valueNow = 0, alphaPts = r.realized_alpha || 0;
  const rows = picks.map(t => {
    const paid = FC.paidOf(r, t), e = FC.entryOf(r, t), now = ctx.priceMap[t];
    const value = FC.posValue(r, t, ctx);
    valueNow += value;
    const ret = (paid && e && now != null) ? (now / e - 1) * 100 : null;
    const spyThen = FC.entrySpy(r, t, ctx);
    const bench = (spyThen && ctx.spyNow) ? (ctx.spyNow / spyThen - 1) * 100 : null;
    const aPts = FC.posAlphaPts(r, t, league, ctx);
    if (aPts != null) alphaPts += aPts;
    return { t, slot: (r.starters || []).includes(t) ? 'Starter' : 'Bench', paid, value, ret, bench, alpha: (ret != null && bench != null) ? ret - bench : null, aPts };
  });
  const cash = FC.cashOf(r, league);
  const total = valueNow + cash;
  const retPct = (total - budget) / budget * 100;
  const sectors = new Set((r.starters || []).map(t => FC.SECTORS[t]).filter(Boolean));
  const baseline = FC.divBaseline(league);
  const divPts = (r.starters || []).length ? (sectors.size - baseline) * FC.DIV_WEIGHT : 0;
  return { rows, cash, total, retPct, alphaPts, uniqueSectors: sectors.size, sectorList: [...sectors], baseline, divPts, score: retPct + alphaPts + divPts };
};
FC.rank = (rosters, league, ctxFor) => rosters.map(r => ({ r, s: FC.score(r, league, ctxFor(r)) })).sort((a, b) => b.s.score - a.s.score);

// ---------- roster moves (pure: return {error} or {fields, log}) ----------
FC.weekKey = d => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x.toISOString().slice(0, 10); };
// Only free agents and trades count toward the weekly limit; reshuffling starters and bench is free.
FC.movesThisWeek = (r, now) => (r.moves_log || []).filter(m => m.type !== 'swap' && FC.weekKey(m.at) === FC.weekKey(now || new Date())).length;
FC.movesLeft = (r, league, now) => Math.max(0, (league.weekly_move_limit == null ? 3 : league.weekly_move_limit) - FC.movesThisWeek(r, now));
FC.canMove = (r, league, kind, now) => {
  if (league.moves_open === false) return { error: 'Your teacher has closed roster moves for now.' };
  if (kind !== 'swap' && FC.movesLeft(r, league, now) <= 0) return { error: 'You have used all ' + (league.weekly_move_limit == null ? 3 : league.weekly_move_limit) + ' moves for this week.' };
  return { ok: true };
};
FC.withLog = (r, entry) => [...(r.moves_log || []), Object.assign({ at: new Date().toISOString() }, entry)];

FC.swapBenchStarter = (r, starterT, benchT) => {
  const s = [...(r.starters || [])], b = [...(r.bench || [])];
  const si = s.indexOf(starterT), bi = b.indexOf(benchT);
  if (si < 0 || bi < 0) return { error: 'Pick one starter and one bench player to swap.' };
  s[si] = benchT; b[bi] = starterT;
  return { fields: { starters: s, bench: b, moves_log: FC.withLog(r, { type: 'swap', in: benchT, out: starterT }) } };
};

// Core replace: take outT off the roster (banking its gain/loss and alpha), put inT in at inPaid dollars.
// outT may be null to fill an empty slot.
FC.replace = (r, league, ctx, outT, inT, inPaid) => {
  const budget = league.budget || 100;
  if (FC.picksOf(r).includes(inT)) return { error: inT + ' is already on your roster.' };
  const nowIn = ctx.priceMap[inT];
  if (nowIn == null) return { error: 'No live price for ' + inT + ' right now, try again in a moment.' };
  const starters = [...(r.starters || [])], bench = [...(r.bench || [])];
  const dp = Object.assign({}, r.draft_prices), dr = Object.assign({}, r.draft_real_prices), eb = Object.assign({}, r.entry_benchmark);
  let pnl = r.realized_pnl || 0, ra = r.realized_alpha || 0;
  let where = null, idx = -1;
  if (outT) {
    if (FC.picksOf(r).indexOf(outT) < 0) return { error: outT + ' is not on your roster.' };
    const paid = FC.paidOf(r, outT);
    pnl += FC.posValue(r, outT, ctx) - paid;
    const a = FC.posAlphaPts(r, outT, league, ctx);
    if (a != null) ra += a;
    idx = starters.indexOf(outT); where = idx >= 0 ? 'starters' : 'bench';
    if (idx < 0) idx = bench.indexOf(outT);
    delete dp[outT]; delete dr[outT]; delete eb[outT];
  } else {
    if (starters.length < (league.starters_count || 7)) where = 'starters';
    else if (bench.length < (league.bench_count || 0)) where = 'bench';
    else return { error: 'Your roster is full. Choose a player to drop.' };
  }
  const investedAfter = Object.values(dp).reduce((s, v) => s + v, 0);
  const cashAfter = budget - investedAfter + pnl - inPaid;
  if (cashAfter < -1e-9) return { error: 'Not enough budget for that move (you would be $' + (-cashAfter).toFixed(2) + ' short).' };
  dp[inT] = inPaid; dr[inT] = nowIn; if (ctx.spyNow) eb[inT] = ctx.spyNow;
  const list = where === 'starters' ? starters : bench;
  if (idx >= 0) list[idx] = inT; else list.push(inT);
  return { fields: { starters, bench, draft_prices: dp, draft_real_prices: dr, entry_benchmark: eb, realized_pnl: pnl, realized_alpha: ra } };
};

FC.freeAgent = (r, league, ctx, dropT, addT, tierCost) => {
  const res = FC.replace(r, league, ctx, dropT, addT, tierCost);
  if (res.error) return res;
  res.fields.moves_log = FC.withLog(r, { type: 'fa', dropped: dropT || null, added: addT, cost: tierCost });
  return res;
};

// Trade settles at current market value; any value difference comes out of (or goes into) each side's cash.
FC.trade = (rA, rB, league, ctx, giveT, getT) => {
  if (!FC.picksOf(rA).includes(giveT)) return { error: 'The proposer no longer has ' + giveT + '.' };
  if (!FC.picksOf(rB).includes(getT)) return { error: 'The other student no longer has ' + getT + '.' };
  const vGive = FC.posValue(rA, giveT, ctx), vGet = FC.posValue(rB, getT, ctx);
  const a = FC.replace(rA, league, ctx, giveT, getT, vGet);
  if (a.error) return { error: 'Trade fails for the proposer: ' + a.error };
  const b = FC.replace(rB, league, ctx, getT, giveT, vGive);
  if (b.error) return { error: 'Trade fails for the receiver: ' + b.error };
  a.fields.moves_log = FC.withLog(rA, { type: 'trade', gave: giveT, got: getT });
  b.fields.moves_log = FC.withLog(rB, { type: 'trade', gave: getT, got: giveT });
  return { a: a.fields, b: b.fields, vGive, vGet };
};

// ---------- live market data (browser) ----------
FC.loadMarket = async (backend, rosters, extra) => {
  const tickers = new Set(['SPY'].concat(extra || []));
  rosters.forEach(r => FC.picksOf(r).forEach(t => tickers.add(t)));
  const priceMap = {};
  try {
    const res = await fetch(backend + '/api/quotes?symbols=' + Array.from(tickers).join(','));
    const d = await res.json();
    ((d && d.quoteResponse && d.quoteResponse.result) || []).forEach(q => { priceMap[q.symbol] = q.regularMarketPrice; });
  } catch (e) {}
  const spyEst = {};
  const needs = rosters.filter(r => !(r.entry_benchmark && Object.keys(r.entry_benchmark).length));
  if (needs.length) {
    try {
      const res = await fetch(backend + '/api/history?symbol=SPY&range=1y&interval=1d');
      const d = await res.json();
      const x = d && d.chart && d.chart.result && d.chart.result[0];
      const ts = (x && x.timestamp) || [], cl = (x && x.indicators.quote[0].close) || [];
      needs.forEach(r => {
        const target = new Date(r.submitted_at || r.created_at).getTime() / 1000;
        let best = null, bd = Infinity;
        ts.forEach((t, i) => { if (cl[i] != null && Math.abs(t - target) < bd) { bd = Math.abs(t - target); best = cl[i]; } });
        if (best != null) spyEst[r.id] = best;
      });
    } catch (e) {}
  }
  return { priceMap, spyNow: priceMap.SPY != null ? priceMap.SPY : null, spyEst };
};
FC.ctxFor = (market, r) => ({ priceMap: market.priceMap, spyNow: market.spyNow, spyEst: market.spyEst[r.id] != null ? market.spyEst[r.id] : null });

root.FantasyCore = FC;
if (typeof module !== 'undefined' && module.exports) module.exports = FC;
})(typeof window !== 'undefined' ? window : globalThis);
