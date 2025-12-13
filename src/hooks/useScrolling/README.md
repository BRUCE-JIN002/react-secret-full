# useScrolling

一个轻量级的 React Hook，用于检测元素或窗口的滚动状态。当用户开始滚动时返回 `true`，滚动停止后延迟一段时间返回 `false`。

## 功能特性

- ✅ **实时滚动检测**: 准确检测滚动开始和结束状态
- ✅ **多目标支持**: 支持窗口、DOM 元素、RefObject 等多种滚动目标
- ✅ **可配置延迟**: 自定义滚动结束的判定延迟时间
- ✅ **性能优化**: 自动清理定时器，避免内存泄漏
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **灵活配置**: 支持延迟初始化和自定义选项

## 基本用法

```typescript
import useScrolling from "./useScrolling";

function MyComponent() {
  // 监听窗口滚动（默认）
  const isScrolling = useScrolling();

  // 监听特定元素滚动
  const containerRef = useRef<HTMLDivElement>(null);
  const isContainerScrolling = useScrolling(containerRef);

  return (
    <div>
      <div>窗口滚动状态: {isScrolling ? "滚动中" : "已停止"}</div>
      <div ref={containerRef} style={{ height: 300, overflow: "auto" }}>
        <div>容器滚动状态: {isContainerScrolling ? "滚动中" : "已停止"}</div>
        {/* 长内容 */}
      </div>
    </div>
  );
}
```

## 高级用法

### 自定义延迟时间

```typescript
// 滚动停止 500ms 后才认为滚动结束
const isScrolling = useScrolling(window, { delay: 500 });
```

### 延迟初始化

```typescript
// 根据条件决定是否开始监听
const [shouldListen, setShouldListen] = useState(false);
const isScrolling = useScrolling(window, { immediate: !shouldListen });
```

### 监听不同类型的目标

```typescript
// 监听 document
const isDocumentScrolling = useScrolling(document);

// 监听特定 DOM 元素
const element = document.getElementById("container");
const isElementScrolling = useScrolling(element);

// 使用函数返回目标元素
const isDynamicScrolling = useScrolling(() =>
  document.querySelector(".dynamic-container")
);
```

## API 参考

### useScrolling(target?, options?)

#### 参数

| 参数      | 类型                  | 默认值   | 描述         |
| --------- | --------------------- | -------- | ------------ |
| `target`  | `ScrollTarget`        | `window` | 滚动监听目标 |
| `options` | `UseScrollingOptions` | `{}`     | 配置选项     |

#### ScrollTarget 类型

| 类型                                              | 描述             | 示例                                   |
| ------------------------------------------------- | ---------------- | -------------------------------------- |
| `RefObject<HTMLElement>`                          | React ref 对象   | `useRef<HTMLDivElement>(null)`         |
| `HTMLElement`                                     | DOM 元素         | `document.getElementById('container')` |
| `Document`                                        | 文档对象         | `document`                             |
| `Window`                                          | 窗口对象         | `window`                               |
| `() => HTMLElement \| Document \| Window \| null` | 返回元素的函数   | `() => document.querySelector('.box')` |
| `null \| undefined`                               | 默认监听窗口滚动 | -                                      |

#### UseScrollingOptions 配置

| 属性        | 类型      | 默认值 | 描述                                   |
| ----------- | --------- | ------ | -------------------------------------- |
| `delay`     | `number`  | `150`  | 滚动结束的延迟时间（毫秒）             |
| `immediate` | `boolean` | `true` | 是否立即开始监听，false 则不会开始监听 |

#### 返回值

| 类型      | 描述                                              |
| --------- | ------------------------------------------------- |
| `boolean` | 滚动状态，`true` 表示正在滚动，`false` 表示已停止 |

## 使用场景

### 滚动指示器

```typescript
function ScrollIndicator() {
  const isScrolling = useScrolling();

  return (
    <div className={`scroll-indicator ${isScrolling ? "active" : ""}`}>
      {isScrolling ? "📜 滚动中..." : "✋ 滚动已停止"}
    </div>
  );
}
```

### 滚动性能优化

```typescript
function ExpensiveComponent() {
  const isScrolling = useScrolling();

  // 滚动时暂停昂贵的动画或计算
  const shouldAnimate = !isScrolling;

  return (
    <div className={shouldAnimate ? "animate" : "paused"}>{/* 复杂内容 */}</div>
  );
}
```

### 滚动状态同步

```typescript
function ScrollSyncComponents() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useScrolling(containerRef, { delay: 100 });

  return (
    <div>
      <div className={`header ${isScrolling ? "scrolling" : ""}`}>
        头部在滚动时改变样式
      </div>
      <div ref={containerRef} className="scrollable-content">
        {/* 可滚动内容 */}
      </div>
      <div className={`footer ${isScrolling ? "hidden" : "visible"}`}>
        滚动时隐藏的底部
      </div>
    </div>
  );
}
```

### 滚动事件统计

```typescript
function ScrollTracker() {
  const isScrolling = useScrolling();
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    if (isScrolling) {
      setScrollCount((prev) => prev + 1);
    }
  }, [isScrolling]);

  return <div>滚动次数: {scrollCount}</div>;
}
```

## 实现原理

1. **事件监听**: 监听目标元素的 `scroll` 事件
2. **状态管理**: 滚动开始时立即设置状态为 `true`
3. **延迟判定**: 使用 `setTimeout` 延迟设置状态为 `false`
4. **防抖处理**: 连续滚动时会清除之前的定时器，重新计时
5. **自动清理**: 组件卸载时自动移除事件监听器和清理定时器

## 注意事项

1. **内存管理**: Hook 会自动清理事件监听器和定时器，无需手动处理
2. **延迟时间**: `delay` 参数影响滚动结束的判定灵敏度，过小可能导致频繁切换
3. **目标元素**: 确保传入的目标元素在组件生命周期内保持稳定
4. **性能考虑**: 避免在滚动回调中执行昂贵的操作

## 与其他 Hook 的区别

| Hook              | 用途                   | 返回值                   |
| ----------------- | ---------------------- | ------------------------ |
| `useScrolling`    | 检测滚动状态           | `boolean` (是否正在滚动) |
| `useScroll`       | 获取滚动位置和控制滚动 | `[state, methods]`       |
| `useScrollDetect` | 检测滚动位置和边界状态 | `[state, methods]`       |

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)

## 最佳实践

1. **合理设置延迟**: 根据具体需求调整 `delay` 参数
2. **避免频繁重渲染**: 将滚动状态用于样式控制而非复杂逻辑
3. **组合使用**: 与其他滚动相关 Hook 配合使用以实现复杂功能
4. **性能优化**: 在滚动时暂停不必要的动画和计算
