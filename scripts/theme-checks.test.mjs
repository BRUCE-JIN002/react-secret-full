import test from 'node:test';
import assert from 'node:assert/strict';
import { inspectThemeSources, auditRenderedTheme } from '../src/ai-playground/themeChecks.js';
test('source checks report undefined tokens and fixed colors, preserve custom definitions and fallback',()=>{
 assert.deepEqual(inspectThemeSources([{name:'App.css',value:'.card{color:var(--text-color);background:var(--surface-bg)}'}]),[]);
 assert.equal(inspectThemeSources([{name:'App.css',value:'.x{color:var(--missing)}'}]).length,1);
 assert.deepEqual(inspectThemeSources([{name:'App.css',value:':root{--custom:red}.x{color:var(--custom);border-color:var(--optional, transparent)}'}]),[]);
 assert.equal(inspectThemeSources([{name:'App.tsx',value:"const style={color:'#fff',backgroundColor:'#eee'}"}]).length,1);
});
test('runtime contrast reports unreadable text and skips gradients',()=>{
 const originalDocument=global.document, originalStyle=global.getComputedStyle;
 const base={backgroundColor:'rgb(255, 255, 255)',backgroundImage:'none',opacity:'1',filter:'none',mixBlendMode:'normal',visibility:'visible',color:'rgb(255, 255, 255)',fontSize:'16px',fontWeight:'400'};
 const el={tagName:'P',childNodes:[{nodeType:3,textContent:'Sample'}],parentElement:null,getClientRects:()=>[{}]};
 global.document={querySelectorAll:()=>[el]};let style={...base};global.getComputedStyle=()=>style;
 try {
  assert.equal(auditRenderedTheme().issues[0].ratio,1);
  style={...base,color:'rgb(0, 0, 0)'};assert.equal(auditRenderedTheme().issues.length,0);
  style={...base,backgroundImage:'linear-gradient(white, black)'};assert.equal(auditRenderedTheme().skipped,1);
  assert.equal(auditRenderedTheme().checked,0);
  // Ensure serialization remains executable in the isolated frame.
  assert.equal(new Function('return ('+auditRenderedTheme.toString()+')()')().skipped,1);
 } finally {global.document=originalDocument;global.getComputedStyle=originalStyle;}
});
