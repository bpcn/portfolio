import { type ReactNode, useEffect, useState } from 'react'
import Overlay from './overlay'

interface LanyardData {
  discord_user?: {
    avatar: string
    username: string
    id: string
    global_name?: string
  }
}

const DISCORD = 'https://discord.com/users/1409006135087988767'
const GITHUB = 'https://github.com/bpcn'

function open(url: string) {
  window.open(url, '_blank', 'noopener')
}

export default function Home(): ReactNode {
  const [data, setData] = useState<LanyardData | null>(null)
  const [overlay, setOverlay] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/1409006135087988767')
      .then((r) => r.json())
      .then((d) => setData(d.data))
      .catch(() => {})
  }, [])

  const avatar = data?.discord_user
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`
    : null

  const name = data?.discord_user?.global_name || data?.discord_user?.username

  return (
    <>
      <div className="card">
        <div className="eyebrow">
          <span className="dash"></span>
          hey there
        </div>

        <h1 className="card-name">{name || '...'}</h1>

        <div className="handle">
          {avatar && <img className="handle-avatar" src={avatar} alt="" />}
          @{data?.discord_user?.username || '...'}
        </div>

        <div className="bio-box">
          advanced in <b>web development</b> and <b>discord apps</b>.
          i code lua and cheat softwares,
          i also reverse x64 and x86.
          check out my <b onClick={() => open(DISCORD)} className="link">projects</b> or find me on <b onClick={() => open(DISCORD)} className="link">discord</b>.
        </div>

        <div className="pills">
          <button className="pill" onClick={() => open(DISCORD)}>
            <svg className="pill-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .079.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.128c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.04.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.001-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.662a.06.06 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Discord
          </button>

          <button className="pill" onClick={() => open(GITHUB)}>
            <svg className="pill-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
            </svg>
            GitHub
          </button>

          <button className="pill" onClick={() => setOverlay('commission')}>
            <svg className="pill-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.16c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.063-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.479.328-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.752-.244-1.349-.373-1.297-.788.027-.216.324-.437.892-.663 3.497-1.523 5.829-2.527 6.998-3.012 3.332-1.386 4.023-1.627 4.475-1.635.099-.002.321.023.464.139.121.098.154.23.17.323.016.093.036.306.02.472z" />
            </svg>
            commission
          </button>

          <button className="pill webshare" onClick={() => setOverlay('webshare')}>
            <span className="bars"><span></span><span></span><span></span></span>
            webshare
          </button>
        </div>
      </div>

      {overlay && <Overlay label={overlay} onClose={() => setOverlay(null)} />}
    </>
  )
}
