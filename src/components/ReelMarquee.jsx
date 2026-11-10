import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { trackEvent } from '../lib/analytics.js';

/* Hover previews only where hover exists; touch devices keep the stills. */
const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function ReelTile({ project, copy, index, location }) {
  const [live, setLive] = useState(false);
  const [hover, setHover] = useState(false);
  const decorative = copy > 0;

  useEffect(() => setHover(canHover()), []);

  const on = () => hover && project.preview && setLive(true);
  const off = () => setLive(false);

  return (
    <li className="reel__item" aria-hidden={decorative || undefined}>
      <Link
        className="reel-tile"
        to={`/work/${project.slug}`}
        tabIndex={decorative ? -1 : undefined}
        aria-label={project.title}
        onMouseEnter={on}
        onMouseLeave={off}
        onFocus={on}
        onBlur={off}
        onClick={() =>
          trackEvent('portfolio_open', { service: 'video', project: project.slug, location })
        }
      >
        <img
          src={project.thumb || project.poster}
          alt=""
          width="480"
          height="853"
          loading={!decorative && index < 6 ? 'eager' : 'lazy'}
          decoding="async"
        />
        {live && (
          <video
            className="reel-tile__loop"
            src={project.preview.mp4}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
          />
        )}
        <span className="reel-tile__cap">
          <b>{project.client}</b>
          <span>{project.industry}</span>
        </span>
      </Link>
    </li>
  );
}

/**
 * Hero film strip: every published film as a 9:16 tile, drifting
 * sideways in a seamless loop. Pauses under the pointer and plays the
 * hovered film's 5 s preview. The second copy of the list exists only
 * to close the loop: hidden from assistive tech and the tab order.
 * With reduced motion the strip stands still and scrolls by hand.
 */
export default function ReelMarquee({ projects, location = 'home_reel' }) {
  if (!projects?.length) return null;

  return (
    <div
      className="reel-strip"
      role="region"
      aria-label="Films we have made"
      style={{ '--reel-dur': `${Math.max(40, projects.length * 5)}s` }}
    >
      <ul className="reel__track">
        {[0, 1].map((copy) =>
          projects.map((project, i) => (
            <ReelTile
              key={`${copy}-${project.slug}`}
              project={project}
              copy={copy}
              index={i}
              location={location}
            />
          ))
        )}
      </ul>
    </div>
  );
}
