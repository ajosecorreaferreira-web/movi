import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgramStore } from '@/stores/programStore'
import { useHaptics } from '@/hooks/useHaptics'

/* Confetti idéntico al de Paper */
const CONFETTI = [
  { style: { backgroundColor: 'var(--color-primary)',   borderRadius: '2px',                width: 10, height: 10, left:  40, top:  80, rotate: '25deg'  } },
  { style: { backgroundColor: 'var(--color-gold)',      borderRadius: 'var(--radius-full)',  width:  8, height:  8, left:  80, top: 120, rotate: '0deg'   } },
  { style: { backgroundColor: 'var(--color-xp)',        borderRadius: '2px',                width: 12, height:  6, left: 160, top:  60, rotate: '-15deg' } },
  { style: { backgroundColor: 'var(--color-secondary)', borderRadius: 'var(--radius-full)',  width:  8, height:  8, left: 260, top: 100, rotate: '0deg'   } },
  { style: { backgroundColor: 'var(--color-primary)',   borderRadius: '2px',                width: 10, height: 10, right: 40, top:  70, rotate: '-30deg' } },
  { style: { backgroundColor: 'var(--color-gold)',      borderRadius: '2px',                width:  6, height: 12, right: 70, top: 140, rotate: '20deg'  } },
  { style: { backgroundColor: 'var(--color-xp)',        borderRadius: '2px',                width: 10, height: 10, left: 220, top:  50, rotate: '45deg'  } },
  { style: { backgroundColor: 'var(--color-primary)',   borderRadius: 'var(--radius-full)',  width:  8, height:  8, left:  30, bottom: 180, rotate: '0deg'  } },
  { style: { backgroundColor: 'var(--color-gold)',      borderRadius: '2px',                width: 12, height:  6, right: 50, bottom: 220, rotate: '35deg' } },
] as const

export default function ProgramStart() {
  const navigate = useNavigate()
  const { program } = useProgramStore()
  const { haptic } = useHaptics()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    haptic('success')
    const timer = setTimeout(() => setShowButton(true), 500)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nextSession = program?.sessions.find(
    (s) => s.status === 'today' || s.status === 'upcoming'
  )

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'oklch(13% 0.040 50)',
        display: 'flex',
        flexDirection: 'column',
        colorScheme: 'dark',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Confetti — absoluto, pointer-events none */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'clip',
          pointerEvents: 'none',
        }}
      >
        {CONFETTI.map((c, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...c.style,
              transform: `rotate(${c.style.rotate})`,
              transformOrigin: '0% 0%',
              opacity: 0.9,
            }}
          />
        ))}
      </div>

      {/* Contenido principal — centrado verticalmente */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          paddingTop: 'max(40px, env(safe-area-inset-top))',
          paddingInline: 24,
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Icono calendario — fondo gold semitransparente con borde, igual que Paper */}
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'oklch(78% 0.160 85 / 15%)',
            border: '1px solid oklch(78% 0.160 85 / 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 24,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 48,
              lineHeight: '100%',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            📅
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 36,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
            letterSpacing: '-0.03em',
            lineHeight: '44px',
            marginBottom: 16,
            whiteSpace: 'pre-wrap',
          }}
        >
          {'¡Programa\nactivado!'}
        </h1>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            lineHeight: '26px',
            marginBottom: 32,
            whiteSpace: 'pre-wrap',
          }}
        >
          {`3 semanas · 6 sesiones${program?.partnerName ? `\ncon ${program.partnerName} en el Pinar` : ''}`}
        </p>

        {/* Separador */}
        <div
          style={{
            width: '100%',
            height: 1,
            backgroundColor: 'rgba(255,255,255,0.2)',
            marginBottom: 24,
            flexShrink: 0,
          }}
        />

        {/* Próxima sesión */}
        {nextSession && (
          <>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: '16px',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Próxima sesión:
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: '24px',
                }}
              >
                {nextSession.date} · {nextSession.time}
              </span>

              {/* Pill "En 2 días" */}
              <div
                style={{
                  backgroundColor: 'var(--color-primary)',
                  borderRadius: 'var(--radius-full)',
                  paddingBlock: 4,
                  paddingInline: 10,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'white',
                    lineHeight: '16px',
                  }}
                >
                  En 2 días
                </span>
              </div>
            </div>
          </>
        )}

        {/* Aviso notificaciones */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 'var(--radius-full)',
            paddingBlock: 8,
            paddingInline: 16,
            marginBottom: 40,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: '16px',
              display: 'block',
              textAlign: 'center',
            }}
          >
            Te avisamos el día anterior y 30 min antes
          </span>
        </div>
      </div>

      {/* CTA sticky al fondo */}
      <div
        style={{
          paddingInline: 24,
          paddingBottom: 'max(48px, env(safe-area-inset-bottom))',
          paddingTop: 0,
          position: 'relative',
          transition: 'opacity 300ms ease, transform 300ms ease',
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showButton ? 'auto' : 'none',
        }}
      >
        <button
          onClick={() => { haptic('medium'); navigate('/program', { replace: true }) }}
          style={{
            width: '100%',
            height: 58,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20px',
            cursor: 'pointer',
            boxShadow: 'rgba(249,111,22,0.45) 0px 4px 14px',
          }}
        >
          Ver mi programa →
        </button>
      </div>
    </div>
  )
}
