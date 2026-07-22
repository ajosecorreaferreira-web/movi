# CLAUDE.md — Movi Design System
> El archivo más importante del proyecto. Léelo antes de escribir una línea de código.

---

## Qué es Movi

PWA mobile-first que combate la soledad a través del deporte. Conecta personas para entrenar juntas — desde caminar hasta Hyrox.

**La frase:** "El deporte es la excusa. La conexión es el producto."
**Arquetipo:** El Cuidador que Exige
**Usuario principal:** Madre reciente (3-6 meses postparto)
**Plataforma:** PWA mobile-first (portrait) + Panel admin desktop

---

## Stack

```
Framework:    React 18 + Vite + TypeScript
Estilos:      Tailwind CSS v4 + tokens CSS en src/index.css
Componentes:  shadcn/ui (Radix UI base — accesibles por defecto)
Iconos:       Lucide React (strokeWidth: 1.5, currentColor)
Motion:       Motion (Framer Motion) — solo para celebraciones y page transitions
PWA:          vite-plugin-pwa
Tipografía:   Plus Jakarta Sans (variable) via @fontsource-variable
Mock datos:   mockData.ts → MSW handlers
Tests:        Vitest + Testing Library
Deploy:       Vercel
```

---

## Tokens clave

```css
/* Colores */
--color-primary:     oklch(0.70 0.19 46)   /* Amanecer — CTA, activos */
--color-secondary:   oklch(0.45 0.13 148)  /* Selva — acciones de apoyo */
--color-background:  oklch(0.98 0.01 75)   /* Crema cálida — fondo principal */
--color-text:        oklch(0.18 0.03 50)   /* Casi negro cálido — texto principal */
--color-primary-text:oklch(0.42 0.13 40)   /* Amanecer oscuro — texto sobre fondos claros */

/* Forma */
--radius-md:  10px     /* Base — botones, inputs, cards pequeñas */
--radius-lg:  16px     /* Cards grandes, bottom sheets */
--radius-full: 9999px  /* Pills, badges, avatares */

/* Tipografía */
--font-sans:  'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif

/* Motion */
--mobile-spring:        cubic-bezier(0.32, 0.72, 0, 1)
--mobile-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)
--duration-celebration: 800ms

/* Mobile */
--safe-bottom: env(safe-area-inset-bottom, 0px)
--bottom-nav-height: 64px
--touch-target-min:  44px
```

---

## Filosofía atómica — Reglas LLM-ready

### 1. Construir sobre el DS, nunca ad-hoc
Antes de crear cualquier elemento de UI, buscar el componente equivalente en shadcn/ui. Si existe, usarlo. Si necesita customización, extenderlo con los tokens del DS. Si no existe, crearlo con los tokens del DS — nunca con valores hardcodeados.

```tsx
// ✓ Correcto
import { Button } from '@/components/ui/button'
<Button variant="default" size="lg">Unirme</Button>

// ✗ Incorrecto
<button style={{ backgroundColor: '#B8621A', borderRadius: '10px' }}>Unirme</button>
```

### 2. Tokens siempre, hex nunca
```tsx
// ✓ Correcto
className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]"

// ✗ Incorrecto
style={{ backgroundColor: '#B8621A' }}
```

### 3. Una pantalla, un objetivo
Cada pantalla tiene exactamente 1 CTA primario. Si hay más de 1, hay un problema de diseño.

### 4. Touch targets obligatorios
Todo elemento interactivo: mínimo `44×44px`. Sin excepciones.

### 5. Safe areas siempre
El layout raíz siempre tiene `padding: env(safe-area-inset-*)`. El bottom nav siempre incluye `safe-area-inset-bottom`.

### 6. Animaciones solo de entrada, nunca de salida compleja
Transiciones de pantalla: slide horizontal. Bottom sheets: slide vertical. Modales: fade + scale. Celebraciones: spring con bounce. La salida siempre es más rápida que la entrada.

### 7. shadcn/ui es del cliente — sin lock-in
Los componentes de shadcn se copian al proyecto, no se importan como dependencia. Se pueden modificar libremente. No hay vendor lock-in.

---

## Estructura de carpetas

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (copiados, modificables)
│   ├── movi/            # Componentes específicos de Movi
│   │   ├── SessionCard/
│   │   ├── WorkoutScreen/
│   │   ├── CelebrationScreen/
│   │   ├── BottomNav/
│   │   └── ...
│   └── layout/          # Layout wrappers (MobileScreen, SafeArea, etc.)
├── pages/               # Pantallas de la app (rutas)
├── hooks/               # Custom hooks
├── stores/              # Estado global (Zustand)
├── services/            # API calls, geolocalización, etc.
├── lib/                 # Utilidades (cn, formatters, etc.)
├── mockData/            # Mock data + MSW handlers
├── index.css            # Tokens CSS del DS — source of truth
└── main.tsx
```

---

## Nomenclatura Paper (para cuando se use Paper MCP)

```
F·         → Frames / Layout components
C·         → Componentes reutilizables
CM·        → Componentes mobile específicos
App·       → Pantallas de la app
AppM·      → Pantallas mobile específicas
Landing·   → Pantallas de landing/marketing
IA·        → Componentes generados por IA / dinámicos
```

---

## Estado del proyecto

### Fase actual: DS configurado, listo para desarrollo

- [x] Design System completo (22 archivos)
- [x] Tokens CSS en src/index.css
- [x] Arquitectura de carpetas definida
- [ ] Setup inicial (npm create vite, tailwind v4, shadcn)
- [ ] Componentes base (Button, Input, Card, BottomNav)
- [ ] Pantallas MVP (Onboarding, Mapa, Sesión, Logro)
- [ ] Guía de entrenamiento
- [ ] Sistema de gamificación
- [ ] Quedadas mensuales
- [ ] Panel admin desktop
- [ ] Tests
- [ ] Deploy en Vercel

### Próximos pasos

1. `npm create vite@latest movi -- --template react-ts`
2. Instalar Tailwind v4 + shadcn/ui
3. Copiar `src/index.css` del DS
4. Instalar `@fontsource-variable/plus-jakarta-sans`
5. Instalar `lucide-react` + `motion`
6. Setup de `vite-plugin-pwa`
7. Primer componente: `BottomNav`
8. Primera pantalla: `OnboardingScreen`

---

## Archivos del DS

Ver `/docs/` para toda la documentación:

| Archivo | Descripción |
|---|---|
| `brand-personality.md` | Las 9 dimensiones del DS |
| `voice.md` | Voz y tono — Firme, Cálido, Honesto |
| `color-system.md` | Paleta oklch completa con ratios WCAG |
| `typography.md` | Plus Jakarta Sans, escala completa |
| `motion.md` | Tokens, microinteracciones, celebraciones |
| `sound.md` | Earcons, haptics, patterns de vibración |
| `iconography.md` | Lucide React, escala, reglas |
| `spacing-density.md` | Escala 4px, densidad media-baja |
| `audience.md` | 4 perfiles de usuario, roles |
| `design-decisions.md` | 12 decisiones documentadas con alternativas |
| `dont-do.md` | 3 niveles de lo que Movi nunca hace |
| `product.md` | Concepto completo, 7 pilares, modelo de negocio |
| `competitors.md` | Análisis competitivo |
| `platform.md` | PWA mobile + admin desktop |
| `flows.md` | 7 flujos principales con pantallas |
| `mobile-patterns.md` | Safe areas, bottom sheets, swipe, haptics |
| `tech-stack.md` | Stack completo con versiones |
| `methodology.md` | Metodología Dusty DS Generator |
| `references.md` | DS de referencia por dimensión |
| `corrections.md` | Correcciones en curso |
