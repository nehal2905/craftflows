import { m, useReducedMotion } from 'framer-motion';
import InfinityMark from './InfinityMark.jsx';
import Magnetic from './Magnetic.jsx';
import ReelMarquee from './ReelMarquee.jsx';
import { CursorMist, InteractiveOrb } from './HeroBackdrop.jsx';
import { VideoCta, AuditCta } from './Cta.jsx';
import { publishedProjects } from '../data/work.js';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Home hero: the infinity lockup, the promise and two ways in, over the
 * blueprint grid with its cursor-following mist and orb. Every published
 * film drifts past underneath, so a visitor sees real work before they
 * scroll. Hovering a film plays its preview.
 */
export default function HomeHero() {
  const reduce = useReducedMotion();
  const films = publishedProjects('video');
  const rise = (delay, y = 16) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <section className="hero hero--home" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <InteractiveOrb reduce={reduce} />
        <CursorMist reduce={reduce} />
      </div>

      <div className="hero__inner">
        <m.div className="hero__lockup" {...rise(0, -12)}>
          <InfinityMark />
          <p className="wordmark"><b>crafted</b> flows</p>
        </m.div>

        {/* LCP content: renders statically, no entrance animation. */}
        <h1 className="hero__title" id="hero-title">
          <span className="hero__line">Videos that <em>sell.</em></span>{' '}
          <span className="hero__line">Automations that <em>save&nbsp;hours.</em></span>
        </h1>

        <p className="hero__sub">
          Crafted Flows makes promotional videos that win your business customers,
          and builds the automations that give your team its time back.{' '}
          <strong>Done for you, start to finish.</strong>
        </p>

        <m.div className="hero__cta" {...rise(0.15)}>
          <Magnetic>
            <VideoCta location="home_hero" />
          </Magnetic>
          <Magnetic strength={0.15}>
            <AuditCta location="home_hero" />
          </Magnetic>
        </m.div>
      </div>

      {films.length > 0 && (
        <m.div className="hero__reel-wrap" {...rise(0.25)}>
          <ReelMarquee projects={films} />
        </m.div>
      )}
    </section>
  );
}
