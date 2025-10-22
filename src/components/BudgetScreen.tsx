import React, {useState, useEffect} from 'react';

interface BudgetItem {
  id: string;
  title: string;
  amount: number;
  type: 'Income' | 'Expense' | 'Savings' | 'Debt';
  category: string;
  date: string;
  notes: string;
}

interface ActualsByCategory {
  [category: string]: {
    income: number;
    expense: number;
  };
}

interface BudgetSummary {
  planned: {
    income: number;
    expenses: number;
    savings: number;
    debt: number;
    remaining: number;
  };
  actual: {
    income: number;
    expenses: number;
    remaining: number;
  };
}

interface BudgetData {
  budgetPlan: BudgetItem[];
  actualsByCategory: ActualsByCategory;
  summary: BudgetSummary;
  period: {
    year: number;
    month: number;
    startDate: string;
    endDate: string;
  };
}

// Category color mapping - based on Tailwind 300 colors
const CATEGORY_COLORS: {[key: string]: {bg: string; text: string; border: string; accent: string}} = {
  // Housing & Utilities (Red/Orange/Yellow family)
  'Housing': {bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-300', accent: 'bg-red-300'},
  'Mortgage': {bg: 'bg-red-50', text: 'text-red-900', border: 'border-red-300', accent: 'bg-red-300'},
  'Utilities': {bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300', accent: 'bg-orange-300'},
  'Home': {bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-300', accent: 'bg-yellow-300'},
  'Home & Household': {bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-300', accent: 'bg-yellow-300'},

  // Living Expenses (Lime/Emerald/Cyan family)
  'George': {bg: 'bg-lime-50', text: 'text-lime-900', border: 'border-lime-300', accent: 'bg-lime-300'},
  'Food': {bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', accent: 'bg-emerald-300'},
  'Food & Dining': {bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', accent: 'bg-emerald-300'},
  'Auto': {bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-300', accent: 'bg-cyan-300'},
  'Transport': {bg: 'bg-cyan-50', text: 'text-cyan-900', border: 'border-cyan-300', accent: 'bg-cyan-300'},

  // Entertainment & Personal (Blue/Violet/Fuchsia family)
  'Entertainment': {bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-300', accent: 'bg-blue-300'},
  'Health': {bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-300', accent: 'bg-violet-300'},
  'Health & Medical': {bg: 'bg-violet-50', text: 'text-violet-900', border: 'border-violet-300', accent: 'bg-violet-300'},
  'Software': {bg: 'bg-fuchsia-50', text: 'text-fuchsia-900', border: 'border-fuchsia-300', accent: 'bg-fuchsia-300'},
  'Software & Tech': {bg: 'bg-fuchsia-50', text: 'text-fuchsia-900', border: 'border-fuchsia-300', accent: 'bg-fuchsia-300'},
  'Personal': {bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-300', accent: 'bg-pink-300'},
  'Personal Care': {bg: 'bg-pink-50', text: 'text-pink-900', border: 'border-pink-300', accent: 'bg-pink-300'},

  // Administrative (Neutral/Slate family)
  'Fees': {bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-300', accent: 'bg-slate-300'},
  'Fees & Charges': {bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-300', accent: 'bg-slate-300'},
  'Transfer Fee': {bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-300', accent: 'bg-slate-300'},
  'Bank Fees': {bg: 'bg-slate-50', text: 'text-slate-900', border: 'border-slate-300', accent: 'bg-slate-300'},
  'Uncategorized': {bg: 'bg-neutral-50', text: 'text-neutral-900', border: 'border-neutral-300', accent: 'bg-neutral-300'},

  // Income (Green)
  'Income': {bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-300', accent: 'bg-emerald-300'},

  // Legacy categories
  'Monthly Bills': {bg: 'bg-orange-50', text: 'text-orange-900', border: 'border-orange-300', accent: 'bg-orange-300'},
  'Business': {bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-300', accent: 'bg-yellow-300'},
};

const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS['Uncategorized'];
};

export const BudgetScreen: React.FC = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/notion?type=budget&year=${selectedYear}&month=${selectedMonth}`);
        if (!response.ok) {
          console.error('Failed to fetch budget data');
          return;
        }
        const data = await response.json();
        setBudgetData(data);
      } catch (error) {
        console.error('Error fetching budget:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [selectedMonth, selectedYear]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (planned: number, actual: number) => {
    if (actual === 0) return 'text-gray-500';
    const percentUsed = (actual / planned) * 100;
    if (percentUsed > 100) return 'text-red-600';
    if (percentUsed > 80) return 'text-yellow-600';
    return 'text-emerald-600';
  };

  const groupByCategory = () => {
    if (!budgetData) return {};

    const grouped: {[key: string]: {planned: number; actual: number; items: BudgetItem[]}} = {};

    budgetData.budgetPlan.forEach((item) => {
      if (item.type === 'Expense') {
        if (!grouped[item.category]) {
          grouped[item.category] = {
            planned: 0,
            actual: budgetData.actualsByCategory[item.category]?.expense || 0,
            items: [],
          };
        }
        grouped[item.category].planned += item.amount;
        grouped[item.category].items.push(item);
      }
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-700">Loading budget...</div>
      </div>
    );
  }

  if (!budgetData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-gray-700">No budget data available</div>
      </div>
    );
  }

  const {summary} = budgetData;
  const categoryGroups = groupByCategory();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Zero-Based Budget</h1>
          <p className="text-gray-600">Every dollar has a job</p>
        </div>

        {/* Month Selector */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <label className="text-gray-700 font-medium">Period:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:border-black focus:outline-none"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2025, i).toLocaleString('default', {month: 'long'})}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:border-black focus:outline-none"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>

        {/* Zero-Based Summary */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Zero-Based Budget Formula</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Income (Planned)</span>
              <span className="font-semibold text-emerald-600">{formatCurrency(summary.planned.income)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">− Expenses (Planned)</span>
              <span className="font-semibold text-red-600">{formatCurrency(summary.planned.expenses)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">− Savings (Planned)</span>
              <span className="font-semibold text-blue-600">{formatCurrency(summary.planned.savings)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">− Debt Payments (Planned)</span>
              <span className="font-semibold text-orange-600">{formatCurrency(summary.planned.debt)}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="text-lg font-bold text-black">= Remaining to Budget</span>
              <span className={`text-lg font-bold ${summary.planned.remaining === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(summary.planned.remaining)}
              </span>
            </div>
            {summary.planned.remaining === 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <span className="text-emerald-700 font-medium">✓ Budget Balanced! Every dollar has a job.</span>
              </div>
            )}
            {summary.planned.remaining !== 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                <span className="text-red-700 font-medium">
                  {summary.planned.remaining > 0
                    ? `⚠️ ${formatCurrency(summary.planned.remaining)} needs to be assigned`
                    : `⚠️ Over-budgeted by ${formatCurrency(Math.abs(summary.planned.remaining))}`
                  }
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Actual vs Planned */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-black mb-4">Actual Progress This Month</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Income (Actual)</span>
              <div className="text-right">
                <div className="font-semibold text-emerald-600">{formatCurrency(summary.actual.income)}</div>
                <div className="text-sm text-gray-500">
                  of {formatCurrency(summary.planned.income)} planned
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Expenses (Actual)</span>
              <div className="text-right">
                <div className="font-semibold text-red-600">{formatCurrency(summary.actual.expenses)}</div>
                <div className="text-sm text-gray-500">
                  of {formatCurrency(summary.planned.expenses)} planned
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h2 className="text-xl font-bold text-black mb-6">Category Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(categoryGroups).map(([category, data]) => {
              const remaining = data.planned - data.actual;
              const percentUsed = data.planned > 0 ? (data.actual / data.planned) * 100 : 0;
              const colors = getCategoryColor(category);

              return (
                <div key={category} className={`${colors.border} ${colors.bg} border-2 rounded-xl p-5 transition-all hover:shadow-md`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`font-bold text-lg ${colors.text}`}>{category}</h3>
                      <p className="text-sm text-gray-600 mt-1">{data.items.length} item{data.items.length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${getStatusColor(data.planned, data.actual)}`}>
                        {formatCurrency(data.actual)}
                      </div>
                      <div className="text-sm text-gray-600">
                        of {formatCurrency(data.planned)}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white rounded-full h-3 mb-3 shadow-inner">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        percentUsed > 100 ? 'bg-red-500' : percentUsed > 80 ? 'bg-yellow-500' : 'bg-emerald-500'
                      }`}
                      style={{width: `${Math.min(percentUsed, 100)}%`}}
                    />
                  </div>

                  <div className="flex justify-between text-sm mb-3">
                    <span className={`font-semibold ${colors.text}`}>{percentUsed.toFixed(0)}% used</span>
                    <span className={`font-semibold ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {remaining >= 0 ? formatCurrency(remaining) : `${formatCurrency(Math.abs(remaining))} over`} remaining
                    </span>
                  </div>

                  {/* Line Items */}
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                    {data.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm bg-white rounded-lg px-3 py-2">
                        <span className="text-gray-700">{item.title}</span>
                        <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
