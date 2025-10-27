const {Configuration, PlaidApi, PlaidEnvironments} = require('plaid');
const {Client} = require('@notionhq/client');

// Initialize Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);
const notion = new Client({auth: process.env.NOTION_API_KEY});

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

  try {
    const accessToken = process.env.PLAID_ACCESS_TOKEN;
    const transactionsDbId = process.env.Transactions_database_id || '82fc50e5b6b343a5a2ad1904f47404c0';

    if (!accessToken) {
      console.error('PLAID_ACCESS_TOKEN not set');
      return res.status(500).json({error: 'PLAID_ACCESS_TOKEN not set'});
    }

    // Sync last 7 days of transactions
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    console.log(`Starting automated sync for ${startDate} to ${endDate}`);

    // Fetch transactions from Plaid
    const plaidResponse = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
      options: {count: 500, offset: 0},
    });

    let transactions = plaidResponse.data.transactions;
    console.log(`Found ${transactions.length} transactions from Plaid`);

    // Get existing transactions from Notion to check for duplicates
    const existingTransactionsResponse = await notion.databases.query({
      database_id: transactionsDbId,
      filter: {
        and: [
          {property: 'Date', date: {on_or_after: startDate}},
          {property: 'Date', date: {on_or_before: endDate}},
        ],
      },
    });

    // Create a set of existing transaction signatures for duplicate detection
    const existingSignatures = new Set();
    existingTransactionsResponse.results.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const date = page.properties.Date?.date?.start || '';
      const description = page.properties.Description?.title?.[0]?.plain_text || '';
      
      // Create signature: date + amount + first 20 chars of description
      const signature = `${date}_${amount}_${description.substring(0, 20)}`;
      existingSignatures.add(signature);
    });

    // Category mapping from Plaid categories to our 22 categories
    const categoryMapping = {
      'Food and Drink': 'Food & Groceries',
      'Shops': 'Shopping',
      'Transportation': 'Transportation',
      'Entertainment': 'Entertainment',
      'Recreation': 'Entertainment',
      'Gas Stations': 'Transportation',
      'Groceries': 'Food & Groceries',
      'Restaurants': 'Food & Groceries',
      'Healthcare': 'Healthcare',
      'Medical': 'Healthcare',
      'Education': 'Education',
      'Travel': 'Travel',
      'Hotels': 'Travel',
      'Airlines': 'Travel',
      'Personal Care': 'Personal Care',
      'General Merchandise': 'Shopping',
      'Clothing': 'Shopping',
      'Electronics': 'Shopping',
      'Home Improvement': 'Home & Utilities',
      'Utilities': 'Home & Utilities',
      'Insurance': 'Insurance',
      'Taxes': 'Taxes',
      'Investments': 'Investments',
      'Savings': 'Savings',
      'Debt Payment': 'Debt Payment',
      'Business Services': 'Business Expenses',
      'Software': 'Software & Subscriptions',
      'Subscriptions': 'Software & Subscriptions',
      'Family': 'Family',
      'Transfer': 'Transfer Fee',
      'Income': 'Income',
      'Other': 'Other',
      'Uncategorized': 'Uncategorized'
    };

    // Auto-assign person based on account
    const getPersonFromAccount = (accountId) => {
      if (accountId.includes('beth') || accountId.includes('personal')) return 'Beth';
      if (accountId.includes('bryan') || accountId.includes('business')) return 'Bryan';
      return 'Beth'; // Default
    };

    // Create Notion pages for each transaction
    const created = [];
    const skipped = [];
    const errors = [];

    for (const tx of transactions) {
      try {
        // Create signature for duplicate detection
        const signature = `${tx.date}_${Math.abs(tx.amount)}_${(tx.merchant_name || tx.name || '').substring(0, 20)}`;
        
        // Skip if duplicate
        if (existingSignatures.has(signature)) {
          skipped.push(tx.transaction_id);
          continue;
        }

        // Map Plaid transaction to Notion properties
        const isCredit = tx.amount < 0; // Plaid: negative = money in, positive = money out
        const plaidCategory = tx.category && tx.category[0] ? tx.category[0] : 'Uncategorized';
        const mappedCategory = categoryMapping[plaidCategory] || 'Uncategorized';

        // Detect if it's likely a subscription
        const subscriptionKeywords = ['netflix', 'spotify', 'amazon prime', 'adobe', 'microsoft', 'apple', 'google', 'dropbox', 'slack', 'zoom'];
        const isSubscription = subscriptionKeywords.some(keyword => 
          (tx.merchant_name || tx.name || '').toLowerCase().includes(keyword)
        );

        // Detect if it's likely a business expense
        const businessKeywords = ['office', 'business', 'corporate', 'work', 'professional'];
        const isBusiness = businessKeywords.some(keyword => 
          (tx.merchant_name || tx.name || '').toLowerCase().includes(keyword)
        );

        await notion.pages.create({
          parent: {database_id: transactionsDbId},
          properties: {
            Description: {
              title: [
                {
                  text: {
                    content: tx.merchant_name || tx.name || 'Untitled Transaction',
                  },
                },
              ],
            },
            Amount: {
              number: Math.abs(tx.amount),
            },
            Date: {
              date: {
                start: tx.date,
              },
            },
            Type: {
              select: {
                name: isCredit ? 'Credit' : 'Debit',
              },
            },
            Category: {
              select: {
                name: mappedCategory,
              },
            },
            Account: {
              select: {
                name: 'Plaid Import',
              },
            },
            Who: {
              select: {
                name: getPersonFromAccount(tx.account_id),
              },
            },
            Business: {
              checkbox: isBusiness,
            },
            Subscription: {
              checkbox: isSubscription,
            },
          },
        });

        created.push(tx.transaction_id);
      } catch (error) {
        console.error('Failed to create transaction:', tx.transaction_id, error.message);
        errors.push({
          transaction_id: tx.transaction_id,
          error: error.message,
        });
      }
    }

    const result = {
      success: true,
      created: created.length,
      skipped: skipped.length,
      errors: errors.length,
      period: {startDate, endDate},
      summary: {
        total: transactions.length,
        new: created.length,
        duplicates: skipped.length,
        failed: errors.length
      },
      timestamp: new Date().toISOString()
    };

    console.log('Automated sync completed:', result);

    // Send email summary if configured (optional)
    if (process.env.EMAIL_API_KEY && created.length > 0) {
      try {
        // You can implement email notifications here
        console.log(`Would send email summary: ${created.length} new transactions synced`);
      } catch (emailError) {
        console.error('Failed to send email summary:', emailError);
      }
    }

    return res.status(200).json(result);

  } catch (error) {
    console.error('Automated sync error:', error);
    return res.status(500).json({
      error: 'Automated sync failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
};
