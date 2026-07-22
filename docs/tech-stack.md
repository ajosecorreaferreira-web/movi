# Movi — Tech Stack

---

## Stack completo con versiones

```json
{
  "react": "^18.3",
  "react-dom": "^18.3",
  "react-router-dom": "^6.26",
  "typescript": "^5.5",
  "vite": "^5.4",
  "@vitejs/plugin-react": "^4.3",
  "tailwindcss": "^4.0",
  "@tailwindcss/vite": "^4.0",
  "motion": "^11.3",
  "lucide-react": "^0.383",
  "@fontsource-variable/plus-jakarta-sans": "latest",
  "vite-plugin-pwa": "^0.20",
  "workbox-window": "^7.1",
  "zustand": "^4.5",
  "msw": "^2.3"
}
```

### shadcn/ui (componentes copiados al proyecto)
```bash
npx shadcn@latest init
# Componentes que se instalarán:
# button, input, card, badge, dialog, sheet, toast,
# avatar, separator, skeleton, tabs, label, switch,
# select, slider, progress, scroll-area
```

---

## Decisiones técnicas

### ¿Por qué Vite en lugar de Next.js?
Movi es una SPA PWA — no necesita SSR ni SSG. Vite ofrece HMR más rápido, bundle más ligero, y configuración de PWA más sencilla. Next.js añadiría complejidad sin beneficio real para este caso de uso.

### ¿Por qué Tailwind v4?
La v4 usa variables CSS nativas como sistema de tokens — perfectamente compatible con nuestro `src/index.css`. Sin configuración adicional: los tokens CSS de Movi son directamente usables en clases de Tailwind.

### ¿Por qué shadcn/ui?
Componentes accesibles (Radix UI base), sin lock-in (se copian al proyecto), altamente customizables. El CSS de shadcn usa variables CSS — integración perfecta con los tokens de Movi.

### ¿Por qué Motion en lugar de CSS puro para animaciones?
Las celebraciones de Movi (trofeo PS5-style, confetti, spring bounce) requieren orquestación de animaciones complejas que CSS keyframes solos no manejan bien. Motion (Framer Motion) permite esto con una API declarativa. El CSS se usa para todas las transiciones simples — Motion solo para celebraciones y page transitions.

### ¿Por qué Zustand en lugar de Redux/Context?
Zustand es mínimo, sin boilerplate, y suficiente para el estado de Movi (sesión activa, perfil de usuario, preferencias de sonido/haptics, geolocalización). No se necesita la complejidad de Redux.

### ¿Por qué MSW para mocks?
MSW intercepta requests a nivel de Service Worker — el mock funciona exactamente igual en el navegador que en tests. Esto significa que los componentes no necesitan saber si están en modo desarrollo con mocks o en producción con API real.

---

## Instalación completa

```bash
# 1. Crear proyecto
npm create vite@latest movi -- --template react-ts
cd movi

# 2. Instalar Tailwind v4
npm install tailwindcss @tailwindcss/vite
# Configurar en vite.config.ts

# 3. Instalar shadcn/ui
npx shadcn@latest init

# 4. Instalar dependencias de Movi
npm install motion lucide-react zustand react-router-dom
npm install @fontsource-variable/plus-jakarta-sans
npm install vite-plugin-pwa workbox-window

# 5. Instalar dependencias de desarrollo
npm install -D msw vitest @testing-library/react @testing-library/user-event

# 6. Copiar src/index.css del DS a src/index.css
# 7. Instalar componentes shadcn necesarios
npx shadcn@latest add button input card badge dialog sheet toast avatar skeleton slider progress
```

---

## Configuración de vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Movi',
        short_name: 'Movi',
        description: 'El deporte es la excusa. La conexión es el producto.',
        theme_color: '#B8621A',
        background_color: '#FAF9F7',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.movi\.app\/.*/,
            handler: 'NetworkFirst',
            options: { cacheName: 'api-cache', expiration: { maxAgeSeconds: 300 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

---

## Estructura de variables de entorno

```env
# .env.local
VITE_API_URL=http://localhost:3001
VITE_MAPBOX_TOKEN=pk...
VITE_ENABLE_MSW=true

# .env.production
VITE_API_URL=https://api.movi.app
VITE_MAPBOX_TOKEN=pk...
VITE_ENABLE_MSW=false
```

---

## Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Variables de entorno en Vercel Dashboard:
# VITE_API_URL, VITE_MAPBOX_TOKEN
```

```json
// vercel.json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
