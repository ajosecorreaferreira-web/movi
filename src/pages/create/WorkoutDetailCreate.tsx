import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_WORKOUT_BLOCKS, type WorkoutBlock } from '../workout/workoutData'

interface ExerciseListProps {
  block: WorkoutBlock
}

function ExerciseListView({ block }: ExerciseListProps) {
  return (
    <div>
      {block.exercises.map((ex, i) => (
        <div
          key={i}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '14px 16px',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              width: 60, height: 60, flexShrink: 0, borderRadius: 8,
              backgroundColor: 'var(--color-border)',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--color-text)', lineHeight: '18px' }}>
              {ex.name}
            </span>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: '16px', marginTop: 2 }}>
              {ex.reps !== null ? `x${ex.reps} repeticiones` : ex.duration}
            </span>
            <div style={{ display: 'inline-flex', marginTop: 4 }}>
              <div style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '9999px', backgroundColor: 'var(--color-surface-2)' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 600, color: 'var(--color-text-muted)', lineHeight: '14px' }}>
                  Nivel {block.id === 'warmup' ? (i < 2 ? 2 : 1) : block.rounds}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ExerciseTimelineView({ block }: ExerciseListProps) {
  return (
    <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {block.exercises.map((ex, i) => (
        <div
          key={i}
          style={{
            borderRadius: 'var(--radius-md)', overflow: 'hidden',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              width: '100%', height: 160, backgroundColor: '#1A1A1A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <polygon points="5 3 19 12 5 21 5 3" fill="#fff" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div
              style={{
                position: 'absolute', bottom: 8, right: 8,
                backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 4,
                padding: '2px 6px',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#fff', fontWeight: 600 }}>15s</span>
            </div>
          </div>
          <div style={{ padding: '10px 12px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--color-text)', lineHeight: '18px' }}>
              {ex.name}
            </span>
            <br />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: '16px' }}>
              {ex.reps !== null ? `x${ex.reps} repeticiones` : ex.duration}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function WorkoutDetailCreate() {
  const navigate = useNavigate()
  const [activeBlock, setActiveBlock] = useState('warmup')
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set(['warmup']))
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list')
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const toggleBlock = (id: string) => {
    setExpandedBlocks(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    MOCK_WORKOUT_BLOCKS.forEach(block => {
      const el = blockRefs.current[block.id]
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveBlock(block.id)
        },
        { threshold: 0.5 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollToBlock = (id: string) => {
    blockRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveBlock(id)
    setExpandedBlocks(prev => new Set([...prev, id]))
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        maxWidth: '390px',
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
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          style={{
            flex: 1, textAlign: 'center',
            fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600,
            color: 'var(--color-text)', lineHeight: '20px',
          }}
        >
          Funcional avanzado
        </span>
        <div style={{ width: 44, height: 44, flexShrink: 0 }} />
      </header>

      {/* Scrollable area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 100 }}>

        {/* Hero */}
        <div style={{ width: '100%', height: 180, backgroundColor: '#D4E6C3', position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.65) 100%)',
            }}
          />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 16px 16px' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: '24px' }}>
              Funcional avanzado
            </span>
          </div>
        </div>

        {/* Badges */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 16px',
            backgroundColor: 'var(--color-surface)',
          }}
        >
          {['⏱ 25 min', '📊 Moderado', '💪 Cuerpo completo'].map(badge => (
            <div
              key={badge}
              style={{
                padding: '6px 12px', borderRadius: '9999px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: 'var(--color-text-muted)', lineHeight: '16px', whiteSpace: 'nowrap' }}>
                {badge}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            paddingInline: 16, height: 44, overflowX: 'auto',
            backgroundColor: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky', top: 56, zIndex: 20,
          }}
        >
          {MOCK_WORKOUT_BLOCKS.map(block => {
            const isActive = activeBlock === block.id
            return (
              <button
                key={block.id}
                onClick={() => scrollToBlock(block.id)}
                style={{
                  height: 32, flexShrink: 0, display: 'flex', alignItems: 'center',
                  paddingInline: 14, gap: 6,
                  borderRadius: '9999px', cursor: 'pointer',
                  backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                  border: isActive ? 'none' : '1px solid var(--color-border)',
                }}
              >
                <span style={{ fontSize: isActive ? 16 : 15, lineHeight: 1 }}>{block.emoji}</span>
                {isActive && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: '16px', whiteSpace: 'nowrap' }}>
                    {block.name}
                  </span>
                )}
              </button>
            )
          })}
          <div style={{ flex: 1 }} />
        </div>

        {/* Bloques */}
        <div style={{ backgroundColor: 'var(--color-surface)' }}>
          {MOCK_WORKOUT_BLOCKS.map(block => {
            const isExpanded = expandedBlocks.has(block.id)
            const isActive = activeBlock === block.id

            return (
              <div
                key={block.id}
                ref={el => { blockRefs.current[block.id] = el }}
                style={{ marginTop: block.id === 'warmup' ? 0 : 8, backgroundColor: 'var(--color-surface)' }}
              >
                <button
                  onClick={() => toggleBlock(block.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 16px', width: '100%', cursor: 'pointer',
                    background: 'none', border: 'none',
                    borderTop: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                      color: isActive && isExpanded ? 'var(--color-primary)' : 'var(--color-text)',
                      lineHeight: '18px',
                    }}
                  >
                    {block.emoji} {block.name} · {block.rounds} {block.rounds === 1 ? 'vuelta' : 'vueltas'}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isExpanded && (
                      <>
                        <button
                          onClick={e => { e.stopPropagation(); setViewMode('list') }}
                          aria-label="Vista lista"
                          style={{
                            width: 28, height: 28, borderRadius: 4, border: 'none', cursor: 'pointer',
                            backgroundColor: viewMode === 'list' ? 'var(--color-primary-50)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <line x1="2" y1="3" x2="10" y2="3" stroke={viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="2" y1="6" x2="10" y2="6" stroke={viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" strokeLinecap="round" />
                            <line x1="2" y1="9" x2="10" y2="9" stroke={viewMode === 'list' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                        <button
                          onClick={e => { e.stopPropagation(); setViewMode('timeline') }}
                          aria-label="Vista timeline"
                          style={{
                            width: 28, height: 28, borderRadius: 4, border: 'none', cursor: 'pointer',
                            backgroundColor: viewMode === 'timeline' ? 'var(--color-primary-50)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12">
                            <rect x="1" y="1" width="4" height="4" rx="1" fill="none" stroke={viewMode === 'timeline' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" />
                            <rect x="7" y="1" width="4" height="4" rx="1" fill="none" stroke={viewMode === 'timeline' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" />
                            <rect x="1" y="7" width="4" height="4" rx="1" fill="none" stroke={viewMode === 'timeline' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" />
                            <rect x="7" y="7" width="4" height="4" rx="1" fill="none" stroke={viewMode === 'timeline' ? 'var(--color-primary)' : 'var(--color-text-muted)'} strokeWidth="1.5" />
                          </svg>
                        </button>
                      </>
                    )}

                    <svg
                      width="16" height="16" viewBox="0 0 16 16"
                      style={{
                        flexShrink: 0,
                        transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 200ms ease',
                      }}
                    >
                      <path d="M6 4L10 8L6 12" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  viewMode === 'list'
                    ? <ExerciseListView block={block} />
                    : <ExerciseTimelineView block={block} />
                )}
              </div>
            )
          })}
        </div>

        <div style={{ height: 96 }} />
      </div>

      {/* CTA flotante */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '390px',
          zIndex: 50,
          padding: '12px 24px',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={() => navigate('/create', { state: { selectedWorkout: { name: 'Funcional avanzado', duration: 25, intensity: 'Moderado', zone: 'Cuerpo completo' } } })}
          style={{
            width: '100%', height: 52, borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.01em',
            boxShadow: '#F96F1659 0px 4px 14px',
          }}
        >
          Elegir este entrenamiento →
        </button>
      </div>
    </div>
  )
}
