import { useEffect } from 'react';

/**
 * Injects a JSON-LD structured-data block into <head> for the lifetime of
 * the page that renders it. Pass any schema.org object (or an array of
 * them via multiple instances).
 */
export default function JsonLd({ data }) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.text = json;
    document.head.appendChild(el);
    return () => el.remove();
  }, [json]);

  return null;
}
