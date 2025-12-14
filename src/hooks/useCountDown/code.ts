export const useCountdownCodeString = `import dayjs from "dayjs";

import { useEffect, useMemo, useRef, useState } from "react";

export type TDate = dayjs.ConfigType;

export interface Options {
  leftTime?: number;
  targetDate?: TDate;
  interval?: number;
  onEnd?: VoidFunction;
}

export interface FormattedRes {
  days: number;
  hours: number;
  minites: number;
  seconds: number;
  minlliseconds: number;
}

const clacLeft = (target?: TDate) => {
  if (!target) {
    return 0;
  }

  const left = dayjs(target).valueOf() - Date.now();
  return left > 0 ? left : 0;
};

const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minites: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    minlliseconds: Math.floor(milliseconds) % 1000,
  };
};

const useCountDown = (options: Options = {}) => {
  const { leftTime, targetDate, interval = 1000, onEnd } = options;

  const memoLeftTime = useMemo<TDate>(() => {
    return leftTime && leftTime > 0 ? Date.now() + leftTime : undefined;
  }, [leftTime]);

  const target = "leftTime" in options ? memoLeftTime : targetDate;

  const [timeLeft, setTimeLeft] = useState(() => clacLeft(target));

  const onEndRef = useRef<VoidFunction | undefined>(onEnd);
  onEndRef.current = onEnd;

  useEffect(() => {
    if (!target) {
      setTimeLeft(0);
      return;
    }

    setTimeLeft(clacLeft(target));

    const timer = setInterval(() => {
      const targetLeft = clacLeft(target);
      setTimeLeft(targetLeft);
      if (targetLeft === 0) {
        clearInterval(timer);
        onEndRef.current?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [target, interval]);

  const formattedRes = useMemo(() => parseMs(timeLeft), [timeLeft]);

  return [timeLeft, formattedRes] as const;
};

export default useCountDown;`;
