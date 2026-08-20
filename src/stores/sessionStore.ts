import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SessionStore {
  apuntadoIds: string[]
  partnerReservedIds: string[]
  isFirstSession: boolean
  apuntarse: (sessionId: string) => void
  desapuntarse: (sessionId: string) => void
  isApuntado: (sessionId: string) => boolean
  reservarPartner: (partnerId: string) => void
  isPartnerReservado: (partnerId: string) => boolean
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      apuntadoIds: [],
      partnerReservedIds: [],
      isFirstSession: true,
      apuntarse: (sessionId) => set(state => ({
        apuntadoIds: [...state.apuntadoIds, sessionId],
        isFirstSession: state.apuntadoIds.length === 0 ? false : state.isFirstSession,
      })),
      desapuntarse: (sessionId) => set(state => ({
        apuntadoIds: state.apuntadoIds.filter(id => id !== sessionId),
      })),
      isApuntado: (sessionId) => get().apuntadoIds.includes(sessionId),
      reservarPartner: (partnerId) => set(state => ({
        partnerReservedIds: [...state.partnerReservedIds, partnerId],
      })),
      isPartnerReservado: (partnerId) => get().partnerReservedIds.includes(partnerId),
    }),
    { name: 'movi-sessions' }
  )
)
