import { useNavigate } from 'react-router-dom'

const CONFETTI = [
  { color: 'var(--color-primary)', shape: 'rect', w: 10, h: 10, left: 45, top: 62, deg: 30 },
  { color: 'var(--color-gold)', shape: 'circle', w: 8, h: 8, left: 115, top: 82, deg: 0 },
  { color: 'var(--color-primary)', shape: 'rect', w: 6, h: 14, left: 195, top: 58, deg: -12 },
  { color: 'var(--color-xp)', shape: 'rect', w: 8, h: 8, left: 290, top: 88, deg: 42 },
  { color: 'var(--color-gold)', shape: 'rect', w: 12, h: 5, left: 62, top: 138, deg: -32 },
  { color: 'var(--color-primary)', shape: 'circle', w: 7, h: 7, left: 345, top: 122, deg: 0 },
  { color: 'var(--color-gold)', shape: 'rect', w: 5, h: 12, left: 162, top: 162, deg: 18 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 9, h: 9, left: 265, top: 178, deg: -48 },
  { color: 'var(--color-primary)', shape: 'circle', w: 6, h: 6, left: 365, top: 102, deg: 0 },
  { color: 'var(--color-xp)', shape: 'rect', w: 10, h: 4, left: 82, top: 72, deg: 58 },
  { color: 'var(--color-primary)', shape: 'rect', w: 8, h: 8, left: 225, top: 142, deg: 18 },
  { color: 'var(--color-gold)', shape: 'rect', w: 10, h: 5, left: 22, top: 172, deg: -22 },
  { color: 'var(--color-xp)', shape: 'circle', w: 7, h: 7, left: 312, top: 158, deg: 0 },
  { color: 'var(--color-primary)', shape: 'rect', w: 6, h: 12, left: 178, top: 98, deg: 38 },
]

export default function Racha5Dias() {
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
      {/* Confetti */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', left: c.left, top: c.top, width: c.w, height: c.h,
              backgroundColor: c.color, borderRadius: c.shape === 'circle' ? '50%' : '2px',
              transform: c.deg !== 0 ? `rotate(${c.deg}deg)` : undefined,
              transformOrigin: c.shape === 'rect' && c.deg !== 0 ? '0% 0%' : '50% 50%',
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingInline: 32, paddingBottom: 16, position: 'relative' }}>
        {/* Icono rayo */}
        <div style={{ width: 100, height: 100, borderRadius: '9999px', backgroundColor: 'var(--color-avatar-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 28 }}>
          <svg width="52" height="52" viewBox="0 0 24 24">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="var(--color-primary)" />
          </svg>
        </div>

        <h1 style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '42px', textAlign: 'center', margin: '0 0 12px 0' }}>
          5 días seguidos
        </h1>

        <p style={{ color: 'var(--color-white-70)', fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: '26px', textAlign: 'center', margin: '0 0 28px 0' }}>
          Esto ya es un hábito.<br />Tu cuerpo y tu entorno lo saben.
        </p>

        <div style={{ width: 48, height: 2, backgroundColor: 'var(--color-white-15)', borderRadius: '9999px', marginBottom: 28, flexShrink: 0 }} />

        {/* Stats */}
        <div style={{ display: 'flex', width: '100%', marginBottom: 28 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8, borderRight: '1px solid var(--color-white-12)' }}>
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>5</span>
            <span style={{ color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Días racha</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8, borderRight: '1px solid var(--color-white-12)' }}>
            <span style={{ color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>+100</span>
            <span style={{ color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Pts ganados</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8 }}>
            <span style={{ color: 'var(--color-xp)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>2</span>
            <span style={{ color: 'var(--color-white-50)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Nivel</span>
          </div>
        </div>

        {/* Progress card */}
        <div style={{ backgroundColor: 'var(--color-white-06)', borderRadius: 12, padding: '14px 16px', width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-white-60)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '16px' }}>Medalla 7 días</span>
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, lineHeight: '16px' }}>5/7</span>
          </div>
          <div style={{ backgroundColor: 'var(--color-white-12)', borderRadius: '9999px', height: 6, overflow: 'hidden' }}>
            <div style={{
              height: 6, width: '71%', borderRadius: '9999px',
              background: 'linear-gradient(90deg in oklab, var(--color-primary) 0%, var(--color-primary-300) 100%)',
            }} />
          </div>
          <span style={{ color: 'var(--color-white-45)', fontFamily: 'var(--font-sans)', fontSize: 12, lineHeight: '16px', textAlign: 'center' }}>
            3 días más para desbloquear la medalla de 7 días
          </span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ flexShrink: 0, borderTop: '1px solid var(--color-white-08)', backgroundColor: 'var(--color-celebration-bg)', paddingInline: 24, paddingTop: 16, paddingBottom: 'max(36px, env(safe-area-inset-bottom))', position: 'relative' }}>
        <button
          onClick={() => navigate('/home')}
          style={{ width: '100%', height: 52, borderRadius: '9999px', backgroundColor: 'var(--color-primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: 'var(--color-primary-glow) 0px 4px 14px', color: 'var(--color-primary-foreground)', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          Seguir
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="var(--color-primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
