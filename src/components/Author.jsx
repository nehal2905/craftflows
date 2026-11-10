import { getAuthor, COMPANY } from '../data/founders.js';
import { formatDate } from '../lib/blog.js';

function Avatar({ author, size }) {
  return (
    <span className="author__avatar" style={{ '--av': `${size}px` }}>
      <span aria-hidden="true">{author.initials}</span>
      <img
        src={author.avatar}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </span>
  );
}

/** Compact byline: avatar · linked name · role · date · read time. */
export function AuthorByline({ authorId, date, readingTime }) {
  const author = getAuthor(authorId);
  return (
    <div className="author-byline">
      <Avatar author={author} size={32} />
      <span className="author-byline__who">
        <a
          className="author-byline__name"
          href={author.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          {author.name}
        </a>
        <span className="author-byline__role">{author.role}</span>
      </span>
      <span className="author-byline__meta">
        <time dateTime={date}>{formatDate(date)}</time>
        <span>{readingTime} min read</span>
      </span>
    </div>
  );
}

/** Larger end-of-article card: avatar, name, bio, LinkedIn, audit CTA. */
export function AuthorCard({ authorId }) {
  const author = getAuthor(authorId);
  return (
    <aside className="author-card card" aria-label={`About the author, ${author.name}`}>
      <Avatar author={author} size={56} />
      <div className="author-card__body">
        <p className="author-card__label">Written by</p>
        <p className="author-card__name">{author.name}</p>
        <p className="author-card__bio">{author.shortBio}</p>
        <p className="author-card__links">
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer">
            Connect on LinkedIn
          </a>
          <span aria-hidden="true">·</span>
          <a href={COMPANY.cal} target="_blank" rel="noopener noreferrer">
            Book a 15-min audit →
          </a>
        </p>
      </div>
    </aside>
  );
}
