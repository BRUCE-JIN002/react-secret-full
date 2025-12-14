export const useScrollCodeString = `
import { useCallback, useEffect, useState, useRef } from "react";
import {
  ScrollDetectionOptions,
  ScrollDirection,
  ScrollMethods,
  ScrollState,
  ScrollOptions,
  ScrollAnimationType,
  targetPosition,
  ScrollEventCallback,
  ScrollEventListener,
} from "./types";
import { debounceRAF, getEasingFunction, parseScrollValue } from "./utils";
import type { BasicTarget } from "./utils/domTarget";
import { getTargetElement } from "./utils/domTarget";

const DEFAULT_OPTIONS: Required<ScrollDetectionOptions> = {
  scrollThreshold: 1,
  debounceDelay: 100,
};

const DEFAULT_SCROLL_OPTIONS = {
  duration: 300,
  animation: "smooth" as const,
};

export function useScroll(
  target?: BasicTarget<HTMLElement | Document>,
  options?: ScrollDetectionOptions
): [ScrollState, ScrollMethods] {
  const { scrollThreshold, debounceDelay } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  // 滚动事件监听器存储
  const scrollEventListeners = useRef<ScrollEventListener[]>([]);

  // 获取滚动容器，默认为 document
  const getScrollContainer = useCallback(() => {
    return getTargetElement(target, document) as HTMLElement | Document;
  }, [target]);

  // 获取滚动信息的辅助函数
  const getScrollInfo = useCallback((container: HTMLElement | Document) => {
    if (container === document) {
      return {
        scrollTop: Math.max(
          window.pageYOffset,
          document.documentElement.scrollTop,
          document.body.scrollTop
        ),
        scrollLeft: Math.max(
          window.pageXOffset,
          document.documentElement.scrollLeft,
          document.body.scrollLeft
        ),
        scrollHeight: Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        ),
        scrollWidth: Math.max(
          document.documentElement.scrollWidth,
          document.body.scrollWidth
        ),
        clientHeight: window.innerHeight,
        clientWidth: window.innerWidth,
      };
    } else {
      const element = container as HTMLElement;
      return {
        scrollTop: element.scrollTop,
        scrollLeft: element.scrollLeft,
        scrollHeight: element.scrollHeight,
        scrollWidth: element.scrollWidth,
        clientHeight: element.clientHeight,
        clientWidth: element.clientWidth,
      };
    }
  }, []);

  // 设置滚动位置的辅助函数
  const setScrollPosition = useCallback(
    (container: HTMLElement | Document, x?: number, y?: number) => {
      if (container === document) {
        if (x !== undefined) window.scrollTo(x, window.pageYOffset);
        if (y !== undefined) window.scrollTo(window.pageXOffset, y);
      } else {
        const element = container as HTMLElement;
        if (x !== undefined) element.scrollLeft = x;
        if (y !== undefined) element.scrollTop = y;
      }
    },
    []
  );

  // 检查并触发滚动事件监听器
  const checkScrollEventListeners = useCallback(
    (scrollInfo: ReturnType<typeof getScrollInfo>) => {
      const { scrollLeft, scrollTop } = scrollInfo;

      scrollEventListeners.current.forEach((listener) => {
        const currentPosition =
          listener.direction === "x" ? scrollLeft : scrollTop;

        // 如果当前位置大于等于目标位置且还未触发过
        if (currentPosition >= listener.position && !listener.triggered) {
          listener.triggered = true;
          listener.callback(currentPosition, listener.direction);
        }
        // 如果当前位置小于目标位置，重置触发状态（支持重复触发）
        else if (currentPosition < listener.position && listener.triggered) {
          listener.triggered = false;
        }
      });
    },
    []
  );

  // 添加滚动事件监听器
  const addEventListener = useCallback(
    (position: number, direction: "x" | "y", callback: ScrollEventCallback) => {
      const listener: ScrollEventListener = {
        position,
        direction,
        callback,
        triggered: false,
      };

      scrollEventListeners.current.push(listener);

      // 返回取消订阅函数
      return () => {
        const index = scrollEventListeners.current.indexOf(listener);
        if (index > -1) {
          scrollEventListeners.current.splice(index, 1);
        }
      };
    },
    []
  );

  // 移除滚动事件监听器
  const removeEventListener = useCallback(
    (
      position: number,
      direction: "x" | "y",
      callback?: ScrollEventCallback
    ) => {
      scrollEventListeners.current = scrollEventListeners.current.filter(
        (listener) => {
          if (
            listener.position === position &&
            listener.direction === direction
          ) {
            // 如果指定了回调函数，只移除匹配的监听器
            if (callback) {
              return listener.callback !== callback;
            }
            // 如果没有指定回调函数，移除所有匹配位置和方向的监听器
            return false;
          }
          return true;
        }
      );
    },
    []
  );

  // 清除所有事件监听器
  const clearAllEventListeners = useCallback(() => {
    scrollEventListeners.current = [];
  }, []);

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
      const container = getScrollContainer();
      if (!container || start === end) return;

      const { duration = 300, animation = "smooth" as ScrollAnimationType } = {
        ...DEFAULT_SCROLL_OPTIONS,
        ...scrollOptions,
      };
      const startTime =
        window.performance && performance.now ? performance.now() : Date.now();

      const scrollInfo = getScrollInfo(container);
      const initialX = scrollInfo.scrollLeft;
      const initialY = scrollInfo.scrollTop;

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
            setScrollPosition(container, start + (end - start) * ease);
            break;
          case "y":
            setScrollPosition(
              container,
              undefined,
              start + (end - start) * ease
            );
            break;
          case "both":
            setScrollPosition(
              container,
              initialX + (end - initialX) * ease,
              initialY + (end - initialY) * ease
            );
            break;
        }

        if (progress < 1) {
          compatibleRAF(updateScroll);
        }
      };

      compatibleRAF(updateScroll);
    },
    [getScrollContainer, getScrollInfo, setScrollPosition]
  );

  // 滚动到顶部
  const scrollToTop = useCallback(
    (options?: ScrollOptions) => {
      const container = getScrollContainer();
      if (!container) return;
      const scrollInfo = getScrollInfo(container);
      animateScroll(scrollInfo.scrollTop, 0, "y", options);
    },
    [animateScroll, getScrollContainer, getScrollInfo]
  );

  // 滚动到底部
  const scrollToBottom = useCallback(
    (options?: ScrollOptions) => {
      const container = getScrollContainer();
      if (!container) return;
      const scrollInfo = getScrollInfo(container);
      animateScroll(
        scrollInfo.scrollTop,
        scrollInfo.scrollHeight - scrollInfo.clientHeight,
        "y",
        options
      );
    },
    [animateScroll, getScrollContainer, getScrollInfo]
  );

  // 滚动到左侧
  const scrollToLeft = useCallback(
    (options?: ScrollOptions) => {
      const container = getScrollContainer();
      if (!container) return;
      const scrollInfo = getScrollInfo(container);
      animateScroll(scrollInfo.scrollLeft, 0, "x", options);
    },
    [animateScroll, getScrollContainer, getScrollInfo]
  );

  // 滚动到右侧
  const scrollToRight = useCallback(
    (options?: ScrollOptions) => {
      const container = getScrollContainer();
      if (!container) return;
      const scrollInfo = getScrollInfo(container);
      animateScroll(
        scrollInfo.scrollLeft,
        scrollInfo.scrollWidth - scrollInfo.clientWidth,
        "x",
        options
      );
    },
    [animateScroll, getScrollContainer, getScrollInfo]
  );

  // 通用滚动方法
  const scrollTo = useCallback(
    (scrollTarget: number | targetPosition, options?: ScrollOptions) => {
      const container = getScrollContainer();
      if (!container) return;

      const scrollInfo = getScrollInfo(container);
      let targetX: number | undefined;
      let targetY: number | undefined;
      const currentX = scrollInfo.scrollLeft;
      const currentY = scrollInfo.scrollTop;

      //为单一number类型时，默认为y轴滚动
      if (typeof scrollTarget === "number") {
        targetY = parseScrollValue(scrollTarget, container, "y") ?? currentY;
      } else {
        targetX = parseScrollValue(scrollTarget.x, container, "x") ?? currentX;
        targetY = parseScrollValue(scrollTarget.y, container, "y") ?? currentY;
      }

      // 执行滚动
      if (targetX !== undefined && targetX !== currentX) {
        animateScroll(currentX, targetX, "x", options);
      }
      if (targetY !== undefined && targetY !== currentY) {
        animateScroll(currentY, targetY, "y", options);
      }
    },
    [animateScroll, getScrollContainer, getScrollInfo]
  );

  // 滚动状态检测逻辑
  useEffect(() => {
    const container = getScrollContainer();
    if (!container) return;

    const calculateState = () => {
      const scrollInfo = getScrollInfo(container);
      const {
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
        scrollHeight,
        scrollWidth,
      } = scrollInfo;

      // 检查并触发滚动事件监听器
      checkScrollEventListeners(scrollInfo);

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
    const eventTarget = container === document ? window : container;

    events.forEach((e) => {
      eventTarget.addEventListener(e, debouncedCalculate);
    });

    debouncedCalculate();

    return () => {
      events.forEach((e) => {
        eventTarget.removeEventListener(e, debouncedCalculate);
      });
      debouncedCalculate.cancel();
    };
  }, [
    getScrollContainer,
    getScrollInfo,
    checkScrollEventListeners,
    scrollThreshold,
    debounceDelay,
  ]);

  // 组件卸载时清除所有事件监听器
  useEffect(() => {
    return () => {
      clearAllEventListeners();
    };
  }, [clearAllEventListeners]);

  return [
    state,
    {
      scrollToTop,
      scrollToBottom,
      scrollToLeft,
      scrollToRight,
      scrollTo,
      addEventListener,
      removeEventListener,
      clearAllEventListeners,
    },
  ];
}
`;
