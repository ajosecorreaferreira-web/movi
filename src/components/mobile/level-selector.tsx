import { Footprints, Wind, Zap, Flame, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const LEVELS = [
  { id: 1 as const, name: 'Activo',    Icon: Footprints, desc: 'Caminar, moverme, empezar' },
  { id: 2 as const, name: 'En marcha', Icon: Wind,       desc: 'Trote suave, algo de funcional' },
  { id: 3 as const, name: 'En forma',  Icon: Zap,        desc: 'Funcional, natación, bici' },
  { id: 4 as const, name: 'Potencia',  Icon: Flame,      desc: 'Hyrox, pádel, funcional intenso' },
  { id: 5 as const, name: 'Élite',     Icon: Trophy,     desc: 'Crossfit, híbridos, pesas serias' },
]

interface LevelSelectorProps {
  value: 1 | 2 | 3 | 4 | 5 | null
  onChange: (level: 1 | 2 | 3 | 4 | 5) => void
}

export function LevelSelector({ value, onChange }: LevelSelectorProps) {
  function handleSelect(id: 1 | 2 | 3 | 4 | 5) {
    navigator.vibrate?.(10)
    onChange(id)
  }

  return (
    <div
      role="radiogroup"
      aria-label="Nivel de actividad"
      className="flex flex-col gap-2.5"
    >
      {LEVELS.map(({ id, name, Icon, desc }) => {
        const selected = value === id
        return (
          <button
            key={id}
            role="radio"
            aria-checked={selected}
            aria-label={`${name} — ${desc}`}
            onClick={() => handleSelect(id)}
            className={cn(
              'flex items-center gap-3.5 rounded-xl px-4 text-left transition-all',
              'min-h-[64px] w-full cursor-pointer border focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
              selected
                ? 'border-2 border-[var(--color-primary)] bg-[var(--color-primary-50)]'
                : 'border border-[var(--color-border)] bg-[var(--color-surface)]'
            )}
          >
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]',
                selected ? 'bg-[var(--color-primary-100)]' : 'bg-[var(--color-surface-2)]'
              )}
            >
              <Icon
                size={20}
                strokeWidth={1.5}
                color={selected ? 'var(--color-primary-text)' : 'var(--color-text-muted)'}
              />
            </div>
            <div className="flex flex-1 flex-col gap-0.5 py-3.5">
              <span
                className="text-[15px] font-bold leading-tight tracking-tight"
                style={{ color: selected ? 'var(--color-primary-text)' : 'var(--color-text)' }}
              >
                {name}
              </span>
              <span
                className="text-[13px] leading-snug"
                style={{
                  color: selected ? 'var(--color-primary-text)' : 'var(--color-text-muted)',
                  opacity: selected ? 0.85 : 1,
                }}
              >
                {desc}
              </span>
            </div>
            {selected && (
              <svg
                width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="var(--color-primary)" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="shrink-0"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
}
