import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScroll } from '../lib/motion.jsx'
import { useHomeMotion } from '../lib/useHomeMotion.js'
import Hero from '../sections/Hero.jsx'
import Builds, { Ticker } from '../sections/Builds.jsx'
import Process from '../sections/Process.jsx'
import Work from '../sections/Work.jsx'
import About from '../sections/About.jsx'
import Contact from '../sections/Contact.jsx'
import FoldStage, { useFoldMode } from '../components/FoldStage.jsx'

export default function Home() {
  const folding = useFoldMode()
  return folding ? <FoldHome /> : <ScrollHome />
}

/** Desktop: the folding napkin. */
function FoldHome() {
  const { hash } = useLocation()
  useEffect(() => { document.title = 'Tarun Shetty — You bring the napkin. I bring it back working.' }, [])
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => window.__foldGoTo?.(hash), 400)
    return () => clearTimeout(t)
  }, [hash])
  return <main className="fold-home"><FoldStage /></main>
}

/** Phones, short screens, reduced motion: the normal scrolling page. */
function ScrollHome() {
  const { hash } = useLocation()
  const scroll = useScroll()
  useHomeMotion()
  useEffect(() => { document.title = 'Tarun Shetty — You bring the napkin. I bring it back working.' }, [])
  // Deep links like tarunshetty.dev/#contact (handy in proposals): wait for
  // pins to measure, then jump.
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => scroll.scrollTo(hash, { immediate: true }), 350)
    return () => clearTimeout(t)
  }, [hash, scroll])
  return (
    <main>
      <Hero />
      <Ticker />
      <Builds />
      <Process />
      <Work />
      <About />
      <Contact />
    </main>
  )
}
