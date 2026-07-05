const INFINITY_PATH =
  'M60 30 C 76 6 108 6 108 30 C 108 54 76 54 60 30 C 44 6 12 6 12 30 C 12 54 44 54 60 30 Z';

/**
 * Circular guarantee seal — the ring of type rotates slowly around a
 * static core. Rendered in the accent gold; static under reduced motion.
 */
export default function GuaranteeSeal() {
  return (
    <div className="seal" role="img" aria-label="Hours-back guarantee&mdash;or you don't pay">
      <svg className="seal__spin" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path
            id="seal-circle"
            d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>
        <text>
          <textPath href="#seal-circle">
            HOURS-BACK GUARANTEE&nbsp;&nbsp;•&nbsp;&nbsp;OR YOU DON&apos;T PAY&nbsp;&nbsp;•
          </textPath>
        </text>
      </svg>
      <div className="seal__core" aria-hidden="true">
        <svg viewBox="0 0 120 60" fill="none">
          <path
            d={INFINITY_PATH}
            stroke="#D8B36A"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="seal__core-label">100% risk-free</span>
      </div>
    </div>
  );
}
