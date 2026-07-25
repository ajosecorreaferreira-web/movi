interface MapStaticProps {
  activePin: string | null
  onPinTap: (id: string) => void
  collapsed: boolean
}

export function MapStatic({ activePin, onPinTap, collapsed }: MapStaticProps) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: collapsed ? '120px' : '240px',
      transition: 'height 300ms ease',
      overflow: 'hidden',
      backgroundColor: '#F0EDE6',
      transform: 'translate3d(0,0,0)',
      WebkitTransform: 'translate3d(0,0,0)',
    }}>
      {/* Mapa base — SVG del Pinar de Las Rozas */}
      <svg
        viewBox="0 0 390 240"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="390" height="240" fill="#F0EDE6" />
        <ellipse cx="160" cy="120" rx="155" ry="115" fill="#D4E6C3" />
        <path d="M 30 80 Q 100 100 160 90 Q 200 85 220 120" stroke="#C8B89A" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M 60 160 Q 120 140 170 150 Q 210 155 230 130" stroke="#C8B89A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <rect x="100" y="130" width="55" height="40" rx="4" fill="#E8D4B0" />
        <rect x="108" y="138" width="8" height="12" rx="2" fill="#C8A87A" />
        <rect x="122" y="138" width="8" height="12" rx="2" fill="#C8A87A" />
        <rect x="136" y="138" width="8" height="12" rx="2" fill="#C8A87A" />
        <rect x="285" y="0" width="45" height="240" fill="#FFFFFF" />
        <rect x="285" y="0" width="1.5" height="240" fill="#E0D8CC" />
        <rect x="329" y="0" width="1.5" height="240" fill="#E0D8CC" />
        <rect x="330" y="0" width="60" height="240" fill="#EDE8E0" />
        <text x="127" y="183" fontSize="9" fill="#8B7355" textAnchor="middle" fontFamily="system-ui">Zona calistenia</text>
      </svg>

      {/* Indicador de posición del usuario */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        pointerEvents: 'none',
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#3B82F6',
          border: '2px solid white',
          boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
        }} />
      </div>

      {/* Círculo 1 — Carlos entrenando ahora */}
      <div
        onClick={() => onPinTap('1')}
        style={{
          position: 'absolute',
          top: '58%',
          left: '35%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid white',
        }}
      >
        <span style={{ fontSize: '16px' }}>🏃</span>
      </div>

      {/* Círculo 2 — Ana + 2 personas */}
      <div
        onClick={() => onPinTap('2')}
        style={{
          position: 'absolute',
          top: '35%',
          left: '55%',
          transform: 'translate(-50%, -50%)',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2.5px solid var(--color-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        A+2
      </div>

      {/* Círculo 3 — Grupo 5 */}
      <div
        onClick={() => onPinTap('3')}
        style={{
          position: 'absolute',
          top: '22%',
          left: '22%',
          transform: 'translate(-50%, -50%)',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '2px solid var(--color-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '10px',
          fontWeight: 700,
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        5
      </div>

      {/* Tooltip activo */}
      {activePin && (() => {
        const positions: Record<string, { top: string; left: string }> = {
          '1': { top: '35%', left: '35%' },
          '2': { top: '18%', left: '55%' },
          '3': { top: '8%', left: '22%' },
        }
        const labels: Record<string, string> = {
          '1': 'Carlos · Ahora · 0.3km',
          '2': 'Ana+2 · 8:00am · 0.5km',
          '3': 'Grupo 5 · 11:00 · 0.8km',
        }
        const pos = positions[activePin]
        return (
          <div style={{
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            transform: 'translate(-50%, -110%)',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '6px 10px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            fontSize: '12px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            zIndex: 20,
            pointerEvents: 'none',
            fontFamily: 'var(--font-sans)',
          }}>
            {labels[activePin]}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid white',
            }} />
          </div>
        )
      })()}
    </div>
  )
}
