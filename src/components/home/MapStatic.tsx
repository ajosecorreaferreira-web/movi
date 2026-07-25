interface MapStaticProps {
  activePin: string | null
  onPinTap: (id: string) => void
  collapsed: boolean
}

const apiKey = import.meta.env.VITE_STADIA_API_KEY
const MAP_URL = apiKey
  ? `https://tiles.stadiamaps.com/static/alidade_smooth@2x.png?center=-3.8789,40.3485&zoom=16&width=780&height=480&api_key=${apiKey}`
  : null

function getTooltipStyle(pinId: string): React.CSSProperties {
  if (pinId === '3') {
    return {
      position: 'absolute',
      top: '28%',
      left: '22%',
      transform: 'translate(-50%, 8px)',
    }
  }
  if (pinId === '2') {
    return {
      position: 'absolute',
      top: '18%',
      left: '55%',
      transform: 'translate(-50%, -110%)',
    }
  }
  return {
    position: 'absolute',
    top: '35%',
    left: '35%',
    transform: 'translate(-50%, -110%)',
  }
}

const LABELS: Record<string, string> = {
  '1': 'Carlos · Ahora · 0.3km',
  '2': 'Ana+2 · 8:00am · 0.5km',
  '3': 'Grupo 5 · 11:00 · 0.8km',
}

export function MapStatic({ activePin, onPinTap, collapsed }: MapStaticProps) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: collapsed ? '120px' : '240px',
      transition: 'height 300ms ease',
      overflow: activePin ? 'visible' : 'hidden',
      zIndex: activePin ? 40 : 1,
      transform: 'translate3d(0,0,0)',
      WebkitTransform: 'translate3d(0,0,0)',
    }}>
      {/* Mapa + círculos dentro del clip */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        backgroundColor: '#F0EDE6',
      }}>
        {MAP_URL ? (
          <img
            src={MAP_URL}
            alt="Pinar de Las Rozas"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        ) : (
          <svg
            viewBox="0 0 390 240"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid slice"
          >
            <rect width="390" height="240" fill="#F0EDE6"/>
            <ellipse cx="170" cy="125" rx="165" ry="120" fill="#D4E6C3"/>
            <ellipse cx="170" cy="125" rx="145" ry="100" fill="#CBE0B8" opacity="0.5"/>
            <circle cx="80" cy="80" r="18" fill="#B8D4A0" opacity="0.6"/>
            <circle cx="130" cy="60" r="14" fill="#B8D4A0" opacity="0.5"/>
            <circle cx="60" cy="140" r="16" fill="#B8D4A0" opacity="0.5"/>
            <circle cx="200" cy="55" r="12" fill="#B8D4A0" opacity="0.4"/>
            <circle cx="240" cy="100" r="20" fill="#B8D4A0" opacity="0.5"/>
            <circle cx="100" cy="170" r="15" fill="#B8D4A0" opacity="0.5"/>
            <circle cx="170" cy="190" r="18" fill="#B8D4A0" opacity="0.4"/>
            <path d="M 20 160 Q 80 140 140 150 Q 190 158 230 140 Q 270 125 300 130" stroke="#C8B89A" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8"/>
            <path d="M 50 90 Q 110 100 160 90 Q 200 82 240 70" stroke="#C8B89A" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6"/>
            <rect x="105" y="138" width="58" height="38" rx="6" fill="#E8D4B0"/>
            <rect x="113" y="146" width="7" height="10" rx="2" fill="#C8A87A"/>
            <rect x="125" y="146" width="7" height="10" rx="2" fill="#C8A87A"/>
            <rect x="137" y="146" width="7" height="10" rx="2" fill="#C8A87A"/>
            <rect x="149" y="146" width="7" height="10" rx="2" fill="#C8A87A"/>
            <text x="134" y="187" fontSize="8" fill="#8B7355" textAnchor="middle" fontFamily="system-ui, sans-serif" opacity="0.8">Zona calistenia</text>
            <rect x="298" y="0" width="92" height="240" fill="#EDE8E0"/>
            <rect x="298" y="0" width="2" height="240" fill="#E0D8CC" opacity="0.8"/>
            <rect x="310" y="0" width="35" height="240" fill="white" opacity="0.9"/>
            <rect x="309" y="0" width="1.5" height="240" fill="#E0D8CC"/>
            <rect x="345" y="0" width="1.5" height="240" fill="#E0D8CC"/>
            <line x1="327" y1="0" x2="327" y2="240" stroke="#E8E0D0" strokeWidth="1" strokeDasharray="8,8"/>
          </svg>
        )}

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
      </div>

      {/* Tooltip — fuera del clip, zIndex alto */}
      {activePin && (
        <div
          style={{
            ...getTooltipStyle(activePin),
            zIndex: 100,
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '6px 10px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            fontSize: '12px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {LABELS[activePin]}
          <div style={{
            position: 'absolute',
            bottom: activePin === '3' ? 'auto' : '-6px',
            top: activePin === '3' ? '-6px' : 'auto',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            ...(activePin === '3'
              ? { borderBottom: '6px solid white' }
              : { borderTop: '6px solid white' }),
          }} />
        </div>
      )}
    </div>
  )
}
