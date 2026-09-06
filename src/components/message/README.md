# Message 全局提示

通过 Provider 与 useMessage 展示成功、错误、警告、信息和加载消息。

## 交互指南

1. 依次点击不同类型按钮。
2. 点击 Loading，观察约一秒后更新为成功提示。
3. 对照 ConfigProvider 与 useMessage 阅读消息上下文和队列实现。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/message/MessageDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `ConfigProvider` | React component | 必须包裹使用 useMessage 的组件 |
| `message.add` | function | 添加消息并返回 id |
| `message.update` | function | 根据 id 更新已有消息 |
| `content / type / position` | 消息配置 | 设置文字、类型与显示位置 |

## 使用边界

本项目自实现的 useMessage 与 antd.message 是两套不同接口；不要混用 Provider。演示的异步完成使用定时器模拟。

## 源码位置

- 演示入口：`src/components/message/MessageDemo.tsx`
- 相关实现：`src/components/message`
