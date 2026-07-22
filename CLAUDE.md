# CLAUDE.md — Movi

## Qué es Movi

Movi es una PWA mobile-first que combate la soledad a través del deporte. Conecta personas para entrenar juntas — desde caminar hasta Hyrox. Para todos los niveles y todos los momentos de vida.

**El concepto central:** El deporte es la excusa. La conexión es el producto.

**La personalidad:** Como un entrenador personal que no te juzga — sabe que llevas una temporada parado pero te exige para mejorar. Motivacional, cálido, directo. Sin vergüenza, sin presión, con mucha energía.

**La frase de marketing:** "No te vendemos un cuerpo. Te damos gente con quien conseguirlo."

---

## Stack tecnológico

```
Framework:        React + Vite + TypeScript
Estilos:          Tailwind CSS v4 + @tailwindcss/vite
Componentes:      shadcn/ui (Radix UI base)
Iconos:           Lucide React (stroke: currentColor, strokeWidth: 1.5)
Tipografía:       Plus Jakarta Sans Variable
Motion:           Motion (Framer Motion) para animaciones mobile
Bottom Sheet:     react-modal-sheet
Gestos:           react-swipeable
Estado:           Zustand + persist
PWA:              vite-plugin-pwa
Deploy:           Vercel (auto-deploy desde main)
Repositorio:      github.com/ajosecorreaferreira-web/movi
URL producción:   https://movi-neon-eight.vercel.app
Base de datos:    Supabase (pendiente de configurar)
```

---

## REGLAS CRÍTICAS — src/index.css

Estas reglas son obligatorias. Aprendidas por experiencia en producción:

### Regla 1 — Orden de imports (CRÍTICO)
```css
/* CORRECTO — este orden exacto */
@import url('https://fonts.googleapis.com/...');  /* Google Fonts PRIMERO */
@import "tailwindcss";                             /* Tailwind SEGUNDO */

/* Comentarios y resto DESPUÉS */
```

❌ NUNCA poner comentarios antes de `@import "tailwindcss"`
❌ NUNCA poner Google Fonts después de `@import "tailwindcss"`

Si el orden es incorrecto, Lightning CSS (el optimizador de Vite) descarta las utilities y ninguna clase de padding/spacing funciona en producción.

### Regla 2 — Sin reset manual fuera de @layer (CRÍTICO)
```css
/* ❌ NUNCA esto — rompe TODAS las utilities de Tailwind */
*, *::before, *::after {
  padding: 0;
  margin: 0;
}
```

Tailwind v4 ya incluye ese reset en su preflight (`@layer base`). Duplicarlo fuera de `@layer` anula todas las utilities porque los estilos sin capa siempre ganan sobre `@layer utilities`.

### Regla 3 — Sin wildcards en clases
```css
/* ❌ Nunca */
rounded-[var(--radius-*)]

/* ✅ Siempre el token específico */
rounded-[var(--radius-full)]
```

---

## Sistema de agentes — arquitectura

Los agentes viven en `.claude/agents/` como archivos markdown con YAML frontmatter. Requiere `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` en `.claude/settings.json`.

### Los 6 agentes

| Agente | Rol | Activa cuando |
|--------|-----|---------------|
| orchestrator | Genera specs (requirements.md + design.md + tasks.md) | "quiero construir X", "nueva feature" |
| ds-designer | Diseña en Paper usando MCP | Bloque 5 de tasks.md |
| builder | Implementa código React/TS | Bloques 1-4 de tasks.md |
| auditor | Ejecuta audit:all, bloquea push si hay errores | Builder termina |
| git-agent | Commit + push solo con OK del auditor | Auditor da OK |
| reporter | Actualiza tasks.md, genera resumen | Fin de ciclo |

### El flujo correcto (obligatorio)

```
Tú describes feature en lenguaje natural
  ↓
Orchestrator → genera specs/[feature]/requirements.md + design.md + tasks.md
  ↓
DS Designer → lee specs → diseña en Paper (get_computed_styles + write_html)
  DS Designer → ejecuta get_screenshot de Paper → guarda imagen de referencia
  ↓
Builder → lee diseño de Paper (get_computed_styles + get_jsx) ANTES de escribir código
  NUNCA construir sin leer Paper primero
  ↓
Auditor → npm run audit:all → 0 errores obligatorio
  ↓
Git Agent → commit + push → Vercel despliega
  ↓
Reporter → actualiza tasks.md con [x] en tareas completadas
```

### Regla crítica del Builder

El Builder tiene acceso a `mcp__paper__get_computed_styles` y `mcp__paper__get_jsx`. DEBE usarlos antes de escribir una sola línea de código para una pantalla o componente. Si no hay diseño en Paper, notifica al ds-designer antes de continuar.

---

## Reglas de código

### Mobile-first obligatorio
- `min-h-dvh` (no `min-h-screen`) para viewport dinámico
- Safe areas: `paddingTop: 'max(1rem, env(safe-area-inset-top))'`
- Safe areas bottom: `paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))'`
- Touch targets mínimo 44px en todos los elementos interactivos
- Wrapper móvil: `max-w-[390px] mx-auto` para centrar en desktop

### Tokens — nunca hardcoding
```tsx
/* ❌ Nunca */
color: '#FF6B2C'
borderRadius: '8px'

/* ✅ Siempre */
color: 'var(--color-primary)'
borderRadius: 'var(--radius-full)'
```

### Componentes — filosofía atómica
- Usar siempre componentes de `src/components/ui/` (shadcn)
- Componentes mobile en `src/components/mobile/`
- Nunca `<button>` nativo sin wrapper del DS
- Nunca `<input>` nativo sin el componente Input del DS

### Iconos
- Solo Lucide React
- `stroke: currentColor` siempre
- `strokeWidth={1.5}` siempre
- Tamaños permitidos: 12, 14, 16, 20, 24, 32, 48

---

## Nomenclatura en Paper

```
F · Nombre       → Foundations
C · Nombre       → Componentes desktop (shadcn)
CM · Nombre      → Componentes mobile (390px)
AppM · Nombre    → Pantallas app mobile (390px)
App · Nombre     → Pantallas desktop (1440px)
```

---

## Producto — qué es Movi

### Los 5 niveles
1. **Activo** — caminar, moverse, empezar
2. **En marcha** — trote suave, algo de funcional
3. **En forma** — funcional, natación, bici
4. **Potencia** — Hyrox, pádel, funcional intenso
5. **Élite** — crossfit, híbridos, pesas serias

### Los públicos
Adolescentes, madres recientes, divorciados, viajeros de trabajo frecuente, viudos, recién mudados, personas mayores de 40-60 que quieren reconectar.

### Funcionalidades core
- Onboarding en 2 preguntas (ubicación + nivel)
- Plan de entrenamiento generado por IA
- Mapa de espacios deportivos gratuitos
- Sesiones: publicar, unirse, modo solo visible
- Gamificación: puntos, medallas, más puntos en grupo
- Quedadas mensuales organizadas por nivel y zona
- Sistema de delegados/líderes con incentivos
- Integración Google Calendar y Apple Calendar
- Notificaciones contextuales (no saturantes)
- Resumen semanal/mensual shareable
- "Momento Movi" — foto de grupo para compartir en redes
- Guía para romper el hielo
- Guía de nutrición (opcional)

### El efecto instagrameable
La app genera momentos compartibles — foto de grupo al terminar sesión con frame de Movi, resumen semanal listo para Instagram Stories. El marketing lo hacen los propios usuarios.

### B2B
- Gimnasios Hyrox y híbridos: instalaciones + clases especiales (5€/persona)
- Ayuntamientos: integración instalaciones municipales

---

## Estado del proyecto

### Completado
- ✅ DS generado con DS Generator v2.0 — 22 archivos
- ✅ Repo en GitHub: github.com/ajosecorreaferreira-web/movi
- ✅ Deploy en Vercel: movi-neon-eight.vercel.app
- ✅ PWA configurada (vite-plugin-pwa)
- ✅ Tokens mobile (safe areas, spring, haptics, touch targets)
- ✅ Sistema de agentes configurado (.claude/agents/ — 6 agentes)
- ✅ Agent Teams activado (.claude/settings.json)
- ✅ Specs del onboarding generadas (specs/onboarding/)
- ✅ Step1Location — pantalla de ubicación funcionando en producción
- ✅ Step2Level — selector de nivel (pendiente de verificar visualmente)
- ✅ OnboardingComplete — pantalla de celebración
- ✅ React Router configurado
- ✅ Zustand store para onboarding
- ✅ Geolocation service con timeout 8s y fallback Nominatim
- ✅ Bug Tailwind corregido (orden @import + reset manual eliminado)

### Pendiente
- ⏳ Verificar Step2Level visualmente en producción
- ⏳ Verificar OnboardingComplete visualmente
- ⏳ Home del consultor (TravelerHome)
- ⏳ Motor de entrenamiento con IA
- ⏳ Mapa de espacios deportivos
- ⏳ Sesiones sociales (publicar + unirse)
- ⏳ Gamificación (puntos, medallas)
- ⏳ Supabase (base de datos + auth)
- ⏳ Auth con Google/Apple
- ⏳ Notificaciones push
- ⏳ Integración calendarios
- ⏳ movi-admin (panel desktop — después del MVP)

---

## Bugs conocidos y lecciones aprendidas

### Bug 1 — Tailwind utilities no aplican en producción
**Causa:** `@import "tailwindcss"` debe ser la primera línea. Si hay comentarios antes o Google Fonts después, Lightning CSS descarta las utilities.
**Fix:** Ver sección REGLAS CRÍTICAS arriba.
**Estado:** ✅ Corregido en commit 772665

### Bug 2 — Reset manual rompe utilities
**Causa:** `*, *::before, *::after { padding: 0 }` fuera de `@layer` anula todo.
**Fix:** Eliminado. Tailwind v4 ya lo incluye en preflight.
**Estado:** ✅ Corregido en commit 772665

### Lección — El Builder debe leer Paper antes de construir
Si el Builder construye solo con specs sin leer el diseño de Paper, el resultado no coincide visualmente. El agente `ds-designer` debe ejecutar `get_screenshot` de Paper para tener referencia visual, y el `builder` debe usar `get_computed_styles` + `get_jsx` antes de escribir código.

---

## Comandos útiles

```bash
# Arrancar el proyecto
cd ~/Desktop/movi && claude

# Build + audit
npm run build
npm run audit:tokens
npm run audit:all

# Push
git add . && git commit -m "tipo: descripción" && git push
```

---

## Próxima sesión — por dónde empezar

1. Abrir **Project "Movi"** en claude.ai
2. Abrir Claude Code: `cd ~/Desktop/movi && claude`
3. Verificar Step2Level y OnboardingComplete visualmente
4. Si están bien → construir TravelerHome (la pantalla principal del consultor)
5. Si no → pedir al sistema de agentes que los corrija leyendo Paper

