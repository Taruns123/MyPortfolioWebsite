import { useLayoutEffect, useMemo, useRef } from 'react'
import { process } from '../content/site.js'
import { makeRough } from '../lib/sketch.js'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'

const XS = [150, 450, 750, 1050]

export default function Process() {
  const root = useRef(null)
  const { line, dots } = useMemo(() => {
    const r = makeRough(41)
    const pts = []
    for (let x = 30; x <= 1170; x += 60) pts.push([x, 60 + Math.sin(x / 90) * 6])
    return { line: r.poly(pts, 4), dots: XS.map((x) => r.circle(x, 60 + Math.sin(x / 90) * 6, 16)) }
  }, [])

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray('.process__line path')
      paths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }) })
      const [main, ...circles] = paths
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.process__line', start: 'top 80%', end: 'top 25%', scrub: 0.5 } })
      tl.to(main, { strokeDashoffset: 0, ease: 'none', duration: 1 })
      circles.forEach((c, i) => tl.to(c, { strokeDashoffset: 0, duration: 0.12 }, (XS[i] - 30) / 1140 - 0.02))
      gsap.from('.step', { y: 50, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.1, scrollTrigger: { trigger: '.steps', start: 'top 80%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="process" ref={root}>
      <header className="section-head">
        <span className="mono">How I work</span>
        <h2>{process.title}</h2>
      </header>
      <svg className="process__line" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path d={line} />
        {dots.map((d, i) => <path key={i} d={d} />)}
      </svg>
      <ol className="steps">
        {process.steps.map((s) => (
          <li className="step" key={s.n}>
            <div className="step__top mono"><span>{s.n}</span><span>{s.time}</span></div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      <dl className="facts mono">
        {process.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
    </section>
  )
}
