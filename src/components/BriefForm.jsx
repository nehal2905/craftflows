import { useState } from 'react';
import { Link } from 'react-router';
import { SITE, has } from '../data/site.js';
import { trackEvent } from '../lib/analytics.js';

const GOALS = ['More visibility', 'More sales', 'A launch', 'Other'];

const EMPTY = {
  name: '', email: '', business: '', website: '',
  goal: '', placement: '', deadline: '', budget: '', notes: '',
};

/* The brief as plain text, for the email fallback. */
function briefAsText(v) {
  return [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.business && `Business: ${v.business}`,
    v.website && `Website: ${v.website}`,
    v.goal && `Goal: ${v.goal}`,
    v.placement && `Where the video will run: ${v.placement}`,
    v.deadline && `Deadline: ${v.deadline}`,
    v.budget && `Budget: ${v.budget}`,
    v.notes && `\n${v.notes}`,
  ].filter(Boolean).join('\n');
}

/**
 * The video brief. Sends to the studio inbox through the same
 * FormSubmit relay as the diagnostic form. If the relay fails, the
 * visitor is told so and offered an email with the brief already
 * written: a brief is never reported as sent when it was not.
 *
 * @param {string} location  where the form sits, for analytics
 */
export default function BriefForm({ location = 'contact' }) {
  const [values, setValues] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    // Spam trap: real people never see or fill this field.
    if (e.currentTarget.elements._honey?.value) return;

    setStatus('sending');
    try {
      const res = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: values.name.trim(),
          email: values.email.trim(),
          Business: values.business.trim(),
          Website: values.website.trim(),
          Goal: values.goal,
          'Where the video will run': values.placement.trim(),
          Deadline: values.deadline.trim(),
          ...(values.budget ? { Budget: values.budget } : {}),
          'Anything to share': values.notes.trim(),
          _subject: `New video brief: ${values.business.trim() || values.name.trim()}`,
          _replyto: values.email.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || (data && String(data.success) === 'false')) throw new Error('relay failed');
      trackEvent('form_submit', { service: 'video', form: 'video_brief', location });
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent') {
    return (
      <div className="form__done" role="status">
        <h3>Thanks, your brief is in.</h3>
        <p>
          We&rsquo;ll read it and reply to {values.email.trim()}.
          {has(SITE.responseTime) && ` ${SITE.responseTime}`}
        </p>
      </div>
    );
  }

  const mailto =
    `mailto:${SITE.formFallbackEmail}?subject=${encodeURIComponent('Video brief')}` +
    `&body=${encodeURIComponent(briefAsText(values))}`;

  return (
    <form className="form" onSubmit={submit} aria-label="Video project brief">
      <div className="field">
        <label className="field__label" htmlFor="brief-name">Your name</label>
        <input
          id="brief-name" className="field__input" type="text" name="name"
          required autoComplete="name" value={values.name} onChange={set('name')}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-email">Email</label>
        <input
          id="brief-email" className="field__input" type="email" name="email"
          required autoComplete="email" value={values.email} onChange={set('email')}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-business">Business</label>
        <input
          id="brief-business" className="field__input" type="text" name="business"
          required autoComplete="organization" value={values.business} onChange={set('business')}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-website">
          Website <span className="field__opt">(optional)</span>
        </label>
        <input
          id="brief-website" className="field__input" type="text" name="website"
          inputMode="url" autoComplete="url" autoCapitalize="none"
          value={values.website} onChange={set('website')}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-goal">What is the goal?</label>
        <select
          id="brief-goal" className="field__input" name="goal"
          required value={values.goal} onChange={set('goal')}
        >
          <option value="" disabled>Choose one</option>
          {GOALS.map((goal) => <option key={goal} value={goal}>{goal}</option>)}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-placement">
          Where will the video run? <span className="field__opt">(optional)</span>
        </label>
        <input
          id="brief-placement" className="field__input" type="text" name="placement"
          placeholder="Instagram, website, a screen at an event"
          value={values.placement} onChange={set('placement')}
        />
      </div>

      <div className="field">
        <label className="field__label" htmlFor="brief-deadline">
          Deadline <span className="field__opt">(optional)</span>
        </label>
        <input
          id="brief-deadline" className="field__input" type="text" name="deadline"
          placeholder="A date, or no rush"
          value={values.deadline} onChange={set('deadline')}
        />
      </div>

      {/* Budget ranges are the owner's to set; the field appears once
          SITE.budgetRanges is filled in. */}
      {has(SITE.budgetRanges) && (
        <div className="field">
          <label className="field__label" htmlFor="brief-budget">
            Budget range <span className="field__opt">(optional)</span>
          </label>
          <select
            id="brief-budget" className="field__input" name="budget"
            value={values.budget} onChange={set('budget')}
          >
            <option value="">Not sure yet</option>
            {SITE.budgetRanges.map((range) => <option key={range} value={range}>{range}</option>)}
          </select>
        </div>
      )}

      <div className="field field--full">
        <label className="field__label" htmlFor="brief-notes">
          Anything you want to share <span className="field__opt">(optional)</span>
        </label>
        <textarea
          id="brief-notes" className="field__input" name="notes" rows={5}
          value={values.notes} onChange={set('notes')}
        />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="brief-hp">Leave this empty</label>
        <input id="brief-hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'failed' && (
        <p className="form__error" role="alert">
          That didn&rsquo;t send, and nothing has reached us yet. Please try again,
          or <a href={mailto}>email the brief to {SITE.formFallbackEmail}</a> instead.
          What you typed is still here.
        </p>
      )}

      <div className="form__actions">
        <button className="btn btn--primary btn--lg" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send the brief'}
          <span className="btn__arrow" aria-hidden="true">→</span>
        </button>
        <p className="form__note">
          We use what you send to reply about your project.
          {has(SITE.responseTime) && ` ${SITE.responseTime}`}{' '}
          See our <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
    </form>
  );
}
