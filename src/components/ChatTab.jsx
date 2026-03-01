import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'

export default function ChatTab({ movie, messages, loading, onSend }) {
  const [input, setInput] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    onSend(text)
    setInput('')
  }

  return (
    <div
      className="fade-in"
      style={{
        border: '1px solid var(--border)',
        borderRadius: 10,
        background: 'var(--surface)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          background: 'rgba(212,168,83,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--amber)' }}>
          <Sparkles size={14} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Mistral Movie Chat
          </span>
        </div>
        <span style={{ color: 'var(--text-3)', fontSize: 12 }}>
          Ask anything about {movie?.title}
        </span>
      </div>

      <div style={{ maxHeight: 420, minHeight: 320, overflowY: 'auto', padding: 16 }}>
        {messages.length === 0 ? (
          <div style={{ color: 'var(--text-2)', fontSize: 14, lineHeight: 1.8 }}>
            Ask a question to start. Example: "What themes does this movie explore and how was it received?"
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  border: '1px solid var(--border)',
                  background: msg.role === 'user' ? 'rgba(212,168,83,0.10)' : 'var(--surface2)',
                  color: msg.role === 'user' ? 'var(--text)' : 'var(--text-2)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.65,
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading ? (
              <div
                style={{
                  alignSelf: 'flex-start',
                  border: '1px solid var(--border)',
                  background: 'var(--surface2)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  color: 'var(--text-3)',
                  fontSize: 13,
                }}
              >
                Mistral is thinking...
              </div>
            ) : null}
          </div>
        )}
      </div>

      <form onSubmit={submit} style={{ borderTop: '1px solid var(--border)', padding: 12, display: 'flex', gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about plot, cast, production, themes, legacy..."
          style={{
            flex: 1,
            height: 40,
            borderRadius: 8,
            border: '1px solid var(--border)',
            background: '#0b0f15',
            color: 'var(--text)',
            padding: '0 12px',
            outline: 'none',
            fontSize: 14,
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            height: 40,
            minWidth: 44,
            borderRadius: 8,
            border: '1px solid var(--amber-border)',
            background: loading || !input.trim() ? 'rgba(212,168,83,0.08)' : 'var(--amber)',
            color: loading || !input.trim() ? 'var(--text-3)' : '#090b10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
          }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  )
}
