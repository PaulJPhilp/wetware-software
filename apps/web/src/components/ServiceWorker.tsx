"use client";

import { useEffect } from "react";

export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Preflight check: ensure sw.js exists and is served as JavaScript
        fetch("/sw.js", { method: "HEAD" })
          .then((res) => {
            const ct = res.headers.get("content-type") || "";
            const isJs = ct.includes("javascript") || ct.includes("ecmascript");
            if (res.ok && isJs) {
              return navigator.serviceWorker.register("/sw.js");
            }
            throw new Error(`Unexpected SW content-type: ${ct || "<none>"}`);
          })
          .then((registration) => {
            console.log("SW registered:", registration);
          })
          .catch((err) => {
            console.warn("SW registration skipped:", err);
          });
      });
    }
  }, []);

  return null;
}
