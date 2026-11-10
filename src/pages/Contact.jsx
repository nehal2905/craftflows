import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import BriefSection from '../components/BriefSection.jsx';

export default function Contact() {
  return (
    <>
      <Seo
        title="Start a Project | Crafted Flows"
        description="Tell us about your video project, or book a 15-minute automation audit. Crafted Flows replies to every brief."
        path="/contact"
      />

      <main id="top">
        <section className="section svc-hero" aria-labelledby="contact-title">
          <div className="wrap wrap--narrow">
            <Reveal as="h1" className="section__title" id="contact-title" delay={0.04}>
              Tell us the goal.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.1}>
              Send a video brief below, or book an automation audit if that&rsquo;s
              what you need. One studio, two doors.
            </Reveal>
          </div>
        </section>

        <BriefSection
          location="contact"
          heading="h2"
          title="Start a video project"
          sub="Tell us the goal and where the video will run. We take it from there."
          divider={false}
          className="section section--tight"
        />
      </main>
    </>
  );
}
