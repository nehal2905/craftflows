import { Link } from 'react-router';
import Reveal from './Reveal.jsx';
import { SITE, has } from '../data/site.js';

/**
 * Real trust only. Client logos, testimonials and press render when the
 * owner has filled them in (src/data/site.js) and not before. With
 * nothing filled in, this renders nothing: no empty frames, no
 * "coming soon".
 */
export function TrustStrip() {
  const logos = SITE.clientLogos.slice(0, 8);
  const quotes = SITE.testimonials;
  const press = SITE.pressOrAwards;
  if (!has(logos) && !has(quotes) && !has(press)) return null;

  return (
    <section className="section section--tight" aria-labelledby="trust-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <h2 className="visually-hidden" id="trust-title">Who we work with</h2>

        {has(logos) && (
          <ul className="logos">
            {logos.map((logo) => (
              <li key={logo.name}>
                <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        )}

        {has(quotes) && (
          <div className="quotes">
            {quotes.map((t) => (
              <Reveal as="figure" className="quote" key={t.name + t.quote.slice(0, 12)}>
                <blockquote style={{ margin: 0 }}>
                  <p>{t.quote}</p>
                </blockquote>
                <footer>
                  {[t.name, t.role, t.company].filter(Boolean).join(', ')}
                </footer>
              </Reveal>
            ))}
          </div>
        )}

        {has(press) && (
          <p className="section__sub" style={{ marginInline: 'auto', textAlign: 'center' }}>
            {press.map((item, i) => (
              <span key={item.label}>
                {i > 0 && ' · '}
                {item.href ? (
                  <a className="textlink" href={item.href} target="_blank" rel="noopener">{item.label}</a>
                ) : (
                  item.label
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}

/**
 * The guarantee, stated per service so one never implies the other.
 * The automation guarantee is live. The video guarantee appears next to
 * it once SITE.videoGuarantee is filled in.
 */
export default function Guarantee() {
  const videoGuarantee = has(SITE.videoGuarantee);

  return (
    <section className="section" id="guarantee" aria-labelledby="guarantee-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <h2 className="visually-hidden" id="guarantee-title">Our guarantee</h2>

        <div className={`pledges${videoGuarantee ? ' pledges--two' : ''}`}>
          {videoGuarantee && (
            <Reveal className="pledge">
              <p className="pledge__for">Video guarantee</p>
              <p className="pledge__text">{SITE.videoGuarantee}</p>
            </Reveal>
          )}

          <Reveal className="pledge" delay={videoGuarantee ? 0.06 : 0}>
            <svg className="pledge__seal" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <path d="M24 4.5 39 10v11.6c0 9.6-6.3 17.6-15 21.9C15.3 39.2 9 31.2 9 21.6V10l15-5.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="m17 24 5 5 9-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="pledge__for">Automation guarantee</p>
            <p className="pledge__text">
              Done for you, or <span className="pledge__mark">you don&rsquo;t pay.</span>
            </p>
            <p className="pledge__body">
              If the automation we build doesn&rsquo;t save the hours we promised,
              you don&rsquo;t pay.
            </p>
            <Link className="textlink" to="/automation#offer">
              See the automation offer <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
