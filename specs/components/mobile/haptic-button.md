# HapticButton — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Input
- **Estado:** Stable
- **Archivo:** `src/components/mobile/haptic-button.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/HapticButton

## Overview

### Cuándo usar
- Toda acción primaria o secundaria en contexto mobile que se beneficia de feedback táctil
- Botones CTA dentro de `BottomSheet`, `FullScreenStep` o `ActionSheet`
- Acciones de alta importancia donde el feedback táctil refuerza la acción realizada
- Reemplazo directo de `Button` cuando la plataforma es mobile

### Cuándo NO usar
- Desktop o entornos sin soporte de Vibration API → la API no tiene efecto pero el componente funciona sin error
- Links de navegación → usar `<a>` o `<Link>` con `HapticButton asChild`
- Botones de solo icono en el `MobileHeader` donde el haptic sería intrusivo → evaluar caso a caso

### Diferencia con el equivalente desktop
`HapticButton` extiende `Button` con tres capas adicionales: haptic feedback vía `navigator.vibrate()` o la API nativa del puente (React Native Web), escala de pressed state optimizada para touch, y touch targets garantizados de 44px. En desktop, `Button` no tiene ninguna de estas capas.

## Touch & Haptics
- **Touch target mínimo:** 44×44px; si el botón es más pequeño visualmente, se expande el área táctil con padding negativo invisible
- **Patrón de haptic feedback:**
  - `impact(light)` para variantes `outline`, `ghost`, `secondary`
  - `impact(medium)` para variante `default` (primario)
  - `impact(heavy)` para variante `destructive`
  - `notification(success)` para acciones de confirmación completadas
  - `notification(warning)` para acciones de advertencia
- **Gestos soportados:**
  - Tap → ejecuta `onClick` + haptic
  - Long press (500ms) → dispara `onLongPress` si está configurado, con `impact(medium)`

## Tokens usados
Los mismos tokens que `Button`:

| Propiedad | Token |
|-----------|-------|
| Fondo default | `--primary` |
| Texto default | `--primary-foreground` |
| Fondo secondary | `--secondary` |
| Texto secondary | `--secondary-foreground` |
| Fondo outline (hover/pressed) | `--accent` |
| Borde outline | `--input` |
| Fondo destructive | `--destructive` |
| Texto destructive | `--destructive-foreground` |
| Focus ring | `--ring` |
| Border radius | `rounded-md` → `--radius` |

| Estado touch | Valor |
|-------------|-------|
| Pressed scale | `scale(0.97)` |
| Pressed transition | `transform duration-75 ease-in` |
| Release transition | `transform duration-150 ease-out` |

## Variantes y estados

Hereda todas las variantes de `Button`: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`.

| Estado adicional | Comportamiento |
|-----------------|---------------|
| `pressing` | `scale(0.97)` aplicado en `touchstart`; haptic disparado |
| `releasing` | Vuelve a `scale(1)` en `touchend`/`touchcancel` |
| `long-pressing` | Activa `onLongPress` a los 500ms si el dedo no se movió |
| `disabled` | `opacity-50`, sin haptic, `pointer-events-none` |

## Accesibilidad
- **Roles ARIA:** idéntico a `Button` — `role="button"` implícito en `<button>`; `aria-disabled` cuando deshabilitado
- **Navegación por teclado:** Enter y Space activan el botón; el haptic no se dispara en teclado (solo en touch)
- **VoiceOver / TalkBack:** hereda los mismos requisitos de `Button`; el `aria-label` es obligatorio para variantes de solo icono

## Animaciones
- **Pressed:** `transform: scale(0.97)` en `touchstart`, duración 75ms `ease-in`
- **Release:** `transform: scale(1)` en `touchend`, duración 150ms `ease-out`
- **Reducción de movimiento:** sin animación de escala; el haptic se respeta igualmente (es táctil, no visual)

## Code example

```tsx
// ✅ Correcto — CTA principal con haptic medium
<HapticButton variant="default" className="w-full">
  Confirmar pedido
</HapticButton>

// Acción destructiva con haptic heavy
<HapticButton variant="destructive" haptic="heavy">
  <Trash size={16} aria-hidden />
  Eliminar cuenta
</HapticButton>

// Con long press
<HapticButton
  variant="outline"
  onLongPress={() => openContextMenu(item)}
>
  {item.name}
</HapticButton>

// Solo icono — con aria-label obligatorio
<HapticButton variant="ghost" size="icon" aria-label="Compartir">
  <Share size={16} aria-hidden />
</HapticButton>

// ❌ Incorrecto
<HapticButton variant="default">
  <HapticButton variant="outline">Anidado</HapticButton>
</HapticButton>

// Sin aria-label en icono
<HapticButton variant="ghost" size="icon">
  <Settings size={16} />  {/* inaccesible */}
</HapticButton>
```

## Cross-references
- **Equivalente desktop:** `Button` (`src/components/ui/button.tsx`)
- `ActionSheet` — usa `HapticButton` internamente para cada acción
- `BottomSheet` — el footer del sheet usa `HapticButton` para el CTA
- `FullScreenStep` — los botones de navegación entre pasos usan `HapticButton`
