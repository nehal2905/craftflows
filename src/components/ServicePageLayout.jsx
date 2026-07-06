import { useState } from 'react';
import { Link } from 'react-router';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Spotlight from './Spotlight.jsx';
import Magnetic from './Magnetic.jsx';
import { getRelated } from '../data/services.js';

const EASE = [0.22, 1, 0.36, 1];
const CAL_URL = 'https://cal.com/crafted-flows/automation-audit';

/* Same markup + classes as the home page FAQ, kept local so the home
   component stays untouched. */
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
 * Shared shell for every /services/:slug page. Renders hero, overview,
 * benefits, process, FAQ, related services, and CTA entirely from the
 * service object in src/data/services.js.
 */
export default function ServicePageLayout({ service }) {
  const [openFaq, setOpenFaq] = useState(0);
  const related = getRelated(service);

  return (
    <main id="top">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="section svc-hero" aria-labelledby="svc-title">
        <div className="wrap wrap--narrow">
          <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.name}</span>
          </Reveal>

          <Reveal as="p" className="eyebrow" delay={0.04}>{service.name}</Reveal>
          <Reveal as="h1" className="section__title" id="svc-title" delay={0.08}>
            {service.hero.title}
          </Reveal>
          <Reveal as="p" className="section__sub" delay={0.12}>
            {service.hero.sub}
          </Reveal>

          <Reveal className="book__actions" style={{ alignItems: 'flex-start' }} delay={0.16}>
            <Magnetic>
              <a className="btn btn--primary" href={CAL_URL} target="_blank" rel="noopener">
                Book a free automation audit
                <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ── Overview ─────────────────────────────────────────── */}
      <section className="section section--tight" aria-labelledby="svc-overview-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap wrap--narrow">
          <Reveal as="p" className="eyebrow">Overview</Reveal>
          <Reveal as="h2" className="section__title" id="svc-overview-title" delay={0.04}>
            What this service covers.
          </Reveal>
          {service.overview.map((para, i) => (
            <Reveal as="p" className="lead" key={i} delay={0.08 + i * 0.04}>
              {para}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────── */}
      <section className="section section--tight" aria-labelledby="svc-benefits-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p" className="eyebrow">Benefits</Reveal>
          <Reveal as="h2" className="section__title" id="svc-benefits-title" delay={0.04}>
            Why teams hand this to us.
          </Reveal>
          <div className="svc-grid">
            {service.benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.08 + i * 0.06}>
                <Spotlight className="svc-card card">
                  <h3 className="svc-card__title">{b.title}</h3>
                  <p className="svc-card__body">{b.body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────── */}
      <section className="section section--tight" aria-labelledby="svc-process-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap">
          <Reveal as="p" className="eyebrow">The process</Reveal>
          <Reveal as="h2" className="section__title" id="svc-process-title" delay={0.04}>
            How we deliver it.
          </Reveal>
          <ol className="steps" style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.index} delay={0.08 + i * 0.12} style={{ position: 'relative' }}>
                <Spotlight className="step card">
                  <span className="step__ghost" aria-hidden="true">{step.index}</span>
                  <h3 className="step__title">
                    <span className="visually-hidden">Step {step.index}: </span>
                    {step.title}
                  </h3>
                  <p className="step__body">{step.body}</p>
                </Spotlight>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section section--tight faq" aria-labelledby="svc-faq-title">
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

      {/* ── Related services (internal links) ────────────────── */}
      {related.length > 0 && (
        <section className="section section--tight" aria-labelledby="svc-related-title">
          <div className="divider" aria-hidden="true" />
          <div className="wrap">
            <Reveal as="p" className="eyebrow">Related services</Reveal>
            <Reveal as="h2" className="section__title" id="svc-related-title" delay={0.04}>
              Often paired with this.
            </Reveal>
            <div className="svc-grid">
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="section book" aria-labelledby="svc-cta-title">
        <div className="divider" aria-hidden="true" />
        <div className="wrap wrap--narrow book__inner">
          <Reveal as="p" className="eyebrow">Free audit</Reveal>
          <Reveal as="h2" className="book__title" id="svc-cta-title" delay={0.04}>
            See what we&rsquo;d automate first.
          </Reveal>
          <Reveal as="p" className="book__sub" delay={0.08}>
            A 15-minute call. We will point at the one workflow worth automating for you,
            guaranteed to save you hours, or you do not pay.
          </Reveal>
          <Reveal className="book__actions" delay={0.14}>
            <Magnetic>
              <a className="btn btn--primary btn--lg" href={CAL_URL} target="_blank" rel="noopener">
                Book your automation audit
                <span className="btn__arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <div className="book__meta">
              <span>15 minutes</span>
              <span>No pitch deck</span>
              <span>Leave with a plan</span>
              <span>Hours-back guarantee</span>
            </div>
            <a className="book__email" href="mailto:admin@craftedflows.com">admin@craftedflows.com</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
