import React from "react";
import NotePreview from "../../common/components/NotePreview";

// README 内容
const readmeContent = `# useScroll

一个功能强大的 React Hook，用于检测滚动状态和管理滚动事件监听器。

## 功能特性

- ✅ **滚动状态检测**: 检测滚动位置、边界状态等
- ✅ **平滑滚动动画**: 支持多种缓动函数的平滑滚动
- ✅ **滚动事件监听**: 在特定滚动位置触发回调函数
- ✅ **灵活的目标支持**: 支持窗口滚动和容器滚动
- ✅ **高性能优化**: 使用防抖和 RAF 优化
- ✅ **自动清理**: 组件卸载时自动清理资源

## 基本用法

\`\`\`typescript
import { useScroll } from "./useScroll";

function MyComponent() {
  // 监听窗口滚动（默认）
  const [scrollState, scrollMethods] = useScroll();

  // 监听特定容器滚动
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerState, containerMethods] = useScroll(containerRef);

  return (
    <div>
      <div>当前滚动位置: {scrollState.y}px</div>
      <button onClick={() => scrollMethods.scrollToTop()}>滚动到顶部</button>
    </div>
  );
}
\`\`\`

## 滚动事件监听器

### 添加事件监听器

\`\`\`typescript
useEffect(() => {
  // 监听垂直滚动到 500px 时触发
  const unsubscribe = scrollMethods.addEventListener(
    500,
    "y",
    (position, direction) => {
      console.log(\`滚动到了 \${position}px\`);
      // 执行你的逻辑
    }
  );

  // 组件卸载时取消订阅
  return unsubscribe;
}, [scrollMethods]);
\`\`\`

### 监听水平滚动

\`\`\`typescript
// 监听水平滚动到 300px 时触发
const unsubscribe = scrollMethods.addEventListener(300, "x", (position) => {
  console.log(\`水平滚动到了 \${position}px\`);
});
\`\`\`

### 移除事件监听器

\`\`\`typescript
// 移除特定监听器
scrollMethods.removeEventListener(500, "y", callback);

// 移除所有匹配位置和方向的监听器
scrollMethods.removeEventListener(500, "y");

// 清除所有事件监听器
scrollMethods.clearAllEventListeners();
\`\`\`

## API 参考

### useScroll(target?, options?)

#### 参数

| 参数      | 类型                                   | 默认值     | 描述     |
| --------- | -------------------------------------- | ---------- | -------- |
| \`target\`  | \`BasicTarget<HTMLElement \\| Document>\` | \`document\` | 滚动目标 |
| \`options\` | \`ScrollOptions\`                         | \`{}\`       | 配置选项 |

**target 支持的类型：**

| 类型                            | 描述                 | 示例                                   |
| ------------------------------- | -------------------- | -------------------------------------- |
| \`RefObject<HTMLElement>\`        | React ref 对象       | \`useRef<HTMLDivElement>(null)\`         |
| \`HTMLElement\`                   | DOM 元素             | \`document.getElementById('container')\` |
| \`Document\`                      | 文档对象（窗口滚动） | \`document\`                             |
| \`() => HTMLElement \\| Document\` | 返回元素的函数       | \`() => document.getElementById('id')\`  |
| \`undefined\`                     | 默认为窗口滚动       | -                                      |

**options 配置项：**

| 属性              | 类型     | 默认值 | 描述                                 |
| ----------------- | -------- | ------ | ------------------------------------ |
| \`scrollThreshold\` | \`number\` | \`1\`    | 滚动阈值（px），用于判断是否到达边界 |
| \`debounceDelay\`   | \`number\` | \`100\`  | 防抖延迟（ms），优化性能             |

#### 返回值

返回一个数组 \`[scrollState, scrollMethods]\`

| 索引 | 名称            | 类型            | 描述         |
| ---- | --------------- | --------------- | ------------ |
| \`0\`  | \`scrollState\`   | \`ScrollState\`   | 滚动状态对象 |
| \`1\`  | \`scrollMethods\` | \`ScrollMethods\` | 滚动方法对象 |

### ScrollState

滚动状态对象，包含当前滚动的各种状态信息。

| 属性                  | 类型      | 描述                                     |
| --------------------- | --------- | ---------------------------------------- |
| \`x\`                   | \`number\`  | 水平滚动位置（px）                       |
| \`y\`                   | \`number\`  | 垂直滚动位置（px）                       |
| \`isTop\`               | \`boolean\` | 是否在顶部（距离顶部 ≤ scrollThreshold） |
| \`isBottom\`            | \`boolean\` | 是否在底部（距离底部 ≤ scrollThreshold） |
| \`isLeft\`              | \`boolean\` | 是否在左侧（距离左侧 ≤ scrollThreshold） |
| \`isRight\`             | \`boolean\` | 是否在右侧（距离右侧 ≤ scrollThreshold） |
| \`hasVerticalScroll\`   | \`boolean\` | 是否有垂直滚动条                         |
| \`hasHorizontalScroll\` | \`boolean\` | 是否有水平滚动条                         |

### ScrollMethods

滚动方法对象，包含各种滚动操作和事件监听器管理方法。

#### 滚动方法

| 方法             | 参数                                                        | 返回值 | 描述           |
| ---------------- | ----------------------------------------------------------- | ------ | -------------- |
| \`scrollToTop\`    | \`options?: ScrollOptions\`                                   | \`void\` | 滚动到顶部     |
| \`scrollToBottom\` | \`options?: ScrollOptions\`                                   | \`void\` | 滚动到底部     |
| \`scrollToLeft\`   | \`options?: ScrollOptions\`                                   | \`void\` | 滚动到左侧     |
| \`scrollToRight\`  | \`options?: ScrollOptions\`                                   | \`void\` | 滚动到右侧     |
| \`scrollTo\`       | \`target: number \\| targetPosition, options?: ScrollOptions\` | \`void\` | 滚动到指定位置 |

#### 事件监听器方法

| 方法                     | 参数                                                                      | 返回值       | 描述                                 |
| ------------------------ | ------------------------------------------------------------------------- | ------------ | ------------------------------------ |
| \`addEventListener\`       | \`position: number, direction: 'x' \\| 'y', callback: ScrollEventCallback\`  | \`() => void\` | 添加滚动事件监听器，返回取消订阅函数 |
| \`removeEventListener\`    | \`position: number, direction: 'x' \\| 'y', callback?: ScrollEventCallback\` | \`void\`       | 移除滚动事件监听器                   |
| \`clearAllEventListeners\` | -                                                                         | \`void\`       | 清除所有事件监听器                   |

#### ScrollEventCallback

事件回调函数类型：\`(currentPosition: number, direction: 'x' | 'y') => void\`

| 参数              | 类型         | 描述               |
| ----------------- | ------------ | ------------------ |
| \`currentPosition\` | \`number\`     | 当前滚动位置（px） |
| \`direction\`       | \`'x' \\| 'y'\` | 滚动方向           |

### ScrollOptions

滚动动画配置选项。

| 属性        | 类型                  | 默认值     | 描述               |
| ----------- | --------------------- | ---------- | ------------------ |
| \`duration\`  | \`number\`              | \`300\`      | 动画持续时间（ms） |
| \`animation\` | \`ScrollAnimationType\` | \`'smooth'\` | 缓动函数类型       |

#### ScrollAnimationType

| 类型                               | 描述             | 示例                                      |
| ---------------------------------- | ---------------- | ----------------------------------------- |
| \`'smooth'\`                         | 平滑缓动         | \`{ animation: 'smooth' }\`                 |
| \`'linear'\`                         | 线性缓动         | \`{ animation: 'linear' }\`                 |
| \`'ease'\`                           | 标准缓动         | \`{ animation: 'ease' }\`                   |
| \`'ease-in'\`                        | 缓入             | \`{ animation: 'ease-in' }\`                |
| \`'ease-out'\`                       | 缓出             | \`{ animation: 'ease-out' }\`               |
| \`'ease-in-out'\`                    | 缓入缓出         | \`{ animation: 'ease-in-out' }\`            |
| \`[number, number, number, number]\` | 自定义贝塞尔曲线 | \`{ animation: [0.25, 0.46, 0.45, 0.94] }\` |

### targetPosition

滚动目标位置对象，用于 \`scrollTo\` 方法。

| 属性 | 类型               | 描述             | 示例             |
| ---- | ------------------ | ---------------- | ---------------- |
| \`x\`  | \`number \\| string\` | 水平滚动目标位置 | \`100\` 或 \`'50%'\` |
| \`y\`  | \`number \\| string\` | 垂直滚动目标位置 | \`200\` 或 \`'25%'\` |

**支持的值类型：**
- \`number\`: 像素值，如 \`100\`
- \`string\`: 百分比值，如 \`'50%'\`（相对于可滚动区域）

## 高级用法

### 多个事件监听器

\`\`\`typescript
useEffect(() => {
  const unsubscribers = [
    scrollMethods.addEventListener(200, "y", () => console.log("到达 200px")),
    scrollMethods.addEventListener(500, "y", () => console.log("到达 500px")),
    scrollMethods.addEventListener(1000, "y", () => console.log("到达 1000px")),
  ];

  return () => unsubscribers.forEach((fn) => fn());
}, [scrollMethods]);
\`\`\`

### 百分比滚动

\`\`\`typescript
// 滚动到 50% 位置
scrollMethods.scrollTo({ y: "50%" });

// 滚动到水平 25% 位置
scrollMethods.scrollTo({ x: "25%" });
\`\`\`

### 自定义缓动函数

\`\`\`typescript
// 使用自定义贝塞尔曲线
scrollMethods.scrollToTop({
  duration: 1000,
  animation: [0.25, 0.46, 0.45, 0.94], // cubic-bezier
});
\`\`\`

## 注意事项

1. **自动清理**: 组件卸载时会自动清理所有事件监听器
2. **重复触发**: 事件监听器支持重复触发，当滚动位置回到目标位置下方再次超过时会重新触发
3. **性能优化**: 内部使用防抖和 requestAnimationFrame 优化性能
4. **类型安全**: 完整的 TypeScript 类型支持

## 示例场景

- 滚动到特定位置时显示/隐藏元素
- 滚动进度指示器
- 懒加载触发
- 滚动动画触发
- 导航栏状态切换
- 滚动统计和分析

## API 速查表

### Hook 调用

\`\`\`typescript
const [scrollState, scrollMethods] = useScroll(target?, options?)
\`\`\`

### 快速参考

| 功能           | 方法/属性                                   | 示例                                           |
| -------------- | ------------------------------------------- | ---------------------------------------------- |
| 获取滚动位置   | \`scrollState.x\`, \`scrollState.y\`            | \`console.log(scrollState.y)\`                   |
| 检查边界状态   | \`scrollState.isTop\`, \`scrollState.isBottom\` | \`if (scrollState.isTop) { ... }\`               |
| 滚动到顶部     | \`scrollMethods.scrollToTop()\`               | \`scrollMethods.scrollToTop({ duration: 500 })\` |
| 滚动到指定位置 | \`scrollMethods.scrollTo()\`                  | \`scrollMethods.scrollTo(500)\`                  |
| 百分比滚动     | \`scrollMethods.scrollTo()\`                  | \`scrollMethods.scrollTo({ y: '50%' })\`         |
| 添加事件监听   | \`scrollMethods.addEventListener()\`          | \`addEventListener(500, 'y', callback)\`         |
| 移除事件监听   | \`scrollMethods.removeEventListener()\`       | \`removeEventListener(500, 'y')\`                |
| 清除所有监听   | \`scrollMethods.clearAllEventListeners()\`    | \`clearAllEventListeners()\`                     |
`;

const useScrollDemo: React.FC = () => {
  return <NotePreview>{readmeContent}</NotePreview>;
};

export default useScrollDemo;
