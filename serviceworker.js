const repoName = "discord-sticker-clipboard"

const urlsToCache = [
  "/",
  "/script.js",
  "/style.css",
  "/mincss.css",
  "/manifest.json",
  "/assets/sticker-clipboard.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("h").then((cache) => {
      return cache.addAll(urlsToCache.map((url) => repoName + url));
    })
  );

  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
