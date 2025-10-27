const {Client} = require('@notionhq/client');

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const TRANSACTIONS_DB = process.env.Transactions_database_id || '82fc50e5b6b343a5a2ad1904f47404c0';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Define the 5 accounts we expect to see
    const expectedAccounts = [
      "SECU", // Beth's SECU
      "Apple Cash", // Beth's Apple Cash
      "Cash App", // Beth's Cash App
      "Bryan SECU", // Bryan's SECU
      "Bryan Cash App" // Bryan's Cash App
    ];

    // Define the 3 months we're analyzing
    const targetMonths = [
      {year: 2025, month: 7, name: "July 2025"},
      {year: 2025, month: 8, name: "August 2025"},
      {year: 2025, month: 9, name: "September 2025"}
    ];

    // Get ALL transactions for analysis
    let allTransactions = [];
    let hasMore = true;
    let startCursor = undefined;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: TRANSACTIONS_DB,
        start_cursor: startCursor,
        page_size: 100,
      });

      allTransactions = allTransactions.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor;
    }

    // Initialize verification structure
    const verification = {
      totalTransactions: allTransactions.length,
      accounts: {},
      months: {},
      dataQuality: {
        uncategorized: 0,
        missingMerchant: 0,
        missingPerson: 0,
        missingAccount: 0,
        missingDate: 0
      },
      summary: {
        totalIncome: 0,
        totalExpenses: 0,
        netProfit: 0
      }
    };

    // Initialize account structure
    expectedAccounts.forEach(account => {
      verification.accounts[account] = {
        exists: false,
        months: {},
        totalTransactions: 0,
        totalIncome: 0,
        totalExpenses: 0,
        netProfit: 0
      };
    });

    // Initialize month structure
    targetMonths.forEach(month => {
      verification.months[month.name] = {
        accounts: {},
        totalTransactions: 0,
        totalIncome: 0,
        totalExpenses: 0,
        netProfit: 0
      };
      
      expectedAccounts.forEach(account => {
        verification.months[month.name].accounts[account] = {
          transactions: 0,
          income: 0,
          expenses: 0,
          netProfit: 0
        };
      });
    });

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || '';
      const person = page.properties.Who?.select?.name || '';
      const account = page.properties.Account?.select?.name || '';
      const merchant = page.properties['Normalized Merchant']?.rich_text?.[0]?.plain_text || 
                      page.properties.Description?.title?.[0]?.plain_text || '';
      const date = page.properties.Date?.date?.start || '';

      // Data quality checks
      if (!category || category === 'Uncategorized') verification.dataQuality.uncategorized++;
      if (!merchant || merchant === 'Untitled') verification.dataQuality.missingMerchant++;
      if (!person) verification.dataQuality.missingPerson++;
      if (!account) verification.dataQuality.missingAccount++;
      if (!date) verification.dataQuality.missingDate++;

      // Determine if this is income or expense
      const isIncome = type.toLowerCase() === 'credit';
      const absAmount = Math.abs(amount);

      // Update summary totals
      if (isIncome) {
        verification.summary.totalIncome += absAmount;
      } else {
        verification.summary.totalExpenses += absAmount;
      }

      // Process by account
      if (account && verification.accounts[account]) {
        verification.accounts[account].exists = true;
        verification.accounts[account].totalTransactions++;
        
        if (isIncome) {
          verification.accounts[account].totalIncome += absAmount;
        } else {
          verification.accounts[account].totalExpenses += absAmount;
        }
      }

      // Process by month
      if (date) {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // JavaScript months are 0-based

        // Check if this transaction falls within our target months
        const targetMonth = targetMonths.find(m => m.year === year && m.month === month);
        if (targetMonth) {
          const monthName = targetMonth.name;
          verification.months[monthName].totalTransactions++;
          
          if (isIncome) {
            verification.months[monthName].totalIncome += absAmount;
          } else {
            verification.months[monthName].totalExpenses += absAmount;
          }

          // Update account-specific data for this month
          if (account && verification.months[monthName].accounts[account]) {
            verification.months[monthName].accounts[account].transactions++;
            
            if (isIncome) {
              verification.months[monthName].accounts[account].income += absAmount;
            } else {
              verification.months[monthName].accounts[account].expenses += absAmount;
            }
          }
        }
      }
    });

    // Calculate net profits
    verification.summary.netProfit = verification.summary.totalIncome - verification.summary.totalExpenses;

    Object.keys(verification.accounts).forEach(account => {
      verification.accounts[account].netProfit = 
        verification.accounts[account].totalIncome - verification.accounts[account].totalExpenses;
    });

    Object.keys(verification.months).forEach(month => {
      verification.months[month].netProfit = 
        verification.months[month].totalIncome - verification.months[month].totalExpenses;
      
      Object.keys(verification.months[month].accounts).forEach(account => {
        const accountData = verification.months[month].accounts[account];
        accountData.netProfit = accountData.income - accountData.expenses;
      });
    });

    // Generate verification status
    const missingAccounts = expectedAccounts.filter(account => !verification.accounts[account].exists);
    const emptyMonths = targetMonths.filter(month => verification.months[month.name].totalTransactions === 0);
    
    verification.status = {
      isComplete: missingAccounts.length === 0 && emptyMonths.length === 0,
      missingAccounts,
      emptyMonths,
      dataQualityScore: Math.round(
        ((allTransactions.length - verification.dataQuality.uncategorized - verification.dataQuality.missingMerchant) / allTransactions.length) * 100
      )
    };

    return res.status(200).json(verification);

  } catch (error) {
    console.error('Data verification error:', error);
    return res.status(500).json({
      error: 'Failed to verify data',
      details: error.message,
    });
  }
};
