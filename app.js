
// Supabase Auth
const SUPABASE_URL = "https://xkfxofcmrmpazfjviatq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrZnhvZmNtcm1wYXpmanZpYXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNzE5MDcsImV4cCI6MjA5Mzk0NzkwN30.DiO5Xo-gh-t_gq_IuSiqXlwX6_LIw3YvZgugknz1o_Q";

const supabaseSignUp = async (email, password) => {
  const res = await fetch(SUPABASE_URL + "/auth/v1/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

const supabaseSignIn = async (email, password) => {
  const res = await fetch(SUPABASE_URL + "/auth/v1/token?grant_type=password", {
    method: "POST",
    headers: { "Content-Type": "application/json", "apikey": SUPABASE_ANON_KEY },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

const supabaseSignOut = async (token) => {
  await fetch(SUPABASE_URL + "/auth/v1/logout", {
    method: "POST",
    headers: { "apikey": SUPABASE_ANON_KEY, "Authorization": "Bearer " + token }
  });
};
const form = document.querySelector("#ratioForm");
const ratioGrid = document.querySelector("#ratioGrid");
const decisionNotes = document.querySelector("#decisionNotes");
const factorSummary = document.querySelector("#factorSummary");
const portfolioBuilderSection = document.querySelector(".portfolio-section[data-view-panel='portfolio']");
const singleStockDrawer = document.querySelector(".single-stock-drawer[data-view-panel='portfolio']");
const serverWarning = document.querySelector("#serverWarning");
const strategyButtons = document.querySelectorAll("[data-strategy]");
const loadButtons = document.querySelectorAll("[data-load]");
const scenarioButtons = document.querySelectorAll("[data-load], #loadLargePortfolio");
const resetButton = document.querySelector("#resetButton");
const riskProfile = document.querySelector("#riskProfile");
const scoreGauge = document.querySelector("#scoreGauge");
const radarChart = document.querySelector("#radarChart");
const addHoldingButton = document.querySelector("#addHoldingButton");
const advancedToggle = document.querySelector("#advancedToggle");
const advancedFields = document.querySelector("#advancedFields");
const advancedTitleToggle = document.querySelector("#advancedTitleToggle");
const loadSingleStockButton = document.querySelector("#loadSingleStockButton");
const loadLargePortfolioButton = document.querySelector("#loadLargePortfolio");
const normalizeButton = document.querySelector("#normalizeButton");
const clearPortfolioButton = document.querySelector("#clearPortfolioButton");
const exportReportButton = document.querySelector("#exportReportButton");
const exportReportButtonSecondary = document.querySelector("#exportReportButtonSecondary");
const importPortfolioButton = document.querySelector("#importPortfolioButton");
const samplePortfolioButton = document.querySelector("#samplePortfolioButton");
const clearBulkButton = document.querySelector("#clearBulkButton");
const bulkInput = document.querySelector("#bulkInput");
const assetRows = document.querySelector("#assetRows");
const addAssetRowButton = document.querySelector("#addAssetRowButton");
const bulkStatus = document.querySelector("#bulkStatus");
const builderPreview = document.querySelector("#builderPreview");
const holdingsBody = document.querySelector("#holdingsBody");
const portfolioNotes = document.querySelector("#portfolioNotes");
const thesisTickerSelect = document.querySelector("#thesisTickerSelect");
const thesisReason = document.querySelector("#thesisReason");
const thesisRisk = document.querySelector("#thesisRisk");
const thesisReview = document.querySelector("#thesisReview");
const thesisBias = document.querySelector("#thesisBias");
const saveThesisButton = document.querySelector("#saveThesisButton");
const thesisStatus = document.querySelector("#thesisStatus");
const thesisGrid = document.querySelector("#thesisGrid");
const correlationMatrix = document.querySelector("#correlationMatrix");
const allocationChart = document.querySelector("#allocationChart");
const sectorChart = document.querySelector("#sectorChart");
const riskScoreChart = document.querySelector("#riskScoreChart");
const frontierChart = document.querySelector("#frontierChart");
const frontierNote = document.querySelector("#frontierNote");
const budgetFlowChart = document.querySelector("#budgetFlowChart");
const savingsMixChart = document.querySelector("#savingsMixChart");
const budgetFlowSummary = document.querySelector("#budgetFlowSummary");
const savingsMixSummary = document.querySelector("#savingsMixSummary");
const learningLibraryChart = document.querySelector("#learningLibraryChart");
const historyEraChart = document.querySelector("#historyEraChart");
const learningProgressScore = document.querySelector("#learningProgressScore");
const learningProgressDetail = document.querySelector("#learningProgressDetail");
const learningXp = document.querySelector("#learningXp");
const learningStreak = document.querySelector("#learningStreak");
const pathwayProgressBar = document.querySelector("#pathwayProgressBar");
const pathwayMap = document.querySelector("#pathwayMap");
const learningScenarioGrid = document.querySelector("#learningScenarioGrid");
const learningQuizList = document.querySelector("#learningQuizList");
const learningQuizScore = document.querySelector("#learningQuizScore");
const learningQuizLevel = document.querySelector("#learningQuizLevel");
const learningLevel = document.querySelector("#learningLevel");
const learningLevelDetail = document.querySelector("#learningLevelDetail");
const learningNextStep = document.querySelector("#learningNextStep");
const learningNextStepDetail = document.querySelector("#learningNextStepDetail");
const learningWeakCount = document.querySelector("#learningWeakCount");
const learningWeakDetail = document.querySelector("#learningWeakDetail");
const learningReviewList = document.querySelector("#learningReviewList");
const learningMissionList = document.querySelector("#learningMissionList");
const learningAreaButtons = document.querySelectorAll("[data-learning-area]");
const learningAreaPanels = document.querySelectorAll("[data-learning-area-panel]");
const tickerImport = document.querySelector("#tickerImport");
const fetchRealStocksButton = document.querySelector("#fetchRealStocksButton");
const fetchStatus = document.querySelector("#fetchStatus");
const dataSourceStatus = document.querySelector("#dataSourceStatus");
const liveDataPill = document.querySelector("#liveDataPill");
const liveDataStatus = document.querySelector("#liveDataStatus");
const liveDataDetail = document.querySelector("#liveDataDetail");
const tabButtons = document.querySelectorAll("[data-view]");
const sectionSelect = document.querySelector("#sectionSelect");
const investingSectionSelect = document.querySelector("#investingSectionSelect");
const viewPanels = document.querySelectorAll("[data-view-panel]");
const accountStatus = document.querySelector("#accountStatus");
const accountName = document.querySelector("#accountName");
const createUserHeaderButton = document.querySelector("#createUserHeaderButton");
const commandAccountBadge = document.querySelector("#commandAccountBadge");
const commandAccountStatus = document.querySelector("#commandAccountStatus");
const commandAccountName = document.querySelector("#commandAccountName");
const commandAccountDetail = document.querySelector("#commandAccountDetail");
const commandCreateUserButton = document.querySelector("#commandCreateUserButton");
const commandSignInButton = document.querySelector("#commandSignInButton");
const commandSettingsButton = document.querySelector("#commandSettingsButton");
const openAccountButton = document.querySelector("#openAccountButton");
const openSettingsButton = document.querySelector("#openSettingsButton");
const openSettingsFloatingButton = document.querySelector("#openSettingsFloatingButton");
const accountOverlay = document.querySelector("#accountOverlay");
const closeAccountButton = document.querySelector("#closeAccountButton");
const accountCurrentName = document.querySelector("#accountCurrentName");
const accountCurrentDetail = document.querySelector("#accountCurrentDetail");
const accountFocusCreateButton = document.querySelector("#accountFocusCreateButton");
const accountFocusLoginButton = document.querySelector("#accountFocusLoginButton");
const createAccountName = document.querySelector("#createAccountName");
const createAccountEmail = document.querySelector("#createAccountEmail");
const createAccountCode = document.querySelector("#createAccountCode");
const createAccountButton = document.querySelector("#createAccountButton");
const loginAccountEmail = document.querySelector("#loginAccountEmail");
const loginAccountCode = document.querySelector("#loginAccountCode");
const loginAccountButton = document.querySelector("#loginAccountButton");
const signOutButton = document.querySelector("#signOutButton");
const accountMessage = document.querySelector("#accountMessage");
const settingsOverlay = document.querySelector("#settingsOverlay");
const closeSettingsButton = document.querySelector("#closeSettingsButton");
const settingsCloseSecondaryButton = document.querySelector("#settingsCloseSecondaryButton");
const saveSettingsButton = document.querySelector("#saveSettingsButton");
const settingsMarketRefresh = document.querySelector("#settingsMarketRefresh");
const settingsNewsRefresh = document.querySelector("#settingsNewsRefresh");
const settingsPortfolioStale = document.querySelector("#settingsPortfolioStale");
const settingsExperienceButtons = document.querySelectorAll("[data-settings-experience]");
const settingsStatusGrid = document.querySelector("#settingsStatusGrid");
const settingsDataSourceGrid = document.querySelector("#settingsDataSourceGrid");
const settingsReadinessGrid = document.querySelector("#settingsReadinessGrid");
const settingsStatus = document.querySelector("#settingsStatus");
const settingsOpenAccountButton = document.querySelector("#settingsOpenAccountButton");
const settingsShowTourButton = document.querySelector("#settingsShowTourButton");
const educationalOverlay = document.querySelector("#educationalOverlay");
const acceptEducationalNoticeButton = document.querySelector("#acceptEducationalNoticeButton");
const reviewEducationalNoticeButton = document.querySelector("#reviewEducationalNoticeButton");
const exportAppDataButton = document.querySelector("#exportAppDataButton");
const importAppDataButton = document.querySelector("#importAppDataButton");
const appDataTransfer = document.querySelector("#appDataTransfer");
const targetSuggestions = document.querySelector("#targetSuggestions");
const dnaTitle = document.querySelector("#dnaTitle");
const dnaSummary = document.querySelector("#dnaSummary");
const dnaMainBet = document.querySelector("#dnaMainBet");
const dnaMainBetDetail = document.querySelector("#dnaMainBetDetail");
const dnaRiskDriver = document.querySelector("#dnaRiskDriver");
const dnaRiskDriverDetail = document.querySelector("#dnaRiskDriverDetail");
const dnaNextProfile = document.querySelector("#dnaNextProfile");
const dnaNextProfileDetail = document.querySelector("#dnaNextProfileDetail");
const companyIntelGrid = document.querySelector("#companyIntelGrid");
const companySearchInput = document.querySelector("#companySearchInput");
const companySearchButton = document.querySelector("#companySearchButton");
const companySearchStatus = document.querySelector("#companySearchStatus");
const refreshMacroButton = document.querySelector("#refreshMacroButton");
const macroStatus = document.querySelector("#macroStatus");
const macroGrid = document.querySelector("#macroGrid");
const macroImpactGrid = document.querySelector("#macroImpactGrid");
const watchlistInput = document.querySelector("#watchlistInput");
const watchlistStatus = document.querySelector("#watchlistStatus");
const watchlistGrid = document.querySelector("#watchlistGrid");
const refreshWatchlistButton = document.querySelector("#refreshWatchlistButton");
const saveWatchlistButton = document.querySelector("#saveWatchlistButton");
const compareInput = document.querySelector("#compareInput");
const compareStatus = document.querySelector("#compareStatus");
const compareBody = document.querySelector("#compareBody");
const runCompareButton = document.querySelector("#runCompareButton");
const comparePortfolioButton = document.querySelector("#comparePortfolioButton");
const refreshNewsButton = document.querySelector("#refreshNewsButton");
const newsFilterInput = document.querySelector("#newsFilterInput");
const newsScopeButtons = document.querySelectorAll("[data-news-scope]");
const newsStatus = document.querySelector("#newsStatus");
const newsGrid = document.querySelector("#newsGrid");
const rebalancePortfolioValue = document.querySelector("#rebalancePortfolioValue");
const rebalanceCashFlow = document.querySelector("#rebalanceCashFlow");
const rebalanceCashReserve = document.querySelector("#rebalanceCashReserve");
const tradeFeeFlat = document.querySelector("#tradeFeeFlat");
const tradeFeeBps = document.querySelector("#tradeFeeBps");
const taxRate = document.querySelector("#taxRate");
const taxableGainRate = document.querySelector("#taxableGainRate");
const rebalanceTargets = document.querySelector("#rebalanceTargets");
const equalWeightButton = document.querySelector("#equalWeightButton");
const rebalanceStatus = document.querySelector("#rebalanceStatus");
const rebalanceSummary = document.querySelector("#rebalanceSummary");
const rebalanceBody = document.querySelector("#rebalanceBody");
const reportPreview = document.querySelector("#reportPreview");
const professionalReportGrid = document.querySelector("#professionalReportGrid");
const portfolioName = document.querySelector("#portfolioName");
const savePortfolioButton = document.querySelector("#savePortfolioButton");
const savedPortfolioList = document.querySelector("#savedPortfolioList");
const simulatorResults = document.querySelector("#simulatorResults");
const marketClockStatus = document.querySelector("#marketClockStatus");
const marketClockDetail = document.querySelector("#marketClockDetail");
const marketEquity = document.querySelector("#marketEquity");
const marketEquityNote = document.querySelector("#marketEquityNote");
const marketCash = document.querySelector("#marketCash");
const marketPnl = document.querySelector("#marketPnl");
const marketPnlNote = document.querySelector("#marketPnlNote");
const marketReturn = document.querySelector("#marketReturn");
const marketReturnNote = document.querySelector("#marketReturnNote");
const marketRefreshMove = document.querySelector("#marketRefreshMove");
const marketRefreshNote = document.querySelector("#marketRefreshNote");
const marketDrawdown = document.querySelector("#marketDrawdown");
const marketDrawdownNote = document.querySelector("#marketDrawdownNote");
const marketAlert = document.querySelector("#marketAlert");
const marketAlertTitle = document.querySelector("#marketAlertTitle");
const marketAlertBody = document.querySelector("#marketAlertBody");
const marketAlertIndicators = document.querySelector("#marketAlertIndicators");
const marketAlertClose = document.querySelector("#marketAlertClose");
const refreshMarketButton = document.querySelector("#refreshMarketButton");
const toggleMarketPollingButton = document.querySelector("#toggleMarketPollingButton");
const resetMarketButton = document.querySelector("#resetMarketButton");
const tradeTicker = document.querySelector("#tradeTicker");
const tradeShares = document.querySelector("#tradeShares");
const tradeSide = document.querySelector("#tradeSide");
const placeTradeButton = document.querySelector("#placeTradeButton");
const tradeStatus = document.querySelector("#tradeStatus");
const marketWatchlistInput = document.querySelector("#marketWatchlistInput");
const applyWatchlistButton = document.querySelector("#applyWatchlistButton");
const marketQuotesGrid = document.querySelector("#marketQuotesGrid");
const marketPerformanceBody = document.querySelector("#marketPerformanceBody");
const marketPositionsBody = document.querySelector("#marketPositionsBody");
const marketTradesBody = document.querySelector("#marketTradesBody");
const termCard = document.querySelector("#termCard");
const termTitle = document.querySelector("#termTitle");
const termMeaning = document.querySelector("#termMeaning");
const termSimple = document.querySelector("#termSimple");
const termExample = document.querySelector("#termExample");
const termClose = document.querySelector("#termClose");
const calculatorInputs = document.querySelectorAll(
  "#tvmSolveFor, #tvmPresent, #tvmFuture, #tvmRate, #tvmYears, #tvmPayment, #ivFcf, #ivGrowth, #ivTerminalGrowth, #ivDiscount, #ivYears, #ivPrice, #geoReturns"
);
const simulatorInputs = document.querySelectorAll("#simMarketDrop, #simHighBetaDrop, #simLargestDrop, #simCustomDrop");
const modeButtons = document.querySelectorAll("[data-mode]");
const learningButtons = document.querySelectorAll("[data-learn-panel]");
const savingsTabButtons = document.querySelectorAll("[data-savings-tab]");
const workspaceSelect = document.querySelector("#workspaceSelect");
const savingsPanelSelect = document.querySelector("#savingsPanelSelect");
const learningAreaSelect = document.querySelector("#learningAreaSelect");
const lifeEventButtons = document.querySelectorAll("[data-life-event]");
const experienceButtons = document.querySelectorAll("[data-experience]");
const brandTitle = document.querySelector("#brandTitle");
const brandSubtitle = document.querySelector("#brandSubtitle");
const modeDisclaimer = document.querySelector("#modeDisclaimer");
const workspaceEyebrow = document.querySelector("#workspaceEyebrow");
const workspaceTitle = document.querySelector("#workspaceTitle");
const workspaceCopy = document.querySelector("#workspaceCopy");
const workspaceTags = document.querySelector("#workspaceTags");
const toolSearchInput = document.querySelector("#toolSearchInput");
const toolSearchResults = document.querySelector("#toolSearchResults");
const commandPortfolioScore = document.querySelector("#commandPortfolioScore");
const commandPortfolioNote = document.querySelector("#commandPortfolioNote");
const commandBudgetScore = document.querySelector("#commandBudgetScore");
const commandBudgetNote = document.querySelector("#commandBudgetNote");
const commandLearningCount = document.querySelector("#commandLearningCount");
const commandLearningNote = document.querySelector("#commandLearningNote");
const commandMarketMood = document.querySelector("#commandMarketMood");
const commandMarketNote = document.querySelector("#commandMarketNote");
const setupChecklistGrid = document.querySelector("#setupChecklistGrid");
const askPilotInput = document.querySelector("#askPilotInput");
const askPilotRunButton = document.querySelector("#askPilotRunButton");
const askPilotAddPlanButton = document.querySelector("#askPilotAddPlanButton");
const askPilotOpenToolButton = document.querySelector("#askPilotOpenToolButton");
const askPilotOutput = document.querySelector("#askPilotOutput");
const askPilotQuickButtons = document.querySelectorAll("[data-pilot-prompt]");
const demoModeButton = document.querySelector("#demoModeButton");
const clearAllDemoButton = document.querySelector("#clearAllDemoButton");
const clearInvestingButton = document.querySelector("#clearInvestingButton");
const clearSavingsButton = document.querySelector("#clearSavingsButton");
const clearGoalsButton = document.querySelector("#clearGoalsButton");
const clearLearningButton = document.querySelector("#clearLearningButton");
const clearPlanButton = document.querySelector("#clearPlanButton");
const prepareProfessorDemoButton = document.querySelector("#prepareProfessorDemoButton");
const professorDemoGrid = document.querySelector("#professorDemoGrid");
const professorDemoStatus = document.querySelector("#professorDemoStatus");
const presentationModeGrid = document.querySelector("#presentationModeGrid");
const apiStatusGrid = document.querySelector("#apiStatusGrid");
const commandDataSourceGrid = document.querySelector("#commandDataSourceGrid");
const apiStatusNote = document.querySelector("#apiStatusNote");
const apiRefreshButton = document.querySelector("#apiRefreshButton");
const loadRealDemoButton = document.querySelector("#loadRealDemoButton");
const copilotReportGrid = document.querySelector("#copilotReportGrid");
const copilotNextActions = document.querySelector("#copilotNextActions");
const copyCopilotReportButton = document.querySelector("#copyCopilotReportButton");
const copilotReportStatus = document.querySelector("#copilotReportStatus");
const weeklySnapshotGrid = document.querySelector("#weeklySnapshotGrid");
const weeklyActionStrip = document.querySelector("#weeklyActionStrip");
const copyWeeklyReportButton = document.querySelector("#copyWeeklyReportButton");
const weeklyReportStatus = document.querySelector("#weeklyReportStatus");
const earlyAccessName = document.querySelector("#earlyAccessName");
const earlyAccessEmail = document.querySelector("#earlyAccessEmail");
const earlyAccessFeature = document.querySelector("#earlyAccessFeature");
const joinEarlyAccessButton = document.querySelector("#joinEarlyAccessButton");
const earlyAccessStatus = document.querySelector("#earlyAccessStatus");
const earlyAccessList = document.querySelector("#earlyAccessList");
const serviceRequestName = document.querySelector("#serviceRequestName");
const serviceRequestEmail = document.querySelector("#serviceRequestEmail");
const serviceRequestType = document.querySelector("#serviceRequestType");
const serviceRequestNeed = document.querySelector("#serviceRequestNeed");
const submitServiceRequestButton = document.querySelector("#submitServiceRequestButton");
const serviceRequestStatus = document.querySelector("#serviceRequestStatus");
const serviceRequestList = document.querySelector("#serviceRequestList");
const cloudReadinessGrid = document.querySelector("#cloudReadinessGrid");
const cloudReadinessStatus = document.querySelector("#cloudReadinessStatus");
const moneyMap = document.querySelector("#moneyMap");
const lifeScenarioGrid = document.querySelector("#lifeScenarioGrid");
const globalPulseGrid = document.querySelector("#globalPulseGrid");
const smartExplainerGrid = document.querySelector("#smartExplainerGrid");
const moneyPersonaBadge = document.querySelector("#moneyPersonaBadge");
const moneyPersonaTitle = document.querySelector("#moneyPersonaTitle");
const moneyPersonaDetail = document.querySelector("#moneyPersonaDetail");
const personaBars = document.querySelector("#personaBars");
const financialWeather = document.querySelector("#financialWeather");
const financialWeatherDetail = document.querySelector("#financialWeatherDetail");
const missionQueueGrid = document.querySelector("#missionQueueGrid");
const freshnessGrid = document.querySelector("#freshnessGrid");
const updateCenterSummary = document.querySelector("#updateCenterSummary");
const updateChecklist = document.querySelector("#updateChecklist");
const refreshAllDataButton = document.querySelector("#refreshAllDataButton");
const marketRefreshInterval = document.querySelector("#marketRefreshInterval");
const newsRefreshInterval = document.querySelector("#newsRefreshInterval");
const portfolioStaleAfter = document.querySelector("#portfolioStaleAfter");
const planFocus = document.querySelector("#planFocus");
const planFocusDetail = document.querySelector("#planFocusDetail");
const logTopActionButton = document.querySelector("#logTopActionButton");
const planActionCount = document.querySelector("#planActionCount");
const planActionNote = document.querySelector("#planActionNote");
const planWeather = document.querySelector("#planWeather");
const planWeatherNote = document.querySelector("#planWeatherNote");
const journalCount = document.querySelector("#journalCount");
const journalCountNote = document.querySelector("#journalCountNote");
const planCompletionScore = document.querySelector("#planCompletionScore");
const planCompletionNote = document.querySelector("#planCompletionNote");
const planSprintGrid = document.querySelector("#planSprintGrid");
const weeklyPlanList = document.querySelector("#weeklyPlanList");
const journalType = document.querySelector("#journalType");
const journalTitle = document.querySelector("#journalTitle");
const journalReason = document.querySelector("#journalReason");
const journalExpected = document.querySelector("#journalExpected");
const addJournalEntryButton = document.querySelector("#addJournalEntryButton");
const journalList = document.querySelector("#journalList");
const conflictGrid = document.querySelector("#conflictGrid");
const scenarioCompareGrid = document.querySelector("#scenarioCompareGrid");
const subscriptionCalendar = document.querySelector("#subscriptionCalendar");
const financeTimeline = document.querySelector("#financeTimeline");
const goalFocusTitle = document.querySelector("#goalFocusTitle");
const goalFocusDetail = document.querySelector("#goalFocusDetail");
const goalCount = document.querySelector("#goalCount");
const goalCountNote = document.querySelector("#goalCountNote");
const goalRemainingTotal = document.querySelector("#goalRemainingTotal");
const goalRemainingNote = document.querySelector("#goalRemainingNote");
const goalMonthlyNeeded = document.querySelector("#goalMonthlyNeeded");
const goalMonthlyNote = document.querySelector("#goalMonthlyNote");
const goalBudgetFit = document.querySelector("#goalBudgetFit");
const goalBudgetFitNote = document.querySelector("#goalBudgetFitNote");
const goalHubName = document.querySelector("#goalHubName");
const goalHubCategory = document.querySelector("#goalHubCategory");
const goalHubTarget = document.querySelector("#goalHubTarget");
const goalHubSaved = document.querySelector("#goalHubSaved");
const goalHubMonthly = document.querySelector("#goalHubMonthly");
const goalHubDeadline = document.querySelector("#goalHubDeadline");
const addGoalButton = document.querySelector("#addGoalButton");
const goalCardGrid = document.querySelector("#goalCardGrid");
const spendingRows = document.querySelector("#spendingRows");
const addSpendingRowButton = document.querySelector("#addSpendingRowButton");
const spendingTotalPlanned = document.querySelector("#spendingTotalPlanned");
const spendingTotalActual = document.querySelector("#spendingTotalActual");
const spendingVariance = document.querySelector("#spendingVariance");
const spendingVarianceNote = document.querySelector("#spendingVarianceNote");
const spendingPersonality = document.querySelector("#spendingPersonality");
const spendingPersonalityNote = document.querySelector("#spendingPersonalityNote");
const spendingInsightGrid = document.querySelector("#spendingInsightGrid");
const saveStatus = document.querySelector("#saveStatus");
const onboardingOverlay = document.querySelector("#onboardingOverlay");
const startOnboardingButton = document.querySelector("#startOnboardingButton");
const skipOnboardingButton = document.querySelector("#skipOnboardingButton");
const reopenOnboardingButton = document.querySelector("#reopenOnboardingButton");
const savingsInputs = document.querySelectorAll(
  "#monthlyIncome, #fixedBills, #flexSpending, #monthlySavings, #debtPayments, #emergencyFund, #goalName, #goalTarget, #goalSaved, #goalMonthly, #debtBalance, #debtApr, #debtMinimum, #debtExtra"
  + ", #stressIncomeDrop, #stressExtraCost, #stressOneTime, #stressMonths, #subscriptionList, #tradeoffCash, #tradeoffEmergency, #tradeoffDebt, #tradeoffInvest, #tradeoffFun, #paycheckAmount, #paycheckCount, #paycheckBills, #paycheckSavings, #paycheckDebt, #paycheckFun"
);
const budgetHealthScore = document.querySelector("#budgetHealthScore");
const budgetHealthLabel = document.querySelector("#budgetHealthLabel");
const monthlyLeftover = document.querySelector("#monthlyLeftover");
const leftoverNote = document.querySelector("#leftoverNote");
const savingsRate = document.querySelector("#savingsRate");
const savingsRateNote = document.querySelector("#savingsRateNote");
const emergencyRunway = document.querySelector("#emergencyRunway");
const runwayNote = document.querySelector("#runwayNote");
const debtPressure = document.querySelector("#debtPressure");
const debtPressureNote = document.querySelector("#debtPressureNote");
const goalTimelineLabel = document.querySelector("#goalTimelineLabel");
const goalTimeline = document.querySelector("#goalTimeline");
const goalTimelineDetail = document.querySelector("#goalTimelineDetail");
const debtPayoffTime = document.querySelector("#debtPayoffTime");
const debtPayoffDetail = document.querySelector("#debtPayoffDetail");
const budgetCoachGrid = document.querySelector("#budgetCoachGrid");
const stressResult = document.querySelector("#stressResult");
const stressDetail = document.querySelector("#stressDetail");
const stressCoachGrid = document.querySelector("#stressCoachGrid");
const subscriptionTotal = document.querySelector("#subscriptionTotal");
const subscriptionDetail = document.querySelector("#subscriptionDetail");
const subscriptionGrid = document.querySelector("#subscriptionGrid");
const subscriptionRows = document.querySelector("#subscriptionRows");
const addSubscriptionRowButton = document.querySelector("#addSubscriptionRowButton");
const nextSubscriptionName = document.querySelector("#nextSubscriptionName");
const nextSubscriptionDetail = document.querySelector("#nextSubscriptionDetail");
const subscriptionReminder = document.querySelector("#subscriptionReminder");
const insuranceRows = document.querySelector("#insuranceRows");
const addInsuranceRowButton = document.querySelector("#addInsuranceRowButton");
const insuranceScore = document.querySelector("#insuranceScore");
const insuranceScoreDetail = document.querySelector("#insuranceScoreDetail");
const insuranceGrid = document.querySelector("#insuranceGrid");
const tradeoffGrid = document.querySelector("#tradeoffGrid");
const budgetPlanResult = document.querySelector("#budgetPlanResult");
const budgetPlanResultDetail = document.querySelector("#budgetPlanResultDetail");
const tradeoffResult = document.querySelector("#tradeoffResult");
const tradeoffResultDetail = document.querySelector("#tradeoffResultDetail");
const paycheckResult = document.querySelector("#paycheckResult");
const paycheckResultDetail = document.querySelector("#paycheckResultDetail");
const paycheckGrid = document.querySelector("#paycheckGrid");
const budgetActionChecklist = document.querySelector("#budgetActionChecklist");
const resetBudgetActionsButton = document.querySelector("#resetBudgetActionsButton");
const lifeEventTitle = document.querySelector("#lifeEventTitle");
const lifeEventDetail = document.querySelector("#lifeEventDetail");
const lifeEventSteps = document.querySelector("#lifeEventSteps");

const VIRTUAL_MARKET_KEY = "portfolioAnalyzer.virtualMarket";
const VIRTUAL_MARKET_STARTING_CASH = 100000;

let activeStrategy = "balanced";
let holdings = [];
let activeScenario = "qualityCompounder";
let chartResizeTimer;
let marketPollingTimer;
let saveStateTimer;
let restoredMode = "command";
let restoredSavingsPanel = "plan";
let restoredLearningPanel = "tips";
let restoredSpendingRows = null;
let restoredInsuranceRows = null;
let completedLessons = [];
let learningQuizResults = {};
let completedLearningMissions = [];
let activeAccount = null;
let decisionJournal = [];
let earlyAccessLeads = [];
let serviceRequests = [];
let portfolioTheses = {};
let completedBudgetActions = [];
let lastPilotPlanAction = null;
let lastPilotTool = null;
let moneyGoals = [
  {
    id: "demo-emergency",
    name: "Emergency fund",
    category: "Emergency",
    target: 12000,
    saved: 3000,
    monthly: 400,
    deadline: ""
  },
  {
    id: "demo-investing",
    name: "Invest monthly",
    category: "Investing",
    target: 6000,
    saved: 800,
    monthly: 250,
    deadline: ""
  }
];
let dataFreshness = {
  portfolio: null,
  watchlist: null,
  macro: null,
  news: null,
  market: null,
  savings: null,
  learning: null,
  calculators: null,
  charts: null
};
let refreshSettings = {
  marketMinutes: 15,
  newsMinutes: 60,
  portfolioStaleMinutes: 1440
};
let macroData = null;
let virtualMarket = {
  cash: VIRTUAL_MARKET_STARTING_CASH,
  watchlist: ["AAPL", "MSFT", "NVDA", "BND", "VNQ", "GLD", "BTC-USD"],
  prices: {},
  positions: {},
  trades: [],
  lastEquity: VIRTUAL_MARKET_STARTING_CASH,
  peakEquity: VIRTUAL_MARKET_STARTING_CASH,
  performanceHistory: [],
  lastAlertKey: "",
  autoRefresh: false
};

const YAHOO_CHART_BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const CORS_PROXY_URL = "https://api.allorigins.win/raw?url=";
let stockPilotApiBaseUrl =
  typeof window !== "undefined" && /^https?:$/i.test(window.location.protocol)
    ? window.location.origin
    : "https://mystockspilot.com";
const currentLocalOrigin =
  typeof window !== "undefined" && /^https?:$/i.test(window.location.protocol)
    ? window.location.origin
    : "";
const STOCKPILOT_API_CANDIDATES = ["https://mystockspilot.com"];
const STOCKPILOT_SAME_ORIGIN = Boolean(
  typeof window !== "undefined" && (/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(window.location.origin) || window.location.hostname === "mystockspilot.com")
);
let stockPilotApiOnline = false;
let stockPilotProviderStatus = null;
let stockPilotApiError = "";
const NEWS_SOURCES = [
  { name: "Yahoo Finance", url: "https://finance.yahoo.com/news/rssindex" },
  { name: "CNBC Business", url: "https://www.cnbc.com/id/10001147/device/rss/rss.html" },
  { name: "CNBC Markets", url: "https://www.cnbc.com/id/15839135/device/rss/rss.html" },
  { name: "BBC Business", url: "https://feeds.bbci.co.uk/news/business/rss.xml" },
  { name: "MarketWatch Top Stories", url: "https://feeds.content.dowjones.io/public/rss/mw_topstories" },
  { name: "MarketWatch MarketPulse", url: "https://feeds.content.dowjones.io/public/rss/mw_marketpulse" },
  { name: "Nasdaq Markets", url: "https://www.nasdaq.com/feed/rssoutbound?category=Markets" },
  { name: "Nasdaq Stocks", url: "https://www.nasdaq.com/feed/rssoutbound?category=Stocks" },
  { name: "Nasdaq Earnings", url: "https://www.nasdaq.com/feed/rssoutbound?category=Earnings" },
  { name: "Nasdaq Investing", url: "https://www.nasdaq.com/feed/rssoutbound?category=Investing" }
];
const SAMPLE_BULK_PORTFOLIO = `AAPL 18
MSFT 17
NVDA 15
BND 15
VNQ 12
GLD 8
BTC-USD 15`;
const SAVED_PORTFOLIOS_KEY = "portfolioAnalyzer.savedPortfolios";
const WATCHLIST_KEY = "portfolioAnalyzer.watchlist";
const APP_STATE_KEY = "stockPilot.appState";
const SESSION_ID_KEY = "stockPilot.sessionId";
const newSessionId = Math.random().toString(36).slice(2);
if (!localStorage.getItem(SESSION_ID_KEY)) {
  localStorage.removeItem(APP_STATE_KEY);
  localStorage.setItem(SESSION_ID_KEY, newSessionId);
}
const SESSION_ID_KEY = "stockPilot.sessionId";
const newSessionId = Math.random().toString(36).slice(2);
if (!localStorage.getItem(SESSION_ID_KEY)) {
  localStorage.removeItem(APP_STATE_KEY);
  localStorage.setItem(SESSION_ID_KEY, newSessionId);
}
const APP_DATA_VERSION = "2026-05-10";
const savedVersion = localStorage.getItem("stockPilot.dataVersion");
if (savedVersion !== APP_DATA_VERSION) {
  localStorage.removeItem(APP_STATE_KEY);
  localStorage.setItem("stockPilot.dataVersion", APP_DATA_VERSION);
}
const ONBOARDING_KEY = "stockPilot.onboardingComplete";
const ACCOUNT_KEY = "stockPilot.localAccounts";
const ACCOUNT_SESSION_KEY = "stockPilot.activeAccount";
const EDUCATIONAL_NOTICE_SESSION_KEY = "stockPilot.educationalNoticeSeen";
const BOND_TICKERS = new Set(["AGG", "BND", "BNDX", "BSV", "IEF", "IEI", "IGSB", "LQD", "MBB", "MUB", "SHY", "TIP", "TLT", "VCIT", "VCSH"]);
const CRYPTO_TICKERS = new Set(["BTC-USD", "ETH-USD", "SOL-USD", "XRP-USD", "ADA-USD", "DOGE-USD", "AVAX-USD", "LINK-USD"]);
const COMMODITY_TICKERS = new Set(["DBC", "GLD", "IAU", "SLV", "USO", "UNG", "PDBC", "GSG", "CORN", "WEAT", "DBA", "CPER"]);
const REAL_ESTATE_TICKERS = new Set(["VNQ", "IYR", "SCHH", "XLRE", "O", "PLD", "AMT", "EQIX", "SPG", "PSA", "WELL", "AVB", "EQR"]);
const LEARNING_PATH_UNITS = [
  {
    title: "Money Basics",
    theme: "Foundation",
    lessons: [
      {
        id: "income-expense",
        title: "Income vs Expense",
        panel: "terms",
        skill: "Know what comes in and goes out.",
        simple: "Income is money entering your life. Expenses are money leaving it.",
        why: "Most money problems start when spending decisions are made without knowing the real monthly inflow and outflow.",
        example: "If take-home pay is $3,200 and expenses are $2,950, the month has $250 of breathing room before extra goals.",
        practice: "Write your last income deposit and your three biggest expenses. Do they happen before or after payday?"
      },
      {
        id: "cash-flow",
        title: "Cash Flow",
        panel: "concepts",
        skill: "Spot if the month is breathing or breaking.",
        simple: "Cash flow is the difference between money in and money out.",
        why: "Positive cash flow creates choices. Negative cash flow forces borrowing, selling, or cutting something later.",
        example: "A person can look wealthy but still have bad cash flow if their fixed bills eat most of each paycheck.",
        practice: "Subtract bills, flexible spending, savings, and debt payments from take-home pay. Is the result positive?"
      },
      {
        id: "budget-job",
        title: "Give Dollars Jobs",
        panel: "tips",
        skill: "Turn money into a plan before spending starts.",
        simple: "A budget is not punishment. It is a list of jobs for your money.",
        why: "Money without a job gets pulled toward whatever is loudest: ads, stress, convenience, or impulse.",
        example: "$100 can become $40 groceries, $25 debt, $25 savings, and $10 misc instead of disappearing into random purchases.",
        practice: "Pick one paycheck and assign it across needs, debt, savings, and wants before spending any of it."
      },
      {
        id: "fixed-flexible",
        title: "Fixed vs Flexible Costs",
        panel: "terms",
        skill: "Separate bills you must pay from spending you can adjust.",
        simple: "Fixed costs repeat. Flexible costs can move up or down.",
        why: "When fixed costs are too high, even good habits can feel impossible because most money is already spoken for.",
        example: "Rent and insurance are fixed. Food delivery and shopping are flexible.",
        practice: "Mark each monthly expense as fixed or flexible. Which flexible category is easiest to reduce by 10%?"
      },
      {
        id: "needs-wants-goals",
        title: "Needs, Wants, Goals",
        panel: "tips",
        skill: "Classify spending without shame.",
        simple: "Needs protect stability, wants improve lifestyle, and goals build future options.",
        why: "A balanced budget usually needs all three. The problem is when wants secretly crowd out needs or goals.",
        example: "Rent is a need, concerts are wants, and emergency savings is a goal.",
        practice: "Choose five recent purchases and label each one need, want, or goal."
      },
      {
        id: "weekly-review",
        title: "Weekly Money Review",
        panel: "tips",
        skill: "Catch small issues before they become monthly chaos.",
        simple: "A short weekly check is easier than a painful monthly cleanup.",
        why: "Budgets fail when people only look after the damage is done.",
        example: "A Sunday review might reveal that dining out is already at 80% of the monthly plan.",
        practice: "Set a 10-minute weekly check: balance, upcoming bills, unusual spending, and next action."
      }
    ]
  },
  {
    title: "Protection",
    theme: "Safety",
    lessons: [
      {
        id: "emergency-runway",
        title: "Emergency Runway",
        panel: "terms",
        skill: "Understand how long cash can protect you.",
        simple: "Runway is how many months your savings could cover essential spending.",
        why: "Runway buys time when income drops, bills surprise you, or markets are down at the wrong moment.",
        example: "$6,000 saved and $2,000 essential monthly spending equals about 3 months of runway.",
        practice: "Divide emergency savings by essential monthly expenses. Write the number of months."
      },
      {
        id: "debt-apr",
        title: "APR Danger",
        panel: "concepts",
        skill: "See why high-rate debt gets expensive fast.",
        simple: "APR is the yearly cost of borrowing money.",
        why: "High APR debt can grow faster than savings or investments, so ignoring it can quietly erase progress.",
        example: "A 25% APR card balance is much more urgent than a 5% student loan, even if the balance is smaller.",
        practice: "List debts by APR, not just balance. Which one is the most expensive?"
      },
      {
        id: "minimum-payment",
        title: "Minimum Payments",
        panel: "terms",
        skill: "Understand why minimums can trap progress.",
        simple: "Minimum payments keep accounts current but may pay debt slowly.",
        why: "A payment can feel responsible while mostly covering interest instead of reducing principal.",
        example: "Paying $35 on a high-rate card may barely move the actual balance.",
        practice: "Check one debt statement and find how much goes to interest versus principal."
      },
      {
        id: "credit-utilization",
        title: "Credit Utilization",
        panel: "concepts",
        skill: "See why using too much credit limit can hurt flexibility.",
        simple: "Utilization is how much of your credit limit you are using.",
        why: "High utilization can signal pressure and may affect credit score calculations.",
        example: "Using $900 of a $1,000 limit is 90% utilization. Using $200 is 20%.",
        practice: "Divide your current credit balance by total credit limit. What percentage is it?"
      },
      {
        id: "insurance-shocks",
        title: "Big Shocks",
        panel: "tips",
        skill: "Plan for problems too large for a normal month.",
        simple: "Some risks are too big for a budget alone.",
        why: "Insurance, emergency savings, and low fixed costs work together when life gets messy.",
        example: "A car accident, medical bill, or job loss can create costs far beyond normal monthly spending.",
        practice: "Name the three biggest financial shocks that could affect you this year."
      },
      {
        id: "fraud-safety",
        title: "Fraud and Account Safety",
        panel: "tips",
        skill: "Protect accounts from preventable damage.",
        simple: "Security is part of personal finance.",
        why: "A strong budget still breaks if fraud, scams, or account access problems drain money unexpectedly.",
        example: "Two-factor authentication and alerts can catch suspicious card activity early.",
        practice: "Turn on alerts for bank withdrawals, card charges, and password changes."
      }
    ]
  },
  {
    title: "Saving Systems",
    theme: "Goals",
    lessons: [
      {
        id: "pay-yourself-first",
        title: "Pay Yourself First",
        panel: "tips",
        skill: "Make saving happen before spending expands.",
        simple: "Move savings when money arrives, not after everything else.",
        why: "Waiting until the end of the month often means there is nothing left to save.",
        example: "A $100 automatic transfer on payday can work better than hoping to save $100 later.",
        practice: "Pick one savings amount small enough that you can repeat it every payday."
      },
      {
        id: "sinking-funds",
        title: "Sinking Funds",
        panel: "concepts",
        skill: "Prepare for irregular but predictable costs.",
        simple: "A sinking fund is savings for a known future expense.",
        why: "Annual fees, holidays, repairs, and school costs feel like surprises only when you do not prepare for them.",
        example: "Saving $50 per month creates $600 for holiday travel or gifts by year-end.",
        practice: "Name one non-monthly expense and divide it by the number of months until it arrives."
      },
      {
        id: "goal-timeline",
        title: "Goal Timeline",
        panel: "concepts",
        skill: "Turn a goal into a monthly target.",
        simple: "A goal needs an amount, current savings, monthly contribution, and deadline.",
        why: "A vague goal is motivation. A measured goal is a plan.",
        example: "$2,400 needed in 12 months means $200 per month if nothing is saved yet.",
        practice: "Choose one goal and calculate the monthly contribution needed."
      },
      {
        id: "lifestyle-creep",
        title: "Lifestyle Creep",
        panel: "tips",
        skill: "Keep raises from disappearing.",
        simple: "Lifestyle creep happens when income rises and spending quietly rises with it.",
        why: "Higher income does not automatically create wealth if every raise becomes a new bill.",
        example: "A raise can be split: some lifestyle, some debt, some savings, some investing.",
        practice: "If income rose by $300 per month, decide the split before it arrives."
      },
      {
        id: "tradeoff-thinking",
        title: "Tradeoff Thinking",
        panel: "concepts",
        skill: "Compare choices instead of chasing every goal at once.",
        simple: "Every dollar can only do one job at a time.",
        why: "Trying to overfund every goal creates stress and usually breaks consistency.",
        example: "Extra cash could speed debt payoff, grow emergency savings, or start investing. The best choice depends on urgency.",
        practice: "Pick one extra $100 and choose the job with the highest impact this month."
      },
      {
        id: "subscription-leaks",
        title: "Subscription Leaks",
        panel: "tips",
        skill: "Find small recurring charges that quietly steal flexibility.",
        simple: "Tiny monthly charges become big annual costs.",
        why: "Recurring spending is easy to ignore because each charge feels small alone.",
        example: "Five $12 subscriptions cost $60 per month or $720 per year.",
        practice: "List subscriptions and cancel, pause, or downgrade one that no longer earns its place."
      }
    ]
  },
  {
    title: "Investing Foundations",
    theme: "Markets",
    lessons: [
      {
        id: "stock-bond-etf",
        title: "Stocks, Bonds, ETFs",
        panel: "terms",
        skill: "Tell the main asset types apart.",
        simple: "Stocks are ownership, bonds are loans, and ETFs are baskets.",
        why: "Knowing the asset type helps explain what risk you are actually taking.",
        example: "AAPL is a stock, BND is a bond ETF, and VOO is a stock ETF.",
        practice: "Pick three tickers and classify each as stock, bond ETF, commodity, real estate, crypto, or mixed ETF."
      },
      {
        id: "diversification",
        title: "Diversification",
        panel: "concepts",
        skill: "Avoid depending on one story.",
        simple: "Diversification means not letting one asset, sector, or theme decide everything.",
        why: "A portfolio can look diversified by ticker count but still depend on the same risk driver.",
        example: "Five tech stocks may still behave like one big tech bet.",
        practice: "Look at your largest three holdings. Are they exposed to the same trend?"
      },
      {
        id: "risk-return",
        title: "Risk and Return",
        panel: "concepts",
        skill: "Understand why higher return usually brings uncertainty.",
        simple: "More potential reward usually comes with more ways to be wrong.",
        why: "Investors who chase return without respecting risk often panic when normal volatility appears.",
        example: "Crypto can move more in a week than a bond ETF might move in months.",
        practice: "Choose an investment and write one reason it could rise and one reason it could fall."
      },
      {
        id: "correlation",
        title: "Correlation",
        panel: "concepts",
        skill: "Check whether holdings move together.",
        simple: "Correlation measures how similarly assets move.",
        why: "Low or mixed correlation can make a portfolio smoother, though it never removes risk.",
        example: "Stocks and bonds sometimes move differently, but during stress they can also fall together.",
        practice: "Use the app correlation table and find the pair that moves most alike."
      },
      {
        id: "rebalancing",
        title: "Rebalancing",
        panel: "tips",
        skill: "Keep winners from accidentally taking over.",
        simple: "Rebalancing brings the portfolio back toward its target mix.",
        why: "Without rebalancing, a hot asset can become a bigger risk than you intended.",
        example: "If crypto grows from 5% to 18% of a portfolio, the risk profile changed.",
        practice: "Set a rule: review allocation quarterly or when a holding drifts more than 5% from target."
      },
      {
        id: "time-horizon",
        title: "Time Horizon",
        panel: "concepts",
        skill: "Match risk to when money is needed.",
        simple: "Money needed soon usually needs more stability.",
        why: "A good long-term investment can still be bad for money needed next month.",
        example: "A house down payment due in 6 months should not take the same risk as retirement money decades away.",
        practice: "Label each money goal short-term, medium-term, or long-term."
      }
    ]
  },
  {
    title: "Valuation and Analysis",
    theme: "Research",
    lessons: [
      {
        id: "pe-ratio",
        title: "P/E Ratio",
        panel: "terms",
        skill: "Understand price compared with earnings.",
        simple: "P/E compares a company's price to its profit per share.",
        why: "It helps ask whether the market price is cheap, fair, or expensive relative to current earnings.",
        example: "A P/E of 30 means investors pay about $30 for each $1 of annual earnings.",
        practice: "Compare P/E between two companies in the same industry, not random unrelated businesses."
      },
      {
        id: "roe-quality",
        title: "ROE and Quality",
        panel: "terms",
        skill: "See how efficiently a company uses shareholder money.",
        simple: "ROE shows profit compared with shareholder equity.",
        why: "High ROE can signal quality, but it can also be boosted by debt, so context matters.",
        example: "A company with high ROE and low debt may be stronger than one with high ROE and heavy leverage.",
        practice: "Look at ROE next to debt-to-equity before calling a business high quality."
      },
      {
        id: "free-cash-flow",
        title: "Free Cash Flow",
        panel: "concepts",
        skill: "Look for cash a business can actually use.",
        simple: "Free cash flow is cash left after running and maintaining the business.",
        why: "Accounting profit can look good while cash generation is weak.",
        example: "A company may report earnings but still spend heavily on equipment, leaving less free cash.",
        practice: "When researching a company, compare earnings growth with free cash flow growth."
      },
      {
        id: "intrinsic-value",
        title: "Intrinsic Value",
        panel: "concepts",
        skill: "Estimate value without pretending the estimate is perfect.",
        simple: "Intrinsic value is what you think an asset is worth based on future cash flows or fundamentals.",
        why: "It gives structure, but every assumption can be wrong, so margin of safety matters.",
        example: "Changing a discount rate or growth assumption can move estimated value a lot.",
        practice: "Run the intrinsic value calculator twice: optimistic case and cautious case."
      },
      {
        id: "margin-safety",
        title: "Margin of Safety",
        panel: "concepts",
        skill: "Leave room for being wrong.",
        simple: "A margin of safety is a cushion between estimated value and purchase price.",
        why: "Because analysis is imperfect, the cushion reduces damage if assumptions are too optimistic.",
        example: "If estimated value is $100, buying at $70 leaves more room for error than buying at $98.",
        practice: "Pick a stock and decide what discount would make you more comfortable."
      },
      {
        id: "news-vs-thesis",
        title: "News vs Thesis",
        panel: "tips",
        skill: "Separate headlines from actual investment changes.",
        simple: "News is information. A thesis is why you own something.",
        why: "Not every headline changes the reason for holding an asset.",
        example: "A one-day price drop may not matter if long-term revenue, margins, and balance sheet are unchanged.",
        practice: "For one headline, write whether it changes revenue, costs, debt, competition, regulation, or sentiment."
      }
    ]
  },
  {
    title: "Behavioral Finance",
    theme: "Psychology",
    lessons: [
      {
        id: "ability-willingness-risk",
        title: "Ability vs Willingness",
        panel: "behavior",
        skill: "Separate financial capacity from emotional comfort.",
        simple: "Ability is whether your money can handle risk. Willingness is whether your mind can handle it.",
        why: "A portfolio only works if it fits both the math and the person using it.",
        example: "A young investor with stable income may have high ability, but low willingness if a 10% drop causes panic.",
        practice: "Write one risk you can afford financially and one risk that would make you act emotionally."
      },
      {
        id: "anchoring-bias",
        title: "Anchoring Bias",
        panel: "behavior",
        skill: "Avoid letting one old price control today's decision.",
        simple: "Anchoring is getting stuck on a number like your buy price or the 52-week high.",
        why: "The market does not care what price you remember. The better question is what the asset is worth now.",
        example: "Holding a stock only because it is below its old high can ignore a changed business reality.",
        practice: "For one holding, write the current reason to own it without mentioning your purchase price."
      },
      {
        id: "confirmation-bias",
        title: "Confirmation Bias",
        panel: "behavior",
        skill: "Look for information that could prove you wrong.",
        simple: "Confirmation bias means only collecting evidence that agrees with you.",
        why: "A strong investment thesis should survive opposing evidence, not avoid it.",
        example: "After buying a tech stock, reading only bullish posts can hide margin, valuation, or competition risks.",
        practice: "Find one serious bearish argument for a stock you like and decide whether it changes the thesis."
      },
      {
        id: "loss-aversion-disposition",
        title: "Loss Aversion and Disposition Effect",
        panel: "behavior",
        skill: "Notice when regret is controlling buy and sell decisions.",
        simple: "Losses hurt, so people often sell winners too soon and hold losers too long.",
        why: "Avoiding emotional pain can quietly reduce returns and increase portfolio risk.",
        example: "Selling a winner just to feel proud, while keeping a broken loser to avoid regret, is the disposition effect.",
        practice: "Review one winner and one loser. Would you make the same decision if you did not already own them?"
      },
      {
        id: "overconfidence-trading",
        title: "Overconfidence",
        panel: "behavior",
        skill: "Respect randomness before increasing risk.",
        simple: "Overconfidence is thinking you know more or control more than you really do.",
        why: "It can lead to too much trading, too few holdings, and riskier bets than the plan allows.",
        example: "A few lucky wins can make someone believe every future trade is skill.",
        practice: "Before a trade, write what would prove the idea wrong and what maximum loss is acceptable."
      },
      {
        id: "market-anomalies",
        title: "Market Anomalies",
        panel: "behavior",
        skill: "Treat patterns as research prompts, not guaranteed trades.",
        simple: "An anomaly is a market pattern that seems unusual or hard to explain.",
        why: "Some anomalies fade, some are hidden risk, and some disappear after costs and taxes.",
        example: "January effect, earnings drift, size effect, and value effect are patterns investors study, not free money buttons.",
        practice: "For any trading pattern, ask if it worked across time, markets, costs, taxes, and real-world liquidity."
      }
    ]
  },
  {
    title: "Market History",
    theme: "Context",
    lessons: [
      {
        id: "inflation-history",
        title: "Inflation Lessons",
        panel: "history",
        skill: "Learn why prices and rates matter.",
        simple: "Inflation means money buys less over time.",
        why: "Inflation affects budgets, interest rates, bond prices, wages, and company profits.",
        example: "The 1970s showed how high inflation can pressure households and change market leadership.",
        practice: "Ask: which parts of your budget would hurt most if prices rose 10%?"
      },
      {
        id: "crash-lessons",
        title: "Crash Lessons",
        panel: "history",
        skill: "See how panic, leverage, and liquidity interact.",
        simple: "Crashes often get worse when people are forced to sell quickly.",
        why: "Leverage, fear, and crowded trades can turn normal losses into system-wide stress.",
        example: "In 2008, debt and complex credit risk spread problems far beyond one market.",
        practice: "Check whether your plan would force selling after a large drop."
      },
      {
        id: "bubble-patterns",
        title: "Bubble Patterns",
        panel: "history",
        skill: "Recognize when stories outrun fundamentals.",
        simple: "A bubble forms when price excitement grows faster than realistic value.",
        why: "Bubbles are seductive because early gains make the story feel true.",
        example: "Dot-com stocks in 2000 showed that real technology can still produce unrealistic prices.",
        practice: "For a popular asset, ask what profit or cash flow must happen to justify the price."
      },
      {
        id: "rate-cycles",
        title: "Rate Cycles",
        panel: "history",
        skill: "Understand why interest rates change asset behavior.",
        simple: "Rates influence borrowing, saving, valuations, and bond prices.",
        why: "When rates rise, debt gets more expensive and future profits may be valued less highly.",
        example: "2022 reminded investors that high-growth assets can struggle when rates rise quickly.",
        practice: "Write how higher rates affect your debt, savings, stocks, bonds, and housing costs."
      },
      {
        id: "modern-access",
        title: "Modern Market Access",
        panel: "history",
        skill: "Use easy access without becoming impulsive.",
        simple: "Apps made investing easier, but easy access can make overtrading easier too.",
        why: "Lower friction is powerful for long-term saving, but dangerous for emotional trading.",
        example: "Commission-free trading removed one barrier but did not remove risk.",
        practice: "Create a rule for when you are allowed to make a trade and when you must wait."
      },
      {
        id: "quick-check",
        title: "Quick Check",
        panel: "quiz",
        skill: "Review the core ideas and make them stick.",
        simple: "Learning works better when you retrieve ideas, not just reread them.",
        why: "Quick review catches weak spots before real money decisions test them.",
        example: "If you can explain diversification to a beginner, you probably understand it better.",
        practice: "Answer the Quick Check cards without looking, then review what felt fuzzy."
      }
    ]
  }
];
const LEARNING_SCENARIOS = [
  {
    id: "portfolio-drop",
    title: "Your portfolio drops 12%",
    setup: "Your largest positions are down after a bad market week. You feel pressure to sell everything.",
    options: [
      { label: "Sell everything immediately", correct: false, feedback: "That may lock in losses without checking whether your plan or facts changed." },
      { label: "Review allocation, time horizon, cash needs, and original thesis", correct: true, feedback: "Correct. A drop is a signal to review risk, not automatically a command to panic." },
      { label: "Buy more without checking anything", correct: false, feedback: "Buying blindly can be just as emotional as selling blindly." }
    ],
    lesson: "The professional move is to separate price movement from plan failure."
  },
  {
    id: "rent-increase",
    title: "Rent jumps by $250",
    setup: "Your fixed costs rise and your old budget no longer leaves enough room for savings.",
    options: [
      { label: "Ignore it and hope spending works out", correct: false, feedback: "That lets fixed costs quietly pressure the rest of the month." },
      { label: "Rebuild the budget from take-home pay and reduce flexible spending first", correct: true, feedback: "Correct. Fixed-cost changes require a fresh cash-flow plan." },
      { label: "Stop all emergency savings forever", correct: false, feedback: "You may need to adjust savings, but removing protection entirely creates another risk." }
    ],
    lesson: "When fixed costs rise, the whole monthly system needs to be recalculated."
  },
  {
    id: "bonus-money",
    title: "You receive a $500 bonus",
    setup: "The money is extra. You want to enjoy some of it, but you also have debt and savings goals.",
    options: [
      { label: "Split it intentionally across misc, savings, and debt", correct: true, feedback: "Correct. A pre-decided split lets you enjoy money without losing progress." },
      { label: "Spend it all before checking goals", correct: false, feedback: "That may feel good briefly but misses a chance to strengthen the plan." },
      { label: "Invest it all even if emergency savings is empty", correct: false, feedback: "Investing can wait if short-term stability is fragile." }
    ],
    lesson: "Windfalls are easiest to use well when you decide the jobs before spending starts."
  },
  {
    id: "high-apr",
    title: "Credit card APR is 27%",
    setup: "You have a balance on a high-rate credit card and are considering investing extra cash instead.",
    options: [
      { label: "Prioritize the high-rate debt while keeping a small cash buffer", correct: true, feedback: "Correct. High APR debt can be a stronger drag than many expected investment returns." },
      { label: "Only make minimum payments because the balance is smaller", correct: false, feedback: "APR matters. A smaller high-rate debt can be more urgent than a larger low-rate debt." },
      { label: "Ignore the APR and focus only on rewards points", correct: false, feedback: "Rewards rarely compensate for expensive revolving interest." }
    ],
    lesson: "Debt cost is part of the return equation."
  },
  {
    id: "behavioral-drop",
    title: "Your favorite stock falls below your buy price",
    setup: "You still like the company, but you mainly want to wait until it gets back to your original purchase price before deciding.",
    options: [
      { label: "Wait only because the buy price feels important", correct: false, feedback: "That is anchoring. Your old buy price is not the same as today's fair value." },
      { label: "Review fundamentals, valuation, risk, and the original thesis", correct: true, feedback: "Correct. The decision should be based on today's evidence and your plan." },
      { label: "Double the position immediately to feel better", correct: false, feedback: "That can become revenge trading if the facts were not reviewed first." }
    ],
    lesson: "Anchoring makes old numbers feel meaningful even when they are not the best decision point."
  },
  {
    id: "anomaly-strategy",
    title: "You find a viral market anomaly strategy",
    setup: "A video says a calendar pattern has beaten the market before and tells viewers to trade it.",
    options: [
      { label: "Use it blindly because the chart looks convincing", correct: false, feedback: "Charts can be cherry-picked. Patterns need testing across time, markets, costs, and taxes." },
      { label: "Ask whether it survives transaction costs, taxes, and different periods", correct: true, feedback: "Correct. An anomaly is a research question, not a guarantee." },
      { label: "Put the whole portfolio into it for one month", correct: false, feedback: "That turns an uncertain pattern into concentrated risk." }
    ],
    lesson: "A market anomaly can be interesting without being reliable enough for a real portfolio."
  }
];
const LEARNING_QUIZ_QUESTIONS = [
  {
    id: "quiz-cash-flow",
    topic: "Cash Flow",
    question: "What does positive cash flow mean?",
    answers: [
      { label: "Income is higher than outflows for the period.", correct: true },
      { label: "You own stocks.", correct: false },
      { label: "You have no fixed bills.", correct: false }
    ],
    explanation: "Positive cash flow means money coming in is greater than money going out."
  },
  {
    id: "quiz-runway",
    topic: "Emergency Runway",
    question: "How do you estimate emergency runway?",
    answers: [
      { label: "Emergency savings divided by essential monthly spending.", correct: true },
      { label: "Monthly income divided by stock returns.", correct: false },
      { label: "Credit limit divided by rent.", correct: false }
    ],
    explanation: "Runway asks how many months savings can cover essential expenses."
  },
  {
    id: "quiz-apr",
    topic: "APR",
    question: "Why is high APR debt dangerous?",
    answers: [
      { label: "Interest can grow quickly and erase progress.", correct: true },
      { label: "It always improves credit score.", correct: false },
      { label: "It means the balance is automatically small.", correct: false }
    ],
    explanation: "APR is the annual borrowing cost, and high rates make balances expensive to carry."
  },
  {
    id: "quiz-diversification",
    topic: "Diversification",
    question: "What is weak diversification?",
    answers: [
      { label: "Many tickers that all depend on the same trend.", correct: true },
      { label: "Owning more than one asset class.", correct: false },
      { label: "Having an emergency fund.", correct: false }
    ],
    explanation: "Ticker count alone is not enough if every holding moves for the same reason."
  },
  {
    id: "quiz-valuation",
    topic: "Valuation",
    question: "What does valuation compare?",
    answers: [
      { label: "Price against fundamentals or estimated worth.", correct: true },
      { label: "Only the color of a chart.", correct: false },
      { label: "Only whether a company is famous.", correct: false }
    ],
    explanation: "Valuation asks whether price makes sense compared with earnings, cash flow, growth, risk, or estimated value."
  },
  {
    id: "quiz-time-horizon",
    topic: "Time Horizon",
    question: "Why does time horizon matter?",
    answers: [
      { label: "Money needed soon usually needs more stability.", correct: true },
      { label: "It guarantees profit.", correct: false },
      { label: "It removes all risk from crypto.", correct: false }
    ],
    explanation: "Short-term money has less time to recover from losses."
  },
  {
    id: "quiz-anchoring",
    topic: "Anchoring",
    question: "What is anchoring in investing?",
    answers: [
      { label: "Letting one old price control today's decision.", correct: true },
      { label: "Diversifying across asset classes.", correct: false },
      { label: "Calculating emergency runway.", correct: false }
    ],
    explanation: "Anchoring happens when a purchase price, old high, or random number becomes the main reference point."
  },
  {
    id: "quiz-anomaly",
    topic: "Market Anomalies",
    question: "What should you ask before trusting a market anomaly?",
    answers: [
      { label: "Whether it survives time, markets, costs, taxes, and risk checks.", correct: true },
      { label: "Whether it sounds exciting on social media.", correct: false },
      { label: "Whether it worked once last month.", correct: false }
    ],
    explanation: "A pattern can look real but fail after costs, data-mining, liquidity, or missing risk factors."
  }
];
const LEARNING_MISSIONS = [
  {
    id: "mission-budget-review",
    title: "Run a 10-minute budget review",
    detail: "Check income, bills, flexible spending, savings, and one next action.",
    topic: "Budgeting"
  },
  {
    id: "mission-emergency-runway",
    title: "Calculate emergency runway",
    detail: "Divide emergency savings by essential monthly spending.",
    topic: "Protection"
  },
  {
    id: "mission-subscription",
    title: "Find one recurring leak",
    detail: "Cancel, pause, downgrade, or justify one subscription.",
    topic: "Savings"
  },
  {
    id: "mission-correlation",
    title: "Check one portfolio concentration",
    detail: "Look at your largest holding or strongest correlation pair.",
    topic: "Investing"
  },
  {
    id: "mission-history",
    title: "Read one market history lesson",
    detail: "Connect one historical event to a modern money risk.",
    topic: "Learning"
  }
];
const TERM_HELP = {
  beginnerGuide: {
    title: "Term Guide",
    meaning: "This app has clickable beginner explanations for the important finance terms.",
    simple: "Press Term Guide here, or click any small i button beside a word you do not know.",
    example: "In the Holdings table, click the i beside P/E, Div Yield, Beta, Score, Risk, or Correlation."
  },
  ticker: {
    title: "Ticker",
    meaning: "A ticker is the short market symbol used to identify a stock, fund, bond ETF, commodity ETF, REIT, or crypto pair.",
    simple: "It is the market nickname for the asset.",
    example: "Apple is AAPL. A bond ETF can be BND. Gold can be GLD. Real estate can be VNQ. Bitcoin in USD is BTC-USD."
  },
  allocation: {
    title: "Allocation",
    meaning: "Allocation is the percentage of your portfolio assigned to one asset.",
    simple: "It is how much room that asset gets in your portfolio.",
    example: "If NVDA is 20%, then $20 of every $100 is placed in NVDA."
  },
  holdings: {
    title: "Holdings",
    meaning: "Holdings are the assets currently included in the portfolio analysis.",
    simple: "These are the things your portfolio owns.",
    example: "A portfolio could hold AAPL, BND, VNQ, GLD, and BTC-USD."
  },
  fitScore: {
    title: "Fit Score",
    meaning: "Fit Score is the single-asset score from the manual ratio dashboard.",
    simple: "It grades the one asset currently shown in Advanced Details.",
    example: "A score of 80 means the single asset looks strong under the selected strategy inputs."
  },
  portfolioVerdict: {
    title: "Portfolio Verdict",
    meaning: "A quick educational label based on score, correlation, allocation, and risk.",
    simple: "The app's first impression of the whole portfolio.",
    example: "A high score with reasonable correlation may show Watchlist or Buy Candidate; concentrated pressure may show Risk Meter High."
  },
  portfolioScore: {
    title: "Portfolio Score",
    meaning: "A weighted 0-100 score across all holdings, adjusted by each asset's portfolio percentage.",
    simple: "A bigger position matters more than a tiny position.",
    example: "If NVDA is 30% of the portfolio, its score affects the portfolio more than a 3% position."
  },
  score: {
    title: "Score",
    meaning: "A 0-100 estimate of how attractive or stable a holding looks based on available market data.",
    simple: "Higher usually means cleaner. Lower means review it harder.",
    example: "A stock with strong price history, reasonable beta, and useful dividend data may score higher."
  },
  sector: {
    title: "Asset Class",
    meaning: "Asset class groups holdings by broad type, such as Stock, Bond, Crypto, Commodity, Real Estate, ETF, or Fund.",
    simple: "It tells you what kind of thing you own.",
    example: "AAPL is usually Stock, BND is Bond, GLD is Commodity, VNQ is Real Estate, and BTC-USD is Crypto."
  },
  pe: {
    title: "P/E Ratio",
    meaning: "Price-to-earnings compares a stock's price to the profit it earns per share.",
    simple: "It asks: how expensive is this stock compared with its profits?",
    example: "If a stock is $100 and earns $5 per share, the P/E is 20."
  },
  dividendYield: {
    title: "Dividend Yield",
    meaning: "Dividend yield estimates annual cash dividends as a percentage of the stock price.",
    simple: "It is the cash-income percent you might receive from dividends.",
    example: "A $100 stock paying $2 per year has a 2% dividend yield."
  },
  beta: {
    title: "Beta",
    meaning: "Beta estimates how much a stock tends to move compared with the overall market.",
    simple: "Higher beta usually means bumpier rides.",
    example: "Beta 1.5 means the stock has historically moved about 50% more than the market."
  },
  risk: {
    title: "Risk Meter",
    meaning: "A meter that combines score, beta, and position size to estimate how much attention a holding needs.",
    simple: "It shows risk as a level instead of one scary word.",
    example: "A concentrated high-beta holding may show High pressure, while a steadier small holding may show Low pressure."
  },
  correlation: {
    title: "Average Correlation",
    meaning: "Correlation measures how similarly your holdings have moved in the past.",
    simple: "Do your assets move together or differently?",
    example: "A correlation near 1 means two assets often move together. Near 0 means they move less alike."
  },
  correlationMatrix: {
    title: "Correlation Matrix",
    meaning: "A grid showing how each asset's historical returns compare with the others.",
    simple: "It shows which holdings are acting like twins.",
    example: "If AAPL and MSFT show 0.85, they have moved very similarly in the loaded history."
  },
  annualReturn: {
    title: "Annual Return",
    meaning: "Annual return estimates the portfolio's compounded return over one year using loaded daily return history.",
    simple: "It turns recent daily moves into a yearly-style return estimate.",
    example: "If the loaded history was strong, annual return may show a positive percentage."
  },
  annualRisk: {
    title: "Annual Risk",
    meaning: "Annual risk is an annualized volatility estimate from the loaded daily returns.",
    simple: "It estimates how bumpy the portfolio has been.",
    example: "A 20% annual risk estimate means the portfolio has had meaningful ups and downs."
  },
  asOf: {
    title: "As Of",
    meaning: "As Of shows the latest date included in the loaded public price history.",
    simple: "It tells you how fresh the price-history data is.",
    example: "If As Of is 2026-04-27, calculations use prices through that date."
  },
  mainBet: {
    title: "Main Bet",
    meaning: "The biggest theme your portfolio is leaning into, based on sector, allocation, beta, and valuation.",
    simple: "It tells you what your portfolio is really betting on.",
    example: "If most money is in NVDA, MSFT, and AAPL, the main bet may be Technology and growth exposure."
  },
  hiddenRisk: {
    title: "Hidden Risk Driver",
    meaning: "The holding most responsible for portfolio risk because of size, volatility, or both.",
    simple: "The stock that could shake the portfolio the most.",
    example: "A 35% position with beta 1.7 may drive more risk than a 5% position with beta 2.0."
  },
  researchProfile: {
    title: "Next Research Profile",
    meaning: "A type of stock the app suggests researching to balance the current portfolio profile.",
    simple: "Not a stock pick. Just the kind of thing to look for next.",
    example: "If the portfolio is tech-heavy, the app may suggest researching steadier non-tech companies."
  },
  marketDrop: {
    title: "Market Drop",
    meaning: "A scenario where the broad market falls by the percentage you enter.",
    simple: "Pretend the whole market has a bad day.",
    example: "A 10% market drop with beta adjustments estimates how your portfolio might react."
  },
  highBetaDrop: {
    title: "High Beta Drop",
    meaning: "A stress test that hits higher-volatility holdings harder than calmer holdings.",
    simple: "It tests what happens when risky names get punished.",
    example: "A 30% high-beta drop applies the full hit to high-beta stocks and a smaller hit to the rest."
  },
  largestDrop: {
    title: "Largest Holding Drop",
    meaning: "A scenario where only your biggest position falls by the percentage entered.",
    simple: "What if your biggest stock takes a hit?",
    example: "If AAPL is 30% of the portfolio and drops 40%, the portfolio impact is roughly 12% before other effects."
  },
  customShock: {
    title: "Custom Shock",
    meaning: "A simple stress test applying the same drop to every holding.",
    simple: "One slider for a rough worst-case check.",
    example: "A 15% custom shock estimates the portfolio impact if everything dropped 15%."
  },
  tvm: {
    title: "Time Value of Money",
    meaning: "TVM estimates how money grows or shrinks over time using rate, years, and payments.",
    simple: "Money today and money later are not the same thing.",
    example: "$10,000 growing at 8% for 10 years becomes more than $10,000 because of compounding."
  },
  solveFor: {
    title: "Solve For",
    meaning: "Solve For tells the calculator which missing TVM value to calculate.",
    simple: "Pick the answer you want the calculator to find.",
    example: "Choose Payment to find the yearly contribution needed to reach a future value."
  },
  presentValue: {
    title: "Present Value",
    meaning: "Present value is what future money is worth in today's dollars.",
    simple: "It brings future money back to today.",
    example: "$10,000 five years from now is worth less than $10,000 today if your required return is 8%."
  },
  futureValue: {
    title: "Future Value",
    meaning: "Future value estimates what today's money could become after growth and payments.",
    simple: "It sends today's money into the future.",
    example: "$10,000 invested for 10 years at 8% becomes about $21,589 without extra payments."
  },
  annualRate: {
    title: "Annual Rate",
    meaning: "The yearly growth rate or return assumption used by the calculator.",
    simple: "How fast the money grows each year.",
    example: "An 8% rate means the calculator assumes the money grows 8% per year."
  },
  payment: {
    title: "Annual Payment",
    meaning: "Extra money added each year in the TVM calculation.",
    simple: "Your yearly contribution.",
    example: "A $1,200 annual payment is like adding $100 per month, simplified as one yearly amount."
  },
  time: {
    title: "Time",
    meaning: "Time is the number of years money compounds or payments continue.",
    simple: "How long the money has to grow.",
    example: "If time is 10 years, the calculator compounds the money for 10 annual periods."
  },
  intrinsicValue: {
    title: "Intrinsic Value",
    meaning: "An estimate of what a share could be worth based on future cash flow assumptions.",
    simple: "Your rough guess of fair value.",
    example: "If estimated intrinsic value is $120 and price is $100, the model shows possible upside."
  },
  fcf: {
    title: "FCF / Share",
    meaning: "Free cash flow per share is cash the business generates after major expenses, divided by shares.",
    simple: "Cash profit per share, roughly.",
    example: "If a company makes $6 of FCF per share, the calculator starts with 6."
  },
  growth: {
    title: "Growth Rate",
    meaning: "The expected annual growth rate for free cash flow in the intrinsic value model.",
    simple: "How fast cash flow might grow.",
    example: "If FCF is $6 and growth is 8%, next year's estimate is $6.48."
  },
  terminalGrowth: {
    title: "Terminal Growth",
    meaning: "The slower long-term growth rate assumed after the forecast years.",
    simple: "The forever growth assumption after the main forecast.",
    example: "A mature company might use 2% to 3% terminal growth instead of a high startup-style rate."
  },
  discountRate: {
    title: "Discount Rate",
    meaning: "The return you require to justify the risk of owning the stock.",
    simple: "Your required return.",
    example: "A riskier stock may need a 12% discount rate; a steadier company may use 8% to 10%."
  },
  forecastYears: {
    title: "Forecast Years",
    meaning: "Forecast years are how many years of cash flows the intrinsic value calculator projects before the terminal value.",
    simple: "How far the calculator looks before switching to a long-term assumption.",
    example: "Five years means the model estimates five annual cash flows, then adds a terminal value."
  },
  currentPrice: {
    title: "Current Price",
    meaning: "Current price is the market price you compare against the estimated intrinsic value.",
    simple: "The price the asset trades at now, or the price you want to test.",
    example: "If intrinsic value is $120 and current price is $100, the model shows possible margin."
  },
  geometricAverage: {
    title: "Geometric Average",
    meaning: "Geometric average is the compound average return across multiple periods.",
    simple: "It shows the real average growth rate after ups and downs compound.",
    example: "A +10% year and a -10% year do not average to 0% compounded; the geometric average is slightly negative."
  },
  returnsList: {
    title: "Returns List",
    meaning: "Returns list is the set of period returns used by the geometric average calculator.",
    simple: "Type each return percentage separated by commas, spaces, or new lines.",
    example: "12, -5, 18 means three return periods: +12%, -5%, and +18%."
  },
  marketCap: {
    title: "Market Cap",
    meaning: "Market cap is the total market value of a company or asset when the data source provides it.",
    simple: "It is roughly price times total shares.",
    example: "A company with 1 billion shares at $100 has a $100 billion market cap."
  },
  recentMomentum: {
    title: "Recent Momentum",
    meaning: "Recent momentum scores loaded price history for trend, consistency, and volatility.",
    simple: "It checks whether the recent price path has looked strong or weak.",
    example: "A high momentum score means recent price history was relatively strong and steady."
  },
  bestUse: {
    title: "Best Use",
    meaning: "Best Use is a simple educational label based on the asset's score.",
    simple: "It tells you whether to treat the asset as core, watch, or review.",
    example: "A high score may show Core candidate, while a low score may show Needs review."
  },
  allocationGraph: {
    title: "Allocation Graph",
    meaning: "This chart shows which stocks take up the most space in the portfolio.",
    simple: "It shows where your money is concentrated.",
    example: "If NVDA has the longest bar at 30%, it is your biggest position."
  },
  sectorGraph: {
    title: "Asset Class Graph",
    meaning: "This chart groups holdings by broad asset class and shows how much of the portfolio each class controls.",
    simple: "It shows whether you are too heavy in one kind of investment.",
    example: "If stocks are 70% and real assets are 5%, the portfolio depends mostly on equity markets."
  },
  riskMap: {
    title: "Risk Map",
    meaning: "This graph compares each holding's beta with its score. Bigger bubbles mean bigger allocations.",
    simple: "It shows which stocks are both important and risky.",
    example: "A large bubble on the far right with a low score deserves extra review."
  },
  efficientFrontier: {
    title: "Efficient Frontier",
    meaning: "An efficient frontier estimates which portfolio mixes historically offered the highest return for each level of risk.",
    simple: "It asks: could the same stocks be mixed in a smarter way?",
    example: "If your portfolio dot sits below the frontier, another mix of the same stocks may have shown better historical return for similar risk."
  },
  portfolioValue: {
    title: "Portfolio Value",
    meaning: "Portfolio value is the current total dollar value of the portfolio before planned cash changes.",
    simple: "How much the portfolio is worth right now.",
    example: "If the account is worth $100,000 before adding cash, enter 100000."
  },
  cashFlow: {
    title: "New Cash Flow",
    meaning: "New cash flow is money added to or withdrawn from the portfolio before rebalancing.",
    simple: "Positive means adding cash. Negative means taking cash out.",
    example: "Enter 5000 for a $5,000 deposit or -2000 for a $2,000 withdrawal."
  },
  cashReserve: {
    title: "Cash Reserve",
    meaning: "Cash reserve is the percentage of the post-cash portfolio you want to leave uninvested.",
    simple: "The cash you do not want used for buys.",
    example: "A 5% reserve on $100,000 keeps about $5,000 in cash."
  },
  transactionCost: {
    title: "Flat Fee / Trade",
    meaning: "Flat fee per trade estimates fixed trading costs charged each time a buy or sell happens.",
    simple: "A simple per-order cost.",
    example: "If each trade costs $1 and there are 6 trades, flat fees add about $6."
  },
  tradeBps: {
    title: "Basis Point Cost",
    meaning: "Basis points estimate variable trading cost as a tiny percentage of each trade's dollar value.",
    simple: "It models spreads, slippage, or platform costs.",
    example: "5 bps means about 0.05%, or $5 on a $10,000 trade."
  },
  taxRate: {
    title: "Tax Rate",
    meaning: "Tax rate estimates the percentage paid on taxable gains from sell trades.",
    simple: "A rough tax drag setting, not tax advice.",
    example: "If taxable gains are $1,000 and tax rate is 15%, estimated tax is $150."
  },
  taxableGain: {
    title: "Taxable Gain on Sells",
    meaning: "Taxable gain on sells estimates what percent of each sell trade is taxable profit.",
    simple: "It guesses how much of selling is gain, not original cost.",
    example: "If you sell $10,000 and taxable gain is 25%, the model treats $2,500 as taxable gain."
  },
  totalReturn: {
    title: "Total Return",
    meaning: "Total return shows how much the paper portfolio has gained or lost versus the starting simulator cash.",
    simple: "It is the simulator's overall score since you started.",
    example: "If paper equity moves from $100,000 to $103,000, total return is +3%."
  },
  refreshMove: {
    title: "Move Since Refresh",
    meaning: "Move since refresh compares current paper equity with the equity from the previous quote pull.",
    simple: "It shows what changed since the last update.",
    example: "If equity was $100,000 before refreshing and is now $98,500, the move since refresh is -1.5%."
  },
  drawdown: {
    title: "Drawdown",
    meaning: "Drawdown measures how far the paper portfolio is below its highest simulated equity level.",
    simple: "It is the fall from the best point so far.",
    example: "If the simulator peaked at $110,000 and now shows $104,500, drawdown is -5%."
  },
  portfolioHealth: {
    title: "Portfolio Health",
    meaning: "Portfolio health combines the loaded holdings, position sizes, scores, risk, and concentration signals.",
    simple: "It is the app's quick check of whether the portfolio looks balanced or needs review.",
    example: "A portfolio with one 45% high-risk holding may show weaker health even if the rest looks fine."
  },
  budgetHealth: {
    title: "Budget Health",
    meaning: "Budget health reads monthly cash flow, savings rate, debt pressure, emergency runway, and spending behavior.",
    simple: "It checks whether your monthly money plan has breathing room.",
    example: "Positive leftover cash and several months of emergency runway usually improve the score."
  },
  learningProgress: {
    title: "Learning Progress",
    meaning: "Learning progress counts completed lessons, checks, and practice work in the education section.",
    simple: "It shows how much of the learning path you have worked through.",
    example: "Completing beginner lessons and quizzes increases the progress signal."
  },
  marketMood: {
    title: "Market Mood",
    meaning: "Market mood summarizes risk pressure from the loaded portfolio, asset classes, and macro context.",
    simple: "It is a quick label for the current risk environment in your demo.",
    example: "A crypto-heavy portfolio may show Speculative, while several high-risk holdings may show Defensive."
  },
  plannedSpending: {
    title: "Planned Spending",
    meaning: "Planned spending is what you expected to spend in each category before the month happened.",
    simple: "Your spending target.",
    example: "Planning $450 for groceries gives you a number to compare actual spending against."
  },
  actualSpending: {
    title: "Actual Spending",
    meaning: "Actual spending is what you really spent after transactions happened.",
    simple: "The real total.",
    example: "If groceries were planned at $450 but actual was $520, the category went $70 over."
  },
  spendingVariance: {
    title: "Spending Difference",
    meaning: "Spending difference compares planned spending with actual spending.",
    simple: "It shows whether you were over or under plan.",
    example: "A negative difference means actual spending was higher than planned."
  },
  spendingPersonality: {
    title: "Spending Personality",
    meaning: "Spending personality is a simple behavior label from category patterns.",
    simple: "It tells you what your spending style looks like.",
    example: "If wants repeatedly exceed plan, the app may flag convenience or impulse pressure."
  },
  monthlyLeftover: {
    title: "Monthly Leftover",
    meaning: "Monthly leftover is income minus bills, flexible spending, debt payments, and planned savings.",
    simple: "Money left after the main monthly jobs are paid.",
    example: "If income is $4,500 and planned outflows are $4,050, leftover is $450."
  },
  savingsRate: {
    title: "Savings Rate",
    meaning: "Savings rate is monthly savings divided by monthly income.",
    simple: "The percent of income you keep for future you.",
    example: "$700 saved from $4,500 income is about a 15.6% savings rate."
  },
  emergencyRunway: {
    title: "Emergency Runway",
    meaning: "Emergency runway estimates how many months your emergency fund could cover spending.",
    simple: "How long your backup cash may last.",
    example: "$6,000 saved with $2,000 monthly spending gives about 3 months of runway."
  },
  debtPressure: {
    title: "Debt Pressure",
    meaning: "Debt pressure is monthly debt payments divided by income.",
    simple: "How much of your income debt is taking.",
    example: "$300 of debt payments on $4,500 income is about 6.7% pressure."
  },
  goalTimeline: {
    title: "Goal Timeline",
    meaning: "Goal timeline estimates how long it may take to reach a savings target.",
    simple: "How many months until the goal is funded.",
    example: "$3,000 left with $300 per month takes about 10 months."
  },
  apr: {
    title: "APR",
    meaning: "APR is the yearly interest cost of debt before fees and compounding details.",
    simple: "The debt's annual price tag.",
    example: "A credit card at 18.5% APR is much more expensive than a loan at 6% APR."
  },
  debtPayoff: {
    title: "Debt Payoff",
    meaning: "Debt payoff estimates how long it may take to pay a balance using minimum and extra payments.",
    simple: "The debt countdown.",
    example: "Adding $100 extra each month can shorten the payoff timeline and reduce interest."
  },
  avalanche: {
    title: "Avalanche Method",
    meaning: "Avalanche pays extra toward the highest APR debt first.",
    simple: "Attack the most expensive debt first.",
    example: "A 24% APR card gets extra money before an 8% loan."
  },
  snowball: {
    title: "Snowball Method",
    meaning: "Snowball pays extra toward the smallest balance first.",
    simple: "Create quick wins to build momentum.",
    example: "Paying off a $300 balance first can feel motivating even if another debt has a higher APR."
  },
  stressTest: {
    title: "Stress Test",
    meaning: "A stress test checks how the plan handles a bad scenario like lower income or surprise costs.",
    simple: "A pretend financial bad day.",
    example: "Test a 25% income drop and $1,500 emergency to see whether cash goes negative."
  },
  protectionScore: {
    title: "Protection Score",
    meaning: "Protection score checks emergency cash, insurance rows, deductibles, and coverage gaps.",
    simple: "It shows whether big shocks look covered or exposed.",
    example: "Missing disability coverage and a deductible larger than cash savings can lower the score."
  },
  recurringTotal: {
    title: "Recurring Total",
    meaning: "Recurring total adds up subscriptions and repeating charges entered in the leak finder.",
    simple: "Your monthly auto-charge pile.",
    example: "Five small subscriptions can quietly become $90 per month."
  },
  nextReminder: {
    title: "Next Reminder",
    meaning: "Next reminder shows the closest upcoming recurring charge based on billing day.",
    simple: "The next subscription coming up.",
    example: "If Spotify bills on day 3 and today is day 1, it appears as the next reminder."
  },
  tradeoffSplit: {
    title: "Tradeoff Split",
    meaning: "Tradeoff split shows how extra monthly cash is divided between goals like emergency savings, debt, investing, and miscellaneous spending.",
    simple: "It gives every extra dollar a job.",
    example: "$500 split 35% emergency, 35% debt, 20% investing, 10% misc creates clear buckets."
  },
  paycheckSplit: {
    title: "Paycheck Split",
    meaning: "Paycheck split turns each paycheck into percentage buckets before spending starts.",
    simple: "A mini budget for every paycheck.",
    example: "A $2,250 paycheck split 55% bills and 20% savings plans those amounts immediately."
  },
  macroDashboard: {
    title: "Macro Dashboard",
    meaning: "Macro dashboard shows broad economy signals such as rates, inflation, unemployment, and mortgage pressure.",
    simple: "It is the economy weather report.",
    example: "Higher rates can matter for bonds, debt, real estate, and stock valuations."
  },
  fedFunds: {
    title: "Fed Funds Rate",
    meaning: "The Fed Funds Rate is a key short-term policy rate influenced by the Federal Reserve.",
    simple: "It helps set the tone for borrowing costs.",
    example: "Higher policy rates can make credit cards, loans, and business financing more expensive."
  },
  treasuryYield: {
    title: "10-Year Treasury Yield",
    meaning: "The 10-Year Treasury yield is a major benchmark interest rate used across bonds, mortgages, and valuation.",
    simple: "A big market interest-rate signal.",
    example: "When the 10-year yield rises, bond prices and rate-sensitive assets can feel pressure."
  },
  inflation: {
    title: "Inflation",
    meaning: "Inflation measures how much prices rise over time.",
    simple: "Stuff gets more expensive.",
    example: "If inflation is 3%, a basket of goods that cost $100 last year may cost about $103 now."
  },
  unemployment: {
    title: "Unemployment",
    meaning: "Unemployment estimates the share of people in the labor force who are looking for work but do not have a job.",
    simple: "A jobs-market stress signal.",
    example: "Rising unemployment can make emergency savings more important."
  },
  mortgageRate: {
    title: "Mortgage Rate",
    meaning: "Mortgage rate is the interest rate borrowers pay on home loans.",
    simple: "The price of borrowing for a home.",
    example: "Higher mortgage rates can reduce affordability and pressure real estate demand."
  },
  learningPathway: {
    title: "Learning Pathway",
    meaning: "Learning pathway is the guided lesson route with locked and unlocked finance topics.",
    simple: "A step-by-step money course.",
    example: "Finish early lessons to unlock later concepts and checks."
  },
  libraryMap: {
    title: "Learning Library Map",
    meaning: "Learning library map shows how the app's education content is spread across tips, terms, concepts, history, and checks.",
    simple: "A chart of what the learning section covers.",
    example: "If history has fewer cards than concepts, the map makes that visible."
  },
  historyTimeline: {
    title: "History Timeline",
    meaning: "History timeline groups major financial events by era so patterns are easier to scan.",
    simple: "A map of financial history lessons.",
    example: "The 1970s inflation lesson connects directly to today's budgeting and rate discussions."
  }
};

const scenarios = {
  qualityCompounder: {
    ticker: "QLTY",
    sector: "Software",
    price: 84,
    eps: 4.8,
    revenuePerShare: 22,
    bookValuePerShare: 18,
    fcfPerShare: 5.2,
    dividendPerShare: 1.1,
    revenueGrowth: 12,
    epsGrowth: 14,
    grossMargin: 68,
    operatingMargin: 24,
    netMargin: 21,
    roe: 26,
    debtEquity: 0.42,
    currentRatio: 2.1,
    beta: 1.05,
    allocation: 4,
    returnSeries: "2.1,-1.4,3.2,1.8,-0.7,2.6,0.9,-2.0,3.4,1.1,2.2,-0.3"
  },
  cheapCyclical: {
    ticker: "VAL",
    sector: "Industrials",
    price: 38,
    eps: 5.2,
    revenuePerShare: 76,
    bookValuePerShare: 42,
    fcfPerShare: 3.7,
    dividendPerShare: 1.6,
    revenueGrowth: 3,
    epsGrowth: 4,
    grossMargin: 29,
    operatingMargin: 11,
    netMargin: 7,
    roe: 13,
    debtEquity: 0.72,
    currentRatio: 1.45,
    beta: 1.28,
    allocation: 3,
    returnSeries: "1.2,-2.9,2.4,0.6,-1.8,1.9,0.4,-3.1,2.6,0.5,1.0,-0.9"
  },
  stretchedGrowth: {
    ticker: "GROW",
    sector: "Cloud Infrastructure",
    price: 126,
    eps: 1.8,
    revenuePerShare: 15,
    bookValuePerShare: 9,
    fcfPerShare: 1.2,
    dividendPerShare: 0,
    revenueGrowth: 31,
    epsGrowth: 34,
    grossMargin: 74,
    operatingMargin: 12,
    netMargin: 8,
    roe: 17,
    debtEquity: 0.28,
    currentRatio: 2.8,
    beta: 1.62,
    allocation: 6,
    returnSeries: "3.8,-3.4,5.1,2.7,-2.2,4.8,1.9,-4.5,5.6,2.2,3.3,-1.6"
  }
};

const strategyWeights = {
  balanced: { valuation: 0.25, quality: 0.25, growth: 0.18, safety: 0.2, portfolio: 0.12 },
  value: { valuation: 0.38, quality: 0.2, growth: 0.1, safety: 0.22, portfolio: 0.1 },
  growth: { valuation: 0.16, quality: 0.2, growth: 0.34, safety: 0.14, portfolio: 0.16 },
  income: { valuation: 0.2, quality: 0.19, growth: 0.08, safety: 0.25, portfolio: 0.28 }
};

const riskSettings = {
  conservative: { maxBeta: 1.05, maxAllocation: 5, preferredDebt: 0.65 },
  moderate: { maxBeta: 1.25, maxAllocation: 8, preferredDebt: 1 },
  aggressive: { maxBeta: 1.7, maxAllocation: 12, preferredDebt: 1.35 }
};
const chartColors = ["#087e8b", "#6f5cc2", "#198754", "#b7791f", "#c2413a", "#3c6e71", "#8f5f2a", "#2f4858"];

if (portfolioBuilderSection && singleStockDrawer) {
  singleStockDrawer.before(portfolioBuilderSection);
}

const updateServerWarning = () => {
  if (!serverWarning) return;
  serverWarning.hidden = window.location.protocol !== "file:";
};

const formatNumber = (value, digits = 1) => {
  if (!Number.isFinite(value)) return "N/A";
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  });
};

const clamp = (value, min = 0, max = 100) => Math.min(max, Math.max(min, value));

const scoreLowerBetter = (value, best, acceptable, poor) => {
  if (!Number.isFinite(value)) return 35;
  if (value <= best) return 100;
  if (value <= acceptable) return 100 - ((value - best) / (acceptable - best)) * 28;
  if (value <= poor) return 72 - ((value - acceptable) / (poor - acceptable)) * 45;
  return clamp(25 - (value - poor) * 2, 0, 25);
};

const scoreHigherBetter = (value, weak, good, excellent) => {
  if (!Number.isFinite(value)) return 35;
  if (value >= excellent) return 100;
  if (value >= good) return 72 + ((value - good) / (excellent - good)) * 28;
  if (value >= weak) return 35 + ((value - weak) / (good - weak)) * 37;
  return clamp((value / weak) * 35, 0, 35);
};

const readInputs = () => {
  const values = {};
  new FormData(form).forEach((value, key) => {
    const numeric = Number(value);
    values[key] = value.trim() === "" || Number.isNaN(numeric) ? value : numeric;
  });
  return values;
};

const calculate = (data) => {
  const pe = data.price / data.eps;
  const ps = data.price / data.revenuePerShare;
  const pb = data.price / data.bookValuePerShare;
  const fcfYield = (data.fcfPerShare / data.price) * 100;
  const dividendYield = (data.dividendPerShare / data.price) * 100;
  const payoutRatio = (data.dividendPerShare / data.eps) * 100;
  const peg = pe / data.epsGrowth;
  const earningsYield = (data.eps / data.price) * 100;

  const settings = riskSettings[riskProfile.value];
  const valuation = average([
    scoreLowerBetter(pe, 12, 22, 40),
    scoreLowerBetter(ps, 1.5, 5, 11),
    scoreLowerBetter(pb, 1.4, 4, 9),
    scoreHigherBetter(fcfYield, 2, 5, 9),
    scoreLowerBetter(peg, 0.8, 1.7, 3)
  ]);

  const quality = average([
    scoreHigherBetter(data.roe, 8, 16, 28),
    scoreHigherBetter(data.grossMargin, 25, 45, 70),
    scoreHigherBetter(data.operatingMargin, 8, 18, 32),
    scoreHigherBetter(data.netMargin, 5, 14, 25)
  ]);

  const growth = average([
    scoreHigherBetter(data.revenueGrowth, 2, 9, 22),
    scoreHigherBetter(data.epsGrowth, 3, 10, 25)
  ]);

  const safety = average([
    scoreLowerBetter(data.debtEquity, settings.preferredDebt * 0.45, settings.preferredDebt, settings.preferredDebt * 2),
    scoreHigherBetter(data.currentRatio, 0.9, 1.4, 2.4),
    scoreLowerBetter(data.beta, settings.maxBeta * 0.75, settings.maxBeta, settings.maxBeta * 1.35)
  ]);

  const income = average([
    scoreHigherBetter(dividendYield, 0.8, 2.4, 4.5),
    scoreLowerBetter(payoutRatio, 35, 65, 95)
  ]);

  const allocationScore = scoreLowerBetter(data.allocation, settings.maxAllocation * 0.45, settings.maxAllocation, settings.maxAllocation * 1.45);
  const portfolio = activeStrategy === "income" ? average([allocationScore, income, safety]) : average([allocationScore, safety]);
  const weights = strategyWeights[activeStrategy];
  const score = Math.round(
    valuation * weights.valuation +
      quality * weights.quality +
      growth * weights.growth +
      safety * weights.safety +
      portfolio * weights.portfolio
  );

  return {
    pe,
    ps,
    pb,
    fcfYield,
    dividendYield,
    payoutRatio,
    peg,
    earningsYield,
    factorScores: { valuation, quality, growth, safety, portfolio },
    score
  };
};

const average = (values) => {
  const valid = values.filter(Number.isFinite);
  if (!valid.length) return 0;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
};

const classifyRatio = (score) => {
  if (score >= 72) return "good";
  if (score >= 45) return "warn";
  return "bad";
};

const hasSingleStockInputs = (data) =>
  Number(data.price) > 0 &&
  Number.isFinite(Number(data.eps)) &&
  Number(data.revenuePerShare) > 0 &&
  Number(data.bookValuePerShare) > 0 &&
  Number.isFinite(Number(data.fcfPerShare)) &&
  Number.isFinite(Number(data.roe)) &&
  Number.isFinite(Number(data.debtEquity)) &&
  Number.isFinite(Number(data.beta));

const getVerdict = (score) => {
  if (score >= 78) return { label: "Optimal Fit", tone: "good" };
  if (score >= 62) return { label: "Portfolio Candidate", tone: "good" };
  if (score >= 45) return { label: "Watchlist", tone: "warn" };
  return { label: "Avoid / Rework", tone: "bad" };
};

const ratioDefinitions = (data, result) => [
  {
    label: "P/E",
    value: formatNumber(result.pe),
    note: "Lower can indicate cheaper earnings.",
    score: scoreLowerBetter(result.pe, 12, 22, 40)
  },
  {
    label: "PEG",
    value: formatNumber(result.peg, 2),
    note: "Price against earnings growth.",
    score: scoreLowerBetter(result.peg, 0.8, 1.7, 3)
  },
  {
    label: "P/S",
    value: formatNumber(result.ps, 2),
    note: "Market value per dollar of sales.",
    score: scoreLowerBetter(result.ps, 1.5, 5, 11)
  },
  {
    label: "P/B",
    value: formatNumber(result.pb, 2),
    note: "Price compared with book value.",
    score: scoreLowerBetter(result.pb, 1.4, 4, 9)
  },
  {
    label: "FCF Yield",
    value: `${formatNumber(result.fcfYield)}%`,
    note: "Free cash flow return on price.",
    score: scoreHigherBetter(result.fcfYield, 2, 5, 9)
  },
  {
    label: "ROE",
    value: `${formatNumber(data.roe)}%`,
    note: "Return generated on equity.",
    score: scoreHigherBetter(data.roe, 8, 16, 28)
  },
  {
    label: "Debt / Equity",
    value: formatNumber(data.debtEquity, 2),
    note: "Balance sheet leverage.",
    score: scoreLowerBetter(data.debtEquity, 0.45, 1, 2)
  },
  {
    label: "Dividend Yield",
    value: `${formatNumber(result.dividendYield)}%`,
    note: "Income return from dividends.",
    score: scoreHigherBetter(result.dividendYield, 0.8, 2.4, 4.5)
  }
];

const renderRatios = (data, result) => {
  if (!hasSingleStockInputs(data)) {
    ratioGrid.innerHTML = `
      <article class="ratio-empty-state">
        <strong>This scorecard needs one stock first.</strong>
        <p>Use <b>Load Assets</b> for your portfolio, or open <b>Optional Expert Mode</b>, type a ticker like NVDA, and press <b>Load This Stock</b>. StockPilot will fill what it can, then this area explains the company in plain English.</p>
      </article>
    `;
    return;
  }

  ratioGrid.innerHTML = ratioDefinitions(data, result)
    .map(
      (ratio) => `
        <article class="ratio-tile ${classifyRatio(ratio.score)}">
          <p class="label">${ratio.label}</p>
          <strong>${ratio.value}</strong>
          <span>${ratio.note}</span>
        </article>
      `
    )
    .join("");
};

const strongestFactor = (scores) =>
  Object.entries(scores).sort((a, b) => b[1] - a[1])[0] ?? ["quality", 0];

const weakestFactor = (scores) =>
  Object.entries(scores).sort((a, b) => a[1] - b[1])[0] ?? ["valuation", 0];

const renderSummary = (data, result) => {
  if (!hasSingleStockInputs(data)) {
    document.querySelector("#fitScore").textContent = "--";
    document.querySelector("#summaryTicker").textContent = "Pick a stock";
    document.querySelector("#summarySector").textContent = "No single-stock score loaded yet";
    document.querySelector("#portfolioRole").textContent = "Waiting for data";
    document.querySelector("#roleReason").textContent = "Load one stock here, or use Portfolio Builder for multiple holdings.";
    document.querySelector("#mainRisk").textContent = "Unknown";
    document.querySelector("#riskReason").textContent = "There is not enough company data to judge risk.";
    return;
  }

  const verdict = getVerdict(result.score);
  const verdictBadge = document.querySelector("#verdictBadge");
  const best = strongestFactor(result.factorScores);
  const weak = weakestFactor(result.factorScores);

  document.querySelector("#fitScore").textContent = result.score;
  document.querySelector("#summaryTicker").textContent = String(data.ticker || "-").toUpperCase();
  document.querySelector("#summarySector").textContent = data.sector || "Sector pending";
  document.querySelector("#portfolioRole").textContent = result.score >= 72 ? "Core Candidate" : result.score >= 50 ? "Satellite / Watch" : "Needs Review";
  document.querySelector("#roleReason").textContent = `${titleCase(best[0])} is the strongest factor at ${Math.round(best[1])}/100.`;
  document.querySelector("#mainRisk").textContent = titleCase(weak[0]);
  document.querySelector("#riskReason").textContent = `${titleCase(weak[0])} is pulling the score down at ${Math.round(weak[1])}/100.`;

  if (verdictBadge) {
    verdictBadge.textContent = verdict.label;
    verdictBadge.className = `verdict-badge ${verdict.tone}`;
  }
};

const renderNotes = (data, result) => {
  if (!hasSingleStockInputs(data)) {
    decisionNotes.innerHTML = `
      <li><strong>What this section does:</strong> turns one company's ratios into a simple score.</li>
      <li><strong>When to use it:</strong> when you want to inspect a single stock more deeply than the portfolio table.</li>
      <li><strong>Fast path:</strong> open Optional Expert Mode, enter a ticker, then press Load This Stock.</li>
    `;
    return;
  }

  const notes = [];
  const scores = result.factorScores;

  if (scores.valuation >= 72) notes.push("Valuation looks reasonable under the current strategy thresholds.");
  if (scores.valuation < 45) notes.push("Valuation is stretched; require stronger growth or a lower entry price.");
  if (scores.quality >= 72) notes.push("Profitability and margins support a higher-quality portfolio role.");
  if (scores.safety < 50) notes.push("Risk controls are flashing: review leverage, liquidity, beta, or position size.");
  if (scores.growth >= 75) notes.push("Growth profile is strong, but confirm that estimates are durable.");
  if (activeStrategy === "income" && result.dividendYield < 2) notes.push("Income strategy selected, but dividend yield is modest.");
  if (data.allocation > riskSettings[riskProfile.value].maxAllocation) notes.push("Current allocation is above this risk profile's preferred position limit.");
  if (!notes.length) notes.push("The stock is balanced across the main factors; compare it against alternatives before buying.");

  decisionNotes.innerHTML = notes.map((note) => `<li>${note}</li>`).join("");
};

const renderFactorSummary = (data, result) => {
  if (!factorSummary) return;

  const labels = {
    valuation: "Valuation",
    quality: "Quality",
    growth: "Growth",
    safety: "Safety",
    portfolio: "Portfolio Fit"
  };

  if (!hasSingleStockInputs(data)) {
    factorSummary.innerHTML = `
      <div class="factor-empty">
        <strong>No factor chart yet</strong>
        <span>Load one stock to compare valuation, quality, growth, safety, and fit.</span>
      </div>
    `;
    return;
  }

  factorSummary.innerHTML = Object.entries(result.factorScores)
    .map(([key, value]) => {
      const score = Math.round(value);
      return `
        <div class="factor-meter">
          <span>${labels[key] || titleCase(key)}</span>
          <b>${score}</b>
          <div><i style="width:${clamp(score)}%"></i></div>
        </div>
      `;
    })
    .join("");
};

const parseReturnSeries = (value) =>
  String(value || "")
    .split(/[\s,;|]+/)
    .map(Number)
    .filter(Number.isFinite);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const createHoldingFromCurrent = () => {
  const data = readInputs();
  const result = calculate(data);
  return {
    id: crypto.randomUUID(),
    ticker: String(data.ticker || "STOCK").toUpperCase(),
    sector: String(data.sector || "Unclassified"),
    assetClass: "Stock",
    dataAsOf: "Manual",
    allocation: Number(data.allocation) || 0,
    pe: result.pe,
    ps: result.ps,
    dividendYield: result.dividendYield,
    roe: 0,
    debtEquity: Number(data.debtEquity) || 0,
    growth: Number(data.epsGrowth) || 0,
    beta: Number(data.beta) || 1,
    score: result.score,
    factorScores: result.factorScores,
    returns: parseReturnSeries(data.returnSeries)
  };
};

const populateInputsFromHolding = (holding) => {
  const values = {
    ticker: holding.ticker,
    sector: holding.sector,
    price: holding.sourceData?.price,
    eps: holding.sourceData?.eps,
    revenuePerShare: holding.sourceData?.revenuePerShare,
    bookValuePerShare: holding.sourceData?.bookValuePerShare,
    fcfPerShare: holding.sourceData?.fcfPerShare,
    dividendPerShare: holding.sourceData?.dividendPerShare,
    revenueGrowth: holding.sourceData?.revenueGrowth,
    epsGrowth: holding.sourceData?.epsGrowth,
    grossMargin: holding.sourceData?.grossMargin,
    operatingMargin: holding.sourceData?.operatingMargin,
    netMargin: holding.sourceData?.netMargin,
    roe: holding.sourceData?.roe,
    debtEquity: holding.sourceData?.debtEquity,
    currentRatio: holding.sourceData?.currentRatio,
    beta: holding.sourceData?.beta,
    allocation: holding.allocation,
    returnSeries: holding.returns.join(",")
  };

  Object.entries(values).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input && value !== undefined && value !== null && value !== "") input.value = value;
  });
  update();
};

const scoreHoldingFromRatios = (holding) => {
  if (holding.marketDataOnly) return marketScore(holding.returns);
  if (["Bond", "Crypto", "Commodity", "Real Estate", "ETF", "Fund"].includes(holding.assetClass)) {
    return combinedStockScore(
      holding.returns,
      {
        pe: holding.pe,
        ps: holding.ps,
        beta: holding.beta,
        dividendYield: holding.dividendYield,
        assetClass: holding.assetClass
      },
      holding.allocation
    );
  }
  const settings = riskSettings[riskProfile.value];
  const valuation = average([
    scoreLowerBetter(holding.pe, 12, 22, 40),
    scoreLowerBetter(holding.ps, 1.5, 5, 11),
    scoreHigherBetter(holding.dividendYield, 0.8, 2.4, 4.5)
  ]);
  const quality = scoreHigherBetter(holding.roe, 8, 16, 28);
  const growth = scoreHigherBetter(holding.growth, 3, 10, 25);
  const safety = average([
    scoreLowerBetter(holding.debtEquity, settings.preferredDebt * 0.45, settings.preferredDebt, settings.preferredDebt * 2),
    scoreLowerBetter(holding.beta, settings.maxBeta * 0.75, settings.maxBeta, settings.maxBeta * 1.35)
  ]);
  const portfolio = average([
    safety,
    scoreLowerBetter(holding.allocation, settings.maxAllocation * 0.45, settings.maxAllocation, settings.maxAllocation * 1.45)
  ]);
  const weights = strategyWeights[activeStrategy];
  return Math.round(
    valuation * weights.valuation +
      quality * weights.quality +
      growth * weights.growth +
      safety * weights.safety +
      portfolio * weights.portfolio
  );
};

const parsePortfolioBuilderRows = (text) =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([A-Za-z.\-]{1,8})[\s,;:]+([0-9]+(?:\.[0-9]+)?)%?$/);
      if (!match) return null;
      return {
        symbol: match[1].toUpperCase(),
        allocation: Number(match[2])
      };
    })
    .filter(Boolean);

const renderAssetInputTable = () => {
  if (!assetRows) return;
  const rows = parsePortfolioBuilderRows(bulkInput.value);
  const visibleRows = rows.length ? rows : [{ symbol: "", allocation: "" }];
  assetRows.innerHTML = visibleRows
    .map(
      (row) => `
        <tr>
          <td><input data-asset-field="symbol" value="${escapeHtml(row.symbol || "")}" placeholder="AAPL" autocomplete="off" /></td>
          <td class="number-cell"><input data-asset-field="allocation" type="number" min="0" max="100" step="0.1" value="${escapeHtml(row.allocation ?? "")}" placeholder="25" /></td>
          <td class="action-cell"><button class="row-delete-button" data-delete-asset-row type="button" aria-label="Delete asset row">x</button></td>
        </tr>
      `
    )
    .join("");
};

const syncAssetTableToText = () => {
  if (!assetRows) return;
  const lines = Array.from(assetRows.querySelectorAll("tr"))
    .map((row) => {
      const symbol = row.querySelector('[data-asset-field="symbol"]')?.value.trim().toUpperCase();
      const allocation = row.querySelector('[data-asset-field="allocation"]')?.value.trim();
      return symbol && allocation ? `${symbol} ${allocation}` : "";
    })
    .filter(Boolean);
  bulkInput.value = lines.join("\n");
};

const addAssetInputRow = (row = { symbol: "", allocation: "" }) => {
  if (!assetRows) return;
  assetRows.insertAdjacentHTML(
    "beforeend",
    `
      <tr>
        <td><input data-asset-field="symbol" value="${escapeHtml(row.symbol || "")}" placeholder="AAPL" autocomplete="off" /></td>
        <td class="number-cell"><input data-asset-field="allocation" type="number" min="0" max="100" step="0.1" value="${escapeHtml(row.allocation ?? "")}" placeholder="25" /></td>
        <td class="action-cell"><button class="row-delete-button" data-delete-asset-row type="button" aria-label="Delete asset row">x</button></td>
      </tr>
    `
  );
};

const updateBulkStatus = () => {
  const rows = parsePortfolioBuilderRows(bulkInput.value);
  const rawRows = bulkInput.value.split("\n").filter((line) => line.trim()).length;
  const total = rows.reduce((sum, row) => sum + row.allocation, 0);
  const stockText = rows.length === 1 ? "1 asset" : `${rows.length} assets`;
  const invalidText = rawRows > rows.length ? ` ${rawRows - rows.length} row needs ticker + percent.` : "";
  bulkStatus.textContent = `${stockText} ready. Total allocation: ${formatNumber(total)}%.${invalidText}`;
  builderPreview.innerHTML = rows
    .map((row) => `<div class="builder-chip">${escapeHtml(row.symbol)} <span>${formatNumber(row.allocation)}%</span></div>`)
    .join("");
};

const updateDataSourceStatus = () => {
  const finnhubReady = Boolean(stockPilotProviderStatus?.finnhub?.configured);
  const secReady = Boolean(stockPilotProviderStatus?.secEdgar?.configured);
  const statusText = stockPilotApiOnline ? "Live Data Connected" : "Fallback Data";
  const providerText = stockPilotApiOnline
    ? `Gateway on${finnhubReady ? " + Finnhub" : ""}${secReady ? " + SEC" : ""}`
    : "Live gateway offline";
  const checkedAt = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  if (liveDataPill && liveDataStatus && liveDataDetail) {
    liveDataStatus.textContent = statusText;
    liveDataDetail.textContent = `${providerText} · checked ${checkedAt}`;
    liveDataPill.className = `live-data-pill ${stockPilotApiOnline ? "connected" : "fallback"}`;
    liveDataPill.title = stockPilotApiOnline
      ? "StockPilot is routing supported data through the local API gateway. Market data may still be delayed by the provider."
      : "StockPilot is using fallback/public browser data. Start the live gateway for the strongest demo.";
  }

  dataSourceStatus.textContent = stockPilotApiOnline
    ? `API connected: Yahoo public${finnhubReady ? " + Finnhub" : ""}${secReady ? " + SEC filings" : ""} + FRED`
    : "Browser fallback data ready";
  dataSourceStatus.className = `data-source-status connected${stockPilotApiOnline ? " api-connected" : ""}`;
  fetchRealStocksButton.disabled = false;
  importPortfolioButton.disabled = false;
  loadSingleStockButton.disabled = false;
};

const checkStockPilotApi = async () => {
  if (STOCKPILOT_SAME_ORIGIN) {
    stockPilotApiBaseUrl = window.location.origin;
    stockPilotApiOnline = true;
    stockPilotApiError = "";
  }
  let lastError = "";
  for (const baseUrl of STOCKPILOT_API_CANDIDATES) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1200);
    try {
      const response = await fetch(`${baseUrl}/health`, { signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) {
        lastError = `${baseUrl} returned ${response.status}`;
        continue;
      }
      const payload = await response.json().catch(() => ({}));
      stockPilotApiBaseUrl = baseUrl;
      stockPilotApiOnline = true;
      stockPilotProviderStatus = payload.providerStatus || payload.providers || null;
      stockPilotApiError = "";
      updateDataSourceStatus();
      renderDataFreshness();
      renderApiStatusPanel();
      renderSettings();
      renderPresentationMode();
      return true;
    } catch (error) {
      clearTimeout(timeout);
      lastError = `${baseUrl}: ${error.name === "AbortError" ? "connection timed out" : error.message || "connection failed"}`;
    }
  }
  stockPilotApiOnline = STOCKPILOT_SAME_ORIGIN;
  stockPilotProviderStatus = null;
  if (STOCKPILOT_SAME_ORIGIN) stockPilotApiBaseUrl = window.location.origin;
  stockPilotApiError = STOCKPILOT_SAME_ORIGIN ? "Same-origin app server detected; provider status will update after data refresh." : lastError || "No response from local API gateway.";
  updateDataSourceStatus();
  renderDataFreshness();
  renderApiStatusPanel();
  renderSettings();
  renderPresentationMode();
  return stockPilotApiOnline;
};

const getLocalAccounts = () => {
  try {
    const accounts = JSON.parse(localStorage.getItem(ACCOUNT_KEY) || "[]");
    return Array.isArray(accounts) ? accounts : [];
  } catch {
    return [];
  }
};

const saveLocalAccounts = (accounts) => {
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts.slice(0, 20)));
};

const demoCodeHash = (value) =>
  Array.from(value || "").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) % 1000000007, 7).toString(16);

const normalizeEmail = (value) => value.trim().toLowerCase();

const createDemoAccountId = () =>
  globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const setAccountMessage = (message, tone = "neutral") => {
  if (!accountMessage) return;
  accountMessage.textContent = message;
  accountMessage.classList.toggle("good-text", tone === "good");
  accountMessage.classList.toggle("bad-text", tone === "bad");
};

const renderAccountStatus = () => {
  const account = activeAccount || getLocalAccounts().find((item) => item.id === localStorage.getItem(ACCOUNT_SESSION_KEY));
  activeAccount = account || null;
  if (accountStatus) accountStatus.textContent = account ? "Signed In" : "Guest Mode";
  if (accountName) accountName.textContent = account ? account.name : "No account";
  if (openAccountButton) openAccountButton.textContent = account ? "Account" : "Sign In";
  if (createUserHeaderButton) createUserHeaderButton.hidden = Boolean(account);
  if (signOutButton) signOutButton.disabled = !account;
  if (commandAccountBadge) commandAccountBadge.textContent = account ? "Signed In" : "Guest";
  if (commandAccountStatus) commandAccountStatus.textContent = account ? "Signed In" : "Guest Mode";
  if (commandAccountName) commandAccountName.textContent = account ? account.name : "No user yet";
  if (commandAccountDetail) {
    commandAccountDetail.textContent = account
      ? `${account.email} · local demo user · use Backup before switching browsers`
      : "Create a user before presenting saved plans, goals, and portfolios.";
  }
  if (commandCreateUserButton) commandCreateUserButton.hidden = Boolean(account);
  if (commandSignInButton) commandSignInButton.textContent = account ? "Account" : "Sign In";
  if (accountCurrentName) accountCurrentName.textContent = account ? account.name : "Guest";
  if (accountCurrentDetail) {
    accountCurrentDetail.textContent = account
      ? `${account.email} · created ${new Date(account.createdAt).toLocaleDateString()} · saved in the cloud`
      : "Create a user before presenting saved plans, goals, and portfolios.";
  }
  updateSaveStatus(account ? `Saved locally for ${account.name}` : "Saved locally");
  renderCloudReadiness();
};

const openAccountPanel = (focusTarget = "create") => {
  if (!accountOverlay) return;
  accountOverlay.hidden = false;
  renderAccountStatus();
  setTimeout(() => {
    if (focusTarget === "login") {
      loginAccountEmail?.focus();
      return;
    }
    if (activeAccount) {
      closeAccountButton?.focus();
      return;
    }
    createAccountName?.focus();
  }, 0);
};

const renderCloudReadiness = () => {
  if (!cloudReadinessGrid) return;
  const hasAccount = Boolean(activeAccount || getLocalAccounts().find((item) => item.id === localStorage.getItem(ACCOUNT_SESSION_KEY)));
  const hasData = holdings.length || moneyGoals.length || decisionJournal.length || getSavingsSnapshot().income > 0;
  const freshCount = Object.values(dataFreshness).filter((item) => item.status === "success").length;
  const items = [
    {
      done: hasAccount,
      title: "User identity",
      detail: hasAccount ? "Local profile exists for this demo." : "Create a profile before moving toward real sync."
    },
    {
      done: hasData,
      title: "Syncable app data",
      detail: hasData ? "Portfolio, budget, goals, or journal data exists." : "Add real inputs so there is something worth syncing."
    },
    {
      done: freshCount >= 3,
      title: "Data refresh trail",
      detail: `${freshCount}/${Object.keys(freshnessLabels).length} areas show fresh or recalculated status.`
    },
    {
      done: false,
      title: "Production backend",
      detail: "Needs secure auth, database tables, encrypted backups, and server rules before launch."
    }
  ];
  cloudReadinessGrid.innerHTML = items
    .map(
      (item) => `
        <article class="${item.done ? "done" : ""}">
          <span>${item.done ? "Ready" : "Needed"}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
  if (cloudReadinessStatus) {
    const ready = items.filter((item) => item.done).length;
    cloudReadinessStatus.textContent = `${ready}/${items.length} cloud-readiness items are ready in this demo. Real online accounts still require a secure backend.`;
  }
};

const syncSettingsInputs = () => {
  if (settingsMarketRefresh) settingsMarketRefresh.value = String(refreshSettings.marketMinutes);
  if (settingsNewsRefresh) settingsNewsRefresh.value = String(refreshSettings.newsMinutes);
  if (settingsPortfolioStale) settingsPortfolioStale.value = String(refreshSettings.portfolioStaleMinutes);
  const activeExperience = getActiveValue("[data-experience]", "experience") || "beginner";
  settingsExperienceButtons.forEach((button) => {
    const active = button.dataset.settingsExperience === activeExperience;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
};

const getSettingsReadinessItems = () => {
  const activeProfile = activeAccount || getLocalAccounts().find((item) => item.id === localStorage.getItem(ACCOUNT_SESSION_KEY));
  const freshCount = Object.values(dataFreshness).filter((item) => item.status === "success").length;
  return [
    {
      title: "Profile",
      value: activeProfile ? "Ready" : "Guest",
      detail: activeProfile ? `Signed in locally as ${activeProfile.name}.` : "Create a local profile before testing sync."
    },
    {
      title: "Portfolio",
      value: holdings.length ? `${holdings.length} assets` : "Empty",
      detail: holdings.length ? "Portfolio data can feed reports and history." : "Add assets to test portfolio features."
    },
    {
      title: "Budget",
      value: getSavingsSnapshot().income > 0 ? "Ready" : "Needs input",
      detail: getSavingsSnapshot().income > 0 ? "Budget data is available for reports." : "Add income and spending first."
    },
    {
      title: "Freshness",
      value: `${freshCount}/${Object.keys(freshnessLabels).length}`,
      detail: "Tracks which areas were refreshed or recalculated."
    }
  ];
};

const getDataSourceItems = () => [
  {
    title: "Market Gateway",
    value: stockPilotApiOnline ? "Connected" : "Fallback",
    tone: stockPilotApiOnline ? "good" : "warn",
    detail: stockPilotApiOnline
      ? "Frontend is using the local StockPilot API gateway before browser fallback."
      : "Local API is not running, so the browser is using public fallback requests."
  },
  {
    title: "Prices & History",
    value: stockPilotApiOnline ? "Gateway" : "Public",
    tone: stockPilotApiOnline ? "good" : "warn",
    detail: stockPilotApiOnline
      ? "Daily price history and quotes are routed through the local gateway before any browser fallback."
      : "Uses browser fallback requests until the local gateway is running."
  },
  {
    title: "SEC Filings",
    value: stockPilotApiOnline ? "Official" : "Gateway needed",
    tone: stockPilotApiOnline ? "good" : "warn",
    detail: stockPilotApiOnline
      ? "Supported US companies can pull official SEC companyfacts for filing-backed fundamentals."
      : "Start the gateway to use official SEC filing facts instead of market-only data."
  },
  {
    title: "Keyed Quote API",
    value: stockPilotProviderStatus?.finnhub?.configured ? "Finnhub on" : "Optional",
    tone: stockPilotProviderStatus?.finnhub?.configured ? "good" : "warn",
    detail: stockPilotProviderStatus?.finnhub?.configured
      ? "Finnhub key detected server-side for quote, profile, and metric enrichment."
      : "Add FINNHUB_API_KEY in .env for stronger provider-backed quote enrichment."
  },
  {
    title: "News",
    value: "RSS",
    tone: "warn",
    detail: "Headlines come from public RSS feeds and are paraphrased/shortened. Feeds can miss stories or fail temporarily."
  },
  {
    title: "Macro Data",
    value: stockPilotApiOnline ? "FRED" : "Fallback",
    tone: stockPilotApiOnline ? "good" : "warn",
    detail: stockPilotApiOnline
      ? "Rates, CPI, unemployment, and mortgage context refresh through public FRED CSV series."
      : "Macro cards show built-in demo context until the local API gateway can reach FRED."
  },
  {
    title: "Production Upgrade",
    value: "Later",
    tone: "warn",
    detail: "For a paid launch, add licensed real-time market data and paid news terms before promising real-time accuracy."
  }
];

const renderApiStatusPanel = () => {
  if (!apiStatusGrid && !commandDataSourceGrid && !apiStatusNote) return;
  const providerCards = [
    {
      title: "Gateway",
      value: stockPilotApiOnline ? "Connected" : "Offline",
      tone: stockPilotApiOnline ? "good" : "bad",
      detail: stockPilotApiOnline ? `The app is routing supported requests through ${stockPilotApiBaseUrl}.` : stockPilotApiError || "No local gateway response yet."
    },
    {
      title: "Market Data",
      value: stockPilotApiOnline ? "Routed" : "Fallback",
      tone: stockPilotApiOnline ? "good" : "warn",
      detail: "Quotes and one-year daily history power prices, volatility, beta estimates, correlation, and paper trading."
    },
    {
      title: "SEC + FRED",
      value: stockPilotApiOnline ? "Available" : "Waiting",
      tone: stockPilotApiOnline ? "good" : "warn",
      detail: "SEC companyfacts add official filing context; FRED adds macro rates, CPI, jobs, and mortgage data."
    },
    {
      title: "Finnhub Key",
      value: stockPilotProviderStatus?.finnhub?.configured ? "Detected" : "Optional",
      tone: stockPilotProviderStatus?.finnhub?.configured ? "good" : "warn",
      detail: stockPilotProviderStatus?.finnhub?.configured ? "Server-side key is configured." : "Works without it, but adding a key makes the data story stronger."
    }
  ];
  if (apiStatusGrid) {
    apiStatusGrid.innerHTML = providerCards
      .map(
        (item) => `
          <article class="api-status-card ${item.tone}">
            <span>${escapeHtml(item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `
      )
      .join("");
  }
  if (commandDataSourceGrid) {
    commandDataSourceGrid.innerHTML = getDataSourceItems()
      .map(
        (item) => `
          <article class="${item.tone}">
            <span>${escapeHtml(item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `
      )
      .join("");
  }
  if (apiStatusNote) {
    apiStatusNote.textContent = stockPilotApiOnline
      ? "API is connected. Use Refresh Real Data before presenting so portfolio, macro, news, and market data are current."
      : `API is not connected yet. ${stockPilotApiError || "Open start-stockpilot-api.command, then press Refresh Real Data."}`;
    apiStatusNote.classList.toggle("good-text", stockPilotApiOnline);
    apiStatusNote.classList.toggle("bad-text", !stockPilotApiOnline);
  }
};

const renderSettings = () => {
  syncSettingsInputs();
  if (settingsStatusGrid) {
    const dataPoints = [
      ["Holdings", holdings.length],
      ["Goals", moneyGoals.length],
      ["Journal", decisionJournal.length],
      ["Early access", earlyAccessLeads.length],
      ["Services", serviceRequests.length]
    ];
    settingsStatusGrid.innerHTML = dataPoints
      .map(([label, value]) => `<article><span>${escapeHtml(label)}</span><strong>${value}</strong></article>`)
      .join("");
  }
  if (settingsReadinessGrid) {
    settingsReadinessGrid.innerHTML = getSettingsReadinessItems()
      .map(
        (item) => `
          <article>
            <span>${escapeHtml(item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `
      )
      .join("");
  }
  if (settingsDataSourceGrid) {
    settingsDataSourceGrid.innerHTML = getDataSourceItems()
      .map(
        (item) => `
          <article class="${item.tone}">
            <span>${escapeHtml(item.title)}</span>
            <strong>${escapeHtml(item.value)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `
      )
      .join("");
  }
  if (settingsStatus) {
    settingsStatus.textContent = `Settings saved locally. Market refresh is ${refreshSettings.marketMinutes ? `${refreshSettings.marketMinutes} min` : "off"}; news refresh is ${refreshSettings.newsMinutes ? `${refreshSettings.newsMinutes} min` : "manual"}.`;
    settingsStatus.classList.remove("good-text", "bad-text");
  }
  renderApiStatusPanel();
};

const openSettings = () => {
  if (!settingsOverlay) return;
  renderSettings();
  settingsOverlay.hidden = false;
};

const closeSettings = () => {
  if (settingsOverlay) settingsOverlay.hidden = true;
};

const showEducationalNotice = () => {
  if (!educationalOverlay || sessionStorage.getItem(EDUCATIONAL_NOTICE_SESSION_KEY) === "true") return;
  educationalOverlay.hidden = false;
};

const closeEducationalNotice = () => {
  sessionStorage.setItem(EDUCATIONAL_NOTICE_SESSION_KEY, "true");
  if (educationalOverlay) educationalOverlay.hidden = true;
};

const applySettingsFromPanel = () => {
  if (settingsMarketRefresh) refreshSettings.marketMinutes = Number(settingsMarketRefresh.value) || 0;
  if (settingsNewsRefresh) refreshSettings.newsMinutes = Number(settingsNewsRefresh.value) || 0;
  if (settingsPortfolioStale) refreshSettings.portfolioStaleMinutes = Number(settingsPortfolioStale.value) || 1440;
  syncRefreshSettingsInputs();
  virtualMarket.autoRefresh = refreshSettings.marketMinutes > 0;
  setMarketPolling(virtualMarket.autoRefresh);
  renderDataFreshness();
  renderSettings();
  saveAppState();
  if (settingsStatus) {
    settingsStatus.textContent = "Settings saved.";
    settingsStatus.classList.add("good-text");
    settingsStatus.classList.remove("bad-text");
  }
};

const createLocalAccount = async () => {
  const name = createAccountName?.value.trim();
  const email = normalizeEmail(createAccountEmail?.value || "");
  const code = createAccountCode?.value || "";
  if (!name || !email || code.length < 6) {
    setAccountMessage("Add a name, email, and a password with at least 6 characters.", "bad");
    return;
  }
  setAccountMessage("Creating account...", "neutral");
  try {
    const result = await supabaseSignUp(email, code);
    if (result.error) {
      setAccountMessage(result.error.message || "Sign up failed. Try a different email.", "bad");
      return;
    }
    const token = result.access_token;
    if (token) {
      localStorage.setItem("supabase_token", token);
      localStorage.setItem("supabase_email", email);
      localStorage.setItem("supabase_name", name);
    }
    activeAccount = { id: result.user?.id || email, name, email, createdAt: new Date().toISOString(), lastLoginAt: new Date().toISOString() };
    if (createAccountName) createAccountName.value = "";
    if (createAccountEmail) createAccountEmail.value = "";
    if (createAccountCode) createAccountCode.value = "";
    renderAccountStatus();
    renderSettings();
    setAccountMessage(`Account created for ${name}! Check your email to confirm your account.`, "good");
  } catch (err) {
    setAccountMessage("Account creation failed. Try again.", "bad");
  }
};

const signInLocalAccount = async () => {
  const email = normalizeEmail(loginAccountEmail?.value || "");
  const code = loginAccountCode?.value || "";
  if (!email || !code) {
    alert("Enter your email and password.");
    return;
  }
  try {
    const result = await supabaseSignIn(email, code);
    if (result.error) {
      alert("Sign in failed: " + (result.error.message || "Check your email and password."));
      return;
    }
    const token = result.access_token;
    localStorage.setItem("supabase_token", token);
    localStorage.setItem("supabase_email", email);
    const savedName = localStorage.getItem("supabase_name") || email.split("@")[0];
    activeAccount = { id: result.user?.id || result.id || email, name: savedName, email, lastLoginAt: new Date().toISOString() };
    if (loginAccountEmail) loginAccountEmail.value = "";
    if (loginAccountCode) loginAccountCode.value = "";
    try { renderAccountStatus(); } catch(e) {}
    try { renderSettings(); } catch(e) {}
    alert("Signed in as " + activeAccount.name + "!");
  } catch (err) {
    alert("Sign in error: " + err.message);
  }
};

const signOutLocalAccount = () => {
  localStorage.removeItem(ACCOUNT_SESSION_KEY);
  activeAccount = null;
  renderAccountStatus();
  renderSettings();
  setAccountMessage("Signed out. Your local app data is still saved in this browser.", "neutral");
};

const parseStoredJson = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
};

const buildPortableAppData = () => {
  saveAppState();
  return {
    product: "StockPilot",
    version: 1,
    exportedAt: new Date().toISOString(),
    profile: activeAccount
      ? {
          id: activeAccount.id,
          name: activeAccount.name,
          email: activeAccount.email,
          createdAt: activeAccount.createdAt,
          lastLoginAt: activeAccount.lastLoginAt
        }
      : null,
    appState: parseStoredJson(APP_STATE_KEY, {}),
    savedPortfolios: parseStoredJson(SAVED_PORTFOLIOS_KEY, []),
    watchlist: parseStoredJson(WATCHLIST_KEY, []),
    virtualMarket: parseStoredJson(VIRTUAL_MARKET_KEY, {}),
    note: "Demo access codes are not included in this backup."
  };
};

const exportAppData = () => {
  if (!appDataTransfer) return;
  appDataTransfer.value = JSON.stringify(buildPortableAppData(), null, 2);
  appDataTransfer.focus();
  appDataTransfer.select();
  setAccountMessage("Backup created. You can use it to restore your demo data in another browser.", "good");
};

const importAppData = () => {
  if (!appDataTransfer) return;
  let data;
  try {
    data = JSON.parse(appDataTransfer.value || "{}");
  } catch {
    setAccountMessage("That import is not valid JSON. Export first or paste a StockPilot backup.", "bad");
    return;
  }
  if (!data || data.product !== "StockPilot" || !data.appState) {
    setAccountMessage("This does not look like a StockPilot data export.", "bad");
    return;
  }
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(data.appState));
  if (Array.isArray(data.savedPortfolios)) localStorage.setItem(SAVED_PORTFOLIOS_KEY, JSON.stringify(data.savedPortfolios));
  if (Array.isArray(data.watchlist)) localStorage.setItem(WATCHLIST_KEY, JSON.stringify(data.watchlist));
  if (data.virtualMarket && typeof data.virtualMarket === "object") localStorage.setItem(VIRTUAL_MARKET_KEY, JSON.stringify(data.virtualMarket));
  setAccountMessage("Import loaded. The page will refresh so every section uses the restored data.", "good");
  setTimeout(() => window.location.reload(), 700);
};

const currency = (value) => {
  if (!Number.isFinite(value)) return "N/A";
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  });
};

const compactCurrency = (value) => {
  if (!Number.isFinite(value)) return "N/A";
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2
  });
};

const numberFromInput = (id) => Number(document.querySelector(`#${id}`).value) || 0;

const tvmFutureValue = (pv, rate, years, payment) => {
  const growthFactor = (1 + rate) ** years;
  const annuityFactor = Math.abs(rate) < 0.0000001 ? years : (growthFactor - 1) / rate;
  return pv * growthFactor + payment * annuityFactor;
};

const solveTvmRate = (pv, fv, years, payment) => {
  if (years <= 0) return null;
  const target = (rate) => tvmFutureValue(pv, rate, years, payment) - fv;
  let low = -0.99;
  let high = 1;
  let lowValue = target(low);
  let highValue = target(high);

  for (let attempt = 0; attempt < 8 && lowValue * highValue > 0; attempt += 1) {
    high *= 2;
    highValue = target(high);
  }
  if (lowValue * highValue > 0) return null;

  for (let index = 0; index < 80; index += 1) {
    const mid = (low + high) / 2;
    const midValue = target(mid);
    if (Math.abs(midValue) < 0.000001) return mid;
    if (lowValue * midValue <= 0) {
      high = mid;
      highValue = midValue;
    } else {
      low = mid;
      lowValue = midValue;
    }
  }
  return (low + high) / 2;
};

const solveTvmTime = (pv, fv, rate, payment) => {
  if (fv <= pv && payment <= 0) return null;
  const target = (years) => tvmFutureValue(pv, rate, years, payment) - fv;
  let low = 0;
  let high = 1;
  let highValue = target(high);

  while (high < 200 && highValue < 0) {
    high *= 2;
    highValue = target(high);
  }
  if (highValue < 0) return null;

  for (let index = 0; index < 80; index += 1) {
    const mid = (low + high) / 2;
    if (target(mid) >= 0) high = mid;
    else low = mid;
  }
  return (low + high) / 2;
};

const updateTvmCalculator = () => {
  const solveFor = document.querySelector("#tvmSolveFor").value;
  const pv = numberFromInput("tvmPresent");
  const fv = numberFromInput("tvmFuture");
  const rate = numberFromInput("tvmRate") / 100;
  const years = Math.max(0, numberFromInput("tvmYears"));
  const payment = numberFromInput("tvmPayment");
  const growthFactor = (1 + rate) ** years;
  const annuityFactor = Math.abs(rate) < 0.0000001 ? years : (growthFactor - 1) / rate;
  let label = "Future Value";
  let resultText = currency(tvmFutureValue(pv, rate, years, payment));

  if (solveFor === "present") {
    label = "Present Value";
    resultText = currency((fv - payment * annuityFactor) / Math.max(growthFactor, 0.000001));
  }
  if (solveFor === "rate") {
    label = "Annual Interest Rate";
    const solvedRate = solveTvmRate(pv, fv, years, payment);
    resultText = solvedRate === null ? "N/A" : `${formatNumber(solvedRate * 100, 2)}%`;
  }
  if (solveFor === "payment") {
    label = "Annual Payment";
    const solvedPayment = years === 0 ? null : (fv - pv * growthFactor) / Math.max(annuityFactor, 0.000001);
    resultText = solvedPayment === null ? "N/A" : currency(solvedPayment);
  }
  if (solveFor === "time") {
    label = "Time";
    const solvedYears = solveTvmTime(pv, fv, rate, payment);
    resultText = solvedYears === null ? "N/A" : `${formatNumber(solvedYears, 2)} years`;
  }

  document.querySelector("#tvmResultLabel").textContent = label;
  document.querySelector("#tvmResult").textContent = resultText;
};

const updateIntrinsicValueCalculator = () => {
  const fcf = numberFromInput("ivFcf");
  const growth = numberFromInput("ivGrowth") / 100;
  const terminalGrowth = numberFromInput("ivTerminalGrowth") / 100;
  const discount = numberFromInput("ivDiscount") / 100;
  const years = Math.max(1, Math.round(numberFromInput("ivYears")));
  const price = numberFromInput("ivPrice");

  if (discount <= terminalGrowth) {
    document.querySelector("#ivResult").textContent = "N/A";
    document.querySelector("#ivMargin").textContent = "Discount rate must be higher than terminal growth.";
    return;
  }

  let presentValue = 0;
  let projectedFcf = fcf;
  for (let year = 1; year <= years; year += 1) {
    projectedFcf *= 1 + growth;
    presentValue += projectedFcf / (1 + discount) ** year;
  }

  const terminalValue = (projectedFcf * (1 + terminalGrowth)) / (discount - terminalGrowth);
  const intrinsicValue = presentValue + terminalValue / (1 + discount) ** years;
  const margin = intrinsicValue ? ((intrinsicValue - price) / intrinsicValue) * 100 : 0;

  document.querySelector("#ivResult").textContent = currency(intrinsicValue);
  document.querySelector("#ivMargin").textContent = `${formatNumber(margin)}% margin of safety versus current price.`;
};

const geometricAverageFromReturns = (returns) => {
  if (!returns.length || returns.some((value) => value <= -100)) return null;
  const compound = returns.reduce((growth, value) => growth * (1 + value / 100), 1);
  return {
    average: (compound ** (1 / returns.length) - 1) * 100,
    total: (compound - 1) * 100,
    periods: returns.length
  };
};

const updateGeometricAverageCalculator = () => {
  const returns = parseReturnSeries(document.querySelector("#geoReturns").value);
  const result = geometricAverageFromReturns(returns);
  if (!result) {
    document.querySelector("#geoResult").textContent = "N/A";
    document.querySelector("#geoDetail").textContent = "Enter returns above -100%, separated by commas, spaces, or new lines.";
    return;
  }

  document.querySelector("#geoResult").textContent = `${formatNumber(result.average, 2)}%`;
  document.querySelector("#geoDetail").textContent = `${formatNumber(result.total, 2)}% total compound return across ${result.periods} period${result.periods === 1 ? "" : "s"}.`;
};

const updateCalculators = () => {
  updateTvmCalculator();
  updateIntrinsicValueCalculator();
  updateGeometricAverageCalculator();
};

const readSavingsNumber = (id) => Number(document.querySelector(`#${id}`)?.value) || 0;

const renderMiniCards = (target, items) => {
  if (!target) return;
  target.innerHTML = items
    .map(
      (item) => `
        <article class="suggestion-card ${item.tone || "warn"}">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.detail)}</span>
        </article>
      `
    )
    .join("");
};

const parseSubscriptionLines = (value) =>
  String(value || "")
    .split(/\n+/)
    .map((line, index) => {
      const amountMatch = line.match(/-?\d+(\.\d+)?/);
      const dayMatch = line.match(/\b(?:day|on|due)\s*(\d{1,2})\b/i);
      const amount = Number(amountMatch?.[0]);
      const fallbackDay = ((index * 6 + 3) % 28) + 1;
      const billingDay = clamp(Number(dayMatch?.[1]) || fallbackDay, 1, 28);
      const name = line
        .replace(/\b(?:day|on|due)\s*\d{1,2}\b/gi, "")
        .replace(/-?\d+(\.\d+)?/g, "")
        .trim() || "Subscription";
      return Number.isFinite(amount) ? { name, amount, billingDay } : null;
    })
    .filter(Boolean);

const renderSubscriptionInputTable = () => {
  if (!subscriptionRows) return;
  const rows = parseSubscriptionLines(document.querySelector("#subscriptionList")?.value);
  const visibleRows = rows.length ? rows : [{ name: "", amount: "", billingDay: "" }];
  subscriptionRows.innerHTML = visibleRows
    .map(
      (row) => `
        <tr>
          <td><input data-subscription-field="name" value="${escapeHtml(row.name || "")}" placeholder="Netflix" autocomplete="off" /></td>
          <td class="number-cell"><input data-subscription-field="amount" type="number" min="0" step="0.01" value="${escapeHtml(row.amount ?? "")}" placeholder="18" /></td>
          <td class="day-cell"><input data-subscription-field="billingDay" type="number" min="1" max="28" step="1" value="${escapeHtml(row.billingDay ?? "")}" placeholder="14" /></td>
          <td class="action-cell"><button class="row-delete-button" data-delete-subscription-row type="button" aria-label="Delete subscription row">x</button></td>
        </tr>
      `
    )
    .join("");
};

const syncSubscriptionTableToText = () => {
  if (!subscriptionRows) return;
  const lines = Array.from(subscriptionRows.querySelectorAll("tr"))
    .map((row) => {
      const name = row.querySelector('[data-subscription-field="name"]')?.value.trim();
      const amount = row.querySelector('[data-subscription-field="amount"]')?.value.trim();
      const billingDay = row.querySelector('[data-subscription-field="billingDay"]')?.value.trim();
      return name && amount ? `${name} ${amount}${billingDay ? ` day ${billingDay}` : ""}` : "";
    })
    .filter(Boolean);
  document.querySelector("#subscriptionList").value = lines.join("\n");
};

const addSubscriptionInputRow = (row = { name: "", amount: "", billingDay: "" }) => {
  if (!subscriptionRows) return;
  subscriptionRows.insertAdjacentHTML(
    "beforeend",
    `
      <tr>
        <td><input data-subscription-field="name" value="${escapeHtml(row.name || "")}" placeholder="Netflix" autocomplete="off" /></td>
        <td class="number-cell"><input data-subscription-field="amount" type="number" min="0" step="0.01" value="${escapeHtml(row.amount ?? "")}" placeholder="18" /></td>
        <td class="day-cell"><input data-subscription-field="billingDay" type="number" min="1" max="28" step="1" value="${escapeHtml(row.billingDay ?? "")}" placeholder="14" /></td>
        <td class="action-cell"><button class="row-delete-button" data-delete-subscription-row type="button" aria-label="Delete subscription row">x</button></td>
      </tr>
    `
  );
};

const DEFAULT_INSURANCE_ROWS = [
  { coverage: "Health", premium: 180, deductible: 1500, status: "Active" },
  { coverage: "Auto", premium: 145, deductible: 750, status: "Active" },
  { coverage: "Renters", premium: 18, deductible: 500, status: "Active" },
  { coverage: "Disability", premium: 0, deductible: 0, status: "Missing" },
  { coverage: "Life", premium: 0, deductible: 0, status: "Maybe" }
];

const insuranceStatusOptions = (selected = "Active") =>
  ["Active", "Missing", "Maybe", "Review"].map((status) => `<option value="${status}" ${status === selected ? "selected" : ""}>${status}</option>`).join("");

const insuranceRowTemplate = (row = { coverage: "", premium: "", deductible: "", status: "Review" }) => `
  <tr>
    <td><input data-insurance-field="coverage" value="${escapeHtml(row.coverage || "")}" placeholder="Health" autocomplete="off" /></td>
    <td class="number-cell"><input data-insurance-field="premium" type="number" min="0" step="1" value="${escapeHtml(row.premium ?? "")}" placeholder="120" /></td>
    <td class="number-cell"><input data-insurance-field="deductible" type="number" min="0" step="50" value="${escapeHtml(row.deductible ?? "")}" placeholder="1000" /></td>
    <td><select data-insurance-field="status">${insuranceStatusOptions(row.status || "Review")}</select></td>
    <td class="action-cell"><button class="row-delete-button" data-delete-insurance-row type="button" aria-label="Delete insurance row">x</button></td>
  </tr>
`;

const renderInsuranceInputTable = () => {
  if (!insuranceRows) return;
  const rows = restoredInsuranceRows?.length ? restoredInsuranceRows : DEFAULT_INSURANCE_ROWS;
  insuranceRows.innerHTML = rows.map(insuranceRowTemplate).join("");
};

const addInsuranceInputRow = (row = { coverage: "", premium: "", deductible: "", status: "Review" }) => {
  if (!insuranceRows) return;
  insuranceRows.insertAdjacentHTML("beforeend", insuranceRowTemplate(row));
};

const getInsuranceRows = () =>
  Array.from(insuranceRows?.querySelectorAll("tr") || [])
    .map((row) => ({
      coverage: row.querySelector('[data-insurance-field="coverage"]')?.value.trim() || "",
      premium: Number(row.querySelector('[data-insurance-field="premium"]')?.value) || 0,
      deductible: Number(row.querySelector('[data-insurance-field="deductible"]')?.value) || 0,
      status: row.querySelector('[data-insurance-field="status"]')?.value || "Review"
    }))
    .filter((row) => row.coverage || row.premium || row.deductible);

const renderInsuranceCheckup = () => {
  if (!insuranceScore || !insuranceGrid) return;
  const rows = getInsuranceRows();
  const savingsStats = getSavingsSnapshot();
  const activeRows = rows.filter((row) => row.status === "Active");
  const gapRows = rows.filter((row) => row.status === "Missing" || row.status === "Maybe");
  const reviewRows = rows.filter((row) => row.status === "Review");
  const monthlyPremiums = rows.reduce((sum, row) => sum + row.premium, 0);
  const highestDeductible = rows.reduce((max, row) => Math.max(max, row.deductible), 0);
  const premiumShare = savingsStats.income > 0 ? (monthlyPremiums / savingsStats.income) * 100 : 0;
  const deductibleCovered = highestDeductible <= savingsStats.emergency;
  const score = clamp(70 + activeRows.length * 4 - gapRows.length * 12 - reviewRows.length * 6 - (deductibleCovered ? 0 : 14) - Math.max(premiumShare - 12, 0) * 2, 0, 100);
  insuranceScore.textContent = Math.round(score);
  insuranceScore.classList.toggle("good-text", score >= 75);
  insuranceScore.classList.toggle("bad-text", score < 55);
  insuranceScoreDetail.textContent = rows.length
    ? `${activeRows.length} active, ${gapRows.length} gap${gapRows.length === 1 ? "" : "s"}, ${currency(monthlyPremiums)} monthly premiums.`
    : "Add insurance coverage rows to scan protection gaps.";
  renderMiniCards(insuranceGrid, [
    {
      tone: gapRows.length ? "bad" : "good",
      title: gapRows.length ? "Coverage gaps" : "Core coverage listed",
      detail: gapRows.length ? `${gapRows.map((row) => row.coverage).join(", ")} need review.` : "No missing or maybe rows are currently flagged."
    },
    {
      tone: deductibleCovered ? "good" : "warn",
      title: "Deductible backup",
      detail: highestDeductible ? `${currency(highestDeductible)} highest deductible vs ${currency(savingsStats.emergency)} emergency fund.` : "Add deductibles to test whether cash can cover the first hit."
    },
    {
      tone: premiumShare <= 10 ? "good" : premiumShare <= 15 ? "warn" : "bad",
      title: "Premium pressure",
      detail: `${currency(monthlyPremiums)} per month is ${formatNumber(premiumShare, 1)}% of income.`
    },
    {
      tone: "warn",
      title: "Real policy review",
      detail: "Confirm deductibles, coverage limits, exclusions, beneficiaries, and renewal dates with actual policy documents."
    }
  ]);
};

const DEFAULT_SPENDING_ROWS = [
  { category: "Groceries", planned: 450, actual: 520, type: "Need", notes: "Food basics" },
  { category: "Eating out", planned: 180, actual: 240, type: "Want", notes: "Convenience pressure" },
  { category: "Transport", planned: 220, actual: 210, type: "Need", notes: "Gas and rides" },
  { category: "Shopping", planned: 150, actual: 230, type: "Want", notes: "Impulse buys" },
  { category: "Entertainment", planned: 120, actual: 95, type: "Want", notes: "Streaming and plans" }
];

const getSpendingRows = () => {
  if (!spendingRows) return [];
  return Array.from(spendingRows.querySelectorAll("tr"))
    .map((row) => ({
      category: row.querySelector('[data-spending-field="category"]')?.value.trim() || "",
      planned: Number(row.querySelector('[data-spending-field="planned"]')?.value) || 0,
      actual: Number(row.querySelector('[data-spending-field="actual"]')?.value) || 0,
      type: row.querySelector('[data-spending-field="type"]')?.value || "Want",
      notes: row.querySelector('[data-spending-field="notes"]')?.value.trim() || ""
    }))
    .filter((row) => row.category || row.planned || row.actual || row.notes);
};

const addSpendingInputRow = (row = { category: "", planned: "", actual: "", type: "Want", notes: "" }) => {
  if (!spendingRows) return;
  const type = row.type || "Want";
  spendingRows.insertAdjacentHTML(
    "beforeend",
    `
      <tr>
        <td><input data-spending-field="category" value="${escapeHtml(row.category || "")}" placeholder="Groceries" autocomplete="off" /></td>
        <td class="number-cell"><input data-spending-field="planned" type="number" min="0" step="1" value="${escapeHtml(row.planned ?? "")}" placeholder="450" /></td>
        <td class="number-cell"><input data-spending-field="actual" type="number" min="0" step="1" value="${escapeHtml(row.actual ?? "")}" placeholder="500" /></td>
        <td class="type-cell">
          <select data-spending-field="type">
            <option value="Need"${type === "Need" ? " selected" : ""}>Need</option>
            <option value="Want"${type === "Want" ? " selected" : ""}>Want</option>
            <option value="Goal"${type === "Goal" ? " selected" : ""}>Goal</option>
          </select>
        </td>
        <td><input data-spending-field="notes" value="${escapeHtml(row.notes || "")}" placeholder="Optional note" autocomplete="off" /></td>
        <td class="action-cell"><button class="row-delete-button" data-delete-spending-row type="button" aria-label="Delete spending row">x</button></td>
      </tr>
    `
  );
};

const renderSpendingInputTable = () => {
  if (!spendingRows) return;
  spendingRows.innerHTML = "";
  const rows = restoredSpendingRows?.length ? restoredSpendingRows : DEFAULT_SPENDING_ROWS;
  rows.forEach(addSpendingInputRow);
};

const getSpendingStats = () => {
  const rows = getSpendingRows();
  const planned = rows.reduce((sum, row) => sum + row.planned, 0);
  const actual = rows.reduce((sum, row) => sum + row.actual, 0);
  const variance = planned - actual;
  const biggestLeak = rows
    .map((row) => ({ ...row, over: row.actual - row.planned }))
    .filter((row) => row.over > 0)
    .sort((a, b) => b.over - a.over)[0];
  const wantActual = rows.filter((row) => row.type === "Want").reduce((sum, row) => sum + row.actual, 0);
  const needActual = rows.filter((row) => row.type === "Need").reduce((sum, row) => sum + row.actual, 0);
  const goalActual = rows.filter((row) => row.type === "Goal").reduce((sum, row) => sum + row.actual, 0);
  const wantShare = actual ? (wantActual / actual) * 100 : 0;
  const overPct = planned ? ((actual - planned) / planned) * 100 : 0;
  let personality = "Balanced spender";
  let note = "Actual spending is close to the plan.";
  if (overPct > 15 && biggestLeak?.category?.toLowerCase().includes("food")) {
    personality = "Food budget pressure";
    note = "Food or convenience spending is pulling the plan upward.";
  } else if (wantShare > 42 && variance < 0) {
    personality = "Lifestyle upgrade risk";
    note = "Want spending is taking a large share of actual spending.";
  } else if (biggestLeak && biggestLeak.over >= 75) {
    personality = "Leak hunter";
    note = `${biggestLeak.category} is the biggest category above plan.`;
  } else if (variance > 0) {
    personality = "Discipline month";
    note = "Actual spending is below the plan.";
  }
  return { rows, planned, actual, variance, biggestLeak, wantActual, needActual, goalActual, wantShare, overPct, personality, note };
};

const getBudgetActionItems = () => {
  const savingsStats = getSavingsSnapshot();
  const spendingStats = getSpendingStats();
  const subscriptions = parseSubscriptionLines(document.querySelector("#subscriptionList")?.value);
  const nextSubscription = getNextSubscription(subscriptions);
  return [
    {
      id: "cash-flow",
      tone: savingsStats.leftover >= 0 ? "good" : "bad",
      title: savingsStats.leftover >= 0 ? "Protect positive cash flow" : "Close the cash-flow gap",
      detail: savingsStats.leftover >= 0
        ? `${currency(savingsStats.leftover)} is left after planned outflows. Decide where it goes before it gets spent.`
        : `Find ${currency(Math.abs(savingsStats.leftover))} by lowering spending, savings target, or bills for this month.`
    },
    {
      id: "biggest-leak",
      tone: spendingStats.biggestLeak ? "warn" : "good",
      title: spendingStats.biggestLeak ? `Review ${spendingStats.biggestLeak.category}` : "Review one flexible category",
      detail: spendingStats.biggestLeak
        ? `${spendingStats.biggestLeak.category} is ${currency(spendingStats.biggestLeak.over)} above plan. Pick one rule for the next 7 days.`
        : "No category is above plan yet. Choose one flexible category to watch this week."
    },
    {
      id: "runway",
      tone: savingsStats.runway >= 6 ? "good" : savingsStats.runway >= 3 ? "warn" : "bad",
      title: savingsStats.runway >= 3 ? "Maintain emergency runway" : "Build emergency runway",
      detail: `${formatNumber(savingsStats.runway, 1)} months covered. The next milestone is ${savingsStats.runway >= 6 ? "protecting it" : "getting closer to 3-6 months"}.`
    },
    {
      id: "recurring",
      tone: nextSubscription ? "warn" : "good",
      title: nextSubscription ? `Decide on ${nextSubscription.name}` : "Add recurring purchases",
      detail: nextSubscription
        ? `${currency(nextSubscription.amount)} is estimated in ${nextSubscription.daysAway} day${nextSubscription.daysAway === 1 ? "" : "s"}. Keep, cancel, downgrade, or pause it.`
        : "Track subscriptions so the app can warn you before the next charge."
    },
    {
      id: "decision-log",
      tone: "good",
      title: "Log the budget decision",
      detail: "Add one short note in My Plan so the budget has a memory, not just a number."
    }
  ];
};

const renderBudgetActionChecklist = () => {
  if (!budgetActionChecklist) return;
  const items = getBudgetActionItems();
  budgetActionChecklist.innerHTML = items
    .map((item) => {
      const done = completedBudgetActions.includes(item.id);
      return `
        <article class="budget-action-card ${item.tone} ${done ? "done" : ""}">
          <button type="button" data-budget-action="${escapeHtml(item.id)}" aria-pressed="${done}">
            <span>${done ? "Done" : "To do"}</span>
            <strong>${escapeHtml(item.title)}</strong>
          </button>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `;
    })
    .join("");
};

const toggleBudgetAction = (actionId) => {
  if (!actionId) return;
  completedBudgetActions = completedBudgetActions.includes(actionId)
    ? completedBudgetActions.filter((id) => id !== actionId)
    : [...completedBudgetActions, actionId];
  renderBudgetActionChecklist();
  saveAppState();
};

const renderSpendingTracker = () => {
  if (!spendingTotalPlanned) return;
  const stats = getSpendingStats();
  spendingTotalPlanned.textContent = currency(stats.planned);
  spendingTotalActual.textContent = currency(stats.actual);
  spendingVariance.textContent = currency(stats.variance);
  spendingVariance.classList.toggle("good-text", stats.variance >= 0);
  spendingVariance.classList.toggle("bad-text", stats.variance < 0);
  spendingVarianceNote.textContent = stats.variance >= 0
    ? `${currency(stats.variance)} under plan.`
    : `${currency(Math.abs(stats.variance))} over plan.`;
  spendingPersonality.textContent = stats.personality;
  spendingPersonalityNote.textContent = stats.note;
  renderMiniCards(spendingInsightGrid, [
    {
      tone: stats.variance >= 0 ? "good" : "bad",
      title: stats.variance >= 0 ? "Plan protected" : "Overspending pressure",
      detail: stats.variance >= 0 ? "Actual spending is under the planned total." : `Find ${currency(Math.abs(stats.variance))} in categories above plan.`
    },
    {
      tone: stats.biggestLeak ? "warn" : "good",
      title: "Biggest leak",
      detail: stats.biggestLeak ? `${stats.biggestLeak.category} is ${currency(stats.biggestLeak.over)} above plan.` : "No category is above plan yet."
    },
    {
      tone: stats.wantShare > 42 ? "warn" : "good",
      title: "Needs vs wants",
      detail: `${formatNumber(stats.wantShare, 0)}% of actual tracked spending is wants.`
    },
    {
      tone: "good",
      title: "Command Center link",
      detail: "Actual spending now feeds the Money Map and Smart Explainer."
    }
  ]);
};

const getNextSubscription = (subscriptions) => {
  if (!subscriptions.length) return null;
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return subscriptions
    .map((item) => {
      const dueDate = new Date(today.getFullYear(), today.getMonth(), item.billingDay);
      if (dueDate < startOfToday) dueDate.setMonth(dueDate.getMonth() + 1);
      const daysAway = Math.ceil((dueDate - startOfToday) / 86400000);
      return { ...item, dueDate, daysAway };
    })
    .sort((a, b) => a.daysAway - b.daysAway || b.amount - a.amount)[0];
};

const getActiveValue = (selector, attribute) => document.querySelector(`${selector}.active`)?.dataset?.[attribute];

const updateSaveStatus = (message = "Saved locally") => {
  if (!saveStatus) return;
  saveStatus.textContent = message;
};

const getPersistableInputValues = (inputs) =>
  Array.from(inputs).reduce((values, input) => {
    if (input.id) values[input.id] = input.value;
    return values;
  }, {});

const applySavedInputValues = (values = {}) => {
  Object.entries(values).forEach(([id, value]) => {
    const input = document.querySelector(`#${CSS.escape(id)}`);
    if (input) input.value = value;
  });
};

const FRESHNESS_LIMITS_MINUTES = {
  portfolio: 24 * 60,
  watchlist: 24 * 60,
  macro: 24 * 60,
  news: 90,
  market: 15,
  savings: 24 * 60,
  learning: 7 * 24 * 60,
  calculators: 24 * 60,
  charts: 24 * 60
};

const freshnessLabels = {
  portfolio: "Portfolio Data",
  watchlist: "Watchlist",
  macro: "Macro Data",
  news: "Market News",
  market: "Virtual Market",
  savings: "Savings Tools",
  learning: "Learning System",
  calculators: "Calculators",
  charts: "Charts & Scores"
};

const freshnessChecklist = {
  portfolio: "Reloads portfolio prices, risk, correlation, and holdings output when assets are entered.",
  watchlist: "Refreshes saved watchlist quotes from public market data.",
  macro: "Refreshes official-style macro context for rates, inflation, jobs, mortgages, bonds, and cash-flow pressure.",
  news: "Pulls recent headlines from the configured finance news sources.",
  market: "Updates paper-trading quotes and virtual portfolio performance.",
  savings: "Recalculates budget health, runway, debt pressure, spending, and subscriptions from local inputs.",
  learning: "Checks pathway progress, quiz results, weak areas, and missions stored in this browser.",
  calculators: "Recomputes TVM, intrinsic value, geometric average, risk, and simulator outputs.",
  charts: "Redraws portfolio, savings, learning, command center, and plan visuals."
};

const formatRelativeTime = (isoValue) => {
  if (!isoValue) return "Never refreshed";
  const minutes = Math.max(0, Math.round((Date.now() - new Date(isoValue).getTime()) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} hr ago`;
  return `${Math.round(hours / 24)} days ago`;
};

const freshnessTone = (key, item) => {
  if (!item?.updatedAt) return "warn";
  if (item.status === "failed") return "bad";
  if (item.status === "skipped") return "warn";
  const ageMinutes = (Date.now() - new Date(item.updatedAt).getTime()) / 60000;
  const limit = key === "portfolio" ? refreshSettings.portfolioStaleMinutes : FRESHNESS_LIMITS_MINUTES[key] || 60;
  return ageMinutes > limit ? "warn" : "good";
};

const renderDataFreshness = () => {
  if (!freshnessGrid) return;
  const keys = Object.keys(freshnessLabels);
  const tones = keys.map((key) => freshnessTone(key, dataFreshness[key]));
  const freshCount = tones.filter((tone) => tone === "good").length;
  const staleCount = tones.filter((tone) => tone === "warn").length;
  const failedCount = tones.filter((tone) => tone === "bad").length;
  if (updateCenterSummary) {
    updateCenterSummary.innerHTML = `
      <article><span>Fresh</span><strong>${freshCount}</strong><p>Areas recently checked.</p></article>
      <article><span>Needs Check</span><strong>${staleCount}</strong><p>Refresh or add inputs.</p></article>
      <article><span>Failed</span><strong>${failedCount}</strong><p>Public source issue or unavailable data.</p></article>
      <article><span>Auto Refresh</span><strong>${refreshSettings.marketMinutes ? `${refreshSettings.marketMinutes} min` : "Off"}</strong><p>Market quote polling.</p></article>
    `;
  }
  freshnessGrid.innerHTML = keys
    .map((key) => {
      const item = dataFreshness[key];
      const tone = freshnessTone(key, item);
      const label = item?.status === "skipped" ? "Needs Input" : tone === "good" ? "Fresh" : tone === "bad" ? "Failed" : "Stale";
      const source = item?.source || "Public source";
      const detail = item?.detail || (item?.updatedAt ? "Best-effort public data." : "Refresh to check this data area.");
      return `
        <article class="freshness-card ${tone}">
          <span>${freshnessLabels[key]}</span>
          <strong>${label} · ${formatRelativeTime(item?.updatedAt)}</strong>
          <p>${escapeHtml(source)} • ${escapeHtml(detail)}</p>
        </article>
      `;
    })
    .join("");
  if (updateChecklist) {
    updateChecklist.innerHTML = keys
      .map(
        (key) => `
          <article>
            <strong>${freshnessLabels[key]}</strong>
            <p>${freshnessChecklist[key]}</p>
          </article>
        `
      )
      .join("");
  }
  renderApiStatusPanel();
};

const holdingConfidence = (holding) => {
  const hasPrice = Number.isFinite(Number(holding.price));
  const hasHistory = Array.isArray(holding.returns) && holding.returns.length >= 30;
  const hasFundamentals =
    Number.isFinite(Number(holding.pe)) ||
    Number.isFinite(Number(holding.dividendYield)) ||
    Number.isFinite(Number(holding.marketCap));
  const ageDays = holding.dataAsOf ? Math.max(0, (Date.now() - new Date(`${holding.dataAsOf}T00:00:00`).getTime()) / 86400000) : Infinity;
  const score = (hasPrice ? 35 : 0) + (hasHistory ? 30 : 0) + (hasFundamentals ? 20 : 0) + (ageDays <= 3 ? 15 : ageDays <= 10 ? 7 : 0);
  const level = score >= 80 ? "High" : score >= 55 ? "Medium" : "Low";
  const tone = score >= 80 ? "good" : score >= 55 ? "warn" : "bad";
  const source = stockPilotApiOnline ? "API" : "Public";
  const detail = [
    hasPrice ? "price" : "no price",
    hasHistory ? "history" : "thin history",
    hasFundamentals ? "some fundamentals" : "limited fundamentals"
  ].join(", ");
  return { level, tone, source, detail };
};

const renderConfidenceBadge = (holding) => {
  const confidence = holdingConfidence(holding);
  return `
    <span class="confidence-badge ${confidence.tone}" title="${escapeHtml(confidence.detail)}">
      <strong>${escapeHtml(confidence.level)}</strong>
      <small>${escapeHtml(confidence.source)}</small>
    </span>
  `;
};

const formatQuoteTimestamp = (rawValue, fallbackDate = "") => {
  const numeric = Number(rawValue);
  if (Number.isFinite(numeric) && numeric > 0) {
    return new Date(numeric * 1000).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  }
  return fallbackDate || "";
};

const MACRO_FALLBACK = {
  updatedAt: "2026-05-08T00:00:00.000Z",
  source: "Built-in macro demo fallback. Refresh with the StockPilot API gateway for live FRED public data.",
  series: [
    { id: "FEDFUNDS", label: "Fed Funds Rate", unit: "%", latest: { date: "2026-03-01", value: 4.33 }, previous: { date: "2026-02-01", value: 4.33 }, yearAgo: { date: "2025-03-01", value: 4.33 } },
    { id: "DGS10", label: "10-Year Treasury Yield", unit: "%", latest: { date: "2026-05-07", value: 4.30 }, previous: { date: "2026-05-06", value: 4.27 }, yearAgo: { date: "2025-05-07", value: 4.27 } },
    { id: "CPIAUCSL", label: "CPI Index", unit: "index", latest: { date: "2026-03-01", value: 319.8 }, previous: { date: "2026-02-01", value: 319.1 }, yearAgo: { date: "2025-03-01", value: 311.9 } },
    { id: "UNRATE", label: "Unemployment Rate", unit: "%", latest: { date: "2026-03-01", value: 4.0 }, previous: { date: "2026-02-01", value: 3.9 }, yearAgo: { date: "2025-03-01", value: 4.1 } },
    { id: "MORTGAGE30US", label: "30-Year Mortgage Rate", unit: "%", latest: { date: "2026-05-07", value: 6.76 }, previous: { date: "2026-04-30", value: 6.73 }, yearAgo: { date: "2025-05-08", value: 6.76 } }
  ]
};

const getFallbackMacroData = () => ({
  ...MACRO_FALLBACK,
  updatedAt: new Date().toISOString(),
  series: MACRO_FALLBACK.series.map((item) => ({
    ...item,
    latest: { ...item.latest },
    previous: { ...item.previous },
    yearAgo: { ...item.yearAgo }
  }))
});

const macroSeriesById = (id) => (macroData?.series || MACRO_FALLBACK.series).find((series) => series.id === id);

const macroLatestValue = (id) => {
  const value = Number(macroSeriesById(id)?.latest?.value);
  return Number.isFinite(value) ? value : null;
};

const macroYearAgoChange = (id) => {
  const series = macroSeriesById(id);
  const latest = Number(series?.latest?.value);
  const yearAgo = Number(series?.yearAgo?.value);
  if (!Number.isFinite(latest) || !Number.isFinite(yearAgo)) return null;
  return latest - yearAgo;
};

const getMacroInflationYoY = () => {
  const cpi = macroSeriesById("CPIAUCSL");
  const latest = Number(cpi?.latest?.value);
  const yearAgo = Number(cpi?.yearAgo?.value);
  if (!Number.isFinite(latest) || !Number.isFinite(yearAgo) || yearAgo <= 0) return null;
  return ((latest - yearAgo) / yearAgo) * 100;
};

const getMacroSignals = () => {
  const fedFunds = macroLatestValue("FEDFUNDS");
  const tenYear = macroLatestValue("DGS10");
  const unemployment = macroLatestValue("UNRATE");
  const mortgage = macroLatestValue("MORTGAGE30US");
  const inflationYoY = getMacroInflationYoY();
  const unemploymentChange = macroYearAgoChange("UNRATE");
  return {
    fedFunds,
    tenYear,
    unemployment,
    mortgage,
    inflationYoY,
    unemploymentChange,
    highRates: (fedFunds !== null && fedFunds >= 4.5) || (tenYear !== null && tenYear >= 4),
    highInflation: inflationYoY !== null && inflationYoY >= 3,
    unemploymentElevated: (unemployment !== null && unemployment >= 5) || (unemploymentChange !== null && unemploymentChange >= 0.5),
    mortgageHigh: mortgage !== null && mortgage >= 6.5
  };
};

const formatMacroPercent = (value) => (value === null || !Number.isFinite(Number(value)) ? "N/A" : `${formatNumber(Number(value), 2)}%`);

const formatMacroDate = (date) => {
  if (!date) return "Date unavailable";
  const parsed = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const macroCard = ({ tone, label, term, value, detail, source }) => `
  <article class="macro-card ${tone}">
    <span>${escapeHtml(label)}${term ? ` <button class="info-button mini-info" data-term="${escapeHtml(term)}" type="button" aria-label="Explain ${escapeHtml(label)}">i</button>` : ""}</span>
    <strong>${escapeHtml(value)}</strong>
    <p>${escapeHtml(detail)}</p>
    <small>${escapeHtml(source)}</small>
  </article>
`;

const renderMacroDashboard = () => {
  if (!macroGrid || !macroImpactGrid) return;
  const data = macroData || getFallbackMacroData();
  const signals = getMacroSignals();
  const source = data.source || "FRED public macro data";
  const updated = data.updatedAt ? formatRelativeTime(data.updatedAt) : "Not refreshed";
  const series = (id) => data.series.find((item) => item.id === id);
  const fed = series("FEDFUNDS");
  const ten = series("DGS10");
  const cpi = series("CPIAUCSL");
  const jobs = series("UNRATE");
  const mortgage = series("MORTGAGE30US");
  if (macroStatus) {
    macroStatus.textContent = `${source}. Last checked: ${updated}. Educational context only, not investment advice.`;
  }
  macroGrid.innerHTML = [
    {
      tone: signals.highRates ? "warn" : "good",
      label: "Fed Funds Rate",
      term: "fedFunds",
      value: formatMacroPercent(signals.fedFunds),
      detail: `Policy-rate pressure. Latest FRED date: ${formatMacroDate(fed?.latest?.date)}.`,
      source: "Source: FRED"
    },
    {
      tone: signals.highRates ? "warn" : "good",
      label: "10-Year Treasury",
      term: "treasuryYield",
      value: formatMacroPercent(signals.tenYear),
      detail: `Useful for bond, mortgage, valuation, and real-estate context. Date: ${formatMacroDate(ten?.latest?.date)}.`,
      source: "Source: FRED"
    },
    {
      tone: signals.highInflation ? "warn" : "good",
      label: "Inflation YoY",
      term: "inflation",
      value: formatMacroPercent(signals.inflationYoY),
      detail: `Estimated from CPI index ${formatNumber(cpi?.latest?.value, 1)} vs one year ago.`,
      source: "Source: FRED CPI"
    },
    {
      tone: signals.unemploymentElevated ? "warn" : "good",
      label: "Unemployment",
      term: "unemployment",
      value: formatMacroPercent(signals.unemployment),
      detail: `Labor-market stress check. YoY move: ${formatMacroPercent(signals.unemploymentChange)}.`,
      source: "Source: FRED"
    },
    {
      tone: signals.mortgageHigh ? "warn" : "good",
      label: "30-Year Mortgage",
      term: "mortgageRate",
      value: formatMacroPercent(signals.mortgage),
      detail: `Housing-affordability and real-estate sensitivity input. Date: ${formatMacroDate(mortgage?.latest?.date)}.`,
      source: "Source: FRED"
    }
  ].map(macroCard).join("");

  const bondWeight = holdings.filter((holding) => holding.assetClass === "Bond").reduce((sum, holding) => sum + holding.allocation, 0);
  const realEstateWeight = holdings.filter((holding) => holding.assetClass === "Real Estate").reduce((sum, holding) => sum + holding.allocation, 0);
  const variableDebtPressure = getSavingsSnapshot().debtPressureValue;
  const impactCards = [
    {
      tone: signals.highRates ? "warn" : "good",
      title: "Rates and bonds",
      detail: signals.highRates
        ? `Rates are elevated. Review duration risk if bond exposure is meaningful; your loaded bond weight is ${formatNumber(bondWeight, 0)}%.`
        : `Rates are not flashing extreme pressure in this demo. Bond exposure is ${formatNumber(bondWeight, 0)}%.`
    },
    {
      tone: signals.highInflation ? "warn" : "good",
      title: "Inflation and budgeting",
      detail: signals.highInflation
        ? "Inflation is above the usual 2% comfort zone. Recheck groceries, rent, utilities, and emergency-fund assumptions."
        : "Inflation pressure is calmer in this view. Keep the budget refreshed because price levels still compound over time."
    },
    {
      tone: signals.unemploymentElevated ? "warn" : "good",
      title: "Jobs and runway",
      detail: signals.unemploymentElevated
        ? "Labor-market stress is elevated. Emergency savings deserve priority before taking extra investment risk."
        : "The jobs signal is not elevated here. Emergency runway still matters because personal risk can differ from the national number."
    },
    {
      tone: signals.highRates && variableDebtPressure > 12 ? "bad" : signals.highRates ? "warn" : "good",
      title: "Rates and debt payoff",
      detail: signals.highRates
        ? `High rates can make variable debt expensive. Current debt-payment pressure is ${formatNumber(variableDebtPressure, 1)}% of income.`
        : `Rate pressure is less intense. Current debt-payment pressure is ${formatNumber(variableDebtPressure, 1)}% of income.`
    },
    {
      tone: signals.highRates && realEstateWeight > 10 ? "warn" : "good",
      title: "Portfolio context",
      detail: `Real-estate exposure is ${formatNumber(realEstateWeight, 0)}%. Higher yields can pressure real estate, long-duration growth, and refinancing-sensitive assets.`
    }
  ];
  macroImpactGrid.innerHTML = impactCards
    .map(
      (item) => `
        <article class="macro-impact-card ${item.tone}">
          <span>${escapeHtml(item.title)}</span>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
};

const fetchMacroData = async () => {
  if (refreshMacroButton) {
    refreshMacroButton.disabled = true;
    refreshMacroButton.textContent = "Refreshing...";
  }
  if (macroStatus) macroStatus.textContent = "Checking official macro series...";
  try {
    if (!stockPilotApiOnline) await checkStockPilotApi();
    if (stockPilotApiOnline) {
      const response = await fetch(`${stockPilotApiBaseUrl}/api/macro`);
      if (!response.ok) throw new Error(`Macro request failed (${response.status})`);
      macroData = await response.json();
      macroData.source = macroData.stockPilotMeta?.source || "FRED public macro data";
      macroData.updatedAt = macroData.stockPilotMeta?.updatedAt || macroData.updatedAt || new Date().toISOString();
      recordDataFreshness("macro", "success", "Fed funds, Treasury yield, CPI, unemployment, and mortgage-rate series refreshed.", "FRED via StockPilot API");
    } else {
      macroData = getFallbackMacroData();
      recordDataFreshness("macro", "skipped", "Start the StockPilot API gateway for live FRED data. Showing built-in demo context.", "Built-in macro fallback");
    }
  } catch (error) {
    macroData = getFallbackMacroData();
    recordDataFreshness("macro", "failed", "FRED gateway refresh failed; showing built-in demo context.", "Built-in macro fallback");
  } finally {
    renderMacroDashboard();
    renderCommandCenter();
    renderCopilotReport();
    renderSettings();
    renderPresentationMode();
    saveAppState();
    if (refreshMacroButton) {
      refreshMacroButton.disabled = false;
      refreshMacroButton.textContent = "Refresh Macro";
    }
  }
};

const recordDataFreshness = (key, status, detail, source = "Free public data") => {
  dataFreshness[key] = {
    updatedAt: new Date().toISOString(),
    status,
    detail,
    source
  };
  renderDataFreshness();
};

const withRefreshTimeout = (promise, key, source, timeoutMs = 12000) =>
  Promise.race([
    promise,
    new Promise((resolve) =>
      setTimeout(() => {
        recordDataFreshness(key, "failed", "Refresh timed out. Try again later.", source);
        resolve();
      }, timeoutMs)
    )
  ]);

const refreshAllData = async () => {
  if (!refreshAllDataButton) return;
  refreshAllDataButton.disabled = true;
  refreshAllDataButton.textContent = "Refreshing...";
  if (apiRefreshButton) {
    apiRefreshButton.disabled = true;
    apiRefreshButton.textContent = "Refreshing...";
  }
  try {
    await checkStockPilotApi();
    const hasPortfolioRows = parsePortfolioBuilderRows(bulkInput?.value || "").length > 0;
    if (!hasPortfolioRows && !holdings.length && bulkInput) {
      bulkInput.value = SAMPLE_BULK_PORTFOLIO;
      renderAssetInputTable();
      updateBulkStatus();
      if (fetchStatus) fetchStatus.textContent = "No portfolio was loaded, so StockPilot added the real demo tickers first.";
    }
    if (!watchlistSymbols().length && watchlistInput) {
      watchlistInput.value = "AAPL, MSFT, NVDA, BND, VNQ, GLD, BTC-USD";
    }
    if (marketWatchlistInput && !parseTickerList(marketWatchlistInput.value).length) {
      marketWatchlistInput.value = "AAPL, MSFT, NVDA, BND, VNQ, GLD, BTC-USD";
    }
    const tasks = [];
    if (parsePortfolioBuilderRows(bulkInput?.value || "").length) {
      tasks.push(withRefreshTimeout(loadPortfolioBuilderStocks(), "portfolio", "User portfolio"));
    } else {
      recordDataFreshness("portfolio", "skipped", "Add assets in Portfolio Builder to refresh holdings data.", "User portfolio");
    }
    if (watchlistSymbols().length) {
      tasks.push(withRefreshTimeout(renderWatchlist(), "watchlist", "User watchlist"));
    } else {
      recordDataFreshness("watchlist", "skipped", "Add tickers to the watchlist before refreshing.", "User watchlist");
    }
    tasks.push(withRefreshTimeout(fetchMacroData(), "macro", stockPilotApiOnline ? "FRED via StockPilot API" : "Built-in macro fallback"));
    tasks.push(withRefreshTimeout(refreshMarketNews(), "news", "Public RSS feeds"));
    if (virtualMarketSymbols().length) tasks.push(withRefreshTimeout(updateMarketQuotes(), "market", "Free public quotes"));
    else recordDataFreshness("market", "skipped", "Add virtual market symbols before refreshing.", "Paper trading");

    await Promise.allSettled(tasks);
    renderSavingsBudget();
    updateCalculators();
    renderSimulator();
    renderPortfolioGraphs();
    renderLearningCharts();
    renderLearningPath();
    renderLearningPractice();
    renderLearningDashboard();
    renderMyPlan();
    renderCommandCenter();
    renderCopilotReport();
    recordDataFreshness("savings", "success", "Budget, spending, subscriptions, runway, goals, and debt tools recalculated.", "Local inputs");
    recordDataFreshness("learning", "success", "Learning roadmap, pathway, quiz state, weak areas, and missions checked.", "Built-in curriculum");
    recordDataFreshness("calculators", "success", "TVM, intrinsic value, geometric average, and scenario calculators recalculated.", "Local formulas");
    recordDataFreshness("charts", "success", "Visible charts, scores, command center, and plan visuals redrawn.", "Local rendering");
    renderDataFreshness();
    saveAppState();
  } finally {
    refreshAllDataButton.disabled = false;
    refreshAllDataButton.textContent = "Refresh Everything";
    if (apiRefreshButton) {
      apiRefreshButton.disabled = false;
      apiRefreshButton.textContent = "Refresh Real Data";
    }
  }
};

const loadRealDemoData = async () => {
  if (loadRealDemoButton) {
    loadRealDemoButton.disabled = true;
    loadRealDemoButton.textContent = "Loading...";
  }
  try {
    if (bulkInput) bulkInput.value = SAMPLE_BULK_PORTFOLIO;
    if (watchlistInput) watchlistInput.value = "AAPL, MSFT, NVDA, BND, VNQ, GLD, BTC-USD";
    if (marketWatchlistInput) marketWatchlistInput.value = "AAPL, MSFT, NVDA, BND, VNQ, GLD, BTC-USD";
    renderAssetInputTable();
    updateBulkStatus();
    await checkStockPilotApi();
    await loadPortfolioBuilderStocks();
    await Promise.allSettled([fetchMacroData(), refreshMarketNews(), renderWatchlist(), updateMarketQuotes()]);
    setMoneyMode("investing");
    switchView("portfolio");
    if (apiStatusNote) {
      apiStatusNote.textContent = "Real demo portfolio loaded. Portfolio, macro, news, watchlist, and paper-market data were refreshed where providers allowed.";
      apiStatusNote.classList.add("good-text");
      apiStatusNote.classList.remove("bad-text");
    }
  } finally {
    if (loadRealDemoButton) {
      loadRealDemoButton.disabled = false;
      loadRealDemoButton.textContent = "Load Real Demo Portfolio";
    }
  }
};

const runDemoRoute = (route) => {
  if (route === "real-data") {
    setMoneyMode("command");
    document.querySelector(".api-command-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (route === "portfolio") {
    setMoneyMode("investing");
    switchView("portfolio");
  } else if (route === "research") {
    setMoneyMode("investing");
    switchView("research");
  } else if (route === "savings") {
    setMoneyMode("savings");
    showSavingsPanel("plan");
  } else if (route === "learning") {
    setMoneyMode("education");
    showLearningArea("pathway");
  } else if (route === "plan") {
    setMoneyMode("plan");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const syncRefreshSettingsInputs = () => {
  if (marketRefreshInterval) marketRefreshInterval.value = String(refreshSettings.marketMinutes);
  if (newsRefreshInterval) newsRefreshInterval.value = String(refreshSettings.newsMinutes);
  if (portfolioStaleAfter) portfolioStaleAfter.value = String(refreshSettings.portfolioStaleMinutes);
  if (settingsMarketRefresh) settingsMarketRefresh.value = String(refreshSettings.marketMinutes);
  if (settingsNewsRefresh) settingsNewsRefresh.value = String(refreshSettings.newsMinutes);
  if (settingsPortfolioStale) settingsPortfolioStale.value = String(refreshSettings.portfolioStaleMinutes);
};

const applyRefreshSettings = () => {
  refreshSettings.marketMinutes = Number(marketRefreshInterval?.value) || 0;
  refreshSettings.newsMinutes = Number(newsRefreshInterval?.value) || 0;
  refreshSettings.portfolioStaleMinutes = Number(portfolioStaleAfter?.value) || 1440;
  virtualMarket.autoRefresh = refreshSettings.marketMinutes > 0;
  setMarketPolling(virtualMarket.autoRefresh);
  syncRefreshSettingsInputs();
  renderDataFreshness();
  renderSettings();
  saveAppState();
};

const saveAppState = () => {
  const activeMode = getActiveValue("[data-mode]", "mode") || "command";
  const activeExperience = getActiveValue("[data-experience]", "experience") || "beginner";
  const activeSavings = getActiveValue("[data-savings-tab]", "savingsTab") || "plan";
  const activeLearning = getActiveValue("[data-learn-panel]", "learnPanel") || "tips";
  const activeInvestingView = getActiveValue("[data-view]", "view") || "portfolio";
  const state = {
    activeMode,
    activeExperience,
    activeSavings,
    activeLearning,
    activeInvestingView,
    bulkInput: bulkInput?.value || "",
    savings: getPersistableInputValues(savingsInputs),
    calculators: getPersistableInputValues(calculatorInputs),
    simulator: getPersistableInputValues(simulatorInputs),
    spendingRows: getSpendingRows(),
    insuranceRows: getInsuranceRows(),
    decisionJournal: decisionJournal.slice(0, 80),
    earlyAccessLeads: earlyAccessLeads.slice(0, 100),
    serviceRequests: serviceRequests.slice(0, 100),
    portfolioTheses,
    completedBudgetActions: completedBudgetActions.slice(0, 80),
    moneyGoals: moneyGoals.slice(0, 80),
    dataFreshness,
    macroData,
    refreshSettings,
    completedLessons,
    learningQuizResults,
    completedLearningMissions,
    holdings: holdings.slice(0, 80),
    savedAt: new Date().toISOString()
  };
  localStorage.setItem(APP_STATE_KEY, JSON.stringify(state));
  updateSaveStatus("Saved locally");
};

const scheduleSaveAppState = () => {
  updateSaveStatus("Saving...");
  clearTimeout(saveStateTimer);
  saveStateTimer = setTimeout(saveAppState, 250);
};

const restoreAppState = () => {
  try {
    const state = JSON.parse(localStorage.getItem(APP_STATE_KEY) || "{}");
    if (!state || typeof state !== "object") return;
    restoredMode = state.activeMode || "command";
    restoredSavingsPanel = normalizeSavingsPanel(state.activeSavings || "plan");
    restoredLearningPanel = state.activeLearning || "tips";
    if (state.bulkInput !== undefined && bulkInput) bulkInput.value = state.bulkInput;
    applySavedInputValues(state.savings);
    applySavedInputValues(state.calculators);
    applySavedInputValues(state.simulator);
    if (Array.isArray(state.spendingRows)) restoredSpendingRows = state.spendingRows;
    if (Array.isArray(state.insuranceRows)) restoredInsuranceRows = state.insuranceRows;
    if (Array.isArray(state.decisionJournal)) decisionJournal = state.decisionJournal;
    if (Array.isArray(state.earlyAccessLeads)) earlyAccessLeads = state.earlyAccessLeads;
    if (Array.isArray(state.serviceRequests)) serviceRequests = state.serviceRequests;
    if (state.portfolioTheses && typeof state.portfolioTheses === "object") portfolioTheses = state.portfolioTheses;
    if (Array.isArray(state.completedBudgetActions)) completedBudgetActions = [...new Set(state.completedBudgetActions)].filter(Boolean);
    if (Array.isArray(state.moneyGoals)) moneyGoals = state.moneyGoals;
    if (state.dataFreshness && typeof state.dataFreshness === "object") dataFreshness = { ...dataFreshness, ...state.dataFreshness };
    if (state.macroData && typeof state.macroData === "object") macroData = state.macroData;
    if (state.refreshSettings && typeof state.refreshSettings === "object") refreshSettings = { ...refreshSettings, ...state.refreshSettings };
    if (Array.isArray(state.completedLessons)) completedLessons = [...new Set(state.completedLessons)].filter(Boolean);
    if (state.learningQuizResults && typeof state.learningQuizResults === "object") learningQuizResults = state.learningQuizResults;
    if (Array.isArray(state.completedLearningMissions)) completedLearningMissions = [...new Set(state.completedLearningMissions)].filter(Boolean);
    if (Array.isArray(state.holdings)) holdings = state.holdings;
    setExperienceMode(state.activeExperience || "beginner");
    if (state.activeInvestingView && sectionSelect) sectionSelect.value = state.activeInvestingView;
  } catch {
    localStorage.removeItem(APP_STATE_KEY);
  }
};

const completeOnboarding = () => {
  localStorage.setItem(ONBOARDING_KEY, "true");
  if (onboardingOverlay) onboardingOverlay.hidden = true;
};

const showOnboardingIfNeeded = () => {
  if (!onboardingOverlay) return;
  onboardingOverlay.hidden = localStorage.getItem(ONBOARDING_KEY) === "true";
};

const closeOnboarding = () => {
  if (onboardingOverlay) onboardingOverlay.hidden = true;
};

const handleOnboardingAction = (action) => {
  completeOnboarding();
  if (action === "budget") {
    setMoneyMode("savings");
    showSavingsPanel("plan");
  } else if (action === "goals") {
    setMoneyMode("goals");
  } else if (action === "portfolio") {
    setMoneyMode("investing");
    switchView("portfolio");
  } else if (action === "learning") {
    setMoneyMode("education");
    showLearningArea("pathway");
  } else {
    setMoneyMode("command");
  }
};

const renderSavingsBudget = () => {
  if (!budgetHealthScore) return;
  const income = readSavingsNumber("monthlyIncome");
  const fixed = readSavingsNumber("fixedBills");
  const flexible = readSavingsNumber("flexSpending");
  const savings = readSavingsNumber("monthlySavings");
  const debt = readSavingsNumber("debtPayments");
  const emergency = readSavingsNumber("emergencyFund");
  const spendingStats = getSpendingStats();
  const goalName = document.querySelector("#goalName")?.value || "Savings goal";
  const goalTarget = readSavingsNumber("goalTarget");
  const goalSaved = readSavingsNumber("goalSaved");
  const goalMonthly = readSavingsNumber("goalMonthly");
  const debtBalance = readSavingsNumber("debtBalance");
  const debtApr = readSavingsNumber("debtApr");
  const debtMinimum = readSavingsNumber("debtMinimum");
  const debtExtra = readSavingsNumber("debtExtra");
  const stressIncomeDrop = readSavingsNumber("stressIncomeDrop");
  const stressExtraCost = readSavingsNumber("stressExtraCost");
  const stressOneTime = readSavingsNumber("stressOneTime");
  const stressMonths = Math.max(1, readSavingsNumber("stressMonths"));
  const subscriptions = parseSubscriptionLines(document.querySelector("#subscriptionList")?.value);
  const tradeoffCash = readSavingsNumber("tradeoffCash");
  const paycheckAmount = readSavingsNumber("paycheckAmount");
  const paycheckCount = Math.max(1, readSavingsNumber("paycheckCount"));
  const spending = fixed + flexible + debt;
  const plannedOutflow = spending + savings;
  const leftover = income - plannedOutflow;
  const actualOutflow = fixed + spendingStats.actual + debt + savings;
  const actualLeftover = income - actualOutflow;
  const savingsRateValue = income > 0 ? (savings / income) * 100 : 0;
  const debtPressureValue = income > 0 ? (debt / income) * 100 : 0;
  const runway = spending > 0 ? emergency / spending : 0;
  const goalRemaining = Math.max(goalTarget - goalSaved, 0);
  const monthsToGoal = goalMonthly > 0 ? Math.ceil(goalRemaining / goalMonthly) : Infinity;
  const healthScore = clamp(
    45 + Math.min(savingsRateValue, 25) * 1.2 + Math.min(runway, 6) * 4 - Math.max(debtPressureValue - 12, 0) * 1.5 + (leftover >= 0 ? 10 : -18),
    0,
    100
  );

  drawSavingsBudgetFlow({ income, fixed, flexible, debt, savings, leftover });
  drawSavingsMix({ savings, debt, leftover });
  if (budgetFlowSummary) {
    const usedPct = income > 0 ? (plannedOutflow / income) * 100 : 0;
    budgetFlowSummary.innerHTML = `
      <span class="${leftover >= 0 ? "good" : "bad"}">${leftover >= 0 ? "Positive flow" : "Gap detected"}: ${leftover >= 0 ? currency(leftover) : currency(Math.abs(leftover))}</span>
      <span>${formatNumber(usedPct, 0)}% of income assigned</span>
      <span>${currency(savings)} saved monthly</span>
    `;
  }
  if (savingsMixSummary) {
    const mixTotal = Math.max(savings + debt + Math.max(leftover, 0), 1);
    savingsMixSummary.innerHTML = `
      <span class="${savings > debt ? "good" : "warn"}">Savings ${formatNumber((savings / mixTotal) * 100, 0)}%</span>
      <span>Debt ${formatNumber((debt / mixTotal) * 100, 0)}%</span>
      <span>Leftover ${formatNumber((Math.max(leftover, 0) / mixTotal) * 100, 0)}%</span>
    `;
  }

  budgetHealthScore.textContent = Math.round(healthScore);
  budgetHealthLabel.textContent = healthScore >= 75 ? "Strong cash-flow setup." : healthScore >= 55 ? "Stable, with room to tune." : "Needs attention this month.";
  if (budgetPlanResult && budgetPlanResultDetail) {
    budgetPlanResult.textContent = leftover >= 0 ? `${currency(leftover)} left` : `${currency(Math.abs(leftover))} gap`;
    budgetPlanResult.classList.toggle("good-text", leftover >= 0);
    budgetPlanResult.classList.toggle("bad-text", leftover < 0);
    budgetPlanResultDetail.textContent = leftover >= 0
      ? `${currency(plannedOutflow)} planned outflow from ${currency(income)} income. Actual tracked spending leaves ${currency(actualLeftover)}.`
      : `Planned outflow is ${currency(Math.abs(leftover))} above income before any surprise costs.`;
  }
  monthlyLeftover.textContent = currency(leftover);
  monthlyLeftover.classList.toggle("good-text", leftover >= 0);
  monthlyLeftover.classList.toggle("bad-text", leftover < 0);
  leftoverNote.textContent = actualLeftover < leftover
    ? `Tracked actual spending leaves ${currency(actualLeftover)} after savings.`
    : leftover >= 0
      ? "Planned cash flow is positive."
      : "Spending plan is above income.";
  savingsRate.textContent = `${formatNumber(savingsRateValue, 1)}%`;
  savingsRateNote.textContent = savingsRateValue >= 20 ? "Strong savings rate." : savingsRateValue >= 10 ? "Healthy start." : "Try nudging this higher.";
  emergencyRunway.textContent = `${formatNumber(runway, 1)} months`;
  runwayNote.textContent = runway >= 6 ? "Excellent emergency cushion." : runway >= 3 ? "Solid basic cushion." : "Build toward 3-6 months.";
  debtPressure.textContent = `${formatNumber(debtPressureValue, 1)}%`;
  debtPressure.classList.toggle("bad-text", debtPressureValue > 20);
  debtPressureNote.textContent = debtPressureValue > 20 ? "Debt payments are taking a lot of income." : "Debt load looks manageable.";
  goalTimelineLabel.textContent = goalName;
  goalTimeline.textContent = Number.isFinite(monthsToGoal) ? `${monthsToGoal} month${monthsToGoal === 1 ? "" : "s"}` : "No plan";
  goalTimelineDetail.textContent = goalRemaining <= 0
    ? "Goal is already funded."
    : goalMonthly > 0
      ? `${currency(goalRemaining)} left at ${currency(goalMonthly)} per month.`
      : "Add monthly goal savings to calculate a timeline.";
  const debtPaymentPlan = debtMinimum + debtExtra;
  const monthlyDebtRate = debtApr / 100 / 12;
  let payoffMonths = Infinity;
  if (debtBalance <= 0) payoffMonths = 0;
  else if (debtPaymentPlan > 0 && monthlyDebtRate === 0) payoffMonths = Math.ceil(debtBalance / debtPaymentPlan);
  else if (debtPaymentPlan > debtBalance * monthlyDebtRate) {
    payoffMonths = Math.ceil(-Math.log(1 - (monthlyDebtRate * debtBalance) / debtPaymentPlan) / Math.log(1 + monthlyDebtRate));
  }
  if (debtPayoffTime && debtPayoffDetail) {
    debtPayoffTime.textContent = Number.isFinite(payoffMonths) ? `${payoffMonths} month${payoffMonths === 1 ? "" : "s"}` : "Not shrinking";
    debtPayoffDetail.textContent = debtBalance <= 0
      ? "No debt balance entered."
      : Number.isFinite(payoffMonths)
        ? `${currency(debtPaymentPlan)} per month on ${currency(debtBalance)} at ${formatNumber(debtApr, 1)}% APR.`
        : "Payment does not cover enough interest to reduce the balance.";
  }
  const stressedIncome = income * (1 - stressIncomeDrop / 100);
  const stressedMonthlyGap = stressedIncome - plannedOutflow - stressExtraCost;
  const totalStressCost = Math.max(0, -stressedMonthlyGap) * stressMonths + stressOneTime;
  const fundAfterStress = emergency - totalStressCost;
  if (stressResult && stressDetail) {
    stressResult.textContent = fundAfterStress >= 0 ? `${currency(fundAfterStress)} left` : `${currency(Math.abs(fundAfterStress))} gap`;
    stressResult.classList.toggle("good-text", fundAfterStress >= 0);
    stressResult.classList.toggle("bad-text", fundAfterStress < 0);
    stressDetail.textContent = `${formatNumber(stressIncomeDrop, 0)}% income drop, ${currency(stressExtraCost)} extra monthly cost, and ${currency(stressOneTime)} one-time shock for ${stressMonths} months.`;
  }
  renderMiniCards(stressCoachGrid, [
    {
      tone: fundAfterStress >= 0 ? "good" : "bad",
      title: fundAfterStress >= 0 ? "Shock survives" : "Runway breaks",
      detail: fundAfterStress >= 0 ? "Emergency cash covers this test without going negative." : `Find ${currency(Math.abs(fundAfterStress))} through cuts, income, insurance, or timeline changes.`
    },
    {
      tone: stressedMonthlyGap >= 0 ? "good" : "warn",
      title: "Monthly stress gap",
      detail: stressedMonthlyGap >= 0 ? `${currency(stressedMonthlyGap)} remains each stressed month.` : `${currency(Math.abs(stressedMonthlyGap))} short each stressed month.`
    }
  ]);
  const subscriptionSum = subscriptions.reduce((sum, item) => sum + item.amount, 0);
  const leakCandidates = subscriptions.filter((item) => item.amount >= 12);
  const nextSubscription = getNextSubscription(subscriptions);
  if (subscriptionTotal && subscriptionDetail) {
    subscriptionTotal.textContent = currency(subscriptionSum);
    subscriptionDetail.textContent = `${subscriptions.length} recurring item${subscriptions.length === 1 ? "" : "s"} entered. Annualized: ${currency(subscriptionSum * 12)}.`;
  }
  if (nextSubscriptionName && nextSubscriptionDetail && subscriptionReminder) {
    if (nextSubscription) {
      nextSubscriptionName.textContent = `${nextSubscription.name} ${currency(nextSubscription.amount)}`;
      nextSubscriptionDetail.textContent = `Estimated charge in ${nextSubscription.daysAway} day${nextSubscription.daysAway === 1 ? "" : "s"} on ${nextSubscription.dueDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}. Decide before it renews.`;
      subscriptionReminder.classList.toggle("reminder-urgent", nextSubscription.daysAway <= 3);
    } else {
      nextSubscriptionName.textContent = "No reminder";
      nextSubscriptionDetail.textContent = "Add subscriptions to see the next recurring purchase.";
      subscriptionReminder.classList.remove("reminder-urgent");
    }
  }
  renderMiniCards(
    subscriptionGrid,
    (leakCandidates.length ? leakCandidates : subscriptions.slice(0, 2)).map((item) => ({
      tone: item.amount >= 25 ? "bad" : "warn",
      title: item.name,
      detail: `${currency(item.amount)} per month, due around day ${item.billingDay}. Annualized: ${currency(item.amount * 12)}. Ask: still worth it?`
    }))
  );
  renderInsuranceCheckup();
  const tradeWeights = [
    ["Emergency", "tradeoffEmergency"],
    ["Debt", "tradeoffDebt"],
    ["Invest", "tradeoffInvest"],
    ["Misc", "tradeoffFun"]
  ].map(([label, inputId]) => ({
    label,
    value: readSavingsNumber(inputId)
  }));
  const tradeTotal = tradeWeights.reduce((sum, item) => sum + item.value, 0) || 1;
  const topTradeoff = tradeWeights.reduce((top, item) => (item.value > top.value ? item : top), tradeWeights[0]);
  if (tradeoffResult && tradeoffResultDetail) {
    tradeoffResult.textContent = `${currency(tradeoffCash)} split`;
    tradeoffResultDetail.textContent = `${topTradeoff.label} gets the biggest share at ${currency((tradeoffCash * topTradeoff.value) / tradeTotal)} per month. Total slider weight is ${formatNumber(tradeTotal, 0)}%.`;
  }
  renderMiniCards(
    tradeoffGrid,
    tradeWeights.map((item) => ({
      tone: item.label === "Misc" ? "warn" : "good",
      title: item.label,
      detail: `${currency((tradeoffCash * item.value) / tradeTotal)} per month (${formatNumber((item.value / tradeTotal) * 100, 0)}% of extra cash).`
    }))
  );
  const paycheckSplits = [
    ["Bills", readSavingsNumber("paycheckBills")],
    ["Savings", readSavingsNumber("paycheckSavings")],
    ["Debt", readSavingsNumber("paycheckDebt")],
    ["Misc", readSavingsNumber("paycheckFun")]
  ];
  const paycheckTotalPct = paycheckSplits.reduce((sum, [, pct]) => sum + pct, 0) || 1;
  const monthlyPaycheckTotal = paycheckAmount * paycheckCount;
  if (paycheckResult && paycheckResultDetail) {
    paycheckResult.textContent = `${currency(monthlyPaycheckTotal)} monthly`;
    paycheckResult.classList.toggle("good-text", paycheckTotalPct === 100);
    paycheckResult.classList.toggle("bad-text", paycheckTotalPct !== 100);
    paycheckResultDetail.textContent = paycheckTotalPct === 100
      ? `${currency(paycheckAmount)} split cleanly across ${paycheckCount} paycheck${paycheckCount === 1 ? "" : "s"} per month.`
      : `Your split totals ${formatNumber(paycheckTotalPct, 0)}%, so the app normalizes the buckets until they add up cleanly.`;
  }
  renderMiniCards(
    paycheckGrid,
    paycheckSplits.map(([label, pct]) => ({
      tone: paycheckTotalPct === 100 ? "good" : "warn",
      title: label,
      detail: `${currency((paycheckAmount * pct) / paycheckTotalPct)} per paycheck, ${currency(((paycheckAmount * pct) / paycheckTotalPct) * paycheckCount)} per month.`
    }))
  );

  const coachItems = [
    {
      tone: leftover >= 0 ? "good" : "bad",
      title: leftover >= 0 ? "Cash flow positive" : "Cash flow gap",
      detail: leftover >= 0 ? `${currency(leftover)} remains after planned spending and savings.` : `You are short by ${currency(Math.abs(leftover))} under this plan.`
    },
    {
      tone: savingsRateValue >= 15 ? "good" : savingsRateValue >= 8 ? "warn" : "bad",
      title: "Savings rhythm",
      detail: `${formatNumber(savingsRateValue, 1)}% of income is going to savings before extra goal tracking.`
    },
    {
      tone: runway >= 6 ? "good" : runway >= 3 ? "warn" : "bad",
      title: "Emergency fund",
      detail: `${formatNumber(runway, 1)} months of essential spending covered.`
    },
    {
      tone: debtPressureValue <= 12 ? "good" : debtPressureValue <= 20 ? "warn" : "bad",
      title: "Debt pressure",
      detail: `${formatNumber(debtPressureValue, 1)}% of income goes to debt payments.`
    }
  ];

  renderMiniCards(budgetCoachGrid, [
    ...coachItems,
    {
      tone: "good",
      title: "No-shame coach",
      detail: leftover < 0 ? "The plan is overloaded. That is a design problem to solve, not a character flaw." : "The plan has breathing room. Protect that margin before adding new commitments."
    }
  ]);
  renderBudgetActionChecklist();
  renderSpendingTracker();
  renderCommandCenter();
};

const setMoneyMode = (mode) => {
  const isCommand = mode === "command";
  const isPlan = mode === "plan";
  const isGoals = mode === "goals";
  const isSavings = mode === "savings";
  const isEducation = mode === "education";
  document.body.classList.toggle("command-mode", isCommand);
  document.body.classList.toggle("plan-mode", isPlan);
  document.body.classList.toggle("goals-mode", isGoals);
  document.body.classList.toggle("investing-mode", !isCommand && !isPlan && !isGoals && !isSavings && !isEducation);
  document.body.classList.toggle("savings-mode", isSavings);
  document.body.classList.toggle("education-mode", isEducation);
  brandTitle.textContent = isCommand ? "StockPilot" : isPlan ? "PlanPilot" : isGoals ? "GoalPilot" : isSavings ? "BudgetPilot" : isEducation ? "LearnPilot" : "StockPilot";
  brandSubtitle.textContent = isCommand
    ? "A financial command center for real-life decisions."
    : isPlan
    ? "Weekly actions and decision tracking."
    : isGoals
    ? "Simple progress tracking for money goals."
    : isSavings
    ? "Simple tools for cash flow and savings."
    : isEducation
      ? "Short lessons for money confidence."
      : "Simple tools for smarter portfolio practice.";
  modeDisclaimer.textContent = isCommand
    ? "This command center is educational and planning-focused. It is not financial, tax, legal, or investment advice."
    : isPlan
    ? "Plans and journal prompts are educational organization tools, not financial, tax, legal, or investment advice."
    : isGoals
    ? "Goals are planning estimates based on your inputs. They are not financial, tax, legal, or investment advice."
    : isSavings
    ? "This app supports budgeting education, not legal, tax, or financial advice. Verify your real numbers before acting."
    : isEducation
      ? "Learning cards are educational summaries. Use them as starting points, not personal financial advice."
      : "This app supports analysis, not financial advice. Verify all figures before making investment decisions.";
  workspaceEyebrow.textContent = isCommand ? "StockPilot OS" : isPlan ? "StockPilot Plan" : isGoals ? "StockPilot Goals" : isSavings ? "StockPilot Money" : isEducation ? "StockPilot Learning" : "StockPilot";
  workspaceTitle.textContent = isCommand
    ? "Run your financial life from one calm dashboard."
    : isPlan
    ? "Turn insights into weekly action and decision memory."
    : isGoals
    ? "Track goals and connect them to your money habits."
    : isSavings
    ? "Build a budget, protect your cash, and track savings goals."
    : isEducation
      ? "Learn finance through tips, concepts, and historical lessons."
      : "Build, test, and understand a portfolio with simple asset tools.";
  workspaceCopy.textContent = isCommand
    ? "Use the Command Center to connect portfolio risk, budget pressure, global market context, and learning into one decision view."
    : isPlan
    ? "Use My Plan to see the highest-priority actions and keep a local journal of why decisions were made."
    : isGoals
    ? "Use Goals to turn emergency funds, debt payoff, investing, and big purchases into clear progress cards."
    : isSavings
    ? "Use a separate blue workspace for monthly cash flow, emergency runway, debt pressure, and goal planning."
    : isEducation
      ? "Use a separate learning workspace for beginner tips, historical facts, core concepts, and quick review cards."
      : "Analyze holdings, compare risk, read market context, and practice decisions in one clean workspace.";
  workspaceTags.innerHTML = isCommand
    ? "<span>Money map</span><span>Life simulator</span><span>Global pulse</span>"
    : isPlan
    ? "<span>Weekly actions</span><span>Decision journal</span><span>Saved locally</span>"
    : isGoals
    ? "<span>Progress bars</span><span>Monthly target</span><span>Simple tracking</span>"
    : isSavings
    ? "<span>Budget health</span><span>Goal timeline</span><span>Educational</span>"
    : isEducation
      ? "<span>Guided pathway</span><span>Historical facts</span><span>Quick checks</span>"
      : "<span>Free public data</span><span>Paper trading</span><span>Educational</span>";
  modeButtons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (workspaceSelect && workspaceSelect.value !== mode) workspaceSelect.value = mode;
  if (isCommand) renderCommandCenter();
  if (isPlan) renderMyPlan();
  if (isGoals) renderGoalsHub();
  if (isSavings) showSavingsPanel(savingsPanelSelect?.value || "plan");
  if (isEducation) {
    renderLearningCharts();
    renderLearningPath();
    renderLearningPractice();
    renderLearningDashboard();
    showLearningArea("overview", false);
  }
  scheduleSaveAppState();
};

const showLearningArea = (area, shouldSave = true, requestedPanel = "") => {
  if (area === "library") showLearningPanel(requestedPanel || "tips", false);
  const activeLibraryPanel = requestedPanel || getActiveValue("[data-learn-panel]", "learnPanel") || "tips";
  learningAreaButtons.forEach((button) => {
    const active =
      button.dataset.learningArea === area &&
      (area !== "library" || button.dataset.defaultPanel === activeLibraryPanel);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (learningAreaSelect) {
    const selectValue = area === "library" ? `library:${activeLibraryPanel}` : area;
    if (learningAreaSelect.value !== selectValue) learningAreaSelect.value = selectValue;
  }
  learningAreaPanels.forEach((panel) => {
    panel.hidden = panel.dataset.learningAreaPanel !== area;
  });
  if (area === "overview" || area === "library") renderLearningCharts();
  if (area === "pathway") renderLearningPath();
  if (area === "practice") {
    showLearningPanel("quiz", false);
    renderLearningPractice();
  }
  if (shouldSave) scheduleSaveAppState();
};

const showLearningPanel = (panel, shouldSwitchArea = true) => {
  learningButtons.forEach((button) => {
    const active = button.dataset.learnPanel === panel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-education-panel]").forEach((section) => {
    section.classList.toggle("active", section.dataset.educationPanel === panel);
  });
  renderLearningCharts();
  renderLearningPath();
  if (panel === "quiz") renderLearningPractice();
  renderLearningDashboard();
  if (shouldSwitchArea) {
    const area = panel === "quiz" ? "practice" : "library";
    if (learningAreaSelect) {
      const selectValue = area === "library" ? `library:${panel}` : area;
      if (learningAreaSelect.value !== selectValue) learningAreaSelect.value = selectValue;
    }
    learningAreaButtons.forEach((button) => {
      const active = button.dataset.learningArea === area && (area !== "library" || button.dataset.defaultPanel === panel);
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    learningAreaPanels.forEach((section) => {
      section.hidden = section.dataset.learningAreaPanel !== area;
    });
  }
  scheduleSaveAppState();
};

const getLearningLessons = () =>
  LEARNING_PATH_UNITS.flatMap((unit, unitIndex) =>
    unit.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      unitTitle: unit.title,
      unitTheme: unit.theme,
      unitIndex,
      lessonIndex
    }))
  );

const getNextLearningLessonIndex = (lessons = getLearningLessons()) =>
  lessons.findIndex((lesson) => !completedLessons.includes(lesson.id));

const isLearningLessonUnlocked = (lessonIndex, lessons = getLearningLessons()) => {
  if (lessonIndex <= 0) return true;
  return completedLessons.includes(lessons[lessonIndex - 1]?.id);
};

const getLessonAppStep = (lesson) => {
  const panelCopy = {
    tips: "Use this as a behavior rule when reviewing the Tips cards and your weekly action plan.",
    terms: "Use this term when reading the dashboard labels, holdings table, budget cards, and calculators.",
    concepts: "Use this concept when comparing tradeoffs, reading risk outputs, or explaining why the app flags something.",
    history: "Use this historical pattern as context before reacting to news, rates, inflation, crashes, or hype.",
    behavior: "Use this behavior check before buying, selling, or trusting a market pattern too quickly.",
    quiz: "Use the Quick Check section to test whether the idea is clear enough to explain without notes."
  };
  return panelCopy[lesson.panel] || "Use this lesson as a decision filter before changing money habits or portfolio choices.";
};

const getLessonMistakes = (lesson) => {
  const lowerTitle = lesson.title.toLowerCase();
  const mistakes = [
    `Treating "${lesson.title}" like a vocabulary word instead of a real decision tool.`,
    "Looking at one number in isolation instead of checking the surrounding situation."
  ];
  if (lowerTitle.includes("debt") || lowerTitle.includes("apr") || lowerTitle.includes("minimum")) {
    mistakes.push("Focusing only on the balance and ignoring how fast interest can build.");
  } else if (lowerTitle.includes("stock") || lowerTitle.includes("risk") || lowerTitle.includes("valuation") || lowerTitle.includes("p/e")) {
    mistakes.push("Assuming a popular asset is automatically a good fit for every portfolio.");
  } else if (lowerTitle.includes("budget") || lowerTitle.includes("cash") || lowerTitle.includes("saving")) {
    mistakes.push("Making the plan too strict, then abandoning it after one imperfect week.");
  } else {
    mistakes.push("Reacting emotionally before asking what actually changed.");
  }
  return mistakes;
};

const renderLessonList = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

const renderLearningPath = () => {
  if (!pathwayMap) return;
  const lessons = getLearningLessons();
  const total = lessons.length || 1;
  const completed = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const percent = Math.round((completed / total) * 100);
  const nextLessonIndex = getNextLearningLessonIndex(lessons);

  if (learningProgressScore) learningProgressScore.textContent = `${percent}%`;
  if (learningProgressDetail) {
    learningProgressDetail.textContent =
      completed === total
        ? "Path complete. Review any lesson whenever you want."
        : `${completed} of ${total} lessons complete. Next: ${lessons[nextLessonIndex]?.title || "Review"}.`;
  }
  if (learningXp) learningXp.textContent = `${completed * 15} XP`;
  if (learningStreak) learningStreak.textContent = `${completed} lesson${completed === 1 ? "" : "s"} complete`;
  if (pathwayProgressBar) pathwayProgressBar.style.width = `${percent}%`;

  let globalIndex = 0;
  pathwayMap.innerHTML = LEARNING_PATH_UNITS.map((unit) => {
    const cards = unit.lessons
      .map((lesson) => {
        const lessonIndex = globalIndex;
        globalIndex += 1;
        const complete = completedLessons.includes(lesson.id);
        const unlocked = isLearningLessonUnlocked(lessonIndex, lessons);
        const current = !complete && lessonIndex === nextLessonIndex;
        const state = complete ? "done" : unlocked ? "current" : "locked";
        const actionLabel = complete ? "Review" : unlocked ? "Start" : "Locked";
        const lessonContent = unlocked
          ? `
              <span>${escapeHtml(current ? "Next lesson" : lesson.panel)}</span>
              <strong>${escapeHtml(lesson.title)}</strong>
              <p>${escapeHtml(lesson.skill)}</p>
              <div class="path-lesson-detail">
                <section class="lesson-detail-block">
                  <span>Simple English</span>
                  <p>${escapeHtml(lesson.simple || lesson.skill)}</p>
                </section>
                <section class="lesson-detail-block">
                  <span>Why it matters</span>
                  <p>${escapeHtml(lesson.why || "This idea helps connect daily money decisions to long-term outcomes.")}</p>
                </section>
                <section class="lesson-detail-block">
                  <span>Example</span>
                  <p>${escapeHtml(lesson.example || "Use this lesson as a lens when reviewing your own numbers.")}</p>
                </section>
                <section class="lesson-detail-block">
                  <span>How to use it in StockPilot</span>
                  <p>${escapeHtml(getLessonAppStep(lesson))}</p>
                </section>
                <section class="lesson-detail-block">
                  <span>Key ideas</span>
                  <ul>
                    ${renderLessonList([
                      lesson.skill,
                      lesson.simple || "Translate the term into plain language before using it.",
                      "Connect the idea to a real number, real choice, or real risk."
                    ])}
                  </ul>
                </section>
                <section class="lesson-detail-block">
                  <span>Mistakes to avoid</span>
                  <ul>${renderLessonList(getLessonMistakes(lesson))}</ul>
                </section>
                <section class="lesson-detail-block">
                  <span>Practice prompt</span>
                  <p>${escapeHtml(lesson.practice || "Write one action you can take from this lesson today.")}</p>
                </section>
                <section class="comprehension-check" aria-label="Comprehension check for ${escapeHtml(lesson.title)}">
                  <span>Comprehension check</span>
                  <strong>Which answer best explains this lesson?</strong>
                  <div class="check-choice-grid">
                    <button class="ghost-button small-button" data-check-choice="correct" type="button">${escapeHtml(lesson.simple || lesson.skill)}</button>
                    <button class="ghost-button small-button" data-check-choice="review" type="button">It only matters after someone becomes wealthy.</button>
                    <button class="ghost-button small-button" data-check-choice="review" type="button">It should be ignored if the market or month feels calm.</button>
                  </div>
                  <p class="check-feedback" aria-live="polite">Choose an answer to check your understanding.</p>
                </section>
              </div>
            `
          : `
              <span>Locked lesson</span>
              <strong>Complete the previous step to unlock this lesson.</strong>
              <p>This keeps the pathway focused and reveals the content in order.</p>
            `;
        return `
          <article class="path-lesson-node ${state}">
            <div class="lesson-node-marker">${complete ? "✓" : lessonIndex + 1}</div>
            <div>${lessonContent}</div>
            <div class="path-lesson-actions">
              <button class="${complete ? "ghost-button" : "primary-button"} small-button" data-path-action="${complete ? "review" : "start"}" data-path-lesson="${escapeHtml(lesson.id)}" type="button" ${unlocked ? "" : "disabled"}>${actionLabel}</button>
            </div>
          </article>
        `;
      })
      .join("");
    return `
      <article class="path-unit-card">
        <div class="path-unit-header">
          <span>${escapeHtml(unit.theme)}</span>
          <strong>${escapeHtml(unit.title)}</strong>
        </div>
        <div class="lesson-node-list">${cards}</div>
      </article>
    `;
  }).join("");
  pathwayMap.querySelectorAll("[data-path-lesson]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (button.disabled) return;
      completeLearningLesson(button.dataset.pathLesson);
    });
  });
  pathwayMap.querySelectorAll("[data-check-choice]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const feedback = button.closest(".comprehension-check")?.querySelector(".check-feedback");
      if (!feedback) return;
      const isCorrect = button.dataset.checkChoice === "correct";
      feedback.textContent = isCorrect
        ? "Correct. You can explain the idea in plain English and connect it to a real decision."
        : "Not quite. Review the simple explanation and example, then try again.";
      feedback.classList.toggle("good-text", isCorrect);
      feedback.classList.toggle("bad-text", !isCorrect);
    });
  });
};

const renderLearningPractice = () => {
  if (learningScenarioGrid) {
    learningScenarioGrid.innerHTML = LEARNING_SCENARIOS.map((scenario) => `
      <article class="scenario-learning-card">
        <span>Scenario</span>
        <strong>${escapeHtml(scenario.title)}</strong>
        <p>${escapeHtml(scenario.setup)}</p>
        <div class="scenario-option-list">
          ${scenario.options
            .map(
              (option, index) => `
                <button class="ghost-button small-button" data-scenario-id="${escapeHtml(scenario.id)}" data-scenario-option="${index}" type="button">${escapeHtml(option.label)}</button>
              `
            )
            .join("")}
        </div>
        <p class="scenario-feedback" aria-live="polite">${escapeHtml(scenario.lesson)}</p>
      </article>
    `).join("");
  }

  if (learningQuizList) {
    learningQuizList.innerHTML = LEARNING_QUIZ_QUESTIONS.map((question, questionIndex) => `
      <article class="quiz-question-card">
        <span>${escapeHtml(question.topic)}</span>
        <strong>${questionIndex + 1}. ${escapeHtml(question.question)}</strong>
        <div class="quiz-answer-list">
          ${question.answers
            .map(
              (answer, index) => `
                <button class="ghost-button small-button" data-quiz-id="${escapeHtml(question.id)}" data-quiz-answer="${index}" type="button">${escapeHtml(answer.label)}</button>
              `
            )
            .join("")}
        </div>
        <p class="quiz-feedback" aria-live="polite">${escapeHtml(question.explanation)}</p>
      </article>
    `).join("");
  }
  Object.entries(learningQuizResults).forEach(([questionId, result]) => {
    const question = LEARNING_QUIZ_QUESTIONS.find((item) => item.id === questionId);
    const button = learningQuizList?.querySelector(`[data-quiz-id="${CSS.escape(questionId)}"][data-quiz-answer="${result.answerIndex}"]`);
    const card = button?.closest(".quiz-question-card");
    const feedback = card?.querySelector(".quiz-feedback");
    if (!question || !button || !feedback) return;
    button.classList.add("selected");
    button.dataset.quizResult = result.correct ? "correct" : "review";
    feedback.textContent = result.correct ? `Correct. ${question.explanation}` : `Review this one. ${question.explanation}`;
    feedback.classList.toggle("good-text", result.correct);
    feedback.classList.toggle("bad-text", !result.correct);
  });
  updateLearningQuizScore();
};

const updateLearningQuizScore = () => {
  if (!learningQuizList || !learningQuizScore || !learningQuizLevel) return;
  const answered = learningQuizList.querySelectorAll("[data-quiz-result]").length;
  const correct = learningQuizList.querySelectorAll('[data-quiz-result="correct"]').length;
  learningQuizScore.textContent = `${correct}/${LEARNING_QUIZ_QUESTIONS.length}`;
  learningQuizLevel.textContent =
    answered === 0
      ? "Not started"
      : correct === LEARNING_QUIZ_QUESTIONS.length
        ? "Mastered"
        : correct >= Math.ceil(LEARNING_QUIZ_QUESTIONS.length * 0.7)
          ? "Strong"
          : "Keep practicing";
};

const getLearningWeakTopics = () =>
  Object.entries(learningQuizResults)
    .filter(([, result]) => !result.correct)
    .map(([questionId]) => LEARNING_QUIZ_QUESTIONS.find((question) => question.id === questionId))
    .filter(Boolean);

const renderLearningDashboard = () => {
  const lessons = getLearningLessons();
  const completed = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const total = lessons.length || 1;
  const percent = Math.round((completed / total) * 100);
  const correctQuiz = Object.values(learningQuizResults).filter((result) => result.correct).length;
  const weakTopics = getLearningWeakTopics();
  const nextIndex = getNextLearningLessonIndex(lessons);
  const nextLesson = lessons[nextIndex] || lessons[lessons.length - 1];
  const missionDone = completedLearningMissions.length;

  const level =
    percent >= 90 && correctQuiz >= 5
      ? "Strategist"
      : percent >= 60
        ? "Builder"
        : percent >= 25 || correctQuiz >= 2
          ? "Explorer"
          : "Starter";

  if (learningLevel) learningLevel.textContent = level;
  if (learningLevelDetail) {
    learningLevelDetail.textContent = `${completed}/${total} lessons complete, ${correctQuiz}/${LEARNING_QUIZ_QUESTIONS.length} quiz answers correct, ${missionDone}/${LEARNING_MISSIONS.length} missions done.`;
  }
  if (learningNextStep) learningNextStep.textContent = nextIndex === -1 ? "Review and quiz" : nextLesson?.title || "Start the path";
  if (learningNextStepDetail) {
    learningNextStepDetail.textContent =
      nextIndex === -1
        ? "You finished the path. Use Quiz Mode and Scenario Lab to keep skills sharp."
        : `${nextLesson.unitTitle}: ${nextLesson.skill}`;
  }
  if (learningWeakCount) learningWeakCount.textContent = `${weakTopics.length} topic${weakTopics.length === 1 ? "" : "s"}`;
  if (learningWeakDetail) {
    learningWeakDetail.textContent = weakTopics.length
      ? "Quiz misses are turned into review cards below."
      : "No weak quiz areas yet. Take the quiz to generate review topics.";
  }
  if (learningReviewList) {
    learningReviewList.innerHTML = weakTopics.length
      ? weakTopics
          .map(
            (topic) => `
              <article class="learning-review-card">
                <span>${escapeHtml(topic.topic)}</span>
                <strong>${escapeHtml(topic.question)}</strong>
                <p>${escapeHtml(topic.explanation)}</p>
                <button class="ghost-button small-button" data-review-topic="${escapeHtml(topic.id)}" type="button">Review in Quiz</button>
              </article>
            `
          )
          .join("")
      : `<article class="learning-review-card calm"><strong>No weak areas yet</strong><p>Answer quiz questions and missed topics will appear here automatically.</p></article>`;
  }
  if (learningMissionList) {
    learningMissionList.innerHTML = LEARNING_MISSIONS.map((mission) => {
      const done = completedLearningMissions.includes(mission.id);
      return `
        <article class="learning-mission-card ${done ? "done" : ""}">
          <div>
            <span>${escapeHtml(mission.topic)}</span>
            <strong>${escapeHtml(mission.title)}</strong>
            <p>${escapeHtml(mission.detail)}</p>
          </div>
          <button class="${done ? "primary-button" : "ghost-button"} small-button" data-learning-mission="${escapeHtml(mission.id)}" type="button">${done ? "Done" : "Mark Done"}</button>
        </article>
      `;
    }).join("");
  }
};

const completeLearningLesson = (lessonId) => {
  const lessons = getLearningLessons();
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (lessonIndex < 0 || !isLearningLessonUnlocked(lessonIndex, lessons)) return;
  const lesson = lessons[lessonIndex];
  if (!completedLessons.includes(lesson.id)) completedLessons.push(lesson.id);
  showLearningPanel(lesson.panel);
  renderLearningPath();
  renderLearningDashboard();
  saveAppState();
};

const normalizeSavingsPanel = (panel) =>
  ({
    budget: "plan",
    spending: "plan",
    overview: "plan",
    goals: "goals",
    tradeoff: "goals",
    paycheck: "goals",
    debt: "protection",
    stress: "protection",
    subscriptions: "protection",
    life: "protection",
    tips: "playbook"
  })[panel] || panel || "plan";

const showSavingsPanel = (panel) => {
  const activePanel = normalizeSavingsPanel(panel);
  if (savingsPanelSelect && savingsPanelSelect.value !== activePanel) savingsPanelSelect.value = activePanel;
  savingsTabButtons.forEach((button) => {
    const active = button.dataset.savingsTab === activePanel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-savings-panel]").forEach((section) => {
    section.classList.toggle("active", section.dataset.savingsPanel === activePanel);
  });
  renderSavingsBudget();
  scheduleSaveAppState();
};

const setExperienceMode = (mode) => {
  const isPro = mode === "pro";
  document.body.classList.toggle("pro-mode", isPro);
  document.body.classList.toggle("beginner-mode", !isPro);
  experienceButtons.forEach((button) => {
    const active = button.dataset.experience === mode;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  scheduleSaveAppState();
};

const LIFE_EVENT_GUIDES = {
  student: {
    title: "Student mode",
    detail: "Handle tuition gaps, books, food, transport, subscriptions, social spending, and part-time income without letting small balances become long-term debt.",
    steps: [
      ["Real situation", "You receive financial aid, then rent, textbooks, groceries, club dues, and transport hit in the same two weeks."],
      ["First week move", "List the semester costs first: tuition gap, books, lab fees, software, transport pass, groceries, phone, and minimum debt payments."],
      ["Budget example", "If you have $2,400 for four months, that is $600/month before extra income. A $90 subscription/social habit is 15% of the monthly base."],
      ["Red flag", "Using a credit card for food or rides because aid money arrived once and the monthly plan was never divided."],
      ["StockPilot tool", "Use Budget Plan for monthly cash flow, Subscription Leak Finder for recurring charges, and Goals for a semester buffer."],
      ["Simple version", "Split semester money into monthly buckets before campus life starts pulling at it."]
    ]
  },
  firstJob: {
    title: "First job mode",
    detail: "Turn a first real paycheck into a system before lifestyle upgrades quietly become fixed costs.",
    steps: [
      ["Real situation", "Salary says $60,000, but take-home pay is lower after taxes, insurance, retirement, and benefits."],
      ["First paycheck move", "Build the budget from the deposit that actually lands, then assign rent, transport, food, debt, savings, investing, and misc."]
      ["Budget example", "If take-home is $3,700 and fixed costs are $2,100, the real decision space is $1,600, not the full paycheck."],
      ["Red flag", "Celebrating the new income by adding a car payment, apartment upgrade, subscriptions, and dining habit all in the first month."],
      ["StockPilot tool", "Use Savings Goals for emergency runway, Budget Plan for cash flow, and My Plan to log the first automatic savings rule."],
      ["Simple version", "Decide the raise before it disappears."]
    ]
  },
  moving: {
    title: "Moving out mode",
    detail: "Check whether independence still leaves breathing room after deposits, furniture, utilities, insurance, and new fixed bills.",
    steps: [
      ["Real situation", "The rent looks affordable, but first month, deposit, furniture, internet setup, groceries, parking, and utilities arrive together."],
      ["Before signing", "Calculate move-in cash: deposit, first month, application fees, furniture basics, moving supplies, insurance, and utility setup."],
      ["Monthly example", "$1,450 rent can become $1,850+ when utilities, Wi-Fi, parking, insurance, and higher groceries are included."],
      ["Red flag", "The new place only works if nothing goes wrong and you stop saving completely."],
      ["StockPilot tool", "Use Money Stress Simulator with a $300 extra monthly cost and Goals for a move-in sinking fund."],
      ["Simple version", "Do not sign a lease that turns every normal surprise into debt."]
    ]
  },
  car: {
    title: "Car purchase mode",
    detail: "Treat a car as a bundle of costs: payment, insurance, gas, parking, registration, repairs, tires, and depreciation.",
    steps: [
      ["Real situation", "A $380 payment looks manageable until insurance rises, gas changes, parking costs appear, and repairs hit."],
      ["Full cost test", "Add payment, insurance, fuel, parking, registration, maintenance, tires, repairs, tolls, and car washes."],
      ["Budget example", "$380 payment + $190 insurance + $180 gas + $75 maintenance fund = $825/month before parking or repairs."],
      ["Red flag", "The dealer approves the payment, but the budget cannot absorb one repair without credit card debt."],
      ["StockPilot tool", "Use Budget Plan for monthly payment pressure and Goals for a repair fund separate from emergency savings."],
      ["Simple version", "If you can only afford the payment, you cannot afford the car yet."]
    ]
  },
  wedding: {
    title: "Wedding / family mode",
    detail: "Plan emotional spending with a hard ceiling, shared priorities, vendor deposits, family contributions, and post-event cash protection.",
    steps: [
      ["Real situation", "The venue deposit feels like the big decision, but food, photography, clothes, travel, gifts, tips, and family expectations keep adding up."],
      ["Hard ceiling", "Set the total budget before deposits. Divide it into must-have, nice-to-have, family-paid, and absolutely-not-financed categories."],
      ["Budget example", "A $12,000 wedding in 12 months means $1,000/month before honeymoon, rings, travel, or emergency cushion."],
      ["Red flag", "Using emergency savings or credit cards because upgrades feel small one at a time."],
      ["StockPilot tool", "Use Goals for the event fund and Tradeoff Thinking to decide what gets cut when one category runs over."],
      ["Simple version", "Celebrate without starting the next chapter financially stressed."]
    ]
  },
  jobLoss: {
    title: "Job loss prep mode",
    detail: "Build a survival budget, stretch runway, cut low-value recurring costs, and protect cash before relying on debt.",
    steps: [
      ["Real situation", "Income stops or hours get cut, but rent, food, utilities, insurance, phone, transport, and debt minimums still continue."],
      ["Survival number", "Calculate the bare minimum month: housing, groceries, utilities, insurance, phone, transport, medicine, and minimum debt payments."],
      ["Runway example", "$6,000 cash divided by $2,000 survival spending equals 3 months of runway."],
      ["First 48 hours", "Pause nonessential subscriptions, pause extra goal funding, contact lenders if needed, and avoid panic spending."],
      ["Red flag", "Keeping normal lifestyle spending because you expect income to return quickly."],
      ["StockPilot tool", "Use Protection for emergency runway, Subscription Calendar for cuts, and My Plan to log survival-budget decisions."],
      ["Simple version", "The goal is buying time without creating expensive debt."]
    ]
  },
  rentIncrease: {
    title: "Rent increase mode",
    detail: "Treat higher rent as a permanent fixed-cost change that affects savings rate, debt payoff, food budget, and emergency runway.",
    steps: [
      ["Real situation", "Rent rises by $250/month. That is $3,000/year before utilities, insurance, or commute changes."],
      ["Rebuild", "Update fixed bills first, then recalculate savings rate, debt pressure, leftover cash, and runway."],
      ["Decision example", "If moving costs $2,000 but staying costs $3,000 more this year, the choice depends on cash, stress, commute, and lease terms."],
      ["Red flag", "Accepting the renewal because moving feels annoying, even though savings drops to zero."],
      ["StockPilot tool", "Use Budget Plan for fixed-cost pressure and Scenario Compare to test staying versus moving."],
      ["Simple version", "Higher rent means every other category must prove it still fits."]
    ]
  },
  medical: {
    title: "Medical bill mode",
    detail: "Verify the bill, ask about assistance or payment plans, protect emergency cash, and avoid panic-paying unclear charges.",
    steps: [
      ["Real situation", "A medical bill arrives after insurance and the due date feels urgent, but the charges may still need review."],
      ["Verify", "Ask for an itemized bill, confirm insurance processing, check due date, and ask about financial assistance."],
      ["Cash plan", "Compare paying in full against a no-interest payment plan so emergency cash does not vanish overnight."],
      ["Budget example", "$1,200 paid over 6 months is $200/month. Test whether that breaks cash flow before agreeing."],
      ["Red flag", "Putting the bill on a high-interest credit card before asking about hospital payment options."],
      ["StockPilot tool", "Use Money Stress Simulator for one-time emergency cost and Budget Plan for payment-plan affordability."],
      ["Simple version", "Slow down, verify, then pay with a plan."]
    ]
  },
  freelance: {
    title: "Freelance income mode",
    detail: "Handle irregular income by using conservative baseline pay, tax buckets, business expense buckets, and larger cash reserves.",
    steps: [
      ["Real situation", "One month brings $5,500, the next brings $1,800, but rent and taxes do not care."],
      ["Baseline", "Budget from a conservative income number, not the best month. Treat high months as buffer-building months."],
      ["Bucket example", "Split each client payment into taxes, business costs, personal bills, emergency cash, and owner pay."],
      ["Red flag", "Spending a big client payment like profit before setting aside taxes or next month's slow period."],
      ["StockPilot tool", "Use Budget Plan with lower baseline income and Goals for tax reserve, business buffer, and personal emergency fund."],
      ["Simple version", "Irregular income needs boring buckets."]
    ]
  },
  travel: {
    title: "Big trip mode",
    detail: "Plan the total trip cost before booking, include hidden expenses, and protect cash flow after the trip.",
    steps: [
      ["Real situation", "Flights and hotel look affordable, but food, activities, rides, luggage, roaming, tips, exchange fees, and pet care add up."],
      ["Trip total", "Estimate flights, stay, food, local transport, activities, insurance, documents, luggage, tips, and a return-home cushion."],
      ["Budget example", "$2,400 trip in 8 months means $300/month. If only $150/month fits, change the trip or timeline."],
      ["Red flag", "Booking first, then hoping future paychecks cover the rest."],
      ["StockPilot tool", "Use Savings Goals for the trip fund and Subscription Leak Finder to free monthly cash without touching essentials."],
      ["Simple version", "Come home with memories, not a cash-flow problem."]
    ]
  },
  newBaby: {
    title: "New baby mode",
    detail: "Plan recurring baby costs, medical expenses, childcare, parental leave income changes, insurance, and a larger emergency cushion.",
    steps: [
      ["Real situation", "The registry covers one-time items, but childcare, diapers, formula, copays, insurance, and lower leave income hit monthly."],
      ["Recurring costs", "Estimate childcare, diapers, formula, wipes, insurance changes, medical copays, clothes, supplies, and transport."],
      ["Income test", "Model parental leave, unpaid time, reduced hours, or one parent temporarily earning less."],
      ["Budget example", "$1,100 childcare plus $250 supplies is a $1,350 monthly fixed-cost change."],
      ["Red flag", "Buying premium one-time items while the monthly childcare plan is still unknown."],
      ["StockPilot tool", "Use Money Stress Simulator for lower income and extra monthly cost, then Goals for baby emergency buffer."],
      ["Simple version", "The recurring monthly costs matter more than the cute one-time purchases."]
    ]
  },
  caregiving: {
    title: "Caregiving mode",
    detail: "Budget for money costs and time costs: travel, medicine, supplies, lost work hours, home adjustments, and family coordination.",
    steps: [
      ["Real situation", "Helping family can mean gas, flights, meals, medical supplies, equipment, paperwork, and missed work."],
      ["Cost list", "Track transport, medications, meals, home equipment, paperwork fees, parking, and lost income from missed hours."],
      ["Boundary", "Separate what you can personally afford monthly from what needs family sharing, insurance, benefits, or community support."],
      ["Budget example", "$220 travel + $90 supplies + $150 missed income = $460/month of pressure before emotional stress is counted."],
      ["Red flag", "Quietly absorbing costs because it feels uncomfortable to discuss money with family."],
      ["StockPilot tool", "Use Budget Plan for recurring support costs, My Plan for family decisions, and Protection for runway impact."],
      ["Simple version", "Caregiving has money costs and time costs. Budget for both."]
    ]
  }
};

const showLifeEvent = (eventName) => {
  const event = LIFE_EVENT_GUIDES[eventName];
  if (!event || !lifeEventTitle || !lifeEventDetail) return;
  lifeEventButtons.forEach((button) => button.classList.toggle("active", button.dataset.lifeEvent === eventName));
  lifeEventTitle.textContent = event.title;
  lifeEventDetail.textContent = event.detail;
  if (lifeEventSteps) {
    lifeEventSteps.innerHTML = (event.steps || [])
      .map(
        (step) => {
          const [first, second, third] = step;
          const label = third === undefined ? "Playbook" : first;
          const title = third === undefined ? first : second;
          const detail = third === undefined ? second : third;
          return `
          <article class="lesson-card blue-lesson">
            <span>${escapeHtml(label || "Playbook")}</span>
            <strong>${escapeHtml(title || "")}</strong>
            <p>${escapeHtml(detail)}</p>
          </article>
        `;
        }
      )
      .join("");
  }
};

const pearsonCorrelation = (a, b) => {
  const length = Math.min(a.length, b.length);
  if (length < 3) return null;
  const seriesA = a.slice(0, length);
  const seriesB = b.slice(0, length);
  const avgA = average(seriesA);
  const avgB = average(seriesB);
  let numerator = 0;
  let sumA = 0;
  let sumB = 0;

  for (let index = 0; index < length; index += 1) {
    const diffA = seriesA[index] - avgA;
    const diffB = seriesB[index] - avgB;
    numerator += diffA * diffB;
    sumA += diffA * diffA;
    sumB += diffB * diffB;
  }

  const denominator = Math.sqrt(sumA * sumB);
  if (!denominator) return null;
  return clamp(numerator / denominator, -1, 1);
};

const getPortfolioReturnStats = () => {
  const validHoldings = holdings.filter((holding) => Array.isArray(holding.returns) && holding.returns.length >= 3 && holding.allocation > 0);
  if (!validHoldings.length) return { dailyReturns: [], annualReturn: null, annualRisk: null, geometricDaily: null };
  const length = Math.min(...validHoldings.map((holding) => holding.returns.length));
  if (!Number.isFinite(length) || length < 3) return { dailyReturns: [], annualReturn: null, annualRisk: null, geometricDaily: null };
  const totalAllocation = validHoldings.reduce((sum, holding) => sum + holding.allocation, 0) || 100;
  const dailyReturns = [];

  for (let index = 0; index < length; index += 1) {
    const dailyReturn = validHoldings.reduce((sum, holding) => {
      const alignedReturns = holding.returns.slice(-length);
      return sum + (holding.allocation / totalAllocation) * alignedReturns[index];
    }, 0);
    if (Number.isFinite(dailyReturn)) dailyReturns.push(dailyReturn);
  }

  const geometricDaily = geometricAverageFromReturns(dailyReturns);
  const annualReturn = geometricDaily ? ((1 + geometricDaily.average / 100) ** 252 - 1) * 100 : null;
  const annualRisk = dailyReturns.length >= 2 ? standardDeviation(dailyReturns) * Math.sqrt(252) : null;
  return { dailyReturns, annualReturn, annualRisk, geometricDaily };
};

const getPortfolioStats = () => {
  const totalAllocation = holdings.reduce((sum, holding) => sum + holding.allocation, 0);
  const weightedScore = totalAllocation
    ? holdings.reduce((sum, holding) => sum + holding.score * holding.allocation, 0) / totalAllocation
    : 0;
  const weightedBeta = totalAllocation
    ? holdings.reduce((sum, holding) => sum + holding.beta * holding.allocation, 0) / totalAllocation
    : 0;
  const largest = holdings.reduce((max, holding) => (holding.allocation > (max?.allocation ?? -1) ? holding : max), null);
  const sectorWeights = holdings.reduce((weights, holding) => {
    weights[holding.sector] = (weights[holding.sector] || 0) + holding.allocation;
    return weights;
  }, {});
  const largestSector = Object.entries(sectorWeights).sort((a, b) => b[1] - a[1])[0];
  let pairWeight = 0;
  let pairCorrelation = 0;
  let pairCount = 0;

  for (let left = 0; left < holdings.length; left += 1) {
    for (let right = left + 1; right < holdings.length; right += 1) {
      const corr = pearsonCorrelation(holdings[left].returns, holdings[right].returns);
      if (corr === null) continue;
      const weight = Math.max(holdings[left].allocation, 0) * Math.max(holdings[right].allocation, 0);
      pairWeight += weight;
      pairCorrelation += corr * weight;
      pairCount += 1;
    }
  }

  return {
    totalAllocation,
    weightedScore,
    weightedBeta,
    largest,
    largestSector,
    returnStats: getPortfolioReturnStats(),
    averageCorrelation: pairWeight ? pairCorrelation / pairWeight : null,
    pairCount
  };
};

const riskTone = (holding) => {
  const settings = riskSettings[riskProfile.value];
  if (holding.score >= 72 && holding.beta <= settings.maxBeta && holding.allocation <= settings.maxAllocation) return "buy";
  if (holding.score >= 50 && holding.allocation <= settings.maxAllocation * 1.3) return "watch";
  return "risky";
};

const getRiskMeter = (holding) => {
  const settings = riskSettings[riskProfile.value];
  const scorePressure = Math.max(0, 100 - Number(holding.score || 0)) * 0.45;
  const betaPressure = Math.max(0, (Number(holding.beta || 1) - settings.maxBeta) / Math.max(settings.maxBeta, 0.1)) * 28;
  const allocationPressure = Math.max(0, (Number(holding.allocation || 0) - settings.maxAllocation) / Math.max(settings.maxAllocation, 1)) * 32;
  const riskScore = clamp(scorePressure + betaPressure + allocationPressure, 0, 100);
  if (riskScore >= 70) return { score: riskScore, label: "High pressure", tone: "bad" };
  if (riskScore >= 45) return { score: riskScore, label: "Elevated", tone: "warn" };
  if (riskScore >= 25) return { score: riskScore, label: "Moderate", tone: "watch" };
  return { score: riskScore, label: "Low pressure", tone: "good" };
};

const renderRiskMeter = (holding) => {
  const meter = getRiskMeter(holding);
  return `
    <div class="risk-meter ${meter.tone}">
      <div class="risk-meter-top">
        <span>${escapeHtml(meter.label)}</span>
        <strong>${Math.round(meter.score)}/100</strong>
      </div>
      <div class="risk-meter-track" aria-hidden="true">
        <span style="width: ${Math.round(meter.score)}%"></span>
      </div>
    </div>
  `;
};

const riskLabel = (tone) => ({ buy: "Buy candidate", watch: "Watch", risky: "High pressure" })[tone] || titleCase(tone);
const toneToClass = (tone) => ({ buy: "good", watch: "warn", risky: "bad" })[tone] || tone;

const portfolioVerdict = (stats) => {
  if (!holdings.length) {
    return {
      tone: "watch",
      label: "Build Portfolio",
      reason: "Add holdings and load data to generate a recommendation."
    };
  }
  if (stats.weightedScore >= 72 && (stats.averageCorrelation === null || stats.averageCorrelation < 0.72) && stats.totalAllocation <= 105) {
    return {
      tone: "buy",
      label: "Buy Candidate",
      reason: "Strong score with manageable correlation and allocation."
    };
  }
  if (stats.weightedScore < 55 || stats.averageCorrelation > 0.8 || stats.totalAllocation > 110) {
    return {
      tone: "risky",
      label: "Risk Meter High",
      reason: "Portfolio pressure is elevated; review score, correlation, and allocation before it looks investable."
    };
  }
  return {
    tone: "watch",
    label: "Watchlist",
    reason: "Some parts look useful, but risk or valuation needs review."
  };
};

const renderPortfolioSummary = (stats) => {
  const verdict = portfolioVerdict(stats);
  const verdictPanel = document.querySelector("#portfolioVerdictPanel");
  verdictPanel.className = `verdict-panel ${verdict.tone}`;
  document.querySelector("#portfolioVerdict").textContent = verdict.label;
  document.querySelector("#portfolioVerdictReason").textContent = verdict.reason;
  document.querySelector("#portfolioVerdictScore").textContent = Math.round(stats.weightedScore);
  document.querySelector("#holdingCount").textContent = holdings.length;
  document.querySelector("#holdingCountNote").textContent =
    holdings.length >= 50 ? "Large portfolio mode is active." : "Add more holdings for full checks.";
  document.querySelector("#portfolioScore").textContent = Math.round(stats.weightedScore);
  document.querySelector("#portfolioScoreNote").textContent =
    stats.weightedScore >= 70 ? "Market data looks strong overall." : "Improve low-scoring holdings.";
  document.querySelector("#avgCorrelation").textContent =
    stats.averageCorrelation === null ? "N/A" : formatNumber(stats.averageCorrelation, 2);
  document.querySelector("#correlationNote").textContent =
    stats.pairCount ? `${stats.pairCount} valid return-series pairs analyzed.` : "Needs at least 2 return series.";
  document.querySelector("#portfolioAnnualReturn").textContent =
    stats.returnStats.annualReturn === null ? "N/A" : `${formatNumber(stats.returnStats.annualReturn, 2)}%`;
  document.querySelector("#portfolioReturnNote").textContent = stats.returnStats.dailyReturns.length
    ? `${stats.returnStats.dailyReturns.length} daily return points, annualized.`
    : "Needs loaded price history.";
  document.querySelector("#portfolioAnnualRisk").textContent =
    stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(stats.returnStats.annualRisk, 2)}%`;
  document.querySelector("#portfolioRiskNote").textContent = stats.returnStats.geometricDaily
    ? `Daily geometric avg ${formatNumber(stats.returnStats.geometricDaily.average, 3)}%.`
    : "Historical volatility estimate.";
  document.querySelector("#largestPosition").textContent = stats.largest ? stats.largest.ticker : "N/A";
  document.querySelector("#largestPositionNote").textContent = stats.largest
    ? `${formatNumber(stats.largest.allocation)}% allocation.`
    : "Allocation check pending.";
  document.querySelector("#allocationTotal").textContent = `Total allocation: ${formatNumber(stats.totalAllocation)}%`;
};

const getSavingsSnapshot = () => {
  const income = readSavingsNumber("monthlyIncome");
  const fixed = readSavingsNumber("fixedBills");
  const flexible = readSavingsNumber("flexSpending");
  const savings = readSavingsNumber("monthlySavings");
  const debt = readSavingsNumber("debtPayments");
  const emergency = readSavingsNumber("emergencyFund");
  const spending = fixed + flexible + debt;
  const leftover = income - spending - savings;
  const savingsRateValue = income > 0 ? (savings / income) * 100 : 0;
  const debtPressureValue = income > 0 ? (debt / income) * 100 : 0;
  const runway = spending > 0 ? emergency / spending : 0;
  const healthScore = clamp(
    45 + Math.min(savingsRateValue, 25) * 1.2 + Math.min(runway, 6) * 4 - Math.max(debtPressureValue - 12, 0) * 1.5 + (leftover >= 0 ? 10 : -18),
    0,
    100
  );
  return { income, fixed, flexible, savings, debt, emergency, spending, leftover, savingsRateValue, debtPressureValue, runway, healthScore };
};

const renderMoneyMap = (savingsStats) => {
  if (!moneyMap) return;
  const rows = [
    { label: "Income", value: savingsStats.income, color: "#2374c6", detail: "Monthly cash coming in." },
    { label: "Bills", value: savingsStats.fixed, color: "#5d7f99", detail: "Fixed obligations." },
    { label: "Flexible", value: savingsStats.flexible, color: "#a66a12", detail: "Variable lifestyle spending." },
    { label: "Tracked", value: getSpendingStats().actual, color: "#d28b1f", detail: "Actual category spending." },
    { label: "Debt", value: savingsStats.debt, color: "#b73832", detail: "Monthly debt pressure." },
    { label: "Savings", value: savingsStats.savings, color: "#168257", detail: "Future-you money." },
    { label: "Leftover", value: Math.max(savingsStats.leftover, 0), color: "#0f7f87", detail: "Breathing room." }
  ];
  const maxValue = Math.max(...rows.map((row) => row.value), 1);
  moneyMap.innerHTML = rows
    .map(
      (row) => `
        <div class="map-row">
          <span>${escapeHtml(row.label)}</span>
          <div>
            <div class="map-track"><strong style="width:${Math.max(3, (row.value / maxValue) * 100)}%; background:${row.color};"></strong></div>
            <p>${escapeHtml(row.detail)}</p>
          </div>
          <strong>${currency(row.value)}</strong>
        </div>
      `
    )
    .join("");
};

const getMoneyPersona = ({ stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight }) => {
  const portfolioLoaded = holdings.length > 0;
  const stability = clamp(
    savingsStats.healthScore * 0.55
      + Math.min(savingsStats.runway, 6) * 6
      + (spendingStats.variance >= 0 ? 12 : -10)
      - Math.max(savingsStats.debtPressureValue - 14, 0) * 1.4,
    0,
    100
  );
  const growth = clamp(
    (portfolioLoaded ? stats.weightedScore * 0.55 : 25)
      + savingsStats.savingsRateValue * 1.4
      + Math.min(cryptoWeight, 12) * 0.9
      - Math.max((stats.largest?.allocation || 0) - 30, 0) * 0.7,
    0,
    100
  );
  const discipline = clamp(
    48
      + (spendingStats.variance >= 0 ? 18 : -18)
      + Math.min(savingsStats.savingsRateValue, 20)
      + (savingsStats.leftover >= 0 ? 12 : -14)
      - Math.max(spendingStats.wantShare - 40, 0) * 0.8,
    0,
    100
  );
  const pressure = clamp(
    Math.max(0, -savingsStats.leftover) / 20
      + Math.max(0, -spendingStats.variance) / 20
      + Math.max(savingsStats.debtPressureValue - 12, 0) * 1.8
      + riskyHoldings.length * 7
      + Math.max(cryptoWeight - 15, 0),
    0,
    100
  );

  let title = "Balanced Builder";
  let badge = "Steady";
  let detail = "Your profile is balanced across cash flow, saving, and portfolio risk.";
  if (!portfolioLoaded && savingsStats.income <= 0) {
    title = "Setup Mode";
    badge = "Start";
    detail = "Add budget numbers and a few holdings to unlock the full profile.";
  } else if (pressure >= 65) {
    title = "Pressure Manager";
    badge = "Protect";
    detail = "The app sees stress from cash flow, debt, overspending, or portfolio risk. Stabilizing comes first.";
  } else if (stability >= 72 && savingsStats.runway >= 3) {
    title = "Cash Protector";
    badge = "Stable";
    detail = "You are building a strong defense through runway, positive cash flow, and controlled obligations.";
  } else if (growth >= 72 && portfolioLoaded) {
    title = "Growth Navigator";
    badge = "Growth";
    detail = "Your setup leans toward investing and upside, so risk control and concentration checks matter.";
  } else if (discipline >= 72) {
    title = "System Builder";
    badge = "Disciplined";
    detail = "Your inputs show repeatable money habits: planned spending, saving rhythm, and usable margin.";
  }

  return {
    title,
    badge,
    detail,
    scores: [
      { label: "Stability", value: stability, color: "#2374c6" },
      { label: "Growth", value: growth, color: "#168257" },
      { label: "Discipline", value: discipline, color: "#6b4fc8" },
      { label: "Pressure", value: pressure, color: pressure >= 55 ? "#b73832" : "#a66a12" }
    ]
  };
};

const renderPersonaBars = (persona) => {
  if (!personaBars) return;
  personaBars.innerHTML = persona.scores
    .map(
      (score) => `
        <div class="persona-bar-row">
          <span>${escapeHtml(score.label)}</span>
          <div class="persona-track"><strong style="width:${formatNumber(score.value, 0)}%; background:${score.color};"></strong></div>
          <b>${formatNumber(score.value, 0)}</b>
        </div>
      `
    )
    .join("");
};

const getMissionQueue = ({ stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight }) => {
  const missions = [];
  const commodityWeight = holdings.filter((holding) => holding.assetClass === "Commodity").reduce((sum, holding) => sum + holding.allocation, 0);
  const realEstateWeight = holdings.filter((holding) => holding.assetClass === "Real Estate").reduce((sum, holding) => sum + holding.allocation, 0);
  const realAssetWeight = commodityWeight + realEstateWeight;
  const addMission = (condition, mission) => {
    if (condition) missions.push(mission);
  };

  addMission(!holdings.length, {
    tone: "warn",
    title: "Load a real portfolio",
    detail: "Add ticker symbols and allocations so StockPilot can connect market risk to your money plan."
  });
  addMission(savingsStats.leftover < 0, {
    tone: "bad",
    title: "Fix the cash-flow gap",
    detail: `${currency(Math.abs(savingsStats.leftover))} is missing from the monthly plan before surprise costs.`
  });
  addMission(spendingStats.variance < 0, {
    tone: "bad",
    title: "Review spending leaks",
    detail: `Tracked spending is ${currency(Math.abs(spendingStats.variance))} above plan. Start with the biggest category above target.`
  });
  addMission(savingsStats.runway < 3, {
    tone: "warn",
    title: "Build emergency runway",
    detail: `${formatNumber(savingsStats.runway, 1)} months covered. Aim for 3 months before adding fragile commitments.`
  });
  addMission(stats.largest && stats.largest.allocation > 30, {
    tone: "warn",
    title: "Check concentration",
    detail: `${stats.largest.ticker} is ${formatNumber(stats.largest.allocation)}% of the loaded portfolio.`
  });
  addMission(riskyHoldings.length >= 2, {
    tone: "warn",
    title: "Scan risk meters",
    detail: `${riskyHoldings.length} holding${riskyHoldings.length === 1 ? "" : "s"} show elevated risk-meter pressure.`
  });
  addMission(cryptoWeight > 15, {
    tone: "bad",
    title: "Crypto volatility check",
    detail: `${formatNumber(cryptoWeight, 0)}% crypto exposure can dominate portfolio swings.`
  });
  addMission(holdings.length && realAssetWeight < 5, {
    tone: "warn",
    title: "Research real assets",
    detail: "Commodity or real estate exposure is low. They can behave differently from stocks, though they still carry risk."
  });
  addMission(realAssetWeight > 30, {
    tone: "warn",
    title: "Real asset concentration",
    detail: `${formatNumber(realAssetWeight, 0)}% sits in commodities and real estate. Check rate, inflation, and liquidity sensitivity.`
  });
  addMission(savingsStats.leftover >= 0 && spendingStats.variance >= 0 && savingsStats.runway >= 3, {
    tone: "good",
    title: "Protect the system",
    detail: "Cash flow, tracked spending, and runway are cooperating. Keep the rhythm and review weekly."
  });

  return missions.slice(0, 4);
};

const getCurrentMissionSignals = () => {
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const spendingStats = getSpendingStats();
  const riskyHoldings = holdings.filter((holding) => getRiskMeter(holding).score >= 45);
  const cryptoWeight = holdings.filter((holding) => holding.assetClass === "Crypto").reduce((sum, holding) => sum + holding.allocation, 0);
  const missions = getMissionQueue({ stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight });
  const urgentCount = missions.filter((mission) => mission.tone === "bad").length;
  const warningCount = missions.filter((mission) => mission.tone === "warn").length;
  const weather = urgentCount ? "Storm Watch" : warningCount >= 2 ? "Pressure Building" : warningCount ? "Mild Caution" : "Clear";
  const weatherNote = urgentCount
    ? `${urgentCount} urgent item${urgentCount === 1 ? "" : "s"} need attention before optimization.`
    : warningCount
      ? `${warningCount} caution signal${warningCount === 1 ? "" : "s"} to monitor.`
      : "No urgent issues from the current demo inputs.";
  return { stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight, missions, urgentCount, warningCount, weather, weatherNote };
};

const renderJournal = () => {
  if (!journalList) return;
  if (journalCount && journalCountNote) {
    journalCount.textContent = decisionJournal.length;
    journalCountNote.textContent = decisionJournal.length
      ? `${decisionJournal.length} decision${decisionJournal.length === 1 ? "" : "s"} saved locally.`
      : "No decisions logged yet.";
  }
  journalList.innerHTML = decisionJournal.length
    ? decisionJournal
        .map(
          (entry) => `
            <article class="journal-entry-card ${entry.tone || "warn"}">
              <div class="journal-entry-top">
                <span>${escapeHtml(entry.type)} • ${escapeHtml(entry.date)}</span>
                <button class="delete-button" data-delete-journal="${escapeHtml(entry.id)}" type="button" aria-label="Remove journal entry">x</button>
              </div>
              <strong>${escapeHtml(entry.title)}</strong>
              <p><b>Why:</b> ${escapeHtml(entry.reason || "No reason added.")}</p>
              <p><b>Expected:</b> ${escapeHtml(entry.expected || "No expected result added.")}</p>
            </article>
          `
        )
        .join("")
    : `<article class="journal-entry-card warn"><span>Decision Journal</span><strong>No decisions logged yet</strong><p>Log portfolio, budget, savings, or debt decisions before acting so the reasoning stays clear.</p></article>`;
};

const getGoalConflicts = (signals) => {
  const conflicts = [];
  const realAssetWeight = holdings
    .filter((holding) => holding.assetClass === "Commodity" || holding.assetClass === "Real Estate")
    .reduce((sum, holding) => sum + holding.allocation, 0);
  if (signals.savingsStats.runway < 3 && signals.riskyHoldings.length >= 2) {
    conflicts.push({
      tone: "bad",
      title: "Risk vs cash buffer",
      detail: "Portfolio risk is elevated while emergency runway is below 3 months. Cash defense may deserve priority."
    });
  }
  if (signals.spendingStats.variance < 0 && signals.savingsStats.savingsRateValue < 12) {
    conflicts.push({
      tone: "bad",
      title: "Spending vs saving",
      detail: "Tracked spending is above plan while the savings rate is still low. The same dollars are competing."
    });
  }
  if (signals.savingsStats.debtPressureValue > 12 && readSavingsNumber("goalMonthly") > 0) {
    conflicts.push({
      tone: "warn",
      title: "Goal savings vs debt payoff",
      detail: "Monthly goal savings and debt payments are both active. Check whether high-APR debt should move faster."
    });
  }
  if (signals.cryptoWeight > 15 && realAssetWeight < 5) {
    conflicts.push({
      tone: "warn",
      title: "Speculative tilt vs real assets",
      detail: "Crypto exposure is meaningful while commodity/real estate exposure is low. Diversification may be less broad than it looks."
    });
  }
  if (!conflicts.length) {
    conflicts.push({
      tone: "good",
      title: "No major conflicts detected",
      detail: "Current goals are not obviously fighting each other. Recheck after budget or portfolio changes."
    });
  }
  return conflicts;
};

const renderConflicts = (signals) => {
  if (!conflictGrid) return;
  conflictGrid.innerHTML = getGoalConflicts(signals)
    .map(
      (item) => `
        <article class="plan-action-card ${item.tone}">
          <span>${item.tone === "good" ? "Clear" : item.tone === "bad" ? "Conflict" : "Watch"}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
};

const renderScenarioCompare = (signals) => {
  if (!scenarioCompareGrid) return;
  const current = signals.savingsStats;
  const reducedSubscriptions = getSpendingStats().biggestLeak?.over || 100;
  const calmerSavings = current.savings + Math.min(300, Math.max(100, reducedSubscriptions));
  const calmerLeftover = current.leftover + Math.min(300, Math.max(100, reducedSubscriptions));
  const lowerRisk = Math.max(0, (signals.stats.returnStats.annualRisk || 0) - 4);
  const rows = [
    ["Monthly Leftover", currency(current.leftover), currency(calmerLeftover), calmerLeftover >= current.leftover ? "good" : "warn"],
    ["Savings Rate", `${formatNumber(current.savingsRateValue, 1)}%`, `${formatNumber(current.income ? (calmerSavings / current.income) * 100 : 0, 1)}%`, "good"],
    ["Emergency Runway", `${formatNumber(current.runway, 1)} mo`, `${formatNumber(current.spending ? (current.emergency + calmerSavings * 3) / current.spending : 0, 1)} mo`, "good"],
    ["Portfolio Risk", signals.stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(signals.stats.returnStats.annualRisk, 1)}%`, signals.stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(lowerRisk, 1)}%`, "warn"]
  ];
  scenarioCompareGrid.innerHTML = rows
    .map(
      ([label, now, whatIf, tone]) => `
        <article class="compare-mini-card ${tone}">
          <span>${escapeHtml(label)}</span>
          <div><b>Now</b><strong>${escapeHtml(now)}</strong></div>
          <div><b>What-if</b><strong>${escapeHtml(whatIf)}</strong></div>
        </article>
      `
    )
    .join("");
};

const renderSubscriptionCalendar = () => {
  if (!subscriptionCalendar) return;
  const subscriptions = parseSubscriptionLines(document.querySelector("#subscriptionList")?.value);
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const upcoming = subscriptions
    .map((item) => {
      const dueDate = new Date(today.getFullYear(), today.getMonth(), item.billingDay);
      if (dueDate < todayDate) dueDate.setMonth(dueDate.getMonth() + 1);
      const daysAway = Math.ceil((dueDate - todayDate) / 86400000);
      return { ...item, dueDate, daysAway };
    })
    .sort((a, b) => a.daysAway - b.daysAway)
    .slice(0, 6);
  subscriptionCalendar.innerHTML = upcoming.length
    ? upcoming
        .map(
          (item) => `
            <article class="calendar-charge ${item.daysAway <= 3 ? "bad" : item.daysAway <= 10 ? "warn" : "good"}">
              <span>${item.dueDate.toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span>
              <strong>${escapeHtml(item.name)} ${currency(item.amount)}</strong>
              <p>${item.daysAway === 0 ? "Due today" : `Due in ${item.daysAway} day${item.daysAway === 1 ? "" : "s"}`}</p>
            </article>
          `
        )
        .join("")
    : `<article class="calendar-charge warn"><span>Calendar</span><strong>No subscriptions entered</strong><p>Add recurring charges in Savings Protection.</p></article>`;
};

const renderFinanceTimeline = () => {
  if (!financeTimeline) return;
  const refreshItems = Object.entries(dataFreshness)
    .filter(([, item]) => item?.updatedAt)
    .map(([key, item]) => ({
      time: new Date(item.updatedAt).getTime(),
      label: freshnessLabels[key],
      title: `${freshnessLabels[key]} refreshed`,
      detail: item.detail || "Data checked."
    }));
  const journalItems = decisionJournal.slice(0, 5).map((entry) => ({
    time: new Date(entry.date).getTime() || Date.now(),
    label: entry.type,
    title: entry.title,
    detail: entry.reason || "Decision logged."
  }));
  const nextSubscription = getNextSubscription(parseSubscriptionLines(document.querySelector("#subscriptionList")?.value));
  const subItems = nextSubscription
    ? [{
        time: nextSubscription.dueDate.getTime(),
        label: "Reminder",
        title: `${nextSubscription.name} renews`,
        detail: `${currency(nextSubscription.amount)} in ${nextSubscription.daysAway} day${nextSubscription.daysAway === 1 ? "" : "s"}.`
      }]
    : [];
  const items = [...refreshItems, ...journalItems, ...subItems]
    .sort((a, b) => Math.abs(Date.now() - a.time) - Math.abs(Date.now() - b.time))
    .slice(0, 7);
  financeTimeline.innerHTML = items.length
    ? items
        .map(
          (item) => `
            <article class="timeline-item">
              <span>${escapeHtml(item.label)}</span>
              <strong>${escapeHtml(item.title)}</strong>
              <p>${escapeHtml(item.detail)}</p>
            </article>
          `
        )
        .join("")
    : `<article class="timeline-item"><span>Timeline</span><strong>No events yet</strong><p>Refresh data, log decisions, or add subscriptions to build history.</p></article>`;
};

const getWeeklyPlanActions = (signals = getCurrentMissionSignals()) => {
  const actions = signals.missions.length
    ? signals.missions
    : [
        {
          tone: "good",
          title: "Keep the rhythm",
          detail: "No urgent warnings from the current inputs. Review the system weekly and update data when something changes."
        }
      ];
  const journalPrompt = decisionJournal.length
    ? null
    : {
        tone: "warn",
        title: "Log your first decision",
        detail: "Before changing the portfolio or budget, write down why. This creates an accountability trail."
      };
  return journalPrompt ? [...actions, journalPrompt].slice(0, 5) : actions.slice(0, 5);
};

const getPlanReadinessScore = (signals) => {
  const checks = [
    holdings.length > 0,
    signals.savingsStats.income > 0,
    moneyGoals.length > 0,
    decisionJournal.length > 0,
    completedLessons.length > 0
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};

const renderPlanSprint = (signals, weeklyActions) => {
  if (!planSprintGrid) return;
  const topAction = weeklyActions[0];
  const watchAction = weeklyActions.find((action) => action.tone === "warn" || action.tone === "bad") || weeklyActions[1] || topAction;
  const recordText = decisionJournal.length
    ? `${decisionJournal[0].title} is the latest saved decision.`
    : "Log the next real change before acting.";
  const cards = [
    {
      tone: topAction?.tone || "warn",
      label: "Do",
      title: topAction?.title || "Choose one action",
      detail: topAction?.detail || "Your top weekly action will appear here."
    },
    {
      tone: watchAction?.tone || "warn",
      label: "Watch",
      title: signals.weather,
      detail: signals.weatherNote
    },
    {
      tone: decisionJournal.length ? "good" : "warn",
      label: "Record",
      title: decisionJournal.length ? "Decision memory active" : "Journal missing",
      detail: recordText
    }
  ];
  planSprintGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="plan-sprint-card ${card.tone}">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.title)}</strong>
          <p>${escapeHtml(card.detail)}</p>
        </article>
      `
    )
    .join("");
};

const renderMyPlan = () => {
  if (!weeklyPlanList) return;
  const signals = getCurrentMissionSignals();
  const weeklyActions = getWeeklyPlanActions(signals);
  const topAction = weeklyActions[0];

  if (planFocus && planFocusDetail) {
    planFocus.textContent = topAction.title;
    planFocusDetail.textContent = topAction.detail;
  }
  if (planActionCount && planActionNote) {
    planActionCount.textContent = weeklyActions.length;
    planActionNote.textContent = signals.urgentCount
      ? "Urgent items should be handled first."
      : "Actions are ranked from highest impact to maintenance.";
  }
  if (planWeather && planWeatherNote) {
    planWeather.textContent = signals.weather;
    planWeather.classList.toggle("bad-text", signals.urgentCount > 0);
    planWeather.classList.toggle("good-text", signals.urgentCount === 0 && signals.warningCount === 0);
    planWeatherNote.textContent = signals.weatherNote;
  }
  const readinessScore = getPlanReadinessScore(signals);
  if (planCompletionScore && planCompletionNote) {
    planCompletionScore.textContent = `${readinessScore}%`;
    planCompletionScore.classList.toggle("good-text", readinessScore >= 80);
    planCompletionScore.classList.toggle("bad-text", readinessScore < 40);
    planCompletionNote.textContent =
      readinessScore >= 80
        ? "Enough context for a useful weekly plan."
        : "Add portfolio, budget, goals, journal, and learning context.";
  }
  renderPlanSprint(signals, weeklyActions);
  weeklyPlanList.innerHTML = weeklyActions
    .map(
      (action, index) => `
        <article class="plan-action-card ${action.tone || "warn"}">
          <span>Step ${index + 1}</span>
          <strong>${escapeHtml(action.title)}</strong>
          <p>${escapeHtml(action.detail)}</p>
        </article>
      `
    )
    .join("");
  renderConflicts(signals);
  renderScenarioCompare(signals);
  renderSubscriptionCalendar();
  renderFinanceTimeline();
  renderJournal();
};

const getCopilotReportData = () => {
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const spendingStats = getSpendingStats();
  const signals = getCurrentMissionSignals();
  const verdict = portfolioVerdict(stats);
  const lessons = getLearningLessons();
  const completed = lessons.filter((lesson) => completedLessons.includes(lesson.id)).length;
  const weakTopics = getLearningWeakTopics();
  const freshKeys = Object.keys(freshnessLabels).filter((key) => freshnessTone(key, dataFreshness[key]) === "good");
  const staleKeys = Object.keys(freshnessLabels).filter((key) => freshnessTone(key, dataFreshness[key]) !== "good");
  const annualReturn = stats.returnStats.annualReturn === null ? "N/A" : `${formatNumber(stats.returnStats.annualReturn, 1)}%`;
  const annualRisk = stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(stats.returnStats.annualRisk, 1)}%`;
  const learningLevelValue = learningLevel?.textContent || "Starter";
  const nextLesson = lessons[getNextLearningLessonIndex(lessons)];
  const actions = signals.missions.length
    ? signals.missions.slice(0, 5)
    : [{ tone: "good", title: "Keep reviewing weekly", detail: "No urgent warnings from current inputs. Refresh data and revisit after changes." }];
  return { stats, savingsStats, spendingStats, signals, verdict, completed, totalLessons: lessons.length, weakTopics, freshKeys, staleKeys, annualReturn, annualRisk, learningLevelValue, nextLesson, actions };
};

const buildCopilotReportText = () => {
  const report = getCopilotReportData();
  return [
    "StockPilot Copilot Report",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Portfolio: ${holdings.length ? `${report.verdict.label}, score ${Math.round(report.stats.weightedScore)}/100, ${holdings.length} holdings, ${formatNumber(report.stats.totalAllocation)}% allocated.` : "No loaded portfolio yet."}`,
    `Portfolio risk/return: annual return ${report.annualReturn}, annual risk ${report.annualRisk}, average correlation ${report.stats.averageCorrelation === null ? "N/A" : formatNumber(report.stats.averageCorrelation, 2)}.`,
    `Budget: health ${Math.round(report.savingsStats.healthScore)}/100, cash flow ${currency(report.savingsStats.leftover)}, savings rate ${formatNumber(report.savingsStats.savingsRateValue, 1)}%, runway ${formatNumber(report.savingsStats.runway, 1)} months.`,
    `Learning: ${report.learningLevelValue}, ${report.completed}/${report.totalLessons} lessons complete, ${report.weakTopics.length} weak quiz topic${report.weakTopics.length === 1 ? "" : "s"}.`,
    `Update status: ${report.freshKeys.length} fresh area${report.freshKeys.length === 1 ? "" : "s"}, ${report.staleKeys.length} area${report.staleKeys.length === 1 ? "" : "s"} needing attention.`,
    "",
    "Next Actions:",
    ...report.actions.map((action, index) => `${index + 1}. ${action.title}: ${action.detail}`),
    "",
    "Educational summary only. Not financial, tax, legal, or investment advice."
  ].join("\n");
};

const getWeeklyReportData = () => {
  const report = getCopilotReportData();
  const goals = moneyGoals.map((goal) => {
    const target = Math.max(0, Number(goal.target) || 0);
    const saved = Math.max(0, Number(goal.saved) || 0);
    const progress = target > 0 ? clamp((saved / target) * 100, 0, 100) : 0;
    return { ...goal, target, saved, progress, remaining: Math.max(target - saved, 0) };
  });
  const activeGoals = goals.filter((goal) => goal.remaining > 0);
  const topGoal = activeGoals.sort((a, b) => b.progress - a.progress || b.remaining - a.remaining)[0] || goals[0];
  const newsCount = latestNewsItems.length;
  const riskFlagCount = holdings.filter((holding) => getRiskMeter(holding).score >= 55).length;
  const updateNeeds = report.staleKeys.map((key) => freshnessLabels[key]).slice(0, 3);
  const snapshotCards = [
    {
      tone: holdings.length ? (report.stats.weightedScore >= 72 ? "good" : report.stats.weightedScore >= 55 ? "warn" : "bad") : "warn",
      label: "Portfolio",
      title: holdings.length ? `${Math.round(report.stats.weightedScore)}/100 score` : "Not loaded",
      detail: holdings.length
        ? `${holdings.length} assets, ${report.annualReturn} expected return, ${report.annualRisk} risk. ${riskFlagCount ? `${riskFlagCount} holding${riskFlagCount === 1 ? "" : "s"} need a closer look.` : "No major risk flags from loaded holdings."}`
        : "Add tickers and percentages to make the weekly report useful."
    },
    {
      tone: report.savingsStats.leftover >= 0 ? "good" : "bad",
      label: "Budget",
      title: `${currency(report.savingsStats.leftover)} cash flow`,
      detail: `${formatNumber(report.savingsStats.savingsRateValue, 1)}% savings rate and ${formatNumber(report.savingsStats.runway, 1)} months emergency runway.`
    },
    {
      tone: topGoal ? (topGoal.progress >= 60 ? "good" : topGoal.progress >= 25 ? "warn" : "bad") : "warn",
      label: "Goals",
      title: topGoal ? `${formatNumber(topGoal.progress, 0)}% ${topGoal.name}` : "No goal yet",
      detail: topGoal ? `${currency(topGoal.remaining)} remaining for this goal.` : "Add one goal so the report can track progress weekly."
    },
    {
      tone: report.staleKeys.length ? "warn" : "good",
      label: "Data",
      title: report.staleKeys.length ? `${report.staleKeys.length} checks due` : "Signals current",
      detail: updateNeeds.length ? `Refresh: ${updateNeeds.join(", ")}.` : `${report.freshKeys.length} areas are fresh or recalculated.`
    },
    {
      tone: newsCount ? "good" : "warn",
      label: "News",
      title: newsCount ? `${newsCount} headlines loaded` : "No headlines loaded",
      detail: newsCount ? "Review headlines before assuming a price move is random." : "Open Research and refresh news for weekly market context."
    },
    {
      tone: report.weakTopics.length ? "warn" : report.completed > 0 ? "good" : "warn",
      label: "Learning",
      title: `${report.completed}/${report.totalLessons} lessons`,
      detail: report.weakTopics.length ? `Review ${report.weakTopics.slice(0, 2).join(", ")}.` : `Next lesson: ${report.nextLesson?.title || "Practice review"}.`
    }
  ];
  return { ...report, goals, topGoal, newsCount, riskFlagCount, snapshotCards };
};

const buildWeeklyReportText = () => {
  const weekly = getWeeklyReportData();
  return [
    "StockPilot Weekly Money Report",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    "Snapshot:",
    ...weekly.snapshotCards.map((card) => `- ${card.label}: ${card.title}. ${card.detail}`),
    "",
    "Recommended Next Actions:",
    ...weekly.actions.slice(0, 3).map((action, index) => `${index + 1}. ${action.title}: ${action.detail}`),
    "",
    "Cloud/account note: this demo saves locally in this browser. Use Backup before switching devices.",
    "Educational summary only. Not financial, tax, legal, or investment advice."
  ].join("\n");
};

const renderWeeklyReport = () => {
  if (!weeklySnapshotGrid || !weeklyActionStrip) return;
  const weekly = getWeeklyReportData();
  weeklySnapshotGrid.innerHTML = weekly.snapshotCards
    .map(
      (card) => `
        <article class="weekly-snapshot-card ${card.tone}">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.title)}</strong>
          <p>${escapeHtml(card.detail)}</p>
        </article>
      `
    )
    .join("");
  weeklyActionStrip.innerHTML = `
    <strong>This week</strong>
    <div>
      ${weekly.actions
        .slice(0, 3)
        .map((action, index) => `<span>${index + 1}. ${escapeHtml(action.title)}</span>`)
        .join("")}
    </div>
  `;
  if (weeklyReportStatus) {
    weeklyReportStatus.textContent = `Weekly report ready. ${weekly.newsCount ? `${weekly.newsCount} headlines included.` : "Refresh news to add market context."} Educational only; verify important numbers.`;
  }
};

const renderEarlyAccess = () => {
  if (!earlyAccessList) return;
  earlyAccessList.innerHTML = earlyAccessLeads.length
    ? `
      <div class="section-title compact-title">
        <div>
          <h3>Early Access Interest</h3>
          <span class="table-note">${earlyAccessLeads.length} local signup${earlyAccessLeads.length === 1 ? "" : "s"} captured in this demo.</span>
        </div>
      </div>
      <div class="lead-list">
        ${earlyAccessLeads
          .slice(0, 5)
          .map(
            (lead) => `
              <article>
                <strong>${escapeHtml(lead.name)}</strong>
                <span>${escapeHtml(lead.email)}</span>
                <p>${escapeHtml(lead.feature)} · ${escapeHtml(lead.date)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `
    : `<p class="helper-text">Early access signups will appear here for demo validation.</p>`;
};

const joinEarlyAccess = () => {
  const name = earlyAccessName?.value.trim() || "";
  const email = earlyAccessEmail?.value.trim().toLowerCase() || "";
  if (!name || !email.includes("@") || !email.includes(".")) {
    if (earlyAccessStatus) {
      earlyAccessStatus.textContent = "Add a name and valid email to join early access.";
      earlyAccessStatus.classList.add("bad-text");
      earlyAccessStatus.classList.remove("good-text");
    }
    return;
  }
  const lead = {
    id: crypto.randomUUID(),
    name,
    email,
    feature: earlyAccessFeature?.value || "Cloud sync",
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  };
  earlyAccessLeads = [lead, ...earlyAccessLeads.filter((item) => item.email !== email)].slice(0, 100);
  if (earlyAccessName) earlyAccessName.value = "";
  if (earlyAccessEmail) earlyAccessEmail.value = "";
  if (earlyAccessStatus) {
    earlyAccessStatus.textContent = "Saved locally. This is where an email waitlist would connect later.";
    earlyAccessStatus.classList.add("good-text");
    earlyAccessStatus.classList.remove("bad-text");
  }
  renderEarlyAccess();
  saveAppState();
};

const renderServiceRequests = () => {
  if (!serviceRequestList) return;
  serviceRequestList.innerHTML = serviceRequests.length
    ? `
      <div class="section-title compact-title">
        <div>
          <h3>Roadmap Interest</h3>
          <span class="table-note">${serviceRequests.length} local request${serviceRequests.length === 1 ? "" : "s"} captured in this demo.</span>
        </div>
      </div>
      <div class="lead-list">
        ${serviceRequests
          .slice(0, 5)
          .map(
            (request) => `
              <article>
                <strong>${escapeHtml(request.name)}</strong>
                <span>${escapeHtml(request.service)}</span>
                <p>${escapeHtml(request.email)} · ${escapeHtml(request.date)}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `
    : `<p class="helper-text">Service requests will appear here for demo validation.</p>`;
};

const submitServiceRequest = () => {
  const name = serviceRequestName?.value.trim() || "";
  const email = serviceRequestEmail?.value.trim().toLowerCase() || "";
  const need = serviceRequestNeed?.value.trim() || "";
  if (!name || !email.includes("@") || !email.includes(".")) {
    if (serviceRequestStatus) {
      serviceRequestStatus.textContent = "Add a name and valid email to save the service request.";
      serviceRequestStatus.classList.add("bad-text");
      serviceRequestStatus.classList.remove("good-text");
    }
    return;
  }
  const request = {
    id: crypto.randomUUID(),
    name,
    email,
    service: serviceRequestType?.value || "Money Cleanup Session",
    need,
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  };
  serviceRequests = [request, ...serviceRequests].slice(0, 100);
  if (serviceRequestName) serviceRequestName.value = "";
  if (serviceRequestEmail) serviceRequestEmail.value = "";
  if (serviceRequestNeed) serviceRequestNeed.value = "";
  if (serviceRequestStatus) {
    serviceRequestStatus.textContent = "Request saved locally. Later this can connect to email or a waitlist.";
    serviceRequestStatus.classList.add("good-text");
    serviceRequestStatus.classList.remove("bad-text");
  }
  renderServiceRequests();
  renderSettings();
  saveAppState();
};

const getPilotContext = () => {
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const spendingStats = getSpendingStats();
  const signals = getCurrentMissionSignals();
  const largest = stats.largest ? `${stats.largest.ticker} at ${formatNumber(stats.largest.allocation)}%` : "no largest holding yet";
  const riskCount = holdings.filter((holding) => getRiskMeter(holding).score >= 55).length;
  return { stats, savingsStats, spendingStats, signals, largest, riskCount };
};

const getPilotIntent = (prompt) => {
  const text = prompt.toLowerCase();
  if (/(budget|spend|spending|cash flow|cashflow|leak|bills|income|expense)/.test(text)) return "budget";
  if (/(save|savings|emergency|runway|goal|goals)/.test(text)) return "savings";
  if (/(risk|safer|safe|portfolio|stock|stocks|allocation|diversif|correlation|rebalance)/.test(text)) return "portfolio";
  if (/(compare|research|company|news|watchlist)/.test(text)) return "research";
  if (/(learn|explain|term|behavior|bias|anomal)/.test(text)) return "learning";
  if (/(first|next|priority|week|plan|action)/.test(text)) return "plan";
  return "general";
};

const buildPilotAnswer = (prompt) => {
  const cleanPrompt = prompt.trim();
  const intent = getPilotIntent(cleanPrompt);
  const context = getPilotContext();
  const { stats, savingsStats, spendingStats, signals, largest, riskCount } = context;
  const topMission = signals.missions[0] || { title: "Review the system", detail: "Refresh the app sections and choose one small action for this week.", tone: "warn" };
  const base = {
    label: "StockPilot Assistant",
    title: "Start with one clear next move",
    summary: "I read the current app signals and built a simple educational next step.",
    bullets: [
      `Portfolio: ${holdings.length ? `${holdings.length} holding${holdings.length === 1 ? "" : "s"}, ${Math.round(stats.weightedScore)}/100 score, largest position ${largest}.` : "no portfolio loaded yet."}`,
      `Budget: ${currency(savingsStats.leftover)} monthly cash flow, ${formatNumber(savingsStats.savingsRateValue, 1)}% savings rate, ${formatNumber(savingsStats.runway, 1)} months runway.`,
      `Current priority: ${topMission.title}. ${topMission.detail}`
    ],
    actionTitle: topMission.title,
    actionReason: topMission.detail,
    actionExpected: "This should make the app's next weekly plan clearer and reduce the biggest visible pressure.",
    tone: topMission.tone || "warn",
    toolId: "plan"
  };

  if (intent === "portfolio") {
    const saferMove = !holdings.length
      ? "Load real tickers and percentages first so StockPilot can calculate allocation, risk, return, and correlation."
      : riskCount
        ? `Review the ${riskCount} high-risk holding${riskCount === 1 ? "" : "s"}, then use Rebalance Lab before changing anything.`
        : stats.largest && stats.largest.allocation > 25
          ? `Check concentration first because ${stats.largest.ticker} is ${formatNumber(stats.largest.allocation)}% of the portfolio.`
          : "The portfolio does not show an obvious emergency signal. Use Graphs and Rebalance Lab to compare a calmer target mix.";
    return {
      ...base,
      title: "Portfolio safety check",
      summary: saferMove,
      bullets: [
        holdings.length ? `Score is ${Math.round(stats.weightedScore)}/100 with ${stats.averageCorrelation === null ? "N/A" : formatNumber(stats.averageCorrelation, 2)} average correlation.` : "No holdings are loaded yet.",
        `Largest position: ${largest}.`,
        riskCount ? `${riskCount} holding${riskCount === 1 ? "" : "s"} have elevated risk-meter pressure.` : "No loaded holding is currently above the high risk-meter threshold."
      ],
      actionTitle: holdings.length ? "Run a portfolio safety review" : "Load a real portfolio",
      actionReason: saferMove,
      actionExpected: "This should make concentration, risk, and rebalancing choices easier to compare.",
      toolId: holdings.length ? "rebalance" : "portfolio",
      tone: riskCount || !holdings.length ? "warn" : "good"
    };
  }

  if (intent === "budget") {
    const leakText = spendingStats.biggestLeak
      ? `${spendingStats.biggestLeak.category} is ${currency(spendingStats.biggestLeak.over)} over plan.`
      : "No tracked category is above plan yet.";
    const budgetMove = savingsStats.leftover < 0
      ? `Fix the ${currency(Math.abs(savingsStats.leftover))} monthly shortfall before adding new goals.`
      : spendingStats.variance < 0
        ? `Start with the spending leak: ${leakText}`
        : "Budget signals look usable. Keep reviewing weekly and protect the monthly cushion.";
    return {
      ...base,
      title: "Budget cleanup plan",
      summary: budgetMove,
      bullets: [
        `Monthly cash flow: ${currency(savingsStats.leftover)}.`,
        `Tracked spending variance: ${currency(spendingStats.variance)}.`,
        leakText
      ],
      actionTitle: savingsStats.leftover < 0 ? "Close the monthly cash-flow gap" : "Review spending leaks",
      actionReason: budgetMove,
      actionExpected: "This should improve budget health and make savings goals more realistic.",
      toolId: "budget",
      tone: savingsStats.leftover < 0 || spendingStats.variance < 0 ? "bad" : "good"
    };
  }

  if (intent === "savings") {
    const targetText = savingsStats.runway < 3
      ? `Emergency runway is ${formatNumber(savingsStats.runway, 1)} months, so building toward 3 months is the clean first target.`
      : "Emergency runway is at least 3 months, so goals can be prioritized by deadline and importance.";
    return {
      ...base,
      title: "Savings route",
      summary: targetText,
      bullets: [
        `Savings rate: ${formatNumber(savingsStats.savingsRateValue, 1)}%.`,
        `Emergency runway: ${formatNumber(savingsStats.runway, 1)} months.`,
        `Monthly leftover after planned outflows: ${currency(savingsStats.leftover)}.`
      ],
      actionTitle: savingsStats.runway < 3 ? "Build emergency runway" : "Prioritize savings goals",
      actionReason: targetText,
      actionExpected: "This should make the savings plan feel less vague and more measurable.",
      toolId: savingsStats.runway < 3 ? "protection" : "savings-goals",
      tone: savingsStats.runway < 3 ? "warn" : "good"
    };
  }

  if (intent === "research") {
    return {
      ...base,
      title: "Research route",
      summary: "Use Research to compare companies, refresh headlines, and separate news from an actual investment thesis.",
      bullets: [
        "Compare tickers before treating one company as automatically better.",
        "Read headlines as context, not automatic buy or sell signals.",
        "If a stock moved, ask what changed: revenue, margins, debt, valuation, competition, regulation, or sentiment."
      ],
      actionTitle: "Run a research check",
      actionReason: "Compare companies and review news before changing the portfolio.",
      actionExpected: "This should reduce headline-driven decisions and improve the quality of the next portfolio move.",
      toolId: "research",
      tone: "warn"
    };
  }

  if (intent === "learning") {
    return {
      ...base,
      title: "Learning route",
      summary: "Use Learning when the question is really about understanding the term, bias, or market concept before acting.",
      bullets: [
        "Simple Terms explains labels in plain English.",
        "Behavior covers investor biases like anchoring, loss aversion, and overconfidence.",
        "Practice checks whether the idea actually stuck."
      ],
      actionTitle: "Review the matching learning card",
      actionReason: "A confusing term or bias should be understood before it becomes a money decision.",
      actionExpected: "This should make the next app output easier to understand without guessing.",
      toolId: /bias|behavior|anomal/.test(cleanPrompt.toLowerCase()) ? "behavior" : "terms",
      tone: "good"
    };
  }

  if (intent === "plan") {
    return {
      ...base,
      title: "This week's first move",
      summary: `${topMission.title}: ${topMission.detail}`,
      bullets: [
        `${signals.urgentCount} urgent signal${signals.urgentCount === 1 ? "" : "s"} and ${signals.warningCount} caution signal${signals.warningCount === 1 ? "" : "s"} found.`,
        `Financial weather: ${signals.weather}.`,
        "Log the action before making changes so the reasoning is saved."
      ],
      actionTitle: topMission.title,
      actionReason: topMission.detail,
      actionExpected: "This should keep the week focused on one high-impact action instead of ten half-actions.",
      toolId: "plan",
      tone: topMission.tone || "warn"
    };
  }

  return base;
};

const renderPilotAnswer = (answer) => {
  if (!askPilotOutput) return;
  askPilotOutput.className = `ask-pilot-output ${answer.tone || "warn"}`;
  askPilotOutput.innerHTML = `
    <span>${escapeHtml(answer.label || "StockPilot Assistant")}</span>
    <strong>${escapeHtml(answer.title)}</strong>
    <p>${escapeHtml(answer.summary)}</p>
    <ul>
      ${answer.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
    <small>Educational only. StockPilot helps organize tradeoffs; it does not make final financial decisions.</small>
  `;
};

const runPilotAssistant = () => {
  const prompt = askPilotInput?.value.trim() || "";
  if (!prompt) {
    if (askPilotOutput) {
      askPilotOutput.className = "ask-pilot-output warn";
      askPilotOutput.innerHTML = `
        <span>Need a prompt</span>
        <strong>Type what you want StockPilot to help with.</strong>
        <p>Try: "Make my portfolio safer", "Fix my budget", or "What should I do first this week?"</p>
      `;
    }
    return;
  }
  const answer = buildPilotAnswer(prompt);
  lastPilotPlanAction = {
    title: answer.actionTitle,
    reason: answer.actionReason,
    expected: answer.actionExpected,
    tone: answer.tone || "warn",
    prompt
  };
  lastPilotTool = TOOL_LAUNCHER_ITEMS.find((item) => item.id === answer.toolId) || null;
  renderPilotAnswer(answer);
  if (askPilotAddPlanButton) askPilotAddPlanButton.disabled = false;
  if (askPilotOpenToolButton) {
    askPilotOpenToolButton.disabled = !lastPilotTool;
    askPilotOpenToolButton.textContent = lastPilotTool ? `Open ${lastPilotTool.title}` : "Open Tool";
  }
};

const addPilotResultToPlan = () => {
  if (!lastPilotPlanAction) return;
  decisionJournal.unshift({
    id: crypto.randomUUID(),
    type: "StockPilot Assistant",
    title: lastPilotPlanAction.title,
    reason: lastPilotPlanAction.reason,
    expected: lastPilotPlanAction.expected,
    tone: lastPilotPlanAction.tone,
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  });
  decisionJournal = decisionJournal.slice(0, 80);
  renderMyPlan();
  saveAppState();
  if (askPilotAddPlanButton) {
    askPilotAddPlanButton.textContent = "Added To My Plan";
    askPilotAddPlanButton.disabled = true;
    setTimeout(() => {
      askPilotAddPlanButton.textContent = "Add Result To My Plan";
      askPilotAddPlanButton.disabled = !lastPilotPlanAction;
    }, 1600);
  }
};

const openPilotTool = () => {
  if (lastPilotTool) launchTool(lastPilotTool);
};

const buildDemoHolding = ({ ticker, name, category, assetClass, allocation, price, pe, ps, dividendYield, beta, roe, debtEquity, growth }, index) => {
  const returns = generatedReturnSeries(index, beta);
  const holding = {
    id: crypto.randomUUID(),
    ticker,
    name,
    sector: category || assetClass,
    assetClass,
    category: category || assetClass,
    price,
    dataAsOf: "Demo",
    marketCap: NaN,
    allocation,
    pe,
    ps,
    dividendYield,
    roe,
    debtEquity,
    growth,
    beta,
    returns,
    marketDataOnly: false,
    sourceData: {
      ticker,
      name,
      sector: category || assetClass,
      assetClass,
      price,
      dataAsOf: "Demo",
      beta,
      allocation,
      returnSeries: returns.join(",")
    }
  };
  holding.score = scoreHoldingFromRatios(holding);
  return holding;
};

const loadDemoHoldings = async () => {
  const demoHoldings = [
    { ticker: "AAPL", name: "Apple", category: "Technology", assetClass: "Stock", allocation: 18, price: 293, pe: 35, ps: 9.5, dividendYield: 0.5, beta: 1.07, roe: 68, debtEquity: 1.5, growth: 8 },
    { ticker: "MSFT", name: "Microsoft", category: "Technology", assetClass: "Stock", allocation: 17, price: 449, pe: 34, ps: 13, dividendYield: 0.7, beta: 0.92, roe: 36, debtEquity: 0.35, growth: 12 },
    { ticker: "NVDA", name: "Nvidia", category: "Semiconductors", assetClass: "Stock", allocation: 15, price: 114, pe: 38, ps: 20, dividendYield: 0.03, beta: 1.75, roe: 70, debtEquity: 0.25, growth: 28 },
    { ticker: "BND", name: "Vanguard Total Bond Market ETF", category: "Core Bonds", assetClass: "Bond", allocation: 15, price: 73, pe: NaN, ps: NaN, dividendYield: 3.5, beta: 0.18, roe: 0, debtEquity: 0, growth: 2 },
    { ticker: "VNQ", name: "Vanguard Real Estate ETF", category: "Real Estate", assetClass: "Real Estate", allocation: 12, price: 82, pe: 31, ps: 8, dividendYield: 4.0, beta: 1.05, roe: 0, debtEquity: 0.8, growth: 3 },
    { ticker: "GLD", name: "SPDR Gold Shares", category: "Commodity", assetClass: "Commodity", allocation: 8, price: 306, pe: NaN, ps: NaN, dividendYield: 0, beta: 0.35, roe: 0, debtEquity: 0, growth: 4 },
    { ticker: "BTC-USD", name: "Bitcoin", category: "Crypto", assetClass: "Crypto", allocation: 15, price: 103000, pe: NaN, ps: NaN, dividendYield: 0, beta: 2.2, roe: 0, debtEquity: 0, growth: 18 }
  ];
  holdings = demoHoldings.map(buildDemoHolding);
  // Fetch real prices from API
  try {
    const tickers = demoHoldings.map(h => h.ticker).join(",");
    const apiBase = stockPilotApiOnline ? stockPilotApiBaseUrl : "https://mystockspilot.com";
    const res = await fetch(`${apiBase}/api/quotes?symbols=${tickers}`);
    const data = await res.json();
    const quotes = data?.quoteResponse?.result || [];
    quotes.forEach(quote => {
      const holding = holdings.find(h => h.ticker === quote.symbol);
      if (holding && quote.regularMarketPrice) {
        holding.price = quote.regularMarketPrice;
        holding.dataAsOf = "Live";
      }
    });
    renderPortfolio();
  } catch(e) {
    // fallback to hardcoded prices
  }
};

const fillDemoTables = () => {
  restoredSpendingRows = [
    { category: "Groceries", planned: 480, actual: 540, type: "Need", notes: "Inflation pressure" },
    { category: "Eating out", planned: 200, actual: 260, type: "Want", notes: "Easy cut" },
    { category: "Transport", planned: 260, actual: 245, type: "Need", notes: "Gas and rides" },
    { category: "Subscriptions", planned: 95, actual: 132, type: "Want", notes: "Review leaks" },
    { category: "Emergency savings", planned: 500, actual: 500, type: "Goal", notes: "Protect runway" }
  ];
  restoredInsuranceRows = [
    { coverage: "Health", premium: 180, deductible: 1500, status: "Active" },
    { coverage: "Auto", premium: 155, deductible: 750, status: "Active" },
    { coverage: "Renters", premium: 20, deductible: 500, status: "Active" },
    { coverage: "Disability", premium: 0, deductible: 0, status: "Review" },
    { coverage: "Life", premium: 0, deductible: 0, status: "Maybe" }
  ];
  renderSpendingInputTable();
  renderInsuranceInputTable();
  const subscriptionInput = document.querySelector("#subscriptionList");
  if (subscriptionInput) {
    subscriptionInput.value = [
      "Netflix 18 day 14",
      "Spotify 11 day 3",
      "iCloud 3 day 21",
      "Gym 39 day 8",
      "Adobe 23 day 17"
    ].join("\n");
  }
};

const renderProfessorDemoKit = () => {
  if (!professorDemoGrid) return;
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const sampleRows = parsePortfolioBuilderRows(bulkInput?.value || "");
  const behaviorPanelExists = Boolean(document.querySelector('[data-education-panel="behavior"]'));
  const items = [
    {
      tone: holdings.length ? "good" : sampleRows.length ? "warn" : "bad",
      title: "Portfolio story",
      detail: holdings.length
        ? `${holdings.length} loaded assets with a ${Math.round(stats.weightedScore)}/100 score.`
        : sampleRows.length
          ? `${sampleRows.length} sample tickers are ready. Load data if internet access is available.`
          : "Prepare the sample tickers before presenting."
    },
    {
      tone: savingsStats.income > 0 ? "good" : "bad",
      title: "Budget story",
      detail: savingsStats.income > 0
        ? `${currency(savingsStats.leftover)} monthly cash-flow view with ${formatNumber(savingsStats.runway, 1)} months runway.`
        : "Add monthly income and spending inputs."
    },
    {
      tone: "good",
      title: "Assistant story",
      detail: "Ask StockPilot can route prompts across investing, budgeting, savings, learning, and My Plan."
    },
    {
      tone: decisionJournal.length ? "good" : "warn",
      title: "Decision memory",
      detail: decisionJournal.length
        ? `${decisionJournal.length} journal entr${decisionJournal.length === 1 ? "y" : "ies"} saved with reasoning.`
        : "Add one assistant result or plan action to show decision memory."
    },
    {
      tone: behaviorPanelExists ? "good" : "bad",
      title: "Course link",
      detail: behaviorPanelExists
        ? "Behavioral finance and market anomalies are integrated into Learning."
        : "Behavioral finance section is missing."
    },
    {
      tone: "good",
      title: "Ethics guardrail",
      detail: "The app clearly frames outputs as educational and asks users to verify real-world data."
    }
  ];
  const readyCount = items.filter((item) => item.tone === "good").length;
  professorDemoGrid.innerHTML = `
    <article class="professor-readiness-card">
      <span>Demo Readiness</span>
      <strong>${readyCount}/${items.length}</strong>
      <div class="setup-progress-track" aria-hidden="true"><i style="width:${(readyCount / items.length) * 100}%"></i></div>
      <p>${readyCount >= 5 ? "Presentation flow is ready." : "Prepare the sample flow before showing it."}</p>
    </article>
    ${items
      .map(
        (item) => `
          <article class="professor-demo-card ${item.tone}">
            <span>${item.tone === "good" ? "Ready" : item.tone === "bad" ? "Fix" : "Check"}</span>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.detail)}</p>
          </article>
        `
      )
      .join("")}
  `;
  renderPresentationMode();
};

const renderPresentationMode = () => {
  if (!presentationModeGrid) return;
  const sourceMode = stockPilotApiOnline ? "Local API gateway" : "Browser fallback";
  const confidenceCounts = holdings.reduce(
    (counts, holding) => {
      counts[holdingConfidence(holding).level] += 1;
      return counts;
    },
    { High: 0, Medium: 0, Low: 0 }
  );
  const cards = [
    {
      tone: "good",
      title: "What is real",
      detail: `${sourceMode} is used for available prices, price history, quotes, RSS headlines, FRED macro context when connected, local budget math, calculators, and user-entered portfolio weights.`
    },
    {
      tone: "warn",
      title: "What is estimated",
      detail: "Scores, risk meters, correlation, intrinsic value, TVM outputs, thesis prompts, and portfolio fit are educational models built from available inputs."
    },
    {
      tone: "warn",
      title: "What may be missing",
      detail: "SEC filing facts help with supported US companies, but analyst estimates, real-time quotes, official Fortune 500 ranks, and premium news need licensed providers."
    },
    {
      tone: holdings.length && confidenceCounts.Low === 0 ? "good" : "warn",
      title: "Holding confidence",
      detail: holdings.length
        ? `${confidenceCounts.High} high, ${confidenceCounts.Medium} medium, ${confidenceCounts.Low} low confidence rows based on price, history, fundamentals, and date.`
        : "Load holdings to show row-level confidence labels."
    },
    {
      tone: "good",
      title: "What to say",
      detail: "StockPilot is educational decision support. It organizes data, tradeoffs, and risks, but users must verify real-world numbers before acting."
    }
  ];
  presentationModeGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="presentation-card ${card.tone}">
          <span>${escapeHtml(card.title)}</span>
          <p>${escapeHtml(card.detail)}</p>
        </article>
      `
    )
    .join("");
};

const runDemoStep = (label, action) => {
  try {
    action();
    return true;
  } catch (error) {
    console.error(`Demo step failed: ${label}`, error);
    return false;
  }
};

const prepareProfessorDemo = () => {
  if (demoModeButton) {
    demoModeButton.disabled = true;
    demoModeButton.textContent = "Loading Demo...";
  }
  try {
  if (bulkInput) {
    bulkInput.value = SAMPLE_BULK_PORTFOLIO;
    renderAssetInputTable();
    updateBulkStatus();
  }
  loadDemoHoldings();
  fillDemoTables();
  const demoValues = {
    monthlyIncome: 4500,
    fixedBills: 2100,
    flexibleSpending: 950,
    monthlySavings: 700,
    debtPayments: 300,
    emergencyFund: 6000,
    goalTarget: 5000,
    goalSaved: 1800,
    goalMonthly: 350
  };
  Object.entries(demoValues).forEach(([id, value]) => {
    const input = document.querySelector(`#${id}`);
    if (input) input.value = value;
  });
  moneyGoals = [
    {
      id: crypto.randomUUID(),
      name: "Emergency fund",
      category: "Emergency",
      target: 12000,
      saved: 6000,
      monthly: 700,
      deadline: "2026-12-31"
    },
    {
      id: crypto.randomUUID(),
      name: "Student debt payoff",
      category: "Debt",
      target: 8000,
      saved: 1800,
      monthly: 350,
      deadline: "2027-05-31"
    },
    {
      id: crypto.randomUUID(),
      name: "Long-term investing",
      category: "Investing",
      target: 25000,
      saved: 9200,
      monthly: 500,
      deadline: "2028-12-31"
    }
  ];
  if (!decisionJournal.some((entry) => entry.type === "Professor Demo")) {
    decisionJournal.unshift({
      id: crypto.randomUUID(),
      type: "Professor Demo",
      title: "Show StockPilot as educational decision support",
      reason: "Demonstrate how portfolio signals, budgeting, behavioral finance, and planning connect in one workflow.",
      expected: "Professor can see the finance logic, the UX flow, and the responsibility guardrails clearly.",
      tone: "good",
      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    });
    decisionJournal = decisionJournal.slice(0, 80);
  }
  portfolioTheses = {
    ...portfolioTheses,
    AAPL: {
      reason: "Core profitable technology holding with strong ecosystem and cash generation.",
      risk: "Valuation risk and heavy dependence on premium consumer demand.",
      review: "Review if allocation rises above 25%, score falls below 65, or revenue growth weakens.",
      bias: "Familiarity bias",
      updated: thesisDate()
    },
    BND: {
      reason: "Bond ETF used to reduce portfolio volatility and diversify equity risk.",
      risk: "Interest-rate changes can pressure bond prices.",
      review: "Review if rate expectations change or bond allocation falls below target.",
      bias: "None noted",
      updated: thesisDate()
    },
    BTC: {
      reason: "Small alternative asset sleeve for high-risk growth exposure.",
      risk: "Extreme volatility, regulation, and drawdown risk.",
      review: "Review if allocation grows beyond the planned limit or drawdown becomes uncomfortable.",
      bias: "Recency bias",
      updated: thesisDate()
    },
    "BTC-USD": {
      reason: "Small alternative asset sleeve for high-risk growth exposure.",
      risk: "Extreme volatility, regulation, and drawdown risk.",
      review: "Review if allocation grows beyond the planned limit or drawdown becomes uncomfortable.",
      bias: "Recency bias",
      updated: thesisDate()
    }
  };
  completedBudgetActions = [...new Set([...completedBudgetActions, "cash-flow", "decision-log"])];
  completedLessons = [...new Set([...completedLessons, "income-expense", "emergency-fund", "stock-bond-etf", "diversification"])];
  completedLearningMissions = [...new Set([...completedLearningMissions, "budget-basics", "portfolio-basics"])];
  macroData = macroData || getFallbackMacroData();
  if (askPilotInput) askPilotInput.value = "What should I show my finance professor first?";
  const demoSteps = [
    ["assistant", runPilotAssistant],
    ["portfolio", updatePortfolio],
    ["thesis", renderThesisBuilder],
    ["savings", renderSavingsBudget],
    ["goals", renderGoalsHub],
    ["macro", renderMacroDashboard],
    ["learning charts", renderLearningCharts],
    ["learning path", renderLearningPath],
    ["learning practice", renderLearningPractice],
    ["learning dashboard", renderLearningDashboard],
    ["command center", renderCommandCenter],
    ["my plan", renderMyPlan],
    ["professor kit", renderProfessorDemoKit],
    ["freshness", renderDataFreshness]
  ];
  const failedSteps = demoSteps.filter(([label, action]) => !runDemoStep(label, action)).map(([label]) => label);
  recordDataFreshness("portfolio", "success", "Demo holdings loaded instantly for presentation.", "Built-in demo portfolio");
  recordDataFreshness("savings", "success", "Demo budget, spending, subscriptions, insurance, and goals loaded.", "Built-in demo profile");
  recordDataFreshness("learning", "success", "Demo learning progress loaded.", "Built-in curriculum");
  recordDataFreshness("charts", "success", "Demo dashboards and graphs refreshed.", "Local rendering");
  runDemoStep("command center refresh", renderCommandCenter);
  runDemoStep("copilot report", renderCopilotReport);
  runDemoStep("settings", renderSettings);
  if (professorDemoStatus) {
    professorDemoStatus.textContent = failedSteps.length
      ? `Demo loaded, but ${failedSteps.join(", ")} needs a refresh. You can still present the main flow.`
      : "Demo run loaded. Start in Command Center, then show Investing, Savings, My Plan, and Learning.";
    professorDemoStatus.classList.toggle("good-text", !failedSteps.length);
    professorDemoStatus.classList.toggle("bad-text", failedSteps.length > 0);
  }
  setMoneyMode("command");
  document.querySelector(".command-hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
  saveAppState();
  if (demoModeButton) {
    demoModeButton.textContent = "Demo Loaded";
  }
  } catch (error) {
    console.error("Demo load failed", error);
    if (professorDemoStatus) {
      professorDemoStatus.textContent = "Demo hit a small loading issue, but the button was reset. Try Run Demo again after refreshing.";
      professorDemoStatus.classList.add("bad-text");
      professorDemoStatus.classList.remove("good-text");
    }
  } finally {
  if (demoModeButton) {
    demoModeButton.disabled = false;
    if (demoModeButton.textContent === "Loading Demo...") demoModeButton.textContent = "Run Demo";
    setTimeout(() => {
      demoModeButton.textContent = "Run Demo";
    }, 1800);
  }
  }
};

const refreshAfterSectionClear = (message = "Section cleared. Add your own inputs when ready.") => {
  update();
  updatePortfolio();
  renderSavingsBudget();
  renderGoalsHub();
  renderLearningCharts();
  renderLearningPath();
  renderLearningPractice();
  renderLearningDashboard();
  renderMyPlan();
  renderCommandCenter();
  renderCopilotReport();
  renderWeeklyReport();
  renderDataFreshness();
  updateReportPreview();
  updateSaveStatus(message);
  saveAppState();
};

const clearInvestingDemoData = () => {
  holdings = [];
  portfolioTheses = {};
  if (bulkInput) bulkInput.value = "";
  if (tickerImport) tickerImport.value = "";
  if (watchlistInput) watchlistInput.value = "";
  if (marketWatchlistInput) marketWatchlistInput.value = "";
  if (compareInput) compareInput.value = "";
  if (companySearchInput) companySearchInput.value = "";
  if (thesisTickerSelect) thesisTickerSelect.innerHTML = `<option value="">Load portfolio first</option>`;
  if (thesisReason) thesisReason.value = "";
  if (thesisRisk) thesisRisk.value = "";
  if (thesisReview) thesisReview.value = "";
  if (thesisBias) thesisBias.value = "";
  renderAssetInputTable();
  updateBulkStatus();
  if (fetchStatus) fetchStatus.textContent = "Investing demo data cleared. Add tickers and percentages to start fresh.";
  if (watchlistGrid) watchlistGrid.innerHTML = "";
  if (companyIntelGrid) companyIntelGrid.innerHTML = "";
  if (companySearchStatus) companySearchStatus.textContent = "Search a company to load a fresh fact card.";
  if (newsGrid && activeNewsScope === "portfolio") renderNewsItems(latestNewsItems);
  if (typeof resetVirtualMarket === "function") resetVirtualMarket();
  refreshAfterSectionClear("Investing cleared");
};

const clearSavingsDemoData = () => {
  savingsInputs.forEach((input) => {
    input.value = "";
  });
  restoredSpendingRows = [];
  restoredInsuranceRows = [];
  if (spendingRows) {
    spendingRows.innerHTML = "";
    addSpendingInputRow();
  }
  if (insuranceRows) {
    insuranceRows.innerHTML = "";
    addInsuranceInputRow();
  }
  if (subscriptionRows) {
    const subscriptionInput = document.querySelector("#subscriptionList");
    if (subscriptionInput) subscriptionInput.value = "";
    subscriptionRows.innerHTML = "";
    addSubscriptionInputRow();
  }
  completedBudgetActions = [];
  renderBudgetActionChecklist();
  refreshAfterSectionClear("Savings and budgeting cleared");
};

const clearGoalsDemoData = () => {
  moneyGoals = [];
  if (goalHubName) goalHubName.value = "";
  if (goalHubTarget) goalHubTarget.value = "";
  if (goalHubSaved) goalHubSaved.value = "";
  if (goalHubMonthly) goalHubMonthly.value = "";
  if (goalHubDeadline) goalHubDeadline.value = "";
  if (goalHubCategory) goalHubCategory.value = "Emergency";
  refreshAfterSectionClear("Goals cleared");
};

const clearLearningDemoData = () => {
  completedLessons = [];
  learningQuizResults = {};
  completedLearningMissions = [];
  refreshAfterSectionClear("Learning progress cleared");
};

const clearPlanDemoData = () => {
  decisionJournal = [];
  lastPilotPlanAction = null;
  if (journalTitle) journalTitle.value = "";
  if (journalReason) journalReason.value = "";
  if (journalExpected) journalExpected.value = "";
  if (askPilotInput) askPilotInput.value = "";
  if (askPilotOutput) askPilotOutput.innerHTML = `<strong>Ask StockPilot</strong><p>Try: "Make my portfolio safer", "Fix my budget", or "What should I do first this week?"</p>`;
  if (askPilotAddPlanButton) askPilotAddPlanButton.disabled = true;
  refreshAfterSectionClear("My Plan cleared");
};

const clearAllDemoData = () => {
  clearInvestingDemoData();
  clearSavingsDemoData();
  clearGoalsDemoData();
  clearLearningDemoData();
  clearPlanDemoData();
  dataFreshness = {
    portfolio: null,
    watchlist: null,
    macro: null,
    news: null,
    market: null,
    savings: null,
    learning: null,
    calculators: null,
    charts: null
  };
  if (professorDemoStatus) {
    professorDemoStatus.textContent = "Demo data cleared. The app is ready for custom inputs.";
    professorDemoStatus.classList.add("good-text");
    professorDemoStatus.classList.remove("bad-text");
  }
  refreshAfterSectionClear("All demo data cleared");
};

const renderCopilotReport = () => {
  if (!copilotReportGrid || !copilotNextActions) return;
  const report = getCopilotReportData();
  const largestText = report.stats.largest ? `${report.stats.largest.ticker} at ${formatNumber(report.stats.largest.allocation)}%` : "No largest holding yet";
  const budgetTone = report.savingsStats.leftover >= 0 && report.savingsStats.runway >= 3 ? "good" : report.savingsStats.leftover >= 0 ? "warn" : "bad";
  const portfolioTone = !holdings.length ? "warn" : report.stats.weightedScore >= 72 ? "good" : report.stats.weightedScore >= 55 ? "warn" : "bad";
  const learningTone = report.weakTopics.length ? "warn" : report.completed >= 3 ? "good" : "warn";
  const updateTone = report.staleKeys.length ? "warn" : "good";
  copilotReportGrid.innerHTML = [
    {
      tone: portfolioTone,
      label: "Portfolio",
      title: holdings.length ? `${report.verdict.label} · ${Math.round(report.stats.weightedScore)}/100` : "Portfolio not loaded",
      detail: holdings.length
        ? `${holdings.length} holdings, ${formatNumber(report.stats.totalAllocation)}% allocated, largest: ${largestText}. Return ${report.annualReturn}, risk ${report.annualRisk}.`
        : "Load assets in Investing to unlock allocation, risk, return, and correlation commentary."
    },
    {
      tone: budgetTone,
      label: "Budget",
      title: `${Math.round(report.savingsStats.healthScore)}/100 health`,
      detail: `${currency(report.savingsStats.leftover)} monthly cash flow, ${formatNumber(report.savingsStats.savingsRateValue, 1)}% savings rate, ${formatNumber(report.savingsStats.runway, 1)} months emergency runway.`
    },
    {
      tone: learningTone,
      label: "Learning",
      title: `${report.learningLevelValue} · ${report.completed}/${report.totalLessons} lessons`,
      detail: report.weakTopics.length
        ? `${report.weakTopics.length} weak quiz topic${report.weakTopics.length === 1 ? "" : "s"} to review. Next lesson: ${report.nextLesson?.title || "Review"}.`
        : `No weak quiz topics recorded. Next lesson: ${report.nextLesson?.title || "Review and practice"}.`
    },
    {
      tone: updateTone,
      label: "Updates",
      title: `${report.freshKeys.length}/${Object.keys(freshnessLabels).length} fresh`,
      detail: report.staleKeys.length
        ? `Needs check: ${report.staleKeys.map((key) => freshnessLabels[key]).join(", ")}.`
        : "All tracked areas were recently refreshed or recalculated."
    }
  ]
    .map(
      (item) => `
        <article class="copilot-card ${item.tone}">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `
    )
    .join("");
  copilotNextActions.innerHTML = `
    <h3>Next 5 Actions</h3>
    <div>
      ${report.actions
        .map(
          (action, index) => `
            <article class="copilot-action ${action.tone || "warn"}">
              <span>${index + 1}</span>
              <div>
                <strong>${escapeHtml(action.title)}</strong>
                <p>${escapeHtml(action.detail)}</p>
              </div>
            </article>
          `
        )
        .join("")}
    </div>
  `;
  renderWeeklyReport();
  renderEarlyAccess();
  renderServiceRequests();
};

const addJournalEntry = () => {
  const title = journalTitle?.value.trim();
  if (!title) {
    if (journalTitle) {
      journalTitle.placeholder = "Add the decision first";
      journalTitle.focus();
    }
    return;
  }
  decisionJournal.unshift({
    id: crypto.randomUUID(),
    type: journalType?.value || "Decision",
    title,
    reason: journalReason?.value.trim() || "",
    expected: journalExpected?.value.trim() || "",
    tone: "good",
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  });
  decisionJournal = decisionJournal.slice(0, 80);
  if (journalTitle) journalTitle.value = "";
  if (journalReason) journalReason.value = "";
  if (journalExpected) journalExpected.value = "";
  renderMyPlan();
  saveAppState();
};

const logTopPlanAction = () => {
  const signals = getCurrentMissionSignals();
  const topAction = getWeeklyPlanActions(signals)[0];
  if (!topAction) return;
  decisionJournal.unshift({
    id: crypto.randomUUID(),
    type: "Weekly Plan",
    title: topAction.title,
    reason: topAction.detail,
    expected: "This should reduce the highest-priority pressure in the current weekly plan.",
    tone: topAction.tone || "warn",
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  });
  decisionJournal = decisionJournal.slice(0, 80);
  renderMyPlan();
  saveAppState();
};

const deleteJournalEntry = (id) => {
  decisionJournal = decisionJournal.filter((entry) => entry.id !== id);
  renderMyPlan();
  saveAppState();
};

const goalCategoryNote = (category) => {
  const notes = {
    Emergency: "Budget and savings rate matter most. Keep risk low because this money protects you.",
    Debt: "Cash flow and debt payoff tools matter most. Extra payments can shorten the timeline.",
    Investing: "Budget surplus and portfolio risk matter most. Use investing tools before raising risk.",
    House: "Cash flow, emergency runway, and low-risk savings matter most.",
    Car: "Budget pressure and deadline matter most. Avoid letting the payment fight other goals.",
    School: "Savings timeline and emergency runway matter most. Keep flexibility for surprise costs.",
    Travel: "Monthly savings and spending leaks matter most. This should not weaken essentials.",
    Retirement: "Long horizon and consistent contributions matter most. Use portfolio tools carefully."
  };
  return notes[category] || "Budget, savings, and planning tools can help this goal.";
};

const monthsUntilGoalDeadline = (deadline) => {
  if (!deadline) return null;
  const end = new Date(`${deadline}T12:00:00`);
  if (Number.isNaN(end.getTime())) return null;
  const now = new Date();
  const months = (end.getFullYear() - now.getFullYear()) * 12 + (end.getMonth() - now.getMonth());
  return Math.max(months, 1);
};

const renderGoalsHub = () => {
  if (!goalCardGrid) return;
  const goals = moneyGoals.map((goal) => {
    const target = Math.max(0, Number(goal.target) || 0);
    const saved = Math.max(0, Number(goal.saved) || 0);
    const monthly = Math.max(0, Number(goal.monthly) || 0);
    const remaining = Math.max(target - saved, 0);
    const progress = target > 0 ? clamp((saved / target) * 100, 0, 100) : 0;
    const deadlineMonths = monthsUntilGoalDeadline(goal.deadline);
    const monthlyNeeded = deadlineMonths ? remaining / deadlineMonths : monthly;
    const monthsAtCurrent = monthly > 0 ? Math.ceil(remaining / monthly) : Infinity;
    return { ...goal, target, saved, monthly, remaining, progress, monthlyNeeded, monthsAtCurrent };
  });
  const totalRemaining = goals.reduce((sum, goal) => sum + goal.remaining, 0);
  const totalMonthlyNeeded = goals.reduce((sum, goal) => sum + goal.monthlyNeeded, 0);
  const savingsStats = getSavingsSnapshot();
  const availableForGoals = Math.max(savingsStats.leftover + savingsStats.savings, 0);
  const goalFitGap = availableForGoals - totalMonthlyNeeded;
  const focus = [...goals].filter((goal) => goal.remaining > 0).sort((a, b) => a.monthsAtCurrent - b.monthsAtCurrent || b.remaining - a.remaining)[0];

  if (goalFocusTitle) goalFocusTitle.textContent = focus ? focus.name : goals.length ? "Goals complete" : "Add a goal";
  if (goalFocusDetail) {
    goalFocusDetail.textContent = focus
      ? `${currency(focus.remaining)} left. Current pace: ${Number.isFinite(focus.monthsAtCurrent) ? `${focus.monthsAtCurrent} months` : "needs monthly contribution"}.`
      : goals.length
        ? "Every active goal is fully funded in this demo tracker."
        : "Your closest or most urgent goal will appear here.";
  }
  if (goalCount) goalCount.textContent = goals.length;
  if (goalCountNote) goalCountNote.textContent = goals.length ? `${goals.filter((goal) => goal.remaining <= 0).length} complete.` : "No goals yet.";
  if (goalRemainingTotal) goalRemainingTotal.textContent = currency(totalRemaining);
  if (goalRemainingNote) goalRemainingNote.textContent = totalRemaining > 0 ? "Across all active goals." : "Nothing remaining yet.";
  if (goalMonthlyNeeded) goalMonthlyNeeded.textContent = currency(totalMonthlyNeeded);
  if (goalMonthlyNote) goalMonthlyNote.textContent = "Deadline-based estimate where available.";
  if (goalBudgetFit) {
    goalBudgetFit.textContent = totalMonthlyNeeded <= 0 ? "Ready" : goalFitGap >= 0 ? "Fits" : "Short";
    goalBudgetFit.classList.toggle("good-text", totalMonthlyNeeded > 0 && goalFitGap >= 0);
    goalBudgetFit.classList.toggle("bad-text", totalMonthlyNeeded > 0 && goalFitGap < 0);
  }
  if (goalBudgetFitNote) {
    goalBudgetFitNote.textContent = totalMonthlyNeeded <= 0
      ? "Add deadlines or monthly targets."
      : goalFitGap >= 0
        ? `${currency(goalFitGap)} cushion after planned goal funding.`
        : `${currency(Math.abs(goalFitGap))} more needed monthly or adjust timelines.`;
  }

  goalCardGrid.innerHTML = goals.length
    ? goals
        .map((goal) => {
          const timeline = goal.remaining <= 0
            ? "Funded"
            : Number.isFinite(goal.monthsAtCurrent)
              ? `${goal.monthsAtCurrent} months at current pace`
              : "Add a monthly contribution";
          return `
            <article class="goal-card">
              <div class="goal-card-header">
                <div>
                  <span>${escapeHtml(goal.category)}</span>
                  <strong>${escapeHtml(goal.name)}</strong>
                </div>
                <button class="ghost-button small-button" data-delete-goal="${goal.id}" type="button">Delete</button>
              </div>
              <div class="goal-progress-track" aria-hidden="true"><i style="width: ${goal.progress}%"></i></div>
              <div class="goal-facts">
                <span>${formatNumber(goal.progress, 0)}% funded</span>
                <span>${currency(goal.remaining)} left</span>
                <span>${timeline}</span>
              </div>
              <p>${escapeHtml(goalCategoryNote(goal.category))}</p>
            </article>
          `;
        })
        .join("")
    : `<article class="suggestion-card warn"><strong>No goals yet</strong><span>Add one goal to connect budgeting, investing, and learning to something concrete.</span></article>`;
};

const addMoneyGoal = () => {
  const name = goalHubName?.value.trim() || "New goal";
  const goal = {
    id: crypto.randomUUID(),
    name,
    category: goalHubCategory?.value || "Emergency",
    target: Math.max(0, Number(goalHubTarget?.value) || 0),
    saved: Math.max(0, Number(goalHubSaved?.value) || 0),
    monthly: Math.max(0, Number(goalHubMonthly?.value) || 0),
    deadline: goalHubDeadline?.value || ""
  };
  moneyGoals.unshift(goal);
  renderGoalsHub();
  saveAppState();
};

const deleteMoneyGoal = (id) => {
  moneyGoals = moneyGoals.filter((goal) => goal.id !== id);
  renderGoalsHub();
  saveAppState();
};

const getSetupChecklistItems = (stats, savingsStats) => {
  const freshCount = Object.values(dataFreshness).filter((item) => item.status === "success").length;
  const totalFreshness = Object.keys(freshnessLabels).length || 1;
  const activeProfile = activeAccount || getLocalAccounts().find((item) => item.id === localStorage.getItem(ACCOUNT_SESSION_KEY));
  return [
    {
      id: "portfolio",
      title: "Load a real portfolio",
      detail: holdings.length
        ? `${holdings.length} asset${holdings.length === 1 ? "" : "s"} loaded. Score is ${Math.round(stats.weightedScore)}/100.`
        : "Add tickers and portfolio percentages so StockPilot can read allocation, risk, and correlation.",
      done: holdings.length > 0,
      action: "Open Portfolio"
    },
    {
      id: "budget",
      title: "Check cash flow",
      detail: savingsStats.income > 0
        ? `${currency(savingsStats.leftover)} monthly breathing room and ${formatNumber(savingsStats.runway, 1)} months runway.`
        : "Enter income, bills, savings, debt, and emergency fund to unlock money-plan signals.",
      done: savingsStats.income > 0,
      action: "Open Budget"
    },
    {
      id: "learning",
      title: "Start the learning path",
      detail: completedLessons.length
        ? `${completedLessons.length} lesson${completedLessons.length === 1 ? "" : "s"} completed. Keep building the pathway.`
        : "Complete the first pathway lesson so the app can guide beginner finance learning.",
      done: completedLessons.length > 0,
      action: "Open Learning"
    },
    {
      id: "plan",
      title: "Log one decision",
      detail: decisionJournal.length
        ? `${decisionJournal.length} decision${decisionJournal.length === 1 ? "" : "s"} saved locally with reasoning.`
        : "Use My Plan to record why a portfolio, budget, or savings change makes sense before acting.",
      done: decisionJournal.length > 0,
      action: "Open My Plan"
    },
    {
      id: "refresh",
      title: "Refresh your signals",
      detail: `${freshCount}/${totalFreshness} areas currently show fresh or recalculated data.`,
      done: freshCount >= Math.min(totalFreshness, 5),
      action: "Refresh"
    },
    {
      id: "account",
      title: "Create a user",
      detail: activeProfile ? `Signed in locally as ${activeProfile.name}. Use Backup before switching browsers.` : "Create a local demo user so the app feels personal during presentations.",
      done: Boolean(activeProfile),
      action: activeProfile ? "Open Account" : "Create User"
    }
  ];
};

const renderSetupChecklist = (stats, savingsStats) => {
  if (!setupChecklistGrid) return;
  const items = getSetupChecklistItems(stats, savingsStats);
  const completed = items.filter((item) => item.done).length;
  const nextItem = items.find((item) => !item.done) || items[0];
  setupChecklistGrid.innerHTML = `
    <article class="setup-progress-card">
      <span>Setup Progress</span>
      <strong>${completed}/${items.length}</strong>
      <div class="setup-progress-track" aria-hidden="true"><i style="width: ${(completed / items.length) * 100}%"></i></div>
      <p>${completed === items.length ? "The core workspace is ready." : `Next best step: ${nextItem.title}.`}</p>
      <button class="primary-button small-button" data-setup-action="${nextItem.id}" type="button">${completed === items.length ? "Review Dashboard" : nextItem.action}</button>
    </article>
    ${items
      .map(
        (item) => `
          <article class="setup-step-card ${item.done ? "done" : ""}">
            <div>
              <span>${item.done ? "Done" : "Next"}</span>
              <strong>${item.title}</strong>
              <p>${item.detail}</p>
            </div>
            <button class="${item.done ? "ghost-button" : "primary-button"} small-button" data-setup-action="${item.id}" type="button">${item.action}</button>
          </article>
        `
      )
      .join("")}
  `;
};

const handleSetupAction = (action) => {
  if (action === "portfolio") {
    setMoneyMode("investing");
    switchView("portfolio");
  } else if (action === "budget") {
    setMoneyMode("savings");
    showSavingsPanel("plan");
  } else if (action === "learning") {
    setMoneyMode("education");
    showLearningArea("pathway");
  } else if (action === "plan") {
    setMoneyMode("plan");
  } else if (action === "refresh") {
    refreshAllData();
  } else if (action === "account") {
    openAccountPanel(activeAccount ? "account" : "create");
  }
};

const renderCommandCenter = () => {
  if (!commandPortfolioScore) return;
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const spendingStats = getSpendingStats();
  const learningCount = document.querySelectorAll(".lesson-card, .simple-term-card, .history-timeline article").length;
  const riskyHoldings = holdings.filter((holding) => getRiskMeter(holding).score >= 45);
  const cryptoWeight = holdings.filter((holding) => holding.assetClass === "Crypto").reduce((sum, holding) => sum + holding.allocation, 0);
  const bondWeight = holdings.filter((holding) => holding.assetClass === "Bond").reduce((sum, holding) => sum + holding.allocation, 0);
  const stockWeight = holdings.filter((holding) => holding.assetClass === "Stock").reduce((sum, holding) => sum + holding.allocation, 0);
  const commodityWeight = holdings.filter((holding) => holding.assetClass === "Commodity").reduce((sum, holding) => sum + holding.allocation, 0);
  const realEstateWeight = holdings.filter((holding) => holding.assetClass === "Real Estate").reduce((sum, holding) => sum + holding.allocation, 0);
  const realAssetWeight = commodityWeight + realEstateWeight;
  const macroSignals = getMacroSignals();
  const marketMood =
    !holdings.length ? "Setup" : riskyHoldings.length >= Math.ceil(holdings.length / 2) ? "Defensive" : cryptoWeight > 20 ? "Speculative" : realAssetWeight > 25 ? "Real Assets" : "Balanced";

  commandPortfolioScore.textContent = holdings.length ? Math.round(stats.weightedScore) : "0";
  commandPortfolioNote.textContent = holdings.length
    ? `${holdings.length} assets loaded. Largest position: ${stats.largest ? `${stats.largest.ticker} at ${formatNumber(stats.largest.allocation)}%` : "N/A"}.`
    : "Load assets in Investing to activate portfolio intelligence.";
  commandBudgetScore.textContent = Math.round(savingsStats.healthScore);
  commandBudgetNote.textContent =
    spendingStats.variance < 0
      ? `${currency(Math.abs(spendingStats.variance))} over tracked spending plan.`
      : savingsStats.leftover >= 0
        ? `${currency(savingsStats.leftover)} left after planned outflows.`
        : `${currency(Math.abs(savingsStats.leftover))} monthly gap needs attention.`;
  commandLearningCount.textContent = learningCount;
  commandLearningNote.textContent = "Cards across tips, terms, concepts, history, and checks.";
  commandMarketMood.textContent = marketMood;
  commandMarketNote.textContent =
    marketMood === "Defensive"
      ? "Several holdings show elevated risk pressure."
      : marketMood === "Speculative"
        ? "Crypto or high-volatility exposure is a major driver."
        : marketMood === "Real Assets"
          ? "Commodity and real estate exposure is shaping the portfolio."
        : marketMood === "Setup"
          ? "Load a portfolio to generate market mood."
          : "Risk pressure looks mixed rather than extreme.";

  renderSetupChecklist(stats, savingsStats);
  renderApiStatusPanel();
  renderProfessorDemoKit();

  const persona = getMoneyPersona({ stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight });
  if (moneyPersonaBadge && moneyPersonaTitle && moneyPersonaDetail) {
    moneyPersonaBadge.textContent = persona.badge;
    moneyPersonaTitle.textContent = persona.title;
    moneyPersonaDetail.textContent = persona.detail;
  }
  renderPersonaBars(persona);
  const missions = getMissionQueue({ stats, savingsStats, spendingStats, riskyHoldings, cryptoWeight });
  const urgentCount = missions.filter((mission) => mission.tone === "bad").length;
  const warningCount = missions.filter((mission) => mission.tone === "warn").length;
  if (financialWeather && financialWeatherDetail) {
    financialWeather.textContent = urgentCount ? "Storm Watch" : warningCount >= 2 ? "Pressure Building" : warningCount ? "Mild Caution" : "Clear";
    financialWeather.classList.toggle("bad-text", urgentCount > 0);
    financialWeather.classList.toggle("good-text", urgentCount === 0 && warningCount === 0);
    financialWeatherDetail.textContent = urgentCount
      ? `${urgentCount} urgent item${urgentCount === 1 ? "" : "s"} need attention before optimization.`
      : warningCount
        ? `${warningCount} caution signal${warningCount === 1 ? "" : "s"} to monitor.`
        : "No urgent issues from the current demo inputs.";
  }
  renderMiniCards(missionQueueGrid, missions.length ? missions : [
    {
      tone: "good",
      title: "Nothing urgent",
      detail: "The current setup has no major warning signals. Keep reviewing it as new data comes in."
    }
  ]);

  renderMoneyMap(savingsStats);
  renderMiniCards(lifeScenarioGrid, [
    {
      tone: savingsStats.runway >= 3 ? "good" : "warn",
      title: "Job-loss test",
      detail: `${formatNumber(savingsStats.runway, 1)} months of emergency runway based on current spending.`
    },
    {
      tone: savingsStats.leftover >= 250 && spendingStats.variance >= 0 ? "good" : savingsStats.leftover >= 0 ? "warn" : "bad",
      title: "Rent + cost shock",
      detail: `${currency(savingsStats.leftover - 300)} left if monthly costs rise by $300.`
    },
    {
      tone: stats.returnStats.annualRisk && stats.returnStats.annualRisk > 28 ? "bad" : "warn",
      title: "Market -25%",
      detail: holdings.length ? "Use the simulator to estimate drawdown pressure across loaded holdings." : "Load assets first to test portfolio drawdown."
    },
    {
      tone: "good",
      title: "Save $300 more",
      detail: `Savings rate could move from ${formatNumber(savingsStats.savingsRateValue, 1)}% to ${formatNumber(savingsStats.income ? ((savingsStats.savings + 300) / savingsStats.income) * 100 : 0, 1)}%.`
    }
  ]);
  renderMiniCards(globalPulseGrid, [
    { tone: stockWeight >= 60 ? "warn" : "good", title: "US / equity sleeve", detail: `${formatNumber(stockWeight, 0)}% stock allocation loaded.` },
    { tone: macroSignals.highRates && bondWeight > 10 ? "warn" : bondWeight >= 15 ? "good" : "warn", title: "Rates and bonds", detail: `${formatMacroPercent(macroSignals.tenYear)} 10-year yield; ${formatNumber(bondWeight, 0)}% bond allocation.` },
    { tone: macroSignals.highInflation ? "warn" : "good", title: "Inflation pulse", detail: `${formatMacroPercent(macroSignals.inflationYoY)} CPI YoY estimate for budget pressure.` },
    { tone: macroSignals.unemploymentElevated ? "warn" : "good", title: "Jobs runway", detail: `${formatMacroPercent(macroSignals.unemployment)} unemployment; use with emergency savings.` },
    { tone: cryptoWeight > 15 ? "bad" : cryptoWeight > 0 ? "warn" : "good", title: "Crypto volatility", detail: `${formatNumber(cryptoWeight, 0)}% crypto allocation loaded.` },
    { tone: realAssetWeight > 30 ? "warn" : realAssetWeight >= 8 ? "good" : "warn", title: "Real assets", detail: `${formatNumber(realAssetWeight, 0)}% in commodities and real estate.` }
  ]);
  renderMiniCards(smartExplainerGrid, [
    {
      tone: stats.averageCorrelation !== null && stats.averageCorrelation > 0.72 ? "bad" : "good",
      title: "Diversification signal",
      detail:
        stats.averageCorrelation === null
          ? "Load at least two assets with price history to read correlation."
          : `Average correlation is ${formatNumber(stats.averageCorrelation, 2)}; lower usually means assets move less alike.`
    },
    {
      tone: spendingStats.variance < 0 ? "bad" : savingsStats.debtPressureValue > 20 ? "bad" : savingsStats.debtPressureValue > 12 ? "warn" : "good",
      title: "Cash-flow pressure",
      detail: spendingStats.variance < 0
        ? `Tracked spending is ${currency(Math.abs(spendingStats.variance))} above plan.`
        : `${formatNumber(savingsStats.debtPressureValue, 1)}% of income goes to debt payments.`
    },
    {
      tone: stats.largest && stats.largest.allocation > 30 ? "warn" : "good",
      title: "Concentration check",
      detail: stats.largest ? `${stats.largest.ticker} is the largest loaded position at ${formatNumber(stats.largest.allocation)}%.` : "No holdings loaded yet."
    },
    {
      tone: "warn",
      title: "Responsibility guardrail",
      detail: "Every signal is educational. Verify real data before making any real financial decision."
    }
  ]);
  renderCopilotReport();
  renderDataFreshness();
  renderMyPlan();
  renderPresentationMode();
};

const renderHoldingsTable = () => {
  holdingsBody.innerHTML = holdings
    .map(
      (holding) => `
        <tr>
          <td><strong>${escapeHtml(holding.ticker)}</strong></td>
          <td>${escapeHtml(holding.sector)}</td>
          <td>${formatNumber(holding.allocation)}%</td>
          <td>
            <strong>${Number.isFinite(Number(holding.price)) ? currency(holding.price) : "N/A"}</strong>
            <small class="price-source">${escapeHtml(holding.priceSource || "Price source")}</small>
          </td>
          <td>${holding.score}</td>
          <td>${Number.isFinite(holding.pe) ? formatNumber(holding.pe) : holding.assetClass === "Stock" ? "N/A" : "-"}</td>
          <td>${Number.isFinite(holding.dividendYield) ? `${formatNumber(holding.dividendYield, 2)}%` : "N/A"}</td>
          <td>${formatNumber(holding.beta, 2)}</td>
          <td>${escapeHtml(holding.priceAsOf || holding.dataAsOf || "N/A")}</td>
          <td>${renderConfidenceBadge(holding)}</td>
          <td>${renderRiskMeter(holding)}</td>
          <td><button class="delete-button" data-delete="${holding.id}" type="button" aria-label="Remove ${escapeHtml(holding.ticker)}">x</button></td>
        </tr>
      `
    )
    .join("");
};

const thesisDate = () => new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

const populateThesisFields = (ticker) => {
  const thesis = portfolioTheses[ticker] || {};
  if (thesisReason) thesisReason.value = thesis.reason || "";
  if (thesisRisk) thesisRisk.value = thesis.risk || "";
  if (thesisReview) thesisReview.value = thesis.review || "";
  if (thesisBias) thesisBias.value = thesis.bias || "None noted";
};

const renderThesisBuilder = () => {
  if (!thesisTickerSelect || !thesisGrid) return;
  const tickers = [...new Set(holdings.map((holding) => holding.ticker).filter(Boolean))];
  const previousTicker = thesisTickerSelect.value;
  thesisTickerSelect.innerHTML = tickers.length
    ? tickers.map((ticker) => `<option value="${escapeHtml(ticker)}">${escapeHtml(ticker)}</option>`).join("")
    : `<option value="">Load portfolio first</option>`;
  if (tickers.includes(previousTicker)) thesisTickerSelect.value = previousTicker;
  const activeTicker = thesisTickerSelect.value || tickers[0] || "";
  populateThesisFields(activeTicker);

  if (!tickers.length) {
    thesisGrid.innerHTML = `
      <article class="thesis-card empty-thesis-card">
        <span>No holdings yet</span>
        <strong>Load Data first.</strong>
        <p>Add assets above, then write a simple thesis for each one.</p>
      </article>
    `;
    if (thesisStatus) thesisStatus.textContent = "Load a portfolio, then write a simple thesis for each holding.";
    return;
  }

  thesisGrid.innerHTML = tickers
    .map((ticker) => {
      const thesis = portfolioTheses[ticker];
      const holding = holdings.find((item) => item.ticker === ticker);
      const complete = thesis?.reason && thesis?.risk && thesis?.review;
      return `
        <article class="thesis-card ${complete ? "complete" : ""}">
          <span>${complete ? "Thesis saved" : "Needs thesis"}</span>
          <strong>${escapeHtml(ticker)} ${holding ? `- ${formatNumber(holding.allocation)}%` : ""}</strong>
          <p><b>Why:</b> ${escapeHtml(thesis?.reason || "Add the reason this belongs in the portfolio.")}</p>
          <p><b>Risk:</b> ${escapeHtml(thesis?.risk || "Name the biggest thing that could go wrong.")}</p>
          <p><b>Review:</b> ${escapeHtml(thesis?.review || "Decide what would make you review it.")}</p>
          <small>${escapeHtml(thesis?.bias || "Bias check pending")}${thesis?.updated ? ` - Updated ${escapeHtml(thesis.updated)}` : ""}</small>
        </article>
      `;
    })
    .join("");
  const completedCount = tickers.filter((ticker) => portfolioTheses[ticker]?.reason && portfolioTheses[ticker]?.risk && portfolioTheses[ticker]?.review).length;
  if (thesisStatus) thesisStatus.textContent = `${completedCount}/${tickers.length} holdings have a thesis.`;
};

const saveSelectedThesis = () => {
  const ticker = thesisTickerSelect?.value;
  if (!ticker) {
    if (thesisStatus) thesisStatus.textContent = "Load a portfolio first.";
    return;
  }
  portfolioTheses[ticker] = {
    reason: thesisReason?.value.trim() || "",
    risk: thesisRisk?.value.trim() || "",
    review: thesisReview?.value.trim() || "",
    bias: thesisBias?.value || "None noted",
    updated: thesisDate()
  };
  renderThesisBuilder();
  if (thesisStatus) {
    thesisStatus.textContent = `${ticker} thesis saved.`;
    thesisStatus.classList.add("good-text");
  }
  saveAppState();
};

const renderPortfolioNotes = (stats) => {
  const notes = [];
  const settings = riskSettings[riskProfile.value];

  if (!holdings.length) notes.push("Start by adding assets in the Portfolio Builder or loading tickers from Stock Lookup.");
  if (stats.totalAllocation && Math.abs(stats.totalAllocation - 100) > 2) {
    notes.push(`Normalize allocation: current total is ${formatNumber(stats.totalAllocation)}%, not 100%.`);
  }
  const lowScorers = [...holdings].sort((a, b) => a.score - b.score).slice(0, 2).filter((holding) => holding.score < 60);
  lowScorers.forEach((holding) => {
    notes.push(`Review ${holding.ticker}: score is ${holding.score}, so it is pulling the portfolio down.`);
  });
  const marketOnly = holdings.length > 0 && holdings.every((holding) => holding.marketDataOnly);
  const bondWeight = holdings
    .filter((holding) => holding.assetClass === "Bond")
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const cryptoWeight = holdings
    .filter((holding) => holding.assetClass === "Crypto")
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const commodityWeight = holdings
    .filter((holding) => holding.assetClass === "Commodity")
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const realEstateWeight = holdings
    .filter((holding) => holding.assetClass === "Real Estate")
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const macroSignals = getMacroSignals();
  if (stats.weightedScore >= 72) {
    notes.push(marketOnly ? "Keep monitoring: recent price-history strength is solid." : "Keep candidate: quote and price-history data look solid.");
  }
  if (bondWeight > 0) notes.push(`Bond exposure: ${formatNumber(bondWeight)}% is allocated to bond-style holdings.`);
  if (cryptoWeight > 10) notes.push(`Crypto risk: ${formatNumber(cryptoWeight)}% crypto exposure can add major volatility.`);
  if (commodityWeight > 0) notes.push(`Commodity exposure: ${formatNumber(commodityWeight)}% is allocated to inflation-sensitive real assets.`);
  if (realEstateWeight > 0) notes.push(`Real estate exposure: ${formatNumber(realEstateWeight)}% is allocated to REIT or property-style holdings.`);
  if (macroSignals.highRates && bondWeight + realEstateWeight > 10) {
    notes.push(`Macro check: rates are elevated, so review the ${formatNumber(bondWeight + realEstateWeight)}% bond/real-estate sleeve for rate sensitivity.`);
  }
  if (macroSignals.highInflation && commodityWeight < 5) {
    notes.push("Macro check: inflation is elevated. Review cash-flow assumptions and whether the portfolio has enough inflation-aware exposure for your goals.");
  }
  if (macroSignals.unemploymentElevated) {
    notes.push("Macro check: unemployment pressure is elevated, so emergency runway matters before adding aggressive risk.");
  }
  if (stats.weightedScore > 0 && stats.weightedScore < 58) {
    notes.push(marketOnly ? "Reduce risk: recent price action is weak or volatile." : "Review valuation: some holdings look weak or expensive.");
  }
  if (stats.averageCorrelation !== null && stats.averageCorrelation > 0.72) {
    notes.push("Diversify: average correlation is high, so holdings may move together.");
  }
  if (stats.averageCorrelation !== null && stats.averageCorrelation < 0.45) {
    notes.push("Diversification is healthy: average correlation is relatively low.");
  }
  if (stats.largest && stats.largest.allocation > settings.maxAllocation) {
    notes.push(`Trim or justify ${stats.largest.ticker}: it is above the ${settings.maxAllocation}% position limit.`);
  }
  if (stats.weightedBeta > settings.maxBeta) {
    notes.push(`Lower volatility: weighted beta is ${formatNumber(stats.weightedBeta, 2)}, above target.`);
  }

  portfolioNotes.innerHTML = notes.map((note) => `<li>${note}</li>`).join("");
};

const getTargetSuggestions = (stats) => {
  if (!holdings.length) {
    return [
      {
        tone: "warn",
        title: "Load a Portfolio",
        detail: "Add ticker and percentage rows, then load data to generate target suggestions."
      }
    ];
  }

  const settings = riskSettings[riskProfile.value];
  const suggestions = [];
  const total = stats.totalAllocation || 100;
  const largest = stats.largest;
  const highBeta = holdings.filter((holding) => holding.beta > settings.maxBeta).sort((a, b) => b.beta - a.beta).slice(0, 2);
  const lowScore = holdings.filter((holding) => holding.score < 55).sort((a, b) => a.score - b.score).slice(0, 2);
  const realAssetWeight = holdings
    .filter((holding) => holding.assetClass === "Commodity" || holding.assetClass === "Real Estate")
    .reduce((sum, holding) => sum + holding.allocation, 0);

  if (Math.abs(total - 100) > 2) {
    suggestions.push({
      tone: "warn",
      title: "Normalize Allocation",
      detail: `Your portfolio totals ${formatNumber(total)}%. Normalize to bring the model back to 100%.`
    });
  }

  if (largest && largest.allocation > settings.maxAllocation) {
    suggestions.push({
      tone: "bad",
      title: `Trim ${largest.ticker}`,
      detail: `Target ${settings.maxAllocation}% or less for this risk profile. Current weight is ${formatNumber(largest.allocation)}%.`
    });
  }

  highBeta.forEach((holding) => {
    suggestions.push({
      tone: "warn",
      title: `Watch ${holding.ticker} Volatility`,
      detail: `Beta is ${formatNumber(holding.beta, 2)}, above the ${settings.maxBeta} target. Consider a smaller weight.`
    });
  });

  lowScore.forEach((holding) => {
    suggestions.push({
      tone: "bad",
      title: `Review ${holding.ticker}`,
      detail: `Score is ${holding.score}/100. Check valuation, volatility, and whether it still belongs in the portfolio.`
    });
  });

  if (stats.averageCorrelation !== null && stats.averageCorrelation > 0.72) {
    suggestions.push({
      tone: "warn",
      title: "Add Diversification",
      detail: `Average correlation is ${formatNumber(stats.averageCorrelation, 2)}. Consider adding less-correlated holdings.`
    });
  }

  if (realAssetWeight < 5) {
    suggestions.push({
      tone: "warn",
      title: "Explore Real Assets",
      detail: "Commodities or real estate may add another risk lens, but they still need allocation limits and fact checking."
    });
  } else if (realAssetWeight > 30) {
    suggestions.push({
      tone: "warn",
      title: "Check Real-Asset Weight",
      detail: `${formatNumber(realAssetWeight)}% is in commodities and real estate. Make sure inflation and rate exposure are intentional.`
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      tone: "good",
      title: "Portfolio Looks Balanced",
      detail: "No major allocation, beta, correlation, or score issues were detected."
    });
  }

  return suggestions.slice(0, 6);
};

const renderTargetSuggestions = (stats) => {
  targetSuggestions.innerHTML = getTargetSuggestions(stats)
    .map(
      (suggestion) => `
        <article class="suggestion-card ${toneToClass(suggestion.tone)}">
          <p class="label">${suggestion.tone === "good" ? "Keep" : suggestion.tone === "warn" ? "Adjust" : "Action"}</p>
          <strong>${escapeHtml(suggestion.title)}</strong>
          <span>${escapeHtml(suggestion.detail)}</span>
        </article>
      `
    )
    .join("");
};

const classifyPortfolioDna = (stats) => {
  if (!holdings.length) {
    return {
      title: "Load Portfolio",
      summary: "Load holdings to reveal the portfolio profile.",
      mainBet: "Pending",
      mainBetDetail: "Portfolio theme will appear here.",
      riskDriver: "Pending",
      riskDriverDetail: "Largest risk contributor will appear here.",
      nextProfile: "Pending",
      nextProfileDetail: "Research direction will appear here."
    };
  }

  const total = stats.totalAllocation || 100;
  const weightedBeta = stats.weightedBeta;
  const avgPe = average(holdings.map((holding) => holding.pe).filter(Number.isFinite));
  const topWeight = stats.largest?.allocation || 0;
  const highBetaWeight = holdings
    .filter((holding) => holding.beta > 1.25)
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const techLikeWeight = holdings
    .filter((holding) => /tech|software|semiconductor|consumer electronics|internet|communication/i.test(holding.sector))
    .reduce((sum, holding) => sum + holding.allocation, 0);
  const cryptoWeight = holdings.filter((holding) => holding.assetClass === "Crypto").reduce((sum, holding) => sum + holding.allocation, 0);
  const bondWeight = holdings.filter((holding) => holding.assetClass === "Bond").reduce((sum, holding) => sum + holding.allocation, 0);
  const commodityWeight = holdings.filter((holding) => holding.assetClass === "Commodity").reduce((sum, holding) => sum + holding.allocation, 0);
  const realEstateWeight = holdings.filter((holding) => holding.assetClass === "Real Estate").reduce((sum, holding) => sum + holding.allocation, 0);
  const realAssetWeight = commodityWeight + realEstateWeight;

  let title = "Balanced Market Mix";
  if (bondWeight / total > 0.25) title = "Bond-Cushioned Multi-Asset Mix";
  if (cryptoWeight / total > 0.15) title = "Crypto-Tilted Multi-Asset Mix";
  if (realAssetWeight / total > 0.2) title = "Real-Asset Balanced Mix";
  if (techLikeWeight / total > 0.55) title = "Tech-Led Growth Stack";
  if (weightedBeta > 1.35) title = "High-Beta Momentum Stack";
  if (topWeight > 35) title = "Concentrated Conviction Portfolio";
  if (stats.averageCorrelation > 0.72) title = "Single-Theme Cluster";

  const mainBet =
    cryptoWeight / total > 0.15
      ? "Digital asset upside with major volatility"
      : realAssetWeight / total > 0.2
        ? "Inflation-sensitive real assets and income exposure"
      : bondWeight / total > 0.25
        ? "Bond cushion against equity volatility"
        : techLikeWeight / total > 0.45
      ? "Technology and growth exposure"
      : weightedBeta > 1.25
        ? "Market upside with higher volatility"
        : "Broad market participation";

  const riskHolding = [...holdings].sort((a, b) => b.allocation * b.beta - a.allocation * a.beta)[0];
  const riskDriver = riskHolding ? riskHolding.ticker : "Pending";
  const riskDetail = riskHolding
    ? `${riskHolding.ticker} contributes heavily because it is ${formatNumber(riskHolding.allocation)}% of the portfolio with beta ${formatNumber(riskHolding.beta, 2)}.`
    : "Largest risk contributor will appear here.";

  let nextProfile = "Lower-beta diversifier";
  let nextDetail = "Research lower-beta companies outside the current dominant theme. This may reduce volatility and concentration.";
  if (techLikeWeight / total > 0.5) {
    nextProfile = "Non-tech stabilizer";
    nextDetail = "Research lower-beta healthcare, consumer staples, utilities, or dividend-oriented companies to balance the growth tilt.";
  } else if (weightedBeta > 1.25) {
    nextProfile = "Defensive ballast";
    nextDetail = "Research companies with beta below 0.9, positive dividend yield, and moderate valuation.";
  } else if (Number.isFinite(avgPe) && avgPe > 30) {
    nextProfile = "Valuation anchor";
    nextDetail = "Research companies with lower P/E, steadier cash flows, and weaker correlation to current holdings.";
  } else if (stats.averageCorrelation > 0.65) {
    nextProfile = "Low-correlation candidate";
    nextDetail = "Research holdings whose historical returns move differently from the current portfolio.";
  }

  return {
    title,
    summary: `This portfolio appears to be a ${title.toLowerCase()} based on allocation, beta, valuation, and correlation.`,
    mainBet,
    mainBetDetail: `${formatNumber((cryptoWeight / total) * 100)}% crypto, ${formatNumber((bondWeight / total) * 100)}% bonds, ${formatNumber((commodityWeight / total) * 100)}% commodities, ${formatNumber((realEstateWeight / total) * 100)}% real estate, weighted beta ${formatNumber(weightedBeta, 2)}, average P/E ${Number.isFinite(avgPe) ? formatNumber(avgPe) : "N/A"}.`,
    riskDriver,
    riskDriverDetail: riskDetail,
    nextProfile,
    nextProfileDetail: nextDetail
  };
};

const renderPortfolioDna = (stats) => {
  const dna = classifyPortfolioDna(stats);
  dnaTitle.textContent = dna.title;
  dnaSummary.textContent = dna.summary;
  dnaMainBet.textContent = dna.mainBet;
  dnaMainBetDetail.textContent = dna.mainBetDetail;
  dnaRiskDriver.textContent = dna.riskDriver;
  dnaRiskDriverDetail.textContent = dna.riskDriverDetail;
  dnaNextProfile.textContent = dna.nextProfile;
  dnaNextProfileDetail.textContent = dna.nextProfileDetail;
};

const renderCompanyIntel = () => {
  if (!holdings.length) {
    companyIntelGrid.innerHTML = `<article class="suggestion-card warn"><strong>Load a portfolio first</strong><span>Company facts appear here after you load tickers in the Portfolio tab.</span></article>`;
    return;
  }

  companyIntelGrid.innerHTML = holdings
    .map((holding) => {
      const name = holding.name || holding.sourceData?.name || holding.ticker;
      const price = holding.price ?? holding.sourceData?.price;
      const marketCap = holding.marketCap ?? holding.sourceData?.marketCap;
      const meter = getRiskMeter(holding);
      const pe = Number.isFinite(holding.pe) ? formatNumber(holding.pe) : "N/A";
      const dividend = Number.isFinite(holding.dividendYield) ? `${formatNumber(holding.dividendYield, 2)}%` : "N/A";
      return `
        <article class="company-card">
          <div class="company-card-header">
            <div>
              <p class="label">${escapeHtml(holding.ticker)}</p>
              <strong>${escapeHtml(name)}</strong>
              <span>${escapeHtml(holding.sector || "Sector unavailable")}</span>
            </div>
            <div class="company-rank-badge">${holding.score}</div>
          </div>
          <div class="company-fact-grid">
            <div class="company-fact"><span>Latest Price</span><strong>${currency(price)}</strong></div>
            <div class="company-fact"><span>Market Cap</span><strong>${compactCurrency(marketCap)}</strong></div>
            <div class="company-fact"><span>P/E Ratio</span><strong>${pe}</strong></div>
            <div class="company-fact"><span>Dividend Yield</span><strong>${dividend}</strong></div>
            <div class="company-fact"><span>Beta</span><strong>${formatNumber(holding.beta, 2)}</strong></div>
            <div class="company-fact"><span>Risk Meter</span><strong>${escapeHtml(meter.label)} ${Math.round(meter.score)}/100</strong></div>
          </div>
          <span class="company-card-note">Fact card uses free public quote data when available. Missing values mean the free source did not provide that field.</span>
        </article>
      `;
    })
    .join("");
};

const fetchCompanySearchSymbol = async (query) => {
  const directTicker = parseTickerList(query)[0];
  const trimmed = query.trim();
  if (directTicker && directTicker === trimmed && /^[A-Z.\-]{1,8}$/.test(trimmed)) return directTicker;

  const url = new URL("https://query2.finance.yahoo.com/v1/finance/search");
  url.searchParams.set("q", query);
  url.searchParams.set("quotesCount", "8");
  url.searchParams.set("newsCount", "0");
  const payload = await fetchJsonWithFallback(url.toString());
  const quote = (payload?.quotes || []).find((item) => {
    const type = String(item.quoteType || "").toUpperCase();
    const symbol = String(item.symbol || "");
    return symbol && ["EQUITY", "ETF"].includes(type);
  });
  return quote?.symbol ? String(quote.symbol).toUpperCase() : directTicker;
};

const searchCompanyIntel = async () => {
  const query = companySearchInput.value.trim();
  if (!query) {
    companySearchStatus.textContent = "Type a company name or ticker first.";
    return;
  }

  companySearchButton.disabled = true;
  companySearchStatus.textContent = `Searching ${query} with free public data...`;
  try {
    const symbol = await fetchCompanySearchSymbol(query);
    if (!symbol) throw new Error("No public asset match found.");
    const quoteMap = await fetchYahooQuotes([symbol]).catch(() => ({}));
    const holding = await fetchRealStock(symbol, 0, quoteMap[symbol] || {});
    const existingIndex = holdings.findIndex((item) => item.ticker === holding.ticker);
    if (existingIndex >= 0) holdings[existingIndex] = { ...holding, allocation: holdings[existingIndex].allocation };
    else holdings.unshift(holding);
    updatePortfolio();
    companySearchStatus.textContent = `Loaded ${holding.name || holding.ticker}. Add an allocation in Portfolio if you want it included in portfolio math.`;
  } catch (error) {
    companySearchStatus.textContent = `Company search failed: ${error.message}`;
  } finally {
    companySearchButton.disabled = false;
  }
};

const stripHtml = (value) =>
  String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const summarizeNewsItem = (item) => {
  const description = stripHtml(item.description);
  const title = stripHtml(item.title);
  if (!description || description.toLowerCase() === title.toLowerCase()) {
    return "This public feed did not provide a separate summary. Open the original article for full context.";
  }
  const base = description || title;
  const firstSentence = base.match(/^(.{40,220}?[.!?])\s/)?.[1] || base.slice(0, 180);
  return firstSentence.length < base.length ? `${firstSentence.replace(/\s+/g, " ")}...` : firstSentence;
};

const cleanNewsLink = (value) => {
  const link = String(value || "").trim();
  try {
    const url = new URL(link);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : "";
  } catch {
    return "";
  }
};

const parseRssFeed = (xmlText, sourceName) => {
  const doc = new DOMParser().parseFromString(xmlText, "text/xml");
  const items = [...doc.querySelectorAll("item")].slice(0, 12);
  return items.map((item) => ({
    source: sourceName,
    title: stripHtml(item.querySelector("title")?.textContent),
    link: cleanNewsLink(item.querySelector("link")?.textContent || item.querySelector("link")?.getAttribute("href")),
    description: item.querySelector("description")?.textContent || item.querySelector("content\\:encoded")?.textContent || "",
    published: item.querySelector("pubDate")?.textContent || item.querySelector("published")?.textContent || ""
  }));
};

const getNewsHoldingKeywords = () => {
  const stopWords = new Set(["inc", "corp", "corporation", "company", "co", "plc", "ltd", "limited", "class", "common", "stock"]);
  return holdings
    .flatMap((holding) => {
      const nameWords = String(holding.name || holding.sourceData?.name || "")
        .split(/[^a-zA-Z0-9]+/)
        .map((word) => word.toLowerCase())
        .filter((word) => word.length >= 4 && !stopWords.has(word));
      return [
        { label: holding.ticker, value: holding.ticker.toLowerCase() },
        ...nameWords.slice(0, 3).map((word) => ({ label: holding.ticker, value: word }))
      ];
    })
    .filter((keyword, index, list) => list.findIndex((item) => item.label === keyword.label && item.value === keyword.value) === index);
};

const getNewsMatches = (item) => {
  const text = `${item.title} ${stripHtml(item.description)} ${item.link || ""}`.toLowerCase();
  const matches = getNewsHoldingKeywords()
    .filter((keyword) => text.includes(keyword.value))
    .map((keyword) => keyword.label);
  return [...new Set(matches)];
};

const updateNewsScopeButtons = () => {
  newsScopeButtons.forEach((button) => {
    const isActive = button.dataset.newsScope === activeNewsScope;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const renderNewsItems = (items) => {
  const filter = newsFilterInput.value.trim().toLowerCase();
  const filtered = items
    .map((item) => ({ ...item, matches: getNewsMatches(item) }))
    .filter((item) => activeNewsScope !== "portfolio" || item.matches.length)
    .filter((item) => {
      if (!filter) return true;
      return `${item.title} ${item.description} ${item.source}`.toLowerCase().includes(filter);
    })
    .slice(0, 12);

  if (activeNewsScope === "portfolio" && !holdings.length) {
    newsGrid.innerHTML = `<article class="suggestion-card warn"><strong>Load a portfolio first</strong><span>StockPilot will match headlines to your holdings after you add ticker and allocation rows.</span></article>`;
    return;
  }

  if (!filtered.length) {
    const message =
      activeNewsScope === "portfolio"
        ? "No current headlines matched your holdings. Switch to All Market or refresh again later."
        : "Try a broader topic or refresh the feeds.";
    newsGrid.innerHTML = `<article class="suggestion-card warn"><strong>No matching headlines</strong><span>${message}</span></article>`;
    return;
  }

  newsGrid.innerHTML = filtered
    .map((item) => {
      const date = item.published ? new Date(item.published) : null;
      const dateText = date && !Number.isNaN(date.getTime()) ? date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "Time unavailable";
      const matchTags = item.matches?.length
        ? `<div class="news-match-row">${item.matches.map((match) => `<span>${escapeHtml(match)}</span>`).join("")}</div>`
        : "";
      const articleLink = cleanNewsLink(item.link);
      return `
        <article class="news-card">
          <p class="label">${escapeHtml(item.source)}</p>
          <strong>${escapeHtml(item.title || "Untitled story")}</strong>
          ${matchTags}
          <p>${escapeHtml(summarizeNewsItem(item))}</p>
          <span class="company-card-note">${escapeHtml(dateText)}</span>
          <a href="${escapeHtml(articleLink || "#")}" data-news-link="${escapeHtml(articleLink)}" target="_blank" rel="noopener noreferrer">Read original</a>
        </article>
      `;
    })
    .join("");
};

const openNewsLink = (event) => {
  const link = event.target.closest("[data-news-link]");
  if (!link) return;
  const url = cleanNewsLink(link.dataset.newsLink);
  if (!url) {
    event.preventDefault();
    if (newsStatus) newsStatus.textContent = "This headline did not include a usable article link.";
    return;
  }
  event.preventDefault();
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.href = url;
  }
};

let latestNewsItems = [];
let activeNewsScope = "portfolio";

const refreshMarketNews = async () => {
  refreshNewsButton.disabled = true;
  newsStatus.textContent = "Loading public RSS headlines...";
  try {
    const results = await Promise.allSettled(
      NEWS_SOURCES.map(async (source) => {
        const xml = await fetchTextWithFallback(source.url);
        return parseRssFeed(xml, source.name);
      })
    );
    const loadedItems = results
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => result.value);
    const failedCount = results.filter((result) => result.status === "rejected").length;
    const seenTitles = new Set();
    latestNewsItems = loadedItems
      .flat()
      .filter((item) => item.title && item.link)
      .filter((item) => {
        const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        if (seenTitles.has(key)) return false;
        seenTitles.add(key);
        return true;
      })
      .sort((a, b) => new Date(b.published || 0) - new Date(a.published || 0));
    if (!latestNewsItems.length) {
      throw new Error("No public feeds returned headlines.");
    }
    renderNewsItems(latestNewsItems);
    const loadedCount = NEWS_SOURCES.length - failedCount;
    const partialNote = failedCount ? ` ${failedCount} feed${failedCount === 1 ? "" : "s"} unavailable right now.` : "";
    const portfolioMatches = holdings.length ? latestNewsItems.filter((item) => getNewsMatches(item).length).length : 0;
    const scopeNote =
      activeNewsScope === "portfolio" && holdings.length
        ? ` ${portfolioMatches} headline${portfolioMatches === 1 ? "" : "s"} matched your current holdings.`
        : "";
    newsStatus.textContent = `Loaded ${latestNewsItems.length} headlines from ${loadedCount}/${NEWS_SOURCES.length} public RSS feeds.${scopeNote} Summaries are shortened from feed descriptions.${partialNote}`;
    recordDataFreshness("news", "success", `${latestNewsItems.length} headlines from ${loadedCount}/${NEWS_SOURCES.length} feeds.`, stockPilotApiOnline ? "StockPilot API + public RSS feeds" : "Public RSS feeds");
  } catch (error) {
    newsStatus.textContent = `News refresh failed: ${error.message}`;
    newsGrid.innerHTML = `<article class="suggestion-card warn"><strong>Could not load news</strong><span>Public RSS feeds can block browser requests. Try refreshing again later.</span></article>`;
    recordDataFreshness("news", "failed", error.message, stockPilotApiOnline ? "StockPilot API + public RSS feeds" : "Public RSS feeds");
  } finally {
    refreshNewsButton.disabled = false;
  }
};

const syncRebalanceTargets = (force = false) => {
  if (!holdings.length) return;
  if (!force && rebalanceTargets.value.trim()) return;
  rebalanceTargets.value = holdings.map((holding) => `${holding.ticker} ${formatNumber(holding.allocation)}`).join("\n");
};

const setEqualWeightTargets = () => {
  if (!holdings.length) {
    rebalanceStatus.textContent = "Load a portfolio first.";
    return;
  }
  const target = 100 / holdings.length;
  rebalanceTargets.value = holdings.map((holding) => `${holding.ticker} ${formatNumber(target)}`).join("\n");
  renderRebalanceLab();
};

const getRebalanceFrictionInputs = () => ({
  cashFlow: Number(rebalanceCashFlow.value) || 0,
  cashReserve: clamp(Number(rebalanceCashReserve.value) || 0, 0, 100),
  flatFee: Math.max(0, Number(tradeFeeFlat.value) || 0),
  bps: Math.max(0, Number(tradeFeeBps.value) || 0),
  taxRate: clamp(Number(taxRate.value) || 0, 0, 100) / 100,
  taxableGainRate: clamp(Number(taxableGainRate.value) || 0, 0, 100) / 100
});

const renderRebalanceLab = () => {
  if (!holdings.length) {
    rebalanceSummary.innerHTML = `<article class="suggestion-card warn"><strong>Load portfolio</strong><span>Rebalance moves appear after you load holdings.</span></article>`;
    rebalanceBody.innerHTML = `<tr><td colspan="8">No holdings loaded.</td></tr>`;
    rebalanceStatus.textContent = "Load a portfolio, then set target weights.";
    return;
  }

  syncRebalanceTargets();
  const portfolioValue = Math.max(0, Number(rebalancePortfolioValue.value) || 0);
  const friction = getRebalanceFrictionInputs();
  const postCashValue = Math.max(0, portfolioValue + friction.cashFlow);
  const investableValue = postCashValue * (1 - friction.cashReserve / 100);
  const reserveValue = postCashValue - investableValue;
  const targetRows = parsePortfolioBuilderRows(rebalanceTargets.value);
  const targetMap = targetRows.reduce((map, row) => {
    map[row.symbol] = row.allocation;
    return map;
  }, {});
  const targetTotal = targetRows.reduce((sum, row) => sum + row.allocation, 0);
  const currentTotal = holdings.reduce((sum, holding) => sum + holding.allocation, 0) || 100;
  const rows = holdings.map((holding) => {
    const currentPercent = (holding.allocation / currentTotal) * 100;
    const targetPercent = targetMap[holding.ticker] ?? currentPercent;
    const currentValue = portfolioValue * (currentPercent / 100);
    const targetValue = investableValue * (targetPercent / 100);
    const move = targetValue - currentValue;
    const tradeValue = Math.abs(move);
    const hasTrade = tradeValue > 1;
    const tradeCost = hasTrade ? friction.flatFee + tradeValue * (friction.bps / 10000) : 0;
    const estimatedTax = move < 0 ? tradeValue * friction.taxableGainRate * friction.taxRate : 0;
    const frictionCost = tradeCost + estimatedTax;
    const netCashEffect = move >= 0 ? -(tradeValue + tradeCost) : tradeValue - frictionCost;
    return {
      ticker: holding.ticker,
      currentPercent,
      targetPercent,
      currentValue,
      targetValue,
      move,
      tradeCost,
      estimatedTax,
      frictionCost,
      netCashEffect
    };
  });
  const buys = rows.filter((row) => row.move > 0).reduce((sum, row) => sum + row.move, 0);
  const sells = rows.filter((row) => row.move < 0).reduce((sum, row) => sum + Math.abs(row.move), 0);
  const totalCosts = rows.reduce((sum, row) => sum + row.tradeCost, 0);
  const totalTax = rows.reduce((sum, row) => sum + row.estimatedTax, 0);
  const totalFriction = totalCosts + totalTax;
  const netOutsideCash = buys + totalFriction + reserveValue - sells - friction.cashFlow;
  const largestMove = rows.reduce((max, row) => (Math.abs(row.move) > Math.abs(max.move || 0) ? row : max), {});

  rebalanceSummary.innerHTML = `
    <article class="suggestion-card">
      <p class="label">Buy Needed</p>
      <strong>${currency(buys)}</strong>
      <span>Total dollars to add to underweight positions.</span>
    </article>
    <article class="suggestion-card">
      <p class="label">Sell Needed</p>
      <strong>${currency(sells)}</strong>
      <span>Total dollars to trim from overweight positions.</span>
    </article>
    <article class="suggestion-card ${totalFriction > portfolioValue * 0.01 ? "warn" : ""}">
      <p class="label">Cost + Tax Drag</p>
      <strong>${currency(totalFriction)}</strong>
      <span>${currency(totalCosts)} transaction costs + ${currency(totalTax)} estimated taxes.</span>
    </article>
    <article class="suggestion-card ${netOutsideCash > 0 ? "warn" : "good"}">
      <p class="label">Net Cash Need</p>
      <strong>${currency(Math.abs(netOutsideCash))}</strong>
      <span>${netOutsideCash > 0 ? "Extra cash needed after sells, fees, taxes, and reserve." : "Estimated leftover cash after planned moves."}</span>
    </article>
    <article class="suggestion-card">
      <p class="label">Cash Reserve</p>
      <strong>${currency(reserveValue)}</strong>
      <span>${formatNumber(friction.cashReserve)}% reserve after ${friction.cashFlow >= 0 ? "deposit" : "withdrawal"}.</span>
    </article>
    <article class="suggestion-card ${Math.abs(largestMove.move || 0) > portfolioValue * 0.05 ? "warn" : "good"}">
      <p class="label">Largest Move</p>
      <strong>${largestMove.ticker || "N/A"}</strong>
      <span>${largestMove.ticker ? `${largestMove.move >= 0 ? "Buy" : "Sell"} ${currency(Math.abs(largestMove.move))}` : "No move needed."}</span>
    </article>
  `;
  rebalanceBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td><strong>${escapeHtml(row.ticker)}</strong></td>
          <td>${formatNumber(row.currentPercent)}%</td>
          <td>${formatNumber(row.targetPercent)}%</td>
          <td>${currency(row.currentValue)}</td>
          <td>${currency(row.targetValue)}</td>
          <td class="${row.move >= 0 ? "good-text" : "bad-text"}">${row.move >= 0 ? "Buy" : "Sell"} ${currency(Math.abs(row.move))}</td>
          <td>${currency(row.frictionCost)}</td>
          <td class="${row.netCashEffect >= 0 ? "good-text" : "bad-text"}">${row.netCashEffect >= 0 ? "Inflow" : "Outflow"} ${currency(Math.abs(row.netCashEffect))}</td>
        </tr>
      `
    )
    .join("");
  rebalanceStatus.textContent =
    Math.abs(targetTotal - 100) > 1
      ? `Target weights total ${formatNumber(targetTotal)}%, not 100%.`
      : `Target weights look balanced. Tax estimate is simplified and not tax advice.`;
};

const buildReport = () => {
  const stats = getPortfolioStats();
  const verdict = portfolioVerdict(stats);
  const friction = getRebalanceFrictionInputs();
  const lines = [
    "StockPilot Report",
    `Generated: ${new Date().toLocaleString()}`,
    "",
    `Verdict: ${verdict.label}`,
    `Score: ${Math.round(stats.weightedScore)}/100`,
    `Reason: ${verdict.reason}`,
    `Holdings: ${holdings.length}`,
    `Total Allocation: ${formatNumber(stats.totalAllocation)}%`,
    `Average Correlation: ${stats.averageCorrelation === null ? "N/A" : formatNumber(stats.averageCorrelation, 2)}`,
    `Annualized Return: ${stats.returnStats.annualReturn === null ? "N/A" : `${formatNumber(stats.returnStats.annualReturn, 2)}%`}`,
    `Annualized Risk: ${stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(stats.returnStats.annualRisk, 2)}%`}`,
    `Planned Cash Flow: ${currency(friction.cashFlow)}`,
    `Cash Reserve Target: ${formatNumber(friction.cashReserve)}%`,
    `Trade Cost Assumption: ${currency(friction.flatFee)} flat + ${formatNumber(friction.bps, 1)} bps`,
    `Tax Assumption: ${formatNumber(friction.taxRate * 100)}% rate on ${formatNumber(friction.taxableGainRate * 100)}% of sells`,
    "Tax estimates are simplified educational assumptions, not tax advice.",
    "",
    "Holdings",
    "Ticker | Allocation | Score | P/E | Dividend Yield | Beta | As Of | Risk Meter",
    ...holdings.map((holding) => {
      const meter = getRiskMeter(holding);
      return [
        holding.ticker,
        `${formatNumber(holding.allocation)}%`,
        holding.score,
        Number.isFinite(holding.pe) ? formatNumber(holding.pe) : "N/A",
        Number.isFinite(holding.dividendYield) ? `${formatNumber(holding.dividendYield, 2)}%` : "N/A",
        formatNumber(holding.beta, 2),
        holding.dataAsOf || "N/A",
        `${meter.label} (${Math.round(meter.score)}/100)`
      ].join(" | ");
    })
  ];
  return lines.join("\n");
};

const updateReportPreview = () => {
  if (reportPreview) reportPreview.textContent = buildReport();
  renderProfessionalReport();
};

const reportTone = (value, goodAt, warnAt) => {
  if (!Number.isFinite(value)) return "warn";
  if (value >= goodAt) return "good";
  if (value >= warnAt) return "warn";
  return "bad";
};

const renderProfessionalReport = () => {
  if (!professionalReportGrid) return;
  const stats = getPortfolioStats();
  const savingsStats = getSavingsSnapshot();
  const verdict = portfolioVerdict(stats);
  const largest = stats.largest ? `${stats.largest.ticker} (${formatNumber(stats.largest.allocation)}%)` : "None yet";
  const correlation = stats.averageCorrelation === null ? "N/A" : formatNumber(stats.averageCorrelation, 2);
  const annualReturn = stats.returnStats.annualReturn === null ? "N/A" : `${formatNumber(stats.returnStats.annualReturn, 2)}%`;
  const annualRisk = stats.returnStats.annualRisk === null ? "N/A" : `${formatNumber(stats.returnStats.annualRisk, 2)}%`;
  const riskValue = stats.returnStats.annualRisk ?? 0;
  const cards = [
    {
      tone: holdings.length ? toneToClass(verdict.tone) : "warn",
      label: "Portfolio",
      title: holdings.length ? `${verdict.label} · ${Math.round(stats.weightedScore)}/100` : "Portfolio not loaded",
      detail: holdings.length ? verdict.reason : "Load tickers and percentages to generate a portfolio report."
    },
    {
      tone: stats.totalAllocation > 99 && stats.totalAllocation < 101 ? "good" : "warn",
      label: "Allocation",
      title: `${formatNumber(stats.totalAllocation)}% allocated`,
      detail: `Largest position: ${largest}. Keep total allocation near 100%.`
    },
    {
      tone: riskValue > 30 ? "bad" : riskValue > 18 ? "warn" : "good",
      label: "Risk / Return",
      title: `${annualReturn} return · ${annualRisk} risk`,
      detail: `Average correlation: ${correlation}. Free data can be delayed or incomplete.`
    },
    {
      tone: reportTone(savingsStats.healthScore, 75, 55),
      label: "Budget Context",
      title: `${Math.round(savingsStats.healthScore)}/100 budget health`,
      detail: `${currency(savingsStats.leftover)} monthly cash flow and ${formatNumber(savingsStats.runway, 1)} months runway.`
    },
    {
      tone: completedLessons.length ? "good" : "warn",
      label: "Learning",
      title: `${completedLessons.length} lesson${completedLessons.length === 1 ? "" : "s"} completed`,
      detail: completedLessons.length ? "Learning progress is part of the decision context." : "Start the learning pathway to improve confidence with the report terms."
    },
    {
      tone: "warn",
      label: "Guardrail",
      title: "Educational summary",
      detail: "This report organizes signals. It is not investment, tax, legal, or financial advice."
    }
  ];
  professionalReportGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="professional-report-card ${card.tone}">
          <span>${card.label}</span>
          <strong>${card.title}</strong>
          <p>${card.detail}</p>
        </article>
      `
    )
    .join("");
};

const marketTimeParts = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  })
    .formatToParts(new Date())
    .reduce((map, part) => {
      map[part.type] = part.value;
      return map;
    }, {});
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  return {
    weekday: parts.weekday,
    minutes: hour * 60 + minute,
    label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ET`
  };
};

const getMarketClock = () => {
  const { weekday, minutes, label } = marketTimeParts();
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  if (isWeekend) return { status: "Closed", detail: `${label}. Weekend session.` };
  if (minutes >= 4 * 60 && minutes < 9 * 60 + 30) return { status: "Pre-market", detail: `${label}. Free quotes may be delayed.` };
  if (minutes >= 9 * 60 + 30 && minutes < 16 * 60) return { status: "Open", detail: `${label}. Regular U.S. session.` };
  if (minutes >= 16 * 60 && minutes < 20 * 60) return { status: "After-hours", detail: `${label}. Updates depend on quote availability.` };
  return { status: "Closed", detail: `${label}. Outside extended market hours.` };
};

const saveVirtualMarket = () => {
  localStorage.setItem(VIRTUAL_MARKET_KEY, JSON.stringify(virtualMarket));
};

const loadVirtualMarket = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(VIRTUAL_MARKET_KEY) || "{}");
    virtualMarket = {
      ...virtualMarket,
      ...stored,
      cash: Number.isFinite(Number(stored.cash)) ? Number(stored.cash) : VIRTUAL_MARKET_STARTING_CASH,
      watchlist: Array.isArray(stored.watchlist) && stored.watchlist.length ? stored.watchlist : virtualMarket.watchlist,
      prices: stored.prices || {},
      positions: stored.positions || {},
      trades: Array.isArray(stored.trades) ? stored.trades : [],
      lastEquity: Number.isFinite(Number(stored.lastEquity)) ? Number(stored.lastEquity) : VIRTUAL_MARKET_STARTING_CASH,
      peakEquity: Number.isFinite(Number(stored.peakEquity)) ? Number(stored.peakEquity) : VIRTUAL_MARKET_STARTING_CASH,
      performanceHistory: Array.isArray(stored.performanceHistory) ? stored.performanceHistory : [],
      lastAlertKey: stored.lastAlertKey || "",
      autoRefresh: Boolean(stored.autoRefresh)
    };
  } catch {
    saveVirtualMarket();
  }
};

const virtualMarketSymbols = () =>
  [...new Set([...virtualMarket.watchlist, ...Object.keys(virtualMarket.positions), tradeTicker.value].flatMap(parseTickerList))];

const renderMarketClock = () => {
  const clock = getMarketClock();
  marketClockStatus.textContent = clock.status;
  marketClockDetail.textContent = clock.detail;
};

const getVirtualMarketPositions = () => Object.values(virtualMarket.positions).filter((position) => position.shares > 0);

const getVirtualMarketEquity = () => {
  const marketValue = getVirtualMarketPositions().reduce((sum, position) => {
    const price = virtualMarket.prices[position.ticker]?.price ?? position.avgCost;
    return sum + position.shares * price;
  }, 0);
  return virtualMarket.cash + marketValue;
};

const updateMarketTone = (element, value) => {
  element.classList.toggle("good-text", value > 0);
  element.classList.toggle("bad-text", value < 0);
};

const hideMarketAlert = () => {
  if (marketAlert) marketAlert.hidden = true;
};

const showMarketAlert = ({ title, body, indicators }) => {
  if (!marketAlert || !marketAlertTitle || !marketAlertBody || !marketAlertIndicators) return;
  marketAlertTitle.textContent = title;
  marketAlertBody.textContent = body;
  marketAlertIndicators.innerHTML = indicators
    .map(
      (indicator) => `
        <article>
          <strong>${escapeHtml(indicator.label)}</strong>
          <span>${escapeHtml(indicator.value)}</span>
        </article>
      `
    )
    .join("");
  marketAlert.hidden = false;
};

const maybeShowMarketPerformanceAlert = (previousEquity) => {
  const positions = getVirtualMarketPositions();
  const equity = getVirtualMarketEquity();
  if (!positions.length || !Number.isFinite(previousEquity) || previousEquity <= 0) return;

  const refreshMovePct = ((equity - previousEquity) / previousEquity) * 100;
  const drawdownPct = virtualMarket.peakEquity > 0 ? ((equity - virtualMarket.peakEquity) / virtualMarket.peakEquity) * 100 : 0;
  const positionDrivers = positions
    .map((position) => {
      const quote = virtualMarket.prices[position.ticker];
      const lastPrice = quote?.price ?? position.avgCost;
      const value = lastPrice * position.shares;
      const changePercent = Number(quote?.changePercent);
      return {
        ticker: position.ticker,
        value,
        exposurePct: equity > 0 ? (value / equity) * 100 : 0,
        changePercent: Number.isFinite(changePercent) ? changePercent : 0,
        openPnl: value - position.avgCost * position.shares,
        updated: quote?.updated || "Quote pending"
      };
    })
    .sort((a, b) => a.changePercent * a.value - b.changePercent * b.value);
  const driver = positionDrivers[0];
  const significantRefreshDrop = refreshMovePct <= -2;
  const significantDrawdown = drawdownPct <= -5;
  const significantPositionDrop = driver && driver.changePercent <= -5 && driver.exposurePct >= 5;
  if (!significantRefreshDrop && !significantDrawdown && !significantPositionDrop) return;

  const alertKey = `${new Date().toDateString()}-${driver?.ticker || "portfolio"}-${Math.round(refreshMovePct * 10)}-${Math.round(drawdownPct * 10)}`;
  if (virtualMarket.lastAlertKey === alertKey) return;

  const title = significantRefreshDrop
    ? `Paper portfolio fell ${formatNumber(Math.abs(refreshMovePct), 2)}% since refresh`
    : significantDrawdown
      ? `Drawdown reached ${formatNumber(Math.abs(drawdownPct), 2)}%`
      : `${driver.ticker} is down ${formatNumber(Math.abs(driver.changePercent), 2)}% today`;
  const body = driver
    ? `Based on the free quote data available, the biggest visible driver appears to be ${driver.ticker}. It is ${driver.changePercent >= 0 ? "up" : "down"} ${formatNumber(Math.abs(driver.changePercent), 2)}% today and represents about ${formatNumber(driver.exposurePct, 1)}% of this paper portfolio. This is an indicator summary, not a guaranteed explanation of the market move.`
    : "The paper portfolio moved enough to deserve a closer look. Free public quote data can be delayed or incomplete, so verify before making any real decision.";

  showMarketAlert({
    title,
    body,
    indicators: [
      { label: "Move since refresh", value: `${refreshMovePct >= 0 ? "+" : ""}${formatNumber(refreshMovePct, 2)}%` },
      { label: "Drawdown from peak", value: `${formatNumber(drawdownPct, 2)}%` },
      { label: "Largest visible driver", value: driver ? `${driver.ticker}: ${driver.changePercent >= 0 ? "+" : ""}${formatNumber(driver.changePercent, 2)}%, ${formatNumber(driver.exposurePct, 1)}% exposure` : "No single driver available" },
      { label: "Open P/L on driver", value: driver ? `${currency(driver.openPnl)} as of ${driver.updated}` : "N/A" }
    ]
  });
  virtualMarket.lastAlertKey = alertKey;
  saveVirtualMarket();
};

const renderVirtualMarket = () => {
  renderMarketClock();
  marketWatchlistInput.value = virtualMarket.watchlist.join(", ");
  toggleMarketPollingButton.classList.toggle("active", virtualMarket.autoRefresh);
  toggleMarketPollingButton.textContent = virtualMarket.autoRefresh ? "Auto On" : "Auto Refresh";

  const positions = getVirtualMarketPositions();
  const marketValue = positions.reduce((sum, position) => {
    const price = virtualMarket.prices[position.ticker]?.price ?? position.avgCost;
    return sum + position.shares * price;
  }, 0);
  const costBasis = positions.reduce((sum, position) => sum + position.shares * position.avgCost, 0);
  const pnl = marketValue - costBasis;
  const equity = virtualMarket.cash + marketValue;
  const previousEquity = Number.isFinite(Number(virtualMarket.lastEquity)) ? Number(virtualMarket.lastEquity) : equity;
  virtualMarket.peakEquity = Math.max(Number(virtualMarket.peakEquity) || VIRTUAL_MARKET_STARTING_CASH, equity);
  const totalReturnPct = ((equity - VIRTUAL_MARKET_STARTING_CASH) / VIRTUAL_MARKET_STARTING_CASH) * 100;
  const refreshMovePct = previousEquity > 0 ? ((equity - previousEquity) / previousEquity) * 100 : 0;
  const drawdownPct = virtualMarket.peakEquity > 0 ? ((equity - virtualMarket.peakEquity) / virtualMarket.peakEquity) * 100 : 0;

  marketEquity.textContent = currency(equity);
  marketEquityNote.textContent = `${positions.length} simulated open position${positions.length === 1 ? "" : "s"}.`;
  marketCash.textContent = currency(virtualMarket.cash);
  marketPnl.textContent = currency(pnl);
  updateMarketTone(marketPnl, pnl);
  marketPnlNote.textContent = `${pnl >= 0 ? "Unrealized gain" : "Unrealized loss"} from paper positions.`;
  marketReturn.textContent = `${totalReturnPct >= 0 ? "+" : ""}${formatNumber(totalReturnPct, 2)}%`;
  marketReturnNote.textContent = `From ${currency(VIRTUAL_MARKET_STARTING_CASH)} starting paper cash.`;
  updateMarketTone(marketReturn, totalReturnPct);
  marketRefreshMove.textContent = `${refreshMovePct >= 0 ? "+" : ""}${formatNumber(refreshMovePct, 2)}%`;
  marketRefreshNote.textContent = previousEquity === equity ? "No change since the last quote pull." : `Previous paper equity was ${currency(previousEquity)}.`;
  updateMarketTone(marketRefreshMove, refreshMovePct);
  marketDrawdown.textContent = `${formatNumber(drawdownPct, 2)}%`;
  marketDrawdownNote.textContent = `Peak paper equity: ${currency(virtualMarket.peakEquity)}.`;
  updateMarketTone(marketDrawdown, drawdownPct);

  marketQuotesGrid.innerHTML = virtualMarket.watchlist
    .map((symbol) => {
      const quote = virtualMarket.prices[symbol];
      const change = quote?.changePercent;
      const tone = Number.isFinite(change) && change >= 0 ? "good" : Number.isFinite(change) ? "bad" : "";
      return `
        <article class="quote-card ${tone}">
          <p class="label">${escapeHtml(symbol)}</p>
          <strong>${quote ? currency(quote.price) : "N/A"}</strong>
          <span>${Number.isFinite(change) ? `${change >= 0 ? "+" : ""}${formatNumber(change, 2)}% today` : "Refresh to load quote"}</span>
          <span>${quote?.updated ? `Updated ${escapeHtml(quote.updated)}` : "Free public data"}</span>
        </article>
      `;
    })
    .join("");

  marketPerformanceBody.innerHTML = virtualMarket.performanceHistory.length
    ? virtualMarket.performanceHistory
        .slice(0, 10)
        .map((point) => {
          const move = Number(point.movePercent);
          return `
            <tr>
              <td>${escapeHtml(point.time || "Recent refresh")}</td>
              <td>${currency(point.equity)}</td>
              <td class="${move >= 0 ? "good-text" : "bad-text"}">${move >= 0 ? "+" : ""}${formatNumber(move, 2)}%</td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="3">Refresh quotes to start tracking paper portfolio movement.</td></tr>`;

  marketPositionsBody.innerHTML = positions.length
    ? positions
        .map((position) => {
          const quote = virtualMarket.prices[position.ticker];
          const lastPrice = quote?.price ?? position.avgCost;
          const value = lastPrice * position.shares;
          const openPnl = value - position.avgCost * position.shares;
          return `
            <tr>
              <td><strong>${escapeHtml(position.ticker)}</strong></td>
              <td>${formatNumber(position.shares, 0)}</td>
              <td>${currency(position.avgCost)}</td>
              <td>${currency(lastPrice)}</td>
              <td>${currency(value)}</td>
              <td class="${openPnl >= 0 ? "good-text" : "bad-text"}">${currency(openPnl)}</td>
              <td>${escapeHtml(quote?.updated || "Quote pending")}</td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="7">No paper positions yet. Place a simulated trade to begin.</td></tr>`;

  marketTradesBody.innerHTML = virtualMarket.trades.length
    ? virtualMarket.trades
        .slice(0, 12)
        .map(
          (trade) => `
            <tr>
              <td>${escapeHtml(trade.time)}</td>
              <td>${escapeHtml(trade.side.toUpperCase())}</td>
              <td><strong>${escapeHtml(trade.ticker)}</strong></td>
              <td>${formatNumber(trade.shares, 0)}</td>
              <td>${currency(trade.price)}</td>
              <td>${currency(trade.value)}</td>
            </tr>
          `
        )
        .join("")
    : `<tr><td colspan="6">No paper trades yet.</td></tr>`;
};

const fetchLatestChartQuote = async (symbol) => {
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(symbol)}`);
  url.searchParams.set("range", "5d");
  url.searchParams.set("interval", "1d");
  const payload = await fetchJsonWithFallback(url.toString());
  const result = payload?.chart?.result?.[0];
  const closes = result?.indicators?.quote?.[0]?.close ?? [];
  const validCloses = closes.map(Number).filter(Number.isFinite);
  if (!validCloses.length) return null;
  return {
    price: validCloses[validCloses.length - 1],
    priorClose: validCloses.length > 1 ? validCloses[validCloses.length - 2] : NaN
  };
};

const updateMarketQuotes = async () => {
  const symbols = virtualMarketSymbols();
  if (!symbols.length) return;
  const previousEquity = getVirtualMarketEquity();

  refreshMarketButton.disabled = true;
  tradeStatus.textContent = `Refreshing ${symbols.length} quote${symbols.length === 1 ? "" : "s"} from ${stockPilotApiOnline ? "StockPilot API gateway" : "free public data"}...`;
  try {
    const quotes = await fetchYahooQuotes(symbols);
    const now = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    for (const symbol of symbols) {
      const quote = quotes[symbol];
      let price = firstFinite(quote?.regularMarketPrice, quote?.postMarketPrice, quote?.preMarketPrice, quote?.bid, quote?.ask);
      let priorClose = Number(quote?.regularMarketPreviousClose);
      let source = stockPilotApiOnline ? "StockPilot API quote" : "Free public quote";
      if (!Number.isFinite(price)) {
        const fallback = await fetchLatestChartQuote(symbol).catch(() => null);
        if (!fallback) continue;
        price = fallback.price;
        priorClose = fallback.priorClose;
        source = stockPilotApiOnline ? "StockPilot API chart" : "Free public chart";
      }
      const changePercent = Number.isFinite(priorClose) && priorClose > 0 ? ((price - priorClose) / priorClose) * 100 : NaN;
      virtualMarket.prices[symbol] = {
        price,
        changePercent,
        updated: now,
        source
      };
    }
    const currentEquity = getVirtualMarketEquity();
    virtualMarket.lastEquity = previousEquity;
    virtualMarket.peakEquity = Math.max(Number(virtualMarket.peakEquity) || VIRTUAL_MARKET_STARTING_CASH, currentEquity);
    virtualMarket.performanceHistory.unshift({
      time: new Date().toLocaleString(),
      equity: currentEquity,
      movePercent: previousEquity > 0 ? ((currentEquity - previousEquity) / previousEquity) * 100 : 0
    });
    virtualMarket.performanceHistory = virtualMarket.performanceHistory.slice(0, 60);
    saveVirtualMarket();
    renderVirtualMarket();
    maybeShowMarketPerformanceAlert(previousEquity);
    tradeStatus.textContent = `Quotes refreshed through ${stockPilotApiOnline ? "StockPilot API gateway" : "free public data"}. Data may be delayed or incomplete.`;
    recordDataFreshness("market", "success", `${Object.keys(virtualMarket.prices).length} quotes refreshed.`, stockPilotApiOnline ? "StockPilot API gateway" : "Free public quotes");
  } catch (error) {
    tradeStatus.textContent = `Quote refresh failed: ${error.message}`;
    recordDataFreshness("market", "failed", error.message, stockPilotApiOnline ? "StockPilot API gateway" : "Free public quotes");
  } finally {
    refreshMarketButton.disabled = false;
  }
};

const placeVirtualTrade = async () => {
  const symbol = parseTickerList(tradeTicker.value)[0];
  const shares = Math.floor(Number(tradeShares.value));
  const side = tradeSide.value;
  if (!symbol || shares <= 0) {
    tradeStatus.textContent = "Enter a ticker and whole-share amount.";
    return;
  }

  tradeTicker.value = symbol;
  await updateMarketQuotes();
  const quote = virtualMarket.prices[symbol];
  if (!quote?.price) {
    tradeStatus.textContent = `No quote available for ${symbol}. Try refreshing again.`;
    return;
  }

  const value = quote.price * shares;
  const existing = virtualMarket.positions[symbol] || { ticker: symbol, shares: 0, avgCost: 0 };
  if (side === "buy") {
    if (value > virtualMarket.cash) {
      tradeStatus.textContent = `Not enough paper cash to buy ${shares} ${symbol}.`;
      return;
    }
    const newShares = existing.shares + shares;
    existing.avgCost = (existing.avgCost * existing.shares + value) / newShares;
    existing.shares = newShares;
    virtualMarket.cash -= value;
  } else {
    if (existing.shares < shares) {
      tradeStatus.textContent = `You only own ${formatNumber(existing.shares, 0)} paper shares of ${symbol}.`;
      return;
    }
    existing.shares -= shares;
    virtualMarket.cash += value;
    if (existing.shares === 0) existing.avgCost = 0;
  }

  virtualMarket.positions[symbol] = existing;
  if (!virtualMarket.watchlist.includes(symbol)) virtualMarket.watchlist.unshift(symbol);
  virtualMarket.trades.unshift({
    time: new Date().toLocaleString(),
    side,
    ticker: symbol,
    shares,
    price: quote.price,
    value
  });
  virtualMarket.trades = virtualMarket.trades.slice(0, 50);
  saveVirtualMarket();
  renderVirtualMarket();
  tradeStatus.textContent = `${side === "buy" ? "Bought" : "Sold"} ${shares} ${symbol} at ${currency(quote.price)} in paper trading.`;
};

const setMarketPolling = (enabled) => {
  virtualMarket.autoRefresh = enabled;
  clearInterval(marketPollingTimer);
  const minutes = Math.max(1, Number(refreshSettings.marketMinutes) || 1);
  if (enabled) marketPollingTimer = setInterval(updateMarketQuotes, minutes * 60000);
  saveVirtualMarket();
  renderVirtualMarket();
};

const resetVirtualMarket = () => {
  virtualMarket = {
    cash: VIRTUAL_MARKET_STARTING_CASH,
    watchlist: ["AAPL", "MSFT", "NVDA", "BND", "VNQ", "GLD", "BTC-USD"],
    prices: {},
    positions: {},
    trades: [],
    lastEquity: VIRTUAL_MARKET_STARTING_CASH,
    peakEquity: VIRTUAL_MARKET_STARTING_CASH,
    performanceHistory: [],
    lastAlertKey: "",
    autoRefresh: false
  };
  clearInterval(marketPollingTimer);
  hideMarketAlert();
  saveVirtualMarket();
  renderVirtualMarket();
  tradeStatus.textContent = "Virtual market reset to $100,000 paper cash.";
};

const clearActiveInfoButtons = () => {
  document.querySelectorAll(".info-button.active").forEach((button) => {
    button.classList.remove("active");
    button.setAttribute("aria-expanded", "false");
  });
};

const hideTermCard = () => {
  clearActiveInfoButtons();
  termCard.hidden = true;
};

const showTermCard = (termKey, trigger) => {
  const term = TERM_HELP[termKey];
  if (!term) return;

  if (!termCard.hidden && termCard.dataset.activeTerm === termKey) {
    hideTermCard();
    return;
  }

  clearActiveInfoButtons();
  termCard.dataset.activeTerm = termKey;
  termTitle.textContent = term.title;
  termMeaning.textContent = term.meaning;
  termSimple.textContent = term.simple;
  termExample.textContent = term.example;
  termCard.hidden = false;
  trigger.classList.add("active");
  trigger.setAttribute("aria-expanded", "true");
  termCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
};

const readSavedPortfolios = () => {
  try {
    return JSON.parse(localStorage.getItem(SAVED_PORTFOLIOS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeSavedPortfolios = (items) => {
  localStorage.setItem(SAVED_PORTFOLIOS_KEY, JSON.stringify(items));
};

const renderSavedPortfolios = () => {
  const saved = readSavedPortfolios();
  if (!saved.length) {
    savedPortfolioList.innerHTML = `<div class="suggestion-card warn"><strong>No saved portfolios yet</strong><span>Enter assets in Portfolio Builder, then save them here.</span></div>`;
    return;
  }

  savedPortfolioList.innerHTML = saved
    .map(
      (item) => `
        <article class="saved-item">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.rows.replace(/\n/g, " | "))}</span>
          </div>
          <button class="ghost-button small-button" data-load-saved="${item.id}" type="button">Load</button>
          <button class="delete-button" data-delete-saved="${item.id}" type="button" aria-label="Delete ${escapeHtml(item.name)}">x</button>
        </article>
      `
    )
    .join("");
};

const saveCurrentPortfolio = () => {
  const name = portfolioName.value.trim() || "Untitled Portfolio";
  const rows = bulkInput.value.trim();
  if (!rows) return;
  const saved = readSavedPortfolios().filter((item) => item.name !== name);
  saved.unshift({
    id: crypto.randomUUID(),
    name,
    rows,
    savedAt: new Date().toISOString()
  });
  writeSavedPortfolios(saved.slice(0, 12));
  renderSavedPortfolios();
};

const applySavedPortfolio = (id) => {
  const item = readSavedPortfolios().find((saved) => saved.id === id);
  if (!item) return;
  bulkInput.value = item.rows;
  renderAssetInputTable();
  updateBulkStatus();
  switchView("portfolio");
};

const deleteSavedPortfolio = (id) => {
  writeSavedPortfolios(readSavedPortfolios().filter((item) => item.id !== id));
  renderSavedPortfolios();
};

const watchlistSymbols = () => parseTickerList(watchlistInput.value).slice(0, 20);

const saveWatchlist = () => {
  const symbols = watchlistSymbols();
  watchlistInput.value = symbols.join(", ");
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(symbols));
  watchlistStatus.textContent = symbols.length ? `Saved ${symbols.length} watchlist ticker${symbols.length === 1 ? "" : "s"}.` : "Add at least one ticker to save.";
};

const loadSavedWatchlist = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
    if (Array.isArray(saved) && saved.length) watchlistInput.value = saved.join(", ");
  } catch {
    localStorage.removeItem(WATCHLIST_KEY);
  }
};

const fetchToolStocks = async (symbols, statusElement, label) => {
  const results = [];
  const quoteMap = await fetchYahooQuotes(symbols).catch(() => ({}));
  for (let index = 0; index < symbols.length; index += 1) {
    const symbol = symbols[index];
    statusElement.textContent = `${label} ${symbol} (${index + 1}/${symbols.length})...`;
    try {
      results.push(await fetchRealStock(symbol, 100 / symbols.length, quoteMap[symbol] || {}));
    } catch (error) {
      results.push({ symbol, error });
    }
  }
  return results;
};

const renderWatchlist = async () => {
  const symbols = watchlistSymbols();
  if (!symbols.length) {
    watchlistGrid.innerHTML = `<article class="suggestion-card warn"><strong>Add tickers first</strong><span>Use symbols like AAPL, MSFT, NVDA, SPY.</span></article>`;
    watchlistStatus.textContent = "Add tickers separated by commas, then refresh the watchlist.";
    return;
  }

  refreshWatchlistButton.disabled = true;
  saveWatchlistButton.disabled = true;
  try {
    const results = await fetchToolStocks(symbols, watchlistStatus, "Loading");
    const stocks = results.filter((item) => !item.error);
    const failed = results.filter((item) => item.error).map((item) => item.symbol);
    watchlistGrid.innerHTML = stocks.length
      ? stocks
          .map(
            (stock) => `
              <article class="watchlist-card">
                <p class="label">${escapeHtml(stock.ticker)}</p>
                <strong>${escapeHtml(stock.name || stock.ticker)}</strong>
                <span class="company-card-note">${escapeHtml(stock.assetClass || "Stock")}</span>
                <div class="watchlist-metrics">
                  <span>Price <button class="info-button mini-info" data-term="currentPrice" type="button" aria-label="Explain price">i</button><strong>${currency(stock.price)}</strong></span>
                  <span>Score <button class="info-button mini-info" data-term="score" type="button" aria-label="Explain score">i</button><strong>${stock.score}</strong></span>
                  <span>P/E <button class="info-button mini-info" data-term="pe" type="button" aria-label="Explain P/E">i</button><strong>${Number.isFinite(stock.pe) ? formatNumber(stock.pe) : "N/A"}</strong></span>
                  <span>Beta <button class="info-button mini-info" data-term="beta" type="button" aria-label="Explain beta">i</button><strong>${formatNumber(stock.beta, 2)}</strong></span>
                </div>
                <span class="company-card-note">Price history through ${escapeHtml(stock.dataAsOf || "N/A")}</span>
                <button class="ghost-button small-button" data-watch-add="${escapeHtml(stock.ticker)}" type="button">Add to Portfolio</button>
              </article>
            `
          )
          .join("")
      : `<article class="suggestion-card warn"><strong>No quotes loaded</strong><span>Try fewer tickers or refresh again.</span></article>`;
    watchlistStatus.textContent = `Loaded ${stocks.length}/${symbols.length} watchlist assets.${failed.length ? ` Could not load: ${failed.join(", ")}.` : ""}`;
    recordDataFreshness("watchlist", stocks.length ? "success" : "failed", `Loaded ${stocks.length}/${symbols.length} watchlist assets.`);
  } catch (error) {
    watchlistStatus.textContent = `Watchlist refresh failed: ${error.message}`;
    watchlistGrid.innerHTML = `<article class="suggestion-card warn"><strong>Watchlist unavailable</strong><span>Try refreshing again later.</span></article>`;
    recordDataFreshness("watchlist", "failed", error.message);
  } finally {
    refreshWatchlistButton.disabled = false;
    saveWatchlistButton.disabled = false;
  }
};

const addWatchlistStockToPortfolio = async (symbol) => {
  watchlistStatus.textContent = `Adding ${symbol} to the portfolio...`;
  const quoteMap = await fetchYahooQuotes([symbol]).catch(() => ({}));
  const holding = await fetchRealStock(symbol, 5, quoteMap[symbol] || {});
  const existingIndex = holdings.findIndex((item) => item.ticker === holding.ticker);
  if (existingIndex >= 0) holdings[existingIndex] = { ...holding, allocation: holdings[existingIndex].allocation || 5 };
  else holdings.push(holding);
  bulkInput.value = holdings.map((item) => `${item.ticker} ${formatNumber(item.allocation)}`).join("\n");
  renderAssetInputTable();
  updateBulkStatus();
  updatePortfolio();
  watchlistStatus.textContent = `${symbol} is now in the portfolio. Adjust its percentage in Portfolio when ready.`;
};

const compareSymbols = () => parseTickerList(compareInput.value).slice(0, 5);

const renderCompareRows = (stocks) => {
  const columns = [1, 2, 3, 4, 5].map((index) => document.querySelector(`#compareCol${index}`));
  columns.forEach((column, index) => {
    column.textContent = stocks[index]?.ticker || `Asset ${index + 1}`;
    column.hidden = index >= Math.max(stocks.length, 2);
  });

  const infoLabel = (label, term) =>
    term
      ? `${label} <button class="info-button mini-info" data-term="${term}" type="button" aria-label="Explain ${escapeHtml(label)}">i</button>`
      : label;

  const row = (label, getter, term = "") => `
    <tr>
      <td><strong>${infoLabel(label, term)}</strong></td>
      ${columns.map((_, index) => `<td ${index >= Math.max(stocks.length, 2) ? "hidden" : ""}>${stocks[index] ? getter(stocks[index]) : ""}</td>`).join("")}
    </tr>
  `;

  compareBody.innerHTML = [
    row("Company", (stock) => escapeHtml(stock.name || stock.ticker)),
    row("Asset Class", (stock) => escapeHtml(stock.assetClass || "Stock"), "sector"),
    row("Price", (stock) => currency(stock.price), "currentPrice"),
    row("StockPilot Score", (stock) => String(stock.score), "score"),
    row("P/E", (stock) => (Number.isFinite(stock.pe) ? formatNumber(stock.pe) : "N/A"), "pe"),
    row("Dividend Yield", (stock) => (Number.isFinite(stock.dividendYield) ? `${formatNumber(stock.dividendYield, 2)}%` : "N/A"), "dividendYield"),
    row("Beta", (stock) => formatNumber(stock.beta, 2), "beta"),
    row("Price History Through", (stock) => escapeHtml(stock.dataAsOf || "N/A"), "asOf"),
    row("Recent Momentum", (stock) => `${formatNumber(marketScore(stock.returns), 0)}/100`, "recentMomentum"),
    row("Market Cap", (stock) => compactCurrency(stock.marketCap), "marketCap"),
    row("Best Use", (stock) => (stock.score >= 72 ? "Core candidate" : stock.score >= 55 ? "Watch / compare" : "Needs review"), "bestUse")
  ].join("");
};

const runStockCompare = async () => {
  const symbols = compareSymbols();
  if (symbols.length < 2) {
    compareStatus.textContent = "Add at least two tickers to compare.";
    return;
  }

  runCompareButton.disabled = true;
  comparePortfolioButton.disabled = true;
  try {
    const results = await fetchToolStocks(symbols, compareStatus, "Comparing");
    const stocks = results.filter((item) => !item.error);
    const failed = results.filter((item) => item.error).map((item) => item.symbol);
    renderCompareRows(stocks);
    compareStatus.textContent = `Compared ${stocks.length}/${symbols.length} assets.${failed.length ? ` Could not load: ${failed.join(", ")}.` : ""}`;
  } finally {
    runCompareButton.disabled = false;
    comparePortfolioButton.disabled = false;
  }
};

const simulatorLoss = (shockByHolding) => {
  const total = holdings.reduce((sum, holding) => sum + holding.allocation, 0) || 100;
  return holdings.reduce((loss, holding) => {
    const shock = shockByHolding(holding);
    return loss + (holding.allocation / total) * shock;
  }, 0);
};

const renderSimulator = () => {
  if (!holdings.length) {
    simulatorResults.innerHTML = `<article class="suggestion-card warn"><strong>Load a portfolio first</strong><span>The simulator needs holdings and allocations before it can estimate impact.</span></article>`;
    return;
  }

  const marketDrop = numberFromInput("simMarketDrop");
  const highBetaDrop = numberFromInput("simHighBetaDrop");
  const largestDrop = numberFromInput("simLargestDrop");
  const customDrop = numberFromInput("simCustomDrop");
  const largest = getPortfolioStats().largest;
  const scenarios = [
    {
      tone: "bad",
      title: "Market Shock",
      loss: simulatorLoss((holding) => marketDrop * Math.max(holding.beta || 1, 0.4)),
      detail: `${formatNumber(marketDrop)}% broad-market drop adjusted by each holding's beta.`
    },
    {
      tone: "warn",
      title: "High-Beta Selloff",
      loss: simulatorLoss((holding) => (holding.beta > 1.25 ? highBetaDrop : highBetaDrop * 0.35)),
      detail: `${formatNumber(highBetaDrop)}% hit to high-beta names, smaller hit to the rest.`
    },
    {
      tone: "bad",
      title: "Largest Holding Shock",
      loss: simulatorLoss((holding) => (largest && holding.id === largest.id ? largestDrop : 0)),
      detail: `${largest?.ticker || "Largest holding"} drops ${formatNumber(largestDrop)}%.`
    },
    {
      tone: "warn",
      title: "Custom Portfolio Shock",
      loss: simulatorLoss(() => customDrop),
      detail: `${formatNumber(customDrop)}% drop applied to every holding.`
    }
  ];

  simulatorResults.innerHTML = scenarios
    .map(
      (scenario) => `
        <article class="suggestion-card ${toneToClass(scenario.tone)}">
          <p class="label">Estimated Loss</p>
          <strong>-${formatNumber(scenario.loss)}%</strong>
          <span>${escapeHtml(scenario.title)}: ${escapeHtml(scenario.detail)}</span>
        </article>
      `
    )
    .join("");
};

const exportReport = () => {
  const report = buildReport();
  const blob = new Blob([report], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `portfolio-report-${new Date().toISOString().slice(0, 10)}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

const switchView = (view) => {
  tabButtons.forEach((button) => {
    const active = button.dataset.view === view;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (sectionSelect && sectionSelect.value !== view) sectionSelect.value = view;
  if (investingSectionSelect && investingSectionSelect.value !== view) investingSectionSelect.value = view;
  viewPanels.forEach((panel) => panel.classList.toggle("active", panel.dataset.viewPanel === view));
  if (view === "research") {
    renderCompanyIntel();
    if (!latestNewsItems.length) refreshMarketNews();
    if (!watchlistGrid.innerHTML.trim()) renderWatchlist();
    if (!compareBody.innerHTML.trim()) renderCompareRows([]);
  }
  if (view === "insights") {
    renderPortfolioGraphs();
    renderSimulator();
  }
  if (view === "market") renderVirtualMarket();
  if (view === "rebalance") renderRebalanceLab();
  if (view === "records") {
    updateReportPreview();
    renderSavedPortfolios();
  }
};

const TOOL_LAUNCHER_ITEMS = [
  { id: "command", title: "Command Center", detail: "Portfolio, budget, learning, and alerts in one place.", mode: "command", tags: ["home", "overview", "dashboard", "start"] },
  { id: "assistant", title: "Ask StockPilot", detail: "Assistant that turns portfolio, budget, savings, and learning prompts into next actions.", mode: "command", selector: ".ask-pilot-panel", tags: ["ai", "assistant", "copilot", "ask", "prompt"] },
  { id: "settings", title: "Settings", detail: "Experience mode, refresh, account tools, and local data status.", mode: "command", action: "settings", tags: ["preferences", "refresh", "account", "backup"] },
  { id: "pricing", title: "Free Beta", detail: "Free today, with a simple Pro coming-soon waitlist.", mode: "command", selector: ".pricing-panel", tags: ["free", "pro", "coming soon", "waitlist"] },
  { id: "services", title: "Pro Roadmap", detail: "Possible future upgrades like cloud sync, alerts, history, and better reports.", mode: "command", selector: ".services-panel", tags: ["roadmap", "pro", "future", "cloud", "alerts"] },
  { id: "plan", title: "My Plan", detail: "Weekly actions, decision journal, and planning tools.", mode: "plan", tags: ["actions", "journal", "decision"] },
  { id: "goals", title: "Goals", detail: "Track emergency funds, debt payoff, investing, and big purchases.", mode: "goals", tags: ["targets", "progress", "saving"] },
  { id: "portfolio", title: "Portfolio Builder", detail: "Add tickers, allocations, real stock data, and holdings.", mode: "investing", view: "portfolio", selector: "[data-view-panel='portfolio']", tags: ["stocks", "holdings", "allocation", "tickers"] },
  { id: "research", title: "Research", detail: "Company facts, watchlist, stock compare, and market news.", mode: "investing", view: "research", selector: ".intel-section", tags: ["company", "facts", "watchlist", "compare"] },
  { id: "macro", title: "Macro Dashboard", detail: "Rates, inflation, unemployment, mortgages, and portfolio context from FRED-style data.", mode: "investing", view: "research", selector: ".macro-section", tags: ["fred", "rates", "inflation", "unemployment", "macro"] },
  { id: "news", title: "News", detail: "Latest public finance headlines with simple summaries.", mode: "investing", view: "research", selector: ".news-section", tags: ["headlines", "rss", "market updates"] },
  { id: "graphs", title: "Graphs", detail: "Allocation, risk, sector, and efficient frontier visuals.", mode: "investing", view: "insights", selector: ".graphs-section", tags: ["charts", "frontier", "correlation", "risk"] },
  { id: "simulator", title: "What-If Simulator", detail: "Stress test drops and see possible portfolio impact.", mode: "investing", view: "insights", selector: ".simulator-section", tags: ["drop", "scenario", "stress"] },
  { id: "market", title: "Virtual Market", detail: "Paper trading, positions, watchlist, and portfolio movement.", mode: "investing", view: "market", selector: ".market-section", tags: ["paper trading", "crypto", "quotes"] },
  { id: "rebalance", title: "Rebalance Lab", detail: "Targets, trade costs, tax estimates, and suggested moves.", mode: "investing", view: "rebalance", selector: ".rebalance-section", tags: ["tax", "fees", "trades"] },
  { id: "calculators", title: "Calculators", detail: "TVM, intrinsic value, risk/return, and geometric average.", mode: "investing", view: "calculators", selector: ".calculators-section", tags: ["tvm", "fv", "pv", "pmt", "intrinsic", "geometric"] },
  { id: "reports", title: "Reports", detail: "Saved portfolios and plain-English portfolio report.", mode: "investing", view: "records", selector: ".report-section", tags: ["saved", "export", "summary"] },
  { id: "budget", title: "Budget Plan", detail: "Monthly income, spending, savings, debt, and cash flow graphs.", mode: "savings", savingsPanel: "plan", selector: "[data-savings-panel='plan']", tags: ["cash flow", "spending", "income"] },
  { id: "savings-goals", title: "Savings Goals", detail: "Goal timeline, monthly targets, and payoff helpers.", mode: "savings", savingsPanel: "goals", selector: "[data-savings-panel='goals']", tags: ["goal timeline", "payoff"] },
  { id: "protection", title: "Protection", detail: "Emergency runway, insurance, subscription leaks, and pressure checks.", mode: "savings", savingsPanel: "protection", selector: "[data-savings-panel='protection']", tags: ["emergency", "insurance", "subscriptions", "runway"] },
  { id: "playbook", title: "Budget Playbooks", detail: "Simple help for layoffs, moving, debt, student life, and more.", mode: "savings", savingsPanel: "playbook", selector: "[data-savings-panel='playbook']", tags: ["tips", "scenarios", "help"] },
  { id: "learning", title: "Learning Overview", detail: "Progress, weak areas, missions, and study dashboard.", mode: "education", learningArea: "overview", selector: "[data-learning-area-panel='overview']", tags: ["education", "learn"] },
  { id: "pathway", title: "Learning Pathway", detail: "Locked guided lessons with comprehension checks.", mode: "education", learningArea: "pathway", selector: ".learning-path-section", tags: ["duolingo", "lessons", "path"] },
  { id: "terms", title: "Simple English Terms", detail: "Beginner-friendly finance definitions and examples.", mode: "education", learningArea: "library", learningPanel: "terms", selector: "[data-education-panel='terms']", tags: ["dictionary", "definitions"] },
  { id: "history", title: "History", detail: "Market history patterns and real-world money lessons.", mode: "education", learningArea: "library", learningPanel: "history", selector: "[data-education-panel='history']", tags: ["facts", "past"] },
  { id: "behavior", title: "Behavioral Finance", detail: "Investor biases, risk personality, and market anomaly lessons.", mode: "education", learningArea: "library", learningPanel: "behavior", selector: "[data-education-panel='behavior']", tags: ["bias", "anomalies", "psychology", "risk personality"] },
  { id: "quiz", title: "Comprehension Check", detail: "Practice questions that reveal weak topics.", mode: "education", learningArea: "practice", selector: "[data-learning-area-panel='practice']", tags: ["test", "practice", "check"] }
];

const getToolSearchMatches = (query) => {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return TOOL_LAUNCHER_ITEMS.slice(0, 6);
  return TOOL_LAUNCHER_ITEMS
    .map((item) => {
      const haystack = [item.title, item.detail, item.id, ...(item.tags || [])].join(" ").toLowerCase();
      const score = haystack.includes(cleanQuery) ? (item.title.toLowerCase().includes(cleanQuery) ? 2 : 1) : 0;
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 6);
};

const renderToolSearchResults = () => {
  if (!toolSearchInput || !toolSearchResults) return;
  const matches = getToolSearchMatches(toolSearchInput.value);
  toolSearchResults.hidden = false;
  toolSearchResults.innerHTML = matches.length
    ? matches
        .map(
          (item) => `
            <button type="button" data-tool-launch="${escapeHtml(item.id)}">
              <strong>${escapeHtml(item.title)}</strong>
              <span>${escapeHtml(item.detail)}</span>
            </button>
          `
        )
        .join("")
    : `<div class="tool-search-empty">No exact match. Try budget, news, goals, market, TVM, or quiz.</div>`;
};

const closeToolSearch = () => {
  if (toolSearchResults) toolSearchResults.hidden = true;
};

const launchTool = (item) => {
  if (!item) return;
  setMoneyMode(item.mode);
  if (item.action === "settings") {
    openSettings();
    return;
  }
  if (item.view) switchView(item.view);
  if (item.savingsPanel) showSavingsPanel(item.savingsPanel);
  if (item.learningArea) showLearningArea(item.learningArea, false, item.learningPanel || "");
  if (item.learningPanel) showLearningPanel(item.learningPanel);
  closeToolSearch();
  if (toolSearchInput) toolSearchInput.value = item.title;
  window.requestAnimationFrame(() => {
    const target = item.selector ? document.querySelector(item.selector) : document.querySelector(`[data-mode="${item.mode}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

const correlationClass = (value) => {
  if (value === null) return "";
  if (value >= 0.72) return "high-corr";
  if (value >= 0.45) return "mid-corr";
  return "low-corr";
};

const prepareCanvas = (canvas) => {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(320, Math.round(rect.width || canvas.width));
  const height = Math.max(240, Math.round(rect.height || canvas.height));
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext("2d");
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;
  context.font = "12px Inter, system-ui, sans-serif";
  return { context, width, height };
};

const drawEmptyChart = (canvas, message) => {
  const { context, width, height } = prepareCanvas(canvas);
  context.fillStyle = "#66717a";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "700 14px Inter, system-ui, sans-serif";
  context.fillText(message, width / 2, height / 2);
};

const drawRoundedBar = (context, x, y, width, height, radius) => {
  const safeRadius = Math.min(radius, height / 2, Math.abs(width) / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.fill();
};

const drawCompactBarChart = (canvas, rows, options = {}) => {
  if (!canvas) return;
  const cleanRows = rows.filter((row) => Number.isFinite(row.value) && row.value >= 0);
  if (!cleanRows.length) {
    drawEmptyChart(canvas, "Add data to see this graph.");
    return;
  }

  const { context, width, height } = prepareCanvas(canvas);
  const left = options.left || 118;
  const right = 58;
  const top = 20;
  const rowHeight = Math.max(30, Math.min(44, (height - top - 24) / cleanRows.length));
  const maxValue = Math.max(...cleanRows.map((row) => row.value), 1);

  cleanRows.forEach((row, index) => {
    const y = top + index * rowHeight;
    const barWidth = ((width - left - right) * row.value) / maxValue;
    context.fillStyle = "#66717a";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = "800 12px Inter, system-ui, sans-serif";
    context.fillText(row.label, left - 10, y + 12);
    context.fillStyle = row.color || chartColors[index % chartColors.length];
    drawRoundedBar(context, left, y + 3, Math.max(4, barWidth), 20, 7);
    context.fillStyle = "#172026";
    context.textAlign = "left";
    context.fillText(row.caption || formatNumber(row.value, 0), left + Math.max(4, barWidth) + 8, y + 13);
  });
};

const drawSavingsBudgetFlow = ({ income, fixed, flexible, debt, savings, leftover }) => {
  if (!budgetFlowChart) return;
  if (!income && !fixed && !flexible && !debt && !savings) {
    drawEmptyChart(budgetFlowChart, "Add budget numbers to see cash flow.");
    return;
  }

  const { context, width, height } = prepareCanvas(budgetFlowChart);
  const used = fixed + flexible + debt + savings;
  const assignedRatio = income > 0 ? used / income : 0;
  const left = 36;
  const right = 36;
  const chartWidth = width - left - right;
  const mainY = 106;
  const barHeight = 34;
  const sectionGap = 8;
  const maxValue = Math.max(income, used, 1);
  const flowWidth = (value) => Math.max(value > 0 ? 8 : 0, (Math.min(value, maxValue) / maxValue) * chartWidth);
  const segments = [
    { label: "Bills", value: fixed, color: "#5d7f99" },
    { label: "Flexible", value: flexible, color: "#a66a12" },
    { label: "Debt", value: debt, color: "#b73832" },
    { label: "Savings", value: savings, color: "#168257" }
  ].filter((segment) => segment.value > 0);
  const leftoverSegment = {
    label: leftover >= 0 ? "Leftover" : "Gap",
    value: Math.abs(leftover),
    color: leftover >= 0 ? "#0f7f87" : "#c2413a"
  };

  context.fillStyle = "#172026";
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.font = "900 18px Inter, system-ui, sans-serif";
  context.fillText(leftover >= 0 ? "Cash flow is positive" : "Cash flow needs attention", left, 30);
  context.fillStyle = "#66717a";
  context.font = "800 12px Inter, system-ui, sans-serif";
  context.fillText(`${currency(income)} income · ${currency(used)} assigned · ${currency(Math.abs(leftover))} ${leftover >= 0 ? "left" : "gap"}`, left, 52);

  context.fillStyle = "#eef4f6";
  drawRoundedBar(context, left, mainY, chartWidth, barHeight, 12);
  context.fillStyle = "#2374c6";
  drawRoundedBar(context, left, mainY, flowWidth(income), barHeight, 12);
  context.fillStyle = "#ffffff";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.font = "900 13px Inter, system-ui, sans-serif";
  context.fillText("Income", left + 14, mainY + barHeight / 2);
  context.textAlign = "right";
  context.fillText(currency(income), left + Math.max(80, flowWidth(income)) - 14, mainY + barHeight / 2);

  let x = left;
  const outY = 172;
  context.fillStyle = "#eef4f6";
  drawRoundedBar(context, left, outY, chartWidth, barHeight, 12);
  segments.forEach((segment, index) => {
    const rawWidth = (segment.value / maxValue) * chartWidth;
    const widthToDraw = Math.max(segment.value > 0 ? 8 : 0, rawWidth - (index ? sectionGap : 0));
    if (index) x += sectionGap;
    context.fillStyle = segment.color;
    drawRoundedBar(context, x, outY, Math.min(widthToDraw, left + chartWidth - x), barHeight, 10);
    x += widthToDraw;
  });

  context.fillStyle = "#172026";
  context.textAlign = "left";
  context.font = "900 12px Inter, system-ui, sans-serif";
  context.fillText("Assigned", left, outY - 12);
  context.textAlign = "right";
  context.fillText(`${formatNumber(assignedRatio * 100, 0)}% of income`, left + chartWidth, outY - 12);

  const legendY = 230;
  let legendX = left;
  [...segments, leftoverSegment].forEach((item) => {
    const label = `${item.label}: ${currency(item.value)}`;
    context.font = "800 11px Inter, system-ui, sans-serif";
    const textWidth = context.measureText(label).width;
    if (legendX + textWidth + 28 > width - right) {
      legendX = left;
    }
    context.fillStyle = item.color;
    drawRoundedBar(context, legendX, legendY - 9, 12, 12, 4);
    context.fillStyle = "#4b5563";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillText(label, legendX + 18, legendY - 3);
    legendX += textWidth + 46;
  });

  const statusY = height - 42;
  const statusText = leftover >= 0
    ? `${currency(leftover)} of breathing room after bills, spending, debt, and savings.`
    : `${currency(Math.abs(leftover))} shortfall. Reduce outflows or lower planned savings until income covers the month.`;
  context.fillStyle = leftover >= 0 ? "rgba(22, 130, 87, 0.1)" : "rgba(183, 56, 50, 0.1)";
  drawRoundedBar(context, left, statusY - 18, chartWidth, 32, 12);
  context.fillStyle = leftover >= 0 ? "#168257" : "#b73832";
  context.textAlign = "left";
  context.font = "900 12px Inter, system-ui, sans-serif";
  context.fillText(statusText, left + 14, statusY - 2);

  if (assignedRatio > 1) {
    context.fillStyle = "#b73832";
    context.textAlign = "right";
    context.font = "900 11px Inter, system-ui, sans-serif";
    context.fillText("Over income", left + chartWidth, outY + barHeight + 18);
  }
};

const drawSavingsMix = ({ savings, debt, leftover }) => {
  if (!savingsMixChart) return;
  const positiveLeftover = Math.max(leftover, 0);
  const rows = [
    { label: "Savings", value: savings, color: "#168257" },
    { label: "Debt", value: debt, color: "#b73832" },
    { label: "Leftover", value: positiveLeftover, color: "#2374c6" }
  ];
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  if (!total) {
    drawEmptyChart(savingsMixChart, "Add savings, debt, or leftover cash to see your mix.");
    return;
  }

  const { context, width, height } = prepareCanvas(savingsMixChart);
  const left = 36;
  const right = 36;
  const top = 86;
  const trackWidth = width - left - right;
  const trackHeight = 34;
  let x = left;

  context.fillStyle = "#172026";
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.font = "900 18px Inter, system-ui, sans-serif";
  context.fillText("Savings mix", left, 30);
  context.fillStyle = "#66717a";
  context.font = "800 12px Inter, system-ui, sans-serif";
  context.fillText(`${currency(total)} available across savings, debt payoff, and leftover cash`, left, 52);

  context.fillStyle = "#eef4f6";
  drawRoundedBar(context, left, top, trackWidth, trackHeight, 12);
  rows.forEach((row, index) => {
    const segmentWidth = (row.value / total) * trackWidth;
    context.fillStyle = row.color;
    drawRoundedBar(context, x, top, Math.max(8, segmentWidth - (index ? 4 : 0)), trackHeight, 10);
    x += segmentWidth;
  });

  rows.forEach((row, index) => {
    const y = 156 + index * 46;
    const pct = (row.value / total) * 100;
    const barWidth = Math.max(8, (pct / 100) * (trackWidth * 0.52));
    context.fillStyle = row.color;
    drawRoundedBar(context, left, y - 12, barWidth, 22, 7);
    context.fillStyle = "#172026";
    context.textAlign = "left";
    context.font = "900 13px Inter, system-ui, sans-serif";
    context.fillText(row.label, left + trackWidth * 0.56, y - 1);
    context.fillStyle = "#66717a";
    context.font = "800 12px Inter, system-ui, sans-serif";
    context.fillText(`${currency(row.value)} · ${formatNumber(pct, 0)}%`, left + trackWidth * 0.56, y + 17);
  });

  const note = savings >= debt
    ? "Savings is leading this mix."
    : "Debt payments are larger than savings this month.";
  context.fillStyle = savings >= debt ? "rgba(22, 130, 87, 0.1)" : "rgba(166, 106, 18, 0.12)";
  drawRoundedBar(context, left, height - 48, trackWidth, 32, 12);
  context.fillStyle = savings >= debt ? "#168257" : "#a66a12";
  context.font = "900 12px Inter, system-ui, sans-serif";
  context.fillText(note, left + 14, height - 29);
};

const renderLearningCharts = () => {
  const countCards = (selector) => document.querySelectorAll(selector).length;
  drawCompactBarChart(
    learningLibraryChart,
    [
      { label: "Tips", value: countCards('[data-education-panel="tips"] .lesson-card'), color: "#6b4fc8" },
      { label: "Simple Terms", value: countCards(".simple-term-card"), color: "#2374c6" },
      { label: "History", value: countCards('[data-education-panel="history"] .history-timeline article'), color: "#a66a12" },
      { label: "Concepts", value: countCards('[data-education-panel="concepts"] .lesson-card'), color: "#168257" },
      { label: "Behavior", value: countCards('[data-education-panel="behavior"] .lesson-card'), color: "#b73872" },
      { label: "Quick Check", value: countCards('[data-education-panel="quiz"] .lesson-card'), color: "#0f7f87" }
    ],
    { left: 112 }
  );
  drawCompactBarChart(
    historyEraChart,
    [
      { label: "Early Markets", value: 2, color: "#6b4fc8" },
      { label: "Institutions", value: 4, color: "#2374c6" },
      { label: "Market Shocks", value: 5, color: "#b73832" },
      { label: "Rates & Inflation", value: 3, color: "#a66a12" },
      { label: "Modern Access", value: 3, color: "#168257" }
    ],
    { left: 120 }
  );
};

const drawAllocationChart = () => {
  if (!holdings.length) {
    drawEmptyChart(allocationChart, "Load assets to see allocation.");
    return;
  }

  const { context, width, height } = prepareCanvas(allocationChart);
  const sorted = [...holdings].sort((a, b) => b.allocation - a.allocation).slice(0, 8);
  const maxAllocation = Math.max(...sorted.map((holding) => holding.allocation), 1);
  const left = 68;
  const right = 54;
  const top = 18;
  const rowHeight = Math.max(24, (height - top - 20) / sorted.length);

  sorted.forEach((holding, index) => {
    const y = top + index * rowHeight + 5;
    const barWidth = ((width - left - right) * holding.allocation) / maxAllocation;
    context.fillStyle = "#66717a";
    context.textAlign = "right";
    context.textBaseline = "middle";
    context.font = "800 12px Inter, system-ui, sans-serif";
    context.fillText(holding.ticker, left - 10, y + 9);
    context.fillStyle = chartColors[index % chartColors.length];
    drawRoundedBar(context, left, y, Math.max(4, barWidth), 18, 6);
    context.fillStyle = "#172026";
    context.textAlign = "left";
    context.fillText(`${formatNumber(holding.allocation)}%`, left + barWidth + 8, y + 9);
  });
};

const drawSectorChart = () => {
  if (!holdings.length) {
    drawEmptyChart(sectorChart, "Load assets to see asset mix.");
    return;
  }

  const { context, width, height } = prepareCanvas(sectorChart);
  const sectorWeights = Object.entries(
    holdings.reduce((weights, holding) => {
      weights[holding.sector || "Unclassified"] = (weights[holding.sector || "Unclassified"] || 0) + holding.allocation;
      return weights;
    }, {})
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const total = sectorWeights.reduce((sum, [, value]) => sum + value, 0) || 1;
  const cx = Math.min(width * 0.32, 140);
  const cy = height / 2;
  const radius = Math.min(width * 0.2, height * 0.32, 88);
  let start = -Math.PI / 2;

  sectorWeights.forEach(([, value], index) => {
    const angle = (value / total) * Math.PI * 2;
    context.beginPath();
    context.moveTo(cx, cy);
    context.arc(cx, cy, radius, start, start + angle);
    context.closePath();
    context.fillStyle = chartColors[index % chartColors.length];
    context.fill();
    start += angle;
  });

  context.beginPath();
  context.arc(cx, cy, radius * 0.56, 0, Math.PI * 2);
  context.fillStyle = "#fbfdfd";
  context.fill();
  context.fillStyle = "#172026";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "900 18px Inter, system-ui, sans-serif";
  context.fillText(`${formatNumber(total, 0)}%`, cx, cy - 5);
  context.font = "700 11px Inter, system-ui, sans-serif";
  context.fillStyle = "#66717a";
  context.fillText("mapped", cx, cy + 14);

  const legendX = Math.min(width * 0.58, cx + radius + 44);
  sectorWeights.forEach(([sector, value], index) => {
    const y = 42 + index * 32;
    context.fillStyle = chartColors[index % chartColors.length];
    context.fillRect(legendX, y - 8, 12, 12);
    context.fillStyle = "#172026";
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.font = "800 12px Inter, system-ui, sans-serif";
    const label = sector.length > 20 ? `${sector.slice(0, 19)}...` : sector;
    context.fillText(label, legendX + 20, y - 2);
    context.fillStyle = "#66717a";
    context.font = "700 11px Inter, system-ui, sans-serif";
    context.fillText(`${formatNumber(value)}%`, legendX + 20, y + 13);
  });
};

const drawRiskScoreChart = () => {
  if (!holdings.length) {
    drawEmptyChart(riskScoreChart, "Load assets to see risk versus score.");
    return;
  }

  const { context, width, height } = prepareCanvas(riskScoreChart);
  const left = 54;
  const right = 28;
  const top = 22;
  const bottom = 42;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const betaMax = Math.max(2, ...holdings.map((holding) => holding.beta || 1)) + 0.1;

  context.strokeStyle = "#dce3e7";
  context.fillStyle = "#66717a";
  context.font = "700 11px Inter, system-ui, sans-serif";
  context.textAlign = "right";
  context.textBaseline = "middle";
  [0, 25, 50, 75, 100].forEach((score) => {
    const y = top + chartHeight - (score / 100) * chartHeight;
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(width - right, y);
    context.stroke();
    context.fillText(String(score), left - 10, y);
  });

  context.textAlign = "center";
  [0.5, 1, 1.5, 2].forEach((beta) => {
    if (beta > betaMax) return;
    const x = left + (beta / betaMax) * chartWidth;
    context.beginPath();
    context.moveTo(x, top);
    context.lineTo(x, top + chartHeight);
    context.stroke();
    context.fillText(beta.toFixed(1), x, height - 18);
  });

  context.fillStyle = "#66717a";
  context.font = "800 12px Inter, system-ui, sans-serif";
  context.fillText("Beta", left + chartWidth / 2, height - 4);
  context.save();
  context.translate(14, top + chartHeight / 2);
  context.rotate(-Math.PI / 2);
  context.fillText("Score", 0, 0);
  context.restore();

  const labels = [];
  holdings.forEach((holding, index) => {
    const x = left + (Math.min(holding.beta || 1, betaMax) / betaMax) * chartWidth;
    const y = top + chartHeight - (clamp(holding.score) / 100) * chartHeight;
    const size = 5 + Math.sqrt(Math.max(holding.allocation, 1)) * 2.8;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fillStyle = chartColors[index % chartColors.length];
    context.globalAlpha = 0.82;
    context.fill();
    context.globalAlpha = 1;
    labels.push({ text: holding.ticker, x, y: y - size - 5 });
  });

  labels
    .sort((a, b) => a.y - b.y)
    .forEach((label) => {
      let labelY = label.y;
      labels.forEach((placed) => {
        if (!placed.placed || placed === label) return;
        const closeX = Math.abs(placed.x - label.x) < 42;
        const closeY = Math.abs(placed.finalY - labelY) < 14;
        if (closeX && closeY) labelY = placed.finalY - 15;
      });
      label.finalY = Math.max(top + 10, labelY);
      label.placed = true;
      context.textAlign = "center";
      context.textBaseline = "bottom";
      context.font = "800 11px Inter, system-ui, sans-serif";
      const textWidth = context.measureText(label.text).width;
      context.fillStyle = "rgba(251, 253, 253, 0.88)";
      context.fillRect(label.x - textWidth / 2 - 4, label.finalY - 13, textWidth + 8, 14);
      context.fillStyle = "#172026";
      context.fillText(label.text, label.x, label.finalY);
  });
};

const seededRandom = (seed) => {
  const value = Math.sin(seed * 999.91) * 10000;
  return value - Math.floor(value);
};

const alignedReturnData = () => {
  const candidates = holdings.filter((holding) => Array.isArray(holding.returns) && holding.returns.length >= 20);
  const length = Math.min(...candidates.map((holding) => holding.returns.length));
  if (candidates.length < 2 || !Number.isFinite(length) || length < 20) return null;
  return {
    holdings: candidates.slice(0, 30),
    series: candidates.slice(0, 30).map((holding) => holding.returns.slice(-length).map((value) => value / 100))
  };
};

const portfolioRiskReturn = (weights, means, covariance) => {
  const dailyReturn = weights.reduce((sum, weight, index) => sum + weight * means[index], 0);
  let variance = 0;
  weights.forEach((leftWeight, left) => {
    weights.forEach((rightWeight, right) => {
      variance += leftWeight * rightWeight * covariance[left][right];
    });
  });
  return {
    returnPct: dailyReturn * 252 * 100,
    riskPct: Math.sqrt(Math.max(variance, 0)) * Math.sqrt(252) * 100
  };
};

const buildFrontierData = () => {
  const aligned = alignedReturnData();
  if (!aligned) return null;

  const { holdings: frontierHoldings, series } = aligned;
  const means = series.map(average);
  const covariance = series.map((leftSeries, leftIndex) =>
    series.map((rightSeries, rightIndex) => {
      const leftMean = means[leftIndex];
      const rightMean = means[rightIndex];
      const length = Math.min(leftSeries.length, rightSeries.length);
      if (length < 2) return 0;
      let total = 0;
      for (let index = 0; index < length; index += 1) {
        total += (leftSeries[index] - leftMean) * (rightSeries[index] - rightMean);
      }
      return total / (length - 1);
    })
  );

  const generated = [];
  const count = frontierHoldings.length;
  for (let sample = 1; sample <= 720; sample += 1) {
    const raw = Array.from({ length: count }, (_, index) => 0.03 + seededRandom(sample * (index + 3)) ** 1.8);
    const total = raw.reduce((sum, value) => sum + value, 0);
    const weights = raw.map((value) => value / total);
    generated.push(portfolioRiskReturn(weights, means, covariance));
  }

  const allocationTotal = frontierHoldings.reduce((sum, holding) => sum + Math.max(holding.allocation, 0), 0) || 1;
  const currentWeights = frontierHoldings.map((holding) => Math.max(holding.allocation, 0) / allocationTotal);
  const current = portfolioRiskReturn(currentWeights, means, covariance);
  const points = generated.filter((point) => Number.isFinite(point.riskPct) && Number.isFinite(point.returnPct));
  const efficient = [...points]
    .sort((a, b) => a.riskPct - b.riskPct || b.returnPct - a.returnPct)
    .reduce((frontier, point) => {
      const bestReturn = frontier.length ? frontier[frontier.length - 1].returnPct : -Infinity;
      if (point.returnPct > bestReturn) frontier.push(point);
      return frontier;
    }, []);

  return { points, efficient, current, holdingCount: frontierHoldings.length };
};

const drawEfficientFrontierChart = () => {
  const data = buildFrontierData();
  if (!data || data.points.length < 8) {
    drawEmptyChart(frontierChart, "Load at least two assets with price history.");
    frontierNote.textContent = "The frontier needs at least two assets with enough historical return data.";
    return;
  }

  const { context, width, height } = prepareCanvas(frontierChart);
  const left = 62;
  const right = 28;
  const top = 24;
  const bottom = 46;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const all = [...data.points, data.current];
  const minRisk = Math.max(0, Math.min(...all.map((point) => point.riskPct)) * 0.9);
  const maxRisk = Math.max(...all.map((point) => point.riskPct)) * 1.08;
  const minReturn = Math.min(...all.map((point) => point.returnPct));
  const maxReturn = Math.max(...all.map((point) => point.returnPct));
  const returnPadding = Math.max(2, (maxReturn - minReturn) * 0.12);
  const yMin = minReturn - returnPadding;
  const yMax = maxReturn + returnPadding;
  const xScale = (risk) => left + ((risk - minRisk) / Math.max(maxRisk - minRisk, 0.0001)) * chartWidth;
  const yScale = (ret) => top + chartHeight - ((ret - yMin) / Math.max(yMax - yMin, 0.0001)) * chartHeight;

  context.strokeStyle = "#dce3e7";
  context.fillStyle = "#66717a";
  context.font = "700 11px Inter, system-ui, sans-serif";
  context.textAlign = "right";
  context.textBaseline = "middle";
  for (let step = 0; step <= 4; step += 1) {
    const value = yMin + ((yMax - yMin) * step) / 4;
    const y = yScale(value);
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(width - right, y);
    context.stroke();
    context.fillText(`${formatNumber(value, 0)}%`, left - 10, y);
  }
  context.textAlign = "center";
  for (let step = 0; step <= 4; step += 1) {
    const value = minRisk + ((maxRisk - minRisk) * step) / 4;
    const x = xScale(value);
    context.beginPath();
    context.moveTo(x, top);
    context.lineTo(x, top + chartHeight);
    context.stroke();
    context.fillText(`${formatNumber(value, 0)}%`, x, height - 18);
  }

  context.fillStyle = "#66717a";
  context.font = "800 12px Inter, system-ui, sans-serif";
  context.fillText("Annualized Risk", left + chartWidth / 2, height - 4);
  context.save();
  context.translate(16, top + chartHeight / 2);
  context.rotate(-Math.PI / 2);
  context.fillText("Annualized Return", 0, 0);
  context.restore();

  data.points.forEach((point) => {
    context.beginPath();
    context.arc(xScale(point.riskPct), yScale(point.returnPct), 2.2, 0, Math.PI * 2);
    context.fillStyle = "rgba(8, 126, 139, 0.18)";
    context.fill();
  });

  if (data.efficient.length > 1) {
    context.beginPath();
    data.efficient.forEach((point, index) => {
      const x = xScale(point.riskPct);
      const y = yScale(point.returnPct);
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = "#6f5cc2";
    context.lineWidth = 3;
    context.stroke();
  }

  const currentX = xScale(data.current.riskPct);
  const currentY = yScale(data.current.returnPct);
  context.beginPath();
  context.arc(currentX, currentY, 7, 0, Math.PI * 2);
  context.fillStyle = "#c2413a";
  context.fill();
  context.strokeStyle = "#ffffff";
  context.lineWidth = 3;
  context.stroke();
  context.fillStyle = "#172026";
  context.font = "900 12px Inter, system-ui, sans-serif";
  context.textAlign = "left";
  context.fillText("Current Portfolio", Math.min(currentX + 10, width - 130), Math.max(currentY - 10, top + 12));

  context.fillStyle = "#6f5cc2";
  context.fillRect(width - 190, top + 4, 18, 4);
  context.fillStyle = "#66717a";
  context.font = "800 11px Inter, system-ui, sans-serif";
  context.fillText("Estimated frontier", width - 164, top + 8);
  context.beginPath();
  context.arc(width - 181, top + 28, 5, 0, Math.PI * 2);
  context.fillStyle = "#c2413a";
  context.fill();
  context.fillStyle = "#66717a";
  context.fillText("Your mix", width - 164, top + 31);

  const frontierReturnNearRisk = data.efficient
    .filter((point) => point.riskPct <= data.current.riskPct * 1.05)
    .reduce((best, point) => (point.returnPct > (best?.returnPct ?? -Infinity) ? point : best), null);
  const gap = frontierReturnNearRisk ? frontierReturnNearRisk.returnPct - data.current.returnPct : 0;
  frontierNote.textContent =
    gap > 1
      ? `Educational estimate: simulated mixes of these ${data.holdingCount} holdings found about ${formatNumber(gap)}% more annualized return at similar risk.`
      : `Educational estimate: your current mix is close to the simulated frontier for these ${data.holdingCount} holdings.`;
};

const renderPortfolioGraphs = () => {
  drawAllocationChart();
  drawSectorChart();
  drawRiskScoreChart();
  drawEfficientFrontierChart();
};

const renderCorrelationMatrix = () => {
  const visibleHoldings = [...holdings].sort((a, b) => b.allocation - a.allocation).slice(0, 12);

  if (visibleHoldings.length < 2) {
    correlationMatrix.innerHTML = `<p class="helper-text">Add at least two assets with return data to calculate correlation.</p>`;
    return;
  }

  const columns = visibleHoldings.length + 1;
  const cells = ['<div class="matrix-cell header"></div>'];
  visibleHoldings.forEach((holding) => cells.push(`<div class="matrix-cell header">${escapeHtml(holding.ticker)}</div>`));
  visibleHoldings.forEach((rowHolding) => {
    cells.push(`<div class="matrix-cell row-header">${escapeHtml(rowHolding.ticker)}</div>`);
    visibleHoldings.forEach((columnHolding) => {
      const value =
        rowHolding.id === columnHolding.id ? 1 : pearsonCorrelation(rowHolding.returns, columnHolding.returns);
      cells.push(
        `<div class="matrix-cell ${correlationClass(value)}">${value === null ? "N/A" : formatNumber(value, 2)}</div>`
      );
    });
  });

  correlationMatrix.innerHTML = `<div class="matrix-grid" style="grid-template-columns: repeat(${columns}, minmax(5.25rem, 1fr));">${cells.join("")}</div>`;
};

const updatePortfolio = () => {
  holdings = holdings.map((holding) => ({ ...holding, score: scoreHoldingFromRatios(holding) }));
  const stats = getPortfolioStats();
  renderPortfolioSummary(stats);
  renderHoldingsTable();
  renderThesisBuilder();
  renderPortfolioNotes(stats);
  renderTargetSuggestions(stats);
  renderPortfolioDna(stats);
  renderCompanyIntel();
  syncRebalanceTargets();
  renderRebalanceLab();
  renderPortfolioGraphs();
  renderCorrelationMatrix();
  updateReportPreview();
  renderSimulator();
  if (latestNewsItems.length) renderNewsItems(latestNewsItems);
  renderCommandCenter();
  scheduleSaveAppState();
};

const normalizePortfolio = () => {
  const total = holdings.reduce((sum, holding) => sum + holding.allocation, 0);
  if (!total) return;
  holdings = holdings.map((holding) => ({ ...holding, allocation: (holding.allocation / total) * 100 }));
  updatePortfolio();
};

const parseTickerList = (value) =>
  [...new Set(String(value || "").toUpperCase().match(/[A-Z.\-]{1,8}/g) || [])];

const firstFinite = (...values) => values.map(Number).find(Number.isFinite);

const detectAssetClass = (symbol, quoteInfo = {}) => {
  const ticker = String(symbol || "").toUpperCase();
  const quoteType = String(quoteInfo.quoteType || quoteInfo.typeDisp || quoteInfo.quoteSourceName || "").toLowerCase();
  const longName = String(quoteInfo.shortName || quoteInfo.longName || quoteInfo.displayName || "").toLowerCase();
  if (CRYPTO_TICKERS.has(ticker) || quoteType.includes("crypto") || /-usd$/.test(ticker)) return "Crypto";
  if (COMMODITY_TICKERS.has(ticker) || /gold|silver|oil|natural gas|commodity|commodities|agriculture|corn|wheat|copper/.test(longName)) return "Commodity";
  if (REAL_ESTATE_TICKERS.has(ticker) || /reit|real estate|property|properties|realty|real estate select/.test(longName)) return "Real Estate";
  if (BOND_TICKERS.has(ticker) || /bond|treasury|income|muni|mortgage|aggregate/.test(longName)) return "Bond";
  if (quoteType.includes("etf")) return "ETF";
  if (quoteType.includes("mutual")) return "Fund";
  if (quoteType.includes("equity") || quoteType.includes("stock")) return "Stock";
  return "Stock";
};

const returnsFromPrices = (prices) => {
  const returns = [];
  for (let index = 1; index < prices.length; index += 1) {
    const prior = prices[index - 1].close;
    const current = prices[index].close;
    if (prior > 0) returns.push(((current - prior) / prior) * 100);
  }
  return returns;
};

const standardDeviation = (values) => {
  if (values.length < 2) return 0;
  const avg = average(values);
  return Math.sqrt(average(values.map((value) => (value - avg) ** 2)));
};

const marketScore = (returns) => {
  if (returns.length < 3) return 35;
  const totalReturn = returns.reduce((compound, value) => compound * (1 + value / 100), 1) - 1;
  const avgDaily = average(returns);
  const volatility = standardDeviation(returns);
  const momentum = scoreHigherBetter(totalReturn * 100, -8, 6, 28);
  const consistency = scoreHigherBetter(avgDaily / Math.max(volatility, 0.01), -0.05, 0.04, 0.13);
  const stability = scoreLowerBetter(volatility, 1.1, 2.4, 4.5);
  return Math.round(average([momentum, consistency, stability]));
};

const combinedStockScore = (returns, quoteData, allocation) => {
  const priceScore = marketScore(returns);
  const volatility = standardDeviation(returns);
  const assetClass = quoteData.assetClass || "Stock";
  if (assetClass === "Crypto") {
    const riskScore = scoreLowerBetter(volatility, 2.5, 4.5, 8);
    const portfolio = scoreLowerBetter(allocation, 2, 5, 10);
    return Math.round(average([priceScore, riskScore, portfolio]));
  }
  if (assetClass === "Bond") {
    const stability = scoreLowerBetter(volatility, 0.35, 0.75, 1.5);
    const income = scoreHigherBetter(quoteData.dividendYield, 1.5, 3.5, 5.5);
    const portfolio = scoreLowerBetter(allocation, 8, 25, 45);
    return Math.round(average([priceScore, stability, income, portfolio]));
  }
  if (assetClass === "Commodity") {
    const volatilityControl = scoreLowerBetter(volatility, 1.4, 2.8, 5.5);
    const portfolio = scoreLowerBetter(allocation, 3, 8, 15);
    return Math.round(average([priceScore, volatilityControl, portfolio]));
  }
  if (assetClass === "Real Estate") {
    const income = scoreHigherBetter(quoteData.dividendYield, 1.8, 3.5, 6);
    const volatilityControl = scoreLowerBetter(volatility, 1, 2.1, 4);
    const portfolio = scoreLowerBetter(allocation, 5, 12, 25);
    return Math.round(average([priceScore, income, volatilityControl, portfolio]));
  }
  const valuation = average([
    scoreLowerBetter(quoteData.pe, 18, 30, 55),
    Number.isFinite(quoteData.ps) ? scoreLowerBetter(quoteData.ps, 2, 8, 18) : 50,
    scoreHigherBetter(quoteData.dividendYield, 0.6, 2.2, 4.5)
  ]);
  const safety = average([
    scoreLowerBetter(quoteData.beta, 0.8, 1.25, 1.8),
    scoreLowerBetter(volatility, 1.1, 2.4, 4.5)
  ]);
  const portfolio = scoreLowerBetter(allocation, 4, 10, 18);
  return Math.round(average([priceScore, valuation, safety, portfolio]));
};

const apiGatewayUrlFor = (url, type = "json") => {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "query1.finance.yahoo.com" && parsed.pathname.includes("/v8/finance/chart/")) {
      const symbol = decodeURIComponent(parsed.pathname.split("/").pop() || "");
      const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/history`);
      apiUrl.searchParams.set("symbol", symbol);
      apiUrl.searchParams.set("range", parsed.searchParams.get("range") || "1y");
      apiUrl.searchParams.set("interval", parsed.searchParams.get("interval") || "1d");
      return apiUrl.toString();
    }
    if (parsed.hostname === "query1.finance.yahoo.com" && parsed.pathname.includes("/v7/finance/quote")) {
      const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/quotes`);
      apiUrl.searchParams.set("symbols", parsed.searchParams.get("symbols") || "");
      return apiUrl.toString();
    }
    if (parsed.hostname === "query2.finance.yahoo.com" && parsed.pathname.includes("/v1/finance/search")) {
      const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/search`);
      apiUrl.searchParams.set("q", parsed.searchParams.get("q") || "");
      return apiUrl.toString();
    }
    if (type === "text" && NEWS_SOURCES.some((source) => source.url === url)) {
      const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/news/rss`);
      apiUrl.searchParams.set("url", url);
      return apiUrl.toString();
    }
    if (type === "text" && parsed.hostname === "finance.yahoo.com") {
      const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/proxy/text`);
      apiUrl.searchParams.set("url", url);
      return apiUrl.toString();
    }
  } catch {
    return "";
  }
  return "";
};

const fetchJsonWithFallback = async (url) => {
  const apiUrl = stockPilotApiOnline ? apiGatewayUrlFor(url, "json") : "";
  if (apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`StockPilot API failed with ${response.status}`);
      return await response.json();
    } catch {
      stockPilotApiOnline = false;
      updateDataSourceStatus();
    }
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return await response.json();
  } catch (directError) {
    const proxied = `${CORS_PROXY_URL}${encodeURIComponent(url)}`;
    const response = await fetch(proxied);
    if (!response.ok) throw new Error(`Price source failed with ${response.status}`);
    return response.json();
  }
};

const fetchTextWithFallback = async (url) => {
  const apiUrl = stockPilotApiOnline ? apiGatewayUrlFor(url, "text") : "";
  if (apiUrl) {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`StockPilot API failed with ${response.status}`);
      return await response.text();
    } catch {
      stockPilotApiOnline = false;
      updateDataSourceStatus();
    }
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Request failed with ${response.status}`);
    return await response.text();
  } catch (directError) {
    const proxied = `${CORS_PROXY_URL}${encodeURIComponent(url)}`;
    const response = await fetch(proxied);
    if (!response.ok) throw new Error(`Page source failed with ${response.status}`);
    return response.text();
  }
};

const textNumber = (value) => {
  if (!value || value === "N/A") return NaN;
  return Number(String(value).replace(/,/g, ""));
};

const textPercent = (value) => {
  const match = String(value || "").match(/(-?\d+(?:\.\d+)?)%/);
  return match ? Number(match[1]) : NaN;
};

const metricAfterLabel = (text, label) => {
  const pattern = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+([^\\n]+)`, "i");
  return text.match(pattern)?.[1]?.trim();
};

const metricNumberAfterLabel = (text, label) => {
  const pattern = new RegExp(`${label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+(-?\\d+(?:,\\d{3})*(?:\\.\\d+)?)`, "i");
  return textNumber(text.match(pattern)?.[1]);
};

const fetchYahooPageQuote = async (symbol) => {
  const html = await fetchTextWithFallback(`https://finance.yahoo.com/quote/${encodeURIComponent(symbol)}/`);
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body?.innerText || html.replace(/<[^>]+>/g, " ");
  const dividendText = metricAfterLabel(text, "Forward Dividend & Yield") || "";
  const nameMatch = text.match(new RegExp(`(?:^|\\n)${symbol}\\s+(.+?)\\s+[-+]?\\d`, "i"));
  const titleName = doc
    .querySelector("title")
    ?.textContent?.replace(/\([^)]*\).*/, "")
    .replace(/\s+Stock Price.*$/i, "")
    .replace(/\s+Stock Quote.*$/i, "")
    .trim();
  const sectorMatch = text.match(/Fiscal Year Ends\s+([A-Za-z ]+?)\s+Sector/i);

  return {
    shortName: nameMatch?.[1]?.trim() || titleName,
    trailingPE: metricNumberAfterLabel(text, "PE Ratio (TTM)"),
    epsTrailingTwelveMonths: metricNumberAfterLabel(text, "EPS (TTM)"),
    beta: metricNumberAfterLabel(text, "Beta (5Y Monthly)"),
    dividendYield: textPercent(dividendText),
    marketCapText: metricAfterLabel(text, "Market Cap (intraday)"),
    sector: sectorMatch?.[1]?.trim()
  };
};

const fetchYahooQuotes = async (symbols) => {
  const url = new URL(YAHOO_QUOTE_URL);
  url.searchParams.set("symbols", symbols.join(","));
  const payload = await fetchJsonWithFallback(url.toString());
  const quotes = payload?.quoteResponse?.result ?? [];
  return quotes.reduce((map, quote) => {
    map[String(quote.symbol || "").toUpperCase()] = quote;
    return map;
  }, {});
};

const fetchSecCompanyFacts = async (symbol) => {
  if (!stockPilotApiOnline) return null;
  try {
    const apiUrl = new URL(`${stockPilotApiBaseUrl}/api/sec/company`);
    apiUrl.searchParams.set("symbol", symbol);
    const response = await fetch(apiUrl.toString());
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};

const fetchRealStock = async (symbol, allocation, quoteInfo = {}) => {
  const url = new URL(`${YAHOO_CHART_BASE_URL}${encodeURIComponent(symbol)}`);
  url.searchParams.set("range", "1y");
  url.searchParams.set("interval", "1d");
  const payload = await fetchJsonWithFallback(url.toString());
  const result = payload?.chart?.result?.[0];
  const chartQuote = result?.indicators?.quote?.[0];
  const timestamps = result?.timestamp ?? [];
  const closes = chartQuote?.close ?? [];
  const prices = timestamps
    .map((timestamp, index) => ({
      date: new Date(timestamp * 1000).toISOString().slice(0, 10),
      close: Number(closes[index])
    }))
    .filter((row) => row.date && Number.isFinite(row.close))
    .slice(-260);
  if (prices.length < 5) throw new Error(`No public price history found for ${symbol}`);
  const returns = returnsFromPrices(prices).slice(-180);
  const latest = prices[prices.length - 1];
  const volatility = standardDeviation(returns);
  const needsPageQuote =
    !Number.isFinite(Number(quoteInfo.trailingPE)) ||
    !(quoteInfo.shortName || quoteInfo.longName || quoteInfo.displayName || quoteInfo.sector);
  const pageQuote = needsPageQuote ? await fetchYahooPageQuote(symbol).catch(() => ({})) : {};
  const enrichedQuote = { ...quoteInfo, ...pageQuote };
  const assetClass = detectAssetClass(symbol, enrichedQuote);
  const secFacts = assetClass === "Stock" ? await fetchSecCompanyFacts(symbol) : null;
  const secRatios = secFacts?.ratios || {};
  const secEps = secFacts?.facts?.epsDiluted?.value;
  const livePrice = firstFinite(enrichedQuote.regularMarketPrice, enrichedQuote.postMarketPrice, enrichedQuote.preMarketPrice, enrichedQuote.bid, enrichedQuote.ask);
  const quoteTimestamp = firstFinite(enrichedQuote.regularMarketTime, enrichedQuote.postMarketTime, enrichedQuote.preMarketTime);
  const priceSource = Number.isFinite(livePrice)
    ? enrichedQuote.stockPilotProvider || "Quote API"
    : "Daily close";
  const priceAsOf = Number.isFinite(livePrice)
    ? formatQuoteTimestamp(quoteTimestamp, latest.date)
    : latest.date;
  const quoteData = {
    price: firstFinite(livePrice, latest.close),
    pe: firstFinite(enrichedQuote.trailingPE, enrichedQuote.forwardPE),
    ps: firstFinite(enrichedQuote.priceToSalesTrailing12Months),
    eps: firstFinite(enrichedQuote.epsTrailingTwelveMonths, enrichedQuote.epsForward, secEps),
    beta: firstFinite(enrichedQuote.beta, volatility / 1.6),
    dividendYield: firstFinite(
      Number.isFinite(Number(enrichedQuote.trailingAnnualDividendYield)) ? Number(enrichedQuote.trailingAnnualDividendYield) * 100 : NaN,
      Number.isFinite(Number(enrichedQuote.dividendYield)) ? Number(enrichedQuote.dividendYield) : NaN,
      0
    ),
    marketCap: firstFinite(enrichedQuote.marketCap),
    name: enrichedQuote.shortName || enrichedQuote.longName || secFacts?.name || enrichedQuote.sector || symbol,
    sector: enrichedQuote.sector,
    assetClass
  };
  const score = combinedStockScore(returns, quoteData, allocation);

  return {
    id: crypto.randomUUID(),
    ticker: symbol,
    name: quoteData.name,
    sector: quoteData.assetClass,
    assetClass: quoteData.assetClass,
    category: quoteData.sector || quoteData.assetClass,
    price: quoteData.price,
    dataAsOf: latest.date,
    priceAsOf,
    priceSource,
    marketCap: quoteData.marketCap,
    allocation,
    pe: quoteData.pe,
    ps: quoteData.ps,
    dividendYield: quoteData.dividendYield,
    roe: firstFinite(secRatios.roe, 0),
    debtEquity: firstFinite(secRatios.debtEquity, 0),
    growth: returns.length ? returns[returns.length - 1] : 0,
    beta: Number(quoteData.beta.toFixed(2)),
    score,
    factorScores: {
      valuation: average([
        scoreLowerBetter(quoteData.pe, 18, 30, 55),
        Number.isFinite(quoteData.ps) ? scoreLowerBetter(quoteData.ps, 2, 8, 18) : 50
      ]),
      quality: 50,
      growth: marketScore(returns),
      safety: scoreLowerBetter(volatility, 1.1, 2.4, 4.5),
      portfolio: scoreLowerBetter(allocation, 4, 10, 18)
    },
    returns,
    marketDataOnly: false,
    sourceData: {
      ticker: symbol,
      name: quoteData.name,
      sector: quoteData.sector || quoteData.assetClass,
      assetClass: quoteData.assetClass,
      price: quoteData.price,
      dataAsOf: latest.date,
      priceAsOf,
      priceSource,
      marketCap: quoteData.marketCap,
      eps: quoteData.eps,
      revenuePerShare: Number.isFinite(quoteData.ps) && quoteData.ps !== 0 ? quoteData.price / quoteData.ps : NaN,
      bookValuePerShare: NaN,
      fcfPerShare: NaN,
      dividendPerShare: quoteData.price * (quoteData.dividendYield / 100),
      revenueGrowth: 0,
      epsGrowth: 0,
      grossMargin: 0,
      operatingMargin: 0,
      netMargin: 0,
      roe: firstFinite(secRatios.roe, 0),
      debtEquity: firstFinite(secRatios.debtEquity, 0),
      currentRatio: 0,
      beta: quoteData.beta,
      allocation,
      returnSeries: returns.join(","),
      secFilingData: secFacts
    }
  };
};

const fetchWithLimit = async (symbols, limit = 4, allocations = {}) => {
  const results = [];
  const quoteMap = await fetchYahooQuotes(symbols).catch(() => ({}));
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < symbols.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      const symbol = symbols[currentIndex];
      fetchStatus.textContent = `Fetching ${symbol} (${currentIndex + 1}/${symbols.length})...`;
      try {
        results[currentIndex] = await fetchRealStock(symbol, allocations[symbol] ?? 100 / symbols.length, quoteMap[symbol] ?? {});
      } catch (error) {
        results[currentIndex] = { error, symbol };
      }
    }
  };

  await Promise.all(Array.from({ length: Math.min(limit, symbols.length) }, worker));
  return results;
};

const loadRealStocks = async () => {
  const symbols = parseTickerList(tickerImport.value);
  if (!symbols.length) {
    fetchStatus.textContent = "Add at least one ticker symbol.";
    return;
  }

  fetchRealStocksButton.disabled = true;
  fetchStatus.textContent = `Loading ${symbols.length} assets from ${stockPilotApiOnline ? "StockPilot API gateway" : "browser fallback data"}...`;
  activeScenario = "";
  updateScenarioButtons();

  try {
    const results = await fetchWithLimit(symbols);
    const successful = results.filter((result) => result && !result.error);
    const failed = results.filter((result) => result?.error);
    holdings = successful;
    if (successful.length) normalizePortfolio();
    else updatePortfolio();
    const firstFailure = failed[0]?.error?.message ? ` First error: ${failed[0].error.message}` : "";
    fetchStatus.textContent = failed.length
      ? `Loaded ${successful.length} assets. ${failed.length} failed.${firstFailure}`
      : `Loaded ${successful.length} assets with ${stockPilotApiOnline ? "StockPilot API gateway" : "public browser"} price history.`;
    recordDataFreshness("portfolio", successful.length ? "success" : "failed", `Loaded ${successful.length}/${symbols.length} assets.`, stockPilotApiOnline ? "StockPilot API gateway" : "Free public data");
  } catch (error) {
    fetchStatus.textContent = `Real-asset fetch failed: ${error.message}`;
    recordDataFreshness("portfolio", "failed", error.message, stockPilotApiOnline ? "StockPilot API gateway" : "Free public data");
  } finally {
    fetchRealStocksButton.disabled = false;
    updateDataSourceStatus();
  }
};

const loadPortfolioBuilderStocks = async () => {
  const rows = parsePortfolioBuilderRows(bulkInput.value);

  if (!rows.length) {
    bulkStatus.textContent = "Add at least one row like: NVDA 20";
    return;
  }

  const symbols = rows.map((row) => row.symbol);
  const allocations = rows.reduce((map, row) => {
    map[row.symbol] = row.allocation;
    return map;
  }, {});
  const total = rows.reduce((sum, row) => sum + row.allocation, 0);

  importPortfolioButton.disabled = true;
  fetchStatus.textContent = `Loading ${symbols.length} portfolio holdings from ${stockPilotApiOnline ? "StockPilot API gateway" : "browser fallback data"}...`;
  activeScenario = "";
  updateScenarioButtons();

  try {
    const results = await fetchWithLimit(symbols, 4, allocations);
    const successful = results.filter((result) => result && !result.error);
    const failed = results.filter((result) => result?.error);
    holdings = successful;
    updatePortfolio();
    updateBulkStatus();
    const totalNote = Math.abs(total - 100) > 1 ? ` Allocation totals ${formatNumber(total)}%, not 100%.` : "";
    const firstFailure = failed[0]?.error?.message ? ` First error: ${failed[0].error.message}` : "";
    fetchStatus.textContent = failed.length
      ? `Loaded ${successful.length} holdings. ${failed.length} failed.${totalNote}${firstFailure}`
      : `Loaded ${successful.length} holdings with ${stockPilotApiOnline ? "StockPilot API gateway" : "public browser"} price history.${totalNote}`;
    recordDataFreshness("portfolio", successful.length ? "success" : "failed", `Loaded ${successful.length}/${symbols.length} portfolio holdings.`, stockPilotApiOnline ? "StockPilot API gateway" : "Free public data");
  } catch (error) {
    fetchStatus.textContent = `Portfolio load failed: ${error.message}`;
    recordDataFreshness("portfolio", "failed", error.message, stockPilotApiOnline ? "StockPilot API gateway" : "Free public data");
  } finally {
    importPortfolioButton.disabled = false;
    updateDataSourceStatus();
  }
};

const loadSingleStockFromAdvanced = async () => {
  const symbol = parseTickerList(form.elements.ticker.value)[0];

  if (!symbol) {
    fetchStatus.textContent = "Enter a ticker in Advanced Details first.";
    return;
  }

  loadSingleStockButton.disabled = true;
  fetchStatus.textContent = `Fetching ${symbol}...`;
  activeScenario = "";
  updateScenarioButtons();

  try {
    const holding = await fetchRealStock(symbol, Number(form.elements.allocation.value) || 100);
    populateInputsFromHolding(holding);
    const existingIndex = holdings.findIndex((item) => item.ticker === holding.ticker);
    if (existingIndex >= 0) holdings[existingIndex] = holding;
    else holdings.push(holding);
    updatePortfolio();
    fetchStatus.textContent = `Loaded ${symbol} from real market data.`;
  } catch (error) {
    fetchStatus.textContent = `Could not load ${symbol}: ${error.message}`;
  } finally {
    loadSingleStockButton.disabled = false;
    updateDataSourceStatus();
  }
};

const generatedReturnSeries = (index, beta) =>
  Array.from({ length: 18 }, (_, month) => {
    const market = Math.sin((month + 1) * 0.8) * 1.8 + Math.cos((month + 2) * 0.35) * 0.9;
    const stockNoise = Math.sin((index + 3) * (month + 1) * 0.27) * (2.4 - Math.min(beta, 1.8) * 0.45);
    return Number((market * beta + stockNoise).toFixed(2));
  });

const loadGeneratedPortfolio = () => {
  activeScenario = "largePortfolio";
  updateScenarioButtons();
  const sectors = ["Technology", "Healthcare", "Financials", "Industrials", "Consumer", "Energy", "Utilities", "Real Estate"];
  holdings = Array.from({ length: 60 }, (_, index) => {
    const beta = Number((0.62 + ((index * 17) % 118) / 100).toFixed(2));
    const holding = {
      id: crypto.randomUUID(),
      ticker: `STK${String(index + 1).padStart(2, "0")}`,
      sector: sectors[index % sectors.length],
      allocation: Number((100 / 60 + ((index % 5) - 2) * 0.12).toFixed(2)),
      pe: 9 + ((index * 7) % 36),
      ps: Number((0.8 + ((index * 11) % 90) / 10).toFixed(2)),
      dividendYield: Number((((index * 13) % 48) / 10).toFixed(2)),
      roe: 7 + ((index * 5) % 27),
      debtEquity: Number((((index * 9) % 155) / 100).toFixed(2)),
      growth: 2 + ((index * 6) % 28),
      beta,
      returns: generatedReturnSeries(index, beta)
    };
    holding.score = scoreHoldingFromRatios(holding);
    return holding;
  });
  normalizePortfolio();
};

const titleCase = (value) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());

const drawGauge = (score) => {
  const context = scoreGauge.getContext("2d");
  const { width, height } = scoreGauge;
  const centerX = width / 2;
  const centerY = height - 24;
  const radius = Math.min((width - 34) / 2, height - 38);
  context.clearRect(0, 0, width, height);
  context.lineWidth = 13;
  context.lineCap = "round";

  context.beginPath();
  context.strokeStyle = "#dce3e7";
  context.arc(centerX, centerY, radius, Math.PI, 0);
  context.stroke();

  const end = Math.PI + (Math.PI * clamp(score)) / 100;
  context.beginPath();
  context.strokeStyle = score >= 70 ? "#198754" : score >= 45 ? "#b7791f" : "#c2413a";
  context.arc(centerX, centerY, radius, Math.PI, end);
  context.stroke();

  context.fillStyle = "#66717a";
  context.font = "800 11px Inter, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("0", centerX - radius, centerY + 17);
  context.fillText("100", centerX + radius, centerY + 17);
};

const drawEmptyRadar = () => {
  const context = radarChart.getContext("2d");
  const { width, height } = radarChart;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#f8fafb";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#dce3e7";
  context.lineWidth = 2;
  context.strokeRect(16, 16, width - 32, height - 32);
  context.fillStyle = "#66717a";
  context.font = "800 15px Inter, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Load one stock to build the factor chart", width / 2, height / 2);
};

const drawRadar = (scores) => {
  const context = radarChart.getContext("2d");
  const { width, height } = radarChart;
  const labels = Object.keys(scores).map(titleCase);
  const values = Object.values(scores).map((score) => clamp(score) / 100);
  const centerX = width / 2;
  const centerY = height / 2 + 10;
  const radius = Math.min(width, height) * 0.32;
  const angleStep = (Math.PI * 2) / labels.length;

  context.clearRect(0, 0, width, height);
  context.strokeStyle = "#dce3e7";
  context.fillStyle = "#66717a";
  context.font = "700 12px Inter, sans-serif";

  for (let ring = 1; ring <= 4; ring += 1) {
    context.beginPath();
    labels.forEach((_, index) => {
      const angle = -Math.PI / 2 + index * angleStep;
      const pointRadius = (radius * ring) / 4;
      const x = centerX + Math.cos(angle) * pointRadius;
      const y = centerY + Math.sin(angle) * pointRadius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.stroke();
  }

  labels.forEach((label, index) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const x = centerX + Math.cos(angle) * (radius + 34);
    const y = centerY + Math.sin(angle) * (radius + 28);
    context.textAlign = x < centerX - 8 ? "right" : x > centerX + 8 ? "left" : "center";
    context.fillText(label, x, y);
  });

  context.beginPath();
  values.forEach((value, index) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const x = centerX + Math.cos(angle) * radius * value;
    const y = centerY + Math.sin(angle) * radius * value;
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.closePath();
  context.fillStyle = "rgba(8, 126, 139, 0.22)";
  context.strokeStyle = "#087e8b";
  context.lineWidth = 3;
  context.fill();
  context.stroke();
};

const update = () => {
  const data = readInputs();
  const result = calculate(data);
  const hasInputs = hasSingleStockInputs(data);
  renderSummary(data, result);
  renderRatios(data, result);
  renderNotes(data, result);
  renderFactorSummary(data, result);
  drawGauge(hasInputs ? result.score : 0);
  if (hasInputs) drawRadar(result.factorScores);
  else drawEmptyRadar();
};

const loadScenario = (name) => {
  const scenario = scenarios[name];
  activeScenario = name;
  Object.entries(scenario).forEach(([key, value]) => {
    const input = form.elements[key];
    if (input) input.value = value;
  });
  updateScenarioButtons();
  update();
};

const updateScenarioButtons = () => {
  scenarioButtons.forEach((button) => {
    const isActive =
      button.dataset.load === activeScenario || (button.id === "loadLargePortfolio" && activeScenario === "largePortfolio");
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

form.addEventListener("input", update);
form.elements.ticker.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  loadSingleStockFromAdvanced();
});
riskProfile.addEventListener("change", () => {
  update();
  updatePortfolio();
});
resetButton.addEventListener("click", () => loadScenario("qualityCompounder"));
const toggleAdvancedDetails = () => {
  const isCollapsed = advancedFields.classList.toggle("collapsed");
  advancedToggle.textContent = isCollapsed ? "Show" : "Hide";
  advancedToggle.setAttribute("aria-expanded", String(!isCollapsed));
  advancedTitleToggle.setAttribute("aria-expanded", String(!isCollapsed));
};
advancedToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleAdvancedDetails();
});
advancedTitleToggle.addEventListener("click", toggleAdvancedDetails);
advancedTitleToggle.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  toggleAdvancedDetails();
});
addHoldingButton.addEventListener("click", () => {
  const nextHolding = createHoldingFromCurrent();
  const existingIndex = holdings.findIndex((holding) => holding.ticker === nextHolding.ticker);
  if (existingIndex >= 0) holdings[existingIndex] = nextHolding;
  else holdings.push(nextHolding);
  updatePortfolio();
});
importPortfolioButton.addEventListener("click", () => {
  loadPortfolioBuilderStocks();
});
samplePortfolioButton.addEventListener("click", () => {
  bulkInput.value = SAMPLE_BULK_PORTFOLIO;
  renderAssetInputTable();
  updateBulkStatus();
  scheduleSaveAppState();
});
clearBulkButton.addEventListener("click", () => {
  bulkInput.value = "";
  renderAssetInputTable();
  updateBulkStatus();
  scheduleSaveAppState();
});
bulkInput.addEventListener("input", updateBulkStatus);
addAssetRowButton.addEventListener("click", () => {
  addAssetInputRow();
});
assetRows.addEventListener("input", () => {
  syncAssetTableToText();
  updateBulkStatus();
  scheduleSaveAppState();
});
assetRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-asset-row]");
  if (!button) return;
  button.closest("tr")?.remove();
  if (!assetRows.querySelector("tr")) addAssetInputRow();
  syncAssetTableToText();
  updateBulkStatus();
  scheduleSaveAppState();
});
addSubscriptionRowButton.addEventListener("click", () => {
  addSubscriptionInputRow();
});
subscriptionRows.addEventListener("input", () => {
  syncSubscriptionTableToText();
  renderSavingsBudget();
  scheduleSaveAppState();
});
subscriptionRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-subscription-row]");
  if (!button) return;
  button.closest("tr")?.remove();
  if (!subscriptionRows.querySelector("tr")) addSubscriptionInputRow();
  syncSubscriptionTableToText();
  renderSavingsBudget();
  scheduleSaveAppState();
});
if (addInsuranceRowButton) {
  addInsuranceRowButton.addEventListener("click", () => {
    addInsuranceInputRow();
    renderInsuranceCheckup();
    scheduleSaveAppState();
  });
}
if (insuranceRows) {
  insuranceRows.addEventListener("input", () => {
    renderInsuranceCheckup();
    scheduleSaveAppState();
  });
  insuranceRows.addEventListener("change", () => {
    renderInsuranceCheckup();
    scheduleSaveAppState();
  });
  insuranceRows.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-insurance-row]");
    if (!button) return;
    button.closest("tr")?.remove();
    if (!insuranceRows.querySelector("tr")) addInsuranceInputRow();
    renderInsuranceCheckup();
    scheduleSaveAppState();
  });
}
addSpendingRowButton.addEventListener("click", () => {
  addSpendingInputRow();
});
spendingRows.addEventListener("input", () => {
  renderSpendingTracker();
  renderCommandCenter();
  scheduleSaveAppState();
});
spendingRows.addEventListener("change", () => {
  renderSpendingTracker();
  renderCommandCenter();
  scheduleSaveAppState();
});
spendingRows.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete-spending-row]");
  if (!button) return;
  button.closest("tr")?.remove();
  if (!spendingRows.querySelector("tr")) addSpendingInputRow();
  renderSpendingTracker();
  renderCommandCenter();
  scheduleSaveAppState();
});
companySearchButton.addEventListener("click", searchCompanyIntel);
companySearchInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  searchCompanyIntel();
});
refreshWatchlistButton.addEventListener("click", renderWatchlist);
saveWatchlistButton.addEventListener("click", saveWatchlist);
watchlistInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  renderWatchlist();
});
watchlistGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-watch-add]");
  if (!button) return;
  addWatchlistStockToPortfolio(button.dataset.watchAdd);
});
runCompareButton.addEventListener("click", runStockCompare);
comparePortfolioButton.addEventListener("click", () => {
  compareInput.value = holdings.length ? holdings.slice(0, 5).map((holding) => holding.ticker).join(", ") : "AAPL, MSFT, NVDA";
  runStockCompare();
});
compareInput.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  runStockCompare();
});
refreshNewsButton.addEventListener("click", refreshMarketNews);
newsFilterInput.addEventListener("input", () => renderNewsItems(latestNewsItems));
newsGrid.addEventListener("click", openNewsLink);
newsScopeButtons.forEach((button) =>
  button.addEventListener("click", () => {
    activeNewsScope = button.dataset.newsScope;
    updateNewsScopeButtons();
    renderNewsItems(latestNewsItems);
  })
);
[
  rebalancePortfolioValue,
  rebalanceCashFlow,
  rebalanceCashReserve,
  tradeFeeFlat,
  tradeFeeBps,
  taxRate,
  taxableGainRate,
  rebalanceTargets
].forEach((input) => input.addEventListener("input", renderRebalanceLab));
equalWeightButton.addEventListener("click", setEqualWeightTargets);
calculatorInputs.forEach((input) => input.addEventListener("input", updateCalculators));
simulatorInputs.forEach((input) => input.addEventListener("input", renderSimulator));
savingsInputs.forEach((input) => input.addEventListener("input", renderSavingsBudget));
if (thesisTickerSelect) thesisTickerSelect.addEventListener("change", () => populateThesisFields(thesisTickerSelect.value));
if (saveThesisButton) saveThesisButton.addEventListener("click", saveSelectedThesis);
if (budgetActionChecklist) {
  budgetActionChecklist.addEventListener("click", (event) => {
    const button = event.target.closest("[data-budget-action]");
    if (button) toggleBudgetAction(button.dataset.budgetAction);
  });
}
if (resetBudgetActionsButton) {
  resetBudgetActionsButton.addEventListener("click", () => {
    completedBudgetActions = [];
    renderBudgetActionChecklist();
    saveAppState();
  });
}
modeButtons.forEach((button) => button.addEventListener("click", () => setMoneyMode(button.dataset.mode)));
if (workspaceSelect) {
  workspaceSelect.addEventListener("change", () => setMoneyMode(workspaceSelect.value));
}
if (toolSearchInput) {
  toolSearchInput.addEventListener("focus", renderToolSearchResults);
  toolSearchInput.addEventListener("input", renderToolSearchResults);
  toolSearchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeToolSearch();
      toolSearchInput.blur();
      return;
    }
    if (event.key !== "Enter") return;
    event.preventDefault();
    const firstMatch = getToolSearchMatches(toolSearchInput.value)[0];
    launchTool(firstMatch);
  });
}
if (toolSearchResults) {
  toolSearchResults.addEventListener("mousedown", (event) => {
    const button = event.target.closest("[data-tool-launch]");
    if (!button) return;
    event.preventDefault();
    launchTool(TOOL_LAUNCHER_ITEMS.find((item) => item.id === button.dataset.toolLaunch));
  });
}
experienceButtons.forEach((button) => button.addEventListener("click", () => setExperienceMode(button.dataset.experience)));
learningAreaButtons.forEach((button) =>
  button.addEventListener("click", () => {
    showLearningArea(button.dataset.learningArea, true, button.dataset.defaultPanel || "");
  })
);
if (learningAreaSelect) {
  learningAreaSelect.addEventListener("change", () => {
    const [area, panel] = learningAreaSelect.value.split(":");
    showLearningArea(area, true, panel || "");
  });
}
learningButtons.forEach((button) => button.addEventListener("click", () => showLearningPanel(button.dataset.learnPanel)));
if (learningScenarioGrid) {
  learningScenarioGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-scenario-id]");
    if (!button) return;
    const scenario = LEARNING_SCENARIOS.find((item) => item.id === button.dataset.scenarioId);
    const option = scenario?.options[Number(button.dataset.scenarioOption)];
    const card = button.closest(".scenario-learning-card");
    const feedback = card?.querySelector(".scenario-feedback");
    if (!scenario || !option || !feedback) return;
    card.querySelectorAll("[data-scenario-id]").forEach((choice) => {
      choice.classList.toggle("selected", choice === button);
    });
    feedback.textContent = option.feedback;
    feedback.classList.toggle("good-text", option.correct);
    feedback.classList.toggle("bad-text", !option.correct);
  });
}
if (learningQuizList) {
  learningQuizList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-quiz-id]");
    if (!button) return;
    const question = LEARNING_QUIZ_QUESTIONS.find((item) => item.id === button.dataset.quizId);
    const answer = question?.answers[Number(button.dataset.quizAnswer)];
    const card = button.closest(".quiz-question-card");
    const feedback = card?.querySelector(".quiz-feedback");
    if (!question || !answer || !feedback) return;
    card.querySelectorAll("[data-quiz-id]").forEach((choice) => {
      choice.classList.toggle("selected", choice === button);
      choice.removeAttribute("data-quiz-result");
    });
    button.dataset.quizResult = answer.correct ? "correct" : "review";
    learningQuizResults[question.id] = {
      answerIndex: Number(button.dataset.quizAnswer),
      correct: Boolean(answer.correct)
    };
    feedback.textContent = answer.correct ? `Correct. ${question.explanation}` : `Review this one. ${question.explanation}`;
    feedback.classList.toggle("good-text", answer.correct);
    feedback.classList.toggle("bad-text", !answer.correct);
    updateLearningQuizScore();
    renderLearningDashboard();
    saveAppState();
  });
}
if (learningReviewList) {
  learningReviewList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-topic]");
    if (!button) return;
    showLearningPanel("quiz");
  });
}
if (learningMissionList) {
  learningMissionList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-learning-mission]");
    if (!button) return;
    const missionId = button.dataset.learningMission;
    if (completedLearningMissions.includes(missionId)) {
      completedLearningMissions = completedLearningMissions.filter((id) => id !== missionId);
    } else {
      completedLearningMissions.push(missionId);
    }
    renderLearningDashboard();
    saveAppState();
  });
}
if (pathwayMap) {
  pathwayMap.addEventListener("click", (event) => {
    const button = event.target.closest("[data-path-lesson]");
    if (!button || button.disabled) return;
    completeLearningLesson(button.dataset.pathLesson);
  });
}
savingsTabButtons.forEach((button) => button.addEventListener("click", () => showSavingsPanel(button.dataset.savingsTab)));
if (savingsPanelSelect) {
  savingsPanelSelect.addEventListener("change", () => showSavingsPanel(savingsPanelSelect.value));
}
lifeEventButtons.forEach((button) => button.addEventListener("click", () => showLifeEvent(button.dataset.lifeEvent)));
if (addJournalEntryButton) addJournalEntryButton.addEventListener("click", addJournalEntry);
if (addGoalButton) addGoalButton.addEventListener("click", addMoneyGoal);
if (goalCardGrid) {
  goalCardGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-goal]");
    if (!button) return;
    deleteMoneyGoal(button.dataset.deleteGoal);
  });
}
if (setupChecklistGrid) {
  setupChecklistGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-setup-action]");
    if (!button) return;
    handleSetupAction(button.dataset.setupAction);
  });
}
if (refreshAllDataButton) refreshAllDataButton.addEventListener("click", refreshAllData);
if (apiRefreshButton) apiRefreshButton.addEventListener("click", refreshAllData);
if (loadRealDemoButton) loadRealDemoButton.addEventListener("click", loadRealDemoData);
document.querySelectorAll("[data-demo-route]").forEach((button) => {
  button.addEventListener("click", () => runDemoRoute(button.dataset.demoRoute));
});
if (refreshMacroButton) refreshMacroButton.addEventListener("click", fetchMacroData);
if (createUserHeaderButton) createUserHeaderButton.addEventListener("click", () => openAccountPanel("create"));
if (commandCreateUserButton) commandCreateUserButton.addEventListener("click", () => openAccountPanel("create"));
if (commandSignInButton) commandSignInButton.addEventListener("click", () => openAccountPanel(activeAccount ? "account" : "login"));
if (commandSettingsButton) commandSettingsButton.addEventListener("click", openSettings);
if (openAccountButton) openAccountButton.addEventListener("click", () => openAccountPanel(activeAccount ? "account" : "login"));
if (openSettingsButton) openSettingsButton.addEventListener("click", openSettings);
if (openSettingsFloatingButton) openSettingsFloatingButton.addEventListener("click", openSettings);
if (closeAccountButton) closeAccountButton.addEventListener("click", () => {
  if (accountOverlay) accountOverlay.hidden = true;
});
if (accountOverlay) {
  accountOverlay.addEventListener("click", (event) => {
    if (event.target === accountOverlay) accountOverlay.hidden = true;
  });
}
if (closeSettingsButton) closeSettingsButton.addEventListener("click", closeSettings);
if (settingsCloseSecondaryButton) settingsCloseSecondaryButton.addEventListener("click", closeSettings);
if (saveSettingsButton) saveSettingsButton.addEventListener("click", applySettingsFromPanel);
if (settingsOverlay) {
  settingsOverlay.addEventListener("click", (event) => {
    if (event.target === settingsOverlay) closeSettings();
  });
}
if (acceptEducationalNoticeButton) acceptEducationalNoticeButton.addEventListener("click", closeEducationalNotice);
if (reviewEducationalNoticeButton) {
  reviewEducationalNoticeButton.addEventListener("click", () => {
    closeEducationalNotice();
    openSettings();
  });
}
if (educationalOverlay) {
  educationalOverlay.addEventListener("click", (event) => {
    if (event.target === educationalOverlay) closeEducationalNotice();
  });
}
settingsExperienceButtons.forEach((button) =>
  button.addEventListener("click", () => {
    setExperienceMode(button.dataset.settingsExperience);
    renderSettings();
    saveAppState();
  })
);
[settingsMarketRefresh, settingsNewsRefresh, settingsPortfolioStale].filter(Boolean).forEach((input) =>
  input.addEventListener("change", applySettingsFromPanel)
);
if (settingsOpenAccountButton) {
  settingsOpenAccountButton.addEventListener("click", () => {
    closeSettings();
    openAccountPanel("create");
  });
}
if (settingsShowTourButton) {
  settingsShowTourButton.addEventListener("click", () => {
    closeSettings();
    if (onboardingOverlay) onboardingOverlay.hidden = false;
  });
}
if (createAccountButton) createAccountButton.addEventListener("click", createLocalAccount);
if (loginAccountButton) loginAccountButton.addEventListener("click", signInLocalAccount);
if (signOutButton) signOutButton.addEventListener("click", signOutLocalAccount);
if (accountFocusCreateButton) accountFocusCreateButton.addEventListener("click", () => openAccountPanel("create"));
if (accountFocusLoginButton) accountFocusLoginButton.addEventListener("click", () => openAccountPanel("login"));
[createAccountName, createAccountEmail, createAccountCode].filter(Boolean).forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") createLocalAccount();
  });
});
[loginAccountEmail, loginAccountCode].filter(Boolean).forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") signInLocalAccount();
  });
});
if (exportAppDataButton) exportAppDataButton.addEventListener("click", exportAppData);
if (importAppDataButton) importAppDataButton.addEventListener("click", importAppData);
if (copyCopilotReportButton) {
  copyCopilotReportButton.addEventListener("click", async () => {
    const report = buildCopilotReportText();
    try {
      await navigator.clipboard.writeText(report);
      if (copilotReportStatus) copilotReportStatus.textContent = "Copilot report copied. Educational summary only; verify real-world numbers before acting.";
    } catch {
      if (copilotReportStatus) copilotReportStatus.textContent = "Copy failed. You can still use the on-screen report summary.";
    }
  });
}
if (askPilotRunButton) askPilotRunButton.addEventListener("click", runPilotAssistant);
if (askPilotInput) {
  askPilotInput.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") runPilotAssistant();
  });
}
if (askPilotAddPlanButton) askPilotAddPlanButton.addEventListener("click", addPilotResultToPlan);
if (askPilotOpenToolButton) askPilotOpenToolButton.addEventListener("click", openPilotTool);
if (demoModeButton) demoModeButton.addEventListener("click", prepareProfessorDemo);
if (clearAllDemoButton) clearAllDemoButton.addEventListener("click", clearAllDemoData);
if (clearInvestingButton) clearInvestingButton.addEventListener("click", clearInvestingDemoData);
if (clearSavingsButton) clearSavingsButton.addEventListener("click", clearSavingsDemoData);
if (clearGoalsButton) clearGoalsButton.addEventListener("click", clearGoalsDemoData);
if (clearLearningButton) clearLearningButton.addEventListener("click", clearLearningDemoData);
if (clearPlanButton) clearPlanButton.addEventListener("click", clearPlanDemoData);
if (prepareProfessorDemoButton) prepareProfessorDemoButton.addEventListener("click", prepareProfessorDemo);
askPilotQuickButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (askPilotInput) askPilotInput.value = button.dataset.pilotPrompt || "";
    runPilotAssistant();
  });
});
if (logTopActionButton) logTopActionButton.addEventListener("click", logTopPlanAction);
if (copyWeeklyReportButton) {
  copyWeeklyReportButton.addEventListener("click", async () => {
    const report = buildWeeklyReportText();
    try {
      await navigator.clipboard.writeText(report);
      if (weeklyReportStatus) weeklyReportStatus.textContent = "Weekly report copied. Educational summary only; verify important numbers before acting.";
    } catch {
      if (weeklyReportStatus) weeklyReportStatus.textContent = "Copy failed. The weekly report is still visible on screen.";
    }
  });
}
if (joinEarlyAccessButton) joinEarlyAccessButton.addEventListener("click", joinEarlyAccess);
if (submitServiceRequestButton) submitServiceRequestButton.addEventListener("click", submitServiceRequest);
[marketRefreshInterval, newsRefreshInterval, portfolioStaleAfter]
  .filter(Boolean)
  .forEach((input) => input.addEventListener("change", applyRefreshSettings));
if (journalList) {
  journalList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-journal]");
    if (!button) return;
    deleteJournalEntry(button.dataset.deleteJournal);
  });
}
document.addEventListener("input", (event) => {
  if (!event.target.matches("input, select, textarea")) return;
  scheduleSaveAppState();
});
if (startOnboardingButton) startOnboardingButton.addEventListener("click", () => handleOnboardingAction("budget"));
if (skipOnboardingButton) skipOnboardingButton.addEventListener("click", closeOnboarding);
if (onboardingOverlay) {
  onboardingOverlay.addEventListener("click", (event) => {
    const button = event.target.closest("[data-onboard-action]");
    if (button) {
      handleOnboardingAction(button.dataset.onboardAction);
      return;
    }
    if (event.target === onboardingOverlay) closeOnboarding();
  });
}
reopenOnboardingButton.addEventListener("click", () => {
  if (onboardingOverlay) onboardingOverlay.hidden = false;
});
document.querySelector("#tvmSolveFor").addEventListener("change", updateCalculators);
exportReportButton.addEventListener("click", exportReport);
exportReportButtonSecondary.addEventListener("click", exportReport);
tabButtons.forEach((button) => button.addEventListener("click", () => switchView(button.dataset.view)));
sectionSelect.addEventListener("change", () => switchView(sectionSelect.value));
if (investingSectionSelect) {
  investingSectionSelect.addEventListener("change", () => {
    setMoneyMode("investing");
    switchView(investingSectionSelect.value);
  });
}
savePortfolioButton.addEventListener("click", saveCurrentPortfolio);
savedPortfolioList.addEventListener("click", (event) => {
  const loadButton = event.target.closest("[data-load-saved]");
  const deleteButton = event.target.closest("[data-delete-saved]");
  if (loadButton) applySavedPortfolio(loadButton.dataset.loadSaved);
  if (deleteButton) deleteSavedPortfolio(deleteButton.dataset.deleteSaved);
});
normalizeButton.addEventListener("click", normalizePortfolio);
clearPortfolioButton.addEventListener("click", () => {
  holdings = [];
  updatePortfolio();
});
loadLargePortfolioButton.addEventListener("click", loadGeneratedPortfolio);
fetchRealStocksButton.addEventListener("click", loadRealStocks);
loadSingleStockButton.addEventListener("click", loadSingleStockFromAdvanced);
holdingsBody.addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button) return;
  holdings = holdings.filter((holding) => holding.id !== button.dataset.delete);
  updatePortfolio();
});
refreshMarketButton.addEventListener("click", updateMarketQuotes);
toggleMarketPollingButton.addEventListener("click", () => setMarketPolling(!virtualMarket.autoRefresh));
resetMarketButton.addEventListener("click", resetVirtualMarket);
marketAlertClose.addEventListener("click", hideMarketAlert);
placeTradeButton.addEventListener("click", placeVirtualTrade);
applyWatchlistButton.addEventListener("click", () => {
  const symbols = parseTickerList(marketWatchlistInput.value);
  virtualMarket.watchlist = symbols.length ? symbols : virtualMarket.watchlist;
  saveVirtualMarket();
  renderVirtualMarket();
  updateMarketQuotes();
});
tradeTicker.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  placeVirtualTrade();
});
tradeShares.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  placeVirtualTrade();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".tool-finder")) closeToolSearch();
  const infoButton = event.target.closest("[data-term]");
  if (!infoButton) return;
  event.preventDefault();
  showTermCard(infoButton.dataset.term, infoButton);
});
termClose.addEventListener("click", hideTermCard);
window.addEventListener("resize", () => {
  clearTimeout(chartResizeTimer);
  chartResizeTimer = setTimeout(() => {
    renderPortfolioGraphs();
    renderSavingsBudget();
    renderLearningCharts();
    renderLearningPath();
    renderLearningPractice();
    renderLearningDashboard();
    renderCommandCenter();
    renderMyPlan();
  }, 120);
});
window.addEventListener("beforeunload", saveAppState);

strategyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeStrategy = button.dataset.strategy;
    strategyButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });
    update();
    updatePortfolio();
  });
});

loadButtons.forEach((button) => {
  button.addEventListener("click", () => loadScenario(button.dataset.load));
});

holdings = [];
updateServerWarning();
restoreAppState();
renderAccountStatus();
syncRefreshSettingsInputs();
renderAssetInputTable();
renderSubscriptionInputTable();
renderInsuranceInputTable();
renderSpendingInputTable();
updateScenarioButtons();
updateBulkStatus();
updateNewsScopeButtons();
loadSavedWatchlist();
updateDataSourceStatus();
checkStockPilotApi();
renderMacroDashboard();
setTimeout(fetchMacroData, 0);
updateCalculators();
renderSavingsBudget();
renderLearningCharts();
renderLearningPath();
renderLearningPractice();
renderLearningDashboard();
renderSavedPortfolios();
renderDataFreshness();
renderSettings();
renderCopilotReport();
renderGoalsHub();
loadVirtualMarket();
renderSimulator();
renderVirtualMarket();
if (virtualMarket.autoRefresh) setMarketPolling(true);
update();
updatePortfolio();
setMoneyMode(restoredMode || "command");
if (restoredMode === "savings") showSavingsPanel(restoredSavingsPanel || "plan");
if (restoredMode === "education") showLearningPanel(restoredLearningPanel || "tips");
if (restoredMode === "investing") switchView(sectionSelect.value || "portfolio");
showEducationalNotice();
showOnboardingIfNeeded();
saveAppState();
