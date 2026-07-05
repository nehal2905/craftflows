import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import InfinityMark from './InfinityMark.jsx';
import Magnetic from './Magnetic.jsx';
import ToolOrbit from './ToolOrbit.jsx';

const EASE = [0.22, 1, 0.36, 1];

const TITLE_LINES = [
  ['Stop', 'burning', 'agency', 'hours'],
  ['on', 'unbillable', { text: 'busywork.', em: true }],
];

const TOOLS = [
  'Slack', 'Notion', 'HubSpot', 'Airtable', 'Google Sheets',
  'Zapier', 'Make', 'Asana', 'ClickUp', 'Stripe',
];

/**
 * Cursor smoke: two soft mist plumes follow the pointer across the hero
 * grid. The small wisp tracks closely; the large plume trails on a
 * heavier spring, creating a smoky drift. Desktop pointers only.
 */
function CursorMist({ reduce }) {
  const ref = useRef(null);
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const ax = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.5 });
  const ay = useSpring(my, { stiffness: 140, damping: 22, mass: 0.5 });
  const bx = useSpring(mx, { stiffness: 32, damping: 15, mass: 1.2 });
  const by = useSpring(my, { stiffness: 32, damping: 15, mass: 1.2 });

  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // only react while the hero is under / near the pointer
      if (e.clientY < r.top - 100 || e.clientY > r.bottom + 100) return;
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, mx, my]);

  if (reduce) return null;
  return (
    <div className="hero__mist" ref={ref} aria-hidden="true">
      <motion.div className="hero__mist-blob hero__mist-blob--b" style={{ x: bx, y: by }} />
      <motion.div className="hero__mist-blob hero__mist-blob--a" style={{ x: ax, y: ay }} />
    </div>
  );
}

/** Mouse-reactive orb: drifts opposite the cursor (reverse parallax). */
function InteractiveOrb({ reduce }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 38, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 38, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e) => {
      mx.set((e.clientX - window.innerWidth / 2) * -0.05);
      my.set((e.clientY - window.innerHeight / 2) * -0.05);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, mx, my]);

  if (reduce) return <div className="hero__orb" />;
  return <motion.div className="hero__orb" style={{ x, y }} />;
}

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Gentle parallax: content drifts up slightly as you scroll away.
  // No opacity fade — it dimmed the integration cloud while it was still
  // in view (the hero is taller than the viewport).
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  let wordIndex = 0;

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-title">
      <motion.div className="hero__bg" style={{ y: bgY }} aria-hidden="true">
        <div className="hero__grid" />
        <InteractiveOrb reduce={reduce} />
        <CursorMist reduce={reduce} />
      </motion.div>

      <motion.div className="hero__inner" style={{ y: contentY }}>
        <motion.div
          className="hero__lockup"
          initial={reduce ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <InfinityMark />
          <p className="wordmark"><b>crafted</b> flows</p>
        </motion.div>

        <motion.p
          className="eyebrow hero__badge"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
        >
          Done-for-you automation studio
        </motion.p>

        {/*
          Word spacing is deterministic: each word is an inline-block with a
          fixed 0.24em right margin — no whitespace characters are injected,
          so the splitting can never produce doubled or non-collapsing gaps.
        */}
        <h1
          className="hero__title"
          id="hero-title"
          aria-label="Stop burning agency hours on unbillable busywork."
        >
          {TITLE_LINES.map((line, li) => (
            <span className="hero__line" key={li} aria-hidden="true">
              {line.map((word) => {
                const w = typeof word === 'string' ? { text: word } : word;
                const i = wordIndex++;
                const inner = w.em ? <em>{w.text}</em> : w.text;
                return (
                  <motion.span
                    key={i}
                    className="word"
                    initial={reduce ? false : { opacity: 0, y: '0.55em' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.3 + i * 0.06 }}
                  >
                    {inner}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero__sub"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
        >
          Crafted Flows builds custom automations that run your client reporting, onboarding,
          and lead routing&mdash;using the tools you already use. <strong>Done for you, or you
          don&rsquo;t pay.</strong>
        </motion.p>

        <motion.div
          className="hero__cta"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 1 }}
        >
          <Magnetic>
            <a className="btn btn--primary btn--lg" href="#book">
              Book a 15-min automation audit
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.15}>
            <a className="btn btn--lg" href="#how">How it works</a>
          </Magnetic>
        </motion.div>

        <motion.div
          className="hero__proof"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.3 }}
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
        </motion.div>
      </motion.div>

      <motion.a
        className="hero__scroll"
        href="#problem"
        aria-label="Scroll to see the problem we solve"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.8 }}
      >
        <span>the problem</span>
        <span className="hero__scroll-line" aria-hidden="true"></span>
      </motion.a>
    </section>
  );
}
