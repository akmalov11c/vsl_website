// sw.js — caches the Vidalytics loader for 1 year
const CACHE_NAME = "vidalytics-cache-v1";
const TARGET = "fast.vidalytics.com";
const FILE = "loader.min.js";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([])));
});

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (url.includes("fast.vidalytics.com")) {
    event.respondWith(
      caches.open("vidalytics-cache").then((cache) =>
        cache.match(event.request).then((resp) => {
          if (resp) return resp;
          return fetch(event.request).then((netResp) => {
            cache.put(event.request, netResp.clone());
            return netResp;
          });
        })
      )
    );
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  );
});
