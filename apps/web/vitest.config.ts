// Force production mode for transforms so React's dev-only jsx runtime
// (react/jsx-dev-runtime) is not injected by the JSX transform. This
// prevents tooling from trying to import the dev runtime which can
// be subject to export resolution differences during tests.
if (typeof process.env.NODE_ENV === "undefined") {
  // @ts-expect-error - intentionally set for test transforms
  process.env.NODE_ENV = "production";
}

import react from "@vitejs/plugin-react";
import { createRequire } from "module";
import { defineConfig } from "vitest/config";

const require = createRequire(import.meta.url);
const reactEntry = require.resolve("react");
const reactDomEntry = require.resolve("react-dom");
const reactJsxRuntime = require.resolve("react/jsx-runtime");
// Map the dev runtime to the standard jsx-runtime file. Some tooling (Vitest/Vite)
// may try to import the dev runtime during transforms; forcing both imports to
// the same file avoids ERR_MODULE_NOT_FOUND caused by conditional package
// export resolution differences in some environments.
const reactJsxDevRuntime = reactJsxRuntime;

// Plugin to pre-resolve the React JSX runtime imports early in the pipeline.
const resolveReactJsxRuntimePlugin = {
  name: "resolve-react-jsx-runtime",
  enforce: "pre" as const,
  // Provide a virtual module for the dev runtime which re-exports the
  // stable jsx-runtime. This avoids depending on package export resolution
  // differences and guarantees the module exists during transforms.
  resolveId(source: string) {
    if (source === "react/jsx-dev-runtime") return "\0:react-jsx-dev-runtime";
    if (source === "react/jsx-runtime") return reactJsxRuntime;
    return null;
  },
  load(id: string) {
    if (id === "\0:react-jsx-dev-runtime") {
      // Re-export everything from the standard jsx-runtime package entry.
      return `export * from 'react/jsx-runtime';`;
    }
    return null;
  },
};

export default defineConfig({
  // Ensure code transforms (including JSX) see NODE_ENV=production so
  // the automatic JSX transform won't inject the dev runtime import.
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), resolveReactJsxRuntimePlugin],
  resolve: {
    // Force exact entry files for react and react-dom so Vite uses the same copy everywhere
    alias: [
      { find: "react", replacement: reactEntry },
      { find: "react-dom", replacement: reactDomEntry },
      { find: "react/jsx-runtime", replacement: reactJsxRuntime },
      // Redirect dev-runtime imports to the resolved jsx-runtime entry so
      // both IDs resolve to the same concrete file during transforms.
      { find: "react/jsx-dev-runtime", replacement: reactJsxRuntime },
    ],
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  // Ensure Vite doesn't treat the jsx runtimes as external during SSR so
  // node-based transforms (Vitest) can resolve them.
  ssr: {
    noExternal: ["react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  test: {
    // Run tests in a Node environment (no jsdom/happy-dom)
    environment: "node",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    // Ensure TSX/JSX files are transformed using Vite's web transform pipeline so
    // the automatic JSX runtime imports (react/jsx-runtime, react/jsx-dev-runtime)
    // are correctly resolved.
    testTransformMode: {
      web: [".tsx", ".jsx", ".ts", ".js"],
    },
    // Ensure vite-node and Vite pre-bundling inline these deps during transform so we don't end up with multiple React copies
    deps: {
      // Note: `deps.inline` is deprecated for direct vite-node usage, but Vitest still supports it for some runtimes — keep both keys for compatibility.
      inline: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@testing-library/react",
      ],
    },
    server: {
      deps: {
        inline: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      },
    },
  },
});
