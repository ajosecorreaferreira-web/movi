# Onboarding — Historias de usuario

> Flujo 1 del producto. Objetivo: en 30 segundos el usuario tiene su primera sesión disponible.

---

## Contexto

El onboarding es el primer contacto entre Movi y el usuario. Tiene que cumplir una promesa imposible de incumplir: en menos de 30 segundos, la persona ve gente real entrenando cerca. Sin formularios, sin cuentas, sin fricción.

**Usuario principal:** Madre reciente (3–6 meses postparto). Tiempo escaso, energía baja, ganas de reconectar con ella misma y con otras personas.

---

## Historias de usuario

### HU-01 — Bienvenida

**Como** usuario que abre Movi por primera vez,
**quiero** entender de un vistazo qué hace la app,
**para** decidir si vale la pena los próximos 30 segundos de mi atención.

**Criterios de aceptación:**
- Pantalla splash con tagline "El deporte es la excusa. La conexión es el producto."
- Un único CTA: "Empieza"
- Tiempo máximo en pantalla antes de CTA: 0 s (aparece de inmediato, sin animaciones de entrada largas)
- Sin logo gigante ni carrusel de features

---

### HU-02 — Pregunta 1: Ubicación

**Como** usuario en el paso 1 del onboarding,
**quiero** dar mi ubicación de la forma más rápida posible,
**para** ver sesiones cercanas sin tener que escribir nada.

**Criterios de aceptación:**
- CTA primario: "Usar mi ubicación" → solicita permiso GPS del sistema
- CTA secundario: búsqueda manual de barrio/zona (input + sugerencias)
- Si el usuario deniega el GPS → la búsqueda manual se activa automáticamente, sin mensajes de error
- Feedback inmediato (spinner) mientras se obtiene la coordenada
- Skeleton loaders en background durante la espera — nunca pantalla en blanco

**Estado sin GPS disponible:**
- Input de texto: "¿En qué zona estás?" con autocompletado por nombre de barrio o código postal
- Sin mapas en este paso — solo texto

---

### HU-03 — Pregunta 2: Nivel de hoy

**Como** usuario en el paso 2 del onboarding,
**quiero** declarar mi nivel de hoy (no de siempre),
**para** ver sesiones adecuadas a cómo me siento ahora mismo.

**Criterios de aceptación:**
- Pregunta: "¿Cuál es tu nivel hoy?"
- Selector visual de 5 niveles (no slider numérico — texto + ícono por nivel):

| Nivel | Nombre | Descripción honesta |
|---|---|---|
| 1 | Activo | Caminar, moverme, estirar |
| 2 | En marcha | Trote suave, yoga, funcional ligero |
| 3 | En forma | Funcional, natación, ciclismo, pádel suave |
| 4 | Potencia | Hyrox, pádel, tenis, funcional intenso |
| 5 | Élite | CrossFit, powerlifting, híbridos de alto rendimiento |

- Descripción honesta visible antes de seleccionar — no se puede "adivinar" el nivel correcto
- Un nivel preseleccionado por defecto: Nivel 2 (el más común entre el usuario objetivo)
- Haptic feedback al seleccionar nivel (vibración suave, `navigator.vibrate(10)`)
- CTA: "Ver sesiones cerca" — desactivado hasta que el usuario toca un nivel

---

### HU-04 — Celebración de bienvenida

**Como** usuario que acaba de completar las 2 preguntas,
**quiero** sentir que llegué a algo especial,
**para** que la primera impresión de Movi sea emocional, no funcional.

**Criterios de aceptación:**
- Pantalla de celebración (nivel 4 de intensidad según `docs/motion.md`)
- Mensaje cinematográfico personalizado: "Hay X personas entrenando cerca de ti hoy."
- Confetti explosion + spring animation
- Duración total: máximo 2.5 s antes de pasar al mapa (o CTA para saltar)
- Haptic feedback: patrón de celebración (`navigator.vibrate([50, 30, 80])`)

---

### HU-05 — Sin registro obligatorio

**Como** usuario que no quiere crear una cuenta ahora,
**quiero** poder explorar Movi sin registrarme,
**para** ver si vale la pena antes de dar mis datos.

**Criterios de aceptación:**
- Onboarding completo sin campo de email, nombre, ni contraseña
- Estado anónimo guardado en `localStorage` (ubicación + nivel)
- El prompt de registro aparece solo cuando el usuario intenta hacer una acción social (unirse a sesión, crear sesión)
- Nunca en el onboarding inicial

---

### HU-06 — Sin sesiones cercanas

**Como** usuario en una zona sin actividad,
**quiero** ver un mensaje honesto y un camino alternativo,
**para** no sentirme rechazado por la app.

**Criterios de aceptación:**
- Mensaje: "Nadie por aquí aún. Sé el primero."
- CTA: "Crear una sesión" (flujo de creación)
- CTA secundario: "Ver sesiones en toda la ciudad" (amplía radio)
- Sin pantalla de error — tono positivo, orientado a acción

---

### HU-07 — Conexión lenta

**Como** usuario con mala cobertura,
**quiero** que la app no se congele ni muestre pantallas en blanco,
**para** no perder confianza en el producto.

**Criterios de aceptación:**
- Skeleton loaders en todas las pantallas que cargan datos externos
- Timeout de geolocalización: 8 s — si supera, ofrece búsqueda manual automáticamente
- Sin spinners de carga sin límite de tiempo
