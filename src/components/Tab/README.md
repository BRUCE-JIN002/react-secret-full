# Tab 标签页

将内容按标签切换，提供线条、卡片和不同尺寸样式。

## 交互指南

1. 切换 React、Vue、Angular 标签。
2. 点击禁用项，确认内容不会切换。
3. 查看小尺寸与卡片样式示例。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/Tab/index";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `defaultActive` | string | 初始选中项 name |
| `onChange` | (name: string) => void | 切换通知 |
| `size` | small / default / large | 标签尺寸 |
| `type` | line / card | 视觉样式 |
| `TabItem.name / label / disabled` | 子项配置 | 名称、标签与禁用状态 |

## 使用边界

可复用的 Tab 和 TabItem 从 Tab.tsx 命名导出，目录 index.tsx 默认导出的是演示页。defaultActive 仅设置初始选择。

## 源码位置

- 演示入口：`src/components/Tab/index.tsx`
- 相关实现：`src/components/Tab`
