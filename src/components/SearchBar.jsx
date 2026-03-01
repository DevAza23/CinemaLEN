import { useState, useRef, useEffect } from 'react'
import { Search, Settings } from 'lucide-react'

const SUGGESTIONS = ['Inception', 'The Godfather', 'Parasite', 'Interstellar', 'Blade Runner 2049']

export default function SearchBar({ onSearch, loading, onSettings }) {
  const [query, setQuery] = useState('')
  const ref = useRef(null)
  useEffect(() => ref.current?.focus(), [])

  const submit = (e) => {
    e.preventDefault()
    if (query.trim() && !loading) onSearch(query.trim())
  }

  return (
    <div style={{ width: '100%', maxWidth: 520, margin: '0 auto', padding: '0 24px' }} className="fade-up">

      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 8 }}>
          Film Research Dashboard
        </p>
        <h1 className="heading" style={{ fontSize: 56, lineHeight: 1, color: 'var(--text)' }}>
          CinemaLens
        </h1>
        <p style={{ marginTop: 10, color: 'var(--text-2)', fontSize: 14 }}>
          Search any film. Get cast, locations, soundtrack, production details, awards, trivia and a podcast — all AI-generated.
        </p>
      </div>

      {/* Search input */}
      <form onSubmit={submit}>
        <div style={{
          display: 'flex', alignItems: 'center',
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 10, overflow: 'hidden',
        }}>
          <div style={{ padding: '0 14px', color: 'var(--text-3)', display: 'flex', alignItems: 'center' }}>
            <Search size={16} />
          </div>
          <input
            ref={ref}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Movie title or IMDB URL…"
            disabled={loading}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              padding: '14px 0', color: 'var(--text)', fontSize: 15,
              fontFamily: 'DM Sans, sans-serif',
            }}
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            style={{
              margin: 6, padding: '9px 20px',
              background: 'var(--amber)', color: '#080a0f', border: 'none',
              borderRadius: 7, fontWeight: 700, fontSize: 13,
              cursor: 'pointer', opacity: (!query.trim() || loading) ? 0.35 : 1,
              transition: 'opacity 0.2s',
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
            }}
          >
            {loading && <span style={{ width: 12, height: 12, border: '2px solid rgba(0,0,0,0.25)', borderTopColor: '#080a0f', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
            {loading ? 'Searching…' : 'Search'}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text-3)', alignSelf: 'center' }}>Try:</span>
        {SUGGESTIONS.map(t => (
          <button
            key={t}
            onClick={() => { setQuery(t); onSearch(t) }}
            disabled={loading}
            style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: 6,
              padding: '4px 12px', fontSize: 12, color: 'var(--text-2)',
              cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'var(--amber)'; e.target.style.color = 'var(--amber)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--text-2)' }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Settings link */}
      <div style={{ textAlign: 'center', marginTop: 28 }}>
        <button
          onClick={onSettings}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 12, color: 'var(--text-3)',
            display: 'inline-flex', alignItems: 'center', gap: 5,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
        >
          <Settings size={12} /> API Keys
        </button>
      </div>
    </div>
  )
}
