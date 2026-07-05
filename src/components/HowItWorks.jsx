import { motion, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Spotlight from './Spotlight.jsx';

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
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

const STEPS = [
  {
    index: '01',
    icon: 'audit',
    title: 'Audit',
    body:
      "We map the repetitive workflow costing you the most hours\u2014the one you've stopped noticing because it's just \"how things are.\"",
  },
  {
    index: '02',
    icon: 'build',
    title: 'Build',
    body:
      'We automate it end-to-end, wired into your existing stack. No rip-and-replace, no new tools for your team to learn.',
  },
  {
    index: '03',
    icon: 'maintain',
    title: 'Maintain',
    body:
      'We monitor it and fix it when something upstream changes\u2014so it just keeps running, quietly, in the background.',
  },
];

/** Animated connector — the line draws itself as the row scrolls into view. */
function Connector({ delay }) {
  const reduce = useReducedMotion();
  return (
    <span className="step__connector" aria-hidden="true">
      <motion.span
        className="step__connector-line"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay }}
      />
      <motion.span
        className="step__connector-head"
        initial={reduce ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.45 }}
      />
    </span>
  );
}

export default function HowItWorks() {
  return (
    <section className="section how" id="how" aria-labelledby="how-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <div className="how__head">
          <Reveal as="p" className="eyebrow">The process</Reveal>
          <Reveal as="h2" className="section__title" id="how-title" delay={0.04}>
            One continuous flow,<br className="br-desk" /> start to finish.
          </Reveal>
          <Reveal as="p" className="section__sub" delay={0.08}>
            Three steps. No new software to buy, no team retraining&mdash;just the busywork, gone.
          </Reveal>
        </div>

        <ol className="steps">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.index} delay={i * 0.15} style={{ position: 'relative' }}>
              <Spotlight className="step card">
                <span className="step__ghost" aria-hidden="true">{step.index}</span>
                <span className="step__icon">{ICONS[step.icon]}</span>
                <span className="step__index">Step {step.index}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </Spotlight>
              {i < STEPS.length - 1 && <Connector delay={0.35 + i * 0.2} />}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
