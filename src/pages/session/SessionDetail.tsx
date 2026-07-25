import { useParams, useNavigate } from 'react-router-dom'
import { useHaptics } from '@/hooks/useHaptics'

const MAPS_URL = 'https://www.google.com/maps/search/Pinar+de+Las+Rozas+Madrid'

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { haptic } = useHaptics()

  const handleApuntarme = () => {
    haptic('medium')
    navigate(`/celebration/first-session?from=${id}`)
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
      {/* Header */}
      <header
        style={{
          height: 56,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 8,
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'none', border: 'none',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          style={{
            flex: 1, color: 'var(--color-text)', fontFamily: 'var(--font-sans)',
            fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: '20px',
          }}
        >
          Funcional avanzado
        </span>
        <button
          aria-label="Más opciones"
          style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'none', border: 'none',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1" fill="var(--color-text)" stroke="var(--color-text)" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="1" fill="var(--color-text)" stroke="var(--color-text)" strokeWidth="1.5" />
            <circle cx="12" cy="19" r="1" fill="var(--color-text)" stroke="var(--color-text)" strokeWidth="1.5" />
          </svg>
        </button>
      </header>

      {/* Organizador */}
      <div style={{ backgroundColor: 'var(--color-surface)', padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div
            style={{
              width: 64, height: 64, borderRadius: '9999px', flexShrink: 0,
              background: 'linear-gradient(135deg in oklab, oklab(75% 0.120 0.134) 0%, oklab(62% 0.129 0.125) 100%)',
              border: '2px solid var(--color-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}
          >
            <span style={{ color: '#fff', fontSize: 24, fontWeight: 700, fontFamily: 'var(--font-sans)', lineHeight: '30px' }}>AG</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 2 }}>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, lineHeight: '20px' }}>
              Ana García
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>
              Organizadora · Nivel 3
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="var(--color-primary)" />
              </svg>
              <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>
                12 sesiones organizadas
              </span>
            </div>
          </div>
        </div>

        {/* Cita */}
        <div style={{ position: 'relative', padding: '12px 16px 8px 20px', borderRadius: 10 }}>
          <span style={{
            position: 'absolute', top: 4, left: 10,
            fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700,
            color: 'var(--color-primary)', opacity: 0.7, lineHeight: '100%',
          }}>"</span>
          <p style={{
            paddingTop: 10, color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)',
            fontSize: 14, fontStyle: 'italic', lineHeight: '22px', textAlign: 'center', margin: 0,
          }}>
            Ven, soy puntual y a divertirse.<br />Puedes seguirme o hacer tu rutina.
          </p>
          <span style={{
            display: 'block', textAlign: 'right', marginTop: 4,
            fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700,
            color: 'var(--color-primary)', opacity: 0.7, lineHeight: '50%',
          }}>"</span>
        </div>
      </div>

      {/* Comunidad + FOMO */}
      <div style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', width: 80, height: 32, flexShrink: 0 }}>
            {[
              { left: 0, bg: '#7474EF', label: 'A', color: '#fff' },
              { left: 20, bg: '#017F31', label: 'M', color: '#fff' },
              { left: 40, bg: '#BD413F', label: 'C', color: '#fff' },
              { left: 60, bg: 'var(--color-surface-2)', label: '+1', color: 'var(--color-text-muted)' },
            ].map((a, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', left: a.left, top: 0,
                  width: 32, height: 32, borderRadius: '9999px',
                  backgroundColor: a.bg, border: '2px solid #fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <span style={{ color: a.color, fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)', lineHeight: '14px' }}>
                  {a.label}
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>
              3 personas apuntadas
            </span>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, lineHeight: '18px' }}>
              también irán esta semana
            </span>
          </div>
        </div>
        <div style={{ backgroundColor: 'var(--color-primary-50)', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '9999px', backgroundColor: 'var(--color-primary)', flexShrink: 0 }} />
          <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>
            Quedan 5 plazas
          </span>
        </div>
      </div>

      {/* Logística */}
      <div style={{ backgroundColor: 'var(--color-surface)', marginTop: 8, display: 'flex', flexDirection: 'column' }}>
        {/* Duración + Intensidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="12 6 12 12 16 14" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>Duración</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>25 min</span>
          </div>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <line x1="18" y1="20" x2="18" y2="10" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="20" x2="12" y2="4" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="6" y1="20" x2="6" y2="14" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>Intensidad</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>Moderado</span>
          </div>
        </div>

        {/* Lugar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="10" r="3" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>Lugar</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>Pinar de Las Rozas</span>
          </div>
          <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, lineHeight: '16px', flexShrink: 0 }}>
            350m de ti
          </span>
        </div>

        {/* Cuándo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="2" x2="8" y2="6" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="10" x2="21" y2="10" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>Cuándo</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>Mañana · 8:00am</span>
          </div>
        </div>

        {/* Cómo llegar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 20l3-15 3 15" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 13h12" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '18px' }}>Cómo llegar</span>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, lineHeight: '20px' }}>15 min andando</span>
          </div>
        </div>

        {/* Mapa preview */}
        <button
          onClick={() => window.open(MAPS_URL, '_blank')}
          aria-label="Ver en mapa"
          style={{
            width: '100%', height: 100, position: 'relative',
            backgroundColor: '#F0EDE6', border: 'none', cursor: 'pointer',
            padding: 0, overflow: 'hidden', display: 'block',
          }}
        >
          <div style={{ position: 'absolute', left: 40, top: 8, width: 200, height: 70, backgroundColor: '#A9D1A0', opacity: 0.7, borderRadius: '40px 60px 50px 45px' }} />
          <div style={{ position: 'absolute', left: 80, top: 20, width: 120, height: 50, backgroundColor: '#78B681', opacity: 0.5, borderRadius: '30px 40px 35px 30px' }} />
          <div style={{ position: 'absolute', left: 0, top: 50, width: '100%', height: 6, backgroundColor: '#C0A994', opacity: 0.6 }} />
          <div style={{
            position: 'absolute', left: 160, top: 20,
            width: 22, height: 22, backgroundColor: 'var(--color-primary)',
            borderRadius: '9999px 9999px 9999px 0',
            transform: 'rotate(-45deg)',
            boxShadow: '#F96F1666 0px 2px 6px',
          }} />
          <div style={{
            position: 'absolute', bottom: 10, right: 16,
            backgroundColor: '#fff', borderRadius: '9999px',
            boxShadow: '#0000001F 0px 1px 4px',
            padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '16px' }}>Ver en mapa</span>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>

      {/* Tarjeta de entrenamiento */}
      <div style={{ backgroundColor: 'var(--color-surface)', marginTop: 8, padding: 20 }}>
        <div style={{
          backgroundColor: 'var(--color-primary-50)',
          borderLeft: '6px solid var(--color-primary)',
          borderRadius: '0 6px 6px 0',
          padding: 16, display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, lineHeight: '22px' }}>
              Funcional avanzado
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Fila 1: Dumbbell + Cross training + Cuerpo completo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M6 5v14M18 5v14" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 9h4M2 15h4" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20 9h2M20 15h2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: '9999px', padding: '3px 10px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <polyline points="17 1 21 5 17 9" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="7 23 3 19 7 15" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>Cross training</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: '9999px', padding: '3px 10px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="5" r="1" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m9 20 3-6 3 6" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m6 8 6 2 6-2" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 10v4" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>Cuerpo completo</span>
              </div>
            </div>
            {/* Fila 2: Backpack + Equip + Clase guiada */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path d="M4 20V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 20V10h6v10" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 6V4h4v2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: '9999px', padding: '3px 10px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M6 5v14M18 5v14" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 9h4M2 15h4" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 9h2M20 15h2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>Equip. básico</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, backgroundColor: '#fff', borderRadius: '9999px', padding: '3px 10px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="9" cy="7" r="4" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600, lineHeight: '18px' }}>Clase guiada</span>
              </div>
            </div>
          </div>

          {/* Estructura */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 4 }}>
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '16px' }}>Calentamiento</span>
            <div style={{ width: 3, height: 3, borderRadius: '9999px', backgroundColor: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '16px' }}>Circuito x2</span>
            <div style={{ width: 3, height: 3, borderRadius: '9999px', backgroundColor: 'var(--color-primary)', flexShrink: 0 }} />
            <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, lineHeight: '16px' }}>Finisher</span>
          </div>

          {/* Ver detalle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--color-primary-100)' }}>
            <span style={{ color: 'var(--color-primary-text)', fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>
              Ver detalle del entrenamiento
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* CTA pegajoso */}
      <div
        style={{
          position: 'sticky', bottom: 0, zIndex: 10,
          backgroundColor: 'var(--color-surface)',
          boxShadow: '#0000000F 0px -4px 12px',
          padding: '12px 20px',
          paddingBottom: 'max(34px, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={handleApuntarme}
          style={{
            width: '100%', height: 52, borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '#F96F1659 0px 4px 14px',
            color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Apuntarme a esta sesión
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
