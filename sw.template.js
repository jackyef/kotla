const CACHE_NAME = 'kotla-__BUILD_ID__';

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
];

// Install: precache shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Skip API routes — they must always hit the server
  if (url.pathname.startsWith('/api/')) return;

  // Next.js static assets & images: cache-first (immutable, hashed filenames)
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/provinces/') ||
    url.pathname.match(/\.(png|ico|svg|jpg|jpeg|webp|woff2?)$/)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then(
          (cached) =>
            cached ||
            fetch(request).then((response) => {
              cache.put(request, response.clone());
              return response;
            })
        )
      )
    );
    return;
  }

  // Pages & other assets: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached); // offline fallback to cache

        return cached || fetchPromise;
      })
    )
  );
});
