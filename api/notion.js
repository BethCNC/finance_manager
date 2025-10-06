const {Client} = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

// Use the new Transactions database
const TRANSACTIONS_DB = process.env.Transactions_database_id || '82fc50e5b6b343a5a2ad1904f47404c0';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const {type} = req.query;

  try {
    if (type === 'transactions') {
      // Get all transactions from the single Transactions database
      const response = await notion.databases.query({
        database_id: TRANSACTIONS_DB,
        sorts: [{property: 'Date', direction: 'descending'}],
        page_size: 50,
      });

      const transactions = response.results.map((page) => {
        // Extract properties based on actual Notion structure
        const amount = page.properties.Amount?.number || 0;
        const transactionType = page.properties.Type?.select?.name || 'Debit';

        // Determine if this is income or expense
        // Debit = expense (negative), Credit = income (positive)
        const isIncome = transactionType.toLowerCase() === 'credit';

        return {
          id: page.id,
          name: page.properties.Description?.title?.[0]?.plain_text ||
                page.properties['Normalized Merchant']?.rich_text?.[0]?.plain_text ||
                'Untitled',
          amount: amount, // Keep original amount with sign
          date: page.properties.Date?.date?.start || new Date().toISOString(),
          type: isIncome ? 'income' : 'expense',
          category: page.properties.Category?.select?.name || 'Uncategorized',
          account: page.properties.Account?.select?.name || '',
          person: page.properties.Who?.select?.name || '',
          business: page.properties.Business?.checkbox || false,
          subscription: page.properties.Subscription?.checkbox || false,
        };
      });

      return res.status(200).json({transactions});
    }

    if (type === 'summary') {
      // Get all transactions and calculate summary
      const response = await notion.databases.query({
        database_id: TRANSACTIONS_DB,
      });

      let totalIncome = 0;
      let totalExpenses = 0;

      response.results.forEach((page) => {
        const amount = page.properties.Amount?.number || 0;
        const transactionType = page.properties.Type?.select?.name || 'Debit';

        if (transactionType.toLowerCase() === 'credit') {
          totalIncome += Math.abs(amount);
        } else {
          totalExpenses += Math.abs(amount);
        }
      });

      const profit = totalIncome - totalExpenses;

      return res.status(200).json({
        totalIncome,
        totalExpenses,
        profit,
      });
    }

    if (type === 'debug') {
      // Debug endpoint to see database structure
      const database = await notion.databases.retrieve({
        database_id: TRANSACTIONS_DB,
      });

      const sample = await notion.databases.query({
        database_id: TRANSACTIONS_DB,
        page_size: 2,
      });

      return res.status(200).json({
        database: {
          title: database.title,
          properties: Object.keys(database.properties),
          propertyDetails: database.properties,
        },
        samplePages: sample.results.map((page) => ({
          id: page.id,
          properties: page.properties,
        })),
      });
    }

    return res.status(400).json({error: 'Invalid type parameter. Use ?type=transactions, ?type=summary, or ?type=debug'});
  } catch (error) {
    console.error('Notion API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch data from Notion',
      details: error.message,
      code: error.code,
    });
  }
};
