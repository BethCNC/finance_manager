import React from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from 'recharts';

interface CategoryBreakdownProps {
  categoryData: any;
  monthlyData: any;
}

export const CategoryBreakdown = ({categoryData, monthlyData}: CategoryBreakdownProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!categoryData || !monthlyData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const topCategories = categoryData.topExpenseCategories || [];
  const spendingBreakdown = categoryData.spendingBreakdown;
  const costCuttingOpportunities = categoryData.costCuttingOpportunities || [];

  // Colors for pie chart
  const COLORS = [
    '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4',
    '#3b82f6', '#8b5cf6', '#ec4899', '#84cc16', '#f59e0b'
  ];

  // Prepare pie chart data
  const pieData = topCategories.slice(0, 8).map((category: any, index: number) => ({
    name: category.category,
    value: category.totalExpenses,
    percentage: category.percentage,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="space-y-6">
      {/* Spending Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Spending Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm text-blue-600 mb-1">Discretionary</div>
            <div className="text-xl font-bold text-blue-600">
              {formatCurrency(spendingBreakdown.discretionary.amount)}
            </div>
            <div className="text-sm text-blue-600">
              {spendingBreakdown.discretionary.percentage}%
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm text-green-600 mb-1">Essential</div>
            <div className="text-xl font-bold text-green-600">
              {formatCurrency(spendingBreakdown.essential.amount)}
            </div>
            <div className="text-sm text-green-600">
              {spendingBreakdown.essential.percentage}%
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-sm text-purple-600 mb-1">Business</div>
            <div className="text-xl font-bold text-purple-600">
              {formatCurrency(spendingBreakdown.business.amount)}
            </div>
            <div className="text-sm text-purple-600">
              {spendingBreakdown.business.percentage}%
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Personal</div>
            <div className="text-xl font-bold text-gray-600">
              {formatCurrency(spendingBreakdown.personal.amount)}
            </div>
            <div className="text-sm text-gray-600">
              {spendingBreakdown.personal.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Category Pie Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Top Categories</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percentage}) => `${name} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Amount']}
                labelStyle={{color: '#333'}}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Categories List */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Category Details</h3>
        <div className="space-y-3">
          {topCategories.map((category: any, index: number) => (
            <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{backgroundColor: COLORS[index % COLORS.length]}}
                />
                <div>
                  <div className="font-medium text-black">{category.category}</div>
                  <div className="text-sm text-gray-600">
                    {category.count} transactions • {formatCurrency(category.monthlyAverage)}/month avg
                  </div>
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

      {/* Cost-Cutting Opportunities */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Cost-Cutting Opportunities</h3>
        <div className="space-y-4">
          {costCuttingOpportunities.slice(0, 5).map((opportunity: any, index: number) => (
            <div key={opportunity.category} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-black">{opportunity.category}</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opportunity.priority === 'high' ? 'bg-red-100 text-red-800' :
                  opportunity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {opportunity.priority} priority
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-2">{opportunity.reason}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Current: {formatCurrency(opportunity.monthlySpending)}/month
                </div>
                <div className="font-semibold text-emerald-600">
                  Save: {formatCurrency(opportunity.potentialSavings)}/month
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {costCuttingOpportunities.length > 0 && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <div className="text-sm font-medium text-emerald-800 mb-1">Total Potential Savings</div>
            <div className="text-lg font-bold text-emerald-600">
              {formatCurrency(costCuttingOpportunities.reduce((sum: number, opp: any) => sum + opp.potentialSavings, 0))}/month
            </div>
          </div>
        )}
      </div>

      {/* Category Trends */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Category Trends</h3>
        <div className="space-y-3">
          {categoryData.categoryTrends?.slice(0, 5).map((trend: any) => (
            <div key={trend.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="font-medium text-black">{trend.category}</div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  trend.trend.direction === 'increasing' ? 'text-red-600' : 
                  trend.trend.direction === 'decreasing' ? 'text-emerald-600' : 'text-gray-600'
                }`}>
                  {trend.trend.direction}
                </span>
                <span className="text-sm text-gray-600">
                  {trend.trend.percentage > 0 ? '+' : ''}{trend.trend.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
