---
title: 本地开发
---

# 本地开发

站点使用 **VitePress + Vite + React + TypeScript**。文档是静态页面，React 示例在独立画布内按需运行。

## 启动项目

建议使用 Node.js 22 LTS 或更新的兼容版本。

```sh
npm install --legacy-peer-deps
npm start
```

打开 `http://localhost:5173`。启动命令会同时启动文档站与 React 演示服务，无需手动运行两个终端。

## 编辑文档

业务文档的源文件仍位于 `src/hooks`、`src/components` 等目录的 `README.md` 中。

```sh
npm run sync-docs
npm run site:generate
```

`site/hooks`、`site/components`、`site/ecosystem`、`site/projects` 中的内容由脚本生成。首页同样由生成器维护；指南与主题可以直接编辑。

## 添加示例

1. 在 `src` 中创建 React 演示组件，默认导出一个无需参数的页面组件。
2. 编写对应目录的 `README.md`。
3. 在 `docs/examples/manifest.json` 注册页面标题、源码入口和文档路径。
4. 同步文档并重新生成站点。

组件、生态与项目的交互入口根据清单生成，使用动态导入按需加载。Hooks 文档由目录自动发现；若目录下存在 `demo/index.tsx`，会自动增加运行入口。

## 上传服务

上传演示需要另开终端：

```sh
npm run server
```

默认接口为 `http://localhost:3333/upload`。在线静态网站不包含此服务，需要实际上传时应部署自己的接口并修改配置。

## 构建与预览

```sh
npm run build
npm run preview
```

构建会检查文档覆盖、生成页面、检查 TypeScript、编译 React 示例，并生成静态站点。完整输出位于 `build/`，包含独立 HTML、搜索索引、站点地图和交互示例。

## 发布

```sh
npm run deploy
```

沿用项目现有 GitHub Pages 配置，发布到 `BRUCE-JIN002.github.io`。所有文档都拥有独立的 HTML 地址，直接访问、刷新与分享不依赖开发服务器。
