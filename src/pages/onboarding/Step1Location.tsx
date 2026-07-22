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
    <div
      className="flex min-h-dvh flex-col"
      style={{
        backgroundColor: 'var(--color-primary)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-3">
        <span
          className="text-[22px] font-extrabold tracking-tight"
          style={{ color: 'white', letterSpacing: '-0.03em' }}
        >
          movi
        </span>
        <span className="text-[13px] font-medium" style={{ color: 'var(--color-white-70)' }}>
          Paso 1 de 2
        </span>
      </div>

      {/* Progress bar */}
      <div className="px-6 pt-3.5">
        <div className="h-[3px] w-full rounded-full" style={{ backgroundColor: 'var(--color-white-25)' }}>
          <div className="h-full w-1/2 rounded-full" style={{ backgroundColor: 'white' }} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center px-6 pb-8" style={{ marginTop: '-32px' }}>
        <h1
          className="mb-3 text-[42px] font-extrabold leading-[1.1] tracking-tight"
          style={{ color: 'white', letterSpacing: '-0.03em' }}
        >
          ¿Dónde<br />entrenas?
        </h1>
        <p className="max-w-[280px] text-[17px] leading-relaxed" style={{ color: 'var(--color-white-75)' }}>
          Te mostramos quién entrena cerca de ti hoy.
        </p>
      </div>

      {/* CTA sticky */}
      <div
        className="flex flex-col gap-3 px-6"
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)' }}
      >
        {!showManual ? (
          <>
            <button
              onClick={handleUseLocation}
              disabled={phase === 'loading'}
              className="flex items-center justify-center gap-2.5 rounded-xl"
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: 'white',
                color: 'var(--color-primary-text)',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                boxShadow: 'var(--shadow-white-card)',
                border: 'none',
                cursor: phase === 'loading' ? 'not-allowed' : 'pointer',
                opacity: phase === 'loading' ? 0.8 : 1,
              }}
              aria-label="Usar mi ubicación actual"
            >
              {phase === 'loading' ? (
                <Loader2 size={20} className="animate-spin" color="var(--color-primary)" />
              ) : (
                <MapPin size={20} strokeWidth={1.5} color="var(--color-primary)" />
              )}
              {phase === 'loading' ? 'Obteniendo ubicación…' : 'Usar mi ubicación'}
            </button>

            <button
              onClick={() => setPhase('manual')}
              className="py-1 text-center text-[14px] font-medium underline underline-offset-2"
              style={{ color: 'var(--color-white-80)', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              Buscar manualmente
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 rounded-xl px-4" style={{
              height: '56px',
              backgroundColor: 'white',
              border: '1px solid var(--color-white-30)',
            }}>
              <Search size={18} color="var(--color-text-muted)" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="¿En qué zona estás?"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                className="flex-1 bg-transparent text-[16px] outline-none"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
                autoFocus
              />
            </div>

            <button
              onClick={handleManualSubmit}
              disabled={!manualInput.trim()}
              className="flex items-center justify-center rounded-xl"
              style={{
                width: '100%',
                height: '56px',
                backgroundColor: manualInput.trim() ? 'white' : 'var(--color-white-40)',
                color: 'var(--color-primary-text)',
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.01em',
                border: 'none',
                cursor: manualInput.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              Continuar
            </button>

            <button
              onClick={() => setPhase('idle')}
              className="py-1 text-center text-[14px] font-medium underline underline-offset-2"
              style={{ color: 'var(--color-white-80)', border: 'none', background: 'none', cursor: 'pointer' }}
            >
              Usar GPS
            </button>
          </>
        )}
      </div>
    </div>
  )
}
