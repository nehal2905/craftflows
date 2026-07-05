import Reveal from './Reveal.jsx';
import Counter from './Counter.jsx';
import Spotlight from './Spotlight.jsx';

const STATS = [
  { value: 30, suffix: '%', label: 'of agency hours sunk into unbillable admin work' },
  { value: 10, prefix: '+', suffix: 'h', label: 'lost every single week to copy-paste reporting', pain: true },
  { literal: 'Zero', label: 'new tools your team has to learn\u2014we use your stack' },
];

export default function Problem() {
  return (
    <section className="section problem" id="problem" aria-labelledby="problem-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="p" className="eyebrow">The problem</Reveal>

        <Reveal as="h2" className="problem__title" id="problem-title" delay={0.04}>
          The <span className="big-figure">30%</span> of agency work<br className="br-desk" /> nobody bills for.
        </Reveal>

        <Reveal as="p" className="lead" delay={0.08}>
          Manual reporting. Copy-pasting between dashboards. Onboarding checklists chased by hand.
          It quietly eats <strong>10+ hours a week</strong>&mdash;and every one of those hours is a
          mistake waiting to happen.
        </Reveal>

        <div className="stats">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={0.08 + i * 0.08}>
              <Spotlight className="stat card">
                <span className={`stat__value${s.pain ? ' stat__value--pain' : ''}`}>
                  {s.literal ? s.literal : <Counter value={s.value} prefix={s.prefix ?? ''} suffix={s.suffix} />}
                </span>
                <span className="stat__label">{s.label}</span>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
