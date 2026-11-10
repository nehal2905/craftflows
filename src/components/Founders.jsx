import Reveal from './Reveal.jsx';
import Spotlight from './Spotlight.jsx';
import { FOUNDERS } from '../data/founders.js';

/**
 * "Who builds this" — founder identity between Process and ROI.
 * Deliberately quiet: two cards, real photos, one bio each. Not in
 * the main nav by design.
 */
export default function Founders() {
  return (
    <section className="section who" id="who" aria-labelledby="who-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Who builds this</Reveal>

        <Reveal as="h2" className="section__title" id="who-title" delay={0.04}>
          <a href="#who" className="title-link">
            Founder-led.<br className="br-desk" /> Backed by a full team.
          </a>
        </Reveal>

        <div className="who__grid">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={0.08 + i * 0.08}>
              <Spotlight className="who__card card">
                <img
                  className="who__photo"
                  src={f.photo}
                  alt={`${f.name} at their desk, working on client automations`}
                  width="480"
                  height="600"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="who__name">{f.name}</h3>
                <p className="who__role">{f.role}</p>
                <p className="who__bio">{f.bio}</p>
                <a
                  className="btn btn--sm who__link"
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                  <span className="btn__arrow" aria-hidden="true">→</span>
                </a>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
