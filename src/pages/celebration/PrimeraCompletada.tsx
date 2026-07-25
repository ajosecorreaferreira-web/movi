import { useNavigate } from 'react-router-dom'

const CONFETTI = [
  { color: 'var(--color-gold)', shape: 'rect', w: 10, h: 10, left: 35, top: 55, deg: 20 },
  { color: 'var(--color-primary)', shape: 'circle', w: 8, h: 8, left: 130, top: 75, deg: 0 },
  { color: 'var(--color-xp)', shape: 'rect', w: 6, h: 14, left: 210, top: 60, deg: -18 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 8, h: 8, left: 310, top: 85, deg: 40 },
  { color: 'var(--color-primary)', shape: 'rect', w: 12, h: 5, left: 55, top: 130, deg: -28 },
  { color: 'var(--color-gold)', shape: 'circle', w: 7, h: 7, left: 350, top: 115, deg: 0 },
  { color: 'var(--color-primary)', shape: 'rect', w: 5, h: 12, left: 170, top: 165, deg: 22 },
  { color: 'var(--color-gold)', shape: 'rect', w: 9, h: 9, left: 255, top: 175, deg: -40 },
  { color: 'var(--color-xp)', shape: 'circle', w: 6, h: 6, left: 370, top: 95, deg: 0 },
  { color: 'var(--color-gold)', shape: 'rect', w: 10, h: 4, left: 75, top: 68, deg: 55 },
  { color: 'var(--color-secondary)', shape: 'rect', w: 8, h: 8, left: 230, top: 145, deg: 12 },
  { color: 'var(--color-primary)', shape: 'rect', w: 10, h: 5, left: 18, top: 168, deg: -25 },
  { color: 'var(--color-gold)', shape: 'circle', w: 7, h: 7, left: 318, top: 150, deg: 0 },
  { color: 'var(--color-xp)', shape: 'rect', w: 6, h: 12, left: 185, top: 90, deg: 32 },
]

export default function PrimeraCompletada() {
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: '390px',
        margin: '0 auto',
        backgroundColor: 'oklch(13% 0.040 50)',
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
        {/* Icono llama */}
        <div style={{ width: 100, height: 100, borderRadius: '9999px', backgroundColor: '#2D1D14', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: 28 }}>
          <svg width="52" height="52" viewBox="0 0 24 24">
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c.24 0 .49-.04.71-.12.42-.15.79-.42 1.08-.78.3-.35.5-.77.57-1.22.07-.45 0-.91-.19-1.32-.29-.6-.82-1.05-1.48-1.22A3.5 3.5 0 0 1 9 9.5c0-.63.17-1.24.48-1.76C10 6.98 10.7 6.55 11.5 6.5c-.5 1 0 2.5 1 3.5 1 1 1 2 1 3a4 4 0 0 1-4 4z" fill="var(--color-gold)" stroke="oklch(70% 0.140 75)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 2c0 3 2 5.5 2 8.5a4 4 0 0 1-8 0c0-1 .5-2 1-3-1 2 1 4 3 4-1-2-1-4 2-7.5z" fill="var(--color-gold)" stroke="oklch(70% 0.140 75)" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 36, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '42px', textAlign: 'center', margin: '0 0 12px 0' }}>
          ¡Lo hiciste!
        </h1>

        <p style={{ color: '#FFFFFFB3', fontFamily: 'var(--font-sans)', fontSize: 17, lineHeight: '26px', textAlign: 'center', margin: '0 0 28px 0' }}>
          Has conocido a 3 personas nuevas.<br />Eso no tiene precio.
        </p>

        <div style={{ width: 48, height: 2, backgroundColor: '#FFFFFF26', borderRadius: '9999px', marginBottom: 28, flexShrink: 0 }} />

        {/* Stats */}
        <div style={{ display: 'flex', width: '100%', marginBottom: 28 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8, borderRight: '1px solid #FFFFFF1F' }}>
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>+25</span>
            <span style={{ color: '#FFFFFF80', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Pts ganados</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8, borderRight: '1px solid #FFFFFF1F' }}>
            <span style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>3</span>
            <span style={{ color: '#FFFFFF80', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Conocidas</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingInline: 8 }}>
            <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: '34px', textAlign: 'center' }}>1</span>
            <span style={{ color: '#FFFFFF80', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', lineHeight: '16px', textAlign: 'center', textTransform: 'uppercase' }}>Medalla</span>
          </div>
        </div>

        {/* Medalla card */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, backgroundColor: '#FFFFFF0F', borderRadius: 16, padding: '14px 20px', width: '100%' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '9999px', flexShrink: 0,
            background: 'radial-gradient(circle farthest-corner at 35% 35% in oklab, oklab(88% 0 0.160) 0%, oklab(68% 0.024 0.138) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'oklch(78% 0.160 85 / 40%) 0px 2px 8px',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="6" fill="none" stroke="oklch(30% 0.090 80)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" fill="none" stroke="oklch(30% 0.090 80)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 700, lineHeight: '18px' }}>Primera sesión</span>
            <span style={{ color: '#FFFFFF80', fontFamily: 'var(--font-sans)', fontSize: 12, lineHeight: '16px' }}>Medalla desbloqueada</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ flexShrink: 0, borderTop: '1px solid #FFFFFF14', backgroundColor: 'oklch(13% 0.040 50)', paddingInline: 24, paddingTop: 16, paddingBottom: 'max(36px, env(safe-area-inset-bottom))', position: 'relative' }}>
        <button
          onClick={() => navigate('/home')}
          style={{ width: '100%', height: 52, borderRadius: '9999px', backgroundColor: 'var(--color-primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '#F96F1673 0px 4px 14px', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}
        >
          Ver mis logros
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
