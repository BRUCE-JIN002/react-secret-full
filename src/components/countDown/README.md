# 倒计时

将 useCountDown 的剩余时间展示为天、小时、分钟和秒。

## 交互指南

1. 进入演示查看距离下一年元旦的剩余时间。
2. 等待一秒观察秒数变化。
3. 需要不同截止时间时修改 targetDate。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/countDown/index";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `targetDate` | string | 传给 useCountDown 的截止时间 |
| `formattedRes` | object | 格式化剩余时间 |
| `days / hours / minites / seconds` | number | 当前实现的字段名；分钟拼写为 minites |

## 使用边界

示例目标由浏览器当前年份计算，受本地时钟和时区影响。复用 Hook 时保持 minites 字段拼写与实现一致。

## 源码位置

- 演示入口：`src/components/countDown/index.tsx`
- 相关实现：`src/components/countDown`
