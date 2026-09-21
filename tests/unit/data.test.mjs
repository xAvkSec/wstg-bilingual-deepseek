/* Pure-Node unit tests for the WSTG bilingual data files. No browser required.
   Run with:  npm run test:unit   (node --test tests/unit)

   These mirror tools/validate-data.mjs but also guard the shared localStorage
   key contract between the reader's js/data-*.js and the tracker (category order
   + per-category test order). The tracker is found at either layout:
     • ../wstg-tracker/index.html  (local workspace)
     • ./tracker/index.html        (repo / deploy layout)
   If neither exists the alignment tests are skipped instead of failing. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..', '..');
const jsDir = path.join(root, 'js');
function findTracker() {
  return [
    path.resolve(root, '..', 'wstg-tracker', 'index.html'),   // local workspace
    path.resolve(root, 'tracker', 'index.html'),              // repo / deploy
  ].find((p) => fs.existsSync(p)) || null;
}
const trackerPath = findTracker();

const CATS = 12;
const TESTS = 115;
const REGS = ['en', 't', 'b', 's'];
const NAME_ID_REGS = ['t', 'b', 's'];

/* Load every js/data-*.js into a vm sandbox the same way the app and the
   existing validator do: the files push onto window.WSTG_DATA. */
function loadData() {
  const files = fs
    .readdirSync(jsDir)
    .filter((f) => /^data-.*\.js$/.test(f))
    .sort();
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(jsDir, f), 'utf8'), sandbox, {
      filename: f,
    });
  }
  return (sandbox.window.WSTG_DATA || [])
    .slice()
    .sort((a, b) => a.order - b.order);
}

/* Pull the `const CATEGORIES = [ ... ];` array literal out of the tracker's
   inline <script> and evaluate just that expression in an isolated context. */
function loadTrackerCategories() {
  if (!trackerPath) return null;
  const html = fs.readFileSync(trackerPath, 'utf8');
  const m = html.match(/const CATEGORIES\s*=\s*(\[[\s\S]*?\n\]);/);
  assert.ok(m, 'tracker: could not extract the CATEGORIES array literal');
  return vm.runInNewContext(m[1]);
}

const DATA = loadData();
const TRACKER = loadTrackerCategories();
const skipTracker = TRACKER ? false : 'tracker/index.html not present in this checkout';

/* Normalize a test name for cross-source comparison: drop a leading
   "Test " / "Testing " / "Test for " prefix, fold any non-alphanumeric
   run to a single space, and case-fold. This tolerates cosmetic separator
   differences (e.g. "Traversal/File" vs "Traversal File") while still
   catching reordering or substitution. */
function normalizeName(name) {
  return String(name)
    .replace(/^(?:Test|Testing)\s+(?:for\s+)?/i, '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();
}

test('data: exactly 12 categories and 115 tests', () => {
  assert.equal(DATA.length, CATS, 'category count');
  const total = DATA.reduce((n, c) => n + c.tests.length, 0);
  assert.equal(total, TESTS, 'test count');
});

test('data: category order and code are unique', () => {
  const orders = new Set();
  const codes = new Set();
  for (const c of DATA) {
    assert.ok(!orders.has(c.order), `duplicate category order ${c.order}`);
    assert.ok(!codes.has(c.code), `duplicate category code ${c.code}`);
    orders.add(c.order);
    codes.add(c.code);
  }
});

test('data: category name_id has t/b/s', () => {
  for (const c of DATA) {
    assert.ok(c.name_id, `${c.code}: missing name_id`);
    for (const r of NAME_ID_REGS) {
      assert.ok(
        typeof c.name_id[r] === 'string' && c.name_id[r].length > 0,
        `${c.code}: missing name_id.${r}`,
      );
    }
  }
});

test('data: every test has en/t/b/s name_id, summary, remediation, howto', () => {
  for (const c of DATA) {
    c.tests.forEach((t, ti) => {
      const id = `${c.code}-${String(ti + 1).padStart(2, '0')}`;

      assert.ok(
        typeof t.name_en === 'string' && t.name_en.length > 0,
        `${id}: missing name_en`,
      );
      for (const r of NAME_ID_REGS) {
        assert.ok(
          typeof t.name_id?.[r] === 'string' && t.name_id[r].length > 0,
          `${id}: missing name_id.${r}`,
        );
      }

      for (const field of ['summary', 'remediation', 'howto']) {
        const v = t[field];
        assert.ok(v, `${id}: missing ${field}`);
        for (const r of REGS) {
          assert.ok(v[r], `${id}: missing ${field}.${r}`);
        }
      }
    });
  }
});

test('data: summary and remediation are non-empty strings per register', () => {
  for (const c of DATA) {
    c.tests.forEach((t, ti) => {
      const id = `${c.code}-${String(ti + 1).padStart(2, '0')}`;
      for (const field of ['summary', 'remediation']) {
        for (const r of REGS) {
          assert.equal(typeof t[field][r], 'string', `${id}: ${field}.${r}`);
          assert.ok(t[field][r].length > 0, `${id}: empty ${field}.${r}`);
        }
      }
    });
  }
});

test('data: howto arrays are non-empty and equal-length across en/t/b/s', () => {
  for (const c of DATA) {
    c.tests.forEach((t, ti) => {
      const id = `${c.code}-${String(ti + 1).padStart(2, '0')}`;
      const lens = REGS.map((r) => {
        assert.ok(Array.isArray(t.howto[r]), `${id}: howto.${r} is not an array`);
        return t.howto[r].length;
      });
      assert.ok(lens.every((l) => l > 0), `${id}: an empty howto register`);
      assert.equal(
        new Set(lens).size,
        1,
        `${id}: howto register lengths differ ${JSON.stringify(lens)}`,
      );
    });
  }
});

test('data: no duplicate name_en', () => {
  const names = [];
  for (const c of DATA) for (const t of c.tests) names.push(t.name_en);
  const dupes = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
  assert.deepEqual(dupes, [], `duplicate test names: ${dupes.join(', ')}`);
});

test('tracker alignment: same category codes in the same order', { skip: skipTracker }, () => {
  assert.equal(TRACKER.length, DATA.length, 'tracker category count');
  // Array.from materializes both sides in the local realm; deepStrictEqual
  // otherwise flags the vm realm's Array.prototype as a prototype mismatch.
  assert.deepEqual(
    Array.from(TRACKER, (c) => c.code),
    Array.from(DATA, (c) => c.code),
    'category code order drifted between reader data and tracker',
  );
});

test('tracker alignment: per-category test counts match', { skip: skipTracker }, () => {
  assert.equal(TRACKER.length, DATA.length, 'tracker category count');
  DATA.forEach((c, i) => {
    assert.equal(
      TRACKER[i].tests.length,
      c.tests.length,
      `${c.code}: tracker has ${TRACKER[i].tests.length} tests, data has ${c.tests.length}`,
    );
  });
});

test('tracker alignment: positionally-aligned English names match (prefix-normalized)', { skip: skipTracker }, () => {
  assert.equal(TRACKER.length, DATA.length, 'tracker category count');
  DATA.forEach((c, i) => {
    c.tests.forEach((t, j) => {
      const id = `${c.code}-${String(j + 1).padStart(2, '0')}`;
      assert.equal(
        normalizeName(t.name_en),
        normalizeName(TRACKER[i].tests[j]),
        `${id}: name mismatch\n  data:    ${t.name_en}\n  tracker: ${TRACKER[i].tests[j]}`,
      );
    });
  });
});
