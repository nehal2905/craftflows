import { useRef } from 'react';
import { m, useReducedMotion } from 'framer-motion';

const PATH =
  'M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z';
const EASE = [0.22, 1, 0.36, 1];

/**
 * The infinity mark: draws itself in once (Framer Motion pathLength),
 * then a single lit segment flows around the loop forever (Web Animations
 * API - seamless because the period equals the total path length).
 * Fully calm under prefers-reduced-motion.
 */
export default function InfinityMark() {
  const reduce = useReducedMotion();
  const flowRef = useRef(null);

  const startFlow = () => {
    const flow = flowRef.current;
    if (!flow || reduce || typeof flow.getTotalLength !== 'function') return;

    const L = flow.getTotalLength();
    const seg = Math.max(10, L * 0.07);
    flow.style.strokeDasharray = `${seg} ${L - seg}`;
    flow.style.strokeDashoffset = String(L);
    flow.style.opacity = '0.9';
    flow.animate(
      [{ strokeDashoffset: L }, { strokeDashoffset: 0 }],
      { duration: 3400, iterations: Infinity, easing: 'linear' }
    );
  };

  return (
    <svg
      className="mark"
      viewBox="0 0 120 60"
      fill="none"
      role="img"
      aria-label="Crafted Flows infinity mark"
    >
      <m.path
        id="mark-base"
        d={PATH}
        stroke="#FAFAFA"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.7, ease: EASE }}
        onAnimationComplete={startFlow}
      />
      {!reduce && (
        <path
          id="mark-flow"
          ref={flowRef}
          d={PATH}
          stroke="#FFFFFF"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
