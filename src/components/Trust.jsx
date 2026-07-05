import Reveal from './Reveal.jsx';

/* Monochrome logo lockups — abstract mark + wordmark so each client scans
   as a real brand shape rather than plain text. Swap for real SVGs when
   client logos are secured. */
const AGENCIES = [
  {
    name: 'Northbeam',
    nameClass: '',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 20 21H4L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 9v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Atlas Digital',
    nameClass: '',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    name: 'MERCURY',
    nameClass: 'trust__logo-name--serifish',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.2" transform="rotate(-24 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Fieldnote',
    nameClass: '',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="3.5" width="16" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.5 9h7M8.5 13h7M8.5 17h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'PARALLEL',
    nameClass: 'trust__logo-name--serifish',
    mark: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4v16M12 4v16M17 4v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SECURITY = [
  {
    icon: 'lock',
    title: 'Least-privilege access',
    body: 'Scoped API keys only\u2014we never ask for admin credentials, and access is revocable in one click.',
  },
  {
    icon: 'pulse',
    title: '24/7 error monitoring',
    body: 'Every flow is watched around the clock. If a step fails, we get paged before your team notices.',
  },
  {
    icon: 'shield',
    title: 'Your data stays in your tools',
    body: 'Automations run inside your own stack. Nothing is copied out, warehoused, or retained by us.',
  },
];

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  pulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l2.5-6 5 12L17 12h4" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  ),
};

export default function Trust() {
  return (
    <section className="section section--tight trust" aria-label="Trusted by growing agencies">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="p" className="trust__label">Trusted by growing agencies</Reveal>

        <Reveal className="trust__logos" delay={0.05}>
          {AGENCIES.map((a) => (
            <span className="trust__logo" key={a.name}>
              {a.mark}
              <span className={`trust__logo-name ${a.nameClass}`}>{a.name}</span>
            </span>
          ))}
        </Reveal>

        <Reveal className="security" delay={0.1}>
          <p className="security__label">Enterprise-grade security</p>
          <div className="security__grid">
            {SECURITY.map((s) => (
              <div className="security__card" key={s.title}>
                <span className="security__icon">{ICONS[s.icon]}</span>
                <span className="security__title">{s.title}</span>
                <span className="security__body">{s.body}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
