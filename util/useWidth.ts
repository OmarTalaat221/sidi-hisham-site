import { useCallback, useEffect, useState } from 'react';

interface ReturnType {
  isMobile: boolean;
  innerWidth: number;
  outerWidth: number;
}

export const useWidth = (): ReturnType => {
  const [state, setState] = useState<ReturnType>({
    innerWidth: 0,
    outerWidth: 0,
    isMobile: false,
  });

  const calc = useCallback(() => {
    if (typeof window !== 'undefined') {
      const innerWidth = window.innerWidth ?? 0;
      const outerWidth = window.outerWidth ?? 0;
      setState({
        innerWidth,
        outerWidth,
        isMobile: outerWidth < 992,
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', calc);
      calc();
      
      return () => {
        window.removeEventListener('resize', calc);
      };
    }
  }, [calc]);
  
  return state;
};