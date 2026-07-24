import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function SessionDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <div
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--color-background)',
        maxWidth: '390px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          height: 56,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          paddingInline: 16,
          gap: 12,
          paddingTop: 'max(0px, env(safe-area-inset-top))',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--color-surface-2)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} color="var(--color-text)" />
        </button>
        <span
          className="text-[17px] font-bold tracking-[-0.02em]"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
        >
          Detalle de sesión
        </span>
      </header>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: 24,
        }}
      >
        <span
          className="text-[15px]"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}
        >
          Sesión #{id} — próximamente
        </span>
      </div>
    </div>
  )
}
