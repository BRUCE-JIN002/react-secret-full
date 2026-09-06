import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'build');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'site/.vitepress/catalog.json'), 'utf8'));
const checkAsset = (asset, page) => {
  const filename = asset.split(/[?#]/)[0];
  if (!filename.startsWith('/') || filename.startsWith('//')) return;
  const resolved = path.join(out, decodeURIComponent(filename));
  assert(fs.existsSync(resolved), `Missing asset ${filename} on ${page}`);
};
for (const page of ['index', 'guide/getting-started', 'guide/development', ...catalog.map((entry) => entry.link.slice(1))]) {
  const filename = path.join(out, `${page}.html`);
  assert(fs.existsSync(filename), `Missing static page: ${page}`);
  const html = fs.readFileSync(filename, 'utf8');
  assert(html.includes('<h1'), `Missing prerendered heading: ${page}`);
  assert(!html.includes('%PUBLIC_URL%'), `Legacy placeholder in ${page}`);
  for (const match of html.matchAll(/(?:src|href)="([^\"]+\.(?:js|css|png|svg|woff2?)(?:\?[^\"]*)?)"/g)) checkAsset(match[1], page);
}
for (const asset of ['ai-playground.html', 'playground/ai-runtime/react.production.min.js', 'playground/ai-runtime/react-dom.production.min.js', 'playground/index.html', 'sitemap.xml', '.nojekyll', '404.html']) assert(fs.existsSync(path.join(out, asset)), `Missing ${asset}`);
const playground = fs.readFileSync(path.join(out, 'playground/index.html'), 'utf8');
for (const match of playground.matchAll(/(?:src|href)="([^\"]+)"/g)) checkAsset(match[1], 'playground');
console.log(`Verified ${catalog.length} business documents, homepage and guides, referenced assets, playground, sitemap and GitHub Pages markers.`);
