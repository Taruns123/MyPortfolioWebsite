import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { contact, profile } from '../content/site.js'
import Typed from '../components/Typed.jsx'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.jsx'

/** The addressed, stamped side. Also drawn by the fold stage's 3D envelope, so the two match exactly. */
export function EnvelopeFront({ status = 'idle', flipped = false, stampRef, onFlip, decorative = false }) {
  return (
    <div className="envelope__face envelope__front" aria-hidden={decorative || flipped}>
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
      <div className={`envelope__sent mono${status === 'sent' ? ' is-on' : ''}`} ref={stampRef} aria-hidden={status !== 'sent'}>Sent ✓</div>
      <button type="button" className="envelope__flip mono" onClick={onFlip} tabIndex={decorative || flipped ? -1 : 0}>
        {status === 'sent' ? 'Write another ↻' : 'Flip to write ↻'}
      </button>
    </div>
  )
}

/** A blob of red wax pressed with a TS stamp: spread edge, raised rim, debossed monogram. */
function WaxSeal() {
  return (
    <svg className="seal__wax" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#c8372a" />
          <stop offset=".55" stopColor="#a1231a" />
          <stop offset="1" stopColor="#6e110c" />
        </radialGradient>
        <radialGradient id="wax-in" cx="60%" cy="65%" r="70%">
          <stop offset="0" stopColor="#b02a1f" />
          <stop offset="1" stopColor="#7d150f" />
        </radialGradient>
        {/* wax spreads unevenly: wobble the edge */}
        <filter id="wax-edge" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="12" />
          <feDisplacementMap in="SourceGraphic" scale="9" />
        </filter>
        {/* a little surface texture and gloss */}
        <filter id="wax-sheen" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="3" result="n" />
          <feDiffuseLighting in="n" surfaceScale=".6" lightingColor="#fff" result="l"><feDistantLight azimuth="225" elevation="55" /></feDiffuseLighting>
          <feComposite in="l" in2="SourceAlpha" operator="in" result="lit" />
          <feBlend in="SourceGraphic" in2="lit" mode="multiply" />
        </filter>
        <filter id="soft"><feGaussianBlur stdDeviation="1.6" /></filter>
      </defs>
      <g filter="url(#wax-sheen)">
        <path filter="url(#wax-edge)" fill="url(#wax)" d="M60 8c13 0 21 6 30 13s20 18 21 33-3 24-10 33-18 20-35 21-27-6-36-14S10 76 9 61s5-29 14-38S47 8 60 8z" />
        {/* the pressed disc: shadow on the upper rim, light on the lower */}
        <circle cx="60" cy="61" r="33" fill="none" stroke="#5a0d09" strokeWidth="3" opacity=".55" transform="translate(-1 -1.4)" />
        <circle cx="60" cy="61" r="33" fill="none" stroke="#ff9d8a" strokeWidth="2" opacity=".35" transform="translate(1 1.4)" />
        <circle cx="60" cy="61" r="32" fill="url(#wax-in)" />
        <circle cx="60" cy="61" r="26" fill="none" stroke="#5a0d09" strokeWidth="1" strokeDasharray="1.5 3" opacity=".6" />
        {/* the monogram is cut into the wax */}
        <g fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700" fontSize="30" textAnchor="middle">
          <text x="61" y="72" fill="#ff8f7c" opacity=".45">TS</text>
          <text x="59.3" y="70.3" fill="#4d0a06" opacity=".85">TS</text>
          <text x="60" y="71" fill="#93201a">TS</text>
        </g>
      </g>
      {/* gloss */}
      <ellipse cx="42" cy="30" rx="15" ry="7" fill="#fff" opacity=".28" transform="rotate(-30 42 30)" filter="url(#soft)" />
      <ellipse cx="85" cy="86" rx="7" ry="3" fill="#fff" opacity=".18" transform="rotate(-40 85 86)" filter="url(#soft)" />
    </svg>
  )
}

const initial = { name: '', email: '', kind: '', budget: '', message: '' }

/**
 * The napkin, folded all the way down, arrives as an envelope addressed to
 * me. It flips over (once on arrival, or with the button) to reveal the
 * letter on its back. Sending flips it back and stamps it SENT.
 */
export default function Contact({ stage = false, flip = false }) {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState('idle') // idle | sending | sent | failed
  const [flipped, setFlipped] = useState(() => !stage && prefersReducedMotion())
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
    if (stage) { gsap.set(card.current, { transformPerspective: 2000 }); return }
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.set(card.current, { transformPerspective: 2000 })
      gsap.from('.envelope', { y: 120, rotation: -6, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.envelope', start: 'top 85%' } })
      ScrollTrigger.create({ trigger: '.envelope', start: 'top 35%', once: true, onEnter: () => flipTo(true) })
    }, root)
    return () => ctx.revert()
  }, [stage])

  // In the fold stage, the scroll position decides which side is up.
  useEffect(() => { if (stage) flipTo(flip) }, [stage, flip])

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
    <section className={`contact${stage ? ' contact--stage' : ''}`} id="contact" ref={root}>
      <header className="contact__head">
        <Typed text={contact.command} className="mono contact__cmd" />
        <h2>{contact.title}</h2>
        <p>{contact.sub}</p>
      </header>

      <div className="envelope">
        <div className={`envelope__card${flipped ? ' is-flipped' : ''}`} ref={card}>
          {/* front: addressed, stamped */}
          <EnvelopeFront status={status} flipped={flipped} stampRef={stamp} onFlip={() => flipTo(true)} />

          {/* back: printed labels, filled in by hand */}
          <form className="envelope__face envelope__back letter" onSubmit={submit} aria-hidden={!flipped}>
            <div className="envelope__flap" aria-hidden="true" />
            <div className="letter__row">
              <label className="hand">
                <span className="mono">From</span>
                <input required autoComplete="name" placeholder="your name" value={form.name} onChange={set('name')} disabled={!flipped} />
              </label>
              <label className="hand">
                <span className="mono">Reply to</span>
                <input required type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={set('email')} disabled={!flipped} />
              </label>
            </div>
            <label className="hand hand--area">
              <span className="mono">The napkin: what should it do, and who is it for?</span>
              <textarea required rows="3" value={form.message} onChange={set('message')} disabled={!flipped} />
            </label>
            <fieldset className="ticks" disabled={!flipped}>
              <legend className="mono">Building</legend>
              {contact.kinds.map((k) => (
                <label key={k} className="tick">
                  <input type="radio" name="kind" value={k} checked={form.kind === k} onChange={set('kind')} />
                  <span className="tick__box" aria-hidden="true" />
                  <span>{k}</span>
                </label>
              ))}
            </fieldset>
            <fieldset className="ticks" disabled={!flipped}>
              <legend className="mono">Budget</legend>
              {contact.budgets.map((b) => (
                <label key={b} className="tick">
                  <input type="radio" name="budget" value={b} checked={form.budget === b} onChange={set('budget')} />
                  <span className="tick__box" aria-hidden="true" />
                  <span>{b}</span>
                </label>
              ))}
            </fieldset>
            <div className="envelope__actions">
              <button type="button" className="envelope__flip mono" onClick={() => flipTo(false)} tabIndex={flipped ? 0 : -1}>↻ Envelope</button>
              <p className="letter__status mono" role="status">
                {status === 'failed' && <>{contact.failure} <a href={`mailto:${profile.email}`}>{profile.email}</a></>}
              </p>
              <button className="seal" data-cursor="send" disabled={status === 'sending' || !flipped}>
                <WaxSeal />
                <span className="seal__label mono">{status === 'sending' ? 'Sealing…' : 'Seal & send'}</span>
              </button>
            </div>
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
