// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = `# useDebounceFn

一个用于对函数进行防抖处理的 React Hook，在函数频繁调用时延迟执行。

## 功能特性

- ✅ **函数防抖**: 对频繁调用的函数进行防抖处理
- ✅ **可配置延迟**: 自定义防抖延迟时间
- ✅ **类型安全**: 完整的 TypeScript 类型支持
- ✅ **取消机制**: 支持取消待执行的函数
- ✅ **立即执行**: 支持首次立即执行选项

## 基本用法

\`\`\`typescript
import useDebounceFn from "./useDebounceFn";

function SearchComponent() {
  const debouncedSearch = useDebounceFn((query: string) => {
    // 执行搜索 API 调用
    searchAPI(query);
  }, { wait: 500 });

  return (
    <input
      onChange={(e) => debouncedSearch(e.target.value)}
      placeholder="输入搜索关键词"
    />
  );
}
\`\`\`

## 兼容性

- ✅ React 16.8+
- ✅ TypeScript 4.0+
- ✅ 现代浏览器
`;
