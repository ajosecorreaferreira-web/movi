import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SessionStore {
  apuntadoIds: string[]
  isFirstSession: boolean
  apuntarse: (sessionId: string) => void
  desapuntarse: (sessionId: string) => void
  isApuntado: (sessionId: string) => boolean
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      apuntadoIds: [],
      isFirstSession: true,
      apuntarse: (sessionId) => set(state => ({
        apuntadoIds: [...state.apuntadoIds, sessionId],
        isFirstSession: state.apuntadoIds.length === 0 ? false : state.isFirstSession,
      })),
      desapuntarse: (sessionId) => set(state => ({
        apuntadoIds: state.apuntadoIds.filter(id => id !== sessionId),
      })),
      isApuntado: (sessionId) => get().apuntadoIds.includes(sessionId),
    }),
    { name: 'movi-sessions' }
  )
)
