import { useState } from 'react';
import { Link } from 'react-router';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Spotlight from './Spotlight.jsx';
import Magnetic from './Magnetic.jsx';
import Book from './Book.jsx';
import { getRelated } from '../data/services.js';

const EASE = [0.22, 1, 0.36, 1];
const CAL_URL = 'https://cal.com/crafted-flows/automation-audit';

const PROCESS_ICONS = {
  audit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
      <path d="M8 11h6M11 8v6" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L4 17l3 3 4.7-4.7a4.5 4.5 0 0 0 6-6L15 12l-3-3 2.7-2.7Z" />
    </svg>
  ),
  maintain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
};

const BENEFIT_ICONS = [
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 4 7v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h16" />
      <path d="M12 4v16" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  ),
];

const processIconKey = (title) => {
  const t = title.toLowerCase();
  if (t.includes('audit')) return 'audit';
  if (t.includes('build')) return 'build';
  return 'maintain';
};

function Connector({ delay }) {
  const reduce = useReducedMotion();
  return (
    <span className="step__connector" aria-hidden="true">
      <m.span
        className="step__connector-line"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
      <m.span
        className="step__connector-head"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.45 }}
      />
    </span>
  );
}

function FaqItem({ item, isOpen, onToggle, id }) {
  const reduce = useReducedMotion();
  return (
    <li className="faq__item">
      <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit' }}>
        <button
          className="faq__question"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`svc-faq-answer-${id}`}
          id={`svc-faq-question-${id}`}
        >
          {item.q}
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            className="faq__answer-wrap"
            id={`svc-faq-answer-${id}`}
            role="region"
            aria-labelledby={`svc-faq-question-${id}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="faq__answer">{item.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * Premium shared layout for every /services/:slug page.
 * Mirrors the homepage shell: grid hero, section rhythm, spotlight cards,
 * process timeline, FAQ accordion, related links, and the Book CTA block.
 */
export default function ServiceLayout({ service }) {
  const [openFaq, setOpenFaq] = useState(0);
  const related = getRelated(service);

  return (
    <main id="top" className="svc-page">
      {/* Hero: same grid, orb, and type scale as the homepage */}
      <section className="svc-page-hero" aria-labelledby="svc-title">
        <div className="svc-page-hero__bg" aria-hidden="true">
          <div className="hero__grid" />
          <div className="hero__orb" />
        </div>

        <div className="wrap svc-page-hero__inner">
          <Reveal as="nav" className="crumbs crumbs--center" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </Reveal>

          <Reveal as="p" className="eyebrow" delay={0.04}>{service.name}</Reveal>

          <Reveal as="h1" className="svc-page-hero__title" id="svc-title" delay={0.08}>
            {service.hero.title}
          </Reveal>

          <Reveal as="p" className="svc-page-hero__sub" delay={0.12}>
            {service.hero.sub}
          </Reveal>

          <Reveal className="hero__cta" delay={0.16}>
            <Magnetic>
              <a className="btn btn--primary btn--lg" href={CAL_URL} target="_blank" rel="noopener">
                Book a free automation audit
                <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Overview */}
      <section className="section svc-page-section" aria-labelledby="svc-overview-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap">
          <div className="svc-page-section__head">
            <Reveal as="p" className="eyebrow">Overview</Reveal>
            <Reveal as="h2" className="section__title" id="svc-overview-title" delay={0.04}>
              What this service covers.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.08}>
              Built on the tools you already run. No rip-and-replace, no new software for your team to learn.
            </Reveal>
          </div>
          <div className="svc-page-prose">
            {service.overview.map((para, i) => (
              <Reveal as="p" className="lead" key={i} delay={0.1 + i * 0.05}>
                {para}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section svc-page-section" aria-labelledby="svc-benefits-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap">
          <div className="svc-page-section__head svc-page-section__head--center">
            <Reveal as="p" className="eyebrow">Benefits</Reveal>
            <Reveal as="h2" className="section__title" id="svc-benefits-title" delay={0.04}>
              Why teams hand this to us.
            </Reveal>
          </div>
          <div className="svc-page-benefits">
            {service.benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.08 + i * 0.06}>
                <Spotlight className="svc-page-benefit card">
                  <span className="svc-page-benefit__icon">{BENEFIT_ICONS[i % BENEFIT_ICONS.length]}</span>
                  <h3 className="svc-page-benefit__title">{b.title}</h3>
                  <p className="svc-page-benefit__body">{b.body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section svc-page-section" aria-labelledby="svc-process-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap">
          <div className="how__head svc-page-section__head svc-page-section__head--center">
            <Reveal as="p" className="eyebrow">The process</Reveal>
            <Reveal as="h2" className="section__title" id="svc-process-title" delay={0.04}>
              How we deliver it.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.08}>
              Three steps. One continuous flow, start to finish.
            </Reveal>
          </div>
          <ol className="steps">
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.index} delay={0.08 + i * 0.12} style={{ position: 'relative' }}>
                <Spotlight className="step card">
                  <span className="step__ghost" aria-hidden="true">{step.index}</span>
                  <span className="step__icon">{PROCESS_ICONS[processIconKey(step.title)]}</span>
                  <h3 className="step__title">
                    <span className="visually-hidden">Step {step.index}: </span>
                    {step.title}
                  </h3>
                  <p className="step__body">{step.body}</p>
                </Spotlight>
                {i < service.process.length - 1 && <Connector delay={0.35 + i * 0.2} />}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq svc-page-section" aria-labelledby="svc-faq-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap wrap--narrow">
          <Reveal as="p" className="eyebrow eyebrow--strong">Frequently asked questions</Reveal>
          <Reveal as="h2" className="section__title" id="svc-faq-title" delay={0.04}>
            {service.name}, answered.
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="faq__list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {service.faqs.map((item, i) => (
                <FaqItem
                  key={i}
                  id={i}
                  item={item}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
                />
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section className="section svc-page-section" aria-labelledby="svc-related-title">
          <div className="divider" aria-hidden="true" />
          <div className="wrap">
            <div className="svc-page-section__head svc-page-section__head--center">
              <Reveal as="p" className="eyebrow">Related services</Reveal>
              <Reveal as="h2" className="section__title" id="svc-related-title" delay={0.04}>
                Often paired with this.
              </Reveal>
            </div>
            <div className="svc-page-related">
              {related.map((rel, i) => (
                <Reveal key={rel.slug} delay={0.08 + i * 0.06}>
                  <Link className="svc-card svc-card--link card" to={`/services/${rel.slug}`}>
                    <h3 className="svc-card__title">{rel.name}</h3>
                    <p className="svc-card__body">{rel.tagline}</p>
                    <span className="svc-card__more" aria-hidden="true">
                      Explore <span className="btn__arrow">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Homepage-identical CTA */}
      <Book />
    </main>
  );
}
