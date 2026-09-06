# MinCalendar 迷你日历

提供紧凑的月份导航和日期选择，适合小型日期面板。

## 交互指南

1. 点击左右箭头切换月份。
2. 点击日期，左侧示例会显示 onChange 返回的日期。
3. 右侧点击“回到今天”，调用 ref.setDate 更新日历。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/miniCalendar/Demo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `value` | Date | 初始化显示日期，默认当前日期 |
| `onChange` | (date: Date) => void | 点击日期时触发 |
| `ref` | CalendarRef | getDate() 读取日期，setDate(date) 设置日期 |

## 使用边界

value 当前作为内部状态初始值，不会在父组件更新 value 时自动同步，因此不是完整的受控组件。需要主动更新时使用 ref.setDate。切换月份默认选中该月 1 日，但不会触发 onChange。

## 源码位置

- 演示入口：`src/components/miniCalendar/Demo.tsx`
- 相关实现：`src/components/miniCalendar`
