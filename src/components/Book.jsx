import Reveal from './Reveal.jsx';
import Magnetic from './Magnetic.jsx';
import { AuditCta } from './Cta.jsx';

export default function Book() {
  return (
    <section className="section book" id="book" aria-labelledby="book-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap wrap--narrow book__inner">
        <Reveal as="p" className="eyebrow">Free audit</Reveal>

        <Reveal as="h2" className="book__title" id="book-title" delay={0.04}>
          <a href="#book" className="title-link">See what we&rsquo;d automate first.</a>
        </Reveal>

        <Reveal as="p" className="book__sub" delay={0.08}>
          A 15-minute call. We will point at the one workflow worth automating for you,
          guaranteed to save you hours, or you do not pay.
        </Reveal>

        <Reveal className="book__actions" delay={0.14}>
          <Magnetic>
            <AuditCta location="automation_final_cta" className="btn btn--primary btn--lg">
              Book your automation audit
            </AuditCta>
          </Magnetic>

          <div className="book__meta">
            <span>15 minutes</span>
            <span>No pitch deck</span>
            <span>Leave with a plan</span>
            <span>Hours-back guarantee</span>
          </div>

          <a className="book__email" href="mailto:admin@craftedflows.com">admin@craftedflows.com</a>
        </Reveal>
      </div>
    </section>
  );
}
