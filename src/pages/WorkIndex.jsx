import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { WorkGrid } from '../components/Work.jsx';
import FinalCta from '../components/FinalCta.jsx';
import { publishedProjects } from '../data/work.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'video', label: 'Video' },
  { id: 'automation', label: 'Automation' },
];

export default function WorkIndex() {
  const all = publishedProjects();
  const [filter, setFilter] = useState('all');
  const projects = filter === 'all' ? all : all.filter((p) => p.service === filter);

  /* With nothing published, /work has no job. Send people to the home
     work fallback (process / CTAs) rather than an empty grid. */
  if (all.length === 0) {
    return <Navigate to="/#how-we-work" replace />;
  }

  return (
    <>
      <Seo
        title="Work | Crafted Flows"
        description="Promo films and automation work from Crafted Flows: concept films in our studio style, each with the idea behind it."
        path="/work"
      />

      <main id="top">
        <section className="section svc-hero" aria-labelledby="work-title">
          <div className="wrap">
            <Reveal as="h1" className="section__title" id="work-title" delay={0.04}>
              Selected work.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.1}>
              Films that sell, and systems that give teams their hours back.
            </Reveal>

            <Reveal delay={0.14}>
              <div className="filters" role="group" aria-label="Filter by service">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={filter === f.id}
                    onClick={() => setFilter(f.id)}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </Reveal>

            <WorkGrid projects={projects} service={filter === 'all' ? undefined : filter} location="work_index" />

            {projects.length === 0 && (
              <p className="section__sub" style={{ marginTop: '2rem' }}>
                No {filter} projects published yet. See{' '}
                <Link className="textlink" to="/video">what we make</Link>
                {' '}or{' '}
                <Link className="textlink" to="/automation">how automation works</Link>.
              </p>
            )}
          </div>
        </section>

        <FinalCta location="work_index_cta" />
      </main>
    </>
  );
}
