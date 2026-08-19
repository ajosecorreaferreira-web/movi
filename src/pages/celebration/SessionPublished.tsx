import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const CONFETTI = [
  { color: 'var(--color-primary)', shape: 'rect', w: 10, h: 10, left: 40, top: 60, deg: 25 },
  { color: 'var(--color-gold)', shape: 'circle', w: 8, h: 8, left: 120, top: 80, deg: 0 },
  { color: 'var(--color-xp)', shape: 'rect', w: 6, h: 14, left: 200, top: 55, deg: -15 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 8, h: 8, left: 300, top: 90, deg: 45 },
  { color: 'var(--color-gold)', shape: 'rect', w: 12, h: 5, left: 60, top: 140, deg: -30 },
  { color: 'var(--color-primary)', shape: 'circle', w: 7, h: 7, left: 340, top: 120, deg: 0 },
  { color: 'var(--color-xp)', shape: 'rect', w: 5, h: 12, left: 160, top: 160, deg: 20 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 9, h: 9, left: 260, top: 180, deg: -45 },
  { color: 'var(--color-gold)', shape: 'circle', w: 6, h: 6, left: 360, top: 100, deg: 0 },
  { color: 'var(--color-primary)', shape: 'rect', w: 10, h: 4, left: 80, top: 70, deg: 60 },
  { color: 'var(--color-gold)', shape: 'rect', w: 8, h: 8, left: 220, top: 130, deg: 15 },
  { color: 'var(--color-xp)', shape: 'rect', w: 10, h: 5, left: 20, top: 170, deg: -20 },
  { color: 'var(--color-primary)', shape: 'circle', w: 7, h: 7, left: 310, top: 155, deg: 0 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 6, h: 12, left: 180, top: 95, deg: 35 },
]

export default function SessionPublished() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'var(--color-celebration-bg)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti layer */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: c.left,
              top: c.top,
              width: c.w,
              height: c.h,
              backgroundColor: c.color,
              borderRadius: c.shape === 'circle' ? '50%' : '2px',
              transform: c.deg !== 0 ? `rotate(${c.deg}deg)` : undefined,
              transformOrigin: c.shape === 'rect' && c.deg !== 0 ? '0% 0%' : '50% 50%',
            }}
          />
        ))}
      </div>

      {/* Contenido central */}
      <div
        style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          paddingInline: 32, paddingBottom: 16, position: 'relative',
        }}
      >
        {/* Icono MapPin */}
        <div
          style={{
            width: 100, height: 100, borderRadius: '9999px',
            backgroundColor: 'var(--color-avatar-dark)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, marginBottom: 28,
          }}
        >
          <MapPin size={52} strokeWidth={1.5} stroke="var(--color-primary)" />
        </div>

        <h1
          style={{
            color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 36, fontWeight: 800,
            letterSpacing: '-0.025em', lineHeight: '42px', textAlign: 'center',
            margin: '0 0 12px 0',
          }}
        >
          ¡Sesión publicada!
        </h1>

        <p
          style={{
            color: 'var(--color-white-70)', fontFamily: 'var(--font-sans)', fontSize: 17,
            lineHeight: '26px', textAlign: 'center', margin: '0 0 28px 0',
          }}
        >
          Tu sesión aparece ya en el mapa del Pinar. La gente puede apuntarse.
        </p>

        {/* Separador */}
        <div
          style={{
            width: 48, height: 2, backgroundColor: 'var(--color-white-15)',
            borderRadius: '9999px', marginBottom: 28, flexShrink: 0,
          }}
        />

        {/* Stats row */}
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Apuntados */}
          <div
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              paddingInline: 8, borderRight: '1px solid var(--color-white-12)',
            }}
          >
            <span
              style={{
                color: 'var(--color-primary)', fontFamily: 'var(--font-sans)',
                fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center',
              }}
            >
              0
            </span>
            <span
              style={{
                color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase',
              }}
            >
              Apuntados
            </span>
          </div>

          {/* Sesión activa */}
          <div
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              paddingInline: 8, borderRight: '1px solid var(--color-white-12)',
            }}
          >
            <span
              style={{
                color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)',
                fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center',
              }}
            >
              1
            </span>
            <span
              style={{
                color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase',
              }}
            >
              Sesión activa
            </span>
          </div>

          {/* Pts ganados */}
          <div
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              paddingInline: 8,
            }}
          >
            <span
              style={{
                color: 'var(--color-xp)', fontFamily: 'var(--font-sans)',
                fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center',
              }}
            >
              +15
            </span>
            <span
              style={{
                color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)',
                fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
                lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase',
              }}
            >
              Pts ganados
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          flexShrink: 0, borderTop: '1px solid var(--color-white-08)',
          backgroundColor: 'var(--color-celebration-bg)',
          paddingInline: 24, paddingTop: 16,
          paddingBottom: 'max(36px, env(safe-area-inset-bottom))',
          position: 'relative',
        }}
      >
        <button
          onClick={() => navigate('/home')}
          style={{
            width: '100%', height: 52, borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: 'var(--color-primary-glow) 0px 4px 14px',
            color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Ver en el mapa →
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="var(--color-primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
