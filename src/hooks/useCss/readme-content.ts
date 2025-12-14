// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useCss

一个用于在 React 组件中动态生成和应用 CSS 样式的 Hook，基于 nano-css 实现。

## 功能特性

- ✅ **动态 CSS**: 在运行时动态生成和应用 CSS 样式
- ✅ **类型安全**: 支持 TypeScript 类型检查
- ✅ **嵌套样式**: 支持 CSS 嵌套语法
- ✅ **自动清理**: 组件卸载时自动清理生成的样式
- ✅ **性能优化**: 基于 nano-css 的高性能实现
- ✅ **唯一类名**: 自动生成唯一的 CSS 类名避免冲突

## 基本用法

\`\`\`typescript
import useCss from "./useCss";

function StyledComponent() {
  const className = useCss({
    color: 'red',
    fontSize: '16px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px'
  });

  return (
    <div className={className}>
      这是一个动态样式的组件
    </div>
  );
}
\`\`\`

## 高级用法

### 嵌套样式

\`\`\`typescript
function NestedStyleComponent() {
  const className = useCss({
    padding: '20px',
    backgroundColor: 'white',
    
    // 嵌套选择器
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer'
    },
    
    '& .title': {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    
    '& .content': {
      lineHeight: '1.5',
      color: '#666'
    }
  });

  return (
    <div className={className}>
      <div className="title">标题</div>
      <div className="content">内容文本</div>
    </div>
  );
}
\`\`\`

### 响应式样式

\`\`\`typescript
function ResponsiveComponent() {
  const className = useCss({
    padding: '16px',
    fontSize: '14px',
    
    // 媒体查询
    '@media (min-width: 768px)': {
      padding: '24px',
      fontSize: '16px'
    },
    
    '@media (min-width: 1024px)': {
      padding: '32px',
      fontSize: '18px'
    }
  });

  return (
    <div className={className}>
      响应式组件
    </div>
  );
}
\`\`\`

### 动态主题样式

\`\`\`typescript
function ThemedComponent({ theme }) {
  const className = useCss({
    padding: '12px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    
    ...(theme === 'primary' && {
      backgroundColor: '#007bff',
      color: 'white',
      '&:hover': {
        backgroundColor: '#0056b3'
      }
    }),
    
    ...(theme === 'secondary' && {
      backgroundColor: '#6c757d',
      color: 'white',
      '&:hover': {
        backgroundColor: '#545b62'
      }
    }),
    
    ...(theme === 'danger' && {
      backgroundColor: '#dc3545',
      color: 'white',
      '&:hover': {
        backgroundColor: '#c82333'
      }
    })
  });

  return (
    <button className={className}>
      {theme} 按钮
    </button>
  );
}
\`\`\`

### 动画样式

\`\`\`typescript
function AnimatedComponent() {
  const className = useCss({
    width: '100px',
    height: '100px',
    backgroundColor: '#007bff',
    borderRadius: '50%',
    position: 'relative',
    
    // 定义动画
    '@keyframes bounce': {
      '0%, 20%, 50%, 80%, 100%': {
        transform: 'translateY(0)'
      },
      '40%': {
        transform: 'translateY(-30px)'
      },
      '60%': {
        transform: 'translateY(-15px)'
      }
    },
    
    // 应用动画
    animation: 'bounce 2s infinite',
    
    '&:hover': {
      animationPlayState: 'paused'
    }
  });

  return <div className={className} />;
}
\`\`\`

## API 参考

### useCss(css)

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| \`css\` | \`CSSProps\` | CSS 样式对象 |

#### CSSProps 类型

支持标准的 React.CSSProperties 以及嵌套样式：

\`\`\`typescript
type CSSProps = React.CSSProperties | {
  [key: string]: CSSProps;
}
\`\`\`

#### 返回值

| 类型 | 描述 |
|------|------|
| \`string\` | 生成的唯一 CSS 类名 |

## 使用场景

### 条件样式

\`\`\`typescript
function ConditionalStyleComponent({ isActive, size }) {
  const className = useCss({
    padding: size === 'large' ? '16px 24px' : '8px 12px',
    fontSize: size === 'large' ? '16px' : '14px',
    backgroundColor: isActive ? '#28a745' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    
    '&:hover': {
      opacity: 0.8
    },
    
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed'
    }
  });

  return (
    <button className={className}>
      {isActive ? '激活' : '未激活'}
    </button>
  );
}
\`\`\`

### 表单样式

\`\`\`typescript
function StyledForm() {
  const formClassName = useCss({
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  });

  const inputClassName = useCss({
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    
    '&:focus': {
      outline: 'none',
      borderColor: '#007bff',
      boxShadow: '0 0 0 2px rgba(0,123,255,0.25)'
    }
  });

  const buttonClassName = useCss({
    width: '100%',
    padding: '12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    
    '&:hover': {
      backgroundColor: '#0056b3'
    }
  });

  return (
    <form className={formClassName}>
      <input className={inputClassName} placeholder="用户名" />
      <input className={inputClassName} type="password" placeholder="密码" />
      <button className={buttonClassName} type="submit">
        登录
      </button>
    </form>
  );
}
\`\`\`

### 卡片组件

\`\`\`typescript
function Card({ children, variant = 'default' }) {
  const className = useCss({
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
    
    ...(variant === 'elevated' && {
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: 'translateY(-2px)'
    }),
    
    ...(variant === 'outlined' && {
      border: '1px solid #e0e0e0',
      boxShadow: 'none'
    }),
    
    '&:hover': {
      ...(variant === 'default' && {
        boxShadow: '0 4px 8px rgba(0,0,0,0.12)'
      })
    }
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
}
\`\`\`

## 注意事项

1. **性能**: 每次调用都会生成新的类名，避免在渲染函数中频繁调用
2. **样式隔离**: 生成的类名是唯一的，不会与其他样式冲突
3. **清理**: 组件卸载时会自动清理生成的样式
4. **嵌套**: 支持 CSS 嵌套语法，但要注意浏览器兼容性

## 依赖

- \`nano-css\`: 轻量级 CSS-in-JS 库
- \`ahooks\`: 提供 useCreation Hook

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
