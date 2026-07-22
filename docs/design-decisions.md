# Movi — Decisiones de Diseño
> Mínimo 10 decisiones documentadas. Cada una con dimensión, alternativa rechazada y porqué.

---

## DD-001 — Border Radius: 10px en lugar de 8px o 12px

**Dimensión:** Forma  
**Arquetipo:** El Cuidador que Exige  
**Decisión:** `border-radius: 10px` como base

**Alternativa rechazada:**  
- 8px (Suave, estilo Stripe/Notion): demasiado frío para una app cuyo usuario principal está en postparto. El 8px dice "tecnología". Movi dice "persona".
- 12px (Redondo, estilo Airbnb): demasiado amigable para un producto que también exige esfuerzo y tiene componentes de deporte real.

**Por qué 10px:** El punto exacto donde la forma dice "accesible y humano" sin decir "infantil". Amigable sin perder la tensión de que esto es deporte.

---

## DD-002 — Color primario: Amanecer, no azul y no verde

**Dimensión:** Color  
**Arquetipo:** Inocente + Cuidador  
**Decisión:** `oklch(0.70 0.19 46)` — naranja-ámbar cálido

**Alternativa rechazada:**  
- Azul (estilo Strava, Nike, apps de salud): demasiado frío y competitivo. El azul en fitness dice "rendimiento", no "esperanza".
- Verde brillante (estilo salud/bienestar): demasiado asociado a dieta, apps médicas, veganos. Movi no es una app de salud — es una app de esperanza.

**Por qué Amanecer:** El color del sol que sale a las 7am cuando decides salir. Energía sin agresividad. Calidez sin blandura. La emoción primaria de Movi en un color.

---

## DD-003 — Fondo crema cálida, no blanco clínico

**Dimensión:** Color  
**Arquetipo:** Cuidador  
**Decisión:** `oklch(0.98 0.01 75)` — crema levemente cálida

**Alternativa rechazada:**  
- `#FFFFFF` blanco puro: frío, clínico, tecnológico. Huele a app de hospital o banco digital. Movi huele a parque y madera mojada.

**Por qué crema:** El matiz cálido apenas perceptible hace que toda la pantalla se sienta más humana y acogedora. Es el tipo de detalle que el usuario no nota conscientemente pero que hace que la app se sienta "bien" sin saber por qué.

---

## DD-004 — Tipografía: Plus Jakarta Sans, no Inter

**Dimensión:** Tipografía  
**Arquetipo:** Cuidador que Exige  
**Decisión:** Plus Jakarta Sans (variable)

**Alternativa rechazada:**  
- Inter: la tipografía por defecto de todo SaaS tech. Funciona bien pero no tiene alma. Movi no es un SaaS.
- DM Sans: más cálida que Inter pero menos carácter. Correcta pero genérica.
- Nunito: demasiado redonda, casi infantil. No encaja con la exigencia del arquetipo.

**Por qué Plus Jakarta Sans:** Variable font (rendimiento PWA), curvas levemente cálidas que la diferencian de Inter, excelente legibilidad a tamaños mobile, disponible en @fontsource sin coste.

---

## DD-005 — Sonido OFF por defecto

**Dimensión:** Sonido  
**Arquetipo:** Cuidador  
**Decisión:** `soundEnabled: false` en el estado inicial

**Alternativa rechazada:**  
- Sonido ON por defecto: Los usuarios entrenan en parques, gimnasios, con otras personas, en el metro yendo a la sesión. Un sonido inesperado en esos contextos es una molestia, no una feature. Strava lo aprendió tarde.

**Por qué OFF:** El cuidado real incluye respetar el contexto del usuario. Se le pregunta en el onboarding si quiere guía de voz. Si dice sí, activo. Si no, respeto.

---

## DD-006 — Haptics ON por defecto

**Dimensión:** Sonido / Haptics  
**Arquetipo:** Cuidador  
**Decisión:** `hapticsEnabled: true` en el estado inicial

**Alternativa rechazada:**  
- Haptics OFF por defecto: El feedback táctil es silencioso, no molesta a nadie, y mejora enormemente la sensación de la app especialmente durante el entreno (cada rep contada con un micro-vibrado). No hay razón para apagarlo por defecto.

**Por qué ON:** El tacto es el sentido más directo. Una vibración de 10ms al pulsar un botón hace que la app se sienta viva sin que el usuario tenga que ver la pantalla.

---

## DD-007 — Motion: rápido como base, cinematográfico para hitos

**Dimensión:** Motion  
**Arquetipo:** Cuidador que Exige + Juguetón (solo en celebraciones)  
**Decisión:** Transiciones base 150-250ms ease-out. Celebraciones 800-1200ms spring con bounce.

**Alternativa rechazada:**  
- Motion expresivo en todo: hace la app lenta y agotadora. Duolingo tiene este problema — las animaciones constantes aburren en uso intensivo.
- Sin animaciones de celebración: las apps de fitness sin celebración son frías. El logro desbloqueado tiene que sentirse como algo real.

**Por qué esta combinación:** El 95% del tiempo la app se quita de en medio. El 5% restante — trofeo, primer compañero, 30 días — la app para y celebra como un juego de PS5. La rareza de la celebración grande la hace más impactante.

---

## DD-008 — Onboarding: 2 preguntas obligatorias, el resto inferido

**Dimensión:** Flujo / UX  
**Arquetipo:** Cuidador  
**Decisión:** Solo ¿Dónde estás? + ¿Cuál es tu nivel hoy? para el primer uso

**Alternativa rechazada:**  
- Onboarding largo con 8-10 preguntas: La barrera psicológica de empezar es la más importante. Cada pregunta adicional multiplica el abandono. Strava perdió usuarios por onboarding extenso en su versión móvil de 2022.

**Por qué 2 preguntas:** En 30 segundos el usuario tiene su primera sesión y ve gente cerca. La emoción de "esto funciona" supera a cualquier personalización que podría hacerse con más datos. Los datos se recopilan después, en uso.

---

## DD-009 — Tres modos de sesión: Libre, Guiado, Invisible

**Dimensión:** Flujo / Social  
**Arquetipo:** Cuidador  
**Decisión:** El usuario elige su nivel de exposición social

**Alternativa rechazada:**  
- Solo modo público (todos ven que estás entrenando): excluye al adolescente tímido y a quien está pasando un día difícil pero quiere moverse.
- Solo modo privado: destruye la propuesta de valor social de Movi.

**Por qué tres modos:** La soledad social no se combate forzando la interacción. Se combate creando las condiciones para que la interacción ocurra de forma natural. El Modo Invisible permite estar presente sin exponerse — exactamente como el chico de Santander en el gimnasio de la urbanización.

---

## DD-010 — Densidad media-baja: una pantalla, un objetivo

**Dimensión:** Espaciado / Densidad  
**Arquetipo:** Cuidador  
**Decisión:** Máximo 1 CTA primario por pantalla. Si algo no cabe, va a la siguiente pantalla.

**Alternativa rechazada:**  
- Alta densidad de información (estilo Huawei/apps de fitness complejas): la madre con un bebé en brazos que usa la app con una sola mano no puede procesar 15 elementos. Nadie puede, pero ella menos.

**Por qué baja densidad:** Cada decisión que el usuario no tiene que tomar es una fricción eliminada. Movi toma las decisiones por el usuario siempre que puede. El espacio en blanco es respeto al tiempo del usuario.

---

## DD-011 — Gamificación con significado, no decorativa

**Dimensión:** Gamificación / Motivación  
**Arquetipo:** Héroe (secundario)  
**Decisión:** Las medallas representan hitos reales y tienen nombres descriptivos

**Alternativa rechazada:**  
- Gamificación genérica (nivel 1, nivel 2, etc.): sin conexión emocional, sin historia. El usuario no recuerda haber desbloqueado "Nivel Bronce".

**Por qué medallas con nombre:** "Primer encuentro" — "Vecino activo" — "Capitán" — "Constante" — "Colectivo". Cada nombre cuenta algo sobre lo que el usuario hizo. Eso se queda. Eso se comparte. Eso es lo que CrossFit hizo sin gastar un euro en marketing.

---

## DD-012 — Pantallas vacías como invitación, nunca como fracaso

**Dimensión:** Estados de interfaz / Voz  
**Arquetipo:** Cuidador + Inocente  
**Decisión:** Toda pantalla sin contenido tiene un texto positivo + CTA

**Alternativa rechazada:**  
- "No hay resultados" / "Sin sesiones disponibles": frío, clínico, cierra la conversación.

**Por qué invitación:** "Nadie entrena por aquí aún. Sé el primero — alguien aparecerá." Es la misma energía que el chico de Santander en el gimnasio. No hace falta hablar. Solo hace falta estar ahí primero.
