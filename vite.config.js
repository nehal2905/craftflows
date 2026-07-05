import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
  plugins: [react(), inlineCss()],
  build: {
    // Stable vendor chunks: app-code changes don't invalidate the
    // (much larger) React/Framer Motion chunks in visitors' caches.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
