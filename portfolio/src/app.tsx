import { type ReactNode } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AudioProvider } from './audio-context'
import Home from './pages/home'
import Music from './pages/music'
import Projects from './pages/projects'
import Setup from './pages/setup'
import Contact from './pages/contact'

const items = [
  { icon: 'home', label: 'Home', path: '/' },
  { icon: 'music_note', label: 'Music', path: '/music' },
  { icon: 'business_center', label: 'Projects', path: '/projects' },
  { icon: 'laptop', label: 'Setup', path: '/setup' },
  { icon: 'mail', label: 'Contact', path: '/contact' },
]

function NavButton({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }): ReactNode {
  return (
    <button
      className={'nav-button' + (active ? ' active' : '')}
      aria-label={label}
      onClick={onClick}
    >
      <span className="material-icons">{icon}</span>
    </button>
  )
}

export default function App(): ReactNode {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <AudioProvider>
    <div className="app">
      <nav className="frame">
        {items.map((item) => (
          <NavButton
            key={item.icon}
            icon={item.icon}
            label={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/music" element={<Music />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
    </AudioProvider>
  )
}
