import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { useReducedMotion } from 'framer-motion';
import { trackEvent } from '../lib/analytics.js';

/* Hover previews only where hover exists; touch devices keep the stills. */
const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const SPEED = 40; // auto-drift, px per second
const RESUME_AFTER = 1800; // ms of calm after someone scrolls before drifting again

function ReelTile({ project, copy, index, location }) {
  const [live, setLive] = useState(false);
  const [hover, setHover] = useState(false);
  // The first copy only closes the loop; the second is the real list.
  const decorative = copy === 0;

  useEffect(() => setHover(canHover()), []);

  const on = () => hover && project.preview && setLive(true);
  const off = () => setLive(false);

  return (
    <li className="reel__item" aria-hidden={decorative || undefined}>
      <Link
        className="reel-tile"
        to={`/work/${project.slug}`}
        tabIndex={decorative ? -1 : undefined}
        aria-label={project.concept ? `${project.title}, concept film` : project.title}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onMouseEnter={on}
        onMouseLeave={off}
        onFocus={on}
        onBlur={off}
        onClick={() =>
          trackEvent('portfolio_open', { service: 'video', project: project.slug, location })
        }
      >
        <img
          src={project.thumb || project.poster}
          alt=""
          width="480"
          height="853"
          draggable={false}
          loading={!decorative && index < 6 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {live && (
          <video
            className="reel-tile__loop"
            src={project.preview.mp4}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
          />
        )}
        <span className="reel-tile__cap">
          <b>{project.client}</b>
          <span>{project.concept ? `Concept film · ${project.industry}` : project.industry}</span>
        </span>
      </Link>
    </li>
  );
}

/**
 * Hero film strip. A real horizontal scroller, so it answers every
 * standard gesture: swipe with momentum on phones, trackpad and
 * Shift+wheel on laptops, arrow keys, plus click-and-drag with a mouse.
 * On top of that it drifts slowly on its own, and stops drifting while
 * someone hovers, touches, drags or tabs through it.
 *
 * The list is rendered twice so the drift can loop forever: when the
 * scroll position passes one full copy it jumps back by exactly that
 * width, which looks seamless. The first copy is hidden from assistive
 * tech and the tab order. With reduced motion there is no drift and no
 * second copy; the strip is a plain scroller.
 */
export default function ReelMarquee({ projects, location = 'home_reel' }) {
  const strip = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = strip.current;
    if (!el || reduce) return;

    let half = 0; // width of one copy of the list
    let floor = 0; // lowest scroll position before wrapping forward
    let pos = 0; // where the drift last put the strip (fractional)
    let raf = 0;
    let last = 0;
    let visible = false;
    let hovering = false;
    let touching = false;
    let focused = false;
    let pausedUntil = 0;
    let drag = null; // { x, left, moved }
    let suppressClickUntil = 0;

    const measure = () => {
      half = el.scrollWidth / 2;
      floor = Math.max(0, (half - el.clientWidth) / 2);
    };

    // keep the position inside one copy's worth of room, both directions
    const shift = (d) => {
      el.scrollLeft += d;
      pos += d;
      if (drag) drag.left += d;
    };
    const wrap = () => {
      if (focused || !half) return;
      if (el.scrollLeft < floor) shift(half);
      else if (el.scrollLeft >= floor + half) shift(-half);
    };

    const tick = (t) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(64, t - last) : 0;
      last = t;
      if (hovering || touching || focused || drag || t < pausedUntil) return;
      pos += (SPEED * dt) / 1000;
      if (pos >= floor + half) pos -= half;
      el.scrollLeft = pos;
    };
    const start = () => {
      if (!raf) {
        last = 0;
        pos = el.scrollLeft;
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // someone else moved it (finger, trackpad, keys): hold the drift a moment
    const onScroll = () => {
      wrap();
      if (Math.abs(el.scrollLeft - pos) > 1.5) {
        pos = el.scrollLeft;
        pausedUntil = performance.now() + RESUME_AFTER;
      }
    };

    const onPointerEnter = (e) => { if (e.pointerType === 'mouse') hovering = true; };
    const onPointerLeave = (e) => { if (e.pointerType === 'mouse') hovering = false; };
    const onTouchStart = () => { touching = true; };
    const onTouchEnd = () => {
      touching = false;
      pausedUntil = performance.now() + RESUME_AFTER;
    };
    const onFocusIn = () => { focused = true; };
    const onFocusOut = (e) => { if (!el.contains(e.relatedTarget)) focused = false; };

    // click-and-drag with a mouse (touch already scrolls natively)
    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: el.scrollLeft, moved: false };
      window.addEventListener('pointermove', onDragMove);
      window.addEventListener('pointerup', onDragEnd, { once: true });
    };
    const onDragMove = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      // only a real movement turns a press into a drag; a still click opens the film
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        el.classList.add('is-grabbing');
      }
      if (drag.moved) el.scrollLeft = drag.left - dx;
    };
    const onDragEnd = () => {
      if (drag?.moved) suppressClickUntil = performance.now() + 80;
      drag = null;
      el.classList.remove('is-grabbing');
      pausedUntil = performance.now() + RESUME_AFTER;
      window.removeEventListener('pointermove', onDragMove);
    };
    // a drag that ends over a film should not open it
    const onClickCapture = (e) => {
      if (performance.now() < suppressClickUntil) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    measure();
    el.scrollLeft = half; // open on the real list, with room to swipe back
    pos = el.scrollLeft;

    const ro = new ResizeObserver(() => {
      measure();
      wrap();
    });
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointerenter', onPointerEnter);
    el.addEventListener('pointerleave', onPointerLeave);
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    el.addEventListener('focusin', onFocusIn);
    el.addEventListener('focusout', onFocusOut);
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('click', onClickCapture, true);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointerenter', onPointerEnter);
      el.removeEventListener('pointerleave', onPointerLeave);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('focusin', onFocusIn);
      el.removeEventListener('focusout', onFocusOut);
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('pointermove', onDragMove);
      window.removeEventListener('pointerup', onDragEnd);
    };
  }, [reduce, projects]);

  if (!projects?.length) return null;
  const allConcept = projects.every((p) => p.concept);

  return (
    <div
      className="reel-strip"
      ref={strip}
      role="region"
      aria-label={allConcept ? 'Concept films we have made' : 'Films we have made'}
    >
      <ul className="reel__track">
        {[0, 1].map((copy) =>
          projects.map((project, i) => (
            <ReelTile
              key={`${copy}-${project.slug}`}
              project={project}
              copy={copy}
              index={i}
              location={location}
            />
          ))
        )}
      </ul>
    </div>
  );
}
