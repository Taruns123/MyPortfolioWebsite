import { useLayoutEffect, useRef } from 'react'
import { hero } from '../content/site.js'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'
import Typed from '../components/Typed.jsx'
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
        .from('.hero__line > span', { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.12 })
        .to(scrib, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, '-=0.45')
        .from('.hero__sub', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=1.1')
      // The headline leans back as you scroll away from it.
      gsap.to('.hero__title', { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={root}>
      <span className="mono hero__cue">{hero.cue}</span>
      <h1 className="hero__title" aria-label={hero.lines.join(' ')}>
        <span className="hero__line"><span>{l1}</span></span>
        <span className="hero__line">
          <span>{l2} <em>{accent}
            <svg className="scribble" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M4 26 C 70 8, 140 34, 210 18 S 330 10, 396 22" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </em></span>
        </span>
      </h1>
      <div className="hero__sub">
        <p className="hero__lede">{hero.sub}</p>
        <div className="hero__term mono">
          {hero.terminal.map((t, i) => (
            <div key={t}><Typed text={t} prompt=">" onMount delay={900 + i * 900} speed={22} caret={i === hero.terminal.length - 1} /></div>
          ))}
        </div>
        <Go to="/#contact" className="hero__cta">{hero.cta} →</Go>
      </div>
    </section>
  )
}
