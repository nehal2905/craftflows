/**
 * ⚠ LEGAL REVIEW REQUIRED BEFORE GOING LIVE.
 * This copy was drafted to match how the site actually works today
 * (email capture via the diagnostic form, FormSubmit relay, Cal.com
 * scheduling, Netlify hosting, no analytics). Have counsel confirm it
 * before launch and re-confirm whenever a new processor is added.
 */
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { COMPANY } from '../data/founders.js';

const UPDATED = 'August 6, 2026';

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | Crafted Flows"
        description="What Crafted Flows collects, why, where it lives, and how to get it deleted. Written in plain language."
        path="/privacy"
      />
      <main id="top">
        <section className="section svc-hero">
          <div className="wrap wrap--narrow">
            <Reveal as="p" className="eyebrow">Privacy Policy</Reveal>
            <Reveal as="h1" className="section__title" delay={0.06}>
              Your data, handled carefully.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.12}>
              We collect almost nothing, and this page explains the little we
              do. No legalese where plain language will do.
            </Reveal>
            <Reveal as="p" className="legal-updated" delay={0.16}>
              Last updated {UPDATED}
            </Reveal>
          </div>
        </section>

        <section className="section section--tight">
          <div className="wrap wrap--narrow">
            <div className="prose">
              <h2>What we collect</h2>
              <p>
                One thing: your email address, and only if you type it into the
                Operational Efficiency Diagnostic form and press send. We don&rsquo;t
                run visitor tracking, we don&rsquo;t use advertising pixels, and we
                don&rsquo;t currently run analytics on this site. Browsing every page
                of craftedflows.com leaves nothing with us.
              </p>

              <h2>Why we collect it</h2>
              <p>
                To send you the diagnostic workbook you asked for, and the
                occasional note on automation we think is genuinely worth your
                time. That&rsquo;s the whole list. Every email includes a way to
                unsubscribe, and unsubscribing works the first time.
              </p>

              <h2>Where it lives</h2>
              <p>
                When you submit the form, your address is relayed to our inbox
                by FormSubmit, a form-relay service, and then lives in our
                email account. We don&rsquo;t maintain a separate marketing database
                or CRM of subscriber data beyond that inbox and, if we send
                notes by an email tool, that tool&rsquo;s list.
              </p>

              <h2>What we never do</h2>
              <p>
                We don&rsquo;t sell your data. We don&rsquo;t rent it, trade it, or share
                it with anyone for their marketing. Our team uses it to send
                you what you asked for, and for nothing else.
              </p>

              <h2>Third parties that touch your data</h2>
              <p>
                A small number of services process data on our behalf, each for
                one narrow job:
              </p>
              <ul>
                <li><strong>FormSubmit</strong> relays the diagnostic form submission to our inbox.</li>
                <li><strong>Our email provider</strong> stores and delivers the messages we exchange with you.</li>
                <li><strong>Cal.com</strong> handles scheduling if you book an audit call. What you enter there is covered by Cal.com&rsquo;s own privacy policy.</li>
                <li><strong>Netlify</strong> hosts this website and, like any host, keeps standard server logs.</li>
              </ul>
              <p>
                If we ever add analytics or any other processor, we&rsquo;ll update
                this page before it goes live.
              </p>

              <h2>How long we keep it</h2>
              <p>
                Until you unsubscribe or ask us to delete it. We don&rsquo;t keep
                addresses that have opted out, and we don&rsquo;t archive old lists
                &ldquo;just in case.&rdquo;
              </p>

              <h2>Deleting your data</h2>
              <p>
                Email us at <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>{' '}
                with &ldquo;delete my data&rdquo; and we&rsquo;ll remove your address from our
                records within 30 days, and confirm when it&rsquo;s done. You can also
                ask what we hold about you, and the answer will be short.
              </p>

              <h2>Questions</h2>
              <p>
                Anything unclear, or anything this page doesn&rsquo;t cover, write to{' '}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. A real
                person answers.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
