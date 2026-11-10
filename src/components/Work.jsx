import { Link } from 'react-router';
import Reveal from './Reveal.jsx';
import VideoPreview from './VideoPreview.jsx';
import { VideoCta, AuditCta } from './Cta.jsx';
import { publishedProjects, draftProjects, clientLabel } from '../data/work.js';
import { trackEvent } from '../lib/analytics.js';

/* Drafts are a working aid: they exist in `npm run dev` only. In a
   production build this is false and the draft code is dropped. */
const SHOW_DRAFTS = import.meta.env.DEV;

export function ProjectCard({ project, location }) {
  /* Concept films say so quietly, in the note under the title. */
  const note = project.concept
    ? [clientLabel(project), project.industry].filter(Boolean).join(' · ')
    : clientLabel(project);
  return (
    <Link
      className="work-card"
      to={`/work/${project.slug}`}
      onClick={() =>
        trackEvent('portfolio_open', {
          service: project.service,
          project: project.slug,
          location,
        })
      }
    >
      <div className={`work-card__media${project.aspect === '9:16' ? ' work-card__media--portrait' : ''}`}>
        <VideoPreview sources={project.preview} poster={project.poster} />
      </div>
      <div className="work-card__body">
        <h3 className="work-card__title">{project.title}</h3>
        {project.format && <p className="work-card__meta">{project.format}</p>}
        {note && <p className="work-card__note">{note}</p>}
      </div>
    </Link>
  );
}

/** Development-only marker for an entry that is not published yet. */
export function DraftCard({ project }) {
  const missing = [
    !project.poster && 'poster',
    !project.video && 'video',
    !project.preview && 'preview (optional)',
    !project.date && 'date',
    project.status !== 'published' && "status: 'published'",
  ].filter(Boolean);
  return (
    <div className="work-draft">
      <b>Draft · not on the live site</b>
      {project.title}
      <br />
      <Link to={`/work/${project.slug}`} style={{ textDecoration: 'underline' }}>
        Preview the case study
      </Link>
      {missing.length > 0 && (
        <>
          <br />
          Still needed in src/data/work.js:
          <ul>
            {missing.map((field) => <li key={field}>{field}</li>)}
          </ul>
        </>
      )}
    </div>
  );
}

/**
 * The grid, following the honest-fallback rules:
 *   3 or more published  full grid
 *   1 or 2 published     shown large, plus a "could be next" panel
 *   0 published          nothing (the caller hides or swaps the section)
 */
export function WorkGrid({ projects, service, location }) {
  const drafts = SHOW_DRAFTS ? draftProjects(service) : [];
  if (projects.length === 0 && drafts.length === 0) return null;

  const few = projects.length > 0 && projects.length < 3;
  const layout =
    projects.length >= 3 ? 'work-grid--full'
    : projects.length === 2 ? 'work-grid--two'
    : projects.length === 1 ? 'work-grid--one'
    : '';

  return (
    <div className={`work-grid ${layout}`}>
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={Math.min(i, 3) * 0.06}>
          <ProjectCard project={project} location={location} />
        </Reveal>
      ))}

      {few && (
        <Reveal className="work-next" delay={0.12}>
          {service === 'automation' ? (
            <>
              <p className="work-next__title">Your busywork could be next.</p>
              <AuditCta location={`${location}_next`} className="btn btn--primary" />
            </>
          ) : (
            <>
              <p className="work-next__title">Your brand could be next.</p>
              <VideoCta location={`${location}_next`} className="btn btn--primary" />
            </>
          )}
        </Reveal>
      )}

      {drafts.map((project) => <DraftCard key={project.slug} project={project} />)}
    </div>
  );
}

/**
 * "Selected work" section for the home page and /video. With no
 * published work it renders nothing at all: no empty cards, no
 * "coming soon".
 */
export default function WorkSection({
  service,
  limit = 6,
  id = 'work',
  title = 'Selected work',
  sub,
  location,
  light = false,
  exclude = [],
}) {
  const projects = publishedProjects(service)
    .filter((p) => !exclude.includes(p.slug))
    .slice(0, limit);
  const hasDrafts = SHOW_DRAFTS && draftProjects(service).length > 0;
  if (projects.length === 0 && !hasDrafts) return null;

  const total = publishedProjects().length;

  return (
    <section
      className={`section${light ? ' section--light' : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      {!light && <div className="divider" aria-hidden="true" />}
      <div className="wrap">
        <Reveal as="h2" className="section__title" id={`${id}-title`}>{title}</Reveal>
        {sub && <Reveal as="p" className="section__sub" delay={0.04}>{sub}</Reveal>}

        <WorkGrid projects={projects} service={service} location={location} />

        {total > projects.length && (
          <p style={{ marginTop: '1.5rem' }}>
            <Link className="textlink" to="/work">See all work <span aria-hidden="true">→</span></Link>
          </p>
        )}
      </div>
    </section>
  );
}
