import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import Step1Location from '@/pages/onboarding/Step1Location'
import Step2Level from '@/pages/onboarding/Step2Level'
import OnboardingComplete from '@/pages/onboarding/OnboardingComplete'
import Home from '@/pages/home/Home'

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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
}

export default App
