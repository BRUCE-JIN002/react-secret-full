# react-dnd 普通拖拽

展示拖拽源、放置目标、自定义拖拽预览和目标状态反馈。

## 交互指南

1. 按住源区域中的色块并拖动。
2. 移入目标区域观察高亮。
3. 松开后观察目标区域的数据变化。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-dnd/react-dnd-1/Page";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `DndProvider` | React component | 本例使用 HTML5Backend |
| `useDrag` | Hook | 声明 box 拖拽类型与载荷 |
| `useDrop` | Hook | 接收 box 并通过 drop 更新数据 |
| `isOver / canDrop` | monitor 状态 | 控制目标反馈 |

## 使用边界

HTML5Backend 主要面向桌面拖拽；触摸支持需另行配置后端。拖拽类型必须与目标 accept 匹配。

## 源码位置

- 演示入口：`src/third-party-lib/react-dnd/react-dnd-1/Page.tsx`
- 相关实现：`src/third-party-lib/react-dnd/react-dnd-1`
