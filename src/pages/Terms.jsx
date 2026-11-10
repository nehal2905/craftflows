/**
 * ⚠ LEGAL REVIEW REQUIRED BEFORE GOING LIVE.
 * The guarantee wording, payment structure, IP terms, and liability cap
 * below describe how we actually work, but they need counsel's sign-off.
 * The governing-law section stays hidden until COMPANY.jurisdiction is
 * set in src/data/founders.js. These terms describe the automation
 * service; video engagements need their own terms once the owner
 * confirms ownership, revisions and licensing.
 */
import Seo from '../components/Seo.jsx';
import Reveal from '../components/Reveal.jsx';
import { COMPANY } from '../data/founders.js';

const UPDATED = 'August 6, 2026';

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | Crafted Flows"
        description="The terms we work under: scope, the hours-back guarantee, payment structure, ownership of what we build, and liability."
        path="/terms"
      />
      <main id="top">
        <section className="section svc-hero">
          <div className="wrap wrap--narrow">
            <Reveal as="p" className="eyebrow">Terms of Service</Reveal>
            <Reveal as="h1" className="section__title" delay={0.06}>
              The terms we work under.
            </Reveal>
            <Reveal as="p" className="section__sub" delay={0.12}>
              Short, readable, and the same terms for everyone. Your project
              proposal adds specifics; it never quietly contradicts this page.
            </Reveal>
            <Reveal as="p" className="legal-updated" delay={0.16}>
              Last updated {UPDATED}
            </Reveal>
          </div>
        </section>

        <section className="section section--tight">
          <div className="wrap wrap--narrow">
            <div className="prose">
              <h2>What we do</h2>
              <p>
                Crafted Flows is a business automation studio. We design,
                build, and maintain custom automations for client reporting,
                onboarding, lead routing, internal operations, and similar
                workflows, on top of the tools you already use. The exact
                scope of each engagement is defined in a written proposal
                before any work begins. If it isn&rsquo;t in the proposal, it isn&rsquo;t
                in scope.
              </p>

              <h2>The hours-back guarantee</h2>
              <p>
                Every build ships with a stated target: the number of hours per
                week it should hand back to your team, agreed in the proposal.
                If, after thirty days of normal use, the automation isn&rsquo;t
                delivering the hours we scoped, we keep working on it at no
                additional build cost until it does, or we refund the build
                fee. The guarantee covers the workflows we scoped; it doesn&rsquo;t
                cover changes you make to the automation, upstream tools you
                remove, or scope added after sign-off.
              </p>

              <h2>Payment</h2>
              <p>
                Engagements are priced as a <strong>fixed build fee</strong>,
                agreed before we start, plus an optional{' '}
                <strong>monthly retainer</strong> for monitoring, maintenance,
                and improvements after handover. The build fee is invoiced per
                the schedule in your proposal. Retainers bill monthly and can be
                cancelled with thirty days&rsquo; written notice. Work pauses on
                invoices more than fourteen days overdue.
              </p>

              <h2>Who owns what</h2>
              <p>
                Once the build fee is paid in full, you own the automations we
                delivered: the scenarios, workflows, prompts, documents, and
                configuration built for you run in your accounts and stay yours
                if we part ways. We retain ownership of our general methods,
                templates, and know-how, which we&rsquo;re free to reuse. That never
                includes your data, credentials, or business-specific logic.
              </p>

              <h2>Third-party tools</h2>
              <p>
                Automations run on platforms we don&rsquo;t control, like Zapier,
                Make, your CRM, and your email provider. Their pricing,
                uptime, and API behavior are theirs. We build defensively
                around them and fix breakage caused by platform changes under
                an active retainer, but we can&rsquo;t warrant a third party&rsquo;s
                service.
              </p>

              <h2>Limitation of liability</h2>
              <p>
                To the maximum extent the law allows, our total liability for
                any claim arising from an engagement is capped at the fees you
                paid us for that engagement in the twelve months before the
                claim. We&rsquo;re not liable for indirect or consequential losses,
                such as lost profits, lost data, or business interruption, even
                where an automation was involved in the chain of events.
              </p>

              {/* Renders only once COMPANY.jurisdiction is filled in
                  (src/data/founders.js). No placeholder reaches the site. */}
              {COMPANY.jurisdiction && (
                <>
                  <h2>Governing law</h2>
                  <p>
                    These terms are governed by the laws of{' '}
                    <strong>{COMPANY.jurisdiction}</strong>, and any dispute falls
                    to the courts there. We&rsquo;d rather solve a problem over a
                    call than in a courtroom, and we&rsquo;ll always try that first.
                  </p>
                </>
              )}

              <h2>Changes and contact</h2>
              <p>
                If we change these terms, the date at the top changes with
                them, and material changes get an email to active clients.
                Questions before you sign anything:{' '}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
