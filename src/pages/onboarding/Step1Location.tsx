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
    <div className="min-h-dvh flex items-start justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
      <div
        className="w-full min-h-dvh flex flex-col"
        style={{ backgroundColor: 'var(--color-primary)', maxWidth: '390px' }}
      >
        {/* Header */}
        <div
          className="sticky top-0 z-50 px-6 pt-4 pb-3 bg-[var(--color-primary)]"
          style={{ paddingTop: 'max(1rem, env(safe-area-inset-top))' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{
              color: 'white',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: '28px',
            }}>
              movi
            </span>
            <span style={{
              color: 'var(--color-white-70)',
              fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              lineHeight: '16px',
            }}>
              Paso 1 de 2
            </span>
          </div>
          <div style={{ backgroundColor: 'var(--color-white-25)', borderRadius: '9999px', height: '3px', width: '100%' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '9999px', height: '3px', width: '50%' }} />
          </div>
        </div>

        {/* Contenido central */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          <h1 style={{
            color: 'white',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: '42px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: '48px',
            whiteSpace: 'pre-wrap',
            marginBottom: '12px',
          }}>
            {'¿Dónde\nentrenas?'}
          </h1>
          <p style={{
            color: 'var(--color-white-75)',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            fontSize: '17px',
            lineHeight: '26px',
            maxWidth: '280px',
          }}>
            Te mostramos quién entrena cerca de ti hoy.
          </p>
        </div>

        {/* CTA */}
        <div
          className="sticky bottom-0 px-6 pb-6 bg-[var(--color-primary)]"
          style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
        >
          {!showManual ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={handleUseLocation}
                disabled={phase === 'loading'}
                aria-label="Usar mi ubicación actual"
                style={{
                  alignItems: 'center',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: 'var(--shadow-white-card)',
                  cursor: phase === 'loading' ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexShrink: 0,
                  gap: '10px',
                  height: '56px',
                  justifyContent: 'center',
                  opacity: phase === 'loading' ? 0.8 : 1,
                  width: '100%',
                }}
              >
                {phase === 'loading' ? (
                  <Loader2 size={20} strokeWidth={1.5} className="animate-spin" style={{ color: 'var(--color-primary-text)', flexShrink: 0 }} />
                ) : (
                  <MapPin size={20} strokeWidth={1.5} style={{ color: 'var(--color-primary-text)', flexShrink: 0 }} />
                )}
                <span style={{
                  color: 'var(--color-primary-text)',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  lineHeight: '20px',
                }}>
                  {phase === 'loading' ? 'Obteniendo ubicación…' : 'Usar mi ubicación'}
                </span>
              </button>

              <div style={{ paddingBlock: '4px' }}>
                <button
                  onClick={() => setPhase('manual')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-white-80)',
                    cursor: 'pointer',
                    display: 'inline-block',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '18px',
                    padding: 0,
                    textAlign: 'center',
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--color-white-40)',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '3px',
                    width: '100%',
                  }}
                >
                  Buscar manualmente
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div style={{
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid var(--color-white-30)',
                borderRadius: '12px',
                display: 'flex',
                gap: '12px',
                height: '56px',
                paddingInline: '16px',
              }}>
                <Search size={18} strokeWidth={1.5} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="¿En qué zona estás?"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleManualSubmit()}
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: 'var(--color-text)',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '16px',
                  }}
                  autoFocus
                />
              </div>

              <button
                onClick={handleManualSubmit}
                disabled={!manualInput.trim()}
                style={{
                  alignItems: 'center',
                  backgroundColor: manualInput.trim() ? 'white' : 'var(--color-white-25)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: manualInput.trim() ? 'var(--shadow-white-card)' : 'none',
                  color: 'var(--color-primary-text)',
                  cursor: manualInput.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                  fontSize: '16px',
                  fontWeight: 700,
                  height: '56px',
                  justifyContent: 'center',
                  letterSpacing: '-0.01em',
                  width: '100%',
                }}
              >
                Continuar
              </button>

              <div style={{ paddingBlock: '4px' }}>
                <button
                  onClick={() => setPhase('idle')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-white-80)',
                    cursor: 'pointer',
                    display: 'inline-block',
                    fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '18px',
                    padding: 0,
                    textAlign: 'center',
                    textDecoration: 'underline',
                    textDecorationColor: 'var(--color-white-40)',
                    textDecorationThickness: '1px',
                    textUnderlineOffset: '3px',
                    width: '100%',
                  }}
                >
                  Usar GPS
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
