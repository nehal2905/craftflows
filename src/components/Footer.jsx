import { useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useReducedMotion } from 'framer-motion';
import POSTS from 'virtual:blog-index';
import { COMPANY } from '../data/founders.js';
import { SITE } from '../data/site.js';
import { publishedProjects } from '../data/work.js';
import { trackEvent } from '../lib/analytics.js';

const MARK =
  'M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z';

/* The directory. Work joins once there is published portfolio to show. */
const SERVICES = [
  { to: '/video', label: 'Video promotions' },
  { to: '/automation', label: 'Automation' },
  publishedProjects().length > 0 && { to: '/work', label: 'Our work' },
  { href: SITE.auditUrl, label: 'Automation audit', event: 'book_automation_audit' },
].filter(Boolean);

const STUDIO = [
  { to: '/#how-we-work', label: 'How we work' },
  { to: '/#questions', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const SOCIAL = [
  {
    href: COMPANY.linkedin,
    label: 'Crafted Flows on LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
      </svg>
    ),
  },
  {
    href: SITE.instagram,
    label: 'Crafted Flows on Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

function DirLink({ item, location, pathname }) {
  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener"
        onClick={() => item.event && trackEvent(item.event, { service: 'automation', location })}
      >
        {item.label}
        <svg className="footer__ext" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 2.5h5.5V8M9.5 2.5 3 9" />
        </svg>
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  // Plain routes mark the page you are on, as the header nav does.
  const current = !item.to.includes('#') && pathname === item.to;
  return (
    <Link to={item.to} aria-current={current ? 'page' : undefined}>
      {item.label}
    </Link>
  );
}

/**
 * The large wordmark that closes every page. A soft light follows the
 * pointer across the letters, echoing the cursor mist in the home hero.
 * Decorative only: hidden from assistive tech, static with reduced motion.
 */
function Signature() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const move = (e) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
    el.style.setProperty('--glow', '1');
  };
  const leave = () => ref.current?.style.setProperty('--glow', '0');

  return (
    <p className="footer__signature" ref={ref} aria-hidden="true" onPointerMove={move} onPointerLeave={leave}>
      <b>crafted</b> flows
    </p>
  );
}

/** Site footer: who we are, the directory, the legal line, the signature. */
export default function Footer() {
  const year = new Date().getFullYear();
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const latest = POSTS.slice(0, 3);

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__intro">
            <Link className="footer__brand" to="/" aria-label="Crafted Flows, home">
              <svg className="footer__mark" viewBox="0 0 120 60" fill="none" aria-hidden="true">
                <path d={MARK} stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span><b>crafted</b> flows</span>
            </Link>
            <p className="footer__tagline">
              Promo films that sell and automations that save hours.
              Done for you, start to finish.
            </p>
            <div className="footer__contact">
              <a className="footer__mail" href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
                <span aria-hidden="true">→</span>
              </a>
              <ul className="footer__social" aria-label="Follow Crafted Flows">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a className="footer__icon" href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer__dir">
            <nav className="footer__col" aria-labelledby="footer-services">
              <h2 className="footer__col-title" id="footer-services">Services</h2>
              <ul>
                {SERVICES.map((item) => (
                  <li key={item.label}><DirLink item={item} location="footer" pathname={pathname} /></li>
                ))}
              </ul>
            </nav>

            <nav className="footer__col" aria-labelledby="footer-studio">
              <h2 className="footer__col-title" id="footer-studio">Studio</h2>
              <ul>
                {STUDIO.map((item) => (
                  <li key={item.label}><DirLink item={item} location="footer" pathname={pathname} /></li>
                ))}
              </ul>
            </nav>

            {latest.length > 0 && (
              <nav className="footer__col footer__col--writing" aria-labelledby="footer-writing">
                <h2 className="footer__col-title" id="footer-writing">Latest writing</h2>
                <ul>
                  {latest.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={`/blog/${p.slug}`}
                        aria-current={pathname === `/blog/${p.slug}` ? 'page' : undefined}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link className="footer__more" to="/blog">
                      All articles <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">© {year} Crafted Flows. All rights reserved.</p>
          <div className="footer__bottom-end">
            <nav className="footer__legal-links" aria-label="Legal">
              <Link to="/privacy" aria-current={pathname === '/privacy' ? 'page' : undefined}>Privacy Policy</Link>
              <Link to="/terms" aria-current={pathname === '/terms' ? 'page' : undefined}>Terms of Service</Link>
            </nav>
            <button
              type="button"
              className="footer__top-btn"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
            >
              <span className="footer__top-label" aria-hidden="true">Back to top</span>
              <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 10V2.5M2.5 5.5 6 2l3.5 3.5" />
              </svg>
            </button>
          </div>
        </div>

        <Signature />
      </div>
    </footer>
  );
}
