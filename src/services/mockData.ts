// Mock data service for local development
// This provides realistic data when API routes aren't available locally

export const mockData = {
  verification: {
    totalTransactions: 1247,
    accounts: {
      "SECU": {
        exists: true,
        totalTransactions: 156,
        totalIncome: 8500,
        totalExpenses: 4200,
        netProfit: 4300
      },
      "Apple Cash": {
        exists: true,
        totalTransactions: 89,
        totalIncome: 1200,
        totalExpenses: 1800,
        netProfit: -600
      },
      "Cash App": {
        exists: true,
        totalTransactions: 892,
        totalIncome: 2100,
        totalExpenses: 3200,
        netProfit: -1100
      },
      "Bryan SECU": {
        exists: true,
        totalTransactions: 78,
        totalIncome: 6200,
        totalExpenses: 2800,
        netProfit: 3400
      },
      "Bryan Cash App": {
        exists: true,
        totalTransactions: 32,
        totalIncome: 800,
        totalExpenses: 1200,
        netProfit: -400
      }
    },
    months: {
      "July 2025": {
        totalTransactions: 412,
        totalIncome: 5200,
        totalExpenses: 4800,
        netProfit: 400,
        accounts: {
          "SECU": { transactions: 52, income: 2800, expenses: 1400, netProfit: 1400 },
          "Apple Cash": { transactions: 28, income: 400, expenses: 600, netProfit: -200 },
          "Cash App": { transactions: 298, income: 700, expenses: 1100, netProfit: -400 },
          "Bryan SECU": { transactions: 26, income: 2100, expenses: 900, netProfit: 1200 },
          "Bryan Cash App": { transactions: 8, income: 200, expenses: 400, netProfit: -200 }
        }
      },
      "August 2025": {
        totalTransactions: 398,
        totalIncome: 5100,
        totalExpenses: 5200,
        netProfit: -100,
        accounts: {
          "SECU": { transactions: 48, income: 2700, expenses: 1500, netProfit: 1200 },
          "Apple Cash": { transactions: 31, income: 400, expenses: 650, netProfit: -250 },
          "Cash App": { transactions: 285, income: 650, expenses: 1200, netProfit: -550 },
          "Bryan SECU": { transactions: 24, income: 2000, expenses: 850, netProfit: 1150 },
          "Bryan Cash App": { transactions: 10, income: 250, expenses: 300, netProfit: -50 }
        }
      },
      "September 2025": {
        totalTransactions: 437,
        totalIncome: 5400,
        totalExpenses: 5100,
        netProfit: 300,
        accounts: {
          "SECU": { transactions: 56, income: 3000, expenses: 1300, netProfit: 1700 },
          "Apple Cash": { transactions: 30, income: 400, expenses: 550, netProfit: -150 },
          "Cash App": { transactions: 309, income: 750, expenses: 900, netProfit: -150 },
          "Bryan SECU": { transactions: 28, income: 2100, expenses: 1050, netProfit: 1050 },
          "Bryan Cash App": { transactions: 14, income: 350, expenses: 500, netProfit: -150 }
        }
      }
    },
    dataQuality: {
      uncategorized: 23,
      missingMerchant: 45,
      missingPerson: 12,
      missingAccount: 8,
      missingDate: 3
    },
    summary: {
      totalIncome: 15700,
      totalExpenses: 15100,
      netProfit: 600
    },
    status: {
      isComplete: true,
      missingAccounts: [],
      emptyMonths: [],
      dataQualityScore: 87
    }
  },

  monthlyComparison: {
    summary: {
      totalIncome: 15700,
      totalExpenses: 15100,
      totalNetProfit: 600,
      totalTransactions: 1247,
      averageMonthlyIncome: 5233,
      averageMonthlyExpenses: 5033,
      averageMonthlyProfit: 200,
      averageDailySpending: 162
    },
    monthlyData: [
      {
        month: "July 2025",
        year: 2025,
        monthNumber: 7,
        days: 31,
        income: 5200,
        expenses: 4800,
        netProfit: 400,
        transactionCount: 412,
        averageDailySpending: 155
      },
      {
        month: "August 2025",
        year: 2025,
        monthNumber: 8,
        days: 31,
        income: 5100,
        expenses: 5200,
        netProfit: -100,
        transactionCount: 398,
        averageDailySpending: 168
      },
      {
        month: "September 2025",
        year: 2025,
        monthNumber: 9,
        days: 30,
        income: 5400,
        expenses: 5100,
        netProfit: 300,
        transactionCount: 437,
        averageDailySpending: 170
      }
    ],
    trends: {
      income: { direction: 'increasing', percentage: 3.8 },
      expenses: { direction: 'increasing', percentage: 6.3 },
      netProfit: { direction: 'decreasing', percentage: -25.0 },
      transactionCount: { direction: 'increasing', percentage: 6.1 },
      averageDailySpending: { direction: 'increasing', percentage: 9.7 }
    },
    topCategories: [
      { category: 'Groceries', totalExpenses: 2400, count: 89, percentage: '15.9', monthlyAverage: 800 },
      { category: 'Dining Out', totalExpenses: 1800, count: 67, percentage: '11.9', monthlyAverage: 600 },
      { category: 'Entertainment', totalExpenses: 1200, count: 45, percentage: '7.9', monthlyAverage: 400 },
      { category: 'Transportation', totalExpenses: 1100, count: 34, percentage: '7.3', monthlyAverage: 367 },
      { category: 'Shopping', totalExpenses: 950, count: 28, percentage: '6.3', monthlyAverage: 317 },
      { category: 'Subscriptions', totalExpenses: 850, count: 23, percentage: '5.6', monthlyAverage: 283 },
      { category: 'Healthcare', totalExpenses: 750, count: 19, percentage: '5.0', monthlyAverage: 250 },
      { category: 'Utilities', totalExpenses: 650, count: 15, percentage: '4.3', monthlyAverage: 217 },
      { category: 'Personal Care', totalExpenses: 580, count: 22, percentage: '3.8', monthlyAverage: 193 },
      { category: 'Insurance', totalExpenses: 520, count: 8, percentage: '3.4', monthlyAverage: 173 }
    ],
    insights: {
      bestMonth: { month: "July 2025", netProfit: 400 },
      worstMonth: { month: "August 2025", netProfit: -100 },
      mostExpensiveMonth: { month: "August 2025", expenses: 5200 },
      highestIncomeMonth: { month: "September 2025", income: 5400 }
    }
  },

  categoryAnalysis: {
    summary: {
      totalIncome: 15700,
      totalExpenses: 15100,
      netProfit: 600,
      totalCategories: 15,
      averageMonthlyExpenses: 5033
    },
    spendingBreakdown: {
      discretionary: {
        amount: 6800,
        percentage: '45.0',
        categories: []
      },
      essential: {
        amount: 8300,
        percentage: '55.0',
        categories: []
      },
      business: {
        amount: 2100,
        percentage: '13.9',
        categories: []
      },
      personal: {
        amount: 13000,
        percentage: '86.1',
        categories: []
      }
    },
    topExpenseCategories: [
      { category: 'Groceries', totalExpenses: 2400, count: 89, percentage: '15.9', monthlyAverage: 800 },
      { category: 'Dining Out', totalExpenses: 1800, count: 67, percentage: '11.9', monthlyAverage: 600 },
      { category: 'Entertainment', totalExpenses: 1200, count: 45, percentage: '7.9', monthlyAverage: 400 },
      { category: 'Transportation', totalExpenses: 1100, count: 34, percentage: '7.3', monthlyAverage: 367 },
      { category: 'Shopping', totalExpenses: 950, count: 28, percentage: '6.3', monthlyAverage: 317 },
      { category: 'Subscriptions', totalExpenses: 850, count: 23, percentage: '5.6', monthlyAverage: 283 },
      { category: 'Healthcare', totalExpenses: 750, count: 19, percentage: '5.0', monthlyAverage: 250 },
      { category: 'Utilities', totalExpenses: 650, count: 15, percentage: '4.3', monthlyAverage: 217 },
      { category: 'Personal Care', totalExpenses: 580, count: 22, percentage: '3.8', monthlyAverage: 193 },
      { category: 'Insurance', totalExpenses: 520, count: 8, percentage: '3.4', monthlyAverage: 173 }
    ],
    costCuttingOpportunities: [
      { category: 'Dining Out', monthlySpending: 600, potentialSavings: 180, reason: 'Cook more meals at home, limit to special occasions', priority: 'high' },
      { category: 'Entertainment', monthlySpending: 400, potentialSavings: 120, reason: 'Consider free alternatives or reduce frequency', priority: 'high' },
      { category: 'Shopping', monthlySpending: 317, potentialSavings: 95, reason: 'Implement 24-hour rule before purchases', priority: 'medium' },
      { category: 'Subscriptions', monthlySpending: 283, potentialSavings: 85, reason: 'Audit subscriptions, cancel unused services', priority: 'high' },
      { category: 'Personal Care', monthlySpending: 193, potentialSavings: 58, reason: 'Look for sales, buy in bulk, or DIY alternatives', priority: 'low' }
    ],
    categoryTrends: [
      { category: 'Groceries', trend: { direction: 'increasing', percentage: 8.2 } },
      { category: 'Dining Out', trend: { direction: 'increasing', percentage: 12.5 } },
      { category: 'Entertainment', trend: { direction: 'stable', percentage: 2.1 } },
      { category: 'Transportation', trend: { direction: 'decreasing', percentage: -5.3 } },
      { category: 'Shopping', trend: { direction: 'increasing', percentage: 15.8 } }
    ]
  },

  subscriptionAnalysis: {
    summary: {
      totalSubscriptions: 8,
      totalMonthlyCost: 283,
      totalFailedPayments: 12,
      averageSubscriptionCost: 35.4
    },
    subscriptions: [
      { name: 'Amazon Prime', monthlyAmount: 15, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'Netflix', monthlyAmount: 16, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'Spotify', monthlyAmount: 10, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'Adobe Creative Cloud', monthlyAmount: 53, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'Notion Pro', monthlyAmount: 8, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'ChatGPT Plus', monthlyAmount: 20, frequency: 'monthly', status: 'active', failedPayments: 0, count: 3 },
      { name: 'Uber One', monthlyAmount: 10, frequency: 'monthly', status: 'failed', failedPayments: 3, count: 0 },
      { name: 'Stamps.com', monthlyAmount: 18, frequency: 'monthly', status: 'failed', failedPayments: 9, count: 0 }
    ],
    subscriptionCategories: {
      streaming: [
        { name: 'Amazon Prime', monthlyAmount: 15, frequency: 'monthly', status: 'active', failedPayments: 0 },
        { name: 'Netflix', monthlyAmount: 16, frequency: 'monthly', status: 'active', failedPayments: 0 },
        { name: 'Spotify', monthlyAmount: 10, frequency: 'monthly', status: 'active', failedPayments: 0 }
      ],
      software: [
        { name: 'Adobe Creative Cloud', monthlyAmount: 53, frequency: 'monthly', status: 'active', failedPayments: 0 },
        { name: 'Notion Pro', monthlyAmount: 8, frequency: 'monthly', status: 'active', failedPayments: 0 },
        { name: 'ChatGPT Plus', monthlyAmount: 20, frequency: 'monthly', status: 'active', failedPayments: 0 }
      ],
      services: [
        { name: 'Uber One', monthlyAmount: 10, frequency: 'monthly', status: 'failed', failedPayments: 3 },
        { name: 'Stamps.com', monthlyAmount: 18, frequency: 'monthly', status: 'failed', failedPayments: 9 }
      ]
    },
    failedPayments: [
      { merchant: 'Uber One', amount: 10, date: '2025-09-15', month: 'September 2025' },
      { merchant: 'Uber One', amount: 10, date: '2025-08-15', month: 'August 2025' },
      { merchant: 'Uber One', amount: 10, date: '2025-07-15', month: 'July 2025' },
      { merchant: 'Stamps.com', amount: 18, date: '2025-09-01', month: 'September 2025' },
      { merchant: 'Stamps.com', amount: 18, date: '2025-08-01', month: 'August 2025' },
      { merchant: 'Stamps.com', amount: 18, date: '2025-07-01', month: 'July 2025' }
    ],
    recommendations: [
      { subscription: 'Uber One', action: 'cancel', reason: '3 failed payments - likely unused', monthlySavings: 10, priority: 'high' },
      { subscription: 'Stamps.com', action: 'cancel', reason: '9 failed payments - likely unused', monthlySavings: 18, priority: 'high' },
      { subscription: 'Adobe Creative Cloud', action: 'negotiate', reason: 'Contact for business discount', monthlySavings: 8, priority: 'medium' },
      { subscription: 'Amazon Prime', action: 'downgrade', reason: 'Consider annual plan for savings', monthlySavings: 3, priority: 'medium' }
    ],
    potentialSavings: {
      cancelUnused: 28,
      downgrade: 3,
      negotiate: 8,
      total: 39
    }
  },

  accountAnalysis: {
    summary: {
      totalAccounts: 5,
      totalFees: 45,
      totalTransfers: 67,
      averageAccountActivity: 249
    },
    accounts: [
      { name: 'Cash App', income: 2100, expenses: 3200, netProfit: -1100, transactionCount: 892, utilization: 'high' },
      { name: 'SECU', income: 8500, expenses: 4200, netProfit: 4300, transactionCount: 156, utilization: 'medium' },
      { name: 'Bryan SECU', income: 6200, expenses: 2800, netProfit: 3400, transactionCount: 78, utilization: 'low' },
      { name: 'Apple Cash', income: 1200, expenses: 1800, netProfit: -600, transactionCount: 89, utilization: 'low' },
      { name: 'Bryan Cash App', income: 800, expenses: 1200, netProfit: -400, transactionCount: 32, utilization: 'low' }
    ],
    transferPatterns: [
      { account: 'Cash App', amount: 150, date: '2025-09-20', month: 'September 2025', type: 'outgoing', merchant: 'Transfer to Bryan' },
      { account: 'Cash App', amount: 150, date: '2025-08-20', month: 'August 2025', type: 'outgoing', merchant: 'Transfer to Bryan' },
      { account: 'Cash App', amount: 150, date: '2025-07-20', month: 'July 2025', type: 'outgoing', merchant: 'Transfer to Bryan' }
    ],
    feeAnalysis: {
      totalFees: 45,
      feeTransactions: [
        { account: 'Cash App', amount: 2.50, date: '2025-09-15', month: 'September 2025', merchant: 'Cash Out Fee', category: 'Fees' },
        { account: 'Cash App', amount: 2.50, date: '2025-08-15', month: 'August 2025', merchant: 'Cash Out Fee', category: 'Fees' },
        { account: 'Cash App', amount: 2.50, date: '2025-07-15', month: 'July 2025', merchant: 'Cash Out Fee', category: 'Fees' }
      ],
      accounts: {
        'Cash App': { count: 15, amount: 37.50 },
        'Apple Cash': { count: 3, amount: 7.50 }
      }
    },
    insights: {
      mostActive: { name: 'Cash App', transactionCount: 892 },
      mostProfitable: { name: 'SECU', netProfit: 4300 },
      highestFees: ['Cash App', { count: 15, amount: 37.50 }],
      transferAnalysis: { totalTransfers: 67, totalAmount: 4500 },
      feeOptimization: [
        { account: 'Cash App', action: 'review', reason: 'High fees: $37.50 (15 transactions)', potentialSavings: 18.75, priority: 'high' }
      ]
    }
  },

  personAnalysis: {
    summary: {
      totalPeople: 2,
      totalP2PTransfers: 67,
      totalP2PAmount: 4500,
      averagePersonSpending: 7550
    },
    people: [
      { name: 'Beth', income: 11800, expenses: 9200, netProfit: 2600, transactionCount: 1137, subscriptions: 180, businessExpenses: 1200, personalExpenses: 8000 },
      { name: 'Bryan', income: 7000, expenses: 4000, netProfit: 3000, transactionCount: 110, subscriptions: 103, businessExpenses: 900, personalExpenses: 3100 }
    ],
    p2pTransfers: [
      { from: 'Beth', to: 'Bryan', amount: 150, date: '2025-09-20', month: 'September 2025', merchant: 'drugs', account: 'Cash App' },
      { from: 'Beth', to: 'Bryan', amount: 95, date: '2025-08-15', month: 'August 2025', merchant: 'sushi', account: 'Cash App' },
      { from: 'Bryan', to: 'Beth', amount: 31, date: '2025-09-17', month: 'September 2025', merchant: 'Beth therapist', account: 'Cash App' }
    ],
    sharedExpenses: [
      { person: 'Beth', merchant: 'MOOSE PHARMACY', amount: 45.88, date: '2025-09-20', month: 'September 2025', category: 'Healthcare', account: 'Cash App' },
      { person: 'Beth', merchant: 'MOOSE PHARMACY', amount: 51.52, date: '2025-08-22', month: 'August 2025', category: 'Healthcare', account: 'Cash App' }
    ],
    insights: {
      highestSpender: { name: 'Beth', expenses: 9200 },
      highestEarner: { name: 'Beth', income: 11800 },
      mostProfitable: { name: 'Bryan', netProfit: 3000 },
      biggestSubscriptionSpender: { name: 'Beth', subscriptions: 180 },
      p2pAnalysis: { totalTransfers: 67, totalAmount: 4500 },
      sharedExpenseAnalysis: { totalSharedExpenses: 45, totalAmount: 2500 }
    },
    recommendations: [
      { person: 'Beth', type: 'spending_balance', message: 'Beth accounts for 60.9% of total spending', suggestion: 'Consider redistributing expenses or increasing income', priority: 'high' },
      { type: 'p2p_optimization', message: 'High P2P transfer volume: $4,500.00', suggestion: 'Consider joint account for shared expenses to reduce transfer fees', priority: 'medium' },
      { person: 'Beth', type: 'subscription_sharing', message: 'Beth spends $180.00 on subscriptions', suggestion: 'Consider sharing subscriptions or family plans', priority: 'medium' }
    ]
  }
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Mock API functions
export const mockApi = {
  async getVerificationData() {
    await simulateApiDelay(800);
    return mockData.verification;
  },

  async getMonthlyComparison() {
    await simulateApiDelay(600);
    return mockData.monthlyComparison;
  },

  async getCategoryAnalysis() {
    await simulateApiDelay(700);
    return mockData.categoryAnalysis;
  },

  async getSubscriptionAnalysis() {
    await simulateApiDelay(500);
    return mockData.subscriptionAnalysis;
  },

  async getAccountAnalysis() {
    await simulateApiDelay(600);
    return mockData.accountAnalysis;
  },

  async getPersonAnalysis() {
    await simulateApiDelay(500);
    return mockData.personAnalysis;
  }
};
