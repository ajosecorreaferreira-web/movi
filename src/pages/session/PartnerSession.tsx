import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, MoreHorizontal } from 'lucide-react'
import { useHaptics } from '@/hooks/useHaptics'
import { useSessionStore } from '@/stores/sessionStore'

interface PartnerSessionData {
  id: string
  centerName: string
  centerInitials: string
  category: string
  rating: number
  reviews: number
  description: string
  participants: number
  totalSpots: number
  priceFirst: string
  priceNormal: string
  priceBonus: string
  location: string
  distance: string
  time: string
  walkTime: string
  workoutName: string
  workoutTags: string[]
}

const MOCK_PARTNER_SESSIONS: Record<string, PartnerSessionData> = {
  p1: {
    id: 'p1',
    centerName: 'F45 Las Rozas',
    centerInitials: 'F45',
    category: 'Centro fitness · Partner Movi',
    rating: 4.8,
    reviews: 127,
    description:
      'Entrenamiento funcional de alta intensidad en grupos reducidos. Primera clase gratuita para nuevos usuarios de Movi.',
    participants: 11,
    totalSpots: 15,
    priceFirst: 'Gratis con Movi',
    priceNormal: '12€/clase',
    priceBonus: '89€ bono 10 clases',
    location: 'Calle Mayor 24, Las Rozas',
    distance: '1.2km',
    time: 'Mañana · 7:30am',
    walkTime: '12 min andando',
    workoutName: 'Funcional AMRAP',
    workoutTags: [
      'Alta intensidad',
      'Cuerpo completo',
      'Equipamiento completo',
    ],
  },
  p2: {
    id: 'p2',
    centerName: 'CrossFit Las Rozas',
    centerInitials: 'CF',
    category: 'Box CrossFit · Partner Movi',
    rating: 4.9,
    reviews: 89,
    description:
      'WOD diario con coaches certificados. Primera clase completamente gratis para usuarios de Movi.',
    participants: 8,
    totalSpots: 12,
    priceFirst: 'Gratis primera clase',
    priceNormal: '15€/clase',
    priceBonus: '120€ bono 10 clases',
    location: 'Polígono Las Rozas, Nave 12',
    distance: '0.8km',
    time: 'Jueves · 19:00',
    walkTime: '10 min andando',
    workoutName: 'WOD CrossFit',
    workoutTags: [
      'Alta intensidad',
      'Fuerza + cardio',
      'Equipamiento completo',
    ],
  },
}

const AVATARS = [
  { initial: 'A', bg: 'var(--color-secondary)' },
  { initial: 'M', bg: 'var(--color-primary)' },
  { initial: 'C', bg: 'var(--color-info)' },
]

export default function PartnerSession() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { haptic } = useHaptics()
  const { reservarPartner } = useSessionStore()
  const session = MOCK_PARTNER_SESSIONS[id ?? 'p1'] ?? MOCK_PARTNER_SESSIONS['p1']
  const availableSpots = session.totalSpots - session.participants

  return (
    <>
      <div
        style={{
          minHeight: '100dvh',
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto',
          backgroundColor: 'var(--color-background)',
          colorScheme: 'light',
          paddingBottom: '88px',
        }}
      >
        {/* Header sticky */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            height: 56,
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingInline: 8,
            paddingTop: 'max(0px, env(safe-area-inset-top))',
            transform: 'translate3d(0,0,0)',
          }}
        >
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft size={24} strokeWidth={1.5} color="var(--color-text)" />
          </button>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--color-text)',
            }}
          >
            {session.centerName}
          </span>
          <button
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <MoreHorizontal size={20} strokeWidth={1.5} color="var(--color-text)" />
          </button>
        </header>

        {/* Bloque info centro */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              flexShrink: 0,
              borderRadius: 8,
              backgroundColor: 'var(--color-info-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--color-info)',
              }}
            >
              {session.centerInitials}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 17,
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: '22px',
                marginBottom: 2,
              }}
            >
              {session.centerName}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-text-muted)',
                lineHeight: '18px',
                marginBottom: 4,
              }}
            >
              {session.category}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-text)',
                lineHeight: '18px',
              }}
            >
              ⭐ {session.rating} · {session.reviews} reseñas
            </p>
          </div>
        </div>

        {/* Descripción */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
              lineHeight: '20px',
            }}
          >
            {session.description}
          </p>
        </div>

        {/* Bloque FOMO */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {AVATARS.map((av, i) => (
              <div
                key={i}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  backgroundColor: av.bg,
                  border: '2px solid var(--color-surface)',
                  marginRight: i < AVATARS.length - 1 ? -8 : 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: AVATARS.length - i,
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--color-primary-foreground)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {av.initial}
                </span>
              </div>
            ))}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--color-surface-3)',
                border: '2px solid var(--color-surface)',
                marginLeft: -8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 0,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                +{session.participants - 3}
              </span>
            </div>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-text)',
                lineHeight: '18px',
              }}
            >
              {session.participants} personas apuntadas
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-text-muted)',
                lineHeight: '18px',
              }}
            >
              Quedan {availableSpots} plazas
            </p>
          </div>
        </div>

        {/* Bloque precios */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-success-subtle)',
            borderLeft: '3px solid var(--color-success)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          {[
            { label: '💰 Primera clase', value: session.priceFirst, highlight: true },
            { label: 'Precio normal', value: session.priceNormal, highlight: false },
            { label: 'Bono 10 clases', value: session.priceBonus, highlight: false },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: row.highlight ? 'var(--color-text)' : 'var(--color-text-muted)',
                  fontWeight: row.highlight ? 500 : 400,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: row.highlight ? 700 : 400,
                  color: row.highlight ? 'var(--color-primary)' : 'var(--color-text-muted)',
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Bloque logística */}
        <div
          style={{
            padding: '16px',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {[
            { icon: '📍', text: session.location },
            { icon: '🕗', text: session.time },
            { icon: '🚶', text: `${session.walkTime} desde tu ubicación` },
          ].map((row) => (
            <div key={row.text} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{row.icon}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  color: 'var(--color-text)',
                  lineHeight: '18px',
                }}
              >
                {row.text}
              </span>
            </div>
          ))}
        </div>

        {/* Mini mapa */}
        <div
          style={{
            height: 100,
            backgroundColor: 'var(--color-map-base)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 390 100"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="390" height="100" fill="var(--color-map-base)" />
            <rect x="50" y="20" width="290" height="60" rx="4" fill="var(--color-map-pinar)" />
            <path
              d="M 80 50 Q 180 40 280 55 Q 330 60 360 50"
              stroke="var(--color-map-path)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          {/* Pin azul */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: 'var(--color-info)',
              border: '3px solid var(--color-surface)',
              boxShadow: 'var(--color-shadow-sm) 0px 2px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'var(--color-primary-foreground)',
              }}
            />
          </div>
        </div>

        {/* Bloque entrenamiento */}
        <div
          style={{
            margin: '16px',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            borderLeft: '6px solid var(--color-info)',
            padding: '14px 16px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: 6,
            }}
          >
            ⚡ {session.workoutName}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {session.workoutTags.map((tag) => (
              <p
                key={tag}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'var(--color-text-muted)',
                  lineHeight: '18px',
                }}
              >
                {tag}
              </p>
            ))}
          </div>
          <button
            style={{
              marginTop: 10,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-info)',
            }}
          >
            Ver entrenamiento →
          </button>
        </div>
      </div>

      {/* CTA flotante */}
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
        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-sans)',
          marginBottom: '8px',
        }}>
          ℹ️ Cancelación gratuita hasta 2h antes
        </p>
        <button
          onClick={() => {
            reservarPartner(id!)
            haptic('medium')
            navigate(`/celebration/partner-reserved/${id}`)
          }}
          style={{
            width: '100%',
            height: 52,
            backgroundColor: 'var(--color-info)',
            color: 'var(--color-primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--color-info-glow) 0px 4px 14px',
          }}
        >
          Reservar plaza gratis →
        </button>
      </div>
    </>
  )
}
