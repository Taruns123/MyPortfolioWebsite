import { useEffect, useRef, useState } from 'react'
import { work } from '../content/work.js'
import { Go } from '../components/Transition.jsx'
import { gsap } from '../lib/motion.jsx'
import Scribble from '../components/Scribble.jsx'

/** Index of real work. On desktop a screenshot follows the cursor over each row. */
export default function Work() {
  const peek = useRef(null)
  const [img, setImg] = useState(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const xTo = gsap.quickTo(peek.current, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(peek.current, 'y', { duration: 0.45, ease: 'power3' })
    const rTo = gsap.quickTo(peek.current, 'rotation', { duration: 0.6, ease: 'power3' })
    let lastX = 0
    const move = (e) => {
      // flip to the left of the pointer near the right edge so it never leaves the screen
      xTo(e.clientX > innerWidth - 360 ? e.clientX - 344 : e.clientX + 24); yTo(e.clientY - 90)
      rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.8)) // lean into the direction of travel
      lastX = e.clientX
    }
    addEventListener('pointermove', move)
    return () => removeEventListener('pointermove', move)
  }, [])

  return (
    <section className="work" id="work">
      <header className="section-head">
        <span className="mono">Real work</span>
        <h2>Things I have actually shipped. <em>Two new case studies are in progress.</em></h2>
      </header>
      <ul className="work__list" onPointerLeave={() => setImg(null)}>
        {work.map((w, i) => {
          const live = w.status === 'live'
          const inner = (
            <>
              <span className="mono work__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="work__title">{w.title}</span>
              <span className="work__summary">{w.summary}</span>
              <span className="mono work__kind">{w.kind}</span>
              <span className="mono work__go">{live ? <>Read →<Scribble variant="circle" /></> : 'Soon'}</span>
            </>
          )
          return (
            <li key={w.slug} className={live ? '' : 'is-soon'} onPointerEnter={() => setImg(live ? w.images[0] : null)}>
              {live ? <Go to={`/work/${w.slug}`} className="work__row" data-cursor="read">{inner}</Go> : <div className="work__row">{inner}</div>}
            </li>
          )
        })}
      </ul>
      <div className={`work__peek${img ? ' is-on' : ''}`} ref={peek} aria-hidden="true">
        {img && <img src={img} alt="" />}
      </div>
    </section>
  )
}
