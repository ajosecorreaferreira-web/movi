import { X, Zap, RefreshCw, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProgramStore } from '@/stores/programStore'
import { useSessionStore } from '@/stores/sessionStore'

interface HamburgerMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const navigate = useNavigate()
  const { setShowFeelingSheet, clearProgram } = useProgramStore()
  const { apuntadoIds } = useSessionStore()

  void apuntadoIds

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 90,
        }}
      />

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
        width: '280px',
        backgroundColor: 'var(--color-surface)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        boxShadow: '4px 0 24px rgba(0,0,0,0.15)',
      }}>
        {/* Header del drawer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px 20px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-sans)',
          }}>movi</span>
          <button onClick={onClose} style={{
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '4px',
          }}>
            <X size={20} color="var(--color-text-muted)" />
          </button>
        </div>

        {/* Opciones normales */}
        <div style={{ padding: '16px 0', flex: 1 }}>
          <MenuItem label="Mi perfil" onClick={() => { onClose(); navigate('/profile') }} />
          <MenuItem label="Mi programa" onClick={() => { onClose(); navigate('/program') }} />
          <MenuItem label="Mis sesiones" onClick={() => { onClose(); navigate('/home') }} />
          <MenuItem label="Ajustes" onClick={() => { onClose() }} />
        </div>

        {/* Sección demo — separada visualmente */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          padding: '16px 20px',
        }}>
          <p style={{
            fontSize: '11px',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            marginBottom: '12px',
            fontFamily: 'var(--font-sans)',
          }}>MODO DEMO</p>

          <DemoButton
            icon={<Zap size={16} />}
            label="Simular sesión completada"
            description="Activa el feeling sheet"
            onClick={() => {
              onClose()
              setTimeout(() => setShowFeelingSheet(true), 300)
            }}
          />

          <DemoButton
            icon={<RefreshCw size={16} />}
            label="Ver programa activo"
            description="Navega al timeline"
            onClick={() => { onClose(); navigate('/program') }}
          />

          <DemoButton
            icon={<Trash2 size={16} />}
            label="Reset demo"
            description="Borra sesiones y programa"
            onClick={() => {
              clearProgram()
              localStorage.removeItem('movi-sessions')
              onClose()
              navigate('/home')
            }}
            destructive
          />
        </div>
      </div>
    </>
  )
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left',
        padding: '12px 20px',
        background: 'none', border: 'none',
        fontSize: '15px', fontWeight: 500,
        color: 'var(--color-text)',
        fontFamily: 'var(--font-sans)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

function DemoButton({
  icon, label, description, onClick, destructive
}: {
  icon: React.ReactNode
  label: string
  description: string
  onClick: () => void
  destructive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', textAlign: 'left',
        padding: '10px 12px',
        marginBottom: '8px',
        background: destructive ? '#FEF2F2' : 'var(--color-primary-50)',
        border: `1px solid ${destructive ? 'var(--color-error)' : 'var(--color-primary)'}`,
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '10px',
      }}
    >
      <span style={{ color: destructive ? 'var(--color-error)' : 'var(--color-primary)', flexShrink: 0 }}>
        {icon}
      </span>
      <div>
        <div style={{
          fontSize: '13px', fontWeight: 600,
          color: destructive ? 'var(--color-error)' : 'var(--color-primary)',
          fontFamily: 'var(--font-sans)',
        }}>{label}</div>
        <div style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-sans)',
        }}>{description}</div>
      </div>
    </button>
  )
}
