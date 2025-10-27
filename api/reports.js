// Consolidated reports API endpoint
export default async function handler(req, res) {
  const { method, query } = req;
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { type } = query;
  
  try {
    switch (type) {
      case 'by-account':
        return await handleByAccount(req, res);
      case 'by-person':
        return await handleByPerson(req, res);
      case 'category-analysis':
        return await handleCategoryAnalysis(req, res);
      case 'monthly-comparison':
        return await handleMonthlyComparison(req, res);
      case 'subscriptions':
        return await handleSubscriptions(req, res);
      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }
  } catch (error) {
    console.error('Reports API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// By Account Report
async function handleByAccount(req, res) {
  const mockData = {
    accounts: [
      { name: 'SECU Checking', balance: 2847.50, transactions: 45 },
      { name: 'Apple Cash', balance: 156.78, transactions: 23 },
      { name: 'Cash App', balance: 89.32, transactions: 12 }
    ],
    summary: {
      totalBalance: 3093.60,
      totalTransactions: 80,
      averagePerAccount: 26.67
    }
  };
  
  return res.status(200).json(mockData);
}

// By Person Report
async function handleByPerson(req, res) {
  const mockData = {
    people: [
      { name: 'Beth', transactions: 162, amount: 5123.45, percentage: 61.8 },
      { name: 'Bryan', transactions: 100, amount: 3111.05, percentage: 38.2 }
    ],
    summary: {
      totalTransactions: 262,
      totalAmount: 8234.50,
      averagePerPerson: 31.43
    }
  };
  
  return res.status(200).json(mockData);
}

// Category Analysis Report
async function handleCategoryAnalysis(req, res) {
  const mockData = {
    categories: [
      { name: 'Food & Dining', amount: 1234.50, percentage: 21.4, transactions: 56 },
      { name: 'Software & Subscriptions', amount: 1123.45, percentage: 16.0, transactions: 42 },
      { name: 'Transportation', amount: 987.65, percentage: 13.4, transactions: 34 },
      { name: 'Home & Utilities', amount: 876.54, percentage: 11.5, transactions: 28 },
      { name: 'Entertainment', amount: 765.43, percentage: 9.5, transactions: 22 }
    ],
    summary: {
      totalAmount: 8234.50,
      totalTransactions: 262,
      topCategory: 'Food & Dining'
    }
  };
  
  return res.status(200).json(mockData);
}

// Monthly Comparison Report
async function handleMonthlyComparison(req, res) {
  const mockData = {
    months: [
      { month: 'September 2024', income: 4500.00, expenses: 3200.50, net: 1299.50 },
      { month: 'October 2024', income: 4500.00, expenses: 3500.25, net: 999.75 },
      { month: 'November 2024', income: 4500.00, expenses: 2800.75, net: 1699.25 }
    ],
    summary: {
      averageIncome: 4500.00,
      averageExpenses: 3167.17,
      averageNet: 1332.83,
      trend: 'improving'
    }
  };
  
  return res.status(200).json(mockData);
}

// Subscriptions Report
async function handleSubscriptions(req, res) {
  const mockData = {
    subscriptions: [
      { name: 'Netflix', amount: 15.99, frequency: 'monthly', status: 'active' },
      { name: 'Adobe Creative Cloud', amount: 52.99, frequency: 'monthly', status: 'active' },
      { name: 'Notion AI', amount: 8.00, frequency: 'monthly', status: 'active' },
      { name: 'Cursor Pro', amount: 20.00, frequency: 'monthly', status: 'active' },
      { name: 'ChatGPT Plus', amount: 20.00, frequency: 'monthly', status: 'active' }
    ],
    summary: {
      totalMonthly: 116.98,
      totalYearly: 1403.76,
      activeCount: 5,
      potentialSavings: 240.00
    }
  };
  
  return res.status(200).json(mockData);
}
