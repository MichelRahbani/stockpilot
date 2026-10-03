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
FC.SECTORS = {"MSGS": "Team Ownership", "MSGE": "Team Ownership", "BATRA": "Team Ownership", "BATRK": "Team Ownership", "MANU": "Team Ownership", "TKO": "Team Ownership", "FWONK": "Team Ownership", "FWONA": "Team Ownership", "RCI": "Team Ownership", "BVB.DE": "Team Ownership", "JUVE.MI": "Team Ownership", "SSL.MI": "Team Ownership", "AJAX.AS": "Team Ownership", "NKE": "Apparel & Footwear", "LULU": "Apparel & Footwear", "DECK": "Apparel & Footwear", "ONON": "Apparel & Footwear", "COLM": "Apparel & Footwear", "UAA": "Apparel & Footwear", "UA": "Apparel & Footwear", "CROX": "Apparel & Footwear", "WWW": "Apparel & Footwear", "GIII": "Apparel & Footwear", "PUM.DE": "Apparel & Footwear", "ADDYY": "Apparel & Footwear", "2020.HK": "Apparel & Footwear", "1368.HK": "Apparel & Footwear", "1361.HK": "Apparel & Footwear", "7936.T": "Apparel & Footwear", "DKS": "Equipment & Retail", "ASO": "Equipment & Retail", "YETI": "Equipment & Retail", "JOUT": "Equipment & Retail", "CLAR": "Equipment & Retail", "ESCA": "Equipment & Retail", "MTN": "Equipment & Retail", "7309.T": "Equipment & Retail", "9921.TW": "Equipment & Retail", "9914.TW": "Equipment & Retail", "8022.T": "Equipment & Retail", "BC": "Boats & Powersports", "MCFT": "Boats & Powersports", "PII": "Boats & Powersports", "MBUU": "Boats & Powersports", "HZO": "Boats & Powersports", "7272.T": "Boats & Powersports", "DKNG": "Betting & Sports Data", "FLUT": "Betting & Sports Data", "PENN": "Betting & Sports Data", "RSI": "Betting & Sports Data", "GENI": "Betting & Sports Data", "SRAD": "Betting & Sports Data", "BALY": "Betting & Sports Data", "LNW": "Betting & Sports Data", "FOXA": "Sports Media", "FOX": "Sports Media", "PARA": "Sports Media", "WBD": "Sports Media", "CMCSA": "Sports Media", "SIRI": "Sports Media", "LYV": "Sports Media", "PTON": "Fitness", "PLNT": "Fitness", "XPOF": "Fitness", "LTH": "Fitness", "GAME": "Esports & Gaming", "RBLX": "Esports & Gaming", "EA": "Esports & Gaming", "TTWO": "Esports & Gaming"};
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


FC.TICKERS = ["PENN", "JOUT", "HZO", "1361.HK", "FWONA",  "LULU", "XPOF", "7309.T", "GENI", "TTWO", "ONON", "GAME", "CMCSA", "WBD", "BATRK", "RBLX", "MSGE", "BC", "UAA", "PUM.DE", "8022.T", "BATRA", "PARA", "MTN", "UA", "CROX", "TKO", "RCI", "MBUU", "YETI", "MANU", "ADDYY", "AJAX.AS", "CLAR", "LYV", "7936.T", "DKNG", "FLUT", "PII", "FOX", "MCFT", "PTON", "MSGS", "JUVE.MI", "COLM", "EA", "WWW", "LNW", "DKS", "BVB.DE", "1368.HK", "SRAD", "ESCA", "SSL.MI", "9921.TW", "FWONK", "LTH", "FOXA", "7272.T", "9914.TW", "RSI", "BALY", "NKE", "2020.HK", "DECK", "ASO", "SIRI", "PLNT", "GIII"];

// Draft prices aren't static - they're computed from each stock's real
// market cap RANKED WITHIN THIS UNIVERSE, so "the biggest name in sports
// stocks" costs the most, same $18/$14/$10/$6/$3 tier ladder used
// elsewhere, just priced relative to this smaller, different pool
// instead of the S&P 500.
FC.TIER_PRICES = [18, 14, 10, 6, 3];
FC.loadSportsTiers = async (backend) => {
  const prices = {};
  try {
    const res = await fetch(backend + '/api/quotes?symbols=' + FC.TICKERS.join(','));
    const data = await res.json();
    const rows = ((data && data.quoteResponse && data.quoteResponse.result) || [])
      .filter(q => q.marketCap > 0)
      .sort((a, b) => b.marketCap - a.marketCap);
    const n = rows.length;
    rows.forEach((q, i) => {
      const tier = Math.min(4, Math.floor((i / n) * 5)); // 0-4, biggest caps first
      prices[q.symbol] = { price: FC.TIER_PRICES[tier], tier: tier + 1, name: q.shortName || q.longName, marketCap: q.marketCap, quote: q.regularMarketPrice };
    });
  } catch (e) {}
  return prices;
};

root.FantasyCore = FC;
if (typeof module !== 'undefined' && module.exports) module.exports = FC;
})(typeof window !== 'undefined' ? window : globalThis);