import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import Magnetic from './Magnetic.jsx';

/* Assume automation reliably removes ~70% of time spent on repetitive tasks. */
const AUTOMATION_SHARE = 0.7;
const WEEKS_PER_MONTH = 4.33;

function format(n, { currency = false } = {}) {
  const rounded = Math.round(n);
  const s = rounded.toLocaleString('en-US');
  return currency ? `$${s}` : s;
}

/** A number that springs smoothly to its new value whenever it changes. */
function AnimatedNumber({ value, currency = false, suffix = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (!reduce) mv.set(value);
  }, [value, mv, reduce]);

  useEffect(() => {
    if (reduce) return;
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${format(v, { currency })}${suffix}`;
    });
  }, [spring, reduce, currency, suffix]);

  return <span ref={ref}>{format(value, { currency })}{suffix}</span>;
}

function Slider({ id, label, min, max, step, value, onChange, display }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="roi__field">
      <div className="roi__field-head">
        <label className="roi__label" htmlFor={id}>{label}</label>
        <output className="roi__value" htmlFor={id}>{display}</output>
      </div>
      <input
        id={id}
        className="roi__slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--pct': `${pct}%` }}
        aria-valuetext={display}
      />
    </div>
  );
}

export default function RoiCalculator() {
  const [team, setTeam] = useState(8);
  const [rate, setRate] = useState(45);
  const [hours, setHours] = useState(10);

  const hoursSavedMonthly = team * hours * AUTOMATION_SHARE * WEEKS_PER_MONTH;
  const monthlySavings = hoursSavedMonthly * rate;
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="section roi" id="roi" aria-labelledby="roi-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="p" className="eyebrow">ROI calculator</Reveal>
        <Reveal as="h2" className="section__title" id="roi-title" delay={0.04}>
          <a href="#roi" className="title-link">What is the busywork costing you?</a>
        </Reveal>
        <Reveal as="p" className="section__sub" delay={0.08}>
          Drag the sliders to match your business. The numbers update as you move&mdash;and they
          assume automation only takes over 70% of the repetitive work, which is conservative.
        </Reveal>

        <div className="roi__grid">
          <Reveal delay={0.1}>
            <div className="roi__inputs card">
              <Slider
                id="roi-team"
                label="People doing repetitive work"
                min={1} max={50} step={1}
                value={team}
                onChange={setTeam}
                display={`${team}`}
              />
              <Slider
                id="roi-rate"
                label="Average hourly rate"
                min={15} max={200} step={5}
                value={rate}
                onChange={setRate}
                display={`$${rate}/h`}
              />
              <Slider
                id="roi-hours"
                label="Hours on repetitive tasks, per person / week"
                min={1} max={30} step={1}
                value={hours}
                onChange={setHours}
                display={`${hours}h`}
              />
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="roi__outputs card" role="status" aria-live="polite">
              <span className="roi__outputs-head">Hours you could recover every month</span>

              <div className="roi__results">
                <div className="roi__result">
                  <span className="roi__result-value">
                    <AnimatedNumber value={hoursSavedMonthly} />
                  </span>
                  <span className="roi__result-label">hours back, every month</span>
                </div>
                <div className="roi__result">
                  <span className="roi__result-value">
                    <AnimatedNumber value={monthlySavings} currency />
                  </span>
                  <span className="roi__result-label">recovered per month</span>
                </div>
                <div className="roi__result">
                  <span className="roi__result-value roi__result-value--hero">
                    <AnimatedNumber value={yearlySavings} currency />
                  </span>
                  <span className="roi__result-label">recovered per year</span>
                </div>
              </div>

              <p className="roi__note">
                Based on automating 70% of reported repetitive hours.{' '}
                <span className="tip">
                  <button type="button" className="tip__btn" aria-describedby="roi-tip">?</button>
                  <span className="tip__pop" id="roi-tip" role="tooltip">
                    Why 70%? Some steps still need human judgment&mdash;approvals, edge cases,
                    client nuance. We only count what&rsquo;s reliably repeatable, so the
                    estimate stays honest rather than impressive.
                  </span>
                </span>{' '}
                Most builds pay for themselves inside the first quarter.
              </p>

              <div className="roi__cta">
                <Magnetic strength={0.15}>
                  <a
                    className="btn btn--primary"
                    href="https://cal.com/craftedflows/audit"
                    target="_blank"
                    rel="noopener"
                  >
                    Recover these hours
                    <span className="btn__arrow" aria-hidden="true">→</span>
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
