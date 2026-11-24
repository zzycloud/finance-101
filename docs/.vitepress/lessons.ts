// Single source of truth for the curriculum.
// Adding a lesson: add an entry here, then create docs/lNN.md and docs/en/lNN.md.

export type Lang = 'zh' | 'en'

export interface Stage {
  id: string
  color: string
  zh: string
  en: string
}

export interface LessonText {
  title: string
  subtitle: string
  quote: string
  /** What the lesson covers; shown on the timeline and on "coming soon" pages. */
  outline: string[]
}

export interface Lesson {
  id: string // l01, l02 ...
  stage: string
  ready: boolean
  minutes: number
  /** 1 (gentle) to 5 (advanced) */
  level: number
  zh: LessonText
  en: LessonText
}

export const stages: Stage[] = [
  { id: 'basics', color: '#3b82f6', zh: '理财基础', en: 'Foundations' },
  { id: 'funds', color: '#10b981', zh: '基金与 ETF', en: 'Funds & ETFs' },
  { id: 'stocks', color: '#8b5cf6', zh: '股票', en: 'Stocks' },
  { id: 'bonds', color: '#06b6d4', zh: '债券', en: 'Bonds' },
  { id: 'options', color: '#f59e0b', zh: '期权', en: 'Options' },
  { id: 'futures', color: '#ef4444', zh: '期货', en: 'Futures' },
  { id: 'mindset', color: '#64748b', zh: '税务、风险与心态', en: 'Taxes, Risk & Mindset' },
]

export const lessons: Lesson[] = [
  // ---------- Foundations ----------
  {
    id: 'l01', stage: 'basics', ready: true, minutes: 12, level: 1,
    zh: {
      title: '为什么要投资', subtitle: '复利与通胀',
      quote: '不投资的钱会被通胀侵蚀；投资的钱靠复利增长，时间越长越明显。',
      outline: ['通胀如何悄悄吃掉存款', '复利：利滚利的威力', '72 法则：心算翻倍时间', '越早开始差距越大'],
    },
    en: {
      title: 'Why Invest', subtitle: 'Compounding and Inflation',
      quote: 'Idle money loses purchasing power to inflation. Invested money grows by compounding, and time matters most.',
      outline: ['How inflation quietly eats savings', 'Compounding: growth on top of growth', 'The Rule of 72', 'Why starting early matters so much'],
    },
  },
  {
    id: 'l02', stage: 'basics', ready: true, minutes: 14, level: 1,
    zh: {
      title: '风险与收益', subtitle: '波动、损失与分散',
      quote: '预期收益越高，波动通常越大。先确认自己能承受多大的下跌。',
      outline: ['风险到底是什么：波动与永久亏损', '风险收益阶梯', '历史上的大跌', '分散投资：唯一的“免费午餐”', '投资期限与风险'],
    },
    en: {
      title: 'Risk and Return', subtitle: 'Volatility, Loss and Diversification',
      quote: 'Higher expected returns usually come with bigger swings. Know how large a drop you can live with.',
      outline: ['What risk really means: volatility vs. permanent loss', 'The risk-return ladder', 'Big crashes in history', 'Diversification: the only free lunch', 'Time horizon and risk'],
    },
  },
  {
    id: 'l03', stage: 'basics', ready: true, minutes: 12, level: 1,
    zh: {
      title: '投资前的准备', subtitle: '应急金、债务与目标',
      quote: '没有应急金，一次意外开支就可能逼你在下跌时卖出投资。',
      outline: ['理财的先后顺序', '应急金：放多少、放哪里', '先还高息债', '给每笔钱定一个目标和期限'],
    },
    en: {
      title: 'Before You Invest', subtitle: 'Emergency Fund, Debt and Goals',
      quote: 'Without an emergency fund, one unexpected bill can force you to sell during a downturn.',
      outline: ['The order of operations', 'Emergency fund: how much and where', 'Pay off high-interest debt first', 'Give every dollar a goal and a deadline'],
    },
  },
  {
    id: 'l04', stage: 'basics', ready: true, minutes: 16, level: 2,
    zh: {
      title: '账户与平台', subtitle: '券商账户、IRA 与 401(k)',
      quote: '同样的投资，放在不同的账户里，交的税可能差很多。',
      outline: ['券商是什么，钱安不安全（SIPC）', '普通应税账户', '401(k) 与公司配比', '传统 IRA 与 Roth IRA', '不在美国的读者需要注意什么'],
    },
    en: {
      title: 'Accounts and Platforms', subtitle: 'Brokerage, IRA and 401(k)',
      quote: 'The same investment can be taxed very differently depending on which account holds it.',
      outline: ['What a broker is, and is your money safe (SIPC)', 'Taxable brokerage accounts', '401(k) and the employer match', 'Traditional vs. Roth IRA', 'Notes for readers outside the US'],
    },
  },
  // ---------- Funds ----------
  {
    id: 'l05', stage: 'funds', ready: true, minutes: 14, level: 1,
    zh: {
      title: '基金是什么', subtitle: '共同基金、ETF 与指数基金',
      quote: '基金把很多人的钱集中起来，一次买入几百只股票或债券。',
      outline: ['基金的基本原理', '净值（NAV）', '共同基金 vs ETF', '主动基金 vs 被动（指数）基金', '费用率'],
    },
    en: {
      title: 'What Is a Fund', subtitle: 'Mutual Funds, ETFs and Index Funds',
      quote: 'A fund pools many people’s money to buy hundreds of stocks or bonds at once.',
      outline: ['How funds work', 'Net asset value (NAV)', 'Mutual funds vs. ETFs', 'Active vs. passive (index) funds', 'Expense ratios'],
    },
  },
  {
    id: 'l06', stage: 'funds', ready: true, minutes: 15, level: 2,
    zh: {
      title: '指数基金', subtitle: '为什么“买下整个市场”很难被打败',
      quote: '别在草堆里找针，把整个草堆买下来。（约翰·博格）',
      outline: ['什么是指数：S&P 500、全市场、国际', '市值加权', '主动基金为什么大多跑输', '费用的长期影响', '常见的指数基金'],
    },
    en: {
      title: 'Index Funds', subtitle: 'Why Owning the Whole Market Is Hard to Beat',
      quote: '“Don’t look for the needle in the haystack. Just buy the haystack.” (John Bogle)',
      outline: ['What an index is: S&P 500, total market, international', 'Market-cap weighting', 'Why most active funds lag', 'The long-run cost of fees', 'Common index funds'],
    },
  },
  {
    id: 'l07', stage: 'funds', ready: true, minutes: 15, level: 2,
    zh: {
      title: '怎么挑一只 ETF', subtitle: '读懂产品说明的五个要点',
      quote: '名字相似的两只 ETF，持仓可能完全不同。',
      outline: ['它跟踪什么指数', '费用率', '规模与成交量', '买卖价差', '避开杠杆和反向 ETF'],
    },
    en: {
      title: 'How to Pick an ETF', subtitle: 'Five Things to Check on a Fact Sheet',
      quote: 'Two ETFs with similar names can hold very different things.',
      outline: ['What index it tracks', 'Expense ratio', 'Size and trading volume', 'Bid-ask spread', 'Steer clear of leveraged and inverse ETFs'],
    },
  },
  {
    id: 'l08', stage: 'funds', ready: true, minutes: 16, level: 2,
    zh: {
      title: '资产配置、定投与再平衡', subtitle: '把基金组合成一个计划',
      quote: '组合的涨跌幅度，主要取决于股票和债券各占多少。',
      outline: ['资产配置：股债比例', '三基金组合与目标日期基金', '定投（DCA）与一次性投入', '再平衡'],
    },
    en: {
      title: 'Allocation, DCA and Rebalancing', subtitle: 'Turning Funds into a Plan',
      quote: 'How much a portfolio swings depends mainly on its mix of stocks and bonds.',
      outline: ['Asset allocation: the stock/bond mix', 'Three-fund portfolios and target-date funds', 'Dollar-cost averaging vs. lump sum', 'Rebalancing'],
    },
  },
  // ---------- Stocks ----------
  {
    id: 'l09', stage: 'stocks', ready: false, minutes: 14, level: 2,
    zh: { title: '股票是什么', subtitle: '成为一家公司的小股东', quote: '一股股票代表一家公司的一小部分所有权。', outline: ['股份与所有权', '公司为什么上市', '股价为什么会涨跌', '普通股与优先股'] },
    en: { title: 'What Is a Stock', subtitle: 'Owning a Slice of a Company', quote: 'A share is a small piece of ownership in a company.', outline: ['Shares and ownership', 'Why companies go public', 'Why prices move', 'Common vs. preferred stock'] },
  },
  {
    id: 'l10', stage: 'stocks', ready: false, minutes: 15, level: 2,
    zh: { title: '股市怎么运转', subtitle: '交易所、下单与交易时间', quote: '每一笔成交，都有一个买家和一个卖家。', outline: ['NYSE 与 Nasdaq', '买价、卖价与价差', '市价单、限价单、止损单', '盘前盘后与结算（T+1）'] },
    en: { title: 'How the Market Works', subtitle: 'Exchanges, Orders and Trading Hours', quote: 'Every trade has a buyer and a seller.', outline: ['NYSE and Nasdaq', 'Bid, ask and spread', 'Market, limit and stop orders', 'Extended hours and settlement (T+1)'] },
  },
  {
    id: 'l11', stage: 'stocks', ready: false, minutes: 18, level: 3,
    zh: { title: '读懂财报', subtitle: '三张表看懂一家公司', quote: '利润表告诉你赚了多少，现金流量表告诉你钱是不是真的进了口袋。', outline: ['利润表', '资产负债表', '现金流量表', '10-K 与 10-Q 去哪找'] },
    en: { title: 'Reading Financial Statements', subtitle: 'Three Statements, One Company', quote: 'The income statement says what was earned; the cash flow statement says whether the cash showed up.', outline: ['Income statement', 'Balance sheet', 'Cash flow statement', 'Where to find 10-Ks and 10-Qs'] },
  },
  {
    id: 'l12', stage: 'stocks', ready: false, minutes: 16, level: 3,
    zh: { title: '估值入门', subtitle: '好公司不等于好价格', quote: '再好的公司，买贵了也可能是一笔差投资。', outline: ['市盈率（P/E）', '市净率与市销率', '股息率', '估值的局限'] },
    en: { title: 'Valuation Basics', subtitle: 'A Great Company Is Not Always a Great Price', quote: 'Even a wonderful company can be a poor investment if you overpay.', outline: ['Price-to-earnings (P/E)', 'Price-to-book and price-to-sales', 'Dividend yield', 'Limits of valuation'] },
  },
  {
    id: 'l13', stage: 'stocks', ready: false, minutes: 12, level: 2,
    zh: { title: '分红、回购与拆股', subtitle: '公司怎样把钱还给股东', quote: '拆股不改变你持有的价值；分红发出后，股价会相应下调。', outline: ['现金分红与除息日', '股票回购', '拆股与合股', '分红再投资（DRIP）'] },
    en: { title: 'Dividends, Buybacks and Splits', subtitle: 'How Companies Return Cash', quote: "A split doesn’t change what you own, and the share price drops by about the dividend when it’s paid out.", outline: ['Cash dividends and ex-dividend dates', 'Share buybacks', 'Splits and reverse splits', 'Dividend reinvestment (DRIP)'] },
  },
  // ---------- Bonds ----------
  {
    id: 'l14', stage: 'bonds', ready: false, minutes: 15, level: 2,
    zh: { title: '债券入门', subtitle: '把钱借出去，按时收利息', quote: '买债券，就是当债主。', outline: ['面值、票息与到期日', '国债、市政债、公司债', '信用评级', '债券基金'] },
    en: { title: 'Bond Basics', subtitle: 'Lend Money, Collect Interest', quote: 'Buying a bond makes you the lender.', outline: ['Face value, coupon and maturity', 'Treasuries, munis and corporates', 'Credit ratings', 'Bond funds'] },
  },
  {
    id: 'l15', stage: 'bonds', ready: false, minutes: 16, level: 3,
    zh: { title: '利率与收益率曲线', subtitle: '为什么加息时债券会跌', quote: '利率上升，已发行债券的价格下跌；利率下降，价格上涨。', outline: ['利率与债价的反向关系', '久期', '收益率曲线与倒挂', 'T-Bill、TIPS 与 I Bond'] },
    en: { title: 'Rates and the Yield Curve', subtitle: 'Why Bonds Fall When Rates Rise', quote: 'When rates rise, existing bond prices fall, and vice versa.', outline: ['Why prices move opposite to rates', 'Duration', 'The yield curve and inversions', 'T-Bills, TIPS and I Bonds'] },
  },
  // ---------- Options ----------
  {
    id: 'l16', stage: 'options', ready: false, minutes: 18, level: 3,
    zh: { title: '期权是什么', subtitle: '看涨期权与看跌期权', quote: '期权是一种权利，不是义务；但卖出期权的人，承担的就是义务。', outline: ['看涨（Call）与看跌（Put）', '行权价、到期日与权利金', '买方与卖方', '一份合约 = 100 股'] },
    en: { title: 'What Is an Option', subtitle: 'Calls and Puts', quote: 'An option buyer has a right, not an obligation. The seller has the obligation.', outline: ['Calls and puts', 'Strike, expiration and premium', 'Buyers vs. sellers', 'One contract = 100 shares'] },
  },
  {
    id: 'l17', stage: 'options', ready: false, minutes: 20, level: 4,
    zh: { title: '期权定价与希腊字母', subtitle: '时间价值与波动率', quote: '期权价格反映了市场对未来波动的预期。', outline: ['内在价值与时间价值', '隐含波动率', 'Delta、Gamma、Theta、Vega', '时间损耗'] },
    en: { title: 'Option Pricing and the Greeks', subtitle: 'Time Value and Volatility', quote: "An option's price reflects the market's expectation of future volatility.", outline: ['Intrinsic vs. time value', 'Implied volatility', 'Delta, Gamma, Theta, Vega', 'Time decay'] },
  },
  {
    id: 'l18', stage: 'options', ready: false, minutes: 18, level: 4,
    zh: { title: '常见策略与风险', subtitle: '备兑看涨、保护性看跌及其陷阱', quote: '买入期权后，即使股价不动，期权的时间价值也会随到期临近而减少。', outline: ['备兑看涨（Covered Call）', '保护性看跌（Protective Put）', '价差策略', '为什么新手容易亏'] },
    en: { title: 'Common Strategies and Risks', subtitle: 'Covered Calls, Protective Puts and Traps', quote: 'A bought option loses time value as expiration approaches, even if the stock doesn’t move.', outline: ['Covered calls', 'Protective puts', 'Spreads', 'Why beginners often lose'] },
  },
  // ---------- Futures ----------
  {
    id: 'l19', stage: 'futures', ready: false, minutes: 16, level: 4,
    zh: { title: '期货入门', subtitle: '约定未来的价格', quote: '期货最早是农民和面粉厂用来锁定价格的工具。', outline: ['期货合约是什么', '套期保值与投机', '交割与展期', '常见品种：股指、原油、黄金'] },
    en: { title: 'Futures Basics', subtitle: 'Agreeing on a Future Price', quote: 'Futures began as a way for farmers and millers to lock in prices.', outline: ['What a futures contract is', 'Hedging vs. speculation', 'Delivery and rolling', 'Common markets: equity index, oil, gold'] },
  },
  {
    id: 'l20', stage: 'futures', ready: false, minutes: 18, level: 5,
    zh: { title: '保证金与杠杆', subtitle: '合约规格与强制平仓风险', quote: '杠杆同样放大亏损，亏损可能超过你投入的保证金。', outline: ['保证金与每日结算', '杠杆是怎么放大的', '追加保证金', '读懂合约规格（以 CME 为例）'] },
    en: { title: 'Margin and Leverage', subtitle: 'Contract Specs and Liquidation Risk', quote: 'Leverage magnifies losses too, and losses can exceed the margin you put up.', outline: ['Margin and daily settlement', 'How leverage magnifies', 'Margin calls', 'Reading contract specs (CME examples)'] },
  },
  // ---------- Mindset ----------
  {
    id: 'l21', stage: 'mindset', ready: false, minutes: 18, level: 3,
    zh: { title: '美国投资税务入门', subtitle: '资本利得、股息与亏损抵税', quote: '比较收益时，要看税后留下多少。', outline: ['短期与长期资本利得', '合格股息', '亏损抵税与洗售规则', '1099 表格'] },
    en: { title: 'US Investment Taxes 101', subtitle: 'Capital Gains, Dividends and Losses', quote: 'Compare returns after taxes.', outline: ['Short- vs. long-term capital gains', 'Qualified dividends', 'Tax-loss harvesting and wash sales', 'Form 1099'] },
  },
  {
    id: 'l22', stage: 'mindset', ready: false, minutes: 15, level: 2,
    zh: { title: '行为偏差与风险管理', subtitle: '常见的决策错误', quote: '下跌时恐慌卖出、上涨时追高买入，会让实际收益低于所持基金的收益。', outline: ['损失厌恶与追涨杀跌', '过度自信与频繁交易', '择时为什么难', '识别骗局'] },
    en: { title: 'Behavior and Risk Management', subtitle: 'Common Decision Mistakes', quote: 'Selling in panics and buying after big rallies can leave you with less than the funds you own.', outline: ['Loss aversion and chasing', 'Overconfidence and overtrading', 'Why market timing is hard', 'Spotting scams'] },
  },
  {
    id: 'l23', stage: 'mindset', ready: false, minutes: 15, level: 2,
    zh: { title: '写下你的投资计划', subtitle: '一页纸的投资政策书', quote: '市场平稳时写好计划，下跌时照计划执行。', outline: ['目标、期限与风险承受力', '资产配置与再平衡规则', '什么情况下改计划', '模板与示例'] },
    en: { title: 'Write Your Investment Plan', subtitle: 'A One-Page Investment Policy Statement', quote: 'Write the plan when markets are calm; follow it when they aren’t.', outline: ['Goals, horizon and risk tolerance', 'Allocation and rebalancing rules', 'When to change the plan', 'Template and example'] },
  },
]

export function stageOf(lesson: Lesson): Stage {
  return stages.find((s) => s.id === lesson.stage)!
}

export function lessonNumber(lesson: Lesson): string {
  return lesson.id.slice(1)
}
