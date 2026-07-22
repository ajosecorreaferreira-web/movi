# BottomSheet — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Feedback
- **Estado:** Stable
- **Archivo:** `src/components/mobile/bottom-sheet.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/BottomSheet

## Overview

### Cuándo usar
- Mostrar opciones adicionales sin abandonar el contexto actual
- Formularios cortos que requieren atención inmediata
- Confirmaciones antes de acciones destructivas
- Paneles de detalles de un item seleccionado
- Filtros y opciones de ordenamiento

### Cuándo NO usar
- Contenido que necesita toda la pantalla → usar `FullScreenStep`
- Listas de acciones mutuamente excluyentes → usar `ActionSheet`
- Mensajes de éxito/error transitorios → usar `MobileToast`
- Navegación principal → usar `BottomNav`

### Diferencia con el equivalente desktop
El desktop usa `Dialog` centrado en pantalla. El `BottomSheet` se ancla al borde inferior, ocupa el ancho completo y responde a gestos de swipe vertical. Su origen de animación es el borde inferior, no el centro.

## Touch & Haptics
- **Touch target mínimo:** 44×44px en el handle de arrastre y en el botón de cierre
- **Patrón de haptic feedback:** `impact(light)` al inicio del drag; `impact(medium)` al snapping a posición
- **Gestos soportados:**
  - Swipe down → cierra el sheet
  - Drag en el handle → reposiciona entre snap points
  - Tap en el overlay → cierra el sheet
  - Scroll interno → se eleva a scroll del contenido cuando llega al top del sheet

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo | `--card` |
| Texto | `--card-foreground` |
| Overlay | `--foreground` (opacity 40%) |
| Handle | `--muted-foreground` |
| Borde superior | `--border` |
| Border radius superior | `rounded-t-xl` → 16px |
| Sombra | `shadow-lg` |
| Focus ring | `--ring` |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Ocupa hasta 60% de la pantalla, scrollable |
| `compact` | Altura fija para contenido corto (≤ 3 items) |
| `full` | Ocupa 90% de la pantalla, con scroll interno |
| `snap` | Dos snap points: 40% y 80% de la pantalla |

| Estado | Comportamiento |
|--------|---------------|
| Closed | No renderizado (unmounted) |
| Opening | Animación slide-up + fade del overlay |
| Open | Posición estable, scroll interno habilitado |
| Dragging | Sigue el dedo con seguimiento 1:1 |
| Closing | Animación slide-down + fade-out overlay |

## Accesibilidad
- **Roles ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apuntando al título
- **Navegación por teclado:** `Escape` cierra el sheet; focus trap activo mientras está abierto; Tab cicla entre elementos interactivos
- **VoiceOver / TalkBack:** El handle anuncia "Desliza hacia abajo para cerrar"; el overlay tiene `aria-label="Cerrar"`; al abrir, el foco salta al primer elemento interactivo

## Animaciones
- **Entrada:** `translateY(100%) → translateY(0)` + overlay `opacity: 0 → 0.4`, duración 300ms, easing `cubic-bezier(0.32, 0.72, 0, 1)`
- **Salida:** `translateY(0) → translateY(100%)` + overlay `opacity: 0.4 → 0`, duración 250ms, easing `ease-in`
- **Drag:** sin transición CSS mientras el usuario arrastra (seguimiento 1:1); al soltar, snap animado 200ms `ease-out`
- **Reducción de movimiento:** si `prefers-reduced-motion`, solo fade del overlay, sin translación

## Code example

```tsx
// ✅ Correcto
<BottomSheet open={open} onClose={() => setOpen(false)}>
  <BottomSheetHandle />
  <BottomSheetHeader>
    <BottomSheetTitle>Opciones de envío</BottomSheetTitle>
  </BottomSheetHeader>
  <BottomSheetContent>
    <ShippingOptions />
  </BottomSheetContent>
  <BottomSheetFooter>
    <Button className="w-full">Confirmar</Button>
  </BottomSheetFooter>
</BottomSheet>

// Con snap points
<BottomSheet variant="snap" snapPoints={[0.4, 0.8]} open={open} onClose={() => setOpen(false)}>
  <BottomSheetHandle />
  <BottomSheetContent>
    <LargeList />
  </BottomSheetContent>
</BottomSheet>

// ❌ Incorrecto
<BottomSheet open={open}>  {/* sin onClose — no se puede cerrar */}
  <BottomSheetContent>...</BottomSheetContent>
</BottomSheet>

<BottomSheet open={open} onClose={close}>
  <BottomSheet>  {/* nunca anidar bottom sheets */}
  </BottomSheet>
</BottomSheet>
```

## Cross-references
- **Equivalente desktop:** `Dialog` (`src/components/ui/dialog.tsx`)
- `ActionSheet` — para listas de acciones sin contenido complejo
- `FullScreenStep` — cuando el contenido necesita toda la pantalla
- `HapticButton` — para botones dentro del footer del sheet
