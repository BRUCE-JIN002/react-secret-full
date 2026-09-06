# Icon 图标

比较 Ant Design SVG、自定义 SVG 和 IconFont 三种图标封装方式。

## 交互指南

1. 切换小、中、大尺寸，观察图标和间距变化。
2. 将指针移到 IconFont 图标上查看图标名称。
3. 对照 Icon.tsx、createIcon.tsx 和 createFromIconFont.tsx 阅读封装。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/Icon/IconDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `style` | CSSProperties | 通过 fontSize、color 设置 SVG 图标 |
| `spin` | boolean | 自定义 SVG 旋转效果 |
| `type` | string | IconFont symbol 名称 |
| `size` | string | IconFont 显示尺寸，例如 20px |

## 使用边界

IconFont 演示从阿里 CDN 加载外部脚本，需要网络。图标是否存在取决于该脚本提供的 symbol；不能将任意名称视作有效图标。

## 源码位置

- 演示入口：`src/components/Icon/IconDemo.tsx`
- 相关实现：`src/components/Icon`
