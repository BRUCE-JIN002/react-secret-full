# Modal 模态框

提供声明式挂载与静态方法两种打开模态框的方式。

## 交互指南

1. 点击 show model 打开挂载式弹窗。
2. 输入内容，点击确定、取消或关闭。
3. 点击静态方式调用，比较 Modal.show 与 Modal.hidden。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/modal/ModalDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `visible` | boolean | 声明式显示状态 |
| `title / width` | 标题 / number | 弹窗标题与宽度 |
| `onOk / onCancel / onClose` | function | 按钮与关闭回调 |
| `Modal.show / Modal.hidden` | 静态方法 | 打开与关闭静态弹窗 |

## 使用边界

静态调用需在回调中主动调用 Modal.hidden。挂载式需要更新 visible。示例的确认操作只关闭弹窗并打印日志。

## 源码位置

- 演示入口：`src/components/modal/ModalDemo.tsx`
- 相关实现：`src/components/modal`
