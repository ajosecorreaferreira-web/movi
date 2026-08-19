import { useNavigate } from 'react-router-dom'
import { useHaptics } from '@/hooks/useHaptics'

const ADVANTAGES = [
  { emoji: '👥', text: 'Tú eliges el grupo', highlight: false },
  { emoji: '🕗', text: 'Tú decides el horario', highlight: false },
  { emoji: '🏆', text: '+50 puntos extra', highlight: false },
  { emoji: '⭐', text: 'Acceso premium 1 mes', highlight: true },
]

export default function ProposeSession() {
  const navigate = useNavigate()
  const { haptic } = useHaptics()

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'var(--color-overlay-modal)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        colorScheme: 'light',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: '20px 20px 0 0',
          padding: '12px 24px',
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

        {/* Título */}
        <h2
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--color-text)',
            lineHeight: '28px',
            marginBottom: 8,
          }}
        >
          Normal. No todos los grupos
          <br />
          conectan a la primera.
        </h2>

        {/* Subtítulo */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            color: 'var(--color-text-muted)',
            lineHeight: '22px',
            marginBottom: 20,
          }}
        >
          ¿Y si organizas tú la próxima?
        </p>

        {/* Card ventajas */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-50)',
            border: '1px solid var(--color-primary-200)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: 20,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 700,
              color: 'var(--color-primary)',
              marginBottom: 12,
            }}
          >
            ✨ Ventajas de organizar
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ADVANTAGES.map((adv) => (
              <div
                key={adv.text}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  height: 36,
                  borderRadius: adv.highlight ? 6 : 0,
                  backgroundColor: adv.highlight ? 'var(--color-primary-100)' : 'transparent',
                  marginInline: adv.highlight ? -8 : 0,
                  paddingInline: adv.highlight ? 8 : 0,
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>{adv.emoji}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    fontWeight: adv.highlight ? 700 : 400,
                    color: adv.highlight ? 'var(--color-primary)' : 'var(--color-text)',
                    lineHeight: '18px',
                  }}
                >
                  {adv.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <div
          style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 16 }}
        />

        {/* Link secundario */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--color-text-muted)',
              marginBottom: 4,
            }}
          >
            O si prefieres:
          </p>
          <button
            onClick={() => navigate('/home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-primary)',
            }}
          >
            Buscar otro grupo →
          </button>
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            haptic('medium')
            navigate('/create')
          }}
          style={{
            width: '100%',
            height: 52,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--shadow-primary)',
          }}
        >
          Proponer mi sesión →
        </button>
      </div>
    </div>
  )
}
