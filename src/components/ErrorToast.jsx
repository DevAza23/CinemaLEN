import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function ErrorToast({ message, onClose }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, 6000)
    return () => clearTimeout(t)
  }, [message, onClose])

  if (!message) return null

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      zIndex: 100, maxWidth: 400, width: '90%',
    }}
      className="fade-up"
    >
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#1a0f0f',
        border: '1px solid rgba(239,68,68,0.25)',
        borderRadius: 10,
        padding: '12px 16px',
      }}>
        <p style={{ flex: 1, fontSize: 13, color: '#f87171', lineHeight: 1.5 }}>{message}</p>
        <button onClick={onClose}
                style={{ background: 'none', border: 'none', cursor: 'pointer',
                         color: '#666', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                onMouseLeave={e => e.currentTarget.style.color = '#666'}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
