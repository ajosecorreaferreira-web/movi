import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Location {
  lat: number
  lng: number
  name: string
}

interface OnboardingStore {
  location: Location | null
  level: 1 | 2 | 3 | 4 | 5 | null
  isComplete: boolean
  setLocation: (location: Location | null) => void
  setLevel: (level: 1 | 2 | 3 | 4 | 5 | null) => void
  complete: () => void
  reset: () => void
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      location: null,
      level: null,
      isComplete: false,
      setLocation: (location) => set({ location }),
      setLevel: (level) => set({ level }),
      complete: () => set({ isComplete: true }),
      reset: () => set({ location: null, level: null, isComplete: false }),
    }),
    { name: 'movi-onboarding' }
  )
)
