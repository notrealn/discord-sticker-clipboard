const urlsToCache = [
  "script.js",
  "style.css",
  "mincss.css",
  "manifest.json",
  "assets/sticker-clipboard.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("h").then((cache) => {
      return cache.addAll([
        new Request("/", { cache: "reload" }),
        ...urlsToCache,
      ]);
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
