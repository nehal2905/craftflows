import { m, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

/**
 * Cursor smoke: two soft mist plumes follow the pointer across the hero
 * grid. The small wisp tracks closely; the large plume trails on a
 * heavier spring, creating a smoky drift. Desktop pointers only.
 */
export function CursorMist({ reduce }) {
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
      <m.div className="hero__mist-blob hero__mist-blob--b" style={{ x: bx, y: by }} />
      <m.div className="hero__mist-blob hero__mist-blob--a" style={{ x: ax, y: ay }} />
    </div>
  );
}

/** Mouse-reactive orb: drifts opposite the cursor (reverse parallax). */
export function InteractiveOrb({ reduce }) {
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
  return <m.div className="hero__orb" style={{ x, y }} />;
}
