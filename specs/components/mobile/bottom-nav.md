# BottomNav — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Navigation
- **Estado:** Stable
- **Archivo:** `src/components/mobile/bottom-nav.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/BottomNav

## Overview

### Cuándo usar
- Navegación principal entre 3 y 5 secciones de la app
- Las secciones son de igual importancia y se visitan con frecuencia
- La app tiene un flujo tipo tab (Inicio, Explorar, Notificaciones, Perfil)

### Cuándo NO usar
- Más de 5 destinos → usar `Sidebar` o menú drawer
- Menos de 3 destinos → usar un `MobileHeader` con acciones
- Flujos lineales paso a paso → usar `FullScreenStep`
- En desktop → usar `Sidebar`

### Diferencia con el equivalente desktop
El desktop usa `Sidebar` vertical en el lado izquierdo. El `BottomNav` es horizontal, fijo al borde inferior de la pantalla y hace uso de la zona segura inferior del dispositivo (safe area inset).

## Touch & Haptics
- **Touch target mínimo:** 44×44px por cada item de navegación; el ancho se distribuye equitativamente entre items
- **Patrón de haptic feedback:** `selection()` al cambiar de tab activo
- **Gestos soportados:**
  - Tap en item → navega a la sección
  - Tap en item activo → vuelve al top de la lista / scroll to top

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo | `--background` |
| Borde superior | `--border` |
| Icono activo | `--primary` |
| Etiqueta activa | `--primary` |
| Icono inactivo | `--muted-foreground` |
| Etiqueta inactiva | `--muted-foreground` |
| Indicador activo (dot/pill) | `--primary` |
| Badge de notificación | `--destructive` |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Icono + etiqueta de texto debajo |
| `icon-only` | Solo icono, sin etiqueta (máximo 5 items) |
| `pill` | Item activo destacado con fondo pill `--accent` |

| Estado de item | Comportamiento visual |
|---------------|----------------------|
| Inactivo | Icono y label en `--muted-foreground` |
| Activo | Icono y label en `--primary`; indicador visible |
| Con badge | Dot rojo `--destructive` en esquina del icono |
| Pressed | `opacity-70` durante 100ms, sin hover persistente |

## Accesibilidad
- **Roles ARIA:** `role="navigation"` en el wrapper; cada item es `role="link"` o `<a>`; item activo tiene `aria-current="page"`
- **Navegación por teclado:** Tab cicla entre items; Enter activa el item enfocado
- **VoiceOver / TalkBack:** cada item anuncia "Nombre, Tab X de Y"; el badge anuncia "X notificaciones" si presente; el item activo incluye "seleccionado"

## Animaciones
- **Cambio de tab:** el indicador activo (dot o pill) se traslada con `transition-all duration-200 ease-out`
- **Badge de notificación:** aparece con `scale(0) → scale(1)`, duración 150ms, `ease-out`
- **Reducción de movimiento:** sin transición en el indicador; badge sin escala

## Code example

```tsx
// ✅ Correcto
<BottomNav>
  <BottomNavItem href="/home" icon={Home} label="Inicio" />
  <BottomNavItem href="/explore" icon={Compass} label="Explorar" />
  <BottomNavItem href="/notifications" icon={Bell} label="Avisos" badge={3} />
  <BottomNavItem href="/profile" icon={User} label="Perfil" />
</BottomNav>

// Variante pill
<BottomNav variant="pill">
  <BottomNavItem href="/home" icon={Home} label="Inicio" />
  <BottomNavItem href="/search" icon={Search} label="Buscar" />
  <BottomNavItem href="/saved" icon={Bookmark} label="Guardado" />
  <BottomNavItem href="/account" icon={User} label="Cuenta" />
</BottomNav>

// ❌ Incorrecto
<BottomNav>
  <BottomNavItem icon={Home} label="Inicio" />
  <BottomNavItem icon={Search} label="Buscar" />
  {/* solo 2 items — demasiado pocos para BottomNav */}
</BottomNav>

<BottomNav>
  {/* 6 items — supera el máximo recomendado */}
  <BottomNavItem icon={Home} label="Inicio" />
  <BottomNavItem icon={Search} label="Buscar" />
  <BottomNavItem icon={Bell} label="Avisos" />
  <BottomNavItem icon={Bookmark} label="Guardado" />
  <BottomNavItem icon={Settings} label="Config" />
  <BottomNavItem icon={User} label="Perfil" />
</BottomNav>
```

## Cross-references
- **Equivalente desktop:** `Sidebar` (`src/components/ui/sidebar.tsx`)
- `MobileHeader` — complemento para el título y acciones de cada sección
- `HapticButton` — patrón de feedback táctil que aplica a los items
- `MobileToast` — notificaciones que no requieren badge persistente
