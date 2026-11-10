import { Link, useSearchParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { POSTS, formatDate } from '../lib/blog.js';

const ORIGIN = 'https://www.craftedflows.com';
const PER_PAGE = 9;

/* Two topics, matching the two services. Every non-video category
   (Tools, AI, Automation Strategy) belongs to automation. */
const TOPICS = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Video' },
  { id: 'automation', label: 'Automation' },
];
export const topicOf = (post) => (post.category === 'Video' ? 'video' : 'automation');

/**
 * Article card. `feature` lays it out large and horizontal for the lead
 * story; the default is the image-first grid card.
 */
export function PostCard({ post, eager = false, headingLevel: H = 'h2', feature = false }) {
  return (
    <Link className={`post-card${feature ? ' post-card--feature' : ''}`} to={`/blog/${post.slug}`}>
      <span className="post-card__media">
        <img
          src={post.image}
          alt={post.imageAlt}
          width="1200"
          height="630"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="post-card__chip">{post.category}</span>
      </span>
      <span className="post-card__body">
        {feature && <span className="post-card__flag">Latest</span>}
        <H className="post-card__title">{post.title}</H>
        <span className="post-card__desc">{post.description}</span>
        <span className="post-card__meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </span>
        {feature && (
          <span className="post-card__more">
            Read the article <span aria-hidden="true">→</span>
          </span>
        )}
      </span>
    </Link>
  );
}

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const topic = TOPICS.some((t) => t.id === params.get('topic')) ? params.get('topic') : 'all';
  const inTopic = topic === 'all' ? POSTS : POSTS.filter((p) => topicOf(p) === topic);

  // The lead story: the post marked featured, else the newest one.
  const lead = inTopic.find((p) => p.featured) || inTopic[0];
  const rest = inTopic.filter((p) => p !== lead);

  const pageCount = Math.max(1, Math.ceil(rest.length / PER_PAGE));
  const page = Math.min(pageCount, Math.max(1, Number(params.get('page')) || 1));
  const posts = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const setQuery = (next) => {
    const q = {};
    if (next.topic && next.topic !== 'all') q.topic = next.topic;
    if (next.page && next.page > 1) q.page = String(next.page);
    setParams(q);
  };
  const goTo = (p) => {
    setQuery({ topic, page: p });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Seo
        title="Blog: Promo Video and Automation Guides | Crafted Flows"
        description="Breakdowns of real promo films, guides to short-form video, and practical automation playbooks from the Crafted Flows studio."
        path="/blog"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Crafted Flows Blog',
          description: 'Practical writing on promo videos and business automation.',
          url: `${ORIGIN}/blog`,
          publisher: {
            '@type': 'Organization',
            name: 'Crafted Flows',
            url: ORIGIN,
            logo: `${ORIGIN}/assets/favicon-512.png`,
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
          ],
        }}
      />

      <main id="top">
        <section className="section blog-hero" aria-labelledby="blog-title">
          <div className="blog-hero__glow" aria-hidden="true" />
          <div className="wrap head--center">
            <Reveal as="p" className="kicker">The blog</Reveal>
            <Reveal as="h1" className="blog-hero__title" id="blog-title" delay={0.04}>
              Ideas worth making.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.08}>
              Breakdowns of real films, guides to short-form video, and practical
              automation playbooks from the studio.
            </Reveal>

            <Reveal delay={0.12}>
              <div className="filters blog-filters" role="group" aria-label="Filter articles by topic">
                {TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={topic === t.id}
                    onClick={() => setQuery({ topic: t.id, page: 1 })}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section blog-list" aria-label="Articles">
          <div className="wrap">
            {lead && page === 1 && (
              <Reveal>
                <PostCard post={lead} eager feature />
              </Reveal>
            )}

            {posts.length > 0 && (
              <div className="blog-grid">
                {posts.map((post, i) => (
                  <Reveal key={post.slug} delay={Math.min(i, 5) * 0.05}>
                    <PostCard post={post} eager={page === 1 && i < 3} />
                  </Reveal>
                ))}
              </div>
            )}

            {pageCount > 1 && (
              <nav className="pager" aria-label="Blog pages">
                <button
                  className="pager__btn"
                  disabled={page === 1}
                  onClick={() => goTo(page - 1)}
                >
                  ← Newer
                </button>
                <span className="pager__status">
                  Page {page} of {pageCount}
                </span>
                <button
                  className="pager__btn"
                  disabled={page === pageCount}
                  onClick={() => goTo(page + 1)}
                >
                  Older →
                </button>
              </nav>
            )}
          </div>
        </section>

        <FinalCta location="blog_index_cta" />
      </main>
    </>
  );
}
