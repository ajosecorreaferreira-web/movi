# producto.md — Hábito, métricas y límites

**Versión:** 0.1
**Fecha:** 2026-11-24
**Estado:** aprobada por José (26 nov 2026)
**Origen:** análisis «Dónde estamos y qué falta» (claude.ai, 24 nov 2026). Objetivo de José: adopción rápida y uso constante y continuado, con patrones de enganche usados para el bien.

---

## Principio

Movi engancha con una persona que te espera, no con notificaciones: cada sesión deja puesta la siguiente, se celebra la relación y la vuelta, y si un día quedáis sin abrir la app, eso cuenta como éxito.

---

## Lo que se elimina

| Se elimina | Por qué |
|---|---|
| La racha como mecánica | Se rompe con una mala noche y ese día se abandona. La sustituye la constancia flexible. |
| Puntos sueltos (25 acompañado, 10 solo) | No significan nada para nadie. Los sustituyen contadores con sentido. |
| Notificaciones genéricas («te echamos de menos») | Culpan y no llevan a ningún plan. |

---

## Modelo de datos

```ts
// Métrica estrella
type Reencuentro = {
  semana: string               // ISO
  sesionId: string
  personasQueRepiten: number   // ≥ 2 personas que ya habían entrenado juntas
}

// Gamificación
type Hito =
  | { tipo: 'relacion'; con: string; veces: 3 | 10 | 25 }   // «3ª vez con Ana»
  | { tipo: 'traer_a_alguien' }
  | { tipo: 'vuelta'; semanasFuera: number }               // celebrar volver
  | { tipo: 'sitio'; sesiones: 10 | 25 | 50 }              // al estilo parkrun
  | { tipo: 'reto_grupo'; objetivo: string; logrado: boolean }
  | { tipo: 'temporada'; personas: number; sesiones: number }

type Constancia = { ultimas4Semanas: 0 | 1 | 2 | 3 | 4 }  // «3 de las últimas 4»

type Notificacion = {
  motivo: 'cita_manana' | 'persona_confirma' | 'propuesta_siguiente' | 'vuelta'
  conPersona: boolean          // siempre true salvo 'vuelta'
}
```

---

## Reglas duras

1. **R1 — Al terminar cada sesión, la siguiente queda propuesta** (misma hora la semana siguiente, con la misma persona si hubo sí mutuo). Se acepta en un toque y se cambia en un toque.
2. **R2 — Toda propuesta lleva día, hora, sitio y persona.** Nunca «entrena esta semana».
3. **R3 — Como mucho una notificación al día**, siempre con una persona o un plan concreto.
4. **R4 — Cancelar son dos toques** y avisa a la otra persona con un mensaje amable ya escrito.
5. **R5 — Volver después de faltar se celebra igual que la primera vez** y se propone una sesión corta para volver.
6. **R6 — Nunca:** rankings individuales entre desconocidos, rachas que se rompen, progreso que se pierde, escasez falsa, notificaciones que culpan, calorías o comparación de cuerpos, recompensas al azar a cambio de dinero.
7. **R7 — Sin dinero en juego** (fianzas o penalizaciones) mientras se valida el producto.
8. **R8 — Prueba social solo con cifras reales.**
9. **R9 — Los puntos y logros se pueden desactivar desde «Yo»** sin perder ninguna función.
10. **R10 — Con mayores y adolescentes, sin comparación, ranking ni urgencia.**
11. **R11 — Si una mecánica sube el uso pero baja la confianza o el bienestar declarado, se quita.**

---

## Criterios de aceptación

- [ ] **C1 —** La métrica estrella (reencuentros por semana) se puede calcular con los datos que guarda la app.
- [ ] **C2 —** Se miden las señales del piloto: segunda sesión con la misma persona en 14 días, asistencia a la primera, activos en semana 8 (3 de 4 semanas), programas completados, personas traídas por otra persona, incidentes de seguridad y «¿te sientes menos sola o solo que hace un mes?».
- [ ] **C2b —** Se cuentan las relaciones que siguen quedando por su cuenta, como éxito.
- [ ] **C3 —** Ninguna pantalla ni notificación incumple R6.
- [ ] **C4 —** Cada hito de `Hito` tiene su celebración diseñada; ninguno es una racha.

---

## Fuera de alcance

- **Compromisos con dinero** (fianzas tipo stickK). Solo se valorarían después de la puerta 2 del piloto y siempre voluntarios.
- **Ligas, rankings y clasificaciones.** No encajan con la tesis.

---

## Trazabilidad

- Specs relacionadas: `specs/conexion/spec.md`, `specs/workout-engine.md` (gamificación de relación), `specs/foundations/instrumento.md` (celebraciones: anillo y acorde).
- Umbrales del piloto (propuesta, no cifras del sector): 40% repite con la misma persona en 14 días · 70% asiste a la primera · 30% de la lista de espera llega a la primera · 25% activos en semana 8 · 50% de programas completados · 1 de cada 5 traídos por otra persona · 0 incidentes.
- Evidencia: megaestudio de Milkman y colegas (Nature, 2021; 61.293 socios de gimnasio): solo 24 de 53 intervenciones cambiaron la conducta; la mejor premiaba volver tras faltar.
