# Movi — Mobile Patterns
> Patrones específicos para PWA mobile-first. Solo en esta plataforma.

---

## Safe Areas

```css
/* Siempre en el layout raíz */
body {
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
}

/* Bottom nav con safe area */
.bottom-nav {
  height: calc(64px + env(safe-area-inset-bottom, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* Pantallas con CTA sticky abajo */
.screen-with-cta {
  padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px));
}
```

---

## Touch Targets

Todo elemento interactivo: **mínimo 44×44px** de área de toque.

```tsx
// Patrón para iconos pequeños
const TouchTarget = ({ children, onClick }) => (
  <button
    onClick={onClick}
    style={{
      minWidth: '44px',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </button>
)
```

---

## Bottom Navigation

El elemento de navegación principal de Movi. Siempre visible, siempre en la misma posición.

```tsx
// Estructura
<nav className="bottom-nav">
  <NavItem icon={<MapPin />} label="Inicio" href="/" />
  <NavItem icon={<Search />} label="Buscar" href="/buscar" />
  <NavItemPrimary icon={<Zap />} label="Crear" href="/crear" /> {/* Botón central */}
  <NavItem icon={<Users />} label="Social" href="/comunidad" />
  <NavItem icon={<User />} label="Perfil" href="/perfil" />
</nav>
```

**El botón central (Crear sesión):**
- Tamaño: `56px` con background primary
- Elevated: `shadow-primary`
- Siempre visible independientemente del scroll
- Feedback de tap: `scale(0.94)` en `50ms`

---

## Bottom Sheets

Patrón principal para mostrar detalles sin navegar a nueva pantalla.

```tsx
// Usos en Movi:
// - Detalles de sesión (al tap en card o pin del mapa)
// - Confirmación de unirse a sesión
// - Selección de espacio al crear sesión
// - Filtros del mapa
// - Menú de opciones de perfil
```

**Especificaciones:**
- Apertura: `translateY(100%) → translateY(0)` en `350ms` mobile-spring
- Handle visible: `4px × 32px`, color `--color-border`, `border-radius: 2px`
- Padding interno: `24px top, 20px horizontal, safe-area + 24px bottom`
- Max-height: `85vh` — siempre deja algo del contenido detrás visible
- Backdrop: `oklch(0 0 0 / 0.5)` fade-in `200ms`
- Dismiss: swipe down + tap en backdrop
- Scroll interno: si el contenido supera el max-height

---

## Swipe Actions

Para listas de sesiones y usuarios:

```
Swipe left → Acción secundaria (ej: "Guardar para después")
Swipe right → Acción principal (ej: "Unirme")
```

**Especificaciones:**
- Threshold de activación: `40%` del ancho del item
- Color de fondo izquierda: `--color-secondary` (Selva)
- Color de fondo derecha: `--color-primary` (Amanecer)
- Spring snap al soltar: `mobile-spring`, `200ms`
- Icono aparece al 20% del swipe con fade-in

---

## Pull to Refresh

En pantalla principal (mapa + lista de sesiones):

```css
/* El contenedor de la lista permite pull-to-refresh */
.sessions-list {
  overscroll-behavior-y: contain;
}
```

Indicador: spinner del color primario con fade-in al soltar. Texto: "Actualizando sesiones..."

---

## Sticky CTA

Patrón para pantallas con acción principal al fondo:

```tsx
// Siempre visible, no se desplaza con el scroll
<div className="sticky-cta-container">
  {/* Contenido scrollable arriba */}
  <div className="content">...</div>

  {/* CTA fijo al fondo */}
  <div className="sticky-cta">
    <Button size="lg" className="w-full">
      Unirme a la sesión
    </Button>
  </div>
</div>
```

```css
.sticky-cta-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sticky-cta {
  position: sticky;
  bottom: 0;
  padding: 16px 20px calc(16px + env(safe-area-inset-bottom));
  background: linear-gradient(transparent, var(--color-background) 30%);
}
```

---

## Gestos de navegación

**iOS back gesture (swipe from left edge):**
- Compatible con la navegación de React Router en modo historia
- El componente de pantalla tiene `transform: translateX()` tracking del gesto

**Dismiss modal (swipe down):**
- Modales y bottom sheets se cierran con swipe down
- Velocidad de swipe > 500px/s = dismiss inmediato
- Velocidad menor = animate back si < threshold (40% visible)

---

## Full-Screen Steps (onboarding y flujos multi-paso)

Para el onboarding y la creación de sesión:

```tsx
// Una pantalla, una pregunta, un CTA abajo
<FullScreenStep>
  <StepContent>
    <StepTitle>¿Cuál es tu nivel hoy?</StepTitle>
    <LevelSelector value={level} onChange={setLevel} />
  </StepContent>

  <StepCTA>
    <Button onClick={next}>Siguiente</Button>
    <StepIndicator current={2} total={2} />
  </StepCTA>
</FullScreenStep>
```

**Transición entre pasos:** slide horizontal `350ms` mobile-spring — igual que page transitions.

---

## Skeleton Loaders

Durante la carga de sesiones y perfiles:

```tsx
// Cards de sesión en skeleton
<SkeletonCard>
  <SkeletonAvatar />
  <SkeletonText lines={2} />
  <SkeletonTag />
</SkeletonCard>
```

**Animación:** pulse suave `opacity 0.5 → 1` en `1200ms` infinite ease-in-out. Color: `--color-surface-3`.

**Regla:** Siempre mostrar al menos 2 skeleton cards para que el usuario entienda que hay contenido cargando.

---

## Orientación

Movi es **portrait only**. La app no soporta landscape.

```json
// manifest.json
"orientation": "portrait"
```

Durante una sesión de entrenamiento, si el usuario rota el dispositivo, mostrar mensaje: "Movi funciona mejor en vertical" con icono de rotación.

---

## PWA Install Prompt

Mostrar el prompt de instalación después del primer logro desbloqueado (no en el onboarding — primero el valor, luego la instalación):

```tsx
// Aparece como bottom sheet, no como alert nativo
<InstallPrompt>
  <h3>Instala Movi</h3>
  <p>Añádela a tu pantalla de inicio para acceder más rápido y recibir notificaciones.</p>
  <Button onClick={install}>Instalar</Button>
  <TextButton onClick={dismiss}>Ahora no</TextButton>
</InstallPrompt>
```
