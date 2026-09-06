# click-to-component 开发定位

展示通过页面元素定位 React 组件源码的开发辅助工具。

## 交互指南

1. 在本地开发模式打开示例。
2. 按住 Option（macOS）或 Alt，在目标元素上点击。
3. 根据工具提示选择组件，并尝试在本地编辑器中打开源文件。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./third-party-lib/click-to-component/index";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `ClickToComponent` | React component | 项目入口已挂载的开发辅助组件 |
| `Aaa / Bbb` | 示例组件 | 提供嵌套元素用于定位 |

## 使用边界

定位与打开编辑器依赖本地开发环境和编辑器协议配置。生产构建不能作为完整源码浏览服务。

## 源码位置

- 演示入口：`src/third-party-lib/click-to-component/index.tsx`
- 相关实现：`src/third-party-lib/click-to-component`
