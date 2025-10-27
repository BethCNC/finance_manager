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
      {year: 2025, month: 7, name: "July 2025", days: 31},
      {year: 2025, month: 8, name: "August 2025", days: 31},
      {year: 2025, month: 9, name: "September 2025", days: 30}
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

    // Initialize monthly data structure
    const monthlyData = {};
    targetMonths.forEach(month => {
      monthlyData[month.name] = {
        month: month.name,
        year: month.year,
        monthNumber: month.month,
        days: month.days,
        transactions: [],
        income: 0,
        expenses: 0,
        netProfit: 0,
        transactionCount: 0,
        averageDailySpending: 0,
        categories: {},
        accounts: {},
        people: {},
        subscriptions: 0,
        businessExpenses: 0,
        personalExpenses: 0
      };
    });

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || 'Uncategorized';
      const person = page.properties.Who?.select?.name || 'Unknown';
      const account = page.properties.Account?.select?.name || 'Unknown';
      const date = page.properties.Date?.date?.start || '';
      const isSubscription = page.properties.Subscription?.checkbox || false;
      const isBusiness = page.properties.Business?.checkbox || false;

      if (!date) return;

      const dateObj = new Date(date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      // Check if this transaction falls within our target months
      const targetMonth = targetMonths.find(m => m.year === year && m.month === month);
      if (!targetMonth) return;

      const monthName = targetMonth.name;
      const monthData = monthlyData[monthName];
      
      const isIncome = type.toLowerCase() === 'credit';
      const absAmount = Math.abs(amount);

      // Add transaction to month
      monthData.transactions.push({
        id: page.id,
        amount: amount,
        type: isIncome ? 'income' : 'expense',
        category,
        person,
        account,
        date,
        isSubscription,
        isBusiness
      });

      monthData.transactionCount++;

      // Update totals
      if (isIncome) {
        monthData.income += absAmount;
      } else {
        monthData.expenses += absAmount;
        if (isSubscription) monthData.subscriptions += absAmount;
        if (isBusiness) {
          monthData.businessExpenses += absAmount;
        } else {
          monthData.personalExpenses += absAmount;
        }
      }

      // Update category breakdown
      if (!monthData.categories[category]) {
        monthData.categories[category] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        monthData.categories[category].income += absAmount;
      } else {
        monthData.categories[category].expenses += absAmount;
      }
      monthData.categories[category].count++;

      // Update account breakdown
      if (!monthData.accounts[account]) {
        monthData.accounts[account] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        monthData.accounts[account].income += absAmount;
      } else {
        monthData.accounts[account].expenses += absAmount;
      }
      monthData.accounts[account].count++;

      // Update person breakdown
      if (!monthData.people[person]) {
        monthData.people[person] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        monthData.people[person].income += absAmount;
      } else {
        monthData.people[person].expenses += absAmount;
      }
      monthData.people[person].count++;
    });

    // Calculate derived metrics
    Object.values(monthlyData).forEach(monthData => {
      monthData.netProfit = monthData.income - monthData.expenses;
      monthData.averageDailySpending = monthData.expenses / monthData.days;
    });

    // Calculate trends
    const months = Object.values(monthlyData).sort((a, b) => a.monthNumber - b.monthNumber);
    const trends = {
      income: calculateTrend(months.map(m => m.income)),
      expenses: calculateTrend(months.map(m => m.expenses)),
      netProfit: calculateTrend(months.map(m => m.netProfit)),
      transactionCount: calculateTrend(months.map(m => m.transactionCount)),
      averageDailySpending: calculateTrend(months.map(m => m.averageDailySpending))
    };

    // Calculate overall summary
    const summary = {
      totalIncome: months.reduce((sum, m) => sum + m.income, 0),
      totalExpenses: months.reduce((sum, m) => sum + m.expenses, 0),
      totalNetProfit: months.reduce((sum, m) => sum + m.netProfit, 0),
      totalTransactions: months.reduce((sum, m) => sum + m.transactionCount, 0),
      averageMonthlyIncome: months.reduce((sum, m) => sum + m.income, 0) / months.length,
      averageMonthlyExpenses: months.reduce((sum, m) => sum + m.expenses, 0) / months.length,
      averageMonthlyProfit: months.reduce((sum, m) => sum + m.netProfit, 0) / months.length,
      averageDailySpending: months.reduce((sum, m) => sum + m.averageDailySpending, 0) / months.length
    };

    // Top categories across all months
    const allCategories = {};
    months.forEach(monthData => {
      Object.entries(monthData.categories).forEach(([category, data]) => {
        if (!allCategories[category]) {
          allCategories[category] = {income: 0, expenses: 0, count: 0};
        }
        allCategories[category].income += data.income;
        allCategories[category].expenses += data.expenses;
        allCategories[category].count += data.count;
      });
    });

    const topCategories = Object.entries(allCategories)
      .filter(([_, data]) => data.expenses > 0)
      .sort(([_, a], [__, b]) => b.expenses - a.expenses)
      .slice(0, 10)
      .map(([category, data]) => ({
        category,
        totalExpenses: data.expenses,
        count: data.count,
        percentage: (data.expenses / summary.totalExpenses * 100).toFixed(2),
        monthlyAverage: data.expenses / months.length
      }));

    return res.status(200).json({
      summary,
      monthlyData: Object.values(monthlyData),
      trends,
      topCategories,
      insights: {
        bestMonth: months.reduce((best, current) => current.netProfit > best.netProfit ? current : best),
        worstMonth: months.reduce((worst, current) => current.netProfit < worst.netProfit ? current : worst),
        mostExpensiveMonth: months.reduce((most, current) => current.expenses > most.expenses ? current : most),
        highestIncomeMonth: months.reduce((highest, current) => current.income > highest.income ? current : highest)
      }
    });

  } catch (error) {
    console.error('Monthly comparison error:', error);
    return res.status(500).json({
      error: 'Failed to generate monthly comparison',
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
