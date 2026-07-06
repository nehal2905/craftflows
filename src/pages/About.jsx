import Seo from '../components/Seo.jsx';
import PagePlaceholder from '../components/PagePlaceholder.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About | Crafted Flows"
        description="The team and thinking behind Crafted Flows — custom business automation and AI workflows, done for you."
        path="/about"
        noindex
      />
      <PagePlaceholder eyebrow="About" title="The people behind the flows.">
        We're writing this page right now. In the meantime, everything you need
        to know about how we work lives on the home page.
      </PagePlaceholder>
    </>
  );
}
