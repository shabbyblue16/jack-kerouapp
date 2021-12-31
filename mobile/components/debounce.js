import { useCallback, useEffect } from 'react';

const _debounce = (func, delay, deps) => {
  const cb = useCallback(func, deps);
  useEffect(() => {
    const handler = setTimeout(() => {
      cb()
    }, delay);
    return () => {
      clearTimeout(handler);
    }
  }, [cb]);
};

export default _debounce;