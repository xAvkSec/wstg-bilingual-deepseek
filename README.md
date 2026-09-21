# WSTG Bilingual — Panduan Pengujian Keamanan Web

A bilingual (English ↔ Bahasa Indonesia) web version of the **OWASP Web Security Testing Guide** — condensed learning adaptation.

## What this is

All **12 categories, 115 tests** of the WSTG (latest development version) rendered as a modern, minimalist web app with EN/ID side-by-side columns — built for learning, not for certification-reference fidelity.

## Open it

Double-click `index.html`. No server, no install, no build step — works offline from `file://`.

## Features

- **Side-by-side bilingual view** — English left, Indonesian right (desktop); toggle EN / EN+ID / ID (mobile)
- **Three Indonesian registers**, switchable per session:
  - **Teknis** — formal, keeps English security terms ("Injeksi SQL (SQL Injection)") — report-ready vocabulary
  - **Baku** — fully formal Bahasa Indonesia, English only parenthesized
  - **Sederhana** — plain tutor voice, explanations like a friend teaching you
- **Per-test content**: Summary / Ringkasan, How to Test / Cara Menguji (real commands & payloads), Tools / Alat, Remediation / Perbaikan — every part in all three ID registers
- **Mark-as-studied** with sync to the [WSTG Tracker](../wstg-tracker/) via shared `localStorage` — check a test here, it ticks over there, same checkbox keys
- **Cross-tab live sync (bidirectional)** — open both apps (or two tabs) and checks/theme update in real time via the `storage` event, in either direction
- **Continue where you left off** — Home shows overall progress and a one-click resume to the last test you opened (or the next unstudied one)
- **Category pages** with a progress bar, per-test check toggles, `All / To study / Studied` filter, and *Mark all studied*
- **Reset progress** from the header (or the Home panel) — clears the shared store so it also resets the tracker
- **Hash-router SPA** — `#/test/ATHZ/04` deep links, prev/next paging through all 115 tests in order
- **Search** across names, summaries, how-to steps, remediation and tools — in **all** language registers at once. Multi-word AND matching, a **fuzzy fallback** for typos, **filter chips per category**, highlighted snippets pulled from the matching register, and `↑`/`↓` result navigation
- **Per-test navigation & print** — a section **TOC** (Summary / How to Test / Tools / Remediation) that follows the active language, a **reading-progress bar** in the sticky controls, and a **print/PDF stylesheet** (+ `⎙ Print`) that strips the chrome and prints just the guide content
- **Installable & offline (PWA)** — `manifest.webmanifest` + a cache-first **service worker** precache the whole app shell, so it installs to the home screen and opens with no network (over http; `file://` still works without it)
- **Fast first paint** — the ~540 KB of test content is **lazy-loaded** after paint instead of blocking the initial render
- **Multi-guide** — a guide registry + sidebar **guide switcher**. Ships with **OWASP WSTG** and **OWASP API Security Top 10 (2023)**; progress/notes/bookmarks/review are scoped per guide (WSTG keeps the shared `ci-ti` keys so the tracker still syncs; other guides are namespaced `<id>:ci-ti`). Add a guide by registering it in `GUIDES` (`js/app.js`) and dropping in a `js/guide-*.js` data file
- **Study mode** — turn reading into practice:
  - **Per-test notes** (autosaved) and **bookmarks** (☆ on any test, ★ markers in the sidebar/cards)
  - **Spaced-repetition flashcards** — flip a card, grade *Again / Hard / Good / Easy*, 7 review boxes (10 min → 60 d); `Space` to flip, `1–4` to grade, `→` to skip
  - **Quiz** — 10 randomized questions ("which test covers this summary/remediation?"), keyboard answerable, with explanations and a final score
  - **Study hub** (`#/study`) with due/new/in-rotation counts, plus all bookmarked tests
  - **JSON export / import** for backup and device transfer (merges with the shared store)
  - Notes, bookmarks and the review schedule live in the same `localStorage` store as the tracker
- **Click-to-copy** any inline command (`curl …`, `ffuf …`)
- **Responsive sidebar, three tiers** — one component adapts to the viewport:
  - **Desktop (≥1100px)** — full 250px column
  - **Tablet / small desktop (768–1099px)** — auto-collapses to a **62px icon rail** (category codes + mini progress bars, hover for the name) so content isn't squeezed; your manual expand/collapse choice is remembered
  - **Mobile (≤767px)** — **off-canvas drawer** under the header, so the ☰ toggle stays reachable
- **Smart contents** — sticky header with overall %, a **filter box** to narrow the tree by test name/code (categories auto-expand on a match), and per-category **disclosure toggles** so several sections can stay open; current category and active test auto-expand/scroll into view
- **Accessible drawer** — scrim, body scroll-lock, `inert` + `visibility` when closed (off-screen links stay out of the tab order), focus trap while open, focus returns to the toggle on close, closes via ☰/✕/scrim/`Esc` or by picking a test
- **Dark mode** that follows `prefers-color-scheme` until you flip it manually; global progress bar under the header, sticky language/register controls on test pages; honors `prefers-reduced-motion`
- **Keyboard shortcuts** — `←` / `→` page tests · `/` focus search · `t` theme · `m` mark studied · `Esc` leave search
- Accessibility — skip link, labelled search, `lang` attributes on both columns, `aria-current`/`aria-pressed`, live-region toast
- Modern minimalist design — emerald accent, monospace IDs, tinted ID column

## Structure

```
wstg-bilingual-deepseek/
├── index.html      ← open this
├── style.css       ← all styling
├── manifest.webmanifest     ← PWA
├── service-worker.js        ← offline cache
├── icons/icon.svg
├── package.json        ← dev-only tooling (the app needs none of it)
├── playwright.config.js
├── tools/validate-data.mjs   ← data schema / register check
├── tests/                    ← static server + Playwright e2e + unit tests
└── js/
    ├── app.js      ← router, guides, renderer, search, study (SRS/quiz), register logic
    ├── guide-apisec.js   ← second guide: OWASP API Security Top 10
    ├── data-info.js   (10 tests)
    ├── data-conf.js   (14)
    ├── data-idnt.js   (5)
    ├── data-athn.js   (11)
    ├── data-athz.js   (5)
    ├── data-sess.js   (11)
    ├── data-inpv.js   (23)
    ├── data-errh.js   (2)
    ├── data-cryp.js   (4)
    ├── data-busl.js   (10)
    ├── data-clnt.js   (15)
    └── data-apit.js   (5)
```

## Data shape

Each test object:

```js
{
  name_en: 'Testing for Insecure Direct Object References',
  name_id: { t: '…', b: '…', s: '…' },
  summary: { en: '…', t: '…', b: '…', s: '…' },
  howto: { en: [...steps], t: [...], b: [...], s: [...] },  // real commands in backticks
  tools: ['Burp Suite', 'curl'],
  remediation: { en: '…', t: '…', b: '…', s: '…' }
}
```

## Sync with the tracker

Both apps read/write `localStorage['wstg-tracker-v1']` with keys `${categoryIndex}-${testIndex}`. Category order and test order were verified aligned (115/115 positional match) — marking a test in either app updates both.

Note: `file://` cross-app sync works out of the box in Chromium (single `file://` origin). Firefox scopes `file://` storage more narrowly — if checks don't carry over, serve both folders from one local server (`python3 -m http.server`).

## Dev tooling (optional)

Optional and dev-only — the app is zero-build and needs none of it. Tests use the system Chrome (`channel: 'chrome'`), so no browser download is required.

```bash
npm install
npm run validate    # data schema, counts, en/t/b/s register parity
npm run test:unit   # Node unit tests (data + tracker alignment)
npm run test:e2e    # Playwright e2e for the key flows
npm test            # validate + unit + e2e
npm run serve       # static server on :8899 (for manual cross-app sync)
```

CI: `.github/workflows/ci.yml` runs `npm test` on push/PR (installs the Chrome channel for Playwright).

## Attribution

Condensed adaptation of the [OWASP Web Security Testing Guide](https://owasp.github.io/www-project-web-security-testing-guide/latest/), licensed CC BY-SA 4.0. This project is a learning aid; the official guide remains the authoritative reference.

Built with x 💛
