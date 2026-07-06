import { Link, useSearchParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import { POSTS, formatDate } from '../lib/blog.js';

const ORIGIN = 'https://craftedflows.com';
const PER_PAGE = 9;

export function PostCard({ post, eager = false, headingLevel: H = 'h2' }) {
  return (
    <Link className="post-card card" to={`/blog/${post.slug}`}>
      <span className="post-card__media">
        <img
          src={post.image}
          alt={post.imageAlt}
          width="1200"
          height="630"
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
        />
      </span>
      <span className="post-card__body">
        <span className="post-card__meta">
          <span className="post-card__category">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </span>
        <H className="post-card__title">{post.title}</H>
        <span className="post-card__desc">{post.description}</span>
        {post.tags.length > 0 && (
          <span className="post-card__tags">
            {post.tags.map((t) => (
              <span className="tag" key={t}>{t}</span>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const pageCount = Math.max(1, Math.ceil(POSTS.length / PER_PAGE));
  const page = Math.min(pageCount, Math.max(1, Number(params.get('page')) || 1));
  const posts = POSTS.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goTo = (p) => {
    setParams(p === 1 ? {} : { page: String(p) });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Seo
        title="Automation Blog | Crafted Flows"
        description="Practical writing on business automation, AI workflows, and the tools we build with—from the team at Crafted Flows."
        path="/blog"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Crafted Flows Blog',
          description: 'Practical writing on business automation and AI workflows.',
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
        <section className="section svc-hero" aria-labelledby="blog-title">
          <div className="wrap">
            <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Blog</span>
            </Reveal>

            <Reveal as="p" className="eyebrow" delay={0.04}>The blog</Reveal>
            <Reveal as="h1" className="section__title" id="blog-title" delay={0.08}>
              Ideas worth automating.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.12}>
              Practical writing on automation strategy, AI workflows, and the
              tools we build with every week.
            </Reveal>

            <div className="blog-grid">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={0.12 + Math.min(i, 5) * 0.05}>
                  <PostCard post={post} eager={page === 1 && i < 3} />
                </Reveal>
              ))}
            </div>

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
      </main>
    </>
  );
}
