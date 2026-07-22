# Movi — Dont Do
> Lo que Movi nunca hace, en tres niveles.

---

## Nivel 1 — Universales (cualquier DS bien hecho)

**Diseño:**
- ✗ Texto de cuerpo por debajo de 14px en producción
- ✗ Ratio de contraste inferior a 4.5:1 para texto normal (WCAG AA)
- ✗ Iconos interactivos sin área de toque mínima de 44×44px
- ✗ Colores definidos en hex — siempre oklch en los tokens
- ✗ Más de 3 niveles de jerarquía tipográfica en una pantalla
- ✗ Efectos de sombra idénticos en todos los niveles de elevación
- ✗ Animaciones que no respetan `prefers-reduced-motion`

**Código:**
- ✗ Hardcodear colores o tamaños fuera de los tokens CSS
- ✗ Crear componentes ad-hoc cuando existe el equivalente en shadcn/ui
- ✗ CSS en línea para valores que deberían ser tokens
- ✗ Imágenes sin `alt` text
- ✗ Formularios sin `label` asociado a cada `input`

**Voz:**
- ✗ Copy que no puede leerse en voz alta sin sonar raro
- ✗ Texto de placeholder como sustituto de label
- ✗ Mensajes de error en jerga técnica ("Error 503")
- ✗ CTAs genéricos: "Click aquí", "Enviar", "Aceptar"

---

## Nivel 2 — Específicos de Movi

**Densidad y layout:**
- ✗ Más de 1 CTA primario por pantalla
- ✗ Más de 3 acciones secundarias visibles sin colapsar
- ✗ Pantalla vacía sin texto positivo + CTA
- ✗ Onboarding con más de 1 pregunta por pantalla
- ✗ Pedir datos que no son necesarios en el primer uso

**Voz y tono:**
- ✗ Insultos, diminutivos despectivos, lenguaje excluyente
- ✗ Comparar negativamente usuarios entre sí
- ✗ Positivismo vacío: "¡Eres el mejor del mundo! ¡Increíble!"
- ✗ Presión por culpa: "Llevas 5 días sin entrenar, ¿qué te pasa?"
- ✗ Corporativese: "soluciones de bienestar", "experiencia de usuario optimizada"
- ✗ Signos de exclamación múltiples: "¡¡¡Genial!!!"

**Social y conexión:**
- ✗ Forzar la interacción — siempre hay modo de entrada sin exposición
- ✗ Mostrar la actividad de un usuario sin su permiso explícito
- ✗ Comparar rankings sin que el usuario lo haya activado
- ✗ Notificaciones más de 1 vez por el mismo evento

**Celebración:**
- ✗ Animación de trofeo para logros menores (confirmar una sesión no es un trofeo)
- ✗ Confetti para cualquier acción — reservar para los 5-7 hitos reales
- ✗ Celebración sin haptic — la vibración es parte de la experiencia

**Sonido:**
- ✗ Sonido activado por defecto sin permiso del usuario
- ✗ Dos sonidos solapados
- ✗ Sonido de error agresivo (nunca un buzzer)
- ✗ Loop automático de cualquier audio

---

## Nivel 3 — Específicos del arquetipo El Cuidador que Exige

**Lo que NO es Movi (aunque podría parecerlo):**

**No es Nike Training Club:**
- ✗ Lenguaje de "rendimiento máximo", "rompe tus límites", "sin excusas"
- ✗ Comparativas de velocidad / tiempo sin que el usuario las haya pedido
- ✗ Foto de portada siempre con atleta de élite en pleno esfuerzo máximo
- ✗ Métricas de VO2max, pace/km, etc. sin contexto para el usuario medio

**No es Headspace / Calm:**
- ✗ Tono meditativo-pasivo: "escucha tu cuerpo", "sin prisa", "respira"
- ✗ Paleta morada o beige-pastel, ilustraciones abstractas zen
- ✗ Ausencia de urgencia — Movi sí empuja (con cariño)
- ✗ Solo introspección individual — Movi es conexión con otros

**No es Huawei Health / apps sobrecargadas:**
- ✗ Dashboard con 12+ métricas en una pantalla
- ✗ Menús de 3+ niveles de profundidad para acciones comunes
- ✗ Funcionalidades que no tienen un caso de uso claro en Movi
- ✗ Onboarding que pide sincronizar 5 dispositivos antes de empezar

**No es Duolingo:**
- ✗ Animaciones para cada micro-acción (click, hover, scroll)
- ✗ Mascota que aparece en cada pantalla
- ✗ Tonalidad infantilizada: "¡Súper! ¡Genial! ¡Felicidades campeón!"
- ✗ Streak agresivo que te hace sentir culpable si fallas un día

**No es una red social genérica:**
- ✗ Feed de actividad de otros usuarios sin filtro contextual
- ✗ Likes, comentarios públicos sin que el usuario los haya activado
- ✗ Presión de "X personas te están viendo"
- ✗ El engagement como fin en sí mismo — en Movi el engagement es la consecuencia de entrenar, no el objetivo
