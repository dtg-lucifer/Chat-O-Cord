import { useEffect, useState } from "react";

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedVal;
}

export function useDebounce(cb: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
