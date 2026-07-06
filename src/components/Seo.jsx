import { useEffect } from 'react';

const ORIGIN = 'https://craftedflows.com';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-route SEO metadata for a React 18 SPA (no helmet dependency).
 * Each page mounts one <Seo>; it syncs title, description, robots,
 * canonical, and the social-card tags to the head. The static tags in
 * index.html act as the crawl-time defaults for "/" and these values
 * simply mirror them there, so the landing page is unchanged.
 */
export default function Seo({
  title,
  description,
  path = '/',
  noindex = false,
  image = '/assets/og.png',
  type = 'website',
}) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    const url = ORIGIN + path;
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const imageUrl = image.startsWith('http') ? image : ORIGIN + image;
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
  }, [title, description, path, noindex, image, type]);

  return null;
}
