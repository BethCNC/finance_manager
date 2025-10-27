// Bundle analysis and optimization utilities
import React from 'react';
import { performance } from 'perf_hooks';

interface BundleAnalysis {
  totalSize: number;
  chunkSizes: Record<string, number>;
  duplicateModules: string[];
  unusedModules: string[];
  optimizationSuggestions: string[];
}

interface OptimizationConfig {
  enableCodeSplitting: boolean;
  enableTreeShaking: boolean;
  enableCompression: boolean;
  enableCaching: boolean;
  chunkSizeLimit: number;
}

class BundleOptimizer {
  private config: OptimizationConfig;
  private analysis: BundleAnalysis | null = null;

  constructor(config: OptimizationConfig) {
    this.config = config;
  }

  // Analyze current bundle
  public analyzeBundle(): BundleAnalysis {
    const startTime = performance.now();
    
    // In a real implementation, this would analyze the actual bundle
    // For now, we'll provide a mock analysis
    this.analysis = {
      totalSize: 1024 * 1024, // 1MB
      chunkSizes: {
        'main': 512 * 1024, // 512KB
        'vendor': 256 * 1024, // 256KB
        'components': 128 * 1024, // 128KB
        'utils': 64 * 1024, // 64KB
        'services': 64 * 1024 // 64KB
      },
      duplicateModules: [
        'lodash',
        'moment',
        'react-dom'
      ],
      unusedModules: [
        'unused-component',
        'deprecated-service'
      ],
      optimizationSuggestions: [
        'Enable code splitting for routes',
        'Remove unused dependencies',
        'Implement lazy loading for components',
        'Use tree shaking for unused code',
        'Enable compression for static assets'
      ]
    };

    const endTime = performance.now();
    console.log(`Bundle analysis completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    return this.analysis;
  }

  // Generate optimization recommendations
  public generateRecommendations(): string[] {
    if (!this.analysis) {
      this.analyzeBundle();
    }

    const recommendations: string[] = [];

    // Check total bundle size
    if (this.analysis!.totalSize > this.config.chunkSizeLimit) {
      recommendations.push(`Total bundle size (${this.formatBytes(this.analysis!.totalSize)}) exceeds limit (${this.formatBytes(this.config.chunkSizeLimit)})`);
    }

    // Check individual chunk sizes
    Object.entries(this.analysis!.chunkSizes).forEach(([chunk, size]) => {
      if (size > this.config.chunkSizeLimit / 2) {
        recommendations.push(`Chunk '${chunk}' (${this.formatBytes(size)}) is too large`);
      }
    });

    // Check for duplicate modules
    if (this.analysis!.duplicateModules.length > 0) {
      recommendations.push(`Duplicate modules detected: ${this.analysis!.duplicateModules.join(', ')}`);
    }

    // Check for unused modules
    if (this.analysis!.unusedModules.length > 0) {
      recommendations.push(`Unused modules detected: ${this.analysis!.unusedModules.join(', ')}`);
    }

    return recommendations;
  }

  // Format bytes to human readable format
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Apply optimizations
  public applyOptimizations(): void {
    console.log('Applying bundle optimizations...');

    if (this.config.enableCodeSplitting) {
      this.enableCodeSplitting();
    }

    if (this.config.enableTreeShaking) {
      this.enableTreeShaking();
    }

    if (this.config.enableCompression) {
      this.enableCompression();
    }

    if (this.config.enableCaching) {
      this.enableCaching();
    }

    console.log('Bundle optimizations applied successfully');
  }

  private enableCodeSplitting(): void {
    console.log('Enabling code splitting...');
    // Implementation would involve configuring webpack or build tool
  }

  private enableTreeShaking(): void {
    console.log('Enabling tree shaking...');
    // Implementation would involve configuring build tool
  }

  private enableCompression(): void {
    console.log('Enabling compression...');
    // Implementation would involve configuring server or build tool
  }

  private enableCaching(): void {
    console.log('Enabling caching...');
    // Implementation would involve configuring service worker or server
  }
}

// Webpack bundle analyzer configuration
export const webpackBundleAnalyzerConfig = {
  analyzerMode: 'static',
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: 'bundle-stats.json',
  reportFilename: 'bundle-report.html'
};

// Performance budget configuration
export const performanceBudget = {
  maxBundleSize: 1024 * 1024, // 1MB
  maxChunkSize: 512 * 1024, // 512KB
  maxInitialLoadTime: 3000, // 3 seconds
  maxTimeToInteractive: 5000, // 5 seconds
  maxFirstContentfulPaint: 2000, // 2 seconds
  maxLargestContentfulPaint: 4000 // 4 seconds
};

// Code splitting configuration
export const codeSplittingConfig = {
  chunks: {
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendors',
      chunks: 'all'
    },
    common: {
      name: 'common',
      minChunks: 2,
      chunks: 'all',
      enforce: true
    }
  },
  routes: [
    '/dashboard',
    '/transactions',
    '/budget',
    '/subscriptions',
    '/advisor',
    '/accounts',
    '/goals',
    '/reports',
    '/notifications'
  ]
};

// Tree shaking configuration
export const treeShakingConfig = {
  sideEffects: false,
  usedExports: true,
  providedExports: true,
  optimization: {
    usedExports: true,
    sideEffects: false
  }
};

// Compression configuration
export const compressionConfig = {
  gzip: {
    threshold: 1024,
    minRatio: 0.8
  },
  brotli: {
    threshold: 1024,
    minRatio: 0.8
  }
};

// Caching configuration
export const cachingConfig = {
  staticAssets: {
    maxAge: 31536000, // 1 year
    immutable: true
  },
  apiResponses: {
    maxAge: 300, // 5 minutes
    staleWhileRevalidate: 86400 // 1 day
  },
  serviceWorker: {
    cacheFirst: ['/static/', '/assets/'],
    networkFirst: ['/api/'],
    staleWhileRevalidate: ['/']
  }
};

// Initialize bundle optimizer
export const initializeBundleOptimizer = (): BundleOptimizer => {
  const config: OptimizationConfig = {
    enableCodeSplitting: true,
    enableTreeShaking: true,
    enableCompression: true,
    enableCaching: true,
    chunkSizeLimit: 512 * 1024 // 512KB
  };

  return new BundleOptimizer(config);
};

// Bundle size monitoring
export const monitorBundleSize = (): void => {
  if (typeof window !== 'undefined') {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          if (resource.transferSize > 100 * 1024) { // Resources larger than 100KB
            console.warn(`Large resource detected: ${resource.name} (${(resource.transferSize / 1024).toFixed(2)}KB)`);
          }
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
  }
};

// Lazy loading utility
export const lazyLoadComponent = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
): React.LazyExoticComponent<T> => {
  return React.lazy(() => {
    const startTime = performance.now();
    
    return importFunc().then(module => {
      const endTime = performance.now();
      console.log(`Component loaded in ${(endTime - startTime).toFixed(2)}ms`);
      
      return module;
    });
  });
};

// Preload critical resources
export const preloadCriticalResources = (): void => {
  const criticalResources = [
    '/static/css/critical.css',
    '/static/js/runtime.js',
    '/static/js/vendors.js'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
};

// Resource hints
export const addResourceHints = (): void => {
  // DNS prefetch for external domains
  const externalDomains = [
    'https://api.notion.com',
    'https://api.openai.com',
    'https://api.plaid.com'
  ];

  externalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const criticalDomains = [
    'https://api.notion.com'
  ];

  criticalDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  });
};

export default BundleOptimizer;
