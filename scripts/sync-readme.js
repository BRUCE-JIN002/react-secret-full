#!/usr/bin/env node

/**
 * 同步 README.md 内容到 readme-content.ts
 * 使用方法: node scripts/sync-readme.js src/hooks/useScroll
 */

import fs from "fs";
import path from "path";

function syncReadme(hookDir) {
  const readmePath = path.join(hookDir, "README.md");
  const contentPath = path.join(hookDir, "readme-content.ts");

  if (!fs.existsSync(readmePath)) {
    console.error(`README.md not found in ${hookDir}`);
    return;
  }

  const readmeContent = fs.readFileSync(readmePath, "utf-8");

  // 转义反引号和反斜杠
  const escapedContent = readmeContent
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\${/g, "\\${");

  const tsContent = `// 自动生成的 README 内容
// 这个文件是从 README.md 生成的，请不要手动编辑

export const readmeContent = \`${escapedContent}\`;
`;

  fs.writeFileSync(contentPath, tsContent, "utf-8");
  console.log(`✅ 已同步 ${readmePath} 到 ${contentPath}`);
}

// 获取命令行参数
const hookDir = process.argv[2];

if (!hookDir) {
  console.error(
    "请提供 hook 目录路径，例如: node scripts/sync-readme.js src/hooks/useScroll"
  );
  process.exit(1);
}

syncReadme(hookDir);
