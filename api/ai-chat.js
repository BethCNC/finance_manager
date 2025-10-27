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
        hint: 'Add OPENAI_API_KEY to .env.local file',
      });
    }

    // Check if it's a test request or real chat
    const {message, test} = req.method === 'POST' ? req.body : req.query;

    if (test === 'true' || req.query.test === 'true') {
      // Simple test mode
      const model = new ChatOpenAI({
        modelName: 'gpt-4o-mini', // Cheaper model for testing
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.3,
      });

      const testQuery = message || 'Say hello and confirm you are ready to be a financial advisor for Beth and Bryan!';
      const response = await model.invoke(testQuery);

      return res.status(200).json({
        success: true,
        message: 'OpenAI API connection successful! 🎉',
        test_query: testQuery,
        ai_response: response.content,
        model: 'gpt-4o-mini',
        cost_info: {
          input: '$0.150 per 1M tokens',
          output: '$0.600 per 1M tokens',
          vs_claude: '20x cheaper than Claude!',
        },
      });
    }

    // Full chat mode with transaction context
    const {message, conversationHistory = []} = req.method === 'POST' ? req.body : req.query;

    if (!message) {
      return res.status(400).json({
        error: 'Message is required for chat mode',
        hint: 'Send POST request with {message: "your question", conversationHistory: []}',
      });
    }

    try {
      // Fetch user's financial data
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
      
      const [txResponse, summaryResponse] = await Promise.all([
        fetch(`${baseUrl}/api/notion?type=transactions`),
        fetch(`${baseUrl}/api/notion?type=summary`)
      ]);

      const txData = await txResponse.json();
      const summaryData = await summaryResponse.json();

      // Build financial context
      const recentTransactions = txData.transactions?.slice(0, 10) || [];
      const transactionSummary = recentTransactions.map((tx) => 
        `${tx.name}: $${tx.amount} (${tx.category})`
      ).join(', ');

      const financialContext = `
Current Financial Summary:
- Total Income: $${summaryData.totalIncome || 0}
- Total Expenses: $${summaryData.totalExpenses || 0}
- Net Position: $${summaryData.profit || 0}
- Recent Transactions: ${transactionSummary || 'No recent transactions'}

Spending Categories (last 30 days):
${recentTransactions.reduce((acc, tx) => {
  acc[tx.category] = (acc[tx.category] || 0) + Math.abs(tx.amount);
  return acc;
}, {})}
`;

      const systemPrompt = `You are a personal financial advisor for Beth and Bryan. You have access to their current financial data and should provide actionable, personalized advice based on their spending patterns.

${financialContext}

Guidelines:
- Be conversational and supportive, not judgmental
- Provide specific, actionable recommendations
- Reference their actual spending data when relevant
- Suggest concrete steps they can take
- Focus on practical money management strategies
- Keep responses concise but helpful (2-3 paragraphs max)
- Ask follow-up questions to better understand their goals`;

      // Call OpenAI with context
      const model = new ChatOpenAI({
        modelName: 'gpt-4o-mini',
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.7,
      });

      const messages = [
        {role: 'system', content: systemPrompt},
        ...conversationHistory,
        {role: 'user', content: message}
      ];

      const response = await model.invoke(messages);

      return res.status(200).json({
        success: true,
        message: response.content,
        conversationHistory: [...conversationHistory, 
          {role: 'user', content: message},
          {role: 'assistant', content: response.content}
        ],
        model: 'gpt-4o-mini',
        context: {
          totalIncome: summaryData.totalIncome,
          totalExpenses: summaryData.totalExpenses,
          profit: summaryData.profit,
          transactionCount: recentTransactions.length
        }
      });

    } catch (error) {
      console.error('Error in full chat mode:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to process chat message',
        details: error.message,
      });
    }
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack,
    });
  }
};
