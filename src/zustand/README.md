# my-zustand 状态管理

实现简化版外部状态容器，并通过 useSyncExternalStore 让嵌套组件订阅共享状态。

## 交互指南

1. 在第一个输入框输入文本。
2. 观察下方 aaa 同步变化。
3. 修改第二个输入框，观察 bbb；切换演示不会自动清除模块级 store。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./zustand/TestZustand";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `create` | function | 通过 set、get 和 api 创建 store |
| `selector` | function | 从 store 选择所需字段 |
| `setState` | function | 更新并通知订阅者 |
| `subscribe` | function | 注册监听并返回取消订阅函数 |

## 使用边界

这是教学实现，不等同于官方 Zustand 的完整功能。此例状态存在内存中，刷新页面后重置。

## 源码位置

- 演示入口：`src/zustand/TestZustand.jsx`
- 相关实现：`src/zustand`
