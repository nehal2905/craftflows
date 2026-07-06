import Seo from '../components/Seo.jsx';
import PagePlaceholder from '../components/PagePlaceholder.jsx';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Crafted Flows"
        description="That page doesn't exist. Head back to the Crafted Flows home page."
        path="/404"
        noindex
      />
      <PagePlaceholder eyebrow="404" title="This flow doesn't exist.">
        The page you're looking for was moved, renamed, or never built. The
        home page has everything that's live right now.
      </PagePlaceholder>
    </>
  );
}
