import Section from './Section'

export default function TriviaSection({ trivia = [], delay }) {
  if (!trivia.length) return null
  return (
    <Section title="Trivia" count={`${trivia.length} facts`} delay={delay}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {trivia.map((fact, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <span style={{
              fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--amber)',
              lineHeight: 1, flexShrink: 0, width: 24, textAlign: 'right',
              opacity: 0.6,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{fact}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
