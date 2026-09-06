# react-spring 综合应用

在 SVG 网格中组合线条绘制和方块缩放动画。

## 交互指南

1. 观察网格线条逐步展开。
2. 继续观察方块按延迟出现。
3. 点击重置演示重新播放整个序列。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-spring/springs/Springs";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `useTrail` | Hook | 生成网格线动画 |
| `useSprings` | Hook | 驱动七个方块 scale |
| `useChain` | Hook | 编排网格和方块 |
| `COORDS` | 坐标数组 | 指定方块在 SVG 中的位置 |

## 使用边界

尺寸与坐标是 SVG viewBox 内的单位。animated.line 和 animated.rect 接收弹簧值，不需要每一帧手动 setState。

## 源码位置

- 演示入口：`src/third-party-lib/react-spring/springs/Springs.tsx`
- 相关实现：`src/third-party-lib/react-spring/springs`
