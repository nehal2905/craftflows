import { SITE } from './site.js';

/**
 * Content for the video service. Facts only: anything the owner has
 * not confirmed is left out (see the `a: ''` entries in VIDEO_FAQS,
 * which stay hidden until answered).
 */

/* preview: optional muted loop per format. { mp4, webm, poster } */
export const FORMATS = [
  { name: 'Social ads', detail: 'Reels, TikTok, Shorts', spec: '6 to 20 s · 9:16', best: 'Reach and paid social', preview: null },
  { name: 'Brand promo film', spec: '15 to 30 s · 16:9 and 9:16', best: 'Website, LinkedIn, YouTube', preview: null },
  { name: 'Product launch film', spec: '30 to 90 s · 16:9', best: 'Launches, keynotes, Product Hunt', preview: null },
  { name: 'Explainer', spec: '45 to 90 s · 16:9', best: 'Landing pages, sales calls', preview: null },
  { name: 'UGC-style ad', spec: '15 to 30 s · 9:16', best: 'Performance ads', preview: null },
  { name: 'Product showcase / 3D', spec: '10 to 20 s', best: 'E-commerce, ads', preview: null },
  { name: 'Motion logo', spec: '3 to 6 s', best: 'Intros, end cards', preview: null },
  { name: 'Billboards and digital screens', spec: 'Static or 6 to 10 s', best: 'Out-of-home campaigns', preview: null },
  { name: 'Ad variant packs', spec: '3 to 10 versions', best: 'A/B tests', preview: null },
];

export const BENEFITS = [
  {
    title: 'One clear message',
    body: 'People get what you do in seconds, even with the sound off.',
  },
  {
    title: 'Your real brand and product',
    body: 'Your colours, your product, your words. No stock look.',
  },
  {
    title: 'Ready to publish everywhere',
    body: 'Every size and caption file, ready for every platform.',
  },
];

export const VIDEO_STEPS = [
  {
    title: 'Brief',
    body: 'A 15-minute call about your goal, where the video will run and your deadline.',
  },
  {
    title: 'Script and storyboard',
    body: 'We write both. You approve them before we make anything.',
  },
  {
    title: 'Production',
    body: 'We make the film in your real brand: your colours, your product, your words.',
  },
  {
    title: 'Revisions',
    body: SITE.revisionsIncluded || 'You watch the cut and tell us what to change.',
  },
  {
    title: 'Delivery',
    body: 'You get every platform cut, captions, a thumbnail and the licence sheet.',
  },
];

/* An empty answer keeps the question off the site until the owner
   supplies the fact. Never guess one. */
export const VIDEO_FAQS = [
  {
    q: 'How much does a video cost?',
    a: '', // needs [[PACKAGES]]
  },
  {
    q: 'How long does a video take?',
    a: SITE.videoTurnaround,
  },
  {
    q: 'What do you need from us?',
    a: 'A 15-minute brief call about your goal, where the video will run and your deadline. Anything you can share up front, like a link to your site or product, helps.',
  },
  {
    q: 'Who owns the video?',
    a: SITE.videoOwnership,
  },
  {
    q: 'Can you use our existing footage?',
    a: '', // owner to confirm
  },
  {
    q: 'Do you write the script?',
    a: 'Yes. We write the script and the storyboard, and you approve both before we make anything.',
  },
  {
    q: 'What about music and licences?',
    a: '', // owner to confirm
  },
  {
    q: 'Can we get versions for every platform?',
    a: 'Yes. Delivery includes every platform cut, captions, a thumbnail and the licence sheet.',
  },
].filter((item) => item.a);
