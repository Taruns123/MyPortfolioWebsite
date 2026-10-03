import { useEffect, useLayoutEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { findWork, work } from '../content/work.js'
import { Go } from '../components/Transition.jsx'
import { gsap, prefersReducedMotion } from '../lib/motion.jsx'
import NotFound from './NotFound.jsx'

/** A screenshot in a device frame: a browser window or a phone. */
function Shot({ shot, eager = false }) {
  const img = <img src={shot.src} alt={shot.caption} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  return (
    <figure className={`shot shot--${shot.device}`}>
      {shot.device === 'browser'
        ? <div className="frame frame--browser"><div className="frame__bar" aria-hidden="true"><i /><i /><i /></div>{img}</div>
        : <div className="frame frame--phone">{img}</div>}
      <figcaption className="mono">{shot.caption}</figcaption>
    </figure>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const w = findWork(slug)
  const root = useRef(null)

  useEffect(() => { if (w) document.title = `${w.title} — Tarun Shetty` }, [w])

  useLayoutEffect(() => {
    if (!w || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.cs__title > span', { yPercent: 110, duration: 1, ease: 'expo.out', delay: 0.5 })
      gsap.from('.cs__hero .shot', { y: 90, rotation: (i) => [-2, 1.5, -1][i % 3], opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.1, delay: 0.7 })
      gsap.from('.feature', { y: 40, opacity: 0, duration: 0.7, ease: 'expo.out', stagger: 0.06, scrollTrigger: { trigger: '.features', start: 'top 80%' } })
      gsap.utils.toArray('.cs__gallery .shot').forEach((el) =>
        gsap.from(el, { y: 80, rotation: gsap.utils.random(-2.5, 2.5), duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } }))
    }, root)
    return () => ctx.revert()
  }, [w])

  if (!w) return <NotFound />

  const live = work.filter((x) => x.status === 'live')
  const next = live[(live.indexOf(w) + 1) % live.length]
  const phoneFirst = w.shots[0].device === 'phone'
  const hero = phoneFirst ? w.shots.slice(0, 3) : w.shots.slice(0, 1)
  const rest = w.shots.slice(hero.length)
  const browsers = rest.filter((s) => s.device === 'browser')
  const phones = rest.filter((s) => s.device === 'phone')

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
          <div><dt>Code</dt><dd>{w.links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</dd></div>
        </dl>
      </header>

      <div className={`cs__hero${phoneFirst ? ' cs__hero--phones' : ''}`}>
        {hero.map((s) => <Shot key={s.src} shot={s} eager />)}
      </div>

      <section className="cs__overview">
        <h2><span className="mono">01</span>What it does</h2>
        <p>{w.overview}</p>
      </section>

      <section className="features">
        <h2 className="cs__label"><span className="mono">02</span>Features</h2>
        <ol>
          {w.features.map(([t, d], i) => (
            <li className="feature" key={t}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {(browsers.length > 0 || phones.length > 0) && (
        <section className="cs__gallery">
          {browsers.map((s) => <Shot key={s.src} shot={s} />)}
          {phones.length > 0 && <div className="cs__phones">{phones.map((s) => <Shot key={s.src} shot={s} />)}</div>}
        </section>
      )}

      <section className="cs__overview cs__built">
        <h2><span className="mono">03</span>How it’s built</h2>
        <p>{w.built}</p>
      </section>

      <Go to={`/work/${next.slug}`} className="cs__next" data-cursor="next">
        <span className="mono">Next</span>
        <span>{next.title} →</span>
      </Go>
    </main>
  )
}
