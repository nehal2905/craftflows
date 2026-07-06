import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import blogPlugin from './plugins/blog.js';

/**
 * Inlines the emitted CSS bundle directly into index.html.
 * The stylesheet is small (~8KB gzipped), so shipping it inside the HTML
 * removes a render-blocking request from the critical path — the browser
 * can style and paint the hero with zero extra round trips.
 */
function inlineCss() {
  return {
    name: 'inline-css',
    apply: 'build',
    enforce: 'post',
    generateBundle(_, bundle) {
      const html = bundle['index.html'];
      if (!html) return;
      for (const key of Object.keys(bundle)) {
        if (!key.endsWith('.css')) continue;
        const css = bundle[key];
        const linkTag = new RegExp(
          `<link[^>]*href="[^"]*${css.fileName.replace(/([.*+?^${}()|[\]\\/])/g, '\\$1')}"[^>]*>`
        );
        if (linkTag.test(html.source)) {
          html.source = html.source.replace(linkTag, `<style>${css.source}</style>`);
          delete bundle[key];
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [blogPlugin(), react(), inlineCss()],
  build: {
    // Every production visitor runs a modern browser (the site already
    // requires ES modules); es2022 skips legacy transpilation helpers,
    // shipping slightly less JS to parse.
    target: 'es2022',
    // No source maps in production: smaller deploy, nothing extra to fetch.
    sourcemap: false,
    // Stable vendor chunks: app-code changes don't invalidate the
    // (much larger) React/Framer Motion chunks in visitors' caches.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
