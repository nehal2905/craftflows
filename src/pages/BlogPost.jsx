import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';
import { PostCard } from './Blog.jsx';
import {
  getPostMeta,
  loadPost,
  getAdjacent,
  getRelated,
  formatDate,
} from '../lib/blog.js';

const ORIGIN = 'https://www.craftedflows.com';

/* ── Table of contents with scrollspy ─────────────────────────── */
function Toc({ headings }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const probe = window.scrollY + window.innerHeight * 0.25;
      let current = headings[0]?.id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= probe) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc__label">On this page</p>
      <ul>
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'toc__sub' : undefined}>
            <a href={`#${h.id}`} className={active === h.id ? 'is-active' : undefined}>
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── Share row: LinkedIn, X, copy link ─────────────────────────── */
function ShareRow({ url, title }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable (http, permissions) - leave button as-is */
    }
  };

  const enc = encodeURIComponent;
  return (
    <div className="share" aria-label="Share this article">
      <span className="share__label">Share</span>
      <a
        className="share__btn"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
        </svg>
      </a>
      <a
        className="share__btn"
        href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
        </svg>
      </a>
      <button className="share__btn" onClick={copy} aria-label="Copy link">
        {copied ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4.5 12.5 5 5 10-11" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>
      <span className="share__copied" role="status">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const meta = getPostMeta(slug);
  const [body, setBody] = useState(null);

  useEffect(() => {
    let alive = true;
    setBody(null);
    loadPost(slug).then((mod) => {
      if (alive && mod) setBody({ html: mod.html, headings: mod.headings });
    });
    return () => {
      alive = false;
    };
  }, [slug]);

  if (!meta) return <NotFound />;

  const url = `${ORIGIN}/blog/${meta.slug}`;
  const { prev, next } = getAdjacent(slug);
  const related = getRelated(slug);

  return (
    <>
      <Seo
        title={`${meta.title} | Crafted Flows`}
        description={meta.description}
        path={`/blog/${meta.slug}`}
        image={meta.image}
        type="article"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.title,
          description: meta.description,
          image: `${ORIGIN}${meta.image}`,
          datePublished: meta.date,
          dateModified: meta.updated,
          author: { '@type': 'Organization', name: meta.author, url: ORIGIN },
          publisher: {
            '@type': 'Organization',
            name: 'Crafted Flows',
            url: ORIGIN,
            logo: { '@type': 'ImageObject', url: `${ORIGIN}/assets/favicon-512.png` },
          },
          keywords: meta.tags.join(', '),
          articleSection: meta.category,
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog` },
            { '@type': 'ListItem', position: 3, name: meta.title, item: url },
          ],
        }}
      />

      <main id="top">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="section svc-hero post-hero">
          <div className="wrap wrap--narrow">
            <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <Link to="/blog">Blog</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{meta.category}</span>
            </Reveal>

            <Reveal as="p" className="eyebrow" delay={0.04}>{meta.category}</Reveal>
            <Reveal as="h1" className="section__title post-hero__title" delay={0.08}>
              {meta.title}
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.12}>
              {meta.description}
            </Reveal>

            <Reveal className="post-hero__meta" delay={0.16}>
              <span>{meta.author}</span>
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              <span>{meta.readingTime} min read</span>
            </Reveal>
          </div>
        </section>

        {/* ── Featured image ──────────────────────────────────── */}
        <div className="wrap">
          <Reveal className="post-figure">
            <img
              src={meta.image}
              alt={meta.imageAlt}
              width="1200"
              height="630"
              decoding="async"
            />
          </Reveal>
        </div>

        {/* ── Body + TOC ──────────────────────────────────────── */}
        <section className="section section--tight">
          <div className="wrap post-layout">
            <article
              className="prose"
              /* HTML is compiled from our own markdown at build time */
              dangerouslySetInnerHTML={body ? { __html: body.html } : undefined}
            >
              {body ? undefined : <p className="prose__loading">Loading article…</p>}
            </article>

            <aside className="post-aside">
              {body && <Toc headings={body.headings} />}
              {meta.tags.length > 0 && (
                <div className="post-aside__tags">
                  {meta.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              )}
              <ShareRow url={url} title={meta.title} />
            </aside>
          </div>
        </section>

        {/* ── Prev / next ─────────────────────────────────────── */}
        {(prev || next) && (
          <section className="section section--tight" aria-label="More articles">
            <div className="divider" aria-hidden="true" />
            <div className="wrap post-pager">
              {prev ? (
                <Link className="post-pager__link card" to={`/blog/${prev.slug}`} rel="prev">
                  <span className="post-pager__dir">← Previous article</span>
                  <span className="post-pager__title">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link className="post-pager__link post-pager__link--next card" to={`/blog/${next.slug}`} rel="next">
                  <span className="post-pager__dir">Next article →</span>
                  <span className="post-pager__title">{next.title}</span>
                </Link>
              ) : (
                <span />
              )}
            </div>
          </section>
        )}

        {/* ── Related posts ───────────────────────────────────── */}
        {related.length > 0 && (
          <section className="section section--tight" aria-labelledby="related-title">
            <div className="divider" aria-hidden="true" />
            <div className="wrap">
              <Reveal as="p" className="eyebrow">Keep reading</Reveal>
              <Reveal as="h2" className="section__title" id="related-title" delay={0.04}>
                Related articles.
              </Reveal>
              <div className="blog-grid">
                {related.map((post, i) => (
                  <Reveal key={post.slug} delay={0.08 + i * 0.06}>
                    <PostCard post={post} headingLevel="h3" />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
