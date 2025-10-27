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

    // Person analysis
    const people = {};
    const p2pTransfers = [];
    const sharedExpenses = [];

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

      // Initialize person if not exists
      if (!people[person]) {
        people[person] = {
          name: person,
          income: 0,
          expenses: 0,
          netProfit: 0,
          transactionCount: 0,
          monthlyData: {},
          categories: {},
          accounts: {},
          topMerchants: {},
          businessExpenses: 0,
          personalExpenses: 0,
          subscriptions: 0,
          averageTransactionSize: 0
        };
      }

      // Initialize monthly data
      if (!people[person].monthlyData[monthName]) {
        people[person].monthlyData[monthName] = {
          income: 0,
          expenses: 0,
          transactionCount: 0,
          netProfit: 0
        };
      }

      // Update totals
      if (isIncome) {
        people[person].income += absAmount;
        people[person].monthlyData[monthName].income += absAmount;
      } else {
        people[person].expenses += absAmount;
        people[person].monthlyData[monthName].expenses += absAmount;

        if (isBusiness) {
          people[person].businessExpenses += absAmount;
        } else {
          people[person].personalExpenses += absAmount;
        }

        // Track subscriptions
        if (category.toLowerCase().includes('subscription') || 
            merchant.toLowerCase().includes('subscription') ||
            merchant.toLowerCase().includes('prime') ||
            merchant.toLowerCase().includes('netflix') ||
            merchant.toLowerCase().includes('spotify')) {
          people[person].subscriptions += absAmount;
        }
      }

      people[person].transactionCount++;
      people[person].monthlyData[monthName].transactionCount++;

      // Track categories
      if (!people[person].categories[category]) {
        people[person].categories[category] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        people[person].categories[category].income += absAmount;
      } else {
        people[person].categories[category].expenses += absAmount;
      }
      people[person].categories[category].count++;

      // Track accounts
      if (!people[person].accounts[account]) {
        people[person].accounts[account] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        people[person].accounts[account].income += absAmount;
      } else {
        people[person].accounts[account].expenses += absAmount;
      }
      people[person].accounts[account].count++;

      // Track top merchants
      if (!people[person].topMerchants[merchant]) {
        people[person].topMerchants[merchant] = {amount: 0, count: 0};
      }
      people[person].topMerchants[merchant].amount += absAmount;
      people[person].topMerchants[merchant].count++;

      // Identify P2P transfers
      if (category.toLowerCase().includes('transfer') || 
          merchant.toLowerCase().includes('transfer') ||
          merchant.toLowerCase().includes('p2p') ||
          merchant.toLowerCase().includes('beth') ||
          merchant.toLowerCase().includes('bryan')) {
        
        p2pTransfers.push({
          from: isIncome ? 'other' : person,
          to: isIncome ? person : 'other',
          amount: absAmount,
          date,
          month: monthName,
          merchant,
          account
        });
      }

      // Identify shared expenses (same merchant, different people, similar amounts)
      if (!isIncome && merchant && merchant !== 'Unknown') {
        sharedExpenses.push({
          person,
          merchant,
          amount: absAmount,
          date,
          month: monthName,
          category,
          account
        });
      }
    });

    // Calculate derived metrics
    Object.values(people).forEach(person => {
      person.netProfit = person.income - person.expenses;
      person.averageTransactionSize = person.transactionCount > 0 ? 
        (person.income + person.expenses) / person.transactionCount : 0;
      
      // Calculate monthly net profits
      Object.keys(person.monthlyData).forEach(month => {
        person.monthlyData[month].netProfit = 
          person.monthlyData[month].income - person.monthlyData[month].expenses;
      });

      // Sort top merchants
      person.topMerchants = Object.entries(person.topMerchants)
        .sort(([_, a], [__, b]) => b.amount - a.amount)
        .slice(0, 10)
        .reduce((obj, [merchant, data]) => {
          obj[merchant] = data;
          return obj;
        }, {});
    });

    // Sort people by total activity
    const sortedPeople = Object.values(people)
      .sort((a, b) => (b.income + b.expenses) - (a.income + a.expenses));

    // Analyze P2P transfers
    const p2pAnalysis = analyzeP2PTransfers(p2pTransfers);

    // Analyze shared expenses
    const sharedExpenseAnalysis = analyzeSharedExpenses(sharedExpenses);

    // Generate insights
    const insights = {
      highestSpender: sortedPeople.reduce((highest, current) => 
        current.expenses > highest.expenses ? current : highest
      ),
      highestEarner: sortedPeople.reduce((highest, current) => 
        current.income > highest.income ? current : highest
      ),
      mostProfitable: sortedPeople.reduce((most, current) => 
        current.netProfit > most.netProfit ? current : most
      ),
      biggestSubscriptionSpender: sortedPeople.reduce((biggest, current) => 
        current.subscriptions > biggest.subscriptions ? current : biggest
      ),
      p2pAnalysis,
      sharedExpenseAnalysis
    };

    // Generate recommendations
    const recommendations = generatePersonRecommendations(sortedPeople, p2pAnalysis, sharedExpenseAnalysis);

    return res.status(200).json({
      summary: {
        totalPeople: sortedPeople.length,
        totalP2PTransfers: p2pTransfers.length,
        totalP2PAmount: p2pTransfers.reduce((sum, t) => sum + t.amount, 0),
        averagePersonSpending: sortedPeople.reduce((sum, p) => sum + p.expenses, 0) / sortedPeople.length
      },
      people: sortedPeople,
      p2pTransfers,
      sharedExpenses,
      insights,
      recommendations
    });

  } catch (error) {
    console.error('Person analysis error:', error);
    return res.status(500).json({
      error: 'Failed to generate person analysis',
      details: error.message,
    });
  }
};

function analyzeP2PTransfers(transfers) {
  const analysis = {
    totalTransfers: transfers.length,
    totalAmount: transfers.reduce((sum, t) => sum + t.amount, 0),
    byMonth: {},
    patterns: [],
    netFlow: {}
  };

  // Group by month
  transfers.forEach(transfer => {
    if (!analysis.byMonth[transfer.month]) {
      analysis.byMonth[transfer.month] = {count: 0, amount: 0};
    }
    analysis.byMonth[transfer.month].count++;
    analysis.byMonth[transfer.month].amount += transfer.amount;
  });

  // Calculate net flow between people
  transfers.forEach(transfer => {
    const key = `${transfer.from}-${transfer.to}`;
    if (!analysis.netFlow[key]) {
      analysis.netFlow[key] = {amount: 0, count: 0};
    }
    analysis.netFlow[key].amount += transfer.amount;
    analysis.netFlow[key].count++;
  });

  // Identify patterns
  const transferCounts = {};
  transfers.forEach(transfer => {
    const key = `${transfer.from}-${transfer.to}`;
    if (!transferCounts[key]) {
      transferCounts[key] = {from: transfer.from, to: transfer.to, count: 0, amount: 0};
    }
    transferCounts[key].count++;
    transferCounts[key].amount += transfer.amount;
  });

  analysis.patterns = Object.values(transferCounts)
    .filter(t => t.count > 3)
    .sort((a, b) => b.count - a.count);

  return analysis;
}

function analyzeSharedExpenses(expenses) {
  const analysis = {
    totalSharedExpenses: expenses.length,
    totalAmount: expenses.reduce((sum, e) => sum + e.amount, 0),
    byMerchant: {},
    byCategory: {},
    byMonth: {}
  };

  // Group by merchant
  expenses.forEach(expense => {
    if (!analysis.byMerchant[expense.merchant]) {
      analysis.byMerchant[expense.merchant] = {count: 0, amount: 0, people: new Set()};
    }
    analysis.byMerchant[expense.merchant].count++;
    analysis.byMerchant[expense.merchant].amount += expense.amount;
    analysis.byMerchant[expense.merchant].people.add(expense.person);
  });

  // Group by category
  expenses.forEach(expense => {
    if (!analysis.byCategory[expense.category]) {
      analysis.byCategory[expense.category] = {count: 0, amount: 0, people: new Set()};
    }
    analysis.byCategory[expense.category].count++;
    analysis.byCategory[expense.category].amount += expense.amount;
    analysis.byCategory[expense.category].people.add(expense.person);
  });

  // Group by month
  expenses.forEach(expense => {
    if (!analysis.byMonth[expense.month]) {
      analysis.byMonth[expense.month] = {count: 0, amount: 0};
    }
    analysis.byMonth[expense.month].count++;
    analysis.byMonth[expense.month].amount += expense.amount;
  });

  // Convert sets to arrays
  Object.values(analysis.byMerchant).forEach(merchant => {
    merchant.people = Array.from(merchant.people);
  });

  Object.values(analysis.byCategory).forEach(category => {
    category.people = Array.from(category.people);
  });

  return analysis;
}

function generatePersonRecommendations(people, p2pAnalysis, sharedExpenseAnalysis) {
  const recommendations = [];

  // Spending balance recommendations
  const totalExpenses = people.reduce((sum, p) => sum + p.expenses, 0);
  people.forEach(person => {
    const percentage = (person.expenses / totalExpenses) * 100;
    if (percentage > 60) {
      recommendations.push({
        person: person.name,
        type: 'spending_balance',
        message: `${person.name} accounts for ${percentage.toFixed(1)}% of total spending`,
        suggestion: 'Consider redistributing expenses or increasing income',
        priority: 'high'
      });
    }
  });

  // P2P transfer recommendations
  if (p2pAnalysis.totalAmount > 500) {
    recommendations.push({
      type: 'p2p_optimization',
      message: `High P2P transfer volume: $${p2pAnalysis.totalAmount.toFixed(2)}`,
      suggestion: 'Consider joint account for shared expenses to reduce transfer fees',
      priority: 'medium'
    });
  }

  // Subscription sharing recommendations
  people.forEach(person => {
    if (person.subscriptions > 100) {
      recommendations.push({
        person: person.name,
        type: 'subscription_sharing',
        message: `${person.name} spends $${person.subscriptions.toFixed(2)} on subscriptions`,
        suggestion: 'Consider sharing subscriptions or family plans',
        priority: 'medium'
      });
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = {high: 3, medium: 2, low: 1};
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}
