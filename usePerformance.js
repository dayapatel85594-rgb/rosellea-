import { useEffect, useCallback, useRef, useMemo, useState, lazy } from 'react';

// Debounce hook for performance optimization
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Throttle hook for performance optimization
export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  }, [callback, delay]);
};

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Image lazy loading hook
export const useLazyImage = (src, placeholder = '') => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    if (hasIntersected && src) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
        setIsError(false);
      };
      
      img.onerror = () => {
        setIsError(true);
        setIsLoaded(false);
      };
      
      img.src = src;
    }
  }, [hasIntersected, src]);

  return { elementRef, imageSrc, isLoaded, isError };
};

// Performance monitoring hook
export const usePerformanceMonitor = (componentName) => {
  const renderCount = useRef(0);
  const startTime = useRef(performance.now());

  useEffect(() => {
    renderCount.current += 1;
  });

  useEffect(() => {
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} - Render #${renderCount.current} took ${renderTime.toFixed(2)}ms`);
    }
    
    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    logPerformance: (operation, time) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} - ${operation} took ${time.toFixed(2)}ms`);
      }
    }
  };
};

// Memory usage optimization hook
export const useMemoryOptimization = () => {
  const cleanup = useCallback(() => {
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc && process.env.NODE_ENV === 'development') {
      window.gc();
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { cleanup };
};

// Memoized computation hook
export const useMemoizedComputation = (computeFn, dependencies, shouldRecompute = true) => {
  return useMemo(() => {
    if (!shouldRecompute) return null;
    
    const startTime = performance.now();
    const result = computeFn();
    const endTime = performance.now();
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`Computation took ${(endTime - startTime).toFixed(2)}ms`);
    }
    
    return result;
  }, dependencies);
};

// Bundle size optimization utilities
export const loadComponentAsync = (importFn) => {
  return lazy(() => importFn());
};

export const preloadComponent = (importFn) => {
  importFn();
};

// Performance metrics hook
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    interactionTime: 0
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          setMetrics(prev => ({
            ...prev,
            renderTime: entry.startTime
          }));
        }
      });
    });
    
    observer.observe({ entryTypes: ['paint'] });
    
    setMetrics(prev => ({
      ...prev,
      loadTime
    }));

    return () => {
      observer.disconnect();
    };
  }, []);

  return metrics;
};

export default {
  useDebounce,
  useThrottle,
  useIntersectionObserver,
  useLazyImage,
  usePerformanceMonitor,
  useMemoryOptimization,
  useMemoizedComputation,
  loadComponentAsync,
  preloadComponent,
  usePerformanceMetrics
};