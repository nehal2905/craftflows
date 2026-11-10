import Reveal from './Reveal.jsx';
import BriefForm from './BriefForm.jsx';
import { SITE, has } from '../data/site.js';
import { trackEvent } from '../lib/analytics.js';

/**
 * The video brief form with the other ways to reach the studio beside
 * it. The video booking link and the response time appear only once
 * the owner has set them in src/data/site.js.
 *
 * @param {'h1'|'h2'} heading  h1 when this section opens the page
 */
export default function BriefSection({
  location,
  heading: Heading = 'h2',
  title = 'Start a video project',
  sub = 'Tell us the goal and where the video will run. We take it from there.',
  divider = true,
  className = 'section',
}) {
  return (
    <section className={className} id="brief" aria-labelledby="brief-title">
      {divider && <div className="divider" aria-hidden="true" />}
      <div className="wrap">
        <Reveal>
          <Heading className="section__title" id="brief-title">{title}</Heading>
          <p className="section__sub">{sub}</p>
        </Reveal>

        <div className="brief">
          <BriefForm location={location} />

          <aside className="brief__aside" aria-label="Other ways to reach us">
            {has(SITE.videoBookingUrl) && (
              <div className="aside-item">
                <h3>Prefer to talk?</h3>
                <p>Book a 15-minute video call and brief us in person.</p>
                <a
                  className="textlink"
                  href={SITE.videoBookingUrl}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackEvent('book_video_call', { service: 'video', location })}
                >
                  Book a 15-minute video call <span aria-hidden="true">→</span>
                </a>
              </div>
            )}

            <div className="aside-item">
              <h3>Here for automation?</h3>
              <p>Book a 15-minute audit. We find the one workflow worth automating first.</p>
              <a
                className="textlink"
                href={SITE.auditUrl}
                target="_blank"
                rel="noopener"
                onClick={() =>
                  trackEvent('book_automation_audit', { service: 'automation', location })
                }
              >
                Book an automation audit <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="aside-item">
              <h3>Email</h3>
              <p>
                Write to us at any time.
                {has(SITE.responseTime) && ` ${SITE.responseTime}`}
              </p>
              <a className="textlink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
