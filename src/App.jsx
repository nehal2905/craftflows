import { lazy, Suspense } from 'react';
import ScrollProgress from './components/ScrollProgress.jsx';
import TopBar from './components/TopBar.jsx';
import Hero from './components/Hero.jsx';

/* Everything below the fold loads as a separate chunk so the hero (the
   LCP content) isn't gated on parsing code the visitor can't see yet. */
const Problem = lazy(() => import('./components/Problem.jsx'));
const HowItWorks = lazy(() => import('./components/HowItWorks.jsx'));
const RoiCalculator = lazy(() => import('./components/RoiCalculator.jsx'));
const Offer = lazy(() => import('./components/Offer.jsx'));
const Faq = lazy(() => import('./components/Faq.jsx'));
const LeadMagnet = lazy(() => import('./components/LeadMagnet.jsx'));
const Book = lazy(() => import('./components/Book.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true"></div>

      <ScrollProgress />
      <TopBar />

      <main id="top">
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

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
