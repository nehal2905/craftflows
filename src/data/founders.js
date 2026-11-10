/**
 * Company identity only. Crafted Flows presents as a studio / agency -
 * no personal founder cards, avatars or personal LinkedIn links on the
 * live site. Blog posts are bylined to the studio.
 */
import { SITE } from './site.js';

export const COMPANY = {
  city: '',
  legalName: '',
  address: '',
  registration: '',
  jurisdiction: '',
  email: SITE.email,
  linkedin: SITE.linkedin,
  cal: SITE.auditUrl,
};

/** Always the studio. Kept so older imports keep compiling. */
export const FOUNDERS_READY = false;
export const FOUNDERS = [];

export const getAuthor = () => ({
  id: 'studio',
  name: 'Crafted Flows',
  isStudio: true,
});
