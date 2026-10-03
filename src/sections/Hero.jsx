import { useLayoutEffect, useRef } from 'react'
import { hero } from '../content/site.js'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'
import Typed from '../components/Typed.jsx'
import NapkinPad from '../components/NapkinPad.jsx'
import { Go } from '../components/Transition.jsx'

export default function Hero() {
  const root = useRef(null)
  const [l1, l2, accent] = hero.lines

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const scrib = root.current.querySelector('.scribble path')
      const L = scrib.getTotalLength()
      gsap.set(scrib, { strokeDasharray: L, strokeDashoffset: L })
      gsap.timeline({ delay: 0.15 })
        .from('.hero__intro', { y: 16, opacity: 0, duration: 0.7, ease: 'power3.out' })
        .from('.hero__line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.1 }, '-=0.5')
        .to(scrib, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.45')
        .from('.napkin-pad', { y: 60, rotation: 6, opacity: 0, duration: 1, ease: 'expo.out' }, '-=1.3')
        .from('.hero__sub', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.9')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root}>
      <p className="hero__intro">
        <mark>{hero.intro.name}</mark> — {hero.intro.line}
      </p>
      <h1 className="hero__title" aria-label={hero.lines.join(' ')}>
        <span className="hero__line"><span>{l1}</span></span>
        <span className="hero__line"><span>{l2}</span></span>
        <span className="hero__line">
          <span><em>{accent}
            <svg className="scribble" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 26 C 70 8, 140 34, 210 18 S 330 10, 396 22" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </em></span>
        </span>
      </h1>
      <div className="hero__pad">
        <span className="mono hero__cue" aria-hidden="true">{hero.cue}</span>
        <NapkinPad />
      </div>
      <div className="hero__sub">
        <p className="hero__lede">{hero.sub}</p>
        <div className="hero__term mono">
          {hero.terminal.map((t, i) => (
            <div key={t}><Typed text={t} prompt=">" onMount delay={900 + i * 900} speed={22} caret={i === hero.terminal.length - 1} /></div>
          ))}
        </div>
        <Go to="/#contact" className="hero__cta" data-cursor="say hi" data-magnetic>{hero.cta} →</Go>
      </div>
    </section>
  )
}
