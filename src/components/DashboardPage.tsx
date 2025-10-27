import React from 'react';
import {useFinanceData} from '../hooks/useFinanceData';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import {Home, ShoppingCart, Car, Gamepad2, Heart, Laptop, User, AlertCircle, CheckCircle, HelpCircle} from 'lucide-react';

interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  budget: number;
  icon: React.ComponentType<any>;
  color: string;
  barColor: string;
}

interface Goal {
  id: string;
  name: string;
  progress: number;
  color: string;
  strokeColor: string;
}

interface AITip {
  id: string;
  description: string;
  gradient: string;
}

/**
 * Dashboard Page Component
 * Based on Figma design: node-id=31:5698
 *
 * Main homepage with budget overview, goals, and AI insights
 *
 * Features:
 * - Budget categories with progress bars
 * - Financial goals with circular progress
 * - AI tips with gradient backgrounds
 * - Action buttons for key tasks
 */
const DashboardPage = () => {
  const {transactions, loading} = useFinanceData();

  // Budget categories matching Figma design colors
  const budgetCategories: BudgetCategory[] = [
    {id: '1', name: 'Mortgage', spent: 85, budget: 150, icon: Home, color: 'text-red-700', barColor: 'bg-red-300'},
    {id: '2', name: 'Bills', spent: 85, budget: 150, icon: AlertCircle, color: 'text-orange-700', barColor: 'bg-orange-300'},
    {id: '3', name: 'Home Reno', spent: 85, budget: 150, icon: Home, color: 'text-yellow-700', barColor: 'bg-yellow-300'},
    {id: '4', name: 'George', spent: 85, budget: 150, icon: User, color: 'text-lime-700', barColor: 'bg-lime-300'},
    {id: '5', name: 'Food', spent: 85, budget: 150, icon: ShoppingCart, color: 'text-emerald-700', barColor: 'bg-emerald-300'},
    {id: '6', name: 'Auto', spent: 85, budget: 150, icon: Car, color: 'text-cyan-700', barColor: 'bg-cyan-300'},
    {id: '7', name: 'Entertainment', spent: 85, budget: 150, icon: Gamepad2, color: 'text-blue-700', barColor: 'bg-blue-300'},
    {id: '8', name: 'Health', spent: 85, budget: 150, icon: Heart, color: 'text-violet-700', barColor: 'bg-violet-300'},
    {id: '9', name: 'Software', spent: 85, budget: 150, icon: Laptop, color: 'text-fuchsia-700', barColor: 'bg-fuchsia-300'},
    {id: '10', name: 'Personal', spent: 85, budget: 150, icon: User, color: 'text-pink-700', barColor: 'bg-pink-300'},
  ];

  // Goals matching Figma design
  const goals: Goal[] = [
    {id: '1', name: 'Emergency Fund', progress: 75, color: 'text-blue-600', strokeColor: 'stroke-blue-600'},
    {id: '2', name: 'Debt Paydown', progress: 50, color: 'text-green-600', strokeColor: 'stroke-green-600'},
    {id: '3', name: 'Roth IRA', progress: 25, color: 'text-pink-600', strokeColor: 'stroke-pink-600'},
  ];

  // AI Tips matching Figma design with gradient backgrounds
  const aiTips: AITip[] = [
    {
      id: '1',
      description: 'Your subscriptions rose 12%. Want me to investigate your recent transactions to determine why and find a solution?',
      gradient: 'bg-gradient-to-r from-pink-200 to-green-200'
    },
    {
      id: '2',
      description: 'Your subscriptions rose 12%. Want me to investigate your recent transactions to determine why and find a solution?',
      gradient: 'bg-gradient-to-r from-blue-200 to-green-200'
    }
  ];

  const calculateProgress = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const handleGridClick = () => {
    console.log('Grid clicked');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <MobileHeader title="Dashboard" showMenu showGrid onGridClick={handleGridClick} />
        <div className="flex-1 p-6 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
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
      <MobileHeader title="Dashboard" showMenu showGrid onGridClick={handleGridClick} />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">

        {/* Budget Categories Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 border border-gray-600 rounded-md px-3 py-3">
            <h2 className="text-2xl font-semibold text-white">
              Budget Categories
            </h2>
          </div>

          <div className="space-y-3">
            {budgetCategories.map((category) => {
              const IconComponent = category.icon;
              const progress = calculateProgress(category.spent, category.budget);
              const remaining = category.budget - category.spent;

              return (
                <div key={category.id} className="bg-white rounded-lg p-3">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent size={16} className={category.color} />
                    <span className="text-sm font-medium text-slate-800">{category.name}</span>
                    <span className="ml-auto text-xs text-slate-600">
                      ${category.spent} of ${category.budget}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-slate-700">{Math.round(progress)}%</div>
                    <div className="flex-1 flex items-center gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${category.barColor}`}
                          style={{width: `${progress}%`}}
                        ></div>
                      </div>
                      {progress >= 90 && <AlertCircle size={14} className="text-orange-500" />}
                      {progress >= 75 && progress < 90 && <CheckCircle size={14} className="text-yellow-500" />}
                    </div>
                    <div className="text-xs text-slate-600">${remaining} left</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 border border-gray-600 rounded-md px-3 py-3">
            <h2 className="text-2xl font-semibold text-white">
              Goals
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-white rounded-lg p-3 text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={goal.strokeColor}
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeDasharray={`${goal.progress}, 100`}
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-base font-bold ${goal.color}`}>{goal.progress}%</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-slate-700">{goal.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tips Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 border border-gray-600 rounded-md px-3 py-3">
            <h2 className="text-2xl font-semibold text-white">
              AI Tips
            </h2>
          </div>

          <div className="space-y-3">
            {aiTips.map((tip) => (
              <div
                key={tip.id}
                className={`${tip.gradient} rounded-xl p-6 border border-gray-200`}
              >
                <div className="bg-white border border-gray-300 rounded flex gap-2 items-start px-3 py-3">
                  <HelpCircle className="w-5 h-5 text-slate-700 flex-shrink-0 mt-0.5" />
                  <p className="flex-1 text-sm font-medium text-slate-700">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button className="bg-slate-600 text-white rounded-lg px-3 py-4 text-sm font-medium hover:bg-slate-700 transition-colors">
            Save More
          </button>

          <button className="bg-slate-600 text-white rounded-lg px-3 py-4 text-sm font-medium hover:bg-slate-700 transition-colors">
            See Transactions
          </button>

          <button className="bg-slate-600 text-white rounded-lg px-3 py-4 text-sm font-medium hover:bg-slate-700 transition-colors">
            Ask AI Advisor
          </button>
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

export default DashboardPage;
