// Performance monitoring and optimization service
interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize: number;
  memoryUsage: number;
  networkRequests: number;
  cacheHitRate: number;
}

interface PerformanceConfig {
  enableMonitoring: boolean;
  reportInterval: number;
  thresholds: {
    loadTime: number;
    renderTime: number;
    memoryUsage: number;
  };
}

class PerformanceService {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics;
  private observers: PerformanceObserver[] = [];
  private reportTimer: NodeJS.Timeout | null = null;

  constructor(config: PerformanceConfig) {
    this.config = config;
    this.metrics = {
      loadTime: 0,
      renderTime: 0,
      bundleSize: 0,
      memoryUsage: 0,
      networkRequests: 0,
      cacheHitRate: 0
    };

    if (config.enableMonitoring) {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring(): void {
    // Monitor page load performance
    this.observePageLoad();
    
    // Monitor resource loading
    this.observeResources();
    
    // Monitor memory usage
    this.observeMemory();
    
    // Monitor network requests
    this.observeNetwork();
    
    // Start periodic reporting
    this.startReporting();
  }

  private observePageLoad(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.loadTime = entry.loadEventEnd - entry.loadEventStart;
            this.metrics.renderTime = entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart;
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  private observeResources(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        let totalSize = 0;
        let cachedResources = 0;

        entries.forEach((entry) => {
          if (entry.transferSize) {
            totalSize += entry.transferSize;
          } else {
            cachedResources++;
          }
        });

        this.metrics.bundleSize = totalSize;
        this.metrics.cacheHitRate = cachedResources / entries.length;
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private observeMemory(): void {
    if ('memory' in performance) {
      const updateMemoryUsage = () => {
        const memory = (performance as any).memory;
        this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB
      };

      updateMemoryUsage();
      setInterval(updateMemoryUsage, 5000); // Update every 5 seconds
    }
  }

  private observeNetwork(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        this.metrics.networkRequests += entries.length;
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private startReporting(): void {
    this.reportTimer = setInterval(() => {
      this.reportMetrics();
    }, this.config.reportInterval);
  }

  private reportMetrics(): void {
    // Check thresholds
    const alerts = this.checkThresholds();
    
    if (alerts.length > 0) {
      console.warn('Performance alerts:', alerts);
      this.sendAlerts(alerts);
    }

    // Log metrics for debugging
    console.log('Performance metrics:', this.metrics);
  }

  private checkThresholds(): string[] {
    const alerts: string[] = [];

    if (this.metrics.loadTime > this.config.thresholds.loadTime) {
      alerts.push(`Load time exceeded threshold: ${this.metrics.loadTime}ms`);
    }

    if (this.metrics.renderTime > this.config.thresholds.renderTime) {
      alerts.push(`Render time exceeded threshold: ${this.metrics.renderTime}ms`);
    }

    if (this.metrics.memoryUsage > this.config.thresholds.memoryUsage) {
      alerts.push(`Memory usage exceeded threshold: ${this.metrics.memoryUsage}MB`);
    }

    return alerts;
  }

  private sendAlerts(alerts: string[]): void {
    // In a real app, you might send these to a monitoring service
    if (typeof window !== 'undefined' && 'navigator' in window && 'sendBeacon' in navigator) {
      navigator.sendBeacon('/api/performance-alerts', JSON.stringify({
        alerts,
        metrics: this.metrics,
        timestamp: new Date().toISOString()
      }));
    }
  }

  // Public methods for manual performance tracking
  public startTiming(label: string): void {
    performance.mark(`${label}-start`);
  }

  public endTiming(label: string): number {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measure = performance.getEntriesByName(label)[0];
    return measure ? measure.duration : 0;
  }

  public measureComponentRender(componentName: string, renderFn: () => void): number {
    this.startTiming(`${componentName}-render`);
    renderFn();
    return this.endTiming(`${componentName}-render`);
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];

    if (this.reportTimer) {
      clearInterval(this.reportTimer);
      this.reportTimer = null;
    }
  }
}

// Bundle size analyzer
export const analyzeBundleSize = (): void => {
  if (typeof window !== 'undefined') {
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    
    let totalSize = 0;
    
    scripts.forEach(script => {
      const src = script.getAttribute('src');
      if (src) {
        fetch(src, { method: 'HEAD' })
          .then(response => {
            const size = response.headers.get('content-length');
            if (size) {
              totalSize += parseInt(size);
              console.log(`Script ${src}: ${size} bytes`);
            }
          })
          .catch(() => {
            console.log(`Could not analyze script: ${src}`);
          });
      }
    });

    stylesheets.forEach(link => {
      const href = link.getAttribute('href');
      if (href) {
        fetch(href, { method: 'HEAD' })
          .then(response => {
            const size = response.headers.get('content-length');
            if (size) {
              totalSize += parseInt(size);
              console.log(`Stylesheet ${href}: ${size} bytes`);
            }
          })
          .catch(() => {
            console.log(`Could not analyze stylesheet: ${href}`);
          });
      }
    });

    setTimeout(() => {
      console.log(`Total bundle size: ${totalSize} bytes (${(totalSize / 1024).toFixed(2)} KB)`);
    }, 1000);
  }
};

// Memory usage monitor
export const monitorMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    
    setInterval(() => {
      const used = memory.usedJSHeapSize / 1024 / 1024;
      const total = memory.totalJSHeapSize / 1024 / 1024;
      const limit = memory.jsHeapSizeLimit / 1024 / 1024;
      
      console.log(`Memory usage: ${used.toFixed(2)}MB / ${total.toFixed(2)}MB (limit: ${limit.toFixed(2)}MB)`);
      
      if (used / limit > 0.8) {
        console.warn('High memory usage detected!');
      }
    }, 10000); // Check every 10 seconds
  }
};

// Network performance monitor
export const monitorNetworkPerformance = (): void => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          if (resource.duration > 1000) { // Resources taking longer than 1 second
            console.warn(`Slow resource: ${resource.name} took ${resource.duration.toFixed(2)}ms`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = (): PerformanceService => {
  const config: PerformanceConfig = {
    enableMonitoring: process.env.NODE_ENV === 'production',
    reportInterval: 30000, // Report every 30 seconds
    thresholds: {
      loadTime: 3000, // 3 seconds
      renderTime: 1000, // 1 second
      memoryUsage: 100 // 100MB
    }
  };

  const performanceService = new PerformanceService(config);

  // Additional monitoring in development
  if (process.env.NODE_ENV === 'development') {
    analyzeBundleSize();
    monitorMemoryUsage();
    monitorNetworkPerformance();
  }

  return performanceService;
};

export default PerformanceService;
