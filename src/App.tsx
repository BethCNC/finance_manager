import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Menu} from 'lucide-react';
import FinancialDashboard from './components/FinancialDashboard';
import {BudgetScreen} from './components/BudgetScreen';
import BottomNav from './components/BottomNav';
import MenuDrawer from './components/MenuDrawer';
import TextSpecimens from './components/TextSpecimens';
import ColorSpecimens from './components/ColorSpecimens';
import ButtonShowcase from './components/ButtonShowcase';
import ButtonTest from './components/ButtonTest';

// Placeholder components for routes
const TransactionsPage = () => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Transactions</h1>
      <p className="text-gray-700">Transaction list coming soon...</p>
    </div>
  </div>
);

const AdvisorPage = () => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">AI Advisor</h1>
      <p className="text-gray-700">AI financial advisor coming soon...</p>
    </div>
  </div>
);

const SubscriptionsPage = () => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Subscriptions</h1>
      <p className="text-gray-700">Subscription management coming soon...</p>
    </div>
  </div>
);

const BillsPage = () => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Bills</h1>
      <p className="text-gray-700">Bill tracking coming soon...</p>
    </div>
  </div>
);

const SettingsPage = () => (
  <div className="min-h-screen bg-gray-50 pb-24">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Settings</h1>
      <p className="text-gray-700">Settings coming soon...</p>
    </div>
  </div>
);

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
        <Route path="/specimens/button" element={<ButtonShowcase />} />
        <Route path="/test/button" element={<ButtonTest />} />

        {/* Main app routes with layout */}
        <Route
          path="/"
          element={
            <AppLayout>
              <FinancialDashboard />
            </AppLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <AppLayout>
              <TransactionsPage />
            </AppLayout>
          }
        />
        <Route
          path="/budget"
          element={
            <AppLayout>
              <BudgetScreen />
            </AppLayout>
          }
        />
        <Route
          path="/advisor"
          element={
            <AppLayout>
              <AdvisorPage />
            </AppLayout>
          }
        />
        <Route
          path="/subscriptions"
          element={
            <AppLayout>
              <SubscriptionsPage />
            </AppLayout>
          }
        />
        <Route
          path="/bills"
          element={
            <AppLayout>
              <BillsPage />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
