/* Marketing maths for the Funnel Lab and the Campaign game. Plain numbers in, plain numbers out. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.BizMarketing = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const n = (v) => (isFinite(v) ? v : 0);
  // i: spend, cpc, visitToLead (%), leadToCust (%), price, unitCost, orders (orders per customer, lifetime), fixed (other monthly costs)
  function calc(i) {
    const spend = Math.max(0, +i.spend || 0), cpc = Math.max(0.01, +i.cpc || 0.01);
    const clicks = spend / cpc, leads = clicks * (i.visitToLead || 0) / 100, customers = leads * (i.leadToCust || 0) / 100;
    const price = +i.price || 0, unit = +i.unitCost || 0, orders = Math.max(1, +i.orders || 1), fixed = +i.fixed || 0;
    const margin = price - unit, revenue = customers * price, gross = customers * margin;
    const cac = customers > 0 ? spend / customers : 0, ltv = margin * orders;
    return {
      clicks, leads, customers, revenue, gross, margin, cac, ltv,
      ltvCac: cac > 0 ? ltv / cac : 0,
      paybackOrders: margin > 0 && cac > 0 ? cac / margin : 0,
      roas: spend > 0 ? revenue / spend : 0,
      profitFirst: gross - spend - fixed,
      profitLifetime: customers * ltv - spend - fixed,
      marginPct: price > 0 ? margin / price * 100 : 0,
      breakEvenCpc: customers > 0 && clicks > 0 ? (customers * ltv - fixed) / clicks : 0
    };
  }
  // Plain-English reading of the result
  function insights(i, r) {
    const out = [], $ = (x) => "$" + Math.round(x).toLocaleString("en-US");
    if (r.customers <= 0) return ["No customers yet. Raise the budget or the conversion rates."];
    out.push("You pay about " + $(r.cac) + " to win a customer. Each customer is worth about " + $(r.ltv) + " in profit over their time with you.");
    if (r.ltvCac >= 3) out.push("That is a healthy ratio (" + r.ltvCac.toFixed(1) + " to 1). A common rule of thumb is 3 to 1 or better. You could likely spend more.");
    else if (r.ltvCac >= 1) out.push("The ratio is " + r.ltvCac.toFixed(1) + " to 1. You make money on each customer in the end, but slowly. Aim for 3 to 1.");
    else out.push("The ratio is " + r.ltvCac.toFixed(1) + " to 1. Each customer costs more to win than they ever return. Fix price, conversion or cost per click before spending more.");
    if (r.profitFirst < 0 && r.profitLifetime > 0) out.push("You lose " + $(-r.profitFirst) + " in the first month but earn it back as customers return. That is why cash matters when you grow.");
    if (r.margin <= 0) out.push("Your price is below your cost per sale. Every sale loses money.");
    return out;
  }
  // One-at-a-time what-ifs: what happens to lifetime profit if a lever moves 10% in the good direction
  function levers(i) {
    const base = calc(i).profitLifetime, rows = [];
    const tweak = (label, patch) => { const r = calc(Object.assign({}, i, patch)); rows.push({ label, gain: r.profitLifetime - base }); };
    tweak("Spend 10% more on ads", { spend: i.spend * 1.1 });
    tweak("Cost per click 10% lower", { cpc: i.cpc * 0.9 });
    tweak("Visitors to leads 10% better", { visitToLead: i.visitToLead * 1.1 });
    tweak("Leads to customers 10% better", { leadToCust: i.leadToCust * 1.1 });
    tweak("Price 10% higher (same conversion)", { price: i.price * 1.1 });
    tweak("Customers come back 10% more", { orders: i.orders * 1.1 });
    return rows.sort((a, b) => b.gain - a.gain);
  }
  const PRESETS = [
    { id: "coffee", name: "Local coffee shop", i: { spend: 1500, cpc: 0.9, visitToLead: 6, leadToCust: 35, price: 8, unitCost: 3, orders: 14, fixed: 500 } },
    { id: "course", name: "Online course", i: { spend: 4000, cpc: 1.8, visitToLead: 4, leadToCust: 8, price: 120, unitCost: 10, orders: 1, fixed: 800 } },
    { id: "app", name: "Subscription app", i: { spend: 6000, cpc: 2.2, visitToLead: 9, leadToCust: 12, price: 9, unitCost: 2, orders: 10, fixed: 1500 } },
    { id: "bad", name: "A campaign that loses money", i: { spend: 3000, cpc: 3, visitToLead: 2, leadToCust: 3, price: 25, unitCost: 15, orders: 1, fixed: 600 } }
  ];

  // ---------- Campaign game: 6 months, same events for everyone with the same code
  const MONTHS = 6, FIXED = 800, UNIT = 8, BASE_CPC = 0.45;
  function hash(s) { let h = 1779033703 ^ s.length; for (let k = 0; k < s.length; k++) { h = Math.imul(h ^ s.charCodeAt(k), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function rngFor(seed) { let a = hash(String(seed)); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const EVENTS = [
    { id: "calm", title: "A normal month", story: "Nothing unusual. Costs and customers behave as expected.", cpc: 1, conv: 1 },
    { id: "rival", title: "A rival launches a big campaign", story: "Ads cost more because everyone is bidding for the same people.", cpc: 1.5, conv: 1 },
    { id: "viral", title: "A post about you goes viral", story: "Free attention. More visitors turn into customers.", cpc: 0.9, conv: 1.5 },
    { id: "season", title: "Peak season", story: "Shoppers are ready to buy, but ads are pricier.", cpc: 1.25, conv: 1.35 },
    { id: "slump", title: "Customers tighten their wallets", story: "People still click but buy less.", cpc: 1, conv: 0.7 }
  ];
  function plan(seed) { const r = rngFor(seed), out = []; for (let m = 1; m <= MONTHS; m++) out.push({ month: m, ev: EVENTS[Math.floor(r() * EVENTS.length)] }); return out; }
  function newGame(seed) { return { seed: String(seed), plan: plan(seed), month: 1, customers: 0, cash: 3000, history: [], done: false, totalProfit: 0 }; }
  // price: 6 to 40. spend: 0 to 6000. Higher spend means higher cost per click (the best audience runs out).
  function play(g, spend, price) {
    if (g.done) throw new Error("Game over");
    spend = Math.max(0, Math.min(6000, Math.round(spend))); price = Math.max(6, Math.min(40, Math.round(price)));
    const ev = g.plan[g.month - 1].ev;
    const cpc = BASE_CPC * ev.cpc * (1 + spend / 6000);
    const priceFactor = Math.pow(20 / price, 1.6);                  // cheaper sells better
    const r = calc({ spend, cpc, visitToLead: 15, leadToCust: Math.min(60, 40 * ev.conv * priceFactor), price, unitCost: UNIT, orders: 1, fixed: 0 });
    const repeat = g.customers * 0.2;                               // a share of past customers buy again
    const customers = r.customers + repeat, revenue = customers * price, gross = customers * (price - UNIT);
    const profit = gross - spend - FIXED;
    g.customers += r.customers; g.cash += profit; g.totalProfit += profit;
    const rec = { month: g.month, spend, price, event: ev, cpc, newCustomers: r.customers, repeatCustomers: repeat, revenue, profit, cash: g.cash, customersTotal: g.customers };
    g.history.push(rec);
    if (g.month >= MONTHS) g.done = true; else g.month++;
    return rec;
  }
  function result(g) { return { score: Math.round(g.totalProfit), customers: Math.round(g.customers), cash: Math.round(g.cash) }; }
  return { calc, insights, levers, PRESETS, MONTHS, FIXED, UNIT, EVENTS, plan, newGame, play, result, rngFor };
});
