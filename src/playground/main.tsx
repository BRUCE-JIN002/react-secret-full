import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ConfigProvider, Button, Spin } from 'antd';
import { ErrorBoundary } from 'react-error-boundary';
import { demos } from './registry';
import '../index.css';
import './playground.css';
const AIPlayground = React.lazy(() => import('../ai-playground/App'));
const isStudio = new URLSearchParams(window.location.search).get('studio') === 'ai';
const key = new URLSearchParams(window.location.search).get('example') || '';
const Demo = demos[key];
createRoot(document.getElementById('root')!).render(
  <ConfigProvider theme={{ token: { colorPrimary: '#6762ec', borderRadius: 6, fontSize: 13 } }}>
    <ErrorBoundary fallbackRender={({ error }) => <div className="playground-status"><h2>演示暂时无法加载</h2><p>{String(error.message || error)}</p><Button onClick={() => window.location.reload()}>重试</Button></div>}>
      <Suspense fallback={<div className="playground-status"><Spin /><p>正在加载演示…</p></div>}>
        <div className={isStudio ? "ai-playground-root" : "contentLeft playground-content"}>
          {isStudio ? <AIPlayground /> : Demo ? <Demo /> : <div className="playground-status"><h2>未找到这个示例</h2><p>请从文档页面打开对应的交互演示。</p><a href="/" target="_top">返回首页</a></div>}
        </div>
      </Suspense>
    </ErrorBoundary>
  </ConfigProvider>
);
