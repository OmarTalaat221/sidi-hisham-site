import { useEffect } from 'react';

export default function ClearStorage() {
  useEffect(() => {
    // Check for corrupted language state in localStorage
    if (typeof window !== 'undefined') {
      try {
        const persistedState = localStorage.getItem('persist:root');
        if (persistedState) {
          const parsedState = JSON.parse(persistedState);
          if (parsedState.language && typeof parsedState.language === 'string') {
            try {
              JSON.parse(parsedState.language);
            } catch (error) {
              console.warn('Corrupted language state detected, clearing localStorage...');
              localStorage.removeItem('persist:root');
              window.location.reload();
            }
          }
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
