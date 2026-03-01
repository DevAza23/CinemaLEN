/**
 * Reusable section wrapper with heading and stagger-delay fade-in.
 */
export default function Section({ title, count, delay = 0, children }) {
  return (
    <div className="fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
        <h2 className="section-label">{title}</h2>
        {count != null && (
          <span style={{ fontSize: 12, color: 'var(--text-3)' }}>{count}</span>
        )}
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
      {children}
    </div>
  )
}
