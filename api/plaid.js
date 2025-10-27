const {Configuration, PlaidApi, PlaidEnvironments} = require('plaid');

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

  const {action} = req.query;

  try {
    // Create Link Token (for Plaid Link UI)
    if (action === 'create_link_token') {
      const request = {
        user: {
          client_user_id: 'user-' + Date.now(),
        },
        client_name: 'Finance Manager',
        products: ['transactions'],
        country_codes: ['US'],
        language: 'en',
      };

      const response = await plaidClient.linkTokenCreate(request);
      return res.status(200).json({
        link_token: response.data.link_token,
        expiration: response.data.expiration,
      });
    }

    // Exchange Public Token for Access Token
    if (action === 'exchange_public_token') {
      const {public_token} = req.body;

      if (!public_token) {
        return res.status(400).json({error: 'public_token required'});
      }

      const response = await plaidClient.itemPublicTokenExchange({
        public_token,
      });

      const accessToken = response.data.access_token;
      const itemId = response.data.item_id;

      // Get institution info
      const itemResponse = await plaidClient.itemGet({
        access_token: accessToken,
      });

      const institutionId = itemResponse.data.item.institution_id;

      return res.status(200).json({
        access_token: accessToken,
        item_id: itemId,
        institution_id: institutionId,
        message: 'Connected successfully! Save this access_token to your .env as PLAID_ACCESS_TOKEN',
      });
    }

    // Get Accounts
    if (action === 'accounts') {
      const accessToken = process.env.PLAID_ACCESS_TOKEN;

      if (!accessToken) {
        return res.status(400).json({error: 'PLAID_ACCESS_TOKEN not set in environment'});
      }

      const response = await plaidClient.accountsGet({
        access_token: accessToken,
      });

      const accounts = response.data.accounts.map((account) => ({
        id: account.account_id,
        name: account.name,
        mask: account.mask,
        type: account.type,
        subtype: account.subtype,
        balance: {
          current: account.balances.current,
          available: account.balances.available,
          limit: account.balances.limit,
        },
      }));

      return res.status(200).json({accounts});
    }

    // Get Transactions
    if (action === 'transactions') {
      const accessToken = process.env.PLAID_ACCESS_TOKEN;

      if (!accessToken) {
        return res.status(400).json({error: 'PLAID_ACCESS_TOKEN not set in environment'});
      }

      const {start_date, end_date} = req.query;

      // Default to last 30 days if not provided
      const endDate = end_date || new Date().toISOString().split('T')[0];
      const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const request = {
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        options: {
          count: 500,
          offset: 0,
        },
      };

      const response = await plaidClient.transactionsGet(request);
      let transactions = response.data.transactions;

      // Handle pagination if more than 500 transactions
      const totalTransactions = response.data.total_transactions;
      while (transactions.length < totalTransactions) {
        const paginatedRequest = {
          access_token: accessToken,
          start_date: startDate,
          end_date: endDate,
          options: {
            count: 500,
            offset: transactions.length,
          },
        };

        const paginatedResponse = await plaidClient.transactionsGet(paginatedRequest);
        transactions = transactions.concat(paginatedResponse.data.transactions);
      }

      // Format transactions for frontend
      const formattedTransactions = transactions.map((tx) => ({
        id: tx.transaction_id,
        accountId: tx.account_id,
        amount: tx.amount, // Positive = money out, negative = money in (Plaid convention)
        date: tx.date,
        name: tx.name,
        merchantName: tx.merchant_name,
        category: tx.category ? tx.category[0] : 'Uncategorized',
        subcategory: tx.category && tx.category.length > 1 ? tx.category[1] : null,
        pending: tx.pending,
        paymentChannel: tx.payment_channel,
        personalFinanceCategory: tx.personal_finance_category,
      }));

      return res.status(200).json({
        transactions: formattedTransactions,
        accounts: response.data.accounts,
        totalCount: totalTransactions,
      });
    }

    // Sync to Notion (batch import with duplicate detection and category mapping)
    if (action === 'sync_to_notion') {
      const {Client} = require('@notionhq/client');
      const notion = new Client({auth: process.env.NOTION_API_KEY});

      const accessToken = process.env.PLAID_ACCESS_TOKEN;
      const transactionsDbId = process.env.Transactions_database_id || '82fc50e5b6b343a5a2ad1904f47404c0';

      if (!accessToken) {
        return res.status(400).json({error: 'PLAID_ACCESS_TOKEN not set'});
      }

      const {start_date, end_date, account_filter} = req.body;

      const endDate = end_date || new Date().toISOString().split('T')[0];
      const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      // Fetch transactions from Plaid
      const plaidResponse = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
        options: {count: 500, offset: 0},
      });

      let transactions = plaidResponse.data.transactions;

      // Filter by account if specified
      if (account_filter) {
        transactions = transactions.filter((tx) => tx.account_id === account_filter);
      }

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

      // Auto-assign person based on account (you can customize this logic)
      const getPersonFromAccount = (accountId) => {
        // This is a simple mapping - you can enhance this based on your account setup
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

      return res.status(200).json({
        success: true,
        created: created.length,
        skipped: skipped.length,
        errors: errors.length,
        errorDetails: errors,
        period: {startDate, endDate},
        summary: {
          total: transactions.length,
          new: created.length,
          duplicates: skipped.length,
          failed: errors.length
        }
      });
    }

    return res.status(400).json({
      error: 'Invalid action parameter',
      validActions: ['create_link_token', 'exchange_public_token', 'accounts', 'transactions', 'sync_to_notion'],
    });
  } catch (error) {
    console.error('Plaid API error:', error);
    return res.status(500).json({
      error: 'Plaid API request failed',
      message: error.message,
      details: error.response?.data || null,
    });
  }
};

