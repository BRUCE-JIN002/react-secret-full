// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useCounter

一个简单实用的计数器 React Hook，提供增加、减少和设置计数值的功能。

## 功能特性

- ✅ **基础计数**: 支持增加、减少、设置计数值
- ✅ **自定义步长**: 可指定每次增减的数值
- ✅ **初始值设置**: 支持自定义初始计数值
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **简单易用**: API 简洁，易于理解和使用

## 基本用法

\`\`\`typescript
import useCounter from "./useCounter";

function CounterComponent() {
  const [count, { add, dec, set }] = useCounter(0);

  return (
    <div>
      <div>当前计数: {count}</div>
      <button onClick={() => add()}>+1</button>
      <button onClick={() => dec()}>-1</button>
      <button onClick={() => add(5)}>+5</button>
      <button onClick={() => dec(3)}>-3</button>
      <button onClick={() => set(10)}>设置为10</button>
      <button onClick={() => set(0)}>重置</button>
    </div>
  );
}
\`\`\`

## 高级用法

### 购物车数量控制

\`\`\`typescript
function CartItem({ productId, initialQuantity = 1 }) {
  const [quantity, { add, dec, set }] = useCounter(initialQuantity);

  const handleIncrease = () => {
    if (quantity < 99) { // 限制最大数量
      add();
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) { // 限制最小数量
      dec();
    }
  };

  return (
    <div className="cart-item">
      <button onClick={handleDecrease} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrease} disabled={quantity >= 99}>
        +
      </button>
      <button onClick={() => set(1)}>重置</button>
    </div>
  );
}
\`\`\`

### 分页控制器

\`\`\`typescript
function Pagination({ totalPages, onPageChange }) {
  const [currentPage, { add, dec, set }] = useCounter(1);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      add();
      onPageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      dec();
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    set(page);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button onClick={goToPrevPage} disabled={currentPage <= 1}>
        上一页
      </button>
      <span>第 {currentPage} 页，共 {totalPages} 页</span>
      <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
        下一页
      </button>
      <button onClick={() => goToPage(1)}>首页</button>
      <button onClick={() => goToPage(totalPages)}>末页</button>
    </div>
  );
}
\`\`\`

### 评分组件

\`\`\`typescript
function Rating({ maxRating = 5, onRatingChange }) {
  const [rating, { set }] = useCounter(0);

  const handleRating = (value: number) => {
    set(value);
    onRatingChange?.(value);
  };

  return (
    <div className="rating">
      {Array.from({ length: maxRating }, (_, index) => (
        <button
          key={index}
          className={\`star \${index < rating ? 'filled' : ''}\`}
          onClick={() => handleRating(index + 1)}
        >
          ⭐
        </button>
      ))}
      <span>评分: {rating}/{maxRating}</span>
      <button onClick={() => set(0)}>清除评分</button>
    </div>
  );
}
\`\`\`

### 步骤指示器

\`\`\`typescript
function StepIndicator({ steps, onStepChange }) {
  const [currentStep, { add, dec, set }] = useCounter(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      add();
      onStepChange?.(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      dec();
      onStepChange?.(currentStep - 1);
    }
  };

  return (
    <div className="step-indicator">
      <div className="steps">
        {steps.map((step, index) => (
          <div
            key={index}
            className={\`step \${index + 1 <= currentStep ? 'completed' : ''}\`}
            onClick={() => set(index + 1)}
          >
            {index + 1}. {step}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={prevStep} disabled={currentStep <= 1}>
          上一步
        </button>
        <span>步骤 {currentStep} / {steps.length}</span>
        <button onClick={nextStep} disabled={currentStep >= steps.length}>
          下一步
        </button>
      </div>
    </div>
  );
}
\`\`\`

## API 参考

### useCounter(initialValue?)

#### 参数

| 参数 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| \`initialValue\` | \`number\` | \`0\` | 计数器的初始值 |

#### 返回值

返回一个数组 \`[current, actions]\`

| 索引 | 名称 | 类型 | 描述 |
|------|------|------|------|
| \`0\` | \`current\` | \`number\` | 当前计数值 |
| \`1\` | \`actions\` | \`CounterActions\` | 操作方法对象 |

#### CounterActions 对象

| 方法 | 类型 | 描述 |
|------|------|------|
| \`add\` | \`(number?: number) => void\` | 增加计数，默认增加1 |
| \`dec\` | \`(number?: number) => void\` | 减少计数，默认减少1 |
| \`set\` | \`(number: number) => void\` | 设置计数为指定值 |

## 使用场景

### 数量选择器

\`\`\`typescript
function QuantitySelector({ min = 1, max = 100, onChange }) {
  const [quantity, { add, dec, set }] = useCounter(min);

  const handleIncrease = () => {
    if (quantity < max) {
      add();
      onChange?.(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > min) {
      dec();
      onChange?.(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector">
      <button onClick={handleDecrease} disabled={quantity <= min}>
        -
      </button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value) || min;
          if (value >= min && value <= max) {
            set(value);
            onChange?.(value);
          }
        }}
        min={min}
        max={max}
      />
      <button onClick={handleIncrease} disabled={quantity >= max}>
        +
      </button>
    </div>
  );
}
\`\`\`

### 倒计时控制

\`\`\`typescript
function CountdownTimer() {
  const [seconds, { dec, set }] = useCounter(60);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => dec(), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds, dec]);

  const resetTimer = () => set(60);

  return (
    <div>
      <div>倒计时: {seconds}秒</div>
      <button onClick={resetTimer}>重置</button>
      {seconds === 0 && <div>时间到！</div>}
    </div>
  );
}
\`\`\`

### 点赞计数

\`\`\`typescript
function LikeButton({ initialLikes = 0 }) {
  const [likes, { add, dec }] = useCounter(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      dec();
      setIsLiked(false);
    } else {
      add();
      setIsLiked(true);
    }
  };

  return (
    <button
      className={\`like-button \${isLiked ? 'liked' : ''}\`}
      onClick={handleLike}
    >
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  );
}
\`\`\`

## 注意事项

1. **数值类型**: 只支持数字类型的计数
2. **边界控制**: 需要在业务层面控制最大值和最小值
3. **状态持久化**: 计数值不会自动持久化，需要配合其他存储方案
4. **性能**: 对于频繁更新的场景，考虑使用防抖或节流

## 扩展建议

可以基于此 Hook 扩展更多功能：

\`\`\`typescript
// 带边界限制的计数器
function useBoundedCounter(initialValue = 0, min = -Infinity, max = Infinity) {
  const [count, { add, dec, set }] = useCounter(initialValue);

  const safeAdd = (number = 1) => {
    if (count + number <= max) add(number);
  };

  const safeDec = (number = 1) => {
    if (count - number >= min) dec(number);
  };

  const safeSet = (number: number) => {
    if (number >= min && number <= max) set(number);
  };

  return [count, { add: safeAdd, dec: safeDec, set: safeSet }] as const;
}
\`\`\`

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
