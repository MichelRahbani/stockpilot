/* StockPilot accounting "i" buttons.
   Adds a small i next to key terms in the accounting and supply chain lessons and in the Statements Lab.
   Tap one to open a card: definition, plain English, example. Same idea as the rest of StockPilot. */
(function () {
  'use strict';

  // t = title, m = definition, s = plain English, e = example, re = how to spot it in lesson text
  var T = {
    accEq: { t: 'The accounting equation', re: 'accounting equation',
      m: 'Assets = Liabilities + Equity. Everything a business owns is paid for by either borrowed money or the owner\'s money.',
      s: 'What you own is funded by what you owe plus what is truly yours.',
      e: 'A shop owns $50,000 of stuff. It owes the bank $20,000, so the owner\'s share is $30,000.' },
    asset: { t: 'Asset', re: 'assets?',
      m: 'Something the business owns that has value and should help it earn money in the future.',
      s: 'Things you own: cash, stock on the shelf, equipment, money customers owe you.',
      e: 'A bakery\'s oven, flour and cash in the till are all assets.' },
    liability: { t: 'Liability', re: 'liabilit(?:y|ies)',
      m: 'Money or obligations the business owes to someone else.',
      s: 'Things you owe: bills, loans and prepayments you still have to deliver on.',
      e: 'A $5,000 bank loan and $800 owed to a flour supplier are liabilities.' },
    equity: { t: 'Equity', re: 'equity|owner\'s equity|owners\' equity',
      m: 'What is left for the owners after the business pays off everything it owes. It is assets minus liabilities.',
      s: 'The part of the business that is really yours.',
      e: 'Assets of $50,000 minus liabilities of $20,000 leaves $30,000 of equity.' },
    retained: { t: 'Retained earnings', re: 'retained earnings',
      m: 'The total profit the business has kept over its life instead of paying it out to owners.',
      s: 'Profit you left inside the business to grow it.',
      e: 'A shop earns $12,000 this year and pays out $2,000. Retained earnings go up by $10,000.' },
    ownerInv: { t: 'Owner investment', re: 'owner investment|common stock|paid-in capital',
      m: 'Money the owners put into the business in exchange for ownership.',
      s: 'The cash you or your investors put in to get started.',
      e: 'You put $10,000 of your savings into your new business. Cash and owner investment both go up by $10,000.' },
    dividend: { t: 'Dividend', re: 'dividends?',
      m: 'A payment of profit from the business to its owners.',
      s: 'The business handing some profit back to the people who own it.',
      e: 'The company pays owners $1,000. Cash drops $1,000 and retained earnings drop $1,000. It is not an expense.' },
    revenue: { t: 'Revenue', re: 'revenue|sales revenue',
      m: 'The money earned from selling goods or services during a period, before any costs are subtracted.',
      s: 'The total you sold. Not the same as profit.',
      e: 'You sell 200 cups of lemonade at $2. Revenue is $400.' },
    expense: { t: 'Expense', re: 'expenses?',
      m: 'A cost of running the business during the period, such as wages, rent or marketing.',
      s: 'What it cost you to earn your sales.',
      e: 'Paying $300 rent for the month is a $300 expense.' },
    opex: { t: 'Operating expenses', re: 'operating expenses',
      m: 'The everyday costs of running the business that are not the direct cost of the goods sold, like wages, rent, utilities and marketing.',
      s: 'The overhead you pay to keep the doors open.',
      e: 'Wages $900, rent $300 and marketing $100 add up to $1,300 of operating expenses.' },
    netIncome: { t: 'Net income', re: 'net income|net profit|net loss|bottom line',
      m: 'Revenue minus all expenses for the period. It is the final profit, or loss if negative.',
      s: 'What is left after you pay for everything.',
      e: 'Revenue $5,000 minus expenses $4,200 gives net income of $800.' },
    grossProfit: { t: 'Gross profit', re: 'gross profit',
      m: 'Revenue minus the cost of goods sold. It shows what you make on the products themselves before overhead.',
      s: 'What you keep on each sale after paying for the product.',
      e: 'You sell items for $1,000 that cost you $600 to buy. Gross profit is $400.' },
    grossMargin: { t: 'Gross margin', re: 'gross margin',
      m: 'Gross profit divided by revenue, shown as a percent.',
      s: 'Out of every dollar you sell, how many cents are left after paying for the product.',
      e: 'Gross profit $400 on revenue $1,000 is a 40% gross margin.' },
    cogs: { t: 'Cost of goods sold (COGS)', re: 'cost of goods sold|cogs',
      m: 'The direct cost of the products you actually sold during the period.',
      s: 'What you paid for the stuff that left the shelf.',
      e: 'You buy 100 hats at $5 and sell 60. COGS is 60 x $5 = $300. The other 40 stay in inventory.' },
    opIncome: { t: 'Operating income', re: 'operating income|operating profit',
      m: 'Gross profit minus operating expenses. It is the profit from the core business before interest and tax.',
      s: 'How well the business itself earns money, ignoring loans and taxes.',
      e: 'Gross profit $400 minus operating expenses $250 leaves operating income of $150.' },
    gainLoss: { t: 'Gain or loss on sale of equipment', re: 'gain on (?:the )?sale|loss on (?:the )?sale',
      m: 'The difference between what you sold equipment for and its book value (cost minus depreciation so far).',
      s: 'A one-off win or loss from selling a machine for more or less than your records said it was worth.',
      e: 'A machine is on your books at $800. You sell it for $1,000. You record a $200 gain.' },
    interestExp: { t: 'Interest expense', re: 'interest expense|interest',
      m: 'The cost of borrowing money, charged as a percent of the amount owed.',
      s: 'The fee you pay to the lender for using their money.',
      e: 'A $10,000 loan at 6% a year costs $600 of interest over a year.' },
    preTax: { t: 'Income before tax', re: 'income before tax|pre-tax income',
      m: 'Profit after all expenses and interest but before income tax is taken out.',
      s: 'Your profit before the government takes its share.',
      e: 'Operating income $150 minus interest $10 gives $140 before tax.' },
    incomeTax: { t: 'Income tax', re: 'income tax',
      m: 'Tax charged on the profit the business earns.',
      s: 'The government\'s slice of your profit.',
      e: 'Income before tax is $140 and the tax rate is 25%. Income tax is $35.' },
    incomeStmt: { t: 'Income statement', re: 'income statement|profit and loss|p&l',
      m: 'A report showing revenue, expenses and profit over a period of time, like a month or a year.',
      s: 'The scoreboard for a period: did you make money or lose it?',
      e: 'January: sales $5,000, expenses $4,200, profit $800.' },
    balanceSheet: { t: 'Balance sheet', re: 'balance sheets?',
      m: 'A snapshot at one date of what the business owns (assets), owes (liabilities) and the owners\' share (equity).',
      s: 'A photo of the business\'s finances on one day.',
      e: 'On January 31: assets $50,000 = liabilities $20,000 + equity $30,000.' },
    cashFlowStmt: { t: 'Statement of cash flows', re: 'cash flow statement|statement of cash flows',
      m: 'A report of the real cash that came in and went out over a period, split into operating, investing and financing.',
      s: 'Where your cash actually came from and where it went.',
      e: 'You can show a profit and still run out of cash if customers pay late. This statement catches that.' },
    cash: { t: 'Cash', re: 'cash on hand',
      m: 'Money in the bank and in the till that the business can spend right now.',
      s: 'The money you can use today.',
      e: 'A customer pays $50 in cash. Cash on the balance sheet goes up by $50.' },
    ar: { t: 'Accounts receivable', re: 'accounts receivable|receivables?',
      m: 'Money customers owe you for things you already delivered but they have not paid for yet.',
      s: 'Your customers\' IOUs.',
      e: 'You deliver $500 of goods on credit. Revenue goes up $500 and so does accounts receivable, but cash does not move yet.' },
    ap: { t: 'Accounts payable', re: 'accounts payable|payables?',
      m: 'Money you owe suppliers for goods or services you already received but have not paid for yet.',
      s: 'Your own IOUs to suppliers.',
      e: 'You receive $800 of flour and will pay in 30 days. Accounts payable goes up $800.' },
    inventory: { t: 'Inventory', re: 'inventory|inventories',
      m: 'Goods the business has bought or made and plans to sell.',
      s: 'Stock sitting on the shelf waiting to be sold.',
      e: 'You buy 100 hats at $5. Inventory is $500 until you sell some.' },
    prepaid: { t: 'Prepaid expenses', re: 'prepaid(?: expenses?)?',
      m: 'Costs you paid in advance for something you will use later, like insurance or rent.',
      s: 'Paying early for a benefit you have not used up yet.',
      e: 'You pay $1,200 for a year of insurance. Each month, $100 of it becomes an expense.' },
    accrued: { t: 'Accrued expenses', re: 'accrued expenses?|accruals?|accrued',
      m: 'Costs you have already incurred but not yet paid, like wages earned by employees before payday.',
      s: 'Bills that are building up but not yet paid.',
      e: 'Workers earned $600 this week and get paid Monday. At week end you record $600 of accrued wages.' },
    unearned: { t: 'Unearned revenue', re: 'unearned revenue|deferred revenue',
      m: 'Money you collected before delivering the product or service. It is a liability until you deliver.',
      s: 'Customers paid you, but you still owe them the goods or service.',
      e: 'A gym collects $300 for 3 months. Each month, $100 moves from unearned revenue to revenue.' },
    loan: { t: 'Loans payable', re: 'loans? payable|loans?',
      m: 'Money the business borrowed and still has to repay.',
      s: 'The amount you still owe the lender.',
      e: 'You borrow $10,000. Cash and loans payable both go up $10,000. Repaying principal lowers both.' },
    principal: { t: 'Principal', re: 'principal',
      m: 'The original amount borrowed, not counting interest.',
      s: 'The actual loan balance, separate from the interest fee.',
      e: 'On a $10,000 loan, you may pay $500 a month: part is interest and the rest lowers the principal.' },
    amort: { t: 'Amortization', re: 'amortization|amortize|amortized',
      m: 'Paying off a loan in regular installments that cover both interest and part of the principal.',
      s: 'A loan that shrinks a little with every payment until it is gone.',
      e: 'A car loan with 36 equal monthly payments is an amortizing loan.' },
    depreciation: { t: 'Depreciation', re: 'depreciation|depreciate|depreciated',
      m: 'Spreading the cost of a long-lasting asset over the years you use it, instead of expensing it all at once.',
      s: 'Equipment wears out slowly, so you charge a little of its cost each year.',
      e: 'A $6,000 machine lasts 5 years. Straight-line depreciation is $1,200 a year.' },
    accumDep: { t: 'Accumulated depreciation', re: 'accumulated depreciation',
      m: 'The total depreciation recorded so far on an asset. It is subtracted from the asset\'s cost to get its book value.',
      s: 'How much of the machine\'s cost you have already "used up" on paper.',
      e: 'Machine cost $6,000, accumulated depreciation $2,400, so book value is $3,600.' },
    equipment: { t: 'Equipment (net)', re: 'fixed assets?|equipment',
      m: 'Long-lasting items you use to run the business, shown at cost minus accumulated depreciation.',
      s: 'Machines and tools that last for years.',
      e: 'An oven bought for $6,000 that has lost $2,400 of value on paper shows as $3,600.' },
    bookValue: { t: 'Book value', re: 'book value',
      m: 'What an asset is worth on your records: original cost minus accumulated depreciation.',
      s: 'The "paper value" of an asset, which can differ from what it would sell for.',
      e: 'A $6,000 machine with $2,400 of depreciation has a book value of $3,600.' },
    salvage: { t: 'Salvage value', re: 'salvage value|residual value',
      m: 'The amount you expect an asset to be worth at the end of its useful life.',
      s: 'What you think you could sell it for when you are done with it.',
      e: 'A $6,000 machine with $1,000 salvage value is only depreciated by $5,000 in total.' },
    usefulLife: { t: 'Useful life', re: 'useful life',
      m: 'How long you expect to use an asset before it is worn out or outdated.',
      s: 'How many years the thing will be worth using.',
      e: 'A delivery van might have a useful life of 5 years.' },
    straightLine: { t: 'Straight-line depreciation', re: 'straight-line',
      m: 'Depreciation that charges the same amount every year: (cost minus salvage value) divided by useful life.',
      s: 'The simplest way to spread a cost evenly.',
      e: '($6,000 - $1,000) / 5 years = $1,000 of depreciation each year.' },
    badDebt: { t: 'Bad debt expense', re: 'bad debts?|bad debt expense|doubtful accounts',
      m: 'An estimate of the receivables that customers will never pay, recorded as an expense.',
      s: 'The cost of customers who do not pay you.',
      e: 'You expect 2% of $10,000 in credit sales to go unpaid. Bad debt expense is $200.' },
    allowance: { t: 'Allowance for doubtful accounts', re: 'allowance for doubtful accounts|allowance',
      m: 'A running estimate of how much of your receivables will not be collected. It reduces accounts receivable to what you actually expect to get.',
      s: 'A cushion on paper for customers who may not pay.',
      e: 'Receivables $10,000 minus an allowance of $200 shows net receivables of $9,800.' },
    debit: { t: 'Debit', re: 'debits?',
      m: 'The left side of an accounting entry. Debits increase assets and expenses and decrease liabilities, equity and revenue.',
      s: 'Not "bad" or "less". It is just the left column.',
      e: 'You buy supplies with cash: debit Supplies (an asset goes up).' },
    credit: { t: 'Credit', re: 'credits?',
      m: 'The right side of an accounting entry. Credits increase liabilities, equity and revenue and decrease assets and expenses.',
      s: 'Not "good" or "more". It is just the right column.',
      e: 'You pay cash for supplies: credit Cash (the asset goes down).' },
    doubleEntry: { t: 'Double-entry bookkeeping', re: 'double-entry',
      m: 'Every transaction is recorded in at least two accounts so total debits always equal total credits.',
      s: 'Every move has two sides, so the books always balance.',
      e: 'Buying supplies for cash: Supplies goes up and Cash goes down by the same amount.' },
    journal: { t: 'Journal entry', re: 'journal entr(?:y|ies)|journals?',
      m: 'The first record of a transaction, listing the accounts affected, the debits and the credits.',
      s: 'A short note of what happened, written in accounting language.',
      e: 'Dr Cash 500 / Cr Sales revenue 500 records a $500 cash sale.' },
    ledger: { t: 'Ledger', re: 'ledgers?|general ledger',
      m: 'The collection of all accounts, showing every entry that touched each one and its running balance.',
      s: 'A page per account that adds up everything that happened to it.',
      e: 'The Cash ledger lists every deposit and payment and shows the current balance.' },
    trialBal: { t: 'Trial balance', re: 'trial balance',
      m: 'A list of all account balances used to check that total debits equal total credits.',
      s: 'A quick math check on the books.',
      e: 'If debits add up to $12,400 and credits to $12,000, there is a $400 mistake to find.' },
    accrual: { t: 'Accrual accounting', re: 'accrual accounting|accrual basis|accrual',
      m: 'Recording revenue when it is earned and expenses when they are incurred, no matter when cash moves.',
      s: 'You count the sale when you make it, not when the money arrives.',
      e: 'You deliver goods in December and get paid in January. Under accrual, the revenue belongs to December.' },
    cashBasis: { t: 'Cash basis accounting', re: 'cash basis|cash-basis',
      m: 'Recording revenue and expenses only when cash is received or paid.',
      s: 'Simple "money in, money out" bookkeeping.',
      e: 'You are paid in January for December work. Cash basis counts it in January.' },
    matching: { t: 'Matching principle', re: 'matching principle|matching',
      m: 'Expenses should be recorded in the same period as the revenue they helped earn.',
      s: 'Put the cost on the same page as the sale it created.',
      e: 'The flour used for a December cake sale is a December expense, even if you paid for it in November.' },
    adjusting: { t: 'Adjusting entry', re: 'adjusting entr(?:y|ies)',
      m: 'An entry made at the end of a period to record things that happened but are not yet in the books, like accrued wages or used-up prepaid costs.',
      s: 'End-of-month clean-up so the numbers are fair.',
      e: 'At month end you record $600 of wages earned but not yet paid.' },
    contra: { t: 'Contra account', re: 'contra account|contra-asset',
      m: 'An account that offsets another account, such as accumulated depreciation offsetting equipment.',
      s: 'A deduction account that sits next to the thing it reduces.',
      e: 'Equipment $6,000 and accumulated depreciation $(2,400) show a net of $3,600.' },
    fifo: { t: 'FIFO', re: 'fifo|first-in,? first-out',
      m: 'First in, first out. A way of costing inventory that assumes the oldest items are sold first.',
      s: 'The oldest stock leaves the shelf first.',
      e: 'You bought hats at $5 and later at $6. Selling one hat under FIFO costs you $5.' },
    lifo: { t: 'LIFO', re: 'lifo|last-in,? first-out',
      m: 'Last in, first out. A way of costing inventory that assumes the newest items are sold first.',
      s: 'The newest stock leaves first on paper.',
      e: 'You bought hats at $5 and later at $6. Selling one under LIFO costs you $6.' },
    currentRatio: { t: 'Current ratio', re: 'current ratio',
      m: 'Current assets divided by current liabilities. It shows if you can cover bills due within a year.',
      s: 'Do you have enough short-term resources to pay short-term bills?',
      e: 'Current assets $30,000 and current liabilities $20,000 give a current ratio of 1.5.' },
    workingCap: { t: 'Working capital', re: 'working capital',
      m: 'Current assets minus current liabilities. The cushion that pays everyday bills.',
      s: 'Your breathing room in the short term.',
      e: '$30,000 of current assets minus $20,000 of current liabilities leaves $10,000 of working capital.' },
    cashCycle: { t: 'Cash conversion cycle', re: 'cash (?:conversion )?cycle',
      m: 'Days inventory + days receivable - days payable. How long cash is tied up between paying suppliers and collecting from customers.',
      s: 'How many days you fund the business before cash comes back.',
      e: '40 + 30 - 25 = 45 days of your own money tied up.' },
    margin: { t: 'Contribution margin', re: 'contribution margin',
      m: 'Selling price minus the variable cost of one unit. It is what each sale contributes toward fixed costs and profit.',
      s: 'The money left from each sale to pay the fixed bills.',
      e: 'You sell a mug for $10 with $4 of variable cost. Contribution margin is $6.' },
    breakEven: { t: 'Break-even point', re: 'break-even|breakeven',
      m: 'The sales level where revenue exactly covers all costs, so profit is zero. Fixed costs divided by contribution margin per unit.',
      s: 'How much you must sell before you start making money.',
      e: 'Fixed costs $3,000 and $6 per mug contribution gives a break-even of 500 mugs.' },
    fixedCost: { t: 'Fixed vs variable costs', re: 'fixed costs?|variable costs?',
      m: 'Fixed costs stay the same no matter how much you sell (rent). Variable costs rise with each unit sold (materials).',
      s: 'Rent is the same whether you sell 1 or 1,000. Ingredients scale with sales.',
      e: 'Rent $1,000 a month is fixed. $2 of cups per drink is variable.' },
    tvm: { t: 'Time value of money', re: 'time value of money',
      m: 'A dollar today is worth more than a dollar later because today\'s dollar can earn interest.',
      s: 'Money now beats money later.',
      e: '$1,000 at 5% grows to $1,050 in a year. So $1,050 a year from now is worth $1,000 today.' },
    cfo: { t: 'Cash from operations', re: 'cash from operations|operating activities',
      m: 'Cash generated by the normal day-to-day business, such as sales and paying costs.',
      s: 'Did the core business bring in real cash?',
      e: 'Net income $800 adjusted for non-cash items and timing might give $350 of operating cash.' },
    cfi: { t: 'Investing activities', re: 'investing activities|cash from investing',
      m: 'Cash spent on or received from long-term assets, like buying or selling equipment.',
      s: 'Money used to buy things that last.',
      e: 'Buying a $6,000 oven is a $6,000 investing outflow.' },
    cff: { t: 'Financing activities', re: 'financing activities|cash from financing',
      m: 'Cash from or to the people who fund the business: owner investment, loans, loan repayments and dividends.',
      s: 'Money moving between the business and its funders.',
      e: 'A $10,000 loan received is a financing inflow. A $1,000 dividend is an outflow.' },
    netChange: { t: 'Net change in cash', re: 'net change in cash',
      m: 'Cash from operations plus investing plus financing. The total change in cash for the period.',
      s: 'How much your cash balance moved.',
      e: '+$350 operating, -$300 investing and +$1,000 financing means cash is up $1,050.' },
    wcAsset: { t: 'Change in receivables, inventory and prepaid', re: 'changes? in receivables',
      m: 'When these assets grow, cash was used up. When they shrink, cash was released.',
      s: 'More money tied up in customers\' IOUs or stock means less cash in your pocket.',
      e: 'Receivables rise $200: you earned $200 of revenue that has not yet arrived as cash, so subtract $200.' },
    wcLiab: { t: 'Change in payables, accrued and unearned', re: 'changes? in payables',
      m: 'When these liabilities grow, you kept cash instead of paying. When they shrink, you used cash to pay.',
      s: 'Paying later helps your cash for now. Paying down bills uses cash.',
      e: 'Payables rise $300: you got goods without paying yet, so add $300.' },
    capex: { t: 'Equipment purchases', re: 'capital expenditures?|capex',
      m: 'Cash spent on long-lasting equipment. Reported under investing, not as an expense.',
      s: 'Big buys that last for years.',
      e: 'A $6,000 oven is an investing outflow. Its cost is spread out later as depreciation.' },
    supplyEvent: { t: 'Supply chain event', re: 'supply chain event',
      m: 'A real-world supply problem, like a late shipment or a price jump, that changes your costs and stock.',
      s: 'See how supply trouble shows up in the numbers.',
      e: 'A supplier raises prices 10%. Your cost of goods sold climbs and gross profit shrinks.' },
    sc: { t: 'Supply chain', re: 'supply chains?',
      m: 'The whole path a product takes from raw materials, through suppliers and factories, to the customer.',
      s: 'Everything that has to happen to get a product into someone\'s hands.',
      e: 'Cotton farm, mill, shirt factory, shipping, store, customer.' },
    leadTime: { t: 'Lead time', re: 'lead times?',
      m: 'The time between placing an order and receiving it.',
      s: 'How long you wait after you order.',
      e: 'You order on Monday and it arrives next Monday. Lead time is 7 days.' },
    safetyStock: { t: 'Safety stock', re: 'safety stock',
      m: 'Extra inventory kept as a cushion against late deliveries or sudden demand.',
      s: 'Your "just in case" stock.',
      e: '30 spare units so a late truck does not leave shelves empty.' },
    reorder: { t: 'Reorder point', re: 'reorder points?',
      m: 'The stock level that triggers a new order: daily demand x lead time + safety stock.',
      s: 'When the shelf gets down to this number, order more.',
      e: '20 a day x 7 days + 30 safety = 170 units.' },
    eoq: { t: 'Economic order quantity (EOQ)', re: 'economic order quantity|eoq',
      m: 'The order size that makes ordering cost plus holding cost as low as possible.',
      s: 'The "just right" order size, not too big and not too small.',
      e: '1,200 a year, $50 per order, $3 holding gives an EOQ of 200 units.' },
    holding: { t: 'Holding cost', re: 'holding costs?|carrying costs?',
      m: 'The cost of keeping inventory: storage, insurance, spoilage and the cash tied up.',
      s: 'What it costs just to have stock sitting around.',
      e: '$20,000 of stock at 25% a year costs $5,000 to hold.' },
    ordering: { t: 'Ordering cost', re: 'ordering costs?',
      m: 'The cost of placing one order: paperwork, shipping fees and receiving.',
      s: 'What each order costs you, no matter how big it is.',
      e: 'Each order costs $50 to place.' },
    stockout: { t: 'Stockout', re: 'stockouts?',
      m: 'Running out of an item when a customer wants it.',
      s: 'The empty shelf problem.',
      e: 'A customer wants a blue shirt, you have none, and they buy from someone else.' },
    jit: { t: 'Just-in-time (JIT)', re: 'just-in-time',
      m: 'Keeping very little stock and receiving goods only when needed. Saves money but is fragile if deliveries slip.',
      s: 'Get it right when you need it.',
      e: 'A car plant gets seats delivered a few hours before they are fitted.' },
    jic: { t: 'Just-in-case', re: 'just-in-case',
      m: 'Keeping extra stock as protection against surprises. Safer but costs more to hold.',
      s: 'Keep a cushion in case something goes wrong.',
      e: 'A shop keeps three weeks of stock in case a shipment is late.' },
    bullwhip: { t: 'Bullwhip effect', re: 'bullwhip effect|bullwhip',
      m: 'Small changes in customer demand create bigger and bigger swings in orders further up the supply chain.',
      s: 'A flick at the handle becomes a huge crack at the tip of the whip.',
      e: 'Shoppers buy 10% more. The store orders 20% more, the distributor 40% more, the factory 80% more.' }
  };
  // Pairs shared by several words so terms like "net loss" or "accruals" resolve here
  var IDS = Object.keys(T);

  // ----- styles -----
  var css = '' +
    '.ai-i{display:inline-grid;place-items:center;width:1.2em;height:1.2em;margin:0 .15em 0 .2em;padding:0;border:1px solid rgba(37,99,235,.4);border-radius:4px;background:rgba(37,99,235,.08);color:#1d4ed8;font:800 .72em/1 inherit;font-family:inherit;cursor:pointer;vertical-align:.08em;transition:background .15s,color .15s}' +
    '.ai-i:hover,.ai-i:focus-visible,.ai-i.on{background:#2563eb;color:#fff;border-color:#2563eb;outline:none}' +
    '.t .ai-i{width:1.3em;height:1.3em;font-size:11px}' +
    '#aiCard{position:fixed;left:50%;bottom:16px;transform:translate(-50%,24px);width:min(560px,calc(100vw - 24px));max-height:70vh;overflow:auto;background:#fff;border:1px solid #bfdbfe;border-radius:10px;box-shadow:0 18px 50px rgba(15,23,42,.28);padding:16px 18px 18px;z-index:9999;opacity:0;pointer-events:none;transition:opacity .18s,transform .18s}' +
    '#aiCard.show{opacity:1;pointer-events:auto;transform:translate(-50%,0)}' +
    '#aiCard .ah{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px}' +
    '#aiCard .ah h4{font-size:17px;margin:0;color:#0f172a}' +
    '#aiCard .ax{width:30px;height:30px;border:1px solid #cbd5e1;border-radius:6px;background:#fff;color:#334155;font-size:16px;line-height:1;cursor:pointer}' +
    '#aiCard .ax:hover{background:#eff6ff;border-color:#2563eb;color:#2563eb}' +
    '#aiCard .ag{display:grid;gap:10px}' +
    '#aiCard .ag div{border-left:3px solid #2563eb;padding:2px 0 2px 10px}' +
    '#aiCard .ag b{display:block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#1d4ed8;margin-bottom:2px}' +
    '#aiCard .ag p{margin:0;font-size:14px;line-height:1.5;color:#0f172a}' +
    '@media(prefers-color-scheme:dark){#aiCard{background:#0f172a;border-color:#1e3a8a}#aiCard .ah h4,#aiCard .ag p{color:#e2e8f0}#aiCard .ax{background:#0f172a;color:#cbd5e1;border-color:#334155}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // ----- the card -----
  var card = document.createElement('aside');
  card.id = 'aiCard'; card.setAttribute('role', 'dialog'); card.setAttribute('aria-live', 'polite'); card.setAttribute('aria-label', 'Term explanation');
  card.innerHTML = '<div class="ah"><h4></h4><button class="ax" type="button" aria-label="Close">×</button></div>' +
    '<div class="ag"><div><b>Definition</b><p data-k="m"></p></div><div><b>In plain English</b><p data-k="s"></p></div><div><b>Example</b><p data-k="e"></p></div></div>';
  document.body.appendChild(card);
  var openBtn = null;
  function hide() { card.classList.remove('show'); if (openBtn) openBtn.classList.remove('on'); openBtn = null; }
  function show(id, btn) {
    var d = T[id]; if (!d) return;
    if (openBtn === btn && card.classList.contains('show')) { hide(); return; }
    if (openBtn) openBtn.classList.remove('on');
    card.querySelector('h4').textContent = d.t;
    ['m', 's', 'e'].forEach(function (k) { card.querySelector('[data-k="' + k + '"]').textContent = d[k]; });
    openBtn = btn; btn.classList.add('on'); card.classList.add('show');
  }
  card.querySelector('.ax').addEventListener('click', hide);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') hide(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.ai-i');
    if (b) { e.preventDefault(); e.stopPropagation(); show(b.getAttribute('data-ai'), b); return; }
    if (card.classList.contains('show') && !card.contains(e.target)) hide();
  }, true);

  function mkBtn(id) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'ai-i'; b.setAttribute('data-ai', id);
    b.setAttribute('aria-label', 'Explain ' + T[id].t); b.textContent = 'i';
    return b;
  }

  // ----- lessons: put an i after the first mention of each term -----
  var order = IDS.slice().sort(function (a, b) { return T[b].re.length - T[a].re.length; });
  var compiled = order.map(function (id) { return { id: id, rx: new RegExp('(^|[^A-Za-z])(' + T[id].re + ')(?![A-Za-z])', 'i') }; });

  function decorateLesson(root) {
    if (!root) return;
    var seen = {};
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (p.closest('button,a,h1,h2,h3,.quiz,.pager,.try,.meta,.ai-i')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var cur = node;
      for (var guard = 0; guard < 12 && cur; guard++) {
        var text = cur.nodeValue, best = null;
        for (var i = 0; i < compiled.length; i++) {
          var c = compiled[i]; if (seen[c.id]) continue;
          var m = c.rx.exec(text); if (!m) continue;
          var start = m.index + m[1].length, end = start + m[2].length;
          if (!best || start < best.start || (start === best.start && end > best.end)) best = { id: c.id, start: start, end: end };
        }
        if (!best) break;
        seen[best.id] = 1;
        var after = cur.splitText(best.end);
        cur.parentNode.insertBefore(mkBtn(best.id), after);
        cur = after;
      }
    });
  }

  // ----- Statements Lab: rows, headings, checks -----
  var ROW = [
    [/^sales revenue|^revenue/, 'revenue'], [/^cost of goods sold/, 'cogs'], [/^gross profit/, 'grossProfit'],
    [/^operating expenses|^wages|^rent$|^utilities|^marketing|^other expenses/, 'opex'],
    [/depreciation expense|^\+ depreciation/, 'depreciation'], [/bad debt/, 'badDebt'],
    [/^operating income/, 'opIncome'], [/gain.*sale|loss.*sale|gain on equipment/, 'gainLoss'], [/^interest expense/, 'interestExp'],
    [/^income before tax/, 'preTax'], [/^income tax/, 'incomeTax'], [/^net income/, 'netIncome'],
    [/^assets$|^total assets/, 'asset'], [/^cash$|^cash at/, 'cash'], [/^accounts receivable/, 'ar'], [/^inventory/, 'inventory'],
    [/^prepaid expenses/, 'prepaid'], [/^equipment \(net/, 'equipment'],
    [/^liabilities$|^total liabilities/, 'liability'], [/^accounts payable/, 'ap'], [/^accrued expenses/, 'accrued'], [/^unearned revenue/, 'unearned'], [/^loans payable/, 'loan'],
    [/^owner.s equity$|^total equity/, 'equity'], [/^owner investment/, 'ownerInv'], [/^retained earnings/, 'retained'], [/^liabilities \+ equity/, 'accEq'],
    [/^operating activities|^cash from operations/, 'cfo'], [/^change in (receivables|inventory|prepaid)/, 'wcAsset'], [/^change in (payables|accrued|unearned)/, 'wcLiab'],
    [/^investing activities|^cash from investing/, 'cfi'], [/^equipment purchases|^equipment sales/, 'capex'],
    [/^financing activities|^cash from financing/, 'cff'], [/^loans received|^loan repayments/, 'loan'], [/^dividends paid/, 'dividend'], [/^net change in cash/, 'netChange']
  ];
  function rowId(label) {
    var s = label.toLowerCase().replace(/[’']/g, '.').replace(/^[+−\-]\s*/, '').trim();
    var raw = label.toLowerCase().trim();
    for (var i = 0; i < ROW.length; i++) if (ROW[i][0].test(s) || ROW[i][0].test(raw)) return ROW[i][1];
    return null;
  }
  var HEAD = { 'income statement': 'incomeStmt', 'balance sheet': 'balanceSheet', 'cash flow statement': 'cashFlowStmt', 'supply chain events': 'supplyEvent' };

  var busy = false;
  function decorateLab() {
    if (busy) return; busy = true;
    try {
      ['is', 'bs', 'cf'].forEach(function (tid) {
        var tbl = document.getElementById(tid); if (!tbl) return;
        [].forEach.call(tbl.querySelectorAll('tr'), function (tr) {
          var td = tr.firstElementChild; if (!td || td.querySelector('.ai-i')) return;
          var id = rowId(td.textContent); if (id) td.appendChild(mkBtn(id));
        });
      });
      [].forEach.call(document.querySelectorAll('h2'), function (h) {
        if (h.querySelector('.ai-i')) return;
        var id = HEAD[h.textContent.trim().toLowerCase()]; if (id) h.appendChild(mkBtn(id));
      });
      var chk = document.getElementById('checks');
      if (chk) [].forEach.call(chk.querySelectorAll('.chk'), function (c) {
        if (c.querySelector('.ai-i')) return;
        if (/Assets = Liabilities/.test(c.textContent)) c.appendChild(mkBtn('accEq'));
      });
    } finally { busy = false; }
  }

  function boot() {
    var lesson = document.getElementById('lesson');
    if (lesson) {
      var run = function () { if (busy) return; busy = true; try { decorateLesson(lesson); } finally { busy = false; } };
      run();
      new MutationObserver(function () { if (!busy) run(); }).observe(lesson, { childList: true });
    }
    if (document.getElementById('is')) {
      decorateLab();
      new MutationObserver(function () { if (!busy) decorateLab(); }).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.AcctInfo = { terms: T };
})();
