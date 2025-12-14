# useDebounce

一个用于对值进行防抖处理的 React Hook，在值频繁变化时延迟更新，提高性能。

## 功能特性

- ✅ **值防抖**: 对频繁变化的值进行防抖处理
- ✅ **可配置延迟**: 自定义防抖延迟时间
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **性能优化**: 减少不必要的渲染和计算
- ✅ **灵活配置**: 支持多种防抖选项

## 基本用法

```typescript
import useDebounce from "./useDebounce";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, { wait: 500 });

  useEffect(() => {
    if (debouncedSearchTerm) {
      // 执行搜索
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="输入搜索关键词"
    />
  );
}
```

## API 参考

### useDebounce(value, options)

#### 参数

| 参数      | 类型              | 描述         |
| --------- | ----------------- | ------------ |
| `value`   | `T`               | 需要防抖的值 |
| `options` | `DebounceOptions` | 防抖配置选项 |

#### 返回值

| 类型 | 描述       |
| ---- | ---------- |
| `T`  | 防抖后的值 |

## 使用场景

### 搜索输入防抖

```typescript
function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, { wait: 300 });

  useEffect(() => {
    if (debouncedQuery) {
      // API 调用
      searchAPI(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="搜索..."
    />
  );
}
```

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
