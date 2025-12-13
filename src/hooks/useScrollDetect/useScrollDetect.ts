import { useCallback, useEffect, useState } from "react";

type ScrollDirection = "x" | "y" | "both";
type PercentString<T extends number> = `${T}%`;
type CubicBezierPoint = [number, number, number, number];
type ScrollAnimationType =
  | "smooth"
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | CubicBezierPoint;

interface ScrollMethods {
  scrollToTop: (options?: ScrollOptions) => void;
  scrollToBottom: (options?: ScrollOptions) => void;
  scrollToLeft: (options?: ScrollOptions) => void;
  scrollToRight: (options?: ScrollOptions) => void;
  scrollTo: (target: number | ScrollPosition, options?: ScrollOptions) => void;
}

interface ScrollOptions {
  duration?: number;
  animation?: ScrollAnimationType;
}

interface ScrollPosition {
  x?: number | PercentString<number>;
  y?: number | PercentString<number>;
}

type ScrollDetectionResult = {
  hasVerticalScroll: boolean;
  hasHorizontalScroll: boolean;
  isBottom: boolean;
  isTop: boolean;
  isLeft: boolean;
  isRight: boolean;
  distanceToTop: number;
  distanceToLeft: number;
};

type ScrollDetectionOptions = {
  scrollThreshold?: number;
  debounceDelay?: number;
};

const DEFAULT_OPTIONS: Required<ScrollDetectionOptions> = {
  scrollThreshold: 1,
  debounceDelay: 100,
};

const DEFAULT_SCROLL_OPTIONS: Required<ScrollOptions> = {
  duration: 300,
  animation: "smooth",
};

export function useScrollDetection(
  containerRef: React.RefObject<HTMLElement>,
  options?: ScrollDetectionOptions
): ScrollDetectionResult & ScrollMethods {
  const { scrollThreshold, debounceDelay } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const [state, setState] = useState<ScrollDetectionResult>({
    hasVerticalScroll: false,
    hasHorizontalScroll: false,
    isBottom: false,
    isTop: true,
    isLeft: true,
    isRight: false,
    distanceToTop: 0,
    distanceToLeft: 0,
  });

  // 百分比转换逻辑
  const parseScrollValue = useCallback(
    (
      value: number | string | undefined,
      container: HTMLElement,
      direction: "x" | "y"
    ): number | undefined => {
      if (value === undefined) return undefined;

      let numericValue = 0;
      const isPercentage = typeof value === "string" && value.endsWith("%");

      if (isPercentage) {
        const percentage = parseFloat(value);
        if (isNaN(percentage)) return 0;

        const maxScroll =
          direction === "x"
            ? container.scrollWidth - container.clientWidth
            : container.scrollHeight - container.clientHeight;

        numericValue = (maxScroll * percentage) / 100;
      } else {
        numericValue =
          typeof value === "string" ? parseFloat(value) || 0 : value;
      }

      // 限制在有效范围内
      return Math.max(0, numericValue);
    },
    []
  );

  // 动画核心逻辑
  const animateScroll = useCallback(
    (
      start: number,
      end: number,
      direction: ScrollDirection,
      scrollOptions: ScrollOptions
    ) => {
      const container = containerRef.current;
      if (!container || start === end || !container.offsetHeight) return;

      const { duration, animation } = {
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
        const ease =
          typeof animation === "string"
            ? getEasingFunction(animation)(progress)
            : getEasingFunction(animation as CubicBezierPoint)(progress);

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
      animateScroll(container.scrollTop, 0, "y", options || {});
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
        options || {}
      );
    },
    [animateScroll, containerRef]
  );

  // 滚动到左侧
  const scrollToLeft = useCallback(
    (options?: ScrollOptions) => {
      const container = containerRef.current;
      if (!container) return;
      animateScroll(container.scrollLeft, 0, "x", options || {});
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
        options || {}
      );
    },
    [animateScroll, containerRef]
  );

  // 通用滚动方法
  const scrollTo = useCallback(
    (target: number | ScrollPosition, options?: ScrollOptions) => {
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
        animateScroll(currentX, targetX, "x", options || {});
      }
      if (targetY !== undefined && targetY !== currentY) {
        animateScroll(currentY, targetY, "y", options || {});
      }
    },
    [animateScroll, containerRef, parseScrollValue]
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

      const newState: ScrollDetectionResult = {
        hasVerticalScroll: scrollHeight > clientHeight,
        hasHorizontalScroll: scrollWidth > clientWidth,
        isBottom: scrollTop + clientHeight >= scrollHeight - scrollThreshold,
        isTop: scrollTop <= scrollThreshold,
        isLeft: scrollLeft <= scrollThreshold,
        isRight: scrollLeft + clientWidth >= scrollWidth - scrollThreshold,
        distanceToTop: scrollTop,
        distanceToLeft: scrollLeft,
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

  return {
    ...state,
    scrollToTop,
    scrollToBottom,
    scrollToLeft,
    scrollToRight,
    scrollTo,
  };
}

// 缓动函数库
const getEasingFunction = (type: ScrollAnimationType) => {
  if (Array.isArray(type)) {
    return cubicBezier(...type);
  }
  const easings: Record<
    Exclude<ScrollAnimationType, CubicBezierPoint>,
    ReturnType<typeof cubicBezier>
  > = {
    linear: cubicBezier(0, 0, 1, 1),
    smooth: cubicBezier(0.25, 0.1, 0.25, 1),
    ease: cubicBezier(0.25, 0.1, 0.25, 1),
    "ease-in": cubicBezier(0.42, 0, 1, 1),
    "ease-out": cubicBezier(0, 0, 0.58, 1),
    "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
  };
  return easings[type];
};

//贝塞尔曲线计算器
const cubicBezier = (p1x: number, p1y: number, p2x: number, p2y: number) => {
  // 牛顿迭代法求解 t
  function solveT(xTarget: number) {
    let t = xTarget; // 初始猜测值
    for (let i = 0; i < 8; i++) {
      // 通常迭代 4-8 次即可收敛
      const x =
        3 * (1 - t) ** 2 * t * p1x + 3 * (1 - t) * t ** 2 * p2x + t ** 3;
      const dx =
        3 * (1 - t) ** 2 * p1x +
        6 * (1 - t) * t * (p2x - p1x) +
        3 * t ** 2 * (1 - p2x);
      if (dx === 0) break; // 避免除以零
      t -= (x - xTarget) / dx;
      t = Math.max(0, Math.min(1, t)); // 约束 t 在 [0, 1]
    }
    return t;
  }

  // 输入时间 x，返回动画进度 y
  return function (x: number) {
    const t = solveT(x);
    const y = 3 * (1 - t) ** 2 * t * p1y + 3 * (1 - t) * t ** 2 * p2y + t ** 3;
    return y;
  };
};

// 防抖函数
const debounceRAF = <T extends (...args: never[]) => void>(
  fn: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  let frame: number;

  const wrapper = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    if (frame) cancelAnimationFrame(frame);

    timeout = setTimeout(() => {
      frame = requestAnimationFrame(() => fn(...args));
    }, delay);
  };

  wrapper.cancel = () => {
    clearTimeout(timeout);
    cancelAnimationFrame(frame);
  };

  return wrapper;
};
