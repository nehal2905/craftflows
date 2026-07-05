/* Crafted Flows — motion + behavior. Everything degrades gracefully. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Infinity: draw itself once, then a single light flows around forever ---- */
  var base = document.getElementById('mark-base');
  var flow = document.getElementById('mark-flow');

  if (base && flow && typeof base.getTotalLength === 'function') {
    var L = base.getTotalLength();

    if (reduce) {
      // static, fully-drawn mark; no traveling light
      base.style.strokeDasharray = 'none';
      base.style.strokeDashoffset = '0';
      flow.style.display = 'none';
    } else {
      // 1) draw the mark in
      base.style.strokeDasharray = L;
      base.style.strokeDashoffset = L;
      // force layout so the transition from L -> 0 animates
      base.getBoundingClientRect();
      base.style.transition = 'stroke-dashoffset 1.7s cubic-bezier(0.22,1,0.36,1)';
      base.style.strokeDashoffset = '0';

      // 2) one lit segment travels the whole loop, seamlessly (period === L)
      var seg = Math.max(10, L * 0.07);
      flow.style.strokeDasharray = seg + ' ' + (L - seg);
      flow.style.strokeDashoffset = L;
      flow.style.setProperty('--len', L);

      base.addEventListener('transitionend', function once(e) {
        if (e.propertyName !== 'stroke-dashoffset') return;
        base.removeEventListener('transitionend', once);
        flow.style.opacity = '0.9';
        flow.animate(
          [{ strokeDashoffset: L }, { strokeDashoffset: 0 }],
          { duration: 3400, iterations: Infinity, easing: 'linear' }
        );
      });
    }
  }

  /* ---- Top bar: reveal once the hero is mostly scrolled past ---- */
  var topbar = document.getElementById('topbar');
  var hero = document.querySelector('.hero');
  if (topbar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      topbar.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { rootMargin: '-72% 0px 0px 0px' }).observe(hero);
  }

  /* ---- Reveal-on-scroll (content already visible without JS) ---- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length && 'IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
})();
