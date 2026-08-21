import { useState, useEffect, useMemo } from 'react'
import { Bell, MapPin, Users, Zap, Dumbbell, Wind, Flame, Menu, ChevronRight } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useHaptics } from '@/hooks/useHaptics'
import { MapStatic } from '@/components/home/MapStatic'
import { HamburgerMenu } from '@/components/home/HamburgerMenu'
import { useProgramStore } from '@/stores/programStore'
import { useSessionStore } from '@/stores/sessionStore'
import { FeelingSheet } from '@/components/program/FeelingSheet'

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
  sessionType: 'user' | 'partner' | 'first'
  partnerName?: string
  partnerLogo?: string
  price?: string
  isFree?: boolean
  day?: 'today' | 'tomorrow' | 'thu' | 'fri' | 'sat' | 'sun'
}

const TABS = ['Semana', 'Hoy', 'Mañana', 'Jue', 'Vie', 'Sáb']

const ALL_SESSIONS: Session[] = [
  // HOY
  { id: '1',  title: 'Carrera por el pinar',         time: 'Ahora · 09:15',      distance: '0.3km', level: 3, space: 'Pinar de Las Rozas',        participants: 1,  status: 'now',    type: 'running',    sessionType: 'user',                                                              day: 'today' },
  { id: 'p1', title: 'F45 Las Rozas · Funcional',    time: 'Mañana · 7:30am',    distance: '1.2km', level: 3, space: 'F45 Las Rozas',              participants: 11, status: 'soon',   type: 'functional', sessionType: 'partner', partnerName: 'F45',  partnerLogo: 'F45',  price: '12€',               isFree: true,  day: 'today' },
  { id: '2',  title: 'Funcional al aire libre',       time: '10:30',              distance: '0.5km', level: 2, space: 'Zona calistenia',            participants: 3,  status: 'soon',   type: 'functional', sessionType: 'user',                                                              day: 'today' },
  { id: 'f1', title: 'Funcional en el Pinar',         time: 'Esta semana · Nivel 2', distance: '350m', level: 2, space: 'Pinar de Las Rozas',       participants: 0,  status: 'future', type: 'functional', sessionType: 'first',                                                             day: 'today' },
  // MAÑANA
  { id: '3',  title: 'Yoga matutino con Laura',       time: '8:00am',             distance: '0.8km', level: 1, space: 'Pinar de Las Rozas',        participants: 5,  status: 'future', type: 'yoga',       sessionType: 'user',                                                              day: 'tomorrow' },
  { id: 'p2', title: 'CrossFit Las Rozas · WOD',     time: '19:00',              distance: '0.8km', level: 4, space: 'CrossFit Las Rozas',         participants: 8,  status: 'future', type: 'hiit',       sessionType: 'partner', partnerName: 'CF',   partnerLogo: 'CF',   price: 'Gratis primera clase', isFree: true,  day: 'tomorrow' },
  { id: '4',  title: 'Caminata con perros 🐕',        time: '10:00am',            distance: '1.1km', level: 1, space: 'Monte del Pilar',           participants: 4,  status: 'future', type: 'walking',    sessionType: 'user',                                                              day: 'tomorrow' },
  { id: 'p3', title: 'Zumba · Polideportivo Las Rozas', time: '11:00am',         distance: '1.5km', level: 2, space: 'Polideportivo Las Rozas',    participants: 15, status: 'future', type: 'yoga',       sessionType: 'partner', partnerName: 'Pol',  partnerLogo: 'Pol',  price: '5€',               isFree: false, day: 'tomorrow' },
  // JUEVES
  { id: '5',  title: 'HIIT explosivo',                time: '7:30am',             distance: '1.2km', level: 4, space: 'Zona calistenia',            participants: 2,  status: 'future', type: 'hiit',       sessionType: 'user',                                                              day: 'thu' },
  { id: 'p4', title: 'Natación · Club Las Rozas',    time: '8:00am',             distance: '2km',   level: 2, space: 'Piscina Municipal',          participants: 6,  status: 'future', type: 'functional', sessionType: 'partner', partnerName: 'Nata', partnerLogo: 'Nata', price: '4€',               isFree: false, day: 'thu' },
  // VIERNES
  { id: '6',  title: 'Bici por el pinar',             time: '9:00am',             distance: '0.5km', level: 2, space: 'Pinar de Las Rozas',        participants: 3,  status: 'future', type: 'functional', sessionType: 'user',                                                              day: 'fri' },
  { id: 'p5', title: 'Danza aérea · Studio Move',    time: '18:00',              distance: '1.8km', level: 2, space: 'Studio Move Las Rozas',      participants: 8,  status: 'future', type: 'yoga',       sessionType: 'partner', partnerName: 'Move', partnerLogo: 'Move', price: '10€',              isFree: false, day: 'fri' },
  // SÁBADO
  { id: '7',  title: 'Funcional familiar 👨‍👧',        time: '10:00am',            distance: '0.3km', level: 1, space: 'Pinar de Las Rozas',        participants: 6,  status: 'future', type: 'functional', sessionType: 'user',                                                              day: 'sat' },
  { id: 'p6', title: 'Yoga con niños · La Vaguada',  time: '11:00am',            distance: '2.2km', level: 1, space: 'La Vaguada',                participants: 10, status: 'future', type: 'yoga',       sessionType: 'partner', partnerName: 'Yoga', partnerLogo: 'Yoga', price: '8€',               isFree: false, day: 'sat' },
]

const TAB_TO_DAY: Record<string, string[]> = {
  'Semana': ['today', 'tomorrow', 'thu', 'fri', 'sat', 'sun'],
  'Hoy':    ['today'],
  'Mañana': ['tomorrow'],
  'Jue':    ['thu'],
  'Vie':    ['fri'],
  'Sáb':    ['sat'],
}

const TYPE_ICONS = {
  running:    Zap,
  functional: Dumbbell,
  walking:    MapPin,
  yoga:       Wind,
  hiit:       Flame,
}

const STATUS_BORDER_COLOR: Record<Session['status'], string> = {
  now:    'var(--color-primary)',
  soon:   'var(--color-warning)',
  future: 'var(--color-text-muted)',
}

const LEVEL_LABELS = ['', 'Activo', 'En marcha', 'En forma', 'Potencia', 'Élite']

function SessionCard({ session, isApuntado, isPartnerReserved }: { session: Session; isApuntado?: boolean; isPartnerReserved?: boolean }) {
  const { haptic } = useHaptics()
  const navigate = useNavigate()
  const Icon = TYPE_ICONS[session.type]

  // Border color según sessionType
  let borderColor: string
  if (isApuntado) {
    borderColor = 'var(--color-success)'
  } else if (session.sessionType === 'partner') {
    borderColor = 'var(--color-info)'
  } else if (session.sessionType === 'first') {
    borderColor = 'var(--color-gold)'
  } else {
    borderColor = STATUS_BORDER_COLOR[session.status]
  }

  // Badge top-right
  const badge = (() => {
    if (isApuntado) return null
    if (session.sessionType === 'partner') {
      return (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: 'var(--color-info)',
          borderRadius: 'var(--radius-full)',
          padding: '3px 10px',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, lineHeight: '16px',
            color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)',
          }}>{isPartnerReserved ? '✓ Reservado' : 'Partner'}</span>
        </div>
      )
    }
    if (session.sessionType === 'first') {
      return (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          backgroundColor: 'var(--color-gold)',
          borderRadius: 'var(--radius-full)',
          padding: '3px 10px',
        }}>
          <span style={{
            fontSize: 11, fontWeight: 600, lineHeight: '16px',
            color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)',
          }}>✨ Sugerido por Movi</span>
        </div>
      )
    }
    return null
  })()

  // Icono/logo izquierdo
  const iconEl = session.sessionType === 'partner' ? (
    <div style={{
      width: 36, height: 36, borderRadius: 'var(--radius-sm)',
      backgroundColor: 'var(--color-info-subtle)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, color: 'var(--color-info)', fontFamily: 'var(--font-sans)',
      }}>{session.partnerLogo}</span>
    </div>
  ) : (
    <div style={{
      width: 36, height: 36, borderRadius: 'var(--radius-sm)',
      backgroundColor: 'var(--color-surface-2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Icon size={16} strokeWidth={1.5} color="var(--color-text-muted)" />
    </div>
  )

  // Navegación al tocar la card
  const handleCardTap = () => {
    haptic('light')
    if (session.sessionType === 'partner') {
      navigate(`/session/partner/${session.id}`)
    } else if (session.sessionType === 'first') {
      navigate('/create')
    } else {
      navigate(isApuntado ? `/session/${session.id}/apuntado` : `/session/${session.id}`)
    }
  }

  // Botón CTA
  const ctaBtn = (() => {
    if (isApuntado || isPartnerReserved) return null
    if (session.sessionType === 'partner') {
      return (
        <button
          onClick={() => { haptic('medium'); navigate(`/session/partner/${session.id}`) }}
          style={{
            height: 36, paddingInline: '14px', borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--color-info)',
            backgroundColor: 'transparent',
            color: 'var(--color-info)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Reservar plaza
        </button>
      )
    }
    if (session.sessionType === 'first') {
      return (
        <button
          onClick={() => { haptic('medium'); navigate('/create') }}
          style={{
            height: 36, paddingInline: '14px', borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-primary)', border: 'none',
            color: 'var(--color-primary-foreground)',
            fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer', boxShadow: 'var(--shadow-primary)',
          }}
        >
          Proponer esta sesión →
        </button>
      )
    }
    // sessionType === 'user'
    if (session.status === 'now') {
      return (
        <button
          onClick={() => haptic('medium')}
          style={{
            height: 36, paddingInline: '16px', borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--color-info-subtle)', border: '1px solid var(--color-info)',
            color: 'var(--color-info-text)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Acompañarle
        </button>
      )
    }
    return (
      <button
        onClick={() => haptic('medium')}
        style={{
          height: 36, paddingInline: '14px', borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--color-primary)', border: 'none',
          color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)',
          fontSize: 13, fontWeight: 600,
          cursor: 'pointer', boxShadow: 'var(--shadow-primary)',
        }}
      >
        Apuntarme
      </button>
    )
  })()

  const hasRightBadge = !isApuntado && (session.sessionType === 'partner' || session.sessionType === 'first')

  return (
    <div
      id={`session-card-${session.id}`}
      onClick={handleCardTap}
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

      {/* Badge partner/first */}
      {badge}

      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingRight: (isApuntado || hasRightBadge) ? 90 : 0 }}>
        {iconEl}
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
          {/* Párrafo extra para sessionType 'first' */}
          {session.sessionType === 'first' && !isApuntado && (
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              marginTop: '4px',
              fontFamily: 'var(--font-sans)',
              lineHeight: '18px',
              fontStyle: 'italic',
            }}>
              Nadie lo ha propuesto aún. ¿Lo organizas tú?
            </p>
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

      {/* Actions */}
      {!isApuntado && ctaBtn && (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}
          onClick={e => e.stopPropagation()}
        >
          {ctaBtn}
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { haptic } = useHaptics()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Semana')
  const [mapCollapsed, setMapCollapsed] = useState(false)
  const [activePin, setActivePin] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showPublishedToast, setShowPublishedToast] = useState(false)
  const [, setSearchParams] = useSearchParams()
  const [showToast, setShowToast] = useState<boolean>(
    () => !!new URLSearchParams(window.location.search).get('apuntado')
  )
  const { apuntadoIds, partnerReservedIds } = useSessionStore()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('published') === 'true') {
      setShowPublishedToast(true)
      window.history.replaceState({}, '', '/home')
      const t = setTimeout(() => setShowPublishedToast(false), 4000)
      return () => clearTimeout(t)
    }
  }, [])

  const filteredSessions = useMemo(() => {
    const days = TAB_TO_DAY[activeTab] || ['today']
    return ALL_SESSIONS.filter(s => days.includes(s.day || 'today'))
  }, [activeTab])

  /* Programa activo */
  const { program, showFeelingSheet, setShowFeelingSheet } = useProgramStore()
  const nextSession = program?.sessions.find(
    (s) => s.status === 'today' || s.status === 'upcoming'
  )

  useEffect(() => {
    if (!showToast) return
    setSearchParams({}, { replace: true })
    const timer = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(timer)
  }, [showToast, setSearchParams])

  useEffect(() => {
    const handleScroll = () => {
      setMapCollapsed(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handlePinTap = (sessionId: string) => {
    setActivePin(prev => prev === sessionId ? null : sessionId)
    const cardEl = document.getElementById(`session-card-${sessionId}`)
    cardEl?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div
        style={{
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          backgroundColor: 'var(--color-background)',
          colorScheme: 'light',
        }}
      >
        {/* Toast sesión publicada */}
        {showPublishedToast && (
          <div style={{
            position: 'fixed',
            top: 'max(16px, env(safe-area-inset-top))',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 48px)',
            maxWidth: '342px',
            backgroundColor: 'white',
            borderLeft: '3px solid var(--color-primary)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            zIndex: 100,
            fontSize: '14px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            color: 'var(--color-text)',
          }}>
            🗺️ <strong>¡Sesión publicada!</strong> Ya aparece en el mapa.
          </div>
        )}

        {/* Toast apuntado */}
        {showToast && (
          <div style={{
            position: 'fixed', top: 64, left: '50%', transform: 'translateX(-50%)',
            zIndex: 50, maxWidth: 320, width: 'calc(100% - 70px)',
            backgroundColor: 'var(--color-surface)',
            borderLeft: '3px solid var(--color-success)',
            borderRadius: 10, boxShadow: 'var(--color-shadow-xs) 0px 4px 16px',
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

        {/* Header — sticky, GPU layer aislado */}
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
            onClick={() => setMenuOpen(true)}
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

        {/* Banner programa activo — flujo normal, scrollea con la página */}
        {program && nextSession && (
          <div
            onClick={() => { haptic('light'); navigate('/program') }}
            style={{
              backgroundColor: 'var(--color-primary-50)',
              borderBottom: '1px solid var(--color-primary-200)',
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingInline: 16,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-primary-text)',
                lineHeight: '16px',
              }}
            >
              📅 Tu programa · Próxima: {nextSession.date} · {nextSession.time}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--color-primary)',
                lineHeight: '16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Ver <ChevronRight size={14} strokeWidth={1.5} color="var(--color-primary)" />
            </span>
          </div>
        )}

        {/* Mapa — colapsa a 0px al hacer scroll, desaparece completamente */}
        <div
          style={{
            height: mapCollapsed ? '0px' : '240px',
            overflow: 'hidden',
            transition: 'height 300ms ease',
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
          }}
        >
          <MapStatic
            activePin={activePin}
            onPinTap={handlePinTap}
            collapsed={false}
            showPublishedPin={showPublishedToast}
          />
        </div>

        {/* Tabs — sticky independiente, siempre a top:56px bajo el header */}
        <div
          style={{
            position: 'sticky',
            top: 56,
            zIndex: 40,
            backgroundColor: 'var(--color-background)',
            borderBottom: '1px solid var(--color-border)',
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
          }}
        >
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
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => { haptic('light'); setActiveTab(tab) }}
                className="text-[13px] leading-[18px] tracking-[-0.01em]"
                style={{
                  flexShrink: 0, height: 28, paddingInline: 12,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                  border: 'none', cursor: 'pointer',
                  color: activeTab === tab ? 'var(--color-primary-foreground)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: activeTab === tab ? 600 : 500,
                  transition: 'background-color var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out)',
                  position: 'relative',
                }}
              >
                {tab}
                {tab === 'Mañana' && apuntadoIds.length > 0 && (
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

        {/* Lista de sesiones */}
        <div
          style={{
            padding: '16px 16px 88px',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            backgroundColor: 'var(--color-background)',
          }}
        >
          {filteredSessions.map(session => (
            <SessionCard
              key={session.id}
              session={session}
              isApuntado={apuntadoIds.includes(session.id)}
              isPartnerReserved={partnerReservedIds.includes(session.id)}
            />
          ))}
        </div>
      </div>

      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* FAB — fuera del wrapper con transform para que position: fixed funcione */}
      <div
        style={{
          position: 'fixed',
          bottom: 'max(24px, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)',
          maxWidth: '342px',
          zIndex: 50,
        }}
      >
        <button
          onClick={() => { haptic('medium'); navigate('/create') }}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-primary-strong)',
          }}
        >
          + Proponer una sesión
        </button>
      </div>

      {/* FeelingSheet — renderizado fuera del scroll container */}
      <FeelingSheet
        isOpen={showFeelingSheet}
        onClose={() => setShowFeelingSheet(false)}
        sessionInfo={{
          partnerName: program?.partnerName ?? 'Ana',
          workoutName: 'Funcional',
          location: program?.location ?? 'Pinar de Las Rozas',
        }}
        onAnswer={(feeling) => {
          setShowFeelingSheet(false)
          if (feeling === 'great') {
            navigate('/program/proposal?type=group')
          } else if (feeling === 'ok') {
            navigate('/program/proposal?type=solo')
          } else if (feeling === 'notforme' || feeling === 'alone') {
            navigate('/program/propose')
          }
        }}
      />
    </>
  )
}
