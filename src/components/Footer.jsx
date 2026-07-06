import { useLocation } from 'react-router';

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const base = pathname === '/' ? '' : '/';
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__brand" href={`${base}#top`} aria-label="Crafted Flows&mdash;back to top">
          <svg className="footer__mark" viewBox="0 0 120 60" fill="none" aria-hidden="true">
            <path
              d="M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z"
              stroke="currentColor"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span><b>crafted</b> flows</span>
        </a>

        <nav className="footer__links" aria-label="Footer">
          <a href="https://craftedflows.com">craftedflows.com</a>

          <div className="footer__social">
            <a
              className="footer__icon"
              href="mailto:admin@craftedflows.com"
              aria-label="Email admin@craftedflows.com"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
                <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
              </svg>
            </a>
            <a
              className="footer__icon"
              href="https://www.linkedin.com/company/craftedflowsai/"
              target="_blank"
              rel="noopener"
              aria-label="Crafted Flows on LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a
              className="footer__icon"
              href="https://www.instagram.com/crafted.flows"
              target="_blank"
              rel="noopener"
              aria-label="Crafted Flows on Instagram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </nav>

        <p className="footer__legal">© {year} Crafted Flows. Automations, done for you.</p>
      </div>
    </footer>
  );
}
