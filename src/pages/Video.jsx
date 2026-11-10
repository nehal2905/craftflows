import Seo from '../components/Seo.jsx';
import JsonLd from '../components/JsonLd.jsx';
import Reveal from '../components/Reveal.jsx';
import Magnetic from '../components/Magnetic.jsx';
import FilmPlayer from '../components/FilmPlayer.jsx';
import VideoPreview from '../components/VideoPreview.jsx';
import WorkSection from '../components/Work.jsx';
import Flow from '../components/Flow.jsx';
import Faq from '../components/Faq.jsx';
import BriefSection from '../components/BriefSection.jsx';
import { VideoCta } from '../components/Cta.jsx';
import { SITE, has } from '../data/site.js';
import { FORMATS, BENEFITS, VIDEO_STEPS, VIDEO_FAQS } from '../data/video.js';
import { featuredProject } from '../data/work.js';
import { faqSchema } from '../data/faqs.js';

const ORIGIN = SITE.origin;

function Packages() {
  if (!has(SITE.packages)) return null;

  return (
    <section className="section" id="packages" aria-labelledby="packages-title">
      <div className="divider" aria-hidden="true" />
      <div className="wrap">
        <Reveal as="h2" className="section__title" id="packages-title">
          Packages
        </Reveal>
        <Reveal as="p" className="section__sub" delay={0.04}>
          Pick a starting point, or tell us the goal and we&rsquo;ll shape one.
        </Reveal>

        <div className="packages">
          {SITE.packages.map((pkg) => (
            <Reveal as="article" className="package" key={pkg.name}>
              <h3 className="package__name">{pkg.name}</h3>
              <p className="package__price">
                {pkg.price || 'Get a quote'}
                {pkg.turnaround ? ` · ${pkg.turnaround}` : ''}
              </p>
              {has(pkg.includes) && (
                <ul className="package__list">
                  {pkg.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              <VideoCta location="video_packages" className="btn btn--primary">
                {pkg.price ? 'Start with this' : 'Get a quote'}
              </VideoCta>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Video() {
  /* The showreel when there is one, otherwise the featured film. */
  const featured = featuredProject();
  const reel =
    SITE.showreelFull ||
    (featured && {
      ...featured.video,
      poster: featured.poster,
      loop: featured.preview,
      title: featured.title,
      aspect: featured.aspect,
      slug: featured.slug,
    });

  return (
    <>
      <Seo
        title="Promotional Video Production | Crafted Flows"
        description="Promo videos that make people stop, understand and buy. Social ads, brand films, explainers and product launches, done for you and ready to publish."
        path="/video"
        image={reel?.poster || '/assets/og.png'}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Promotional video production',
          serviceType: 'Video production',
          provider: { '@id': `${ORIGIN}/#organization` },
          url: `${ORIGIN}/video`,
          description:
            'Promotional videos for businesses: social ads, brand films, product launches, explainers and more. Done for you, ready to publish.',
          areaServed: 'Worldwide',
        }}
      />
      {VIDEO_FAQS.length > 0 && <JsonLd data={faqSchema(VIDEO_FAQS)} />}

      <main id="top">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="section svc-hero" aria-labelledby="video-title">
          <div className="wrap head--center">
            <Reveal as="h1" className="section__title" id="video-title" delay={0.04}>
              Promo videos that make people stop, understand and buy.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.1}>
              Brand films, social ads, product launches and explainers, built
              around one clear message and delivered ready to publish on every
              platform. Done for you.
            </Reveal>

            <Reveal className="cta-row" delay={0.16}>
              <Magnetic>
                <VideoCta location="video_hero" />
              </Magnetic>
            </Reveal>

            {reel && (
              <Reveal delay={0.2} style={{ marginTop: 'clamp(2.5rem, 5vw, 3.5rem)', width: '100%' }}>
                <FilmPlayer
                  video={reel}
                  poster={reel.poster}
                  loop={reel.loop}
                  title={reel.title || 'Crafted Flows showreel'}
                  aspect={reel.aspect || '9:16'}
                  event="showreel_play"
                  eventParams={{ location: 'video_hero' }}
                />
              </Reveal>
            )}
          </div>
        </section>

        {/* ── What we make ─────────────────────────────────────── */}
        <section className="section section--light" id="formats" aria-labelledby="formats-title">
          <div className="wrap">
            <Reveal as="h2" className="section__title" id="formats-title">
              What we make
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.04}>
              Every format built around one clear message that sells.
            </Reveal>

            <ul className="formats">
              {FORMATS.map((format, i) => (
                <Reveal as="li" className="format" key={format.name} delay={Math.min(i, 5) * 0.04}>
                  {format.preview && (
                    <div className="format__media">
                      <VideoPreview
                        sources={format.preview}
                        poster={format.preview.poster}
                        alt={`${format.name} preview`}
                      />
                    </div>
                  )}
                  <h3 className="format__name">{format.name}</h3>
                  {format.detail && <p className="format__detail">{format.detail}</p>}
                  <p className="format__spec">{format.spec}</p>
                  <p className="format__best">Best for {format.best}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why ours work ────────────────────────────────────── */}
        <section className="section" id="why" aria-labelledby="why-title">
          <div className="divider" aria-hidden="true" />
          <div className="wrap">
            <Reveal as="h2" className="section__title" id="why-title">
              Why ours work
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.04}>
              Three things every film we make has to do.
            </Reveal>

            <div className="benefits">
              {BENEFITS.map((b, i) => (
                <Reveal className="benefit" key={b.title} delay={0.06 + i * 0.06}>
                  <h3 className="benefit__title">{b.title}</h3>
                  <p className="benefit__body">{b.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Selected video work ──────────────────────────────── */}
        <WorkSection
          service="video"
          exclude={reel?.slug ? [reel.slug] : []}
          location="video_work"
          title="Selected video work"
          sub="Real films. Open one to see the brief, the idea and the cut."
          light
        />

        {/* ── Process ──────────────────────────────────────────── */}
        <section className="section" id="process" aria-labelledby="process-title">
          <div className="divider" aria-hidden="true" />
          <div className="wrap">
            <Reveal as="h2" className="section__title" id="process-title">
              How a video gets made
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.04}>
              You approve the plan before we make anything.
            </Reveal>
            <Flow steps={VIDEO_STEPS} />
          </div>
        </section>

        <Packages />

        <Faq
          id="video-faq"
          items={VIDEO_FAQS}
          eyebrow={null}
          title="Video questions"
          light
        />

        <BriefSection location="video_brief" />
      </main>
    </>
  );
}
