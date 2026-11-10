import Reveal from './Reveal.jsx';

/**
 * Plain numbered steps: a number, a name, one sentence. Used for "How
 * we work" on the home page and the video process on /video.
 *
 * @param {{title: string, body: string}[]} steps
 */
export default function Flow({ steps }) {
  return (
    <ol className={`flow${steps.length === 5 ? ' flow--5' : ''}`}>
      {steps.map((step, i) => (
        <Reveal as="li" className="flow__step" key={step.title} delay={i * 0.06}>
          <span className="flow__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="flow__title">
            <span className="visually-hidden">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="flow__body">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
