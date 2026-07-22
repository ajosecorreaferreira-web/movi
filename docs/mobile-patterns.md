# mobile-patterns.md — Patrones Mobile-First

**Versión:** 1.0  
**Parte del:** DS Generator — Dusty  
**Fecha:** Junio 2026

---

## Por qué mobile-first es una filosofía, no solo CSS responsive

Mobile-first no significa "diseña en pequeño y escala hacia arriba". Significa que los patrones de interacción, la jerarquía de información y los componentes se diseñan pensando en el contexto mobile primero — y luego se adaptan al desktop, no al revés.

Un usuario en mobile está en movimiento, con una mano, con distracciones, con tiempo limitado. Sus expectativas vienen de apps nativas — iOS y Android. Si tu web app no se siente nativa, la abandona.

---

## Los 5 principios del diseño mobile-first

### 1. Una acción por pantalla
Mobile no es desktop comprimido. Cada pantalla tiene un propósito claro y una acción principal. Si tienes más de un CTA prominente, algo está mal.

### 2. El pulgar manda
El 75% de los usuarios sostienen el teléfono con una mano y usan el pulgar. La zona cómoda de alcance del pulgar es el tercio inferior de la pantalla. Los CTAs principales van ahí.

```
┌─────────────┐
│   ░░░░░░░   │  ← zona difícil (requiere reposicionar)
│   ░░░░░░░   │
│   ▓▓▓▓▓▓▓   │  ← zona media (alcanzable)
│   ██████▓   │  ← zona fácil (pulgar natural)
│   ████████  │  ← zona CTA (aquí van los botones principales)
└─────────────┘
```

### 3. Touch targets de 44px mínimo
Apple HIG y Google Material Design coinciden: ningún elemento interactivo puede tener menos de 44px de área táctil. Investigación demuestra que elementos más pequeños producen 25% más errores de tap.

```css
/* Token en el DS */
--touch-target-min: 44px;

/* Aplicación */
.btn { min-height: var(--touch-target-min); }
.nav-item { min-height: var(--touch-target-min); }
.list-item { min-height: var(--touch-target-min); }
```

### 4. Feedback inmediato
En mobile, el usuario no tiene cursor que dé feedback visual del hover. Cada tap necesita respuesta visual inmediata — cambio de color, scale, haptic — antes de que la acción se complete.

```tsx
// Patrón correcto
<button
  className="active:scale-95 transition-transform duration-100"
  onClick={handleAction}
>
```

### 5. Safe areas — respetar el hardware
Los teléfonos modernos tienen notch, dynamic island, home indicator y bordes curvos. El contenido interactivo nunca puede quedar tapado por estos elementos.

```css
/* Siempre en el layout raíz */
padding-top:    env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
padding-left:   env(safe-area-inset-left);
padding-right:  env(safe-area-inset-right);
```

---

## Catálogo de patrones mobile

---

### Patrón 1 — Bottom Navigation

**Cuándo usar:** Navegación entre 3-5 secciones principales de la app. El equivalente mobile del Sidebar desktop.

**Cuándo NO usar:** Cuando hay menos de 3 secciones (usa tabs) o más de 5 (reorganiza la arquitectura).

```
┌─────────────────────────────────────┐
│                                     │
│         Contenido principal         │
│                                     │
├─────┬──────┬──────┬──────┬──────────┤
│  🏠 │  ✈️  │  🧾  │  👤  │          │
│Inicio│Viajes│Gastos│Perfil│          │
├─────┴──────┴──────┴──────┴──────────┤
│      [safe area bottom]             │
└─────────────────────────────────────┘
```

**Especificación:**
- Altura: 64px + safe-area-inset-bottom
- Máximo 5 items
- Item activo: pill indicator encima del icono, color primary
- Iconos: size={24}
- Labels: text-xs
- Fondo: bg-background border-t border-border
- Posición: fixed bottom-0, z-50

**iOS vs Android:**
- iOS: items con label siempre visibles, tab bar estándar
- Android: puede colapsar labels, solo iconos en scroll

---

### Patrón 2 — Bottom Sheet

**Cuándo usar:** Acciones contextuales, formularios cortos, confirmaciones, selección de opciones. El equivalente mobile del Dialog/Modal desktop.

**Cuándo NO usar:** Contenido que requiere mucho scroll (usa pantalla completa). Confirmaciones destructivas importantes (usa Dialog con backdrop más oscuro).

```
┌─────────────────────────────────────┐
│        Backdrop 50% negro           │
│                                     │
│                                     │
├─────────────────────────────────────┤
│          ▬ handle (4px)             │
│                                     │
│         Contenido del sheet         │
│                                     │
│      [safe area bottom]             │
└─────────────────────────────────────┘
```

**Snap points estándar:**
- `[0.9, 0.5, 0]` — casi full, media pantalla, cerrado
- `[0.5, 0]` — media pantalla, cerrado
- `['content', 0]` — altura del contenido, cerrado

**Gestos:**
- Drag hacia abajo → cerrar
- Swipe rápido hacia abajo → cerrar con velocidad
- Tap en backdrop → cerrar
- El handle da affordance visual del drag

---

### Patrón 3 — Action Sheet

**Cuándo usar:** Lista de acciones contextuales sobre un elemento. El equivalente mobile del DropdownMenu desktop.

**Cuándo NO usar:** Cuando hay más de 8 opciones (divide en categorías). Cuando la acción no es contextual (usa Bottom Navigation).

```
┌─────────────────────────────────────┐
│        Backdrop 50% negro           │
├─────────────────────────────────────┤
│  Título opcional                    │
│  Descripción opcional               │
├─────────────────────────────────────┤
│  Opción 1                           │
├─────────────────────────────────────┤
│  Opción 2                           │
├─────────────────────────────────────┤
│  🔴 Eliminar (destructive)          │
├─────────────────────────────────────┤
│                                     │
│  Cancelar (bold, separado)          │
│                                     │
└─────────────────────────────────────┘
```

**Reglas:**
- Items: mínimo 56px de altura
- Cancelar: siempre al final, separado visualmente, font-weight bold
- Destructive: color text-destructive, puede tener separador
- Tap en item: haptic light + ejecutar + cerrar
- Tap en cancelar: haptic light + cerrar sin acción

---

### Patrón 4 — Swipe List

**Cuándo usar:** Listas donde el usuario hace acciones frecuentes sobre items (archivar, eliminar, aprobar). El equivalente mobile del hover + botones desktop.

**Cuándo NO usar:** Listas de solo lectura. Cuando las acciones son poco frecuentes (usa long press + Action Sheet).

```
Estado normal:
┌─────────────────────────────────────┐
│  Item contenido                 ··· │
└─────────────────────────────────────┘

Swipe izquierda (revelar):
┌─────────────────────────────┬───────┐
│  Item contenido             │ 🗑️   │
└─────────────────────────────┴───────┘

Swipe izquierda completo (ejecutar):
┌─────────────────────────────────────┐
│ ████████████ Eliminando... ████████ │
└─────────────────────────────────────┘
```

**Thresholds:**
- 80px → revelar acciones (haptic light)
- 200px → ejecutar acción primaria (haptic medium)
- Velocity alta → ejecutar sin esperar threshold

**Máximo 2 acciones por lado.** Si necesitas más, usa long press + Action Sheet.

---

### Patrón 5 — Full Screen Step (Wizard mobile)

**Cuándo usar:** Procesos de múltiples pasos donde cada paso requiere información o una decisión. El equivalente mobile de un formulario multi-paso desktop.

**Cuándo NO usar:** Cuando hay un solo paso (usa un formulario normal). Cuando los pasos son opcionales (usa tabs).

```
┌─────────────────────────────────────┐
│ ← Paso 2 de 6                       │
├─────────────────────────────────────┤
│ ████████░░░░░░░░░░░░ 33%            │
├─────────────────────────────────────┤
│                                     │
│  Título del paso                    │
│  Descripción opcional               │
│                                     │
│  [Contenido del paso]               │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  [     Continuar →     ]            │
│  [safe area bottom]                 │
└─────────────────────────────────────┘
```

**Reglas:**
- Progress bar: siempre visible en el top
- Back button: disponible desde el paso 2
- CTA: sticky en el bottom, full-width, con safe area
- Transición entre pasos: slide horizontal con Motion
- El botón "Continuar" está disabled hasta que el paso es válido
- Haptic medium al avanzar, light al volver

---

### Patrón 6 — Pull to Refresh

**Cuándo usar:** Listas y feeds que se actualizan con datos del servidor. El usuario espera este patrón de apps nativas.

**Cuándo NO usar:** Contenido estático. Cuando hay refresh automático en tiempo real.

```
Estado pulling:
┌─────────────────────────────────────┐
│         ↓  Suelta para refrescar    │
│  ┌─────────────────────────────┐   │
│  │  Lista de items...          │   │
```

**Estados:**
1. Idle — lista normal
2. Pulling — indicator aparece (translateY)
3. Ready (>80px) — haptic medium, "suelta para refrescar"
4. Refreshing — spinner animado, lista bloqueada
5. Completed — spinner desaparece, lista actualizada

---

### Patrón 7 — Mobile Header

**Cuándo usar:** Todas las pantallas mobile que no son la home con Bottom Navigation.

```
┌─────────────────────────────────────┐
│  [safe area top]                    │
├─────┬───────────────────────┬───────┤
│  ←  │     Título            │  ···  │
└─────┴───────────────────────┴───────┘
```

**Reglas:**
- Altura: 56px + safe-area-inset-top
- Título: centrado, text-base font-semibold
- Back button: izquierda, ChevronLeft size={24}, mínimo 44px táctil, haptic light
- Acción: derecha, icono o texto corto
- Equilibrio visual: si hay back izquierda y acción derecha, ambas con el mismo ancho
- Sticky: siempre fijo en el top

---

### Patrón 8 — Sticky CTA

**Cuándo usar:** Cuando hay una acción principal que el usuario debe poder ejecutar sin hacer scroll.

```
┌─────────────────────────────────────┐
│                                     │
│         Contenido scrolleable       │
│                                     │
│  ─────────────────────────────────  │
│  [       Acción principal       ]   │
│  [safe area bottom]                 │
└─────────────────────────────────────┘
```

**Reglas:**
- Posición: fixed bottom-0, full-width
- Padding: px-4 pb-[env(safe-area-inset-bottom)] pt-3
- Fondo: bg-background/95 backdrop-blur-sm (para ver que hay contenido debajo)
- El contenido scrolleable tiene padding-bottom igual a la altura del CTA + safe area
- Nunca más de 2 botones en el CTA sticky

---

### Patrón 9 — Mobile Toast

**Cuándo usar:** Confirmaciones de acciones, errores, estados del sistema.

**Diferencia mobile vs desktop:**
- Desktop: bottom-right, 320px de ancho
- Mobile: top-center, full-width con margen 16px

```
Mobile:
┌─────────────────────────────────────┐
│  [safe area top]                    │
│  ┌─────────────────────────────┐   │
│  │ ✅ Gasto registrado          │   │
│  └─────────────────────────────┘   │
```

**Haptics por tipo:**
- success → haptic('success') — [10, 50, 10]
- error → haptic('error') — [30, 20, 30, 20, 30]
- warning → haptic('medium') — [20]
- info → haptic('light') — [10]

---

### Patrón 10 — Long Press Menu

**Cuándo usar:** Acciones secundarias sobre un elemento cuando el swipe ya está ocupado para otra cosa, o cuando hay muchas acciones posibles.

**Implementación:**
```tsx
// 500ms para activar long press
const LONG_PRESS_DELAY = 500

// Al activar: haptic medium + abrir Action Sheet
```

---

## Tokens mobile en src/index.css

Estos tokens son obligatorios en cualquier DS mobile-first:

```css
/* Safe areas */
--safe-area-top:    env(safe-area-inset-top, 0px);
--safe-area-bottom: env(safe-area-inset-bottom, 0px);
--safe-area-left:   env(safe-area-inset-left, 0px);
--safe-area-right:  env(safe-area-inset-right, 0px);

/* Alturas de navegación */
--mobile-header-height:     56px;
--mobile-bottom-nav-height: 64px;
--mobile-sticky-cta-height: 80px;
--mobile-sheet-handle:      4px;

/* Touch targets */
--touch-target-min:   44px;
--touch-target-ideal: 48px;

/* Spring physics mobile */
--mobile-spring:        cubic-bezier(0.32, 0.72, 0, 1);
--mobile-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--mobile-duration-tap:  100ms;
--mobile-duration-base: 250ms;
--mobile-duration-sheet: 350ms;
--mobile-duration-page:  300ms;
```

## CSS base mobile obligatorio

```css
@layer base {
  /* Eliminar tap delay 300ms */
  * { touch-action: manipulation; }

  /* Scroll nativo iOS */
  .scroll-touch { -webkit-overflow-scrolling: touch; }

  /* Evitar overscroll bounce */
  body { overscroll-behavior: none; }

  /* Evitar selección de texto en taps */
  button, [role="button"] { user-select: none; }
}
```

---

## Haptic patterns — referencia completa

```typescript
const HAPTIC_PATTERNS = {
  light:   [10],           // confirmación suave, navegación
  medium:  [20],           // acción completada, avanzar paso
  heavy:   [30, 10, 30],  // error, acción destructiva
  success: [10, 50, 10],  // celebración, éxito
  error:   [30, 20, 30, 20, 30], // error crítico
}
```

**Cuándo usar cada patrón:**

| Interacción | Haptic |
|-------------|--------|
| Tap en botón default | medium |
| Tap en botón ghost/outline | light |
| Tap en botón destructive | heavy |
| Swipe revelar acciones | light |
| Swipe ejecutar acción | medium |
| Avanzar paso en wizard | medium |
| Volver en wizard | light |
| Pull to refresh activado | medium |
| Acción completada con éxito | success |
| Error en formulario | error |
| Abrir Bottom Sheet | light |
| Cerrar Bottom Sheet | light |
| Long press activado | medium |

---

## PWA — configuración mínima

Si el producto es mobile-first y se instala desde el navegador:

```json
// public/manifest.json
{
  "name": "Nombre del producto",
  "short_name": "Nombre corto",
  "description": "Descripción",
  "theme_color": "#[color primario]",
  "background_color": "#[color de fondo]",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

```bash
# Instalar
npm install -D vite-plugin-pwa
```

---

## Checklist antes de publicar una pantalla mobile

- [ ] Touch targets ≥ 44px en todos los elementos interactivos
- [ ] Safe areas respetadas (top y bottom)
- [ ] Bottom Navigation con safe area bottom
- [ ] Sticky CTAs con safe area bottom
- [ ] Haptic feedback en acciones importantes
- [ ] Estados de loading visibles (skeleton o spinner)
- [ ] Empty states definidos
- [ ] Funciona sin conexión (si es PWA)
- [ ] Texto legible sin zoom (mínimo 16px body)
- [ ] No depende de hover para funcionalidad crítica

