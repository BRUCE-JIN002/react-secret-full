import { FC, Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import MenuList, {
  ComponentsType,
  HooksType,
  Projects,
  ThirdParyLibrary,
  navigationEntries,
} from "./menu/Menu";
import { StateCreator, create } from "zustand";
import { persist } from "zustand/middleware";
import CustomHooks from "./modules/CustomHooks";
import ComponentDemo from "./modules/ComponentDemo";
import ThirdLibDemo from "./modules/ThirdLibDemo";
import ComprehensiveDemo from "./modules/ComprehensiveDemo";
import { Button, ConfigProvider, Input, Spin, Grid } from "antd";
import classNames from "classnames";
import { ArrowLeftOutlined, ArrowRightOutlined, BookOutlined, CodeOutlined, GithubOutlined, MenuOutlined, SearchOutlined, BranchesOutlined, ReloadOutlined } from "@ant-design/icons";
import { Splitter } from "antd";
import { Code } from "./components/code/Code";
import { exampleDocs } from "./constants/exampleDocs";
import NotePreview from "./common/components/NotePreview";
import { hookMap } from "./constants/hookDisplayConfig";

export type MenuKey = ComponentsType | HooksType | ThirdParyLibrary | Projects;
export interface PageState {
  collapse: boolean;
  currentPage?: MenuKey;
  updateCurrentPage: (v: MenuKey) => void;
  toggleCollapse: () => void;
}

const stateCreator: StateCreator<PageState> = (set) => ({
  collapse: false,
  currentPage: ComponentsType.MinCalendar,
  updateCurrentPage: (value: MenuKey) => set(() => ({ currentPage: value })),
  toggleCollapse: () => set((state) => ({ collapse: !state.collapse })),
});

export const useMenuStore = create<PageState>()(
  persist(stateCreator, {
    name: "menuList",
    version: 1,
  })
);

const App: FC = () => {
  const collapse = useMenuStore((state) => state.collapse);
  const currentPage = useMenuStore((state) => state.currentPage);
  const toggleCollapse = useMenuStore((state) => state.toggleCollapse);
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [exampleView, setExampleView] = useState("demo");
  const [showCode, setShowCode] = useState(true);
  const screens = Grid.useBreakpoint();
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);
  const page = navigationEntries.find((entry) => entry.key === currentPage);
  const isHookPage = Boolean(currentPage && currentPage in hookMap);
  const rendererConfig = isHookPage ? hookMap[currentPage as HooksType] : null;
  const groups = Array.from(new Set(navigationEntries.map((entry) => entry.group)));

  return (
    <ConfigProvider theme={{ token: { colorPrimary: "#2563eb", colorText: "#202938", colorTextSecondary: "#667085", colorBorder: "#dce1e8", borderRadius: 6, fontSize: 13, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }, components: { Menu: { itemHeight: 36, itemSelectedBg: "#eaf1ff", itemSelectedColor: "#2459c4", itemMarginInline: 8, subMenuItemBg: "transparent" }, Button: { defaultShadow: "0 1px 2px rgba(16,24,40,.04)" } } }}>
      <div className={classNames("workspace", { "sidebar-collapsed": collapse, "mobile-open": mobileOpen })}>
        <a className="skip-link" href="#main-content">跳转到内容</a>
        {mobileOpen && <button className="sidebar-backdrop" aria-label="关闭导航" onClick={() => setMobileOpen(false)} />}
        <aside className="sidebar">
          <a className="brand" href="#main-content">
            <span className="brand-mark">
              <CodeOutlined />
            </span>
            <span className="brand-text">React Secret<span>开发者组件工作台</span>
            </span>
          </a>
          {!collapse && <div className="sidebar-search">
            <Input aria-label="搜索组件和 Hooks" prefix={<SearchOutlined />} placeholder="搜索组件、Hooks…" allowClear value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="sidebar-label">资源库 <span>{navigationEntries.length}</span>
            </div>
          </div>}
          <nav className="sidebar-navigation">
            <MenuList query={query} onNavigate={() => setMobileOpen(false)} />
          </nav>
          <div className="sidebar-bottom">
            <span className="workspace-avatar">RS</span>{!collapse && <span className="workspace-name">React Secret<span>个人开发资源库</span>
            </span>}<Button type="text" aria-label={collapse ? "展开侧栏" : "收起侧栏"} icon={collapse ? <ArrowRightOutlined /> : <ArrowLeftOutlined />} onClick={() => { setQuery(""); toggleCollapse(); }} />
          </div>
        </aside>
        <div className="workspace-main">
          <header className="topbar">
            <Button className="mobile-menu" type="text" aria-label="打开导航" icon={<MenuOutlined />} onClick={() => { if (collapse) toggleCollapse(); setMobileOpen(true); }} />
            <div className="breadcrumbs">
              <BookOutlined />
              <span>资源库</span>
              <span>/</span>
              <span>{page?.group}</span>
              <span>/</span>
              <strong>{page?.label}</strong>
            </div>
            <a className="repository-link" href="https://github.com/BRUCE-JIN002/react-secret-full" target="_blank" rel="noreferrer">
              <GithubOutlined />
              <span>GitHub</span>
              <ArrowRightOutlined />
            </a>
          </header>
          <main id="main-content" className="main-content" tabIndex={-1}>
            <div className="repository-heading">
              <div className="eyebrow">
                <span className="status-dot" /> REACT DEVELOPMENT WORKSPACE</div>
              <div className="repository-title">
                <h1>组件与实践</h1>
                <span className="badge">React + TypeScript</span>
              </div>
              <p>探索可复用的组件、实用 Hooks 与交互实践，在演示中理解实现。</p>
            </div>
            <div className="resource-tabs" aria-label="资源分类">{groups.map((group) => {
              const entries = navigationEntries.filter((entry) => entry.group === group); return <button key={group} className={page?.group === group ? "active" : ""} onClick={() => useMenuStore.getState().updateCurrentPage(entries[0].key as MenuKey)}>
                <span>{group}</span>
                <span className="tab-count">{entries.length}</span>
              </button>;
            })}</div>
            <section className="page-section">
              <div className="page-heading">
                <div>
                  <div className="section-label">{page?.group} / {currentPage}</div>
                  <h2>{page?.label}</h2>
                  <p>{isHookPage ? "阅读使用文档，体验交互示例，并查看 Hook 的实现。" : "在独立预览环境中体验组件的交互与使用方式。"}</p>
                </div>
                <div className="page-actions">{isHookPage && <Button icon={<CodeOutlined />} onClick={() => setShowCode(!showCode)}>{showCode ? "收起源码" : "查看源码"}</Button>}<Button icon={<ReloadOutlined />} onClick={() => setPreviewKey((key) => key + 1)}>重置演示</Button>
                </div>
              </div>
              <div className="preview-card">
                <div className="panel-header">
                  <span>
                    <span className="status-dot" />{isHookPage ? "文档与演示" : "交互预览"}</span>
                  <span className="panel-meta">
                    <BranchesOutlined /> {currentPage} <span className="badge">TSX</span>
                  </span>
                </div>
                {!isHookPage && <div className="document-tabs" aria-label="内容视图">
                  <button className={exampleView === "demo" ? "active" : ""} aria-pressed={exampleView === "demo"} onClick={() => setExampleView("demo")}>交互演示</button>
                  <button className={exampleView === "doc" ? "active" : ""} aria-pressed={exampleView === "doc"} onClick={() => setExampleView("doc")}>使用文档</button>
                </div>}
                <ErrorBoundary key={`${currentPage}-${previewKey}`} fallbackRender={({ error, resetErrorBoundary }) => <div className="error-state">
                  <h3>示例暂时无法加载</h3>
                  <p>{String(error.message || error)}</p>
                  <Button onClick={resetErrorBoundary}>重新加载</Button>
                </div>}>
                  <Suspense fallback={<div className="loading-state">
                    <Spin />
                  </div>}>
                    {!isHookPage && exampleView === "doc" ? <NotePreview>{exampleDocs[currentPage || ""]}</NotePreview> : <Splitter orientation={screens.lg ? "horizontal" : "vertical"} className={isHookPage ? "hook-splitter" : "demo-splitter"}>
                      <Splitter.Panel defaultSize="60%" min="25%">
                        <div className={classNames("contentLeft", { "hook-content": isHookPage })}>
                          <CustomHooks currentPage={currentPage} />
                          <ComponentDemo currentPage={currentPage} />
                          <ThirdLibDemo currentPage={currentPage} />
                          <ComprehensiveDemo currentPage={currentPage} />
                        </div>
                      </Splitter.Panel>
                      {isHookPage && showCode && <Splitter.Panel defaultSize="40%" min="20%">
                        <Code codeString={rendererConfig?.code ?? ""} fileName={`${currentPage}.ts`} id={currentPage || ""} />
                      </Splitter.Panel>}
                    </Splitter>}
                  </Suspense>
                </ErrorBoundary>
                <div className="panel-footer">
                  <span>独立演示环境 · 切换视图查看文档与示例</span>
                  <span>React 18</span>
                </div>
              </div>
              <div className="workspace-note">
                <BookOutlined />
                <div>
                  <strong>从示例到实践</strong>
                  <p>通过左侧导航浏览完整资源库。组件与实践均提供使用文档与交互指南，Hooks 可并排查看源码。</p>
                </div>
              </div>
            </section>
            <footer className="site-footer">
              <span>React Secret <span className="footer-divider">/</span> 开发者组件工作台</span>
              <span>Built with React & TypeScript</span>
            </footer>
          </main>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
