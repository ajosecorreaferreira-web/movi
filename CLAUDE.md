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
