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

    // Sync to Notion (batch import)
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

      // Create Notion pages for each transaction
      const created = [];
      const errors = [];

      for (const tx of transactions) {
        try {
          // Map Plaid transaction to Notion properties
          const isCredit = tx.amount < 0; // Plaid: negative = money in, positive = money out

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
                  name: tx.category && tx.category[0] ? tx.category[0] : 'Uncategorized',
                },
              },
              // Optional: Add account info if you have an Account property
              // Account: {
              //   select: {
              //     name: 'Plaid Import',
              //   },
              // },
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
        errors: errors.length,
        errorDetails: errors,
        period: {startDate, endDate},
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
