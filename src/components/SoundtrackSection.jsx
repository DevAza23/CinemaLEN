import { Music } from 'lucide-react'
import Section from './Section'

export default function SoundtrackSection({ soundtrack, delay }) {
  if (!soundtrack) return null
  const tracks = soundtrack.tracks ?? []
  return (
    <Section title="Soundtrack" delay={delay}>
      {/* Composer */}
      {soundtrack.composer && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 14, padding: '10px 14px',
          background: 'var(--amber-dim)', border: '1px solid var(--amber-border)',
          borderRadius: 8,
        }}>
          <Music size={14} style={{ color: 'var(--amber)' }} />
          <span style={{ fontSize: 13, color: 'var(--amber)' }}>
            Composed by <strong>{soundtrack.composer}</strong>
          </span>
        </div>
      )}

      {/* Tracks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {tracks.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 14, padding: '12px 16px',
            background: i % 2 === 0 ? 'var(--surface)' : 'transparent',
            borderRadius: 6,
          }}>
            <span style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: 'var(--text-3)', width: 22, textAlign: 'right', flexShrink: 0 }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text)' }}>{t.name}</p>
              <p style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{t.scene}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
