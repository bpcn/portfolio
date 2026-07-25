import { type ReactNode, type RefObject, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

export interface Track {
  title: string
  artist: string
  src: string
  cover: string
}

export const tracks: Track[] = [
  { title: 'dead fresh', artist: 'lil baby', src: '/music/dead.mp3', cover: '/images/dead.png' },
  { title: 'guaranteed', artist: 'lil baby', src: '/music/guaranteed.mp3', cover: '/images/trendsetter.jpeg' },
  { title: 'janice', artist: 'drake', src: '/music/janice.mp3', cover: '/images/janice.png' },
  { title: 'baby pluto', artist: 'lil uzi vert', src: '/music/baby.mp3', cover: '/images/baby.jpg' },
  { title: 'snap', artist: 'nav', src: '/music/nav.mp3', cover: '/images/nav.png' },
  { title: 'trendsetter', artist: 'lil baby', src: '/music/trendsetter.mp3', cover: '/images/trendsetter.jpeg' },
]

interface AudioCtx {
  audio: RefObject<HTMLAudioElement | null>
  current: number
  playing: boolean
  progress: number
  dur: number
  vol: number
  err: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  skip: (dir: number) => void
  seek: (pct: number) => void
  setVol: (v: number) => void
  select: (i: number) => void
}

const ctx = createContext<AudioCtx>(null!)

export function AudioProvider({ children }: { children: ReactNode }): ReactNode {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dur, setDur] = useState(0)
  const [vol, setVol] = useState(0.5)
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (!audio.current) {
      audio.current = new Audio()
      audio.current.volume = vol
    }
    const el = audio.current
    el.src = tracks[current].src
    el.load()

    const onTime = () => {
      if (el.duration) setProgress(el.currentTime / el.duration)
    }
    const onMeta = () => setDur(el.duration)
    const onEnd = () => {
      setPlaying(false)
      setProgress(0)
      setCurrent((i) => (i + 1 + tracks.length) % tracks.length)
    }
    const onError = () => setErr(true)
    const onPlayed = () => setPlaying(true)
    const onPaused = () => setPlaying(false)
    const onCanPlay = () => {
      if (audio.current) audio.current.play().catch(() => {})
    }

    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onMeta)
    el.addEventListener('ended', onEnd)
    el.addEventListener('error', onError)
    el.addEventListener('play', onPlayed)
    el.addEventListener('pause', onPaused)
    el.addEventListener('canplay', onCanPlay, { once: true })

    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onMeta)
      el.removeEventListener('ended', onEnd)
      el.removeEventListener('error', onError)
      el.removeEventListener('play', onPlayed)
      el.removeEventListener('pause', onPaused)
      el.removeEventListener('canplay', onCanPlay)
    }
  }, [current])

  useEffect(() => {
    if (audio.current) audio.current.volume = vol
  }, [vol])

  const play = useCallback(() => {
    if (!audio.current) return
    setErr(false)
    audio.current.play().catch(() => setErr(true))
  }, [])

  const pause = useCallback(() => {
    audio.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    playing ? pause() : play()
  }, [playing, play, pause])

  const skip = useCallback((dir: number) => {
    setCurrent((i) => (i + dir + tracks.length) % tracks.length)
    setProgress(0)
    setDur(0)
    setPlaying(false)
    setErr(false)
  }, [])

  const seek = useCallback((pct: number) => {
    if (!audio.current || !dur) return
    audio.current.currentTime = pct * dur
    setProgress(pct)
  }, [dur])

  const select = useCallback((i: number) => {
    setCurrent(i)
    setProgress(0)
    setDur(0)
    setPlaying(false)
    setErr(false)
  }, [])

  return (
    <ctx.Provider value={{ audio, current, playing, progress, dur, vol, err, play, pause, toggle, skip, seek, setVol, select }}>
      {children}
    </ctx.Provider>
  )
}

export const useAudio = () => useContext(ctx)
