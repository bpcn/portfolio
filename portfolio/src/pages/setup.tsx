import { type ReactNode, useState } from 'react'

type Tab = 'gaming' | 'working' | 'skills'

interface Hardware {
  icon: string
  name: string
  specs: string
}

interface App {
  src: string
  name: string
  desc: string
}

const gaming: Hardware[] = [
  { icon: 'monitor', name: 'asus 27"', specs: 'rog swift oled pg27aqdp · 1440p · 480hz · 0.03ms' },
  { icon: 'headset', name: 'cloud iii', specs: 'hyperx · wireless · 2.4ghz' },
  { icon: 'mouse', name: 'superlight 2', specs: 'logitech · 60g · hero 2 sensor' },
  { icon: 'keyboard', name: 'wooting 60he', specs: 'hall effect · rapid trigger · analog switches' },
]

const working: Hardware[] = [
  { icon: 'keyboard', name: 'mx keys mini', specs: 'logitech · wireless · low profile' },
  { icon: 'mouse', name: 'superlight 2', specs: 'logitech · 60g · hero 2 sensor' },
  { icon: 'monitor', name: 'asus 27"', specs: 'rog swift oled pg27aqdp · 1440p · 480hz · 0.03ms' },
  { icon: 'laptop', name: 'macbook m4', specs: 'apple · 2025 · 14-inch' },
]

const apps: App[] = [
  { src: '/images/vsc.png', name: 'VS Code', desc: 'coding obviously' },
  { src: '/images/vsc.png', name: 'Visual Studio', desc: 'build and design uis' },
  { src: '/images/brave.svg', name: 'Brave', desc: 'every day usage' },
  { src: '/images/firefox.svg', name: 'Firefox', desc: 'secondary more priv stuff' },
]

interface Skill {
  src: string
  name: string
}

const languages: Skill[] = [
  { src: '/images/typescript.svg', name: 'TypeScript' },
  { src: '/images/javascript.svg', name: 'JavaScript' },
  { src: '/images/python.svg', name: 'Python' },
  { src: '/images/lua.svg', name: 'Lua' },
  { src: '/images/cplusplus.svg', name: 'C++' },
]

const frameworks: Skill[] = [
  { src: '/images/nextdotjs.svg', name: 'Next.js' },
  { src: '/images/react.svg', name: 'React' },
  { src: '/images/tailwindcss.svg', name: 'Tailwind CSS' },
  { src: '/images/nodedotjs.svg', name: 'Node.js' },
  { src: '/images/vite.svg', name: 'Vite' },
  { src: '/images/webpack.svg', name: 'Webpack' },
  { src: '/images/express.svg', name: 'Express' },
  { src: '/images/prisma.svg', name: 'Prisma' },
]

export default function Setup(): ReactNode {
  const [tab, setTab] = useState<Tab>('gaming')
  const items = tab === 'gaming' ? gaming : working

  return (
    <div className="setup-page">
      <div className="card" style={{ width: 650 }}>
        <div className="eyebrow">
          <span className="dash" />
          what i use
        </div>

        <h1 className="card-name">setup</h1>

        <p className="handle" style={{ marginBottom: 16 }}>
          the hardware, editor, and apps that show up in my workflow most days.
        </p>

        <div className="setup-tabs">
          <button
            className={'setup-tab' + (tab === 'gaming' ? ' active' : '')}
            onClick={() => setTab('gaming')}
          >
            gaming
          </button>
          <span className="setup-tab-sep">|</span>
          <button
            className={'setup-tab' + (tab === 'working' ? ' active' : '')}
            onClick={() => setTab('working')}
          >
            working
          </button>
          <span className="setup-tab-sep">|</span>
          <button
            className={'setup-tab' + (tab === 'skills' ? ' active' : '')}
            onClick={() => setTab('skills')}
          >
            skills
          </button>
        </div>

        {tab === 'skills' ? (
          <>
            <div className="setup-subsection">languages</div>
            <div className="setup-skills-grid">
              {languages.map((l) => (
                <div className="setup-skills-item" key={l.name}>
                  <div className="setup-icon-frame-sm">
                    <img className="setup-img-sm" src={l.src} alt="" />
                  </div>
                  <span className="setup-name" style={{ fontSize: 12 }}>{l.name}</span>
                </div>
              ))}
            </div>

            <div className="setup-subsection" style={{ marginTop: 14 }}>frameworks & libraries</div>
            <div className="setup-skills-grid">
              {frameworks.map((f) => (
                <div className="setup-skills-item" key={f.name}>
                  <div className="setup-icon-frame-sm">
                    <img className="setup-img-sm" src={f.src} alt="" />
                  </div>
                  <span className="setup-name" style={{ fontSize: 12 }}>{f.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="setup-section">
              <span className="setup-section-head">hardware</span>
              <p className="setup-section-desc">all my setup goes here.</p>
            </div>

            <div className="setup-grid">
              {items.map((h) => (
                <div className="setup-item" key={h.name + h.specs}>
                  <span className="material-icons setup-icon">{h.icon}</span>
                  <span className="setup-name">{h.name}</span>
                  <span className="setup-specs">{h.specs}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="setup-section" style={{ marginTop: 20 }}>
          <div className="eyebrow">
            <span className="dash" />
            <span style={{ color: '#e8e8e8' }}>apps</span>
          </div>
          <p className="setup-section-desc">my apps for.</p>
        </div>

        <div className="setup-grid">
          {apps.map((a) => (
            <div className="setup-item" key={a.name}>
              <div className="setup-icon-frame">
                <img className="setup-img" src={a.src} alt="" />
              </div>
              <span className="setup-name">{a.name}</span>
              <span className="setup-specs">{a.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
