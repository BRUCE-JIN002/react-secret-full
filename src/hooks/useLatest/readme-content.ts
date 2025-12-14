// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useLatest

一个用于获取最新值引用的 React Hook，确保在异步操作中始终能访问到最新的值。

## 功能特性

- ✅ **最新值引用**: 始终返回最新值的引用
- ✅ **异步安全**: 在异步操作中避免闭包陷阱
- ✅ **性能优化**: 避免不必要的重新渲染
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **简单易用**: API 简洁，易于理解

## 基本用法

\`\`\`typescript
import useLatest from "./useLatest";

function MyComponent() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  const handleAsyncOperation = useCallback(() => {
    setTimeout(() => {
      // 使用 latestCount.current 获取最新值
      console.log('最新的 count 值:', latestCount.current);
    }, 1000);
  }, []); // 依赖数组为空，但仍能获取最新值

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>增加</button>
      <button onClick={handleAsyncOperation}>异步操作</button>
    </div>
  );
}
\`\`\`

## 高级用法

### 解决闭包陷阱

\`\`\`typescript
function CounterWithTimer() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  // 错误的方式 - 闭包陷阱
  const startTimerWrong = useCallback(() => {
    setInterval(() => {
      console.log('错误的 count:', count); // 始终是 0
    }, 1000);
  }, []); // count 不在依赖中，形成闭包陷阱

  // 正确的方式 - 使用 useLatest
  const startTimerCorrect = useCallback(() => {
    setInterval(() => {
      console.log('正确的 count:', latestCount.current); // 始终是最新值
    }, 1000);
  }, []); // 依赖数组为空，但能获取最新值

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(c => c + 1)}>增加</button>
      <button onClick={startTimerCorrect}>开始定时器</button>
    </div>
  );
}
\`\`\`

### 事件处理器优化

\`\`\`typescript
function OptimizedEventHandler() {
  const [data, setData] = useState({ name: '', age: 0 });
  const latestData = useLatest(data);

  // 事件处理器不需要重新创建
  const handleSubmit = useCallback(async () => {
    try {
      // 使用最新的数据进行提交
      await submitData(latestData.current);
      console.log('提交成功');
    } catch (error) {
      console.error('提交失败:', error);
    }
  }, []); // 空依赖数组，避免重新创建

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={data.name}
        onChange={(e) => setData(prev => ({ ...prev, name: e.target.value }))}
        placeholder="姓名"
      />
      <input
        type="number"
        value={data.age}
        onChange={(e) => setData(prev => ({ ...prev, age: Number(e.target.value) }))}
        placeholder="年龄"
      />
      <button type="submit">提交</button>
    </form>
  );
}
\`\`\`

### WebSocket 消息处理

\`\`\`typescript
function WebSocketComponent() {
  const [messages, setMessages] = useState<string[]>([]);
  const [user, setUser] = useState({ id: 1, name: 'User' });
  
  const latestUser = useLatest(user);
  const latestMessages = useLatest(messages);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      // 使用最新的用户信息和消息列表
      if (message.userId !== latestUser.current.id) {
        setMessages(prev => [...prev, message.text]);
      }
    };

    ws.onopen = () => {
      // 发送最新的用户信息
      ws.send(JSON.stringify({
        type: 'join',
        user: latestUser.current
      }));
    };

    return () => ws.close();
  }, []); // 空依赖数组，但能访问最新值

  return (
    <div>
      <div>用户: {user.name}</div>
      <div>消息列表:</div>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
\`\`\`

### 防抖函数优化

\`\`\`typescript
function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const latestQuery = useLatest(query);

  // 防抖搜索函数
  const debouncedSearch = useCallback(
    debounce(async () => {
      const searchQuery = latestQuery.current;
      if (searchQuery) {
        const results = await searchAPI(searchQuery);
        // 确保使用的是最新的查询词
        if (latestQuery.current === searchQuery) {
          setResults(results);
        }
      }
    }, 300),
    [] // 空依赖数组
  );

  useEffect(() => {
    debouncedSearch();
  }, [query, debouncedSearch]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      <div>
        {results.map((result, index) => (
          <div key={index}>{result.title}</div>
        ))}
      </div>
    </div>
  );
}
\`\`\`

## API 参考

### useLatest(value)

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| \`value\` | \`T\` | 需要获取最新引用的值 |

#### 返回值

| 类型 | 描述 |
|------|------|
| \`{ readonly current: T }\` | 包含最新值的只读引用对象 |

## 使用场景

### 1. 异步操作

\`\`\`typescript
function AsyncComponent() {
  const [count, setCount] = useState(0);
  const latestCount = useLatest(count);

  const handleAsyncIncrement = useCallback(async () => {
    await delay(1000);
    // 使用最新值进行计算
    setCount(latestCount.current + 1);
  }, []);

  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={handleAsyncIncrement}>异步增加</button>
    </div>
  );
}
\`\`\`

### 2. 定时器

\`\`\`typescript
function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const latestIsRunning = useLatest(isRunning);

  useEffect(() => {
    const timer = setInterval(() => {
      if (latestIsRunning.current) {
        setSeconds(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 空依赖数组

  return (
    <div>
      <div>秒数: {seconds}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? '暂停' : '开始'}
      </button>
    </div>
  );
}
\`\`\`

### 3. 事件监听器

\`\`\`typescript
function EventListenerComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const latestPosition = useLatest(position);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 可以访问最新的位置信息进行计算
      const deltaX = e.clientX - latestPosition.current.x;
      const deltaY = e.clientY - latestPosition.current.y;
      
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []); // 空依赖数组

  return (
    <div>
      鼠标位置: ({position.x}, {position.y})
    </div>
  );
}
\`\`\`

## 注意事项

1. **只读引用**: 返回的 ref 对象是只读的，不应该直接修改
2. **不触发重渲染**: 修改 ref.current 不会触发组件重新渲染
3. **闭包问题**: 主要用于解决异步操作中的闭包陷阱问题
4. **性能考虑**: 避免在渲染过程中频繁访问 ref.current

## 最佳实践

1. **异步操作**: 在异步操作中使用以获取最新值
2. **事件处理**: 在需要稳定引用的事件处理器中使用
3. **定时器**: 在定时器回调中访问最新状态
4. **避免滥用**: 不要在所有地方都使用，只在需要时使用

## 与其他 Hook 的区别

| Hook | 用途 | 重渲染 | 引用稳定性 |
|------|------|--------|------------|
| \`useState\` | 状态管理 | 是 | 否 |
| \`useRef\` | 可变引用 | 否 | 是 |
| \`useLatest\` | 最新值引用 | 否 | 是 |
| \`useCallback\` | 函数缓存 | 否 | 条件稳定 |

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
