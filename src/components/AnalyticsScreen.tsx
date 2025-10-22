import React, {useMemo} from 'react';
import {ArrowDownRight, ArrowUpRight, Repeat, Users2} from 'lucide-react';
import {FinanceTransaction, FinanceSummary} from '../hooks/useFinanceData';

interface AnalyticsScreenProps {
  transactions: FinanceTransaction[];
  summary: FinanceSummary;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
};

const getMonthLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }
  return date.toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
};

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({transactions, summary}) => {
  const expenses = useMemo(() => transactions.filter((transaction) => transaction.type === 'expense'), [transactions]);

  const categoryBreakdown = useMemo(() => {
    const totals: {[category: string]: {amount: number; count: number}} = {};
    expenses.forEach((transaction) => {
      if (!totals[transaction.category]) {
        totals[transaction.category] = {amount: 0, count: 0};
      }
      totals[transaction.category].amount += Math.abs(transaction.amount);
      totals[transaction.category].count += 1;
    });
    return Object.entries(totals)
      .map(([category, data]) => ({category, ...data}))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [expenses]);

  const monthlyTrend = useMemo(() => {
    const totals: {[key: string]: {income: number; expense: number; sampleDate: string}} = {};
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      if (Number.isNaN(date.getTime())) {
        return;
      }
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!totals[key]) {
        totals[key] = {income: 0, expense: 0, sampleDate: transaction.date};
      }
      if (transaction.type === 'income') {
        totals[key].income += Math.abs(transaction.amount);
      } else {
        totals[key].expense += Math.abs(transaction.amount);
      }
    });
    return Object.values(totals)
      .sort((a, b) => new Date(a.sampleDate).getTime() - new Date(b.sampleDate).getTime())
      .slice(-6);
  }, [transactions]);

  const subscriptionExpenses = useMemo(() => {
    return expenses.filter((transaction) => transaction.subscription).slice(0, 5);
  }, [expenses]);

  const personBreakdown = useMemo(() => {
    const totals: {[person: string]: number} = {};
    expenses.forEach((transaction) => {
      if (!transaction.person) {
        return;
      }
      if (!totals[transaction.person]) {
        totals[transaction.person] = 0;
      }
      totals[transaction.person] += Math.abs(transaction.amount);
    });
    return Object.entries(totals)
      .map(([person, amount]) => ({person, amount}))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black">Spending Analytics</h1>
          <p className="text-gray-500">Trends and insights generated from your connected Notion databases</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Income</p>
              <ArrowUpRight size={18} className="text-emerald-600" />
            </div>
            <p className="text-3xl font-bold text-black">{formatCurrency(summary.totalIncome)}</p>
            <p className="text-xs text-gray-500">Last 20 records</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
              <ArrowDownRight size={18} className="text-red-600" />
            </div>
            <p className="text-3xl font-bold text-black">{formatCurrency(summary.totalExpenses)}</p>
            <p className="text-xs text-gray-500">Last 20 records</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm font-medium">Net Position</p>
              <ArrowUpRight size={18} className={summary.profit >= 0 ? 'text-emerald-600' : 'text-red-600'} />
            </div>
            <p className={`text-3xl font-bold ${summary.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {formatCurrency(summary.profit)}
            </p>
            <p className="text-xs text-gray-500">Income minus expenses</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-black">Category Insights</h2>
            <p className="text-sm text-gray-500">Top spending areas</p>
          </div>
          <div className="space-y-3">
            {categoryBreakdown.length === 0 && (
              <p className="text-sm text-gray-500">We do not have enough transactions to calculate category insights yet.</p>
            )}
            {categoryBreakdown.map((item) => {
              const percent = summary.totalExpenses > 0 ? Math.round((item.amount / summary.totalExpenses) * 100) : 0;
              return (
                <div key={item.category} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-black">{item.category}</p>
                      <p className="text-xs text-gray-500">{item.count} transactions</p>
                    </div>
                    <p className="text-sm font-bold text-black">{formatCurrency(item.amount)}</p>
                  </div>
                  <div className="mt-3">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-black rounded-full"
                        style={{width: `${Math.min(percent, 100)}%`}}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{percent}% of tracked expenses</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Repeat size={18} className="text-black" />
              <h2 className="text-lg font-bold text-black">Recurring Subscriptions</h2>
            </div>
            {subscriptionExpenses.length === 0 ? (
              <p className="text-sm text-gray-500">No subscriptions detected in the recent transactions.</p>
            ) : (
              <div className="space-y-3">
                {subscriptionExpenses.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-black">{transaction.name}</p>
                      <p className="text-xs text-gray-500">{transaction.category}</p>
                    </div>
                    <p className="text-sm font-bold text-black">{formatCurrency(Math.abs(transaction.amount))}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users2 size={18} className="text-black" />
              <h2 className="text-lg font-bold text-black">Spending by Person</h2>
            </div>
            {personBreakdown.length === 0 ? (
              <p className="text-sm text-gray-500">Add the Person property in Notion to see per-person insights.</p>
            ) : (
              <div className="space-y-3">
                {personBreakdown.map((entry) => (
                  <div key={entry.person} className="flex items-center justify-between">
                    <p className="text-sm font-medium text-black">{entry.person}</p>
                    <p className="text-sm font-bold text-black">{formatCurrency(entry.amount)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-black">Six Month Trend</h2>
          <p className="text-sm text-gray-500">Income vs expenses</p>
        </div>
        {monthlyTrend.length === 0 ? (
          <p className="text-sm text-gray-500">We need more dated transactions to build this trend.</p>
        ) : (
          <div className="space-y-3">
            {monthlyTrend.map((entry) => (
              <div key={entry.sampleDate} className="flex flex-col gap-2 border border-gray-100 rounded-xl p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-black">{getMonthLabel(entry.sampleDate)}</p>
                  <p className="text-xs text-gray-500">Income vs expenses</p>
                </div>
                <div className="grid grid-cols-2 gap-3 md:w-1/2">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-emerald-600 font-medium uppercase">Income</p>
                    <p className="text-sm font-semibold text-black">{formatCurrency(entry.income)}</p>
                  </div>
                  <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                    <p className="text-xs text-rose-600 font-medium uppercase">Expenses</p>
                    <p className="text-sm font-semibold text-black">{formatCurrency(entry.expense)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsScreen;
