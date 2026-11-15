/* Debit/Credit Blitz: scenarios and scoring. Pure logic, no DOM, so it can be tested in Node. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AcctBlitz = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const SECONDS = 60;
  // [level, text, debit account, credit account]
  const S = [
    [1, "The owner puts $5,000 of their own money into the business.", "Cash", "Owner's equity"],
    [1, "You sell goods for $300 cash.", "Cash", "Revenue"],
    [1, "You pay $800 cash for the month's rent.", "Rent expense", "Cash"],
    [1, "You buy $1,000 of inventory and pay cash.", "Inventory", "Cash"],
    [1, "You buy a $2,000 oven with cash.", "Equipment", "Cash"],
    [1, "You borrow $4,000 from the bank.", "Cash", "Loan payable"],
    [1, "You pay $600 of wages in cash.", "Wages expense", "Cash"],
    [1, "You pay the $150 electricity bill in cash.", "Utilities expense", "Cash"],
    [1, "You pay $200 cash for ads.", "Marketing expense", "Cash"],
    [1, "You repay $1,000 of the bank loan.", "Loan payable", "Cash"],
    [2, "You buy $900 of inventory on credit. You will pay the supplier later.", "Inventory", "Accounts payable"],
    [2, "You sell goods for $500 and the customer will pay next month.", "Accounts receivable", "Revenue"],
    [2, "A customer pays the $500 they owed you.", "Cash", "Accounts receivable"],
    [2, "You pay the supplier the $900 you owed.", "Accounts payable", "Cash"],
    [2, "You pay the owner a $300 dividend.", "Dividends", "Cash"],
    [2, "You pay $1,200 up front for a year of insurance.", "Prepaid expenses", "Cash"],
    [2, "A customer pays $400 in advance for an order you will deliver next month.", "Cash", "Unearned revenue"],
    [2, "You buy a $3,000 van and the bank lends you the money for it.", "Equipment", "Loan payable"],
    [2, "You pay $120 of interest on the loan.", "Interest expense", "Cash"],
    [2, "You use up $100 of the insurance you prepaid.", "Insurance expense", "Prepaid expenses"],
    [3, "You record $200 of depreciation on equipment.", "Depreciation expense", "Accumulated depreciation"],
    [3, "A customer will never pay their $250 bill. You write it off against your reserve.", "Allowance for bad debts", "Accounts receivable"],
    [3, "You estimate $300 of customer bills will go bad.", "Bad debt expense", "Allowance for bad debts"],
    [3, "You delivered the work a customer paid $400 for in advance.", "Unearned revenue", "Revenue"],
    [3, "Wages of $700 are earned this month but will be paid next month.", "Wages expense", "Accrued expenses"],
    [3, "You pay the $700 of wages you accrued last month.", "Accrued expenses", "Cash"],
    [3, "You sell goods that cost you $200. Record the cost of the goods sold.", "Cost of goods sold", "Inventory"],
    [3, "Some stock worth $150 spoils and is thrown out.", "Cost of goods sold", "Inventory"],
    [3, "You sell old equipment at its book value of $500 for cash.", "Cash", "Equipment"],
    [3, "You owe $90 in interest that you have not paid yet.", "Interest expense", "Accrued expenses"]
  ];
  const QUESTIONS = S.map((x) => ({ level: x[0], text: x[1], dr: x[2], cr: x[3] }));
  const POOL = ["Cash", "Accounts receivable", "Inventory", "Equipment", "Prepaid expenses", "Accounts payable", "Loan payable", "Owner's equity",
    "Revenue", "Cost of goods sold", "Rent expense", "Wages expense", "Marketing expense", "Utilities expense", "Interest expense", "Depreciation expense",
    "Bad debt expense", "Insurance expense", "Dividends", "Unearned revenue", "Accrued expenses", "Accumulated depreciation", "Allowance for bad debts"];

  function newGame(rng) {
    return { score: 0, combo: 0, best: 0, right: 0, wrong: 0, left: SECONDS, asked: 0, recent: [], rng: rng || Math.random, over: false };
  }
  function shuffle(a, rng) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function nextQuestion(st) {
    const lvl = st.asked < 6 ? 1 : st.asked < 14 ? 2 : 3;
    let pool = QUESTIONS.filter((q) => q.level <= lvl && st.recent.indexOf(q) < 0);
    if (!pool.length) pool = QUESTIONS.filter((q) => st.recent.indexOf(q) < 0);
    // lean toward the current level
    const hard = pool.filter((q) => q.level === lvl);
    if (hard.length && st.rng() < 0.6) pool = hard;
    const q = pool[Math.floor(st.rng() * pool.length)];
    st.recent.push(q); if (st.recent.length > 12) st.recent.shift();
    st.asked++;
    return q;
  }
  // Four choices: the right account plus three others (never the other side of the same entry as a trick).
  function options(q, side, rng) {
    rng = rng || Math.random;
    const want = side === "dr" ? q.dr : q.cr;
    const others = shuffle(POOL.filter((n) => n !== want), rng).slice(0, 3);
    return shuffle([want].concat(others), rng);
  }
  // Called once per finished entry. st.hit says whether both sides were right.
  function score(st) {
    if (st.hit) {
      st.right++; st.combo++; if (st.combo > st.best) st.best = st.combo;
      const pts = 10 + (st.combo % 3 === 0 ? 15 : 0);
      st.score += pts; return pts;
    }
    st.wrong++; st.combo = 0; return 0;
  }
  return { SECONDS, QUESTIONS, POOL, newGame, nextQuestion, options, score };
});
