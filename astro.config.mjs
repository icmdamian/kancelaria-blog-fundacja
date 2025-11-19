// @ts-check
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import removeHtmlComments from "./removeHtmlComments.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
    ssr: {
      external: [
        "node:diagnostics_channel",
        "diagnostics_channel",
        "node:fs",
        "fs",
        "node:readline",
        "readline",
        "node:path",
        "path",
        "node:util",
        "util",
        "node:module",
        "module",
        "node:os",
        "os",
        "node:worker_threads",
        "worker_threads",
        "node:http",
        "http",
        "node:https",
        "https",
        "node:stream",
        "stream",
        "node:zlib",
        "zlib",
        "node:url",
        "url",
        "node:events",
        "events",
        "node:inspector",
        "inspector",
        "node:child_process",
        "child_process",
        "node:net",
        "net",
        "node:tls",
        "tls",
        "node:async_hooks",
        "async_hooks",
      ],
    },
    plugins: [tailwindcss()],
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false, // Keep console.log for debugging
          drop_debugger: true,
          pure_funcs: [], // Don't remove any functions
          keep_fargs: true, // Keep unused function arguments
          keep_infinity: true, // Keep Infinity
        },
        mangle: {
          keep_fnames: true, // Preserve function names
        },
        format: {
          comments: false,
          semicolons: true, // Always use semicolons
        },
      },
    },
  },

  build: {
    inlineStylesheets: "auto",
  },

  compressHTML: true,
  output: "server",

  integrations: [
    sentry({
      enabled: process.env.NODE_ENV === 'production',
      telemetry: false,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    removeHtmlComments(),
    react(),
  ],

  adapter: cloudflare(),
});