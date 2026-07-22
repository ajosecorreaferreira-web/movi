# MobileCard — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Layout
- **Estado:** Stable
- **Archivo:** `src/components/mobile/mobile-card.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/MobileCard

## Overview

### Cuándo usar
- Items de lista en grids o feeds móviles
- Tarjetas de entidades (producto, usuario, artículo, tarea)
- Contenido navegable donde toda la tarjeta es el touch target
- Resumen de información con imagen, título y metadatos

### Cuándo NO usar
- Contenido de solo texto sin jerarquía visual clara → usar una lista simple `<ul>`
- Paneles de configuración o formularios → usar `Card` de desktop con layout adaptado
- Cuando la tarjeta contiene múltiples acciones independientes → usar `SwipeList`
- Cards anidadas → nunca anidar `MobileCard` dentro de `MobileCard`

### Diferencia con el equivalente desktop
`Card` desktop usa padding generoso (`p-6`) y radios `rounded-lg`. `MobileCard` tiene padding más compacto (`p-4`), radio `rounded-xl`, mayor énfasis en la imagen o icono líder, y todo el componente es un touch target cuando es navegable. Además, `MobileCard` está optimizado para grids de 1 o 2 columnas, no para layouts de 3+ columnas.

## Touch & Haptics
- **Touch target mínimo:** toda la tarjeta cuando es interactiva (mínimo 44px de alto); si hay acciones internas, cada una tiene mínimo 44×44px
- **Patrón de haptic feedback:** `impact(light)` en el tap de la tarjeta navegable
- **Gestos soportados:**
  - Tap → navega o ejecuta la acción principal de la tarjeta
  - Long press (500ms) → abre `ActionSheet` con acciones contextuales (si `onLongPress` está configurado)
  - Swipe (si está dentro de `SwipeList`) → delegado al componente padre

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo | `--card` |
| Texto principal | `--card-foreground` |
| Texto secundario | `--muted-foreground` |
| Borde | `--border` |
| Border radius | `rounded-xl` → 16px |
| Sombra | `shadow-sm` |
| Fondo pressed | `--accent` |
| Padding | `p-4` (16px) |
| Gap interno | `gap-3` (12px) |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Horizontal: icono/imagen a la izquierda, título y metadatos a la derecha |
| `vertical` | Imagen superior, contenido debajo; para grids de 2 columnas |
| `compact` | Sin imagen, solo icono pequeño; para listas densas |
| `featured` | Imagen grande de fondo con texto superpuesto (overlay oscuro) |

| Estado | Comportamiento visual |
|--------|----------------------|
| Default | Fondo `--card`, borde `--border` |
| Pressed | Fondo `--accent`, escala `scale(0.98)`, duración 75ms |
| Loading | Skeleton de las proporciones de la card |
| Selected | Borde `--primary` 2px, icono de check en esquina superior |
| Disabled | `opacity-50`, sin interacción |

## Accesibilidad
- **Roles ARIA:** si la card es navegable, el elemento raíz es `<a>` o `<button>` con `aria-label` que describe el destino o acción; si es solo contenedor, `<article>` o `<li>`
- **Navegación por teclado:** Tab enfoca la card completa; Enter activa la navegación; las acciones internas (si existen) son accesibles individualmente con Tab
- **VoiceOver / TalkBack:** el `aria-label` de la card interactiva debe incluir el contexto completo ("Ver detalles de [nombre del producto], $29"); no depender solo del contenido visual interno

## Animaciones
- **Pressed:** `transform: scale(0.98)` en `touchstart`, duración 75ms `ease-in`; regresa a `scale(1)` en `touchend`, duración 150ms `ease-out`
- **Skeleton loading:** pulso de opacidad `0.5 → 1 → 0.5`, duración 1500ms, `ease-in-out`, infinito
- **Entrada en lista:** `opacity: 0 → 1` con `translateY(8px → 0)`, escalonado por índice con delay `index * 50ms`
- **Reducción de movimiento:** sin escala al pressed (solo cambio de color); sin stagger en la entrada

## Code example

```tsx
// ✅ Correcto — card navegable
<MobileCard
  href="/products/123"
  image="/img/producto.jpg"
  title="Auriculares Pro"
  description="Cancelación de ruido activa"
  badge="Nuevo"
  meta="$129"
/>

// Variante vertical para grid de 2 columnas
<div className="grid grid-cols-2 gap-3">
  {products.map((p) => (
    <MobileCard
      key={p.id}
      variant="vertical"
      href={`/products/${p.id}`}
      image={p.image}
      title={p.name}
      meta={p.price}
    />
  ))}
</div>

// Card con long press para acciones contextuales
<MobileCard
  title="Proyecto Alpha"
  description="3 tareas pendientes"
  icon={Folder}
  onPress={() => navigateTo(`/projects/${id}`)}
  onLongPress={() => openActionsSheet(id)}
/>

// ❌ Incorrecto
<MobileCard title="Producto">
  <MobileCard title="Variante">  {/* nunca anidar */}
  </MobileCard>
</MobileCard>

// Card interactiva sin aria-label descriptivo
<MobileCard
  href="/products/123"
  title="Ver"  {/* título ambiguo — inaccesible */}
/>
```

## Cross-references
- **Equivalente desktop:** `Card` (`src/components/ui/card.tsx`)
- `SwipeList` — contenedor de `MobileCard` con acciones por gesto
- `HapticButton` — para acciones explícitas dentro de la card
- `Badge` — para estados de la card (nuevo, oferta, agotado)
- `ActionSheet` — para las opciones del long press
