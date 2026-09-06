# Code 代码块

基于 Monaco 的源码阅读面板，演示一个简化状态管理库的实现。

## 交互指南

1. 通过锁图标切换只读与编辑。
2. 选择编辑器主题、切换缩略图。
3. 双击文件名可修改显示名称，点击复制代码复制传入源码。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/code/CodeDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `id` | string | 编辑器配置的持久化标识 |
| `codeString` | string | 显示的源码 |
| `fileName` | string | 显示文件名 |
| `onClick` | () => void | 可选收起代码回调 |

## 使用边界

编辑不会写回本地文件，复制按钮复制当前预览中的代码；切换页面或重置演示后恢复源码。配置保存在浏览器中。Monaco 资源默认从 CDN 加载；加载期间仍提供可阅读、复制的纯文本源码，离线环境如需编辑则需自行配置 loader。

## 源码位置

- 演示入口：`src/components/code/CodeDemo.tsx`
- 相关实现：`src/components/code`
