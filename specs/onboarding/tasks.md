# Onboarding — Lista de tareas

> Orden de ejecución: de arriba a abajo. Cada tarea es atómica — se puede implementar, revisar y hacer commit por separado.

---

## Bloque 0 — Prerequisitos (no empezar sin esto)

- [x] Setup inicial completado (`npm create vite`, Tailwind v4, shadcn/ui, fuentes, PWA)
- [x] `src/index.css` con todos los tokens del DS activo
- [x] `src/components/ui/button.tsx` de shadcn copiado al proyecto

---

## Bloque 1 — Infraestructura de datos

- [x] Crear `src/stores/onboardingStore.ts` con Zustand + persist middleware
  - State: `location`, `level`, `isComplete`
  - Actions: `setLocation`, `setLevel`, `complete`, `reset`
  - Key de persistencia: `movi-onboarding`

- [x] Crear `src/services/geolocation.ts`
  - `getCurrentPosition()` con timeout 8s y `enableHighAccuracy: false`
  - `reverseGeocode()` via Nominatim (sin API key)
  - Error tipado: `GeolocationError` con códigos `PERMISSION_DENIED`, `UNAVAILABLE`, `TIMEOUT`, `NOT_SUPPORTED`

- [ ] Crear `src/services/geocoding.ts`
  - `reverseGeocode(lat, lng)` → nombre de zona via Nominatim
  - `searchLocation(query)` → array de resultados via Nominatim
  - Debounce 300ms en `searchLocation`

- [ ] Crear `src/mockData/onboarding.ts`
  - `mockNearSessions(lat, lng, level)` → 3-5 sesiones mock
  - `mockNoSessions` → array vacío
  - `mockLocations` → 5 zonas de Madrid para búsqueda manual

---

## Bloque 2 — Componentes base

- [x] `src/components/mobile/full-screen-step.tsx` (ya existía en DS con slide animations + progress + CTA)
- [x] `src/components/mobile/haptic-button.tsx` (ya existía en DS con patterns light/medium/heavy/success/error)
- [x] `src/components/mobile/level-selector.tsx` — 5 cards con ícono Lucide + nombre + descripción
  - `role="radiogroup"` + `role="radio"` por opción
  - Haptic en selección via `navigator.vibrate(10)`
  - Touch target mínimo: 64px height por card
  - Tokens: borde + bg con `--color-primary` cuando activo

- [ ] Crear `src/components/mobile/LocationSearch` (fallback manual integrado en Step1Location por ahora)
- [ ] Crear `src/components/layout/MobileScreen.tsx` (safe areas aplicadas inline en páginas)

---

## Bloque 3 — Pantallas

- [x] Crear `src/pages/onboarding/Step1Location.tsx`
  - Fondo `var(--color-primary)`, logo movi, "Paso 1 de 2", progress 50%
  - "¿Dónde entrenas?" headline + "Usar mi ubicación" + Loader2 en carga
  - Error GPS → input manual autoFocus + botón "Continuar"
  - `reverseGeocode()` via Nominatim, fallback a coordenadas Madrid

- [x] Crear `src/pages/onboarding/Step2Level.tsx`
  - Usa `FullScreenStep` existente (paso 2/2, slide animation, progress 100%)
  - `LevelSelector` con default nivel 2
  - "Empezar →" desactivado hasta selección

- [x] Crear `src/pages/onboarding/OnboardingComplete.tsx`
  - Llama a `complete()` del store en mount
  - Confetti con CSS `@keyframes confetti-fall` de index.css
  - Trophy + "¡Bienvenido a Movi!" + avatar stack (Ana/Marta/Carlos/+9)
  - `haptic('success')` en mount
  - Botón aparece tras 2.5s con fade+slide, navega a `/map` con `replace: true`

---

## Bloque 4 — Routing

- [x] Actualizar `src/App.tsx` con React Router v6
  - Rutas: `/` → `/onboarding/location`, `/onboarding/level`, `/onboarding/done`, `/map`
  - `TooltipProvider` wrapping todo
  - `*` → redirect a `/`
- [x] Crear `vercel.json` con SPA rewrite `/(.*) → /index.html`

---

## Bloque 5 — Diseño en Paper

- [x] Sincronizar 69 tokens de `src/index.css` a Paper (colores, radios, tipografía, spacing)
- [x] Diseñar `AppM · Onboarding Step 1` en Paper (390px, fit-content)
- [x] Diseñar `AppM · Onboarding Step 2` en Paper (390px, fit-content)
- [x] Diseñar `AppM · Onboarding Complete` en Paper (390px, fit-content)

---

## Bloque 6 — Calidad

- [x] `npm run build` → 0 errores TypeScript, 2205 módulos compilados limpio
  - Nota: `audit:all` no existe en los scripts — se usa `build` + `lint` individualmente
- [x] `npm run lint` → 0 errores ESLint
- [x] `npm run audit:tokens` → 0 errores, 0 warnings (DS Token Audit limpio)
  - Añadidos tokens: `--color-celebration-bg`, `--color-avatar-dark`, `--color-gold-subtle`, `--color-gold-border`, `--color-white-{25|30|40|50|65|70|75|80}`, `--shadow-primary-strong`, `--shadow-white-card`
  - Corregidos `strokeWidth` a 1.5, `400ms` → `var(--duration-slow)`, `rounded-[Xpx]` → `rounded-[var(--radius-*)]`
- [ ] Verificar touch targets: todos los interactivos ≥ 44×44px (inspección visual en DevTools)
- [ ] Verificar safe areas: probar en iPhone SE (375px) con barra de navegación visible
- [ ] Verificar skeleton loaders: simular latencia 3G en DevTools Network
- [ ] Verificar estado sin GPS: revocar permiso en DevTools → flujo manual funciona
- [ ] Verificar estado sin sesiones: `mockNoSessions` activo → mensaje "Sé el primero" correcto

---

## Bloque 7 — Commit

- [x] `git add src/pages/onboarding/ src/components/movi/ src/stores/onboardingStore.ts src/services/`
- [x] `git commit -m "feat(onboarding): flujo completo — location + level + celebration"`
- [x] `git push origin main`

---

## Dependencias entre bloques

```
Bloque 0 → Bloque 1 → Bloque 2 → Bloque 3 → Bloque 4 → Bloque 6 → Bloque 7
                                                              ↑
                                               Bloque 5 (Paper, paralelo)
```

Bloque 5 (diseño en Paper) puede ejecutarse en paralelo a Bloques 1–4. No bloquea el desarrollo.
