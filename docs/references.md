# Movi — DS de Referencia

> Los Design Systems que inspiran cada dimensión de Movi. Qué tomamos y qué dejamos.

---

## Por arquetipo principal: El Cuidador

### Shopify Polaris
**Por qué es referencia:** El DS de cuidado por excelencia. Accesibilidad como valor central, componentes que priorizan la comprensión antes que la estética, tono claro y empático.

**Qué tomamos de Polaris:**
- Filosofía de componentes accesibles (Radix UI como equivalente open-source)
- Densidad media — ni minimalismo extremo ni sobrecarga
- Documentación de componentes con guía de uso y antipatrones
- Tokens semánticos bien nombrados (success, warning, error con sus variantes `-text`)

**Qué dejamos:**
- Su paleta verde corporativa — demasiado asociada a Shopify
- Su tipografía Inter — demasiado tech para Movi

**Tokens CSS extraídos:**
```css
/* Inspirados en Polaris */
--color-success-subtle:  oklch(0.95 0.04 148);
--color-error-subtle:    oklch(0.96 0.04 25);
--color-warning-subtle:  oklch(0.97 0.04 80);
```

---

## Por energía y gamificación: Strava

**Por qué es referencia:** La mejor implementación de gamificación social en deporte. Streaks, logros, segmentos, el feed de actividad social — todo funciona porque está conectado a actividad real.

**Qué tomamos de Strava:**
- La lógica de racha (streak) como motivador principal
- El resumen semanal como formato de retención
- Los logros como hitos narrativos (el KOM de Strava es como nuestro "Vecino activo")
- El mapa como UI principal (no listas)

**Qué dejamos:**
- Su obsesión por el rendimiento — Movi no compara tiempos
- Su interfaz densa con muchos números en la misma pantalla
- Su tono competitivo — Movi es colaborativo

---

## Por calidez y fotografía: Airbnb Design System

**Por qué es referencia:** La app que convirtió la confianza en un producto de consumo masivo. Todo su DS está diseñado para que un extraño confíes en otro extraño.

**Qué tomamos de Airbnb:**
- El uso generoso del espacio en blanco
- La fotografía como primer elemento de confianza (avatar grande, foto del espacio)
- El radius 12px como punto de partida (Movi usa 10px, levemente menos redondo)
- El sistema de confianza: reseñas, verificaciones, ratings — adaptado para usuarios de Movi
- El tono de las pantallas vacías: siempre invitación, nunca rechazo

**Qué dejamos:**
- Su paleta rosa-coral (demasiado asociada a Airbnb)
- Su escala tipográfica muy grande para textos de cuerpo

**Tokens CSS inspirados:**
```css
--color-background: oklch(0.98 0.01 75);  /* Crema cálida, no el blanco de Airbnb */
--radius-lg:        16px;   /* Más cerca del 16px de Airbnb que del 12px */
--card-padding:     20px;   /* Generosidad de espacio interno */
```

---

## Por tipografía mobile: Linear

**Por qué es referencia:** La mejor jerarquía tipográfica en una app móvil de productividad. Cada peso tiene un propósito. Nada es decorativo.

**Qué tomamos de Linear:**
- La disciplina tipográfica: máximo 3 tamaños por pantalla
- El uso del peso (700-800) para crear jerarquía sin necesidad de color
- Los tracking negativos en tamaños grandes
- La sensación de que la tipografía "trabaja" sin que te des cuenta

**Qué dejamos:**
- Su paleta oscura (dark-mode first no es apropiado para Movi)
- Su densidad alta — Movi es más espacioso
- Su tono ultra-técnico

---

## Por gamificación con celebración: Duolingo

**Por qué es referencia:** La app que convirtió el aprendizaje en adicción positiva. Sus celebraciones, streaks, y sistema de puntos son el benchmark del sector.

**Qué tomamos de Duolingo:**
- La celebración desproporcionada de pequeños logros
- El confetti como lenguaje visual de éxito
- La racha como el KPI de retención más importante
- El resumen semanal como ritual de engagement

**Qué dejamos:**
- Su tono infantilizado (Movi habla a adultos en momentos difíciles de su vida)
- Sus animaciones para cada micro-acción
- Su mascota omnipresente
- Su presión de racha negativa ("¡Perdiste tu racha!" con Duo llorando)

**En Movi la racha se celebra, nunca se usa como culpa.**

---

## Por motion: Apple HIG (Human Interface Guidelines)

**Por qué es referencia:** El estándar de facto para mobile UX. Las transiciones de iOS, el spring nativo de SwiftUI, el feedback háptico — todo define las expectativas del usuario.

**Qué tomamos:**
- El `spring` como easing nativo para interacciones táctiles
- La velocidad base: 200-300ms para transiciones estándar
- El feedback háptico como parte integral de la UX, no opcional
- La regla de que la animación de salida es más rápida que la de entrada

**Tokens extraídos:**
```css
--mobile-spring:        cubic-bezier(0.32, 0.72, 0, 1);
--mobile-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
--mobile-duration-tap:  100ms;
--mobile-duration-page: 350ms;
```

---

## Por iconografía: Linear + Lucide

**Por qué son referencia:**
- Linear usa Lucide como base y demuestra que el stroke 1.5 es el punto perfecto entre elegancia y legibilidad
- Lucide es la versión mantenida y ampliada de Feather Icons

**Qué tomamos:**
- `strokeWidth: 1.5` como valor universal
- `currentColor` como filosofía — el color viene del contexto
- Tamaño base `24px` para todos los elementos de navegación
- La idea de que los iconos nunca son decorativos — siempre comunican algo

---

## Tabla resumen

| Dimensión | Referencia | Qué tomamos |
|---|---|---|
| Componentes accesibles | Shopify Polaris | Filosofía, tokens semánticos |
| Gamificación social | Strava | Streak, resumen semanal, mapa como UI |
| Calidez y confianza | Airbnb | Espacio, fotografía, radius |
| Tipografía disciplinada | Linear | Jerarquía de pesos, tracking |
| Celebración con impacto | Duolingo | Confetti, logros, streaks |
| Motion nativo mobile | Apple HIG | Spring tokens, duraciones |
| Iconografía | Lucide / Linear | strokeWidth 1.5, currentColor |
