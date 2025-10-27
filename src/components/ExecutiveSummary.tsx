import React from 'react';
import {TrendingUp, TrendingDown, DollarSign, AlertTriangle, CheckCircle} from 'lucide-react';

interface ExecutiveSummaryProps {
  monthlyData: any;
  categoryData: any;
  subscriptionData: any;
  verificationData: any;
}

export const ExecutiveSummary = ({monthlyData, categoryData, subscriptionData, verificationData}: ExecutiveSummaryProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTrendIcon = (trend: any) => {
    if (trend.direction === 'increasing') {
      return <TrendingUp className="w-4 h-4 text-red-600" />;
    } else if (trend.direction === 'decreasing') {
      return <TrendingDown className="w-4 h-4 text-emerald-600" />;
    }
    return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
  };

  const getTrendColor = (trend: any) => {
    if (trend.direction === 'increasing') return 'text-red-600';
    if (trend.direction === 'decreasing') return 'text-emerald-600';
    return 'text-gray-600';
  };

  if (!monthlyData || !categoryData || !subscriptionData || !verificationData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  const summary = monthlyData.summary;
  const trends = monthlyData.trends;
  const topCategories = categoryData.topExpenseCategories || [];
  const subscriptionSummary = subscriptionData.summary;
  const verificationStatus = verificationData.status;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-black mb-4">3-Month Summary</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-emerald-600">Total Income</div>
              {getTrendIcon(trends.income)}
            </div>
            <div className="text-xl font-bold text-emerald-600">
              {formatCurrency(summary.totalIncome)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.income)}`}>
              {trends.income.percentage > 0 ? '+' : ''}{trends.income.percentage}% vs first month
            </div>
          </div>

          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-red-600">Total Expenses</div>
              {getTrendIcon(trends.expenses)}
            </div>
            <div className="text-xl font-bold text-red-600">
              {formatCurrency(summary.totalExpenses)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.expenses)}`}>
              {trends.expenses.percentage > 0 ? '+' : ''}{trends.expenses.percentage}% vs first month
            </div>
          </div>

          <div className={`rounded-lg p-4 ${summary.totalNetProfit >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm ${summary.totalNetProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                Net Profit
              </div>
              {getTrendIcon(trends.netProfit)}
            </div>
            <div className={`text-xl font-bold ${summary.totalNetProfit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {formatCurrency(summary.totalNetProfit)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.netProfit)}`}>
              {trends.netProfit.percentage > 0 ? '+' : ''}{trends.netProfit.percentage}% vs first month
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-2">Avg Daily Spending</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(summary.averageDailySpending)}
            </div>
            <div className={`text-xs ${getTrendColor(trends.averageDailySpending)}`}>
              {trends.averageDailySpending.percentage > 0 ? '+' : ''}{trends.averageDailySpending.percentage}% vs first month
            </div>
          </div>
        </div>

        {/* Data Quality Status */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            {verificationStatus.isComplete ? (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
            )}
            <span className="text-sm font-medium text-gray-700">Data Completeness</span>
          </div>
          <div className="text-sm text-gray-600">
            {verificationStatus.dataQualityScore}% complete
          </div>
        </div>
      </div>

      {/* Top Spending Categories */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Top Spending Categories</h3>
        <div className="space-y-3">
          {topCategories.slice(0, 5).map((category: any, index: number) => (
            <div key={category.category} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-black">{category.category}</div>
                  <div className="text-sm text-gray-600">{category.count} transactions</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-black">{formatCurrency(category.totalExpenses)}</div>
                <div className="text-sm text-gray-600">{category.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Subscription Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Total Subscriptions</div>
            <div className="text-xl font-bold text-blue-600">
              {subscriptionSummary.totalSubscriptions}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 mb-1">Monthly Cost</div>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(subscriptionSummary.totalMonthlyCost)}
            </div>
          </div>
        </div>
        
        {subscriptionSummary.totalFailedPayments > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">
                {subscriptionSummary.totalFailedPayments} failed payments detected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Key Insights</h3>
        <div className="space-y-3">
          {summary.totalNetProfit < 0 && (
            <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <div className="font-medium text-red-800">Spending Exceeds Income</div>
                <div className="text-sm text-red-700">
                  You're spending {formatCurrency(Math.abs(summary.totalNetProfit))} more than you earn
                </div>
              </div>
            </div>
          )}

          {trends.expenses.direction === 'increasing' && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800">Expenses Trending Up</div>
                <div className="text-sm text-yellow-700">
                  Monthly expenses increased by {trends.expenses.percentage}% over 3 months
                </div>
              </div>
            </div>
          )}

          {topCategories.length > 0 && topCategories[0].percentage > 30 && (
            <div className="flex items-start space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-blue-800">Concentrated Spending</div>
                <div className="text-sm text-blue-700">
                  {topCategories[0].category} accounts for {topCategories[0].percentage}% of expenses
                </div>
              </div>
            </div>
          )}

          {subscriptionSummary.totalMonthlyCost > 200 && (
            <div className="flex items-start space-x-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <div className="font-medium text-purple-800">High Subscription Costs</div>
                <div className="text-sm text-purple-700">
                  ${subscriptionSummary.totalMonthlyCost.toFixed(0)}/month in subscriptions
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
