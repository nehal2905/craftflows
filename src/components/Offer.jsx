import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import GuaranteeSeal from './GuaranteeSeal.jsx';

const EASE = [0.22, 1, 0.36, 1];

export default function Offer() {
  const reduce = useReducedMotion();
  const guaranteeRef = useRef(null);
  // Adds the `.in` class that drives the underline draw in styles.css.
  const inView = useInView(guaranteeRef, { once: true, amount: 0.4 });

  return (
    <section className="section offer" id="offer" aria-labelledby="offer-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <GuaranteeSeal />
          <div className="offer__panel">
            <p className="eyebrow">The offer</p>

            <h2 className="offer__title" id="offer-title">
              <a href="#offer" className="title-link">
                <strong>Fixed build fee</strong>, plus a monthly retainer.
                Delivered in <strong>14 days</strong>.
              </a>
            </h2>

            <m.p
              ref={guaranteeRef}
              className={`offer__guarantee${inView || reduce ? ' in' : ''}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
            >
              If it doesn&rsquo;t save the hours we promised,<br className="br-desk" />
              <span className="offer__mark">you don&rsquo;t pay.</span>
            </m.p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
