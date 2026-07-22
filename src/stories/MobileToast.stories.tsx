import type { Meta, StoryObj } from '@storybook/react'
import { MobileToast, useToastWithHaptics } from '@/components/mobile/mobile-toast'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof MobileToast> = {
  title: 'Mobile/MobileToast',
  component: MobileToast,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sistema de toasts adaptado a mobile. Posición top-center en mobile, bottom-right en desktop. Incluye haptic feedback por tipo.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function ToastTriggers() {
  const toast = useToastWithHaptics()
  return (
    <div
      className="flex flex-col gap-3 p-6"
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
    >
      <MobileToast />
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
        Toca para disparar el toast
      </p>
      <Button
        variant="default"
        onClick={() => toast.success('Cambios guardados correctamente')}
      >
        Success toast
      </Button>
      <Button
        variant="destructive"
        onClick={() => toast.error('Error al guardar los cambios')}
      >
        Error toast
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning('Límite de almacenamiento al 90%')}
      >
        Warning toast
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast.info('Nueva versión disponible')}
      >
        Info toast
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast.toast('Notificación genérica')}
      >
        Default toast
      </Button>
    </div>
  )
}

export const Success: Story = {
  parameters: {
    docs: { description: { story: 'Toast de éxito — haptic "success" (10ms + 50ms + 10ms).' } },
  },
  render: () => {
    function Inner() {
      const toast = useToastWithHaptics()
      return (
        <div
          className="flex h-screen items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <MobileToast />
          <Button onClick={() => toast.success('Auditoría iniciada correctamente', { description: 'Recibirás el informe en 48h.' })}>
            Disparar Success
          </Button>
        </div>
      )
    }
    return <Inner />
  },
}

export const Error: Story = {
  parameters: {
    docs: { description: { story: 'Toast de error — haptic "error" (patrón largo de vibración).' } },
  },
  render: () => {
    function Inner() {
      const toast = useToastWithHaptics()
      return (
        <div
          className="flex h-screen items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <MobileToast />
          <Button variant="destructive" onClick={() => toast.error('No se pudo conectar', { description: 'Comprueba tu conexión e inténtalo de nuevo.' })}>
            Disparar Error
          </Button>
        </div>
      )
    }
    return <Inner />
  },
}

export const Warning: Story = {
  parameters: {
    docs: { description: { story: 'Toast de advertencia — haptic "light".' } },
  },
  render: () => {
    function Inner() {
      const toast = useToastWithHaptics()
      return (
        <div
          className="flex h-screen items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <MobileToast />
          <Button variant="outline" onClick={() => toast.warning('Sesión a punto de expirar', { description: 'Guarda tu progreso antes de continuar.' })}>
            Disparar Warning
          </Button>
        </div>
      )
    }
    return <Inner />
  },
}

export const WithAction: Story = {
  parameters: {
    docs: { description: { story: 'Toast con botón de acción — útil para deshacer operaciones.' } },
  },
  render: () => {
    function Inner() {
      const toast = useToastWithHaptics()
      return (
        <div
          className="flex h-screen items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          <MobileToast />
          <Button
            onClick={() =>
              toast.success('Elemento eliminado', {
                action: { label: 'Deshacer', onClick: () => toast.info('Elemento restaurado') },
              })
            }
          >
            Eliminar (con Deshacer)
          </Button>
        </div>
      )
    }
    return <Inner />
  },
}

export const MobileVsDesktop: Story = {
  parameters: {
    docs: { description: { story: 'Panel con todos los tipos. Cambia el viewport para ver la diferencia de posición (top-center mobile vs bottom-right desktop).' } },
  },
  render: () => <ToastTriggers />,
}
