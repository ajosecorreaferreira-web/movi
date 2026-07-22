# FullScreenStep — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Layout
- **Estado:** Stable
- **Archivo:** `src/components/mobile/full-screen-step.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/FullScreenStep

## Overview

### Cuándo usar
- Flujos de onboarding paso a paso
- Wizards de configuración inicial (múltiples pasos)
- Formularios que requieren toda la atención del usuario
- Checkout, creación de cuenta, KYC y flujos similares de 2 a 8 pasos

### Cuándo NO usar
- Una sola pantalla sin secuencia → usar un layout de página normal
- Flujos con más de 8 pasos → considerar dividir en sub-flujos o usar `BottomSheet` para pasos opcionales
- Contenido informativo sin acción requerida → usar una pantalla de detalle estándar
- Acciones rápidas o confirmaciones simples → usar `ActionSheet` o `BottomSheet`

### Diferencia con el equivalente desktop
En desktop los wizards de múltiples pasos suelen usar un `Stepper` horizontal visible y un layout de dos columnas (sidebar de progreso + contenido). El `FullScreenStep` ocupa toda la pantalla, usa una barra de progreso lineal en la parte superior y oculta toda la navegación global (BottomNav, MobileHeader global).

## Touch & Haptics
- **Touch target mínimo:** 44×44px para el botón de retroceso y el botón CTA principal
- **Patrón de haptic feedback:**
  - `impact(light)` al avanzar al siguiente paso
  - `impact(medium)` al completar el flujo (último paso)
  - `notification(success)` en la pantalla de confirmación final
- **Gestos soportados:**
  - Swipe right → retrocede al paso anterior (con confirmación si hay datos ingresados)
  - Tap en botón "Siguiente" → avanza al siguiente paso
  - Tap en botón "Atrás" → retrocede; si es el primer paso, confirma salida del flujo

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo pantalla | `--background` |
| Título del paso | `--foreground` |
| Descripción del paso | `--muted-foreground` |
| Barra de progreso (fondo) | `--muted` |
| Barra de progreso (fill) | `--primary` |
| Botón siguiente | `--primary` / `--primary-foreground` |
| Botón atrás | ghost (`--foreground`) |
| Padding horizontal | `px-6` (24px) |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Progreso lineal superior, contenido centrado, CTA inferior |
| `with-illustration` | Imagen o ilustración en la mitad superior; contenido en la inferior |
| `form` | Optimizado para inputs; el CTA se mueve sobre el teclado virtual |

| Estado | Comportamiento |
|--------|---------------|
| Paso activo | Contenido visible, barra de progreso actualizada |
| Transición forward | Contenido sale a la izquierda, entra nuevo desde la derecha |
| Transición backward | Contenido sale a la derecha, entra anterior desde la izquierda |
| Validando | Botón "Siguiente" en estado loading mientras se valida |
| Error de paso | Campo inválido resaltado, botón "Siguiente" deshabilitado |
| Completado | Animación de éxito, redirige o cierra el flujo |

## Accesibilidad
- **Roles ARIA:** el wrapper es `role="main"`; el indicador de progreso es `<progress value={step} max={totalSteps} aria-label="Paso X de Y">`; el título del paso es `<h1>`
- **Navegación por teclado:** Tab entre campos del formulario; Enter avanza si el paso es válido; `Escape` solicita confirmación de salida
- **VoiceOver / TalkBack:** al cambiar de paso, anunciar "Paso X de Y: [título del paso]" con `aria-live="polite"`; los errores de validación usan `aria-live="assertive"`

## Animaciones
- **Avance (forward):** contenido actual `translateX(0) → translateX(-100%)`, nuevo contenido `translateX(100%) → translateX(0)`, ambos simultáneos; duración 300ms, easing `cubic-bezier(0.4, 0, 0.2, 1)`
- **Retroceso (backward):** contenido actual `translateX(0) → translateX(100%)`, anterior `translateX(-100%) → translateX(0)`; misma duración
- **Progreso:** barra de progreso `transition-width duration-400 ease-out`
- **Reducción de movimiento:** sin translación lateral; fade in/out del contenido; barra de progreso sin transición

## Code example

```tsx
// ✅ Correcto
<FullScreenStep
  steps={[
    {
      id: "nombre",
      title: "¿Cómo te llamas?",
      description: "Así te identificaremos en la app",
      content: <NombreStep />,
    },
    {
      id: "email",
      title: "Tu correo electrónico",
      content: <EmailStep />,
    },
    {
      id: "confirmacion",
      title: "Todo listo",
      variant: "confirmation",
      content: <ConfirmacionStep />,
    },
  ]}
  onComplete={handleComplete}
  onExit={handleExit}
/>

// ❌ Incorrecto
<FullScreenStep
  steps={[
    { id: "unico", title: "Solo un paso", content: <PasoUnico /> }
    // un único paso — usar layout de página normal
  ]}
  onComplete={handleComplete}
/>

// No mezclar FullScreenStep con BottomNav visible
<>
  <FullScreenStep steps={steps} onComplete={done} />
  <BottomNav />  {/* ocultar el BottomNav durante el flujo */}
</>
```

## Cross-references
- **Equivalente desktop:** `Stepper` horizontal + layout de dos columnas (ver `docs/COMPONENTS-BASE.md`)
- `HapticButton` — para los botones de navegación entre pasos
- `BottomSheet` — para pasos opcionales o secundarios dentro del flujo
- `MobileToast` — para errores no bloqueantes durante el flujo
