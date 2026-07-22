# Movi — Plataforma
> **Mobile-first PWA** + Panel de administración desktop separado

---

## Arquitectura de plataformas

### Plataforma principal: PWA Mobile

La app de usuario es una Progressive Web App instalable. No hay app nativa — la PWA permite:
- Instalación en pantalla de inicio (sin App Store)
- Notificaciones push nativas
- Acceso offline parcial (entrenos descargados, mapa en caché)
- Haptic feedback en iOS 16+ y Android
- Geolocalización en tiempo real
- Integración con Calendar API

**Por qué PWA en lugar de nativa:**
- Deployment inmediato (sin review de App Store)
- Una sola base de código para iOS y Android
- Actualizaciones al instante sin acción del usuario
- Menor barrera de instalación para usuarios no tech-savvy (la madre postparto no debería ir al App Store)

### Plataforma secundaria: Panel Admin Desktop

Panel de administración para:
- Gestión de partners B2B (gimnasios, ayuntamientos)
- Gestión de quedadas y delegados
- Métricas y analytics del producto
- Moderación de contenido

Construido con el mismo DS base de Movi pero con layout desktop (sidebar, tablas de datos, formularios complejos).

---

## Breakpoints

| Nombre | Rango | Dispositivo típico |
|---|---|---|
| `mobile-sm` | < 375px | iPhone SE, Android compacto |
| `mobile` | 375px - 767px | **TARGET PRINCIPAL** — iPhone 14, Pixel |
| `tablet` | 768px - 1023px | iPad, tablet Android |
| `desktop` | 1024px+ | Solo para panel admin |

**Todo el DS se diseña primero para `mobile` (375-767px).** Cualquier ajuste para otras pantallas es una adaptación, nunca el punto de partida.

---

## Pantallas de la app mobile

### Core (MVP)

| Pantalla | Descripción |
|---|---|
| Onboarding (2 pasos) | Ubicación + nivel de hoy → primer resultado |
| Mapa + lista de sesiones | Vista principal — quién entrena cerca ahora |
| Perfil de sesión | Detalles: espacio, nivel, personas, hora |
| Perfil de usuario | Avatar, nivel, historial, logros |
| Crear sesión | Modo libre / guiado, espacio, nivel, hora |
| Guía de entrenamiento | Durante la sesión: ejercicios, contador, voz |
| Pantalla de logro | Trophy + confetti al desbloquear hito |
| Resumen semanal | Stats de la semana, racha, CTA próximas sesiones |
| Perfil propio | Configuración, logros, historial, ajustes |

### Secundarias (post-MVP)

| Pantalla | Descripción |
|---|---|
| Quedadas | Lista de eventos mensuales en tu zona |
| Detalle de quedada | Info, lista de asistentes, CTA unirse |
| Mapa de espacios | Todos los espacios deportivos gratuitos en la zona |
| Nutrición | Opcional, solo si el usuario lo activa |
| Chat de sesión | Mensajería simple entre participantes de una sesión |

---

## Patrones de navegación mobile

### Bottom Navigation (tab bar)
5 secciones principales:
1. **Inicio** (MapPin) — Mapa + sesiones cercanas
2. **Buscar** (Search) — Búsqueda de sesiones / usuarios
3. **+** (Zap) — Crear sesión (acción principal, siempre visible)
4. **Comunidad** (Users) — Quedadas, grupos, actividad social
5. **Perfil** (User) — Perfil propio, logros, ajustes

Altura: `64px` + `safe-area-inset-bottom`

### Navegación secundaria
- Bottom sheets para acciones y detalles
- Modales para confirmaciones
- Drawers (lateral) solo en panel admin desktop
- Nunca menús de hamburguesa en mobile

---

## Consideraciones iOS / Android

### iOS
- Safe areas: `env(safe-area-inset-top/bottom)` siempre aplicadas
- Font size mínimo en inputs: `16px` (evita zoom automático)
- Bounce scroll: `overscroll-behavior: none` en el contenedor principal
- Haptics: disponibles en iOS 13+ en PWA instalada

### Android
- Barra de estado: transparente con iconos oscuros en modo light
- Botón atrás físico: manejar con History API en el router
- Vibración: `navigator.vibrate()` disponible en Chrome Android

### PWA instalación
```json
// manifest.json
{
  "name": "Movi",
  "short_name": "Movi",
  "theme_color": "#B8621A",
  "background_color": "#FAF9F7",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [...]
}
```

---

## Panel Admin Desktop

Layout: sidebar fija (240px) + área de contenido principal.

Componentes específicos del admin (no presentes en la app mobile):
- Tablas de datos con sorting, filtering, paginación
- Formularios complejos en columnas
- Gráficos de métricas (Recharts)
- Vista de mapa con clusters de usuarios
- Sistema de notificaciones internas

El admin usa los mismos tokens de color, tipografía y radio que la app mobile, pero con densidad alta (componentes más compactos, menos espacio).
