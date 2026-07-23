import { useState } from 'react'
import { Bell, MapPin, Users, Plus, Zap, Dumbbell, Wind, Flame } from 'lucide-react'
import { useHaptics } from '@/hooks/useHaptics'

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

const TABS = ['Hoy', 'Mañana', 'Jue', 'Vie', 'Sáb', 'Dom']

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

function SessionCard({ session }: { session: Session }) {
  const { haptic } = useHaptics()
  const Icon = TYPE_ICONS[session.type]

  return (
    <div
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-sm)',
        borderLeft: `6px solid ${STATUS_BORDER_COLOR[session.status]}`,
        boxShadow: 'var(--shadow-xs)',
        padding: '14px 14px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-surface-2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
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
        <div
          style={{
            marginLeft: 'auto',
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-full)',
            padding: '2px 8px',
            flexShrink: 0,
          }}
        >
          <span
            className="text-[11px] font-medium leading-4"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
          >
            {LEVEL_LABELS[session.level]}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        {session.status === 'now' ? (
          <button
            onClick={() => haptic('medium')}
            className="text-[13px] font-semibold tracking-[-0.01em]"
            style={{
              height: 36,
              paddingInline: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-info-subtle)',
              border: '1px solid var(--color-info)',
              color: 'var(--color-info-text)',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
            }}
          >
            Acompañarle
          </button>
        ) : (
          <>
            <button
              onClick={() => haptic('light')}
              className="text-[13px] font-medium"
              style={{
                height: 36,
                paddingInline: '14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'transparent',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              Ver más
            </button>
            <button
              onClick={() => haptic('medium')}
              className="text-[13px] font-semibold tracking-[-0.01em]"
              style={{
                height: 36,
                paddingInline: '14px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-primary)',
                border: 'none',
                color: 'var(--color-primary-foreground)',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-primary)',
              }}
            >
              Apuntarme
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function MapView() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* SVG terrain */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 390 240"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}
        aria-hidden="true"
      >
        <rect width="390" height="240" style={{ fill: 'var(--color-map-base)' }} />
        {/* Pinar */}
        <path
          d="M60 20 L280 20 L320 60 L340 120 L300 200 L200 220 L80 200 L30 120 Z"
          style={{ fill: 'var(--color-map-pinar)' }}
          opacity="0.85"
        />
        {/* Paths through park */}
        <path
          d="M80 200 Q140 160 180 120 Q220 80 260 50"
          style={{ stroke: 'var(--color-map-path)', fill: 'none', strokeWidth: 3, strokeLinecap: 'round' }}
        />
        <path
          d="M200 220 Q220 170 240 140 Q260 110 300 80"
          style={{ stroke: 'var(--color-map-path)', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round' }}
        />
        {/* M-505 road */}
        <path d="M0 130 L390 108" style={{ stroke: 'white', strokeWidth: 9, strokeLinecap: 'round', fill: 'none' }} />
        <path
          d="M0 130 L390 108"
          style={{ stroke: 'var(--color-map-road-edge)', strokeWidth: 0.5, strokeLinecap: 'round', fill: 'none' }}
        />
        {/* Calistenia zone */}
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

      {/* Carlos pin — running, blue, with tooltip */}
      <div
        style={{
          position: 'absolute',
          left: 195,
          top: 85,
          transform: 'translate(-50%, -100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-md)',
            padding: '4px 8px',
            marginBottom: 4,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            className="text-[11px] font-semibold leading-4"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
          >
            Carlos · Ahora
          </span>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-info)',
            border: '2.5px solid white',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-xs font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>C</span>
        </div>
      </div>

      {/* Ana +2 pin — primary orange */}
      <div
        style={{
          position: 'absolute',
          left: 145,
          top: 148,
          transform: 'translate(-50%, -50%)',
          zIndex: 9,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)',
            border: '2.5px solid white',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span className="text-[11px] font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>A+2</span>
        </div>
      </div>

      {/* Grupo 5 pin */}
      <div
        style={{
          position: 'absolute',
          left: 255,
          top: 68,
          transform: 'translate(-50%, -50%)',
          zIndex: 8,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)',
            border: '2px solid white',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.85,
          }}
        >
          <span className="text-[10px] font-bold" style={{ color: 'white', fontFamily: 'var(--font-sans)' }}>5</span>
        </div>
      </div>

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
        }}
      >
        <button
          aria-label="Acercar mapa"
          className="text-lg font-light"
          style={{
            width: 32,
            height: 32,
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: '6px 6px 0 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)',
            color: 'var(--color-text)',
            lineHeight: 1,
          }}
        >
          +
        </button>
        <button
          aria-label="Alejar mapa"
          className="text-lg font-light"
          style={{
            width: 32,
            height: 32,
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderTop: 'none',
            borderRadius: '0 0 6px 6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-xs)',
            color: 'var(--color-text)',
            lineHeight: 1,
          }}
        >
          −
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const { haptic } = useHaptics()
  const [activeTab, setActiveTab] = useState(0)
  const [mapCollapsed, setMapCollapsed] = useState(false)

  function handleTabClick(i: number) {
    haptic('light')
    setActiveTab(i)
  }

  return (
    // Fix 1: fondo claro explícito en todos los niveles del árbol
    <div
      className="min-h-dvh flex items-start justify-center"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <div
        className="w-full min-h-dvh flex flex-col"
        style={{ backgroundColor: 'var(--color-background)', maxWidth: '390px' }}
      >
        {/* Header — sticky fuera del scroll container */}
        <div
          className="sticky top-0 z-50 flex-shrink-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            paddingTop: 'max(0px, env(safe-area-inset-top))',
          }}
        >
          <div
            style={{
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: 24,
            }}
          >
            <span
              className="text-[22px] font-extrabold tracking-[-0.03em] leading-7"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)' }}
            >
              movi
            </span>
            <button
              onClick={() => haptic('light')}
              aria-label="Notificaciones"
              style={{
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-2)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Bell size={20} strokeWidth={1.5} color="var(--color-text)" />
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 9,
                  width: 7,
                  height: 7,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-error)',
                  border: '1.5px solid var(--color-surface)',
                }}
              />
            </button>
          </div>
        </div>

        {/* Fix 2: scroll container — mapa + tabs sticky, lista scrollea */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-background)' }}
          onScroll={(e) => {
            setMapCollapsed(e.currentTarget.scrollTop > 60)
          }}
        >
          {/* Sticky: mapa + tabs */}
          <div
            className="sticky top-0 z-30"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {/* Mapa colapsable */}
            <div
              style={{
                height: mapCollapsed ? 120 : 240,
                transition: 'height var(--duration-moderate) var(--ease-out)',
                overflow: 'hidden',
                backgroundColor: 'var(--color-map-base)',
              }}
            >
              <MapView />
            </div>

            {/* Fix 3: tabs de días sin "Ahora" */}
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
                    onClick={() => handleTabClick(i)}
                    className="text-[13px] leading-[18px] tracking-[-0.01em]"
                    style={{
                      flexShrink: 0,
                      height: 32,
                      paddingInline: 14,
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: activeTab === i ? 'var(--color-primary)' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: activeTab === i ? 'white' : 'var(--color-text-muted)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: activeTab === i ? 600 : 500,
                      transition: 'background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lista de sesiones */}
          <div
            style={{
              padding: '16px 16px 100px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              backgroundColor: 'var(--color-background)',
            }}
          >
            {MOCK_SESSIONS.map(session => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </div>

        {/* FAB */}
        <div
          style={{
            position: 'fixed',
            bottom: 'max(24px, env(safe-area-inset-bottom))',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
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
            }}
          >
            <Plus size={20} strokeWidth={1.5} color="white" />
            Proponer una sesión
          </button>
        </div>
      </div>
    </div>
  )
}
