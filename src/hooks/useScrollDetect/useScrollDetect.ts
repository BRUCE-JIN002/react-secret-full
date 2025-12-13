import { useCallback, useEffect, useState } from "react";
import {
  ScrollDetectionOptions,
  ScrollDirection,
  ScrollMethods,
  ScrollState,
  ScrollOptions,
  ScrollAnimationType,
  targetPosition,
} from "./types";
import { debounceRAF, getEasingFunction, parseScrollValue } from "./utils";

const DEFAULT_OPTIONS: Required<ScrollDetectionOptions> = {
  scrollThreshold: 1,
  debounceDelay: 100,
};

const DEFAULT_SCROLL_OPTIONS = {
  duration: 300,
  animation: "smooth" as const,
};

export function useScrollDetection(
  containerRef: React.RefObject<HTMLElement>,
  options?: ScrollDetectionOptions
): [ScrollState, ScrollMethods] {
  const { scrollThreshold, debounceDelay } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const [state, setState] = useState<ScrollState>({
    hasVerticalScroll: false,
    hasHorizontalScroll: false,
    isBottom: false,
    isTop: true,
    isLeft: true,
    isRight: false,
    y: 0,
    x: 0,
  });

  // 动画核心逻辑
  const animateScroll = useCallback(
    (
      start: number,
      end: number,
      direction: ScrollDirection,
      scrollOptions: ScrollOptions = {}
    ) => {
      const container = containerRef.current;
      if (!container || start === end || !container.offsetHeight) return;

      const { duration = 300, animation = "smooth" as ScrollAnimationType } = {
        ...DEFAULT_SCROLL_OPTIONS,
        ...scrollOptions,
      };
      const startTime =
        window.performance && performance.now ? performance.now() : Date.now();
      const initialX = container.scrollLeft;
      const initialY = container.scrollTop;

      //兼容IE9 及更旧版， 仅支持客户端
      const getRequestAnimationFrame = () => {
        if (typeof window === "undefined") return () => {};

        return (
          window.requestAnimationFrame ||
          (window as any).msRequestAnimationFrame ||
          (window as any).mozRequestAnimationFrame ||
          (window as any).webkitRequestAnimationFrame ||
          function (callback: FrameRequestCallback): number {
            return window.setTimeout(() => callback(Date.now()), 16);
          }
        );
      };

      // 得到兼容后的requestAnimationFrame
      const compatibleRAF = getRequestAnimationFrame();

      const updateScroll = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = getEasingFunction(animation)(progress);

        switch (direction) {
          case "x":
            container.scrollLeft = start + (end - start) * ease;
            break;
          case "y":
            container.scrollTop = start + (end - start) * ease;
            break;
          case "both":
            container.scrollLeft = initialX + (end - initialX) * ease;
            container.scrollTop = initialY + (end - initialY) * ease;
            break;
        }

        if (progress < 1) {
          compatibleRAF(updateScroll);
        }
      };

      compatibleRAF(updateScroll);
    },
    [containerRef]
  );

  // 滚动到顶部
  const scrollToTop = useCallback(
    (options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;
      animateScroll(container.scrollTop, 0, "y", options);
    },
    [animateScroll, containerRef]
  );

  // 滚动到底部
  const scrollToBottom = useCallback(
    (options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;
      animateScroll(
        container.scrollTop,
        container.scrollHeight - container.clientHeight,
        "y",
        options
      );
    },
    [animateScroll, containerRef]
  );

  // 滚动到左侧
  const scrollToLeft = useCallback(
    (options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;
      animateScroll(container.scrollLeft, 0, "x", options);
    },
    [animateScroll, containerRef]
  );

  // 滚动到右侧
  const scrollToRight = useCallback(
    (options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;
      animateScroll(
        container.scrollLeft,
        container.scrollWidth - container.clientWidth,
        "x",
        options
      );
    },
    [animateScroll, containerRef]
  );

  // 通用滚动方法
  const scrollTo = useCallback(
    (target: number | targetPosition, options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;

      let targetX: number | undefined;
      let targetY: number | undefined;
      const currentX = container.scrollLeft;
      const currentY = container.scrollTop;

      //为单一number类型时，默认为y轴滚动
      if (typeof target === "number") {
        targetY = parseScrollValue(target, container, "y") ?? currentY;
      } else {
        targetX = parseScrollValue(target.x, container, "x") ?? currentX;
        targetY = parseScrollValue(target.y, container, "y") ?? currentY;
      }

      // 执行滚动
      if (targetX !== undefined && targetX !== currentX) {
        animateScroll(currentX, targetX, "x", options);
      }
      if (targetY !== undefined && targetY !== currentY) {
        animateScroll(currentY, targetY, "y", options);
      }
    },
    [animateScroll, containerRef]
  );

  // 滚动状态检测逻辑
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateState = () => {
      void container.offsetHeight;
      const {
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      } = container;

      const newState: ScrollState = {
        hasVerticalScroll: scrollHeight > clientHeight,
        hasHorizontalScroll: scrollWidth > clientWidth,
        isBottom: scrollTop + clientHeight >= scrollHeight - scrollThreshold,
        isTop: scrollTop <= scrollThreshold,
        isLeft: scrollLeft <= scrollThreshold,
        isRight: scrollLeft + clientWidth >= scrollWidth - scrollThreshold,
        y: scrollTop,
        x: scrollLeft,
      };

      setState((prev) =>
        JSON.stringify(prev) === JSON.stringify(newState) ? prev : newState
      );
    };

    const debouncedCalculate = debounceRAF(calculateState, debounceDelay);

    const events = ["scroll", "resize"];
    events.forEach((e) => {
      container.addEventListener(e, debouncedCalculate);
      window.addEventListener(e, debouncedCalculate);
    });

    debouncedCalculate();

    return () => {
      events.forEach((e) => {
        container.removeEventListener(e, debouncedCalculate);
        window.removeEventListener(e, debouncedCalculate);
      });
      debouncedCalculate.cancel();
    };
  }, [containerRef, scrollThreshold, debounceDelay]);

  return [
    state,
    {
      scrollToTop,
      scrollToBottom,
      scrollToLeft,
      scrollToRight,
      scrollTo,
    },
  ];
}
