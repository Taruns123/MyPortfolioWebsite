import { useEffect } from 'react'
import { Go } from '../components/Transition.jsx'

export default function NotFound() {
  useEffect(() => { document.title = 'Not sketched yet — Tarun Shetty' }, [])
  return (
    <main className="nf">
      <span className="mono">404</span>
      <h1>This page never<br />made it off the napkin.</h1>
      <Go to="/" className="hero__cta">Back to the start →</Go>
    </main>
  )
}
