# useCopyToClipboard

一个用于复制文本到剪贴板的 React Hook，提供简单易用的剪贴板操作功能。

## 功能特性

- ✅ **剪贴板复制**: 使用现代 Clipboard API 复制文本
- ✅ **状态跟踪**: 跟踪最后复制的内容
- ✅ **错误处理**: 自动处理不支持的浏览器和复制失败的情况
- ✅ **异步操作**: 支持 Promise 返回复制结果
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **兼容性检查**: 自动检测浏览器是否支持 Clipboard API

## 基本用法

```typescript
import { useCopyToClipboard } from "./useCopyToClipboard";

function MyComponent() {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = async () => {
    const success = await copy("要复制的文本");
    if (success) {
      console.log("复制成功！");
    } else {
      console.log("复制失败！");
    }
  };

  return (
    <div>
      <button onClick={handleCopy}>复制文本</button>
      {copiedText && <p>已复制: {copiedText}</p>}
    </div>
  );
}
```

## 高级用法

### 复制动态内容

```typescript
function CodeBlock({ code }: { code: string }) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopyCode = async () => {
    const success = await copy(code);
    if (success) {
      // 显示成功提示
      message.success("代码已复制到剪贴板");
    } else {
      // 显示失败提示
      message.error("复制失败，请手动复制");
    }
  };

  return (
    <div className="code-block">
      <pre>{code}</pre>
      <button onClick={handleCopyCode}>
        {copiedText === code ? "已复制" : "复制代码"}
      </button>
    </div>
  );
}
```

### 复制表单数据

```typescript
function ShareForm() {
  const [copiedText, copy] = useCopyToClipboard();
  const [url, setUrl] = useState("");

  const handleShare = async () => {
    const shareUrl = `https://example.com/share?url=${encodeURIComponent(url)}`;
    const success = await copy(shareUrl);

    if (success) {
      alert("分享链接已复制！");
    }
  };

  return (
    <div>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="输入要分享的链接"
      />
      <button onClick={handleShare}>复制分享链接</button>
    </div>
  );
}
```

### 批量复制操作

```typescript
function BatchCopyList({ items }: { items: string[] }) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopyAll = async () => {
    const allText = items.join("\n");
    await copy(allText);
  };

  const handleCopyItem = async (item: string) => {
    await copy(item);
  };

  return (
    <div>
      <button onClick={handleCopyAll}>复制全部</button>
      {items.map((item, index) => (
        <div key={index}>
          <span>{item}</span>
          <button onClick={() => handleCopyItem(item)}>
            {copiedText === item ? "已复制" : "复制"}
          </button>
        </div>
      ))}
    </div>
  );
}
```

## API 参考

### useCopyToClipboard()

#### 返回值

返回一个数组 `[copiedText, copy]`

| 索引 | 名称         | 类型             | 描述               |
| ---- | ------------ | ---------------- | ------------------ |
| `0`  | `copiedText` | `string \| null` | 最后复制的文本内容 |
| `1`  | `copy`       | `CopyFn`         | 复制函数           |

#### copy 函数

```typescript
copy(text: string) => Promise<boolean>
```

**参数：**

- `text`: 要复制到剪贴板的文本

**返回值：**

- `Promise<boolean>`: 复制是否成功

## 使用场景

### 代码复制功能

```typescript
function CodeSnippet({ code, language }: { code: string; language: string }) {
  const [copiedText, copy] = useCopyToClipboard();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = async () => {
    const success = await copy(code);
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  return (
    <div className="code-snippet">
      <div className="code-header">
        <span>{language}</span>
        <button onClick={handleCopy}>
          {showSuccess ? "✓ 已复制" : "复制"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
```

### 联系信息复制

```typescript
function ContactCard({ email, phone }: { email: string; phone: string }) {
  const [copiedText, copy] = useCopyToClipboard();

  return (
    <div className="contact-card">
      <div>
        <span>邮箱: {email}</span>
        <button onClick={() => copy(email)}>
          {copiedText === email ? "已复制" : "复制邮箱"}
        </button>
      </div>
      <div>
        <span>电话: {phone}</span>
        <button onClick={() => copy(phone)}>
          {copiedText === phone ? "已复制" : "复制电话"}
        </button>
      </div>
    </div>
  );
}
```

### 分享功能

```typescript
function ShareButton({ title, url }: { title: string; url: string }) {
  const [copiedText, copy] = useCopyToClipboard();

  const handleShare = async () => {
    const shareText = `${title} - ${url}`;
    const success = await copy(shareText);

    if (success) {
      // 可以添加 toast 提示
      console.log("分享内容已复制");
    }
  };

  return (
    <button onClick={handleShare}>
      {copiedText?.includes(url) ? "已复制分享内容" : "复制分享"}
    </button>
  );
}
```

## 错误处理

Hook 内置了错误处理机制：

1. **浏览器兼容性**: 自动检测是否支持 `navigator.clipboard`
2. **复制失败**: 捕获复制过程中的异常
3. **控制台警告**: 在不支持或失败时输出警告信息

```typescript
// Hook 内部的错误处理
if (!navigator?.clipboard) {
  console.warn("Clipboard not supported");
  return false;
}

try {
  await navigator.clipboard.writeText(text);
  return true;
} catch (error) {
  console.warn("Copy failed", error);
  return false;
}
```

## 注意事项

1. **HTTPS 要求**: Clipboard API 需要在 HTTPS 环境下使用
2. **用户交互**: 复制操作必须在用户交互（如点击）中触发
3. **浏览器支持**: 现代浏览器支持，旧版本可能需要 polyfill
4. **权限**: 某些浏览器可能需要用户授权剪贴板访问
5. **文本限制**: 只支持纯文本复制，不支持富文本或二进制数据

## 兼容性

- ✅ Chrome 66+
- ✅ Firefox 63+
- ✅ Safari 13.1+
- ✅ Edge 79+
- ❌ Internet Explorer (不支持)

## 替代方案

对于不支持 Clipboard API 的环境，可以考虑：

1. 使用 `document.execCommand('copy')` 作为降级方案
2. 显示文本选择提示，让用户手动复制
3. 使用第三方库如 `clipboard.js`
