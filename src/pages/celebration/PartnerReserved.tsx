import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHaptics } from '@/hooks/useHaptics'

const PARTNER_DATA: Record<string, { name: string; initials: string; time: string; location: string; duration: string }> = {
  p1: { name: 'F45 Las Rozas', initials: 'F45', time: 'Mañana · 7:30am', location: 'Calle Mayor 24', duration: '45 min' },
  p2: { name: 'CrossFit Las Rozas', initials: 'CF', time: 'Jueves · 19:00', location: 'Polígono Las Rozas', duration: '60 min' },
}

const CONFETTI_PIECES = [
  { color: '#60A5FA', round: true,  top: '5%',  left: '8%',  rot: 0   },
  { color: '#F97316', round: false, top: '8%',  left: '20%', rot: 25  },
  { color: '#34D399', round: true,  top: '4%',  left: '36%', rot: 0   },
  { color: '#FBBF24', round: false, top: '7%',  left: '52%', rot: -15 },
  { color: '#60A5FA', round: true,  top: '6%',  left: '67%', rot: 0   },
  { color: '#F97316', round: false, top: '9%',  left: '82%', rot: 40  },
  { color: '#34D399', round: true,  top: '13%', left: '12%', rot: 0   },
  { color: '#FBBF24', round: true,  top: '12%', left: '44%', rot: 0   },
  { color: '#60A5FA', round: false, top: '15%', left: '26%', rot: -30 },
  { color: '#F97316', round: true,  top: '14%', left: '77%', rot: 0   },
  { color: '#34D399', round: false, top: '18%', left: '60%', rot: 20  },
  { color: '#FBBF24', round: true,  top: '16%', left: '90%', rot: 0   },
  { color: '#60A5FA', round: false, top: '21%', left: '6%',  rot: -10 },
  { color: '#F97316', round: true,  top: '20%', left: '33%', rot: 0   },
]

export default function PartnerReserved() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { haptic } = useHaptics()
  const partner = PARTNER_DATA[id ?? 'p1'] ?? PARTNER_DATA['p1']

  useEffect(() => {
    haptic('medium')
  }, [haptic])

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: '#0D1F4E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        position: 'relative',
        overflow: 'hidden',
        colorScheme: 'dark',
      }}
    >
      {/* Confetti */}
      {CONFETTI_PIECES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: p.round ? '8px' : '6px',
            height: p.round ? '8px' : '12px',
            backgroundColor: p.color,
            borderRadius: p.round ? '50%' : '2px',
            top: p.top,
            left: p.left,
            transform: `rotate(${p.rot}deg)`,
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Logo + check badge */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '20px',
            backgroundColor: 'rgba(37,99,235,0.25)',
            border: '2px solid rgba(96,165,250,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '22px',
              fontWeight: 800,
              color: '#60A5FA',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {partner.initials}
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            right: -8,
            width: 28,
            height: 28,
            borderRadius: '50%',
            backgroundColor: '#34D399',
            border: '3px solid #0D1F4E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0D1F4E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>

      {/* Headline */}
      <h1
        style={{
          fontSize: '30px',
          fontWeight: 800,
          color: '#FFFFFF',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          lineHeight: '36px',
          letterSpacing: '-0.02em',
          marginBottom: '10px',
        }}
      >
        ¡Plaza reservada!
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '15px',
          fontWeight: 500,
          color: 'rgba(255,255,255,0.65)',
          textAlign: 'center',
          fontFamily: 'var(--font-sans)',
          lineHeight: '22px',
          marginBottom: '32px',
        }}
      >
        {partner.name} · {partner.time}
      </p>

      {/* Next class card */}
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgba(255,255,255,0.10)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 18px',
          marginBottom: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: '14px',
          }}
        >
          Tu próxima clase
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(37,99,235,0.30)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: '20px',
              }}
            >
              {partner.name}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.55)',
                lineHeight: '18px',
              }}
            >
              {partner.time} · {partner.duration}
            </p>
          </div>
        </div>
        {/* Calendar row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius-full)',
            padding: '10px 14px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.75)',
              flex: 1,
            }}
          >
            Añadir al calendario
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/home')}
        style={{
          width: '100%',
          height: '52px',
          backgroundColor: '#FFFFFF',
          color: '#0D1F4E',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          fontSize: '16px',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        Ir al inicio →
      </button>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.35)',
          textAlign: 'center',
          lineHeight: '16px',
          marginTop: '12px',
        }}
      >
        Tu plaza está confirmada. ¡Nos vemos mañana!
      </p>
    </div>
  )
}
