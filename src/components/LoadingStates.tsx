// Loading states and skeleton components
import React from 'react';
import { Loader2 } from 'lucide-react';

// Base loading spinner
export const LoadingSpinner: React.FC<{ 
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
    </div>
  );
};

// Full page loading
export const PageLoading: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <LoadingSpinner size="lg" />
      <p className="text-slate-600 text-sm">Loading...</p>
    </div>
  </div>
);

// Card skeleton
export const CardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

// Transaction list skeleton
export const TransactionListSkeleton: React.FC = () => (
  <div className="space-y-3">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="text-right space-y-2">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Chart skeleton
export const ChartSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
      <div className="flex justify-between">
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
        <div className="h-3 bg-gray-200 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Button loading state
export const LoadingButton: React.FC<{
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ loading, children, className = '', onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`flex items-center justify-center gap-2 ${className} ${
      disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
    }`}
  >
    {loading && <LoadingSpinner size="sm" />}
    {children}
  </button>
);

// Form loading state
export const FormLoading: React.FC<{ loading: boolean; children: React.ReactNode }> = ({ 
  loading, 
  children 
}) => (
  <div className={`relative ${loading ? 'pointer-events-none' : ''}`}>
    {children}
    {loading && (
      <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
        <LoadingSpinner />
      </div>
    )}
  </div>
);

// Table skeleton
export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 4 
}) => (
  <div className="bg-white rounded-xl border border-gray-200 animate-pulse">
    <div className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex gap-4">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded flex-1"></div>
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="h-3 bg-gray-200 rounded flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Dashboard skeleton
export const DashboardSkeleton: React.FC = () => (
  <div className="bg-slate-50 min-h-screen p-6 space-y-6">
    {/* Header skeleton */}
    <div className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
    </div>
    
    {/* Summary cards skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
    
    {/* Charts skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
    
    {/* Transaction list skeleton */}
    <TransactionListSkeleton />
  </div>
);

// Error boundary with loading state
export class ErrorBoundaryWithLoading extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; isLoading: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, isLoading: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, isLoading: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ hasError: false, isLoading: false });
    }, 1000);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-64 bg-slate-50 rounded-xl">
          <div className="text-center p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-slate-600 mb-4">
              We encountered an error loading this content.
            </p>
            <LoadingButton
              loading={this.state.isLoading}
              onClick={this.handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </LoadingButton>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for managing loading states
export const useLoadingState = (initialState = false) => {
  const [loading, setLoading] = React.useState(initialState);
  const [error, setError] = React.useState<string | null>(null);

  const startLoading = () => {
    setLoading(true);
    setError(null);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const setErrorState = (errorMessage: string) => {
    setLoading(false);
    setError(errorMessage);
  };

  const reset = () => {
    setLoading(false);
    setError(null);
  };

  return {
    loading,
    error,
    startLoading,
    stopLoading,
    setErrorState,
    reset
  };
};

// Higher-order component for loading states
export const withLoading = <P extends object>(
  Component: React.ComponentType<P>,
  LoadingComponent: React.ComponentType = LoadingSpinner
) => {
  return (props: P & { loading?: boolean }) => {
    if (props.loading) {
      return <LoadingComponent />;
    }
    return <Component {...props} />;
  };
};
