import { lazy, Suspense } from 'react';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import Problem from '../components/Problem.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import Offer from '../components/Offer.jsx';
import Faq from '../components/Faq.jsx';
import Book from '../components/Book.jsx';
import { SITE } from '../data/site.js';
import { AUTOMATION_FAQS, faqSchema } from '../data/faqs.js';

/* Below-fold sections stay lazy so the hero paints first. */
const RoiCalculator = lazy(() => import('../components/RoiCalculator.jsx'));
const LeadMagnet = lazy(() => import('../components/LeadMagnet.jsx'));

const ORIGIN = SITE.origin;

export default function Automation() {
  return (
    <>
      <Seo
        title="Business Automation Studio | Crafted Flows"
        description="Custom automations for client reporting, onboarding and lead routing, built inside the tools you already use. Done for you, or you don't pay."
        path="/automation"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Business automation',
          serviceType: 'Business process automation',
          provider: { '@id': `${ORIGIN}/#organization` },
          url: `${ORIGIN}/automation`,
          description:
            'Done-for-you custom automations for client reporting, onboarding and lead routing, wired into the tools you already use.',
          areaServed: 'Worldwide',
        }}
      />
      <JsonLd data={faqSchema(AUTOMATION_FAQS)} />

      <main id="top">
        <section className="section svc-hero" aria-labelledby="automation-title">
          <div className="wrap">
            <Reveal as="h1" className="section__title" id="automation-title" delay={0.04}>
              Stop burning business hours on unbillable busywork.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.1}>
              We build the automations that run your client reporting, onboarding
              and lead routing, inside the tools you already use.{' '}
              <strong>Done for you, or you don&rsquo;t pay.</strong>
            </Reveal>
          </div>
        </section>

        <Problem />
        <HowItWorks />

        <Suspense fallback={null}>
          <RoiCalculator />
        </Suspense>

        <Offer />
        <Faq />

        <Suspense fallback={null}>
          <LeadMagnet />
        </Suspense>

        <Book />
      </main>
    </>
  );
}
