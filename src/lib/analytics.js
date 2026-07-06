/**
 * Google Analytics 4 (gtag.js), production-only.
 *
 * - No-ops entirely during local development (`import.meta.env.PROD` guard),
 *   so nothing is loaded or sent while running `npm run dev`.
 * - The gtag script is injected after the window `load` event and during an
 *   idle period, so it never competes with LCP/TTI and has no Lighthouse cost.
 * - The initial page_view is sent automatically by `gtag('config', …)`.
 *   This is a single-page site without a router; if a router is ever added,
 *   call `trackPageView(path)` on route changes.
 */
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let initialized = false;

function inject() {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function whenIdle(fn) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(fn, { timeout: 4000 });
  } else {
    setTimeout(fn, 1500);
  }
}

export function initAnalytics() {
  if (initialized || !import.meta.env.PROD || !GA_ID) return;
  initialized = true;

  if (document.readyState === 'complete') {
    whenIdle(inject);
  } else {
    window.addEventListener('load', () => whenIdle(inject), { once: true });
  }
}

/** Track a custom event, e.g. trackEvent('book_audit_click'). Safe no-op in dev. */
export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/** For manual page-view tracking if client-side routing is ever introduced. */
export function trackPageView(path) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
}
