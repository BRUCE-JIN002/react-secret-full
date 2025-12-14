// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useCookies

一个用于管理浏览器 Cookie 的 React Hook，提供读取、设置和删除 Cookie 的功能。

## 功能特性

- ✅ **Cookie 读取**: 获取指定名称的 Cookie 值
- ✅ **Cookie 设置**: 设置 Cookie 值和选项
- ✅ **Cookie 删除**: 删除指定的 Cookie
- ✅ **状态同步**: Cookie 变化时自动更新组件状态
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **选项配置**: 支持过期时间、域名、路径等配置

## 基本用法

\`\`\`typescript
import useCookies from "./useCookies";

function MyComponent() {
  const [cookieValue, setCookie, deleteCookie] = useCookies("userToken");

  const handleLogin = () => {
    // 设置 Cookie，7天后过期
    setCookie("abc123", { expires: 7 });
  };

  const handleLogout = () => {
    // 删除 Cookie
    deleteCookie();
  };

  return (
    <div>
      <div>当前 Token: {cookieValue || "未设置"}</div>
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
}
\`\`\`

## 高级用法

### 设置 Cookie 选项

\`\`\`typescript
const [userPrefs, setUserPrefs] = useCookies("userPreferences");

// 设置带选项的 Cookie
setUserPrefs(JSON.stringify({ theme: "dark" }), {
  expires: 30,        // 30天后过期
  domain: ".example.com", // 域名
  path: "/",          // 路径
  secure: true,       // 仅 HTTPS
  sameSite: "strict"  // SameSite 策略
});
\`\`\`

### 存储复杂数据

\`\`\`typescript
const [userSettings, setUserSettings] = useCookies("settings");

const saveSettings = (settings: object) => {
  setUserSettings(JSON.stringify(settings));
};

const loadSettings = () => {
  try {
    return userSettings ? JSON.parse(userSettings) : {};
  } catch {
    return {};
  }
};
\`\`\`

## API 参考

### useCookies(cookieName)

#### 参数

| 参数 | 类型 | 描述 |
|------|------|------|
| \`cookieName\` | \`string\` | Cookie 的名称 |

#### 返回值

返回一个数组 \`[value, setCookie, deleteCookie]\`

| 索引 | 名称 | 类型 | 描述 |
|------|------|------|------|
| \`0\` | \`value\` | \`string \\| null\` | Cookie 的当前值 |
| \`1\` | \`setCookie\` | \`Function\` | 设置 Cookie 的函数 |
| \`2\` | \`deleteCookie\` | \`Function\` | 删除 Cookie 的函数 |

#### setCookie 函数

\`\`\`typescript
setCookie(newValue: string, options?: Cookies.CookieAttributes) => void
\`\`\`

**参数：**
- \`newValue\`: Cookie 的新值
- \`options\`: Cookie 选项（可选）

**选项配置：**
- \`expires\`: 过期时间（天数或 Date 对象）
- \`domain\`: 域名
- \`path\`: 路径
- \`secure\`: 是否仅 HTTPS
- \`sameSite\`: SameSite 策略

#### deleteCookie 函数

\`\`\`typescript
deleteCookie() => void
\`\`\`

删除指定名称的 Cookie。

## 使用场景

### 用户认证

\`\`\`typescript
function AuthManager() {
  const [token, setToken, deleteToken] = useCookies("authToken");

  const login = async (credentials) => {
    const response = await api.login(credentials);
    setToken(response.token, { expires: 7, secure: true });
  };

  const logout = () => {
    deleteToken();
    // 重定向到登录页
  };

  return { isLoggedIn: !!token, login, logout };
}
\`\`\`

### 用户偏好设置

\`\`\`typescript
function ThemeProvider() {
  const [theme, setTheme] = useCookies("theme");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme, { expires: 365 });
  };

  return (
    <div className={\`theme-\${theme || "light"}\`}>
      <button onClick={toggleTheme}>切换主题</button>
    </div>
  );
}
\`\`\`

### 购物车状态

\`\`\`typescript
function ShoppingCart() {
  const [cartData, setCartData, clearCart] = useCookies("cart");

  const addItem = (item) => {
    const cart = cartData ? JSON.parse(cartData) : [];
    cart.push(item);
    setCartData(JSON.stringify(cart));
  };

  const getCartItems = () => {
    try {
      return cartData ? JSON.parse(cartData) : [];
    } catch {
      return [];
    }
  };

  return {
    items: getCartItems(),
    addItem,
    clearCart
  };
}
\`\`\`

## 注意事项

1. **数据序列化**: Cookie 只能存储字符串，复杂对象需要 JSON 序列化
2. **大小限制**: Cookie 有 4KB 的大小限制
3. **安全性**: 敏感信息应设置 \`secure\` 和 \`httpOnly\` 选项
4. **跨域**: 注意 \`domain\` 和 \`sameSite\` 设置对跨域的影响
5. **过期时间**: 合理设置过期时间，避免数据过期

## 依赖

- \`js-cookie\`: 用于 Cookie 操作的底层库

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
- ✅ 服务端渲染 (SSR)
`;
