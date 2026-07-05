import { useRef } from 'react';
import { m, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Cursor-aware card wrapper:
 *  - writes the pointer position into CSS vars (--mx / --my) consumed by
 *    the `.spotlight` pseudo-element glow (pure CSS paint, no re-renders)
 *  - applies a subtle 3D magnetic tilt toward the cursor (spring-damped,
 *    GPU transform only), plus a gentle lift while hovered
 * Both effects are disabled under prefers-reduced-motion.
 */
export default function Spotlight({
  as = 'div',
  tilt = true,
  maxTilt = 5,
  className = '',
  style,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 180, damping: 20, mass: 0.4 });
  const rotateY = useSpring(ry, { stiffness: 180, damping: 20, mass: 0.4 });

  const Tag = m[as] ?? m.div;
  const tilting = tilt && !reduce;

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    ref.current.style.setProperty('--mx', `${px}px`);
    ref.current.style.setProperty('--my', `${py}px`);
    if (tilting) {
      ry.set(((px / rect.width) - 0.5) * 2 * maxTilt);
      rx.set(((py / rect.height) - 0.5) * -2 * maxTilt);
    }
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <Tag
      ref={ref}
      className={`spotlight ${className}`}
      style={
        tilting
          ? { ...style, rotateX, rotateY, transformPerspective: 900 }
          : style
      }
      whileHover={tilting ? { y: -5 } : undefined}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
