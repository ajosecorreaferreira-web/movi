# Movi — Metodología DS Generator v2.0

> Cómo se construyó este Design System y cómo se mantiene.

---

## El proceso que generó este DS

Este DS fue creado con el **DS Generator de Dusty v2.0** — un proceso de onboarding conversacional en 6 bloques que recopila toda la información necesaria para generar automáticamente los archivos de configuración del Design System.

### Bloque 1 — El negocio
- ¿Qué es Movi y qué hace? → PWA anti-soledad a través del deporte
- ¿Quién es el usuario principal? → Madre reciente (3-6 meses postparto)
- ¿En qué sector? → Esperanza + deporte en compañía (no fitness puro)
- ¿Plataforma? → PWA mobile-first + panel admin desktop

### Bloque 2 — Los flujos
- 7 flujos principales extraídos del documento de concepto
- 5 roles de usuario: estándar, organizador, delegado, partner B2B, admin

### Bloque 3 — Personalidad visual
- Forma: 10px (entre Suave y Redondo) — amigable sin ser infantil
- Color: Amanecer (naranja-ámbar) × Selva (verde bosque) × Tierra caliente
- Tipografía: Plus Jakarta Sans (variable font)

### Bloque 4 — Arquetipo
- El Cuidador que Exige (Cuidador + Héroe en equilibrio)
- Anti-arquetipo: apps sobrecargadas, Nike agresivo, positivismo vacío

### Bloque 5 — La voz
- Firme. Cálido. Honesto.
- Como el entrenador personal cariñoso que no tolera la vagancia
- Tuteo siempre. Español primero, inglés para expansión europea.

### Bloque 6 — Motion, sonido, haptics
- Celebraciones cinematográficas (trofeo PS5-style) para hitos reales
- Sonido OFF por defecto, haptics ON por defecto
- Momentos de sorpresa: onboarding, primer compañero, primera quedada, 30 días

---

## El flujo de trabajo Dusty end-to-end

```
1. Onboarding DS Generator → 22 archivos de DS
      ↓
2. Setup del proyecto:
   npm create vite + tailwind v4 + shadcn/ui + dependencias
      ↓
3. Copiar src/index.css del DS al proyecto
      ↓
4. Desarrollar componentes base (Button, Input, Card, BottomNav)
   → Siempre sobre shadcn/ui, nunca ad-hoc
      ↓
5. Desarrollar pantallas MVP en orden de impacto:
   1. OnboardingScreen (retención desde el minuto 0)
   2. SessionMapScreen (el core del producto)
   3. SessionDetailSheet (conversión principal)
   4. WorkoutScreen (el valor diferencial)
   5. CelebrationScreen (el corazón emocional)
   6. WeeklySummaryScreen (retención semanal)
      ↓
6. Mock data con MSW para desarrollo sin backend
      ↓
7. Tests con Vitest + Testing Library
      ↓
8. Deploy en Vercel (preview por PR, producción en main)
```

---

## Cómo mantener el DS vivo

### Cuando algo no funciona en la práctica
1. Documentar en `docs/corrections.md` con el problema y el contexto
2. Proponer corrección
3. Actualizar el archivo correspondiente del DS
4. Actualizar `src/index.css` si implica cambio de token
5. Hacer grep en el código para aplicar el cambio en todos los usos

### Cuando hay una nueva feature importante
1. Definir qué pantallas implica (añadir a `docs/flows.md`)
2. Definir qué componentes nuevos necesita
3. Verificar que los nuevos componentes usan los tokens existentes
4. Si necesitan tokens nuevos, añadirlos a `src/index.css` con nomenclatura consistente
5. Documentar la decisión de diseño en `docs/design-decisions.md`

### Cuando cambia el arquetipo o la voz
Esto es raro y debe tomarse en serio. Implica:
1. Actualizar `docs/brand-personality.md`
2. Actualizar `docs/voice.md`
3. Revisar `docs/dont-do.md` — puede que algunas reglas cambien
4. Hacer audit de todo el copy existente en la app
5. Actualizar los tokens de color/motion si el cambio de arquetipo lo requiere

---

## Principios de este DS

**1. LLM-ready:** Este DS está escrito para que un LLM (Claude) pueda leerlo y generar código correcto sin pedir aclaraciones. Cada decisión tiene su porqué. Cada regla tiene su razón.

**2. Fuente de verdad única:** `src/index.css` es el único lugar donde viven los tokens. Si un token no está ahí, no existe.

**3. Sin lock-in:** shadcn/ui se copia, no se importa como dependencia. Los tokens son variables CSS estándar. El DS puede migrar a cualquier framework.

**4. Vivido, no estático:** Los archivos del DS se actualizan cuando la realidad lo exige. `docs/corrections.md` existe para eso.

**5. Un objetivo por pantalla:** Si una pantalla tiene dos CTAs primarios, hay un problema de diseño — no un problema de implementación.
