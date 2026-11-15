/* Budget & Accounting lessons: beginner to intermediate. Plain English, worked examples, quick checks.
   Block types: ["p", text] ["key", text] ["ex", title, text] ["list", [items]] */
(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.AcctLessons = factory();
})(typeof self !== "undefined" ? self : this, function () {
  const L = [];
  const add = (o) => L.push(o);
  const LAB = (co) => ({ label: "Open the Statements Lab", href: "/accounting-lab" + (co ? "?co=" + co : "") });
  const TOOL = (hash, label) => ({ label: label, href: "/accounting-tools#" + hash });

  // ───────────── BEGINNER ─────────────
  add({ id: "why", level: "Beginner", title: "Budgeting vs accounting", mins: 4,
    blocks: [
      ["p", "A budget is a plan for the future: how much money you expect to earn and spend. Accounting is the record of what actually happened. You need both. The plan tells you where you want to go, and the record tells you where you are."],
      ["p", "Accounting is also the shared language of business. A bank deciding on a loan, an investor reading a company report and an owner checking if the business is healthy all read the same three statements. Learn them once and you can read almost any company."],
      ["key", "Budget = what you plan. Accounting = what happened. Compare them and you learn where the plan was wrong."],
      ["ex", "Example", "A coffee shop budgets $8,000 of sales for March. The accounting records show $9,200. The shop earned $1,200 more than planned, and the owner can now ask why (a new office nearby? a holiday?). Without the record there is nothing to learn from."]
    ],
    quiz: [
      { q: "Which one records what already happened?", o: ["A budget", "Accounting", "A forecast", "A goal"], a: 1, why: "Accounting records real events. A budget is a plan." },
      { q: "Why compare a budget to the accounting records?", o: ["To pay less tax", "To see where the plan was wrong", "To avoid keeping records", "To increase revenue automatically"], a: 1, why: "The gap between plan and reality is where you learn." }
    ] });

  add({ id: "equation", level: "Beginner", title: "The accounting equation", mins: 5,
    blocks: [
      ["p", "All of accounting rests on one equation:"],
      ["key", "Assets = Liabilities + Equity"],
      ["p", "Assets are what the business owns. Liabilities are what it owes to others. Equity is what is left over for the owner. Every business, from a lemonade stand to Apple, obeys this equation at every moment."],
      ["p", "Think of a house. If the house is worth $300,000 and you owe the bank $200,000, your equity is $100,000. Same equation: $300,000 = $200,000 + $100,000."],
      ["ex", "Why it always balances", "Every transaction changes at least two things in a way that keeps the equation true. If you borrow $1,000 from a bank, assets (cash) go up $1,000 and liabilities (the loan) go up $1,000. Both sides grew by the same amount. This is why it is called double-entry bookkeeping."],
      ["p", "In the Lab, the green check marks at the top confirm the equation holds after every change you make."]
    ],
    tryit: LAB("lemonade"),
    quiz: [
      { q: "A business has $50,000 of assets and $20,000 of liabilities. What is equity?", o: ["$70,000", "$30,000", "$20,000", "$50,000"], a: 1, why: "Equity = Assets - Liabilities = 50,000 - 20,000 = 30,000." },
      { q: "You borrow $1,000. What happens?", o: ["Assets up, liabilities up", "Assets up, equity up", "Liabilities down", "Nothing changes"], a: 0, why: "Cash (an asset) rises and so does the loan (a liability). Equity does not change." }
    ] });

  add({ id: "assets", level: "Beginner", title: "Assets: what a business owns", mins: 5,
    blocks: [
      ["p", "An asset is something the business owns that has value and will help it earn money. Assets are listed on the balance sheet in order of how quickly they turn into cash."],
      ["list", ["Current assets (used or turned into cash within a year): cash, accounts receivable (money customers owe you), inventory, prepaid expenses.", "Long-term assets: equipment, vehicles, buildings, land."]],
      ["p", "Accounts receivable shows up when you sell on credit. You have earned the money, but the customer has not paid yet. Prepaid expenses are things you paid for in advance, like a year of insurance. You have not used them up yet, so they are still an asset."],
      ["ex", "Example", "A bakery owns $4,000 cash, is owed $1,500 by a café that buys bread on credit, holds $800 of flour and has a $6,000 oven. Total assets: 4,000 + 1,500 + 800 + 6,000 = $12,300."],
      ["key", "Spending cash on an asset does not lower your total assets. Cash turns into equipment or inventory. It is a swap."]
    ],
    tryit: LAB("lemonade"),
    quiz: [
      { q: "Which is a current asset?", o: ["A delivery truck", "Money customers owe you", "A 10-year loan", "Owner's investment"], a: 1, why: "Accounts receivable will turn into cash within a year." },
      { q: "You pay $2,000 cash for equipment. Total assets...", o: ["Go up $2,000", "Go down $2,000", "Do not change", "Cannot tell"], a: 2, why: "Cash falls $2,000 and equipment rises $2,000. One asset swapped for another." }
    ] });

  add({ id: "liab-equity", level: "Beginner", title: "Liabilities and equity", mins: 5,
    blocks: [
      ["p", "A liability is something the business owes. Current liabilities are due within a year: accounts payable (bills from suppliers), accrued expenses (costs incurred but not yet paid, like this month's wages), and unearned revenue (money customers paid you for something you have not delivered yet). Long-term liabilities, like a five-year bank loan, are due later."],
      ["p", "Unearned revenue surprises people. If a customer pays you $500 today for work you will do next month, that $500 is not yours yet. You owe them the work, so it is a liability until you deliver."],
      ["p", "Equity is the owner's claim on the business. It has two main parts:"],
      ["list", ["Owner investment (or common stock): money the owner put in.", "Retained earnings: profits the business has kept over time, minus dividends paid out."]],
      ["ex", "Example", "You start a business with $10,000 of your own money and borrow $5,000. Cash is $15,000. Liabilities are $5,000 (the loan). Equity is $10,000 (your investment). Check: 15,000 = 5,000 + 10,000."],
      ["key", "Borrowing is not income. It raises cash and raises what you owe. Only earning money from customers raises equity."]
    ],
    tryit: LAB("coffee"),
    quiz: [
      { q: "A customer prepays $500 for work you will do next month. This is...", o: ["Revenue today", "A liability (unearned revenue)", "An expense", "Equity"], a: 1, why: "You owe the customer the work, so it is a liability until you deliver." },
      { q: "Which is part of equity?", o: ["Bank loan", "Accounts payable", "Retained earnings", "Inventory"], a: 2, why: "Retained earnings are profits kept in the business and belong to the owner." }
    ] });

  add({ id: "rev-exp", level: "Beginner", title: "Revenue, expenses and net income", mins: 5,
    blocks: [
      ["p", "Revenue is what the business earns by selling its goods or services. An expense is a cost of running the business. The difference is net income, which people also call profit."],
      ["key", "Net income = Revenue - Expenses"],
      ["p", "Net income matters because it is what grows the owner's equity. Each period, net income is added to retained earnings."],
      ["ex", "Example", "A tutoring business earns $3,000 in a month. It pays $1,200 wages, $400 rent and $100 for software. Expenses total $1,700. Net income is $1,300."],
      ["p", "Revenue and cash are different things. Revenue is recorded when you earn it, even if the customer has not paid. Expenses are recorded when you use something up, even if you have not paid for it. The next lessons show why."],
      ["p", "Things that are not expenses: buying equipment (it is an asset that gets used up slowly), repaying loan principal (it reduces a liability) and paying dividends (it is a payout to the owner)."]
    ],
    tryit: LAB("lemonade"),
    quiz: [
      { q: "Revenue is $9,000 and expenses are $6,500. Net income is...", o: ["$2,500", "$15,500", "$6,500", "$9,000"], a: 0, why: "9,000 - 6,500 = 2,500." },
      { q: "Which is NOT an expense?", o: ["Rent", "Wages", "Repaying loan principal", "Utilities"], a: 2, why: "Repaying principal only reduces a liability. The interest on the loan is the expense." }
    ] });

  add({ id: "debits", level: "Beginner", title: "Debits and credits", mins: 6,
    blocks: [
      ["p", "Debit and credit sound mysterious but they just mean left and right. Debit is the left side of an entry and credit is the right side. They are not good or bad. In accounting, a debit is not the same as a bank's debit card."],
      ["p", "Each account increases on one side:"],
      ["list", ["Assets and expenses increase with a debit.", "Liabilities, equity and revenue increase with a credit."]],
      ["p", "A handy memory aid is DEALER. Dividends, Expenses and Assets are increased by debits. Liabilities, Equity and Revenue are increased by credits."],
      ["key", "Every journal entry has total debits equal to total credits. That is how the equation stays in balance."],
      ["ex", "Example: you sell $200 of lemonade for cash", "Debit Cash $200 (an asset goes up). Credit Sales revenue $200 (revenue goes up). Left side $200, right side $200."],
      ["p", "In the Lab, click any transaction and the journal entry appears with the debits and credits listed."]
    ],
    tryit: LAB("lemonade"),
    quiz: [
      { q: "To increase an expense you...", o: ["Debit it", "Credit it", "Either", "Neither"], a: 0, why: "Expenses increase with a debit." },
      { q: "You collect $300 from a customer who owed you. What is the entry?", o: ["Debit Cash, credit Accounts receivable", "Debit Revenue, credit Cash", "Debit Accounts receivable, credit Cash", "Debit Cash, credit Revenue"], a: 0, why: "Cash goes up (debit) and the receivable shrinks (credit). The revenue was recorded earlier." }
    ] });

  add({ id: "journal", level: "Beginner", title: "Journal entries and the ledger", mins: 6,
    blocks: [
      ["p", "A journal is the diary of the business. Every transaction is written down in date order as a journal entry: which accounts changed, whether each was debited or credited, and by how much."],
      ["p", "A ledger collects all the entries for each account in one place. A simple picture of one account is a T-account. The left side holds debits, the right side holds credits, and the difference is the balance."],
      ["ex", "A Cash T-account", "Debits (cash in): 10,000 owner investment, 2,000 sale. Credits (cash out): 4,000 equipment, 800 wages. Balance: 12,000 - 4,800 = $7,200 of cash."],
      ["p", "At the end of a period you add up every account. A list of all the account balances is called a trial balance. If total debits equal total credits, the books balance. Then you use the balances to build the three statements."],
      ["key", "Journal (every transaction in order) -> Ledger (grouped by account) -> Trial balance (check) -> Financial statements."]
    ],
    tryit: TOOL("journal", "Practice journal entries"),
    quiz: [
      { q: "What does a trial balance check?", o: ["That profit is high", "That debits equal credits", "That taxes are paid", "That cash is positive"], a: 1, why: "If total debits and credits differ, there is an error somewhere in the entries." },
      { q: "A ledger groups transactions by...", o: ["Date", "Customer", "Account", "Amount"], a: 2, why: "The journal is by date. The ledger is by account." }
    ] });

  add({ id: "three", level: "Beginner", title: "The three financial statements", mins: 5,
    blocks: [
      ["p", "Businesses report with three statements. Each answers a different question."],
      ["list", ["Income statement: Did the business make money over a period? (revenue minus expenses)", "Balance sheet: What does it own and owe at one moment? (assets, liabilities, equity)", "Cash flow statement: Where did the cash come from and where did it go over a period?"]],
      ["p", "The income statement and cash flow statement cover a stretch of time (a month, a year). The balance sheet is a snapshot on one date, like a photo."],
      ["p", "They are connected. Net income flows into retained earnings on the balance sheet. The cash flow statement explains the change in the balance sheet's cash. This is why the Lab moves all three at once."],
      ["key", "A company can be profitable and still run out of cash. That is why you need all three, not just the income statement."]
    ],
    tryit: LAB("coffee"),
    quiz: [
      { q: "Which statement is a snapshot at one date?", o: ["Income statement", "Balance sheet", "Cash flow statement", "All of them"], a: 1, why: "The balance sheet shows what exists on one day. The other two cover a period." },
      { q: "Which statement explains the change in cash?", o: ["Income statement", "Balance sheet", "Cash flow statement", "Trial balance"], a: 2, why: "The cash flow statement reconciles the starting cash to the ending cash." }
    ] });

  add({ id: "cash-accrual", level: "Beginner", title: "Cash vs accrual accounting", mins: 6,
    blocks: [
      ["p", "There are two ways to decide when something counts."],
      ["list", ["Cash basis: record revenue when cash arrives and expenses when cash leaves. Simple, and what most people use for their own budget.", "Accrual basis: record revenue when it is earned and expenses when they are incurred, no matter when cash moves. This is what companies use to give an accurate picture."]],
      ["ex", "Example", "In December you design a website for a client and invoice $2,000. The client pays in January. On a cash basis the revenue is in January. On an accrual basis the revenue is in December, because that is when you did the work. Accrual matches the effort to the period it belongs to."],
      ["p", "This matching idea is called the matching principle: expenses should be recorded in the same period as the revenue they helped create. It is the reason inventory is not an expense when you buy it, but when you sell it."],
      ["key", "Accrual accounting shows performance. Cash accounting shows only cash. You need the cash flow statement to see both."]
    ],
    tryit: LAB("store"),
    quiz: [
      { q: "Work done in December, paid in January. Accrual revenue is recorded in...", o: ["January", "December", "Both", "Neither"], a: 1, why: "Revenue is recorded when it is earned." },
      { q: "Matching principle means...", o: ["Expenses are recorded with the revenue they help earn", "Revenue equals cash", "Debits match credits", "Assets match liabilities"], a: 0, why: "Costs go in the same period as the revenue they produced." }
    ] });

  add({ id: "read-bs", level: "Beginner", title: "Reading a balance sheet", mins: 5,
    blocks: [
      ["p", "When you look at a balance sheet, check three things first."],
      ["list", ["Is there enough cash and near-cash (receivables, inventory) to pay what is due soon?", "How much of the business is funded by debt versus the owner's own money?", "Are retained earnings positive? That means the business has made more profit than it has paid out."]],
      ["ex", "Example", "Company A: assets $100,000, liabilities $80,000, equity $20,000. Company B: assets $100,000, liabilities $30,000, equity $70,000. Same size, but A relies much more on borrowed money, so a bad year hurts it more."],
      ["p", "Compare current assets to current liabilities. If current assets are bigger, the business can probably pay its bills over the next year. This is called the current ratio, and a later lesson covers it."]
    ],
    tryit: TOOL("ratios", "Try the ratio analyzer"),
    quiz: [
      { q: "Which company is riskier?", o: ["Assets 100k, liabilities 80k", "Assets 100k, liabilities 30k", "They are equal", "Cannot tell"], a: 0, why: "More debt means fixed payments that must be made even in a bad year." },
      { q: "Positive retained earnings means...", o: ["Lots of cash", "The business has kept more profit than it paid out", "No debt", "High revenue"], a: 1, why: "It is the running total of profits less dividends." }
    ] });

  // ───────────── INTERMEDIATE ─────────────
  add({ id: "income-detail", level: "Intermediate", title: "The income statement in depth", mins: 6,
    blocks: [
      ["p", "A good income statement is built in layers so you can see where profit is made or lost."],
      ["list", ["Revenue", "- Cost of goods sold (COGS) = Gross profit", "- Operating expenses (wages, rent, marketing, depreciation) = Operating income", "- Interest and taxes = Net income"]],
      ["p", "Gross profit shows whether the product itself is profitable. Operating income shows whether the whole operation is. Net income is what is left after the lender and the government are paid."],
      ["ex", "Example", "Revenue $100,000. COGS $60,000, so gross profit is $40,000 (a 40% gross margin). Operating expenses $25,000, so operating income is $15,000. Interest $2,000 and tax $3,000 leave net income of $10,000, a 10% net margin."],
      ["p", "Margins (profit divided by revenue) let you compare businesses of different sizes."],
      ["key", "If gross margin is healthy but net margin is thin, the problem is expenses. If gross margin is thin, the problem is pricing or product cost."]
    ],
    tryit: TOOL("ratios", "Calculate margins"),
    quiz: [
      { q: "Revenue 80k, COGS 50k, opex 20k. Operating income?", o: ["30k", "10k", "20k", "50k"], a: 1, why: "80 - 50 = 30 gross profit; 30 - 20 = 10 operating income." },
      { q: "Gross profit divided by revenue is called...", o: ["Net margin", "Gross margin", "Current ratio", "ROE"], a: 1, why: "Gross margin = gross profit / revenue." }
    ] });

  add({ id: "cash-flow", level: "Intermediate", title: "The statement of cash flows", mins: 7,
    blocks: [
      ["p", "The cash flow statement sorts every cash movement into three buckets:"],
      ["list", ["Operating: cash from running the business (customers, suppliers, wages, interest, taxes).", "Investing: buying or selling long-term assets like equipment.", "Financing: money from or to owners and lenders (investment, loans, repayments, dividends)."]],
      ["p", "Most companies use the indirect method. It starts with net income and adjusts it to cash. Two kinds of adjustments:"],
      ["list", ["Add back expenses that used no cash, like depreciation.", "Adjust for changes in working capital. If receivables rose, you earned revenue you have not collected, so subtract the increase. If payables rose, you have not paid some bills yet, so add the increase."]],
      ["ex", "Example", "Net income $10,000. Depreciation $2,000 (add back). Receivables went up $3,000 (subtract). Inventory went down $1,000 (add). Payables went up $500 (add). Cash from operations = 10,000 + 2,000 - 3,000 + 1,000 + 500 = $10,500."],
      ["key", "A rule of thumb: an increase in an asset (other than cash) uses cash. An increase in a liability provides cash."]
    ],
    tryit: LAB("store"),
    quiz: [
      { q: "Depreciation on the cash flow statement is...", o: ["Subtracted", "Added back", "Ignored", "A financing item"], a: 1, why: "It reduced net income but no cash left, so it is added back." },
      { q: "Receivables rose by $2,000. The effect on operating cash flow is...", o: ["+2,000", "-2,000", "0", "Cannot tell"], a: 1, why: "You recorded revenue but did not receive the cash." },
      { q: "Repaying a bank loan is...", o: ["Operating", "Investing", "Financing", "An expense"], a: 2, why: "Loans are a financing source, so repaying them is a financing cash flow." }
    ] });

  add({ id: "connect", level: "Intermediate", title: "How the three statements connect", mins: 6,
    blocks: [
      ["p", "The statements are not three separate reports. They are three views of the same events."],
      ["list", ["Net income from the income statement flows into retained earnings on the balance sheet.", "Net income is also the first line of the cash flow statement.", "The cash flow statement's ending cash must equal the cash on the balance sheet.", "Dividends reduce retained earnings but do not touch the income statement."]],
      ["ex", "One event, three statements", "You sell $1,000 of goods on credit that cost you $400. Income statement: revenue +1,000, COGS +400, net income +600. Balance sheet: receivables +1,000, inventory -400, retained earnings +600. Cash flow: net income +600, but receivables rose 1,000 (subtract) and inventory fell 400 (add), so operating cash flow is 0. No cash came in yet."],
      ["p", "That last line is the key insight: a profitable sale on credit can create zero cash. Try it in the Lab. Add a credit sale and watch the three statements."],
      ["key", "If you change one number, all three statements must change. If they do not, something was recorded wrong."]
    ],
    tryit: LAB("store"),
    quiz: [
      { q: "Where does net income end up on the balance sheet?", o: ["Cash", "Retained earnings", "Liabilities", "Inventory"], a: 1, why: "Profit grows retained earnings, which is part of equity." },
      { q: "A credit sale has what effect on operating cash flow right away?", o: ["Raises it by the sale", "No effect", "Lowers it", "Raises it by the profit"], a: 1, why: "The profit is offset by the rise in receivables. Cash arrives later." }
    ] });

  add({ id: "adjusting", level: "Intermediate", title: "Adjusting entries: accruals and deferrals", mins: 6,
    blocks: [
      ["p", "At the end of a period, accountants adjust the books so revenue and expenses land in the right period. Four common cases:"],
      ["list", ["Accrued expense: you used something but have not paid (wages earned by staff but unpaid). Debit expense, credit accrued liability.", "Prepaid expense: you paid in advance and use it over time (insurance). Debit expense, credit prepaid asset as it is used.", "Unearned revenue: customer paid in advance. Debit unearned revenue, credit revenue as you deliver.", "Accrued revenue: you earned it but have not billed it. Debit receivable, credit revenue."]],
      ["ex", "Example", "You pay $1,200 on January 1 for a year of insurance. That is a prepaid asset of $1,200. Each month, $100 becomes insurance expense and the prepaid asset shrinks by $100. After three months the asset is $900 and $300 has been expensed."],
      ["key", "Adjusting entries never involve cash. They move amounts between the balance sheet and income statement."]
    ],
    tryit: LAB("coffee"),
    quiz: [
      { q: "You paid $1,200 for 12 months of insurance on Jan 1. Insurance expense for January is...", o: ["$1,200", "$100", "$0", "$300"], a: 1, why: "1,200 / 12 = 100 per month." },
      { q: "Wages earned but unpaid at month end create...", o: ["An accrued expense (liability)", "Prepaid asset", "Revenue", "Equity"], a: 0, why: "The expense counts now and the unpaid amount is owed." }
    ] });

  add({ id: "receivables", level: "Intermediate", title: "Receivables and bad debts", mins: 6,
    blocks: [
      ["p", "Selling on credit builds sales, but some customers never pay. Accrual accounting recognizes this up front with the allowance method."],
      ["list", ["Estimate how much of your receivables you will not collect. Record bad debt expense and a credit to the allowance for doubtful accounts (a contra asset that reduces receivables).", "When a specific customer is declared uncollectible, write it off: debit the allowance and credit receivables. This does not change net receivables or income, because the loss was already counted."]],
      ["p", "On the balance sheet you show net receivables: receivables minus the allowance. That is the amount you actually expect to collect."],
      ["ex", "Example", "Receivables are $50,000 and you estimate 4% will not be paid. Bad debt expense is $2,000. Net receivables on the balance sheet are $48,000."],
      ["p", "Aging analysis is a common way to estimate. Older unpaid invoices are more likely to go bad, so each age bucket gets a higher percentage. The Tools page has an aging calculator."]
    ],
    tryit: TOOL("aging", "Try the bad-debt aging tool"),
    quiz: [
      { q: "A write-off of a specific bad account changes net income by...", o: ["The full amount", "Nothing (it was estimated earlier)", "Half the amount", "It increases income"], a: 1, why: "Under the allowance method, the expense was recorded when the estimate was made." },
      { q: "Net receivables equal...", o: ["Receivables + allowance", "Receivables - allowance", "Sales - cash", "Allowance only"], a: 1, why: "The allowance reduces receivables to what you expect to collect." }
    ] });

  add({ id: "inventory", level: "Intermediate", title: "Inventory and cost of goods sold", mins: 7,
    blocks: [
      ["p", "Inventory is an asset until it is sold. When it sells, its cost moves to the income statement as cost of goods sold (COGS). When prices change, you must decide which cost applies to the item sold."],
      ["list", ["FIFO (first in, first out): the oldest costs are sold first.", "LIFO (last in, first out): the newest costs are sold first. Allowed in the US but not under international rules.", "Weighted average: use the average cost of all units available."]],
      ["ex", "Example", "You buy 10 units at $5, then 10 at $7. You sell 10. FIFO COGS is 10 x $5 = $50. LIFO COGS is 10 x $7 = $70. Weighted average is $6 per unit, so $60. Revenue is the same in each case but profit differs: FIFO shows $20 more profit than LIFO when prices rise."],
      ["p", "In rising prices FIFO gives higher profit and higher inventory value. LIFO gives lower profit (and lower taxes) and lower inventory value. The total cost over the life of the business is the same. Only the timing differs."],
      ["key", "Gross profit = Revenue - COGS. The method you pick changes COGS, and so your reported profit."]
    ],
    tryit: TOOL("inventory", "Compare FIFO, LIFO and average"),
    quiz: [
      { q: "Prices are rising. Which method reports the highest profit?", o: ["FIFO", "LIFO", "Weighted average", "All the same"], a: 0, why: "FIFO matches older, cheaper costs to current sales." },
      { q: "Inventory is recorded as an expense when...", o: ["It is purchased", "It is sold", "It is counted", "It is paid for"], a: 1, why: "It becomes COGS when sold (matching principle)." }
    ] });

  add({ id: "depreciation", level: "Intermediate", title: "Fixed assets and depreciation", mins: 6,
    blocks: [
      ["p", "Equipment helps earn revenue over many years, so its cost is spread across those years. That spreading is depreciation. It is an allocation of cost, not a measure of market value, and it uses no cash in the period."],
      ["p", "Straight-line depreciation: (cost - salvage value) / useful life."],
      ["list", ["Cost: what you paid to get it ready for use.", "Salvage value: what you expect it to be worth at the end.", "Useful life: how many years you expect to use it."]],
      ["ex", "Example", "A $12,000 oven with $2,000 salvage value and a 5-year life. Annual depreciation is (12,000 - 2,000) / 5 = $2,000. After year 1 the book value is $10,000. After year 5 it is $2,000."],
      ["p", "On the balance sheet, accumulated depreciation is a contra asset that sits next to the equipment. Equipment minus accumulated depreciation equals book value."],
      ["p", "Declining-balance methods take more depreciation early. They match assets that lose usefulness quickly, like computers."],
      ["key", "Depreciation lowers profit but not cash, so it is added back on the cash flow statement."]
    ],
    tryit: TOOL("depreciation", "Build a depreciation schedule"),
    quiz: [
      { q: "Cost 9,000, salvage 1,000, life 4 years. Straight-line annual depreciation?", o: ["$2,000", "$2,250", "$1,000", "$8,000"], a: 0, why: "(9,000 - 1,000) / 4 = 2,000." },
      { q: "Depreciation affects cash...", o: ["Every year", "Not at all in the period (cash left when the asset was bought)", "Only at the end", "Only for loans"], a: 1, why: "The cash left when you bought the asset. Depreciation just spreads the cost." }
    ] });

  add({ id: "loans", level: "Intermediate", title: "Loans, interest and amortization", mins: 6,
    blocks: [
      ["p", "A loan payment usually has two parts: interest (the cost of borrowing, an expense) and principal (paying back the loan, which reduces the liability)."],
      ["p", "With an amortizing loan, the payment is the same each period. At first, most of it is interest. Over time, more goes to principal."],
      ["ex", "Example", "A $10,000 loan at 6% a year with monthly payments. Month 1 interest is 10,000 x 0.5% = $50. If the payment is $193.33 (a 5-year loan), $143.33 goes to principal and the balance drops to $9,856.67. Next month interest is calculated on the lower balance."],
      ["p", "Only the interest hits the income statement. The principal portion is a financing cash flow on the cash flow statement, and interest is operating cash flow."],
      ["key", "Borrowing raises cash and liabilities but not income. Interest is the true cost."]
    ],
    tryit: TOOL("loan", "Use the loan amortization tool"),
    quiz: [
      { q: "Which part of a loan payment is an expense?", o: ["Interest", "Principal", "Both", "Neither"], a: 0, why: "Principal repays what you owe. Interest is the cost." },
      { q: "In an amortizing loan, the interest portion over time...", o: ["Rises", "Falls", "Stays the same", "Is zero"], a: 1, why: "Interest is charged on a shrinking balance." }
    ] });

  add({ id: "equity", level: "Intermediate", title: "Equity: retained earnings and dividends", mins: 5,
    blocks: [
      ["p", "Retained earnings is the running total of all profit the business has kept."],
      ["key", "Ending retained earnings = Beginning retained earnings + Net income - Dividends"],
      ["ex", "Example", "A business starts the year with $20,000 retained earnings. It earns $15,000 and pays $5,000 in dividends. Ending retained earnings: 20,000 + 15,000 - 5,000 = $30,000."],
      ["p", "Dividends are a distribution of profit to owners. They are not an expense, so they do not reduce net income. They reduce cash and retained earnings."],
      ["p", "A net loss reduces retained earnings. If losses add up past the profits, retained earnings go negative, and this is called an accumulated deficit."]
    ],
    tryit: LAB("lemonade"),
    quiz: [
      { q: "Do dividends appear on the income statement?", o: ["Yes, as an expense", "No", "Yes, as revenue", "Only if large"], a: 1, why: "Dividends are a distribution of profit. They reduce retained earnings directly." },
      { q: "Beginning RE 10k, net income 6k, dividends 2k. Ending RE?", o: ["14k", "18k", "8k", "16k"], a: 0, why: "10 + 6 - 2 = 14." }
    ] });

  add({ id: "ratios", level: "Intermediate", title: "Financial ratios", mins: 7,
    blocks: [
      ["p", "Ratios turn the statements into comparable numbers. Four families cover most questions."],
      ["list", ["Liquidity (can it pay short-term bills?): Current ratio = current assets / current liabilities. Quick ratio removes inventory.", "Profitability (does it make money?): Gross margin, net margin = net income / revenue. Return on equity = net income / equity.", "Leverage (how much debt?): Debt-to-equity = total liabilities / equity.", "Efficiency (how well are assets used?): Inventory turnover = COGS / average inventory."]],
      ["ex", "Example", "Current assets $60,000, current liabilities $40,000: current ratio 1.5. Net income $10,000 on revenue $100,000: 10% net margin. Liabilities $80,000, equity $40,000: debt-to-equity 2.0."],
      ["p", "No ratio is good or bad on its own. Compare to the same company in earlier years and to similar businesses. A grocery store and a software company have very different normal ranges."]
    ],
    tryit: TOOL("ratios", "Open the ratio analyzer"),
    quiz: [
      { q: "A current ratio below 1 suggests...", o: ["Strong liquidity", "Possible trouble paying short-term bills", "High profit", "Low debt"], a: 1, why: "Current liabilities exceed current assets." },
      { q: "Net income 5k, equity 25k. ROE?", o: ["20%", "5%", "30%", "125%"], a: 0, why: "5 / 25 = 0.20." }
    ] });

  add({ id: "working-capital", level: "Intermediate", title: "Working capital and the cash cycle", mins: 6,
    blocks: [
      ["p", "Working capital is current assets minus current liabilities. It is the cushion that pays everyday bills."],
      ["p", "The cash conversion cycle measures how long money is tied up between paying suppliers and collecting from customers."],
      ["key", "Cash cycle = Days inventory + Days receivable - Days payable"],
      ["ex", "Example", "Inventory sits 40 days before it sells. Customers take 30 days to pay. You take 25 days to pay suppliers. Cash cycle: 40 + 30 - 25 = 45 days. For 45 days you are funding the business with your own cash or a loan."],
      ["p", "Growing fast can drain cash even when profitable, because you pay for inventory and wages before customers pay. Shortening the cycle (collect faster, hold less stock, negotiate longer supplier terms) frees cash."]
    ],
    tryit: TOOL("cycle", "Calculate your cash cycle"),
    quiz: [
      { q: "Days inventory 30, days receivable 20, days payable 40. Cash cycle?", o: ["10 days", "90 days", "50 days", "-10 days"], a: 0, why: "30 + 20 - 40 = 10." },
      { q: "A fast-growing profitable company can run out of cash because...", o: ["Profit is fake", "It pays costs before customers pay it", "Taxes are due", "Depreciation is high"], a: 1, why: "Growth ties up cash in inventory and receivables." }
    ] });

  add({ id: "breakeven", level: "Intermediate", title: "Break-even and contribution margin", mins: 6,
    blocks: [
      ["p", "Costs fall into two groups. Fixed costs stay the same however much you sell (rent, salaries). Variable costs rise with each unit sold (ingredients, packaging)."],
      ["p", "Contribution margin per unit = price - variable cost per unit. It is what each sale contributes to covering fixed costs and then making profit."],
      ["key", "Break-even units = Fixed costs / Contribution margin per unit"],
      ["ex", "Example", "A coffee costs $1.20 to make and sells for $4.00. Contribution is $2.80. Fixed costs are $5,600 a month. Break-even is 5,600 / 2.80 = 2,000 coffees. Sell 2,500 and profit is 500 x 2.80 = $1,400."],
      ["p", "Break-even tells you how risky a plan is. A business with high fixed costs needs high volume to survive."]
    ],
    tryit: TOOL("breakeven", "Try the break-even tool"),
    quiz: [
      { q: "Price $10, variable cost $6, fixed costs $2,000. Break-even units?", o: ["500", "200", "333", "2,000"], a: 0, why: "Contribution is 4. 2,000 / 4 = 500." },
      { q: "Rent is...", o: ["A variable cost", "A fixed cost", "COGS", "Revenue"], a: 1, why: "Rent does not change with sales volume." }
    ] });

  add({ id: "tvm", level: "Intermediate", title: "The time value of money", mins: 6,
    blocks: [
      ["p", "A dollar today is worth more than a dollar next year, because today's dollar can earn interest. This idea underlies loans, investments and budgeting."],
      ["list", ["Future value: FV = PV x (1 + r)^n", "Present value: PV = FV / (1 + r)^n"]],
      ["ex", "Example", "$1,000 invested at 5% a year for 10 years grows to 1,000 x 1.05^10 = $1,628.89. Going the other way, $1,628.89 ten years from now is worth $1,000 today at 5%."],
      ["p", "Businesses use present value to compare projects whose money arrives at different times. A project that pays $12,000 in three years may be worth less today than one that pays $10,000 right now."],
      ["p", "This is the same math that appears in the StockPilot compound interest tools, applied to business decisions."]
    ],
    tryit: TOOL("tvm", "Run a time value calculator"),
    quiz: [
      { q: "Why is $100 today worth more than $100 in a year?", o: ["Inflation only", "It can earn a return in the meantime", "Taxes", "It is not"], a: 1, why: "Money invested now earns interest." },
      { q: "$1,000 at 10% for 2 years becomes...", o: ["$1,200", "$1,210", "$1,100", "$1,020"], a: 1, why: "1,000 x 1.1 x 1.1 = 1,210." }
    ] });

  add({ id: "mistakes", level: "Intermediate", title: "Common mistakes and how to spot them", mins: 5,
    blocks: [
      ["p", "These errors trip up beginners and professionals alike. Each one is easy to spot once you know the pattern."],
      ["list", ["Treating a loan as income. It raises cash but also a liability. Equity does not move.", "Expensing a long-term asset all at once instead of depreciating it.", "Calling inventory purchases an expense. They are an asset until sold.", "Forgetting that dividends and loan principal are not expenses.", "Confusing profit with cash. Check the cash flow statement.", "Recording revenue when cash arrives instead of when it is earned (under accrual).", "Ignoring bad debts, which overstates both receivables and profit."]],
      ["key", "Use the checks in the Lab. If assets do not equal liabilities plus equity, or the cash flow statement does not end at the balance sheet cash, an entry is wrong."],
      ["p", "In the Lab, try making a deliberately odd change, like a huge sale with a tiny cost, and watch how the margins and cash respond. Strange results are a clue, not a verdict."]
    ],
    tryit: LAB("store"),
    quiz: [
      { q: "Which is a mistake?", o: ["Depreciating equipment", "Recording a bank loan as revenue", "Accruing unpaid wages", "Writing off a bad debt against the allowance"], a: 1, why: "A loan is a liability, not revenue." },
      { q: "Buying inventory is recorded as...", o: ["An expense", "An asset", "Revenue", "A dividend"], a: 1, why: "It becomes COGS only when sold." }
    ] });


  // ───────────── SUPPLY CHAIN ─────────────
  add({ id: "sc-what", level: "Supply chain", title: "What a supply chain is", mins: 5,
    blocks: [
      ["p", "A supply chain is every step between a raw material and a customer: suppliers make parts, manufacturers build the product, distributors move it, and a store or website sells it. Money flows the other way, from the customer back to every link."],
      ["p", "For a small business the chain is usually short. A coffee shop buys beans from a roaster, milk from a dairy and cups from a packaging company. Each of those suppliers has its own suppliers, and a problem anywhere along the way can reach you."],
      ["key", "Goods flow forward to the customer. Cash flows backward to the suppliers. The gap in timing between those two flows is where businesses get into trouble."],
      ["ex", "Example", "A shop orders $5,000 of goods on credit, sells them for $10,000 and pays the supplier 30 days later. For those 30 days the supplier is lending the shop $5,000 for free. Supply chain choices are money choices."],
      ["p", "In accounting terms, supply chain shows up in four places: inventory (an asset), accounts payable (a liability), cost of goods sold (an expense) and the cash cycle."]
    ],
    tryit: { label: "See a normal month in the Lab", href: "/accounting-lab?co=coffee&sc=1" },
    quiz: [
      { q: "Goods flow toward the customer. Cash flows...", o: ["The same way", "Back toward suppliers", "Nowhere", "Only to the owner"], a: 1, why: "Customers pay the business, which pays its suppliers." },
      { q: "Which is an asset created by the supply chain?", o: ["Accounts payable", "Inventory", "Retained earnings", "Interest"], a: 1, why: "Stock waiting to be sold is inventory." }
    ] });

  add({ id: "sc-lead", level: "Supply chain", title: "Suppliers and lead time", mins: 5,
    blocks: [
      ["p", "Lead time is the number of days between placing an order and having the goods ready to sell. It includes the supplier's production time, shipping and any customs or inspection delays."],
      ["p", "Lead time matters because you must order before you run out. If lead time is 10 days, you need enough stock on hand to cover 10 days of sales while the order is on its way."],
      ["list", ["Short, reliable lead times let you hold less stock.", "Long or unpredictable lead times force you to hold more stock as a safety cushion, which ties up cash.", "Relying on one supplier is risky. A second supplier costs effort but protects you from a single point of failure."]],
      ["ex", "Example", "You sell 20 units a day and the supplier takes 7 days. While you wait, you will sell 140 units. If you reorder with fewer than 140 units left, you will run out before the order arrives."],
      ["key", "Supplier reliability is worth paying for. A cheaper supplier who is often late can cost more in lost sales than you save on price."]
    ],
    tryit: { label: "Calculate a reorder point", href: "/accounting-tools#reorder" },
    quiz: [
      { q: "Sales are 10 units a day and lead time is 5 days. How much do you sell while waiting?", o: ["15", "50", "5", "10"], a: 1, why: "10 x 5 = 50 units." },
      { q: "Which is a downside of depending on one supplier?", o: ["Lower prices", "A single failure can stop your sales", "Faster shipping", "Higher profit"], a: 1, why: "If that supplier has a problem, you have no backup." }
    ] });

  add({ id: "sc-costs", level: "Supply chain", title: "The three costs of inventory", mins: 6,
    blocks: [
      ["p", "Inventory is not free to hold, and running short is not free either. Three costs pull against each other."],
      ["list", ["Ordering cost: the work and fees each time you place an order (paperwork, shipping, receiving). More small orders means more of this cost.", "Holding cost: the cost of keeping stock (storage, insurance, spoilage and the cash tied up that could earn a return). More stock means more of this cost.", "Stockout cost: lost sales, unhappy customers and rush shipping when you run out."]],
      ["p", "A common estimate is that holding inventory costs 20% to 30% of its value each year once you count storage, damage and the money it ties up."],
      ["ex", "Example", "You hold $20,000 of inventory and holding costs 25% a year. That is $5,000 a year to keep it on the shelf, even though none of it appears as a single bill."],
      ["key", "Good inventory management is finding the point where these three costs are lowest together, not minimizing any one."]
    ],
    tryit: { label: "Price a stockout", href: "/accounting-tools#stockout" },
    quiz: [
      { q: "Ordering in smaller batches more often usually raises...", o: ["Holding cost", "Ordering cost", "Revenue", "Depreciation"], a: 1, why: "Each order has a fixed cost, so more orders cost more." },
      { q: "Holding $10,000 of stock at 20% a year costs about...", o: ["$200", "$2,000", "$20,000", "$10,000"], a: 1, why: "10,000 x 0.20 = 2,000." }
    ] });

  add({ id: "sc-reorder", level: "Supply chain", title: "Reorder points and safety stock", mins: 6,
    blocks: [
      ["p", "A reorder point is the stock level that tells you it is time to place an order. Safety stock is the extra cushion for surprises, like a late shipment or a sudden rush of customers."],
      ["key", "Reorder point = Daily demand x Lead time + Safety stock"],
      ["ex", "Example", "You sell 20 units a day, lead time is 7 days and you keep 30 units of safety stock. Reorder point = 20 x 7 + 30 = 170 units. When stock falls to 170, you order."],
      ["p", "One simple way to size safety stock is to plan for the worst case: (highest daily sales x longest lead time) minus (average daily sales x average lead time). With a worst case of 30 a day over 10 days and an average of 20 a day over 7 days, safety stock is 300 - 140 = 160 units."],
      ["p", "More safety stock means fewer stockouts but more cash tied up. Bigger businesses use statistics to balance the two, but the logic is the same."]
    ],
    tryit: { label: "Use the reorder point tool", href: "/accounting-tools#reorder" },
    quiz: [
      { q: "Daily demand 10, lead time 6, safety stock 15. Reorder point?", o: ["60", "75", "90", "15"], a: 1, why: "10 x 6 + 15 = 75." },
      { q: "More safety stock means...", o: ["Fewer stockouts but more cash tied up", "More stockouts", "Lower storage cost", "No cost"], a: 0, why: "It is insurance, and insurance has a price." }
    ] });

  add({ id: "sc-eoq", level: "Supply chain", title: "How much to order: EOQ", mins: 6,
    blocks: [
      ["p", "The economic order quantity (EOQ) is the order size that makes the combined ordering and holding cost as low as possible. Order too much and holding cost climbs. Order too little and you pay ordering cost over and over."],
      ["key", "EOQ = square root of (2 x Yearly demand x Cost per order / Holding cost per unit per year)"],
      ["ex", "Example", "Yearly demand is 1,200 units, each order costs $50 to place and holding one unit costs $3 a year. EOQ = square root of (2 x 1,200 x 50 / 3) = square root of 40,000 = 200 units. That means 6 orders a year. Ordering cost is 6 x 50 = $300 and holding cost is half the order (100 units on average) x $3 = $300. Total $600, and no other order size does better."],
      ["p", "EOQ assumes steady demand and a fixed price, so treat it as a starting point. Volume discounts, limited storage space and perishable goods all change the answer."]
    ],
    tryit: { label: "Calculate your EOQ", href: "/accounting-tools#eoq" },
    quiz: [
      { q: "At the EOQ, ordering cost and holding cost are...", o: ["Equal", "Zero", "Both doubled", "Unrelated"], a: 0, why: "The lowest total cost occurs where the two costs match." },
      { q: "A higher cost to place each order makes EOQ...", o: ["Larger", "Smaller", "Unchanged", "Zero"], a: 0, why: "If each order is expensive, you order bigger batches less often." }
    ] });

  add({ id: "sc-jit", level: "Supply chain", title: "Just-in-time vs just-in-case", mins: 6,
    blocks: [
      ["p", "Just-in-time (JIT) means holding as little stock as possible and receiving goods right when you need them. Just-in-case means holding extra stock as protection against surprises."],
      ["list", ["JIT frees cash and cuts storage costs. It depends on reliable suppliers and short lead times.", "Just-in-case protects sales when shipments are late. It ties up cash and risks spoilage or goods going out of style."]],
      ["p", "Many companies cut inventory hard for years to improve their numbers, then discovered during supply shocks that they had no cushion. Others held too much and were stuck with goods nobody wanted. The right level depends on how reliable your suppliers are and how costly a stockout is."],
      ["ex", "Example", "A bakery's flour lasts for months and delivery is reliable, so it can run lean. A shop selling a fast-moving seasonal product from overseas cannot afford to run out in December, so it keeps extra."],
      ["key", "Lean is not always better. The best inventory level balances the cost of holding against the cost of running out."]
    ],
    tryit: { label: "Try an overstocking month in the Lab", href: "/accounting-lab?co=store&sc=1" },
    quiz: [
      { q: "A main benefit of JIT is...", o: ["More safety stock", "Less cash tied up in inventory", "Longer lead times", "Higher storage costs"], a: 1, why: "Holding less stock frees cash." },
      { q: "The main risk of JIT is...", o: ["Too much cash", "Running out when shipments are late", "Too much equity", "High profit"], a: 1, why: "With no cushion, a delay becomes a stockout." }
    ] });

  add({ id: "sc-bullwhip", level: "Supply chain", title: "The bullwhip effect", mins: 5,
    blocks: [
      ["p", "Small changes in customer demand can cause bigger and bigger swings further back in the supply chain. This is the bullwhip effect, named for how a small flick of the wrist becomes a big crack at the end of a whip."],
      ["p", "It happens because each link reacts to the order in front of it, adds a safety margin and places a bigger order. A store sees demand rise 10% and orders 20% more. The distributor sees a 20% jump and orders 40% more. The factory sees chaos."],
      ["list", ["Later, when the extra stock is not needed, orders collapse and the factory is left with surplus.", "Reasons include delays, panic ordering when stock is short, and batching orders.", "Sharing sales data with suppliers and ordering more steadily reduces the effect."]],
      ["ex", "Example", "A shop's weekly sales go from 100 to 110. It orders 150 to build stock. Its supplier sees an order up 50% and builds for 200 a week. A tiny change at the register became a big swing at the factory."],
      ["key", "Order based on what customers actually buy, not on how nervous you feel about running out."]
    ],
    quiz: [
      { q: "The bullwhip effect means...", o: ["Demand swings get bigger further up the chain", "Prices always fall", "Shipping gets cheaper", "Suppliers shrink"], a: 0, why: "Each link adds a margin, so swings grow." },
      { q: "One way to reduce it is to...", o: ["Panic order", "Share sales data with suppliers", "Hold no stock", "Raise prices"], a: 1, why: "Real demand information keeps orders steady." }
    ] });

  add({ id: "sc-statements", level: "Supply chain", title: "Supply chain in the three statements", mins: 7,
    blocks: [
      ["p", "Every supply chain decision lands on the financial statements. Knowing where is how you read a company's operations from its numbers."],
      ["list", ["Supplier price rise: raises cost of goods sold and lowers gross margin on the income statement.", "Stockout and rush shipping: lowers revenue and adds expenses. The lost sales never show up anywhere, so they are easy to miss.", "Overstocking: no effect on profit, but cash falls and inventory rises on the balance sheet. Cash flow from operations drops.", "Spoilage: inventory falls and cost of goods sold rises, with no cash moving now.", "Longer supplier terms: accounts payable rises and cash is higher, with the same profit.", "Fast growth on credit: profit rises but operating cash flow can be zero or negative."]],
      ["ex", "Example", "Two months with the same $10,000 of sales. In month one you buy $5,000 of stock for cash and sell all of it. In month two you buy $12,000 of stock for cash but sell only the same $5,000 worth. Profit is $5,000 both months, but in month two cash is $7,000 lower, because it is sitting in inventory."],
      ["p", "This is why investors watch inventory turnover and the cash cycle. Rising inventory with flat sales is a warning sign. Falling payables can mean suppliers are demanding cash sooner."],
      ["key", "Profit tells you how well the business sold. Cash and inventory tell you how well it was supplied."]
    ],
    tryit: { label: "Run supply chain events in the Lab", href: "/accounting-lab?co=coffee&sc=1" },
    quiz: [
      { q: "A supplier raises prices and your selling price stays the same. What falls?", o: ["Revenue", "Gross margin", "Equity at the start", "Liabilities"], a: 1, why: "Cost of goods sold rises, so gross margin shrinks." },
      { q: "You buy extra stock for cash and do not sell it. Profit is...", o: ["Lower", "Unchanged", "Higher", "Negative"], a: 1, why: "Inventory is an asset until sold. Cash just turned into stock." },
      { q: "Rising inventory with flat sales can mean...", o: ["Stock is piling up", "Margins are rising", "Debt is falling", "Taxes fell"], a: 0, why: "Goods are being bought faster than they are sold." }
    ] });

  return L;
});
