export const useScrllingCodeString = `import { RefObject, useEffect, useState, useCallback } from "react";

export type ScrollTarget =
  | RefObject<HTMLElement>
  | HTMLElement
  | Document
  | Window
  | (() => HTMLElement | Document | Window | null)
  | null
  | undefined;

export interface UseScrollingOptions {
  /** 滚动结束的延迟时间（毫秒），默认 150ms */
  delay?: number;
  /** 是否立即开始监听，默认 true */
  immediate?: boolean;
}

const useScrolling = (
  target?: ScrollTarget,
  options: UseScrollingOptions = {}
): boolean => {
  const { delay = 150, immediate = true } = options;
  const [scrolling, setScrolling] = useState<boolean>(false);

  const getElement = useCallback((): HTMLElement | Document | Window | null => {
    if (!target) return window;

    if (typeof target === "function") {
      return target();
    }

    if (target && "current" in target) {
      return target.current;
    }

    return target as HTMLElement | Document | Window;
  }, [target]);

  useEffect(() => {
    if (!immediate) return;

    const element = getElement();
    if (!element) return;

    let scrollingTimer: ReturnType<typeof setTimeout>;

    const handleScrollEnd = () => {
      setScrolling(false);
    };

    const handleScroll = () => {
      setScrolling(true);
      clearTimeout(scrollingTimer);
      scrollingTimer = setTimeout(handleScrollEnd, delay);
    };

    element.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(scrollingTimer);
      element.removeEventListener("scroll", handleScroll);
    };
  }, [getElement, delay, immediate]);

  return scrolling;
};

export default useScrolling;

`;
