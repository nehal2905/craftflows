import { useParams } from 'react-router';
import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import FilmPlayer from '../components/FilmPlayer.jsx';
import FinalCta from '../components/FinalCta.jsx';
import NotFound from './NotFound.jsx';
import {
  getProject,
  isProjectLive,
  clientLabel,
} from '../data/work.js';
import { SITE, has } from '../data/site.js';

const ORIGIN = SITE.origin;
const SHOW_DRAFTS = import.meta.env.DEV;

export default function WorkCase() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const live = isProjectLive(project);
  /* Drafts are previewable in `npm run dev` so the owner can check the
     case before publishing. On a production build they 404. */
  if (!live && !SHOW_DRAFTS) return <NotFound />;

  // clientLabel falls back to the industry, so drop repeats
  const meta = [...new Set([clientLabel(project), project.format, project.industry].filter(Boolean))]
    .join(' · ');
  const url = `${ORIGIN}/work/${project.slug}`;
  const video = project.video;

  return (
    <>
      <Seo
        title={`${project.title} | Crafted Flows`}
        description={project.idea || project.challenge || project.title}
        path={`/work/${project.slug}`}
        image={project.poster || '/assets/og.png'}
        noindex={!live}
      />
      {live && video && (video.mp4 || video.webm) && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: project.title,
            description: project.idea || project.challenge || project.title,
            thumbnailUrl: project.poster ? [`${ORIGIN}${project.poster}`] : undefined,
            uploadDate: project.date || undefined,
            duration: video.duration || undefined,
            contentUrl: video.mp4
              ? `${ORIGIN}${video.mp4}`
              : `${ORIGIN}${video.webm}`,
            embedUrl: url,
            publisher: { '@id': `${ORIGIN}/#organization` },
          }}
        />
      )}

      <main id="top">
        {!live && (
          <p className="work-draft" style={{ margin: 0, borderRadius: 0 }}>
            Draft preview · not on the live site. Publish by setting{' '}
            <code>status: &apos;published&apos;</code> and a poster in{' '}
            <code>src/data/work.js</code>.
          </p>
        )}

        <section className="section svc-hero" aria-labelledby="case-title">
          <div className="wrap">
            {project.concept && (
              <Reveal as="p" className="case__label" delay={0.02}>
                Concept film · not commissioned by or affiliated with {project.client}
              </Reveal>
            )}
            <Reveal as="h1" className="case__title" id="case-title" delay={0.04}>
              {project.title}
            </Reveal>
            {meta && (
              <Reveal as="p" className="case__meta" delay={0.1}>{meta}</Reveal>
            )}
          </div>
        </section>

        {(project.poster || video) && (
          <div className="wrap case__film">
            <Reveal>
              <FilmPlayer
                video={video}
                poster={project.poster}
                title={project.title}
                aspect={project.aspect || '16:9'}
                event="film_play"
                eventParams={{ project: project.slug, location: 'case' }}
              />
            </Reveal>
          </div>
        )}

        <section className="section section--tight">
          <div className="wrap">
            <div className="case__facts">
              {project.challenge && (
                <Reveal className="case__fact">
                  <h2>The challenge</h2>
                  <p>{project.challenge}</p>
                </Reveal>
              )}
              {project.idea && (
                <Reveal className="case__fact" delay={0.06}>
                  <h2>The idea</h2>
                  <p>{project.idea}</p>
                </Reveal>
              )}
              {has(project.made) && (
                <Reveal className="case__fact" delay={0.1}>
                  <h2>What we made</h2>
                  <ul>
                    {project.made.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {project.result && (
                <Reveal className="case__fact" delay={0.14}>
                  <h2>The result</h2>
                  <p className="case__result">{project.result}</p>
                </Reveal>
              )}
            </div>

            {project.quote?.text && (
              <Reveal as="figure" className="case__quote" delay={0.1}>
                <blockquote style={{ margin: 0 }}>
                  <p>{project.quote.text}</p>
                </blockquote>
                {(project.quote.name || project.quote.role) && (
                  <footer>
                    {[project.quote.name, project.quote.role].filter(Boolean).join(', ')}
                  </footer>
                )}
              </Reveal>
            )}

            {has(project.stills) && (
              <div className="case__stills" aria-label="Key frames">
                {project.stills.map((still) => (
                  <img
                    key={still.src}
                    src={still.src}
                    alt={still.alt || ''}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        <FinalCta
          location="work_case_cta"
          title={
            project.service === 'automation'
              ? <>Your busywork could be next.</>
              : <>Your brand could be next.</>
          }
        />
      </main>
    </>
  );
}
