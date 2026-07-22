# Movi — Flujos Principales

---

## Flujo 1 — Onboarding (primer uso)

**Objetivo:** En 30 segundos, el usuario tiene su primera sesión disponible.

**Pantallas:**
1. Splash / bienvenida: "El deporte es la excusa. La conexión es el producto." + CTA "Empieza"
2. Pregunta 1: "¿Dónde estás?" — Geolocalización automática o búsqueda manual
3. Pregunta 2: "¿Cuál es tu nivel hoy?" — Slider 1-5 con descripción honesta de cada nivel
4. **Celebración de onboarding ★★** — Pantalla de éxito: confetti, mensaje de bienvenida cinematográfico
5. Primera vista: Mapa con sesiones cercanas ya cargadas

**Componentes clave:** LocationPicker, LevelSelector, CelebrationScreen (nivel 4)

**Estados:**
- Sin GPS disponible → búsqueda manual de zona
- Sin sesiones cerca → "Nadie por aquí aún. Sé el primero." + CTA crear sesión
- Conexión lenta → skeleton loaders, nunca pantalla en blanco

---

## Flujo 2 — Encontrar y unirse a una sesión

**Objetivo:** Ver quién entrena cerca y unirse con mínima fricción.

**Pantallas:**
1. Mapa + lista de sesiones (pantalla principal)
2. Tap en sesión → Bottom sheet con detalles (espacio, nivel, personas, hora, descripción)
3. CTA "Unirme" → confirmación en 1 tap
4. Confirmación: "¡Estás dentro! Ana y 2 personas más te esperan." + add to calendar
5. Recordatorio día anterior + día del evento

**Componentes clave:** SessionMap, SessionCard, SessionDetailSheet, JoinConfirmation

**Modos:**
- Modo libre: sesiones abiertas que cualquiera puede ver y unirse
- Modo guiado: la app asigna usuarios a sesiones según nivel y zona
- Modo invisible: el usuario puede ver sesiones pero no aparece en el mapa

---

## Flujo 3 — Crear una sesión (Modo libre)

**Objetivo:** Publicar una sesión en menos de 60 segundos.

**Pantallas:**
1. CTA "+" en bottom nav → modal/pantalla de creación
2. Paso 1: ¿Dónde? → Selección de espacio (mapa o lista)
3. Paso 2: ¿Cuándo? → Fecha + hora (picker simple)
4. Paso 3: ¿Qué nivel? → Slider 1-5
5. Paso 4 (opcional): Descripción breve → "30 min funcional, nivel 3, principiantes bienvenidos"
6. Publicar → confirmación + "Tu sesión está activa. La gente puede unirse."

**Componentes clave:** CreateSessionFlow (multi-step), SpacePicker, DateTimePicker, LevelPicker

---

## Flujo 4 — Guía de entrenamiento (durante la sesión)

**Objetivo:** Guiar el entrenamiento de forma contextual con o sin compañero.

**Pantallas:**
1. Pantalla de inicio de sesión: resumen (espacio, nivel, participantes, duración)
2. CTA "Iniciar entrenamiento"
3. Vista de ejercicio: nombre + video de 2-3s generado por IA + contador de reps/tiempo
4. Cuenta regresiva entre series (visual + haptic + voz si activo)
5. Ejercicios en pareja si hay compañero: instrucciones diferenciadas para cada uno
6. Pantalla de fin: resumen + CTA compartir + CTA celebración

**Componentes clave:** WorkoutScreen, ExerciseCard, RepCounter, RestTimer, WorkoutSummary

**Adaptaciones:**
- Si hay compañero → ejercicios en pareja disponibles
- Si está en parque → ejercicios con barras y máquinas al aire libre
- Si está en gimnasio partner → acceso a equipamiento específico
- Si tiene 20 min → plan corto; si tiene 60 min → plan completo

---

## Flujo 5 — Desbloquear un logro / Celebración

**Objetivo:** Que el momento de logro se sienta real, importante, y compartible.

**Trigger:** Cualquier hito de gamificación significativo

**Secuencia:**
1. Evento ocurre (ej: primera sesión con alguien nuevo)
2. Overlay oscuro fade-in (200ms)
3. Trofeo emerge desde abajo (600ms spring)
4. Nombre del logro aparece: "Primer encuentro" (300ms fade)
5. Descripción: "Primera sesión con alguien nuevo. Así empieza todo." (200ms)
6. Confetti explosion (1200ms)
7. Botones: "Compartir" + "Ver todos mis logros" + "Cerrar"

**Compartir:**
- Genera imagen con frame de Movi + nombre del logro
- Pre-rellenado para Instagram stories y TikTok
- Texto sugerido que el usuario puede editar

---

## Flujo 6 — Quedadas mensuales

**Objetivo:** Conectar grupos de 15 personas del mismo nivel y zona una vez al mes.

**Cómo funciona:**
1. La app detecta usuarios activos por zona y nivel
2. Crea automáticamente grupos de máximo 15
3. Elige al delegado/líder (usuario con más sesiones organizadas en la zona)
4. El delegado recibe instrucciones especiales + beneficios (acceso premium temporal)
5. Todos los miembros reciben invitación con fecha tentativa
6. El delegado confirma espacio, hora, y activa el entrenamiento en la app
7. La app gestiona confirmaciones, recordatorios, y el entrenamiento del día

**Pantallas:**
- Notificación: "Estás en una quedada de 15 personas para este mes"
- Pantalla de quedada: info, delegado, participantes, fecha, CTA confirmar
- Día del evento: guía de entrenamiento en modo grupo (con roles para cada participante)
- Post-quedada: pantalla de celebración colectiva + foto de grupo con frame

**Componentes clave:** GatheringCard, GatheringDetail, GroupWorkoutScreen

---

## Flujo 7 — Resumen semanal

**Objetivo:** Motivar la continuidad con datos claros y celebración del progreso.

**Trigger:** Domingo a las 20:00 o lunes a las 08:00 (configurable)

**Notificación push:**
> "Tu semana en Movi. 3 sesiones, 847 puntos, racha de 18 días 🔥"

**Pantalla de resumen:**
```
Esta semana:
✅ 3 sesiones completadas
👥 2 personas nuevas conocidas
🔥 847 puntos ganados
📈 +12% respecto a la semana pasada

Tu racha: 18 días 🔥

Esta semana quedan 2 sesiones cerca de ti →
[Ver sesiones]
```

**Diseño:** Limpio, con mucho espacio, datos grandes y legibles, un solo CTA al final.
**Compartible:** Opción de exportar como imagen para Instagram stories.
