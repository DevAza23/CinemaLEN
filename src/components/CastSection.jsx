import Section from './Section'

export default function CastSection({ cast = [], delay }) {
  if (!cast.length) return null
  return (
    <Section title="Cast" count={`${cast.length} actors`} delay={delay}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {cast.map((c, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'var(--amber-dim)', border: '1px solid var(--amber-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Bebas Neue', fontSize: 15, color: 'var(--amber)',
              }}>
                {c.actor?.[0]?.toUpperCase() || '?'}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', lineHeight: 1.2 }}>{c.actor}</p>
                <p style={{ fontSize: 12, color: 'var(--text-2)' }}>as {c.role}</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6, marginTop: 4 }}>
              {c.fact}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
