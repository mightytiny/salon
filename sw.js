const CACHE = 'daneys-salon-v1';
const ASSETS = [
  '/salon/',
  '/salon/index.html',
  '/salon/manifest.json',
  '/salon/Gemini_Generated_Image_bt1kjtbt1kjtbt1k.png',
  '/salon/icon-192.png',
  '/salon/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
