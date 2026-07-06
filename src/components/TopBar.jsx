import { useEffect, useState } from 'react';
import Magnetic from './Magnetic.jsx';

const LINKS = [
  { id: 'top', label: 'Home' },
  { id: 'problem', label: 'The Problem' },
  { id: 'how', label: 'Process' },
  { id: 'roi', label: 'ROI' },
  { id: 'offer', label: 'The Offer' },
  { id: 'faq', label: 'FAQ' },
];

/**
 * Full-width site header, visible throughout. The centered nav pill
 * tracks scroll position: whichever section is currently on screen
 * gets the filled highlight.
 */
export default function TopBar() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = 'top';
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'is-active' : undefined}
              aria-current={active === id ? 'true' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <Magnetic strength={0.2} className="topbar__cta-wrap">
          <a
            className="btn btn--accent btn--sm"
            href="https://cal.com/crafted-flows/automation-audit"
            target="_blank"
            rel="noopener"
          >
            Book audit
            <span className="btn__arrow" aria-hidden="true">→</span>
          </a>
        </Magnetic>
      </div>
    </header>
  );
}
