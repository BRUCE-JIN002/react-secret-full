import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
for (const args of [
  ['scripts/sync-example-docs.js', '--check'],
  ['scripts/check-doc-coverage.js'],
  ['scripts/generate-site.mjs'],
  ['node_modules/typescript/bin/tsc', '--noEmit'],
  ['node_modules/vite/bin/vite.js', 'build', '--config', 'vite.playground.config.mts'],
  ['node_modules/vitepress/bin/vitepress.js', 'build', 'site'],
]) {
  const result = spawnSync(process.execPath, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
fs.writeFileSync(path.join(root, 'build/.nojekyll'), '');
console.log('Site built in build/. GitHub Pages output includes documentation and React playground.');
