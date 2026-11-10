import { formatDate } from '../lib/blog.js';
import { SITE } from '../data/site.js';
import { trackEvent } from '../lib/analytics.js';

/**
 * Agency byline: studio name, publish date, read time.
 * No personal founders, avatars or LinkedIn profiles.
 */
export function AuthorByline({ date, readingTime }) {
  return (
    <div className="author-byline">
      <span className="author-byline__who">
        <span className="author-byline__name">Crafted Flows</span>
      </span>
      <span className="author-byline__meta">
        <time dateTime={date}>{formatDate(date)}</time>
        <span>{readingTime} min read</span>
      </span>
    </div>
  );
}

/** End-of-article studio card: book an audit, no personal LinkedIn. */
export function AuthorCard() {
  return (
    <aside className="author-card card" aria-label="About Crafted Flows">
      <div className="author-card__body">
        <p className="author-card__label">Written by</p>
        <p className="author-card__name">Crafted Flows</p>
        <p className="author-card__bio">
          A done-for-you studio for promotional videos and business automations.
        </p>
        <p className="author-card__links">
          <a
            href={SITE.auditUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('book_automation_audit', { service: 'automation', location: 'blog_author_card' })
            }
          >
            Book a 15-min audit →
          </a>
        </p>
      </div>
    </aside>
  );
}
