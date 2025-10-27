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
    // Define target months (July, August, September 2025)
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

    // Account analysis
    const accounts = {};
    const transferPatterns = [];
    const feeAnalysis = {
      totalFees: 0,
      feeTransactions: [],
      accounts: {}
    };

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || 'Uncategorized';
      const merchant = page.properties['Normalized Merchant']?.rich_text?.[0]?.plain_text || 
                      page.properties.Description?.title?.[0]?.plain_text || '';
      const account = page.properties.Account?.select?.name || 'Unknown';
      const person = page.properties.Who?.select?.name || 'Unknown';
      const date = page.properties.Date?.date?.start || '';
      const isBusiness = page.properties.Business?.checkbox || false;

      if (!date) return;

      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      // Check if this transaction falls within our target months
      const targetMonth = targetMonths.find(m => m.year === year && m.month === month);
      if (!targetMonth) return;

      const monthName = targetMonth.name;
      const isIncome = type.toLowerCase() === 'credit';
      const absAmount = Math.abs(amount);

      // Initialize account if not exists
      if (!accounts[account]) {
        accounts[account] = {
          name: account,
          income: 0,
          expenses: 0,
          netProfit: 0,
          transactionCount: 0,
          monthlyData: {},
          categories: {},
          people: {},
          topMerchants: {},
          transferCount: 0,
          transferAmount: 0,
          feeCount: 0,
          feeAmount: 0,
          isBusiness: false,
          utilization: 'low'
        };
      }

      // Initialize monthly data
      if (!accounts[account].monthlyData[monthName]) {
        accounts[account].monthlyData[monthName] = {
          income: 0,
          expenses: 0,
          transactionCount: 0,
          netProfit: 0
        };
      }

      // Update totals
      if (isIncome) {
        accounts[account].income += absAmount;
        accounts[account].monthlyData[monthName].income += absAmount;
      } else {
        accounts[account].expenses += absAmount;
        accounts[account].monthlyData[monthName].expenses += absAmount;
      }

      accounts[account].transactionCount++;
      accounts[account].monthlyData[monthName].transactionCount++;

      if (isBusiness) {
        accounts[account].isBusiness = true;
      }

      // Track categories
      if (!accounts[account].categories[category]) {
        accounts[account].categories[category] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        accounts[account].categories[category].income += absAmount;
      } else {
        accounts[account].categories[category].expenses += absAmount;
      }
      accounts[account].categories[category].count++;

      // Track people
      if (!accounts[account].people[person]) {
        accounts[account].people[person] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        accounts[account].people[person].income += absAmount;
      } else {
        accounts[account].people[person].expenses += absAmount;
      }
      accounts[account].people[person].count++;

      // Track top merchants
      if (!accounts[account].topMerchants[merchant]) {
        accounts[account].topMerchants[merchant] = {amount: 0, count: 0};
      }
      accounts[account].topMerchants[merchant].amount += absAmount;
      accounts[account].topMerchants[merchant].count++;

      // Identify transfers and fees
      if (category.toLowerCase().includes('transfer') || 
          merchant.toLowerCase().includes('transfer') ||
          merchant.toLowerCase().includes('cash out') ||
          merchant.toLowerCase().includes('deposit')) {
        accounts[account].transferCount++;
        accounts[account].transferAmount += absAmount;
        
        transferPatterns.push({
          account,
          amount: absAmount,
          date,
          month: monthName,
          type: isIncome ? 'incoming' : 'outgoing',
          merchant
        });
      }

      if (category.toLowerCase().includes('fee') || 
          merchant.toLowerCase().includes('fee')) {
        accounts[account].feeCount++;
        accounts[account].feeAmount += absAmount;
        feeAnalysis.totalFees += absAmount;
        
        feeAnalysis.feeTransactions.push({
          account,
          amount: absAmount,
          date,
          month: monthName,
          merchant,
          category
        });

        if (!feeAnalysis.accounts[account]) {
          feeAnalysis.accounts[account] = {count: 0, amount: 0};
        }
        feeAnalysis.accounts[account].count++;
        feeAnalysis.accounts[account].amount += absAmount;
      }
    });

    // Calculate derived metrics
    Object.values(accounts).forEach(account => {
      account.netProfit = account.income - account.expenses;
      
      // Calculate monthly net profits
      Object.keys(account.monthlyData).forEach(month => {
        account.monthlyData[month].netProfit = 
          account.monthlyData[month].income - account.monthlyData[month].expenses;
      });

      // Determine utilization level
      const avgMonthlyActivity = account.transactionCount / targetMonths.length;
      if (avgMonthlyActivity > 50) account.utilization = 'high';
      else if (avgMonthlyActivity > 20) account.utilization = 'medium';
      else account.utilization = 'low';

      // Sort top merchants
      account.topMerchants = Object.entries(account.topMerchants)
        .sort(([_, a], [__, b]) => b.amount - a.amount)
        .slice(0, 10)
        .reduce((obj, [merchant, data]) => {
          obj[merchant] = data;
          return obj;
        }, {});
    });

    // Sort accounts by total activity
    const sortedAccounts = Object.values(accounts)
      .sort((a, b) => (b.income + b.expenses) - (a.income + a.expenses));

    // Account insights
    const insights = {
      mostActive: sortedAccounts[0],
      mostProfitable: sortedAccounts.reduce((most, current) => 
        current.netProfit > most.netProfit ? current : most
      ),
      highestFees: Object.entries(feeAnalysis.accounts)
        .sort(([_, a], [__, b]) => b.amount - a.amount)[0],
      transferAnalysis: analyzeTransferPatterns(transferPatterns),
      feeOptimization: generateFeeOptimizationRecommendations(feeAnalysis)
    };

    // Account health scores
    const accountHealth = sortedAccounts.map(account => ({
      account: account.name,
      score: calculateAccountHealthScore(account, feeAnalysis),
      utilization: account.utilization,
      netProfit: account.netProfit,
      feeEfficiency: account.feeAmount / (account.income + account.expenses) * 100
    }));

    return res.status(200).json({
      summary: {
        totalAccounts: sortedAccounts.length,
        totalFees: feeAnalysis.totalFees,
        totalTransfers: transferPatterns.length,
        averageAccountActivity: sortedAccounts.reduce((sum, acc) => sum + acc.transactionCount, 0) / sortedAccounts.length
      },
      accounts: sortedAccounts,
      transferPatterns,
      feeAnalysis,
      insights,
      accountHealth
    });

  } catch (error) {
    console.error('Account analysis error:', error);
    return res.status(500).json({
      error: 'Failed to generate account analysis',
      details: error.message,
    });
  }
};

function analyzeTransferPatterns(transfers) {
  const patterns = {
    totalTransfers: transfers.length,
    totalAmount: transfers.reduce((sum, t) => sum + t.amount, 0),
    byAccount: {},
    byMonth: {},
    frequentTransfers: []
  };

  // Group by account
  transfers.forEach(transfer => {
    if (!patterns.byAccount[transfer.account]) {
      patterns.byAccount[transfer.account] = {count: 0, amount: 0};
    }
    patterns.byAccount[transfer.account].count++;
    patterns.byAccount[transfer.account].amount += transfer.amount;
  });

  // Group by month
  transfers.forEach(transfer => {
    if (!patterns.byMonth[transfer.month]) {
      patterns.byMonth[transfer.month] = {count: 0, amount: 0};
    }
    patterns.byMonth[transfer.month].count++;
    patterns.byMonth[transfer.month].amount += transfer.amount;
  });

  // Find frequent transfer patterns
  const transferCounts = {};
  transfers.forEach(transfer => {
    const key = `${transfer.account}-${transfer.type}`;
    if (!transferCounts[key]) {
      transferCounts[key] = {account: transfer.account, type: transfer.type, count: 0, amount: 0};
    }
    transferCounts[key].count++;
    transferCounts[key].amount += transfer.amount;
  });

  patterns.frequentTransfers = Object.values(transferCounts)
    .filter(t => t.count > 5)
    .sort((a, b) => b.count - a.count);

  return patterns;
}

function generateFeeOptimizationRecommendations(feeAnalysis) {
  const recommendations = [];

  Object.entries(feeAnalysis.accounts).forEach(([account, data]) => {
    if (data.amount > 20) {
      recommendations.push({
        account,
        action: 'review',
        reason: `High fees: $${data.amount.toFixed(2)} (${data.count} transactions)`,
        potentialSavings: data.amount * 0.5,
        priority: 'high'
      });
    }
  });

  return recommendations.sort((a, b) => b.potentialSavings - a.potentialSavings);
}

function calculateAccountHealthScore(account, feeAnalysis) {
  let score = 100;

  // Deduct for high fees
  const feeRatio = account.feeAmount / (account.income + account.expenses);
  if (feeRatio > 0.05) score -= 20;
  else if (feeRatio > 0.02) score -= 10;

  // Deduct for low utilization
  if (account.utilization === 'low') score -= 15;
  else if (account.utilization === 'medium') score -= 5;

  // Deduct for negative net profit
  if (account.netProfit < 0) score -= 25;

  // Bonus for high activity
  if (account.transactionCount > 100) score += 10;

  return Math.max(0, Math.min(100, score));
}
