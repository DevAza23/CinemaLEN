import { Trophy } from 'lucide-react'
import Section from './Section'

export default function AwardsSection({ awards = [], delay }) {
  if (!awards.length) return null
  return (
    <Section title="Awards" count={`${awards.length}`} delay={delay}>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 3fr 90px',
          padding: '10px 18px', borderBottom: '1px solid var(--border)',
        }}>
          <span style={th}>Award</span>
          <span style={th}>Category</span>
          <span style={{ ...th, textAlign: 'right' }}>Result</span>
        </div>

        {/* Rows */}
        {awards.map((a, i) => {
          const won = a.result?.toLowerCase().includes('won')
          return (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 3fr 90px',
              padding: '11px 18px',
              background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
              borderBottom: i < awards.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 13, color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                {won && <Trophy size={11} style={{ color: 'var(--amber)', flexShrink: 0 }} />}
                {a.award}
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{a.category}</span>
              <span style={{
                fontSize: 12, fontWeight: 600, textAlign: 'right',
                color: won ? 'var(--amber)' : 'var(--text-3)',
              }}>
                {a.result}
              </span>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

const th = {
  fontSize: 10, fontWeight: 600, letterSpacing: '0.08em',
  textTransform: 'uppercase', color: 'var(--text-3)',
}
