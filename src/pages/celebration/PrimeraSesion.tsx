import { useNavigate, useSearchParams } from 'react-router-dom'

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

export default function PrimeraSesion() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const fromId = searchParams.get('from') ?? '2'

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
        {/* Icono estrella */}
        <div style={{
          width: 100, height: 100, borderRadius: '9999px',
          backgroundColor: 'var(--color-avatar-dark)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginBottom: 28,
        }}>
          <svg width="52" height="52" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--color-gold)" />
          </svg>
        </div>

        <h1 style={{
          color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 36, fontWeight: 800,
          letterSpacing: '-0.025em', lineHeight: '42px', textAlign: 'center',
          marginBottom: 12, margin: '0 0 12px 0',
        }}>
          ¡Tu primera sesión!
        </h1>

        <p style={{
          color: 'var(--color-white-70)', fontFamily: 'var(--font-sans)', fontSize: 17,
          lineHeight: '26px', textAlign: 'center', marginBottom: 28, margin: '0 0 28px 0',
        }}>
          Ana y 2 personas te esperan mañana. Esto es solo el principio.
        </p>

        {/* Separador */}
        <div style={{ width: 48, height: 2, backgroundColor: 'var(--color-white-15)', borderRadius: '9999px', marginBottom: 28, flexShrink: 0 }} />

        {/* Avatares */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ position: 'relative', width: 88, height: 32, flexShrink: 0 }}>
            {[
              { left: 0, bg: 'linear-gradient(135deg in oklab, var(--color-primary-400) 0%, var(--color-primary-600) 100%)', label: 'A' },
              { left: 20, bg: 'linear-gradient(135deg in oklab, var(--color-secondary-400) 0%, var(--color-secondary-700) 100%)', label: 'M' },
              { left: 40, bg: 'linear-gradient(135deg in oklab, var(--color-avatar-purple) 0%, var(--color-xp) 100%)', label: 'C' },
              { left: 60, bg: 'var(--color-avatar-dark)', label: '+2', color: 'var(--color-white-55)', size: 10 },
            ].map((a, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', left: a.left, top: 0,
                  width: 32, height: 32, borderRadius: '9999px',
                  background: a.bg,
                  border: '2px solid var(--color-celebration-bg)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ color: a.color ?? 'var(--color-primary-foreground)', fontSize: a.size ?? 11, fontWeight: 700, fontFamily: 'var(--font-sans)', lineHeight: '14px', textAlign: 'center' }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
          <span style={{ color: 'var(--color-white-55)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px', textAlign: 'center' }}>
            Ana, Marta, Carlos y tú
          </span>
        </div>

        {/* Recordatorio */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: 'var(--color-white-08)', borderRadius: '9999px', padding: '8px 16px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-white-50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="12 6 12 12 16 14" fill="none" stroke="var(--color-white-50)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: '16px', textAlign: 'center' }}>
            Te avisamos 30 min antes para que llegues a tiempo
          </span>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        flexShrink: 0, borderTop: '1px solid var(--color-white-08)',
        backgroundColor: 'var(--color-celebration-bg)',
        paddingInline: 24, paddingTop: 16,
        paddingBottom: 'max(36px, env(safe-area-inset-bottom))',
        position: 'relative',
      }}>
        <button
          onClick={() => navigate(`/home?apuntado=${fromId}`)}
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
          Ver mi semana
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="var(--color-primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
