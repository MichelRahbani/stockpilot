/* Starter companies for the Statements Lab. Each is a list of ordinary transactions. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AcctPresets = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return [
    { id: "lemonade", name: "Lemonade stand", blurb: "The simplest business. Start here.", periods: 6, periodLabels: M.slice(0, 6),
      entries: [
        { period: 1, type: "invest", params: { amount: 500 } },
        { period: 1, type: "buyEquipment", params: { amount: 120, paid: "cash" } },
        { period: 1, type: "buyInventory", params: { amount: 150, paid: "cash" } },
        { period: 1, type: "sale", params: { amount: 200, cost: 80, paid: "cash" } },
        { period: 2, type: "buyInventory", params: { amount: 100, paid: "cash" } },
        { period: 2, type: "sale", params: { amount: 260, cost: 110, paid: "cash" } },
        { period: 2, type: "expense", params: { category: "marketing", amount: 30, paid: "cash" } },
        { period: 3, type: "buyInventory", params: { amount: 80, paid: "cash" } },
        { period: 3, type: "sale", params: { amount: 300, cost: 120, paid: "credit" } },
        { period: 3, type: "depreciation", params: { amount: 10 } },
        { period: 4, type: "collect", params: { amount: 300 } },
        { period: 4, type: "dividend", params: { amount: 100 } }
      ] },
    { id: "coffee", name: "Coffee shop", blurb: "A loan, equipment, rent, wages and depreciation.", periods: 12, periodLabels: M,
      entries: [
        { period: 1, type: "invest", params: { amount: 30000 } },
        { period: 1, type: "borrow", params: { amount: 20000 } },
        { period: 1, type: "buyEquipment", params: { amount: 24000, paid: "cash" } },
        { period: 1, type: "prepay", params: { amount: 3000 } },
        { period: 1, type: "buyInventory", params: { amount: 4000, paid: "credit" } },
        { period: 1, type: "sale", params: { amount: 6000, cost: 1800, paid: "cash" } },
        { period: 1, type: "expense", params: { category: "wages", amount: 3200, paid: "cash" } },
        { period: 1, type: "usePrepaid", params: { category: "rent", amount: 1000 } },
        { period: 1, type: "depreciation", params: { amount: 400 } },
        { period: 2, type: "payAP", params: { amount: 4000 } },
        { period: 2, type: "buyInventory", params: { amount: 3000, paid: "cash" } },
        { period: 2, type: "sale", params: { amount: 8000, cost: 2400, paid: "cash" } },
        { period: 2, type: "expense", params: { category: "wages", amount: 3200, paid: "accrue" } },
        { period: 2, type: "usePrepaid", params: { category: "rent", amount: 1000 } },
        { period: 2, type: "interest", params: { amount: 150, paid: "cash" } },
        { period: 2, type: "depreciation", params: { amount: 400 } },
        { period: 3, type: "payAccrued", params: { amount: 3200 } },
        { period: 3, type: "sale", params: { amount: 9000, cost: 2700, paid: "cash" } },
        { period: 3, type: "expense", params: { category: "utilities", amount: 450, paid: "cash" } },
        { period: 3, type: "tax", params: { amount: 500, paid: "accrue" } },
        { period: 3, type: "repay", params: { amount: 1000 } },
        { period: 3, type: "depreciation", params: { amount: 400 } }
      ] },
    { id: "store", name: "Online store", blurb: "Credit sales, customer deposits, bad debts and a new purchase.", periods: 12, periodLabels: M,
      entries: [
        { period: 1, type: "invest", params: { amount: 40000 } },
        { period: 1, type: "buyEquipment", params: { amount: 12000, paid: "cash" } },
        { period: 1, type: "buyInventory", params: { amount: 15000, paid: "credit" } },
        { period: 2, type: "sale", params: { amount: 12000, cost: 5000, paid: "credit" } },
        { period: 2, type: "sale", params: { amount: 5000, cost: 2000, paid: "cash" } },
        { period: 2, type: "deposit", params: { amount: 2000 } },
        { period: 2, type: "expense", params: { category: "marketing", amount: 1500, paid: "cash" } },
        { period: 3, type: "collect", params: { amount: 9000 } },
        { period: 3, type: "earnDeposit", params: { amount: 2000 } },
        { period: 3, type: "badDebt", params: { amount: 400 } },
        { period: 3, type: "payAP", params: { amount: 10000 } },
        { period: 3, type: "expense", params: { category: "wages", amount: 2500, paid: "cash" } },
        { period: 3, type: "depreciation", params: { amount: 200 } },
        { period: 4, type: "writeOff", params: { amount: 300 } },
        { period: 4, type: "sale", params: { amount: 7000, cost: 2800, paid: "credit" } },
        { period: 4, type: "tax", params: { amount: 700, paid: "cash" } }
      ] },
    { id: "blank", name: "Blank company", blurb: "Start from zero and build your own.", periods: 12, periodLabels: M, entries: [] }
  ];
});
