import {useState} from 'react';
import {TrendingUp, TrendingDown, DollarSign, PieChart, Bot, Wallet, Target, MessageSquare, BarChart3, Calculator, Link2} from 'lucide-react';
import {useFinanceData} from '../hooks/useFinanceData';
import {BudgetScreen} from './BudgetScreen';
import {PlaidConnect} from './PlaidConnect';

const FinancialDashboard = () => {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [showAIChat, setShowAIChat] = useState(false);
  const {transactions, summary, loading} = useFinanceData();

  const NavButton = ({screen, icon: Icon, label}: {screen: string, icon: any, label: string}) => (
    <button
      onClick={() => setActiveScreen(screen)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        activeScreen === screen
          ? 'bg-black text-white'
          : 'text-gray-600 hover:text-black hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // Get category color mapping
  const getCategoryColor = (category: string) => {
    const colorMap: {[key: string]: string} = {
      'Mortgage': 'bg-red-300',
      'Housing': 'bg-red-300',
      'Utilities': 'bg-orange-300',
      'Home & Household': 'bg-yellow-300',
      'Home': 'bg-yellow-300',
      'George': 'bg-lime-300',
      'Food': 'bg-emerald-300',
      'Food & Dining': 'bg-emerald-300',
      'Auto': 'bg-cyan-300',
      'Transport': 'bg-cyan-300',
      'Entertainment': 'bg-blue-300',
      'Health': 'bg-violet-300',
      'Health & Medical': 'bg-violet-300',
      'Software': 'bg-fuchsia-300',
      'Software & Tech': 'bg-fuchsia-300',
      'Personal': 'bg-pink-300',
      'Personal Care': 'bg-pink-300',
      'Fees': 'bg-slate-300',
      'Transfer Fee': 'bg-slate-300',
      'Bank Fees': 'bg-slate-300',
      'Income': 'bg-emerald-300',
    };
    return colorMap[category] || 'bg-neutral-300';
  };

  // Get upcoming subscriptions (recurring charges)
  const upcomingCharges = transactions.filter((t) => t.subscription && t.type === 'expense').slice(0, 5);

  const DashboardScreen = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black mb-1">Welcome Back, Beth</h1>
          <p className="text-gray-500">Here's your financial snapshot for {new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}</p>
        </div>
      </div>

      {/* Month Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Total Income</p>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-black mb-1">${summary.totalIncome.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Month to date</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
            <TrendingDown size={18} className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-black mb-1">${summary.totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Month to date</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-gray-600 text-sm font-medium">Remaining</p>
            <Wallet size={18} className={summary.profit >= 0 ? 'text-emerald-600' : 'text-red-600'} />
          </div>
          <p className={`text-3xl font-bold mb-1 ${summary.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${Math.abs(summary.profit).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">{summary.profit >= 0 ? 'Available' : 'Over budget'}</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-black">Recent Transactions</h2>
            <button className="text-sm text-gray-500 hover:text-black transition-colors">View All →</button>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 8).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${getCategoryColor(transaction.category)}`} />
                  <div>
                    <p className="text-black font-medium text-sm">{transaction.name}</p>
                    <p className="text-gray-500 text-xs">{transaction.category} • {new Date(transaction.date).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}</p>
                  </div>
                </div>
                <p className={`font-bold text-sm ${transaction.type === 'income' ? 'text-emerald-600' : 'text-black'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Charges */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h3 className="text-lg font-bold text-black mb-4">Upcoming Charges</h3>
            {upcomingCharges.length > 0 ? (
              <div className="space-y-3">
                {upcomingCharges.map((charge) => (
                  <div key={charge.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getCategoryColor(charge.category)}`} />
                      <div>
                        <p className="text-sm font-medium text-black">{charge.name}</p>
                        <p className="text-xs text-gray-500">{charge.category}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-black">${Math.abs(charge.amount).toFixed(0)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No recurring charges found</p>
            )}
          </div>

          {/* Budget Status */}
          <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 border border-emerald-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={20} className="text-emerald-600" />
              <h3 className="text-lg font-bold text-black">Budget Status</h3>
            </div>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-700">Monthly Progress</p>
                <p className="text-sm font-bold text-emerald-600">
                  {summary.totalIncome > 0 ? ((summary.totalExpenses / summary.totalIncome) * 100).toFixed(0) : 0}%
                </p>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{width: `${Math.min((summary.totalExpenses / summary.totalIncome) * 100, 100)}%`}}
                />
              </div>
            </div>
            <button
              onClick={() => setActiveScreen('budget')}
              className="w-full bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
            >
              View Full Budget
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AIChat = () => (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l border-gray-200 p-6 flex flex-col z-50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black">AI Assistant</h2>
            <p className="text-gray-500 text-sm">Your financial advisor</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAIChat(false)}
          className="text-gray-400 hover:text-black transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto mb-4">
        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4">
          <p className="text-gray-700">
            Hello! I've analyzed your finances from Notion. You have ${summary.totalIncome.toLocaleString()} in income and ${summary.totalExpenses.toLocaleString()} in expenses.
            Would you like specific recommendations?
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input 
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-gray-50 text-black rounded-xl px-4 py-3 border border-gray-200 focus:border-black focus:outline-none"
        />
        <button className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-all">
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-black text-2xl font-bold mb-2">Loading your finances...</div>
          <p className="text-gray-500">Syncing with Notion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-black rounded-lg">
                <DollarSign size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-black">FinanceAI</h1>
            </div>
            <p className="text-gray-500 text-sm">Intelligent money management</p>
          </div>

          <nav className="space-y-2">
            <NavButton screen="dashboard" icon={BarChart3} label="Dashboard" />
            <NavButton screen="budget" icon={Calculator} label="Budget" />
            <NavButton screen="plaid" icon={Link2} label="Connect Bank" />
            <NavButton screen="analytics" icon={PieChart} label="Analytics" />
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button 
              onClick={() => setShowAIChat(true)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              <Bot size={20} />
              <span className="font-medium">AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeScreen === 'dashboard' && <DashboardScreen />}
          {activeScreen === 'budget' && <BudgetScreen />}
          {activeScreen === 'plaid' && <PlaidConnect />}
        </div>
      </div>

      {showAIChat && <AIChat />}
    </div>
  );
};

export default FinancialDashboard;
