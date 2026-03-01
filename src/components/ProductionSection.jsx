import Section from './Section'

export default function ProductionSection({ production, delay }) {
  if (!production) return null

  const fields = [
    { label: 'Budget',        value: production.budget },
    { label: 'Box Office',    value: production.box_office },
    { label: 'Camera',        value: production.cameras },
    { label: 'Film Format',   value: production.film_format },
    { label: 'Shooting Days', value: production.shooting_days },
  ].filter(f => f.value)

  if (!fields.length) return null

  return (
    <Section title="Production" delay={delay}>
      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 0 }}>
        {fields.map((f, i) => (
          <div key={i} style={{
            padding: '14px 16px',
            borderBottom: i < fields.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>
              {f.label}
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>
              {f.value}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
