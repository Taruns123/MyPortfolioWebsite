import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useScroll } from '../lib/motion.jsx'
import Hero from '../sections/Hero.jsx'
import Builds, { Ticker } from '../sections/Builds.jsx'
import Process from '../sections/Process.jsx'
import Work from '../sections/Work.jsx'
import About from '../sections/About.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  const { hash } = useLocation()
  const scroll = useScroll()
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
