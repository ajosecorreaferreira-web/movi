import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Step1Location from '@/pages/onboarding/Step1Location'
import Step2Level from '@/pages/onboarding/Step2Level'
import OnboardingComplete from '@/pages/onboarding/OnboardingComplete'
import Home from '@/pages/home/Home'
import SessionDetail from '@/pages/session/SessionDetail'
import SessionDetailApuntado from '@/pages/session/SessionDetailApuntado'
import PrimeraSesion from '@/pages/celebration/PrimeraSesion'
import PrimeraCompletada from '@/pages/celebration/PrimeraCompletada'
import Racha5Dias from '@/pages/celebration/Racha5Dias'

function App() {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/onboarding/location" replace />} />
          <Route path="/onboarding/location" element={<Step1Location />} />
          <Route path="/onboarding/level" element={<Step2Level />} />
          <Route path="/onboarding/done" element={<OnboardingComplete />} />
          <Route path="/home" element={<Home />} />
          <Route path="/session/:id" element={<SessionDetail />} />
          <Route path="/session/:id/apuntado" element={<SessionDetailApuntado />} />
          <Route path="/celebration/first-session" element={<PrimeraSesion />} />
          <Route path="/celebration/first-completed" element={<PrimeraCompletada />} />
          <Route path="/celebration/streak-5" element={<Racha5Dias />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
