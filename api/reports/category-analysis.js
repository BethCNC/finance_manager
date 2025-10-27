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

    // Initialize category analysis
    const categories = {};
    const monthlyCategoryData = {};
    const discretionaryCategories = new Set([
      'Entertainment', 'Dining Out', 'Shopping', 'Hobbies', 'Travel', 
      'Streaming', 'Subscriptions', 'Personal Care', 'Gifts'
    ]);
    const essentialCategories = new Set([
      'Groceries', 'Utilities', 'Rent/Mortgage', 'Insurance', 'Healthcare',
      'Transportation', 'Phone', 'Internet', 'Gas', 'Medical'
    ]);

    // Initialize monthly data structure
    targetMonths.forEach(month => {
      monthlyCategoryData[month.name] = {};
    });

    let totalIncome = 0;
    let totalExpenses = 0;
    let businessExpenses = 0;
    let personalExpenses = 0;
    let discretionaryExpenses = 0;
    let essentialExpenses = 0;

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || 'Uncategorized';
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

      // Initialize category if not exists
      if (!categories[category]) {
        categories[category] = {
          name: category,
          income: 0,
          expenses: 0,
          count: 0,
          monthlyData: {},
          isDiscretionary: discretionaryCategories.has(category),
          isEssential: essentialCategories.has(category),
          isBusiness: false,
          averageTransactionSize: 0,
          trend: 'stable'
        };
      }

      // Initialize monthly data for this category
      if (!categories[category].monthlyData[monthName]) {
        categories[category].monthlyData[monthName] = {
          income: 0,
          expenses: 0,
          count: 0
        };
      }

      if (!monthlyCategoryData[monthName][category]) {
        monthlyCategoryData[monthName][category] = {
          income: 0,
          expenses: 0,
          count: 0
        };
      }

      // Update totals
      if (isIncome) {
        categories[category].income += absAmount;
        categories[category].monthlyData[monthName].income += absAmount;
        monthlyCategoryData[monthName][category].income += absAmount;
        totalIncome += absAmount;
      } else {
        categories[category].expenses += absAmount;
        categories[category].monthlyData[monthName].expenses += absAmount;
        monthlyCategoryData[monthName][category].expenses += absAmount;
        totalExpenses += absAmount;

        if (isBusiness) {
          categories[category].isBusiness = true;
          businessExpenses += absAmount;
        } else {
          personalExpenses += absAmount;
        }

        if (categories[category].isDiscretionary) {
          discretionaryExpenses += absAmount;
        } else if (categories[category].isEssential) {
          essentialExpenses += absAmount;
        }
      }

      categories[category].count++;
      categories[category].monthlyData[monthName].count++;
      monthlyCategoryData[monthName][category].count++;
    });

    // Calculate derived metrics
    Object.values(categories).forEach(category => {
      category.netProfit = category.income - category.expenses;
      category.averageTransactionSize = category.count > 0 ? 
        (category.income + category.expenses) / category.count : 0;
      
      // Calculate trend
      const monthlyExpenses = Object.values(category.monthlyData).map(m => m.expenses);
      category.trend = calculateTrend(monthlyExpenses);
    });

    // Sort categories by expense amount
    const sortedCategories = Object.values(categories)
      .filter(cat => cat.expenses > 0)
      .sort((a, b) => b.expenses - a.expenses);

    // Top 10 expense categories
    const topExpenseCategories = sortedCategories.slice(0, 10).map(category => ({
      ...category,
      percentage: (category.expenses / totalExpenses * 100).toFixed(2),
      monthlyAverage: category.expenses / targetMonths.length
    }));

    // Category trends analysis
    const categoryTrends = sortedCategories.map(category => {
      const monthlyExpenses = Object.values(category.monthlyData).map(m => m.expenses);
      return {
        category: category.name,
        trend: calculateTrend(monthlyExpenses),
        monthlyBreakdown: Object.entries(category.monthlyData).map(([month, data]) => ({
          month,
          expenses: data.expenses,
          count: data.count
        }))
      };
    });

    // Spending breakdown analysis
    const spendingBreakdown = {
      discretionary: {
        amount: discretionaryExpenses,
        percentage: (discretionaryExpenses / totalExpenses * 100).toFixed(2),
        categories: sortedCategories.filter(cat => cat.isDiscretionary)
      },
      essential: {
        amount: essentialExpenses,
        percentage: (essentialExpenses / totalExpenses * 100).toFixed(2),
        categories: sortedCategories.filter(cat => cat.isEssential)
      },
      business: {
        amount: businessExpenses,
        percentage: (businessExpenses / totalExpenses * 100).toFixed(2),
        categories: sortedCategories.filter(cat => cat.isBusiness)
      },
      personal: {
        amount: personalExpenses,
        percentage: (personalExpenses / totalExpenses * 100).toFixed(2),
        categories: sortedCategories.filter(cat => !cat.isBusiness)
      }
    };

    // Cost-cutting opportunities
    const costCuttingOpportunities = sortedCategories
      .filter(cat => cat.isDiscretionary && cat.expenses > 100)
      .map(category => ({
        category: category.name,
        monthlySpending: category.expenses / targetMonths.length,
        potentialSavings: (category.expenses / targetMonths.length) * 0.3, // Assume 30% reduction
        reason: getCostCuttingReason(category.name),
        priority: getPriority(category.expenses)
      }))
      .sort((a, b) => b.potentialSavings - a.potentialSavings)
      .slice(0, 10);

    return res.status(200).json({
      summary: {
        totalIncome,
        totalExpenses,
        netProfit: totalIncome - totalExpenses,
        totalCategories: Object.keys(categories).length,
        averageMonthlyExpenses: totalExpenses / targetMonths.length
      },
      spendingBreakdown,
      topExpenseCategories,
      categoryTrends,
      costCuttingOpportunities,
      monthlyCategoryData,
      allCategories: sortedCategories
    });

  } catch (error) {
    console.error('Category analysis error:', error);
    return res.status(500).json({
      error: 'Failed to generate category analysis',
      details: error.message,
    });
  }
};

function calculateTrend(values) {
  if (values.length < 2) return {direction: 'stable', percentage: 0};
  
  const first = values[0];
  const last = values[values.length - 1];
  const percentage = first === 0 ? 0 : ((last - first) / first) * 100;
  
  let direction = 'stable';
  if (percentage > 5) direction = 'increasing';
  else if (percentage < -5) direction = 'decreasing';
  
  return {direction, percentage: Math.round(percentage * 100) / 100};
}

function getCostCuttingReason(categoryName) {
  const reasons = {
    'Entertainment': 'Consider free alternatives or reduce frequency',
    'Dining Out': 'Cook more meals at home, limit to special occasions',
    'Shopping': 'Implement 24-hour rule before purchases',
    'Streaming': 'Audit subscriptions, cancel unused services',
    'Subscriptions': 'Review all recurring charges monthly',
    'Personal Care': 'Look for sales, buy in bulk, or DIY alternatives',
    'Travel': 'Plan trips in advance, use travel rewards',
    'Hobbies': 'Set monthly hobby budget limits'
  };
  
  return reasons[categoryName] || 'Review spending patterns and set budget limits';
}

function getPriority(amount) {
  if (amount > 500) return 'high';
  if (amount > 200) return 'medium';
  return 'low';
}
