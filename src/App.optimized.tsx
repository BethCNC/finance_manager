// Code splitting and lazy loading configuration
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components for better performance
const DashboardPage = lazy(() => import('./components/DashboardPage'));
const TransactionsPage = lazy(() => import('./components/TransactionsPage'));
const BudgetPage = lazy(() => import('./components/BudgetPage'));
const SubscriptionsPage = lazy(() => import('./components/SubscriptionsPage'));
const AIAdvisorPage = lazy(() => import('./components/AIAdvisorPage'));
const AccountsPage = lazy(() => import('./components/AccountsPage'));
const GoalsPage = lazy(() => import('./components/GoalsPage'));
const ReportsPageWrapper = lazy(() => import('./components/ReportsPageWrapper'));
const NotificationsPage = lazy(() => import('./components/NotificationsPage'));

// Loading component for Suspense fallback
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-slate-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Error boundary for lazy-loaded components
class LazyLoadErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy load error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="text-center p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-600 mb-4">
              Failed to load this page. Please try refreshing.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// App layout with lazy loading
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <LazyLoadErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {children}
        </Suspense>
      </LazyLoadErrorBoundary>
    </div>
  );
};

// Main App component with code splitting
const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <DashboardPage />
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
            <BudgetPage />
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
        path="/advisor"
        element={
          <AppLayout>
            <AIAdvisorPage />
          </AppLayout>
        }
      />
      <Route
        path="/accounts"
        element={
          <AppLayout>
            <AccountsPage />
          </AppLayout>
        }
      />
      <Route
        path="/goals"
        element={
          <AppLayout>
            <GoalsPage />
          </AppLayout>
        }
      />
      <Route
        path="/reports"
        element={
          <AppLayout>
            <ReportsPageWrapper />
          </AppLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <AppLayout>
            <NotificationsPage />
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
