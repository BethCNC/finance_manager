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

    // Subscription analysis
    const subscriptions = {};
    const subscriptionPatterns = {};
    const failedPayments = [];
    let totalSubscriptionCost = 0;
    let totalFailedPayments = 0;

    // Known subscription merchants (from Cash App data analysis)
    const knownSubscriptions = [
      'AMAZON PRIME PMTS', 'Prime Video Channels', 'HULU', 'NETFLIX', 'SPOTIFY',
      'STAMPS.COM', 'ADOBE', 'NOTION', 'CURSOR', 'CHATGPT', 'APPLE MUSIC',
      'UBER *ONE MEMBERSHIP', 'AMAZON MKTPLACE PMTS'
    ];

    // Process each transaction
    allTransactions.forEach((page) => {
      const amount = page.properties.Amount?.number || 0;
      const type = page.properties.Type?.select?.name || 'Debit';
      const category = page.properties.Category?.select?.name || 'Uncategorized';
      const merchant = page.properties['Normalized Merchant']?.rich_text?.[0]?.plain_text || 
                      page.properties.Description?.title?.[0]?.plain_text || '';
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
      const isIncome = type.toLowerCase() === 'credit';
      const absAmount = Math.abs(amount);

      // Skip income transactions
      if (isIncome) return;

      // Identify subscription transactions
      const isSubscriptionTransaction = isSubscription || 
        knownSubscriptions.some(sub => merchant.toUpperCase().includes(sub.toUpperCase())) ||
        category.toLowerCase().includes('subscription') ||
        category.toLowerCase().includes('streaming');

      if (isSubscriptionTransaction) {
        // Normalize merchant name for grouping
        const normalizedMerchant = normalizeMerchantName(merchant);
        
        if (!subscriptions[normalizedMerchant]) {
          subscriptions[normalizedMerchant] = {
            name: normalizedMerchant,
            originalMerchant: merchant,
            totalAmount: 0,
            count: 0,
            monthlyAmount: 0,
            months: new Set(),
            isBusiness,
            category,
            failedPayments: 0,
            lastPayment: null,
            frequency: 'unknown',
            status: 'active'
          };
        }

        subscriptions[normalizedMerchant].totalAmount += absAmount;
        subscriptions[normalizedMerchant].count++;
        subscriptions[normalizedMerchant].months.add(monthName);
        subscriptions[normalizedMerchant].lastPayment = date;

        // Check for failed payments (from Cash App data pattern)
        if (merchant.includes('FAILED') || amount < 0) {
          subscriptions[normalizedMerchant].failedPayments++;
          subscriptions[normalizedMerchant].status = 'failed';
          failedPayments.push({
            merchant: normalizedMerchant,
            amount: absAmount,
            date,
            month: monthName
          });
          totalFailedPayments += absAmount;
        }

        totalSubscriptionCost += absAmount;
      }
    });

    // Calculate monthly averages and frequencies
    Object.values(subscriptions).forEach(sub => {
      sub.monthlyAmount = sub.totalAmount / sub.months.size;
      sub.frequency = determineFrequency(sub.count, sub.months.size);
      sub.months = Array.from(sub.months);
    });

    // Sort subscriptions by monthly cost
    const sortedSubscriptions = Object.values(subscriptions)
      .sort((a, b) => b.monthlyAmount - a.monthlyAmount);

    // Categorize subscriptions
    const subscriptionCategories = {
      streaming: sortedSubscriptions.filter(sub => 
        sub.name.toLowerCase().includes('netflix') ||
        sub.name.toLowerCase().includes('hulu') ||
        sub.name.toLowerCase().includes('prime') ||
        sub.name.toLowerCase().includes('spotify') ||
        sub.name.toLowerCase().includes('apple music')
      ),
      software: sortedSubscriptions.filter(sub => 
        sub.name.toLowerCase().includes('adobe') ||
        sub.name.toLowerCase().includes('notion') ||
        sub.name.toLowerCase().includes('cursor') ||
        sub.name.toLowerCase().includes('chatgpt')
      ),
      services: sortedSubscriptions.filter(sub => 
        sub.name.toLowerCase().includes('uber') ||
        sub.name.toLowerCase().includes('stamps') ||
        sub.name.toLowerCase().includes('amazon')
      ),
      other: sortedSubscriptions.filter(sub => 
        !subscriptionCategories.streaming.includes(sub) &&
        !subscriptionCategories.software.includes(sub) &&
        !subscriptionCategories.services.includes(sub)
      )
    };

    // Generate recommendations
    const recommendations = generateRecommendations(sortedSubscriptions);

    // Calculate potential savings
    const potentialSavings = {
      cancelUnused: recommendations.filter(r => r.action === 'cancel').reduce((sum, r) => sum + r.monthlySavings, 0),
      downgrade: recommendations.filter(r => r.action === 'downgrade').reduce((sum, r) => sum + r.monthlySavings, 0),
      negotiate: recommendations.filter(r => r.action === 'negotiate').reduce((sum, r) => sum + r.monthlySavings, 0),
      total: recommendations.reduce((sum, r) => sum + r.monthlySavings, 0)
    };

    return res.status(200).json({
      summary: {
        totalSubscriptions: sortedSubscriptions.length,
        totalMonthlyCost: totalSubscriptionCost / targetMonths.length,
        totalFailedPayments,
        averageSubscriptionCost: sortedSubscriptions.length > 0 ? 
          (totalSubscriptionCost / targetMonths.length) / sortedSubscriptions.length : 0
      },
      subscriptions: sortedSubscriptions,
      subscriptionCategories,
      failedPayments,
      recommendations,
      potentialSavings,
      insights: {
        mostExpensive: sortedSubscriptions[0],
        mostFailed: sortedSubscriptions.reduce((most, current) => 
          current.failedPayments > most.failedPayments ? current : most
        ),
        businessSubscriptions: sortedSubscriptions.filter(sub => sub.isBusiness),
        personalSubscriptions: sortedSubscriptions.filter(sub => !sub.isBusiness)
      }
    });

  } catch (error) {
    console.error('Subscription analysis error:', error);
    return res.status(500).json({
      error: 'Failed to generate subscription analysis',
      details: error.message,
    });
  }
};

function normalizeMerchantName(merchant) {
  // Remove common prefixes and normalize names
  let normalized = merchant
    .replace(/AMAZON PRIME PMTS/i, 'Amazon Prime')
    .replace(/Prime Video Channels/i, 'Prime Video')
    .replace(/AMAZON MKTPLACE PMTS/i, 'Amazon Marketplace')
    .replace(/UBER \*ONE MEMBERSHIP/i, 'Uber One')
    .replace(/STAMPS\.COM/i, 'Stamps.com')
    .replace(/HULU/i, 'Hulu')
    .replace(/NETFLIX/i, 'Netflix')
    .replace(/SPOTIFY/i, 'Spotify')
    .replace(/ADOBE/i, 'Adobe')
    .replace(/NOTION/i, 'Notion')
    .replace(/CURSOR/i, 'Cursor')
    .replace(/CHATGPT/i, 'ChatGPT')
    .replace(/APPLE MUSIC/i, 'Apple Music');
  
  return normalized;
}

function determineFrequency(count, months) {
  if (count >= months * 0.9) return 'monthly';
  if (count >= months * 0.3) return 'irregular';
  return 'one-time';
}

function generateRecommendations(subscriptions) {
  const recommendations = [];

  subscriptions.forEach(sub => {
    // Cancel subscriptions with many failed payments
    if (sub.failedPayments > 2) {
      recommendations.push({
        subscription: sub.name,
        action: 'cancel',
        reason: `${sub.failedPayments} failed payments - likely unused`,
        monthlySavings: sub.monthlyAmount,
        priority: 'high'
      });
    }

    // Cancel very expensive subscriptions
    if (sub.monthlyAmount > 50 && sub.failedPayments > 0) {
      recommendations.push({
        subscription: sub.name,
        action: 'cancel',
        reason: 'High cost with payment issues',
        monthlySavings: sub.monthlyAmount,
        priority: 'high'
      });
    }

    // Downgrade streaming services
    if (sub.name.toLowerCase().includes('prime') && sub.monthlyAmount > 15) {
      recommendations.push({
        subscription: sub.name,
        action: 'downgrade',
        reason: 'Consider annual plan for savings',
        monthlySavings: sub.monthlyAmount * 0.2,
        priority: 'medium'
      });
    }

    // Negotiate business subscriptions
    if (sub.isBusiness && sub.monthlyAmount > 20) {
      recommendations.push({
        subscription: sub.name,
        action: 'negotiate',
        reason: 'Contact for business discount',
        monthlySavings: sub.monthlyAmount * 0.15,
        priority: 'medium'
      });
    }
  });

  return recommendations.sort((a, b) => b.monthlySavings - a.monthlySavings);
}
