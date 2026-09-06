import React, { useEffect, useRef, useState } from 'react';
import { createPreviewNonce } from './previewNonce';
import { compilePreview, validateFiles, SourceFile } from './compiler';
import { initialFiles, legacyDefaultCSS } from './templates';
import './style.css';
import ThemeReview from './ThemeReview';
import { useTheme } from './useTheme';
const CodeEditor = React.lazy(() => import('./Editor'));
const STORAGE = 'react-secret-ai-project-v1';
function restore(): SourceFile[] { try { return validateFiles(JSON.parse(localStorage.getItem(STORAGE) || 'null')).map(file => file.name === 'App.css' && file.value === legacyDefaultCSS ? { ...file, value: initialFiles.find(f => f.name === 'App.css')!.value } : file); } catch { return initialFiles; } }
export default function AIPlayground() {
 const theme = useTheme();
 const [files,setFiles]=useState(restore), [selected,setSelected]=useState('App.tsx'), [prompt,setPrompt]=useState('');
 const [view,setView]=useState<'preview'|'code'|'split'>('preview'), [mobile,setMobile]=useState(false);
 const [messages,setMessages]=useState<{role:string;text:string}[]>([]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[progress,setProgress]=useState(0);
 const [html,setHtml]=useState(''),[previewError,setPreviewError]=useState(''),[previewStatus,setPreviewStatus]=useState('正在编译');
 const [configured,setConfigured]=useState<boolean|null>(null),[saved,setSaved]=useState(true),[history,setHistory]=useState<SourceFile[][]>([]);
 const abort=useRef<AbortController>(), frame=useRef<HTMLIFrameElement>(null), nonce=useRef(''), filesRef=useRef(files);
 const themeRef = useRef(theme);
 themeRef.current = theme;
 const syncPreviewTheme = () => frame.current?.contentWindow?.postMessage({type:'preview-theme',theme:themeRef.current,nonce:nonce.current}, '*');
 useEffect(() => { syncPreviewTheme(); }, [theme]);
 const active=files.find(f=>f.name===selected)||files[0];
 useEffect(()=>{filesRef.current=files;try{localStorage.setItem(STORAGE,JSON.stringify(files));setSaved(true);}catch{setSaved(false);}},[files]);
 useEffect(()=>{const control=new AbortController();fetch('/api/ai/status',{signal:control.signal}).then(r=>r.json()).then(r=>setConfigured(r.configured)).catch(()=>setConfigured(false));return()=>{control.abort();abort.current?.abort();};},[]);
 useEffect(()=>{
   const timer=setTimeout(()=>{setPreviewError('');setPreviewStatus('正在编译');nonce.current=createPreviewNonce();try{setHtml(compilePreview(files,window.location.origin+'/playground/ai-runtime',nonce.current,themeRef.current));setPreviewStatus('正在加载');}catch(e){setPreviewError((e as Error).message);setPreviewStatus('编译失败');}},450);
   return()=>clearTimeout(timer);
 },[files]);
 useEffect(()=>{const listener=(event:MessageEvent)=>{if(event.source!==frame.current?.contentWindow||event.data?.nonce!==nonce.current)return;if(event.data.type==='preview-error'){setPreviewError(String(event.data.message));setPreviewStatus('运行出错');}else if(event.data.type==='preview-ready'){syncPreviewTheme();setPreviewStatus(current=>current==='运行出错'?current:'预览已更新');}};window.addEventListener('message',listener);return()=>window.removeEventListener('message',listener);},[]);
 useEffect(()=>{if(previewStatus!=='正在加载')return;const timer=setTimeout(()=>setPreviewStatus('加载较慢，请检查预览或重新运行'),12000);return()=>clearTimeout(timer);},[previewStatus,html]);
 function checkpoint(){setHistory(h=>[...h.slice(-9),filesRef.current]);}
 function edit(value:string){setFiles(files.map(f=>f.name===active.name?{...f,value}:f));}
 async function generate(event?:React.FormEvent, override?:string){event?.preventDefault();const request=override??prompt;if(!request.trim()||busy)return;setPrompt('');setBusy(true);setError('');setProgress(0);setMessages(m=>[...m,{role:'user',text:request}]);const controller=new AbortController();abort.current=controller;let completed=false;
 try{
 const response=await fetch('/api/ai/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:request,files:filesRef.current}),signal:controller.signal});
 if(!response.ok)throw Error(await response.text()||'AI 请求失败');if(!response.body)throw Error('未收到生成内容');
 const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
 const consume=(line:string)=>{if(!line.trim())return;const data=JSON.parse(line);if(data.type==='delta')setProgress(p=>p+data.text.length);if(data.type==='error')throw Error(data.message);if(data.type==='result'){const next=validateFiles(data.files);compilePreview(next,window.location.origin+'/playground/ai-runtime','validation');checkpoint();setFiles(next);setSelected('App.tsx');setMessages(m=>[...m,{role:'assistant',text:data.summary}]);setView('preview');completed=true;}};
 while(true){const {done,value}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});const lines=buffer.split('\n');buffer=lines.pop()||'';lines.forEach(consume);}consume(buffer);if(!completed)throw Error('生成连接已结束，但未收到完整代码，请重试');
 }catch(e){const stopped=controller.signal.aborted;setError(stopped?'已停止生成，原代码已保留。':(e as Error).message);setPrompt(request);}finally{setBusy(false);abort.current=undefined;}}
 function download(){const blob=new Blob([JSON.stringify({files},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='react-secret-project.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
 return <div className="ai-studio" data-theme={theme}>
  <header className="studio-header"><div><span className="studio-brand">React Secret</span><span className="studio-divider">/</span><strong>AI Playground</strong></div><div className="header-actions"><span className="save-state">{saved?'已保存到本机':'本机存储空间不足'}</span><button disabled={!history.length||busy} onClick={()=>{setFiles(history[history.length-1]);setHistory(h=>h.slice(0,-1));}}>撤销 AI 修改</button><button onClick={download}>导出项目</button><label className="import-button">导入<input type="file" accept=".json" disabled={busy} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>200000)throw Error('文件过大');const next=validateFiles(JSON.parse(await file.text()).files);checkpoint();setFiles(next);setSelected('App.tsx');setError('');}catch(err){setError((err as Error).message);}e.target.value='';}}/></label></div></header>
  <main className="studio-main"><aside className="assistant-panel"><div className="assistant-heading"><span className="assistant-mark">AI</span><div><h1>把想法变成界面</h1><p>描述、生成，再亲手试一试。</p></div></div>
   <div className="conversation" aria-live="polite">{messages.length===0?<div className="welcome"><h2>今天想做点什么？</h2><p>从右侧的交互示例开始，或描述一个新页面。生成后，继续对话就能修改。</p>{['给当前任务列表增加全部、未完成、已完成筛选','做一个有搜索和分类的书签管理器','做一个可切换月付和年付的产品定价页'].map(text=><button className="suggestion" key={text} onClick={()=>setPrompt(text)}>{text}<span>↗</span></button>)}<small>支持 React、TypeScript、CSS 与本地模块。</small></div>:messages.map((m,i)=><div key={i} className={'chat-message '+m.role}><span>{m.role==='user'?'你':'AI 助手'}</span><p>{m.text}</p></div>)}{busy&&<div className="generating" role="status"><span className="pulse"/> {progress?`正在编写代码 · 已接收 ${progress.toLocaleString()} 字符`:'正在理解需求…'}<p>完整代码通过编译后会更新预览。</p></div>}</div>
   {error&&<div className="studio-error" role="alert">{error}</div>}{configured===false&&<div className="configuration-note">AI 服务未连接。代码编辑和预览仍可使用；本地请配置服务端环境，线上需连接 AI 服务。</div>}
   <form className="prompt-form" onSubmit={generate}><textarea aria-label="描述想要的页面或修改" placeholder="描述想要的页面，或者告诉我哪里需要修改…" value={prompt} maxLength={6000} onChange={e=>setPrompt(e.target.value)} onKeyDown={e=>{if((e.metaKey||e.ctrlKey)&&e.key==='Enter'){e.preventDefault();e.currentTarget.form?.requestSubmit();}}}/><div><span>⌘ / Ctrl + Enter</span>{busy?<button type="button" onClick={()=>abort.current?.abort()}>停止生成</button>:<button className="primary" disabled={!prompt.trim()||configured!==true}>生成并预览 ↗</button>}</div></form>
  </aside><section className="workspace-panel"><div className="workspace-toolbar"><div className="view-tabs">{(['preview','code','split'] as const).map(v=><button aria-pressed={view===v} className={view===v?'active':''} key={v} onClick={()=>setView(v)}>{{preview:'预览',code:'代码',split:'分屏'}[v]}</button>)}</div><div><button aria-pressed={mobile} onClick={()=>setMobile(!mobile)}>{mobile?'手机 390px':'桌面'}</button><button onClick={()=>setFiles([...files])}>重新运行</button></div></div>
  <div className={'workspace-stage view-'+view}>
   {view!=='preview'&&<section className="code-panel"><div className="file-tabs">{files.map(f=><button key={f.name} onClick={()=>setSelected(f.name)} className={active.name===f.name?'active':''}>{f.name}</button>)}<button disabled={busy} onClick={()=>{const name=window.prompt('新文件名，例如 Card.tsx 或 styles.css');if(!name)return;try{const next=validateFiles([...files,{name,value:''}]);checkpoint();setFiles(next);setSelected(name);}catch(e){setError((e as Error).message);}}}>＋</button></div><React.Suspense fallback={<div className="editor-footer">正在加载代码编辑器…</div>}><CodeEditor theme={theme} name={active.name} value={active.value} disabled={busy} onChange={edit}/></React.Suspense><div className="editor-footer">{active.name} · {active.value.split('\n').length} 行 · 修改后自动编译</div></section>}
   <section className={'preview-panel '+(view==='code'?'hidden':'')}><div className={'preview-canvas '+(mobile?'mobile':'')}><iframe ref={frame} title="React 实时交互预览" sandbox="allow-scripts allow-forms" onLoad={syncPreviewTheme} srcDoc={html}/></div></section>
  </div><ThemeReview files={files} disabled={busy||configured!==true} onRepair={request=>{void generate(undefined,request);}}/><footer className="workspace-footer"><span className={previewError?'status-error':''}>{previewStatus}</span><span>React 18 · 隔离预览</span></footer>{previewError&&<div className="preview-error" role="alert"><strong>预览遇到问题</strong><pre>{previewError}</pre><button onClick={()=>setPrompt('请修复以下错误，保留已有功能：\n'+previewError)}>让 AI 修复</button></div>}
  </section></main>
 </div>;
}
