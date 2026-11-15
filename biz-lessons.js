/* Business lessons: Marketing and Risk management. Same shape as the accounting lessons. */
(function () {
  var FUN = function (p) { return { label: "Open the Funnel Lab", href: "/marketing-lab" + (p || "") }; };
  var RISK = function (p) { return { label: "Open the Risk Lab", href: "/risk-lab" + (p || "") }; };
  var M = [], R = [];
  function m(x) { x.level = x.level || "Beginner"; M.push(x); }
  function r(x) { x.level = x.level || "Beginner"; R.push(x); }

  m({ id: "mk-what", level: "Beginner", title: "What marketing is", mins: 4,
    blocks: [
      ["p", "Marketing is everything a business does to find the right people, show them why it is worth buying, and make buying easy. Advertising is only one small part."],
      ["p", "A good way to think about it: marketing answers four questions. Who are our customers? What do they need? How will they hear about us? Why choose us over someone else?"],
      ["key", "Marketing is not tricking people into buying. It is matching something useful with the people who want it."],
      ["ex", "Example: a new coffee shop", "The owner works out that nearby office workers want a fast, good coffee before 9am. She opens early, prices for a quick grab, and hands out discount cards in the lobbies. That is marketing, and no one saw an ad."],
      ["list", ["Research: who buys and why", "Product and price: what you offer and what it costs", "Promotion: how people hear about you", "Place: where and how they buy"]]
    ],
    tryit: FUN(),
    quiz: [
      { q: "Which is the best description of marketing?", o: ["Running ads", "Matching a useful product with the people who want it", "Lowering prices", "Selling to as many people as possible"], a: 1, why: "Advertising is one tool. Marketing is the whole job of finding, informing and serving the right customers." },
      { q: "A shop changes its opening hours to suit commuters. That is...", o: ["Not marketing", "Marketing, because it fits what customers need", "Only operations", "Only finance"], a: 1, why: "Meeting a customer need is marketing, even with no advertising." }
    ] });
  m({ id: "mk-customer", level: "Beginner", title: "Know your customer", mins: 5,
    blocks: [
      ["p", "You cannot market to everyone. The best businesses pick a group of people they serve better than anyone else, and ignore the rest."],
      ["p", "Describe your ideal customer in plain words: who they are, what problem they have, what they do now to solve it, and what they would pay to fix it."],
      ["key", "If your customer description fits everyone, it is too vague to use."],
      ["ex", "Example: a gym", "\"Anyone who wants to be fit\" is too broad. \"Busy parents who can only train before 7am and want short workouts\" tells you where to advertise, what hours to open and what to charge."],
      ["list", ["Segment: split the market into groups with different needs", "Target: choose the group you serve best", "Position: say in one line why you are the best choice for them"]]
    ],
    tryit: FUN(),
    quiz: [
      { q: "Why pick a narrow target customer?", o: ["It is cheaper to print flyers", "You can aim your product, price and message precisely", "Fewer people means fewer problems", "It is required by law"], a: 1, why: "A clear target lets every choice, from hours to messaging, point the same way." },
      { q: "Which is a better target description?", o: ["Everyone aged 18 to 65", "Students who need cheap lunch near campus", "People with money", "Anyone interested"], a: 1, why: "It names a group, a need and a place, so you know what to do next." }
    ] });
  m({ id: "mk-4ps", level: "Beginner", title: "The 4 Ps: product, price, place, promotion", mins: 5,
    blocks: [
      ["p", "The 4 Ps are four levers you control. Together they are called the marketing mix."],
      ["list", ["Product: what you sell and how good it is", "Price: what you charge, and what that says about you", "Place: where and how people can buy it", "Promotion: how people find out about it"]],
      ["p", "The levers must agree with each other. A luxury product with a bargain-bin price, sold in a discount store and promoted with coupons confuses everyone."],
      ["key", "Good marketing is four decisions that tell the same story."],
      ["ex", "Example: a premium water bottle", "Product: well made and long lasting. Price: high. Place: outdoor stores and the company website. Promotion: reviews from hikers. Every choice says quality."]
    ],
    tryit: FUN(),
    quiz: [
      { q: "A budget soap is sold at a fancy boutique with high prices. What is the problem?", o: ["Nothing", "The levers send mixed messages", "The product is too cheap", "Promotion is too strong"], a: 1, why: "Place and price say luxury while the product says budget." },
      { q: "\"Place\" in the 4 Ps means...", o: ["Your office address only", "Where and how customers can buy", "The country you live in", "Your market share"], a: 1, why: "Place covers every route to the customer: shops, websites, delivery." }
    ] });
  m({ id: "mk-funnel", level: "Beginner", title: "The marketing funnel", mins: 6,
    blocks: [
      ["p", "Most customers do not buy the first time they hear about you. They move through steps: they see you, they get interested, they consider, and then they buy. We call the steps a funnel because fewer people make it through each one."],
      ["list", ["Visit: someone clicks your ad or finds your page", "Lead: they give you something, like an email or a booking", "Customer: they buy"]],
      ["p", "Each step has a conversion rate: the share of people who move on. If 1,000 people visit, 100 become leads, and 20 of those buy, then visit to lead is 10% and lead to customer is 20%."],
      ["key", "To get more customers you can bring in more people or make each step work better. Fixing a leaky step is often cheaper than buying more traffic."],
      ["ex", "Example", "You spend $1,000 and get 1,000 visits. 5% become leads (50). 20% of leads buy (10 customers). Lifting visit to lead from 5% to 8% gives 16 customers with no extra ad spend."]
    ],
    tryit: FUN("?co=coffee"),
    quiz: [
      { q: "1,000 visitors, 100 leads, 25 customers. What is the lead to customer rate?", o: ["2.5%", "10%", "25%", "75%"], a: 2, why: "25 customers out of 100 leads is 25%." },
      { q: "Your funnel loses most people between lead and customer. What should you fix first?", o: ["Buy more ads", "The step where they drop off", "Your logo", "Nothing"], a: 1, why: "Fixing the leak is usually cheaper than adding more people at the top." }
    ] });
  m({ id: "mk-cac", level: "Intermediate", title: "Customer acquisition cost", mins: 6,
    blocks: [
      ["p", "Customer acquisition cost, or CAC, is what you spend to win one new customer. Take your marketing spend and divide it by the new customers it brought in."],
      ["key", "CAC = marketing spend divided by new customers."],
      ["ex", "Example", "You spend $3,000 on ads and win 60 customers. CAC is $50. If each customer only ever pays you $40 in profit, you lose $10 every time you win one."],
      ["p", "CAC is useful because it turns a vague \"are ads working?\" into a number you can compare to what a customer is worth. It is also easy to measure badly: include the whole cost, such as agency fees and free trials, not only the ad bill."],
      ["list", ["Lower CAC by improving conversion rates", "Lower CAC by paying less per click", "Do not compare CAC across channels without comparing customer quality"]]
    ],
    tryit: FUN("?co=course"),
    quiz: [
      { q: "You spend $2,000 and win 40 customers. CAC is...", o: ["$20", "$40", "$50", "$80"], a: 2, why: "2,000 divided by 40 is $50." },
      { q: "Which cost belongs in CAC?", o: ["Only the ad bill", "Ads, agency fees and free trials", "Only salaries", "Nothing, CAC is a guess"], a: 1, why: "CAC should include everything you spent to win the customer." }
    ] });
  m({ id: "mk-ltv", level: "Intermediate", title: "Lifetime value and payback", mins: 6,
    blocks: [
      ["p", "A customer is not one sale. Lifetime value, or LTV, is the profit you expect from a customer over the whole time they buy from you."],
      ["key", "LTV = profit per order times the number of orders a customer makes."],
      ["ex", "Example", "A coffee costs $3 to make and sells for $8, so each order earns $5. A regular buys 14 times, so LTV is $70. You can afford to spend up to about $23 to win a customer and still have a 3 to 1 return."],
      ["p", "Compare LTV to CAC. A common target is an LTV to CAC ratio of 3 to 1 or better. Below 1 to 1 you lose money on every customer in the end."],
      ["list", ["Payback: how many orders it takes to earn back the CAC", "A high LTV lets you outbid rivals for the same customers", "Customers who return are usually the cheapest source of growth"]]
    ],
    tryit: FUN("?co=coffee"),
    quiz: [
      { q: "Profit per order is $12 and a customer orders 5 times. LTV is...", o: ["$12", "$17", "$60", "$120"], a: 2, why: "12 times 5 is $60 of profit." },
      { q: "CAC $50, LTV $100. The ratio is...", o: ["0.5 to 1", "2 to 1", "5 to 1", "50 to 1"], a: 1, why: "100 divided by 50 is 2. Fine, but below the 3 to 1 rule of thumb." }
    ] });
  m({ id: "mk-price", level: "Intermediate", title: "Pricing and margins", mins: 6,
    blocks: [
      ["p", "Price decides two things at once: how many people buy, and how much you keep from each sale. Raising the price loses some buyers, but you keep more from each one who stays."],
      ["key", "Margin per sale = price minus the cost of making and delivering it. Marketing can only be afforded out of margin."],
      ["ex", "Example", "A product costs $8 to make. At $20 you keep $12 and sell 100 units: $1,200. At $14 you keep $6, and even if you sell 160 units you only make $960."],
      ["p", "Three common approaches: cost-plus (cost plus a markup), competitor-based (match the market) and value-based (charge what it is worth to the customer). Value-based pricing usually earns the most, but you have to know your customer well."],
      ["list", ["Check margin before you plan ads", "Discounts have to be paid for by extra volume", "Test prices on a small group first"]]
    ],
    tryit: FUN("?co=course"),
    quiz: [
      { q: "Cost $8, price $20. Margin per sale is...", o: ["$8", "$12", "$20", "$28"], a: 1, why: "20 minus 8 is $12." },
      { q: "You cut the price in half. What has to happen to keep the same profit?", o: ["Nothing", "You need more than double the sales", "Costs must rise", "Ad spend must drop"], a: 1, why: "A smaller margin per sale has to be made up by a lot more sales." }
    ] });
  m({ id: "mk-measure", level: "Intermediate", title: "Measuring a campaign", mins: 7,
    blocks: [
      ["p", "If you cannot measure a campaign you cannot improve it. Four numbers cover most of what you need."],
      ["list", ["Conversion rate: the share who move to the next step", "CAC: spend per new customer", "ROAS (return on ad spend): sales divided by ad spend", "LTV to CAC: what the customer is worth against what they cost"]],
      ["p", "ROAS looks at revenue only. A ROAS of 3 means $3 of sales for each $1 of ads, but if your margin is 30% you are only breaking even. Always check profit, not just revenue."],
      ["key", "Change one thing at a time, so you know what caused the result. That is the idea behind an A/B test."],
      ["ex", "Example: an A/B test", "Half your visitors see headline A, half see headline B. If A converts at 4% and B at 6% over a few thousand visitors, B is likely better. With only 20 visitors, the gap could be luck."]
    ],
    tryit: FUN("?co=bad"),
    quiz: [
      { q: "ROAS of 3 and a 30% margin means...", o: ["Great profit", "Roughly break-even before other costs", "A big loss", "You should double ad spend"], a: 1, why: "3 times 30% is 0.9. You earn about 90 cents of profit per $1 of ads." },
      { q: "In an A/B test you should...", o: ["Change five things at once", "Change one thing and compare", "Only look at the first day", "Use 10 visitors"], a: 1, why: "One change at a time shows what caused the difference." }
    ] });

  r({ id: "rk-what", level: "Beginner", title: "What risk is", mins: 4,
    blocks: [
      ["p", "Risk is the chance that something goes differently than planned, and that it costs you. Not all risk is bad. A business takes risks on purpose, because that is how it earns a return."],
      ["p", "Risk management is the habit of finding the risks, deciding which matter, and choosing what to do about each one before it happens."],
      ["key", "The goal is not zero risk. It is taking the risks worth taking, and not being wiped out by the ones that are not."],
      ["ex", "Example: a bakery", "Opening a second shop is a chosen risk with a potential reward. A kitchen fire is a risk with no reward. You welcome the first, and protect against the second."]
    ],
    tryit: RISK(),
    quiz: [
      { q: "Risk management means...", o: ["Avoiding all risk", "Choosing which risks to take, and protecting against the rest", "Buying insurance for everything", "Ignoring small problems"], a: 1, why: "Business needs some risk to earn returns. The job is to choose well." },
      { q: "Which is a risk you take for a reward?", o: ["A flood", "Launching a new product", "Theft", "A power cut"], a: 1, why: "A new product can lose money, but it can also earn it." }
    ] });
  r({ id: "rk-types", level: "Beginner", title: "Types of business risk", mins: 5,
    blocks: [
      ["p", "Risks come in families. Naming the family helps you remember to look for each one."],
      ["list", ["Operational: things breaking, suppliers failing, mistakes, fire", "Financial: running out of cash, customers not paying, interest rates", "Market: demand falls, a rival arrives, prices change", "Legal and compliance: lawsuits, broken rules, fines", "Technology and cyber: hacking, outages, lost data", "People: a key person leaves, fraud, safety"]],
      ["key", "Many businesses fail from running out of cash, even ones that are profitable on paper. Financial risk is the one that ends companies fastest."],
      ["ex", "Example", "A shop with a single supplier has an operational risk (supplier fails), a financial risk (cash tied up in stock) and a market risk (a rival offers the same goods cheaper)."]
    ],
    tryit: RISK(),
    quiz: [
      { q: "A customer does not pay a large invoice. That is mainly a...", o: ["Technology risk", "Financial risk", "Legal risk only", "People risk"], a: 1, why: "It hits your cash." },
      { q: "A hacker steals customer data. Which family?", o: ["Market", "Technology and cyber", "People", "Financial only"], a: 1, why: "It starts as a cyber risk, then becomes legal and financial too." }
    ] });
  r({ id: "rk-matrix", level: "Beginner", title: "Probability times impact", mins: 6,
    blocks: [
      ["p", "Two questions size any risk: how likely is it, and how bad would it be? Multiply them to get the expected loss."],
      ["key", "Expected loss = chance per year times cost if it happens."],
      ["ex", "Example", "A 2% chance a year of a $60,000 fire is an expected loss of $1,200 a year. A 30% chance of a $12,000 staff loss is $3,600 a year. The smaller event is the bigger expected cost."],
      ["p", "A risk matrix is a grid with likelihood on one side and impact on the other. High and to the right means deal with it first. But look at rare, huge events too: expected loss can look small while a single hit would close you down."],
      ["list", ["Top right: likely and costly. Act now", "Bottom right: rare but huge. Protect so you survive it", "Top left: frequent and small. Fix or accept", "Bottom left: low priority"]]
    ],
    tryit: RISK(),
    quiz: [
      { q: "5% chance of a $40,000 loss. Expected loss per year is...", o: ["$200", "$2,000", "$4,000", "$40,000"], a: 1, why: "0.05 times 40,000 is $2,000." },
      { q: "Why look at rare, huge risks even if expected loss is small?", o: ["They are more fun", "One hit could end the business", "They are always likely", "Insurers require it"], a: 1, why: "Survival matters more than the average." }
    ] });
  r({ id: "rk-registry", level: "Intermediate", title: "Building a risk register", mins: 6,
    blocks: [
      ["p", "A risk register is a simple list. For each risk you write what it is, how likely it is, what it would cost, what you will do about it, and who is responsible."],
      ["list", ["Name the risk in a sentence", "Estimate chance per year and cost if it happens", "Choose a response", "Give it an owner and a date to check again"]],
      ["key", "A register is not a one-off. Review it every few months, because new risks appear and old ones fade."],
      ["ex", "Example", "A small online shop lists six risks, and sees that one (supplier failure) is the most expensive in expected terms. It spends its first protection dollar there, not on the headline-grabbing fire risk."],
      ["p", "Estimates will be rough. That is fine. Being roughly right about which risks are large beats being precisely wrong or not looking at all."]
    ],
    tryit: RISK(),
    quiz: [
      { q: "How often should you review a risk register?", o: ["Never", "Once at the start", "Every few months", "Only after a loss"], a: 2, why: "Risks change, so the register should too." },
      { q: "Estimates in a register are rough. Is it still worth doing?", o: ["No", "Yes, it shows which risks matter most", "Only for big companies", "Only with software"], a: 1, why: "A rough ranking is far better than none." }
    ] });
  r({ id: "rk-response", level: "Intermediate", title: "Four ways to respond", mins: 6,
    blocks: [
      ["p", "Once you know a risk, you have four basic choices."],
      ["list", ["Accept: do nothing and live with it. Right for small risks", "Reduce: lower the chance or the damage, such as a backup supplier or better security", "Transfer: pay someone else to carry it, usually insurance", "Avoid: stop the activity that creates the risk"]],
      ["key", "Spend on a response only if it costs less than the loss it prevents, or if the loss is big enough to threaten survival."],
      ["ex", "Example", "A 15% chance a year of a $20,000 supplier failure is a $3,000 expected loss. A backup supplier that costs $1,200 a year and halves the chance saves $1,500. Worth it."],
      ["p", "Accepting is a real decision, not a failure. The danger is accepting by accident because nobody looked."]
    ],
    tryit: RISK(),
    quiz: [
      { q: "Paying for insurance is which response?", o: ["Accept", "Reduce", "Transfer", "Avoid"], a: 2, why: "You pass the cost of the loss to the insurer for a fee." },
      { q: "A control costs $5,000 a year and prevents $2,000 of expected loss. Should you buy it?", o: ["Yes always", "Probably not, unless survival is at stake", "Yes, insurance is good", "Only if cheap"], a: 1, why: "It costs more than it saves, unless the loss is one you cannot survive." }
    ] });
  r({ id: "rk-insurance", level: "Intermediate", title: "Insurance and deductibles", mins: 6,
    blocks: [
      ["p", "Insurance is a trade. You pay a small amount for certain, called the premium, and the insurer pays for a large loss if it happens."],
      ["p", "The deductible is the part of any loss you pay yourself before the insurer pays. A higher deductible lowers the premium, but you carry more of each loss."],
      ["key", "Insure the losses you could not survive. Absorb the small ones yourself."],
      ["ex", "Example", "A fire could cost $60,000. A policy costs $900 a year with a $2,000 deductible. Without it, one fire ends the business. With it, the worst you pay is $2,000. Insurers make money on average, so you pay a little more than the expected loss. You are buying sleep, and survival."],
      ["list", ["Read what is excluded, not only what is covered", "Match the cover to your biggest exposures", "Insurance does not fix the cause. Prevent what you can"]]
    ],
    tryit: RISK(),
    quiz: [
      { q: "A higher deductible usually means...", o: ["A higher premium", "A lower premium but more cost to you per loss", "No cover", "More cover"], a: 1, why: "You take more of each loss, so the insurer charges less." },
      { q: "What should you insure first?", o: ["Every small thing", "Losses that could end the business", "Nothing", "The cheapest things"], a: 1, why: "Survival risks are what insurance is for." }
    ] });
  r({ id: "rk-diversify", level: "Intermediate", title: "Concentration and diversification", mins: 6,
    blocks: [
      ["p", "Concentration risk is having too much riding on one thing: one customer, one supplier, one product, one market."],
      ["p", "Diversification means spreading that exposure so that no single failure can sink you."],
      ["key", "If losing one thing would badly hurt you, you are concentrated."],
      ["ex", "Example", "A business gets 70% of its sales from one customer. If that customer leaves, 70% of revenue goes. Winning a few more mid-sized customers costs effort, but removes the single point of failure."],
      ["list", ["Customers: no one buyer above about 20% of sales", "Suppliers: a second source for key goods", "Products and markets: more than one", "Money: cash held in more than one place"]],
      ["p", "Diversification has a cost, like less focus. Aim for enough spread that the worst case is survivable, not so much that nothing is done well."]
    ],
    tryit: RISK(),
    quiz: [
      { q: "70% of sales come from one customer. This is...", o: ["Great", "Concentration risk", "Diversification", "A market risk only"], a: 1, why: "Losing them would badly hurt." },
      { q: "A backup supplier is an example of...", o: ["Accepting risk", "Diversifying", "Avoiding risk", "Transferring risk"], a: 1, why: "You spread dependence over more than one source." }
    ] });
  r({ id: "rk-stress", level: "Intermediate", title: "Stress tests and scenarios", mins: 7,
    blocks: [
      ["p", "A stress test asks: if bad things happen, will we still be standing? You pick some bad scenarios, run them against your numbers, and see how far cash falls."],
      ["key", "Look at the lowest cash balance, not the average. The lowest point is what kills a business."],
      ["ex", "Example", "A shop has $15,000 in cash and earns $1,200 a month. A fire costs $25,000 in month 3. Without insurance, cash goes to about negative $6,000 and the shop is closed. With insurance and a $3,000 deductible, cash dips but survives."],
      ["p", "Try stacking two bad things in a row, like a recession after a supplier failure. Real crises tend to come together."],
      ["list", ["Choose realistic but severe scenarios", "Track cash month by month", "Test your protections: do they turn a failure into a dip?", "Write down what you would do, ahead of time"]]
    ],
    tryit: { label: "Run a stress test", href: "/risk-lab#stress" },
    quiz: [
      { q: "In a stress test, which number matters most?", o: ["Average cash", "The lowest cash balance", "Final profit", "Revenue"], a: 1, why: "If cash hits zero, you are out, no matter what the average was." },
      { q: "Why test two bad events together?", o: ["It is easier", "Real crises often arrive together", "Insurers ask for it", "It makes results look better"], a: 1, why: "Combined hits are when businesses fail." }
    ] });

  window.BizLessons = { marketing: M, risk: R };
})();
