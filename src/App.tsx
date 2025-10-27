import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Menu} from 'lucide-react';
import FinancialDashboard from './components/FinancialDashboard';
import DashboardPage from './components/DashboardPage';
import {BudgetScreen} from './components/BudgetScreen';
import BudgetPage from './components/BudgetPage';
import AccountsScreen from './components/AccountsScreen';
import AccountsPage from './components/AccountsPage';
import TransactionsPage from './components/TransactionsPage';
import AIAdvisorPage from './components/AIAdvisorPage';
import SubscriptionsPage from './components/SubscriptionsPage';
import GoalsPage from './components/GoalsPage';
import ReportsPageWrapper from './components/ReportsPageWrapper';
import NotificationsPage from './components/NotificationsPage';
import MonthlyBillsPage from './components/MonthlyBillsPage';
import {AIDataProcessor} from './components/AIDataProcessor';
import BottomNav from './components/BottomNav';
import MenuDrawer from './components/MenuDrawer';
import TextSpecimens from './components/TextSpecimens';
import ColorSpecimens from './components/ColorSpecimens';
import ButtonTest from './components/ButtonTest';

// Final 8 Pages - All components built and integrated

function AppLayout({children}: {children: React.ReactNode}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Top bar with menu button */}
      <div className="fixed top-0 left-0 right-0 bg-slate-100 border-b border-slate-200 z-30">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-black">Finance Manager</h1>
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-slate-300 transition-colors"
          >
            <Menu size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Main content with top padding */}
      <div className="pt-14">{children}</div>

      {/* Bottom navigation */}
      <BottomNav />

      {/* Menu drawer */}
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Specimen routes without layout */}
        <Route path="/specimens/text" element={<TextSpecimens />} />
        <Route path="/specimens/color" element={<ColorSpecimens />} />
        <Route path="/specimens/button" element={<ButtonTest />} />
        <Route path="/test/button" element={<ButtonTest />} />

        {/* Final 8 Pages - Main App Routes */}
        {/* Dashboard - Homepage */}
        <Route
          path="/"
          element={<DashboardPage />}
        />
        {/* Accounts */}
        <Route
          path="/accounts"
          element={
            <AppLayout>
              <AccountsPage />
            </AppLayout>
          }
        />
        {/* Transactions */}
        <Route
          path="/transactions"
          element={<TransactionsPage />}
        />
        {/* Advisor */}
        <Route
          path="/advisor"
          element={
            <AppLayout>
              <AIAdvisorPage />
            </AppLayout>
          }
        />
        {/* Budget */}
        <Route
          path="/budget"
          element={<BudgetPage />}
        />
        {/* Budget Legacy */}
        <Route
          path="/budget-legacy"
          element={
            <AppLayout>
              <BudgetScreen />
            </AppLayout>
          }
        />
        {/* Subscriptions */}
        <Route
          path="/subscriptions"
          element={<SubscriptionsPage />}
        />
        {/* Goals */}
        <Route
          path="/goals"
          element={
            <AppLayout>
              <GoalsPage />
            </AppLayout>
          }
        />
        {/* Reports */}
        <Route
          path="/reports"
          element={
            <AppLayout>
              <ReportsPageWrapper />
            </AppLayout>
          }
        />
        {/* Notifications */}
        <Route
          path="/notifications"
          element={
            <AppLayout>
              <NotificationsPage />
            </AppLayout>
          }
        />
        {/* Monthly Bills */}
        <Route
          path="/monthly-bills"
          element={<MonthlyBillsPage />}
        />

        {/* Legacy/Development Routes */}
        <Route
          path="/dashboard-legacy"
          element={<FinancialDashboard />}
        />
        <Route
          path="/accounts-legacy"
          element={<AccountsScreen />}
        />
        <Route
          path="/ai-processor"
          element={<AIDataProcessor />}
        />
      </Routes>
    </Router>
  );
}

export default App;
