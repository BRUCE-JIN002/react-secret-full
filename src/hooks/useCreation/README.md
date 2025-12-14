# useCreation

一个用于创建昂贵对象的 React Hook，类似于 `useMemo`，但提供更强的语义保证，确保对象只在依赖变化时重新创建。

## 功能特性

- ✅ **强语义保证**: 确保对象只在依赖变化时创建，不受 React 内部优化影响
- ✅ **性能优化**: 避免昂贵对象的重复创建
- ✅ **依赖比较**: 使用 `Object.is` 进行精确的依赖比较
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **简单易用**: API 与 `useMemo` 类似，易于理解

## 基本用法

```typescript
import useCreation from "./useCreation";

function MyComponent({ config }) {
  // 创建昂贵的对象，只在 config 变化时重新创建
  const expensiveObject = useCreation(() => {
    return new ExpensiveClass(config);
  }, [config]);

  return <div>{expensiveObject.render()}</div>;
}
```

## 与 useMemo 的区别

`useCreation` 提供比 `useMemo` 更强的语义保证：

```typescript
// useMemo 可能会在某些情况下重新计算（React 内部优化）
const memoizedValue = useMemo(() => createExpensiveObject(), [dep]);

// useCreation 保证只在依赖变化时重新创建
const createdValue = useCreation(() => createExpensiveObject(), [dep]);
```

## 高级用法

### 创建复杂实例

```typescript
function DataProcessor({ apiUrl, options }) {
  // 创建数据处理器实例
  const processor = useCreation(() => {
    return new DataProcessor({
      url: apiUrl,
      ...options,
      onError: (error) => console.error("Processing error:", error),
    });
  }, [apiUrl, options]);

  const handleProcess = (data) => {
    return processor.process(data);
  };

  return (
    <div>
      <button onClick={() => handleProcess(someData)}>处理数据</button>
    </div>
  );
}
```

### 创建正则表达式

```typescript
function SearchComponent({ pattern, flags }) {
  // 创建正则表达式，避免每次渲染都重新编译
  const regex = useCreation(() => {
    try {
      return new RegExp(pattern, flags);
    } catch (error) {
      console.warn("Invalid regex pattern:", pattern);
      return new RegExp(".*"); // 默认匹配所有
    }
  }, [pattern, flags]);

  const handleSearch = (text) => {
    return regex.test(text);
  };

  return (
    <div>
      <input
        onChange={(e) => {
          const isMatch = handleSearch(e.target.value);
          console.log("Match:", isMatch);
        }}
        placeholder="输入搜索内容"
      />
    </div>
  );
}
```

### 创建 Map 和 Set

```typescript
function CollectionComponent({ items, keyExtractor }) {
  // 创建 Map 集合
  const itemMap = useCreation(() => {
    const map = new Map();
    items.forEach((item) => {
      map.set(keyExtractor(item), item);
    });
    return map;
  }, [items, keyExtractor]);

  // 创建 Set 集合
  const uniqueIds = useCreation(() => {
    return new Set(items.map((item) => item.id));
  }, [items]);

  const hasItem = (key) => itemMap.has(key);
  const isUniqueId = (id) => uniqueIds.has(id);

  return (
    <div>
      <div>总数: {itemMap.size}</div>
      <div>唯一ID数: {uniqueIds.size}</div>
    </div>
  );
}
```

### 创建 Worker

```typescript
function WorkerComponent({ workerScript }) {
  // 创建 Web Worker
  const worker = useCreation(() => {
    const worker = new Worker(workerScript);

    worker.onmessage = (event) => {
      console.log("Worker result:", event.data);
    };

    worker.onerror = (error) => {
      console.error("Worker error:", error);
    };

    return worker;
  }, [workerScript]);

  useEffect(() => {
    // 组件卸载时终止 Worker
    return () => {
      worker.terminate();
    };
  }, [worker]);

  const sendTask = (data) => {
    worker.postMessage(data);
  };

  return (
    <button onClick={() => sendTask({ type: "PROCESS", data: "some data" })}>
      发送任务到 Worker
    </button>
  );
}
```

## API 参考

### useCreation(fn, deps)

#### 参数

| 参数   | 类型             | 描述               |
| ------ | ---------------- | ------------------ |
| `fn`   | `() => T`        | 创建对象的工厂函数 |
| `deps` | `DependencyList` | 依赖数组           |

#### 返回值

| 类型 | 描述           |
| ---- | -------------- |
| `T`  | 创建的对象实例 |

## 使用场景

### 昂贵计算结果

```typescript
function ComplexCalculation({ matrix, algorithm }) {
  const calculator = useCreation(() => {
    return new MatrixCalculator(algorithm, {
      precision: "high",
      cacheSize: 1000,
    });
  }, [algorithm]);

  const result = useMemo(() => {
    return calculator.compute(matrix);
  }, [calculator, matrix]);

  return <div>计算结果: {result}</div>;
}
```

### 第三方库实例

```typescript
function ChartComponent({ data, options }) {
  const chartRef = useRef(null);

  // 创建图表实例
  const chart = useCreation(() => {
    return new Chart(chartRef.current, {
      type: "line",
      options: {
        responsive: true,
        ...options,
      },
    });
  }, [options]);

  useEffect(() => {
    chart.data = data;
    chart.update();
  }, [chart, data]);

  useEffect(() => {
    return () => {
      chart.destroy();
    };
  }, [chart]);

  return <canvas ref={chartRef} />;
}
```

### 缓存管理器

```typescript
function CacheManager({ maxSize, ttl }) {
  const cache = useCreation(() => {
    return new LRUCache({
      max: maxSize,
      ttl: ttl,
      updateAgeOnGet: true,
      allowStale: false,
    });
  }, [maxSize, ttl]);

  const get = (key) => cache.get(key);
  const set = (key, value) => cache.set(key, value);
  const clear = () => cache.clear();

  return { get, set, clear, size: cache.size };
}
```

## 注意事项

1. **依赖数组**: 确保依赖数组包含所有相关变量
2. **对象清理**: 对于需要清理的对象（如 Worker、定时器），使用 `useEffect` 进行清理
3. **性能权衡**: 只对真正昂贵的对象创建使用此 Hook
4. **引用稳定性**: 返回的对象引用在依赖不变时保持稳定

## 最佳实践

1. **合理使用**: 只在对象创建成本较高时使用
2. **依赖管理**: 仔细管理依赖数组，避免不必要的重新创建
3. **资源清理**: 配合 `useEffect` 清理资源
4. **错误处理**: 在工厂函数中添加适当的错误处理

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
