# ActionSheet — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Feedback
- **Estado:** Stable
- **Archivo:** `src/components/mobile/action-sheet.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/ActionSheet

## Overview

### Cuándo usar
- Presentar 3 o más acciones mutuamente excluyentes sobre un objeto
- Confirmar una acción destructiva con contexto de cancelación claro
- Menú contextual tras un tap prolongado (long press)
- Alternativa al menú de tres puntos cuando el contexto es claro

### Cuándo NO usar
- Menos de 3 acciones simples → usar `HapticButton` o acciones inline
- Contenido con formularios o inputs → usar `BottomSheet`
- Navegación principal → usar `BottomNav`
- Más de 8 opciones → usar una pantalla de selección dedicada

### Diferencia con el equivalente desktop
En desktop se usa `DropdownMenu` anclado al elemento que lo activa. El `ActionSheet` no se ancla; siempre aparece desde el borde inferior con ancho completo y no admite submenús.

## Touch & Haptics
- **Touch target mínimo:** 44px de alto por acción; padding interno mínimo `py-3`
- **Patrón de haptic feedback:** `impact(medium)` al abrir; `impact(light)` al seleccionar una acción no destructiva; `notification(warning)` al seleccionar una acción destructiva
- **Gestos soportados:**
  - Tap en acción → ejecuta y cierra
  - Tap en "Cancelar" → cierra sin acción
  - Tap en overlay → cierra sin acción
  - Swipe down en el sheet → cierra sin acción

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo panel | `--card` |
| Texto acción | `--foreground` |
| Texto acción destructiva | `--destructive` |
| Separador | `--border` |
| Overlay | `--foreground` (opacity 40%) |
| Border radius superior | `rounded-t-xl` → 16px |
| Fondo botón Cancelar | `--card` (separado del grupo) |
| Texto botón Cancelar | `--foreground` |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Lista de acciones + botón Cancelar separado |
| `with-title` | Título y descripción opcionales sobre las acciones |
| `destructive` | La primera acción aparece en `--destructive`; las demás en `--foreground` |

| Estado | Comportamiento |
|--------|---------------|
| Closed | No renderizado (unmounted) |
| Opening | Slide-up desde borde inferior |
| Open | Estático, esperando tap del usuario |
| Action pressed | Fondo de la fila va a `--accent` durante 100ms |
| Closing | Slide-down al seleccionar acción o cancelar |

## Accesibilidad
- **Roles ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-label="Opciones"` o el título del sheet; cada acción es `<button>`
- **Navegación por teclado:** `Escape` → cierra; Tab cicla entre acciones; Enter activa la acción enfocada; el botón Cancelar siempre es el último en el orden de Tab
- **VoiceOver / TalkBack:** al abrir, el foco va al título (si existe) o a la primera acción; las acciones destructivas incluyen la palabra "destructivo" o se anuncia `aria-description` de consecuencia

## Animaciones
- **Entrada:** `translateY(100%) → translateY(0)` + overlay fade-in, duración 280ms, easing `cubic-bezier(0.32, 0.72, 0, 1)`
- **Salida:** `translateY(0) → translateY(100%)` + overlay fade-out, duración 220ms, easing `ease-in`
- **Pressed:** fondo de la fila con `transition-colors duration-100`
- **Reducción de movimiento:** solo fade del overlay; el panel aparece sin translación

## Code example

```tsx
// ✅ Correcto — con título y acción destructiva
<ActionSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Opciones de publicación"
  actions={[
    { label: "Editar publicación", icon: Edit, onClick: handleEdit },
    { label: "Compartir enlace", icon: Share, onClick: handleShare },
    { label: "Eliminar publicación", icon: Trash, variant: "destructive", onClick: handleDelete },
  ]}
/>

// Sin título
<ActionSheet
  open={open}
  onClose={() => setOpen(false)}
  actions={[
    { label: "Cámara", icon: Camera, onClick: openCamera },
    { label: "Galería", icon: Image, onClick: openGallery },
    { label: "Archivo", icon: File, onClick: openFiles },
  ]}
/>

// ❌ Incorrecto
<ActionSheet
  open={open}
  onClose={() => setOpen(false)}
  actions={[
    { label: "OK" },  // una sola acción — usar HapticButton inline
  ]}
/>

// No incluir inputs dentro de ActionSheet
<ActionSheet open={open} onClose={() => setOpen(false)} actions={[]}>
  <Input placeholder="Buscar..." />  {/* usar BottomSheet para esto */}
</ActionSheet>
```

## Cross-references
- **Equivalente desktop:** `DropdownMenu` (`src/components/ui/dropdown-menu.tsx`)
- `BottomSheet` — cuando las opciones requieren formulario o contenido complejo
- `HapticButton` — para 1-2 acciones inline sin necesidad de sheet
- `SwipeList` — acciones reveladas por gesto en lugar de tap en botón
