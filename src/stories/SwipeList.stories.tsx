import type { Meta, StoryObj } from '@storybook/react'
import { SwipeList, SwipeListItem } from '@/components/mobile/swipe-list'
import { Trash2, Archive, Star, Flag } from 'lucide-react'

const meta: Meta<typeof SwipeList> = {
  title: 'Mobile/SwipeList',
  component: SwipeList,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Lista con swipe para revelar acciones izquierda/derecha. Arrastra los items para ver las acciones.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function ListRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-4 border-b"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      <div
        className="h-10 w-10 flex-shrink-0 rounded-full"
        style={{ backgroundColor: 'var(--muted)' }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>{title}</p>
        <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>
      </div>
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Lista simple sin acciones de swipe.' } },
  },
  render: () => (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <SwipeList>
        {['Reunión de equipo', 'Revisión de código', 'Deploy producción'].map((title, i) => (
          <SwipeListItem key={i}>
            <ListRow title={title} subtitle="Hoy a las 10:00" />
          </SwipeListItem>
        ))}
      </SwipeList>
    </div>
  ),
}

export const WithLeftActions: Story = {
  parameters: {
    docs: { description: { story: 'Desliza hacia la derecha para revelar acción de archivar.' } },
  },
  render: () => (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <p className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
        ← Desliza a la derecha para archivar
      </p>
      <SwipeList>
        {['Proyecto Alpha', 'Proyecto Beta', 'Proyecto Gamma'].map((title, i) => (
          <SwipeListItem
            key={i}
            leftActions={[
              {
                label: 'Archivar',
                icon: Archive,
                color: 'primary',
                onPress: () => alert(`Archivado: ${title}`),
              },
            ]}
          >
            <ListRow title={title} subtitle="Archivable" />
          </SwipeListItem>
        ))}
      </SwipeList>
    </div>
  ),
}

export const WithRightActions: Story = {
  parameters: {
    docs: { description: { story: 'Desliza hacia la izquierda para revelar acción de eliminar.' } },
  },
  render: () => (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <p className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
        → Desliza a la izquierda para eliminar
      </p>
      <SwipeList>
        {['Email de marketing', 'Notificación spam', 'Newsletter'].map((title, i) => (
          <SwipeListItem
            key={i}
            rightActions={[
              {
                label: 'Eliminar',
                icon: Trash2,
                color: 'destructive',
                haptic: 'heavy',
                onPress: () => alert(`Eliminado: ${title}`),
              },
            ]}
          >
            <ListRow title={title} subtitle="Desliza para eliminar" />
          </SwipeListItem>
        ))}
      </SwipeList>
    </div>
  ),
}

export const FullSwipe: Story = {
  parameters: {
    docs: { description: { story: 'Acciones en ambos lados: marcar favorito (izq) y eliminar (der).' } },
  },
  render: () => (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <p className="px-4 py-3 text-xs" style={{ color: 'var(--muted-foreground)' }}>
        ← Favorito | Eliminar →
      </p>
      <SwipeList>
        {[
          { title: 'Tarea importante', subtitle: 'Vence mañana' },
          { title: 'Recordatorio semanal', subtitle: 'Cada lunes' },
          { title: 'Nota de equipo', subtitle: 'Sin fecha' },
        ].map((item, i) => (
          <SwipeListItem
            key={i}
            leftActions={[
              {
                label: 'Favorito',
                icon: Star,
                color: 'warning',
                onPress: () => alert(`Favorito: ${item.title}`),
              },
            ]}
            rightActions={[
              {
                label: 'Eliminar',
                icon: Trash2,
                color: 'destructive',
                haptic: 'heavy',
                onPress: () => alert(`Eliminado: ${item.title}`),
              },
              {
                label: 'Marcar',
                icon: Flag,
                color: 'primary',
                onPress: () => alert(`Marcado: ${item.title}`),
              },
            ]}
          >
            <ListRow title={item.title} subtitle={item.subtitle} />
          </SwipeListItem>
        ))}
      </SwipeList>
    </div>
  ),
}
