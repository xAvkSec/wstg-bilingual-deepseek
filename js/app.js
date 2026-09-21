'use strict';
/* WSTG Bilingual app — hash-routed SPA, bilingual columns, 3 ID registers,
   studied-state synced with the WSTG Tracker via the shared localStorage store. */

/* ---------------- store (shared with tracker) ---------------- */
const STORE_KEY = 'wstg-tracker-v1';
function prefersDark() {
  return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function loadStore() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
  return {};
}
const store = loadStore();
store.checked  = store.checked  || {};
store.theme    = store.theme    || (prefersDark() ? 'dark' : 'light');
store.langMode = store.langMode || 'both';   // both | en | id
store.reg      = store.reg      || 't';      // t | b | s
store.lastTest = store.lastTest || null;     // { code, num }
if (store.sidebarCollapsed === undefined) store.sidebarCollapsed = null;   // null = auto (rail on tablet)
/* study data — keyed with the same `ci-ti` scheme as `checked` */
store.testNotes = store.testNotes || {};    // { "ci-ti": "note text" }
store.bookmarks = store.bookmarks || {};    // { "ci-ti": true }
store.srs       = store.srs       || {};    // { "ci-ti": { b, due, n, l, last } }
store.guide     = store.guide     || 'wstg';   // active guide id
if (store.v === undefined) store.v = 2;        // store schema version (for future migrations)
let storageWarned = false;
function saveStore() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); }
  catch (e) {
    if (!storageWarned) { storageWarned = true; toast('⚠ Progress can’t be saved in this browser mode'); }
  }
}

/* ---------------- dom refs ---------------- */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const main = $('#main');
const sidebar = $('#sidebar');
const headerEl = document.querySelector('header');
const searchInput = $('#searchInput');
const searchClear = $('#searchClear');
const scrim = $('#scrim');
const navToggle = $('#navToggle');

/* ---------------- guides & data plumbing ----------------
   Test content is lazy-loaded after first paint (see boot()). WSTG keeps the
   bare `ci-ti` progress keys so the tracker stays in sync; any extra guide is
   namespaced with `<id>:` by pkey(). Add a guide to GUIDES to extend the app. */
const GUIDES = [
  {
    id: 'wstg', short: 'WSTG', name: 'OWASP WSTG', prefix: '',
    files: [
      'js/data-info.js', 'js/data-conf.js', 'js/data-idnt.js', 'js/data-athn.js',
      'js/data-athz.js', 'js/data-sess.js', 'js/data-inpv.js', 'js/data-errh.js',
      'js/data-cryp.js', 'js/data-busl.js', 'js/data-clnt.js', 'js/data-apit.js',
    ],
  },
  { id: 'apisec', short: 'API', name: 'OWASP API Security Top 10', prefix: 'apisec:', files: ['js/guide-apisec.js'] },
];
let currentGuide = GUIDES.find(g => g.id === store.guide) || GUIDES[0];
store.guide = currentGuide.id;

let DATA = [];                      // categories for the current guide, sorted by `order`
let FLAT = [];                      // { ci, ti, code, num, cat, test }
const loaded = new Set();

function loadFiles(files) {
  return Promise.all(files.map(src => new Promise((resolve, reject) => {
    if (loaded.has(src)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => { loaded.add(src); resolve(); };
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.head.appendChild(s);
  })));
}
function guideRaw(guide) {
  if (guide.id === 'wstg') return window.WSTG_DATA || [];
  return (window.WSTG_GUIDE_DATA || {})[guide.id] || [];
}
function buildData() {
  DATA = guideRaw(currentGuide).slice().sort((a, b) => a.order - b.order);
  FLAT = [];
  DATA.forEach((cat, ci) => {
    cat.tests.forEach((t, ti) => {
      FLAT.push({ ci, ti, code: cat.code, num: String(ti + 1).padStart(2, '0'), cat, test: t });
    });
  });
}
async function switchGuide(id) {
  const g = GUIDES.find(x => x.id === id);
  if (!g || g.id === currentGuide.id) return;
  currentGuide = g; store.guide = g.id; saveStore();
  try { await loadFiles(g.files); } catch (e) { console.error(e); }
  buildData();
  const wasHome = parseHash().page === 'home';
  location.hash = '#/';
  if (wasHome) render(true);
  toast(g.name);
}
const byCode = c => DATA.find(d => d.code === c);
const flatAt = (code, num) => FLAT.find(f => f.code === code && f.num === num);

/* WSTG version tag for a test: a v4.2 identifier, or 'dev' for post-4.2 tests */
function wstgVersion(ci, ti) {
  const code = DATA[ci] && DATA[ci].code;
  const arr = (window.WSTG_VERSIONS || {})[code];
  return (arr && arr[ti]) || null;
}
function versionCounts() {
  let v42 = 0, dev = 0;
  FLAT.forEach(f => { const v = wstgVersion(f.ci, f.ti); if (v === 'dev') dev++; else if (v) v42++; });
  return { v42, dev };
}

/* ---------------- helpers ---------------- */
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
/* escape, then turn `backtick commands` into <code> */
function rich(s) { return esc(s).replace(/`([^`]+)`/g, '<code title="Click to copy / Klik untuk salin">$1</code>'); }
function idText(obj) { return obj ? obj[store.reg] || obj.t || '' : ''; }
function refocus(sel) { const el = sel && document.querySelector(sel); if (el) el.focus(); }

/* header height is variable (mobile wraps the search bar) -> feed the sticky offsets */
function syncHeaderHeight() {
  const h = headerEl ? headerEl.offsetHeight : 58;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

/* ---------------- progress keys ----------------
   WSTG keeps the bare `ci-ti` key so the tracker stays in sync; future guides
   will namespace theirs (`guideId:ci-ti`) — see the multi-guide phase. */
const pkey = (ci, ti) => (currentGuide.prefix || '') + `${ci}-${ti}`;

/* ---------------- studied state ---------------- */
function isStudied(ci, ti) { return !!store.checked[pkey(ci, ti)]; }
function setStudied(ci, ti, val) {
  const k = pkey(ci, ti);
  if (val) store.checked[k] = true; else delete store.checked[k];
}
function studiedCount() { return FLAT.reduce((n, f) => n + (isStudied(f.ci, f.ti) ? 1 : 0), 0); }
function toggleStudied(ci, ti, focusSel) {
  const on = !isStudied(ci, ti);
  setStudied(ci, ti, on);
  saveStore(); render(false);
  toast(on ? '✓ Synced with WSTG Tracker' : 'Unmarked / Ditandai belum');
  refocus(focusSel);
}
function firstUnstudied() { return FLAT.find(f => !isStudied(f.ci, f.ti)); }
function resumeTarget() {
  const lt = store.lastTest;
  if (lt) { const f = flatAt(lt.code, lt.num); if (f) return f; }
  return firstUnstudied() || FLAT[0];
}
function resetProgress() {
  if (!FLAT.some(f => isStudied(f.ci, f.ti))) { toast('Nothing to reset / Tidak ada yang perlu direset'); return; }
  if (!window.confirm('Reset all studied progress?\nThis also clears it in the WSTG Tracker.\n\nSetel ulang semua progres?')) return;
  store.checked = {}; store.lastTest = null;
  saveStore(); render(true);
  toast('Progress reset / Progres disetel ulang');
}

/* ---------------- bookmarks & notes ---------------- */
function isBookmarked(ci, ti) { return !!store.bookmarks[pkey(ci, ti)]; }
function toggleBookmark(ci, ti) {
  const k = pkey(ci, ti);
  if (store.bookmarks[k]) delete store.bookmarks[k]; else store.bookmarks[k] = true;
  saveStore();
}
function bookmarkedFlat() { return FLAT.filter(f => isBookmarked(f.ci, f.ti)); }
function noteOf(ci, ti) { return store.testNotes[pkey(ci, ti)] || ''; }
function setNote(ci, ti, v) {
  const k = pkey(ci, ti);
  if (v && v.trim()) store.testNotes[k] = v; else delete store.testNotes[k];
  saveStore();
}
function noteCount() { return Object.keys(store.testNotes).filter(k => store.testNotes[k] && store.testNotes[k].trim()).length; }

/* ---------------- spaced repetition ----------------
   boxes 0..6; box 0 = relearn (10 min), then 1d → 3d → 7d → 21d → 60d */
const SRS_STEPS = [0, 10*60e3, 24*3600e3, 3*24*3600e3, 7*24*3600e3, 21*24*3600e3, 60*24*3600e3];
function srsEntry(ci, ti) { return store.srs[pkey(ci, ti)] || null; }
function srsCounts() {
  const now = Date.now(); let learned = 0, due = 0;
  FLAT.forEach(f => { const s = store.srs[pkey(f.ci, f.ti)]; if (s) { learned++; if (s.due <= now) due++; } });
  return { learned, due, novel: FLAT.length - learned };
}
function dueCards() {
  const now = Date.now();
  return FLAT.filter(f => { const s = store.srs[pkey(f.ci, f.ti)]; return s && s.due <= now; })
             .sort((a, b) => store.srs[pkey(a.ci, a.ti)].due - store.srs[pkey(b.ci, b.ti)].due);
}
function newCards() { return FLAT.filter(f => !store.srs[pkey(f.ci, f.ti)]); }
function gradeCard(ci, ti, grade) {
  const k = pkey(ci, ti);
  const s = store.srs[k] || { b: 0, due: 0, n: 0, l: 0, last: 0 };
  if (grade === 'again') { s.b = 0; s.l++; }
  else if (grade === 'hard') s.b = Math.max(0, s.b - 1);
  else if (grade === 'good') s.b = Math.min(6, s.b + 1);
  else if (grade === 'easy') s.b = Math.min(6, s.b + 2);
  s.n++; s.last = Date.now(); s.due = Date.now() + SRS_STEPS[s.b];
  store.srs[k] = s; saveStore();
}
function resetStudyData() {
  if (!window.confirm('Reset notes, bookmarks and the review schedule?\n\nSetel ulang catatan, bookmark, dan jadwal ulangan?')) return;
  store.testNotes = {}; store.bookmarks = {}; store.srs = {};
  saveStore(); render(true);
  toast('Study data reset / Data belajar disetel ulang');
}

/* ---------------- progress / toast ---------------- */
function updateProgress() {
  const done = studiedCount();
  const bar = $('#progressFill');
  if (bar) {
    bar.style.width = (FLAT.length ? done / FLAT.length * 100 : 0) + '%';
    const wrap = bar.parentElement;
    if (wrap) wrap.title = `${done} / ${FLAT.length} tests studied`;
  }
  const badge = $('#dueBadge');
  if (badge) {
    const due = srsCounts().due;
    badge.textContent = due;
    badge.hidden = due === 0;
  }
}
let toastTimer;
function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role','status'); t.setAttribute('aria-live','polite'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

/* ---------------- clipboard ---------------- */
function copyText(s) {
  const ok = () => toast('Copied / Disalin');
  const fallback = () => {
    try {
      const ta = document.createElement('textarea');
      ta.value = s; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); ta.remove(); ok();
    } catch (e) {}
  };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(s).then(ok).catch(fallback);
  else fallback();
}

/* ================= sidebar =================
   One component, three responsive tiers:
     • ≥ RAIL_BELOW   → full column (250px)
     • MOBILE_MAX+1 .. RAIL_BELOW-1 → icon rail (62px), auto unless the user chose
     • ≤ MOBILE_MAX   → off-canvas drawer
   The CSS mirrors these widths; the JS only toggles body classes. */
const Sidebar = (function () {
  const MOBILE_MAX = 767;     // must match the `max-width: 767px` media query in style.css
  const RAIL_BELOW = 1100;    // tablet / small desktop defaults to the rail
  const mqMobile = window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)');
  const openCats = new Set();     // expanded categories
  const el = {};                  // cached nodes
  let query = '';
  let built = false;
  let lastFocus = null;
  let vpTimer;

  const viewportWidth = () => (document.documentElement.clientWidth || window.innerWidth);
  const isMobile    = () => viewportWidth() <= MOBILE_MAX;
  const railPref    = () => (typeof store.sidebarCollapsed === 'boolean' ? store.sidebarCollapsed : null);
  const collapsedNow = () => !isMobile() && (railPref() === null ? viewportWidth() < RAIL_BELOW : railPref());

  /* ---- build the shell once (header + filter + list container) ---- */
  function mount() {
    if (built) return;
    sidebar.innerHTML = `
      <div class="side-top">
        <div class="side-head">
          <span class="side-title">Categories / Kategori</span>
          <span class="side-overall mono" id="sideOverall">0%</span>
          <button class="side-close" id="sideClose" type="button" aria-label="Tutup menu / Close">✕</button>
        </div>
        ${GUIDES.length > 1 ? `<div class="guide-switch" id="guideSwitch" role="group" aria-label="Guide / Panduan">${GUIDES.map(g => `<button type="button" data-guide="${g.id}" class="${currentGuide.id === g.id ? 'active' : ''}" title="${esc(g.name)}">${g.short}</button>`).join('')}</div>` : ''}
        <button class="side-expand" id="sideExpand" type="button" title="Tampilkan sidebar / Show sidebar"
                aria-label="Tampilkan sidebar / Show sidebar">
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <a class="side-study" href="#/study" title="Study / Belajar">
          <svg class="side-study-icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            <path d="M10 6C8.4 4.9 6.4 4.4 4 4.4v9.9c2.4 0 4.4.5 6 1.6 1.6-1.1 3.6-1.6 6-1.6V4.4c-2.4 0-4.4.5-6 1.6Z"
                  fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M10 6v9.9" stroke="currentColor" stroke-width="1.5"/>
          </svg>
          <span class="side-study-label">Study / Belajar</span>
          <span class="badge" id="dueBadge" hidden>0</span>
        </a>
        <div class="side-filter">
          <label class="sr-only" for="sideFilter">Filter tests / Filter ujian</label>
          <input id="sideFilter" type="search" autocomplete="off" placeholder="Filter / Cari ujian…">
          <button class="side-filter-clear" id="sideFilterClear" type="button" aria-label="Hapus filter" hidden>×</button>
        </div>
      </div>
      <div id="sideList" class="side-list"></div>`;

    el.filter  = sidebar.querySelector('#sideFilter');
    el.clear   = sidebar.querySelector('#sideFilterClear');
    el.list    = sidebar.querySelector('#sideList');
    el.overall = sidebar.querySelector('#sideOverall');
    el.filter.value = query;

    el.filter.addEventListener('input', () => { query = el.filter.value; syncClear(); render(); });
    el.filter.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        if (query) setQuery('');                                            // 1st Esc clears the filter
        else if (isMobile() && document.body.classList.contains('nav-open')) closeDrawer();  // 2nd Esc closes the drawer
        else el.filter.blur();
      } else if (e.key === 'ArrowDown') { const a = el.list.querySelector('a'); if (a) { e.preventDefault(); a.focus(); } }
    });
    el.clear.addEventListener('click', () => { setQuery(''); el.filter.focus(); });
    sidebar.querySelector('#sideClose').addEventListener('click', closeDrawer);
    sidebar.querySelector('#sideExpand').addEventListener('click', expand);
    const gs = sidebar.querySelector('#guideSwitch');
    if (gs) gs.addEventListener('click', e => { const b = e.target.closest('button[data-guide]'); if (b) switchGuide(b.dataset.guide); });
    el.list.addEventListener('click', e => {
      const tog = e.target.closest('.nav-cat-link');           // the name expands/collapses the category
      if (tog) { toggleCat(tog.dataset.code); return; }
      if (isMobile() && e.target.closest('a')) closeDrawer();  // picking a test/category dismisses the drawer
    });
    built = true;
  }

  /* ---- filter ---- */
  function setQuery(q) { query = q; if (el.filter) el.filter.value = q; syncClear(); render(); }
  function syncClear() { if (el.clear) el.clear.hidden = !query; }

  /* ---- disclosure (toggle in place so the grid-row animation runs) ---- */
  function toggleCat(code) {
    const open = !openCats.has(code);
    if (open) openCats.add(code); else openCats.delete(code);
    const wrap = el.list.querySelector(`.nav-cat[data-code="${code}"]`);
    if (!wrap) { render(); return; }
    wrap.classList.toggle('open', open);
    const link = wrap.querySelector('.nav-cat-link');
    if (link) link.setAttribute('aria-expanded', String(open));
  }

  /* ---- mobile drawer ---- */
  function openDrawer() {
    lastFocus = document.activeElement;
    document.body.classList.add('nav-open');
    scrim.hidden = false;
    apply();
    if (el.filter) setTimeout(() => el.filter.focus(), 60);
  }
  function closeDrawer() {
    if (!document.body.classList.contains('nav-open')) { apply(); return; }
    document.body.classList.remove('nav-open');
    scrim.hidden = true;
    apply();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function toggleDrawer() { document.body.classList.contains('nav-open') ? closeDrawer() : openDrawer(); }

  /* ---- desktop / tablet rail ---- */
  function expand()   { store.sidebarCollapsed = false; saveStore(); apply(); if (el.filter) el.filter.focus(); }
  function collapse() { store.sidebarCollapsed = true;  saveStore(); apply(); }
  function toggleRail() { collapsedNow() ? expand() : collapse(); }

  function onToggle() { isMobile() ? toggleDrawer() : toggleRail(); }

  /* ---- keep DOM + toggle button in sync with state ---- */
  function apply() {
    const mobile = isMobile();
    const collapsed = collapsedNow();
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    const drawerOpen = document.body.classList.contains('nav-open');

    if (mobile) {
      navToggle.innerHTML = `<span aria-hidden='true'>${drawerOpen ? '✕' : '☰'}</span>`;
      navToggle.title = drawerOpen ? 'Tutup menu' : 'Kategori';
      navToggle.setAttribute('aria-label', drawerOpen ? 'Tutup menu / Close menu' : 'Kategori / Categories');
      navToggle.setAttribute('aria-expanded', String(drawerOpen));
    } else {
      navToggle.innerHTML = `<span aria-hidden='true'>${collapsed ? '»' : '☰'}</span>`;
      navToggle.title = collapsed ? 'Show sidebar' : 'Hide sidebar';
      navToggle.setAttribute('aria-label', collapsed ? 'Tampilkan sidebar / Show sidebar' : 'Sembunyikan sidebar / Hide sidebar');
      navToggle.setAttribute('aria-expanded', String(!collapsed));
    }
    /* off-canvas links must leave the tab order when the drawer is closed */
    if (mobile && !drawerOpen) sidebar.setAttribute('inert', '');
    else sidebar.removeAttribute('inert');
  }

  /* ---- list rendering ---- */
  function catMatches(cat, q) {
    return cat.code.toLowerCase().includes(q)
        || cat.name_en.toLowerCase().includes(q)
        || (idText(cat.name_id) || '').toLowerCase().includes(q);
  }
  function testMatches(cat, t, ti, q) {
    const num = String(ti + 1).padStart(2, '0');
    return (t.name_en || '').toLowerCase().includes(q)
        || (idText(t.name_id) || '').toLowerCase().includes(q)
        || `${cat.code}-${num}`.toLowerCase().includes(q);
  }

  let lastCode = null, lastQuery = null;

  function render() {
    mount();
    const keepTop = sidebar.scrollTop;          // rebuilds shouldn't yank the user's position
    const cur = parseHash();

    /* auto-open the category we navigate into, once per route change, so a manual
       collapse of the current category sticks until you move elsewhere */
    const routeCode = (cur.page === 'test' || cur.page === 'cat') ? cur.code : null;
    if (routeCode && routeCode !== lastCode) openCats.add(routeCode);
    lastCode = routeCode;

    const overall = FLAT.length ? Math.round(studiedCount() / FLAT.length * 100) : 0;
    if (el.overall) el.overall.textContent = overall + '%';

    const q = query.trim().toLowerCase();
    /* when the filter text changes, reveal the categories that match */
    if (q !== lastQuery) {
      lastQuery = q;
      if (q) DATA.forEach(cat => {
        if (catMatches(cat, q) || cat.tests.some((t, ti) => testMatches(cat, t, ti, q))) openCats.add(cat.code);
      });
    }
    el.list.innerHTML = '';
    let shownCats = 0;

    DATA.forEach((cat, ci) => {
      const all = cat.tests.map((t, ti) => ({ t, ti }));
      let visible = all;
      if (q) {
        visible = catMatches(cat, q) ? all : all.filter(({ t, ti }) => testMatches(cat, t, ti, q));
        if (!visible.length) return;
      }
      shownCats++;

      const done = cat.tests.reduce((n, _, ti) => n + (isStudied(ci, ti) ? 1 : 0), 0);
      const pct = cat.tests.length ? Math.round(done / cat.tests.length * 100) : 0;
      const open = openCats.has(cat.code);
      const inCat = cur.code === cat.code && (cur.page === 'cat' || cur.page === 'test');

      const wrap = document.createElement('div');
      wrap.className = 'nav-cat' + (open ? ' open' : '');
      wrap.dataset.code = cat.code;

      const head = document.createElement('div');
      head.className = 'nav-cat-head' + (inCat ? ' active' : '');
      head.innerHTML = `
        <a class="nav-code nav-code-link" href="#/cat/${cat.code}" title="Buka halaman kategori / Open category: ${esc(cat.name_en)}"
           aria-label="Buka kategori ${cat.code} — ${esc(cat.name_en)}"${inCat ? ' aria-current="page"' : ''}>${cat.code}</a>
        <button class="nav-cat-link" type="button" data-code="${cat.code}" aria-expanded="${open}"
                title="${open ? 'Tutup' : 'Buka'} daftar test / ${open ? 'Collapse' : 'Expand'} — ${esc(cat.name_en)} (${done}/${cat.tests.length})">
          <span class="nav-name">${esc(cat.name_en)}</span>
          <span class="nav-pct${pct === 100 ? ' done' : ''}">${pct === 100 ? '✓' : pct + '%'}</span>
          <svg class="nav-cat-chevron" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="nav-mini" aria-hidden="true"><i style="width:${pct}%"></i></span>`;
      wrap.appendChild(head);

      const box = document.createElement('div');
      box.className = 'nav-tests';
      const ul = document.createElement('ul');
      ul.className = 'nav-tests-inner';
      visible.forEach(({ t, ti }) => {
        const num = String(ti + 1).padStart(2, '0');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#/test/${cat.code}/${num}`;
        const isActive = cur.page === 'test' && cur.code === cat.code && cur.num === num;
        const bm = isBookmarked(ci, ti);
        a.className = (isActive ? 'active ' : '') + (isStudied(ci, ti) ? 'studied ' : '') + (bm ? 'bookmarked' : '');
        if (isActive) a.setAttribute('aria-current', 'page');
        a.innerHTML = `<span class="tid">${cat.code}-${num}</span>${esc(t.name_en)}${bm ? '<span class="nav-star" aria-hidden="true">★</span>' : ''}`;
        a.title = idText(t.name_id) || t.name_en;
        li.appendChild(a); ul.appendChild(li);
      });
      box.appendChild(ul);
      wrap.appendChild(box);
      el.list.appendChild(wrap);
    });

    if (!shownCats) el.list.innerHTML = '<div class="side-empty">No matches / Tidak ada hasil</div>';

    sidebar.scrollTop = keepTop;
    const active = el.list.querySelector('a[aria-current="page"]');
    if (active) {
      const sr = sidebar.getBoundingClientRect(), ar = active.getBoundingClientRect();
      if (ar.top < sr.top || ar.bottom > sr.bottom) active.scrollIntoView({ block: 'nearest' });
    }
    const gs = sidebar.querySelector('#guideSwitch');
    if (gs) [...gs.querySelectorAll('button')].forEach(b => b.classList.toggle('active', b.dataset.guide === currentGuide.id));
    syncClear();
  }

  /* ---- viewport changes (debounced: media queries settle a tick late) ---- */
  function onViewportChange() {
    clearTimeout(vpTimer);
    vpTimer = setTimeout(() => {
      if (!isMobile() && document.body.classList.contains('nav-open')) closeDrawer();
      syncHeaderHeight();
      apply();
    }, 90);
  }

  window.addEventListener('resize', onViewportChange);
  window.addEventListener('orientationchange', () => setTimeout(onViewportChange, 120));
  if (mqMobile.addEventListener) mqMobile.addEventListener('change', onViewportChange);
  else if (mqMobile.addListener) mqMobile.addListener(onViewportChange);

  /* keep Tab inside the open drawer */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || !document.body.classList.contains('nav-open')) return;
    const f = [...sidebar.querySelectorAll('a[href], button:not([disabled]), input:not([disabled])')]
      .filter(n => n.getClientRects().length);   // skip display:none controls
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  return { mount, render, apply, onToggle, closeDrawer, isMobile };
})();

/* ---------------- router ---------------- */
function safeDecode(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }  // `#/search/%` must not kill the app
function parseHash() {
  const h = location.hash.slice(2); // strip '#/'
  const parts = h.split('/').filter(Boolean);
  if (parts[0] === 'test' && parts[1] && parts[2]) return { page: 'test', code: parts[1], num: parts[2] };
  if (parts[0] === 'cat' && parts[1]) return { page: 'cat', code: parts[1] };
  if (parts[0] === 'search' && parts[1]) return { page: 'search', q: safeDecode(parts[1]) };
  if (parts[0] === 'study') return { page: 'study' };
  if (parts[0] === 'cards') return { page: 'cards', mode: parts[1] || 'due' };
  if (parts[0] === 'quiz')  return { page: 'quiz' };
  return { page: 'home' };
}
function go(hash) { location.hash = hash; } // router event listener renders

function render(scroll = true) {
  const r = parseHash();
  if (scroll) window.scrollTo({ top: 0 });
  if (r.page === 'test') renderTest(r);
  else if (r.page === 'cat') renderCategory(r);
  else if (r.page === 'search') { searchInput.value = r.q; renderSearch(r.q); }
  else if (r.page === 'study') renderStudy();
  else if (r.page === 'cards') renderCards(r.mode);
  else if (r.page === 'quiz') renderQuiz();
  else renderHome();
  updateSearchClear();
  Sidebar.render();
  updateProgress();
  Sidebar.closeDrawer();
  syncHeaderHeight();
  updateReadProgress();
}

/* ---------------- shared bits ---------------- */
function ringSvg(pct) {
  const r = 26, c = 2 * Math.PI * r, off = c * (1 - pct / 100);
  return `<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--bg-subtle)" stroke-width="6"/>
    <circle cx="32" cy="32" r="${r}" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}" transform="rotate(-90 32 32)"/>
    <text x="32" y="37" text-anchor="middle" font-size="14" font-weight="700" fill="var(--text)">${pct}%</text>
  </svg>`;
}
const SEC_KEYS = { 'Summary': 'summary', 'Ringkasan': 'summary', 'How to Test': 'howto', 'Cara Menguji': 'howto', 'Tools': 'tools', 'Alat': 'tools', 'Remediation': 'remed', 'Perbaikan': 'remed' };
const sec = (label, bodyHtml) => {
  if (!bodyHtml) return '';
  const k = SEC_KEYS[label];
  return `<div class="tsection"${k ? ` data-sec="${k}"` : ''}><h3>${label}</h3>${bodyHtml}</div>`;
};

/* list row used by category pages and the study hub */
function testCard(ci, cat, t, ti) {
  const num = String(ti + 1).padStart(2, '0');
  const st = isStudied(ci, ti), bm = isBookmarked(ci, ti);
  return `<div class="cat-test-card ${st ? 'studied' : ''}">
    <a class="ctc-link" href="#/test/${cat.code}/${num}">
      <span class="ctc-id">${cat.code}-${num}</span>
      <span class="ctc-names">
        <span class="ctc-en" lang="en">${esc(t.name_en)}</span>
        <span class="ctc-idn" lang="id">${esc(idText(t.name_id))}</span>
      </span>
    </a>
    ${bm ? '<span class="ctc-star" title="Bookmarked / Ditandai">★</span>' : ''}
    <button class="ctc-toggle ${st ? 'on' : ''}" type="button" data-ci="${ci}" data-ti="${ti}"
            aria-pressed="${st}" aria-label="${st ? 'Mark unstudied' : 'Mark studied'} / Tandai"><span class="box"></span></button>
  </div>`;
}

/* ---------------- home ---------------- */
function renderHome() {
  const total = FLAT.length;
  const done = studiedCount();
  const pct = total ? Math.round(done / total * 100) : 0;
  const vc = versionCounts();
  const target = resumeTarget();
  const label = store.lastTest && flatAt(store.lastTest.code, store.lastTest.num)
    ? 'Continue / Lanjutkan'
    : (done ? 'Next unstudied / Lanjut yang belum' : 'Start / Mulai');

  main.innerHTML = `
    <div class="landing-hero">
      <h2>${esc(currentGuide.name)} <span class="dot">·</span> Bilingual</h2>
      <div class="sub">Panduan Pengujian Keamanan Web — English &amp; Bahasa Indonesia, berdampingan / side by side.</div>
    </div>

    <section class="home-stats" aria-label="Progress">
      <div class="stat-ring">${ringSvg(pct)}</div>
      <div class="stat-body">
        <div class="stat-line"><strong>${done}</strong> / ${total} tests studied</div>
        <div class="stat-sub">${DATA.length} categories · <strong>${vc.v42}</strong> WSTG v4.2${vc.dev ? ` + <strong>${vc.dev}</strong> dev` : ''} · CC BY-SA 4.0</div>
        <div class="home-actions">
          <a class="btn primary" href="#/test/${target.code}/${target.num}">▶ ${label} · <span class="mono">${target.code}-${target.num}</span></a>
          <a class="btn" href="#/study">Study / Belajar</a>
          ${done ? '<button class="btn" id="resetInline" type="button">Reset progress</button>' : ''}
        </div>
      </div>
    </section>

    <div class="landing-cats">
      ${DATA.map((cat) => {
        const ci = DATA.indexOf(cat);
        const d = cat.tests.reduce((n, _, ti) => n + (isStudied(ci, ti) ? 1 : 0), 0);
        const p = cat.tests.length ? Math.round(d / cat.tests.length * 100) : 0;
        const state = p === 100 ? 'done' : (d > 0 ? 'active' : '');
        return `<a class="landing-cat ${state}" href="#/cat/${cat.code}">
          <div class="lc-top"><span class="lc-code">${cat.code}</span><span class="lc-pct${p === 100 ? ' done' : ''}">${p === 100 ? '✓ done' : p + '%'}</span></div>
          <div class="lc-name">${esc(cat.name_en)}</div>
          <div class="lc-meta" lang="id">${esc(idText(cat.name_id))}</div>
          <div class="lc-bar"><span style="width:${p}%"></span></div>
          <div class="lc-meta">${d} / ${cat.tests.length} studied</div>
        </a>`;
      }).join('')}
    </div>`;
}

/* ---------------- category page ---------------- */
let catFilter = 'all';   // all | todo | done  (per session)
function renderCategory(r) {
  const cat = byCode(r.code);
  if (!cat) { renderHome(); return; }
  const ci = DATA.indexOf(cat);
  const done = cat.tests.reduce((n, _, ti) => n + (isStudied(ci, ti) ? 1 : 0), 0);
  const pct = cat.tests.length ? Math.round(done / cat.tests.length * 100) : 0;

  const rows = cat.tests.map((t, ti) => ({ t, ti }))
    .filter(({ ti }) => catFilter === 'all' || (catFilter === 'todo' ? !isStudied(ci, ti) : isStudied(ci, ti)));

  const cards = rows.map(({ t, ti }) => testCard(ci, cat, t, ti)).join('');

  main.innerHTML = `
    <div class="crumb"><a href="#/">Home</a> / ${cat.code}</div>
    <div class="landing-hero">
      <h2>${esc(cat.name_en)}</h2>
      <div class="sub" lang="id">${esc(idText(cat.name_id))}</div>
      <div class="sub small">${esc(cat.desc_en)} · <span lang="id">${esc(idText(cat.desc_id))}</span></div>
    </div>

    <div class="cat-toolbar">
      <div class="cat-progress-wrap" title="${done} / ${cat.tests.length} studied">
        <div class="cat-progress"><div class="cat-progress-fill" style="width:${pct}%"></div></div>
        <span class="cat-progress-label mono">${done}/${cat.tests.length}</span>
      </div>
      <div class="seg" id="catFilterSeg" role="group" aria-label="Filter tests">
        <button type="button" data-f="all"  class="${catFilter === 'all'  ? 'active' : ''}">All</button>
        <button type="button" data-f="todo" class="${catFilter === 'todo' ? 'active' : ''}">To study</button>
        <button type="button" data-f="done" class="${catFilter === 'done' ? 'active' : ''}">Studied</button>
      </div>
      <button class="btn small" id="markAllBtn" type="button" data-ci="${ci}"
              ${done === cat.tests.length ? 'disabled' : ''}>Mark all studied</button>
    </div>

    <div class="cat-tests">${cards || '<div class="empty-inline">Nothing here / Tidak ada di filter ini.</div>'}</div>`;
}

/* ---------------- test page ---------------- */
function renderTest(r) {
  const cat = byCode(r.code);
  if (!cat) { renderHome(); return; }
  const ci = DATA.indexOf(cat);
  const ti = parseInt(r.num, 10) - 1;
  const t = cat.tests[ti];
  if (!t) { renderCategory({ code: r.code }); return; }

  /* remember the last test opened so Home can offer "Continue" (only write on change) */
  if (!store.lastTest || store.lastTest.code !== cat.code || store.lastTest.num !== r.num) {
    store.lastTest = { code: cat.code, num: r.num };
    saveStore();
  }

  const fi = FLAT.findIndex(f => f.ci === ci && f.ti === ti);
  const prev = FLAT[fi - 1], next = FLAT[fi + 1];
  const st = isStudied(ci, ti);
  const bm = isBookmarked(ci, ti);
  const ver = wstgVersion(ci, ti);

  const enCol = `
    <div class="lang-col en" lang="en"><span class="lang-tag">English</span>
      <div class="lang-title">${esc(t.name_en)}</div>
      ${sec('Summary', t.summary && t.summary.en ? `<p>${rich(t.summary.en)}</p>` : '')}
      ${sec('How to Test', t.howto && t.howto.en ? `<ol>${t.howto.en.map(s => `<li>${rich(s)}</li>`).join('')}</ol>` : '')}
      ${sec('Tools', t.tools && t.tools.length ? `<div>${t.tools.map(x => `<span class="tool">${esc(x)}</span>`).join('')}</div>` : '')}
      ${sec('Remediation', t.remediation && t.remediation.en ? `<p>${rich(t.remediation.en)}</p>` : '')}
    </div>`;

  const idCol = `
    <div class="lang-col id" lang="id"><span class="lang-tag">Indonesia · ${({ t: 'Teknis', b: 'Baku', s: 'Sederhana' })[store.reg]}</span>
      <div class="lang-title">${esc(idText(t.name_id))}</div>
      ${sec('Ringkasan', t.summary ? `<p>${rich(idText(t.summary))}</p>` : '')}
      ${sec('Cara Menguji', t.howto ? `<ol>${(t.howto[store.reg] || t.howto.t || []).map(s => `<li>${rich(s)}</li>`).join('')}</ol>` : '')}
      ${sec('Alat', t.tools && t.tools.length ? `<div>${t.tools.map(x => `<span class="tool">${esc(x)}</span>`).join('')}</div>` : '')}
      ${sec('Perbaikan', t.remediation ? `<p>${rich(idText(t.remediation))}</p>` : '')}
    </div>`;

  const toc = [ { key: 'summary', en: 'Summary', id: 'Ringkasan' }, { key: 'howto', en: 'How to Test', id: 'Cara Menguji' }, { key: 'tools', en: 'Tools', id: 'Alat' }, { key: 'remed', en: 'Remediation', id: 'Perbaikan' } ];
  const tocHtml = `<nav class="test-toc" id="testToc" aria-label="Sections / Bagian">${toc.map(it => `<button type="button" data-sec="${it.key}">${store.langMode === 'id' ? it.id : it.en}</button>`).join('')}</nav>`;

  main.innerHTML = `
    <div class="crumb"><a href="#/">Home</a> / <a href="#/cat/${cat.code}">${cat.code} — ${esc(cat.name_en)}</a> / ${cat.code}-${r.num}</div>
    <div class="test-head">
      <span class="test-id-chip">${ver && ver !== 'dev' ? ver : `WSTG-${cat.code}-${r.num}`}</span>${ver === 'dev' ? '<span class="ver-badge" title="Ditambahkan setelah WSTG v4.2 / added after v4.2">dev</span>' : ''}
      <div>
        <div class="test-title-en" lang="en">${esc(t.name_en)}</div>
        <div class="test-title-id" lang="id">${esc(idText(t.name_id))}</div>
      </div>
    </div>
    <div class="test-controls">
      <span class="ctrl-label" id="modeLabel">Language</span>
      <div class="seg" id="modeSeg" role="group" aria-labelledby="modeLabel">
        <button type="button" data-m="en"   aria-pressed="${store.langMode === 'en'}"   class="${store.langMode === 'en'   ? 'active' : ''}">EN</button>
        <button type="button" data-m="both" aria-pressed="${store.langMode === 'both'}" class="${store.langMode === 'both' ? 'active' : ''}">EN + ID</button>
        <button type="button" data-m="id"   aria-pressed="${store.langMode === 'id'}"   class="${store.langMode === 'id'   ? 'active' : ''}">ID</button>
      </div>
      <span class="ctrl-label" id="regLabel">Register</span>
      <div class="seg reg-seg" id="regSeg" role="group" aria-labelledby="regLabel">
        <button type="button" data-r="t" aria-pressed="${store.reg === 't'}" class="${store.reg === 't' ? 'active' : ''}">Teknis</button>
        <button type="button" data-r="b" aria-pressed="${store.reg === 'b'}" class="${store.reg === 'b' ? 'active' : ''}">Baku</button>
        <button type="button" data-r="s" aria-pressed="${store.reg === 's'}" class="${store.reg === 's' ? 'active' : ''}">Sederhana</button>
      </div>
      <button class="bookmark-btn ${bm ? 'on' : ''}" id="bookmarkBtn" type="button" data-ci="${ci}" data-ti="${ti}"
              aria-pressed="${bm}" title="Bookmark / Tandai (B)" aria-label="Bookmark / Tandai">${bm ? '★' : '☆'}</button>
      <button class="mark-studied ${st ? 'on' : ''}" id="markBtn" type="button" data-ci="${ci}" data-ti="${ti}"
              aria-pressed="${st}" title="Shortcut: M">
        <span class="box"></span> ${st ? 'Sudah dipelajari ✓' : 'Tandai dipelajari'}
      </button>
      <button class="btn small" id="printBtn" type="button" title="Print / Cetak halaman ini">⎙ Print</button>
      <div class="read-progress" aria-hidden="true"><i id="readFill"></i></div>
    </div>
    ${tocHtml}
    <div class="bilingual ${store.langMode === 'id' ? 'mode-id' : store.langMode === 'en' ? 'mode-en' : ''}">
      ${enCol}${idCol}
    </div>
    <section class="test-notes" aria-label="Notes / Catatan">
      <div class="notes-head">
        <h3>Notes / Catatan</h3>
        <span class="note-status" id="noteStatus" aria-live="polite"></span>
      </div>
      <textarea id="noteInput" data-ci="${ci}" data-ti="${ti}" rows="4" spellcheck="true"
                placeholder="Your findings, payloads, follow-ups… / Temuan, payload, tindak lanjut…">${esc(noteOf(ci, ti))}</textarea>
    </section>
    <div class="pager">
      ${prev ? `<a href="#/test/${prev.code}/${prev.num}" title="Shortcut: ←"><span class="pg-label">← Sebelumnya / Prev</span><span class="pg-name">${esc(prev.test.name_en)}</span></a>` : '<span></span>'}
      ${next ? `<a class="next" href="#/test/${next.code}/${next.num}" title="Shortcut: →"><span class="pg-label">Berikutnya / Next →</span><span class="pg-name">${esc(next.test.name_en)}</span></a>` : ''}
    </div>`;
}

/* ---------------- search ---------------- */
let searchTm;
function updateSearchClear() { if (searchClear) searchClear.hidden = !searchInput.value; }

function haystack(f) {
  const t = f.test;
  return [
    t.name_en, ...Object.values(t.name_id || {}),
    t.summary ? Object.values(t.summary).join(' ') : '',
    t.remediation ? Object.values(t.remediation).join(' ') : '',
    t.howto ? Object.values(t.howto).flat().join(' ') : '',
    (t.tools || []).join(' '), `${f.code}-${f.num}`, f.cat.name_en,
  ].join(' ').toLowerCase();
}
function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function highlight(text, needles) {
  const arr = (Array.isArray(needles) ? needles : [needles]).filter(x => x && x.length >= 2).sort((a, b) => b.length - a.length);
  if (!arr.length) return esc(text);
  const re = new RegExp('(' + arr.map(escapeRe).join('|') + ')', 'gi');
  return esc(text).replace(re, '<mark>$&</mark>');
}
function subsequence(needle, hay) {   // every char of needle appears in order in hay
  let i = 0;
  for (let j = 0; j < hay.length && i < needle.length; j++) if (hay[j] === needle[i]) i++;
  return i === needle.length;
}
/* pick the summary register that contains all query tokens, in the user's preferred order */
function snippetFor(f, tokens) {
  const s = f.test.summary || {};
  const order = [store.reg, 't', 'b', 's', 'en'];
  for (const reg of order) {
    const v = s[reg];
    if (v && tokens.every(tk => v.toLowerCase().includes(tk))) return { text: v, lang: reg === 'en' ? 'en' : 'id' };
  }
  return { text: s.en || '', lang: 'en' };
}
function clip(text, token, len = 160) {
  if (text.length <= len) return text;
  const i = Math.max(0, text.toLowerCase().indexOf(token || ''));
  let start = Math.max(0, i - 40);
  if (start > 0) { const sp = text.lastIndexOf(' ', start); if (sp > 0) start = sp + 1; }
  let out = text.slice(start, start + len);
  if (start > 0) out = '…' + out;
  if (start + len < text.length) out += '…';
  return out;
}
function moveSearchFocus(delta) {
  const cards = $$('.result-card');
  if (!cards.length) return;
  const i = cards.indexOf(document.activeElement);
  if (i === -1) { (delta > 0 ? cards[0] : cards[cards.length - 1]).focus(); return; }
  const n = (i + delta + cards.length) % cards.length;
  cards[n].focus();
}
let searchCat = 'all';   // 'all' | category code (filter within search results)
function renderSearch(q) {
  const needle = (q || '').trim().toLowerCase();
  const tokens = needle.split(/\s+/).filter(Boolean);
  const pool = searchCat === 'all' ? FLAT : FLAT.filter(f => f.code === searchCat);
  let hits = tokens.length ? pool.filter(f => { const h = haystack(f); return tokens.every(tk => h.includes(tk)); }) : [];
  let fuzzy = false;
  if (tokens.length && !hits.length && needle.length >= 3) {
    hits = pool.filter(f => subsequence(needle.replace(/\s/g, ''), haystack(f)));
    fuzzy = hits.length > 0;
  }
  const counts = {};
  FLAT.forEach(f => { counts[f.code] = (counts[f.code] || 0) + 1; });
  const chips = `<div class="search-cats" id="searchCats" role="group" aria-label="Filter by category / Filter kategori">
    <button type="button" data-cat="all" class="${searchCat === 'all' ? 'active' : ''}">All<span class="chip-n">${FLAT.length}</span></button>
    ${DATA.map(c => `<button type="button" data-cat="${c.code}" class="${searchCat === c.code ? 'active' : ''}" title="${esc(c.name_en)}">${c.code}<span class="chip-n">${counts[c.code] || 0}</span></button>`).join('')}
  </div>`;
  main.innerHTML = `
    <div class="landing-hero"><h2>Search / Pencarian</h2>
      <div class="sub">${hits.length} result${hits.length === 1 ? '' : 's'} for “${esc(q)}”${fuzzy ? ' <span class="kbd-note">(fuzzy / mirip)</span>' : ''} · <span class="kbd-note"><kbd>↑</kbd><kbd>↓</kbd> navigate · <kbd>Enter</kbd> open</span></div></div>
    ${chips}
    ${hits.length ? hits.map(f => {
      const snap = snippetFor(f, tokens);
      return `<a class="result-card" href="#/test/${f.code}/${f.num}">
        <div class="rc-id">WSTG-${f.code}-${f.num} · ${esc(f.cat.name_en)}</div>
        <div class="rc-name" lang="en">${highlight(f.test.name_en, tokens)}</div>
        <div class="rc-idname" lang="id">${highlight(idText(f.test.name_id) || '', tokens)}</div>
        <div class="rc-snippet" lang="${snap.lang}">${highlight(clip(snap.text, tokens[0] || ''), tokens)}</div>
      </a>`;
    }).join('') : `<div class="empty-state"><div class="big">🔍</div>Nothing found for “${esc(q)}” / tidak ditemukan.</div>`}`;
}

/* ================= study: hub, flashcards, quiz ================= */
let noteTm;

function renderStudy() {
  const c = srsCounts();
  const bm = bookmarkedFlat();
  main.innerHTML = `
    <div class="crumb"><a href="#/">Home</a> / Study</div>
    <div class="landing-hero">
      <h2>Study <span class="dot">·</span> Belajar</h2>
      <div class="sub">Spaced-repetition flashcards, a quiz, bookmarks and per-test notes.</div>
    </div>

    <section class="study-grid" aria-label="Study status">
      <div class="study-stat due"><div class="ss-num">${c.due}</div><div class="ss-lab">Due now / Jatuh tempo</div></div>
      <div class="study-stat"><div class="ss-num">${c.novel}</div><div class="ss-lab">New / Baru</div></div>
      <div class="study-stat"><div class="ss-num">${c.learned}</div><div class="ss-lab">In rotation / Rotasi</div></div>
      <div class="study-stat"><div class="ss-num">${bm.length}</div><div class="ss-lab">Bookmarks / Tanda</div></div>
      <div class="study-stat"><div class="ss-num">${noteCount()}</div><div class="ss-lab">Notes / Catatan</div></div>
    </section>

    <div class="study-actions">
      <a class="btn primary" href="#/cards/due">▶ Review due${c.due ? ' (' + c.due + ')' : ''}</a>
      <a class="btn" href="#/cards/new">Learn new</a>
      <a class="btn" href="#/cards/all">Practice all</a>
      <a class="btn" href="#/cards/bookmarks">Bookmarked${bm.length ? ' (' + bm.length + ')' : ''}</a>
      <a class="btn" href="#/quiz">Quiz</a>
    </div>

    <div class="study-io">
      <button class="btn small" id="exportBtn" type="button">Export progress</button>
      <button class="btn small" id="importBtn" type="button">Import progress</button>
      <button class="btn small danger" id="resetStudyBtn" type="button">Reset study data</button>
      <input type="file" id="importFile" accept="application/json,.json" hidden>
    </div>

    <h3 class="study-h">Bookmarks / Tanda <span class="count-chip">${bm.length}</span></h3>
    ${bm.length
      ? `<div class="cat-tests">${bm.map(f => testCard(f.ci, f.cat, f.test, f.ti)).join('')}</div>`
      : '<div class="empty-inline">No bookmarks yet — tap ☆ on any test. / Belum ada tanda.</div>'}`;
}

/* ---- flashcards (SRS) ---- */
const CARD_MODES = { due: 'Due review / Ulangan', new: 'New cards / Kartu baru', all: 'Practice / Latihan', bookmarks: 'Bookmarked / Ditandai' };
let cardState = null;

function cardsDeck(mode) {
  if (mode === 'new') return newCards();
  if (mode === 'all') return FLAT.slice();
  if (mode === 'bookmarks') return bookmarkedFlat();
  return dueCards();
}
function flipCard() {
  if (!cardState || cardState.i >= cardState.deck.length) return;
  cardState.flipped = !cardState.flipped;
  const fc = $('#flashcard'); if (fc) fc.classList.toggle('flipped', cardState.flipped);
  const g = $('#cardGrade'); if (g) g.hidden = !cardState.flipped;
  const h = $('#cardsHint');
  if (h) h.textContent = cardState.flipped ? 'Grade with 1–4 / nilai dengan 1–4' : 'Space to reveal / Spasi untuk membuka';
}
function gradeCurrent(grade) {
  if (!cardState || cardState.i >= cardState.deck.length) return;
  if (!cardState.flipped) { flipCard(); return; }
  const f = cardState.deck[cardState.i];
  gradeCard(f.ci, f.ti, grade);
  cardState.tally[grade]++;
  cardState.i++; cardState.flipped = false;
  renderCards(cardState.mode);
  updateProgress();
}
function skipCard() {
  if (!cardState || cardState.i >= cardState.deck.length) return;
  cardState.i++; cardState.flipped = false;
  renderCards(cardState.mode);
}
function renderCards(mode) {
  if (!cardState || cardState.mode !== mode) {
    cardState = { mode, deck: cardsDeck(mode), i: 0, flipped: false, tally: { again: 0, hard: 0, good: 0, easy: 0 } };
  }
  const wrap = (inner) => `
    <div class="crumb"><a href="#/">Home</a> / <a href="#/study">Study</a> / Cards · ${esc(CARD_MODES[mode] || mode)}</div>
    ${inner}`;

  if (!cardState.deck.length) {
    main.innerHTML = wrap(`
      <div class="empty-state">
        <div class="big">✓</div>
        <p>${mode === 'due' ? 'Nothing due right now / Tidak ada yang jatuh tempo.' : 'No cards in this deck / Tidak ada kartu.'}</p>
        <div class="study-actions center">
          <a class="btn primary" href="#/cards/new">Learn new</a>
          <a class="btn" href="#/cards/all">Practice all</a>
          <a class="btn" href="#/study">Study hub</a>
        </div>
      </div>`);
    return;
  }
  if (cardState.i >= cardState.deck.length) {
    const t = cardState.tally;
    main.innerHTML = wrap(`
      <div class="empty-state">
        <div class="big">🎉</div>
        <p>Deck complete / Selesai — ${cardState.deck.length} card${cardState.deck.length === 1 ? '' : 's'}</p>
        <p class="kbd-note">Again ${t.again} · Hard ${t.hard} · Good ${t.good} · Easy ${t.easy}</p>
        <div class="study-actions center">
          <button class="btn primary" id="deckRestart" type="button">Study this deck again</button>
          <a class="btn" href="#/study">Study hub</a>
        </div>
      </div>`);
    return;
  }

  const f = cardState.deck[cardState.i];
  const t = f.test;
  const id = `WSTG-${f.code}-${f.num}`;
  const howto = t.howto ? (t.howto[store.reg] || t.howto.t || []).slice(0, 3) : [];
  main.innerHTML = wrap(`
    <div class="cards-top">
      <span class="mono">${cardState.i + 1} / ${cardState.deck.length}</span>
      <span class="cards-mode">${esc(CARD_MODES[mode] || '')}</span>
    </div>
    <div class="flashcard ${cardState.flipped ? 'flipped' : ''}" id="flashcard" role="button" tabindex="0"
         aria-label="Flashcard — tap or press Space to flip / Kartu — ketuk untuk membuka">
      <div class="fc-inner">
        <div class="fc-face fc-front">
          <span class="fc-id">${id}</span>
          <div class="fc-q">How would you test for / Bagaimana menguji:</div>
          <div class="fc-title" lang="en">${esc(t.name_en)}</div>
          <div class="fc-hint">Tap / Space to flip</div>
        </div>
        <div class="fc-face fc-back">
          <span class="fc-id">${id}</span>
          <div class="fc-title" lang="id">${esc(idText(t.name_id))}</div>
          <p lang="id">${rich(idText(t.summary))}</p>
          ${howto.length ? `<ol>${howto.map(s => `<li>${rich(s)}</li>`).join('')}</ol>` : ''}
          ${t.tools && t.tools.length ? `<div class="fc-tools">${t.tools.map(x => `<span class="tool">${esc(x)}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    </div>
    <div class="cards-actions">
      <button class="btn" id="cardFlip" type="button">Flip / Balik</button>
      <div class="grade-group" id="cardGrade" ${cardState.flipped ? '' : 'hidden'}>
        <button class="grade again" data-g="again" type="button" title="Shortcut 1">Again</button>
        <button class="grade hard"  data-g="hard"  type="button" title="Shortcut 2">Hard</button>
        <button class="grade good"  data-g="good"  type="button" title="Shortcut 3">Good</button>
        <button class="grade easy"  data-g="easy"  type="button" title="Shortcut 4">Easy</button>
      </div>
      <button class="btn small" id="cardSkip" type="button" title="Shortcut →">Skip →</button>
    </div>
    <p class="cards-hint kbd-note" id="cardsHint">Space to reveal / Spasi untuk membuka</p>`);
}

/* ---- quiz ---- */
const QUIZ_LEN = 10;
let quizState = null;
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function buildQuiz() {
  const pool = shuffle(FLAT.slice()).slice(0, Math.min(QUIZ_LEN, FLAT.length));
  return pool.map(f => {
    const sameCat = FLAT.filter(x => x.ci === f.ci && x.ti !== f.ti);
    const distPool = sameCat.length >= 3 ? sameCat : FLAT.filter(x => x.ci !== f.ci);
    const distractors = shuffle(distPool.slice()).slice(0, 3);
    const useRem = Math.random() < 0.4 && f.test.remediation;
    const src = useRem ? f.test.remediation : f.test.summary;
    const prompt = src[store.reg] || src.t || src.en;
    const opts = shuffle([
      { text: idText(f.test.name_id), correct: true },
      ...distractors.map(d => ({ text: idText(d.test.name_id), correct: false })),
    ]);
    return { prompt, kind: useRem ? 'remediation' : 'summary', correct: f, opts };
  });
}
function renderQuiz() {
  if (!quizState || quizState.done) quizState = { qs: buildQuiz(), i: 0, score: 0, answered: false };
  if (quizState.i >= quizState.qs.length) { main.innerHTML = quizResults(); return; }
  const q = quizState.qs[quizState.i];
  main.innerHTML = `
    <div class="crumb"><a href="#/">Home</a> / <a href="#/study">Study</a> / Quiz</div>
    <div class="quiz-top"><span class="mono">Q ${quizState.i + 1} / ${quizState.qs.length}</span><span>Score ${quizState.score}</span></div>
    <div class="quiz-prompt">${q.kind === 'remediation'
      ? 'Which test does this remediation address? / Perbaikan ini untuk ujian apa?'
      : 'Which test covers this? / Ini ujian apa?'}</div>
    <blockquote class="quiz-scenario" lang="${store.reg === 'en' ? 'en' : 'id'}">${rich(q.prompt)}</blockquote>
    <div class="quiz-opts" id="quizOpts">
      ${q.opts.map((o, i) => `<button class="quiz-opt" type="button" data-i="${i}">
        <span class="qo-key">${'ABCD'[i]}</span><span class="qo-txt">${esc(o.text)}</span>
      </button>`).join('')}
    </div>
    <div class="quiz-feedback" id="quizFeedback" role="status" aria-live="polite" hidden></div>
    <div class="quiz-bar">
      <button class="btn primary" id="quizNext" type="button" hidden>Next →</button>
      <a class="btn small" href="#/study">Study hub</a>
    </div>`;
}
function answerQuiz(i) {
  if (!quizState || quizState.answered) return;
  const q = quizState.qs[quizState.i];
  if (!q.opts[i]) return;
  quizState.answered = true;
  if (q.opts[i].correct) quizState.score++;
  $$('#quizOpts .quiz-opt').forEach((btn, k) => {
    btn.disabled = true;
    if (q.opts[k].correct) btn.classList.add('correct');
    else if (k === i) btn.classList.add('wrong');
  });
  const fb = $('#quizFeedback');
  if (fb) {
    fb.hidden = false;
    fb.classList.add(q.opts[i].correct ? 'ok' : 'no');
    fb.innerHTML = `<strong>${q.opts[i].correct ? 'Correct / Benar' : 'Not quite / Belum tepat'}</strong>
      <div>Answer / Jawaban: <span class="mono">WSTG-${q.correct.code}-${q.correct.num}</span> — ${esc(q.correct.test.name_en)}</div>
      <div class="fb-sum" lang="en">${rich(q.correct.test.summary.en)}</div>`;
  }
  const next = $('#quizNext'); if (next) { next.hidden = false; next.focus(); }
}
function quizNext() {
  if (!quizState) return;
  quizState.i++; quizState.answered = false;
  renderQuiz();
}
function quizResults() {
  const total = quizState.qs.length;
  const pct = total ? Math.round(quizState.score / total * 100) : 0;
  return `
    <div class="crumb"><a href="#/">Home</a> / <a href="#/study">Study</a> / Quiz</div>
    <div class="landing-hero"><h2>Quiz complete / Selesai</h2>
      <div class="sub">Score <strong>${quizState.score} / ${total}</strong> · ${pct}%</div></div>
    <div class="study-actions">
      <button class="btn primary" id="quizRestart" type="button">Retry / Ulangi</button>
      <a class="btn" href="#/cards/new">Learn new</a>
      <a class="btn" href="#/study">Study hub</a>
    </div>`;
}

/* ---- export / import ---- */
function exportProgress() {
  try {
    const payload = { app: 'wstg-bilingual', guide: 'wstg', version: 2, exported: new Date().toISOString(), store };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `wstg-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    toast('Progress exported / Progres diekspor');
  } catch (e) { toast('Export failed / Ekspor gagal'); }
}
function mergeProgress(data) {
  const s = data && data.store ? data.store : data;   // accept a full export or a bare store
  if (!s || typeof s !== 'object' || Array.isArray(s)) throw new Error('bad shape');
  store.checked   = Object.assign({}, store.checked,   s.checked   || {});
  store.bookmarks = Object.assign({}, store.bookmarks, s.bookmarks || {});
  store.testNotes = Object.assign({}, store.testNotes, s.testNotes || {});
  store.srs       = Object.assign({}, store.srs,       s.srs       || {});
  if (s.notes) store.notes = Object.assign({}, store.notes || {}, s.notes);
  if (s.theme) store.theme = s.theme;
  if (s.reg) store.reg = s.reg;
  if (s.langMode) store.langMode = s.langMode;
  saveStore(); applyTheme(); render(true);
  return true;
}
function importProgressFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try { mergeProgress(JSON.parse(reader.result)); toast('Progress imported / Progres diimpor'); }
    catch (e) { toast('Import failed — not a valid export file'); }
  };
  reader.readAsText(file);
}

/* ---------------- events ---------------- */
function onMainClick(e) {
  const modeBtn = e.target.closest('#modeSeg button');
  if (modeBtn) { store.langMode = modeBtn.dataset.m; saveStore(); render(false); refocus(`#modeSeg button[data-m="${store.langMode}"]`); return; }

  const regBtn = e.target.closest('#regSeg button');
  if (regBtn) { store.reg = regBtn.dataset.r; saveStore(); render(false); refocus(`#regSeg button[data-r="${store.reg}"]`); return; }

  if (e.target.closest('#printBtn')) { window.print(); return; }

  const tocBtn = e.target.closest('#testToc button');
  if (tocBtn) {
    const key = tocBtn.dataset.sec;
    const target = [...main.querySelectorAll('.tsection')].find(s => s.dataset.sec === key && s.offsetParent !== null);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }

  const chip = e.target.closest('#searchCats button');
  if (chip) { searchCat = chip.dataset.cat; render(false); refocus(`#searchCats button[data-cat="${searchCat}"]`); return; }

  const mark = e.target.closest('#markBtn');
  if (mark) { toggleStudied(+mark.dataset.ci, +mark.dataset.ti, '#markBtn'); return; }

  const catTog = e.target.closest('.ctc-toggle');
  if (catTog) { e.preventDefault(); toggleStudied(+catTog.dataset.ci, +catTog.dataset.ti, `.ctc-toggle[data-ci="${catTog.dataset.ci}"][data-ti="${catTog.dataset.ti}"]`); return; }

  const filter = e.target.closest('#catFilterSeg button');
  if (filter) { catFilter = filter.dataset.f; render(false); refocus(`#catFilterSeg button[data-f="${catFilter}"]`); return; }

  const markAll = e.target.closest('#markAllBtn');
  if (markAll && !markAll.disabled) {
    const ci = +markAll.dataset.ci;
    DATA[ci].tests.forEach((_, ti) => setStudied(ci, ti, true));
    saveStore(); render(false);
    toast('✓ All marked studied');
    return;
  }

  const reset = e.target.closest('#resetInline');
  if (reset) { resetProgress(); return; }

  /* study: bookmarks, flashcards, quiz, import/export */
  const bmBtn = e.target.closest('#bookmarkBtn');
  if (bmBtn) {
    const ci = +bmBtn.dataset.ci, ti = +bmBtn.dataset.ti;
    toggleBookmark(ci, ti);
    render(false);
    toast(isBookmarked(ci, ti) ? '★ Bookmarked / Ditandai' : 'Bookmark removed / Tanda dihapus');
    refocus('#bookmarkBtn');
    return;
  }
  if (e.target.closest('#flashcard') || e.target.closest('#cardFlip')) { flipCard(); return; }
  const grade = e.target.closest('#cardGrade button');
  if (grade) { gradeCurrent(grade.dataset.g); return; }
  if (e.target.closest('#cardSkip')) { skipCard(); return; }
  const opt = e.target.closest('#quizOpts .quiz-opt');
  if (opt) { answerQuiz(+opt.dataset.i); return; }
  if (e.target.closest('#quizNext')) { quizNext(); return; }
  if (e.target.closest('#deckRestart')) { cardState = null; render(true); return; }
  if (e.target.closest('#quizRestart')) { quizState = null; render(true); return; }
  if (e.target.closest('#exportBtn')) { exportProgress(); return; }
  if (e.target.closest('#importBtn')) { const f = $('#importFile'); if (f) f.click(); return; }
  if (e.target.closest('#resetStudyBtn')) { resetStudyData(); return; }

  const code = e.target.closest('code');
  if (code && code.closest('.tsection')) { copyText(code.textContent); }
}

/* autosave per-test notes */
function onMainInput(e) {
  const ta = e.target.closest('#noteInput');
  if (!ta) return;
  const status = $('#noteStatus');
  if (status) status.textContent = '…';
  clearTimeout(noteTm);
  noteTm = setTimeout(() => {
    setNote(+ta.dataset.ci, +ta.dataset.ti, ta.value);
    if (status) status.textContent = 'saved ✓';
  }, 400);
}

function applyTheme() { document.documentElement.setAttribute('data-theme', store.theme); }
function toggleTheme() { store.theme = store.theme === 'dark' ? 'light' : 'dark'; saveStore(); applyTheme(); }

/* static header controls */
navToggle.addEventListener('click', () => Sidebar.onToggle());
scrim.addEventListener('click', () => Sidebar.closeDrawer());
$('#themeBtn').addEventListener('click', toggleTheme);
$('#resetBtn').addEventListener('click', resetProgress);
searchClear.addEventListener('click', () => { searchInput.value = ''; searchCat = 'all'; updateSearchClear(); searchInput.focus(); if (parseHash().page === 'search') go('#/'); });
main.addEventListener('click', onMainClick);
main.addEventListener('input', onMainInput);
main.addEventListener('change', e => {
  if (e.target.id === 'importFile') {
    const file = e.target.files && e.target.files[0];
    if (file) importProgressFile(file);
    e.target.value = '';
  }
});

searchInput.addEventListener('input', e => {
  updateSearchClear();
  clearTimeout(searchTm);
  const q = e.target.value.trim();
  searchTm = setTimeout(() => {
    if (!q) { searchCat = 'all'; if (parseHash().page === 'search') go('#/'); }
    else go('#/search/' + encodeURIComponent(q));
  }, 160);
});

/* reading-progress bar (test pages) */
function updateReadProgress() {
  const fill = $('#readFill');
  if (!fill) return;
  const de = document.documentElement;
  const max = de.scrollHeight - de.clientHeight;
  fill.style.width = (max > 0 ? Math.min(100, Math.max(0, de.scrollTop / max * 100)) : 0) + '%';
}
window.addEventListener('scroll', updateReadProgress, { passive: true });
window.addEventListener('resize', updateReadProgress);

window.addEventListener('hashchange', () => render(true));

/* live sync across tabs (tracker or another instance of this app) */
window.addEventListener('storage', e => {
  if (e.key !== STORE_KEY) return;
  let incoming; try { incoming = JSON.parse(e.newValue || '{}'); } catch (err) { return; }
  Object.assign(store, incoming);
  applyTheme();
  render(false);
  syncHeaderHeight();
});

/* keyboard shortcuts: ←/→ page tests, / search, t theme, m mark, Esc leave search */
document.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const active = document.activeElement;
  const inInput = /^(INPUT|TEXTAREA|SELECT)$/.test((active && active.tagName) || '');
  const r = parseHash();

  if (e.key === 'Escape') {
    if (inInput && active === searchInput) searchInput.blur();
    if (r.page === 'search') { searchInput.value = ''; updateSearchClear(); go('#/'); }
    Sidebar.closeDrawer();
    return;
  }
  if (e.key === '/' && !inInput) { e.preventDefault(); searchInput.focus(); searchInput.select(); return; }
  if ((e.key === 't' || e.key === 'T') && !inInput) { toggleTheme(); return; }

  if (r.page === 'search' && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    e.preventDefault(); moveSearchFocus(e.key === 'ArrowDown' ? 1 : -1); return;
  }
  if (inInput) return;

  const ae = document.activeElement;
  const activatable = !!(ae && /^(BUTTON|A)$/.test(ae.tagName));   // let focused buttons/links handle Space/Enter

  if (r.page === 'cards') {
    if (e.key === ' ' || e.key === 'Enter') {
      if (activatable) return;
      e.preventDefault();
      if (cardState && !cardState.flipped) flipCard();
      else if (cardState && cardState.flipped) gradeCurrent('good');
      return;
    }
    if (cardState && cardState.flipped && '1234'.includes(e.key)) {
      e.preventDefault();
      gradeCurrent({ '1': 'again', '2': 'hard', '3': 'good', '4': 'easy' }[e.key]);
      return;
    }
    if (e.key === 'ArrowRight') { e.preventDefault(); skipCard(); }
    return;
  }
  if (r.page === 'quiz') {
    if (quizState && !quizState.answered && '1234'.includes(e.key)) {
      e.preventDefault();
      const i = +e.key - 1;
      if (quizState.qs[quizState.i] && quizState.qs[quizState.i].opts[i]) answerQuiz(i);
      return;
    }
    if (quizState && quizState.answered && (e.key === 'Enter' || e.key === ' ')) {
      if (activatable) return;
      e.preventDefault(); quizNext();
    }
    return;
  }

  if (r.page !== 'test') return;
  if (e.key === 'm' || e.key === 'M') {
    const f = flatAt(r.code, r.num);
    if (f) toggleStudied(f.ci, f.ti, '#markBtn');
    return;
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const f = flatAt(r.code, r.num);
    const nxt = f && FLAT[FLAT.indexOf(f) + (e.key === 'ArrowRight' ? 1 : -1)];
    if (nxt) { e.preventDefault(); go(`#/test/${nxt.code}/${nxt.num}`); }
  }
});

/* ---------------- boot ---------------- */
(async function boot() {
  try { await loadFiles(currentGuide.files); }
  catch (e) { console.error('Guide data failed to load', e); }
  buildData();
  applyTheme();
  syncHeaderHeight();
  render();
  Sidebar.apply();
})();

/* ---------------- service worker (PWA offline; http(s) only) ---------------- */
if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}
