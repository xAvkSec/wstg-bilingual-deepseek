import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // clear storage before the app boots on every full navigation (no reload needed)
  await page.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto('/index.html');
});

test('home lists 12 categories, 115 tests and a study entry', async ({ page }) => {
  await page.goto('/index.html#/');
  await expect(page.locator('.landing-cat')).toHaveCount(12);
  await expect(page.locator('.nav-tests li')).toHaveCount(115);
  await expect(page.locator('.side-study')).toBeVisible();
});

test('deep link renders the bilingual test page', async ({ page }) => {
  await page.goto('/index.html#/test/INPV/05');
  await expect(page.locator('.test-id-chip')).toContainText('WSTG-INPV-05');
  await expect(page.locator('.lang-col.en .lang-title')).toContainText('SQL Injection');
  await expect(page.locator('.lang-col.id')).toBeVisible();
});

test('single-language mode collapses to one full-width column', async ({ page }) => {
  await page.goto('/index.html#/test/INPV/05');
  await page.click('#modeSeg button[data-m="id"]');
  await expect(page.locator('.bilingual')).toHaveClass(/mode-id/);
  await expect(page.locator('.lang-col.en')).toBeHidden();
  const cols = await page.locator('.bilingual').evaluate(el => getComputedStyle(el).gridTemplateColumns);
  expect(cols.trim().split(/\s+/)).toHaveLength(1);
});

test('bookmark and per-test note persist to the shared store', async ({ page }) => {
  await page.goto('/index.html#/test/ATHZ/01');
  await page.click('#bookmarkBtn');
  await expect(page.locator('#bookmarkBtn')).toHaveClass(/on/);
  await page.fill('#noteInput', 'Bypass via X-Forwarded-For');
  await expect(page.locator('#noteStatus')).toHaveText(/saved/, { timeout: 4000 });
  const store = await page.evaluate(() => JSON.parse(localStorage.getItem('wstg-tracker-v1')));
  expect(store.bookmarks['4-0']).toBe(true);
  expect(store.testNotes['4-0']).toBe('Bypass via X-Forwarded-For');
});

test('sidebar filter narrows and restores the tree', async ({ page }) => {
  await page.goto('/index.html#/');
  await page.fill('#sideFilter', 'forgery');
  const narrowed = await page.locator('#sideList .nav-cat').count();
  expect(narrowed).toBeGreaterThan(0);
  expect(narrowed).toBeLessThan(12);
  await expect(page.locator('#sideList a[href="#/test/SESS/05"]')).toHaveCount(1);
  await page.click('#sideFilterClear');
  await expect(page.locator('#sideList .nav-cat')).toHaveCount(12);
});

test('flashcard flips and grading creates a spaced-repetition entry', async ({ page }) => {
  await page.goto('/index.html#/cards/new');
  await expect(page.locator('#flashcard')).toBeVisible();
  await expect(page.locator('#cardGrade')).toBeHidden();
  await page.click('#cardFlip');
  await expect(page.locator('#cardGrade')).toBeVisible();
  await page.click('#cardGrade button[data-g="good"]');
  const srs = await page.evaluate(() => JSON.parse(localStorage.getItem('wstg-tracker-v1')).srs);
  expect(Object.keys(srs)).toHaveLength(1);
  expect(Object.values(srs)[0].b).toBe(1);
});

test('quiz answers a question and advances', async ({ page }) => {
  await page.goto('/index.html#/quiz');
  await expect(page.locator('#quizOpts .quiz-opt')).toHaveCount(4);
  await page.locator('#quizOpts .quiz-opt').first().click();
  await expect(page.locator('#quizFeedback')).toBeVisible();
  await expect(page.locator('#quizNext')).toBeVisible();
  const before = await page.locator('.quiz-top').textContent();
  await page.click('#quizNext');
  await expect(page.locator('.quiz-top')).not.toHaveText(before);
});

test('export downloads a JSON snapshot and import merges it back', async ({ page }) => {
  await page.goto('/index.html#/test/ATHZ/01');
  await page.click('#bookmarkBtn');
  await page.goto('/index.html#/study');

  const [download] = await Promise.all([page.waitForEvent('download'), page.click('#exportBtn')]);
  expect(download.suggestedFilename()).toMatch(/^wstg-progress-\d{4}-\d{2}-\d{2}\.json$/);

  await page.setInputFiles('#importFile', {
    name: 'progress.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ store: { checked: { '0-0': true }, bookmarks: { '3-2': true } } })),
  });
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('wstg-tracker-v1')).checked['0-0'])).toBe(true);
  const store = await page.evaluate(() => JSON.parse(localStorage.getItem('wstg-tracker-v1')));
  expect(store.bookmarks['3-2']).toBe(true);
  expect(store.bookmarks['4-0']).toBe(true); // pre-existing data preserved
});

test('no horizontal scroll on small screens across key pages', async ({ page }) => {
  await page.goto('/index.html');
  for (const width of [320, 360, 414]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of ['/', '/cat/INPV', '/cat/CLNT', '/study', '/test/INPV/05']) {
      await page.evaluate(r => { location.hash = '#' + r; }, route);   // same-document: set the hash directly
      await page.waitForTimeout(150);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, `${route} @ ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});

test('mobile drawer opens below the header and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 780 });
  await page.goto('/index.html#/');
  await page.click('#navToggle');
  await expect(page.locator('body')).toHaveClass(/nav-open/);
  await expect(page.locator('#sideFilter')).toBeFocused(); // focus moved into the drawer
  await page.keyboard.press('Escape');
  await expect(page.locator('body')).not.toHaveClass(/nav-open/);
});
