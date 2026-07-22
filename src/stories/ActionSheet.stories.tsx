import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionSheet } from '@/components/mobile/action-sheet'
import { Button } from '@/components/ui/button'
import { Share2, Copy, Download, Trash2, Edit, Move, Star, Link, Mail } from 'lucide-react'

const meta: Meta<typeof ActionSheet> = {
  title: 'Mobile/ActionSheet',
  component: ActionSheet,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sheet de acciones al estilo iOS. Lista de opciones con variante destructiva y botón de cancelar.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Action sheet básico con opciones de compartir, copiar y descargar.' } },
  },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)}>Abrir Action Sheet</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          items={[
            { label: 'Compartir', icon: Share2, onPress: () => {} },
            { label: 'Copiar enlace', icon: Copy, onPress: () => {} },
            { label: 'Descargar', icon: Download, onPress: () => {} },
          ]}
        />
      </div>
    )
  },
}

export const WithTitle: Story = {
  parameters: {
    docs: { description: { story: 'Action sheet con título y descripción en el header.' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Archivo: propuesta.pdf"
          description="Tamaño: 2.4 MB · Modificado ayer"
          items={[
            { label: 'Compartir', icon: Share2, onPress: () => {} },
            { label: 'Editar', icon: Edit, onPress: () => {} },
            { label: 'Mover', icon: Move, onPress: () => {} },
            { label: 'Copiar enlace', icon: Link, onPress: () => {} },
          ]}
        />
      </div>
    )
  },
}

export const WithDestructive: Story = {
  parameters: {
    docs: { description: { story: 'Acción destructiva al final — color rojo (var(--destructive)).' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Gestionar elemento"
          items={[
            { label: 'Compartir', icon: Share2, onPress: () => {} },
            { label: 'Favorito', icon: Star, onPress: () => {} },
            { label: 'Enviar por email', icon: Mail, onPress: () => {} },
            { label: 'Eliminar', icon: Trash2, variant: 'destructive', onPress: () => {} },
          ]}
        />
      </div>
    )
  },
}

export const ManyOptions: Story = {
  parameters: {
    docs: { description: { story: 'Lista larga de opciones — el sheet permite scroll interno.' } },
  },
  render: () => {
    const [open, setOpen] = useState(true)
    return (
      <div className="flex h-screen items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <Button onClick={() => setOpen(true)} variant="outline">Reabrir</Button>
        <ActionSheet
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Todas las acciones"
          cancelLabel="Cerrar"
          items={[
            { label: 'Compartir', icon: Share2, onPress: () => {} },
            { label: 'Copiar enlace', icon: Copy, onPress: () => {} },
            { label: 'Editar nombre', icon: Edit, onPress: () => {} },
            { label: 'Mover a carpeta', icon: Move, onPress: () => {} },
            { label: 'Añadir a favoritos', icon: Star, onPress: () => {} },
            { label: 'Enviar por email', icon: Mail, onPress: () => {} },
            { label: 'Descargar', icon: Download, onPress: () => {} },
            { label: 'Eliminar permanentemente', icon: Trash2, variant: 'destructive', onPress: () => {} },
          ]}
        />
      </div>
    )
  },
}
