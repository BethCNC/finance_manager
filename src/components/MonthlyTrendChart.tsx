import React from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar} from 'recharts';

interface MonthlyTrendChartProps {
  monthlyData: any;
  accountData: any;
  personData: any;
}

export const MonthlyTrendChart = ({monthlyData, accountData, personData}: MonthlyTrendChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (!monthlyData || !monthlyData.monthlyData) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Prepare chart data
  const chartData = monthlyData.monthlyData.map((month: any) => ({
    month: month.month.split(' ')[0], // Just "July", "August", "September"
    income: month.income,
    expenses: month.expenses,
    netProfit: month.netProfit,
    transactionCount: month.transactionCount
  }));

  // Account activity data
  // const accountActivityData = monthlyData.monthlyData.map((month: any) => {
  //   const accountData: any = {month: month.month.split(' ')[0]};
  //   
  //   // Add account data if available
  //   if (accountData && accountData.accounts) {
  //     Object.entries(accountData.accounts).forEach(([account, data]: [string, any]) => {
  //       accountData[account] = data.expenses;
  //     });
  //   }
  //   
  //   return accountData;
  // });

  // Person comparison data
  // const personComparisonData = monthlyData.monthlyData.map((month: any) => {
  //   const personData: any = {month: month.month.split(' ')[0]};
  //   
  //   // Add person data if available
  //   if (personData && personData.people) {
  //     Object.entries(personData.people).forEach(([person, data]: [string, any]) => {
  //       personData[person] = data.expenses;
  //     });
  //   }
  //   
  //   return personData;
  // });

  return (
    <div className="space-y-6">
      {/* Income vs Expenses Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Income vs Expenses Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: 12}}
                stroke="#666"
              />
              <YAxis 
                tick={{fontSize: 12}}
                stroke="#666"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number, name: string) => [
                  formatCurrency(value), 
                  name === 'income' ? 'Income' : name === 'expenses' ? 'Expenses' : 'Net Profit'
                ]}
                labelStyle={{color: '#333'}}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{fill: '#10b981', strokeWidth: 2, r: 4}}
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{fill: '#ef4444', strokeWidth: 2, r: 4}}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Net Profit Trend */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Monthly Net Profit</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: 12}}
                stroke="#666"
              />
              <YAxis 
                tick={{fontSize: 12}}
                stroke="#666"
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Net Profit']}
                labelStyle={{color: '#333'}}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="netProfit" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Volume */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Transaction Volume</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: 12}}
                stroke="#666"
              />
              <YAxis 
                tick={{fontSize: 12}}
                stroke="#666"
              />
              <Tooltip 
                formatter={(value: number) => [value, 'Transactions']}
                labelStyle={{color: '#333'}}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="transactionCount" 
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 gap-4">
        {monthlyData.monthlyData.map((month: any, index: number) => (
          <div key={month.month} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-black">{month.month}</h4>
              <div className={`text-sm font-medium ${
                month.netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {formatCurrency(month.netProfit)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-600">Income</div>
                <div className="font-semibold text-emerald-600">{formatCurrency(month.income)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Expenses</div>
                <div className="font-semibold text-red-600">{formatCurrency(month.expenses)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">Transactions</div>
                <div className="font-semibold text-gray-700">{month.transactionCount}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-black mb-4">Trend Analysis</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Income Trend</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                monthlyData.trends.income.direction === 'increasing' ? 'text-emerald-600' : 
                monthlyData.trends.income.direction === 'decreasing' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {monthlyData.trends.income.direction}
              </span>
              <span className="text-sm text-gray-600">
                {monthlyData.trends.income.percentage > 0 ? '+' : ''}{monthlyData.trends.income.percentage}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Expense Trend</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                monthlyData.trends.expenses.direction === 'increasing' ? 'text-red-600' : 
                monthlyData.trends.expenses.direction === 'decreasing' ? 'text-emerald-600' : 'text-gray-600'
              }`}>
                {monthlyData.trends.expenses.direction}
              </span>
              <span className="text-sm text-gray-600">
                {monthlyData.trends.expenses.percentage > 0 ? '+' : ''}{monthlyData.trends.expenses.percentage}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Net Profit Trend</span>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${
                monthlyData.trends.netProfit.direction === 'increasing' ? 'text-emerald-600' : 
                monthlyData.trends.netProfit.direction === 'decreasing' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {monthlyData.trends.netProfit.direction}
              </span>
              <span className="text-sm text-gray-600">
                {monthlyData.trends.netProfit.percentage > 0 ? '+' : ''}{monthlyData.trends.netProfit.percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
