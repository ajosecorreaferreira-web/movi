# product.md — Qué es Movi

**Versión:** 2.0  
**Fecha:** Julio 2026

---

## El problema

La soledad es la pandemia silenciosa de nuestro tiempo. Pero decirle a alguien "descarga esta app para hacer amigos" no funciona — hay demasiada presión, demasiada exposición, demasiado riesgo de rechazo.

El deporte resuelve eso. Cuando quedas para entrenar, el objetivo declarado es el ejercicio. La conexión surge sola, sin presión, sin la incomodidad de "quedar para conocerse".

---

## La solución

**Movi** es una PWA mobile-first que conecta personas para entrenar juntas en espacios públicos cercanos. Sin gimnasio obligatorio, sin cuotas, sin compromisos fijos.

**El concepto central:** El deporte es la excusa. La conexión es el producto.

**La frase de marketing:** "No te vendemos un cuerpo. Te damos gente con quien conseguirlo."

---

## Cómo funciona

**Onboarding en 2 preguntas:**
1. ¿Dónde estás? (ubicación)
2. ¿Cuál es tu nivel hoy? (1-5)

En menos de 30 segundos el usuario ve quién entrena cerca y puede apuntarse a una sesión o proponer la suya.

**3 modos de sesión:**
- **Libre** — publicas una sesión, otros se unen si quieren
- **Guiado** — la app organiza, tú apareces
- **Solo visible** — entrenas solo pero apareces en el mapa

**Filtros de sesión:**
- Todos (default)
- Solo mujeres
- Solo hombres
- Con niños 👶
- Dog-friendly 🐕

---

## Los 5 niveles

1. **Activo** — caminar, moverme, empezar
2. **En marcha** — trote suave, algo de funcional
3. **En forma** — funcional, natación, bici
4. **Potencia** — Hyrox, pádel, funcional intenso
5. **Élite** — crossfit, híbridos, pesas serias

---

## La guía de entrenamiento

Mejor que Nike Training Club en un aspecto clave: es contextual.

- Sabe dónde estás (parque, piscina, gimnasio) y adapta los ejercicios
- Si vas acompañado, sugiere ejercicios en pareja
- Vídeos cortos de 2-3 segundos por ejercicio
- Guiado con voz — cuenta repeticiones y tiempos
- Funcional como base universal — sin equipamiento obligatorio

**Estructura de cada sesión:**
- Llegada (5 min)
- Calentamiento (5 min)
- Bloque principal (20 min) — con vueltas y repeticiones
- Finisher (5 min)
- Enfriamiento (5 min)

---

## El efecto social — lo que hace que la gente lo use y lo comparta

**El Momento Movi:**
Al terminar una sesión grupal, la app propone hacer una foto de grupo con frame de Movi. Un tap para compartir en Instagram Stories o TikTok. El marketing lo hacen los usuarios.

**El resumen semanal shareable:**
"Esta semana entrené 3 veces, conocí a 2 personas nuevas." Listo para compartir como historia.

**Las quedadas mensuales:**
1-2 veces al mes la app organiza eventos por nivel y zona. Con sistema de delegados/líderes que reciben incentivos.

---

## Gamificación

- Puntos por entrenar solo: 10 puntos
- Puntos por entrenar acompañado: 25 puntos (+150%)
- Bonus por constancia: 3 veces/semana → x2
- Puntos por organizar sesión: 50 puntos
- Puntos por asistir a quedada: 100 puntos

**Medallas:** Primera sesión con alguien nuevo, 5 sesiones en el mismo parque, primera quedada organizada, 30 días sin fallar.

---

## Funcionalidades core

- Onboarding en 2 preguntas
- Mapa de sesiones cercanas en tiempo real
- Plan de entrenamiento generado por IA
- Mapa de espacios deportivos gratuitos (parques, máquinas, piscinas municipales)
- Sesiones: publicar, unirse, modo solo visible
- Filtros: nivel, distancia, género, dog-friendly, con niños
- Gamificación: puntos, medallas, ranking local
- Quedadas mensuales organizadas por nivel y zona
- Sistema de delegados/líderes con incentivos
- Integración Google Calendar y Apple Calendar
- Notificaciones contextuales (no saturantes)
- Resumen semanal/mensual shareable
- "Momento Movi" — foto de grupo para redes sociales
- Guía para romper el hielo
- Guía de nutrición (opcional, se activa si el usuario quiere)

---

## Los espacios

La infraestructura gratuita que nadie ha mapeado bien:
- Parques con máquinas al aire libre (como el Pinar de Las Rozas)
- Zonas de cuerpo libre
- Piscinas y gimnasios municipales
- Urbanizaciones con zona comunitaria
- Espacios abiertos para correr
- Gimnasios Hyrox y híbridos partners
- Zonas dog-friendly para sesiones con perro

---

## Modelo de negocio

**Freemium:**
- Gratis: plan básico, ver sesiones, unirse a sesiones abiertas, 1 quedada mensual
- Premium 6€/mes: plan avanzado, grupos pequeños exclusivos, estadísticas detalladas, nutrición, sin anuncios

**B2B:**
- Gimnasios Hyrox y híbridos: instalaciones + clases especiales (5€/persona — Movi gestiona el cobro)
- Ayuntamientos: integración instalaciones municipales

---

## Stack técnico

```
Framework:     React + Vite + TypeScript
Estilos:       Tailwind CSS v4 + shadcn/ui
Motion:        Motion (Framer Motion)
PWA:           vite-plugin-pwa
Estado:        Zustand
Base de datos: Supabase (pendiente)
Auth:          Google + Apple (pendiente)
Maps:          Google Maps API con estilo personalizado Movi
Deploy:        Vercel
Repo:          github.com/ajosecorreaferreira-web/movi
URL:           https://movi-neon-eight.vercel.app
```

---

## Estado del MVP

**Completado:**
- ✅ Onboarding — Step1 (ubicación), Step2 (nivel), Complete (celebración)
- ✅ Home — mapa Pinar Las Rozas, tabs días, lista sesiones, FAB proponer
- ✅ Sistema de agentes Claude Code (6 agentes)
- ✅ PWA configurada

**Pendiente:**
- ⏳ Pantalla de detalle de sesión (3 niveles)
- ⏳ Motor de entrenamiento con IA
- ⏳ Supabase + Auth
- ⏳ Google Maps real con estilo Movi
- ⏳ Notificaciones push
- ⏳ Gamificación
- ⏳ movi-admin (panel desktop)

