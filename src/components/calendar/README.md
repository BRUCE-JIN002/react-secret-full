# Calendar 日历

基于 Dayjs 的月视图日历，支持自定义日期单元格和语言设置。

## 交互指南

1. 通过页头切换月份，或点击今天回到当前日期。
2. 点击单元格选择日期。
3. 在 CalendarDemo 中查看 dateInnerContent 的自定义内容示例。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/calendar/CalendarDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `value` | Dayjs | 初始日期，必填 |
| `onChange` | (date: Dayjs) => void | 选择日期和回到今天时触发 |
| `dateRender` | (date: Dayjs) => ReactNode | 完全替换日期单元格 |
| `dateInnerContent` | (date: Dayjs) => ReactNode | 追加单元格内容 |
| `locale` | string | 语言标识；已提供 zh-CN、en-US |

## 使用边界

value 仅用于初始化内部日期和月份；后续 prop 变化不会自动同步。使用 Dayjs 值，不要直接传入原生 Date。

## 源码位置

- 演示入口：`src/components/calendar/CalendarDemo.tsx`
- 相关实现：`src/components/calendar`
