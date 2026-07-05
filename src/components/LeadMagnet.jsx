import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal.jsx';

const EASE = [0.22, 1, 0.36, 1];

/** Low-friction secondary CTA — email capture for the automation checklist. */
export default function LeadMagnet() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend yet — hand off to the inbox so no lead is lost.
    window.location.href =
      `mailto:hello@craftedflows.com?subject=${encodeURIComponent('Send me the Agency Automation Checklist')}` +
      `&body=${encodeURIComponent(`Please send the checklist to: ${email}`)}`;
    setSent(true);
  };

  return (
    <section className="section section--tight magnet" aria-labelledby="magnet-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <div className="magnet__panel card">
            <div>
              <p className="eyebrow">Not ready for a call?</p>
              <h2 className="magnet__title" id="magnet-title">
                Get the Agency Automation Checklist.
              </h2>
              <p className="magnet__sub">
                The exact 21-point checklist we run in every audit&mdash;find the workflows
                silently draining your week, ranked by hours recovered.
              </p>
              <ul className="magnet__list">
                <li>The 8 workflows agencies most commonly overspend on</li>
                <li>A scoring sheet to rank them by hours saved</li>
                <li>Which ones to automate first (and which to skip)</li>
              </ul>
            </div>

            <div>
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.p
                    key="ok"
                    className="magnet__success"
                    role="status"
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <path d="m8.5 12.5 2.5 2.5 5-5.5" />
                    </svg>
                    Check your email client&mdash;your checklist request is ready to send.
                  </motion.p>
                ) : (
                  <motion.form
                    key="form"
                    className="magnet__form"
                    onSubmit={submit}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <label htmlFor="magnet-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
                      Work email
                    </label>
                    <input
                      id="magnet-email"
                      className="magnet__input"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@youragency.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="btn btn--primary" type="submit">
                      Send me the checklist
                      <span className="btn__arrow" aria-hidden="true">→</span>
                    </button>
                    <p className="magnet__privacy">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="5" y="11" width="14" height="9" rx="2" />
                        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                      </svg>
                      No spam, no drip sequence. One email with the checklist, that&rsquo;s it.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
