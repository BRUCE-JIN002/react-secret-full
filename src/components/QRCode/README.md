# QRCode 二维码

通过 Ant Design QRCode 展示编码内容，并演示尺寸控制。

## 交互指南

1. 点击加号放大二维码。
2. 点击减号缩小二维码。
3. 在边界尺寸下，对应按钮会禁用。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/QRCode/QrCode";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `size` | number | 示例初始 220，每次增减 20，范围 200–600 |
| `value` | string | 二维码编码内容，在示例源文件中设置 |
| `errorLevel` | string | 示例使用 H 纠错等级 |

## 使用边界

当前页面没有编码内容输入框。复用时替换 value，避免把真实网络凭据提交到代码仓库。此示例是 Ant Design 组件的使用展示。

## 源码位置

- 演示入口：`src/components/QRCode/QrCode.tsx`
- 相关实现：`src/components/QRCode`
