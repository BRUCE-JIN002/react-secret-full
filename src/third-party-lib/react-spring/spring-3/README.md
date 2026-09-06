# react-spring 复杂动画

使用 useSpringRef 和 useChain 编排多组样式动画。

## 交互指南

1. 进入演示观察宽度和高度变化。
2. 重置演示重复播放。
3. 修改 useChain 的时间参数比较动画重叠关系。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-spring/spring-3/SpringBox3";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `useSpringRef` | Hook | 创建动画组引用 |
| `useSprings` | Hook | 本例分别驱动 width 与 height |
| `useChain` | Hook | 组合引用与相对时间偏移 |

## 使用边界

源码使用 useChain([api1, api2], [0, 1], 500)，第二组按时间偏移启动，不保证等待第一组完成。

## 源码位置

- 演示入口：`src/third-party-lib/react-spring/spring-3/SpringBox3.tsx`
- 相关实现：`src/third-party-lib/react-spring/spring-3`
