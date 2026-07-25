import { useState, useEffect } from 'react'
import { Bell, MapPin, Users, Plus, Zap, Dumbbell, Wind, Flame, Menu } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useHaptics } from '@/hooks/useHaptics'
import { MapStatic } from '@/components/home/MapStatic'

interface Session {
  id: string
  title: string
  time: string
  distance: string
  level: 1 | 2 | 3 | 4 | 5
  space: string
  participants: number
  status: 'now' | 'soon' | 'future'
  type: 'running' | 'functional' | 'walking' | 'yoga' | 'hiit'
}

const TABS = ['Semana', 'Hoy', 'Mañana', 'Jue', 'Vie', 'Sáb']

const MOCK_SESSIONS: Session[] = [
  {
    id: '1',
    title: 'Carrera por el pinar',
    time: 'Ahora · 09:15',
    distance: '0.3 km',
    level: 3,
    space: 'Pinar de Las Rozas',
    participants: 1,
    status: 'now',
    type: 'running',
  },
  {
    id: '2',
    title: 'Funcional al aire libre',
    time: '10:30',
    distance: '0.5 km',
    level: 2,
    space: 'Zona calistenia',
    participants: 3,
    status: 'soon',
    type: 'functional',
  },
  {
    id: '3',
    title: 'Yoga matutino',
    time: '11:00',
    distance: '0.8 km',
    level: 1,
    space: 'Pinar de Las Rozas',
    participants: 5,
    status: 'soon',
    type: 'yoga',
  },
  {
    id: '4',
    title: 'HIIT explosivo',
    time: '12:00',
    distance: '1.2 km',
    level: 4,
    space: 'Zona calistenia',
    participants: 2,
    status: 'future',
    type: 'hiit',
  },
  {
    id: '5',
    title: 'Caminata grupal',
    time: '17:00',
    distance: '0.4 km',
    level: 1,
    space: 'Pinar de Las Rozas',
    participants: 8,
    status: 'future',
    type: 'walking',
  },
]

const TYPE_ICONS = {
  running: Zap,
  functional: Dumbbell,
  walking: MapPin,
  yoga: Wind,
  hiit: Flame,
}

const STATUS_BORDER_COLOR: Record<Session['status'], string> = {
  now: 'var(--color-primary)',
  soon: 'var(--color-warning)',
  future: 'var(--color-text-muted)',
}

const LEVEL_LABELS = ['', 'Activo', 'En marcha', 'En forma', 'Potencia', 'Élite']

function SessionCard({ session, isApuntado }: { session: Session; isApuntado?: boolean }) {
  const { haptic } = useHaptics()
  const navigate = useNavigate()
  const Icon = TYPE_ICONS[session.type]

  const borderColor = isApuntado ? 'var(--color-success)' : STATUS_BORDER_COLOR[session.status]

  return (
    <div
      id={`session-card-${session.id}`}
      onClick={() => {
        haptic('light')
        navigate(isApuntado ? `/session/${session.id}/apuntado` : `/session/${session.id}`)
      }}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-sm)',
        borderLeft: `6px solid ${borderColor}`,
        boxShadow: 'var(--shadow-xs)',
        padding: '14px 14px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {/* Badge apuntado */}
      {isApuntado && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          display: 'flex', alignItems: 'center', gap: 4,
          backgroundColor: 'var(--color-success-subtle)',
          borderRadius: 'var(--radius-full)',
          padding: '3px 10px',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" fill="none" stroke="var(--color-success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[12px] font-bold leading-4" style={{ color: 'var(--color-success-text)', fontFamily: 'var(--font-sans)' }}>
            Apuntado
          </span>
        </div>
      )}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingRight: isApuntado ? 90 : 0 }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-surface-2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <Icon size={16} strokeWidth={1.5} color="var(--color-text-muted)" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            className="text-[15px] font-bold leading-5 tracking-[-0.01em] truncate mb-0.5"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
          >
            {session.title}
          </p>
          {isApuntado ? (
            <span
              className="text-[12px] font-medium leading-4"
              style={{ color: 'var(--color-success-text)', fontFamily: 'var(--font-sans)' }}
            >
              ⏰ Mañana · En 14 horas
            </span>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                className="text-[13px] leading-[18px]"
                style={{
                  color: session.status === 'now' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: session.status === 'now' ? 600 : 400,
                }}
              >
                {session.time}
              </span>
              <span className="text-[13px]" style={{ color: 'var(--color-border-strong)' }}>·</span>
              <span className="text-[13px] leading-[18px]" style={{ color: 'var(--color-text-muted)' }}>
                {session.distance}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} strokeWidth={1.5} color="var(--color-text-subtle)" />
          <span className="text-xs leading-4" style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-sans)' }}>
            {session.space}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'var(--color-border-strong)' }}>·</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} strokeWidth={1.5} color="var(--color-text-subtle)" />
          <span className="text-xs leading-4" style={{ color: 'var(--color-text-subtle)', fontFamily: 'var(--font-sans)' }}>
            {session.participants} {session.participants === 1 ? 'persona' : 'personas'}
          </span>
        </div>
        <div style={{ marginLeft: 'auto', backgroundColor: 'var(--color-surface-2)', borderRadius: 'var(--radius-full)', padding: '2px 8px', flexShrink: 0 }}>
          <span className="text-[11px] font-medium leading-4" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
            {LEVEL_LABELS[session.level]}
          </span>
        </div>
      </div>

      {/* Actions — solo cuando no está apuntado */}
      {!isApuntado && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          onClick={e => e.stopPropagation()}
        >
          {session.status === 'now' ? (
            <button
              onClick={() => haptic('medium')}
              className="text-[13px] font-semibold tracking-[-0.01em]"
              style={{
                height: 36, paddingInline: '16px', borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-info-subtle)', border: '1px solid var(--color-info)',
                color: 'var(--color-info-text)', fontFamily: 'var(--font-sans)', cursor: 'pointer',
              }}
            >
              Acompañarle
            </button>
          ) : (
            <button
              onClick={() => haptic('medium')}
              className="text-[13px] font-semibold tracking-[-0.01em]"
              style={{
                height: 36, paddingInline: '14px', borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary)', border: 'none',
                color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)',
                cursor: 'pointer', boxShadow: 'var(--shadow-primary)',
              }}
            >
              Apuntarme
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { haptic } = useHaptics()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [mapCollapsed, setMapCollapsed] = useState(false)
  const [activePin, setActivePin] = useState<string | null>(null)
  const [, setSearchParams] = useSearchParams()
  const [apuntadoSessionId] = useState<string | null>(
    () => new URLSearchParams(window.location.search).get('apuntado')
  )
  const [showToast, setShowToast] = useState<boolean>(
    () => !!new URLSearchParams(window.location.search).get('apuntado')
  )
  useEffect(() => {
    if (!apuntadoSessionId) return
    setSearchParams({}, { replace: true })
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [apuntadoSessionId, setSearchParams])

  useEffect(() => {
    let lastY = 0
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY
        if (Math.abs(y - lastY) > 8) {
          setMapCollapsed(y > 80)
          lastY = y
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => { window.removeEventListener('scroll', handleScroll); cancelAnimationFrame(rafId) }
  }, [])

  const handlePinTap = (sessionId: string) => {
    setActivePin(prev => prev === sessionId ? null : sessionId)
    const cardEl = document.getElementById(`session-card-${sessionId}`)
    cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-background)',
        width: '100%',
        maxWidth: '390px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        colorScheme: 'light',
      }}
    >
      {/* Toast apuntado */}
      {showToast && (
        <div style={{
          position: 'fixed', top: 64, left: '50%', transform: 'translateX(-50%)',
          zIndex: 50, maxWidth: 320, width: 'calc(100% - 70px)',
          backgroundColor: '#fff',
          borderLeft: '3px solid var(--color-success)',
          borderRadius: 10, boxShadow: '#0000001F 0px 4px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>
            ¡Apuntado! Te avisamos 30 min antes.
          </span>
        </div>
      )}

      {/* Header — sticky propio, GPU layer aislado */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 56,
          backgroundColor: 'var(--color-background)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 20,
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          transform: 'translate3d(0,0,0)',
          WebkitTransform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Hamburguesa — izquierda */}
        <button
          aria-label="Menú"
          style={{
            width: 40, height: 40, borderRadius: 'var(--radius-full)',
            backgroundColor: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Menu size={24} strokeWidth={1.5} color="var(--color-text)" />
        </button>

        {/* Logo — centro */}
        <span
          className="text-[22px] font-extrabold tracking-[-0.03em] leading-7"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}
        >
          movi
        </span>

        {/* Notificaciones — derecha */}
        <button
          onClick={() => haptic('light')}
          aria-label="Notificaciones"
          style={{
            width: 40, height: 40, borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', position: 'relative',
          }}
        >
          <Bell size={20} strokeWidth={1.5} color="var(--color-text)" />
          <div
            style={{
              position: 'absolute', top: 8, right: 9,
              width: 7, height: 7, borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-error)',
              border: '1.5px solid var(--color-surface)',
            }}
          />
        </button>
      </header>

      {/* Mapa + tabs — sticky bajo el header */}
      <div
        style={{
          position: 'sticky',
          top: 56,
          zIndex: 30,
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <MapStatic
          activePin={activePin}
          onPinTap={handlePinTap}
          collapsed={mapCollapsed}
        />

        {/* Tabs de días */}
        <div style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div
            style={{
              display: 'flex',
              gap: 4,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingInline: 16,
              paddingBlock: 8,
            }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => { haptic('light'); setActiveTab(i) }}
                className="text-[13px] leading-[18px] tracking-[-0.01em]"
                style={{
                  flexShrink: 0, height: 32, paddingInline: 14,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeTab === i ? 'var(--color-primary)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: activeTab === i ? 'white' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === i ? 600 : 500,
                  transition: 'background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
                  position: 'relative',
                }}
              >
                {tab}
                {i === 2 && apuntadoSessionId && (
                  <div style={{
                    position: 'absolute', top: -3, right: -3,
                    width: 8, height: 8, borderRadius: '9999px',
                    backgroundColor: 'var(--color-success)',
                    border: '1.5px solid var(--color-surface)',
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de sesiones */}
      <div
        style={{
          flex: 1,
          padding: '16px 16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          backgroundColor: 'var(--color-background)',
        }}
      >
        {MOCK_SESSIONS.map(session => (
          <SessionCard key={session.id} session={session} isApuntado={session.id === apuntadoSessionId} />
        ))}
      </div>

      {/* FAB — sticky bottom */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 40,
          display: 'flex',
          justifyContent: 'center',
          paddingBlock: 16,
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={() => { haptic('medium'); navigate('/create') }}
          aria-label="Proponer una sesión"
          className="text-base font-bold tracking-[-0.01em] whitespace-nowrap"
          style={{
            height: 52,
            paddingInline: 24,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            boxShadow: 'var(--shadow-primary-strong)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'white',
            fontFamily: 'var(--font-sans)',
            pointerEvents: 'auto',
          }}
        >
          <Plus size={20} strokeWidth={1.5} color="white" />
          Proponer una sesión
        </button>
      </div>
    </div>
  )
}
