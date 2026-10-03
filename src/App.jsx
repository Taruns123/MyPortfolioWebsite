import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ScrollProvider, ScrollTrigger } from './lib/motion.jsx'
import { TransitionProvider } from './components/Transition.jsx'
import Rail from './components/Rail.jsx'
import InkTrail from './components/InkTrail.jsx'
import Cursor from './components/Cursor.jsx'
import Footer from './sections/Footer.jsx'
import Home from './pages/Home.jsx'
import CaseStudy from './pages/CaseStudy.jsx'
import NotFound from './pages/NotFound.jsx'

function RefreshOnRoute() {
  const { pathname } = useLocation()
  useEffect(() => {
    // New page = new trigger positions (pins add height).
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <ScrollProvider>
      <TransitionProvider>
        <a className="skip mono" href="#main">Skip to content</a>
        <Rail />
        <InkTrail />
        <Cursor />
        <RefreshOnRoute />
        <div id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </TransitionProvider>
    </ScrollProvider>
  )
}
