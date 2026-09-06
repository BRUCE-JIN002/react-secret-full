# react-spring 单元素动画

比较 useSpringValue、useSpring 与命令式 api.start 三种动画写法。

## 交互指南

1. 观察前两项自动增长。
2. 点击 Demo3 启动宽度变化。
3. 点击工作台的重置演示，重新播放。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-spring/spring-1/SpringBox1";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `useSpringValue` | Hook | 驱动单个数值 |
| `useSpring` | Hook | 驱动样式对象 |
| `api.start` | function | 命令式启动动画 |
| `config` | object | 配置 mass、friction、tension 或 duration |

## 使用边界

此页是无 props 的教学演示。动画目标宽度为 400；实际应用中应按容器尺寸计算。

## 源码位置

- 演示入口：`src/third-party-lib/react-spring/spring-1/SpringBox1.tsx`
- 相关实现：`src/third-party-lib/react-spring/spring-1`
