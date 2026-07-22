# Movi — Espaciado y Densidad
> Base: **4px**. Densidad: **Media-baja**. Filosofía: cada pantalla respira.

---

## Filosofía

> "Si tienes que preguntarte si algo cabe, no cabe. Retíralo a la siguiente pantalla."

Movi tiene una sola regla de densidad: **una pantalla, un objetivo**. El espacio en blanco no es vacío — es foco. Es lo que hace que la madre postparto con el bebé en brazos pueda usar la app con una sola mano y entender lo que tiene que hacer en menos de 2 segundos.

El anti-modelo es la app Huawei: 50 elementos por pantalla, menús anidados, funcionalidades que no aportan nada. Movi es lo contrario.

---

## Escala de espaciado (base 4px)

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 4px | Separación mínima, gap entre icono e inline text |
| `--space-2` | 8px | Gap interno de badges, padding de chips pequeños |
| `--space-3` | 12px | Gap entre items de lista compacta |
| `--space-4` | 16px | Padding de pantalla horizontal, gap estándar |
| `--space-5` | 20px | Padding interno de cards |
| `--space-6` | 24px | Separación entre grupos de contenido |
| `--space-8` | 32px | Separación entre secciones |
| `--space-10` | 40px | Espacio antes de CTA principal |
| `--space-12` | 48px | Separación entre secciones mayores |
| `--space-16` | 64px | Header a primer contenido |
| `--space-20` | 80px | Espacios hero en onboarding |

---

## Densidad por contexto

### Pantalla principal (Cerca de ti)
- Cards de sesión: padding interno `20px`, gap entre cards `12px`
- Máximo 4 cards visibles sin scroll — si hay más, scroll natural
- El mapa ocupa mínimo 40% de la pantalla en vista mixta

### Pantalla de perfil de usuario/sesión
- Foto/avatar: central, grande (`96px`), no comprimida
- Datos de contexto: máximo 3 líneas de metadata visible sin expandir
- CTA principal: siempre en el 80% inferior de la pantalla, `height: 52px`

### Guía de entrenamiento (durante sesión)
- Densidad mínima — solo lo esencial
- Un ejercicio a la vez en pantalla
- Contador de reps: `72px` — el número más grande de toda la app
- Solo 3 datos visibles: ejercicio actual, reps/tiempo, siguiente ejercicio

### Bottom navigation
- Altura: `64px` + `safe-area-inset-bottom`
- 5 tabs máximo (recomendado 4-5)
- Label: siempre visible, nunca solo iconos

### Onboarding
- Una pregunta por pantalla — sin excepciones
- Máximo 2 opciones de respuesta por pantalla (excepción: niveles 1-5, lista corta)
- CTA siempre en la misma posición: `bottom: 32px + safe-area`

---

## Espaciado de componentes

### Botones
```
height-sm:  36px   padding-x: 12px
height-md:  44px   padding-x: 20px  ← estándar
height-lg:  52px   padding-x: 24px  ← CTA principal
```

### Inputs
```
height: 44px   padding-x: 16px   border-radius: 10px
```

### Cards
```
padding: 20px   border-radius: 16px   gap-between: 12px
```

### Listas de usuarios/sesiones
```
item-height: 72px (con avatar) / 56px (sin avatar)
padding-x: 16px   gap: 0   divider: 1px border
```

### Chips / badges
```
height: 28px   padding-x: 12px   border-radius: 9999px
font-size: 12px   font-weight: 600
```

### Bottom sheet
```
padding-top: 24px   padding-x: 20px   padding-bottom: safe-area + 24px
handle: 4px × 32px, centered, color: border
```

---

## Touch targets

Todo elemento interactivo tiene área de toque mínima de `44×44px` independientemente de su tamaño visual.

```css
/* Patrón para iconos pequeños interactivos */
.touch-target {
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

## Grid y layout mobile

```
Pantalla mobile: 1 columna
Padding horizontal: 16px (4px × 4)
Max-width del contenido: 480px (centrado en pantallas más anchas)

Grid de 2 columnas (solo para): stats en resumen semanal, badges de logros
Grid gap: 12px
```

---

## Reglas absolutas de densidad

- ✗ Nunca más de 1 CTA primario por pantalla
- ✗ Nunca más de 3 acciones secundarias visibles sin un "Ver más"
- ✗ Nunca texto a ancho completo (line-length máxima: `65ch` en descripción larga)
- ✓ Siempre dar `32px` de espacio libre antes del CTA principal
- ✓ Siempre dejar la zona inferior (`100px`) libre en pantallas sin bottom nav
- ✓ En listas: si hay más de 6 items, añadir búsqueda o filtro
