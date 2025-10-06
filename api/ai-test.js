const {ChatAnthropic} = require('@langchain/anthropic');

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
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: 'ANTHROPIC_API_KEY not found in environment variables',
      });
    }

    // Initialize Claude
    const model = new ChatAnthropic({
      modelName: 'claude-3-5-sonnet-20240620',
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
      temperature: 0.3,
    });

    // Test query
    const testQuery = req.query.message || 'Say hello and confirm you are ready to be a financial advisor!';

    // Simple test invocation
    const response = await model.invoke(testQuery);

    return res.status(200).json({
      success: true,
      message: 'Claude API connection successful! 🎉',
      test_query: testQuery,
      claude_response: response.content,
      model: 'claude-3-5-sonnet-20240620',
    });
  } catch (error) {
    console.error('Error testing Claude API:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack,
    });
  }
};
