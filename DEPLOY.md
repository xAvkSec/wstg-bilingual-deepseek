# Deploy to GitHub Pages

This repo is a zero-build static site. `.github/workflows/pages.yml` assembles a clean
`_site/` (reader at `/`, tracker at `/tracker/`) and publishes it with GitHub Pages.

Because the reader and the tracker share `localStorage` (the "studied" sync), they must be
served from the **same origin** — which is why the tracker ships as `/tracker/`.

## One-time setup (in your GitHub account)

```bash
cd wstg-bilingual-deepseek          # this folder
git init
git branch -M main
git add -A
git commit -m "WSTG bilingual reader + PWA + tracker"
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The included workflow runs on every push to `main` and publishes to:

```
https://<USER>.github.io/<REPO>/          ← reader
https://<USER>.github.io/<REPO>/tracker/  ← tracker (same origin → sync works)
```

If the repo is `<USER>.github.io`, the site is served at `https://<USER>.github.io/` (root) —
also fine.

## Deploy from a branch instead (no Actions)

1. Push the repo.
2. **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
3. This serves the repo root directly. That works too, but it also exposes the dev files
   (`tests/`, `tools/`, `package.json`). The Actions path keeps the artifact clean.

## Re-deploying after a change

- Just push to `main` — the workflow rebuilds and redeploys.
- **Bump the service worker cache** in `service-worker.js` (`const CACHE = 'wstg-bilingual-vN'`)
  whenever the app shell changes, otherwise returning visitors keep the old cached version.
- Asset URLs carry a version query (`style.css?v=7`, `js/app.js?v=7`) — bump when you want a
  hard refresh of the CSS/JS.

## Custom domain (optional)

**Settings → Pages → Custom domain**, add a `CNAME` file with your domain, and point a
`CNAME`/`ALIAS` DNS record at `<USER>.github.io`. HTTPS is provisioned automatically.

## Local preview of what gets published

```bash
npm run build:site   # assembles ./_site exactly like the workflow
npm run serve        # http://127.0.0.1:8899  (reader at /, tracker at /tracker/)
```

Notes
- The service worker only registers over `http(s)`, so a local `file://` open still works.
- PWA install/offline requires HTTPS — GitHub Pages provides it.
