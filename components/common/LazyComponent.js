import React, { Suspense, lazy } from 'react';

// Loading fallback component
const LoadingFallback = ({ children, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
      <div className="text-gray-500">جاري التحميل...</div>
    </div>
    {children}
  </div>
);

// Lazy component wrapper
export default function LazyComponent({ 
  component: Component, 
  fallback = null,
  className = '',
  ...props 
}) {
  const LazyComponent = lazy(() => 
    Component().then(module => ({ default: module.default || module }))
  );

  return (
    <Suspense fallback={fallback || <LoadingFallback className={className} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
}

// Predefined lazy components for common use cases
export const LazySlider = lazy(() => import('../home/Slider'));
export const LazyNewsCarousel = lazy(() => import('../news/NewsCarousel'));
export const LazyVideoImagesSlider = lazy(() => import('../home/VideoImagesSlider'));
export const LazySponsorSlider = lazy(() => import('../home/SponsorSlider'));
export const LazyElasticCarousel = lazy(() => import('../home/section4/ElasticCarousel'));

// Lazy loading hook for images
export const useLazyLoading = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isInView, setIsInView] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isLoaded, isInView, setIsLoaded };
};
