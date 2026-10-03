import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { findWork, work } from '../content/work.js'
import { Go } from '../components/Transition.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'
import NotFound from './NotFound.jsx'

export default function CaseStudy() {
  const { slug } = useParams()
  const w = findWork(slug)
  const root = useRef(null)

  useEffect(() => { if (w) document.title = `${w.title} — Tarun Shetty` }, [w])

  useLayoutEffect(() => {
    if (!w || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.cs__title > span', { yPercent: 110, duration: 1, ease: 'expo.out', delay: 0.5 })
      gsap.utils.toArray('.cs__shot').forEach((el) =>
        gsap.from(el, { y: 80, rotation: gsap.utils.random(-3, 3), duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 85%' } }))
    }, root)
    return () => ctx.revert()
  }, [w])

  if (!w) return <NotFound />

  const live = work.filter((x) => x.status === 'live')
  const next = live[(live.indexOf(w) + 1) % live.length]

  return (
    <main className="cs" ref={root}>
      <header className="cs__head">
        <Go to="/#work" className="mono cs__back">← All work</Go>
        <h1 className="cs__title"><span>{w.title}</span></h1>
        <p className="cs__summary">{w.summary}</p>
        <dl className="cs__meta mono">
          <div><dt>Type</dt><dd>{w.kind}</dd></div>
          {w.year && <div><dt>Year</dt><dd>{w.year}</dd></div>}
          <div><dt>Stack</dt><dd>{w.stack.join(' · ')}</dd></div>
          <div><dt>Code</dt><dd><a href={w.repo} target="_blank" rel="noreferrer">GitHub ↗</a></dd></div>
        </dl>
      </header>

      <div className="cs__body">
        {w.sections.map(([h, p], i) => (
          <section className="cs__section" key={h}>
            <h2><span className="mono">0{i + 1}</span>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </div>

      <div className="cs__shots">
        {w.images.map((src, i) => (
          <figure className="cs__shot" key={src}><img src={src} alt={`${w.title} screenshot ${i + 1}`} loading="lazy" /></figure>
        ))}
      </div>

      <Go to={`/work/${next.slug}`} className="cs__next" data-cursor="next">
        <span className="mono">Next</span>
        <span>{next.title} →</span>
      </Go>
    </main>
  )
}
