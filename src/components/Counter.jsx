import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Stat value. The final number is ALWAYS in the DOM from first render,
 * so no failure mode (reduced motion, throttled JS, no JS) can show a
 * zero. The only enhancement is a fade/blur-in when scrolled into view;
 * the displayed number itself never changes.
 */
export default function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const text = `${prefix}${value.toFixed(decimals)}${suffix}`;

  return (
    <m.span
      ref={ref}
      className="counter"
      initial={reduce ? false : { opacity: 0, filter: 'blur(6px)' }}
      animate={inView || reduce ? { opacity: 1, filter: 'blur(0px)' } : undefined}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {text}
    </m.span>
  );
}
