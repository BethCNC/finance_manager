// Comprehensive error handling and retry logic service
interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  errorBoundary?: string;
  timestamp: string;
  userId?: string;
  sessionId?: string;
  url: string;
  userAgent: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'network' | 'validation' | 'authentication' | 'authorization' | 'business' | 'system' | 'unknown';
  context?: Record<string, any>;
}

interface RetryConfig {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableErrors: string[];
}

interface ErrorHandlerConfig {
  enableReporting: boolean;
  enableRetry: boolean;
  enableFallback: boolean;
  reportEndpoint: string;
  retryConfig: RetryConfig;
}

class ErrorHandler {
  private config: ErrorHandlerConfig;
  private errorQueue: ErrorInfo[] = [];
  private retryQueue: Map<string, number> = new Map();

  constructor(config: ErrorHandlerConfig) {
    this.config = config;
    this.initializeGlobalHandlers();
  }

  private initializeGlobalHandlers(): void {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.handleError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        severity: 'high',
        category: 'system'
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        severity: 'high',
        category: 'system'
      });
    });
  }

  // Main error handling method
  public handleError(errorInfo: Partial<ErrorInfo>): void {
    const fullErrorInfo: ErrorInfo = {
      message: errorInfo.message || 'Unknown error',
      stack: errorInfo.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: errorInfo.errorBoundary,
      timestamp: errorInfo.timestamp || new Date().toISOString(),
      userId: errorInfo.userId,
      sessionId: errorInfo.sessionId,
      url: errorInfo.url || window.location.href,
      userAgent: errorInfo.userAgent || navigator.userAgent,
      severity: errorInfo.severity || 'medium',
      category: errorInfo.category || 'unknown',
      context: errorInfo.context
    };

    // Log error locally
    console.error('Error handled:', fullErrorInfo);

    // Add to queue for reporting
    this.errorQueue.push(fullErrorInfo);

    // Report error if enabled
    if (this.config.enableReporting) {
      this.reportError(fullErrorInfo);
    }

    // Show user-friendly error message
    this.showUserError(fullErrorInfo);
  }

  // Report error to monitoring service
  private async reportError(errorInfo: ErrorInfo): Promise<void> {
    try {
      const response = await fetch(this.config.reportEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorInfo)
      });

      if (!response.ok) {
        console.error('Failed to report error:', response.statusText);
      }
    } catch (error) {
      console.error('Error reporting failed:', error);
    }
  }

  // Show user-friendly error message
  private showUserError(errorInfo: ErrorInfo): void {
    const errorMessage = this.getUserFriendlyMessage(errorInfo);
    
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="error-content">
        <h3>Something went wrong</h3>
        <p>${errorMessage}</p>
        <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #fee;
      border: 1px solid #fcc;
      border-radius: 8px;
      padding: 16px;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, 10000);
  }

  // Get user-friendly error message
  private getUserFriendlyMessage(errorInfo: ErrorInfo): string {
    switch (errorInfo.category) {
      case 'network':
        return 'Network connection issue. Please check your internet connection and try again.';
      case 'authentication':
        return 'Authentication failed. Please log in again.';
      case 'authorization':
        return 'You don\'t have permission to perform this action.';
      case 'validation':
        return 'Please check your input and try again.';
      case 'business':
        return 'Unable to complete this action. Please try again later.';
      case 'system':
        return 'A system error occurred. Please refresh the page and try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  // Retry logic for failed operations
  public async retry<T>(
    operation: () => Promise<T>,
    operationId: string,
    customConfig?: Partial<RetryConfig>
  ): Promise<T> {
    const config = { ...this.config.retryConfig, ...customConfig };
    const attempts = this.retryQueue.get(operationId) || 0;

    if (attempts >= config.maxAttempts) {
      this.retryQueue.delete(operationId);
      throw new Error(`Operation failed after ${config.maxAttempts} attempts`);
    }

    try {
      const result = await operation();
      this.retryQueue.delete(operationId);
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'Unknown error';
      
      // Check if error is retryable
      if (!config.retryableErrors.some(retryableError => 
        errorMessage.toLowerCase().includes(retryableError.toLowerCase())
      )) {
        this.retryQueue.delete(operationId);
        throw error;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffMultiplier, attempts),
        config.maxDelay
      );

      this.retryQueue.set(operationId, attempts + 1);

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));

      // Retry the operation
      return this.retry(operation, operationId, customConfig);
    }
  }

  // Circuit breaker pattern for failing services
  private circuitBreakers: Map<string, { failures: number; lastFailure: number; state: 'closed' | 'open' | 'half-open' }> = new Map();

  public async withCircuitBreaker<T>(
    operation: () => Promise<T>,
    serviceName: string,
    failureThreshold: number = 5,
    timeout: number = 60000
  ): Promise<T> {
    const breaker = this.circuitBreakers.get(serviceName) || {
      failures: 0,
      lastFailure: 0,
      state: 'closed' as const
    };

    // Check if circuit is open
    if (breaker.state === 'open') {
      if (Date.now() - breaker.lastFailure > timeout) {
        breaker.state = 'half-open';
      } else {
        throw new Error(`Circuit breaker is open for ${serviceName}`);
      }
    }

    try {
      const result = await operation();
      
      // Reset circuit breaker on success
      if (breaker.state === 'half-open') {
        breaker.state = 'closed';
        breaker.failures = 0;
      }
      
      return result;
    } catch (error) {
      breaker.failures++;
      breaker.lastFailure = Date.now();
      
      if (breaker.failures >= failureThreshold) {
        breaker.state = 'open';
      }
      
      this.circuitBreakers.set(serviceName, breaker);
      throw error;
    }
  }

  // Fallback mechanisms
  public async withFallback<T>(
    primaryOperation: () => Promise<T>,
    fallbackOperation: () => Promise<T>,
    fallbackCondition?: (error: Error) => boolean
  ): Promise<T> {
    try {
      return await primaryOperation();
    } catch (error: any) {
      if (fallbackCondition && !fallbackCondition(error)) {
        throw error;
      }

      try {
        return await fallbackOperation();
      } catch (fallbackError) {
        // If fallback also fails, throw the original error
        throw error;
      }
    }
  }

  // Timeout wrapper
  public async withTimeout<T>(
    operation: () => Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Operation timed out after ${timeoutMs}ms`));
        }, timeoutMs);
      })
    ]);
  }

  // Validation error handler
  public handleValidationError(field: string, message: string): void {
    this.handleError({
      message: `Validation error in ${field}: ${message}`,
      severity: 'low',
      category: 'validation',
      context: { field, validationMessage: message }
    });
  }

  // Network error handler
  public handleNetworkError(error: Error, url: string): void {
    this.handleError({
      message: `Network error for ${url}: ${error.message}`,
      stack: error.stack,
      severity: 'medium',
      category: 'network',
      context: { url, networkError: error.message }
    });
  }

  // API error handler
  public handleApiError(error: Error, endpoint: string, statusCode?: number): void {
    this.handleError({
      message: `API error for ${endpoint}: ${error.message}`,
      stack: error.stack,
      severity: statusCode && statusCode >= 500 ? 'high' : 'medium',
      category: 'network',
      context: { endpoint, statusCode, apiError: error.message }
    });
  }

  // Get error statistics
  public getErrorStats(): { total: number; byCategory: Record<string, number>; bySeverity: Record<string, number> } {
    const stats = {
      total: this.errorQueue.length,
      byCategory: {} as Record<string, number>,
      bySeverity: {} as Record<string, number>
    };

    this.errorQueue.forEach(error => {
      stats.byCategory[error.category] = (stats.byCategory[error.category] || 0) + 1;
      stats.bySeverity[error.severity] = (stats.bySeverity[error.severity] || 0) + 1;
    });

    return stats;
  }

  // Clear error queue
  public clearErrors(): void {
    this.errorQueue = [];
  }
}

// React Error Boundary
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error; retry: () => void }> }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorHandler = new ErrorHandler({
      enableReporting: true,
      enableRetry: true,
      enableFallback: true,
      reportEndpoint: '/api/error-reporting',
      retryConfig: {
        maxAttempts: 3,
        baseDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2,
        retryableErrors: ['network', 'timeout', 'server']
      }
    });

    errorHandler.handleError({
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorBoundary: 'ErrorBoundary',
      severity: 'high',
      category: 'system'
    });
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return (
        <FallbackComponent
          error={this.state.error!}
          retry={() => this.setState({ hasError: false, error: null })}
        />
      );
    }

    return this.props.children;
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error: Error; retry: () => void }> = ({ error, retry }) => (
  <div className="error-boundary-fallback">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
    <button onClick={retry}>Try again</button>
  </div>
);

// Initialize error handler
export const initializeErrorHandler = (): ErrorHandler => {
  const config: ErrorHandlerConfig = {
    enableReporting: process.env.NODE_ENV === 'production',
    enableRetry: true,
    enableFallback: true,
    reportEndpoint: '/api/error-reporting',
    retryConfig: {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 10000,
      backoffMultiplier: 2,
      retryableErrors: ['network', 'timeout', 'server', 'connection']
    }
  };

  return new ErrorHandler(config);
};

export default ErrorHandler;
