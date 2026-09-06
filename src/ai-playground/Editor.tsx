import React from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
(self as unknown as { MonacoEnvironment: unknown }).MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'typescript' || label === 'javascript') return new TypeScriptWorker();
    if (label === 'css' || label === 'scss' || label === 'less') return new CssWorker();
    if (label === 'json') return new JsonWorker();
    return new EditorWorker();
  },
};
loader.config({ monaco });
monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
 jsx: monaco.languages.typescript.JsxEmit.React,
 allowNonTsExtensions: true, esModuleInterop: true,
 target: monaco.languages.typescript.ScriptTarget.ESNext,
});
// The sandbox resolves React itself; don't report missing installed type packages as code errors.
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({ noSemanticValidation: true });
export default function CodeEditor({ name, value, disabled, onChange, theme }: { theme: 'light' | 'dark'; name: string; value: string; disabled: boolean; onChange: (value: string) => void }) {
 const language = name.endsWith('.css') ? 'css' : name.endsWith('.json') ? 'json' : /\.jsx?$/.test(name) ? 'javascript' : 'typescript';
 return <div className="monaco-container"><MonacoEditor path={name} language={language} value={value} theme={theme === 'dark' ? 'vs-dark' : 'light'} onChange={value => onChange(value || '')}
  loading={<div className="editor-footer">正在加载代码编辑器…</div>}
  options={{readOnly:disabled,fontSize:13,lineHeight:24,minimap:{enabled:false},scrollBeyondLastLine:false,automaticLayout:true,tabSize:2,padding:{top:16},ariaLabel:'代码编辑器 '+name}} /></div>;
}
