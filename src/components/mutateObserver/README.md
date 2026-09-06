# MutateObserver DOM 变化监听

为单个子元素绑定 ref，使用项目内 useMutateObserver 监听 DOM 变更。

## 使用方式

```tsx
import MutateObserver from './components/mutateObserver';

export default function ObserverExample() {
  return (
    <MutateObserver
      options={{ childList: true, subtree: true, characterData: true }}
      onMutate={(records) => console.log(records)}
    >
      <div contentEditable suppressContentEditableWarning>编辑这段文字</div>
    </MutateObserver>
  );
}
```

## API

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| children | ReactElement | 单个原生元素，或能转发 HTMLElement ref 的组件 |
| options | MutationObserverInit | 监听哪些变更 |
| onMutate | (records, observer) => void | 接收变更记录 |

options 至少启用 childList、attributes、characterData 之一。子元素原有 ref 会被此包装器替换，不会自动合并。不要在回调内无条件修改被观察区域，以免形成循环。详细 Hook 说明见 ../../hooks/useMutateObserver/README.md。此基础组件没有独立导航页。
