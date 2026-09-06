# React Secret

基于 **VitePress + Vite + React + TypeScript** 的学习与实践网站。包含 34 篇 Hooks 文档、18 个组件示例、4 个基础组件、12 个生态示例和 1 个综合项目。

网站提供独立首页、分组文档导航、中文全文搜索、页内目录、深浅色主题、上一篇 / 下一篇以及移动端导航。69 篇业务文档生成独立 HTML，33 个 React 演示按需加载。

## 本地开发

建议 Node.js 22 LTS 或更新的兼容版本。

```sh
npm install --legacy-peer-deps
npm start
```

打开 [http://127.0.0.1:5173](http://127.0.0.1:5173)。启动器同时运行文档站（5173）和 React 演示服务（5174），文档站代理 `/playground/` 请求。

```sh
npm run build      # 文档检查、类型检查、演示编译、静态站点生成
npm run preview    # 预览生产包：http://127.0.0.1:4173
npm run deploy     # 构建并发布到原有 GitHub Pages 仓库
```

完整生产输出为 `build/`，文档可作为静态文件提供；AI 生成功能需要独立 Node.js 后端。当前网站部署在阿里云，原有 GitHub Pages 发布命令仍保留。Docker 与 GitHub Actions 手动发布配置参见 [阿里云部署说明](deploy/README.md)。

## 文档维护

文档源文件仍保存在各业务目录的 `README.md` 中：[文档目录](docs/README.md)。

```sh
npm run sync-docs
npm run site:generate
npm run check-docs
```

修改文档后运行前两条命令更新站点。构建也会自动生成站点；若旧工作台的文档副本未同步，构建会提示执行 `sync-docs`。

- `docs/examples/manifest.json`：组件、生态与项目文档 / 演示清单。
- `src/hooks/*/README.md`：自动发现的 Hook 文档。
- `src/hooks/*/demo/index.tsx`：存在时自动提供交互入口。
- `site/guide`：可直接编辑的指南。
- `scripts/generate-site.mjs`：首页、分类目录、业务页面和演示注册表生成器。

生成目录 `site/hooks`、`site/components`、`site/ecosystem`、`site/projects`、`.vitepress/catalog.json` 和 `src/playground/registry.ts` 不手动编辑、不提交。首页 `site/index.md` 由生成器维护。

## 技术结构

| 路径 | 用途 |
| --- | --- |
| site/.vitepress/config.mts | VitePress 导航、中文搜索、主题与静态输出 |
| site/.vitepress/theme | 主题样式与 DemoFrame 演示容器 |
| src/playground | React 演示入口与按需加载注册表 |
| vite.playground.config.mts | React 编译、样式处理和演示输出 |
| scripts/dev-site.mjs | 同时启动并管理两个开发服务 |
| scripts/build-site.mjs | 完整生产构建流程 |
| scripts/check-site.mjs | 校验静态页面、引用资源、演示与站点地图 |
| src/hooks / components / third-party-lib / ts-projects | 原有实现和演示源码 |

VitePress 负责 Markdown、静态 HTML、路由、语法高亮与搜索；React 在 iframe 中运行，避免两套框架的生命周期和示例全局 CSS 互相干扰。点击「运行演示」才加载示例，首页不会下载 React 示例运行时。关闭页面会销毁演示环境；「重置演示」不清除浏览器持久化数据。

开发和发布统一使用 VitePress / Vite，已移除旧 CRA 启动命令，不再使用 3000 端口。原工作台源码暂留供历史参考，react-scripts 仅用于运行现有 Hook 测试。

## 检查

```sh
npm run check-docs
npx tsc --noEmit
npm run build
npm run check-site
```

旧 Hook 测试仍可执行 `npm test -- --watchAll=false`。已有 `useEventListener` 的两个用例将非冒泡事件发给 document，但实现默认监听 window；该既有测试差异不属于这次站点迁移。

## 外部依赖

上传示例需要另开终端运行 `npm run server`，默认接口为 `http://localhost:3333/upload`。在线部署时需提供实际上传服务。部分图片、图标和 Monaco 编辑器依赖外部资源；加载失败不会影响文档阅读。各示例的实际能力以对应「使用边界」为准。

## 设计与技术参考

- [react-docs 参考站](https://message163.github.io/react-docs/)
- [VitePress](https://vitepress.dev/)
- [Vite](https://vite.dev/)

沿用参考站的首页与文档布局模式，保留 React Secret 的名称、内容和已有 React 标识。

## AI Playground

站点导航新增 AI Playground，整合 react-playground 的多文件编辑、浏览器编译与交互预览。描述需求后 AI 返回完整文件集合，通过编译校验后自动更新预览；支持继续修改、停止生成、撤销最近 10 次 AI/导入操作、本地保存和 JSON 工程导入导出。编辑代码后 450ms 自动重新编译。

支持 React 18、TSX/TS/JSX/JS/CSS/JSON 和相对路径模块，不支持任意 npm 包、后端服务或预览内网络请求。JSON 工程用于重新导入此工作台，不是可直接 npm 启动的工程。预览在不含 allow-same-origin 的 sandbox iframe 中运行；本地 React 运行时随构建输出，不依赖 CDN。

本地 `npm start` 同时提供 `/api/ai/status` 和 `/api/ai/generate`。在不提交的 `.env.local` 中设置 `AI_ENV_FILE` 指向现有服务端 env 文件，或设置 `AI_API_KEY`、`AI_BASE_URL`、`AI_MODEL`。兼容现有 DeepSeek 配置（DEEPSEEK_API_KEY / DEEPSEEK_API_MODEL）和 OpenAI-compatible 配置（OPENAI_API_KEY / OPENAI_BASE_URL / MODEL_NAME）。Key 只由 Node 服务读取。需 Node.js 22+。

GitHub Pages 只托管静态资源，不提供 AI 计算。线上需另行运行 `npm run ai:serve`（默认仅监听 127.0.0.1:5180），通过同源反向代理转发 `/api/ai/*`，并在代理层配置身份认证及调用限额。未连接服务时仍可编辑和预览，界面会提示 AI 不可用。不要将本地个人密钥代理直接公开。

验证：`npm run test:ai`、`npx tsc --noEmit`、`npm run build`、`npm run check-site`。

### 深浅主题适配

每次 AI 生成默认要求支持两种主题。预览提供背景、文字、边框、主按钮、成功/警告/错误的语义变量；前景色与背景色成对定义。主题适配检查会自动在独立的浅色和深色沙箱中渲染当前文件，检查初始页面普通文字的对比度，同时提示未定义变量、固定配色及仅跟随系统主题的写法。检查不改写代码，也不切换主预览的交互状态。

展开预览下方“主题适配检查”可查看结果，点击“修复主题适配”会将当前代码及报告交给已配置的 AI 服务；生成后自动重新检查，可撤销修改。固定配色提示不代表一定有问题。渐变/图片/复杂透明背景、伪元素、交互状态和完整无障碍合规仍需人工检查；检测仅覆盖前 600 个 DOM 元素，不将超时或运行失败标记为通过。
