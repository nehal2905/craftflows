import POSTS from 'virtual:blog-index';

/* Each post compiles to its own chunk; it only downloads when the
   article is opened. */
const loaders = import.meta.glob('/content/blog/*.md');

const loaderBySlug = {};
for (const [file, loader] of Object.entries(loaders)) {
  loaderBySlug[file.split('/').pop().replace(/\.md$/, '')] = loader;
}

/** Published posts, newest first (metadata only). */
export { POSTS };

export const getPostMeta = (slug) => POSTS.find((p) => p.slug === slug);

/** Loads a post's compiled body ({ frontmatter, headings, html }). */
export const loadPost = (slug) => {
  const loader = loaderBySlug[slug];
  return loader ? loader() : Promise.resolve(null);
};

/** Neighbors in date order: prev = older post, next = newer post. */
export function getAdjacent(slug) {
  const i = POSTS.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: POSTS[i + 1] ?? null,
    next: POSTS[i - 1] ?? null,
  };
}

/** Related posts ranked by shared category (heavier) and shared tags. */
export function getRelated(slug, limit = 3) {
  const current = getPostMeta(slug);
  if (!current) return [];
  return POSTS.filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post);
}

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
