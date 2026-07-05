import Reveal from './Reveal.jsx';
import Spotlight from './Spotlight.jsx';

const STAR = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.65 1.13 6.57L12 17.56l-5.9 3.1 1.13-6.57L2.45 9.44l6.6-.96L12 2.5z" />
  </svg>
);

const LINKEDIN = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
  </svg>
);

/* NOTE: LinkedIn URLs are placeholders — point them at the real client
   profiles once permissions are confirmed. */
const TESTIMONIALS = [
  {
    quote:
      'Our Monday reporting used to take most of the day across three account managers. Now the decks are waiting in Slack before anyone logs in. It genuinely changed how the week starts.',
    before: '12h/wk',
    after: '40min/wk',
    metricLabel: 'reporting time',
    name: 'Sarah Okafor',
    photo: '/assets/avatars/avatar-sarah.jpg',
    linkedin: 'https://www.linkedin.com/',
    role: 'Operations Director, Northbeam Studio',
  },
  {
    quote:
      'Client onboarding went from a 14-step checklist someone always half-finished to a flow that just happens. New clients notice\u2014two mentioned it unprompted in the first month.',
    before: '5 days',
    after: 'same day',
    metricLabel: 'onboarding',
    name: 'Daniel Reyes',
    photo: '/assets/avatars/avatar-daniel.jpg',
    linkedin: 'https://www.linkedin.com/',
    role: 'Founder, Atlas Digital',
  },
  {
    quote:
      'The build paid for itself in about seven weeks. What sold me was the maintenance\u2014when our CRM changed its API, the flow was fixed before we even noticed it broke.',
    before: '10h/wk',
    after: '1h/wk',
    metricLabel: 'admin work',
    name: 'Mia Lindqvist',
    photo: '/assets/avatars/avatar-mia.jpg',
    linkedin: 'https://www.linkedin.com/',
    role: 'Managing Partner, Mercury Collective',
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials" id="results" aria-labelledby="results-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="p" className="eyebrow">Results</Reveal>
        <Reveal as="h2" className="section__title" id="results-title" delay={0.04}>
          Hours given back, on the record.
        </Reveal>
        <Reveal as="p" className="section__sub" delay={0.08}>
          Every engagement is measured in hours recovered&mdash;before and after, in writing.
        </Reveal>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={0.08 + i * 0.1}>
              <Spotlight as="figure" className="tcard card" style={{ margin: 0, height: '100%' }}>
                <span className="tcard__stars" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => <span key={s}>{STAR}</span>)}
                </span>

                <blockquote className="tcard__quote" style={{ margin: 0 }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="tcard__metrics" aria-label={`${t.metricLabel}: from ${t.before} to ${t.after}`}>
                  <span className="tcard__metric">{t.before}</span>
                  <span className="tcard__metric-arrow" aria-hidden="true">→</span>
                  <span className="tcard__metric tcard__metric--after">{t.after}</span>
                </div>

                <figcaption className="tcard__person">
                  <img
                    className="tcard__avatar"
                    src={t.photo}
                    alt=""
                    width="46"
                    height="46"
                    loading="lazy"
                  />
                  <span className="tcard__who">
                    <span className="tcard__name-row">
                      <span className="tcard__name">{t.name}</span>
                      <a
                        className="tcard__linkedin"
                        href={t.linkedin}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${t.name} on LinkedIn`}
                      >
                        {LINKEDIN}
                      </a>
                    </span>
                    <span className="tcard__role">{t.role}</span>
                  </span>
                </figcaption>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
