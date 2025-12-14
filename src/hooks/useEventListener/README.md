# useEventListener

一个用于添加事件监听器的 React Hook，支持多种目标元素和事件类型。

## 功能特性

- ✅ **事件监听**: 简化事件监听器的添加和移除
- ✅ **多目标支持**: 支持 DOM 元素、window、document 等
- ✅ **自动清理**: 组件卸载时自动移除监听器
- ✅ **类型安全**: 完整的 TypeScript 类型支持

## 基本用法

```typescript
import useEventListener from "./useEventListener";

function Component() {
  useEventListener("click", (event) => {
    console.log("Window clicked:", event);
  });

  const buttonRef = useRef(null);

  useEventListener(
    "click",
    (event) => {
      console.log("Button clicked:", event);
    },
    buttonRef
  );

  return <button ref={buttonRef}>点击我</button>;
}
```

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
