import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import { BottomNav } from '@/components/mobile/bottom-nav'
import { Home, Search, Bell, User, Settings } from 'lucide-react'

const meta: Meta<typeof BottomNav> = {
  title: 'Mobile/BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Barra de navegación inferior fija. Máximo 5 items. Soporta badges y estado activo.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="relative h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <div className="px-4 pt-8">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Contenido de la pantalla
            </p>
          </div>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

const baseItems = [
  { icon: Home, label: 'Inicio', href: '/' },
  { icon: Search, label: 'Buscar', href: '/buscar' },
  { icon: Bell, label: 'Alertas', href: '/alertas' },
  { icon: User, label: 'Perfil', href: '/perfil' },
]

export const Default4Items: Story = {
  parameters: {
    docs: { description: { story: 'Navegación con 4 items — primer item activo.' } },
  },
  args: {
    items: baseItems,
    activeHref: '/',
  },
}

export const WithBadge: Story = {
  parameters: {
    docs: { description: { story: 'Badge numérico en Alertas (3) y contador 99+ en Buscar.' } },
  },
  args: {
    items: [
      { icon: Home, label: 'Inicio', href: '/' },
      { icon: Search, label: 'Buscar', href: '/buscar', badge: 103 },
      { icon: Bell, label: 'Alertas', href: '/alertas', badge: 3 },
      { icon: User, label: 'Perfil', href: '/perfil' },
    ],
    activeHref: '/',
  },
}

export const AllActive: Story = {
  parameters: {
    docs: { description: { story: 'Muestra cada item en estado activo (una story por item activo — aquí, Buscar activo).' } },
  },
  args: {
    items: baseItems,
    activeHref: '/buscar',
  },
}

export const Dark: Story = {
  parameters: {
    docs: { description: { story: 'Mismo nav en dark mode (activar theme switcher).' } },
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="dark relative h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <div className="px-4 pt-8">
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Dark mode — contenido de pantalla
            </p>
          </div>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  args: {
    items: [
      { icon: Home, label: 'Inicio', href: '/' },
      { icon: Search, label: 'Buscar', href: '/buscar' },
      { icon: Bell, label: 'Alertas', href: '/alertas', badge: 5 },
      { icon: Settings, label: 'Config', href: '/config' },
    ],
    activeHref: '/alertas',
  },
}
