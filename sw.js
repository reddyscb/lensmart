const CACHE = "murali-v3";
const ASSETS = ["./Murali.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      Promise.all(
        ASSETS.map((url) =>
          fetch(url).then((res) => { if (res.ok) return cache.put(url, res); }).catch(() => {})
        )
      )
    )
  );
  // Deliberately NOT calling self.skipWaiting() here. A freshly installed service worker
  // sits in the "waiting" state until the page explicitly tells it to take over (see the
  // "SKIP_WAITING" message below) — that's what lets the app show an "Update available —
  // tap to refresh" banner instead of silently swapping code out from under the person
  // while they might be mid-way through filling in an order or a customer.
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// The page (Murali.html) sends this once the person taps "Tap to refresh" on the update banner.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

// Network-first: always try to fetch the current file when online, so a new version (bug
// fix, new feature) is ready to be picked up on the very next check instead of being stuck
// behind a stale cached copy. Falls back to the cached copy only when offline / the network
// request fails.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && event.request.method === "GET") {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
