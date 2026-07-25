import { useState } from 'react'
import type { Filters } from './WorkoutList'

interface FilterSheetProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: Filters) => void
  initialFilters: Filters
}

const DURATIONS = ['15 min', '30 min', '45 min']
const LEVELS = ['Activo', 'En marcha', 'En forma', 'Potencia', 'Élite']
const EQUIPAMIENTO = ['Sin equipamiento', 'Básico', 'Completo']
const FORMATOS = ['Clase guiada', 'Libre', 'En pareja']
const ORDENAR = ['Novedades', 'Más corto', 'Más largo', 'A-Z']

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 36, display: 'flex', alignItems: 'center', paddingInline: 18,
        borderRadius: '9999px', cursor: 'pointer',
        backgroundColor: active ? 'var(--color-primary)' : 'transparent',
        border: `1.5px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'}`,
        color: active ? '#fff' : 'var(--color-text)',
        fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500, lineHeight: '18px',
        transition: 'all 150ms ease',
      }}
    >
      {label}
    </button>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
        color: 'var(--color-text-muted)', letterSpacing: '0.08em',
        textTransform: 'uppercase', lineHeight: '16px', marginBottom: 12,
      }}
    >
      {children}
    </div>
  )
}

export default function FilterSheet({ isOpen, onClose, onApply, initialFilters }: FilterSheetProps) {
  const [local, setLocal] = useState<Filters>(initialFilters)

  const toggle = <K extends keyof Filters>(key: K, val: string) => {
    setLocal(prev => ({ ...prev, [key]: prev[key] === val ? null : val }))
  }

  const handleApply = () => {
    onApply(local)
  }

  const handleClear = () => {
    setLocal({ duracion: null, nivel: null, equipamiento: null, formato: null, ordenar: 'Novedades' })
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 40,
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 390,
          backgroundColor: 'var(--color-surface)',
          borderRadius: '16px 16px 0 0',
          zIndex: 50,
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 4 }}>
          <div style={{ width: 32, height: 4, borderRadius: '9999px', backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Header */}
        <div
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingInline: 24, paddingBlock: 16,
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600, color: 'var(--color-text)', lineHeight: '20px' }}>
            Filtros
          </span>
          <button
            onClick={handleClear}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--color-primary)', lineHeight: '18px' }}>
              Limpiar
            </span>
          </button>
        </div>

        {/* Scroll content */}
        <div style={{ overflowY: 'auto', maxHeight: '60vh', paddingInline: 24, paddingTop: 20 }}>

          {/* Duración */}
          <SectionTitle>Duración</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {DURATIONS.map(d => (
              <Pill key={d} label={d} active={local.duracion === d} onClick={() => toggle('duracion', d)} />
            ))}
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />

          {/* Nivel */}
          <SectionTitle>Nivel</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {LEVELS.map(l => (
              <Pill key={l} label={l} active={local.nivel === l} onClick={() => toggle('nivel', l)} />
            ))}
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />

          {/* Equipamiento */}
          <SectionTitle>Equipamiento</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {EQUIPAMIENTO.map(e => (
              <Pill key={e} label={e} active={local.equipamiento === e} onClick={() => toggle('equipamiento', e)} />
            ))}
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />

          {/* Formato */}
          <SectionTitle>Formato</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {FORMATOS.map(f => (
              <Pill key={f} label={f} active={local.formato === f} onClick={() => toggle('formato', f)} />
            ))}
          </div>

          <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBottom: 20 }} />

          {/* Ordenar por */}
          <SectionTitle>Ordenar por</SectionTitle>
          <div style={{ marginBottom: 80 }}>
            {ORDENAR.map((o, i) => (
              <button
                key={o}
                onClick={() => setLocal(prev => ({ ...prev, ordenar: o }))}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  paddingBlock: 12, width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                  borderBottom: i < ORDENAR.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${local.ordenar === o ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    backgroundColor: local.ordenar === o ? 'var(--color-primary)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {local.ordenar === o && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#fff' }} />
                  )}
                </div>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, color: 'var(--color-text)', lineHeight: '18px' }}>
                  {o}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA filtrar */}
        <div style={{ paddingInline: 24, paddingTop: 12 }}>
          <button
            onClick={handleApply}
            style={{
              width: '100%', height: 52, borderRadius: '9999px',
              backgroundColor: 'var(--color-primary)',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700, color: '#fff',
              letterSpacing: '-0.01em',
            }}
          >
            Filtrar
          </button>
        </div>
      </div>
    </>
  )
}
