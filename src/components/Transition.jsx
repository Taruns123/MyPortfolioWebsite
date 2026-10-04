import { createContext, useCallback, useContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { gsap, prefersReducedMotion, useScroll } from '../lib/motion.jsx'

const TransitionContext = createContext(null)
export const useGo = () => useContext(TransitionContext)

/**
 * Page changes wipe a sheet of ink up over the page, swap the route
 * underneath, then pull the sheet away. Hash links on the home page just
 * scroll.
 */
export function TransitionProvider({ children }) {
  const cover = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()
  const scroll = useScroll()
  const busy = useRef(false)

  const go = useCallback((to) => {
    const [path, hash] = to.split('#')
    const target = path || '/'
    if (target === location.pathname) {
      if (hash && window.__foldGoTo?.(`#${hash}`)) return // the napkin decides where #hash lives
      if (hash) scroll.scrollTo(`#${hash}`)
      else scroll.scrollTo(0)
      return
    }
    if (busy.current) return
    const swap = () => {
      navigate(target)
      // wait a frame for the new page to mount before scrolling
      requestAnimationFrame(() => {
        if (hash) { if (!window.__foldGoTo?.(`#${hash}`)) scroll.scrollTo(`#${hash}`, { immediate: true }) }
        else scroll.scrollTo(0, { immediate: true })
      })
    }
    if (prefersReducedMotion()) { swap(); return }
    busy.current = true
    gsap.timeline({ onComplete: () => { busy.current = false } })
      .set(cover.current, { display: 'block', yPercent: 100 })
      .to(cover.current, { yPercent: 0, duration: 0.55, ease: 'expo.inOut' })
      .add(swap)
      .to(cover.current, { yPercent: -100, duration: 0.6, ease: 'expo.inOut', delay: 0.15 })
      .set(cover.current, { display: 'none' })
  }, [location.pathname, navigate, scroll])

  return (
    <TransitionContext.Provider value={go}>
      {children}
      <div ref={cover} className="cover" aria-hidden="true"><span>Tarun Shetty</span></div>
    </TransitionContext.Provider>
  )
}

/** <a> that routes through the ink transition. External links pass through. */
export function Go({ to, children, ...rest }) {
  const go = useGo()
  const external = /^(https?:|mailto:)/.test(to)
  if (external) return <a href={to} target={to.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...rest}>{children}</a>
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
