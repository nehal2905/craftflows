import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { SITE } from '../data/site.js';
import { publishedProjects } from '../data/work.js';
import { trackEvent } from '../lib/analytics.js';

/* Work joins the nav only once there is published work to show. */
const LINKS = [
  publishedProjects().length > 0 && {
    to: '/work', label: 'Work', match: (p) => p.startsWith('/work'),
  },
  { to: '/video', label: 'Video', match: (p) => p === '/video' },
  { to: '/automation', label: 'Automation', match: (p) => p === '/automation' },
  { to: '/#how-we-work', label: 'Process' },
  { to: '/#questions', label: 'FAQ' },
  { to: '/blog', label: 'Blog', match: (p) => p.startsWith('/blog') },
].filter(Boolean);

/* The two ways to start. The video option becomes a booking link as soon
   as SITE.videoBookingUrl is set; until then it leads to the brief form. */
function useBookOptions(location) {
  const video = SITE.videoBookingUrl
    ? {
        label: 'Video project',
        hint: 'Book a 15-minute video call',
        href: SITE.videoBookingUrl,
        event: 'book_video_call',
      }
    : {
        label: 'Video project',
        hint: 'Tell us about your video',
        to: '/contact#brief',
        event: 'start_video_project',
      };
  return [
    { ...video, service: 'video', location },
    {
      label: 'Automation audit',
      hint: 'Book a free 15-minute call',
      href: SITE.auditUrl,
      event: 'book_automation_audit',
      service: 'automation',
      location,
    },
  ];
}

function BookOption({ option, className, onPick, children }) {
  const track = () => {
    trackEvent(option.event, { service: option.service, location: option.location });
    onPick?.();
  };
  return option.to ? (
    <Link className={className} to={option.to} onClick={track}>{children}</Link>
  ) : (
    <a className={className} href={option.href} target="_blank" rel="noopener" onClick={track}>
      {children}
    </a>
  );
}

/** "Book a call": a button that opens a two-item menu, one per service. */
function BookMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const button = useRef(null);
  const options = useBookOptions('header_menu');

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      className="bookmenu"
      ref={root}
      onBlur={(e) => {
        // close when keyboard focus leaves the menu entirely
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        className="btn btn--accent btn--sm bookmenu__btn"
        aria-expanded={open}
        aria-controls="book-menu"
        onClick={() => setOpen((v) => !v)}
      >
        Book a call
        <svg className="bookmenu__caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m1.5 3.5 3.5 3.5 3.5-3.5" />
        </svg>
      </button>

      <ul className="bookmenu__panel" id="book-menu" hidden={!open}>
        {options.map((option) => (
          <li key={option.label}>
            <BookOption option={option} className="bookmenu__item" onPick={() => setOpen(false)}>
              <b>{option.label}</b>
              <span>{option.hint}</span>
            </BookOption>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Which surface sits under the header: 'light' over a light section,
 * otherwise 'dark'. The header switches its glass to match, so it never
 * reads as a grey band across a light page. Checked on scroll (once per
 * frame), on resize, and shortly after each navigation because sections
 * below the fold load lazily.
 */
function useSurfaceTone(ref, routeKey) {
  const [tone, setTone] = useState('dark');

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const header = ref.current;
      if (!header) return;
      const y = header.getBoundingClientRect().height / 2;
      const under = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .find((el) => !header.contains(el));
      const surface = under?.closest('.section--light, .on-dark');
      setTone(surface?.classList.contains('section--light') ? 'light' : 'dark');
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    check();
    const late = setTimeout(check, 450);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(late);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ref, routeKey]);

  return tone;
}

/**
 * Full-width site header, visible throughout. Desktop: brand, centered
 * nav pill, Book a call menu. Below 960px the nav moves into a menu
 * behind the toggle button, together with both calls to action.
 */
export default function TopBar() {
  const { pathname, hash, key } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef(null);
  const header = useRef(null);
  const mobileOptions = useBookOptions('mobile_menu');
  const tone = useSurfaceTone(header, key);

  // Any navigation closes the mobile menu.
  useEffect(() => { setMenuOpen(false); }, [pathname, hash, key]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const isActive = (link) => Boolean(link.match?.(pathname));

  return (
    <header className="topbar" ref={header} data-tone={menuOpen ? 'dark' : tone}>
      <div className="wrap topbar__inner">
        <Link
          className="topbar__brand"
          to="/"
          aria-label="Crafted Flows, home"
          onClick={() => {
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg className="topbar__mark" viewBox="0 0 120 60" fill="none" aria-hidden="true">
            <path
              d="M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span><b>crafted</b> flows</span>
        </Link>

        <nav className="topbar__nav" aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link) ? 'is-active' : undefined}
              aria-current={isActive(link) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="topbar__end">
          <BookMenu />
          <button
            ref={toggle}
            type="button"
            className="navtoggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              {menuOpen ? (
                <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className="mobilenav" id="mobile-nav" hidden={!menuOpen}>
        <nav aria-label="Menu">
          <ul className="mobilenav__links">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  aria-current={isActive(link) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                aria-current={pathname === '/contact' ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="mobilenav__actions">
          <BookOption
            option={mobileOptions[0]}
            className="btn btn--primary"
            onPick={() => setMenuOpen(false)}
          >
            {SITE.videoBookingUrl ? 'Book a video call' : 'Start a video project'}
          </BookOption>
          <BookOption option={mobileOptions[1]} className="btn" onPick={() => setMenuOpen(false)}>
            Book an automation audit
          </BookOption>
        </div>
      </div>
    </header>
  );
}
