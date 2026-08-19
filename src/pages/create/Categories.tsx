import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { id: 'hiit', name: 'HIIT', emoji: '🔥' },
  { id: 'hibrido', name: 'Híbrido', emoji: '⚡' },
  { id: 'fuerza', name: 'Fuerza', emoji: '💪' },
  { id: 'gimnastico', name: 'Gimnástico', emoji: '🤸' },
  { id: 'funcional', name: 'Funcional', emoji: '🏋️' },
  { id: 'yoga', name: 'Yoga', emoji: '🧘' },
  { id: 'pilates', name: 'Pilates', emoji: '🎯' },
  { id: 'natacion', name: 'Natación', emoji: '🏊' },
]

export default function Categories() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelected(id)
    navigate(`/create/workouts/${id}`)
  }

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
          zIndex: 30,
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
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600,
            color: 'var(--color-text)', lineHeight: '20px',
          }}
        >
          Tipo de entrenamiento
        </span>
        <div style={{ width: 44, height: 44, flexShrink: 0 }} />
      </header>

      {/* Subtítulo */}
      <div style={{ padding: '20px 24px 4px' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--color-text-muted)', lineHeight: '20px', margin: 0 }}>
          ¿Qué quieres hacer hoy?
        </p>
      </div>

      {/* Grid categorías */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '16px',
          width: '100%',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        }}
      >
        {CATEGORIES.map(({ id, name, emoji }) => {
          const isSelected = selected === id
          return (
            <button
              key={id}
              onClick={() => handleSelect(id)}
              style={{
                width: '100%', height: 120,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 8,
                borderRadius: 'var(--radius-md)',
                backgroundColor: isSelected ? 'var(--color-primary-50)' : 'var(--color-surface)',
                border: isSelected ? '2px solid var(--color-primary)' : '2px solid transparent',
                boxShadow: 'var(--color-shadow-xs) 0px 1px 4px',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              <span style={{ fontSize: 36, lineHeight: 1 }}>{emoji}</span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, lineHeight: '18px',
                  color: isSelected ? 'var(--color-primary)' : 'var(--color-text)',
                }}
              >
                {name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
