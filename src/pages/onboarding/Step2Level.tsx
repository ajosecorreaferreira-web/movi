import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ArrowRight } from 'lucide-react'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { LevelSelector } from '@/components/mobile/level-selector'
import { useHaptics } from '@/hooks/useHaptics'

export default function Step2Level() {
  const navigate = useNavigate()
  const { setLevel } = useOnboardingStore()
  const { haptic } = useHaptics()
  const [selected, setSelected] = useState<1 | 2 | 3 | 4 | 5 | null>(2)

  function handleNext() {
    if (!selected) return
    haptic('medium')
    setLevel(selected)
    navigate('/onboarding/done')
  }

  function handleBack() {
    navigate('/onboarding/location')
  }

  return (
    <div className="min-h-dvh bg-neutral-100 flex items-start justify-center">
      <div
        className="w-full max-w-[390px] min-h-dvh flex flex-col"
        style={{ backgroundColor: 'var(--color-background)' }}
      >

        {/* Header sticky */}
        <div
          className="sticky top-0 z-50"
          style={{ backgroundColor: 'var(--color-background)', paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <div className="flex items-center justify-between px-6 pb-3">
            <button
              onClick={handleBack}
              className="flex items-center justify-center rounded-full w-10 h-10 bg-[var(--color-surface-2)]"
              style={{ border: 'none', cursor: 'pointer' }}
              aria-label="Volver"
            >
              <ChevronLeft size={20} strokeWidth={1.5} color="var(--color-text)" />
            </button>
            <span
              className="text-[13px] font-medium tracking-[0.02em]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Paso 2 de 2
            </span>
          </div>
          <div className="h-[3px] bg-[var(--color-border)]">
            <div className="h-[3px] bg-[var(--color-primary)] w-full" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="px-6 pt-8">
            <h1
              className="text-[32px] font-extrabold leading-[38px] tracking-[-0.025em]"
              style={{ color: 'var(--color-text)' }}
            >
              ¿Cuál es<br />tu nivel hoy?
            </h1>
            <p
              className="text-sm leading-[22px] mt-2"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Hoy, no siempre.
            </p>
          </div>

          <div className="px-6 pt-5 pb-4 flex flex-col gap-[10px]">
            <LevelSelector value={selected} onChange={setSelected} />
          </div>
        </div>

        {/* CTA sticky bottom */}
        <div
          className="sticky bottom-0 px-6 pt-4"
          style={{
            backgroundColor: 'var(--color-background)',
            paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <button
            onClick={handleNext}
            disabled={!selected}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl h-14 font-bold tracking-[-0.01em] text-white text-base"
            style={{
              backgroundColor: 'var(--color-primary)',
              boxShadow: 'var(--shadow-primary)',
              border: 'none',
              cursor: selected ? 'pointer' : 'not-allowed',
              opacity: selected ? 1 : 0.6,
              fontFamily: 'var(--font-sans)',
            }}
          >
            Empezar
            <ArrowRight size={20} strokeWidth={1.5} color="white" />
          </button>
        </div>

      </div>
    </div>
  )
}
