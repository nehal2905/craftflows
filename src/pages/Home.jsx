import { lazy, Suspense } from 'react';
import HomeHero from '../components/HomeHero.jsx';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import { HOME_FAQS, faqSchema } from '../data/faqs.js';

/* Everything below the fold loads as a separate chunk so the hero (the
   LCP content) isn't gated on parsing code the visitor can't see yet. */
const HomeSections = lazy(() => import('../components/HomeSections.jsx'));

export default function Home() {
  return (
    <main id="top">
      {/* Mirrors the static tags in index.html so returning to "/" from
          another route restores the original metadata. The landing page
          title stays just "Crafted Flows" (owner's choice). */}
      <Seo
        title="Crafted Flows"
        description={
          'Crafted Flows makes promotional videos that win your business customers, and builds the automations that give your team its time back. Done for you, start to finish.'
        }
        path="/"
      />
      <JsonLd data={faqSchema(HOME_FAQS)} />

      <HomeHero />
      <Suspense fallback={null}>
        <HomeSections />
      </Suspense>
    </main>
  );
}
