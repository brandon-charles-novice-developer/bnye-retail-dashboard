import { useState, useEffect, useRef } from 'react';

interface UseCountUpOptions {
  target: number;
  duration?: number;
  delay?: number;
}

export function useCountUp({ target, duration = 1200, delay = 0 }: UseCountUpOptions): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setValue(target * eased);
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setValue(target);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay]);

  return value;
}
