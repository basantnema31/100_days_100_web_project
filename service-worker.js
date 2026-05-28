const CACHE_NAME = '100-days-web-projects-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(error => {
        console.error('Failed to add to cache:', error);
      });
    }).catch(error => {
      console.error('Failed to open cache:', error);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(error => {
        console.error('Failed to fetch:', error);
      });
    }).catch(error => {
      console.error('Cache match failed:', error);
      return fetch(event.request).catch(fetchError => {
        console.error('Fallback fetch also failed:', fetchError);
      });
    })
  );
});