import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        console.log(`${entry.name}: ${entry.value}`);
        
        // Send to analytics (replace with your analytics service)
        if (entry.name === 'LCP') {
          // Largest Contentful Paint
          console.log('LCP:', entry.value);
        } else if (entry.name === 'FID') {
          // First Input Delay
          console.log('FID:', entry.value);
        } else if (entry.name === 'CLS') {
          // Cumulative Layout Shift
          console.log('CLS:', entry.value);
        }
      }
    });

    // Observe Core Web Vitals
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Monitor page load performance
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
      }
    });

    // Monitor resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.initiatorType === 'img' && entry.duration > 1000) {
          console.warn('Slow image load:', entry.name, entry.duration);
        }
      }
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    return () => {
      observer.disconnect();
      resourceObserver.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
}

// Hook for measuring component performance
export const usePerformanceMeasure = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      if (duration > 16) { // Longer than one frame (16ms)
        console.warn(`${componentName} took ${duration.toFixed(2)}ms to render`);
      }
    };
  });
};

// Hook for measuring API call performance
export const useAPIPerformance = () => {
  const measureAPI = async (apiCall, name = 'API Call') => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      console.log(`${name} took ${duration.toFixed(2)}ms`);
      
      if (duration > 1000) {
        console.warn(`Slow API call: ${name} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;
      console.error(`${name} failed after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };

  return { measureAPI };
};
