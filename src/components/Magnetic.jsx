import { useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic wrapper - children gently gravitate toward the cursor while
 * hovered, springing back on leave. Disabled for reduced motion and on
 * touch-only devices (no mousemove events fire there anyway).
 */
export default function Magnetic({ children, strength = 0.25, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 180, damping: 16, mass: 0.3 });

  if (reduce) return <div className={className}>{children}</div>;

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </m.div>
  );
}
