import { type ReactNode, useState, useRef } from 'react'
import Overlay from './overlay'

export default function Projects(): ReactNode {
  const [img, setImg] = useState(1)
  const [prev, setPrev] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [overlay, setOverlay] = useState<string | null>(null)

  const switchImg = (n: number) => {
    if (n === img) return
    setPrev(img)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setImg(n)
      setPrev(null)
    }, 250)
  }

  return (
    <>
      <div className="proj-page">
        <button className="proj-banner" onClick={() => setOverlay('commission')}>
          <span>taking commissions $50+</span>
          <span className="proj-dot" />
          <span>any request</span>
          <span className="proj-inquire">
            inquire
            <span className="material-icons" style={{ fontSize: 14 }}>arrow_forward</span>
          </span>
        </button>

        <div className="card" style={{ width: 700, marginTop: 24 }}>
          <div className="eyebrow">
            <span className="dash" />
            my stuff ig
          </div>

          <h1 className="card-name">projects</h1>

          <p className="handle" style={{ marginBottom: 20 }}>
            random commissions, collabs & personal projects ive worked on.
          </p>

          <div className="proj-gallery">
            <div className="proj-img-wrap">
              <div className="proj-img-stack">
                <img className="proj-img" src={`/images/atomic${img}.png`} alt="" />
                {prev && <img className="proj-img proj-img-leave" src={`/images/atomic${prev}.png`} alt="" />}
              </div>
            </div>
            <div className="proj-img-btns">
              <button
                className={'proj-img-btn' + (img === 1 ? ' active' : '')}
                onClick={() => switchImg(1)}
              >
                1
              </button>
              <button
                className={'proj-img-btn' + (img === 2 ? ' active' : '')}
                onClick={() => switchImg(2)}
              >
                2
              </button>
              <button
                className={'proj-img-btn' + (img === 3 ? ' active' : '')}
                onClick={() => switchImg(3)}
              >
                3
              </button>
            </div>
          </div>

          <div className="proj-card">
            <div className="proj-gallery" style={{ marginBottom: 12 }}>
              <div style={{ width: 100, flexShrink: 0 }}>
                <img className="proj-img" src="/images/atomic.png" alt="" style={{ borderRadius: 6 }} />
              </div>
            </div>
            <div className="proj-card-top">
              <h2 className="proj-title">Atomic</h2>
            </div>
            <p className="proj-desc">
              The best current da hood script on the market, taps known products such as ecco, cider, prada, glory.
            </p>
            <div className="proj-card-bottom">
              <button className="proj-view" onClick={() => window.open('https://beatomic.club', '_blank')}>
                view project
                <span className="material-icons" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
              <button className="proj-discord" onClick={() => window.open('https://discord.gg/beatomic', '_blank')}>
                <svg className="proj-discord-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.04.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.662a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                join server
              </button>
            </div>
          </div>

          <div className="proj-card" style={{ marginTop: 10 }}>
            <div className="proj-gallery" style={{ marginBottom: 12 }}>
              <div style={{ width: 100, flexShrink: 0 }}>
                <img className="proj-img" src="/images/authium.png" alt="" style={{ borderRadius: 6 }} />
              </div>
            </div>
            <div className="proj-card-top">
              <h2 className="proj-title">Authium</h2>
            </div>
            <p className="proj-desc">
              a whitelist system with its own obfuscation built by me and gael. key-based auth, live validation, lightweight asf. keeps your shit safe.
            </p>
            <div className="proj-card-bottom">
              <button className="proj-view">
                view project
                <span className="material-icons" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
              <button className="proj-discord">
                <svg className="proj-discord-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.04.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.662a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                join server
              </button>
            </div>
          </div>
        </div>
      </div>

      {overlay && <Overlay label={overlay} onClose={() => setOverlay(null)} />}
    </>
  )
}
