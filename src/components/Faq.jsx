import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import { AUTOMATION_FAQS } from '../data/faqs.js';

const EASE = [0.22, 1, 0.36, 1];

function FaqItem({ item, isOpen, onToggle, id }) {
  const reduce = useReducedMotion();
  return (
    <li className="faq__item">
      <h3 style={{ margin: 0, fontSize: 'inherit', fontWeight: 'inherit' }}>
        <button
          className="faq__question"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          id={`faq-question-${id}`}
        >
          {item.q}
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            className="faq__answer-wrap"
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-question-${id}`}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="faq__answer">{item.a}</p>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/**
 * FAQ accordion. Defaults reproduce the original automation FAQ exactly;
 * other pages pass their own `items`, `id`, `title` and tone.
 */
export default function Faq({
  items = AUTOMATION_FAQS,
  id = 'faq',
  eyebrow = 'Frequently asked questions',
  title = (
    <>
      Everything people ask<br className="br-desk" /> before booking.
    </>
  ),
  light = false,
}) {
  const [open, setOpen] = useState(0);

  if (items.length === 0) return null;

  return (
    <section
      className={`section faq${light ? ' section--light' : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      {!light && <div className="divider" aria-hidden="true" />}
      <div className="wrap wrap--narrow">
        {eyebrow && <Reveal as="p" className="eyebrow eyebrow--strong">{eyebrow}</Reveal>}
        <Reveal as="h2" className="section__title" id={`${id}-title`} delay={0.04}>
          <a href={`#${id}`} className="title-link">{title}</a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="faq__list">
            {items.map((item, i) => (
              <FaqItem
                key={i}
                id={`${id}-${i}`}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
