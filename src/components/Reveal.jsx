import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Scroll-reveal wrapper. Triggers early (small amount, shallow negative
 * margin) so fast scrolling never lands on blank space, and animates a
 * short distance so content settles quickly. Static under
 * prefers-reduced-motion.
 *
 * @param {string} as    intrinsic tag to render ("div" | "h2" | "p" | "li" ...)
 * @param {number} delay stagger offset in seconds
 */
export default function Reveal({ as = 'div', delay = 0, children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    return <Tag {...rest}>{children}</Tag>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -4% 0px', amount: 0.05 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
