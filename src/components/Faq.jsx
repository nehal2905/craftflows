import { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';

const EASE = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: 'How much does it cost?',
    a: 'A fixed build fee\u2014quoted up front after the audit, based on the workflow\u2019s complexity\u2014plus a monthly retainer for monitoring and maintenance. No hourly billing, no surprises. And if the automation doesn\u2019t save the hours we promised, you don\u2019t pay.',
  },
  {
    q: 'How long does a build take?',
    a: 'Most automations ship in one to three weeks from kickoff. The audit itself takes 15 minutes, and you\u2019ll have a scoped proposal within two business days of it.',
  },
  {
    q: 'What software do you work with?',
    a: 'The tools businesses already run: Slack, Notion, HubSpot, Airtable, Google Workspace, Asana, ClickUp, Stripe, and hundreds more via Zapier, Make, or direct APIs. If your stack has an API, we can almost certainly wire it in.',
  },
  {
    q: 'What happens when something breaks?',
    a: 'That\u2019s what the retainer covers. Every flow is monitored around the clock\u2014when an upstream tool changes its API or a step fails, we\u2019re alerted and usually have it fixed before your team notices anything.',
  },
  {
    q: 'What kind of support do we get?',
    a: 'A dedicated Slack channel with the people who built your automation\u2014no ticket queues, no outsourced support desk. Questions, tweaks, and small adjustments are part of the retainer.',
  },
  {
    q: 'Can you build custom integrations?',
    a: 'Yes. When an off-the-shelf connector doesn\u2019t exist, we write custom API integrations\u2014internal tools, legacy systems, or niche software included. That\u2019s scoped and quoted in the same fixed-fee proposal.',
  },
];

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

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap wrap--narrow">
        <Reveal as="p" className="eyebrow eyebrow--strong">Frequently asked questions</Reveal>
        <Reveal as="h2" className="section__title" id="faq-title" delay={0.04}>
          <a href="#faq" className="title-link">
            Everything people ask<br className="br-desk" /> before booking.
          </a>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="faq__list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {FAQS.map((item, i) => (
              <FaqItem
                key={i}
                id={i}
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
