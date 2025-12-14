import { useRef, useCallback, useEffect } from "react";

const useTimeout = (fn: VoidFunction, delay?: number) => {
  const fnRef = useRef<Function>(fn);
  fnRef.current = fn;

  const timerRef = useRef<number>();

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(fnRef.current, delay);

    return clear;
  });

  return clear;
};

export default useTimeout;
