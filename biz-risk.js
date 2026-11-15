/* Risk maths for the Risk Lab and the Shield game. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BizRisk = factory();
})(typeof self !== "undefined" ? self : this, function () {
  // ---------- Risk register
  // r: { name, prob (% per year), cost ($ if it happens), response: accept|reduce|transfer|avoid, mitCost, premium, deductible }
  // reduce: halves the chance, costs mitCost per year. transfer: insurer pays everything above the deductible, costs premium per year.
  // avoid: chance goes to zero, and you give up giveUp dollars of profit a year.
  function analyze(r) {
    const p = Math.max(0, Math.min(100, +r.prob || 0)) / 100, cost = Math.max(0, +r.cost || 0);
    const before = p * cost;
    let after = before, spend = 0;
    if (r.response === "reduce") { after = p * 0.5 * cost; spend = +r.mitCost || 0; }
    else if (r.response === "transfer") { after = p * Math.min(cost, +r.deductible || 0); spend = +r.premium || 0; }
    else if (r.response === "avoid") { after = 0; spend = +r.giveUp || 0; }
    return { before, after, spend, net: before - after - spend, level: level(r.prob, r.cost) };
  }
  function level(prob, cost) {
    const pi = prob >= 40 ? 4 : prob >= 20 ? 3 : prob >= 10 ? 2 : prob >= 3 ? 1 : 0;       // 0..4
    const ci = cost >= 100000 ? 4 : cost >= 30000 ? 3 : cost >= 10000 ? 2 : cost >= 2000 ? 1 : 0;
    return { p: pi, c: ci, score: (pi + 1) * (ci + 1) };
  }
  function totals(list) {
    let before = 0, after = 0, spend = 0;
    list.forEach((r) => { const a = analyze(r); before += a.before; after += a.after; spend += a.spend; });
    return { before, after, spend, net: before - after - spend };
  }
  const SAMPLE = [
    { name: "Fire or flood at the shop", prob: 2, cost: 60000, response: "transfer", premium: 900, deductible: 2000, mitCost: 600, giveUp: 0 },
    { name: "Key supplier fails", prob: 15, cost: 20000, response: "reduce", premium: 0, deductible: 0, mitCost: 1200, giveUp: 0 },
    { name: "Customer data stolen", prob: 8, cost: 40000, response: "reduce", premium: 500, deductible: 5000, mitCost: 900, giveUp: 0 },
    { name: "Best employee quits", prob: 30, cost: 12000, response: "accept", premium: 0, deductible: 0, mitCost: 2500, giveUp: 0 },
    { name: "Sales drop 20% in a recession", prob: 20, cost: 25000, response: "accept", premium: 0, deductible: 0, mitCost: 1500, giveUp: 0 },
    { name: "Risky new product line", prob: 40, cost: 30000, response: "avoid", premium: 0, deductible: 0, mitCost: 0, giveUp: 8000 }
  ];

  // ---------- Stress test: 12 months of cash with shocks and protections
  // opts: { cash, revenue, costs, shocks: [{ month, kind }], protect: { insurance, backup, security, reserve } }
  const KINDS = {
    fire: { name: "Fire or flood", hit: 25000, insured: true, label: "A fire shuts the shop and wrecks stock" },
    supplier: { name: "Supplier fails", revLoss: 0.5, months: 2, backup: true, label: "Your only supplier goes bust. Sales fall while you find another" },
    cyber: { name: "Cyber attack", hit: 12000, secure: true, label: "Customer data is stolen and you pay to fix it" },
    recession: { name: "Recession", revLoss: 0.2, months: 3, label: "Customers spend 20% less for three months" },
    lawsuit: { name: "Lawsuit", hit: 10000, legal: true, label: "A customer sues. Legal bills and a settlement" }
  };
  const PRICE = { insurance: 400, backup: 300, security: 200, legal: 100, reserve: 250 };
  function simulate(o) {
    let cash = +o.cash || 0, low = cash, broke = null;
    const rows = [], p = o.protect || {};
    const loss = {};
    (o.shocks || []).forEach((s) => { const k = KINDS[s.kind]; if (!k) return; if (k.revLoss) for (let m = s.month; m < s.month + (k.months || 1); m++) loss[m] = Math.max(loss[m] || 0, k.revLoss * (k.backup && p.backup ? 0.4 : 1)); });
    for (let m = 1; m <= 12; m++) {
      let rev = (+o.revenue || 0) * (1 - (loss[m] || 0)), cost = +o.costs || 0, shock = 0;
      Object.keys(PRICE).forEach((k) => { if (p[k]) cost += PRICE[k]; });
      (o.shocks || []).forEach((s) => {
        if (s.month !== m) return; const k = KINDS[s.kind]; if (!k || !k.hit) return;
        let h = k.hit;
        if (k.insured && p.insurance) h = Math.min(h, 3000);
        if (k.secure && p.security) h = h * 0.25;
        if (k.legal && p.legal) h = Math.min(h, 2000);
        shock += h;
      });
      cash += rev - cost - shock;
      if (p.reserve && cash > 0) { /* reserve is a monthly saving that is available as cash, so it is already in the balance */ }
      low = Math.min(low, cash); if (cash < 0 && broke == null) broke = m;
      rows.push({ month: m, cash, shock });
    }
    return { rows, end: cash, low, brokeMonth: broke };
  }

  // ---------- Shield game: 8 months, same shocks for everyone with the same code
  const MONTHS = 8;
  function hash(s) { let h = 1779033703 ^ s.length; for (let k = 0; k < s.length; k++) { h = Math.imul(h ^ s.charCodeAt(k), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function rngFor(seed) { let a = hash(String(seed)); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const G = { cash: 30000, revenue: 12000, costs: 10000 };
  function plan(seed) {
    const r = rngFor(seed), keys = Object.keys(KINDS), out = [];
    for (let m = 1; m <= MONTHS; m++) { const x = r(); out.push({ month: m, kind: x < 0.5 ? null : keys[Math.floor(r() * keys.length)] }); }
    // make sure there are at least three shocks so protection matters
    let c = out.filter((e) => e.kind).length, i = 0; while (c < 3 && i < MONTHS) { if (!out[i].kind) { out[i].kind = keys[Math.floor(r() * keys.length)]; c++; } i += 2; }
    return out;
  }
  function newGame(seed) { return { seed: String(seed), plan: plan(seed), month: 1, cash: G.cash, loss: {}, history: [], over: false, broke: false }; }
  // protect: { insurance, backup, security, reserve } for this month
  function play(g, protect) {
    if (g.over) throw new Error("Game over");
    let rec_note = false;
    const p = protect || {}, ev = g.plan[g.month - 1], k = ev.kind ? KINDS[ev.kind] : null, m = g.month;
    let cost = G.costs, shock = 0;
    Object.keys(PRICE).forEach((x) => { if (p[x]) cost += PRICE[x]; });
    if (k && k.revLoss) for (let j = m; j < m + (k.months || 1); j++) g.loss[j] = Math.max(g.loss[j] || 0, k.revLoss * (k.backup && p.backup ? 0.4 : 1));
    if (k && k.hit) { shock = k.hit; if (k.insured && p.insurance) shock = Math.min(shock, 3000); if (k.secure && p.security) shock = shock * 0.25; if (k.legal && p.legal) shock = Math.min(shock, 2000); }
    const rev = G.revenue * (1 - (g.loss[m] || 0));
    const profit = rev - cost - shock;
    g.cash += profit;
    if (g.cash < 0 && p.reserve && !g.usedReserve) { g.usedReserve = true; g.cash += 7200; rec_note = true; }
    const rec = { reserveUsed: !!rec_note, month: m, event: k ? Object.assign({ id: ev.kind }, k) : null, protect: Object.assign({}, p), revenue: rev, cost, shock, profit, cash: g.cash };
    g.history.push(rec);
    if (g.cash < 0) { g.over = true; g.broke = true; rec.broke = true; }
    else if (m >= MONTHS) g.over = true; else g.month++;
    return rec;
  }
  function result(g) { const months = g.history.filter((h) => !h.broke).length; return { score: g.broke ? months * 100 : Math.round(g.cash), broke: g.broke, months, cash: Math.round(g.cash) }; }
  return { analyze, level, totals, SAMPLE, KINDS, PRICE, simulate, MONTHS, G, plan, newGame, play, result, rngFor };
});
