import { Link } from 'react-router';
import Reveal from './Reveal.jsx';
import FilmPlayer from './FilmPlayer.jsx';
import { featuredProject, publishedProjects } from '../data/work.js';
import { trackEvent } from '../lib/analytics.js';

/**
 * Home "Selected work": one film, played large. The preview loops
 * silently until the visitor presses play; then the full film loads
 * with sound. The film strip in the hero already shows the range, so
 * this section goes deep on one piece instead of repeating the grid.
 * Renders nothing when no film is published.
 */
export default function FeaturedWork({ location = 'home_work' }) {
  const project = featuredProject();
  if (!project) return null;

  const total = publishedProjects().length;
  const summary = project.summary || project.challenge;
  const facts = [
    { term: 'Format', detail: project.format },
    { term: 'Industry', detail: project.industry },
    project.made?.length > 0 && { term: 'Delivered', detail: project.made.join(', ') },
  ].filter((fact) => fact && fact.detail);

  return (
    <section className="section feature" id="work" aria-labelledby="work-title">
      <div className="wrap feature__grid">
        <Reveal className="feature__media">
          <FilmPlayer
            video={project.video}
            poster={project.poster}
            loop={project.preview}
            title={project.title}
            aspect={project.aspect}
            eventParams={{ project: project.slug, location }}
          />
        </Reveal>

        <div className="feature__copy">
          <Reveal as="p" className="kicker">
            Selected work
            {project.concept && <span className="kicker__aside"> · Concept film</span>}
          </Reveal>
          <Reveal as="h2" className="section__title" id="work-title" delay={0.04}>
            {project.title}
          </Reveal>
          {summary && (
            <Reveal as="p" className="section__sub" delay={0.08}>{summary}</Reveal>
          )}

          <Reveal as="dl" className="feature__facts" delay={0.12}>
            {facts.map((fact) => (
              <div key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>{fact.detail}</dd>
              </div>
            ))}
          </Reveal>

          <Reveal className="feature__actions" delay={0.16}>
            <Link
              className="btn btn--primary"
              to={`/work/${project.slug}`}
              onClick={() =>
                trackEvent('portfolio_open', { service: 'video', project: project.slug, location })
              }
            >
              Open the case study <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            {total > 1 && (
              <Link className="textlink" to="/work">
                See other videos <span aria-hidden="true">→</span>
              </Link>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
