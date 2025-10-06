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
    // Get ALL transactions for complete analysis
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

    // Analysis containers
    const categories = new Set();
    const accounts = new Set();
    const people = new Set();
    const months = new Set();
    const years = new Set();
    const sources = new Set();

    const categoryTotals = {};
    const personTotals = {};
    const accountTotals = {};
    const monthlyTotals = {};
    const yearlyTotals = {};

    let totalIncome = 0;
    let totalExpenses = 0;
    let businessExpenses = 0;
    let personalExpenses = 0;
    let subscriptionExpenses = 0;

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || 'Uncategorized';
      const person = page.properties.Who?.select?.name || 'Unknown';
      const account = page.properties.Account?.select?.name || 'Unknown';
      const source = page.properties['Source Doc']?.select?.name || 'Unknown';
      const date = page.properties.Date?.date?.start || '';
      const isBusiness = page.properties.Business?.checkbox || false;
      const isSubscription = page.properties.Subscription?.checkbox || false;

      // Add to sets
      if (category) categories.add(category);
      if (account) accounts.add(account);
      if (person) people.add(person);
      if (source) sources.add(source);

      // Extract month and year
      if (date) {
        const dateObj = new Date(date);
        const monthYear = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        const year = String(dateObj.getFullYear());
        months.add(monthYear);
        years.add(year);

        // Monthly totals
        if (!monthlyTotals[monthYear]) {
          monthlyTotals[monthYear] = {income: 0, expenses: 0, profit: 0, count: 0};
        }

        // Yearly totals
        if (!yearlyTotals[year]) {
          yearlyTotals[year] = {income: 0, expenses: 0, profit: 0, count: 0};
        }
      }

      const absAmount = Math.abs(amount);
      const isIncome = type.toLowerCase() === 'credit';

      // Overall totals
      if (isIncome) {
        totalIncome += absAmount;
      } else {
        totalExpenses += absAmount;
        if (isBusiness) businessExpenses += absAmount;
        else personalExpenses += absAmount;
        if (isSubscription) subscriptionExpenses += absAmount;
      }

      // Category totals
      if (!categoryTotals[category]) {
        categoryTotals[category] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        categoryTotals[category].income += absAmount;
      } else {
        categoryTotals[category].expenses += absAmount;
      }
      categoryTotals[category].count++;

      // Person totals
      if (!personTotals[person]) {
        personTotals[person] = {income: 0, expenses: 0, count: 0};
      }
      if (isIncome) {
        personTotals[person].income += absAmount;
      } else {
        personTotals[person].expenses += absAmount;
      }
      personTotals[person].count++;

      // Account totals
      if (!accountTotals[account]) {
        accountTotals[account] = {income: 0, expenses: 0, balance: 0, count: 0};
      }
      if (isIncome) {
        accountTotals[account].income += absAmount;
        accountTotals[account].balance += absAmount;
      } else {
        accountTotals[account].expenses += absAmount;
        accountTotals[account].balance -= absAmount;
      }
      accountTotals[account].count++;

      // Monthly totals
      if (date) {
        const dateObj = new Date(date);
        const monthYear = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
        const year = String(dateObj.getFullYear());

        if (isIncome) {
          monthlyTotals[monthYear].income += absAmount;
          yearlyTotals[year].income += absAmount;
        } else {
          monthlyTotals[monthYear].expenses += absAmount;
          yearlyTotals[year].expenses += absAmount;
        }
        monthlyTotals[monthYear].count++;
        yearlyTotals[year].count++;
      }
    });

    // Calculate profits
    Object.keys(monthlyTotals).forEach((month) => {
      monthlyTotals[month].profit = monthlyTotals[month].income - monthlyTotals[month].expenses;
    });

    Object.keys(yearlyTotals).forEach((year) => {
      yearlyTotals[year].profit = yearlyTotals[year].income - yearlyTotals[year].expenses;
    });

    // Sort and rank categories by spending
    const topExpenseCategories = Object.entries(categoryTotals)
      .filter(([_, data]) => data.expenses > 0)
      .sort(([_, a], [__, b]) => b.expenses - a.expenses)
      .slice(0, 10)
      .map(([category, data]) => ({
        category,
        amount: data.expenses,
        count: data.count,
        percentage: (data.expenses / totalExpenses * 100).toFixed(2),
      }));

    // Sort monthly data
    const monthlyData = Object.entries(monthlyTotals)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, data]) => ({month, ...data}));

    return res.status(200).json({
      summary: {
        totalTransactions: allTransactions.length,
        totalIncome,
        totalExpenses,
        profit: totalIncome - totalExpenses,
        businessExpenses,
        personalExpenses,
        subscriptionExpenses,
      },
      dimensions: {
        categories: Array.from(categories).sort(),
        accounts: Array.from(accounts).sort(),
        people: Array.from(people).sort(),
        months: Array.from(months).sort(),
        years: Array.from(years).sort(),
        sources: Array.from(sources).sort(),
      },
      breakdowns: {
        byCategory: categoryTotals,
        byPerson: personTotals,
        byAccount: accountTotals,
        byMonth: monthlyTotals,
        byYear: yearlyTotals,
      },
      insights: {
        topExpenseCategories,
        monthlyTrend: monthlyData,
        averageMonthlyIncome: totalIncome / Object.keys(monthlyTotals).length,
        averageMonthlyExpenses: totalExpenses / Object.keys(monthlyTotals).length,
      },
    });
  } catch (error) {
    console.error('Analysis error:', error);
    return res.status(500).json({
      error: 'Failed to analyze data',
      details: error.message,
    });
  }
};
