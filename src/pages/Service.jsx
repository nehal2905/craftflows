import { useParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import ServiceLayout from '../components/ServiceLayout.jsx';
import NotFound from './NotFound.jsx';
import { getService } from '../data/services.js';

const ORIGIN = 'https://www.craftedflows.com';

export default function Service() {
  const { slug } = useParams();
  const service = getService(slug);

  if (!service) return <NotFound />;

  const url = `${ORIGIN}/services/${service.slug}`;

  return (
    <>
      {/* noindex while service.draft is true (placeholder copy) , 
          flip the flag in src/data/services.js once copy is final. */}
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        path={`/services/${service.slug}`}
        noindex={service.draft}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.seo.description,
          url,
          serviceType: service.name,
          provider: {
            '@type': 'Organization',
            name: 'Crafted Flows',
            url: ORIGIN,
            logo: `${ORIGIN}/assets/favicon-512.png`,
          },
          areaServed: 'Worldwide',
        }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${ORIGIN}/services` },
            { '@type': 'ListItem', position: 3, name: service.name, item: url },
          ],
        }}
      />

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: service.faqs.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }}
      />

      <ServiceLayout service={service} />
    </>
  );
}
