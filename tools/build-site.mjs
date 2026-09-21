/* Assembles ./_site exactly like .github/workflows/pages.yml (reader at /, tracker at /tracker/).
   Run with:  npm run build:site   (zero deps) */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, '_site');

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'tracker'), { recursive: true });

for (const f of ['index.html', 'style.css', 'manifest.webmanifest', 'service-worker.js', '.nojekyll']) {
  fs.copyFileSync(path.join(root, f), path.join(out, f));
}
for (const d of ['icons', 'js']) {
  fs.cpSync(path.join(root, d), path.join(out, d), { recursive: true });
}
fs.copyFileSync(path.join(root, 'tracker', 'index.html'), path.join(out, 'tracker', 'index.html'));

console.log(`built ${path.relative(root, out)}/`);
