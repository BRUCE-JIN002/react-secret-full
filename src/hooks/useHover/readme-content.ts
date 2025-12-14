// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useHover

一个用于检测元素悬停状态的 React Hook，提供简单易用的鼠标悬停检测功能。

## 功能特性

- ✅ **悬停检测**: 检测鼠标是否悬停在元素上
- ✅ **状态管理**: 自动管理悬停状态
- ✅ **事件处理**: 自动处理 mouseenter 和 mouseleave 事件
- ✅ **函数式元素**: 支持根据悬停状态动态渲染元素
- ✅ **事件保留**: 保留原有的鼠标事件处理器
- ✅ **类型安全**: 完整的 TypeScript 类型支持

## 基本用法

\`\`\`typescript
import useHover from "./useHover";

function HoverComponent() {
  const [hoverable, isHovered] = useHover(
    <div style={{ 
      padding: '20px', 
      backgroundColor: isHovered ? '#f0f0f0' : 'white',
      border: '1px solid #ccc'
    }}>
      悬停我试试！
    </div>
  );

  return (
    <div>
      {hoverable}
      <p>悬停状态: {isHovered ? '是' : '否'}</p>
    </div>
  );
}
\`\`\`

## 高级用法

### 函数式元素

\`\`\`typescript
function DynamicHoverComponent() {
  const [hoverable, isHovered] = useHover(
    (hovered) => (
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: hovered ? '#007bff' : '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.2s ease'
        }}
      >
        {hovered ? '悬停中...' : '悬停我'}
      </button>
    )
  );

  return (
    <div>
      {hoverable}
      <div>当前状态: {isHovered ? '悬停' : '正常'}</div>
    </div>
  );
}
\`\`\`

### 卡片悬停效果

\`\`\`typescript
function HoverCard({ title, content, image }: CardProps) {
  const [card, isHovered] = useHover(
    <div
      style={{
        padding: '16px',
        borderRadius: '8px',
        boxShadow: isHovered 
          ? '0 8px 25px rgba(0,0,0,0.15)' 
          : '0 2px 8px rgba(0,0,0,0.1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s ease',
        backgroundColor: 'white',
        cursor: 'pointer'
      }}
    >
      <img 
        src={image} 
        alt={title}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '4px'
        }}
      />
      <h3 style={{ margin: '12px 0 8px 0' }}>{title}</h3>
      <p style={{ color: '#666', margin: 0 }}>{content}</p>
    </div>
  );

  return (
    <div>
      {card}
      {isHovered && (
        <div style={{ 
          position: 'absolute', 
          bottom: '10px', 
          right: '10px',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          点击查看详情
        </div>
      )}
    </div>
  );
}
\`\`\`

### 工具提示

\`\`\`typescript
function TooltipComponent({ children, tooltip }: TooltipProps) {
  const [element, isHovered] = useHover(
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {children}
    </span>
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {element}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#333',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            marginBottom: '5px'
          }}
        >
          {tooltip}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #333'
            }}
          />
        </div>
      )}
    </div>
  );
}

// 使用示例
function App() {
  return (
    <div>
      <TooltipComponent tooltip="这是一个提示信息">
        <button>悬停显示提示</button>
      </TooltipComponent>
    </div>
  );
}
\`\`\`

### 图片预览

\`\`\`typescript
function ImagePreview({ src, alt }: ImageProps) {
  const [image, isHovered] = useHover(
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '200px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '8px',
          filter: isHovered ? 'brightness(0.8)' : 'brightness(1)',
          transition: 'filter 0.3s ease'
        }}
      />
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px'
          }}
        >
          🔍 点击放大
        </div>
      )}
    </div>
  );

  return image;
}
\`\`\`

## API 参考

### useHover(element)

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| \`element\` | \`Element\` | 要检测悬停的元素 |

#### Element 类型

\`\`\`typescript
type Element = 
  | ((state: boolean) => React.ReactElement)
  | React.ReactElement;
\`\`\`

支持两种类型：
- **React 元素**: 直接传入 JSX 元素
- **函数**: 接收悬停状态，返回 JSX 元素

#### 返回值

返回一个数组 \`[element, isHovered]\`

| 索引 | 名称 | 类型 | 描述 |
|------|------|------|------|
| \`0\` | \`element\` | \`React.ReactElement\` | 增强后的 React 元素 |
| \`1\` | \`isHovered\` | \`boolean\` | 当前悬停状态 |

## 使用场景

### 导航菜单

\`\`\`typescript
function NavigationMenu() {
  const menuItems = ['首页', '产品', '服务', '关于我们'];

  return (
    <nav style={{ display: 'flex', gap: '20px' }}>
      {menuItems.map((item) => {
        const [menuItem, isHovered] = useHover(
          <a
            href={\`/\${item.toLowerCase()}\`}
            style={{
              padding: '10px 15px',
              textDecoration: 'none',
              color: isHovered ? '#007bff' : '#333',
              backgroundColor: isHovered ? '#f8f9fa' : 'transparent',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            {item}
          </a>
        );

        return <div key={item}>{menuItem}</div>;
      })}
    </nav>
  );
}
\`\`\`

### 产品展示

\`\`\`typescript
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '20px'
    }}>
      {products.map((product) => {
        const [productCard, isHovered] = useHover(
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.2s ease'
            }}
          >
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div style={{ padding: '16px' }}>
              <h3>{product.name}</h3>
              <p style={{ color: '#666' }}>{product.description}</p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  ¥{product.price}
                </span>
                {isHovered && (
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px'
                  }}>
                    加入购物车
                  </button>
                )}
              </div>
            </div>
          </div>
        );

        return <div key={product.id}>{productCard}</div>;
      })}
    </div>
  );
}
\`\`\`

## 注意事项

1. **事件处理**: Hook 会自动处理 mouseenter 和 mouseleave 事件
2. **原有事件**: 保留元素原有的鼠标事件处理器
3. **性能**: 避免在悬停状态变化时执行昂贵的操作
4. **移动设备**: 移动设备上没有悬停概念，需要考虑替代方案

## 最佳实践

1. **渐进增强**: 确保没有悬停效果时功能仍然可用
2. **性能优化**: 避免在悬停回调中执行复杂计算
3. **可访问性**: 考虑键盘导航和屏幕阅读器用户
4. **移动适配**: 为移动设备提供替代的交互方式

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
