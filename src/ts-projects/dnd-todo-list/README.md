# TodoList 拖拽待办

组合拖拽交互、待办状态和 Zustand 持久化，完成一个小型任务列表。

## 交互指南

1. 通过新增区域创建任务。
2. 拖动任务到列表间隙调整位置。
3. 切换任务状态，或拖到垃圾桶删除。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./ts-projects/dnd-todo-list/TodoListDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `ListItem` | object | id、content 与 todo/done 状态 |
| `addItem(item, id?)` | function | 追加或插入到指定任务前 |
| `updateItem(item)` | function | 按 id 更新任务 |
| `deleteItem(id)` | function | 移除任务 |

## 使用边界

任务存储在当前浏览器 localStorage 的 todoList 中。工作台重置演示只重新挂载组件，不会清除持久化任务。没有服务端同步，删除操作未提供撤销。

## 源码位置

- 演示入口：`src/ts-projects/dnd-todo-list/TodoListDemo.tsx`
- 相关实现：`src/ts-projects/dnd-todo-list`
