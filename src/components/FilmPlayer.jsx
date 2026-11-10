import { useState } from 'react';
import VideoPreview from './VideoPreview.jsx';
import { trackEvent } from '../lib/analytics.js';

/**
 * Full film: poster + play button until clicked, then a native player
 * with sound, controls and captions. Nothing downloads before the click.
 *
 * @param {{mp4?: string, webm?: string, captions?: string}} video
 * @param {string} poster
 * @param {string} title    used for the accessible label and analytics
 * @param {string} event    analytics event name fired on first play
 * @param {{mp4?: string, webm?: string}} loop  optional muted preview
 *        that plays behind the play button instead of a still poster
 */
export default function FilmPlayer({
  video,
  poster,
  title,
  event = 'film_play',
  eventParams,
  aspect = '16:9',
  loop,
}) {
  const [playing, setPlaying] = useState(false);
  const frame = `film${aspect === '9:16' ? ' film--portrait' : ''}`;

  const hasVideo = Boolean(video && (video.mp4 || video.webm));
  if (!poster && !hasVideo) return null;

  if (!hasVideo) {
    return (
      <div className={frame}>
        <img src={poster} alt={title} decoding="async" />
      </div>
    );
  }

  if (!playing) {
    return (
      <div className={frame}>
        {loop ? (
          <VideoPreview sources={loop} poster={poster} />
        ) : (
          poster && <img src={poster} alt="" decoding="async" />
        )}
        <button
          type="button"
          className="film__play"
          aria-label={`Play ${title}, with sound`}
          onClick={() => {
            setPlaying(true);
            trackEvent(event, { service: 'video', title, ...eventParams });
          }}
        >
          <span className="film__disc" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={frame}>
      <video poster={poster || undefined} controls autoPlay playsInline preload="metadata">
        {video.webm && <source src={video.webm} type="video/webm" />}
        {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="en" label="English" default />
        )}
      </video>
    </div>
  );
}
