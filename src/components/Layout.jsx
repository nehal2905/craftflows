import { lazy, Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
import ScrollProgress from './ScrollProgress.jsx';
import TopBar from './TopBar.jsx';
import { trackPageView } from '../lib/analytics.js';

const Footer = lazy(() => import('./Footer.jsx'));

/** Shared chrome for every route: grain, scroll progress, header, footer. */
export default function Layout() {
  const { pathname } = useLocation();
  const firstRender = useRef(true);

  useEffect(() => {
    // The initial page_view is sent by gtag('config'); only route
    // changes need manual tracking. Also reset scroll between pages.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    trackPageView(pathname);
  }, [pathname]);

  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <ScrollProgress />
      <TopBar />

      <Outlet />

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
