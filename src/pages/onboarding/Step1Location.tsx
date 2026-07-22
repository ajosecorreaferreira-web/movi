import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Loader2, Search } from 'lucide-react'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { getCurrentPosition, reverseGeocode, GeolocationError } from '@/services/geolocation'
import { useHaptics } from '@/hooks/useHaptics'

type Phase = 'idle' | 'loading' | 'error' | 'manual'

export default function Step1Location() {
  const navigate = useNavigate()
  const { setLocation } = useOnboardingStore()
  const { haptic } = useHaptics()
  const [phase, setPhase] = useState<Phase>('idle')
  const [manualInput, setManualInput] = useState('')

  async function handleUseLocation() {
    setPhase('loading')
    try {
      const pos = await getCurrentPosition()
      const { latitude: lat, longitude: lng } = pos.coords
      const name = await reverseGeocode(lat, lng).catch(() => `${lat.toFixed(3)}, ${lng.toFixed(3)}`)
      setLocation({ lat, lng, name })
      haptic('success')
      navigate('/onboarding/level')
    } catch (err) {
      const code = err instanceof GeolocationError ? err.code : 'UNAVAILABLE'
      if (code === 'PERMISSION_DENIED') setPhase('manual')
      else setPhase('error')
    }
  }

  function handleManualSubmit() {
    const name = manualInput.trim()
    if (!name) return
    setLocation({ lat: 40.4168, lng: -3.7038, name })
    haptic('success')
    navigate('/onboarding/level')
  }

  const showManual = phase === 'manual' || phase === 'error'

  return (
    <div className="min-h-dvh bg-neutral-100 flex items-start justify-center">
      <div className="w-full max-w-[390px] min-h-dvh flex flex-col bg-[var(--color-primary)]">

        {/* Header sticky */}
        <div
          className="sticky top-0 z-50 px-6 bg-[var(--color-primary)]"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[22px] font-extrabold tracking-[-0.03em] text-white">
              movi
            </span>
            <span
              className="text-[13px] font-medium tracking-[0.02em]"
              style={{ color: 'var(--color-white-70)' }}
            >
              Paso 1 de 2
            </span>
          </div>
          <div className="h-[3px] bg-[var(--color-white-25)] rounded-full mb-5">
            <div className="h-[3px] bg-white rounded-full w-1/2" />
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col justify-center px-6 gap-3"
          style={{ marginTop: '-32px' }}
        >
          <h1 className="text-[42px] font-extrabold leading-[48px] tracking-[-0.03em] text-white">
            ¿Dónde<br />entrenas?
          </h1>
          <p
            className="text-[17px] leading-[26px] max-w-[280px]"
            style={{ color: 'var(--color-white-75)' }}
          >
            Te mostramos quién entrena cerca de ti hoy.
          </p>
        </div>

        {/* CTA sticky bottom */}
        <div
          className="sticky bottom-0 flex flex-col gap-3 px-6 pt-5 bg-[var(--color-primary)]"
          style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
        >
          {!showManual ? (
            <>
              <button
                onClick={handleUseLocation}
                disabled={phase === 'loading'}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl h-14 text-base font-bold tracking-[-0.01em]"
                style={{
                  backgroundColor: 'white',
                  color: 'var(--color-primary-text)',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: 'var(--shadow-white-card)',
                  border: 'none',
                  cursor: phase === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: phase === 'loading' ? 0.8 : 1,
                }}
                aria-label="Usar mi ubicación actual"
              >
                {phase === 'loading' ? (
                  <Loader2 size={20} strokeWidth={1.5} className="animate-spin" color="var(--color-primary)" />
                ) : (
                  <MapPin size={20} strokeWidth={1.5} color="var(--color-primary)" />
                )}
                <span>{phase === 'loading' ? 'Obteniendo ubicación…' : 'Usar mi ubicación'}</span>
              </button>

              <button
                onClick={() => setPhase('manual')}
                className="w-full text-[14px] font-medium text-center py-2"
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-white-80)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--color-white-40)',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '3px',
                }}
              >
                Buscar manualmente
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-3 rounded-xl px-4 h-14"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid var(--color-white-30)',
                }}
              >
                <Search size={18} strokeWidth={1.5} color="var(--color-text-muted)" />
                <input
                  type="text"
                  placeholder="¿En qué zona estás?"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                  className="flex-1 bg-transparent text-base outline-none"
                  style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
                  autoFocus
                />
              </div>

              <button
                onClick={handleManualSubmit}
                disabled={!manualInput.trim()}
                className="flex w-full items-center justify-center rounded-xl h-14 text-base font-bold tracking-[-0.01em]"
                style={{
                  backgroundColor: manualInput.trim() ? 'white' : 'var(--color-white-40)',
                  color: 'var(--color-primary-text)',
                  fontFamily: 'var(--font-sans)',
                  boxShadow: manualInput.trim() ? 'var(--shadow-white-card)' : 'none',
                  border: 'none',
                  cursor: manualInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Continuar
              </button>

              <button
                onClick={() => setPhase('idle')}
                className="w-full text-[14px] font-medium text-center py-2"
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-white-80)',
                  textDecoration: 'underline',
                  textDecorationColor: 'var(--color-white-40)',
                  textDecorationThickness: '1px',
                  textUnderlineOffset: '3px',
                }}
              >
                Usar GPS
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
