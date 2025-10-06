import {useState} from 'react';
import {TrendingUp, TrendingDown, DollarSign, PieChart, Bot, CreditCard, Wallet, Target, ArrowUpRight, ArrowDownRight, Sparkles, MessageSquare, BarChart3, Plus} from 'lucide-react';
import {useFinanceData} from '../hooks/useFinanceData';

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

  const MetricCard = ({title, value, change, icon: Icon, trend}: {title: string, value: string, change: string, icon: any, trend: 'up' | 'down'}) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-black transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          <Icon size={24} className="text-black" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}</span>
        </div>
      </div>
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-black">{value}</p>
    </div>
  );

  const DashboardScreen = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black mb-2">Financial Overview</h1>
          <p className="text-gray-500">Your financial pulse at a glance</p>
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all">
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Balance" 
          value={`$${summary.profit.toLocaleString()}`}
          change="12.5%" 
          icon={Wallet} 
          trend="up"
        />
        <MetricCard 
          title="Income (Current)" 
          value={`$${summary.totalIncome.toLocaleString()}`}
          change="8.3%" 
          icon={TrendingUp} 
          trend="up"
        />
        <MetricCard 
          title="Expenses (Current)" 
          value={`$${summary.totalExpenses.toLocaleString()}`}
          change="3.2%" 
          icon={TrendingDown} 
          trend="down"
        />
        <MetricCard 
          title="Savings Rate" 
          value={`${summary.totalIncome > 0 ? ((summary.profit / summary.totalIncome) * 100).toFixed(0) : 0}%`}
          change="15%" 
          icon={Target} 
          trend="up"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-black mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                    <CreditCard size={20} className={transaction.type === 'income' ? 'text-emerald-600' : 'text-gray-600'} />
                  </div>
                  <div>
                    <p className="text-black font-medium">{transaction.name}</p>
                    <p className="text-gray-500 text-sm">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`text-lg font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-black'}`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-purple-400" />
            <h2 className="text-xl font-bold text-white">AI Insights</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/10 rounded-xl border border-white/20">
              <p className="text-gray-200 text-sm mb-3">
                Your current savings rate is {summary.totalIncome > 0 ? ((summary.profit / summary.totalIncome) * 100).toFixed(0) : 0}%. Great progress!
              </p>
              <button className="text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
                View Details →
              </button>
            </div>
          </div>
          <button 
            onClick={() => setShowAIChat(true)}
            className="w-full mt-6 bg-white text-black px-4 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
          >
            <Bot size={20} />
            Ask AI Assistant
          </button>
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
            <NavButton screen="budget" icon={Target} label="Budgets" />
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
        </div>
      </div>

      {showAIChat && <AIChat />}
    </div>
  );
};

export default FinancialDashboard;
