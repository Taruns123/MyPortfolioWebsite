import { useMemo } from 'react'
import { about } from '../content/site.js'
import { makeRough } from '../lib/sketch.js'

export default function About() {
  const frame = useMemo(() => makeRough(23).rect(8, 8, 384, 464, 6), [])
  return (
    <section className="about" id="about">
      <figure className="about__photo">
        {about.photo
          ? <img src={about.photo} alt="Tarun Shetty" width="400" height="480" loading="lazy" />
          : <div className="about__placeholder" aria-hidden="true"><span>TS</span><small className="mono">photo goes here</small></div>}
        <svg viewBox="0 0 400 480" preserveAspectRatio="none" aria-hidden="true">
          {frame.map((d, i) => <path key={i} d={d} />)}
        </svg>
      </figure>
      <div className="about__text">
        <span className="mono">About</span>
        <h2>{about.title}</h2>
        {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        <dl className="about__facts mono">
          {about.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>
      </div>
    </section>
  )
}
