import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { BottomSheet } from '@/components/mobile/bottom-sheet'
import { Button } from '@/components/ui/button'

const meta: Meta<typeof BottomSheet> = {
  title: 'Mobile/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sheet deslizable desde la parte inferior. Soporta snap points, título y contenido scrollable.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Sheet básico al 50% de la pantalla.' } },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)}>Abrir Bottom Sheet</Button>
        <BottomSheet isOpen={open} onClose={() => setOpen(false)}>
          <div className="px-4 py-6">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Contenido del bottom sheet. Arrastra hacia abajo para cerrar.
            </p>
          </div>
        </BottomSheet>
      </div>
    )
  },
}

export const HalfOpen: Story = {
  parameters: {
    docs: { description: { story: 'Sheet abierto al 50% (snap point medio).' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          snapPoints={[0.9, 0.5, 0]}
          initialSnap={1}
        >
          <div className="px-4 py-6">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Sheet al 50% de altura. Arrastra hacia arriba para expandir.
            </p>
          </div>
        </BottomSheet>
      </div>
    )
  },
}

export const FullOpen: Story = {
  parameters: {
    docs: { description: { story: 'Sheet expandido al 90% de la pantalla.' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          snapPoints={[0.9, 0.5, 0]}
          initialSnap={0}
        >
          <div className="px-4 py-6">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Sheet expandido al 90%. Arrastra hacia abajo para reducir.
            </p>
          </div>
        </BottomSheet>
      </div>
    )
  },
}

export const WithTitle: Story = {
  parameters: {
    docs: { description: { story: 'Sheet con título y descripción en el header.' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Opciones de archivo"
          description="Selecciona una acción para este archivo."
          snapPoints={[0.9, 0.5, 0]}
          initialSnap={1}
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {['Compartir', 'Duplicar', 'Mover', 'Eliminar'].map((label) => (
              <button
                key={label}
                className="flex items-center px-2 py-3 text-sm text-left rounded hover:bg-muted"
                style={{ color: label === 'Eliminar' ? 'var(--destructive)' : 'var(--foreground)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </BottomSheet>
      </div>
    )
  },
}

export const WithScrollContent: Story = {
  parameters: {
    docs: { description: { story: 'Sheet con contenido largo que requiere scroll interno.' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <BottomSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Lista de elementos"
          snapPoints={[0.9, 0.5, 0]}
          initialSnap={0}
        >
          <div className="px-4 py-2">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b py-4"
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className="h-10 w-10 rounded-full flex-shrink-0"
                  style={{ backgroundColor: 'var(--muted)' }}
                />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                    Elemento {i + 1}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    Descripción del elemento
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BottomSheet>
      </div>
    )
  },
}
