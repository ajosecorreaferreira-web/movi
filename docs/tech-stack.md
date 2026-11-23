# Movi — Tech Stack

> Este documento explica **qué** usamos y **por qué**. No lista versiones.
> Las versiones exactas viven en un solo sitio: **`package.json`** (y `package-lock.json`).
> La configuración real vive en `vite.config.ts`, `components.json` y `vercel.json`.

---

## Piezas

| Área | Pieza |
|---|---|
| Framework | React + TypeScript, empaquetado con Vite |
| Routing | React Router |
| Estilos | Tailwind CSS v4 (`@tailwindcss/vite`) + tokens en `src/index.css` |
| Componentes | shadcn/ui copiado en `src/components/ui/` (Radix debajo) |
| Primitivas mobile | `src/components/mobile/` — react-modal-sheet, react-swipeable |
| Animación | Motion |
| Estado | Zustand con `persist` |
| Iconos | Lucide React (strokeWidth 1.5, currentColor) |
| Tipografía | Plus Jakarta Sans vía `@fontsource-variable/plus-jakarta-sans`, importada en `src/main.tsx` |
| PWA | vite-plugin-pwa (`registerSW` en `src/main.tsx`) |
| Mapas | `@vis.gl/react-google-maps` instalado; hoy la Home usa `MapStatic.tsx` (SVG) |
| Calidad | ESLint, Storybook, Vitest + Playwright, `npm run audit:tokens` |
| Deploy | Vercel (SPA con rewrite a `index.html`) |

---

## Decisiones técnicas

### ¿Por qué Vite y no Next.js?
Movi es una SPA PWA, así que no necesita SSR ni SSG. Vite da un HMR más rápido, un bundle más ligero y una configuración de PWA más sencilla.

### ¿Por qué Tailwind v4?
La v4 usa variables CSS nativas como sistema de tokens, así que los tokens de `src/index.css` se pueden usar directamente en las clases. Reglas críticas: ver `CLAUDE.md` (`@import "tailwindcss"` en la primera línea, nada de base fuera de `@layer`).

### ¿Por qué shadcn/ui?
Sus componentes son accesibles (llevan Radix por debajo) y no atan a nada: se copian al repo y se modifican. Además, usan variables CSS, así que encajan con los tokens de Movi.

### ¿Por qué Motion además de CSS?
Las celebraciones (trofeo, confetti, spring bounce) necesitan animaciones coordinadas que los keyframes no resuelven bien. Motion se usa para celebraciones y transiciones de página. El resto de transiciones son CSS.

### ¿Por qué Zustand?
Es mínimo y basta para el estado de Movi (`sessionStore`, `programStore`, `onboardingStore`). El middleware `persist` mantiene la demo entre recargas.

### ¿Por qué fontsource y no Google Fonts?
La fuente va empaquetada con la app: funciona offline en la PWA, no hay petición a un tercero y no hay `@import url()` delante de `@import "tailwindcss"`. Decidido el 2026-11-23.

---

## Pendiente (sin decisión técnica todavía)

- Backend: Supabase
- Auth: Google / Apple
- Notificaciones push reales
- Google Maps real (API key con billing)
- Mocks de red: hoy los datos son constantes en los componentes (`MOCK_SESSIONS`…). MSW se planteó pero no está instalado.
