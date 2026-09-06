# KeepAlive 组件缓存

根据 activeName 缓存子树，并在切换时移动缓存 DOM，保留组件内部状态。

## 使用方式

```tsx
import { useState } from 'react';
import KeepAlive, { useKeepaliveRef } from './components/keepAlive/KeepAlive';

export default function CacheExample() {
  const [page, setPage] = useState('first');
  const aliveRef = useKeepaliveRef();
  return (
    <>
      <button onClick={() => setPage(page === 'first' ? 'second' : 'first')}>切换页面</button>
      <KeepAlive activeName={page} aliveRef={aliveRef} max={5}>
        <input placeholder={page} />
      </KeepAlive>
      <button onClick={() => aliveRef.current?.cleanOtherCache()}>清理其他缓存</button>
    </>
  );
}
```

## API

| 属性 | 默认值 | 说明 |
| --- | --- | --- |
| activeName | 必填 | 当前子树的稳定、唯一名称 |
| max | 10 | 最大缓存数，应大于 0 |
| cache | true | 是否缓存当前子树 |
| strategy | LRU | LRU 淘汰最久未使用项；PRE 淘汰首项 |
| include / exclude | 无 | 字符串、正则或其数组，筛选缓存 |
| aliveRef | 无 | 暴露缓存管理方法 |
| suspenseElement / errorElement | 可选 | 缓存节点的包装组件 |

aliveRef 提供 getCaches、removeCache(name)、cleanAllCache、cleanOtherCache。清理缓存会丢失对应子树的本地状态。缓存保留在内存中，刷新不会恢复；隐藏子树可能仍有订阅和定时器，需要业务自行管理。入口实现为 KeepAlive.tsx，此基础组件没有独立导航页。
