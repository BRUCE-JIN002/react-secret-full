import { auditRenderedTheme } from './themeChecks';
import { transform } from '@babel/standalone';

export interface SourceFile { name: string; value: string }
export function validateFiles(input: unknown): SourceFile[] {
  if (!Array.isArray(input) || !input.length || input.length > 20) throw new Error('需要 1–20 个代码文件');
  const names = new Set<string>();
  let size = 0;
  const files = input.map((file) => {
    if (!file || typeof file.name !== 'string' || typeof file.value !== 'string' || !/^[\w-]+(?:\/[\w-]+)*\.(tsx?|jsx?|css|json)$/.test(file.name)) throw new Error('文件名称或内容格式不正确');
    if (names.has(file.name)) throw new Error(`重复文件：${file.name}`);
    names.add(file.name); size += file.value.length;
    return { name: file.name, value: file.value };
  });
  if (!names.has('App.tsx')) throw new Error('缺少 App.tsx 入口');
  if (size > 150000) throw new Error('代码超出 150 KB 限制');
  return files;
}
const safeJSON = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');
export function compilePreview(input: SourceFile[], runtimeBase: string, nonce: string, theme: 'light' | 'dark' = 'light', audit = false) {
  const files = validateFiles(input);
  const modules: Record<string, string> = {};
  const css: string[] = [];
  for (const file of files) {
    if (file.name.endsWith('.css')) { css.push(file.value); modules[file.name] = ''; continue; }
    if (file.name.endsWith('.json')) { modules[file.name] = `module.exports = ${safeJSON(JSON.parse(file.value))};`; continue; }
    const source = /\bimport\s+(?:\*\s+as\s+)?React\b/.test(file.value) ? file.value : `import React from 'react';\n${file.value}`;
    modules[file.name] = transform(source, { filename: file.name, presets: ['react', 'typescript'], plugins: ['transform-modules-commonjs'] }).code || '';
  }
  const origin = new URL(runtimeBase).origin;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval' ${origin}; style-src 'unsafe-inline'; img-src https: data:; font-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><style>
:root { --page-bg:#f6f7fb; --surface-bg:#fff; --text-color:#252638; --muted-color:#666875; --border-color:#858897; --accent-color:#6860d8; --on-accent-color:#fff; --success-bg:#e5f5ec; --success-text:#17643a; --warning-bg:#fff1d6; --warning-text:#805100; --error-bg:#ffebe9; --error-text:#a12720; --bg:var(--page-bg); color-scheme:light; }
:root[data-theme="dark"] { --page-bg:#1a1a1a; --surface-bg:#242428; --text-color:#eeeef4; --muted-color:#aaaab8; --border-color:#737384; --accent-color:#a99cf7; --on-accent-color:#201637; --success-bg:#19372a; --success-text:#83dfaa; --warning-bg:#3d3019; --warning-text:#f1cc7b; --error-bg:#442422; --error-text:#ffada0; color-scheme:dark; }
body.light, body.dark { background-color:var(--page-bg); color:var(--text-color); }
input::placeholder, textarea::placeholder { color:var(--muted-color); opacity:1; }
</style></head><body><div id="root"></div>
<script>
function applyTheme(theme) {
 if(theme!=='light' && theme!=='dark')return;
 for(const element of [document.documentElement,document.body]) { element.dataset.theme=theme; element.classList.remove('light','dark');element.classList.add(theme); }
}
applyTheme(${safeJSON(theme)});
window.addEventListener('message',event=>{
 if(event.source!==parent || event.origin!==${safeJSON(origin)} || event.data?.nonce!==${safeJSON(nonce)} || event.data?.type!=='preview-theme')return;
 applyTheme(event.data.theme);
});
const send=(type,message)=>parent.postMessage({type,message,nonce:${safeJSON(nonce)}},'*');window.onerror=(message)=>send('preview-error',String(message));window.onunhandledrejection=(event)=>send('preview-error',String(event.reason));</script>
<script src="${runtimeBase}/react.production.min.js"></script><script src="${runtimeBase}/react-dom.production.min.js"></script>
<script>
try {
 const styles=document.createElement('style');styles.textContent=${safeJSON(css.join('\n'))};document.head.appendChild(styles);
 const sources=${safeJSON(modules)}, cache={};
 function requireModule(name,from='') {
  if(name==='react') return window.React;
  if(name==='react-dom'||name==='react-dom/client') return window.ReactDOM;
  if(!name.startsWith('.') && from) throw Error('预览仅支持 React 和本地文件，暂不支持依赖：'+name);
  let parts=(from?from.split('/').slice(0,-1):[]).concat(name.split('/')), normalized=[];
  for(const part of parts){if(part==='.'||!part)continue;if(part==='..')normalized.pop();else normalized.push(part);}
  const path=normalized.join('/');
  const key=[path,path+'.tsx',path+'.ts',path+'.jsx',path+'.js',path+'/index.tsx',path+'/index.ts'].find(p=>Object.prototype.hasOwnProperty.call(sources,p));
  if(!key)throw Error('找不到文件：'+name);
  if(cache[key])return cache[key].exports;
  const module={exports:{}};cache[key]=module;
  new Function('require','module','exports',sources[key])(n=>requireModule(n,key),module,module.exports);
  return module.exports;
 }
 const App=requireModule('App.tsx').default;
 if(!App) throw Error('App.tsx 需要默认导出 React 组件');
 class Boundary extends React.Component {componentDidCatch(error){send('preview-error',error.message)}render(){return this.props.children}}
 ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(Boundary,null,React.createElement(App)));
 ${audit ? `setTimeout(()=>{try{send('theme-audit',(${auditRenderedTheme.toString()})());}catch(error){send('theme-audit-error',String(error));}},400);` : "requestAnimationFrame(()=>requestAnimationFrame(()=>send('preview-ready','')));"}
} catch(error){send('preview-error',error.message);document.getElementById('root').textContent=error.message;}
</script></body></html>`;
}
