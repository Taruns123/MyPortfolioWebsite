import { createContext, useContext, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

const ScrollContext = createContext({ scrollTo: () => {} })
export const useScroll = () => useContext(ScrollContext)

/**
 * One Lenis instance for the whole app, driven by GSAP's ticker so
 * ScrollTrigger and smooth scroll never disagree about where we are.
 */
export function ScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1 })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const api = useRef({
    scrollTo(target, opts = {}) {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (lenisRef.current) lenisRef.current.scrollTo(el ?? target, { offset: -48, duration: 1.2, ...opts })
      else if (el && el.scrollIntoView) el.scrollIntoView()
      else window.scrollTo(0, typeof target === 'number' ? target : 0)
    },
    stop: () => lenisRef.current?.stop(),
    start: () => lenisRef.current?.start(),
  }).current

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export { gsap, ScrollTrigger }
