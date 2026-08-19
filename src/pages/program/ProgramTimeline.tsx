import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { useProgramStore, type ProgramSession } from '@/stores/programStore'

const WEEK_LABELS = ['SEMANA 1', 'SEMANA 2', 'SEMANA 3']

export default function ProgramTimeline() {
  const navigate = useNavigate()
  const { program } = useProgramStore()

  if (!program) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-sans)',
          backgroundColor: 'var(--color-background)',
        }}
      >
        <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>
          No tienes un programa activo.
        </p>
      </div>
    )
  }

  /* Agrupar en 3 semanas de 2 sesiones */
  const sessionsByWeek: ProgramSession[][] = [
    program.sessions.slice(0, 2),
    program.sessions.slice(2, 4),
    program.sessions.slice(4, 6),
  ]

  const progressPercent = (program.completedSessions / 6) * 100

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'var(--color-background)',
        display: 'flex',
        flexDirection: 'column',
        colorScheme: 'light',
      }}
    >
      {/* Header sticky */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          height: 56,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 8,
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          transform: 'translate3d(0,0,0)',
          flexShrink: 0,
        }}
      >
        {/* Botón volver */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} color="var(--color-text)" />
        </button>

        {/* Título centrado — flex-grow para empujar a los extremos */}
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            fontWeight: 700,
            color: 'var(--color-text)',
            flex: 1,
            textAlign: 'center',
            lineHeight: '22px',
          }}
        >
          Mi programa
        </span>

        {/* Pill semana */}
        <div
          style={{
            backgroundColor: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-full)',
            paddingBlock: 4,
            paddingInline: 10,
            marginRight: 8,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              lineHeight: '16px',
            }}
          >
            Sem {program.currentWeek}/3
          </span>
        </div>
      </header>

      {/* Subtítulo de contexto */}
      <div
        style={{
          paddingInline: 16,
          paddingTop: 12,
          paddingBottom: 12,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: 'var(--color-text-muted)',
            lineHeight: '16px',
          }}
        >
          {program.partnerName ? `Con ${program.partnerName}` : 'Solo'} · Funcional · Pinar
        </span>
      </div>

      {/* Timeline scrollable */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          paddingInline: 16,
          paddingTop: 4,
          paddingBottom: 16,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {sessionsByWeek.map((weekSessions, weekIdx) => (
          <div key={weekIdx} style={{ marginBottom: 8 }}>
            {/* Etiqueta SEMANA X */}
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                fontWeight: 700,
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 8,
                marginTop: 16,
                lineHeight: '14px',
              }}
            >
              {WEEK_LABELS[weekIdx]}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {weekSessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onNavigate={() => navigate(`/create/workout-detail/${session.workoutId}`)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Footer gamificación — como en Paper: fijo al fondo de la pantalla con borde top */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: 16,
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderTop: '1px solid var(--color-border)',
              paddingBlock: 14,
              paddingInline: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              borderRadius: 'var(--radius-md)',
            }}
          >
            {/* Texto trofeo */}
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--color-primary-text)',
                lineHeight: '16px',
                textAlign: 'center',
              }}
            >
              🏆 Completa el programa: medalla + 200 puntos
            </p>

            {/* Barra de progreso */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    color: 'var(--color-text-muted)',
                    lineHeight: '16px',
                  }}
                >
                  Progreso
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    lineHeight: '16px',
                  }}
                >
                  {program.completedSessions} / 6
                </span>
              </div>

              {/* Track */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface-3)',
                  borderRadius: 'var(--radius-full)',
                  height: 6,
                  overflow: 'clip',
                  width: '100%',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progressPercent}%`,
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: 'var(--radius-full)',
                    transition: 'width 600ms ease',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---- SessionCard local ---- */
function SessionCard({
  session,
  onNavigate,
}: {
  session: ProgramSession
  onNavigate: () => void
}) {
  const isCompleted = session.status === 'completed'
  const isToday     = session.status === 'today'
  const isUpcoming  = session.status === 'upcoming'

  /* Colores exactos de Paper */
  const bgColor     = isCompleted ? 'var(--color-success-subtle)' : 'var(--color-surface)'
  const borderLeft  = isCompleted
    ? '6px solid var(--color-success)'
    : isToday
    ? '6px solid var(--color-primary)'
    : 'none'
  const borderBox   = isUpcoming ? '1px solid var(--color-border)' : undefined
  const boxShadow   = isToday ? 'var(--color-shadow-xs) 0px 1px 3px' : undefined

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: 'var(--radius-md)',
        borderLeft,
        border: isUpcoming ? borderBox : undefined,
        boxShadow,
        paddingBlock: 12,
        paddingInline: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: isToday ? 6 : 4,
      }}
    >
      {/* Fila superior: fecha + badge "Hoy" */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            color: isCompleted
              ? 'var(--color-success-text)'
              : isUpcoming
              ? 'var(--color-text-subtle)'
              : 'var(--color-text)',
            lineHeight: '18px',
          }}
        >
          {isCompleted && '✅ '}
          {isToday && '📍 '}
          {session.date} · {session.time}
          {isCompleted && ' · Hecho'}
        </span>

        {isToday && (
          <div
            style={{
              backgroundColor: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              paddingBlock: 3,
              paddingInline: 10,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--color-primary-foreground)',
                lineHeight: '16px',
              }}
            >
              Hoy
            </span>
          </div>
        )}
      </div>

      {/* Nombre del workout */}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: isUpcoming ? 'var(--color-text-subtle)' : 'var(--color-text-muted)',
          lineHeight: '16px',
          paddingLeft: (isCompleted || isToday) ? 24 : 0,
        }}
      >
        {session.workoutName}
      </span>

      {/* CTA "Ver entrenamiento" solo para sesión de hoy */}
      {isToday && (
        <button
          onClick={onNavigate}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-primary)',
            lineHeight: '16px',
            textAlign: 'left',
            minHeight: 44,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Ver entrenamiento →
        </button>
      )}
    </div>
  )
}
