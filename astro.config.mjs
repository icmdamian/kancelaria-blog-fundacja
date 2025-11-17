// @ts-check
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import removeHtmlComments from "./removeHtmlComments.mjs";

// https://astro.build/config
export default defineConfig({
  vite: {
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

  integrations: [
    sentry({
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    removeHtmlComments(),
    react(),
  ],
});
