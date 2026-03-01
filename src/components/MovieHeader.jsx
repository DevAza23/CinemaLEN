import { Star, Clock, Film } from 'lucide-react'

export default function MovieHeader({ movie }) {
  const rating = movie.imdbRating !== 'N/A' ? movie.imdbRating : null
  const genres = movie.genre?.split(', ') ?? []

  return (
    <div className="fade-up" style={{
      display: 'flex', gap: 24, padding: '28px 0', marginBottom: 8,
    }}>
      {/* Poster */}
      <div style={{ flexShrink: 0, width: 160, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {movie.poster
          ? <img src={movie.poster} alt={movie.title} style={{ width: '100%', display: 'block' }} />
          : <div style={{ width: 160, height: 240, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Film size={32} style={{ color: 'var(--text-3)' }} />
            </div>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {rating && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5, width: 'fit-content',
            background: 'var(--amber-dim)', border: '1px solid var(--amber-border)',
            borderRadius: 6, padding: '4px 11px', marginBottom: 12,
          }}>
            <Star size={11} style={{ color: 'var(--amber)', fill: 'var(--amber)' }} />
            <span style={{ color: 'var(--amber)', fontWeight: 700, fontSize: 13 }}>{rating}</span>
            <span style={{ color: 'var(--text-3)', fontSize: 11 }}>/ 10</span>
          </div>
        )}

        <h1 className="heading" style={{ fontSize: 42, lineHeight: 1, color: 'var(--text)' }}>
          {movie.title}
        </h1>

        <p style={{ marginTop: 6, color: 'var(--text-2)', fontSize: 14 }}>
          Directed by <span style={{ color: 'var(--text)' }}>{movie.director}</span> · {movie.year}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
          {movie.runtime && movie.runtime !== 'N/A' && (
            <Pill><Clock size={10} style={{ color: 'var(--text-3)' }} />{movie.runtime}</Pill>
          )}
          {movie.rated && movie.rated !== 'N/A' && <Pill>{movie.rated}</Pill>}
          {genres.map(g => <Pill key={g}>{g}</Pill>)}
        </div>

        <p style={{ marginTop: 14, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 540 }}>
          {movie.plot}
        </p>
      </div>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
      borderRadius: 5, padding: '3px 10px', fontSize: 12, color: 'var(--text-2)',
    }}>
      {children}
    </span>
  )
}
