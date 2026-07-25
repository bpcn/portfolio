import { type ReactNode, useRef, useState, useEffect } from 'react'
import { useAudio, tracks } from '../audio-context'

interface Line {
  time: number
  text: string
}

function parseSynced(raw: string): Line[] {
  const lines: Line[] = []
  for (const line of raw.split('\n')) {
    const m = line.match(/^\[(\d+):(\d+[.]\d+)\](.*)/)
    if (m) {
      const time = Number(m[1]) * 60 + Number(m[2])
      const text = m[3].trim()
      if (text) lines.push({ time, text })
    }
  }
  return lines
}

export default function Music(): ReactNode {
  const { audio, current, playing, progress, dur, vol, err, toggle, skip, seek: seekPct, setVol, select: pick } = useAudio()
  const linesRef = useRef<Line[]>([])
  const [lines, setLines] = useState<Line[]>([])
  const [active, setActive] = useState(-1)
  const [showList, setShowList] = useState(false)

  const track = tracks[current]

  useEffect(() => {
    setLines([])
    setActive(-1)
    ;(async () => {
      const q = encodeURIComponent(`${track.artist} ${track.title}`)
      try {
        const res = await fetch(`https://lrclib.net/api/search?q=${q}`, {
          headers: { 'User-Agent': 'portfolio/1.0' },
        })
        if (res.ok) {
          const list: any[] = await res.json()
          const synced = list.find(
            (x) =>
              x.syncedLyrics &&
              x.artistName.toLowerCase().includes(track.artist.toLowerCase()) &&
              x.trackName.toLowerCase().includes(track.title.toLowerCase())
          ) || list.find((x) => x.syncedLyrics)
          if (synced) {
            setLines(parseSynced(synced.syncedLyrics))
            return
          }
        }
      } catch {}
      try {
        const res = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(track.artist)}/${encodeURIComponent(track.title)}`)
        if (res.ok) {
          const data = await res.json()
          if (data.lyrics) {
            setLines(data.lyrics.split('\n').filter((l: string) => l.trim()).map((l: string, i: number) => ({ time: i, text: l })))
          }
        }
      } catch {}
    })()
  }, [current, track.artist, track.title])

  useEffect(() => {
    linesRef.current = lines
  }, [lines])

  useEffect(() => {
    const el = audio.current
    if (!el) return
    const onTime = () => {
      if (!el.duration) return
      const pct = el.currentTime / el.duration
      const lns = linesRef.current
      if (!lns.length) return
      const synced = lns.length > 3 && lns[3].time > 4
      let idx = -1
      if (synced) {
        for (let i = lns.length - 1; i >= 0; i--) {
          if (el.currentTime >= lns[i].time + 1.0) { idx = i; break }
        }
      } else {
        idx = Math.min(Math.floor(pct * lns.length), lns.length - 1)
      }
      setActive(idx)
    }
    el.addEventListener('timeupdate', onTime)
    return () => el.removeEventListener('timeupdate', onTime)
  }, [audio])

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio.current || !dur) return
    const rect = e.currentTarget.getBoundingClientRect()
    seekPct((e.clientX - rect.left) / rect.width)
  }

  const select = (i: number) => {
    pick(i)
    setActive(-1)
    setShowList(false)
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const ctime = progress && dur ? fmt(progress * dur) : '0:00'
  const dtime = dur ? fmt(dur) : '0:00'
  const offset = active >= 0 ? Math.max(0, active - 2) : 0

  return (
    <>
    <div className="music-page">
      <div className="music-left">
        {showList && <div className="list-bg" onClick={() => setShowList(false)} />}
        <div className="player">
          <div className="player-cover-wrap">
            <img className="player-cover" src={track.cover} alt="" />
          </div>

          <div className="player-info">
            <p className="player-title">{track.title}</p>
            <p className="player-artist">{track.artist}</p>
          </div>

          <div className="player-bar-wrap" onClick={seek}>
            <div className="player-bar">
              <div className="player-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          <div className="player-time">
            <span>{ctime}</span>
            <span>{dtime}</span>
          </div>

          <div className="player-controls">
            <button className="ctrl-btn" onClick={() => skip(-1)}>
              <span className="material-icons">skip_previous</span>
            </button>
            <button className="ctrl-btn ctrl-play" onClick={toggle}>
              <span className="material-icons">{playing ? 'pause' : 'play_arrow'}</span>
            </button>
            <button className="ctrl-btn" onClick={() => skip(1)}>
              <span className="material-icons">skip_next</span>
            </button>
          </div>

          <div className="volume-wrap">
            <span className="material-icons vol-icon">volume_up</span>
            <input
              className="vol-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={vol}
              onChange={(e) => setVol(Number(e.target.value))}
            />
          </div>

          <button className="dots-btn" onClick={() => setShowList(true)}>
            <span className="material-icons">more_horiz</span>
          </button>

          {err && <p className="player-err">file not found — drop your mp3 in /public/music/</p>}
        </div>

        {showList && (
          <div className="list-card-left" onClick={(e) => e.stopPropagation()}>
            <p className="list-head">playlist</p>
            <div className="list-items">
              {tracks.map((t, i) => (
                <button
                  key={i}
                  className={'list-item' + (i === current ? ' active' : '')}
                  onClick={() => select(i)}
                >
                  <img className="list-cover" src={t.cover} alt="" />
                  <span className="list-info">
                    <span className="list-title">{t.title}</span>
                    <span className="list-artist">{t.artist}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="music-right">
        {lines.length > 0 ? (
          <div className="lyrics-window">
            <div
              className="lyrics-scroll"
              style={{ transform: `translateY(${-offset * 30}px)` }}
            >
              {lines.map((l, i) => (
                <p
                  key={i}
                  className={'lyric-line' + (i === active ? ' active' : '')}
                >
                  {l.text}
                </p>
              ))}
            </div>
          </div>
        ) : err ? null : (
          <p className="lyrics-placeholder">looking for lyrics...</p>
        )}
      </div>
    </div>
    </>
  )
}
