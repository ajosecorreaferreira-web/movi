interface MapStaticProps {
  activePin: string | null
  onPinTap: (id: string) => void
  collapsed: boolean
}

const MAP_URL =
  'https://tiles.stadiamaps.com/static/alidade_smooth@2x.png?center=-3.8789,40.3485&zoom=16&width=780&height=480'

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
        {/* Overlay sutil */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(240, 237, 230, 0.15)',
          pointerEvents: 'none',
        }} />

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
