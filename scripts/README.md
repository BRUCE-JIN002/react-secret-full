# 脚本说明

## sync-readme.js

这个脚本用于将 README.md 文件的内容同步到 TypeScript 文件中，以便在 React 组件中直接导入使用。

### 使用方法

```bash
# 同步特定 hook 的 README
npm run sync-readme src/hooks/useScroll

# 或者直接使用 node
node scripts/sync-readme.js src/hooks/useScroll
```

### 工作原理

1. 读取指定目录下的 `README.md` 文件
2. 转义特殊字符（反引号、反斜杠、模板字符串语法）
3. 生成 `readme-content.ts` 文件，导出 README 内容为字符串常量
4. Demo 组件可以直接导入这个常量，避免重复维护内容

### 优势

- **单一数据源**: README.md 是唯一的文档源
- **自动同步**: 通过脚本保持文档和代码的一致性
- **类型安全**: 生成的 TypeScript 文件提供完整的类型支持
- **构建兼容**: 不依赖特殊的构建工具功能（如 `?raw` 导入）

### 注意事项

- `readme-content.ts` 文件是自动生成的，不要手动编辑
- 每次更新 README.md 后需要运行同步脚本
- 可以考虑在 git hooks 中自动运行此脚本
