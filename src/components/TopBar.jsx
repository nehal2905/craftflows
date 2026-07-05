import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import Magnetic from './Magnetic.jsx';

const EASE = [0.22, 1, 0.36, 1];

/** Floating translucent pill — hidden over the hero, eases in once scrolled past. */
export default function TopBar() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.55);
  });

  return (
    <motion.header
      className="topbar"
      initial={false}
      animate={
        reduce
          ? { opacity: visible ? 1 : 0 }
          : { y: visible ? 0 : -76, opacity: visible ? 1 : 0 }
      }
      transition={{ duration: 0.6, ease: EASE }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={visible ? undefined : true}
    >
      <div className="topbar__pill">
        <a className="topbar__brand" href="#top" aria-label="Crafted Flows&mdash;top of page" tabIndex={visible ? 0 : -1}>
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
          <a href="#how" tabIndex={visible ? 0 : -1}>Process</a>
          <a href="#roi" tabIndex={visible ? 0 : -1}>ROI</a>
          <a href="#results" tabIndex={visible ? 0 : -1}>Results</a>
          <a href="#faq" tabIndex={visible ? 0 : -1}>FAQ</a>
        </nav>

        <Magnetic strength={0.2}>
          <a className="btn btn--primary btn--sm" href="#book" tabIndex={visible ? 0 : -1}>Book audit</a>
        </Magnetic>
      </div>
    </motion.header>
  );
}
