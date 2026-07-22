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

        {/* Header sticky — logo + paso + progress */}
        <div
          className="sticky top-0 z-50 px-4 bg-[var(--color-primary)]"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold text-lg">movi</span>
            <span className="text-white/70 text-sm">Paso 1 de 2</span>
          </div>
          <div className="h-1 bg-white/20 rounded-full mb-4">
            <div className="h-1 bg-white rounded-full w-1/2" />
          </div>
        </div>

        {/* Contenido — ocupa el espacio disponible */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          <h1 className="text-3xl font-bold text-white leading-tight tracking-tight mb-3 whitespace-nowrap">
            ¿Dónde entrenas?
          </h1>
          <p className="text-white/80 text-base">
            Te mostramos quién entrena cerca de ti hoy.
          </p>
        </div>

        {/* CTA sticky bottom */}
        <div
          className="sticky bottom-0 flex flex-col gap-3 px-6 pt-4 bg-[var(--color-primary)]"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          {!showManual ? (
            <>
              <button
                onClick={handleUseLocation}
                disabled={phase === 'loading'}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl"
                style={{
                  height: '56px',
                  backgroundColor: 'white',
                  color: 'var(--color-primary-text)',
                  fontFamily: 'var(--font-sans)',
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
                <span className="text-base">{phase === 'loading' ? 'Obteniendo ubicación…' : 'Usar mi ubicación'}</span>
              </button>

              <button
                onClick={() => setPhase('manual')}
                className="w-full text-white/80 text-sm py-2 text-center"
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Buscar manualmente
              </button>
            </>
          ) : (
            <>
              <div
                className="flex items-center gap-3 rounded-xl px-4"
                style={{
                  height: '56px',
                  backgroundColor: 'white',
                  border: '1px solid var(--color-white-30)',
                }}
              >
                <Search size={18} color="var(--color-text-muted)" strokeWidth={1.5} />
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
                className="flex w-full items-center justify-center rounded-xl"
                style={{
                  height: '56px',
                  backgroundColor: manualInput.trim() ? 'white' : 'var(--color-white-40)',
                  color: 'var(--color-primary-text)',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  border: 'none',
                  cursor: manualInput.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                <span className="text-base">Continuar</span>
              </button>

              <button
                onClick={() => setPhase('idle')}
                className="w-full text-white/80 text-sm py-2 text-center"
                style={{ border: 'none', background: 'none', cursor: 'pointer' }}
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
