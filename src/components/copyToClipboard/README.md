# CopyToClipboard 复制包装器

为一个 React 元素补充点击复制能力，底层使用 copy-to-clipboard。

## 使用方式

```tsx
import CopyToClipboard from './components/copyToClipboard';

export default function CopyExample() {
  return (
    <CopyToClipboard text="Hello React" onCopy={(_, success) => console.log(success)}>
      <button>复制文本</button>
    </CopyToClipboard>
  );
}
```

## API

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| text | string | 必填，要复制的文字 |
| children | ReactElement | 必须是单个元素 |
| onCopy | (text, result) => void | 回调包含原文与成功状态 |
| options | object | 可传 debug、message、format |

复制后仍会调用子元素原有的 onClick。调用者应根据 result 提供成功或失败反馈；不要假设浏览器总允许剪贴板操作。源文件为本目录 index.tsx。此基础组件暂未单独注册导航页。
