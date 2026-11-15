/* Supply Chain Showdown: a 6 month stock-ordering game that runs on the accounting engine.
   Same seed = same company and same events, so everyone in a class plays the same game. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./acct-engine.js"));
  else root.AcctShowdown = factory(root.AcctEngine);
})(typeof self !== "undefined" ? self : this, function (E) {
  const MONTHS = 6, COST = 10, PRICE = 20, BASE = 500, RENT = 1500, WAGES = 2000, STORAGE = 1, FEE = 500;
  const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const ORDERS = [0, 200, 400, 600, 800, 1000];

  function hash(s) { let h = 1779033703 ^ s.length; for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function rngFor(seed) { let a = hash(String(seed)); return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  const DEMAND = [
    { id: "normal", mult: 1.0, title: "A steady month", story: "Customers bought about what you expected." },
    { id: "normal2", mult: 1.1, title: "A decent month", story: "Slightly busier than usual." },
    { id: "spike", mult: 1.7, title: "Demand spike", story: "A local event sent crowds your way." },
    { id: "slump", mult: 0.55, title: "Slow month", story: "Bad weather kept customers home." },
    { id: "dip", mult: 0.8, title: "Quiet month", story: "Fewer customers than usual." }
  ];
  const SUPPLY = [
    { id: "none", title: "", story: "" },
    { id: "rise", title: "Supplier raises prices", story: "Stock costs 25% more this month." },
    { id: "delay", title: "Shipping delay", story: "Whatever you order now arrives next month." }
  ];

  function plan(seed) {
    const r = rngFor(seed), out = [];
    for (let m = 1; m <= MONTHS; m++) {
      const d = DEMAND[Math.floor(r() * DEMAND.length)];
      let sp = r(); let s = sp < 0.55 || m === 1 ? SUPPLY[0] : sp < 0.8 ? SUPPLY[1] : SUPPLY[2];
      out.push({ month: m, demand: d, supply: s });
    }
    return out;
  }

  function newGame(seed) {
    const g = { seed: String(seed), plan: plan(seed), month: 1, state: E.create({ name: "Showdown", periods: MONTHS, periodLabels: LABELS }),
      units: 0, pending: null, loans: 0, lostUnits: 0, stockoutMonths: 0, history: [], phase: "order", done: false };
    E.addEntry(g.state, 1, "invest", { amount: 20000 });
    E.addEntry(g.state, 1, "buyInventory", { amount: 4000, paid: "cash" });
    g.units = 400;
    return g;
  }
  const S = (g, cum) => E.statementsD(g.state, g.month, cum !== false);
  const cash = (g) => S(g).balance.cash;
  function add(g, type, params) { const r = E.addEntry(g.state, g.month, type, params); if (!r.ok) throw new Error(r.error); return r; }
  function ensureCash(g, need) {
    const have = cash(g);
    if (have >= need) return 0;
    const amt = Math.ceil((need - have) / 1000) * 1000;
    add(g, "borrow", { amount: amt });
    add(g, "interest", { amount: Math.round(amt * 0.05), paid: "accrue" });
    g.loans++;
    return amt;
  }
  function info(g) {
    const ev = g.plan[g.month - 1], s = S(g);
    const unit = ev.supply.id === "rise" ? COST * 1.25 : COST;
    return { month: g.month, label: LABELS[g.month - 1], supply: ev.supply, unitCost: unit, cash: s.balance.cash, units: g.units,
      owed: s.balance.ap, loan: s.balance.loan, pending: g.pending, netIncome: s.income.netIncome, price: PRICE, rent: RENT, wages: WAGES };
  }
  // Start of the month: pay last month's supplier bill and receive any delayed order.
  function openMonth(g) {
    if (g.month > 1 || g.pending) {
      const ap = S(g).balance.ap;
      if (ap > 0) { ensureCash(g, ap); add(g, "payAP", { amount: ap }); }
      if (g.pending) {
        const p = g.pending; g.pending = null;
        if (p.paid === "cash") ensureCash(g, p.amount);
        add(g, "buyInventory", { amount: p.amount, paid: p.paid }); g.units += p.units;
      }
    }
  }
  // Player order for the month, then the demand is revealed and the month is settled.
  function play(g, units, paid) {
    if (g.done) throw new Error("Game over");
    units = Math.max(0, Math.min(1000, units | 0)); paid = paid === "credit" ? "credit" : "cash";
    openMonth(g);
    const ev = g.plan[g.month - 1];
    const unit = ev.supply.id === "rise" ? COST * 1.25 : COST;
    const amount = Math.round(units * unit);
    if (units > 0) {
      if (ev.supply.id === "delay") g.pending = { units, amount, paid };
      else { if (paid === "cash") ensureCash(g, amount); add(g, "buyInventory", { amount, paid }); g.units += units; }
    }
    // customers arrive
    const demand = Math.round(BASE * ev.demand.mult), sold = Math.min(demand, g.units), lost = demand - sold;
    let revenue = 0, cogs = 0;
    if (sold > 0) {
      const invValue = S(g).balance.inventory;
      cogs = sold === g.units ? invValue : Math.round(invValue * sold / g.units);
      revenue = sold * PRICE;
      add(g, "sale", { amount: revenue, cost: cogs, paid: "cash" });
      g.units -= sold;
    }
    if (lost > 0) { g.lostUnits += lost; g.stockoutMonths++; }
    ensureCash(g, RENT + WAGES + g.units * STORAGE);
    add(g, "expense", { category: "rent", amount: RENT, paid: "cash" });
    add(g, "expense", { category: "wages", amount: WAGES, paid: "cash" });
    if (g.units > 0) add(g, "expense", { category: "otherExp", amount: g.units * STORAGE, paid: "cash" });
    const s = S(g);
    const rec = { month: g.month, label: LABELS[g.month - 1], ordered: units, paid, demand, sold, lost, revenue, cogs, left: g.units, cash: s.balance.cash, owed: s.balance.ap, netIncome: s.income.netIncome, event: ev.demand, supply: ev.supply };
    g.history.push(rec);
    if (g.month >= MONTHS) g.done = true; else g.month++;
    return rec;
  }
  function result(g) {
    const s = E.statementsD(g.state, MONTHS, true);
    return { profit: s.income.netIncome, penalty: g.loans * FEE, score: Math.round(s.income.netIncome - g.loans * FEE), cash: s.balance.cash, loans: g.loans,
      lostUnits: g.lostUnits, stockoutMonths: g.stockoutMonths, leftover: g.units, balanced: !!(s.checks && s.checks.balances !== false) };
  }
  return { MONTHS, COST, PRICE, BASE, RENT, WAGES, STORAGE, FEE, ORDERS, LABELS, plan, newGame, info, play, result, openMonth, rngFor };
});
