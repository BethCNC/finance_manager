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

    // Full chat mode (will implement with transaction data)
    return res.status(200).json({
      message: 'Full chat mode coming soon!',
      hint: 'Use ?test=true for testing the API connection',
    });
  } catch (error) {
    console.error('Error with OpenAI API:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack,
    });
  }
};
