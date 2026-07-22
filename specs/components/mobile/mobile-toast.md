# MobileToast — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Feedback
- **Estado:** Stable
- **Archivo:** `src/components/mobile/mobile-toast.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/MobileToast

## Overview

### Cuándo usar
- Confirmaciones de acciones completadas (guardado, envío, copia)
- Errores no bloqueantes que no requieren acción del usuario
- Notificaciones de sistema breves (conexión perdida, sync completado)
- Mensajes con una acción opcional de deshacer (`undo`)

### Cuándo NO usar
- Errores que requieren acción del usuario → usar un `Alert` inline o `BottomSheet`
- Confirmaciones de acciones destructivas → usar `ActionSheet` con confirmación
- Mensajes que el usuario debe leer completamente → usar `Dialog` o `BottomSheet`
- Más de un toast simultáneo → apilar en cola; nunca mostrar dos a la vez

### Diferencia con el equivalente desktop
El desktop usa `Sonner` / `Toaster` anclado a la esquina inferior derecha con ancho fijo (~356px). El `MobileToast` se ancla al borde inferior de la pantalla (sobre el `BottomNav` si existe), ocupa el ancho completo con márgenes, y desaparece hacia abajo en lugar de desvanecerse lateralmente.

## Touch & Haptics
- **Touch target mínimo:** 44×44px para el botón de acción opcional y el botón de cierre
- **Patrón de haptic feedback:**
  - `notification(success)` para toasts de tipo `success`
  - `notification(error)` para toasts de tipo `error`
  - `impact(light)` para toasts de tipo `info` o `default`
  - `notification(warning)` para toasts de tipo `warning`
- **Gestos soportados:**
  - Swipe down → descarta el toast inmediatamente
  - Tap en botón de acción → ejecuta la acción y cierra
  - Tap en botón de cierre (X) → cierra sin acción

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo default | `--foreground` |
| Texto default | `--background` |
| Fondo success | `--primary` |
| Texto success | `--primary-foreground` |
| Fondo error | `--destructive` |
| Texto error | `--destructive-foreground` |
| Fondo warning | `--accent` |
| Texto warning | `--accent-foreground` |
| Border radius | `rounded-xl` → 16px |
| Sombra | `shadow-lg` |
| Margin bottom (sobre BottomNav) | 72px |
| Margin lateral | `mx-4` (16px cada lado) |

## Variantes y estados

| Variante | Cuándo usar |
|----------|-------------|
| `default` | Mensajes neutros, información general |
| `success` | Acción completada satisfactoriamente |
| `error` | Error no bloqueante |
| `warning` | Advertencia que no requiere acción inmediata |
| `with-action` | Incluye botón de acción (ej. "Deshacer") |

| Estado | Comportamiento |
|--------|---------------|
| Entering | Slide-up desde el borde inferior |
| Visible | Estático; timer de auto-dismiss corriendo |
| Hover / Focus | Timer pausado mientras el foco está en el toast |
| Dismissing (swipe) | Sigue el dedo hacia abajo con factor 1:1 |
| Auto-dismiss | Slide-down + fade-out al expirar el timer |

**Tiempos de auto-dismiss:**
- `default` / `info`: 3000ms
- `success`: 2500ms
- `warning`: 4000ms
- `error`: 5000ms (o persistente si tiene acción requerida)

## Accesibilidad
- **Roles ARIA:** `role="status"` para toasts informativos; `role="alert"` para errores y advertencias; `aria-live="polite"` para success/info; `aria-live="assertive"` para error
- **Navegación por teclado:** Tab alcanza el botón de acción y el botón de cierre; `Escape` cierra el toast
- **VoiceOver / TalkBack:** el texto del toast se anuncia automáticamente vía `aria-live`; el botón de acción anuncia su etiqueta completa; no depender solo del color para transmitir el tipo

## Animaciones
- **Entrada:** `translateY(100%) → translateY(0)` + `opacity: 0 → 1`, duración 300ms, easing `cubic-bezier(0.32, 0.72, 0, 1)`
- **Salida (auto / botón):** `translateY(0) → translateY(120%)` + `opacity: 1 → 0`, duración 250ms, easing `ease-in`
- **Salida (swipe down):** sigue el dedo sin easing; al soltar, si `> 40px` → slide-down completo; si `< 40px` → spring de regreso
- **Reducción de movimiento:** solo fade; sin translación vertical

## Code example

```tsx
// ✅ Correcto — a través del hook
const { toast } = useMobileToast();

// Toast de éxito
toast.success("Cambios guardados");

// Toast con acción de deshacer
toast.default("Mensaje eliminado", {
  action: {
    label: "Deshacer",
    onClick: () => restoreMessage(id),
  },
});

// Toast de error
toast.error("No se pudo conectar. Revisa tu conexión.");

// ❌ Incorrecto — dos toasts simultáneos
toast.success("Guardado");
toast.error("Error de red");  // mostrar en cola, no simultáneamente

// No usar toast para confirmaciones destructivas
toast.default("¿Eliminar cuenta?", {
  action: { label: "Sí, eliminar", onClick: deleteAccount }
  // usar ActionSheet con confirmación explícita
});
```

## Cross-references
- **Equivalente desktop:** `Sonner` / `Toaster` (ver `docs/COMPONENTS-OVERLAY.md`)
- `ActionSheet` — para mensajes que requieren confirmación
- `BottomSheet` — para errores que requieren acción del usuario
- `PullRefresh` — usa `MobileToast` para notificar resultado del refresh
