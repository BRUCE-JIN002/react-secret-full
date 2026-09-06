# SlideInOverlay 转场动画

通过方向和显示状态控制覆盖层进入、离开动画。

## 交互指南

1. 点击 Bottom 从底部打开。
2. 点击关闭观察离场回调提示。
3. 点击 Right 比较从右侧进入效果。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/slideInOverlay/SlidInOverlayDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `isVisible` | boolean | 是否显示覆盖层 |
| `from` | bottom / right | 进入方向 |
| `duration` | number | 动画时长，本例 350 毫秒 |
| `onEnter / onLeave` | function | 进入与离开回调 |

## 使用边界

使用父组件状态关闭覆盖层。演示通过消息展示生命周期回调，覆盖层可能超出预览区域。

## 源码位置

- 演示入口：`src/components/slideInOverlay/SlidInOverlayDemo.tsx`
- 相关实现：`src/components/slideInOverlay`
