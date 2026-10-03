import { useRef, useState } from 'react'
import { contact, profile } from '../content/site.js'
import Typed from '../components/Typed.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'

const initial = { name: '', email: '', kind: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const plane = useRef(null)

  // The napkin folds into a paper plane and flies off.
  const fly = () => {
    if (prefersReducedMotion()) return
    gsap.timeline()
      .set(plane.current, { display: 'block', x: 0, y: 0, rotation: 0, scale: 0.4, opacity: 1 })
      .to(plane.current, { scale: 1, rotation: -12, duration: 0.25, ease: 'back.out(2)' })
      .to(plane.current, {
        keyframes: [
          { x: 160, y: -60, rotation: -24, duration: 0.35 },
          { x: 300, y: -40, rotation: 8, duration: 0.3 },
          { x: 900, y: -420, rotation: -34, opacity: 0, duration: 0.7, ease: 'power2.in' },
        ],
      })
      .set(plane.current, { display: 'none' })
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Loaded on demand so the email SDK never weighs down the first paint.
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Tarun Shetty',
          from_email: form.email,
          to_email: 'tarunshetty190702@gmail.com',
          message: `What: ${form.kind || '—'}\nBudget: ${form.budget || '—'}\n\n${form.message}`,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY,
      )
      setStatus('sent')
      fly()
      setForm(initial)
    } catch (err) {
      console.error(err)
      setStatus('failed')
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="contact__intro">
        <Typed text={contact.command} className="mono contact__cmd" />
        <h2>{contact.title}</h2>
        <p>{contact.sub}</p>
        <p className="mono contact__direct">
          or email <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.bookingUrl && <> · <a href={profile.bookingUrl}>book a call</a></>}
        </p>
      </div>

      <form className="napkin" onSubmit={submit}>
        <fieldset>
          <legend className="mono">What are we building?</legend>
          <div className="chips">
            {contact.kinds.map((k) => (
              <label key={k} className="chip">
                <input type="radio" name="kind" value={k} checked={form.kind === k} onChange={set('kind')} />
                <span>{k}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span className="mono">The napkin: what should it do, and who is it for?</span>
          <textarea required rows="5" value={form.message} onChange={set('message')} />
        </label>
        <fieldset>
          <legend className="mono">Rough budget</legend>
          <div className="chips">
            {contact.budgets.map((b) => (
              <label key={b} className="chip">
                <input type="radio" name="budget" value={b} checked={form.budget === b} onChange={set('budget')} />
                <span>{b}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="napkin__row">
          <label className="field">
            <span className="mono">Your name</span>
            <input required autoComplete="name" value={form.name} onChange={set('name')} />
          </label>
          <label className="field">
            <span className="mono">Email</span>
            <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} />
          </label>
        </div>
        <svg className="napkin__plane" ref={plane} viewBox="0 0 64 40" aria-hidden="true">
          <path d="M2 20 L62 2 L40 38 L30 24 Z M30 24 L62 2" />
        </svg>
        <button className="napkin__send" data-magnetic data-cursor="send" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send it →'}
        </button>
        <p className="napkin__status mono" role="status">
          {status === 'sent' && contact.success}
          {status === 'failed' && <>{contact.failure} <a href={`mailto:${profile.email}`}>{profile.email}</a></>}
        </p>
      </form>
    </section>
  )
}
