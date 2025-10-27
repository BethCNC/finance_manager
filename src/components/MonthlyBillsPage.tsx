import React from 'react';
import {useFinanceData} from '../hooks/useFinanceData';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import {Home, Zap, Droplets, Wifi, Smartphone} from 'lucide-react';

interface Bill {
  id: string;
  type: string;
  merchant: string;
  amount: number;
  date: string;
  icon: React.ComponentType<any>;
}

/**
 * Monthly Bills Page Component
 * Based on Figma design: node-id=304:4422
 *
 * Features:
 * - Colorful bar chart placeholder with orange border
 * - Dark slate header for "Monthly Bills"
 * - Grid layout of bill cards (2 columns + full width)
 * - Orange-bordered cards with beige background
 * - Circular orange icons for each bill category
 */
const MonthlyBillsPage: React.FC = () => {
  const {transactions, loading} = useFinanceData();

  // Mock bills data matching Figma design
  const monthlyBills: Bill[] = [
    {id: '1', type: 'Mortgage', merchant: 'Truist Bank', amount: -1800.00, date: 'Aug 1, 8:53 PM', icon: Home},
    {id: '2', type: 'Bills', merchant: 'Duke Energy', amount: -80.77, date: 'Aug 8, 2:22 PM', icon: Zap},
    {id: '3', type: 'Utilities - Water', merchant: 'Town of Wingate', amount: -32.00, date: 'Aug 8, 2:22 PM', icon: Droplets},
    {id: '4', type: 'Internet', merchant: 'Kinetic', amount: -80.00, date: 'Aug 8, 2:22 PM', icon: Wifi},
    {id: '5', type: 'Cell Phone', merchant: 'Verizon', amount: -120.00, date: 'Aug 8, 2:22 PM', icon: Smartphone}
  ];

  const handleGridClick = () => {
    console.log('Grid clicked');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <MobileHeader title="Monthly Bills" showMenu showGrid onGridClick={handleGridClick} />
        <div className="flex-1 p-6 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="h-48 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-200 rounded"></div>
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
      <MobileHeader title="Monthly Bills" showMenu showGrid onGridClick={handleGridClick} />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">

        {/* Colorful Bar Chart Placeholder */}
        <div className="bg-white border-2 border-orange-500 rounded-lg p-6">
          <div className="flex items-end justify-between h-40 gap-2">
            {/* Placeholder bars with various colors matching Figma */}
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-pink-300 rounded-t" style={{height: '40%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-orange-300 rounded-t" style={{height: '70%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-yellow-300 rounded-t" style={{height: '30%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-lime-300 rounded-t" style={{height: '85%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-emerald-300 rounded-t" style={{height: '50%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-cyan-300 rounded-t" style={{height: '100%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-blue-300 rounded-t" style={{height: '25%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-violet-300 rounded-t" style={{height: '60%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-purple-300 rounded-t" style={{height: '75%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-pink-300 rounded-t" style={{height: '90%'}} />
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-pink-200 rounded-t" style={{height: '65%'}} />
            </div>
          </div>
        </div>

        {/* Monthly Bills Section */}
        <div className="space-y-3">
          <div className="bg-slate-700 rounded-md px-4 py-3">
            <h2 className="text-xl font-semibold text-white">Monthly Bills</h2>
          </div>

          {/* Bills Grid */}
          <div className="grid grid-cols-2 gap-3">
            {monthlyBills.slice(0, 4).map((bill) => {
              const IconComponent = bill.icon;
              return (
                <div
                  key={bill.id}
                  className="bg-orange-50 border-2 border-orange-500 rounded-lg p-3 flex flex-col gap-2"
                >
                  {/* Icon */}
                  <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center">
                    <IconComponent size={18} className="text-orange-600" />
                  </div>

                  {/* Category and Date */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">{bill.type}</p>
                    <p className="text-xs text-slate-400">{bill.date}</p>
                  </div>

                  {/* Merchant and Amount */}
                  <div className="flex flex-col items-end gap-1 mt-auto">
                    <p className="text-base font-semibold text-slate-600">{bill.merchant}</p>
                    <p className="text-base font-semibold text-slate-600">
                      -${Math.abs(bill.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Width Card */}
          {monthlyBills.length > 4 && (
            <div className="bg-orange-50 border-2 border-orange-500 rounded-lg p-3 flex gap-3">
              {/* Icon */}
              <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center flex-shrink-0">
                <Smartphone size={18} className="text-orange-600" />
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-xs text-slate-400">{monthlyBills[4].type}</p>
                <p className="text-xs text-slate-400">{monthlyBills[4].date}</p>
              </div>

              {/* Merchant and Amount */}
              <div className="flex flex-col items-end gap-1">
                <p className="text-base font-semibold text-slate-600">{monthlyBills[4].merchant}</p>
                <p className="text-base font-semibold text-slate-600">
                  -${Math.abs(monthlyBills[4].amount).toFixed(2)}
                </p>
              </div>
            </div>
          )}
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

export default MonthlyBillsPage;
