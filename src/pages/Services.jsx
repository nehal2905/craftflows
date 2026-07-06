import { Link } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import { SERVICES } from '../data/services.js';

const ORIGIN = 'https://craftedflows.com';

/**
 * Services index — links to every service page. Stays noindex while the
 * service pages carry placeholder copy; flip alongside the service
 * `draft` flags in src/data/services.js.
 */
export default function Services() {
  return (
    <>
      <Seo
        title="Automation Services | Crafted Flows"
        description="Everything Crafted Flows builds: AI workflow automation, CRM automation, Zapier and Make builds, lead generation systems, and custom AI agents."
        path="/services"
        noindex
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/services` },
          ],
        }}
      />

      <main id="top">
        <section className="section svc-hero" aria-labelledby="services-title">
          <div className="wrap">
            <Reveal as="nav" className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Services</span>
            </Reveal>

            <Reveal as="p" className="eyebrow" delay={0.04}>Services</Reveal>
            <Reveal as="h1" className="section__title" id="services-title" delay={0.08}>
              Everything we automate.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.12}>
              {/* [PLACEHOLDER] intro copy for the services index */}
              Six ways we take repetitive work off your team&rsquo;s plate&mdash;each one
              designed, built, and maintained for you.
            </Reveal>

            <div className="svc-grid">
              {SERVICES.map((svc, i) => (
                <Reveal key={svc.slug} delay={0.12 + i * 0.05}>
                  <Link className="svc-card svc-card--link card" to={`/services/${svc.slug}`}>
                    <h2 className="svc-card__title">{svc.name}</h2>
                    <p className="svc-card__body">{svc.tagline}</p>
                    <span className="svc-card__more" aria-hidden="true">
                      Explore <span className="btn__arrow">→</span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
