/**
 * Overview tab — displays OMDB data in a clean layout.
 * Shown as the default tab after searching a film.
 */
import { User, Award, Globe, Languages } from 'lucide-react'
import Section from './Section'

export default function OverviewTab({ movie }) {
  const cast    = movie.actors?.split(', ').filter(Boolean) ?? []
  const writers = movie.writer?.split(', ').filter(Boolean) ?? []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }} className="fade-in">

      {/* Synopsis (already in header, but show full version here too if long) */}
      {movie.plot && movie.plot !== 'N/A' && (
        <Section title="Synopsis" delay={0}>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.85, maxWidth: 680 }}>
            {movie.plot}
          </p>
        </Section>
      )}

      {/* Cast + Crew row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {/* Cast */}
        {cast.length > 0 && (
          <Section title="Cast" count={`${cast.length}`} delay={40}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cast.map(name => (
                <div key={name} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--amber-dim)', border: '1px solid var(--amber-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue', fontSize: 13, color: 'var(--amber)',
                  }}>
                    {name[0]}
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--text)' }}>{name.trim()}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Crew */}
        <Section title="Crew" delay={80}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <CrewRow label="Director" value={movie.director} />
            {writers.length > 0 && <CrewRow label="Writer" value={writers.join(', ')} />}
            {movie.language && movie.language !== 'N/A' && (
              <CrewRow label="Language" value={movie.language} icon={<Languages size={12} />} />
            )}
            {movie.country && movie.country !== 'N/A' && (
              <CrewRow label="Country" value={movie.country} icon={<Globe size={12} />} />
            )}
          </div>
        </Section>
      </div>

      {/* Ratings */}
      {movie.ratings?.length > 0 && (
        <Section title="Ratings" count={`${movie.ratings.length} sources`} delay={120}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {movie.ratings.map((r, i) => (
              <div key={i} className="card" style={{ flex: '1 1 160px', minWidth: 160, textAlign: 'center', padding: '16px 20px' }}>
                <p style={{ fontSize: 22, fontWeight: 700, color: 'var(--text)', fontFamily: 'Bebas Neue', letterSpacing: '0.03em' }}>
                  {r.Value}
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {r.Source}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Awards */}
      {movie.awards && movie.awards !== 'N/A' && (
        <Section title="Awards" delay={160}>
          <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 18px' }}>
            <Award size={15} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{movie.awards}</p>
          </div>
        </Section>
      )}

      {/* Box office */}
      {movie.boxOffice && movie.boxOffice !== 'N/A' && (
        <Section title="Box Office" delay={200}>
          <div className="card" style={{ padding: '14px 18px' }}>
            <p style={{ fontSize: 24, fontWeight: 700, color: 'var(--text)', fontFamily: 'Bebas Neue' }}>
              {movie.boxOffice}
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Domestic gross
            </p>
          </div>
        </Section>
      )}
    </div>
  )
}

function CrewRow({ label, value, icon }) {
  if (!value || value === 'N/A') return null
  return (
    <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 16px' }}>
      <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon || <User size={12} />} {label}
      </span>
      <span style={{ fontSize: 13, color: 'var(--text)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}
