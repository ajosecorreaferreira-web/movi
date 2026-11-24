# CLAUDE.md — Movi

## Qué es Movi
PWA mobile-first que combate la soledad a través del deporte.
El deporte es la excusa. La conexión es el producto.
URL producción: https://movi-neon-eight.vercel.app
Repo: github.com/ajosecorreaferreira-web/movi

## Stack
React + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui
Motion + react-modal-sheet + react-swipeable
Zustand (persist) + React Router
vite-plugin-pwa (PWA instalable)
Lucide React (strokeWidth 1.5, currentColor)
Plus Jakarta Sans Variable

## Sistema de agentes
6 agentes en .claude/agents/: orchestrator, ds-designer, builder, auditor, git-agent, reporter
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 activado en .claude/settings.json
Flujo: Orchestrator genera specs → DS Designer diseña en Paper → Builder lee Paper antes de construir → Auditor verifica → Git Agent push

## Reglas críticas CSS
1. @import "tailwindcss" PRIMERA línea absoluta — antes de cualquier comentario
2. NUNCA reset manual fuera de @layer (rompe todas las utilities)
3. MapStatic.tsx tiene colores hex cartográficos — excepción documentada

## Rutas de la app
/ → /onboarding/location
/onboarding/location → Step1Location
/onboarding/level → Step2Level
/onboarding/done → OnboardingComplete
/home → Home (mapa SVG Pinar Las Rozas + sesiones)
/session/:id → SessionDetail
/session/partner/:id → PartnerSession
/celebration/first-session → PrimeraSesion
/celebration/first-completed → PrimeraCompletada
/celebration/streak-5 → Racha5Dias
/celebration/session-published → SessionPublished
/celebration/partner-reserved/:id → PartnerReserved
/celebration/program-start → ProgramStart
/create → CreateSession
/create/categories → Categories
/create/workouts/:category → WorkoutList
/create/workout-detail/:id → WorkoutDetailCreate
/workout/:id → WorkoutDetail
/program → ProgramTimeline
/program/proposal → ProgramProposal (?type=group|solo)
/program/propose → ProposeSession

## Stores Zustand
- sessionStore: apuntadoIds, partnerReservedIds, isFirstSession
- programStore: program, showFeelingSheet
- onboardingStore: location, level, isComplete

## Flujos implementados y funcionando
1. Onboarding: ubicación → nivel → bienvenida → /home
2. Apuntarse: SessionDetail → CTA → celebración primera vez → Home con badge verde
3. Partners: Home card azul → PartnerSession → reservarPartner → PartnerReserved → Home badge "Reservado"
4. Crear sesión: FAB → CreateSession → categorías → workouts → detalle → guardar → publicar → celebración
5. Programa 3 semanas: FeelingSheet → propuesta grupo/solo → ProgramStart → ProgramTimeline
6. Cold start: 3 tipos de card — user (naranja), partner (azul), first (dorado)

## Menú hamburguesa — Modo Demo
Icono hamburguesa en el header del Home abre drawer con:
- Simular sesión completada → activa FeelingSheet
- Ver programa activo → /program
- Reset demo → borra stores + navega a /home

## Tipos de sesión en Home
sessionType: 'user' | 'partner' | 'first'
- user: borde naranja, botón Apuntarme/Acompañarle
- partner: borde azul, badge Partner, botón Reservar plaza
- first: borde dorado, badge "✨ Sugerido por Movi", texto "Nadie lo ha propuesto aún"

## Mock data
MOCK_SESSIONS en Home.tsx — 6 sesiones (2 partners, 1 first, 3 users)
MOCK_PARTNER_SESSIONS en PartnerSession.tsx — p1 (F45), p2 (CrossFit)
MOCK_WORKOUT_BLOCKS en WorkoutDetail.tsx — calentamiento, 2 circuitos, finisher, enfriamiento

## Audit
npm run audit:tokens — 0 errores fuera de MapStatic
MapStatic.tsx: 28 errores de colores cartográficos — excepción justificada y documentada

## Pendiente
- Supabase (base de datos real)
- Auth Google/Apple
- Notificaciones push reales
- Google Maps real (API key con billing)
- movi-admin (panel desktop)
- Verificar flujo partner en móvil

---

## Estado real del proyecto

**Actualizado:** 2026-11-23

| Pieza | Estado | Spec |
|---|---|---|
| Design system / tokens (`src/index.css`) | hecho | `specs/foundations/`, `specs/tokens/` |
| Componentes shadcn (`src/components/ui/`) | copiados, 31 | `specs/components/` (10 de 31) |
| Componentes mobile (`src/components/mobile/`) | hechos | `specs/components/mobile/` |
| Flujo 1 — Onboarding | hecho | `specs/onboarding/` ✓ |
| Flujo 2 — Apuntarse (SessionDetail + celebraciones) | hecho | **sin spec** |
| Flujo 3 — Partners (PartnerSession, PartnerReserved) | hecho, sin verificar en móvil | **sin spec** |
| Flujo 4 — Crear sesión (CreateSession → WorkoutDetailCreate) | hecho | **sin spec** |
| Flujo 5 — Programa 3 semanas (FeelingSheet, ProgramTimeline v2) | hecho, FeelingSheet con cambios sin commitear | **sin spec** |
| Flujo 6 — Home con cold start (3 tipos de card) | hecho | **sin spec** |
| Supabase, auth, push, Google Maps real, movi-admin | pendiente | — |

Todo lo que no tenga spec se considera **código heredado**: antes de cambiar su comportamiento, se escribe la spec (`/sdd:spec`).

---

## Tokens clave

```css
/* Fuente de verdad completa: src/index.css */
--color-primary:      oklch(0.70 0.19 46);   /* Amanecer — naranja-ámbar */
--color-primary-text: var(--color-primary-800); /* texto ámbar sobre blanco, AA */
--color-background:   oklch(0.98 0.005 80);  /* blanco roto cálido */
--color-surface:      oklch(1 0 0);          /* cards */
--color-text:         oklch(0.18 0.03 50);
--color-border:       oklch(0.88 0.02 75);
--radius-md:          10px;
--radius-lg:          16px;
--space-4:            16px;
--touch-target-min:   44px;
--touch-target-ideal: 48px;
```

---

## Método

Este repo trabaja con **SDD (Spec-Driven Development)** mediante el plugin `sdd`:

- `/sdd:method` — las seis fases y las doce reglas (contrato base)
- `/sdd:spec` — escribir la spec antes de construir
- `/sdd:paper` — traer un frame de Paper con valores exactos
- `/sdd:build` — construir desde la spec
- `/sdd:audit` — verificar antes del PR
- `/sdd:ship` — rama, commit y PR con la spec enlazada

**Las specs viven en `specs/` en la raíz — no en `docs/specs/`.** Ver `specs/decisions/specs-location.md`.
**Nada se construye sin spec.** Las reglas críticas CSS de arriba son reglas propias del repo y ganan sobre las doce del método.

---

## Estructura

```
specs/
├── foundations/    ← color, tipografía, spacing, radius, motion, sonido
├── tokens/         ← referencia de tokens
├── components/     ← una spec por componente (mobile/ aparte)
├── <feature>/      ← requirements.md · design.md · tasks.md (p. ej. onboarding/)
└── decisions/      ← decisiones transversales
docs/               ← contexto de producto y marca (product, flows, voice…) — no son specs
src/
├── index.css       ← tokens — fuente de verdad del DS
├── components/
│   ├── ui/         ← shadcn copiado
│   ├── mobile/     ← primitivas mobile propias
│   ├── home/ program/ ← componentes de producto
├── pages/          ← una carpeta por flujo
└── stores/         ← Zustand
```

---

## Convención de Paper

| Prefijo | Qué es |
|---|---|
| `F ·` | Frames / layout |
| `C ·` | Componentes reutilizables |
| `CM ·` | Componentes mobile |
| `App ·` | Pantallas de la app |
| `AppM ·` | Pantallas mobile |
| `IA ·` | Componentes generados / dinámicos |
| `Landing ·` | Landing / marketing |

---

## Contradicciones abiertas (2026-11-23)

Resolver antes de construir sobre la zona afectada.

1. **`specs/foundations/typography.md:10-11`** — dice que `--font-sans` es Geist Variable y `--font-mono` Geist Mono. Pero el código usa Plus Jakarta Sans Variable y Geist está desinstalado.
2. **`docs/typography.md`** — sigue ofreciendo Google Fonts como "Opción 2" y pone `'Plus Jakarta Sans'` como familia. La decisión es fontsource y la familia es `'Plus Jakarta Sans Variable'`.
3. **Sección Audit de este archivo** — dice "0 errores fuera de MapStatic". La realidad (2026-11-23) es 81 errores y 62 warnings: 30 en MapStatic y 51 repartidos por las pantallas (PartnerReserved 39, ProgramTimeline 15, Home 11, SessionDetail 11…).

Resueltas el 2026-11-23: tailwind en la primera línea de `index.css`, `html`/`body` en `@layer base`, fuente por fontsource, `docs/CLAUDE.md` borrado, `docs/tech-stack.md` sin versiones, tools de Paper de los agentes.
