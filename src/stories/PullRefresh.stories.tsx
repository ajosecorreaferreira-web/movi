import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { PullRefresh } from '@/components/mobile/pull-refresh'

const meta: Meta<typeof PullRefresh> = {
  title: 'Mobile/PullRefresh',
  component: PullRefresh,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pull-to-refresh nativo para mobile. Solo activo en viewport < 640px. Arrastra hacia abajo desde el tope del scroll para refrescar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

function FeedList({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex gap-3 px-4 py-4 border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)' }}
        >
          <div
            className="h-10 w-10 flex-shrink-0 rounded-full"
            style={{ backgroundColor: 'var(--muted)' }}
          />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-3 w-32 rounded" style={{ backgroundColor: 'var(--muted)' }} />
            <div className="h-3 w-full rounded" style={{ backgroundColor: 'var(--muted)' }} />
            <div className="h-3 w-3/4 rounded" style={{ backgroundColor: 'var(--muted)' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export const Idle: Story = {
  parameters: {
    docs: { description: { story: 'Estado en reposo — arrastra hacia abajo para iniciar el refresh (solo táctil en mobile).' } },
  },
  render: () => (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Feed</p>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Arrastra hacia abajo para refrescar</p>
      </div>
      <PullRefresh onRefresh={() => new Promise((r) => setTimeout(r, 1500))}>
        <FeedList count={8} />
      </PullRefresh>
    </div>
  ),
}

export const Pulling: Story = {
  parameters: {
    docs: { description: { story: 'Estado visual al iniciar el arrastre — el indicador aparece en la parte superior.' } },
  },
  render: () => (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Pulling...</p>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Arrastrando — sin superar el umbral aún</p>
      </div>
      <PullRefresh onRefresh={() => new Promise((r) => setTimeout(r, 1500))}>
        <FeedList count={8} />
      </PullRefresh>
    </div>
  ),
}

export const Ready: Story = {
  parameters: {
    docs: { description: { story: 'Umbral superado — suelta para confirmar refresh (haptic medium).' } },
  },
  render: () => (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Ready to refresh</p>
        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Supera los 80px para disparar refresh</p>
      </div>
      <PullRefresh threshold={80} onRefresh={() => new Promise((r) => setTimeout(r, 1500))}>
        <FeedList count={8} />
      </PullRefresh>
    </div>
  ),
}

export const Refreshing: Story = {
  parameters: {
    docs: { description: { story: 'Estado de carga activo — spinner animado en la parte superior.' } },
  },
  render: () => {
    const [refreshCount, setRefreshCount] = useState(0)
    return (
      <div className="h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Feed {refreshCount > 0 ? `(refrescado ${refreshCount}×)` : ''}
          </p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Pull-to-refresh con delay de 1.5s</p>
        </div>
        <PullRefresh
          onRefresh={() =>
            new Promise((r) =>
              setTimeout(() => { setRefreshCount((c) => c + 1); r() }, 1500)
            )
          }
        >
          <FeedList count={8} />
        </PullRefresh>
      </div>
    )
  },
}

export const Completed: Story = {
  parameters: {
    docs: { description: { story: 'Refresh completado — contenido actualizado, indicador desaparece.' } },
  },
  render: () => {
    const [items, setItems] = useState(5)
    return (
      <div className="h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Feed — {items} elementos</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Tras refresh, añade nuevos elementos</p>
        </div>
        <PullRefresh
          onRefresh={() =>
            new Promise((r) =>
              setTimeout(() => { setItems((n) => n + 3); r() }, 1200)
            )
          }
        >
          <FeedList count={items} />
        </PullRefresh>
      </div>
    )
  },
}
