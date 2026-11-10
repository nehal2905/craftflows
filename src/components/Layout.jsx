import { lazy, Suspense, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import TopBar from './TopBar.jsx';
import { trackPageView } from '../lib/analytics.js';

const Footer = lazy(() => import('./Footer.jsx'));

/* The automation sections used to live on the home page. Links to those
   old anchors (bookmarks, blog posts, search results) now land on the
   same section of /automation. A URL fragment never reaches the server,
   so this redirect can only happen here, in the browser. */
const OLD_HOME_ANCHORS = new Set(['#problem', '#how', '#who', '#roi', '#offer', '#faq', '#book']);

/** Shared chrome for every route: header and footer. */
export default function Layout() {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();
  const firstRender = useRef(true);

  const movedAnchor = pathname === '/' && OLD_HOME_ANCHORS.has(hash);

  useEffect(() => {
    if (movedAnchor) navigate(`/automation${hash}`, { replace: true });
  }, [movedAnchor, hash, navigate]);

  // Page views: the first one is sent by gtag('config'); only route
  // changes need manual tracking.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    trackPageView(pathname);
  }, [pathname]);

  // Scroll: to the target when the URL has a #fragment, otherwise to the
  // top of the new page. Sections load lazily, so the target may not
  // exist yet; keep looking for a couple of seconds.
  const isFirstScroll = useRef(true);
  useEffect(() => {
    const first = isFirstScroll.current;
    isFirstScroll.current = false;
    if (movedAnchor) return;

    if (!hash) {
      if (!first) window.scrollTo(0, 0);
      return;
    }

    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    let tries = 0;
    let timer;
    const seek = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        // content above may still be settling; correct once if it moved
        timer = setTimeout(() => {
          const top = el.getBoundingClientRect().top;
          if (top < 0 || top > window.innerHeight * 0.5) el.scrollIntoView();
        }, 700);
        return;
      }
      tries += 1;
      if (tries < 40) timer = setTimeout(seek, 60);
    };
    seek();
    return () => clearTimeout(timer);
  }, [pathname, hash, key, movedAnchor]);

  return (
    <>
      <TopBar />

      {!movedAnchor && <Outlet />}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
