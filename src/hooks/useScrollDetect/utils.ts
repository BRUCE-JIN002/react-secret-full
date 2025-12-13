import { CubicBezierPoint, ScrollAnimationType } from "./types";

// 百分比转换逻辑
export const parseScrollValue = (
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
    numericValue = typeof value === "string" ? parseFloat(value) || 0 : value;
  }

  // 限制在有效范围内
  return Math.max(0, numericValue);
};

// 缓动函数库
export const getEasingFunction = (type: ScrollAnimationType) => {
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
export const cubicBezier = (
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
) => {
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
export const debounceRAF = <T extends (...args: never[]) => void>(
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
