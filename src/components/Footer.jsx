export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <a className="footer__brand" href="#top" aria-label="Crafted Flows&mdash;back to top">
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
          <a href="mailto:hello@craftedflows.com">hello@craftedflows.com</a>
          <a href="https://www.linkedin.com/company/craftedflows" target="_blank" rel="noopener">
            LinkedIn
          </a>
        </nav>
        <p className="footer__legal">© {year} Crafted Flows. Automations, done for you.</p>
      </div>
    </footer>
  );
}
