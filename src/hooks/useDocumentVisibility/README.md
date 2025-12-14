# useDocumentVisibility

一个用于检测文档可见性状态的 React Hook，监听页面是否处于活跃状态。

## 功能特性

- ✅ **可见性检测**: 检测页面是否可见
- ✅ **事件监听**: 自动监听 visibilitychange 事件
- ✅ **性能优化**: 页面不可见时可暂停操作
- ✅ **类型安全**: 完整的 TypeScript 类型支持

## 基本用法

```typescript
import useDocumentVisibility from "./useDocumentVisibility";

function Component() {
  const isVisible = useDocumentVisibility();

  useEffect(() => {
    if (isVisible) {
      // 页面可见时的操作
      startPolling();
    } else {
      // 页面不可见时的操作
      stopPolling();
    }
  }, [isVisible]);

  return <div>页面可见: {isVisible ? "是" : "否"}</div>;
}
```

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
