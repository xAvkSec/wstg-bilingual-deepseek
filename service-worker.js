'use strict';
/* WSTG Bilingual service worker — caches the zero-build app shell so the
   reader installs as a PWA and opens offline over http(s). */

const CACHE = 'wstg-bilingual-v5';

const PRECACHE = [
  './',
  'index.html',
  'style.css',
  'js/app.js',
  'js/wstg-versions.js',
  'manifest.webmanifest',
  'icons/icon.svg',
  'js/data-info.js',
  'js/data-conf.js',
  'js/data-idnt.js',
  'js/data-athn.js',
  'js/data-athz.js',
  'js/data-sess.js',
  'js/data-inpv.js',
  'js/data-errh.js',
  'js/data-cryp.js',
  'js/data-busl.js',
  'js/data-clnt.js',
  'js/data-apit.js', 'js/guide-apisec.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;   // never cache cross-origin

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE)
            .then(cache => cache.put(req, copy))
            .catch(() => {});                         // cache write failures are non-fatal
        }
        return res;
      }).catch(() => {
        // offline: only fall back to the reader shell for its own navigations,
        // never for the co-hosted /tracker/ app
        if (req.mode === 'navigate' && !url.pathname.includes('/tracker/')) return caches.match('index.html');
        return Response.error();
      });
    })
  );
});
