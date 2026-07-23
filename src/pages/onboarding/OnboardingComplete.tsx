import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, ArrowRight } from 'lucide-react'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { useHaptics } from '@/hooks/useHaptics'

const AVATARS = [
  { initial: 'A', bg: 'var(--color-primary-400)' },
  { initial: 'M', bg: 'var(--color-secondary)' },
  { initial: 'C', bg: 'var(--color-info)' },
]

const CONFETTI = [
  { top: '80px',  left: '40px',  size: 10, color: 'var(--color-primary)',   delay: '0s',    duration: '1.4s', rotate: 25 },
  { top: '100px', left: '320px', size: 8,  color: 'var(--color-gold)',       delay: '0.1s',  duration: '1.2s', rotate: 0  },
  { top: '140px', left: '75px',  size: 6,  color: 'var(--color-secondary)',  delay: '0.2s',  duration: '1.6s', rotate: -15 },
  { top: '60px',  left: '200px', size: 8,  color: 'var(--color-xp)',         delay: '0.05s', duration: '1.3s', rotate: 45 },
  { top: '130px', left: '260px', size: 12, color: 'var(--color-primary)',    delay: '0.15s', duration: '1.1s', rotate: -30 },
  { top: '180px', left: '330px', size: 7,  color: 'var(--color-gold)',       delay: '0.25s', duration: '1.5s', rotate: 0  },
  { top: '90px',  left: '140px', size: 5,  color: 'var(--color-xp)',         delay: '0.3s',  duration: '1.8s', rotate: 20 },
  { top: '160px', left: '50px',  size: 9,  color: 'var(--color-warning)',    delay: '0.08s', duration: '1.4s', rotate: 0  },
  { top: '70px',  left: '360px', size: 6,  color: 'var(--color-secondary)',  delay: '0.18s', duration: '1.6s', rotate: 60 },
  { top: '200px', left: '180px', size: 10, color: 'var(--color-xp)',         delay: '0.35s', duration: '1.2s', rotate: -45 },
  { top: '680px', left: '30px',  size: 8,  color: 'var(--color-primary)',    delay: '0.4s',  duration: '1.3s', rotate: 15 },
  { top: '700px', left: '340px', size: 10, color: 'var(--color-gold)',       delay: '0.45s', duration: '1.1s', rotate: -20 },
  { top: '740px', left: '120px', size: 7,  color: 'var(--color-xp)',         delay: '0.5s',  duration: '1.5s', rotate: 0 },
  { top: '720px', left: '260px', size: 5,  color: 'var(--color-secondary)',  delay: '0.42s', duration: '1.7s', rotate: 30 },
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
    <div className="min-h-dvh bg-neutral-100 flex items-start justify-center">
    <div
      className="relative flex min-h-dvh w-full max-w-[390px] flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--color-celebration-bg)',
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
          className="mb-7 flex items-center justify-center rounded-[var(--radius-xl)]"
          style={{
            width: 96,
            height: 96,
            backgroundColor: 'var(--color-gold-subtle)',
            border: '1px solid var(--color-gold-border)',
            animation: 'trophy-enter var(--duration-celebration) var(--ease-spring) forwards',
          }}
        >
          <Trophy size={48} strokeWidth={1.5} color="var(--color-gold)" />
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
          className="mb-9 max-w-[260px] text-center text-[17px] leading-[26px]"
          style={{ color: 'var(--color-white-65)' }}
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
                border: '2.5px solid var(--color-celebration-bg)',
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
              backgroundColor: 'var(--color-avatar-dark)',
              border: '2.5px solid var(--color-celebration-bg)',
              marginLeft: -12,
              color: 'var(--color-white-70)',
              zIndex: 0,
            }}
          >
            +9
          </div>
        </div>
        <p className="mt-2.5 text-center text-[13px]" style={{ color: 'var(--color-white-50)' }}>
          Ana, Marta, Carlos y 9 más
        </p>
      </div>

      {/* CTA */}
      <div
        className="sticky bottom-0 px-6 pt-4"
        style={{
          paddingBottom: 'max(3rem, env(safe-area-inset-bottom))',
          backgroundColor: 'var(--color-celebration-bg)',
          transition: 'opacity var(--duration-slow) ease, transform var(--duration-slow) ease',
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(16px)',
          pointerEvents: showButton ? 'auto' : 'none',
        }}
      >
        <button
          onClick={handleContinue}
          className="flex w-full items-center justify-center gap-2.5 text-[17px] font-bold tracking-[-0.01em] text-white"
          style={{
            height: 58,
            borderRadius: '14px',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            lineHeight: '22px',
            boxShadow: 'var(--shadow-primary-strong)',
          }}
          aria-label="Ver sesiones en mi zona"
        >
          Ver mi zona
          <ArrowRight size={20} strokeWidth={1.5} color="white" />
        </button>
      </div>
    </div>
    </div>
  )
}
