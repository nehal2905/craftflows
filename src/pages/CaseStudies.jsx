import Seo from '../components/Seo.jsx';
import PagePlaceholder from '../components/PagePlaceholder.jsx';

export default function CaseStudies() {
  return (
    <>
      <Seo
        title="Case Studies | Crafted Flows"
        description="Real results from Crafted Flows automation projects - the hours saved, the workflows replaced, and how we did it."
        path="/case-studies"
        noindex
      />
      <PagePlaceholder eyebrow="Case studies" title="Proof, in the works.">
        We're documenting client results now and will publish them here. Want
        the details early? Book a free audit and we'll walk you through them.
      </PagePlaceholder>
    </>
  );
}
