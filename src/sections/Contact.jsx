import { useLayoutEffect, useRef, useState } from 'react'
import { contact, profile } from '../content/site.js'
import Typed from '../components/Typed.jsx'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.jsx'

const initial = { name: '', email: '', kind: '', budget: '', message: '' }

/**
 * The napkin, folded all the way down, arrives as an envelope addressed to
 * me. It flips over (once on arrival, or with the button) to reveal the
 * letter on its back. Sending flips it back and stamps it SENT.
 */
export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [flipped, setFlipped] = useState(() => prefersReducedMotion())
  const root = useRef(null)
  const card = useRef(null)
  const stamp = useRef(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const flipTo = (back) => {
    setFlipped(back)
    if (prefersReducedMotion()) return
    gsap.to(card.current, { rotationY: back ? 180 : 0, duration: 1, ease: 'expo.inOut' })
  }

  // The envelope slides in like it's being handed over, then flips to the letter once.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set(card.current, { transformPerspective: 2000 })
      gsap.from('.envelope', { y: 120, rotation: -6, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.envelope', start: 'top 85%' } })
      ScrollTrigger.create({ trigger: '.envelope', start: 'top 35%', once: true, onEnter: () => flipTo(true) })
    }, root)
    return () => ctx.revert()
  }, [])

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
      setForm(initial)
      // Seal it: flip back to the front and stamp it.
      flipTo(false)
      if (!prefersReducedMotion()) {
        gsap.fromTo(stamp.current, { scale: 2.4, rotation: -30, opacity: 0 }, { scale: 1, rotation: -12, opacity: 1, duration: 0.5, delay: 0.9, ease: 'back.out(2.4)' })
      }
    } catch (err) {
      console.error(err)
      setStatus('failed')
    }
  }

  return (
    <section className="contact" id="contact" ref={root}>
      <header className="contact__head">
        <Typed text={contact.command} className="mono contact__cmd" />
        <h2>{contact.title}</h2>
        <p>{contact.sub}</p>
      </header>

      <div className="envelope">
        <div className={`envelope__card${flipped ? ' is-flipped' : ''}`} ref={card}>
          {/* front: addressed, stamped */}
          <div className="envelope__face envelope__front" aria-hidden={flipped}>
            <div className="envelope__stamp" aria-hidden="true">
              <svg viewBox="0 0 80 96"><rect x="4" y="4" width="72" height="88" rx="2" /><path d="M20 62 q20 -34 40 0" /><circle cx="56" cy="30" r="8" /><text x="40" y="84" textAnchor="middle">₹ 30</text></svg>
            </div>
            <div className="envelope__postmark mono" aria-hidden="true"><span>Mumbai</span><span>2026</span></div>
            <div className="envelope__from mono">From: <span>you</span></div>
            <address className="envelope__to">
              <span className="mono">To</span>
              <strong>{profile.name}</strong>
              <span>Full-stack developer</span>
              <span>{profile.city}</span>
            </address>
            <div className={`envelope__sent mono${status === 'sent' ? ' is-on' : ''}`} ref={stamp} aria-hidden={status !== 'sent'}>Sent ✓</div>
            <button type="button" className="envelope__flip mono" onClick={() => flipTo(true)} tabIndex={flipped ? -1 : 0}>
              {status === 'sent' ? 'Write another ↻' : 'Flip to write ↻'}
            </button>
          </div>

          {/* back: the letter */}
          <form className="envelope__face envelope__back napkin" onSubmit={submit} aria-hidden={!flipped}>
            <div className="envelope__flap" aria-hidden="true" />
            <fieldset disabled={!flipped}>
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
              <textarea required rows="5" value={form.message} onChange={set('message')} disabled={!flipped} />
            </label>
            <fieldset disabled={!flipped}>
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
                <input required autoComplete="name" value={form.name} onChange={set('name')} disabled={!flipped} />
              </label>
              <label className="field">
                <span className="mono">Email</span>
                <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} disabled={!flipped} />
              </label>
            </div>
            <div className="envelope__actions">
              <button className="napkin__send" data-magnetic data-cursor="send" disabled={status === 'sending' || !flipped}>
                {status === 'sending' ? 'Sealing…' : 'Seal & send →'}
              </button>
              <button type="button" className="envelope__flip mono" onClick={() => flipTo(false)} tabIndex={flipped ? 0 : -1}>↻ Envelope</button>
            </div>
            <p className="napkin__status mono" role="status">
              {status === 'failed' && <>{contact.failure} <a href={`mailto:${profile.email}`}>{profile.email}</a></>}
            </p>
          </form>
        </div>
      </div>

      <p className="mono contact__direct">
        or email <a href={`mailto:${profile.email}`}>{profile.email}</a>
        {profile.bookingUrl && <> · <a href={profile.bookingUrl}>book a call</a></>}
      </p>
      <p className="sr-only" role="status">{status === 'sent' ? contact.success : ''}</p>
    </section>
  )
}
