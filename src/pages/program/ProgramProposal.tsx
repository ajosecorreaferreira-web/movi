import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useProgramStore } from '@/stores/programStore'
import { useHaptics } from '@/hooks/useHaptics'

const TIME_OPTIONS = [
  { id: 'Mañanas',          emoji: '🌅', label: 'Mañanas'         },
  { id: 'Tardes',           emoji: '🌆', label: 'Tardes'          },
  { id: 'Fines de semana',  emoji: '📅', label: 'Fines de semana' },
] as const

const PROGRAM_DETAILS_GROUP = [
  { emoji: '📅', text: 'Martes · 8:00am'      },
  { emoji: '📅', text: 'Jueves · 8:00am'      },
  { emoji: '📍', text: 'Pinar de Las Rozas'   },
  { emoji: '🏋️', text: 'Funcional · Nivel 2' },
  { emoji: '👥', text: 'Tú + Ana'             },
]

export default function ProgramProposal() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const type = searchParams.get('type') ?? 'group'
  const { createProgramWithPartner, createSoloProgram } = useProgramStore()
  const { haptic } = useHaptics()
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const isGroup = type === 'group'
  const canStart = isGroup || selectedTime !== null

  const handleStart = () => {
    if (!canStart) return
    haptic('medium')
    if (isGroup) {
      createProgramWithPartner('Ana')
    } else {
      createSoloProgram(selectedTime ?? 'Mañanas')
    }
    navigate('/celebration/program-start', { replace: true })
  }

  return (
    /* Overlay oscuro — fondo simulado como en Paper */
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'var(--color-overlay-warm)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        colorScheme: 'light',
      }}
    >
      {/* Sheet container */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          paddingTop: 12,
          paddingInline: 20,
          paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'var(--color-border)',
            margin: '0 auto 20px',
          }}
        />

        {isGroup ? (
          /* ---- VARIANTE GRUPO ---- */
          <>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: '28px',
                marginBottom: 6,
              }}
            >
              🎉 ¡Ana quiere repetir contigo!
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-text-muted)',
                lineHeight: '16px',
                marginBottom: 14,
              }}
            >
              Tu programa de 3 semanas:
            </p>

            {/* Card programa — fondo primary-50, borde primary-200, idéntico a Paper */}
            <div
              style={{
                backgroundColor: 'var(--color-primary-50)',
                border: '1px solid var(--color-primary-200)',
                borderRadius: 'var(--radius-md)',
                padding: 16,
                marginBottom: 12,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {PROGRAM_DETAILS_GROUP.map((item) => (
                <div
                  key={item.text}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      lineHeight: '20px',
                      fontFamily: 'system-ui, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {item.emoji}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 13,
                      color: 'var(--color-text)',
                      lineHeight: '16px',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontStyle: 'italic',
                color: 'var(--color-text-muted)',
                lineHeight: '20px',
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              La IA ya eligió los entrenamientos. Tú solo tienes que aparecer.
            </p>
          </>
        ) : (
          /* ---- VARIANTE SOLO ---- */
          <>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 20,
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: '28px',
                marginBottom: 12,
              }}
            >
              ¿Quieres un programa para ti?
            </p>

            {/* Badge 3 semanas */}
            <div
              style={{
                display: 'inline-flex',
                marginBottom: 16,
                alignSelf: 'flex-start',
              }}
            >
              <span
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: 'var(--radius-full)',
                  padding: '6px 14px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  lineHeight: '16px',
                }}
              >
                3 semanas · 2 días/semana
              </span>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--color-text-muted)',
                lineHeight: '16px',
                marginBottom: 12,
              }}
            >
              ¿Cuándo te viene mejor?
            </p>

            {/* Pills de horario — layout fila 1 (2 pills) + fila 2 (1 pill) como en Paper */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 24,
              }}
            >
              {/* Fila 1: Mañanas + Tardes en igual ancho */}
              <div style={{ display: 'flex', gap: 8 }}>
                {TIME_OPTIONS.slice(0, 2).map((opt) => {
                  const selected = selectedTime === opt.id
                  return (
                    <button
                      key={opt.id}
                      onClick={() => { haptic('light'); setSelectedTime(opt.id) }}
                      style={{
                        flex: 1,
                        height: 44,
                        borderRadius: 'var(--radius-full)',
                        border: selected
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                        backgroundColor: selected
                          ? 'var(--color-primary-50)'
                          : 'var(--color-surface)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        fontWeight: selected ? 600 : 500,
                        color: selected ? 'var(--color-primary)' : 'var(--color-text)',
                      }}
                    >
                      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 16 }}>
                        {opt.emoji}
                      </span>
                      {opt.label}
                    </button>
                  )
                })}
              </div>
              {/* Fila 2: Fines de semana solo */}
              <div>
                {(() => {
                  const opt = TIME_OPTIONS[2]
                  const selected = selectedTime === opt.id
                  return (
                    <button
                      onClick={() => { haptic('light'); setSelectedTime(opt.id) }}
                      style={{
                        height: 44,
                        paddingInline: 20,
                        borderRadius: 'var(--radius-full)',
                        border: selected
                          ? '2px solid var(--color-primary)'
                          : '1px solid var(--color-border)',
                        backgroundColor: selected
                          ? 'var(--color-primary-50)'
                          : 'var(--color-surface)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        fontWeight: selected ? 600 : 500,
                        color: selected ? 'var(--color-primary)' : 'var(--color-text)',
                      }}
                    >
                      <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: 16 }}>
                        {opt.emoji}
                      </span>
                      {opt.label}
                    </button>
                  )
                })()}
              </div>
            </div>
          </>
        )}

        {/* CTA principal */}
        <button
          onClick={handleStart}
          disabled={!canStart}
          style={{
            width: '100%',
            height: 52,
            backgroundColor: canStart ? 'var(--color-primary)' : 'var(--color-border)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 600,
            lineHeight: '20px',
            cursor: canStart ? 'pointer' : 'not-allowed',
            marginBottom: isGroup ? 12 : 0,
          }}
        >
          {isGroup ? 'Empezar programa' : 'Crear mi programa'}
        </button>

        {/* Cambiar horario — solo en modo grupo */}
        {isGroup && (
          <button
            onClick={() => haptic('light')}
            style={{
              display: 'block',
              width: '100%',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--color-primary)',
              lineHeight: '16px',
              padding: '8px 0',
            }}
          >
            Cambiar horario
          </button>
        )}
      </div>
    </div>
  )
}
