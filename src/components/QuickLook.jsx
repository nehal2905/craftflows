import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Link } from 'react-router';
import { trackEvent } from '../lib/analytics.js';

/**
 * Quick look: a film opened over the page, full size, with sound.
 *
 * Opening is imperative (ref.open(index, triggerEl)) on purpose: the film
 * is started inside the click or key press itself. Browsers only allow
 * playback with sound when it starts during a user gesture, and Safari is
 * strict about it, so starting from a React effect afterwards could leave
 * the film silent. If a browser still refuses, the film plays muted and a
 * "Tap for sound" button appears.
 *
 * Built on the native <dialog> in modal mode: focus stays inside, Esc
 * closes, the page behind is inert. Arrow keys and ‹ › step through films.
 */
const QuickLook = forwardRef(function QuickLook(
  { projects, location, onViewingChange, fallbackFocus },
  ref
) {
  const dialog = useRef(null);
  const video = useRef(null);
  const trigger = useRef(null);
  const [index, setIndex] = useState(null);
  const [muted, setMuted] = useState(false);
  const project = index == null ? null : projects[index];

  // must be called from inside a click or key handler
  const startFilm = (i) => {
    const p = projects[i];
    const v = video.current;
    setIndex(i);
    if (!v || !p?.video?.mp4) return;
    v.src = p.video.mp4;
    v.poster = p.poster || '';
    v.muted = false;
    setMuted(false);
    const started = v.play();
    if (started) {
      started.catch(() => {
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    }
    trackEvent('film_play', { service: 'video', project: p.slug, location });
  };

  useImperativeHandle(ref, () => ({
    open(i, el) {
      trigger.current = el || null;
      const d = dialog.current;
      if (d && !d.open) d.showModal();
      document.documentElement.classList.add('ql-open');
      onViewingChange?.(true);
      startFilm(i);
      // warm the case-study page so its link opens at once
      import('../pages/WorkCase.jsx').catch(() => {});
    },
  }));

  const step = (d) => {
    if (index == null) return;
    startFilm((index + d + projects.length) % projects.length);
  };

  const close = () => {
    const v = video.current;
    if (v) {
      v.pause();
      v.removeAttribute('src'); // stop downloading the film
      v.load();
    }
    const d = dialog.current;
    if (d?.open) d.close();
    document.documentElement.classList.remove('ql-open');
    if (index == null) return;
    setIndex(null);
    onViewingChange?.(false);
    // hand focus back to the film that was opened, or to the strip's control
    const el = trigger.current;
    const target = el && !el.closest('[aria-hidden="true"]') ? el : fallbackFocus?.current;
    requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  };

  const unmute = () => {
    const v = video.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play().catch(() => {});
  };

  // never leave the page locked if this unmounts mid-view (e.g. after navigating)
  useEffect(() => () => document.documentElement.classList.remove('ql-open'), []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="ql"
      aria-labelledby="ql-title"
      onClose={close}
      onKeyDown={onKeyDown}
      // a click on the dimmed area (the dialog itself, not its content) closes
      onClick={(e) => {
        if (e.target === dialog.current || e.target.classList?.contains('ql__inner')) close();
      }}
    >
      <div className="ql__inner">
        <button type="button" className="ql__close" aria-label="Close" autoFocus onClick={close}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
          </svg>
        </button>

        <div className="ql__frame">
          {/* always mounted, so a click can start it directly */}
          <video
            ref={video}
            controls
            playsInline
            preload="none"
            aria-label={project?.title}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
          />
          {muted && (
            <button type="button" className="ql__sound" onClick={unmute}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2.5 6v4h2.5l3.5 3V3L5 6H2.5Z" fill="currentColor" stroke="none" />
                <path d="M11 5.5a3.5 3.5 0 0 1 0 5M12.8 3.6a6 6 0 0 1 0 8.8" />
              </svg>
              Tap for sound
            </button>
          )}
        </div>

        {project && (
          <div className="ql__bar">
            <button type="button" className="ql__nav" aria-label="Previous film" onClick={() => step(-1)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 3 5 8l5 5" />
              </svg>
            </button>
            <div className="ql__meta">
              <p className="ql__title" id="ql-title">{project.client}</p>
              <p className="ql__sub">
                {project.concept && 'Concept film'}
                {project.industry && (
                  <span className="ql__ind">{project.concept ? ' · ' : ''}{project.industry}</span>
                )}
              </p>
            </div>
            <Link
              className="ql__link"
              to={`/work/${project.slug}`}
              onClick={() =>
                trackEvent('portfolio_open', { service: 'video', project: project.slug, location })
              }
            >
              See the case study <span aria-hidden="true">→</span>
            </Link>
            <button type="button" className="ql__nav" aria-label="Next film" onClick={() => step(1)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 3 5 5-5 5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
});

export default QuickLook;
