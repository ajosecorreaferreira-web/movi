import type { Meta, StoryObj } from '@storybook/react'
import { HapticButton } from '@/components/mobile/haptic-button'
import { Loader2, Zap, Trash2, Check } from 'lucide-react'

const meta: Meta<typeof HapticButton> = {
  title: 'Mobile/HapticButton',
  component: HapticButton,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Botón con haptic feedback al tocar. Extiende el Button del DS con patrón de vibración automático según variante.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants: Story = {
  parameters: {
    docs: { description: { story: 'Todas las variantes del botón con haptic feedback.' } },
  },
  render: () => (
    <div
      className="flex flex-col gap-3 p-6"
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
    >
      <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
        Toca para sentir el haptic (requiere dispositivo con vibración)
      </p>
      <HapticButton>Default</HapticButton>
      <HapticButton variant="secondary">Secondary</HapticButton>
      <HapticButton variant="outline">Outline</HapticButton>
      <HapticButton variant="ghost">Ghost</HapticButton>
      <HapticButton variant="destructive">
        <Trash2 size={16} />
        Destructive — haptic heavy
      </HapticButton>
      <HapticButton hapticPattern="success">
        <Check size={16} />
        Con hapticPattern="success"
      </HapticButton>
      <HapticButton hapticPattern="error" variant="destructive">
        <Zap size={16} />
        Con hapticPattern="error"
      </HapticButton>
    </div>
  ),
}

export const AllSizes: Story = {
  parameters: {
    docs: { description: { story: 'Tres tamaños: sm, default y lg. Todos con touch target mínimo de 44px.' } },
  },
  render: () => (
    <div
      className="flex flex-col gap-3 p-6"
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
    >
      <HapticButton size="sm">Small (sm)</HapticButton>
      <HapticButton size="default">Default</HapticButton>
      <HapticButton size="lg">Large (lg)</HapticButton>
      <HapticButton className="w-full">Full width</HapticButton>
    </div>
  ),
}

export const LoadingStates: Story = {
  parameters: {
    docs: { description: { story: 'Estados de carga y deshabilitado — sin haptic en estados no interactivos.' } },
  },
  render: () => (
    <div
      className="flex flex-col gap-3 p-6"
      style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}
    >
      <HapticButton disabled>Deshabilitado</HapticButton>
      <HapticButton disabled className="w-full">
        <Loader2 size={16} className="animate-spin" />
        Cargando...
      </HapticButton>
      <HapticButton variant="outline" disabled>
        <Loader2 size={16} className="animate-spin" />
        Procesando
      </HapticButton>
      <HapticButton variant="destructive" disabled>
        Eliminando...
      </HapticButton>
    </div>
  ),
}
