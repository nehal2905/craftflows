import Seo from '../components/Seo.jsx';
import PagePlaceholder from '../components/PagePlaceholder.jsx';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact | Crafted Flows"
        description="Get in touch with Crafted Flows — book a free automation audit or email the team directly."
        path="/contact"
        noindex
      />
      <PagePlaceholder eyebrow="Contact" title="Let's talk workflows.">
        A dedicated contact page is on its way. For now, the fastest route is
        booking a free audit from the home page, or emailing{' '}
        <a href="mailto:admin@craftedflows.com">admin@craftedflows.com</a>.
      </PagePlaceholder>
    </>
  );
}
