import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Step1Location from '@/pages/onboarding/Step1Location'
import Step2Level from '@/pages/onboarding/Step2Level'
import OnboardingComplete from '@/pages/onboarding/OnboardingComplete'

function MapPlaceholder() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-[var(--color-text-muted)]">Mapa próximamente</p>
    </main>
  )
}

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding/location" replace />} />
          <Route path="/onboarding/location" element={<Step1Location />} />
          <Route path="/onboarding/level" element={<Step2Level />} />
          <Route path="/onboarding/done" element={<OnboardingComplete />} />
          <Route path="/map" element={<MapPlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
