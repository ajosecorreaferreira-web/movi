import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ProgramSession {
  id: string
  date: string
  time: string
  workoutName: string
  status: 'completed' | 'today' | 'upcoming'
  workoutId: string
}

interface Program {
  id: string
  partnerName: string | null
  partnerAvatar: string | null
  location: string
  level: number
  days: ('tuesday' | 'thursday' | 'saturday')[]
  time: string
  sessions: ProgramSession[]
  startDate: string
  currentWeek: number
  completedSessions: number
}

interface ProgramStore {
  program: Program | null
  showFeelingSheet: boolean
  setShowFeelingSheet: (show: boolean) => void
  createProgramWithPartner: (partnerName: string) => void
  createSoloProgram: (timePreference: string) => void
  completeSession: (sessionId: string) => void
  clearProgram: () => void
}

const MOCK_SESSIONS: ProgramSession[] = [
  { id: 's1', date: 'Mar 15', time: '8:00am', workoutName: 'Funcional básico',      status: 'completed', workoutId: '1' },
  { id: 's2', date: 'Jue 17', time: '8:00am', workoutName: 'Funcional intermedio',  status: 'today',     workoutId: '2' },
  { id: 's3', date: 'Mar 22', time: '8:00am', workoutName: 'Funcional avanzado',    status: 'upcoming',  workoutId: '1' },
  { id: 's4', date: 'Jue 24', time: '8:00am', workoutName: 'Cardio funcional',      status: 'upcoming',  workoutId: '2' },
  { id: 's5', date: 'Mar 29', time: '8:00am', workoutName: 'Full body potencia',    status: 'upcoming',  workoutId: '1' },
  { id: 's6', date: 'Jue 31', time: '8:00am', workoutName: 'Cierre del programa',   status: 'upcoming',  workoutId: '2' },
]

export const useProgramStore = create<ProgramStore>()(
  persist(
    (set, get) => ({
      program: null,
      showFeelingSheet: false,

      setShowFeelingSheet: (show) => set({ showFeelingSheet: show }),

      createProgramWithPartner: (partnerName) =>
        set({
          program: {
            id: 'prog-1',
            partnerName,
            partnerAvatar: partnerName.slice(0, 2).toUpperCase(),
            location: 'Pinar de Las Rozas',
            level: 2,
            days: ['tuesday', 'thursday'],
            time: '8:00am',
            sessions: MOCK_SESSIONS,
            startDate: 'Mar 15',
            currentWeek: 1,
            completedSessions: 1,
          },
        }),

      createSoloProgram: (timePreference) =>
        set({
          program: {
            id: 'prog-solo-1',
            partnerName: null,
            partnerAvatar: null,
            location: 'Pinar de Las Rozas',
            level: 2,
            days: ['tuesday', 'thursday'],
            time: timePreference,
            sessions: MOCK_SESSIONS,
            startDate: 'Mar 15',
            currentWeek: 1,
            completedSessions: 1,
          },
        }),

      completeSession: (sessionId) => {
        const { program } = get()
        if (!program) return
        set({
          program: {
            ...program,
            sessions: program.sessions.map((s) =>
              s.id === sessionId ? { ...s, status: 'completed' as const } : s
            ),
            completedSessions: program.completedSessions + 1,
          },
        })
      },

      clearProgram: () => set({ program: null }),
    }),
    { name: 'movi-program' }
  )
)
