import { MapPin } from 'lucide-react'
import Section from './Section'

export default function LocationsSection({ locations = [], delay }) {
  if (!locations.length) return null
  return (
    <Section title="Filming Locations" count={`${locations.length} locations`} delay={delay}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
        {locations.map((loc, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <MapPin size={13} style={{ color: 'var(--amber)', flexShrink: 0 }} />
              <p style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{loc.place}</p>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 6 }}>
              {loc.scene}
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>{loc.detail}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
