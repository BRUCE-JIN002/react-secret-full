import React, { useEffect, useRef, useState } from 'react';
import { createPreviewNonce } from './previewNonce';
import { compilePreview, SourceFile } from './compiler';
import { inspectThemeSources } from './themeChecks';
type Theme = 'light' | 'dark';
type Report = { checked: number; skipped: number; limited: boolean; issues: { text: string; ratio: number; required: number }[] };
const themes: Theme[] = ['light', 'dark'];
const label = { light: '浅色', dark: '深色' };
export default function ThemeReview({ files, disabled, onRepair }: { files: SourceFile[]; disabled: boolean; onRepair: (prompt: string) => void }) {
  const [sources, setSources] = useState<string[]>([]);
  const [documents, setDocuments] = useState<Partial<Record<Theme,string>>>({});
  const [reports, setReports] = useState<Partial<Record<Theme,Report>>>({});
  const [failures, setFailures] = useState<Partial<Record<Theme,string>>>({});
  const frames = useRef<Partial<Record<Theme,HTMLIFrameElement|null>>>({});
  const revision = useRef('');
  const runtimeFailures = useRef(new Set<Theme>());
  useEffect(() => {
    revision.current = createPreviewNonce();
    runtimeFailures.current.clear();
    setDocuments({}); setReports({}); setFailures({}); setSources([]);
    const timer = setTimeout(() => {
      setSources(inspectThemeSources(files));
      try {
        const base = window.location.origin + '/playground/ai-runtime';
        setDocuments({ light: compilePreview(files,base,revision.current+'light','light',true), dark: compilePreview(files,base,revision.current+'dark','dark',true) });
      } catch { setFailures({light:'代码未通过编译',dark:'代码未通过编译'}); }
    }, 800);
    const timeout = setTimeout(() => setFailures(prev => ({light:'检查超时',dark:'检查超时',...prev})), 12000);
    return () => { clearTimeout(timer); clearTimeout(timeout); };
  }, [files]);
  useEffect(() => {
    function receive(event: MessageEvent) {
      const theme = themes.find(t=>event.source===frames.current[t]?.contentWindow && event.data?.nonce===revision.current+t);
      if(!theme)return;
      if(event.data.type==='theme-audit') {
        if(runtimeFailures.current.has(theme))return;
        const report=event.data.message;
        if(!report||!Number.isFinite(report.checked)||!Number.isFinite(report.skipped)||!Array.isArray(report.issues))return;
        if(report.issues.some((i: Report['issues'][number])=>typeof i.text!=='string'||!Number.isFinite(i.ratio)||!Number.isFinite(i.required)))return;
        setReports(prev=>({...prev,[theme]:{...report,issues:report.issues.slice(0,12)}}));
      } else if(event.data.type==='preview-error'||event.data.type==='theme-audit-error') {
        runtimeFailures.current.add(theme);
        setReports(prev=>{const next={...prev};delete next[theme];return next;});
        setFailures(prev=>({...prev,[theme]:'预览运行失败，无法完成检查'}));
      }
    }
    window.addEventListener('message',receive);
    return()=>window.removeEventListener('message',receive);
  },[]);
  const complete=themes.every(t=>reports[t]||failures[t]);
  const count=sources.length+themes.reduce((n,t)=>n+(reports[t]?.issues.length||0),0);
  function repair() {
    const results=themes.map(t=>`${label[t]}：${reports[t]?JSON.stringify(reports[t]):failures[t]||'检查中'}`).join('\n');
    onRepair(`修复主题适配：请让当前项目同时适配深色和浅色。保留现有内容、布局和全部交互，仅调整颜色、CSS 变量与主题选择器。优先使用宿主语义变量和成对的前景/背景色。自定义色必须同时提供两套定义。\n静态提示：\n${sources.join('\n')||'暂无'}\n当前页面文字对比度检查：\n${results}`);
  }
  return <><details className="theme-review">
    <summary>主题适配检查 <span>{!complete?'正在检查深浅主题…':count?`${count} 项待确认`:themes.some(t=>!reports[t]&&failures[t])?'检查未完成':'检查完成'}</span></summary>
    <div className="theme-review-body">
      {themes.map(t=><section key={t}><strong>{label[t]}</strong>{reports[t]?<><span> · 已检查 {reports[t]!.checked} 处文字</span>{reports[t]!.issues.length===0?<p>已检测文字未发现低对比度。</p>:<ul>{reports[t]!.issues.map((i,n)=><li key={n}>“{i.text}”：{i.ratio}:1，目标 ≥ {i.required}:1</li>)}</ul>}{reports[t]!.skipped>0&&<p>{reports[t]!.skipped} 处复杂背景或透明效果需人工检查。</p>}{reports[t]!.limited&&<p>仅检查前 600 个元素。</p>}</>:<p>{failures[t]||'检查中…'}</p>}</section>)}
      {sources.length>0&&<section><strong>代码提示（固定色可能是有意设计）</strong><ul>{sources.map(s=><li key={s}>{s}</li>)}</ul></section>}
      <p>检查当前初始页面的普通文字；图片、渐变、弹窗及 hover/focus 等状态仍需手动确认。不会自动改写代码。</p>
      <button disabled={disabled||!complete} onClick={repair}>修复主题适配</button><small>交给 AI 修改，可使用“撤销 AI 修改”恢复。</small>
    </div>
    </details><div className="theme-audit-frames" aria-hidden="true">{themes.map(t=>documents[t]&&<iframe key={t} tabIndex={-1} ref={el=>{frames.current[t]=el;}} title={`${label[t]}主题检测`} sandbox="allow-scripts allow-forms" srcDoc={documents[t]}/>)}</div>
  </>;
}
