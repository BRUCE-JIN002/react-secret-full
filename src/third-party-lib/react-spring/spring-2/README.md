# react-spring 多元素动画

对比多组弹簧与跟随式动画，理解多个元素的运动关系。

## 交互指南

1. 观察同时执行与依次执行两列。
2. 重置演示重新比较启动过程。
3. 在源文件中调整 duration 或目标宽度。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-spring/spring-2/SpringBox2";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `useSprings` | Hook | 创建多个可单独控制的动画 |
| `useTrail` | Hook | 创建相互跟随的动画序列 |
| `api.start` | function | 挂载时把宽度动画到容器可用列宽，不超过 400 |

## 使用边界

示例内部创建三项动画，不对外提供 props。useTrail 的效果由弹簧跟随产生，不是业务任务队列。

## 源码位置

- 演示入口：`src/third-party-lib/react-spring/spring-2/SpringBox2.tsx`
- 相关实现：`src/third-party-lib/react-spring/spring-2`
