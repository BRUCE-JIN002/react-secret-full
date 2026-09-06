# CheckCard 多选卡片

以卡片形式展示可选择项目，包含禁用、加载和分组选择。

## 交互指南

1. 点击基础卡片切换选中状态。
2. 比较禁用、禁用选中和加载状态。
3. 在 Group 中选择 A、B、C，查看多选结果。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/checkCard/CheckCardDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `title / description / avatar` | 内容配置 | 卡片文字与头像 |
| `defaultChecked / disabled / loading` | boolean | 初始选中、禁用和加载 |
| `onChange` | function | 选中变化通知 |
| `CheckCard.Group.multiple` | boolean | 开启分组多选 |
| `value / initValue` | 选项值 / 初始值 | 卡片标识与组初始选择 |

## 使用边界

extra 内的按钮需要 stopPropagation，避免点击操作时切换卡片选中。示例头像来自外部 CDN。

## 源码位置

- 演示入口：`src/components/checkCard/CheckCardDemo.tsx`
- 相关实现：`src/components/checkCard`
