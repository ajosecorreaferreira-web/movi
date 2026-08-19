import { useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FilterSheet from './FilterSheet'

interface Workout {
  id: string
  name: string
  duration: number
  level: number
}

const MOCK_WORKOUTS: Workout[] = [
  { id: '1', name: 'Funcional avanzado', duration: 25, level: 3 },
  { id: '2', name: 'HIIT explosivo', duration: 20, level: 4 },
  { id: '3', name: 'Fuerza básica', duration: 30, level: 2 },
  { id: '4', name: 'Yoga matutino', duration: 45, level: 1 },
  { id: '5', name: 'Funcional suave', duration: 20, level: 2 },
  { id: '6', name: 'Core y glúteos', duration: 25, level: 3 },
]

const CATEGORY_NAMES: Record<string, string> = {
  hiit: 'HIIT',
  hibrido: 'Híbrido',
  fuerza: 'Fuerza',
  gimnastico: 'Gimnástico',
  funcional: 'Funcional',
  yoga: 'Yoga',
  pilates: 'Pilates',
  natacion: 'Natación',
}

export interface Filters {
  duracion: string | null
  nivel: string | null
  equipamiento: string | null
  formato: string | null
  ordenar: string
}

function LevelDots({ level }: { level: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 6 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: i < level ? 'var(--color-primary)' : 'var(--color-border)',
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

export default function WorkoutList() {
  const navigate = useNavigate()
  const { category } = useParams<{ category: string }>()
  const categoryName = CATEGORY_NAMES[category ?? ''] ?? category ?? 'Entrenamientos'

  const [search, setSearch] = useState('')
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Filters>({
    duracion: null,
    nivel: null,
    equipamiento: null,
    formato: null,
    ordenar: 'Novedades',
  })

  const activeFilterCount = [activeFilters.duracion, activeFilters.nivel, activeFilters.equipamiento, activeFilters.formato]
    .filter(Boolean).length

  const filtered = useMemo(() => {
    return MOCK_WORKOUTS.filter(w =>
      w.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  return (
  <>
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
          {categoryName}
        </span>
        <div style={{ width: 44, height: 44, flexShrink: 0 }} />
      </header>

      {/* Barra búsqueda + filtros */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 16px',
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}
      >
        {/* Input búsqueda */}
        <div
          style={{
            flex: 1, height: 44, display: 'flex', alignItems: 'center',
            paddingInline: 16, gap: 8,
            borderRadius: '9999px', border: '1.5px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="text"
            placeholder="Buscar entrenamientos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--color-text)',
              lineHeight: '18px',
            }}
          />
        </div>

        {/* Botón Filtros */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFilters(true)}
            style={{
              height: 44, display: 'flex', alignItems: 'center', paddingInline: 16, gap: 6,
              borderRadius: '9999px', border: '1.5px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)', cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <line x1="4" y1="21" x2="4" y2="14" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="4" y1="10" x2="4" y2="3" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="21" x2="12" y2="12" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="12" y1="8" x2="12" y2="3" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="21" x2="20" y2="16" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="20" y1="12" x2="20" y2="3" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="1" y1="14" x2="7" y2="14" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="9" y1="8" x2="15" y2="8" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="17" y1="16" x2="23" y2="16" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--color-text)', lineHeight: '16px' }}>
              Filtros
            </span>
          </button>
          {activeFilterCount > 0 && (
            <div
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: 'var(--color-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: 'var(--color-primary-foreground)', lineHeight: '12px' }}>
                {activeFilterCount}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Grid entrenamientos */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
          padding: '12px 16px',
          paddingBottom: '88px',
          width: '100%',
          flex: 1,
        }}
      >
        {filtered.map(workout => {
          const isSelected = selectedWorkout === workout.id
          return (
          <button
            key={workout.id}
            onClick={() => setSelectedWorkout(isSelected ? null : workout.id)}
            style={{
              width: '100%',
              display: 'flex', flexDirection: 'column',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
              boxShadow: isSelected ? 'var(--shadow-primary)' : 'var(--color-shadow-xs) 0px 1px 4px',
              backgroundColor: 'var(--color-surface)',
              border: isSelected ? '2px solid var(--color-primary)' : '2px solid transparent',
              cursor: 'pointer', textAlign: 'left',
            }}
          >
            {/* Imagen placeholder */}
            <div
              style={{
                width: '100%', height: 90, flexShrink: 0,
                backgroundColor: 'var(--color-surface-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--color-text-muted)', lineHeight: '12px' }}>
                {workout.name}
              </span>
            </div>
            {/* Info */}
            <div style={{ padding: '10px 12px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, color: 'var(--color-text)', lineHeight: '16px', display: 'block' }}>
                {workout.name}
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-text-muted)', lineHeight: '16px', display: 'block', marginTop: 2 }}>
                {workout.duration} min
              </span>
              <LevelDots level={workout.level} />
            </div>
          </button>
          )
        })}
      </div>

      {/* Filter Sheet */}
      <FilterSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={(filters) => {
          setActiveFilters(filters)
          setShowFilters(false)
        }}
        initialFilters={activeFilters}
      />
    </div>

    {/* FAB — fuera del wrapper para que position: fixed funcione correctamente */}
    {selectedWorkout && (
      <div
        style={{
          position: 'fixed',
          bottom: 'max(24px, env(safe-area-inset-bottom))',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'calc(100% - 48px)',
          maxWidth: '342px',
          zIndex: 50,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: '100%',
            height: '52px',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primary-foreground)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-primary)',
          }}
        >
          Guardar selección →
        </button>
      </div>
    )}
  </>
  )
}
