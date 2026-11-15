/* StockPilot accounting engine.
 *
 * A small double-entry bookkeeping engine that powers the Statements Lab.
 * Every transaction becomes a balanced journal entry. The income statement,
 * balance sheet and cash flow statement are all built from the same entries,
 * so changing one number changes all three, exactly as it does in real books.
 *
 * Money is held in whole cents inside the engine so totals never drift.
 * Works in the browser (window.AcctEngine) and in Node (module.exports).
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AcctEngine = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // ── Chart of accounts ────────────────────────────────────────────────
  // normal: which side increases the account. contra: reduces its parent.
  const ACCOUNTS = {
    cash:        { name: "Cash",                          type: "asset",     normal: "dr", group: "currentAsset" },
    ar:          { name: "Accounts receivable",           type: "asset",     normal: "dr", group: "currentAsset" },
    allowance:   { name: "Allowance for doubtful accounts", type: "asset",   normal: "cr", group: "currentAsset", contra: true },
    inventory:   { name: "Inventory",                     type: "asset",     normal: "dr", group: "currentAsset" },
    prepaid:     { name: "Prepaid expenses",              type: "asset",     normal: "dr", group: "currentAsset" },
    equipment:   { name: "Equipment",                     type: "asset",     normal: "dr", group: "fixedAsset" },
    accumDep:    { name: "Accumulated depreciation",      type: "asset",     normal: "cr", group: "fixedAsset", contra: true },
    ap:          { name: "Accounts payable",              type: "liability", normal: "cr", group: "currentLiab" },
    accrued:     { name: "Accrued expenses payable",      type: "liability", normal: "cr", group: "currentLiab" },
    unearned:    { name: "Unearned revenue",              type: "liability", normal: "cr", group: "currentLiab" },
    loan:        { name: "Loans payable",                 type: "liability", normal: "cr", group: "longLiab" },
    stock:       { name: "Owner investment (common stock)", type: "equity",  normal: "cr", group: "equity" },
    dividends:   { name: "Dividends",                     type: "equity",    normal: "dr", group: "equity", temp: true },
    revenue:     { name: "Sales revenue",                 type: "revenue",   normal: "cr", group: "revenue" },
    gain:        { name: "Gain / (loss) on sale of equipment", type: "revenue", normal: "cr", group: "other" },
    cogs:        { name: "Cost of goods sold",            type: "expense",   normal: "dr", group: "cogs" },
    wages:       { name: "Wages",                         type: "expense",   normal: "dr", group: "opex" },
    rent:        { name: "Rent",                          type: "expense",   normal: "dr", group: "opex" },
    utilities:   { name: "Utilities",                     type: "expense",   normal: "dr", group: "opex" },
    marketing:   { name: "Marketing",                     type: "expense",   normal: "dr", group: "opex" },
    otherExp:    { name: "Other expenses",                type: "expense",   normal: "dr", group: "opex" },
    depExp:      { name: "Depreciation expense",          type: "expense",   normal: "dr", group: "opex" },
    badDebt:     { name: "Bad debt expense",              type: "expense",   normal: "dr", group: "opex" },
    interestExp: { name: "Interest expense",              type: "expense",   normal: "dr", group: "interest" },
    taxExp:      { name: "Income tax expense",            type: "expense",   normal: "dr", group: "tax" }
  };

  const EXPENSE_CHOICES = [
    ["wages", "Wages"], ["rent", "Rent"], ["utilities", "Utilities"], ["marketing", "Marketing"], ["otherExp", "Other"]
  ];
  const PAID = {
    cashCredit: [["cash", "Cash"], ["credit", "On credit"]],
    cashAccrue: [["cash", "Cash"], ["accrue", "Not paid yet"]],
    cashLoan:   [["cash", "Cash"], ["loan", "Loan"]],
    cashCreditSale: [["cash", "Cash now"], ["credit", "On credit"]]
  };

  const toCents = (d) => Math.round((Number(d) || 0) * 100);
  const toDollars = (c) => Math.round(c) / 100;
  const money = (n) => (Number(n) || 0);

  // ── Transaction templates ────────────────────────────────────────────
  // build(p) returns { lines: [[acct, side, cents]], cf: category of the cash line }
  // Params arrive in dollars. Every template must produce balanced lines.
  const T = {};
  const def = (key, o) => { T[key] = Object.assign({ key }, o); };

  def("invest", {
    group: "Owner & lenders", label: "Owner invests cash", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["cash", "dr", p.amount], ["stock", "cr", p.amount]], cf: "financing" }),
    plain: (p, f) => `The owner puts ${f(p.amount)} of their own money into the business. Cash goes up and so does owner's equity. No revenue, because no customer paid for anything.`
  });
  def("borrow", {
    group: "Owner & lenders", label: "Borrow from a bank", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["cash", "dr", p.amount], ["loan", "cr", p.amount]], cf: "financing" }),
    plain: (p, f) => `The business borrows ${f(p.amount)}. Cash goes up, but so does what the business owes. Equity does not change, and nothing is earned.`
  });
  def("repay", {
    group: "Owner & lenders", label: "Repay loan principal", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["loan", "dr", p.amount], ["cash", "cr", p.amount]], cf: "financing" }),
    plain: (p, f) => `The business pays back ${f(p.amount)} of the loan. Cash and the loan balance both go down. Repaying principal is not an expense (interest is).`
  });
  def("dividend", {
    group: "Owner & lenders", label: "Pay dividends to owner", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["dividends", "dr", p.amount], ["cash", "cr", p.amount]], cf: "financing" }),
    plain: (p, f) => `The business pays ${f(p.amount)} to its owner. Cash goes down and retained earnings go down. Dividends are not an expense, so net income does not change.`
  });

  def("buyEquipment", {
    group: "Buying things", label: "Buy equipment", fields: [{ k: "amount", label: "Cost", t: "money" }, { k: "paid", label: "How paid", t: "select", options: PAID.cashLoan, def: "cash" }],
    build: (p) => p.paid === "loan"
      ? { lines: [["equipment", "dr", p.amount], ["loan", "cr", p.amount]], cf: null }
      : { lines: [["equipment", "dr", p.amount], ["cash", "cr", p.amount]], cf: "investing" },
    plain: (p, f) => p.paid === "loan"
      ? `The business buys ${f(p.amount)} of equipment and pays for it with a loan. Equipment and loans both go up. No cash moves, so the cash flow statement only notes it as a non-cash deal.`
      : `The business buys ${f(p.amount)} of equipment with cash. One asset (cash) turns into another (equipment), so total assets do not change and nothing hits the income statement yet. Depreciation will spread the cost over time.`
  });
  def("buyInventory", {
    group: "Buying things", label: "Buy inventory", fields: [{ k: "amount", label: "Cost", t: "money" }, { k: "paid", label: "How paid", t: "select", options: PAID.cashCredit, def: "cash" }],
    build: (p) => p.paid === "credit"
      ? { lines: [["inventory", "dr", p.amount], ["ap", "cr", p.amount]], cf: null }
      : { lines: [["inventory", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" },
    plain: (p, f) => p.paid === "credit"
      ? `The business buys ${f(p.amount)} of inventory and promises to pay the supplier later. Inventory and accounts payable both go up. It is not an expense yet. It becomes cost of goods sold when the goods are sold.`
      : `The business buys ${f(p.amount)} of inventory for cash. Cash turns into inventory. It is not an expense yet. It becomes cost of goods sold when the goods are sold.`
  });
  def("payAP", {
    group: "Buying things", label: "Pay a supplier bill", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["ap", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" }),
    plain: (p, f) => `The business pays ${f(p.amount)} it owed to suppliers. Cash and accounts payable both go down. The expense was already counted when the goods were bought or used, so net income does not change.`
  });
  def("prepay", {
    group: "Buying things", label: "Prepay an expense (insurance, rent)", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["prepaid", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" }),
    plain: (p, f) => `The business pays ${f(p.amount)} in advance. Cash turns into a prepaid asset. It becomes an expense as the time passes.`
  });

  def("sale", {
    group: "Selling & collecting", label: "Sell goods to a customer",
    fields: [{ k: "amount", label: "Sale price", t: "money" }, { k: "cost", label: "Cost of the goods sold", t: "money" }, { k: "paid", label: "Payment", t: "select", options: PAID.cashCreditSale, def: "cash" }],
    build: (p) => {
      const lines = [];
      lines.push([p.paid === "credit" ? "ar" : "cash", "dr", p.amount]);
      lines.push(["revenue", "cr", p.amount]);
      if (p.cost > 0) { lines.push(["cogs", "dr", p.cost]); lines.push(["inventory", "cr", p.cost]); }
      return { lines, cf: p.paid === "credit" ? null : "operating" };
    },
    plain: (p, f) => `The business sells goods for ${f(p.amount)}${p.paid === "credit" ? " on credit" : " for cash"}. Revenue goes up by ${f(p.amount)}${p.paid === "credit" ? " (even though no cash has come in yet, because it was earned)" : ""}. Inventory leaves the shelf, so ${f(p.cost)} moves to cost of goods sold. Profit on this sale is ${f(p.amount - p.cost)}.`
  });
  def("collect", {
    group: "Selling & collecting", label: "Collect from a customer", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["cash", "dr", p.amount], ["ar", "cr", p.amount]], cf: "operating" }),
    plain: (p, f) => `A customer pays ${f(p.amount)} they owed. Cash goes up and accounts receivable goes down. The revenue was already counted when the sale happened, so net income does not change.`
  });
  def("deposit", {
    group: "Selling & collecting", label: "Customer pays in advance (deposit)", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["cash", "dr", p.amount], ["unearned", "cr", p.amount]], cf: "operating" }),
    plain: (p, f) => `A customer pays ${f(p.amount)} before getting anything. Cash goes up, but it is not revenue yet. It is a liability, because the business owes the customer a product or service.`
  });
  def("earnDeposit", {
    group: "Selling & collecting", label: "Deliver what a deposit paid for", fields: [{ k: "amount", label: "Amount earned", t: "money" }],
    build: (p) => ({ lines: [["unearned", "dr", p.amount], ["revenue", "cr", p.amount]], cf: null }),
    plain: (p, f) => `The business delivers ${f(p.amount)} of what customers paid for in advance. The liability shrinks and revenue goes up. No cash moves now, because the cash arrived earlier.`
  });

  def("expense", {
    group: "Expenses", label: "Pay or record an expense",
    fields: [{ k: "category", label: "Type", t: "select", options: EXPENSE_CHOICES, def: "wages" }, { k: "amount", label: "Amount", t: "money" }, { k: "paid", label: "How paid", t: "select", options: PAID.cashAccrue, def: "cash" }],
    build: (p) => {
      const acct = ACCOUNTS[p.category] ? p.category : "otherExp";
      return p.paid === "accrue"
        ? { lines: [[acct, "dr", p.amount], ["accrued", "cr", p.amount]], cf: null }
        : { lines: [[acct, "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" };
    },
    plain: (p, f) => `The business has ${f(p.amount)} of ${(ACCOUNTS[p.category] || ACCOUNTS.otherExp).name.toLowerCase()}${p.paid === "accrue" ? " that it has not paid yet. The expense still counts now (accrual accounting), and the unpaid amount is a liability" : ", paid in cash. Cash goes down and net income goes down by the same amount"}.`
  });
  def("payAccrued", {
    group: "Expenses", label: "Pay an accrued expense", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["accrued", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" }),
    plain: (p, f) => `The business pays ${f(p.amount)} of expenses it recorded earlier. Cash and the liability both go down. The expense was already counted, so net income does not change.`
  });
  def("usePrepaid", {
    group: "Expenses", label: "Use up a prepaid expense", fields: [{ k: "category", label: "Type", t: "select", options: EXPENSE_CHOICES, def: "rent" }, { k: "amount", label: "Amount used", t: "money" }],
    build: (p) => ({ lines: [[ACCOUNTS[p.category] ? p.category : "otherExp", "dr", p.amount], ["prepaid", "cr", p.amount]], cf: null }),
    plain: (p, f) => `Time passes and ${f(p.amount)} of what was prepaid is now used up. The prepaid asset shrinks and the expense is recorded. No cash moves, because the cash left earlier.`
  });
  def("interest", {
    group: "Expenses", label: "Interest on a loan", fields: [{ k: "amount", label: "Interest", t: "money" }, { k: "paid", label: "How paid", t: "select", options: PAID.cashAccrue, def: "cash" }],
    build: (p) => p.paid === "accrue"
      ? { lines: [["interestExp", "dr", p.amount], ["accrued", "cr", p.amount]], cf: null }
      : { lines: [["interestExp", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" },
    plain: (p, f) => `The cost of borrowing is ${f(p.amount)}${p.paid === "accrue" ? ", owed but not paid yet" : ", paid in cash"}. Interest is an expense, so net income goes down. (Repaying the loan itself is different. That is not an expense.)`
  });
  def("tax", {
    group: "Expenses", label: "Income tax", fields: [{ k: "amount", label: "Tax", t: "money" }, { k: "paid", label: "How paid", t: "select", options: PAID.cashAccrue, def: "cash" }],
    build: (p) => p.paid === "accrue"
      ? { lines: [["taxExp", "dr", p.amount], ["accrued", "cr", p.amount]], cf: null }
      : { lines: [["taxExp", "dr", p.amount], ["cash", "cr", p.amount]], cf: "operating" },
    plain: (p, f) => `Income tax of ${f(p.amount)}${p.paid === "accrue" ? " is owed but not paid yet" : " is paid in cash"}. It comes out of profit, so net income goes down.`
  });

  def("depreciation", {
    group: "Adjustments", label: "Record depreciation", fields: [{ k: "amount", label: "Depreciation for the period", t: "money" }],
    build: (p) => ({ lines: [["depExp", "dr", p.amount], ["accumDep", "cr", p.amount]], cf: null }),
    plain: (p, f) => `Equipment wears out a little, so ${f(p.amount)} of its cost becomes an expense this period. The equipment's book value goes down and net income goes down. No cash moves. This is why depreciation is added back on the cash flow statement.`
  });
  def("badDebt", {
    group: "Adjustments", label: "Estimate bad debts (allowance)", fields: [{ k: "amount", label: "Expected to never be paid", t: "money" }],
    build: (p) => ({ lines: [["badDebt", "dr", p.amount], ["allowance", "cr", p.amount]], cf: null }),
    plain: (p, f) => `The business expects ${f(p.amount)} of what customers owe will never be paid. It records the expense now and lowers the value of receivables, even before it knows which customer will not pay. No cash moves.`
  });
  def("writeOff", {
    group: "Adjustments", label: "Write off a specific unpaid bill", fields: [{ k: "amount", label: "Amount", t: "money" }],
    build: (p) => ({ lines: [["allowance", "dr", p.amount], ["ar", "cr", p.amount]], cf: null }),
    plain: (p, f) => `A customer is never going to pay ${f(p.amount)}. The business removes it from receivables against the allowance it set aside earlier. Net receivables, total assets and net income do not change, because the loss was already counted when the allowance was set up.`
  });
  def("writeDown", {
    group: "Adjustments", label: "Write off spoiled or lost inventory", fields: [{ k: "amount", label: "Cost of goods lost", t: "money" }],
    build: (p) => ({ lines: [["cogs", "dr", p.amount], ["inventory", "cr", p.amount]], cf: null }),
    plain: (p, f) => `${f(p.amount)} of inventory spoils, gets damaged or is lost. Inventory goes down and the loss goes to cost of goods sold, so profit falls. No cash moves now, because the cash left when the goods were bought.`
  });
  def("sellEquipment", {
    group: "Adjustments", label: "Sell equipment",
    fields: [{ k: "proceeds", label: "Cash received", t: "money" }, { k: "cost", label: "Original cost", t: "money" }, { k: "accDep", label: "Depreciation taken so far", t: "money" }],
    build: (p) => {
      const book = p.cost - p.accDep;
      const g = p.proceeds - book; // positive = gain
      const lines = [["cash", "dr", p.proceeds], ["accumDep", "dr", p.accDep], ["equipment", "cr", p.cost]];
      if (g > 0) lines.push(["gain", "cr", g]); else if (g < 0) lines.push(["gain", "dr", -g]);
      return { lines, cf: "investing" };
    },
    plain: (p, f) => {
      const book = p.cost - p.accDep, g = p.proceeds - book;
      return `The business sells equipment for ${f(p.proceeds)}. Its book value was ${f(book)} (cost minus depreciation), so there is a ${g >= 0 ? "gain" : "loss"} of ${f(Math.abs(g))}. The whole cash received is an investing inflow. The gain or loss is taken out of operating cash flow so it is not counted twice.`;
    }
  });

  const GROUP_ORDER = ["Owner & lenders", "Buying things", "Selling & collecting", "Expenses", "Adjustments"];

  // ── State ────────────────────────────────────────────────────────────
  function create(opts) {
    return { name: (opts && opts.name) || "My company", periods: (opts && opts.periods) || 12, entries: [], nextId: 1, periodLabels: opts && opts.periodLabels || null };
  }

  function clone(state) { return JSON.parse(JSON.stringify(state)); }

  function paramsClean(tpl, params) {
    const p = Object.assign({}, params || {});
    tpl.fields.forEach((f) => {
      if (f.t === "money") p[f.k] = Math.max(0, money(p[f.k]));
      else if (f.t === "select" && (p[f.k] === undefined || !f.options.some((o) => o[0] === p[f.k]))) p[f.k] = f.def !== undefined ? f.def : f.options[0][0];
    });
    return p;
  }

  // Turns a template + params into balanced lines in cents. Returns {error} if invalid.
  function buildLines(type, params) {
    const tpl = T[type];
    if (!tpl) return { error: "Unknown transaction type" };
    const p = paramsClean(tpl, params);
    const built = tpl.build(p);
    const lines = built.lines.filter((l) => toCents(l[2]) > 0).map((l) => ({ acct: l[0], side: l[1], c: toCents(l[2]) }));
    const dr = lines.filter((l) => l.side === "dr").reduce((s, l) => s + l.c, 0);
    const cr = lines.filter((l) => l.side === "cr").reduce((s, l) => s + l.c, 0);
    if (!lines.length) return { error: "Enter an amount greater than zero" };
    if (dr !== cr) return { error: "That transaction does not balance (debits " + toDollars(dr) + " vs credits " + toDollars(cr) + ")" };
    return { lines, cf: built.cf, params: p };
  }

  // Adds an entry. Returns { ok, entry, warnings } or { ok:false, error }.
  function addEntry(state, period, type, params, memo) {
    const b = buildLines(type, params);
    if (b.error) return { ok: false, error: b.error };
    const entry = { id: state.nextId++, period: Math.max(1, Math.min(state.periods, period | 0 || 1)), type, params: b.params, memo: memo || "" };
    state.entries.push(entry);
    return { ok: true, entry, warnings: warningsFor(state, entry) };
  }

  function updateEntry(state, id, patch) {
    const e = state.entries.find((x) => x.id === id);
    if (!e) return { ok: false, error: "Not found" };
    const next = { type: patch.type || e.type, params: Object.assign({}, e.params, patch.params || {}), period: patch.period || e.period };
    const b = buildLines(next.type, next.params);
    if (b.error) return { ok: false, error: b.error };
    e.type = next.type; e.params = b.params; e.period = Math.max(1, Math.min(state.periods, next.period | 0));
    if (patch.memo !== undefined) e.memo = patch.memo;
    return { ok: true, entry: e, warnings: warningsFor(state, e) };
  }

  function removeEntry(state, id) {
    const i = state.entries.findIndex((x) => x.id === id);
    if (i < 0) return false;
    state.entries.splice(i, 1);
    return true;
  }

  // Sorted by period, then creation order.
  function ordered(state) {
    return state.entries.slice().sort((a, b) => a.period - b.period || a.id - b.id);
  }

  // ── Balances ─────────────────────────────────────────────────────────
  // Returns debit-minus-credit cents per account for entries in [from, to].
  function rawBalances(state, from, to, includeEntry, excludeId) {
    const bal = {};
    Object.keys(ACCOUNTS).forEach((k) => (bal[k] = 0));
    const cf = { operating: 0, investing: 0, financing: 0, noncash: 0 };
    state.entries.forEach((e) => {
      if (e.period < from || e.period > to) return;
      if (excludeId && e.id === excludeId) return;
      const b = buildLines(e.type, e.params);
      if (b.error) return;
      b.lines.forEach((l) => { bal[l.acct] += l.side === "dr" ? l.c : -l.c; });
      b.lines.forEach((l) => {
        if (l.acct === "cash" && b.cf) cf[b.cf] += l.side === "dr" ? l.c : -l.c;
      });
    });
    return { bal, cf };
  }

  // natural, positive-looking amount for display (cents)
  const nat = (acct, v) => (ACCOUNTS[acct].normal === "dr" ? v : -v);

  // ── Statements ───────────────────────────────────────────────────────
  // period = which period to report. cumulative=true shows periods 1..period
  // for the income and cash flow statements (balance sheet is always "as of").
  function statements(state, period, cumulative, excludeId) {
    const P = Math.max(1, Math.min(state.periods, period | 0 || 1));
    const from = cumulative ? 1 : P;
    const cur = rawBalances(state, from, P, null, excludeId);          // activity in the reporting window
    const end = rawBalances(state, 1, P, null, excludeId);             // balances at end
    const beg = rawBalances(state, 1, from - 1, null, excludeId);      // balances at start of window

    const a = (acct) => nat(acct, cur.bal[acct]);

    // Income statement
    const revenue = a("revenue");
    const cogs = a("cogs");
    const grossProfit = revenue - cogs;
    const opexKeys = ["wages", "rent", "utilities", "marketing", "otherExp", "depExp", "badDebt"];
    const opex = opexKeys.map((k) => ({ key: k, name: ACCOUNTS[k].name, v: a(k) })).filter((x) => x.v !== 0);
    const totalOpex = opexKeys.reduce((s, k) => s + a(k), 0);
    const operatingIncome = grossProfit - totalOpex;
    const gainLoss = a("gain");
    const interest = a("interestExp");
    const preTax = operatingIncome + gainLoss - interest;
    const tax = a("taxExp");
    const netIncome = preTax - tax;

    const income = { revenue, cogs, grossProfit, opex, totalOpex, operatingIncome, gainLoss, interest, preTax, tax, netIncome };

    // Balance sheet (as of end of P)
    const e = (acct) => nat(acct, end.bal[acct]);
    const netAR = e("ar") - e("allowance");
    const netEquip = e("equipment") - e("accumDep");
    const currentAssets = e("cash") + netAR + e("inventory") + e("prepaid");
    const totalAssets = currentAssets + netEquip;
    const currentLiab = e("ap") + e("accrued") + e("unearned");
    const totalLiab = currentLiab + e("loan");
    // Retained earnings = all profit to date minus dividends to date
    const cumInc = nat("revenue", end.bal.revenue) + nat("gain", end.bal.gain) - nat("cogs", end.bal.cogs)
      - ["wages", "rent", "utilities", "marketing", "otherExp", "depExp", "badDebt", "interestExp", "taxExp"].reduce((s, k) => s + nat(k, end.bal[k]), 0);
    const retained = cumInc - nat("dividends", end.bal.dividends);
    const totalEquity = e("stock") + retained;
    const balance = {
      cash: e("cash"), ar: e("ar"), allowance: e("allowance"), netAR, inventory: e("inventory"), prepaid: e("prepaid"), currentAssets,
      equipment: e("equipment"), accumDep: e("accumDep"), netEquip, totalAssets,
      ap: e("ap"), accrued: e("accrued"), unearned: e("unearned"), currentLiab, loan: e("loan"), totalLiab,
      stock: e("stock"), retained, totalEquity, totalLiabEquity: totalLiab + totalEquity
    };

    // Cash flow statement (indirect method). Compare balances at start vs end of window.
    const b0 = (acct) => nat(acct, beg.bal[acct]);
    const d = (acct) => e(acct) - b0(acct);                              // change in a natural balance
    const dNetAR = (e("ar") - e("allowance")) - (b0("ar") - b0("allowance"));
    const provision = a("badDebt");                                       // non-cash expense in the window
    const arChange = -(dNetAR) - provision;                               // receivables change before the bad-debt provision
    const operating = {
      netIncome,
      depreciation: a("depExp"),
      badDebt: provision,
      gainLoss: -gainLoss,                                                // gains come out, losses go back in
      ar: arChange,
      inventory: -d("inventory"),
      prepaid: -d("prepaid"),
      ap: d("ap"),
      accrued: d("accrued"),
      unearned: d("unearned")
    };
    operating.total = Object.keys(operating).reduce((s, k) => s + operating[k], 0);
    // Investing and financing come straight from the cash lines
    const investing = [];
    const financing = [];
    const noncash = [];
    state.entries.forEach((en) => {
      if (en.period < from || en.period > P) return;
      if (excludeId && en.id === excludeId) return;
      const b = buildLines(en.type, en.params);
      if (b.error) return;
      const cashLine = b.lines.find((l) => l.acct === "cash");
      const amt = cashLine ? (cashLine.side === "dr" ? cashLine.c : -cashLine.c) : 0;
      if (b.cf === "investing") investing.push({ type: en.type, v: amt });
      if (b.cf === "financing") financing.push({ type: en.type, v: amt });
      if (en.type === "buyEquipment" && en.params.paid === "loan") noncash.push({ text: "Equipment bought with a loan", v: en.params.amount });
    });
    const sumType = (arr, t) => arr.filter((x) => x.type === t).reduce((s, x) => s + x.v, 0);
    const cfi = { equipmentPurchases: sumType(investing, "buyEquipment"), equipmentSales: sumType(investing, "sellEquipment") };
    cfi.total = cfi.equipmentPurchases + cfi.equipmentSales;
    const cff = { ownerInvestment: sumType(financing, "invest"), loansReceived: sumType(financing, "borrow"), loanRepayments: sumType(financing, "repay"), dividends: sumType(financing, "dividend") };
    cff.total = cff.ownerInvestment + cff.loansReceived + cff.loanRepayments + cff.dividends;
    const begCash = b0("cash");
    const netChange = operating.total + cfi.total + cff.total;
    const cashFlow = { operating, investing: cfi, financing: cff, netChange, beginCash: begCash, endCash: begCash + netChange, noncash };

    const checks = {
      balances: totalAssets === totalLiab + totalEquity,                  // Assets = Liabilities + Equity
      cashTies: cashFlow.endCash === balance.cash,                        // cash flow ends where the balance sheet says
      operatingTies: operating.total === (cur.cf.operating)               // indirect result equals the cash that really moved
    };
    return { period: P, from, income, balance, cashFlow, checks };
  }

  // Convert a statements() result (cents) into dollars for display.
  function inDollars(obj) {
    if (Array.isArray(obj)) return obj.map(inDollars);
    if (obj && typeof obj === "object") {
      const out = {};
      Object.keys(obj).forEach((k) => {
        if (k === "period" || k === "from" || k === "checks" || k === "key" || k === "name" || k === "text" || k === "type") out[k] = obj[k];
        else out[k] = inDollars(obj[k]);
      });
      return out;
    }
    return typeof obj === "number" ? toDollars(obj) : obj;
  }
  function statementsD(state, period, cumulative, excludeId) {
    return inDollars(statements(state, period, cumulative, excludeId));
  }

  // ── Impact of one entry ──────────────────────────────────────────────
  // What this single transaction changed on each statement (dollars).
  const IS_ROWS = [["revenue", "Revenue"], ["cogs", "Cost of goods sold"], ["totalOpex", "Operating expenses"], ["interest", "Interest expense"], ["tax", "Income tax"], ["netIncome", "Net income"]];
  const BS_ROWS = [["cash", "Cash"], ["netAR", "Accounts receivable (net)"], ["inventory", "Inventory"], ["prepaid", "Prepaid expenses"], ["netEquip", "Equipment (net)"], ["totalAssets", "Total assets"],
    ["ap", "Accounts payable"], ["accrued", "Accrued expenses"], ["unearned", "Unearned revenue"], ["loan", "Loans payable"], ["totalLiab", "Total liabilities"],
    ["stock", "Owner investment"], ["retained", "Retained earnings"], ["totalEquity", "Total equity"]];
  const CF_ROWS = [["operating", "Operating cash flow"], ["investing", "Investing cash flow"], ["financing", "Financing cash flow"], ["netChange", "Net change in cash"]];

  function impact(state, entryId) {
    const e = state.entries.find((x) => x.id === entryId);
    if (!e) return null;
    const withE = statements(state, e.period, false);
    const without = statements(state, e.period, false, entryId);
    const diff = (rows, a, b) => rows.map(([k, label]) => ({ key: k, label, delta: toDollars(a[k] - b[k]) })).filter((r) => r.delta !== 0);
    return {
      income: diff(IS_ROWS, withE.income, without.income),
      balance: diff(BS_ROWS, withE.balance, without.balance),
      cashFlow: [["operating", withE.cashFlow.operating.total, without.cashFlow.operating.total], ["investing", withE.cashFlow.investing.total, without.cashFlow.investing.total], ["financing", withE.cashFlow.financing.total, without.cashFlow.financing.total], ["netChange", withE.cashFlow.netChange, without.cashFlow.netChange]]
        .map(([k, x, y]) => ({ key: k, label: (CF_ROWS.find((r) => r[0] === k) || [])[1], delta: toDollars(x - y) })).filter((r) => r.delta !== 0)
    };
  }

  // Compare two states' statements for a period (used for "what changed" highlighting).
  function compare(before, after) {
    const out = {};
    const walk = (a, b, path) => {
      if (a && typeof a === "object" && !Array.isArray(a)) { Object.keys(Object.assign({}, a, b || {})).forEach((k) => walk(a[k], b && b[k], path + "." + k)); }
      else if (typeof a === "number" || typeof b === "number") { const d = Math.round(((b || 0) - (a || 0)) * 100) / 100; if (d !== 0) out[path.slice(1)] = d; }
    };
    walk(before, after, "");
    return out;
  }

  // ── Warnings ─────────────────────────────────────────────────────────
  function warningsFor(state, entry) {
    const w = [];
    const s = statements(state, entry.period, false);
    // Cash cannot really go below zero at the end of any period from this one on
    for (let p = entry.period; p <= state.periods; p++) {
      const st = statements(state, p, false);
      if (st.balance.cash < 0) { w.push("Cash would go below zero at the end of " + periodName(state, p) + ". A real business could not spend money it does not have."); break; }
    }
    for (let p = entry.period; p <= state.periods; p++) {
      const st = statements(state, p, false);
      if (st.balance.inventory < 0) { w.push("Inventory would go below zero in " + periodName(state, p) + ". You cannot sell goods you do not have."); break; }
    }
    for (let p = entry.period; p <= state.periods; p++) {
      const st = statements(state, p, false);
      if (st.balance.ar < 0) { w.push("Receivables would go below zero in " + periodName(state, p) + ". You cannot collect more than customers owe."); break; }
    }
    void s;
    return w;
  }

  function periodName(state, p) {
    return (state.periodLabels && state.periodLabels[p - 1]) || ("Month " + p);
  }

  // Describe a transaction as a journal entry for display.
  function journal(entry) {
    const b = buildLines(entry.type, entry.params);
    if (b.error) return [];
    return b.lines.map((l) => ({ acct: l.acct, name: ACCOUNTS[l.acct].name, side: l.side, amount: toDollars(l.c) }));
  }
  function describe(entry, fmt) {
    const tpl = T[entry.type];
    const p = paramsClean(tpl, entry.params);
    return tpl.plain(p, fmt || ((n) => "$" + Number(n).toLocaleString()));
  }

  // Run a whole scenario: [{period, type, params, memo}]
  function load(scenario) {
    const s = create({ name: scenario.name, periods: scenario.periods || 12, periodLabels: scenario.periodLabels });
    (scenario.entries || []).forEach((x) => { const r = addEntry(s, x.period, x.type, x.params, x.memo); if (!r.ok) throw new Error(scenario.name + ": " + r.error); });
    return s;
  }

  return { ACCOUNTS, TEMPLATES: T, GROUP_ORDER, create, clone, buildLines, addEntry, updateEntry, removeEntry, ordered, statements, statementsD, impact, compare, journal, describe, load, periodName, toCents, toDollars };
});
