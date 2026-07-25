import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footprints, Wind, Zap, Flame, Trophy, MapPin, CalendarDays } from 'lucide-react'

const LEVELS = [
  { id: 1 as const, name: 'Activo', Icon: Footprints },
  { id: 2 as const, name: 'En marcha', Icon: Wind },
  { id: 3 as const, name: 'En forma', Icon: Zap },
  { id: 4 as const, name: 'Potencia', Icon: Flame },
  { id: 5 as const, name: 'Élite', Icon: Trophy },
]

type LevelId = 1 | 2 | 3 | 4 | 5

interface Options {
  ninos: boolean
  perro: boolean
  soloMujeres: boolean
  soloHombres: boolean
  familiar: boolean
}

interface ToggleSwitchProps {
  value: boolean
  onChange: () => void
  label: string
}

function ToggleSwitch({ value, onChange, label }: ToggleSwitchProps) {
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBlock: 14 }}
    >
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 500, color: 'var(--color-text)', lineHeight: '18px' }}>
        {label}
      </span>
      <button
        onClick={onChange}
        aria-label={`Toggle ${label}`}
        style={{
          width: 44, height: 24, borderRadius: 12, position: 'relative', flexShrink: 0,
          backgroundColor: value ? 'var(--color-primary)' : 'var(--color-border)',
          border: 'none', cursor: 'pointer', transition: 'background-color 150ms ease',
          padding: 0,
        }}
      >
        <div
          style={{
            position: 'absolute', top: 2, width: 20, height: 20, borderRadius: '50%',
            backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.20)',
            left: value ? 22 : 2, transition: 'left 150ms ease',
          }}
        />
      </button>
    </div>
  )
}

export default function CreateSession() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState<LevelId>(3)
  const [options, setOptions] = useState<Options>({
    ninos: false,
    perro: false,
    soloMujeres: false,
    soloHombres: false,
    familiar: false,
  })

  const activeLevel = LEVELS.find(l => l.id === selectedLevel)!

  const toggleOption = (key: keyof Options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        maxWidth: '430px',
        margin: '0 auto',
        backgroundColor: 'var(--color-background)',
        display: 'flex',
        flexDirection: 'column',
        colorScheme: 'light',
      }}
    >
      {/* Header */}
      <header
        style={{
          height: 56,
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: 8,
          paddingTop: 'max(0px, env(safe-area-inset-top))',
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{
            width: 44, height: 44, display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'none', border: 'none',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600,
            color: 'var(--color-text)', lineHeight: '20px',
          }}
        >
          Nueva sesión
        </span>
        <div style={{ width: 44, height: 44, flexShrink: 0 }} />
      </header>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 24, paddingInline: 24, paddingBottom: 100 }}>

        {/* Sección nivel */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
              color: 'var(--color-text-muted)', letterSpacing: '0.08em',
              textTransform: 'uppercase', lineHeight: '16px', marginBottom: 12,
            }}
          >
            Tu nivel hoy
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {LEVELS.map(({ id, name, Icon }) => {
              const isActive = id === selectedLevel
              return (
                <button
                  key={id}
                  onClick={() => setSelectedLevel(id)}
                  aria-label={name}
                  style={{
                    width: 56, height: 56, borderRadius: '9999px', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-surface)',
                    border: `1.5px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    boxShadow: isActive ? '#F96F1666 0px 4px 12px' : 'none',
                    cursor: 'pointer', transition: 'all 150ms ease',
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    stroke={isActive ? '#fff' : 'var(--color-text-muted)'}
                  />
                </button>
              )
            })}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: 'var(--color-primary)', lineHeight: '16px', marginTop: 8,
            }}
          >
            {activeLevel.name}
          </div>
        </div>

        {/* Separador */}
        <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBlock: 20 }} />

        {/* Card entrenamiento sugerido */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            padding: 16,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            {/* Imagen placeholder */}
            <div
              style={{
                width: 80, height: 80, flexShrink: 0, borderRadius: 8,
                backgroundColor: 'var(--color-surface-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" />
                <circle cx="9" cy="9" r="2" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" />
                <path d="m21 15-5-5L5 21" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" />
              </svg>
            </div>
            {/* Columna texto */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: 40 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--color-text)', lineHeight: '18px' }}>
                Funcional avanzado
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: '16px', marginTop: 4 }}>
                25 min · Moderado
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--color-text-muted)', lineHeight: '16px' }}>
                Cuerpo completo
              </span>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 500, color: 'var(--color-primary)', lineHeight: '16px', marginTop: 4 }}>
                Basado en tu semana
              </span>
            </div>
          </div>

          {/* Badge IA */}
          <div
            style={{
              position: 'absolute', top: 12, right: 12,
              backgroundColor: 'var(--color-primary)',
              borderRadius: '9999px', paddingBlock: 3, paddingInline: 10,
            }}
          >
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: '14px' }}>
              ✨ IA
            </span>
          </div>
        </div>

        {/* Link cambiar entrenamiento */}
        <button
          onClick={() => navigate('/create/categories')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', lineHeight: '16px' }}>
            Cambiar entrenamiento →
          </span>
        </button>

        {/* Separador */}
        <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBlock: 20 }} />

        {/* Sección fecha y lugar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Fecha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CalendarDays size={20} strokeWidth={1.5} stroke="var(--color-text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--color-text)', lineHeight: '18px' }}>
              Mañana · 8:00am
            </span>
            <button
              style={{
                height: 28, display: 'flex', alignItems: 'center', paddingInline: 12,
                borderRadius: '9999px', border: '1px solid var(--color-border)',
                background: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-text)', lineHeight: '16px' }}>editar</span>
            </button>
          </div>
          {/* Lugar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <MapPin size={20} strokeWidth={1.5} stroke="var(--color-text-muted)" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: 'var(--color-text)', lineHeight: '18px' }}>
              Pinar de Las Rozas
            </span>
            <button
              style={{
                height: 28, display: 'flex', alignItems: 'center', paddingInline: 12,
                borderRadius: '9999px', border: '1px solid var(--color-border)',
                background: 'none', cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--color-text)', lineHeight: '16px' }}>editar</span>
            </button>
          </div>
        </div>

        {/* Separador */}
        <div style={{ height: 1, backgroundColor: 'var(--color-border)', marginBlock: 20 }} />

        {/* Sección opciones */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
              color: 'var(--color-text-muted)', letterSpacing: '0.08em',
              textTransform: 'uppercase', lineHeight: '16px',
            }}
          >
            Opciones
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <ToggleSwitch value={options.ninos} onChange={() => toggleOption('ninos')} label="Con niños 👶" />
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <ToggleSwitch value={options.perro} onChange={() => toggleOption('perro')} label="Con perro 🐕" />
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <ToggleSwitch value={options.soloMujeres} onChange={() => toggleOption('soloMujeres')} label="Solo mujeres" />
          </div>
          <div style={{ borderBottom: '1px solid var(--color-border)' }}>
            <ToggleSwitch value={options.soloHombres} onChange={() => toggleOption('soloHombres')} label="Solo hombres" />
          </div>
          <ToggleSwitch value={options.familiar} onChange={() => toggleOption('familiar')} label="Familiar" />
        </div>
      </div>

      {/* CTA flotante */}
      <div
        style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: '390px',
          zIndex: 50,
          backgroundColor: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          paddingInline: 20,
          paddingTop: 12,
          paddingBottom: 'max(20px, env(safe-area-inset-bottom))',
        }}
      >
        <button
          onClick={() => navigate('/celebration/session-published')}
          style={{
            width: '100%', height: 52, borderRadius: '9999px',
            backgroundColor: 'var(--color-primary)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Publicar sesión →
        </button>
      </div>
    </div>
  )
}
