// API error handling and retry utilities
import ErrorHandler from './errorHandler';

interface ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: Response;
  data?: any;
}

interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: Record<string, string>;
}

interface RequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: any;
  headers?: Record<string, string>;
  timeout?: number;
  retries?: number;
}

class ApiClient {
  private config: ApiConfig;
  private errorHandler: ErrorHandler;

  constructor(config: ApiConfig, errorHandler: ErrorHandler) {
    this.config = config;
    this.errorHandler = errorHandler;
  }

  // Main request method with error handling and retry logic
  public async request<T>(config: RequestConfig): Promise<T> {
    const requestConfig = this.mergeConfig(config);
    
    try {
      const response = await this.executeRequest(requestConfig);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      return this.handleError(error, requestConfig);
    }
  }

  // Execute the actual HTTP request
  private async executeRequest(config: RequestConfig): Promise<Response> {
    const url = `${this.config.baseURL}${config.url}`;
    const requestInit: RequestInit = {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers,
        ...config.headers
      }
    };

    if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
      requestInit.body = JSON.stringify(config.data);
    }

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.config.timeout);

    try {
      const response = await fetch(url, {
        ...requestInit,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // Handle response and extract data
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = new Error(`HTTP ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.statusText = response.statusText;
      error.response = response;

      try {
        error.data = await response.json();
      } catch {
        error.data = await response.text();
      }

      throw error;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error('Failed to parse response as JSON');
    }
  }

  // Handle errors with retry logic
  private async handleError<T>(error: any, config: RequestConfig): Promise<T> {
    const apiError: ApiError = error;
    
    // Log the error
    this.errorHandler.handleApiError(
      apiError,
      config.url,
      apiError.status
    );

    // Check if error is retryable
    if (this.isRetryableError(apiError) && config.retries && config.retries > 0) {
      return this.retryRequest<T>(config, config.retries - 1);
    }

    // Handle specific error types
    switch (apiError.status) {
      case 401:
        this.handleAuthenticationError();
        break;
      case 403:
        this.handleAuthorizationError();
        break;
      case 404:
        this.handleNotFoundError(config.url);
        break;
      case 429:
        this.handleRateLimitError();
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        this.handleServerError(apiError);
        break;
      default:
        this.handleGenericError(apiError);
    }

    throw apiError;
  }

  // Check if error is retryable
  private isRetryableError(error: ApiError): boolean {
    // Network errors are retryable
    if (!error.status) {
      return true;
    }

    // Server errors are retryable
    if (error.status >= 500) {
      return true;
    }

    // Rate limiting is retryable
    if (error.status === 429) {
      return true;
    }

    // Timeout errors are retryable
    if (error.message.includes('timeout') || error.message.includes('aborted')) {
      return true;
    }

    return false;
  }

  // Retry request with exponential backoff
  private async retryRequest<T>(config: RequestConfig, remainingRetries: number): Promise<T> {
    const delay = this.config.retryDelay * Math.pow(2, this.config.retries - remainingRetries);
    
    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      const response = await this.executeRequest(config);
      return await this.handleResponse<T>(response);
    } catch (error: any) {
      if (remainingRetries > 0) {
        return this.retryRequest<T>(config, remainingRetries - 1);
      }
      throw error;
    }
  }

  // Handle authentication errors
  private handleAuthenticationError(): void {
    // Clear stored authentication tokens
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Redirect to login page
    window.location.href = '/login';
  }

  // Handle authorization errors
  private handleAuthorizationError(): void {
    this.errorHandler.handleError({
      message: 'You don\'t have permission to perform this action',
      severity: 'medium',
      category: 'authorization'
    });
  }

  // Handle not found errors
  private handleNotFoundError(url: string): void {
    this.errorHandler.handleError({
      message: `Resource not found: ${url}`,
      severity: 'low',
      category: 'network',
      context: { url }
    });
  }

  // Handle rate limit errors
  private handleRateLimitError(): void {
    this.errorHandler.handleError({
      message: 'Rate limit exceeded. Please wait before making another request.',
      severity: 'medium',
      category: 'network'
    });
  }

  // Handle server errors
  private handleServerError(error: ApiError): void {
    this.errorHandler.handleError({
      message: `Server error: ${error.message}`,
      stack: error.stack,
      severity: 'high',
      category: 'network',
      context: { status: error.status, statusText: error.statusText }
    });
  }

  // Handle generic errors
  private handleGenericError(error: ApiError): void {
    this.errorHandler.handleError({
      message: `API error: ${error.message}`,
      stack: error.stack,
      severity: 'medium',
      category: 'network',
      context: { status: error.status, statusText: error.statusText }
    });
  }

  // Merge request config with default config
  private mergeConfig(config: RequestConfig): RequestConfig {
    return {
      ...config,
      timeout: config.timeout || this.config.timeout,
      retries: config.retries || this.config.retries,
      headers: {
        ...this.config.headers,
        ...config.headers
      }
    };
  }

  // Convenience methods
  public async get<T>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ method: 'GET', url, ...config });
  }

  public async post<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ method: 'POST', url, data, ...config });
  }

  public async put<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ method: 'PUT', url, data, ...config });
  }

  public async patch<T>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ method: 'PATCH', url, data, ...config });
  }

  public async delete<T>(url: string, config?: Partial<RequestConfig>): Promise<T> {
    return this.request<T>({ method: 'DELETE', url, ...config });
  }
}

// Form validation error handler
export class FormErrorHandler {
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
  }

  // Handle form validation errors
  public handleFormErrors(errors: Record<string, string[]>): void {
    Object.entries(errors).forEach(([field, messages]) => {
      messages.forEach(message => {
        this.errorHandler.handleValidationError(field, message);
      });
    });
  }

  // Handle single field validation error
  public handleFieldError(field: string, message: string): void {
    this.errorHandler.handleValidationError(field, message);
  }

  // Clear field errors
  public clearFieldErrors(field: string): void {
    // Implementation would depend on your form state management
    console.log(`Clearing errors for field: ${field}`);
  }
}

// Network error handler
export class NetworkErrorHandler {
  private errorHandler: ErrorHandler;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
  }

  // Handle network connectivity issues
  public handleNetworkError(error: Error, url: string): void {
    this.errorHandler.handleNetworkError(error, url);
  }

  // Check network connectivity
  public async checkConnectivity(): Promise<boolean> {
    try {
      const response = await fetch('/api/health', { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  // Handle offline state
  public handleOfflineState(): void {
    this.errorHandler.handleError({
      message: 'You are currently offline. Some features may not be available.',
      severity: 'medium',
      category: 'network'
    });
  }

  // Handle online state
  public handleOnlineState(): void {
    this.errorHandler.handleError({
      message: 'Connection restored. You can now use all features.',
      severity: 'low',
      category: 'network'
    });
  }
}

// Initialize API client
export const initializeApiClient = (errorHandler: ErrorHandler): ApiClient => {
  const config: ApiConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL || '',
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return new ApiClient(config, errorHandler);
};

// Initialize form error handler
export const initializeFormErrorHandler = (errorHandler: ErrorHandler): FormErrorHandler => {
  return new FormErrorHandler(errorHandler);
};

// Initialize network error handler
export const initializeNetworkErrorHandler = (errorHandler: ErrorHandler): NetworkErrorHandler => {
  return new NetworkErrorHandler(errorHandler);
};

export default ApiClient;
