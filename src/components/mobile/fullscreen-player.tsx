import { X } from 'lucide-react'

interface CloseButtonProps {
  onClose: () => void
}

export function FullscreenCloseButton({ onClose }: CloseButtonProps) {
  return (
    <button
      onClick={onClose}
      aria-label="Cerrar"
      style={{
        position: 'absolute',
        top: 'max(16px, env(safe-area-inset-top))',
        left: '16px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <X size={20} color="white" strokeWidth={2} />
    </button>
  )
}
