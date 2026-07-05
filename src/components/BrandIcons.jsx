/*
 * Full-color brand marks, hand-drawn as compact SVGs in each company's
 * official palette. Simplified geometry so they stay crisp at 16-18px.
 */
export const BRAND_ICONS = {
  Slack: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9.5" y="1" width="4" height="9" rx="2" fill="#36C5F0" />
      <rect x="14" y="9.5" width="9" height="4" rx="2" fill="#2EB67D" />
      <rect x="10.5" y="14" width="4" height="9" rx="2" fill="#ECB22E" />
      <rect x="1" y="10.5" width="9" height="4" rx="2" fill="#E01E5A" />
    </svg>
  ),
  Notion: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4.5" fill="#FFFFFF" />
      <path d="M8.2 17V7h1.9l4.2 6.2V7h1.9v10h-1.9l-4.2-6.2V17H8.2Z" fill="#111111" />
    </svg>
  ),
  HubSpot: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="13.5" cy="14.5" r="5" stroke="#FF7A59" strokeWidth="3.4" />
      <path d="M13.5 9.5v-4" stroke="#FF7A59" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="13.5" cy="3.6" r="2" fill="#FF7A59" />
      <path d="M5 20.5l3.6-3" stroke="#FF7A59" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  Zapier: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g stroke="#FF4F00" strokeWidth="3.2" strokeLinecap="round">
        <path d="M12 3.5v17" />
        <path d="M3.5 12h17" />
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="#FF4F00" />
    </svg>
  ),
  Asana: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="7" r="4.2" fill="#F06A6A" />
      <circle cx="5.3" cy="16.8" r="4.2" fill="#F06A6A" />
      <circle cx="18.7" cy="16.8" r="4.2" fill="#F06A6A" />
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#635BFF" />
      <path
        d="M12.6 10.3c-1.5-.5-2.3-.9-2.3-1.6 0-.6.5-1 1.5-1 1.2 0 2.5.4 3.4.9V5.7c-1-.4-2.1-.6-3.4-.6-2.7 0-4.5 1.4-4.5 3.7 0 2.2 1.5 3.1 3.6 3.9 1.4.5 1.9.9 1.9 1.5 0 .7-.6 1.1-1.6 1.1-1.3 0-2.9-.6-3.9-1.3v3c1.1.5 2.5.9 3.9.9 2.8 0 4.7-1.4 4.7-3.7 0-2.3-1.6-3.2-3.3-3.9Z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  Airtable: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.6 21.4 6.5 12 10.4 2.6 6.5 12 2.6Z" fill="#FCB400" />
      <path d="M2.6 9.2 11 12.7v8.5L2.6 17.6V9.2Z" fill="#18BFFF" />
      <path d="M21.4 9.2 13 12.7v8.5l8.4-3.6V9.2Z" fill="#F82B60" />
    </svg>
  ),
  Sheets: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="1.8" width="16" height="20.4" rx="2.5" fill="#34A853" />
      <path
        d="M7.4 10.2h9.2v8H7.4v-8Zm0 3.9h9.2M12 10.2v8"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  ),
  Make: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="10.5" fill="#6D00CC" />
      <path
        d="M6.4 16.5v-9l5.6 5 5.6-5v9"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  Gmail: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.5 19V6.4c0-.9 1-1.4 1.7-.9L12 11l7.8-5.5c.7-.5 1.7 0 1.7.9V19h-3.4v-7.6L12 15.2 5.9 11.4V19H2.5Z"
        fill="#EA4335"
      />
    </svg>
  ),
  Trello: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0079BF" />
      <rect x="5.5" y="5.5" width="5.5" height="12.5" rx="1.5" fill="#FFFFFF" />
      <rect x="13" y="5.5" width="5.5" height="8" rx="1.5" fill="#FFFFFF" />
    </svg>
  ),
  Dropbox: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7 2.8 2 6l5 3.2L12 6 7 2.8Zm10 0L12 6l5 3.2L22 6l-5-3.2ZM2 12.4l5 3.2 5-3.2-5-3.2-5 3.2Zm15-3.2-5 3.2 5 3.2 5-3.2-5-3.2ZM7 16.7l5 3.3 5-3.3-5-3.2-5 3.2Z"
        fill="#0061FF"
      />
    </svg>
  ),
  Salesforce: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M17.6 9.3a4.6 4.6 0 0 0-8.6-1.7 3.9 3.9 0 0 0-6 3.3A4 4 0 0 0 7 14.9h10.2a2.9 2.9 0 0 0 .4-5.6Z"
        fill="#00A1E0"
      />
      <path d="M7 16.5h10" stroke="#00A1E0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2H8.75a3.25 3.25 0 0 0 0 6.5H12V2Z" fill="#F24E1E" />
      <path d="M12 2h3.25a3.25 3.25 0 0 1 0 6.5H12V2Z" fill="#FF7262" />
      <path d="M12 8.5H8.75a3.25 3.25 0 0 0 0 6.5H12V8.5Z" fill="#A259FF" />
      <circle cx="15.25" cy="11.75" r="3.25" fill="#1ABCFE" />
      <path d="M12 15H8.75A3.25 3.25 0 1 0 12 18.25V15Z" fill="#0ACF83" />
    </svg>
  ),
  Shopify: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.6 7.6 9 5.8c.5-.6 1.2-1 2-1.2l3-.5c.7-.1 1.3.4 1.4 1.1l2.1 13.3-5.6 2.2-7.2-1.6 2.9-11.5Z"
        fill="#95BF47"
      />
      <path
        d="M13.2 9.3c-1.6-.6-3.2.2-3.2 1.5 0 1.7 2.8 1.6 2.8 3.2 0 1.1-1.5 1.6-2.8 1"
        stroke="#FFFFFF"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  Jira: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 5.5 8.5 12 15l6.5-6.5L12 2Z" fill="#2684FF" />
      <path d="M8.7 12.2 4.2 16.7 8.7 21.2l4.5-4.5-4.5-4.5Z" fill="#2684FF" opacity="0.72" />
    </svg>
  ),
  Drive: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.2 3h5.6l6.5 11.3h-5.6L9.2 3Z" fill="#FFCF44" />
      <path d="M9.2 3 2.7 14.3l2.8 4.9L12 7.9 9.2 3Z" fill="#11A861" />
      <path d="M5.5 19.2h13l2.8-4.9H8.3l-2.8 4.9Z" fill="#2684FC" />
    </svg>
  ),
  Calendly: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#006BFF" />
      <path
        d="M15.4 14.4a4 4 0 1 1 0-4.8"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
  Discord: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 4.5c2.6 0 5 .6 7.2 1.9 1.3 3.4 1.7 6.9 1.2 10.4A11.7 11.7 0 0 1 13.6 19l-.5-1.2a9 9 0 0 1-2.2 0L10.4 19a11.7 11.7 0 0 1-6.8-2.2c-.5-3.5-.1-7 1.2-10.4A13.8 13.8 0 0 1 12 4.5Z"
        fill="#5865F2"
      />
      <circle cx="9.2" cy="12.2" r="1.5" fill="#FFFFFF" />
      <circle cx="14.8" cy="12.2" r="1.5" fill="#FFFFFF" />
    </svg>
  ),
  ClickUp: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="brand-cu-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8930FD" />
          <stop offset="1" stopColor="#49CCF9" />
        </linearGradient>
        <linearGradient id="brand-cu-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FF02F0" />
          <stop offset="1" stopColor="#FFC800" />
        </linearGradient>
      </defs>
      <path d="M4.5 12.5 12 5.5l7.5 7" stroke="url(#brand-cu-a)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.5 17.5c3.4 2.6 7.6 2.6 11 0" stroke="url(#brand-cu-b)" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  ),
};
