import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { loadKeys, saveKeys } from '../api/keys'

export default function ApiKeyModal({ onClose }) {
  const stored = loadKeys()
  const [mKey, setMKey] = useState(stored.mistralKey)
  const [eKey, setEKey] = useState(stored.elevenKey)
  const [showM, setShowM] = useState(false)
  const [showE, setShowE] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    if (mKey.trim()) {
      saveKeys({ mistralKey: mKey.trim(), elevenKey: eKey.trim() })
      onClose()
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 60,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}
      onClick={onClose}
    >
      <div onClick={e => e.stopPropagation()} className="fade-up"
           style={{ width: '100%', maxWidth: 420, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>

        <div style={{ padding: '24px 24px 16px', borderBottom: '1px solid var(--border)' }}>
          <h2 className="heading" style={{ fontSize: 24, color: 'var(--text)' }}>API Keys</h2>
          <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>
            Stored in localStorage. Never sent anywhere except the API endpoints.
          </p>
        </div>

        <form onSubmit={submit} style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>

          <Field
            label="Mistral API Key"
            required
            link="https://console.mistral.ai/"
            value={mKey} onChange={setMKey}
            show={showM} toggle={() => setShowM(v => !v)}
          />

          <Field
            label="ElevenLabs API Key"
            hint="Optional — for podcast audio"
            link="https://elevenlabs.io/"
            value={eKey} onChange={setEKey}
            show={showE} toggle={() => setShowE(v => !v)}
          />

          <button type="submit" disabled={!mKey.trim()}
            style={{
              padding: '12px', background: 'var(--amber)', color: '#080a0f',
              border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14,
              cursor: mKey.trim() ? 'pointer' : 'not-allowed',
              opacity: mKey.trim() ? 1 : 0.4, marginTop: 2,
            }}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({ label, required, hint, link, value, onChange, show, toggle }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
          {label}{required && <span style={{ color: 'var(--amber)', marginLeft: 3 }}>*</span>}
        </label>
        <a href={link} target="_blank" rel="noopener noreferrer"
           style={{ fontSize: 11, color: 'var(--text-3)', textDecoration: 'none' }}
           onMouseEnter={e => e.target.style.color = 'var(--amber)'}
           onMouseLeave={e => e.target.style.color = 'var(--text-3)'}
        >Get key ↗</a>
      </div>
      <div style={{ position: 'relative' }}>
        <input type={show ? 'text' : 'password'} value={value}
               onChange={e => onChange(e.target.value)}
               placeholder={required ? 'sk-…' : 'Optional'}
               style={{
                 width: '100%', background: 'rgba(255,255,255,0.03)',
                 border: '1px solid var(--border)', borderRadius: 8,
                 padding: '10px 38px 10px 14px', color: 'var(--text)',
                 fontSize: 13, outline: 'none', fontFamily: 'DM Sans, sans-serif',
               }}
               onFocus={e => e.target.style.borderColor = 'var(--amber-border)'}
               onBlur={e  => e.target.style.borderColor = 'var(--border)'}
        />
        <button type="button" onClick={toggle}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', display: 'flex' }}>
          {show ? <EyeOff size={14} /> : <Eye size={14} />}
        </button>
      </div>
      {hint && <p style={{ marginTop: 4, fontSize: 11, color: 'var(--text-3)' }}>{hint}</p>}
    </div>
  )
}
