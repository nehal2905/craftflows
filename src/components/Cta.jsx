import { Link, useLocation } from 'react-router';
import { SITE } from '../data/site.js';
import { trackEvent } from '../lib/analytics.js';

const Arrow = () => (
  <span className="btn__arrow" aria-hidden="true">→</span>
);

/**
 * The video call to action. Leads to the brief form: the one on /video
 * when already there, otherwise the one on /contact. Every click is
 * tracked with the service and the spot it came from.
 */
export function VideoCta({
  location,
  className = 'btn btn--primary btn--lg',
  children = 'Start a video project',
  arrow = true,
}) {
  const { pathname } = useLocation();
  const to = pathname === '/video' ? '/video#brief' : '/contact#brief';
  return (
    <Link
      className={className}
      to={to}
      onClick={() => trackEvent('start_video_project', { service: 'video', location })}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/** The automation call to action: the 15-minute audit on Cal.com. */
export function AuditCta({
  location,
  className = 'btn btn--lg',
  children = 'Book an automation audit',
  arrow = true,
}) {
  return (
    <a
      className={className}
      href={SITE.auditUrl}
      target="_blank"
      rel="noopener"
      onClick={() => trackEvent('book_automation_audit', { service: 'automation', location })}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
