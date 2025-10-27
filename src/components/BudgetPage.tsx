import React, {useState} from 'react';
import {useFinanceData} from '../hooks/useFinanceData';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import BudgetOptimizer from './BudgetOptimizer';
import {ChevronDown, AlertCircle} from 'lucide-react';

interface AlertItem {
  id: string;
  message: string;
  type: 'warning' | 'info';
}

interface CategoryData {
  name: string;
  amount: number;
  color: string;
  percentage: number;
}

/**
 * Budget Page Component
 * Based on Figma design: node-id=60:21145
 *
 * Features:
 * - Month selector dropdown
 * - Blue budget summary card with progress
 * - Alert cards for budget warnings
 * - Pie chart for category breakdown
 * - Bar chart for monthly spending
 * - Recent transactions list
 */
const BudgetPage = () => {
  const {transactions, loading} = useFinanceData();
  const [selectedMonth, setSelectedMonth] = useState('Month');

  // Mock budget data
  const totalBudget = 4533.00;
  const spent = 3060;
  const remaining = 511;
  const overallProgress = 85;

  // Alert items
  const alerts: AlertItem[] = [
    {
      id: '1',
      message: 'Utilities are at 90% ($100 of $200)',
      type: 'warning'
    },
    {
      id: '2',
      message: 'You should cancel a streaming service',
      type: 'info'
    },
    {
      id: '3',
      message: 'George needs meds this month',
      type: 'info'
    }
  ];

  // Category breakdown for pie chart
  const categories: CategoryData[] = [
    {name: 'Mortgage', amount: 1200, color: 'bg-pink-300', percentage: 26},
    {name: 'Food', amount: 800, color: 'bg-emerald-400', percentage: 18},
    {name: 'Bills', amount: 400, color: 'bg-yellow-300', percentage: 9},
    {name: 'Auto', amount: 350, color: 'bg-blue-300', percentage: 8},
    {name: 'Personal', amount: 450, color: 'bg-pink-200', percentage: 10},
    {name: 'Health', amount: 300, color: 'bg-purple-300', percentage: 7},
    {name: 'Fees', amount: 200, color: 'bg-orange-200', percentage: 4}
  ];

  // Mock transactions
  const recentTransactions = [
    {id: '1', name: 'Shell Gas Station', amount: -40.88, category: 'Auto', date: 'Yesterday, 5:53 PM', icon: 'S', iconBg: 'bg-cyan-400'},
    {id: '2', name: 'Netflix', amount: -12.45, category: 'Entertainment', date: 'Aug 13, 5:53 PM', icon: 'N', iconBg: 'bg-blue-400'},
    {id: '3', name: 'Chat GPT Plus', amount: -19.99, category: 'Software', date: 'Aug 23, 5:53 PM', icon: 'C', iconBg: 'bg-purple-400'},
    {id: '4', name: 'Indian Trail Vet', amount: -74.33, category: 'George', date: 'Aug 2, 5:53 PM', icon: 'I', iconBg: 'bg-lime-400'}
  ];

  const handleGridClick = () => {
    console.log('Grid clicked');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <MobileHeader title="Budget" showMenu showGrid onGridClick={handleGridClick} />
        <div className="flex-1 p-6 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader title="Budget" showMenu showGrid onGridClick={handleGridClick} />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">

        {/* Month Selector */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-base font-medium text-slate-700 appearance-none focus:border-gray-400 focus:outline-none"
          >
            <option value="Month">Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={20} />
        </div>

        {/* Budget Summary Card */}
        <div className="bg-blue-500 rounded-2xl p-6 text-white space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-base font-semibold">Total Budget</div>
            <div className="text-4xl font-bold">${totalBudget.toFixed(2)}</div>
            <div className="flex items-center justify-center gap-2 text-base">
              <span>Total Budget</span>
              <span>•</span>
              <span>Total Budget</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Overall Progress</span>
                <span className="text-xs">{overallProgress}%</span>
              </div>
              <div className="bg-slate-200 border border-gray-600 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-800 border-r border-gray-600 h-full transition-all"
                  style={{width: `${overallProgress}%`}}
                />
              </div>
            </div>

            {/* Spent and Remaining */}
            <div className="flex gap-3">
              <div className="flex-1 bg-blue-50 border border-gray-600 rounded-xl p-3 text-center">
                <div className="text-sm font-medium text-slate-700 mb-2">Spent</div>
                <div className="text-base font-semibold text-slate-900">${spent}</div>
              </div>
              <div className="flex-1 bg-blue-50 border border-gray-600 rounded-xl p-3 text-center">
                <div className="text-sm font-medium text-slate-700 mb-2">Remaining</div>
                <div className="text-base font-semibold text-slate-900">${remaining}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Optimizer */}
        <BudgetOptimizer />

        {/* Budget Alerts */}
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-pink-100 border border-pink-300 rounded-xl p-4 flex items-center gap-3"
            >
              <AlertCircle size={20} className="text-pink-600 flex-shrink-0" />
              <p className="text-sm font-medium text-pink-900">{alert.message}</p>
            </div>
          ))}
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Budget Breakdown</h3>
            <p className="text-sm text-slate-500 mt-1">Spending by Category</p>
          </div>

          {/* Pie Chart Placeholder */}
          <div className="relative w-48 h-48 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="#fbbf24" stroke="none" strokeDasharray="26 74" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="40" fill="#f472b6" stroke="none" strokeDasharray="18 82" strokeDashoffset="-26" />
              <circle cx="50" cy="50" r="40" fill="#10b981" stroke="none" strokeDasharray="26 74" strokeDashoffset="-44" />
              <circle cx="50" cy="50" r="40" fill="#a78bfa" stroke="none" strokeDasharray="10 90" strokeDashoffset="-70" />
              <circle cx="50" cy="50" r="40" fill="#60a5fa" stroke="none" strokeDasharray="8 92" strokeDashoffset="-80" />
              <circle cx="50" cy="50" r="40" fill="#fca5a5" stroke="none" strokeDasharray="8 92" strokeDashoffset="-88" />
              <circle cx="50" cy="50" r="40" fill="#fde68a" stroke="none" strokeDasharray="4 96" strokeDashoffset="-96" />
            </svg>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-sm ${cat.color}`}></div>
                <span className="text-xs text-slate-600">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart Section */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Spending by Month</h3>
            <p className="text-sm text-slate-500 mt-1">Spending History by Month</p>
          </div>

          {/* Bar Chart Placeholder */}
          <div className="h-48 flex items-end justify-between gap-2">
            {[65, 45, 80, 55, 90, 70, 85, 60].map((height, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-pink-300 to-pink-200 rounded-t"
                  style={{height: `${height}%`}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Transactions Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 rounded-md px-4 py-3">
            <h2 className="text-xl font-semibold text-white">Transactions</h2>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3"
              >
                {/* Icon */}
                <div className={`w-10 h-10 ${transaction.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{transaction.icon}</span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{transaction.name}</p>
                  <p className="text-xs text-slate-500">{transaction.category}</p>
                </div>

                {/* Amount and Date */}
                <div className="text-right">
                  <p className="font-semibold text-slate-800 text-sm">
                    -${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Source Indicator */}
        {transactions.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-green-700 font-medium">Live Data Connected</p>
            </div>
            <p className="text-xs text-green-600 mt-1">
              {transactions.length} transactions synced from Notion
            </p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default BudgetPage;
