const {ChatOpenAI} = require('@langchain/openai');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Verify API key is present
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OPENAI_API_KEY not found in environment variables',
      });
    }

    const {type} = req.query;

    if (!type) {
      return res.status(400).json({
        error: 'Type parameter is required',
        validTypes: ['spending', 'subscriptions', 'budget', 'savings']
      });
    }

    // Fetch financial data
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
    
    const [txResponse, summaryResponse, budgetResponse] = await Promise.all([
      fetch(`${baseUrl}/api/notion?type=transactions`),
      fetch(`${baseUrl}/api/notion?type=summary`),
      fetch(`${baseUrl}/api/notion?type=budget&year=${new Date().getFullYear()}&month=${new Date().getMonth() + 1}`)
    ]);

    const txData = await txResponse.json();
    const summaryData = await summaryResponse.json();
    const budgetData = await budgetResponse.json();

    // Initialize OpenAI model
    const model = new ChatOpenAI({
      modelName: 'gpt-4o-mini',
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.3,
    });

    let analysisPrompt = '';
    let responseFormat = {};

    switch (type) {
      case 'spending':
        analysisPrompt = `Analyze the spending patterns for Beth and Bryan based on this data:

Financial Summary:
- Total Income: $${summaryData.totalIncome || 0}
- Total Expenses: $${summaryData.totalExpenses || 0}
- Net Position: $${summaryData.profit || 0}

Recent Transactions (last 50):
${JSON.stringify(txData.transactions?.slice(0, 50) || [], null, 2)}

Provide analysis in this JSON format:
{
  "topCategories": [{"category": "Food", "amount": 500, "percentage": 25, "trend": "increasing"}],
  "alerts": [{"type": "overspending", "category": "Entertainment", "message": "You've spent 150% of your typical amount"}],
  "recommendations": [{"action": "reduce", "category": "Food", "potentialSavings": 100, "reason": "High restaurant spending"}],
  "insights": ["Your food spending is 30% higher than last month", "Consider meal planning to reduce restaurant costs"]
}`;

        responseFormat = {
          topCategories: [],
          alerts: [],
          recommendations: [],
          insights: []
        };
        break;

      case 'subscriptions':
        const subscriptions = txData.transactions?.filter(tx => tx.subscription) || [];
        
        analysisPrompt = `Analyze subscription spending for Beth and Bryan:

Subscriptions:
${JSON.stringify(subscriptions, null, 2)}

Total Monthly Subscription Cost: $${subscriptions.reduce((sum, tx) => sum + Math.abs(tx.amount), 0)}

Provide analysis in this JSON format:
{
  "totalMonthlyCost": 150,
  "subscriptionCount": 8,
  "optimizationOpportunities": [{"service": "Netflix", "currentCost": 15, "savings": 5, "action": "Switch to annual plan"}],
  "recommendations": [{"action": "cancel", "service": "Unused App", "savings": 10, "reason": "No usage in 3 months"}],
  "alerts": [{"type": "price_increase", "service": "Spotify", "message": "Price increased 20% this month"}]
}`;

        responseFormat = {
          totalMonthlyCost: 0,
          subscriptionCount: 0,
          optimizationOpportunities: [],
          recommendations: [],
          alerts: []
        };
        break;

      case 'budget':
        analysisPrompt = `Analyze budget performance for Beth and Bryan:

Budget Plan:
${JSON.stringify(budgetData.budgetPlan || [], null, 2)}

Actual Spending by Category:
${JSON.stringify(budgetData.actualsByCategory || {}, null, 2)}

Budget Summary:
${JSON.stringify(budgetData.summary || {}, null, 2)}

Recent Transactions (last 30 days):
${JSON.stringify(txData.transactions?.slice(0, 50) || [], null, 2)}

Provide comprehensive budget analysis in this JSON format:
{
  "budgetHealth": "good|fair|poor",
  "overBudgetCategories": [{"category": "Food", "budgeted": 400, "actual": 500, "variance": 100, "percentage": 25}],
  "underBudgetCategories": [{"category": "Entertainment", "budgeted": 200, "actual": 150, "variance": -50, "percentage": -25}],
  "recommendations": [
    {
      "category": "Food",
      "action": "reduce",
      "currentAmount": 500,
      "suggestedAmount": 450,
      "savings": 50,
      "reason": "Consistent overspending - consider meal planning",
      "priority": "high|medium|low"
    }
  ],
  "nextMonthSuggestions": [
    "Increase food budget by $50 based on historical spending",
    "Reduce entertainment budget by $25 to balance overspending",
    "Consider emergency fund allocation of $200"
  ],
  "optimizationOpportunities": [
    {
      "category": "Food",
      "currentSpending": 500,
      "optimizedSpending": 400,
      "potentialSavings": 100,
      "method": "Meal planning and cooking at home",
      "effort": "medium",
      "impact": "high"
    }
  ],
  "budgetAllocationAdvice": {
    "income": 5000,
    "recommendedAllocation": {
      "needs": 50,
      "wants": 30,
      "savings": 20
    },
    "currentAllocation": {
      "needs": 60,
      "wants": 35,
      "savings": 5
    },
    "adjustments": [
      "Reduce wants spending by 5% to increase savings",
      "Optimize needs spending through better planning"
    ]
  }
}`;

        responseFormat = {
          budgetHealth: 'good',
          overBudgetCategories: [],
          underBudgetCategories: [],
          recommendations: [],
          nextMonthSuggestions: [],
          optimizationOpportunities: [],
          budgetAllocationAdvice: {
            income: 0,
            recommendedAllocation: {needs: 50, wants: 30, savings: 20},
            currentAllocation: {needs: 60, wants: 35, savings: 5},
            adjustments: []
          }
        };
        break;

      case 'savings':
        analysisPrompt = `Analyze savings opportunities for Beth and Bryan:

Financial Summary:
- Total Income: $${summaryData.totalIncome || 0}
- Total Expenses: $${summaryData.totalExpenses || 0}
- Net Position: $${summaryData.profit || 0}

Spending by Category:
${JSON.stringify(txData.transactions?.reduce((acc, tx) => {
  acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
  return acc;
}, {}) || {}, null, 2)}

Provide analysis in this JSON format:
{
  "currentSavingsRate": 15,
  "targetSavingsRate": 20,
  "monthlySavingsGoal": 500,
  "opportunities": [{"category": "Food", "currentSpending": 400, "potentialSavings": 100, "method": "Meal planning"}],
  "recommendations": [{"action": "emergency_fund", "amount": 2000, "timeline": "4 months", "priority": "high"}],
  "quickWins": [{"action": "Cancel unused subscription", "savings": 15, "effort": "low"}]
}`;

        responseFormat = {
          currentSavingsRate: 0,
          targetSavingsRate: 20,
          monthlySavingsGoal: 0,
          opportunities: [],
          recommendations: [],
          quickWins: []
        };
        break;

      default:
        return res.status(400).json({
          error: 'Invalid analysis type',
          validTypes: ['spending', 'subscriptions', 'budget', 'savings']
        });
    }

    // Get AI analysis
    const response = await model.invoke(analysisPrompt);

    try {
      // Try to parse JSON response
      const analysis = JSON.parse(response.content);
      
      return res.status(200).json({
        success: true,
        type,
        analysis,
        timestamp: new Date().toISOString(),
        model: 'gpt-4o-mini'
      });
    } catch (parseError) {
      // If JSON parsing fails, return the raw response
      return res.status(200).json({
        success: true,
        type,
        analysis: {
          rawResponse: response.content,
          error: 'Could not parse structured response'
        },
        timestamp: new Date().toISOString(),
        model: 'gpt-4o-mini'
      });
    }

  } catch (error) {
    console.error('Error in AI analysis:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to generate analysis',
      details: error.message,
    });
  }
};
