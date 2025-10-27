import React, {useState} from 'react';
import {useFinanceData} from '../hooks/useFinanceData';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import {ChevronDown} from 'lucide-react';

interface Subscription {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: string;
  icon: string;
  iconBg: string;
}

/**
 * Subscriptions Page Component
 * Based on Figma design: node-id=143:4108
 *
 * Features:
 * - Month selector dropdown
 * - Pink subscription summary card with progress bar
 * - Transaction list with colorful circular icons
 * - Dark slate header for Transactions section
 */
const SubscriptionsPage: React.FC = () => {
  const {transactions, loading} = useFinanceData();
  const [selectedMonth, setSelectedMonth] = useState('Month');

  // Mock subscription data matching Figma design
  const mockSubscriptions: Subscription[] = [
    {id: '1', name: 'Shell Gas Station', amount: -40.88, category: 'Auto', date: 'Yesterday, 5:53 PM', icon: 'S', iconBg: 'bg-cyan-400'},
    {id: '2', name: 'Netflix', amount: -12.45, category: 'Entertainment', date: 'Aug 13, 5:53 PM', icon: 'N', iconBg: 'bg-blue-400'},
    {id: '3', name: 'Chat GPT Plus', amount: -19.99, category: 'Software', date: 'Aug 23, 5:53 PM', icon: 'C', iconBg: 'bg-purple-400'},
    {id: '4', name: 'Indian Trail Vet', amount: -74.33, category: 'George', date: 'Aug 2, 5:53 PM', icon: 'I', iconBg: 'bg-lime-400'},
    {id: '5', name: 'Atrium Health', amount: -860.00, category: 'Health', date: 'Aug 15, 5:53 PM', icon: 'A', iconBg: 'bg-violet-400'},
    {id: '6', name: 'Truist Bank', amount: -1800.00, category: 'Mortgage', date: 'Aug 1, 8:53 PM', icon: 'T', iconBg: 'bg-red-400'},
    {id: '7', name: 'Duke Energy', amount: -80.77, category: 'Bills', date: 'Aug 8, 2:22 PM', icon: 'D', iconBg: 'bg-orange-400'},
    {id: '8', name: 'Door Dash', amount: -54.32, category: 'Food', date: 'Aug 12, 7:53 PM', icon: 'D', iconBg: 'bg-green-400'},
    {id: '9', name: 'Shell Gas Station', amount: -40.88, category: 'Auto', date: 'Yesterday, 5:53 PM', icon: 'S', iconBg: 'bg-cyan-400'},
    {id: '10', name: 'Netflix', amount: -12.45, category: 'Entertainment', date: 'Aug 13, 5:53 PM', icon: 'N', iconBg: 'bg-blue-400'}
  ];

  const totalSubscriptions = 4533.00;
  const overallProgress = 85;

  const handleGridClick = () => {
    console.log('Grid clicked');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <MobileHeader title="Subscriptions" showMenu showGrid onGridClick={handleGridClick} />
        <div className="flex-1 p-6 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
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
      <MobileHeader title="Subscriptions" showMenu showGrid onGridClick={handleGridClick} />

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

        {/* Subscription Summary Card */}
        <div className="bg-fuchsia-400 rounded-2xl p-6 text-white space-y-3">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-base font-semibold">Total Subscriptions</div>
            <div className="text-4xl font-bold">${totalSubscriptions.toFixed(2)}</div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold">Overall Progress</span>
              <span className="text-xs">{overallProgress}%</span>
            </div>
            <div className="bg-slate-200 border border-gray-600 rounded-full h-4 overflow-hidden">
              <div
                className="bg-fuchsia-700 border-r border-gray-600 h-full transition-all"
                style={{width: `${overallProgress}%`}}
              />
            </div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 rounded-md px-4 py-3">
            <h2 className="text-xl font-semibold text-white">Transactions</h2>
          </div>

          <div className="space-y-3">
            {mockSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3"
              >
                {/* Circular Icon */}
                <div className={`w-10 h-10 ${subscription.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-sm">{subscription.icon}</span>
                </div>

                {/* Transaction Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm">{subscription.name}</p>
                  <p className="text-xs text-slate-500">{subscription.category}</p>
                </div>

                {/* Amount */}
                <div className="text-right">
                  <p className="font-semibold text-slate-800 text-sm">
                    -${Math.abs(subscription.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Data Indicator */}
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

export default SubscriptionsPage;
