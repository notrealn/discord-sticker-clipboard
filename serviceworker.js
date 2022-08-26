const urlsToCache = [
  new Request("/", { cache: "reload" }),
  "script.js",
  "style.css",
  "mincss.css",
  "manifest.json",
  "assets/sticker-clipboard.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("h").then((cache) => {
      return cache.addAll(urlsToCache);
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
