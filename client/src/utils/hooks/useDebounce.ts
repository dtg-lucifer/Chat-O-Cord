import { useEffect, useState } from "react";

export function useDebouncedTyping<T>(value: T, delay: number) {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedVal(value);
      setIsTyping(false);
    }, delay);

    return () => {
      clearTimeout(handler);
      setIsTyping(true);
    };
  }, [value, delay]);

  return { debouncedVal, isTyping };
}

export function useDebounce<T>(cb: Function, delay: number) {
  let timer: NodeJS.Timeout;

  return (...args: T[]) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
