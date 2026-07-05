import Reveal from './Reveal.jsx';
import Magnetic from './Magnetic.jsx';

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
            <a
              className="btn btn--primary btn--lg"
              href="https://cal.com/craftedflows/audit"
              target="_blank"
              rel="noopener"
            >
              Book your automation audit
              <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
          </Magnetic>

          <div className="book__meta">
            <span>15 minutes</span>
            <span>No pitch deck</span>
            <span>Leave with a plan</span>
            <span>Hours-back guarantee</span>
          </div>

          <a className="book__email" href="mailto:hello@craftedflows.com">hello@craftedflows.com</a>
        </Reveal>
      </div>
    </section>
  );
}
