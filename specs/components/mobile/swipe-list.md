# SwipeList — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Input
- **Estado:** Stable
- **Archivo:** `src/components/mobile/swipe-list.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/SwipeList

## Overview

### Cuándo usar
- Listas donde cada item tiene acciones rápidas de alta frecuencia (archivar, eliminar, marcar)
- Gestión de mensajes, emails, notificaciones o tareas
- Cuando las acciones del item no justifican una pantalla de detalle adicional
- Máximo 2 acciones por lado (izquierda / derecha)

### Cuándo NO usar
- Listas de solo lectura sin acciones → usar una `<ul>` simple o `MobileCard`
- Más de 2 acciones por item → usar un menú contextual o `ActionSheet`
- Items con acciones destructivas sin confirmación → siempre requerir confirmación al swipe completo
- Desktop → usar columna de acciones en `DataTable`

### Diferencia con el equivalente desktop
En desktop las acciones de fila se muestran como botones inline o al hover. El `SwipeList` expone esas acciones mediante gesto horizontal, ocultándolas por defecto para maximizar la densidad de información.

## Touch & Haptics
- **Touch target mínimo:** 44×44px de alto por item; las acciones reveladas tienen mínimo 64px de ancho
- **Patrón de haptic feedback:**
  - `impact(light)` cuando la acción izquierda o derecha se revela por primera vez
  - `impact(medium)` al alcanzar el umbral de swipe completo (acción inmediata)
  - `notification(warning)` si la acción completa es destructiva
- **Gestos soportados:**
  - Swipe izquierda → revela acciones del lado derecho (ej. eliminar)
  - Swipe derecha → revela acciones del lado izquierdo (ej. archivar)
  - Swipe completo (> 75% del ancho) → ejecuta la acción principal del lado
  - Tap fuera de las acciones → colapsa el item abierto
  - Scroll vertical → colapsa cualquier item abierto

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo item | `--card` |
| Texto item | `--card-foreground` |
| Fondo acción destructiva | `--destructive` |
| Texto acción destructiva | `--destructive-foreground` |
| Fondo acción secundaria | `--secondary` |
| Texto acción secundaria | `--secondary-foreground` |
| Borde separador | `--border` |
| Fondo al pressed | `--accent` |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Acciones solo en un lado (derecha) |
| `bilateral` | Acciones en ambos lados |
| `single-action` | Una sola acción al swipe completo (sin revelar botón) |

| Estado | Comportamiento |
|--------|---------------|
| Cerrado | Acciones ocultas, solo visible el contenido del item |
| Revelando | Traducción parcial del item siguiendo el dedo |
| Revelado | Item desplazado mostrando acciones; umbral sin pasar |
| Umbral superado | Fondo de acción se expande al ancho completo |
| Ejecutando | La acción se dispara; item sale con animación |
| Colapsando | Regresa a posición cerrada con spring |

## Accesibilidad
- **Roles ARIA:** la lista es `role="list"`; cada item es `role="listitem"`; las acciones son `<button>` con `aria-label` descriptivo
- **Navegación por teclado:** las acciones están disponibles mediante menú contextual accesible (botón `···` visible al foco) ya que el swipe no es accesible por teclado
- **VoiceOver / TalkBack:** VoiceOver en iOS expone las acciones como "Acciones personalizadas" (custom actions); TalkBack las expone mediante menú de accesibilidad; nunca depender solo del gesto

## Animaciones
- **Revelado:** `translateX` en tiempo real siguiendo `touch.clientX` con factor 1:1; sin easing durante el drag
- **Spring al soltar:** si no supera el umbral, regresa a 0 con `spring(stiffness: 400, damping: 40)`; duración efectiva ~200ms
- **Ejecución de acción:** item sale con `translateX(±120%)` en 250ms `ease-in`; el espacio colapsa con animación de altura 200ms
- **Reducción de movimiento:** sin translación; las acciones aparecen/desaparecen con fade

## Code example

```tsx
// ✅ Correcto
<SwipeList>
  {items.map((item) => (
    <SwipeListItem
      key={item.id}
      rightActions={[
        {
          icon: Trash,
          label: "Eliminar",
          variant: "destructive",
          onAction: () => handleDelete(item.id),
        },
      ]}
      leftActions={[
        {
          icon: Archive,
          label: "Archivar",
          onAction: () => handleArchive(item.id),
        },
      ]}
    >
      <NotificationRow notification={item} />
    </SwipeListItem>
  ))}
</SwipeList>

// ❌ Incorrecto
<SwipeList>
  <SwipeListItem
    rightActions={[
      { icon: Trash, label: "Eliminar", onAction: deleteImmediately },
      { icon: Edit, label: "Editar", onAction: edit },
      { icon: Share, label: "Compartir", onAction: share },
      // más de 2 acciones por lado — supera el espacio disponible
    ]}
  >
    <ItemContent />
  </SwipeListItem>
</SwipeList>
```

## Cross-references
- **Equivalente desktop:** `DataTable` con columna de acciones (`src/components/ui/datatable.tsx`)
- `ActionSheet` — para más de 2 acciones sobre un item
- `MobileCard` — item sin acciones swipe
- `HapticButton` — patrón de feedback para las acciones reveladas
