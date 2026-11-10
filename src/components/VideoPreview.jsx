import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Muted preview loop.
 *
 * - Shows the poster first; the video files are not requested until the
 *   clip is near the viewport, so previews below the fold cost nothing.
 * - Plays only while on screen and pauses when scrolled away.
 * - With prefers-reduced-motion it never autoplays: the poster stays.
 * - Without a poster or sources it renders nothing.
 *
 * @param {{mp4?: string, webm?: string}} sources
 * @param {string} poster   still image shown before / instead of the loop
 * @param {string} alt      description of the clip (posters are images)
 */
export default function VideoPreview({ sources, poster, alt = '', className = '' }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const [near, setNear] = useState(false);

  const hasVideo = Boolean(sources && (sources.mp4 || sources.webm));
  const animate = hasVideo && !reduce;

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          // play() can reject if the tab is hidden or data is still loading
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  // Once the sources mount, start playback if the clip is still on screen.
  useEffect(() => {
    if (near && animate) {
      ref.current?.load?.();
      ref.current?.play?.().catch(() => {});
    }
  }, [near, animate]);

  if (!poster && !hasVideo) return null;

  if (!animate) {
    return poster ? (
      <img className={`vp ${className}`} src={poster} alt={alt} loading="lazy" decoding="async" />
    ) : null;
  }

  return (
    <video
      ref={ref}
      className={`vp ${className}`}
      poster={poster || undefined}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt || undefined}
      disablePictureInPicture
    >
      {near && sources.webm && <source src={sources.webm} type="video/webm" />}
      {near && sources.mp4 && <source src={sources.mp4} type="video/mp4" />}
    </video>
  );
}
