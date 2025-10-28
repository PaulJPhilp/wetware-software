import { cleanup } from "@testing-library/react";
import { parseHTML } from "linkedom";
import { afterEach } from "vitest";

// Create a minimal global DOM for tests that need document/window
const { window } = parseHTML("<!doctype html><html><body></body></html>");
// set on both global and globalThis so different modules can access it
(global as any).window = window as any;
(global as any).document = window.document as any;
(globalThis as any).window = window as any;
(globalThis as any).document = window.document as any;

// Debug: confirm setup executed
// eslint-disable-next-line no-console
console.log("[test setup] linkedom DOM initialized");

// Cleanup after each test
afterEach(() => {
  cleanup();
  // clear document body between tests
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
});
