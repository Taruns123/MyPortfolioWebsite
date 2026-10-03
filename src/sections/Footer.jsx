import { profile } from '../content/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__row mono">
        <a href={`mailto:${profile.email}`}>{profile.email}</a>
        <span>{profile.city} · live {profile.liveWindowUtc}</span>
        <span className="footer__socials">
          {profile.socials.filter((s) => s.href).map((s) => <a key={s.name} href={s.href} target="_blank" rel="noreferrer">{s.name} ↗</a>)}
        </span>
      </div>
      <div className="footer__mark" aria-hidden="true">Tarun Shetty</div>
      <div className="footer__row mono">
        <span>© {new Date().getFullYear()}</span>
        <span>Sketched and built by hand in Mumbai.</span>
      </div>
    </footer>
  )
}
