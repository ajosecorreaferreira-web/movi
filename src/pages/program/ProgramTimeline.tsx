import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MoreHorizontal, Check, Users, MapPin, Dumbbell, Clock } from 'lucide-react'
import { useProgramStore } from '@/stores/programStore'

const SEMANAS = [1, 2, 3] as const

export default function ProgramTimeline() {
  const { program } = useProgramStore()
  const navigate = useNavigate()
  const [activeSemana, setActiveSemana] = useState(1)

  const sessionsBySemana = {
    1: program?.sessions.slice(0, 2) || [],
    2: program?.sessions.slice(2, 4) || [],
    3: program?.sessions.slice(4, 6) || [],
  }

  const getSemanaStatus = (sem: number) => {
    const sessions = sessionsBySemana[sem as 1 | 2 | 3]
    if (sessions.every(s => s.status === 'completed')) return 'completed'
    if (sessions.some(s => s.status === 'today' || s.status === 'completed')) return 'active'
    return 'upcoming'
  }

  if (!program) {
    return (
      <div style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        backgroundColor: 'var(--color-background)',
      }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 15 }}>
          No tienes un programa activo.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '430px',
      margin: '0 auto',
      backgroundColor: 'var(--color-background)',
      colorScheme: 'light',
    }}>

      {/* SECCIÓN 1 — Header */}
      <header style={{
        flexShrink: 0,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)',
      }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          <ChevronLeft size={24} />
        </button>
        <span style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
          Mi programa
        </span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
          <MoreHorizontal size={24} />
        </button>
      </header>

      {/* SECCIÓN 2 — Stepper */}
      <div style={{ flexShrink: 0, padding: '20px 24px 16px', backgroundColor: 'var(--color-background)' }}>

        {/* Stepper horizontal */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
          {SEMANAS.map((sem, i) => {
            const status = getSemanaStatus(sem)
            const isActive = sem === activeSemana
            return (
              <React.Fragment key={sem}>
                {i > 0 && (
                  <div style={{
                    flex: 1,
                    height: '2px',
                    backgroundColor: getSemanaStatus(i) === 'completed'
                      ? 'var(--color-success)'
                      : 'var(--color-border)',
                    margin: '0 4px',
                  }} />
                )}
                <button
                  onClick={() => setActiveSemana(sem)}
                  style={{
                    width: isActive ? '14px' : '12px',
                    height: isActive ? '14px' : '12px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor:
                      status === 'completed' ? 'var(--color-success)' :
                      status === 'active' ? 'var(--color-primary)' :
                      'transparent',
                    border: status === 'upcoming'
                      ? '2px solid var(--color-border)'
                      : 'none',
                    boxShadow: isActive ? '0 0 0 3px rgba(249,111,22,0.2)' : 'none',
                    transition: 'all 200ms ease',
                    padding: 0,
                  }}
                >
                  {status === 'completed' && (
                    <Check size={8} color="white" strokeWidth={3} />
                  )}
                </button>
              </React.Fragment>
            )
          })}
        </div>

        {/* Labels de semanas */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {SEMANAS.map(sem => {
            const status = getSemanaStatus(sem)
            const isActive = sem === activeSemana
            return (
              <button
                key={sem}
                onClick={() => setActiveSemana(sem)}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: 0,
                }}
              >
                <div style={{
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 400,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                }}>
                  Semana {sem}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: status === 'completed' ? 'var(--color-success)' :
                         status === 'active' ? 'var(--color-primary)' :
                         'var(--color-text-muted)',
                  fontFamily: 'var(--font-sans)',
                  marginTop: '2px',
                }}>
                  {status === 'completed' ? '✓ Completa' :
                   status === 'active' ? 'En curso' : 'Próxima'}
                </div>
              </button>
            )
          })}
        </div>

        {/* Mensaje motivador */}
        <p style={{
          marginTop: '12px',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          fontStyle: 'italic',
          fontFamily: 'var(--font-sans)',
          textAlign: 'center',
          margin: '12px 0 0',
        }}>
          {activeSemana === 1 && "Vas muy bien con Ana. ¡A por la semana 2!"}
          {activeSemana === 2 && "¡Mitad del programa! Sigue así."}
          {activeSemana === 3 && "¡Última semana! Lo estás logrando."}
        </p>
      </div>

      {/* SECCIÓN 3 — Contenido scrolleable */}
      <div style={{
        flex: 1,
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        padding: '16px',
        paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
      }}>

        {/* Subheader de sesiones */}
        <p style={{
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '12px',
          fontFamily: 'var(--font-sans)',
        }}>
          SEMANA {activeSemana} · {sessionsBySemana[activeSemana as 1 | 2 | 3].filter(s => s.status === 'completed').length} de 2 sesiones completadas
        </p>

        {/* Cards de sesiones */}
        {sessionsBySemana[activeSemana as 1 | 2 | 3].map((session) => (
          <div key={session.id} style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-sm)',
            borderLeft: `6px solid ${
              session.status === 'completed' ? 'var(--color-success)' :
              session.status === 'today' ? 'var(--color-primary)' :
              'var(--color-border)'
            }`,
            padding: '14px 16px',
            marginBottom: '12px',
            opacity: session.status === 'upcoming' ? 0.7 : 1,
            position: 'relative',
          }}>
            {session.status === 'today' && (
              <span style={{
                position: 'absolute', top: '12px', right: '12px',
                display: 'inline-flex', alignItems: 'center',
                backgroundColor: 'var(--color-primary)',
                color: 'white', fontSize: '11px', fontWeight: 600,
                padding: '4px 8px', borderRadius: 'var(--radius-full)',
                lineHeight: 1, fontFamily: 'var(--font-sans)',
              }}>HOY 🔥</span>
            )}

            <p style={{
              fontSize: '12px',
              color: session.status === 'today' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: session.status === 'today' ? 600 : 400,
              marginBottom: '4px',
              fontFamily: 'var(--font-sans)',
              margin: '0 0 4px',
            }}>
              {session.status === 'completed' ? '✅ ' : ''}{session.date} · {session.time}
            </p>

            <p style={{
              fontSize: '15px',
              fontWeight: 600,
              color: 'var(--color-foreground)',
              fontFamily: 'var(--font-sans)',
              marginBottom: '4px',
              margin: '0 0 4px',
            }}>
              {session.workoutName}
            </p>

            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-sans)',
              margin: 0,
            }}>
              25 min · Con {program.partnerName || 'Ana'} · {program.location || 'Pinar de Las Rozas'}
            </p>

            {session.status === 'today' && (
              <button
                onClick={() => navigate('/workout/1')}
                style={{
                  marginTop: '12px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none',
                  color: 'var(--color-primary)',
                  fontSize: '14px', fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer', padding: 0,
                }}
              >
                Ver entrenamiento <ChevronRight size={16} />
              </button>
            )}
          </div>
        ))}

        {/* Separador */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '16px 0' }} />

        {/* Card resumen del programa */}
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '16px' }}>
          {[
            { icon: <Users size={16} />, text: `Con ${program.partnerName || 'Ana García'}` },
            { icon: <MapPin size={16} />, text: program.location || 'Pinar de Las Rozas' },
            { icon: <Dumbbell size={16} />, text: 'Funcional · Nivel 2-3' },
            { icon: <Clock size={16} />, text: `${program.days?.join(' y ') || 'Martes y Jueves'} · ${program.time || '8:00am'}` },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '8px 0',
              borderBottom: i < 3 ? '1px solid var(--color-border)' : 'none',
            }}>
              <span style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}>{row.icon}</span>
              <span style={{ fontSize: '14px', color: 'var(--color-foreground)', fontFamily: 'var(--font-sans)' }}>{row.text}</span>
            </div>
          ))}
        </div>

        {/* Barra de progreso gamificada */}
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>🏆</span>
            <span style={{ fontSize: '14px', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>Completa el programa</span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '999px', marginBottom: '8px' }}>
            <div style={{
              height: '6px',
              width: `${((program.completedSessions || 0) / 6) * 100}%`,
              backgroundColor: 'var(--color-primary)',
              borderRadius: '999px',
              transition: 'width 500ms ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-sans)' }}>
              {program.completedSessions || 0} de 6 sesiones
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-xp)', fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
              +200 pts al terminar
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
