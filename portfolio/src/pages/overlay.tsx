import { type ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const labels: Record<string, string> = {
  commission: 'commission form under construction',
  webshare: 'webshare under construction',
  docs: 'docs coming soon',
}

const faqs = [
  {
    q: 'how does payment work',
    a: "half goes up front, the rest when you get the files. i'm fine using a middleman if it's your first time commissioning me. i'll take ltc, sol, eth, or paypal.",
  },
  {
    q: 'what about revisions',
    a: "i expect some back and forth — that's normal. if you start wanting something completely different halfway through, i'll stop and re-quote. catch it early and it's smooth.",
  },
  {
    q: 'who owns the code',
    a: "it's yours once i'm paid. i might put it in my portfolio without leaking anything private unless you ask me not to. just tell me and i won't mention it at all.",
  },
  {
    q: "do you sign nda's",
    a: "yes, no problem. send it over and i'll get it signed before i start anything.",
  },
]

export default function Overlay({ label, onClose }: { label: string; onClose: () => void }): ReactNode {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (label !== 'commission') {
    return (
      <div className="overlay-bg" onClick={onClose}>
        <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
          <span className="material-icons overlay-icon">construction</span>
          <p className="overlay-text">{labels[label] || 'under construction'}</p>
          <button className="overlay-close" onClick={onClose}>close</button>
        </div>
      </div>
    )
  }

  const toggleFAQ = (q: string) => {
    setExpanded(expanded === q ? null : q)
  }

  return (
    <div className="overlay-bg" onClick={onClose}>
      <div className="overlay-commission" onClick={(e) => e.stopPropagation()}>
        <button className="overlay-close" onClick={onClose}>close</button>

        <div className="eyebrow">
          <span className="dash" />
          commissions
        </div>
        <p className="handle" style={{ marginBottom: 0, fontSize: 13, lineHeight: 1.6, color: '#8a8a8a' }}>
          whatever you need
        </p>
        <div className="overlay-green">we finish your request together</div>

        <button className="overlay-proj-btn" onClick={() => { onClose(); navigate('/projects') }}>
          projects
          <span className="material-icons" style={{ fontSize: 16 }}>arrow_forward</span>
        </button>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          my speciality
        </div>
        <p className="overlay-body">
          i work with typescript end-to-end — next.js on the front, whatever works on the back.
          i build landing pages, dashboards, bots, internal tools, anything with a ui that needs to feel intentional.
          if it's on the web and you care about how it turns out, we'll get along.
        </p>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          skills
        </div>
        <div className="overlay-skills">
          <span>TypeScript</span><span>JavaScript</span><span>Python</span>
          <span>Lua</span><span>C++</span><span>Next.js</span>
          <span>React</span><span>Tailwind</span><span>Node.js</span>
          <span>Vite</span><span>Webpack</span><span>Express</span>
          <span>Prisma</span>
        </div>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          active build
        </div>
        <div className="overlay-build">
          <img className="overlay-build-img" src="/images/atomic.png" alt="" />
          <div className="overlay-build-name">how it works</div>
          <p className="overlay-body" style={{ margin: 0 }}>
            send me whatever you got — a sketch, a doc, a voice memo.
            i'll scope it out, quote you, and get moving.
            everything's tracked, nothing gets half-done.
          </p>
        </div>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          rates
        </div>
        <p className="overlay-body">
          small stuff starts at $50 — a landing page, a bot feature, a dashboard screen.
          bigger projects get priced after we actually talk about what you need.
          no surprises.
        </p>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          what i pass on
        </div>
        <p className="overlay-body">
          anything that's a race to the bottom, template filler, or feels like it's working against itself.
          i'd rather pass than ship something i can't stand behind.
        </p>

        <div className="eyebrow" style={{ marginTop: 24 }}>
          <span className="dash" />
          faq
        </div>
        <div className="overlay-faqs">
          {faqs.map((f) => (
            <div key={f.q} className="overlay-faq">
              <button className="overlay-faq-q" onClick={() => toggleFAQ(f.q)}>
                {f.q}
                <span className="material-icons" style={{ fontSize: 16, color: '#5a5a5a', transition: 'transform 0.2s', transform: expanded === f.q ? 'rotate(180deg)' : '' }}>arrow_downward</span>
              </button>
              {expanded === f.q && (
                <p className="overlay-body" style={{ margin: '6px 0 0 0' }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>

        <div className="contact-frame overlay-contact" onClick={() => { onClose(); navigate('/') }} style={{ cursor: 'pointer', marginTop: 28 }}>
          <div className="contact-frame-top">
            <span className="material-icons" style={{ fontSize: 28, color: '#e8e8e8' }}>discord</span>
            <div className="contact-frame-info">
              <span className="contact-frame-name">contact</span>
              <span className="contact-frame-handle">i respond faster on dc</span>
            </div>
            <div className="proj-dot" style={{ marginLeft: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
