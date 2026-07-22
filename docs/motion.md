# Movi — Motion
> Arquetipo: **El Cuidador que Celebra**
> Base rápida + momentos cinematográficos cuando algo importa de verdad

---

## Filosofía de motion

Movi tiene dos velocidades:

**El 95% del tiempo:** La app es rápida, eficiente, y se quita de en medio. No hace perder el tiempo. Las transiciones son casi invisibles — el usuario no debería notar el motion, solo notar que las cosas se sienten bien.

**El 5% restante:** Cuando ocurre algo que de verdad importa — primer compañero, racha de 30 días, primera quedada — la app para, respira, y celebra como si hubiera marcado un gol. Trofeo emergiendo desde abajo, confetti, sonido opcional. Como un juego de PS5.

> **Regla de oro:** Si tienes que decidir si añadir animación, no la añadas. Si tienes que decidir si quitarla de una celebración, tampoco la quites.

---

## Arquetipo de motion

**El Cuidador que Celebra** se caracteriza por:
- Transiciones base: `ease-out`, 150-250ms — natural, sin rebote
- Celebraciones: `spring` con bounce — alegría física
- Entrada de elementos: bottom-to-top o fade — nunca desde arriba (es amenazante)
- Salida de elementos: fade out o down — sin drama
- PWA mobile: spring nativo para gestos táctiles

---

## Tokens de duración

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | 50ms | Feedback inmediato de tap (color de botón) |
| `--duration-fast` | 100ms | Cambios de estado menores |
| `--duration-base` | 200ms | Transiciones estándar |
| `--duration-moderate` | 300ms | Entradas de componentes, navegación |
| `--duration-slow` | 400ms | Bottom sheets, modales |
| `--duration-slower` | 600ms | Transiciones de pantalla completa |
| `--duration-celebration` | 800ms | Trophy enter, logro desbloqueado |
| `--duration-confetti` | 1200ms | Lluvia de confetti post-logro |

---

## Tokens de easing

| Token | Curva | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entradas — la mayoría de elementos |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Salidas — elementos que se van |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Transiciones de pantalla |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Celebraciones con bounce |
| `--ease-snap` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Swipe gestures, snapping |

### Mobile spring (PWA)
```css
--mobile-spring:        cubic-bezier(0.32, 0.72, 0, 1);      /* iOS-like page transitions */
--mobile-spring-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Celebraciones y confirmaciones */
--mobile-duration-tap:  100ms;   /* Respuesta táctil inmediata */
--mobile-duration-base: 250ms;   /* Transiciones de página */
--mobile-duration-page: 350ms;   /* Page transitions completas */
```

---

## Microinteracciones por componente

### Botones
- **Tap down:** `scale(0.97)` en `50ms` ease-in — feedback físico inmediato
- **Tap up / release:** `scale(1)` en `100ms` ease-spring — pequeño rebound
- **Hover (desktop):** `translateY(-1px)` + `shadow-primary` en `150ms`
- **Loading state:** pulse suave `opacity 0.7 → 1` en `800ms` infinite

### Bottom Navigation
- **Tab activo → nuevo tab:** Icon scale `1 → 0.85 → 1.05 → 1` en `250ms` spring
- **Indicator (barra/dot):** slide horizontal `200ms` ease-in-out
- **Primer acceso a tab:** icon bounce suave `1 → 1.15 → 1` en `300ms`

### Cards de sesión / usuario
- **Entrada en lista:** slide-up + fade, cada card con `stagger delay: 50ms`
- **Tap en card:** `scale(0.98)` en `100ms` — confirmación táctil
- **Swipe to join:** slide horizontal con spring al encajar

### Bottom sheets
- **Apertura:** slide-up desde `translateY(100%)` en `350ms` mobile-spring
- **Cierre:** slide-down `250ms` ease-in
- **Background:** fade-in `oklch(0 0 0 / 0.5)` en `200ms`
- **Pull to dismiss:** seguir el gesto con `transform: translateY(Xpx)`, snap al soltar

### Inputs y forms
- **Focus:** borde cambia de `--color-border` a `--color-primary` en `150ms`
- **Error shake:** `translateX(-4px 4px -4px 4px 0)` en `400ms` — solo si hay error real
- **Success check:** icono aparece con `scale(0 → 1.2 → 1)` en `300ms` spring

### Mapa de sesiones
- **Pin de sesión:** `scale(0 → 1.1 → 1)` al cargar, stagger por distancia
- **Tap en pin:** pulse ring expand `0px → 40px` opacity `0.5 → 0` en `400ms`
- **Pin activo vs inactivo:** opacity `0.5` para los no seleccionados

---

## Momentos de celebración — La magia de Movi

### Nivel 1 — Confirmación pequeña (acción completada)
*Ejemplos: unirte a sesión, compartir un reel, guardar preferencias*

```
→ Checkmark aparece: scale(0 → 1.1 → 1) en 300ms spring
→ Color del elemento: flash del primary en 150ms
→ Haptic: light tap (10ms vibrate)
```

### Nivel 2 — Logro mediano (gamificación básica)
*Ejemplos: primera semana completada, 5 sesiones con el mismo parque*

```
→ Badge de logro: slide-up desde abajo + fade en 400ms spring
→ Confetti ligero: 20 partículas, 600ms
→ Número de puntos: count-up animation
→ Haptic: medium impact (20ms vibrate)
→ Sonido: chime suave (si activo)
```

### Nivel 3 — Trofeo mayor (hitos reales) ★
*Ejemplos: primera sesión con alguien, primer colega, primera quedada organizada, 30 días de racha*

```
SECUENCIA COMPLETA (1400ms total):

0ms     → Pantalla de celebración: fade a overlay oscuro (200ms)
200ms   → Trofeo emerge desde Y(100%) + scale(0.5):
           → Y(0) + scale(1.1) en 600ms ease-spring (bounce)
           → settle a scale(1) en 200ms
600ms   → Nombre del logro aparece: fade + slide-up (300ms)
800ms   → Confetti explosion: 80 partículas, caída 1200ms
900ms   → Texto descriptivo: fade-in (200ms)
1000ms  → Botones de acción: fade-up stagger (200ms cada uno)
1200ms  → Glow pulse en el trofeo: ring expand loop 2s

Haptic: success pattern (15ms + 30ms gap + 15ms + 60ms gap + 45ms)
Sonido: fanfare corta 1.2s (si activo)
```

### Nivel 4 — Onboarding completado ★★
*El más especial — "El mejor día para empezar es hoy"*

```
SECUENCIA ESPECIAL:

Pantalla final del onboarding:
→ Fondo: gradient radial del primary desde el centro
→ Texto hero: "¡Hoy arrancas!" — scale(0.8 → 1) en 600ms spring
→ Subtexto: "No tiene que ser perfecto. Solo tiene que empezar." fade-in delay 400ms
→ Confetti máximo: 120 partículas, colores de marca
→ CTA pulsante con shadow-primary glow
→ Haptic: celebration pattern (30ms + 20ms + 30ms + 20ms + 60ms)
→ Sonido: power-up crescendo 2s (si activo)
```

---

## Transiciones de pantalla (PWA)

```css
/* Page enter */
.page-enter {
  animation: page-slide-in var(--mobile-duration-page) var(--mobile-spring) forwards;
}

/* Page exit */
.page-exit {
  animation: page-slide-out 250ms var(--ease-in) forwards;
}

@keyframes page-slide-in {
  from { transform: translateX(100%); opacity: 0.8; }
  to   { transform: translateX(0); opacity: 1; }
}

@keyframes page-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to   { transform: translateX(-30%); opacity: 0.6; }
}
```

---

## Accesibilidad

```css
@media (prefers-reduced-motion: reduce) {
  /* Mantener feedback pero eliminar motion complejo */
  .movi-trophy-enter { animation: fade-in 300ms ease-out; }
  .confetti { display: none; }
  * { transition-duration: 0.01ms !important; }
}
```

> Movi respeta `prefers-reduced-motion`. Las celebraciones degradan a fades simples.
> El feedback táctil (haptics) se mantiene siempre — no depende de motion visual.
