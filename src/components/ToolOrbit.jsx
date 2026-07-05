import { BRAND_ICONS } from './BrandIcons.jsx';

const INFINITY_PATH =
  'M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z';

/*
 * Two perfect circles around the phone, spinning in opposite directions.
 * Positions are computed from the ring radius (% of container) and even
 * angular spacing, so the geometry always reads as deliberate. Each tile
 * counter-rotates to stay upright while its ring revolves.
 */
const RINGS = [
  {
    id: 'inner',
    radius: 32,
    size: 62,
    dur: '80s',
    reverse: false,
    offset: 0,
    tools: ['Zapier', 'Notion', 'Slack', 'HubSpot', 'Stripe', 'Asana', 'Sheets', 'Airtable'],
  },
  {
    id: 'outer',
    radius: 46,
    size: 50,
    dur: '130s',
    reverse: true,
    offset: 15,
    tools: [
      'Gmail', 'Jira', 'Dropbox', 'Figma', 'Calendly', 'ClickUp',
      'Shopify', 'Discord', 'Salesforce', 'Trello', 'Drive', 'Make',
    ],
  },
];

const ALL_TOOLS = RINGS.flatMap((r) => r.tools);

/**
 * Integration constellation — full-color app tiles revolve around a phone
 * running the Crafted Flows brand. Two counter-spinning circular rings,
 * gentle per-tile bob, sequential gold data pulses, and a glowing core.
 * Hovering pauses the system; hovered tiles lift with a gold glow and a
 * name label. Transform/opacity animations only; static under
 * prefers-reduced-motion.
 */
export default function ToolCloud() {
  let gi = 0;
  return (
    <div
      className="cloud"
      role="img"
      aria-label={`Integrates with ${ALL_TOOLS.join(', ')} and more`}
    >
      {RINGS.map((ring) => (
        <div
          key={ring.id}
          className={`cloud__ring${ring.reverse ? ' cloud__ring--rev' : ''}`}
          style={{ '--rdur': ring.dur }}
          aria-hidden="true"
        >
          {ring.tools.map((tool, i) => {
            const angle = ring.offset + (360 / ring.tools.length) * i;
            const rad = (angle * Math.PI) / 180;
            const x = 50 + ring.radius * Math.sin(rad);
            const y = 50 - ring.radius * Math.cos(rad);
            const idx = gi++;
            return (
              <div
                key={tool}
                className="cloud__node"
                style={{
                  left: `${x.toFixed(2)}%`,
                  top: `${y.toFixed(2)}%`,
                  '--s': `${ring.size}px`,
                  '--f': `${5.6 + (idx % 5) * 0.8}s`,
                  '--i': idx,
                }}
              >
                <div className="cloud__counter">
                  <span className="cloud__tile">{BRAND_ICONS[tool]}</span>
                  <span className="cloud__label">{tool}</span>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="cloud__phone" aria-hidden="true">
        <span className="cloud__notch" />
        <div className="cloud__screen">
          <svg viewBox="0 0 120 60" fill="none">
            <path
              d={INFINITY_PATH}
              stroke="#FAFAFA"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="cloud__brand">
            <b>crafted</b> flows
          </span>
        </div>
      </div>
    </div>
  );
}
