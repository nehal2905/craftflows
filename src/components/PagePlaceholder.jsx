import { Link } from 'react-router';
import Reveal from './Reveal.jsx';

/**
 * Minimal, on-brand scaffold for routes that don't have real content yet.
 * Reuses the site's existing section styles so nothing new enters the CSS.
 * Pair with <Seo noindex /> in the page component.
 */
export default function PagePlaceholder({ eyebrow, title, children }) {
  return (
    <main id="top">
      <section
        className="section"
        style={{ minHeight: '68vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="wrap wrap--narrow">
          <Reveal as="p" className="eyebrow">
            {eyebrow}
          </Reveal>
          <Reveal as="h1" className="section__title" delay={0.06}>
            {title}
          </Reveal>
          <Reveal as="p" className="section__sub" delay={0.12}>
            {children}
          </Reveal>
          <Reveal delay={0.18}>
            <p style={{ marginTop: '2rem' }}>
              <Link className="btn btn--primary" to="/">
                Back to home
                <span className="btn__arrow" aria-hidden="true">→</span>
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
