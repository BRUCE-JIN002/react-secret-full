import { defineConfig } from 'vitepress';
import catalog from './catalog.json';
const entries = (section: string) => catalog.filter((entry) => entry.section === section).map((entry) => ({ text: entry.title, link: entry.link }));
const guide = { text: '开始', items: [{ text: '项目介绍', link: '/guide/getting-started' }, { text: '本地开发', link: '/guide/development' }] };
const hookGroups = [
  { text: '状态与数据', keys: ['useCounter','useReactive','useSafeState','useLatest','useCreation','useSelection','useStepProgress'] },
  { text: '副作用与生命周期', keys: ['useLifecycles','useMountedState','useUnmountedRef','useIsomorphicEffect','useForceUpdate','useWhyDidYouUpdate'] },
  { text: '浏览器与交互', keys: ['useCookies','useCopyToclipboard','useCss','useDocumentTitle','useDocumentVisibility','useEventListener','useFullscreen','useHover','useInViewport','useMutateObserver','useNetWork','useScroll','useScrolling','useSize','useTextSelection'] },
  { text: '计时与性能', keys: ['useCountDown','useDebounce','useDebounceFn','useLockFn','useTimeout','useProgressiveCompute'] },
].map((group) => ({ text: group.text, collapsed: false, items: catalog.filter((entry) => entry.section === 'hooks' && group.keys.includes(entry.key)).map((entry) => ({ text: entry.title, link: entry.link })) }));
export default defineConfig({
  lang: 'zh-CN', title: 'React Secret', description: '探索 React Hooks、可复用组件与工程实践。阅读文档，体验交互，理解源码。',
  base: '/', outDir: '../build', cleanUrls: false,
  head: [['link', { rel: 'icon', href: '/react-logo.png' }], ['meta', { name: 'theme-color', content: '#646cff' }]],
  sitemap: { hostname: 'https://bruce-jin002.github.io' },
  themeConfig: {
    logo: { src: '/react-logo.png', alt: 'React Secret' },
    nav: [
      { text: '首页', link: '/' }, { text: 'AI Playground', link: '/ai-playground' }, { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: 'Hooks', link: '/hooks/', activeMatch: '/hooks/' }, { text: '组件', link: '/components/', activeMatch: '/components/' },
      { text: '生态与项目', items: [{ text: '生态探索', link: '/ecosystem/' }, { text: '综合项目', link: '/projects/' }] },
    ],
    sidebar: {
      '/guide/': [guide, { text: '探索内容', items: [{ text: '自定义 Hooks', link: '/hooks/' }, { text: '组件实践', link: '/components/' }, { text: '生态探索', link: '/ecosystem/' }, { text: '综合项目', link: '/projects/' }] }],
      '/hooks/': [{ text: '自定义 Hooks', link: '/hooks/' }, ...hookGroups],
      '/components/': [{ text: '组件实践', link: '/components/' }, { text: '交互组件', items: entries('components') }, { text: '基础能力', items: entries('foundations') }],
      '/ecosystem/': [{ text: '生态探索', link: '/ecosystem/' }, { text: '动画 · 拖拽 · 状态 · 图编辑', items: entries('ecosystem') }],
      '/projects/': [{ text: '综合项目', link: '/projects/' }, { text: '动手实践', items: entries('projects') }],
    },
    outline: { label: '本页目录', level: [2, 3] },
    socialLinks: [{ icon: 'github', link: 'https://github.com/BRUCE-JIN002/react-secret-full' }],
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '文档导航', returnToTopLabel: '返回顶部', darkModeSwitchLabel: '外观', lightModeSwitchTitle: '切换浅色主题', darkModeSwitchTitle: '切换深色主题',
    footer: { message: '在实践中理解 React，在分享中共同成长。', copyright: 'React Secret · Built with VitePress & React' },
    search: { provider: 'local', options: { miniSearch: { options: { tokenize: (text) => Array.from(new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text), (part) => part.segment).filter((word) => /[\p{L}\p{N}]/u.test(word)) }, searchOptions: { prefix: true, fuzzy: 0.2, combineWith: 'AND' } }, locales: { root: { translations: { button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' }, modal: { displayDetails: '显示详细列表', resetButtonTitle: '清除搜索', backButtonTitle: '关闭搜索', noResultsText: '没有找到相关内容', footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' } } } } } } },
    notFound: { title: '页面未找到', quote: '这个页面可能已移动，回到首页继续探索吧。', linkLabel: '返回首页', linkText: '返回首页' },
  },
  vite: { server: { host: '127.0.0.1', port: 5173, strictPort: true, proxy: { '/api/ai': { target: 'http://127.0.0.1:5174', changeOrigin: false }, '/playground': 'http://127.0.0.1:5174' } }, css: { postcss: { plugins: [] } } },
});
