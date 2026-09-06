# Form 表单组件

通过 Context 收集字段值，使用 async-validator 校验表单。

## 交互指南

1. 清空用户名或密码后提交，查看必填错误。
2. 输入超过 6 个字符的用户名，查看长度错误。
3. 填写有效值提交，在开发者控制台观察 onFinish 输出。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/form/FormDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `initialValues` | object | 字段初始值 |
| `onFinish` | function | 校验成功回调 |
| `onFinishFailed` | function | 校验失败回调 |
| `Form.Item.name / rules` | 字段配置 | 字段名与校验规则 |
| `valuePropName` | string | Checkbox 使用 checked |

## 使用边界

演示没有真实登录请求，登录按钮仅触发表单校验。字段通过 name 注册，示例的输出位于控制台。

## 源码位置

- 演示入口：`src/components/form/FormDemo.tsx`
- 相关实现：`src/components/form`
