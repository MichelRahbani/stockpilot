/* Cash Crunch: survive as many months as you can. Every decision becomes real accounting entries. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory(require("./acct-engine.js"));
  else root.AcctCrunch = factory(root.AcctEngine);
})(typeof self !== "undefined" ? self : this, function (E) {
  const MONTHS = 24, SALES = 5000, COGS = 1500, RENT = 1500, WAGES = 2000;
  const e = (type, params, at) => ({ type, params, at: at || 0 });
  const CARDS = [
    { id: "order", title: "A big order comes in", story: "A company wants $8,000 of goods but will only pay in two months. You have to buy the stock now.",
      choices: [
        { label: "Take the order", note: "Spend $3,000 on stock now. Collect $8,000 in 2 months.", entries: [e("buyInventory", { amount: 3000, paid: "cash" }), e("sale", { amount: 8000, cost: 3000, paid: "credit" }), e("collect", { amount: 8000 }, 2)] },
        { label: "Turn it down", note: "Safe, but no extra profit.", entries: [] }] },
    { id: "repair", title: "Your equipment breaks", story: "The main machine stops working.",
      choices: [
        { label: "Repair it ($1,200)", note: "Costs cash now.", entries: [e("expense", { category: "otherExp", amount: 1200, paid: "cash" })] },
        { label: "Replace it on a loan ($5,000)", note: "No cash now, but interest and a loan to repay.", entries: [e("buyEquipment", { amount: 5000, paid: "loan" }), e("interest", { amount: 100, paid: "cash" }, 1), e("interest", { amount: 100, paid: "cash" }, 2)] },
        { label: "Limp along", note: "Free now, but sales drop $1,000 a month for 3 months.", entries: [], mods: [{ sales: -1000, months: 3 }] }] },
    { id: "rent", title: "Your landlord raises the rent", story: "Rent goes up $400 a month.",
      choices: [
        { label: "Accept it", note: "$400 more rent for 6 months.", entries: [], mods: [{ cost: 400, months: 6 }] },
        { label: "Move to a cheaper space", note: "$2,500 to move now, then costs drop $300 a month for 6 months.", entries: [e("expense", { category: "otherExp", amount: 2500, paid: "cash" })], mods: [{ cost: -300, months: 6 }] }] },
    { id: "ad", title: "An advertising offer", story: "A local newspaper offers you a prime ad.",
      choices: [
        { label: "Buy the ad ($1,500)", note: "Sales rise $900 a month for 4 months.", entries: [e("expense", { category: "marketing", amount: 1500, paid: "cash" })], mods: [{ sales: 900, months: 4 }] },
        { label: "Skip it", note: "Keep your cash.", entries: [] }] },
    { id: "tax", title: "A tax bill arrives", story: "You owe $1,800 in tax.",
      choices: [
        { label: "Pay it now", note: "$1,800 out of cash.", entries: [e("tax", { amount: 1800, paid: "cash" })] },
        { label: "Pay in 2 months with a $150 penalty", note: "Cash stays for now.", entries: [e("tax", { amount: 1800, paid: "cash" }, 2), e("interest", { amount: 150, paid: "cash" }, 2)] }] },
    { id: "hike", title: "Your supplier raises prices", story: "Stock costs more, which squeezes your profit.",
      choices: [
        { label: "Absorb it", note: "Profit drops $400 a month for 4 months.", entries: [], mods: [{ cost: 400, months: 4 }] },
        { label: "Raise your prices", note: "Some customers leave: sales drop $150 a month for 4 months.", entries: [], mods: [{ sales: -150, months: 4 }] }] },
    { id: "money", title: "Money offers", story: "You could use some extra cash.",
      choices: [
        { label: "Owner adds $3,000", note: "No debt. Costs nothing but the owner's patience.", entries: [e("invest", { amount: 3000 })] },
        { label: "Bank loan of $3,000", note: "Get the cash now, pay $150 interest a month for 3 months.", entries: [e("borrow", { amount: 3000 }), e("interest", { amount: 150, paid: "cash" }, 1), e("interest", { amount: 150, paid: "cash" }, 2), e("interest", { amount: 150, paid: "cash" }, 3)] },
        { label: "Do nothing", note: "Stay lean.", entries: [] }] },
    { id: "slow", title: "A slow season", story: "Customers stay home for two months.",
      choices: [
        { label: "Cut staff hours", note: "Save $800 a month, but sales fall $1,800 a month.", entries: [], mods: [{ sales: -1800, cost: -800, months: 2 }] },
        { label: "Run a clearance sale", note: "Spend $600 on signs. Sales fall only $900 a month.", entries: [e("expense", { category: "marketing", amount: 600, paid: "cash" })], mods: [{ sales: -900, months: 2 }] }] },
    { id: "rush", title: "A seasonal rush", story: "Holiday shoppers are coming.",
      choices: [
        { label: "Hire a temp ($900)", note: "Sales rise $1,500 a month for 2 months.", entries: [e("expense", { category: "wages", amount: 900, paid: "cash" })], mods: [{ sales: 1500, months: 2 }] },
        { label: "Handle it yourself", note: "Sales rise $500 a month for 2 months.", entries: [], mods: [{ sales: 500, months: 2 }] }] },
    { id: "bad", title: "A customer disappears", story: "A customer who owes you money cannot be found.",
      choices: [
        { label: "Hire a collector ($400)", note: "You lose the $800 sale but pay less than chasing it.", entries: [e("expense", { category: "otherExp", amount: 400, paid: "cash" })] },
        { label: "Write it off", note: "Eat an $800 loss.", entries: [e("expense", { category: "otherExp", amount: 800, paid: "cash" })] }] }
  ];

  function newGame(rng) {
    rng = rng || Math.random;
    const state = E.create({ name: "Crunch", periods: MONTHS });
    E.addEntry(state, 1, "invest", { amount: 9500 });
    E.addEntry(state, 1, "buyEquipment", { amount: 4000, paid: "cash" });
    const g = { state, rng, month: 0, mods: [], deck: [], over: false, won: false, history: [], card: null };
    draw(g);
    return g;
  }
  function draw(g) {
    if (g.deck.length === 0) { g.deck = CARDS.slice(); for (let i = g.deck.length - 1; i > 0; i--) { const j = Math.floor(g.rng() * (i + 1)); [g.deck[i], g.deck[j]] = [g.deck[j], g.deck[i]]; } }
    g.card = g.deck.pop();
    g.month++;
  }
  const bal = (g, p) => E.statementsD(g.state, p, true);
  const cashNow = (g) => bal(g, g.month).balance.cash;
  // Play the month: apply the chosen answer, run the ordinary month, check cash.
  function play(g, choiceIdx) {
    if (g.over) throw new Error("Game over");
    const m = g.month, ch = g.card.choices[Math.max(0, Math.min(g.card.choices.length - 1, choiceIdx | 0))];
    const add = (p, type, params) => { if (p <= MONTHS) { const r = E.addEntry(g.state, p, type, params); if (!r.ok) throw new Error(r.error); } };
    ch.entries.forEach((x) => add(m + x.at, x.type, x.params));
    (ch.mods || []).forEach((x) => g.mods.push({ sales: x.sales || 0, cost: x.cost || 0, left: x.months }));
    let sales = SALES, cost = 0;
    cost = Math.floor((m - 1) / 6) * 150;
    g.mods.forEach((x) => { sales += x.sales; cost += x.cost; x.left--; });
    g.mods = g.mods.filter((x) => x.left > 0);
    sales = Math.max(0, sales);
    const inv = bal(g, m).balance.inventory;
    if (inv < COGS) add(m, "buyInventory", { amount: COGS - inv + COGS, paid: "cash" });
    add(m, "sale", { amount: sales, cost: COGS, paid: "cash" });
    add(m, "expense", { category: "rent", amount: RENT + Math.max(0, cost), paid: "cash" });
    add(m, "expense", { category: "wages", amount: Math.max(0, WAGES + Math.min(0, cost)), paid: "cash" });
    const s = bal(g, m), cash = s.balance.cash;
    const rec = { month: m, card: g.card.title, choice: ch.label, cash, profit: s.income.netIncome, sales };
    g.history.push(rec);
    if (cash < 0) { g.over = true; rec.broke = true; }
    else if (m >= MONTHS) { g.over = true; g.won = true; }
    else draw(g);
    return rec;
  }
  function result(g) {
    const months = g.history.filter((h) => !h.broke).length;
    const last = g.history[g.history.length - 1];
    const cash = last && !last.broke ? last.cash : 0;
    return { months, cash, won: g.won, score: months * 100 + Math.max(0, Math.floor(cash / 100)) };
  }
  return { MONTHS, CARDS, newGame, play, result, cashNow };
});
