import { Link } from 'react-router';
import Reveal from './Reveal.jsx';
import { VideoCta, AuditCta } from './Cta.jsx';
import { BRAND_ICONS } from './BrandIcons.jsx';
import { publishedProjects } from '../data/work.js';

/* A checkmark, drawn to sit on the first line of a list item. */
const Check = () => (
  <svg className="door__check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
);

/* Three film stills, fanned, as the video door's artwork. */
function FilmFan() {
  const films = publishedProjects('video').filter((p) => p.thumb).slice(1, 4);
  if (films.length < 3) return null;
  return (
    <div className="door__art door__fan" aria-hidden="true">
      {films.map((p) => (
        <img key={p.slug} src={p.thumb} alt="" width="480" height="853" loading="lazy" decoding="async" />
      ))}
    </div>
  );
}

/* App tiles for the tools automations run inside, as the automation door's artwork. */
const TOOLS = ['HubSpot', 'Slack', 'Sheets', 'Notion'];
function ToolStack() {
  return (
    <div className="door__art door__tools" aria-hidden="true">
      {TOOLS.map((tool) => (
        <span className="door__tool" key={tool}>{BRAND_ICONS[tool]}</span>
      ))}
    </div>
  );
}

/**
 * Two services, two doors. Video comes first and carries the dark,
 * featured panel; automation sits beside it. Each door has its promise,
 * three proof points and its own call to action.
 */
export default function ServiceDoors() {
  return (
    <section className="section section--light" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <div className="head--center">
          <Reveal as="p" className="kicker">Services</Reveal>
          <Reveal as="h2" className="section__title" id="services-title" delay={0.04}>
            One studio. Two ways to grow.
          </Reveal>
          <Reveal as="p" className="section__sub" delay={0.08}>
            Video brings customers in. Automation gives your team its time back.
          </Reveal>
        </div>

        <div className="doors">
          <Reveal as="article" className="door door--video on-dark" aria-labelledby="door-video">
            <FilmFan />
            <h3 className="door__name" id="door-video">Video promotions</h3>
            <p className="door__promise">
              Promo videos that make people stop, understand and buy.
            </p>
            <ul className="door__points">
              <li><Check />Built around one clear message</li>
              <li><Check />Made in your real brand: your colours, your product, your words</li>
              <li><Check />Delivered ready to publish on every platform</li>
            </ul>
            <div className="door__actions">
              <VideoCta location="home_door" className="btn btn--primary" />
              <Link className="textlink" to="/video">
                See what we make <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal as="article" className="door door--automation" delay={0.08} aria-labelledby="door-automation">
            <ToolStack />
            <h3 className="door__name" id="door-automation">Automation</h3>
            <p className="door__promise">
              Stop burning business hours on unbillable busywork.
            </p>
            <ul className="door__points">
              <li><Check />Custom automations for client reporting, onboarding and lead routing</li>
              <li><Check />Built inside the tools you already use. Zero new tools.</li>
              <li><Check />Done for you, or you don&rsquo;t pay</li>
            </ul>
            <div className="door__actions">
              <AuditCta location="home_door" className="btn btn--primary" />
              <Link className="textlink" to="/automation">
                See how it works <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
