// sw.js — cache all Vidalytics assets (scripts + thumbnails)
const CACHE_NAME = "vidalytics-cache-v2";

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.hostname === "fast.vidalytics.com") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached; // cache-first
        const resp = await fetch(event.request, {
          // then network
          mode: "cors",
          credentials: "omit",
        });
        try {
          cache.put(event.request, resp.clone());
        } catch (_) {}
        return resp;
      })
    );
  }
});
