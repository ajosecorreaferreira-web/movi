# Onboarding — Arquitectura técnica

---

## Ruta

```
/onboarding          → OnboardingLayout (wrapper)
/onboarding/         → redirect → /onboarding/location
/onboarding/location → Step1Location
/onboarding/level    → Step2Level
/onboarding/done     → OnboardingComplete
```

Después de `/onboarding/done` → redirect a `/map` (primera vista con sesiones cercanas).

---

## Árbol de componentes

```
OnboardingLayout          ← layout/MobileScreen con safe areas
├── ProgressDots          ← indica paso 1/2, desaparece en /done
├── Step1Location         ← src/pages/onboarding/Step1Location.tsx
│   ├── FullScreenStep    ← components/movi/FullScreenStep
│   ├── HapticButton      ← components/movi/HapticButton (CTA primario)
│   └── LocationSearch    ← components/movi/LocationSearch (fallback manual)
├── Step2Level            ← src/pages/onboarding/Step2Level.tsx
│   ├── FullScreenStep
│   ├── LevelSelector     ← components/movi/LevelSelector
│   └── HapticButton
└── OnboardingComplete    ← src/pages/onboarding/OnboardingComplete.tsx
    └── CelebrationScreen ← components/movi/CelebrationScreen
```

---

## Componentes nuevos a crear

### `FullScreenStep`
```
src/components/movi/FullScreenStep/index.tsx
```
Wrapper de pantalla completa para cada paso del onboarding.

```tsx
interface FullScreenStepProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode  // donde vive el CTA
}
```

Layout:
- `height: 100dvh` (dynamic viewport height — evita el salto en iOS Safari)
- `padding-top: env(safe-area-inset-top)`
- `padding-bottom: calc(env(safe-area-inset-bottom) + 24px)`
- Contenido centrado verticalmente con flexbox
- Footer anclado al bottom

---

### `HapticButton`
```
src/components/movi/HapticButton/index.tsx
```
Extiende `Button` de shadcn/ui. Dispara `navigator.vibrate()` en `onPointerDown`.

```tsx
interface HapticButtonProps extends React.ComponentProps<typeof Button> {
  hapticPattern?: number | number[]  // default: 10
}
```

Regla: si `navigator.vibrate` no existe (iOS Safari), no hace nada — no lanza error.

---

### `LevelSelector`
```
src/components/movi/LevelSelector/index.tsx
```
Grid de 5 opciones. Cada opción: ícono Lucide + nombre + descripción.

```tsx
interface LevelOption {
  level: 1 | 2 | 3 | 4 | 5
  name: string
  description: string
  icon: LucideIcon
}

interface LevelSelectorProps {
  value: number | null
  onChange: (level: number) => void
}
```

Tokens:
- Estado inactivo: `border: 1px solid var(--color-border)`, `bg: transparent`
- Estado activo: `border: 2px solid var(--color-primary)`, `bg: var(--color-primary)/10`
- Touch target mínimo por opción: 44px de height
- Haptic en selección: `navigator.vibrate(10)`

Niveles precargados:
```ts
const LEVELS: LevelOption[] = [
  { level: 1, name: 'Activo',     description: 'Caminar, moverme, estirar',                   icon: Footprints },
  { level: 2, name: 'En marcha',  description: 'Trote suave, yoga, funcional ligero',           icon: Activity },
  { level: 3, name: 'En forma',   description: 'Funcional, natación, ciclismo, pádel suave',   icon: Dumbbell },
  { level: 4, name: 'Potencia',   description: 'Hyrox, pádel, tenis, funcional intenso',       icon: Zap },
  { level: 5, name: 'Élite',      description: 'CrossFit, powerlifting, híbridos de alto rendimiento', icon: Trophy },
]
```

---

### `LocationSearch`
```
src/components/movi/LocationSearch/index.tsx
```
Input de búsqueda manual de zona. Solo aparece cuando GPS falla o el usuario lo solicita.

```tsx
interface LocationSearchProps {
  onSelect: (location: { name: string; lat: number; lng: number }) => void
}
```

Implementación: fetch a OpenStreetMap Nominatim (gratuito, sin API key) con debounce de 300ms.

---

## Estado global — `useOnboardingStore`

```
src/stores/onboardingStore.ts
```

```ts
interface OnboardingState {
  // Datos
  location: { name: string; lat: number; lng: number } | null
  level: number | null           // 1–5

  // Control de flujo
  step: 'location' | 'level' | 'done'
  locationMethod: 'gps' | 'manual' | null

  // Acciones
  setLocation: (location: OnboardingState['location'], method: 'gps' | 'manual') => void
  setLevel: (level: number) => void
  completeOnboarding: () => void
  reset: () => void
}
```

Persistencia: `persist` middleware de Zustand → `localStorage` con key `movi-onboarding`.

El store NO guarda datos de sesión del usuario (eso va en `useUserStore` cuando exista).

---

## Servicios

### `services/geolocation.ts`

```ts
export function getCurrentPosition(): Promise<GeolocationCoordinates>
```

- Timeout: 8000ms
- `enableHighAccuracy: false` (no necesitamos precisión GPS — zona basta)
- Si falla → lanza error tipado: `GeolocationError` con `code` y `message` human-readable

### `services/geocoding.ts`

```ts
export function reverseGeocode(lat: number, lng: number): Promise<string>  // → nombre de zona
export function searchLocation(query: string): Promise<LocationResult[]>
```

Implementación inicial: OpenStreetMap Nominatim. Sin API key. Rate limit: 1 req/s con debounce.

---

## Datos mock

```
src/mockData/onboarding.ts
```

Exporta:
- `mockNearSessions(lat, lng, level)` → array de `Session` para MSW handler
- `mockNoSessions` → array vacío (para testear estado sin sesiones)
- `mockLocations` → array de `LocationResult` para testear búsqueda manual

MSW handler: `GET /api/sessions/near` con query params `lat`, `lng`, `level`, `radius`.

---

## Animaciones

| Transición | Tipo | Duración |
|---|---|---|
| Entrada a Step1 | fade + slide-up (20px) | 300ms `--mobile-spring` |
| Step1 → Step2 | slide-left | 350ms `--mobile-spring` |
| Step2 → Done | slide-left | 350ms `--mobile-spring` |
| Done → Map | fade-out | 200ms (salida rápida) |
| Celebration | spring bounce | 800ms `--duration-celebration` |

Implementación: `motion` (Framer Motion). Solo en transiciones y celebración — sin animaciones decorativas.

---

## Accesibilidad

- `aria-current="step"` en el paso activo del ProgressDots
- `role="radiogroup"` + `role="radio"` en LevelSelector
- `aria-label` descriptivo en cada opción de nivel
- Foco gestionado al cambiar de paso: `ref.current?.focus()` en el `<h1>` de cada step
- Contraste mínimo: todos los textos sobre fondo cumplen WCAG AA (verificado en `color-system.md`)

---

## Variables de entorno necesarias

```
# .env.local — no añadir nada nuevo por ahora
# La geolocalización es nativa del browser
# Nominatim no requiere API key
```

---

## Decisiones de diseño

1. **Sin `<input type="range">` para el nivel** — los sliders numéricos no comunican qué significa cada nivel. El selector visual con descripción es más honesto con el usuario (ver `docs/design-decisions.md`).

2. **`100dvh` en vez de `100vh`** — `dvh` (dynamic viewport height) evita el jump cuando aparece/desaparece la barra de dirección en iOS Safari. Sin `dvh` la pantalla se recorta.

3. **Nominatim sin API key para MVP** — suficiente para ~1 req/s. En producción, evaluar Google Places API o Mapbox. No bloquea MVP.

4. **Nivel 2 preseleccionado** — reduce fricción para el usuario objetivo (madre reciente, nivel bajo-medio). El usuario puede cambiar, pero el default es deliberado.

5. **Zustand + persist** — el estado de onboarding sobrevive a un cierre accidental de la app. Si el usuario llegó al paso 2 y cierra, vuelve al paso 2, no al inicio.
