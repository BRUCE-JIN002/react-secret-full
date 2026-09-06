import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const generator = spawn(process.execPath, ['scripts/generate-site.mjs'], { cwd: root, stdio: 'inherit' });
generator.on('exit', (code) => {
  if (code) process.exit(code);
  const children = [
    spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--config', 'vite.playground.config.mts'], { cwd: root, stdio: 'inherit' }),
    spawn(process.execPath, ['node_modules/vitepress/bin/vitepress.js', 'dev', 'site'], { cwd: root, stdio: 'inherit' }),
  ];
  const stop = (exitCode = 0) => { children.forEach((child) => child.kill('SIGTERM')); process.exit(exitCode); };
  process.on('SIGINT', () => stop());
  process.on('SIGTERM', () => stop());
  children.forEach((child) => child.on('exit', (exitCode) => stop(exitCode || 0)));
});
