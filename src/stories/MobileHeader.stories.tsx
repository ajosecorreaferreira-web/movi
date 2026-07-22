import type { Meta, StoryObj } from '@storybook/react'
import { MobileHeader } from '@/components/mobile/mobile-header'
import { Bell, MoreHorizontal } from 'lucide-react'

const meta: Meta<typeof MobileHeader> = {
  title: 'Mobile/MobileHeader',
  component: MobileHeader,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header sticky para pantallas mobile. Soporta botón de vuelta, título, subtítulo y acción derecha.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        <Story />
        <div className="px-4 py-6">
          <div
            className="h-32 rounded"
            style={{ backgroundColor: 'var(--muted)' }}
          />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Header solo con título centrado, sin acciones.' } },
  },
  args: {
    title: 'Mis proyectos',
  },
}

export const WithBack: Story = {
  parameters: {
    docs: { description: { story: 'Header con botón de volver atrás (ChevronLeft).' } },
  },
  args: {
    title: 'Detalle del proyecto',
    onBack: () => alert('Volver'),
  },
}

export const WithAction: Story = {
  parameters: {
    docs: { description: { story: 'Header con acción derecha — icono de notificaciones.' } },
  },
  args: {
    title: 'Dashboard',
    action: (
      <button
        style={{
          minWidth: 44,
          minHeight: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--foreground)',
        }}
        aria-label="Notificaciones"
      >
        <Bell size={20} />
      </button>
    ),
  },
}

export const WithBoth: Story = {
  parameters: {
    docs: { description: { story: 'Header completo: botón volver + título + acción derecha.' } },
  },
  args: {
    title: 'Configuración',
    subtitle: 'Cuenta y privacidad',
    onBack: () => alert('Volver'),
    action: (
      <button
        style={{
          minWidth: 44,
          minHeight: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--foreground)',
        }}
        aria-label="Más opciones"
      >
        <MoreHorizontal size={20} />
      </button>
    ),
  },
}

export const Transparent: Story = {
  parameters: {
    docs: { description: { story: 'Header transparente — para screens con imagen hero de fondo.' } },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, oklch(0.38 0.15 264) 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Explorar',
    transparent: true,
    onBack: () => alert('Volver'),
  },
}
