# Watermark 水印

在内容区域上方平铺文字水印，演示水印图案与 DOM 监听。

## 交互指南

1. 进入演示观察平铺文字。
2. 修改 content 调整水印文字。
3. 修改 gap、offset 和 fontStyle 比较间距、偏移和颜色。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/watermark/WatermarkDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `content` | string[] | 水印文字行 |
| `gap` | [number, number] | 横向与纵向间隔 |
| `offset` | [number, number] | 水印偏移 |
| `fontStyle` | object | 字体样式，如 color |

## 使用边界

容器必须有可见宽高。水印用于内容标识，不能保证阻止截图、编辑或删除内容。

## 源码位置

- 演示入口：`src/components/watermark/WatermarkDemo.tsx`
- 相关实现：`src/components/watermark`
