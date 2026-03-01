import { useCallback, useState } from 'react'
import { ArrowLeft, Settings, Info, BookOpen, MessageCircle } from 'lucide-react'

import SearchBar from './components/SearchBar'
import MovieHeader from './components/MovieHeader'
import OverviewTab from './components/OverviewTab'
import WikiTab from './components/WikiTab'
import ChatTab from './components/ChatTab'
import Skeleton from './components/Skeleton'
import ApiKeyModal from './components/ApiKeyModal'
import ErrorToast from './components/ErrorToast'

import { fetchMovie } from './api/omdb'
import { wikiMovie, chatMovieQuestion } from './api/mistral'
import { hasRequiredKeys, loadKeys } from './api/keys'

export default function App() {
  const [phase, setPhase] = useState('search')
  const [searchLoading, setSearchLoading] = useState(false)
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const [showKeys, setShowKeys] = useState(!hasRequiredKeys())

  const [activeTab, setActiveTab] = useState('overview')

  const [wiki, setWiki] = useState(null)
  const [wikiLoading, setWikiLoading] = useState(false)
  const [wikiLoaded, setWikiLoaded] = useState(false)

  const [chatMessages, setChatMessages] = useState([])
  const [chatLoading, setChatLoading] = useState(false)

  const handleSearch = useCallback(
    async (query) => {
      if (searchLoading) return

      setSearchLoading(true)
      setError(null)
      setWiki(null)
      setWikiLoaded(false)
      setChatMessages([])
      setActiveTab('overview')

      try {
        const data = await fetchMovie(query)
        setMovie(data)
        setPhase('dashboard')
      } catch (err) {
        setError(err.message || 'Movie not found.')
      } finally {
        setSearchLoading(false)
      }
    },
    [searchLoading]
  )

  const handleWiki = useCallback(async () => {
    if (!movie || wikiLoading || wikiLoaded) return
    const keys = loadKeys()
    if (!keys.mistralKey) {
      setShowKeys(true)
      return
    }

    setWikiLoading(true)
    setError(null)
    try {
      const res = await wikiMovie(movie, keys.mistralKey)
      setWiki(res)
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Wiki generation failed.'
      setError(msg)
    } finally {
      setWikiLoading(false)
      setWikiLoaded(true)
    }
  }, [movie, wikiLoading, wikiLoaded])

  const switchTab = useCallback(
    (tab) => {
      setActiveTab(tab)
      if (tab === 'wiki' && !wikiLoaded && !wikiLoading) {
        handleWiki()
      }
    },
    [wikiLoaded, wikiLoading, handleWiki]
  )

  const handleSendChat = useCallback(
    async (question) => {
      if (!movie || chatLoading || !question?.trim()) return
      const keys = loadKeys()
      if (!keys.mistralKey) {
        setShowKeys(true)
        return
      }

      const userMessage = { role: 'user', content: question.trim() }
      const nextHistory = [...chatMessages, userMessage].slice(-10)
      setChatMessages((prev) => [...prev, userMessage])
      setChatLoading(true)
      setError(null)

      try {
        const answer = await chatMovieQuestion(movie, nextHistory, keys.mistralKey)
        setChatMessages((prev) => [...prev, { role: 'assistant', content: answer }])
      } catch (err) {
        const msg = err.response?.data?.message || err.message || 'Chat request failed.'
        setError(msg)
      } finally {
        setChatLoading(false)
      }
    },
    [movie, chatLoading, chatMessages]
  )

  const handleBack = () => {
    setPhase('search')
    setMovie(null)
    setWiki(null)
    setWikiLoaded(false)
    setChatMessages([])
    setActiveTab('overview')
    setError(null)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg)',
        overflow: 'hidden',
      }}
    >
      {phase === 'dashboard' && (
        <header
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg)',
            flexShrink: 0,
            zIndex: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handleBack}
              style={iconBtn}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              <ArrowLeft size={15} />
            </button>
            <span
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: 18,
                color: 'var(--text)',
                letterSpacing: '0.04em',
              }}
            >
              CinemaLens
            </span>
            {movie ? (
              <>
                <span style={{ color: 'var(--text-3)', fontSize: 13 }}>/</span>
                <span
                  style={{
                    color: 'var(--amber)',
                    fontSize: 13,
                    maxWidth: 250,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {movie.title}
                </span>
              </>
            ) : null}
          </div>
          <button
            onClick={() => setShowKeys(true)}
            style={iconBtn}
            title="API Keys"
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
          >
            <Settings size={14} />
          </button>
        </header>
      )}

      <main
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {phase === 'search' && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100%',
              padding: '40px 0',
            }}
          >
            <SearchBar onSearch={handleSearch} loading={searchLoading} onSettings={() => setShowKeys(true)} />
          </div>
        )}

        {phase === 'dashboard' && movie && (
          <div style={{ maxWidth: 980, margin: '0 auto', padding: '8px 24px 60px' }}>
            <MovieHeader movie={movie} />

            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                marginBottom: 32,
                marginTop: 8,
              }}
            >
              <TabBtn
                active={activeTab === 'overview'}
                onClick={() => switchTab('overview')}
                icon={<Info size={13} />}
                label="Overview"
              />
              <TabBtn
                active={activeTab === 'chat'}
                onClick={() => switchTab('chat')}
                icon={<MessageCircle size={13} />}
                label="Chat"
                loading={chatLoading}
              />
              <TabBtn
                active={activeTab === 'wiki'}
                onClick={() => switchTab('wiki')}
                icon={<BookOpen size={13} />}
                label="Wiki"
                loading={wikiLoading}
              />
            </div>

            {activeTab === 'overview' && <OverviewTab movie={movie} />}

            {activeTab === 'chat' && (
              <ChatTab
                movie={movie}
                messages={chatMessages}
                loading={chatLoading}
                onSend={handleSendChat}
              />
            )}

            {activeTab === 'wiki' && (
              <>
                {wikiLoading && !wiki && <Skeleton />}
                {wiki && <WikiTab data={wiki} movie={movie} />}
                {wikiLoaded && !wiki && !wikiLoading && (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-3)' }}>
                    <p style={{ fontSize: 14 }}>Wiki article failed to load.</p>
                    <button
                      onClick={() => {
                        setWikiLoaded(false)
                        handleWiki()
                      }}
                      style={{
                        marginTop: 12,
                        padding: '8px 20px',
                        fontSize: 13,
                        background: 'var(--amber)',
                        color: '#080a0f',
                        border: 'none',
                        borderRadius: 7,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      {showKeys && <ApiKeyModal onClose={() => setShowKeys(false)} />}
      <ErrorToast message={error} onClose={() => setError(null)} />
    </div>
  )
}

function TabBtn({ active, onClick, icon, label, loading }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 20px',
        fontSize: 13,
        fontWeight: 600,
        color: active ? 'var(--amber)' : 'var(--text-3)',
        background: 'none',
        border: 'none',
        borderBottom: active ? '2px solid var(--amber)' : '2px solid transparent',
        cursor: 'pointer',
        transition: 'color 0.15s, border-color 0.15s',
        marginBottom: -1,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--text-2)'
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.color = 'var(--text-3)'
      }}
    >
      {loading ? (
        <span
          style={{
            width: 13,
            height: 13,
            border: '2px solid var(--text-3)',
            borderTopColor: 'var(--amber)',
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
          }}
        />
      ) : (
        icon
      )}
      {label}
    </button>
  )
}

const iconBtn = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--text-3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  padding: 6,
  transition: 'color 0.15s',
}
