import { useLayoutEffect, useRef } from 'react'
import { builds } from '../content/builds.js'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion.jsx'
import { ticker } from '../content/site.js'
import BuildSection from '../components/BuildSection.jsx'

export function Ticker() {
  const items = [...ticker, ...ticker]
  const track = useRef(null)

  // Loops on its own; scrolling fast speeds it up and leans it like it's being dragged.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const loop = gsap.to(track.current, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 })
    const skewTo = gsap.quickTo(track.current, 'skewX', { duration: 0.5, ease: 'power3' })
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity()
        gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(v) / 250, 7), duration: 0.2, overwrite: true })
        gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.2, ease: 'power2.out' })
        skewTo(gsap.utils.clamp(-12, 12, v / -180))
        clearTimeout(st.t); st.t = setTimeout(() => skewTo(0), 120)
      },
    })
    return () => { loop.kill(); st.kill() }
  }, [])

  return (
    <div className="ticker mono" aria-label={ticker.join(', ')}>
      <div className="ticker__track" ref={track} aria-hidden="true">
        {items.map((t, i) => <span key={i}>{t} <b>✶</b></span>)}
      </div>
    </div>
  )
}

export default function Builds() {
  return (
    <div id="builds">
      <header className="section-head">
        <span className="mono">Builds</span>
        <h2>Four things I build. <em>Watch each one go from napkin to shipped.</em></h2>
      </header>
      {builds.map((b) => <BuildSection key={b.key} build={b} />)}
    </div>
  )
}
