// Define the cache name
const CACHE_NAME = 'theme-color-cache-v1';
const urlsToCache = [
  '/',
  '/Task2.html',
];

// Install the service worker and cache the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch and serve cached resources
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached response or fetch from network if not cached
        return cachedResponse || fetch(event.request);
      })
  );
});
