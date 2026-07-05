import { useEffect, useRef } from 'react';
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';

/**
 * Animated number — counts from 0 to `value` when scrolled into view.
 * Renders the final value immediately under prefers-reduced-motion.
 */
export default function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18 });

  useEffect(() => {
    if (inView && !reduce) mv.set(value);
  }, [inView, reduce, mv, value]);

  useEffect(() => {
    if (reduce) return;
    return spring.on('change', (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      }
    });
  }, [spring, reduce, prefix, suffix, decimals]);

  return (
    <span ref={ref}>
      {reduce ? `${prefix}${value.toFixed(decimals)}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}
