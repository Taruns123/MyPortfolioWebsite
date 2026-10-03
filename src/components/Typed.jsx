import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion.jsx'

/**
 * Terminal-style typing. Starts when scrolled into view (or on mount with
 * `onMount`). Screen readers get the full text immediately.
 */
export default function Typed({ text, prompt = '$', onMount = false, delay = 0, speed = 34, caret = true, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(prefersReducedMotion() ? text : '')

  useEffect(() => {
    if (prefersReducedMotion()) return
    let timer, timeout
    const run = () => {
      timeout = setTimeout(() => {
        let i = 0
        timer = setInterval(() => {
          i += 1
          setShown(text.slice(0, i))
          if (i >= text.length) clearInterval(timer)
        }, speed)
      }, delay)
    }
    if (onMount) {
      run()
      return () => { clearTimeout(timeout); clearInterval(timer) }
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { run(); io.disconnect() }
    }, { threshold: 0.6 })
    io.observe(ref.current)
    return () => { io.disconnect(); clearTimeout(timeout); clearInterval(timer) }
  }, [text, onMount, delay, speed])

  return (
    <span ref={ref} className={`typed ${className}`} aria-label={`${prompt ? prompt + ' ' : ''}${text}`}>
      <span aria-hidden="true">
        {prompt && <span className="typed__prompt">{prompt} </span>}
        {shown}
        {caret && <span className="typed__caret" />}
      </span>
    </span>
  )
}
