/**
 * Loading skeletons that match the dashboard layout.
 */
export default function Skeleton() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      {/* Header skeleton */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 40 }}>
        <div className="skeleton" style={{ width: 160, height: 240, flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: 80, height: 24 }} />
          <div className="skeleton" style={{ width: 300, height: 32 }} />
          <div className="skeleton" style={{ width: 180, height: 16 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <div className="skeleton" style={{ width: 60, height: 24 }} />
            <div className="skeleton" style={{ width: 60, height: 24 }} />
            <div className="skeleton" style={{ width: 60, height: 24 }} />
          </div>
          <div className="skeleton" style={{ width: '100%', height: 48, marginTop: 4 }} />
        </div>
      </div>

      {/* Section skeletons */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{ marginBottom: 40, animationDelay: `${i * 80}ms` }} className="fade-up">
          <div className="skeleton" style={{ width: 120, height: 20, marginBottom: 16 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="skeleton" style={{ height: 100 }} />
            <div className="skeleton" style={{ height: 100 }} />
            <div className="skeleton" style={{ height: 100 }} />
            <div className="skeleton" style={{ height: 100 }} />
          </div>
        </div>
      ))}
    </div>
  )
}
