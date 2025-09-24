// Minimal, self-contained Service Worker (no external imports)
// Purpose: avoid evaluation errors during registration.

self.addEventListener("install", (event) => {
  // Activate immediately after installation
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of uncontrolled clients as soon as possible
  event.waitUntil(self.clients.claim());
});

// No fetch handler: let the browser handle network requests directly.

// Optional: allow page to trigger skipWaiting
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
