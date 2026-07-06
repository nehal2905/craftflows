import { lazy, Suspense } from 'react';
import Hero from '../components/Hero.jsx';
import Seo from '../components/Seo.jsx';

/* Everything below the fold loads as a separate chunk so the hero (the
   LCP content) isn't gated on parsing code the visitor can't see yet. */
const Problem = lazy(() => import('../components/Problem.jsx'));
const HowItWorks = lazy(() => import('../components/HowItWorks.jsx'));
const RoiCalculator = lazy(() => import('../components/RoiCalculator.jsx'));
const Offer = lazy(() => import('../components/Offer.jsx'));
const Faq = lazy(() => import('../components/Faq.jsx'));
const LeadMagnet = lazy(() => import('../components/LeadMagnet.jsx'));
const Book = lazy(() => import('../components/Book.jsx'));

export default function Home() {
  return (
    <main id="top">
      {/* Mirrors the static tags in index.html so returning to "/" from
          another route restores the original metadata. */}
      <Seo
        title="Crafted Flows | Business Automation & AI Workflows, Done For You"
        description={
          'Crafted Flows builds custom business automation and AI workflows that run your client reporting, onboarding, and lead routing\u2014using the tools you already use. Done for you, or you don\u2019t pay.'
        }
        path="/"
      />

      <Hero />
      <Suspense fallback={null}>
        <Problem />
        <HowItWorks />
        <RoiCalculator />
        <Offer />
        <Faq />
        <LeadMagnet />
        <Book />
      </Suspense>
    </main>
  );
}
