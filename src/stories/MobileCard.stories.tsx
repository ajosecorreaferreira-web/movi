import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { MobileCard } from '@/components/mobile/mobile-card'
import { Trash2, Archive, Star } from 'lucide-react'

const meta: Meta<typeof MobileCard> = {
  title: 'Mobile/MobileCard',
  component: MobileCard,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tarjeta mobile-first con soporte para press, long press y swipe actions. Animación de escala al tocar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function CardContent({ title, subtitle, meta: metaText }: { title: string; subtitle: string; meta?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold" style={{ color: 'var(--card-foreground)' }}>{title}</p>
        {metaText && (
          <span className="text-xs flex-shrink-0" style={{ color: 'var(--muted-foreground)' }}>{metaText}</span>
        )}
      </div>
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{subtitle}</p>
    </div>
  )
}

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Tarjeta estática sin interacciones.' } },
  },
  render: () => (
    <div className="flex flex-col gap-3 p-4" style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <MobileCard>
        <CardContent
          title="Auditoría — Mi Empresa SL"
          subtitle="Última actualización hace 2 horas"
          meta="En progreso"
        />
      </MobileCard>
      <MobileCard>
        <CardContent
          title="Informe de accesibilidad"
          subtitle="23 problemas encontrados — 8 críticos"
          meta="WCAG AA"
        />
      </MobileCard>
      <MobileCard>
        <CardContent
          title="Deuda técnica estimada"
          subtitle="120 horas de desarrollo para resolver"
          meta="~15k€"
        />
      </MobileCard>
    </div>
  ),
}

export const WithSwipe: Story = {
  parameters: {
    docs: { description: { story: 'Tarjeta con swipe actions — desliza a la izquierda para ver Archivar y Eliminar.' } },
  },
  render: () => {
    const [cards, setCards] = useState([
      { id: 1, title: 'Proyecto Alpha', subtitle: 'Auditoría en progreso' },
      { id: 2, title: 'Proyecto Beta', subtitle: 'Informe listo para revisar' },
      { id: 3, title: 'Proyecto Gamma', subtitle: 'Pendiente de inicio' },
    ])
    return (
      <div className="flex flex-col gap-3 p-4" style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>← Desliza para acciones</p>
        {cards.map((card) => (
          <MobileCard
            key={card.id}
            swipeActions={[
              {
                label: 'Archivar',
                icon: Archive,
                color: 'primary',
                onPress: () => setCards((cs) => cs.filter((c) => c.id !== card.id)),
              },
              {
                label: 'Eliminar',
                icon: Trash2,
                color: 'destructive',
                haptic: 'heavy',
                onPress: () => setCards((cs) => cs.filter((c) => c.id !== card.id)),
              },
            ]}
          >
            <CardContent title={card.title} subtitle={card.subtitle} />
          </MobileCard>
        ))}
        {cards.length === 0 && (
          <p className="py-8 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Sin proyectos. ¡Buen trabajo!
          </p>
        )}
      </div>
    )
  },
}

export const WithLongPress: Story = {
  parameters: {
    docs: { description: { story: 'Long press (500ms) activa modo selección. Press corto navega.' } },
  },
  render: () => {
    const [selected, setSelected] = useState<number | null>(null)
    const [message, setMessage] = useState('')
    return (
      <div className="flex flex-col gap-3 p-4" style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        {message && (
          <div
            className="rounded px-3 py-2 text-xs"
            style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
          >
            {message}
          </div>
        )}
        {[
          { id: 1, title: 'Auditoría completa', subtitle: 'Entregada el 12 jun' },
          { id: 2, title: 'Revisión de accesibilidad', subtitle: 'En progreso' },
          { id: 3, title: 'Roadmap Q3', subtitle: 'Pendiente aprobación' },
        ].map((card) => (
          <MobileCard
            key={card.id}
            onPress={() => setMessage(`Tap en: ${card.title}`)}
            onLongPress={() => { setSelected(card.id); setMessage(`Long press en: ${card.title}`) }}
            className={selected === card.id ? 'ring-2' : ''}
            style={{ '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
          >
            <CardContent title={card.title} subtitle={card.subtitle} />
          </MobileCard>
        ))}
      </div>
    )
  },
}

export const Compact: Story = {
  parameters: {
    docs: { description: { story: 'Tarjetas compactas — contenido minimal, ideal para listas densas.' } },
  },
  render: () => (
    <div className="flex flex-col gap-2 p-4" style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      {[
        { icon: Star, label: 'Favoritos', count: 12 },
        { icon: Archive, label: 'Archivados', count: 5 },
        { icon: Trash2, label: 'Eliminados', count: 3 },
      ].map(({ icon: Icon, label, count }) => (
        <MobileCard key={label} onPress={() => {}}>
          <div className="flex items-center gap-3">
            <Icon size={20} style={{ color: 'var(--muted-foreground)' }} />
            <span className="flex-1 text-sm font-medium" style={{ color: 'var(--card-foreground)' }}>{label}</span>
            <span
              className="rounded-full px-2 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)' }}
            >
              {count}
            </span>
          </div>
        </MobileCard>
      ))}
    </div>
  ),
}
