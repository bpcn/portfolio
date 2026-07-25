import { type ReactNode, useEffect, useState } from 'react'

interface LanyardData {
  discord_user?: {
    avatar: string
    username: string
    id: string
    global_name?: string
  }
}

const USER_ID = '1409006135087988767'
const DISCORD_URL = 'https://discord.com/users/1409006135087988767'
const GITHUB_URL = 'https://github.com/bpcn'
const TELEGRAM_URL = 'https://t.me/sextaped'

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener')
}

export default function Contact(): ReactNode {
  const [data, setData] = useState<LanyardData | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/' + USER_ID)
      .then((r) => r.json())
      .then((d) => setData(d.data))
      .catch(() => {})
  }, [])

  const avatar = data?.discord_user
    ? `https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}.png`
    : null

  const username = data?.discord_user?.username || '...'

  const copyHandle = () => {
    navigator.clipboard.writeText('@' + username)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="contact-page">
      <div className="card" style={{ width: 650 }}>
        <div className="eyebrow">
          <span className="dash" />
          talk to me
        </div>

        <h1 className="card-name">contact</h1>

        <p className="handle" style={{ marginBottom: 20 }}>
          open for collabs, questions, or just a hello &mdash; discord's fastest, but pick whatever works.
        </p>

        <div className="contact-frame">
          <div className="contact-frame-top">
            {avatar && <img className="contact-avatar" src={avatar} alt="" />}
            <div className="contact-frame-info">
              <span className="contact-frame-name">{data?.discord_user?.global_name || username}</span>
              <span className="contact-frame-handle"><span style={{ color: '#5a5a5a' }}>@</span>{username}</span>
            </div>
          </div>
          <div className="contact-frame-btns">
            <button className="contact-btn" onClick={copyHandle}>
              <span className="material-icons" style={{ fontSize: 14, color: copied ? '#e8e8e8' : '' }}>{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'copied!' : 'copy handle'}
            </button>
            <button className="contact-btn" onClick={() => openUrl(DISCORD_URL)}>
              <span className="material-icons" style={{ fontSize: 14 }}>open_in_new</span>
              open
            </button>
          </div>
        </div>

        <div className="contact-row">
          <div className="contact-frame" onClick={() => openUrl(GITHUB_URL)} style={{ cursor: 'pointer' }}>
            <div className="contact-frame-top">
              <img className="contact-logo" src="/images/github.svg" alt="" />
              <div className="contact-frame-info">
                <span className="contact-frame-name"><span style={{ color: '#5a5a5a' }}>@</span>bpcn</span>
                <span className="contact-frame-handle">repos & stuff</span>
              </div>
            </div>
          </div>

          <div className="contact-frame" onClick={() => openUrl(TELEGRAM_URL)} style={{ cursor: 'pointer' }}>
            <div className="contact-frame-top">
              <img className="contact-logo" src="/images/telegram.svg" alt="" />
              <div className="contact-frame-info">
                <span className="contact-frame-name"><span style={{ color: '#5a5a5a' }}>@</span>sextaped</span>
                <span className="contact-frame-handle">only when ur serious about something</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
