import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FullScreenStep } from '@/components/mobile/full-screen-step'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof FullScreenStep> = {
  title: 'Mobile/FullScreenStep',
  component: FullScreenStep,
  tags: ['autodocs'],
  parameters: {
    viewport: { defaultViewport: 'mobile390' },
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pantalla completa de onboarding/wizard con barra de progreso, animación de transición y botón CTA.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Step1: Story = {
  parameters: {
    docs: { description: { story: 'Primer paso del flujo — progreso 1/4.' } },
  },
  render: () => {
    const [step, setStep] = useState(1)
    return (
      <div className="h-screen">
        <FullScreenStep
          currentStep={step}
          totalSteps={4}
          title="Bienvenido a Dusty"
          description="Audita tu producto digital en menos de 48 horas y recibe un roadmap accionable."
          onNext={() => setStep((s) => Math.min(s + 1, 4))}
          nextLabel="Empezar"
        >
          <div className="flex flex-col gap-4">
            <div className="h-40 rounded" style={{ backgroundColor: 'var(--muted)' }} />
            <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
              Conecta tu repositorio o introduce la URL de tu producto.
            </p>
          </div>
        </FullScreenStep>
      </div>
    )
  },
}

export const Step2: Story = {
  parameters: {
    docs: { description: { story: 'Segundo paso — progreso 2/4, con botón volver.' } },
  },
  render: () => {
    const [step, setStep] = useState(2)
    return (
      <div className="h-screen">
        <FullScreenStep
          currentStep={step}
          totalSteps={4}
          title="Tipo de auditoría"
          description="Selecciona qué aspectos quieres analizar."
          onNext={() => setStep((s) => Math.min(s + 1, 4))}
          onBack={() => setStep((s) => Math.max(s - 1, 1))}
          nextLabel="Continuar"
        >
          <div className="flex flex-col gap-3">
            {['Accesibilidad WCAG', 'Deuda técnica', 'Consistencia visual', 'Performance'].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-3 rounded border p-4 cursor-pointer"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
              >
                <input type="checkbox" className="accent-primary" />
                <span className="text-sm" style={{ color: 'var(--foreground)' }}>{opt}</span>
              </label>
            ))}
          </div>
        </FullScreenStep>
      </div>
    )
  },
}

export const Step3WithForm: Story = {
  parameters: {
    docs: { description: { story: 'Tercer paso con formulario — el CTA se desactiva hasta que el campo sea válido.' } },
  },
  render: () => {
    const [step, setStep] = useState(3)
    const [url, setUrl] = useState('')
    return (
      <div className="h-screen">
        <FullScreenStep
          currentStep={step}
          totalSteps={4}
          title="URL del producto"
          description="Introduce la URL de producción de tu app o web."
          onNext={() => setStep((s) => Math.min(s + 1, 4))}
          onBack={() => setStep((s) => Math.max(s - 1, 1))}
          nextLabel="Analizar"
          nextDisabled={!url.startsWith('https://')}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="product-url">URL de producción</Label>
            <Input
              id="product-url"
              placeholder="https://mi-producto.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {url && !url.startsWith('https://') && (
              <p className="text-xs" style={{ color: 'var(--destructive)' }}>
                Debe empezar por https://
              </p>
            )}
          </div>
        </FullScreenStep>
      </div>
    )
  },
}

export const LastStep: Story = {
  parameters: {
    docs: { description: { story: 'Último paso — CTA cambia a "Finalizar" y barra al 100%.' } },
  },
  render: () => {
    const [loading, setLoading] = useState(false)
    const [done, setDone] = useState(false)
    return (
      <div className="h-screen">
        <FullScreenStep
          currentStep={4}
          totalSteps={4}
          title={done ? '¡Auditoría iniciada!' : 'Confirmar y enviar'}
          description={done ? 'Recibirás el informe en menos de 48h.' : 'Revisa el resumen antes de lanzar la auditoría.'}
          onNext={() => {
            setLoading(true)
            setTimeout(() => { setLoading(false); setDone(true) }, 1500)
          }}
          onBack={() => {}}
          nextLabel={done ? 'Ver dashboard' : 'Lanzar auditoría'}
          isLoading={loading}
          nextDisabled={done}
        >
          <div className="flex flex-col gap-3">
            {['URL: https://mi-producto.com', 'Auditoría: Accesibilidad + Deuda', 'Entrega: 48h'].map((line) => (
              <div
                key={line}
                className="flex items-center gap-2 rounded border px-4 py-3"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
              >
                <span className="text-sm" style={{ color: 'var(--foreground)' }}>{line}</span>
              </div>
            ))}
          </div>
        </FullScreenStep>
      </div>
    )
  },
}
