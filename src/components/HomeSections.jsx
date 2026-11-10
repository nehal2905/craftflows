import Reveal from './Reveal.jsx';
import FeaturedWork from './FeaturedWork.jsx';
import ServiceDoors from './ServiceDoors.jsx';
import Flow from './Flow.jsx';
import Guarantee, { TrustStrip } from './Trust.jsx';
import Faq from './Faq.jsx';
import FinalCta from './FinalCta.jsx';
import { HOME_FAQS } from '../data/faqs.js';

/* One plain sentence each, true for a video and for an automation. */
const HOW_WE_WORK = [
  {
    title: 'Brief',
    body: 'A 15-minute call to get clear on your goal.',
  },
  {
    title: 'Make',
    body: 'We do the work for you, and you approve the plan before we start.',
  },
  {
    title: 'Deliver',
    body: 'You get a video ready to publish, or an automation running in the tools you already use.',
  },
  {
    title: 'Improve',
    body: 'We change what you ask us to change in a video, and we keep your automations running.',
  },
];

/**
 * Everything on the home page below the hero. Loaded as its own chunk
 * so the hero paints first.
 *
 * Selected work plays the featured film (the hero strip already shows
 * the range). Client logos and testimonials appear only once they are
 * filled in; each of those sections renders nothing while empty.
 */
export default function HomeSections() {
  return (
    <>
      <FeaturedWork location="home_work" />

      <ServiceDoors />

      <section className="section" id="how-we-work" aria-labelledby="how-we-work-title">
        <div className="wrap">
          <div className="head--center">
            <Reveal as="p" className="kicker">Process</Reveal>
            <Reveal as="h2" className="section__title" id="how-we-work-title" delay={0.04}>
              How we work
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.08}>
              Four steps, the same for a video or an automation.
            </Reveal>
          </div>
          <Flow steps={HOW_WE_WORK} />
        </div>
      </section>

      <TrustStrip />
      <Guarantee />

      <Faq
        id="questions"
        items={HOME_FAQS}
        eyebrow={null}
        title="Common questions"
        light
      />

      <FinalCta location="home_final_cta" />
    </>
  );
}
