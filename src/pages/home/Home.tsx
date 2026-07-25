import { useState, useEffect, useRef } from 'react'
import { Bell, MapPin, Users, Plus, Zap, Dumbbell, Wind, Flame, Menu } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { useHaptics } from '@/hooks/useHaptics'
import MOVI_MAP_STYLE from '@/lib/mapStyles.json'

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined

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

interface MapPin {
  id: string
  lat: number
  lng: number
  status: 'now' | 'soon' | 'future'
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

const PINAR_CENTER = { lat: 40.3485, lng: -3.8789 }

const MOCK_PINS: MapPin[] = [
  { id: '1', lat: 40.3485, lng: -3.8789, status: 'now' },
  { id: '2', lat: 40.3495, lng: -3.877, status: 'soon' },
  { id: '3', lat: 40.3475, lng: -3.88, status: 'future' },
  { id: '4', lat: 40.351, lng: -3.876, status: 'future' },
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

function PinCircle({ status }: { status: 'now' | 'soon' | 'future' }) {
  return (
    <div
      style={{
        width: status === 'now' ? 40 : 32,
        height: status === 'now' ? 40 : 32,
        borderRadius: '50%',
        backgroundColor: status === 'now' ? 'var(--color-primary)' : 'white',
        border: status === 'now' ? 'none' : '2px solid var(--color-primary)',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
      }}
    />
  )
}

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

function SVGMap({ onPinTap }: { onPinTap: (id: string) => void }) {
  return (
    // Outer: no overflow:hidden — los círculos se renderizan sin clipping
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>

      {/* Terrain SVG — clipped a los bordes del mapa */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 390 240"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0 }}
          aria-hidden="true"
        >
          <rect width="390" height="240" style={{ fill: 'var(--color-map-base)' }} />
          <path
            d="M60 20 L280 20 L320 60 L340 120 L300 200 L200 220 L80 200 L30 120 Z"
            style={{ fill: 'var(--color-map-pinar)' }}
            opacity="0.85"
          />
          <path
            d="M80 200 Q140 160 180 120 Q220 80 260 50"
            style={{ stroke: 'var(--color-map-path)', fill: 'none', strokeWidth: 3, strokeLinecap: 'round' }}
          />
          <path
            d="M200 220 Q220 170 240 140 Q260 110 300 80"
            style={{ stroke: 'var(--color-map-path)', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round' }}
          />
          <path d="M0 130 L390 108" style={{ stroke: 'white', strokeWidth: 9, strokeLinecap: 'round', fill: 'none' }} />
          <path
            d="M0 130 L390 108"
            style={{ stroke: 'var(--color-map-road-edge)', strokeWidth: 0.5, strokeLinecap: 'round', fill: 'none' }}
          />
          <rect
            x="140" y="124" width="72" height="46" rx="6"
            style={{ fill: 'var(--color-map-calistenia)' }}
            opacity="0.9"
          />
          <text
            x="176" y="117"
            style={{ fill: 'var(--color-map-label)', fontSize: 8 }}
            fontFamily="system-ui"
            fontWeight="500"
            textAnchor="middle"
          >
            Zona calistenia
          </text>
        </svg>
      </div>

      {/* Carlos pin → sesión 1 */}
      <div
        onClick={() => onPinTap('1')}
        style={{
          position: 'absolute', left: 195, top: 85,
          transform: 'translate(-50%, -100%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10,
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-md)',
            padding: '4px 8px', marginBottom: 4, whiteSpace: 'nowrap',
          }}
        >
          <span className="text-[11px] font-semibold leading-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
            Carlos · Ahora
          </span>
        </div>
        <div
          style={{
            width: 32, height: 32, borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-info)', border: '2.5px solid white',
            boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span className="text-xs font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>C</span>
        </div>
      </div>

      {/* Ana +2 pin → sesión 2 */}
      <div
        onClick={() => onPinTap('2')}
        style={{ position: 'absolute', left: 145, top: 148, transform: 'translate(-50%, -50%)', zIndex: 9, cursor: 'pointer' }}
      >
        <div
          style={{
            width: 36, height: 36, borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)', border: '2.5px solid white',
            boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span className="text-[11px] font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>A+2</span>
        </div>
      </div>

      {/* Grupo 5 pin → sesión 3 */}
      <div
        onClick={() => onPinTap('3')}
        style={{ position: 'absolute', left: 255, top: 68, transform: 'translate(-50%, -50%)', zIndex: 8, cursor: 'pointer' }}
      >
        <div
          style={{
            width: 28, height: 28, borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)', border: '2px solid white',
            boxShadow: 'var(--shadow-xs)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.85,
          }}
        >
          <span className="text-[10px] font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>5</span>
        </div>
      </div>

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', zIndex: 20,
        }}
      >
        <button
          aria-label="Acercar mapa"
          className="text-lg font-light"
          style={{
            width: 32, height: 32, backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)', borderRadius: '6px 6px 0 0',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)', color: 'var(--color-text)', lineHeight: 1,
          }}
        >+</button>
        <button
          aria-label="Alejar mapa"
          className="text-lg font-light"
          style={{
            width: 32, height: 32, backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)', borderTop: 'none', borderRadius: '0 0 6px 6px',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)', color: 'var(--color-text)', lineHeight: 1,
          }}
        >−</button>
      </div>
    </div>
  )
}

function MapView({ onPinTap }: { onPinTap: (id: string) => void }) {
  const [mapsError, setMapsError] = useState(false)
  const apiKey = GOOGLE_MAPS_KEY
  const hasValidKey = !!apiKey && apiKey !== 'TU_API_KEY'

  // gm_authFailure se dispara cuando la API key no tiene Maps JS API habilitada
  useEffect(() => {
    if (!hasValidKey) return
    const w = window as typeof window & { gm_authFailure?: () => void }
    const prev = w.gm_authFailure
    w.gm_authFailure = () => {
      setMapsError(true)
      prev?.()
    }
    return () => { w.gm_authFailure = prev }
  }, [hasValidKey])

  if (!hasValidKey || mapsError) {
    return <SVGMap onPinTap={onPinTap} />
  }

  return (
    <APIProvider apiKey={apiKey}>
      <Map
        style={{ width: '100%', height: '100%' }}
        defaultCenter={PINAR_CENTER}
        defaultZoom={15}
        disableDefaultUI={true}
        gestureHandling="cooperative"
        styles={MOVI_MAP_STYLE}
      >
        {MOCK_PINS.map(pin => (
          <AdvancedMarker
            key={pin.id}
            position={{ lat: pin.lat, lng: pin.lng }}
            onClick={() => onPinTap(pin.id)}
          >
            <PinCircle status={pin.status} />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  )
}

export default function Home() {
  const { haptic } = useHaptics()
  const [activeTab, setActiveTab] = useState(0)
  const [mapCollapsed, setMapCollapsed] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [, setSearchParams] = useSearchParams()
  const [apuntadoSessionId] = useState<string | null>(
    () => new URLSearchParams(window.location.search).get('apuntado')
  )
  const [showToast, setShowToast] = useState<boolean>(
    () => !!new URLSearchParams(window.location.search).get('apuntado')
  )
  const lastScrollYRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (!apuntadoSessionId) return
    setSearchParams({}, { replace: true })
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [apuntadoSessionId, setSearchParams])

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          if (currentScrollY > lastScrollYRef.current + 5) {
            setHeaderVisible(false)
          } else if (currentScrollY < lastScrollYRef.current - 5) {
            setHeaderVisible(true)
          }
          setMapCollapsed(currentScrollY > 60)
          lastScrollYRef.current = currentScrollY
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePinTap = (sessionId: string) => {
    const cardEl = document.getElementById(`session-card-${sessionId}`)
    cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-background)',
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

      {/* Sticky top: header + mapa + tabs en un único bloque sticky */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          backgroundColor: 'var(--color-surface)',
        }}
      >
        {/* Header — colapsa altura al bajar, reaparece al subir */}
        <div
          style={{
            height: headerVisible ? 56 : 0,
            overflow: 'hidden',
            transition: 'height 250ms var(--ease-out)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <header
            style={{
              height: 56,
              flexShrink: 0,
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: 20,
              paddingTop: 'max(0px, env(safe-area-inset-top))',
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
        </div>

        {/* Mapa colapsable */}
        <div
          style={{
            height: mapCollapsed ? 120 : 240,
            transition: 'height var(--duration-moderate) var(--ease-out)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-map-base)',
          }}
        >
          <MapView onPinTap={handlePinTap} />
        </div>

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
                {/* Dot verde en "Mañana" (índice 2) cuando hay sesión apuntada */}
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
          onClick={() => haptic('medium')}
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
