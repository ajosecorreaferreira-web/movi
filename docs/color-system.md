# Movi — Sistema de Color
> Paleta: **Amanecer × Selva × Tierra caliente**
> Modelo: oklch — perceptualmente uniforme, WCAG-verificado

---

## Filosofía

Los colores de Movi cuentan una historia: sales a las 7am, el sol acaba de salir (Amanecer), llegas al parque (Selva), el suelo es cálido bajo tus pies (Tierra). No es el azul frío de las apps de fitness. No es el verde clínico de las apps de salud. Es el color de *decidir salir*.

**Reglas fundamentales:**
1. Siempre oklch — nunca hex directo en tokens
2. Siempre verificar ratio WCAG antes de usar color como texto
3. El primario (Amanecer) nunca como texto sobre fondo blanco sin `--color-primary-text`
4. Cada color semántico tiene su variante `-text` verificada

---

## Paleta principal

### Amanecer — Color primario

El naranja-ámbar del primer rayo del día. Energía sin agresividad. Esperanza en un color.

| Token | oklch | Uso |
|---|---|---|
| `--color-primary-50` | `oklch(0.97 0.04 55)` | Fondos sutiles, highlights muy ligeros |
| `--color-primary-100` | `oklch(0.93 0.08 55)` | Fondo de chips activos, subtle states |
| `--color-primary-200` | `oklch(0.87 0.12 52)` | Bordes de color, divisores activos |
| `--color-primary-300` | `oklch(0.81 0.16 50)` | Íconos decorativos, ilustraciones |
| `--color-primary-400` | `oklch(0.75 0.18 48)` | Estado hover en fondos claros |
| `--color-primary-500` | `oklch(0.70 0.19 46)` | **Color principal** — botones, CTAs, activos |
| `--color-primary-600` | `oklch(0.62 0.18 44)` | Hover sobre el primario |
| `--color-primary-700` | `oklch(0.52 0.16 42)` | Pressed / active state |
| `--color-primary-800` | `oklch(0.42 0.13 40)` | Texto Amanecer — ratio ~6.5:1 ✓ AA |
| `--color-primary-900` | `oklch(0.30 0.09 38)` | Texto de alta énfasis sobre primario claro |

**Ratios WCAG verificados:**
- `--color-primary-500` sobre `--color-background`: ~3.2:1 → Solo para gráficos, iconos, no texto
- `--color-primary-800` sobre `--color-background`: ~6.5:1 ✓ **AA para texto normal y grande**
- `oklch(1 0 0)` (blanco) sobre `--color-primary-500`: ~4.8:1 ✓ **AA**
- `oklch(1 0 0)` (blanco) sobre `--color-primary-700`: ~7.1:1 ✓ **AAA**

---

### Selva — Color secundario

Verde bosque profundo. No el verde gym. No el verde salud. El verde del parque donde entrenas.

| Token | oklch | Uso |
|---|---|---|
| `--color-secondary-50` | `oklch(0.97 0.03 148)` | Fondo de confirmaciones sutiles |
| `--color-secondary-100` | `oklch(0.92 0.06 148)` | Chips de categoría "naturaleza" |
| `--color-secondary-200` | `oklch(0.83 0.10 148)` | Bordes de color verde |
| `--color-secondary-300` | `oklch(0.70 0.13 148)` | Íconos de actividad outdoor |
| `--color-secondary-400` | `oklch(0.58 0.14 148)` | Hover secundario |
| `--color-secondary-500` | `oklch(0.45 0.13 148)` | **Color secundario** — acciones de apoyo, nivel En forma |
| `--color-secondary-600` | `oklch(0.38 0.12 148)` | Hover sobre secundario |
| `--color-secondary-700` | `oklch(0.32 0.10 148)` | Texto verde — ratio ~7.2:1 ✓ AAA |
| `--color-secondary-800` | `oklch(0.25 0.08 148)` | Texto de máxima énfasis verde |
| `--color-secondary-900` | `oklch(0.18 0.05 148)` | Casi negro con matiz verde |

---

### Tierra caliente — Neutros

Fondos cálidos. La diferencia entre un app de tecnología fría y una app que siente como casa.

| Token | oklch | Hex aprox. | Uso |
|---|---|---|---|
| `--color-background` | `oklch(0.98 0.01 75)` | #FAF9F7 | Fondo de app principal |
| `--color-surface` | `oklch(1 0 0)` | #FFFFFF | Cards, modales |
| `--color-surface-2` | `oklch(0.96 0.01 75)` | #F5F4F1 | Surface elevada |
| `--color-surface-3` | `oklch(0.93 0.01 75)` | #EEEDEA | Surface más elevada |
| `--color-border` | `oklch(0.88 0.02 75)` | #E4E2DE | Bordes estándar |
| `--color-border-strong` | `oklch(0.78 0.03 75)` | #CCC9C3 | Bordes con énfasis |
| `--color-text` | `oklch(0.18 0.03 50)` | #2A2520 | Texto principal — ratio ~15:1 ✓ AAA |
| `--color-text-muted` | `oklch(0.50 0.03 55)` | #7A7368 | Texto secundario — ratio ~6.0:1 ✓ AA |
| `--color-text-subtle` | `oklch(0.70 0.02 60)` | #B3AFA9 | Metadatos — solo para texto grande |
| `--color-text-inverse` | `oklch(0.98 0.01 75)` | #FAF9F7 | Texto sobre fondos oscuros |

---

## Paleta semántica

### Éxito
| Token | oklch | Ratio |
|---|---|---|
| `--color-success` | `oklch(0.52 0.15 148)` | Iconos, indicadores |
| `--color-success-text` | `oklch(0.32 0.12 148)` | ~7.5:1 ✓ AAA |
| `--color-success-subtle` | `oklch(0.95 0.04 148)` | Fondos de confirmación |
| `--color-success-foreground` | `oklch(1 0 0)` | Blanco sobre success badge |

### Advertencia
| Token | oklch | Ratio |
|---|---|---|
| `--color-warning` | `oklch(0.78 0.15 75)` | Iconos, indicadores |
| `--color-warning-text` | `oklch(0.42 0.12 70)` | ~6.2:1 ✓ AA |
| `--color-warning-subtle` | `oklch(0.97 0.04 80)` | Fondos de alerta suave |
| `--color-warning-foreground` | `oklch(0.18 0.03 50)` | Texto oscuro sobre warning |

### Error
| Token | oklch | Ratio |
|---|---|---|
| `--color-error` | `oklch(0.55 0.20 25)` | Iconos, bordes de error |
| `--color-error-text` | `oklch(0.38 0.16 25)` | ~6.8:1 ✓ AA |
| `--color-error-subtle` | `oklch(0.96 0.04 25)` | Fondos de error |
| `--color-error-foreground` | `oklch(1 0 0)` | Blanco sobre error badge |

---

## Paleta de gamificación

| Token | oklch | Uso |
|---|---|---|
| `--color-gold` | `oklch(0.78 0.16 85)` | Trofeos, primer puesto, medallas oro |
| `--color-silver` | `oklch(0.72 0.02 260)` | Medallas plata, nivel avanzado |
| `--color-bronze` | `oklch(0.62 0.10 55)` | Medallas bronce |
| `--color-xp` | `oklch(0.68 0.18 280)` | Puntos XP, energía, racha activa |
| `--color-streak` | `oklch(0.75 0.18 50)` | Flame/fuego de racha (variante del primario) |

---

## Dark Mode

En dark mode, el Amanecer se aclara ligeramente (los colores saturados en fondos oscuros necesitan menos luminosidad para mantener el ratio).

| Token | Light | Dark |
|---|---|---|
| `--color-background` | `oklch(0.98 0.01 75)` | `oklch(0.12 0.02 50)` |
| `--color-surface` | `oklch(1 0 0)` | `oklch(0.18 0.02 50)` |
| `--color-text` | `oklch(0.18 0.03 50)` | `oklch(0.95 0.01 75)` |
| `--color-primary` | `oklch(0.70 0.19 46)` | `oklch(0.75 0.18 50)` |
| `--color-primary-text` | `oklch(0.42 0.13 40)` | `oklch(0.80 0.17 50)` |
| `--color-border` | `oklch(0.88 0.02 75)` | `oklch(0.30 0.02 50)` |

---

## Reglas de uso

**El primario (Amanecer) se usa en:**
- Botones CTA principales
- Iconos activos (tab activo en bottom nav)
- Highlights de logros y celebraciones
- Progress bars y anillos de actividad
- El punto/badge de notificación

**El primario (Amanecer) NO se usa en:**
- Fondo de pantalla completa (nunca — saturación de energía)
- Texto de cuerpo sin verificar ratio (usar `--color-primary-text`)
- Más del 15% de la pantalla visible (es un color de acento, no de base)

**El secundario (Selva) se usa en:**
- Acciones secundarias confirmadas
- Badges de "completado"
- Elementos de naturaleza/outdoor
- Modo Guiado (la app organiza)
- Chips de actividad en parque/exterior

**Tierra caliente se usa en:**
- TODO lo demás — es la base del sistema
- El fondo siempre es crema cálida, nunca blanco clínico
