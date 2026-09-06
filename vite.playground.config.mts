import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { aiPlugin } from './scripts/ai-service.mjs';
import fs from 'node:fs';
import path from 'node:path';
const runtimeFiles = ['react/umd/react.production.min.js', 'react-dom/umd/react-dom.production.min.js'];
function runtimePlugin() { return { name: 'ai-react-runtime', configureServer(server) { server.middlewares.use((req,res,next) => { const name = req.url?.split('?')[0].split('/').pop(); const entry = runtimeFiles.find(file => file.endsWith('/'+name)); if (!req.url?.includes('/ai-runtime/') || !entry) return next(); res.setHeader('Content-Type','application/javascript'); fs.createReadStream(path.resolve('node_modules',entry)).pipe(res); }); }, generateBundle() { for (const file of runtimeFiles) this.emitFile({type:'asset',fileName:'ai-runtime/'+path.basename(file),source:fs.readFileSync(path.resolve('node_modules',file))}); } }; }
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
export default defineConfig({
  plugins: [react(), aiPlugin(), runtimePlugin()],
  base: '/playground/',
  publicDir: false,
  server: { host: '127.0.0.1', port: 5174, strictPort: true },
  build: { outDir: 'site/public/playground', emptyOutDir: true, sourcemap: false },
  css: { postcss: { plugins: [tailwindcss({ config: './tailwind.config.js' }), autoprefixer()] } },
});
