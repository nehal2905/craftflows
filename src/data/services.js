/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SERVICE PAGE CONTENT - ALL COPY BELOW IS PLACEHOLDER.
 *
 *  Every string in this file is draft copy written to establish structure
 *  and length. Replace it with final marketing copy before launch.
 *
 *  While `draft: true`, the page is served with `noindex, nofollow` so
 *  search engines won't index placeholder text. When the copy for a
 *  service is final:
 *    1. Set `draft: false` on that service.
 *    2. Add its URL to public/sitemap.xml.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Adding a new service = adding one object to this array. The route,
 * layout, SEO tags, JSON-LD, breadcrumbs, and internal links are all
 * generated from this data.
 */

export const SERVICES = [
  {
    slug: 'ai-workflow-automation',
    name: 'AI Workflow Automation',
    tagline: 'Put AI to work inside the workflows you already run.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'AI Workflow Automation Services | Crafted Flows',
      description:
        'Done-for-you AI workflow automation: we design, build, and maintain AI-powered workflows that handle reporting, data entry, and follow-ups inside your existing tools.', // [PLACEHOLDER]
    },
    hero: {
      title: 'AI workflows that run your busywork for you.',
      sub: '[PLACEHOLDER] We design and build AI-powered workflows that read, decide, and act across your stack, drafting reports, triaging requests, and moving data without a human in the loop.',
    },
    overview: [
      '[PLACEHOLDER] Most teams use AI as a chat window. We wire it into the middle of your operations: a workflow that reads the incoming email, extracts the order details, updates the CRM, and drafts the reply, before anyone opens their inbox.',
      '[PLACEHOLDER] Every build starts from a workflow audit, so the AI is applied to the highest-cost repetitive work first. You keep your existing tools; we add the intelligence between them.',
    ],
    benefits: [
      { title: 'Hours back weekly', body: '[PLACEHOLDER] Repetitive reading, sorting, and drafting handled end-to-end by AI steps.' },
      { title: 'Human-grade judgment', body: '[PLACEHOLDER] Flows escalate edge cases to a person instead of guessing, quality stays high.' },
      { title: 'Your existing stack', body: '[PLACEHOLDER] Works inside Gmail, Slack, HubSpot, Notion, Airtable, no new tools to learn.' },
      { title: 'Monitored 24/7', body: '[PLACEHOLDER] Every AI workflow ships with monitoring and a maintenance retainer.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We map your highest-cost repetitive workflow and score where AI reliably beats manual work.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We build the AI workflow end-to-end, wired into your existing tools, with human checkpoints where needed.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We monitor output quality and fix breakages when upstream tools or prompts drift.' },
    ],
    faqs: [
      { q: 'Which AI models do you use?', a: '[PLACEHOLDER] Whichever fits the job, OpenAI, Anthropic, or open-source models, selected for accuracy, speed, and cost on your specific workflow.' },
      { q: 'Is our data safe?', a: '[PLACEHOLDER] Data stays inside your accounts wherever possible, and we configure zero-retention API options when supported.' },
      { q: 'What if the AI makes a mistake?', a: '[PLACEHOLDER] Flows are designed with confidence thresholds, anything uncertain routes to a human for review instead of acting.' },
      { q: 'How long does a build take?', a: '[PLACEHOLDER] Most AI workflows ship in one to three weeks from kickoff, after a 15-minute audit call.' },
    ],
    related: ['ai-agents', 'zapier-automation', 'crm-automation'],
  },
  {
    slug: 'crm-automation',
    name: 'CRM Automation',
    tagline: 'A CRM that updates itself, no more chasing reps for data entry.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'CRM Automation Services | Crafted Flows',
      description:
        'Done-for-you CRM automation for HubSpot, Pipedrive, and Salesforce: automatic data entry, lead routing, follow-up sequences, and pipeline reporting.', // [PLACEHOLDER]
    },
    hero: {
      title: 'A CRM that keeps itself up to date.',
      sub: '[PLACEHOLDER] We automate the data entry, lead routing, and follow-ups your team does by hand, so the pipeline is always current and nothing slips through.',
    },
    overview: [
      '[PLACEHOLDER] A CRM is only as good as the data inside it, and manual data entry is the first thing busy teams skip. We connect your CRM to the places deals actually happen, email, calls, forms, chat, and keep every record updated automatically.',
      '[PLACEHOLDER] We work with HubSpot, Pipedrive, Salesforce, and most modern CRMs, building on top of your existing pipeline structure rather than forcing a migration.',
    ],
    benefits: [
      { title: 'Zero manual entry', body: '[PLACEHOLDER] Contacts, deals, and activities logged automatically from email, calls, and forms.' },
      { title: 'Instant lead routing', body: '[PLACEHOLDER] New leads scored and assigned to the right rep in seconds, not hours.' },
      { title: 'Follow-ups that fire', body: '[PLACEHOLDER] Sequenced nudges triggered by deal stage, no lead goes cold by accident.' },
      { title: 'Reports without spreadsheets', body: '[PLACEHOLDER] Pipeline and activity reports delivered to Slack or email on schedule.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We map how leads and deals actually move through your team, and where records go stale.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We automate entry, routing, and follow-up inside your existing CRM, no migration required.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We monitor every sync and fix breakages when the CRM or a connected tool changes.' },
    ],
    faqs: [
      { q: 'Which CRMs do you support?', a: '[PLACEHOLDER] HubSpot, Pipedrive, Salesforce, Close, and most CRMs with an API. If yours has an API, we can automate it.' },
      { q: 'Do we need to migrate CRMs?', a: '[PLACEHOLDER] No. We build on the CRM you already use and the pipeline structure your team already knows.' },
      { q: 'Can you clean up our existing data?', a: '[PLACEHOLDER] Yes, deduplication and enrichment passes are typically scoped as part of the initial build.' },
      { q: 'How long does a build take?', a: '[PLACEHOLDER] Most CRM automations ship in one to three weeks from kickoff, after a 15-minute audit call.' },
    ],
    related: ['lead-generation', 'ai-workflow-automation', 'zapier-automation'],
  },
  {
    slug: 'zapier-automation',
    name: 'Zapier Automation',
    tagline: 'Expert-built Zaps that don\u2019t break at 2am.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'Zapier Automation Experts | Crafted Flows',
      description:
        'Done-for-you Zapier automation: we design, build, and maintain reliable Zaps that connect your tools, reporting, onboarding, lead routing, and more.', // [PLACEHOLDER]
    },
    hero: {
      title: 'Zapier automations built to production standard.',
      sub: '[PLACEHOLDER] Anyone can make a Zap. We build Zapier systems, error handling, formatting, and monitoring included, so they keep running when your tools change.',
    },
    overview: [
      '[PLACEHOLDER] Zapier connects 6,000+ apps, but DIY Zaps tend to be brittle: one renamed field and the whole chain silently stops. We architect Zapier workflows the way engineers build software, with error paths, retries, and alerting.',
      '[PLACEHOLDER] We also know when Zapier is the wrong tool. If your workflow needs heavier logic or volume, we\u2019ll say so and recommend Make or a custom integration instead.',
    ],
    benefits: [
      { title: 'Reliable by design', body: '[PLACEHOLDER] Error handling and fallback paths built into every Zap, not just the happy path.' },
      { title: 'Faster than hiring', body: '[PLACEHOLDER] Working automations in days, without adding engineering headcount.' },
      { title: 'Cost-optimized tasks', body: '[PLACEHOLDER] Flows structured to minimize Zapier task usage, keeping your plan costs down.' },
      { title: 'Fully documented', body: '[PLACEHOLDER] Every Zap documented so your team understands what runs where, and why.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We map the workflow and confirm Zapier is the right engine for it, volume, logic, and cost included.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We build and test the Zaps with error paths and alerting, then run them in parallel before cutover.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We monitor task usage and errors, fixing breakages before they cost you data.' },
    ],
    faqs: [
      { q: 'Do we need our own Zapier account?', a: '[PLACEHOLDER] Yes, everything is built in your account so you own it outright. We help pick the right plan for your volume.' },
      { q: 'What happens if a Zap breaks?', a: '[PLACEHOLDER] Monitoring alerts us first. Under the retainer we usually have it fixed before your team notices.' },
      { q: 'Zapier or Make, which should we use?', a: '[PLACEHOLDER] Zapier for breadth and simplicity, Make for complex logic and volume pricing. The audit tells us which fits.' },
      { q: 'How long does a build take?', a: '[PLACEHOLDER] Simple Zaps ship within days; multi-step systems typically take one to two weeks.' },
    ],
    related: ['make-automation', 'ai-workflow-automation', 'crm-automation'],
  },
  {
    slug: 'make-automation',
    name: 'Make Automation',
    tagline: 'Complex scenarios, visual logic, serious volume.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'Make (Integromat) Automation Experts | Crafted Flows',
      description:
        'Done-for-you Make.com automation: complex multi-branch scenarios, data transformations, and high-volume workflows, designed, built, and maintained for you.', // [PLACEHOLDER]
    },
    hero: {
      title: 'Make scenarios for workflows Zapier can\u2019t handle.',
      sub: '[PLACEHOLDER] Branching logic, loops, data transformations, and high volume, we build Make.com scenarios that work like custom software at a fraction of the cost.',
    },
    overview: [
      '[PLACEHOLDER] Make (formerly Integromat) shines where workflows get genuinely complex: multiple branches, iterators over line items, JSON transformations, and thousands of operations a day. We design those scenarios to be readable, testable, and cheap to run.',
      '[PLACEHOLDER] If your team has outgrown simple triggers-and-actions, Make is usually the sweet spot before custom code, and we\u2019ll tell you honestly when it isn\u2019t.',
    ],
    benefits: [
      { title: 'Complex logic, handled', body: '[PLACEHOLDER] Routers, iterators, and aggregators for workflows with real branching decisions.' },
      { title: 'High-volume friendly', body: '[PLACEHOLDER] Operations-based pricing makes Make dramatically cheaper at scale.' },
      { title: 'Clean data in, clean data out', body: '[PLACEHOLDER] Transformations and validation built into the scenario, not bolted on.' },
      { title: 'Readable, documented scenarios', body: '[PLACEHOLDER] Visual flows your team can actually follow, with docs for every module.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We map the workflow\u2019s real complexity, branches, volumes, edge cases, and scope the scenario.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We build and stress-test the scenario with error handlers and rollback paths before it goes live.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We watch operations usage and errors, tuning the scenario as your volume grows.' },
    ],
    faqs: [
      { q: 'Make or Zapier, which is right for us?', a: '[PLACEHOLDER] Make wins on complex logic and volume cost; Zapier wins on app coverage and simplicity. The audit settles it in 15 minutes.' },
      { q: 'Can Make handle our data volume?', a: '[PLACEHOLDER] Make\u2019s per-operation pricing usually handles tens of thousands of records far cheaper than task-based tools.' },
      { q: 'Do you migrate Zapier setups to Make?', a: '[PLACEHOLDER] Yes, we routinely rebuild brittle or expensive Zap collections as consolidated Make scenarios.' },
      { q: 'How long does a build take?', a: '[PLACEHOLDER] Typical scenarios ship in one to three weeks depending on branching and testing needs.' },
    ],
    related: ['zapier-automation', 'ai-workflow-automation', 'lead-generation'],
  },
  {
    slug: 'lead-generation',
    name: 'Lead Generation Automation',
    tagline: 'A pipeline that fills itself while your team sells.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'Lead Generation Automation | Crafted Flows',
      description:
        'Done-for-you lead generation automation: prospect sourcing, enrichment, scoring, and outreach sequences that keep your pipeline full on autopilot.', // [PLACEHOLDER]
    },
    hero: {
      title: 'Lead generation that runs on autopilot.',
      sub: '[PLACEHOLDER] We automate the sourcing, enrichment, scoring, and first-touch outreach, so your team spends its time closing, not prospecting.',
    },
    overview: [
      '[PLACEHOLDER] Manual prospecting is the most expensive way to fill a pipeline. We build systems that find prospects matching your ICP, enrich them with verified contact data, score them, and hand your reps a warm, prioritized list every morning.',
      '[PLACEHOLDER] Everything routes into your existing CRM with full attribution, so you can see exactly which channels and segments convert.',
    ],
    benefits: [
      { title: 'Always-full pipeline', body: '[PLACEHOLDER] Prospect sourcing and enrichment running daily, without a human touching a spreadsheet.' },
      { title: 'Warm, scored leads', body: '[PLACEHOLDER] Fit and intent scoring so reps always call the most likely buyer first.' },
      { title: 'Personalized at scale', body: '[PLACEHOLDER] AI-drafted first touches based on each prospect\u2019s actual context, not mail-merge blasts.' },
      { title: 'Full attribution', body: '[PLACEHOLDER] Every lead lands in your CRM tagged with source, segment, and campaign.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We define your ICP, current channels, and conversion data to find the highest-leverage automation.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We build the sourcing, enrichment, and outreach pipeline, wired into your CRM and inbox.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We monitor deliverability, list quality, and reply rates, tuning the system monthly.' },
    ],
    faqs: [
      { q: 'Where do the leads come from?', a: '[PLACEHOLDER] Public and licensed B2B data sources matched to your ICP, enriched and verified before they ever reach a rep.' },
      { q: 'Is automated outreach compliant?', a: '[PLACEHOLDER] We configure sending within GDPR/CAN-SPAM rules, opt-outs, sending limits, and domain warm-up included.' },
      { q: 'Will this hurt our email deliverability?', a: '[PLACEHOLDER] No, volume ramping, dedicated sending domains, and reply-rate monitoring protect your main domain.' },
      { q: 'How long until we see leads?', a: '[PLACEHOLDER] The pipeline is usually live within two to three weeks; first qualified replies typically follow within days.' },
    ],
    related: ['crm-automation', 'ai-agents', 'ai-workflow-automation'],
  },
  {
    slug: 'ai-agents',
    name: 'AI Agents',
    tagline: 'Autonomous agents that handle whole jobs, not just steps.', // [PLACEHOLDER]
    draft: true,
    seo: {
      title: 'Custom AI Agents for Business | Crafted Flows',
      description:
        'Custom AI agents that research, decide, and act across your tools, customer support, operations, and back-office agents designed, built, and maintained for you.', // [PLACEHOLDER]
    },
    hero: {
      title: 'AI agents that own the whole job.',
      sub: '[PLACEHOLDER] Beyond single automations: agents that take a goal, work across your tools, and come back with the job done, support triage, research, scheduling, and more.',
    },
    overview: [
      '[PLACEHOLDER] A workflow follows a fixed path; an agent figures out the path. We build agents that can read a support ticket, pull the customer\u2019s history, check the docs, draft the fix, and escalate only when they\u2019re genuinely unsure.',
      '[PLACEHOLDER] Every agent ships with guardrails: scoped tool access, spending limits, audit logs, and human approval gates on anything irreversible.',
    ],
    benefits: [
      { title: 'Whole jobs, not steps', body: '[PLACEHOLDER] Agents handle multi-step goals end-to-end, research, drafting, updating, notifying.' },
      { title: 'Guardrails first', body: '[PLACEHOLDER] Scoped permissions, approval gates, and full audit logs on every agent action.' },
      { title: 'Works your tools', body: '[PLACEHOLDER] Agents operate inside Slack, email, your CRM, and your docs, where work already happens.' },
      { title: 'Improves with feedback', body: '[PLACEHOLDER] Corrections feed back into the agent\u2019s instructions, so quality compounds monthly.' },
    ],
    process: [
      { index: '01', title: 'Audit', body: '[PLACEHOLDER] We identify a job with clear success criteria where an agent can safely take ownership.' },
      { index: '02', title: 'Build', body: '[PLACEHOLDER] We build the agent with scoped tools and approval gates, then trial it alongside your team.' },
      { index: '03', title: 'Maintain', body: '[PLACEHOLDER] We review agent logs, tighten instructions, and expand its scope as trust grows.' },
    ],
    faqs: [
      { q: 'How is an agent different from an automation?', a: '[PLACEHOLDER] An automation follows a fixed recipe. An agent is given a goal and decides the steps, within the guardrails we set.' },
      { q: 'Can the agent take actions without approval?', a: '[PLACEHOLDER] Only the ones you allow. Reversible actions can run autonomously; anything sensitive waits for a human click.' },
      { q: 'What does an agent cost to run?', a: '[PLACEHOLDER] Model usage is metered, most business agents run for tens of dollars a month, scoped in your proposal.' },
      { q: 'How long does a build take?', a: '[PLACEHOLDER] First agent builds typically ship in two to four weeks, including a supervised trial period.' },
    ],
    related: ['ai-workflow-automation', 'lead-generation', 'make-automation'],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);

export const getRelated = (service) =>
  service.related.map(getService).filter(Boolean);
