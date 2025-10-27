import React, {useState, useEffect} from 'react';
import {useFinanceData} from '../hooks/useFinanceData';
import {MobileHeader} from './MobileHeader';
import BottomNav from './BottomNav';
import {TrendingUp, TrendingDown, Check} from 'lucide-react';

interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  category: string;
  subscription?: boolean;
  business?: boolean;
  account?: string;
  person?: string;
  icon: string;
  iconBg: string;
}

interface Tab {
  id: string;
  label: string;
  active: boolean;
  variant?: 'selected' | 'purple' | 'default';
}

interface CategoryChip {
  id: string;
  label: string;
}

/**
 * Transactions Page Component
 * Based on Figma design: node-id=46:18446
 *
 * Displays transaction history with filtering and summary cards
 *
 * Features:
 * - Tab navigation (Beth, Bryan, Account)
 * - Income/Spent summary cards
 * - Category chip filters
 * - Transaction list with merchant icons
 */
const TransactionsPage = () => {
  const {transactions, loading} = useFinanceData();
  const [activeTab, setActiveTab] = useState('beth');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('label');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);

  // Tabs
  const tabs: Tab[] = [
    {id: 'beth', label: 'Beth', active: true, variant: 'selected'},
    {id: 'bryan', label: 'Bryan', active: false, variant: 'purple'},
    {id: 'account1', label: 'Account', active: false, variant: 'default'},
    {id: 'account2', label: 'Account', active: false, variant: 'default'},
    {id: 'account3', label: 'Account', active: false, variant: 'default'},
  ];

  // Category chips
  const categoryChips: CategoryChip[] = [
    {id: 'label', label: 'Label'},
    {id: 'bills', label: 'Bills'},
    {id: 'label2', label: 'Label'},
    {id: 'label3', label: 'Label'},
    {id: 'label4', label: 'Label'},
  ];

  // Mock transactions with colorful icons matching Figma
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      name: 'Shell Gas Station',
      amount: -40.88,
      date: 'Yesterday, 5:53 PM',
      type: 'expense',
      category: 'Auto',
      icon: 'S',
      iconBg: 'bg-cyan-400',
      person: 'Beth'
    },
    {
      id: '2',
      name: 'Netflix',
      amount: -12.45,
      date: 'Aug 13, 5:53 PM',
      type: 'expense',
      category: 'Entertainment',
      icon: 'N',
      iconBg: 'bg-blue-400',
      subscription: true,
      person: 'Beth'
    },
    {
      id: '3',
      name: 'Chat GPT Plus',
      amount: -19.99,
      date: 'Aug 23, 5:53 PM',
      type: 'expense',
      category: 'Software',
      icon: 'C',
      iconBg: 'bg-purple-400',
      subscription: true,
      person: 'Bryan'
    },
    {
      id: '4',
      name: 'Indian Trail Vet',
      amount: -74.33,
      date: 'Aug 2, 5:53 PM',
      type: 'expense',
      category: 'George',
      icon: 'I',
      iconBg: 'bg-lime-400',
      person: 'Beth'
    },
    {
      id: '5',
      name: 'Atrium Health',
      amount: -60.00,
      date: 'Aug 15, 5:53 PM',
      type: 'expense',
      category: 'Health',
      icon: 'A',
      iconBg: 'bg-violet-400',
      person: 'Bryan'
    },
    {
      id: '6',
      name: 'Truist Bank',
      amount: -1800.00,
      date: 'Aug 1, 8:53 PM',
      type: 'expense',
      category: 'Mortgage',
      icon: 'T',
      iconBg: 'bg-red-400',
      person: 'Joint'
    },
    {
      id: '7',
      name: 'Duke Energy',
      amount: -80.77,
      date: 'Aug 8, 2:22 PM',
      type: 'expense',
      category: 'Bills',
      icon: 'D',
      iconBg: 'bg-orange-400',
      person: 'Joint'
    },
    {
      id: '8',
      name: 'Door Dash',
      amount: -54.32,
      date: 'Aug 12, 7:53 PM',
      type: 'expense',
      category: 'Food',
      icon: 'D',
      iconBg: 'bg-green-400',
      person: 'Beth'
    },
    {
      id: '9',
      name: 'Shell Gas Station',
      amount: -40.88,
      date: 'Yesterday, 5:53 PM',
      type: 'expense',
      category: 'Auto',
      icon: 'S',
      iconBg: 'bg-cyan-400',
      person: 'Beth'
    },
    {
      id: '10',
      name: 'Netflix',
      amount: -12.45,
      date: 'Aug 13, 5:53 PM',
      type: 'expense',
      category: 'Entertainment',
      icon: 'N',
      iconBg: 'bg-blue-400',
      subscription: true,
      person: 'Beth'
    },
    {
      id: '11',
      name: 'Chat GPT Plus',
      amount: -19.99,
      date: 'Aug 23, 5:53 PM',
      type: 'expense',
      category: 'Software',
      icon: 'C',
      iconBg: 'bg-purple-400',
      subscription: true,
      person: 'Bryan'
    }
  ];

  // Process and filter transactions
  useEffect(() => {
    let filtered = mockTransactions;

    if (activeTab === 'beth') {
      filtered = mockTransactions.filter((t) => t.person === 'Beth');
    } else if (activeTab === 'bryan') {
      filtered = mockTransactions.filter((t) => t.person === 'Bryan');
    }

    setFilteredTransactions(filtered);
  }, [activeTab]);

  // Calculate summary
  const calculateSummary = () => {
    const income = 4260.24; // Mock data
    const spent = 205.63; // Mock data
    return {income, spent};
  };

  const {income, spent} = calculateSummary();

  const handleGridClick = () => {
    console.log('Grid clicked');
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col">
        <MobileHeader title="Transactions" showMenu showGrid onGridClick={handleGridClick} />
        <div className="flex-1 p-6 pb-24">
          <div className="animate-pulse space-y-6">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded w-20"></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
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
      <MobileHeader title="Transactions" showMenu showGrid onGridClick={handleGridClick} />

      {/* Main Content */}
      <div className="flex-1 p-6 pb-24 space-y-6">

        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('beth')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'beth'
                ? 'bg-white text-black border border-gray-300'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            Beth {activeTab === 'beth' && <Check size={14} />}
          </button>
          <button
            onClick={() => setActiveTab('bryan')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap ${
              activeTab === 'bryan'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-100 text-gray-700 border border-gray-200'
            }`}
          >
            Bryan
          </button>
          {['Account', 'Account', 'Account'].map((label, idx) => (
            <button
              key={idx}
              className="px-4 py-1.5 rounded-md text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-700 border border-gray-200"
            >
              {label}
            </button>
          ))}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          {/* Income Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-sm font-medium text-gray-700">Income</span>
            </div>
            <p className="text-2xl font-bold text-black">
              ${income.toFixed(2)}
            </p>
          </div>

          {/* Spent Card */}
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-red-600" />
              <span className="text-sm font-medium text-gray-700">Spent</span>
            </div>
            <p className="text-2xl font-bold text-black">
              -${spent.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categoryChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveCategoryFilter(chip.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategoryFilter === chip.id
                  ? 'bg-slate-700 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Transaction List */}
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="bg-white rounded-xl p-4 border border-gray-200 flex items-center gap-3"
            >
              {/* Merchant Icon */}
              <div className={`w-12 h-12 ${transaction.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-lg">
                  {transaction.icon}
                </span>
              </div>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-black text-base">
                  {transaction.name}
                </p>
                <p className="text-sm text-gray-500">
                  {transaction.category}
                </p>
              </div>

              {/* Amount and Date */}
              <div className="text-right">
                <p className="font-semibold text-black text-base">
                  -${Math.abs(transaction.amount).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  {transaction.date}
                </p>
              </div>
            </div>
          ))}
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

export default TransactionsPage;
