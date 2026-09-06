# Upload 拖拽上传

实现文件选择、拖拽上传、进度通知和上传结果回调。

## 交互指南

1. 先在项目根目录运行 npm run server，启动 3333 端口的上传服务。
2. 点击上传区域选择图片，或将图片拖到区域内。
3. 观察上传列表与控制台中的进度、成功或失败回调。

## 在项目中运行

点击本页的“运行演示”，或在独立窗口中体验示例。也可在 `src` 下的页面中直接挂载现有演示：

```tsx
import Example from "./components/upload/UploadDemo";

export default function ExamplePage() {
  return <Example />;
}
```

## API 与实现要点

| 名称 | 类型或形式 | 说明 |
| --- | --- | --- |
| `action` | string | 上传地址，本例 `http://localhost:3333/upload` |
| `name` | string | 表单字段名，本例 file |
| `drag` | boolean | 启用拖拽上传 |
| `accept` | string | 本例 .png, .jpg, .jpeg |
| `beforeUpload` | function | 返回 false 阻止上传 |
| `onProgress / onSuccess / onError` | function | 进度与结果回调 |

## 使用边界

beforeUpload 会拒绝名称含 1.image 的文件。accept 仅是客户端选择提示，服务端仍需校验文件。远程或 HTTPS 部署必须调整上传地址。

## 源码位置

- 演示入口：`src/components/upload/UploadDemo.tsx`
- 相关实现：`src/components/upload`
