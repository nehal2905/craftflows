import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import InfinityMark from './InfinityMark.jsx';
import Magnetic from './Magnetic.jsx';
import ToolOrbit from './ToolOrbit.jsx';
import { CursorMist, InteractiveOrb } from './HeroBackdrop.jsx';
import { AuditCta } from './Cta.jsx';

const EASE = [0.22, 1, 0.36, 1];

const TITLE_LINES = [
  ['Stop', 'burning', 'business', 'hours'],
  ['on', 'unbillable', { text: 'busywork.', em: true }],
];

const TOOLS = [
  'Slack', 'Notion', 'HubSpot', 'Airtable', 'Google Sheets',
  'Zapier', 'Make', 'Asana', 'ClickUp', 'Stripe',
];

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Gentle parallax: content drifts up slightly as you scroll away.
  // No opacity fade - it dimmed the integration cloud while it was still
  // in view (the hero is taller than the viewport).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <m.div className="hero__bg" style={{ y: bgY }} aria-hidden="true">
        <div className="hero__grid" />
        <InteractiveOrb reduce={reduce} />
        <CursorMist reduce={reduce} />
      </m.div>

      <m.div className="hero__inner" style={{ y: contentY }}>
        <m.div
          className="hero__lockup"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <InfinityMark />
          <p className="wordmark"><b>crafted</b> flows</p>
        </m.div>

        <m.p
          className="eyebrow hero__badge"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          Done-for-you automation studio
        </m.p>

        {/*
          LCP-critical content: the title and subtitle render statically so
          they paint on the very first frame - no opacity/transform entrance.
          Word spacing stays deterministic: each word is an inline-block with
          a fixed 0.24em right margin, no whitespace characters injected.
        */}
        <h1
          className="hero__title"
          id="hero-title"
          aria-label="Stop burning business hours on unbillable busywork."
        >
          {TITLE_LINES.map((line, li) => (
            <span className="hero__line" key={li} aria-hidden="true">
              {line.map((word, wi) => {
                const w = typeof word === 'string' ? { text: word } : word;
                return (
                  <span key={wi} className="word">
                    {w.em ? <em>{w.text}</em> : w.text}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p className="hero__sub">
          We build the automations that run your client reporting, onboarding,
          and lead routing, inside the tools you already use. <strong>Done for you, or you
          don&rsquo;t pay.</strong>
        </p>

        <m.div
          className="hero__cta"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.15 }}
        >
          <Magnetic>
            <AuditCta location="automation_hero" className="btn btn--primary btn--lg">
              Book a 15-min automation audit
            </AuditCta>
          </Magnetic>
          <Magnetic strength={0.15}>
            <a className="btn btn--lg" href="#how">How it works</a>
          </Magnetic>
        </m.div>

        <m.div
          className="hero__proof"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
        >
          <span className="hero__proof-label">Wired into the stack you already run</span>

          {/* Desktop: circular orbit. Mobile: compact marquee (CSS toggles). */}
          <ToolOrbit />

          <div className="marquee">
            <div className="marquee__track">
              {[...TOOLS, ...TOOLS].map((tool, i) => (
                <span
                  className="marquee__item"
                  key={i}
                  aria-hidden={i >= TOOLS.length ? true : undefined}
                >
                  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" stroke="currentColor" />
                    <circle cx="8" cy="8" r="2.5" fill="currentColor" />
                  </svg>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </m.div>
      </m.div>
    </section>
  );
}
