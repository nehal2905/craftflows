/**
 * The portfolio. One entry per project; the site renders from this list.
 * Source films live in public/assets/work/<slug>/.
 *
 * status      'draft' | 'published'. Only 'published' reaches the live site.
 * concept     true for concept films; the site labels them quietly as "Concept film"
 * permission  true only if the named brand agreed to appear; without it the
 *             site shows the industry, never the brand, in the "client" slot
 * featured    true for the one film the home page plays large
 * summary     one line under the featured film's title on the home page
 * thumb       480px WebP of the poster, for small tiles (home reel)
 * preview     5 s muted 480px loop; plays on hover / while in view
 *
 * Order matters: the home film strip and the service-card stills follow it,
 * so the strongest, most colourful films come first.
 *
 * Owner decision (2026-11-11): every film is labelled as a concept film,
 * subtly: in captions, card notes and the case-page meta line, never as
 * a badge over the artwork.
 */

const film = (slug, duration) => ({
  poster: `/assets/work/${slug}/poster.jpg`,
  thumb: `/assets/work/${slug}/thumb.webp`,
  preview: { mp4: `/assets/work/${slug}/preview.mp4` },
  video: { mp4: `/assets/work/${slug}/film.mp4`, duration },
});

/** A 10 to 15 s, 9:16 promo film for a startup. */
const promo = ({ slug, client, industry, idea, summary, featured = false, duration = 'PT15S' }) => ({
  slug,
  status: 'published',
  featured,
  service: 'video',
  title: `${client}: promo film`,
  client,
  clientNote: '',
  concept: true,
  permission: false,
  industry,
  format: 'Promo film · 9:16 · 10–15 s',
  aspect: '9:16',
  ...film(slug, duration),
  summary: summary || '',
  challenge: '',
  idea: idea || `A ${industry.toLowerCase()} promo built around one clear message, cut for 9:16.`,
  made: ['Master cut (9:16)', 'Poster frame'],
  result: '',
  quote: null,
  stills: [],
  date: '2026-11-10',
});

export const PROJECTS = [
  promo({
    slug: 'anywhere',
    client: 'Anywhere',
    industry: 'Travel',
    featured: true,
    summary:
      'Your places, plans and memories, on one living map. Fifteen seconds for a travel app, told with a single 3D globe.',
  }),
  promo({ slug: 'bucketlistt', client: 'Bucketlistt', industry: 'Travel' }),
  promo({ slug: 'coach', client: 'Coach', industry: 'Coaching' }),
  promo({ slug: 'theo', client: 'Theo', industry: 'SaaS' }),
  promo({ slug: 'versine', client: 'Versine', industry: 'SaaS' }),
  promo({ slug: 'evergrove', client: 'Evergrove', industry: 'Consumer' }),
  promo({ slug: 'result', client: 'Result', industry: 'SaaS' }),
  promo({ slug: 'onto', client: 'Onto', industry: 'SaaS' }),
  promo({ slug: 'kiwi', client: 'Kiwi', industry: 'Consumer' }),
  promo({ slug: 'hio', client: 'HiO', industry: 'SaaS' }),
  promo({ slug: 'volaren', client: 'Volaren', industry: 'SaaS' }),
  promo({ slug: 'fleety', client: 'Fleety', industry: 'Mobility' }),
  promo({ slug: 'denta', client: 'Denta', industry: 'Health' }),
  promo({ slug: 'kairos-health', client: 'Kairos Health', industry: 'Health' }),
  promo({ slug: 'quivly', client: 'Quivly', industry: 'SaaS' }),
  promo({ slug: 'proto', client: 'Proto', industry: 'SaaS' }),
  promo({ slug: 'veeza-ai', client: 'Veeza AI', industry: 'AI' }),
  promo({ slug: 'astraea', client: 'Astraea', industry: 'SaaS' }),
  promo({ slug: 'conus', client: 'CONUS', industry: 'SaaS' }),
  promo({ slug: 'definite', client: 'Definite', industry: 'SaaS' }),

  {
    slug: 'clerra',
    status: 'published',
    service: 'video',
    title: 'Clerra: launch film',
    client: 'Clerra',
    clientNote: 'Fictional product showcase',
    concept: true,
    permission: true,
    industry: 'Product launch',
    format: 'Launch film · 9:16 · 30 s',
    aspect: '9:16',
    ...film('clerra', 'PT30S'),
    challenge: 'Show what a product launch film feels like when the brand is invented end to end.',
    idea: 'One clear message, full sound, built as a showcase of the studio\'s launch-film style. Clerra is a fictional product, invented for this film.',
    made: ['Master cut (9:16, 30 s)', 'Poster frame', 'Original music'],
    result: '',
    quote: null,
    stills: [],
    date: '2026-11-10',
  },
];

const isLive = (p) => p.status === 'published' && Boolean(p.poster);

export const publishedProjects = (service) =>
  PROJECTS.filter((p) => isLive(p) && (!service || p.service === service));

export const draftProjects = (service) =>
  PROJECTS.filter((p) => !isLive(p) && (!service || p.service === service));

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);

/** The film the home page plays large: the one marked featured, else the newest live one. */
export const featuredProject = () => {
  const live = publishedProjects('video');
  return live.find((p) => p.featured) || live[0] || null;
};

export const isProjectLive = isLive;

export function clientLabel(p) {
  if (p.concept) return 'Concept film';
  if (p.permission && p.client) {
    return p.clientNote ? `${p.client} · ${p.clientNote}` : p.client;
  }
  return p.industry || '';
}
