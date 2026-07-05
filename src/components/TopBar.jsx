import Magnetic from './Magnetic.jsx';

/** Full-width site header — pinned to the top and visible throughout. */
export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap topbar__inner">
        <a className="topbar__brand" href="#top" aria-label="Crafted Flows&mdash;top of page">
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
        </a>

        <nav className="topbar__nav" aria-label="Primary">
          <a href="#problem">The Problem</a>
          <a href="#how">Process</a>
          <a href="#roi">ROI</a>
          <a href="#offer">The Offer</a>
          <a href="#faq">FAQ</a>
        </nav>

        <Magnetic strength={0.2} className="topbar__cta-wrap">
          <a className="btn btn--accent btn--sm" href="#book">
            Book audit
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
