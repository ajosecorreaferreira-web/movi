# Movi — Iconografía
> **Lucide React** — stroke limpio, línea media, nunca decorativo

---

## Librería principal: Lucide React

```bash
npm install lucide-react
```

```tsx
import { MapPin, Users, Trophy, Flame } from 'lucide-react'

// Uso estándar
<MapPin size={24} strokeWidth={1.5} />
```

---

## Estilo base

| Propiedad | Valor | Razón |
|---|---|---|
| `stroke` | `currentColor` | Hereda el color del contexto — siempre |
| `strokeWidth` | `1.5` | Media — ni agresivo (2) ni frágil (1) |
| `fill` | `none` | Línea limpia, no sólido |
| `size` base | `24px` | Estándar de touch-friendly |

**El strokeWidth 1.5 es la firma visual de Movi.** No cambiar a 2 (demasiado pesado para el cuerpo) ni a 1 (demasiado fino, pierde presencia en mobile).

---

## Escala de tamaños

| Contexto | Tamaño | Área de toque |
|---|---|---|
| Bottom navigation | 24px | 44px ✓ |
| Botones con icono | 20px | 44px ✓ |
| Inline en texto (body) | 16px | — |
| Badges / chips | 14px | — |
| Avatares decorativos | 32-40px | — |
| Ilustraciones de pantalla vacía | 64-80px | — |
| Logros / trofeos decorativos | 48-64px | — |

**Área de toque mínima:** Todo icono interactivo tiene un área de toque de mínimo `44×44px` aunque visualmente sea más pequeño.

---

## Iconos principales de Movi

### Navegación
| Sección | Icono Lucide | Activo |
|---|---|---|
| Inicio / Cerca | `MapPin` | Fill sutil + color primary |
| Buscar | `Search` | — |
| Sesión activa | `Zap` | Fill + primary |
| Comunidad | `Users` | — |
| Perfil | `User` | — |

### Actividad y niveles
| Concepto | Icono |
|---|---|
| Caminar (Nivel 1) | `Footprints` |
| Correr (Nivel 2) | `Wind` |
| Funcional (Nivel 3) | `Dumbbell` |
| Hyrox / Potencia (Nivel 4) | `Flame` |
| Élite / CrossFit (Nivel 5) | `Trophy` |
| Natación | `Waves` |
| Ciclismo | `Bike` |
| Yoga / Movilidad | `Leaf` |
| Pádel | `SquareActivity` |

### Gamificación y social
| Concepto | Icono |
|---|---|
| Puntos XP | `Star` |
| Racha | `Flame` |
| Medalla | `Medal` |
| Trofeo | `Trophy` |
| Compañero nuevo | `UserPlus` |
| Grupo / Quedada | `UsersRound` |
| Líder / Delegado | `Crown` |
| Vecino activo | `House` |

### Espacios
| Espacio | Icono |
|---|---|
| Parque / Exterior | `TreePine` |
| Gimnasio | `Building2` |
| Piscina | `Waves` |
| Urbanización | `MapPin` |
| Ruta / Correr | `Route` |

### Modos de sesión
| Modo | Icono |
|---|---|
| Modo libre | `Globe` |
| Modo guiado | `Navigation` |
| Modo invisible | `EyeOff` |

---

## Iconos en estados

**Activo / seleccionado:**
- `stroke: var(--color-primary)`
- Fondo sutil: `oklch(0.97 0.04 55)` (primary-50)
- El ícono NO cambia de `fill: none` a relleno — mantiene la coherencia de línea

**Inactivo:**
- `stroke: var(--color-text-muted)`

**Deshabilitado:**
- `stroke: var(--color-text-subtle)`
- `opacity: 0.5`

**Error:**
- `stroke: var(--color-error)`

**Éxito:**
- `stroke: var(--color-success)`

---

## Ilustraciones de pantallas vacías

Para pantallas sin contenido (sin sesiones cerca, sin historial, etc.), Movi usa ilustraciones construidas con Lucide a tamaño `64-80px` + texto de apoyo positivo.

**Regla:** Las pantallas vacías en Movi NUNCA muestran un icono triste o un cero solitario. Siempre una invitación a actuar.

Ejemplo — Sin sesiones cerca:
```tsx
<EmptyState
  icon={<MapPin size={64} strokeWidth={1} className="text-primary-200" />}
  title="Nadie por aquí aún"
  description="Sé el primero. Crea una sesión — alguien aparecerá."
  action="Crear sesión"
/>
```

---

## Accesibilidad

- Todo icono interactivo lleva `aria-label` descriptivo
- Iconos decorativos llevan `aria-hidden="true"`
- Nunca usar solo el icono para comunicar estado — siempre texto de apoyo o `aria-label`

```tsx
// ✓ Correcto
<button aria-label="Ver compañeros cerca">
  <Users size={24} strokeWidth={1.5} aria-hidden="true" />
</button>

// ✗ Incorrecto
<button>
  <Users size={24} strokeWidth={1.5} />
</button>
```

---

## Reglas absolutas

- ✗ Nunca mezclar Lucide con otra librería de iconos en la misma pantalla
- ✗ Nunca cambiar `strokeWidth` fuera de los valores definidos (1, 1.5, 2)
- ✗ Nunca escalar iconos fuera de la escala definida con transform
- ✗ Nunca usar iconos de colores múltiples dentro de un mismo icono
- ✓ Si Lucide no tiene el icono necesario, crear SVG custom con strokeWidth 1.5 y currentColor
