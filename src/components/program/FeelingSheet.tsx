import { Sheet } from 'react-modal-sheet'
import { useHaptics } from '@/hooks/useHaptics'

interface FeelingSheetProps {
  isOpen: boolean
  onClose: () => void
  sessionInfo: {
    partnerName: string
    workoutName: string
    location: string
  }
  onAnswer: (feeling: 'great' | 'ok' | 'notforme') => void
}

const OPTIONS = [
  { id: 'great'    as const, emoji: '😊', label: 'Muy bien, repetiría' },
  { id: 'ok'       as const, emoji: '🤷', label: 'Bien pero sin más'   },
  { id: 'notforme' as const, emoji: '😐', label: 'No era lo mío'       },
] as const

export function FeelingSheet({
  isOpen,
  onClose,
  sessionInfo,
  onAnswer,
}: FeelingSheetProps) {
  const { haptic } = useHaptics()

  return (
    <Sheet isOpen={isOpen} onClose={onClose} snapPoints={[380]} initialSnap={0}>
      <Sheet.Container
        style={{
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
        }}
      >
        <Sheet.Header />
        <Sheet.Content>
          <div
            style={{
              padding: '0 24px',
              paddingBottom: 'max(32px, env(safe-area-inset-bottom))',
            }}
          >
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
              ¿Qué tal con el grupo?
            </h2>

            {/* Info sesión */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 20,
              }}
            >
              {/* Avatar circular naranja — igual que Paper */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: '16px',
                  }}
                >
                  {sessionInfo.partnerName.charAt(0).toUpperCase()}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'var(--color-text-muted)',
                  lineHeight: '16px',
                }}
              >
                {sessionInfo.partnerName} y 2 personas · {sessionInfo.workoutName} ·{' '}
                {sessionInfo.location}
              </span>
            </div>

            {/* Cards de respuesta */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                marginBottom: 16,
              }}
            >
              {OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    haptic('medium')
                    onAnswer(opt.id)
                  }}
                  style={{
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '0 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--color-text)',
                    textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <span style={{ fontSize: 20, lineHeight: '24px', fontFamily: 'system-ui, sans-serif' }}>
                    {opt.emoji}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Footer hint */}
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                color: 'var(--color-text-subtle)',
                lineHeight: '16px',
              }}
            >
              Solo tarda 2 segundos
            </p>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop onTap={onClose} />
    </Sheet>
  )
}
