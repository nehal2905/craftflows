import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/** Thin gradient bar along the top edge tracking page scroll. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  if (reduce) return null;
  return <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />;
}
