/* Smart Postcard Development album: network-only service worker.
   Keeps the accepted 2026-09-30 index.html untouched. */
const LEGACY_PREFIX = 'smart-postcard-album-pwa-';
self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(LEGACY_PREFIX)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  if (new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request, {cache: 'no-store'}));
});
