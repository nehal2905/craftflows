import { VIDEO_FAQS } from './video.js';

/* Automation answers are the live facts from the original site, word
   for word. The FAQPage schema on /automation is generated from this
   list, so the two can never drift apart. */
export const AUTOMATION_FAQS = [
  {
    q: 'How much does it cost?',
    a: 'A fixed build fee, quoted up front after the audit, based on the workflow\u2019s complexity, plus a monthly retainer for monitoring and maintenance. No hourly billing, no surprises. And if the automation doesn\u2019t save the hours we promised, you don\u2019t pay.',
  },
  {
    q: 'How long does a build take?',
    a: 'Most automations ship in one to three weeks from kickoff. The audit itself takes 15 minutes, and you\u2019ll have a scoped proposal within two business days of it.',
  },
  {
    q: 'What software do you work with?',
    a: 'The tools businesses already run: Slack, Notion, HubSpot, Airtable, Google Workspace, Asana, ClickUp, Stripe, and hundreds more via Zapier, Make, or direct APIs. If your stack has an API, we can almost certainly wire it in.',
  },
  {
    q: 'What happens when something breaks?',
    a: 'That\u2019s what the retainer covers. Every flow is monitored around the clock, when an upstream tool changes its API or a step fails, we\u2019re alerted and usually have it fixed before your team notices anything.',
  },
  {
    q: 'What kind of support do we get?',
    a: 'A dedicated Slack channel with the people who built your automation, no ticket queues, no outsourced support desk. Questions, tweaks, and small adjustments are part of the retainer.',
  },
  {
    q: 'Can you build custom integrations?',
    a: 'Yes. When an off-the-shelf connector doesn\u2019t exist, we write custom API integrations, internal tools, legacy systems, or niche software included. That\u2019s scoped and quoted in the same fixed-fee proposal.',
  },
];

const auto = (question, rename) => {
  const item = AUTOMATION_FAQS.find((f) => f.q === question);
  return { q: rename, a: item.a };
};

const video = (question, rename) => {
  const item = VIDEO_FAQS.find((f) => f.q === question);
  return item ? { q: rename ?? item.q, a: item.a } : null;
};

/* Home: the most common questions across both services. Video
   questions join automatically as the owner answers them. */
export const HOME_FAQS = [
  {
    q: 'What does Crafted Flows do?',
    a: 'Two things, both done for you. We make promotional videos that help your business get seen and sell more, and we build automations that take repetitive work off your team.',
  },
  {
    q: 'What kinds of video do you make?',
    a: 'Brand films, social ads for Reels, TikTok and Shorts, product launch films, explainers, UGC-style ads, 3D product showcases, motion logos, and billboard and digital-screen campaigns.',
  },
  video('How much does a video cost?'),
  video('Do you write the script?', 'Do you write the video script?'),
  video('Can we get versions for every platform?', 'Can we get video versions for every platform?'),
  auto('How much does it cost?', 'How much does automation cost?'),
  auto('How long does a build take?', 'How long does an automation build take?'),
  auto('What software do you work with?', 'What software do your automations work with?'),
  auto('What happens when something breaks?', 'What happens when an automation breaks?'),
]
  .filter(Boolean)
  .slice(0, 8);

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});
