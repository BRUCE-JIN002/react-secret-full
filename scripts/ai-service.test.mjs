import test from 'node:test';
import assert from 'node:assert/strict';
import {validateProject,handleAI} from './ai-service.mjs';
import {Readable} from 'node:stream';
import {EventEmitter} from 'node:events';
test('reject invalid paths, duplicates, missing entry and oversized content',()=>{
 for(const files of [[{name:'../App.tsx',value:''}],[{name:'App.css',value:''}],[{name:'App.tsx',value:''},{name:'App.tsx',value:''}],[{name:'App.tsx',value:'x'.repeat(150001)}]])assert.throws(()=>validateProject(files));
 assert.equal(validateProject([{name:'App.tsx',value:'export default ()=>null'},{name:'ui/Button.tsx',value:''}]).length,2);
});
function request(body){const req=Readable.from([JSON.stringify(body)]);req.url='/api/ai/generate';req.method='POST';req.headers={host:'localhost'};return req;}
function result(){const res=new EventEmitter();res.output='';res.destroyed=false;res.setHeader=()=>{};res.flushHeaders=()=>{res.headersSent=true};res.write=s=>{res.output+=s};res.end=s=>{if(s)res.output+=s};return res;}
test('stream model output into validated project; reject malformed JSON without result',async()=>{
 const fetchOriginal=global.fetch,key=process.env.AI_API_KEY;process.env.AI_API_KEY='test-only';
 try{for(const valid of [true,false]){global.fetch=async()=>new Response('data: '+JSON.stringify({choices:[{delta:{content:valid?JSON.stringify({summary:'done',files:[{name:'App.tsx',value:'export default ()=>null'}]}):'{broken'}}]})+'\n\ndata: [DONE]\n\n');const res=result();await handleAI(request({prompt:'build',files:[{name:'App.tsx',value:''}]}),res);const events=res.output.trim().split('\n').map(JSON.parse);assert.equal(events.some(e=>e.type==='result'),valid);assert.equal(events.some(e=>e.type==='error'),!valid);}}
 finally{global.fetch=fetchOriginal;if(key===undefined)delete process.env.AI_API_KEY;else process.env.AI_API_KEY=key;}
});
test('reject cross-origin requests',async()=>{const req=request({});req.headers.origin='https://other.example';const res=result();await handleAI(req,res);assert.equal(res.statusCode,403);});

test('reject opaque sandbox origin without crashing',async()=>{const req=request({});req.headers.origin='null';const res=result();await handleAI(req,res);assert.equal(res.statusCode,403);});

test('same-origin proxied request passes source validation without contacting the model',async()=>{
 const original=global.fetch;let called=false;
 global.fetch=async()=>{called=true;throw Error('Must not call upstream');};
 try{const req=request({prompt:'',files:[]});req.headers={host:'127.0.0.1:5173',origin:'http://127.0.0.1:5173'};const res=result();await handleAI(req,res);assert.notEqual(res.statusCode,403);assert.equal(called,false);assert.match(res.output,/请输入|尚未配置/);}
 finally{global.fetch=original;}
});
