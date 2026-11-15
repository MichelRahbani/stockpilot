/* Supply chain events for the Statements Lab. Each event is a bundle of ordinary
   transactions that can be added to any month. Every event buys the stock it sells,
   so it never pushes inventory below zero. */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AcctSupply = factory();
})(typeof self !== "undefined" ? self : this, function () {
  return [
    { id: "normal", title: "A normal month", story: "Buy stock on credit, sell it, pay the supplier next month. This is the baseline to compare the others against.",
      notice: "Profit and cash move in step, with a small delay from the credit.",
      entries: [
        { type: "buyInventory", params: { amount: 5000, paid: "credit" } },
        { type: "sale", params: { amount: 10000, cost: 5000, paid: "cash" } }
      ] },
    { id: "price", title: "Supplier raises prices", story: "Your supplier raises prices about 20%. You sell the same amount at the same price, but the goods cost more.",
      notice: "Revenue is unchanged, yet gross profit drops by $1,000. A supplier price rise lands straight in cost of goods sold.",
      entries: [
        { type: "buyInventory", params: { amount: 6000, paid: "cash" } },
        { type: "sale", params: { amount: 10000, cost: 6000, paid: "cash" } }
      ] },
    { id: "delay", title: "Supplier delay and a stockout", story: "A shipment arrives late. You pay for rush shipping and can only fill about a third of your orders.",
      notice: "Revenue falls, you pay extra freight, and the cost of the rush hits operating expenses. Lost sales never appear on any statement, but they are real.",
      entries: [
        { type: "buyInventory", params: { amount: 2000, paid: "cash" } },
        { type: "expense", params: { category: "otherExp", amount: 800, paid: "cash" } },
        { type: "sale", params: { amount: 3500, cost: 1750, paid: "cash" } }
      ] },
    { id: "spike", title: "Demand spike on credit", story: "Orders surge. You buy a lot of stock on credit and sell it all to customers who will pay later.",
      notice: "Profit jumps by $9,000 but operating cash flow is zero. Receivables and payables swell. Fast growth can drain cash even while profitable.",
      entries: [
        { type: "buyInventory", params: { amount: 9000, paid: "credit" } },
        { type: "sale", params: { amount: 18000, cost: 9000, paid: "credit" } }
      ] },
    { id: "overstock", title: "Overstocking", story: "You buy far more than you can sell this month, to be safe.",
      notice: "Profit does not change at all, but cash falls by $12,000 and sits on the shelf as inventory. Holding stock costs cash even when it is not an expense.",
      entries: [
        { type: "buyInventory", params: { amount: 12000, paid: "cash" } }
      ] },
    { id: "spoil", title: "Spoiled or damaged goods", story: "A fridge fails and part of your stock is thrown away.",
      notice: "Inventory falls and profit falls, but no cash moves now. The cash was spent when you bought the goods.",
      entries: [
        { type: "writeDown", params: { amount: 1500 } }
      ] },
    { id: "terms", title: "Longer supplier terms", story: "You negotiate to pay suppliers later. This month you buy on credit and do not pay for it yet.",
      notice: "Profit is the same as a normal month but cash is higher, because you are using the supplier's money. Accounts payable is the cushion.",
      entries: [
        { type: "buyInventory", params: { amount: 5000, paid: "credit" } },
        { type: "sale", params: { amount: 10000, cost: 5000, paid: "cash" } }
      ], note: "Then skip the 'Pay a supplier bill' step next month to see the effect." },
    { id: "pay", title: "Pay suppliers what you owe", story: "You settle all of your outstanding supplier bills.",
      notice: "No effect on profit. Cash and accounts payable both fall. Paying a bill is not an expense, because the expense was recorded when you bought the goods.",
      pay: true,
      entries: [] }
  ];
});
