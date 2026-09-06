# Portal 挂载容器

通过 createPortal 把子树挂载到指定 DOM 容器，适合浮层、消息等需要跳出父布局的内容。

## 使用方式

```tsx
import Portal from './components/portal';

export default function PortalExample() {
  return <Portal attach="body"><div>挂载到 body 的内容</div></Portal>;
}
```

## API

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| attach | HTMLElement 或 string | 元素或 CSS 选择器，默认 document.body |
| children | ReactNode | 要挂载的内容 |
| ref | React ref | 暴露生成的 portal-wrapper 元素 |

挂载时创建并追加容器，卸载时移除。选择器应在挂载时匹配到真实元素；无匹配时内容不会出现在页面中。实现直接访问 document，服务端渲染需要客户端边界。源码为本目录 index.tsx；此基础组件没有独立导航页。
