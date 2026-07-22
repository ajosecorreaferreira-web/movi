# PullRefresh — Mobile Component Spec

## Metadata
- **Categoría:** Mobile / Input
- **Estado:** Stable
- **Archivo:** `src/components/mobile/pull-refresh.tsx`
- **Plataforma:** Mobile-first (390px) · Adaptativo hasta 640px
- **Storybook:** Mobile/PullRefresh

## Overview

### Cuándo usar
- Listas o feeds que el usuario necesita actualizar manualmente
- Pantallas de datos en tiempo real donde el refresh explícito es preferible al polling silencioso
- Cualquier pantalla scrollable donde "pull to refresh" sea el patrón esperado por el usuario

### Cuándo NO usar
- Pantallas sin scroll o con scroll bloqueado por otro gesto
- Cuando los datos se actualizan automáticamente sin acción del usuario (usar un indicador de live update)
- En `BottomSheet` o modales → el gesto conflictuaría con el cierre del sheet
- Cuando el refresh tarda más de 30 segundos → usar un flujo de carga diferido con skeleton

### Diferencia con el equivalente desktop
En desktop no existe un equivalente UX nativo. La actualización manual se implementa con un botón "Actualizar" o `F5`. El `PullRefresh` es exclusivo de la experiencia mobile táctil.

## Touch & Haptics
- **Touch target mínimo:** no aplica; el gesto cubre todo el ancho de la pantalla
- **Patrón de haptic feedback:**
  - `impact(light)` al alcanzar el 50% del umbral de activación
  - `impact(medium)` al alcanzar el 100% del umbral (punto de activación)
  - Sin haptic durante el estado de loading
- **Gestos soportados:**
  - Pull down desde el top de la lista (cuando `scrollY === 0`) → activa el indicador
  - Soltar por encima del umbral → dispara `onRefresh`
  - Soltar por debajo del umbral → cancela, el indicador regresa a 0

## Tokens usados
| Propiedad | Token |
|-----------|-------|
| Fondo del indicador | `--background` |
| Icono / spinner | `--primary` |
| Sombra del indicador | `shadow-md` |
| Border radius indicador | `rounded-full` |
| Tamaño indicador | 40×40px |

## Variantes y estados

| Variante | Descripción |
|----------|-------------|
| `default` | Indicador circular con spinner al activarse |
| `custom` | Slot para un indicador personalizado (ilustración, logo) |

| Estado | Comportamiento visual |
|--------|----------------------|
| Idle | Indicador invisible, scroll normal |
| Pulling | Indicador aparece desde arriba, sigue el dedo con resistencia (factor 0.5) |
| Ready | Indicador completo en el umbral, icono cambia a "soltar para actualizar" |
| Refreshing | Spinner animado; lista en posición de scroll desplazada para mostrar indicador |
| Success | Spinner → checkmark por 600ms, luego colapsa |
| Error | Spinner → icono de error por 600ms, luego colapsa |

## Accesibilidad
- **Roles ARIA:** el indicador tiene `role="status"` y `aria-live="polite"`; cuando empieza el refresh, anuncia "Actualizando contenido"; cuando termina, anuncia "Contenido actualizado" o el mensaje de error
- **Navegación por teclado:** no aplica (gesto táctil); opcionalmente incluir un botón "Actualizar" en el `MobileHeader` como alternativa accesible
- **VoiceOver / TalkBack:** el gesto de pull no es accesible; la alternativa de botón en el header es obligatoria para conformidad WCAG

## Animaciones
- **Pull:** el indicador sigue `touchY` con factor de resistencia 0.5; `translateY(-40px → 0px)` según el progreso del pull
- **Activación (snap):** al soltar sobre el umbral, el indicador hace spring a posición fija; `spring(stiffness: 300, damping: 30)`
- **Spinner:** rotación continua `360deg`, duración 800ms, `linear`, mientras `refreshing`
- **Colapso:** al terminar el refresh, `translateY(0 → -40px)` + `opacity: 1 → 0`, duración 300ms, `ease-in`
- **Reducción de movimiento:** spinner estático (pulsante en vez de rotatorio); sin translación del indicador durante el pull (aparece directamente al soltar)

## Code example

```tsx
// ✅ Correcto
<PullRefresh
  onRefresh={async () => {
    await fetchLatestData();
  }}
>
  <FeedList items={items} />
</PullRefresh>

// Con estado controlado para mostrar errores
<PullRefresh
  onRefresh={handleRefresh}
  refreshing={isRefreshing}
  error={refreshError}
>
  <NotificationList notifications={notifications} />
</PullRefresh>

// ❌ Incorrecto — dentro de un BottomSheet
<BottomSheet open={open} onClose={close}>
  <PullRefresh onRefresh={refresh}>  {/* conflicto de gestos */}
    <List />
  </PullRefresh>
</BottomSheet>

// Sin await — el spinner se cierra antes de que terminen los datos
<PullRefresh onRefresh={() => fetchData()}>  {/* falta await */}
  <List />
</PullRefresh>
```

## Cross-references
- **Equivalente desktop:** botón "Actualizar" en `MobileHeader` o toolbar
- `MobileHeader` — debe incluir un botón de actualización alternativo para accesibilidad
- `MobileToast` — para notificar el resultado del refresh (error o sin nuevos datos)
- `SwipeList` — componente que frecuentemente contiene `PullRefresh` como wrapper
