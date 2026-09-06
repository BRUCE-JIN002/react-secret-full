import type { SourceFile } from './compiler';
export const initialFiles: SourceFile[] = [
 { name: 'App.tsx', value: `import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: '试试点击完成一项任务', done: true },
    { id: 2, text: '让 AI 为这个页面增加筛选功能', done: false },
    { id: 3, text: '在代码面板中修改页面', done: false },
  ]);
  const [text, setText] = useState('');
  function addTask(event: React.FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: text.trim(), done: false }]);
    setText('');
  }
  return <main className="planner">
    <span className="eyebrow">A LITTLE PROGRESS, EVERY DAY</span>
    <h1>把想法，变成行动。</h1>
    <p className="intro">专注眼前的小事，留一点时间给新的灵感。</p>
    <form onSubmit={addTask}><input aria-label="新任务" placeholder="接下来，想完成什么？" value={text} onChange={e => setText(e.target.value)} /><button>添加任务</button></form>
    <section aria-label="任务列表">{tasks.map(task => <label className="task" key={task.id}>
      <input type="checkbox" checked={task.done} onChange={() => setTasks(tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t))} />
      <span className={task.done ? 'done' : ''}>{task.text}</span>
      <button type="button" aria-label={'删除 ' + task.text} onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}>删除</button>
    </label>)}</section>
    <footer>{tasks.filter(t => t.done).length} / {tasks.length} 项已完成 · 每一步都算数</footer>
  </main>;
}` },
 { name: 'App.css', value: `* { box-sizing: border-box; }
body { margin: 0; background: var(--page-bg); color: var(--text-color); font-family: system-ui, sans-serif; }
.planner { max-width: 700px; margin: 0 auto; padding: 76px 30px; }
.eyebrow { font-size: 11px; font-weight: 700; color: var(--accent-color); letter-spacing: 2px; }
h1 { font-size: clamp(26px, 5vw, 38px); letter-spacing: -1px; margin: 18px 0 12px; }
.intro { color: var(--muted-color); font-size: 14px; margin-bottom: 34px; line-height: 1.8; }
form { display: flex; gap: 10px; margin-bottom: 28px; }
form input { min-width: 0; flex: 1; padding: 13px; border: 1px solid var(--border-color); border-radius: 8px; background: var(--surface-bg); color: var(--text-color); }
button { cursor: pointer; border: 0; background: var(--accent-color); color: var(--on-accent-color); border-radius: 7px; padding: 10px 15px; font: inherit; font-size: 13px; }
.task { display: flex; align-items: center; gap: 12px; padding: 20px 0; border-bottom: 1px solid var(--border-color); font-size: 14px; }
.task input { accent-color: var(--accent-color); width: 17px; height: 17px; }
.task span { flex: 1; }
.task button { background: transparent; color: var(--muted-color); padding: 5px; }
.done { text-decoration: line-through; color: var(--muted-color); }
footer { margin-top: 25px; color: var(--muted-color); font-size: 12px; }
@media(max-width: 440px) { .planner { padding: 42px 20px; } form { flex-wrap: wrap; } }` },
];

// Only migrate the unchanged starter stylesheet; preserve user-authored styles.
export const legacyDefaultCSS = "* { box-sizing: border-box; }\nbody { margin: 0; background: #f6f7fb; color: #252638; font-family: system-ui, sans-serif; }\n.planner { max-width: 700px; margin: 0 auto; padding: 76px 30px; }\n.eyebrow { font-size: 11px; font-weight: 700; color: #7770bf; letter-spacing: 2px; }\nh1 { font-size: clamp(26px, 5vw, 38px); letter-spacing: -1px; margin: 18px 0 12px; }\n.intro { color: #777987; font-size: 14px; margin-bottom: 34px; line-height: 1.8; }\nform { display: flex; gap: 10px; margin-bottom: 28px; }\nform input { min-width: 0; flex: 1; padding: 13px; border: 1px solid #dedeea; border-radius: 8px; background: white; }\nbutton { cursor: pointer; border: 0; background: #6860d8; color: white; border-radius: 7px; padding: 10px 15px; font: inherit; font-size: 13px; }\n.task { display: flex; align-items: center; gap: 12px; padding: 20px 0; border-bottom: 1px solid #e6e6ef; font-size: 14px; }\n.task input { accent-color: #6860d8; width: 17px; height: 17px; }\n.task span { flex: 1; }\n.task button { background: transparent; color: #92909f; padding: 5px; }\n.done { text-decoration: line-through; color: #a2a1b1; }\nfooter { margin-top: 25px; color: #92909f; font-size: 12px; }\n@media(max-width: 440px) { .planner { padding: 42px 20px; } form { flex-wrap: wrap; } }";
