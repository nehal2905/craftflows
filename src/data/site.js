/**
 * Owner facts: the single source of truth for everything the studio
 * commits to in public.
 *
 * RULE: an empty value never renders. '' / null / [] means "not filled
 * in yet", and the matching section hides itself or falls back to its
 * honest version. Never put a guess in here.
 *
 * Kept dependency-free so the Vite build plugin can import it too.
 */
export const SITE = {
  origin: 'https://www.craftedflows.com',
  email: 'admin@craftedflows.com',
  linkedin: 'https://www.linkedin.com/company/craftedflowsai/',
  instagram:
    'https://www.instagram.com/crafted.flows?igsh=MWRzeW95am9iank5NQ%3D%3D&utm_source=qr',

  /* Automation (live facts from the existing site) */
  auditUrl: 'https://cal.com/crafted-flows/automation-audit',
  automationDelivery: 'one to three weeks',

  /* Forms: same FormSubmit relay the diagnostic form already uses */
  formEndpoint: 'https://formsubmit.co/ajax/hello@craftedflows.com',
  formFallbackEmail: 'hello@craftedflows.com',

  /* ── [[PLACEHOLDERS]]: fill these in; each one switches its section on ── */

  // [[VIDEO_BOOKING_LINK]] e.g. 'https://cal.com/crafted-flows/video-call'
  videoBookingUrl: '',

  // [[SHOWREEL_LOOP]] 10 to 20 s, muted. { mp4, webm, poster }
  // Skipped for now: the portfolio films are full-length 9:16 cuts (~10–18 MB),
  // too heavy for a muted autoplay loop on the home hero.
  showreelLoop: null,

  // Full showreel for the /video hero: { mp4, webm, poster }. Until a
  // dedicated cut exists, /video plays the featured film from work.js.
  showreelFull: null,

  // [[VIDEO_GUARANTEE]] one sentence you commit to
  videoGuarantee: '',

  // [[REVISIONS_INCLUDED]] e.g. 'Two rounds of revisions are included.'
  revisionsIncluded: '',

  // Video turnaround, e.g. 'First cut in 7 days.'
  videoTurnaround: '',

  // Who owns the final video, e.g. 'You own every deliverable.'
  videoOwnership: '',

  // [[RESPONSE_TIME]] e.g. 'We reply within one business day.'
  responseTime: '',

  // [[BUDGET_RANGES]] e.g. ['Under $2k', '$2k to $5k', '$5k+']
  budgetRanges: [],

  // [[PACKAGES]] { name, includes: [..], price: '' (optional), turnaround: '' }
  packages: [],

  // [[CLIENT_LOGOS]] only with permission. { name, src } one colour, max 8
  clientLogos: [],

  // [[TESTIMONIALS]] confirmed by the person. { quote, name, role, company, photo }
  testimonials: [],

  // [[PRESS_OR_AWARDS]] real ones only. { label, href }
  pressOrAwards: [],

};

export const has = (value) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value);
