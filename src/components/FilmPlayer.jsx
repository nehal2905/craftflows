import { useRef, useState } from 'react';
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
  const [muted, setMuted] = useState(false);
  const film = useRef(null);
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

  /* Start inside the click: browsers (Safari above all) only allow playback
     with sound when it begins during the gesture itself. If they still say
     no, play muted and offer the sound with one more tap. */
  const start = () => {
    setPlaying(true);
    trackEvent(event, { service: 'video', title, ...eventParams });
    const v = film.current;
    if (!v) return;
    v.muted = false;
    const started = v.play();
    if (started) {
      started.catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
  };
  const unmute = () => {
    const v = film.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play().catch(() => {});
  };

  return (
    <div className={frame}>
      {/* the full film waits underneath; nothing downloads before the click */}
      <video
        ref={film}
        poster={poster || undefined}
        controls={playing}
        playsInline
        preload="none"
        aria-label={title}
        onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
      >
        {video.webm && <source src={video.webm} type="video/webm" />}
        {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        {video.captions && (
          <track kind="captions" src={video.captions} srcLang="en" label="English" default />
        )}
      </video>

      {!playing && (
        <>
          {loop ? (
            <VideoPreview sources={loop} poster={poster} />
          ) : (
            poster && <img src={poster} alt="" decoding="async" />
          )}
          <button
            type="button"
            className="film__play"
            aria-label={`Play ${title}, with sound`}
            onClick={start}
          >
            <span className="film__disc" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <span className="film__label" aria-hidden="true">Watch with sound</span>
          </button>
        </>
      )}

      {playing && muted && (
        <button type="button" className="ql__sound film__sound" onClick={unmute}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 6v4h2.5l3.5 3V3L5 6H2.5Z" fill="currentColor" stroke="none" />
            <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" />
          </svg>
          Tap for sound
        </button>
      )}
    </div>
  );
}
