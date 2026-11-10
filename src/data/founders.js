/**
 * Single source of truth for founder identity (hero strip + #who section).
 *
 * ── TO BE REPLACED ─────────────────────────────────────────────
 * Everything below is placeholder. Swap in:
 *   name      real name
 *   role      real one-line role
 *   bio       real first-person bio (2-3 sentences)
 *   linkedin  PERSONAL LinkedIn profile URL
 *   avatar    small square headshot  → public/assets/founders/
 *   photo     real working photo, 4:5, at a desk with screen visible
 * ───────────────────────────────────────────────────────────────
 */
/* Company identity for the footer. TODO: replace every bracketed value. */
export const COMPANY = {
  city: '[CITY]', // TODO: real city
  legalName: '[Registered Business Name]', // TODO: legal entity name
  address: '[Registered business address]', // TODO: real address
  registration: 'GST: [REGISTRATION NUMBER]', // TODO: real GST / reg no.
  email: 'admin@craftedflows.com', // TODO: human address, e.g. name@craftedflows.com
  linkedin: 'https://www.linkedin.com/company/craftedflowsai/',
  cal: 'https://cal.com/crafted-flows/automation-audit',
};

export const FOUNDERS = [
  {
    id: 'founder-1',
    name: 'Founder One', // TODO: real name
    initials: 'F1',
    role: 'Automation & Systems', // TODO: real role
    bio: "I'm [NAME]. I spent [X] years doing [ROLE] at [COMPANY TYPE], where I rebuilt the same client report every Monday for two years before I finally automated it. That's the whole origin of this studio.", // TODO: replace with real bio
    shortBio: 'Designs and builds every automation we ship, from the first trigger to the last error handler.', // TODO: real one-liner
    linkedin: 'https://www.linkedin.com/company/craftedflowsai/', // TODO: personal profile
    avatar: '/assets/founders/founder-1.svg', // TODO: real headshot
    photo: '/assets/founders/founder-1-photo.svg', // TODO: real working photo (4:5)
  },
  {
    id: 'founder-2',
    name: 'Founder Two', // TODO: real name
    initials: 'F2',
    role: 'Client Delivery & Ops', // TODO: real role
    bio: "I'm [NAME]. I spent [X] years doing [ROLE] at [COMPANY TYPE], where I rebuilt the same client report every Monday for two years before I finally automated it. That's the whole origin of this studio.", // TODO: replace with real bio
    shortBio: 'Runs delivery and operations, and makes sure every build keeps working long after handover.', // TODO: real one-liner
    linkedin: 'https://www.linkedin.com/company/craftedflowsai/', // TODO: personal profile
    avatar: '/assets/founders/founder-2.svg', // TODO: real headshot
    photo: '/assets/founders/founder-2-photo.svg', // TODO: real working photo (4:5)
  },
];

/**
 * Blog authorship. Post frontmatter references an author by id
 * (author: "founder-1"); everything renders from this single source.
 * Kept dependency-free so the Vite build plugin can import it too.
 */
export const getAuthor = (id) =>
  FOUNDERS.find((f) => f.id === id) ?? FOUNDERS[0];
