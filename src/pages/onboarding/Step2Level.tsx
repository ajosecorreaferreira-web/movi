import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { FullScreenStep } from '@/components/mobile/full-screen-step'
import { LevelSelector } from '@/components/mobile/level-selector'

export default function Step2Level() {
  const navigate = useNavigate()
  const { setLevel } = useOnboardingStore()
  const [selected, setSelected] = useState<1 | 2 | 3 | 4 | 5 | null>(2)

  function handleNext() {
    if (!selected) return
    setLevel(selected)
    navigate('/onboarding/done')
  }

  function handleBack() {
    navigate('/onboarding/location')
  }

  return (
    <div className="min-h-dvh bg-neutral-100 flex items-start justify-center">
      <div className="w-full max-w-[390px] min-h-dvh">
        <FullScreenStep
          currentStep={2}
          totalSteps={2}
          title="¿Cuál es tu nivel hoy?"
          description="Hoy, no siempre."
          onNext={handleNext}
          onBack={handleBack}
          nextLabel="Empezar →"
          nextDisabled={!selected}
        >
          <div className="mt-2">
            <LevelSelector value={selected} onChange={setSelected} />
          </div>
        </FullScreenStep>
      </div>
    </div>
  )
}
