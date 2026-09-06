// Advisory source checks: custom colors may be intentional; never rewrite them automatically.
export function inspectThemeSources(files) {
  const combined = files.map(f => f.value).join('\n');
  const known = new Set(['page-bg','surface-bg','text-color','muted-color','border-color','accent-color','on-accent-color','success-bg','success-text','warning-bg','warning-text','error-bg','error-text','bg']);
  for (const match of combined.matchAll(/--([\w-]+)\s*:/g)) known.add(match[1]);
  const issues = [];
  for (const file of files) {
    const source = file.value.replace(/\/\*[\s\S]*?\*\//g, '');
    for (const match of source.matchAll(/var\(\s*--([\w-]+)\s*\)/g)) {
      if (!known.has(match[1])) issues.push(`${file.name}：变量 --${match[1]} 未定义且没有回退值`);
    }
    if (/(?:color|background(?:-color)?|border(?:-color)?|fill|stroke)\s*:\s*['"]?(?:#[\da-f]{3,8}\b|rgba?\(|hsla?\(|white\b|black\b)/i.test(source)) {
      issues.push(`${file.name}：包含固定配色，请确认深浅主题都有对应样式`);
    }
    if (/prefers-color-scheme/.test(source) && !/data-theme|\.dark\b/.test(source)) issues.push(`${file.name}：仅跟随系统主题，可能与站点手动切换不一致`);
  }
  return [...new Set(issues)].slice(0, 12);
}

// Serialized into the sandbox: intentionally self-contained, without imported helpers.
export function auditRenderedTheme() {
  function parse(value) {
    const parts = value.match(/^rgba?\(([^)]+)\)$/);
    if (!parts) return null;
    const values = parts[1].split(/[,\s/]+/).filter(Boolean).map(Number);
    if (values.length < 3 || values.some(v => !Number.isFinite(v))) return null;
    return [values[0], values[1], values[2], values.length > 3 ? values[3] : 1];
  }
  function blend(front, back) {
    return [0,1,2].map(i => front[i] * front[3] + back[i] * (1 - front[3])).concat(1);
  }
  function luminance(color) {
    const c = color.slice(0,3).map(v => { const x=v/255; return x<=0.04045 ? x/12.92 : Math.pow((x+0.055)/1.055,2.4); });
    return c[0]*0.2126+c[1]*0.7152+c[2]*0.0722;
  }
  const issues = []; let checked=0, skipped=0;
  const elements=Array.from(document.querySelectorAll('body *')).slice(0,600);
  for (const el of elements) {
    const text=Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join(' ').trim();
    const isField=el.tagName==='INPUT'||el.tagName==='TEXTAREA';
    const label=(text || (isField ? el.value || el.placeholder : '') || '').slice(0,60);
    if (!label || /^(SCRIPT|STYLE|OPTION)$/.test(el.tagName)) continue;
    const style=getComputedStyle(el);
    if (!el.getClientRects().length || style.visibility==='hidden' || el.disabled) continue;
    let bg=[255,255,255,1], unsupported=false;
    const ancestors=[]; for(let node=el;node;node=node.parentElement)ancestors.unshift(node);
    for(const node of ancestors) {
      const s=getComputedStyle(node),color=parse(s.backgroundColor);
      if(s.backgroundImage!=='none'||s.opacity!=='1'||s.filter!=='none'||s.mixBlendMode!=='normal')unsupported=true;
      if(color)bg=blend(color,bg);else unsupported=true;
    }
    const textStyle=isField&&!el.value ? getComputedStyle(el,'::placeholder') : style;
    const fg=parse(textStyle.color);
    if(unsupported||!fg||textStyle.opacity!=='1'){skipped++;continue;}
    const a=luminance(blend(fg,bg)), b=luminance(bg);
    const ratio=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
    const threshold=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.66&&parseInt(style.fontWeight,10)>=700)?3:4.5;
    checked++;
    if(ratio<threshold && issues.length<12)issues.push({text:label,ratio:Math.round(ratio*100)/100,required:threshold});
  }
  return {checked,skipped,issues,limited:document.querySelectorAll('body *').length>600};
}
