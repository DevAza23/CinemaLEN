import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, Pause, Loader2, MessageSquare, ChevronUp, ChevronDown } from 'lucide-react'

/**
 * Sticky bottom podcast player.
 * States: idle → loading → ready (with audio) | error (show transcript).
 */
export default function PodcastPlayer({
  dialogue = [],
  audioUrl,
  audioLoading,
  audioError,
  movieTitle,
  onGenerate,
}) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)

  // Sync audio events
  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    const onTime = () => setProgress(el.currentTime)
    const onDur  = () => setDuration(el.duration || 0)
    const onEnd  = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('loadedmetadata', onDur)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('loadedmetadata', onDur)
      el.removeEventListener('ended', onEnd)
    }
  }, [audioUrl])

  const togglePlay = useCallback(() => {
    if (!audioUrl && !audioLoading) { onGenerate(); return }
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play(); setPlaying(true) }
  }, [audioUrl, audioLoading, playing, onGenerate])

  const seek = (e) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    audioRef.current.currentTime = pct * duration
  }

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60), sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const hasDialogue = dialogue.length > 0
  if (!hasDialogue) return null

  const pct = duration > 0 ? (progress / duration) * 100 : 0

  return (
    <>
      {/* Transcript overlay */}
      {showTranscript && (
        <div style={{
          position: 'fixed', bottom: 64, left: 0, right: 0, zIndex: 49,
          maxHeight: 280, overflowY: 'auto',
          background: 'var(--surface)', borderTop: '1px solid var(--border)',
          padding: '16px 24px',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 12 }}>
              Podcast Transcript
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {dialogue.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <span style={{
                    fontWeight: 700, fontSize: 12, flexShrink: 0, width: 38,
                    color: d.speaker === 'Alex' ? 'var(--amber)' : '#7cb3f5',
                  }}>
                    {d.speaker}
                  </span>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{d.line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Player bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        height: 56, background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 20px', gap: 14,
      }}>
        {audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}

        {/* Play button */}
        <button
          onClick={togglePlay}
          disabled={audioLoading}
          style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'var(--amber)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: audioLoading ? 0.5 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {audioLoading
            ? <Loader2 size={16} color="#080a0f" style={{ animation: 'spin 0.8s linear infinite' }} />
            : playing
              ? <Pause size={14} fill="#080a0f" color="#080a0f" />
              : <Play  size={14} fill="#080a0f" color="#080a0f" style={{ marginLeft: 2 }} />
          }
        </button>

        {/* Info */}
        <div style={{ flex: '0 0 auto', minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>
            {movieTitle || 'Podcast'}
          </p>
          <p style={{ fontSize: 10, color: 'var(--text-3)' }}>
            {audioUrl
              ? `${fmt(progress)} / ${fmt(duration)}`
              : audioError
                ? 'Audio unavailable — see transcript'
                : 'Click play to generate podcast'
            }
          </p>
        </div>

        {/* Progress bar */}
        <div
          onClick={seek}
          style={{
            flex: 1, height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,0.06)', cursor: audioUrl ? 'pointer' : 'default',
            position: 'relative',
          }}
        >
          <div style={{
            height: '100%', borderRadius: 2,
            background: 'var(--amber)',
            width: `${pct}%`,
            transition: 'width 0.1s linear',
          }} />
        </div>

        {/* Transcript toggle */}
        <button
          onClick={() => setShowTranscript(v => !v)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 4,
            color: showTranscript ? 'var(--amber)' : 'var(--text-3)',
            fontSize: 11, fontWeight: 500, flexShrink: 0,
            transition: 'color 0.15s',
          }}
        >
          <MessageSquare size={13} />
          <span className="hidden sm:inline">Transcript</span>
          {showTranscript ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
        </button>
      </div>
    </>
  )
}
