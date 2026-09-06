# react-dnd 拖拽排序

卡片同时作为拖拽源和目标，在悬停时交换列表位置。

## 交互指南

1. 按住一张卡片。
2. 拖过其他卡片观察顺序变化。
3. 松开结束拖拽，重置演示恢复初始列表。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/react-dnd/react-dnd-2/DndPage2";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `Card.data` | CardItem | id 与 content |
| `Card.index` | number | 当前列表位置 |
| `Card.swap` | function | 交换来源与目标位置 |
| `DragData` | object | 拖拽载荷包含 id 与 index |

## 使用边界

此例在 hover 中交换位置，并更新拖拽项 index。排序只保存在当前组件状态，不会写入服务器。

## 源码位置

- 演示入口：`src/third-party-lib/react-dnd/react-dnd-2/DndPage2.tsx`
- 相关实现：`src/third-party-lib/react-dnd/react-dnd-2`
