# Popover 气泡卡片

使用 Floating UI 定位浮层，可选择悬浮或点击触发。

## 交互指南

1. 将鼠标移到 Hover me 按钮上。
2. 移开以关闭浮层。
3. 重复操作，演示在关闭后随机切换 placement。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/popover/PopoverDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `content` | ReactNode | 浮层内容，必填 |
| `trigger` | hover / click | 触发方式，默认 hover |
| `placement` | AlignedPlacement | 方位及 start/end 对齐，默认 top |
| `showArrow` | boolean | 显示箭头，默认 false |
| `onOpenChange` | (open: boolean) => void | 打开状态改变通知 |

## 使用边界

open 当前仅初始化内部状态，不会同步后续外部更新。狭窄空间下会自动翻转方位，实际显示位置可能不同于 placement。

## 源码位置

- 演示入口：`src/components/popover/PopoverDemo.tsx`
- 相关实现：`src/components/popover`
