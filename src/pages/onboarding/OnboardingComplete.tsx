import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, ArrowRight } from 'lucide-react'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useHaptics } from '@/hooks/useHaptics'

const AVATARS = [
  { initial: 'A', bg: 'oklch(0.75 0.18 48)' },
  { initial: 'M', bg: 'oklch(0.52 0.15 148)' },
  { initial: 'C', bg: 'oklch(0.55 0.15 240)' },
]

const CONFETTI = [
  { top: '80px',  left: '40px',  size: 10, color: 'var(--color-primary)',   delay: '0s',    duration: '1.4s', rotate: 25 },
  { top: '100px', left: '320px', size: 8,  color: 'var(--color-gold)',       delay: '0.1s',  duration: '1.2s', rotate: 0  },
  { top: '140px', left: '75px',  size: 6,  color: 'var(--color-secondary)',  delay: '0.2s',  duration: '1.6s', rotate: -15 },
  { top: '60px',  left: '200px', size: 8,  color: 'var(--color-xp)',         delay: '0.05s', duration: '1.3s', rotate: 45 },
  { top: '130px', left: '260px', size: 12, color: 'var(--color-primary)',    delay: '0.15s', duration: '1.1s', rotate: -30 },
  { top: '180px', left: '330px', size: 7,  color: 'var(--color-gold)',       delay: '0.25s', duration: '1.5s', rotate: 0  },
  { top: '90px',  left: '140px', size: 5,  color: 'var(--color-xp)',         delay: '0.3s',  duration: '1.8s', rotate: 20 },
  { top: '160px', left: '50px',  size: 9,  color: 'oklch(0.78 0.15 75)',     delay: '0.08s', duration: '1.4s', rotate: 0  },
  { top: '70px',  left: '360px', size: 6,  color: 'var(--color-secondary)',  delay: '0.18s', duration: '1.6s', rotate: 60 },
  { top: '200px', left: '180px', size: 10, color: 'var(--color-xp)',         delay: '0.35s', duration: '1.2s', rotate: -45 },
]

export default function OnboardingComplete() {
  const navigate = useNavigate()
  const { complete } = useOnboardingStore()
  const { haptic } = useHaptics()
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    complete()
    haptic('success')
    const timer = setTimeout(() => setShowButton(true), 2500)
    return () => clearTimeout(timer)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleContinue() {
    haptic('medium')
    navigate('/map', { replace: true })
  }

  return (
    <div
      className="relative flex min-h-dvh flex-col overflow-hidden"
      style={{
        backgroundColor: 'oklch(0.13 0.04 50)',
        paddingTop: 'env(safe-area-inset-top)',
      }}
    >
      {/* Confetti */}
      {CONFETTI.map((c, i) => (
        <div
          key={i}
          className="pointer-events-none absolute"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            borderRadius: i % 3 === 0 ? '9999px' : '2px',
            transform: `rotate(${c.rotate}deg)`,
            animation: `confetti-fall ${c.duration} ease-in forwards`,
            animationDelay: c.delay,
            opacity: 0.9,
          }}
        />
      ))}

      {/* Contenido centrado */}
      <div
        className="flex flex-1 flex-col items-center justify-center px-8"
        style={{ marginTop: '-20px' }}
      >
        {/* Trofeo */}
        <div
          className="mb-7 flex items-center justify-center rounded-[28px]"
          style={{
            width: 96,
            height: 96,
            backgroundColor: 'oklch(0.78 0.16 85 / 0.15)',
            border: '1px solid oklch(0.78 0.16 85 / 0.25)',
            animation: 'trophy-enter var(--duration-celebration) var(--ease-spring) forwards',
          }}
        >
          <Trophy size={48} strokeWidth={1.5} color="oklch(0.78 0.16 85)" />
        </div>

        {/* Headline */}
        <h1
          className="mb-3.5 text-center text-[36px] font-extrabold leading-tight tracking-tight"
          style={{ color: 'white', letterSpacing: '-0.03em', lineHeight: '42px' }}
        >
          ¡Bienvenido<br />a Movi!
        </h1>

        {/* Subtítulo */}
        <p
          className="mb-9 max-w-[260px] text-center text-[17px] leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          Hay{' '}
          <span className="font-bold" style={{ color: 'white' }}>12 personas</span>
          {' '}entrenando cerca de ti ahora mismo.
        </p>

        {/* Avatar stack */}
        <div className="flex items-center" style={{ marginBottom: 8 }}>
          {AVATARS.map((av, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-full text-[16px] font-bold"
              style={{
                width: 44,
                height: 44,
                backgroundColor: av.bg,
                border: '2.5px solid oklch(0.13 0.04 50)',
                marginRight: i < AVATARS.length - 1 ? -12 : 0,
                color: 'white',
                zIndex: AVATARS.length - i,
              }}
            >
              {av.initial}
            </div>
          ))}
          <div
            className="flex items-center justify-center rounded-full text-[13px] font-bold"
            style={{
              width: 44,
              height: 44,
              backgroundColor: 'oklch(0.25 0.03 50)',
              border: '2.5px solid oklch(0.13 0.04 50)',
              marginLeft: -12,
              color: 'rgba(255,255,255,0.7)',
              zIndex: 0,
            }}
          >
            +9
          </div>
        </div>
        <p className="mt-2.5 text-center text-[13px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Ana, Marta, Carlos y 9 más
        </p>
      </div>

      {/* CTA */}
      <div
        className="px-6"
        style={{
          paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)',
          transition: 'opacity 400ms ease, transform 400ms ease',
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showButton ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleContinue}
          className="flex w-full items-center justify-center gap-2.5 rounded-[14px]"
          style={{
            height: 58,
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontFamily: 'var(--font-sans)',
            fontSize: '17px',
            fontWeight: 700,
            letterSpacing: '-0.01em',
            boxShadow: '0 8px 24px oklch(0.70 0.19 46 / 0.45)',
          }}
          aria-label="Ver sesiones en mi zona"
        >
          Ver mi zona
          <ArrowRight size={20} strokeWidth={2.5} color="white" />
        </button>

        <p
          className="mt-2.5 text-center text-[11px] font-medium uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          Toca para saltar
        </p>
      </div>
    </div>
  )
}
