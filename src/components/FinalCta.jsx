import Reveal from './Reveal.jsx';
import { VideoCta, AuditCta } from './Cta.jsx';
import { SITE } from '../data/site.js';

/** Closing call to action with both doors. */
export default function FinalCta({
  title = <>Tell us the goal. We&rsquo;ll do the rest.</>,
  sub = 'Start a video project, or book a 15-minute automation audit.',
  location = 'final_cta',
}) {
  return (
    <section className="section book" aria-labelledby="final-cta-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap wrap--narrow book__inner">
        <Reveal as="h2" className="book__title" id="final-cta-title">{title}</Reveal>
        <Reveal as="p" className="book__sub" delay={0.05}>{sub}</Reveal>

        <Reveal className="cta-row" delay={0.1}>
          <VideoCta location={location} />
          <AuditCta location={location} />
        </Reveal>

        <Reveal delay={0.14} style={{ marginTop: '1.5rem' }}>
          <a className="book__email" href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </Reveal>
      </div>
    </section>
  );
}
