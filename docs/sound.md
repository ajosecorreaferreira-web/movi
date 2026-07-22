# Movi — Sonido y Haptics
> Sonido OFF por defecto. Haptics ON por defecto. La vibración es silenciosa y contextual.

---

## Filosofía

Los usuarios de Movi entrenan en parques, gimnasios, con otras personas, en el transporte al ir a la sesión. El sonido intrusivo en estos contextos es una falla de diseño, no una feature.

**Sonido:** Desactivado por defecto. El usuario elige activarlo en el onboarding ("¿Quieres que Movi te guíe con voz?") o en ajustes en cualquier momento.

**Haptics:** Activados por defecto. El feedback táctil es silencioso, discreto y contextual. Mejora la sensación de la app sin molestar a nadie.

---

## Configuración inicial (onboarding)

En el último paso del onboarding, una pregunta simple:

> *¿Quieres que Movi te guíe con voz durante los entrenos?*
> Puedes cambiarlo cuando quieras en ajustes.
> [Sí, actívalo] [Solo si me lo pides]

---

## Earcons — Sonidos de interfaz

Los earcons de Movi son breves, positivos, y nunca molestos. Duración máxima 2 segundos.

| Evento | Earcon | Duración | Descripción |
|---|---|---|---|
| Onboarding completado | `sound-powerup` | 2.0s | Crescendo que sube — como el power-up de un juego |
| Trofeo mayor desbloqueado | `sound-trophy` | 1.5s | Fanfare corta, bronce/oro, celebración |
| Logro mediano | `sound-chime` | 0.6s | Chime positivo, dos notas ascendentes |
| Acción confirmada | `sound-confirm` | 0.2s | Tap suave, confirmación |
| Match encontrado | `sound-match` | 0.8s | Pop amigable, "alguien está aquí" |
| Inicio de entreno | `sound-start` | 0.4s | Dos beeps, "ya empezamos" |
| Fin de entreno | `sound-complete` | 1.0s | Fanfare corta de cierre |
| Contador de reps (voz) | TTS dinámico | — | "1, 2, 3... ¡Diez!" — Síntesis de voz |
| Error / no disponible | `sound-soft-error` | 0.3s | Tono neutro descendente, nunca un error agresivo |
| Notificación | `sound-nudge` | 0.4s | Tap suave, diferente al confirm |

### Guía de entrenamiento con voz (si activo)
- Cuenta regresiva de reps: TTS dinámico en el idioma del usuario
- Cambio de ejercicio: "Siguiente: sentadillas con salto" + chime de transición
- Descanso: "Descansa. 30 segundos." (silencio hasta los 5s finales)
- Final de serie: "Serie completada. Bien hecho."
- Final de entreno: "Entrenamiento terminado." + `sound-complete`

---

## Haptic patterns

Implementados con la Web Vibration API (`navigator.vibrate()`). En iOS solo disponible si el usuario ha instalado la PWA (limitación de Safari).

```javascript
// Patterns de vibración de Movi
const haptics = {
  // Feedback básico
  tap:          [10],              // Toque de botón
  tapLight:     [8],               // Feedback muy suave
  tapMedium:    [20],              // Confirmación normal

  // Feedback de estado
  success:      [15, 30, 15, 60, 45],   // Patrón de éxito
  error:        [50, 30, 50],            // Error suave, nunca agresivo
  warning:      [30, 20, 30],            // Advertencia

  // Celebraciones
  achievementSmall: [20, 20, 20],        // Logro pequeño
  achievementMedium:[15, 20, 15, 20, 40], // Logro mediano
  achievementBig:  [30, 20, 30, 20, 60, 20, 80], // Trofeo / hito
  onboarding:      [30, 20, 30, 20, 30, 20, 30, 20, 60], // ¡Bienvenido!

  // Interacciones específicas
  matchFound:   [20, 30, 40],      // Aparece un compañero
  sessionStart: [10, 10, 30],      // Arranque de sesión
  repCount:     [5],               // Cada repetición contada
  newMessage:   [15],              // Mensaje en el chat de sesión
};
```

---

## Momentos con sonido + haptic combinados

| Momento | Sonido | Haptic | Notas |
|---|---|---|---|
| Onboarding completado | `sound-powerup` (si activo) | `onboarding` | El momento más importante |
| Primer compañero encontrado | `sound-match` (si activo) | `matchFound` | "Así empieza todo" |
| Trofeo desbloqueado | `sound-trophy` (si activo) | `achievementBig` | PS5 moment |
| Primera carrera/ejercicio | `sound-chime` (si activo) | `achievementSmall` | Primer paso |
| Sesión iniciada | `sound-start` (si activo) | `sessionStart` | — |
| Rep contada (entreno guiado) | Sin sonido / TTS voz | `repCount` | Haptic siempre, voz si activo |
| Sesión completada | `sound-complete` (si activo) | `achievementMedium` | — |
| Notificación importante | `sound-nudge` (si activo) | `tap` | Solo una vez, sin repetición |

---

## Reglas de sonido

- **Nunca reproducir sonido sin acción explícita del usuario** en la sesión actual
- **Nunca más de 1 sonido cada 3 segundos** — no saturar
- **Ducking automático:** Si el usuario tiene música sonando, los earcons se duchan al 30% del volumen del sistema o se silencian
- **Sin loops:** Ningún sonido de Movi se repite en loop automáticamente
- **Errores sin drama:** El `sound-soft-error` nunca debe sonar agresivo — un error en Movi no es un fracaso

---

## Control de accesibilidad

```javascript
// En ajustes del usuario
interface MoviSoundSettings {
  soundEnabled: boolean;        // OFF por defecto
  hapticsEnabled: boolean;      // ON por defecto
  voiceGuidance: boolean;       // OFF por defecto
  volume: number;               // 0-1, default 0.7
  language: 'es' | 'en';        // Para TTS
}
```

El usuario puede desactivar sonido, haptics, y guía de voz de forma independiente en cualquier momento desde el perfil.
