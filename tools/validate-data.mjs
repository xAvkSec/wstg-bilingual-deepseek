/* Validates the WSTG data files: category/test counts, required fields,
   and that every test has complete en/t/b/s registers of matching length.
   Run with:  npm run validate   (no dependencies) */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const jsDir = path.join(root, 'js');
const files = fs.readdirSync(jsDir).filter(f => /^data-.*\.js$/.test(f)).sort();

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(jsDir, f), 'utf8'), sandbox, { filename: f });

const DATA = (sandbox.window.WSTG_DATA || []).slice().sort((a, b) => a.order - b.order);
const REGS = ['t', 'b', 's'];
const problems = [];

const CATS = 12, TESTS = 115;
if (DATA.length !== CATS) problems.push(`expected ${CATS} categories, got ${DATA.length}`);

const orders = new Set(), codes = new Set();
let total = 0;

DATA.forEach(cat => {
  if (orders.has(cat.order)) problems.push(`duplicate order ${cat.order}`);
  orders.add(cat.order);
  if (codes.has(cat.code)) problems.push(`duplicate code ${cat.code}`);
  codes.add(cat.code);
  for (const k of ['name_en', 'desc_en', 'name_id', 'desc_id']) if (!cat[k]) problems.push(`${cat.code}: missing ${k}`);
  if (cat.name_id) for (const r of REGS) if (!cat.name_id[r]) problems.push(`${cat.code}: name_id.${r}`);

  cat.tests.forEach((t, ti) => {
    total++;
    const id = `${cat.code}-${String(ti + 1).padStart(2, '0')}`;
    for (const k of ['name_en', 'name_id', 'summary', 'howto', 'remediation', 'tools']) {
      if (!t[k]) problems.push(`${id}: missing ${k}`);
    }
    if (t.name_id) for (const r of REGS) if (!t.name_id[r]) problems.push(`${id}: name_id.${r}`);
    for (const k of ['summary', 'remediation']) {
      if (t[k]) for (const r of ['en', ...REGS]) if (!t[k][r]) problems.push(`${id}: ${k}.${r}`);
    }
    if (t.howto) {
      const lens = ['en', ...REGS].map(r => (t.howto[r] || []).length);
      if (lens.some(l => l === 0)) problems.push(`${id}: an empty howto register`);
      if (new Set(lens).size > 1) problems.push(`${id}: howto register lengths differ ${JSON.stringify(lens)}`);
    }
    if (!Array.isArray(t.tools) || t.tools.length === 0) problems.push(`${id}: no tools`);
  });
});
if (total !== TESTS) problems.push(`expected ${TESTS} tests, got ${total}`);

const names = [];
DATA.forEach(c => c.tests.forEach(t => names.push(t.name_en)));
const dupes = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
if (dupes.length) problems.push(`duplicate test names: ${dupes.join(', ')}`);

if (problems.length) {
  console.error(`\u2717 data validation failed (${problems.length}):`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`\u2713 data ok \u2014 ${DATA.length} categories, ${total} tests, all registers complete`);
