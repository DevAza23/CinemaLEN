import { Quote } from 'lucide-react'
import Section from './Section'

export default function QuotesSection({ quotes = [], delay }) {
  if (!quotes.length) return null
  return (
    <Section title="Memorable Quotes" count={`${quotes.length}`} delay={delay}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
        {quotes.map((q, i) => (
          <div key={i} className="card" style={{ position: 'relative', paddingLeft: 22 }}>
            {/* Accent bar */}
            <div style={{
              position: 'absolute', left: 0, top: 14, bottom: 14,
              width: 3, borderRadius: 2, background: 'var(--amber)', opacity: 0.4,
            }} />
            <p style={{
              fontSize: 15, fontStyle: 'italic', color: 'var(--text)',
              lineHeight: 1.7, marginBottom: 8,
            }}>
              &ldquo;{q.text}&rdquo;
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>
              — {q.character}
            </p>
          </div>
        ))}
      </div>
    </Section>
  )
}
