import type { BasicTarget } from "./utils/domTarget";

export type Target = BasicTarget<HTMLElement | Document>;

export type ScrollDetectionOptions = {
  scrollThreshold?: number;
  debounceDelay?: number;
};

export type ScrollDirection = "x" | "y" | "both";
export type PercentString<T extends number> = `${T}%`;
export type CubicBezierPoint = [number, number, number, number];
export type ScrollAnimationType =
  | "smooth"
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | CubicBezierPoint;

export type ScrollOptions = {
  duration?: number;
  animation?: ScrollAnimationType;
};

export type targetPosition = {
  x?: number | PercentString<number>;
  y?: number | PercentString<number>;
};

export type ScrollState = {
  x: number;
  y: number;
  isBottom: boolean;
  isTop: boolean;
  isLeft: boolean;
  isRight: boolean;
  hasVerticalScroll: boolean;
  hasHorizontalScroll: boolean;
};

export type ScrollEventCallback = (
  currentPosition: number,
  direction: "x" | "y"
) => void;

export type ScrollEventListener = {
  position: number;
  direction: "x" | "y";
  callback: ScrollEventCallback;
  triggered: boolean; // 标记是否已经触发过
};

export type ScrollMethods = {
  scrollToTop: (options?: ScrollOptions) => void;
  scrollToBottom: (options?: ScrollOptions) => void;
  scrollToLeft: (options?: ScrollOptions) => void;
  scrollToRight: (options?: ScrollOptions) => void;
  scrollTo: (target: number | targetPosition, options?: ScrollOptions) => void;
  // 滚动事件监听方法
  addEventListener: (
    position: number,
    direction: "x" | "y",
    callback: ScrollEventCallback
  ) => () => void;
  removeEventListener: (
    position: number,
    direction: "x" | "y",
    callback?: ScrollEventCallback
  ) => void;
  clearAllEventListeners: () => void;
};
