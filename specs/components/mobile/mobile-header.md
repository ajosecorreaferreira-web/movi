# MobileHeader — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Navigation
- **Estado:** Stable
- **Archivo:** `src/components/mobile/mobile-header.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/MobileHeader

## Overview

### Cuándo usar
- Cabecera de cada pantalla de la app mobile
- Mostrar el título de la sección activa
- Alojar acciones contextuales (máximo 2 iconos a la derecha)
- Mostrar el botón de retroceso en flujos de navegación profunda

### Cuándo NO usar
- En modales o `BottomSheet` → usar `BottomSheetHeader`
- En `FullScreenStep` → ese componente tiene su propio header
- En la landing page o páginas de marketing → usar un `<header>` semántico propio
- Cuando la pantalla no necesita título ni acciones

### Diferencia con el equivalente desktop
El desktop no tiene un componente `MobileHeader` equivalente directo; la jerarquía visual se establece con tipografía `h1`/`h2` dentro del layout. El `MobileHeader` es fijo o sticky al top, respeta el safe area superior del dispositivo y tiene una altura estandarizada de 56px.

## Touch & Haptics
- **Touch target mínimo:** 44×44px para el botón de retroceso y para cada acción del lado derecho
- **Patrón de haptic feedback:** sin haptic propio; los botones dentro del header usan `HapticButton`
- **Gestos soportados:**
  - Swipe right desde el borde → navegación atrás (nativo iOS, no implementado en el componente)

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo | `--background` |
| Título | `--foreground` |
| Icono de acciones | `--foreground` |
| Borde inferior | `--border` |
| Fondo al scroll (blur) | `--background` (con `backdrop-blur`) |
| Altura base | 56px |
| Padding horizontal | `px-4` (16px) |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Título centrado, back opcional a la izquierda, acciones a la derecha |
| `large-title` | Título grande debajo del header (estilo iOS), colapsa al hacer scroll |
| `transparent` | Fondo transparente, para pantallas con imagen hero |
| `search` | Reemplaza el título por un `SearchInput` inline |

| Estado | Comportamiento |
|--------|---------------|
| Static | Posición en el flujo del documento |
| Sticky | Fijo al top al hacer scroll, añade sombra sutil |
| Scrolled | En `large-title`, el título grande colapsa al header |
| Transparent → opaque | En `transparent`, fondo aparece al hacer scroll |

## Accesibilidad
- **Roles ARIA:** el elemento raíz es `<header role="banner">`; el título es `<h1>` o `aria-label` si el contenido es solo icono; el botón de retroceso tiene `aria-label="Volver"`
- **Navegación por teclado:** Tab alcanza el botón de retroceso y las acciones; no hay foco en el título si no es interactivo
- **VoiceOver / TalkBack:** el título se anuncia como encabezado de nivel 1; el botón de retroceso anuncia destino si se proporciona (`aria-label="Volver a Inicio"`)

## Animaciones
- **Large title collapse:** el título grande hace `scale(0.85) translateY(-8px)` + `opacity: 0` al hacer scroll, sincronizado con `scrollY`; duración efectiva proporcional a los primeros 60px de scroll
- **Fondo sticky:** `opacity: 0 → 1` del fondo y borde inferior en los primeros 4px de scroll, duración 150ms
- **Reducción de movimiento:** el large title colapsa instantáneamente al primer scroll; sin transición de fondo

## Code example

```tsx
// ✅ Correcto — header con retroceso y acción
<MobileHeader
  title="Detalles del pedido"
  onBack={() => router.back()}
  actions={[
    { icon: Share, label: "Compartir", onClick: handleShare }
  ]}
/>

// Variante large-title
<MobileHeader
  variant="large-title"
  title="Explorar"
  actions={[
    { icon: Bell, label: "Notificaciones", onClick: openNotifications }
  ]}
/>

// Solo título, sin retroceso (pantalla raíz de tab)
<MobileHeader title="Inicio" />

// ❌ Incorrecto
<MobileHeader
  title="Mi pantalla"
  actions={[
    { icon: Edit },    // sin label — inaccesible
    { icon: Share },
    { icon: Delete },  // más de 2 acciones — usar ActionSheet
  ]}
/>

// No usar texto largo sin truncar
<MobileHeader title="Este es un título extremadamente largo que no cabe en la pantalla" />
```

## Cross-references
- **Equivalente desktop:** ninguno directo; ver layouts en `docs/COMPONENTS-BASE.md`
- `BottomNav` — navegación principal que acompaña al header
- `HapticButton` — patrón para los botones de acción del header
- `ActionSheet` — para exponer más de 2 acciones contextuales
- `FullScreenStep` — header integrado para flujos paso a paso
