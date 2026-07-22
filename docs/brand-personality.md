# Movi — Brand Personality
> Arquetipo: **El Cuidador que Exige**
> DS de referencia: Shopify Polaris (Cuidador) × Strava (Héroe) — con la calidez de Airbnb

---

## La frase que lo define todo

> *"Te cuido como eres. Te exijo como puedes ser."*

Movi no es Nike (sin excusas, rendimiento puro). No es Headspace (calma, introspección). Es el entrenador personal que sabe que llevas 6 meses parado, que te recibe sin juzgarte, y que a los 20 minutos ya te está sacando un 10% más de lo que creías que podías dar. Porque sabe que así saldrás mejor.

---

## Las 9 dimensiones

### 1. Forma — Border Radius

**Valor: 10px (Suave-Redondo)**

Entre Suave (8px, Stripe) y Redondo (12px, Airbnb). Amigable y accesible sin ser infantil. Dice *deporte* sin gritar *agresivo*. Dice *persona* sin parecer *juguete*.

- Componentes base (botones, inputs, cards pequeñas): `10px`
- Cards grandes, bottom sheets: `16px`
- Modales, drawers: `24px`
- Pills, badges, avatares: `9999px`

**Por qué 10px y no 8px:** Movi tiene una madre postparto como usuario principal. Necesita calidez. El 8px es demasiado frío para esa emoción.
**Por qué 10px y no 12px:** Movi exige y tiene deporte. El 12px empieza a parecer app de bebés.

---

### 2. Color — Paleta Movi

**Filosofía:** Amanecer + Naturaleza. El color de cuando decides salir.

| Token | Valor | Uso | Ratio WCAG |
|---|---|---|---|
| `--color-primary` | `oklch(0.70 0.19 46)` | CTAs, acciones principales | — (sobre blanco) |
| `--color-primary-text` | `oklch(0.42 0.13 40)` | Texto ámbar sobre fondos claros | ~6.5:1 ✓ AA |
| `--color-primary-foreground` | `oklch(1 0 0)` | Texto blanco sobre botón primario | ~4.8:1 ✓ AA |
| `--color-secondary` | `oklch(0.45 0.13 148)` | Selva, acciones secundarias | — |
| `--color-secondary-text` | `oklch(0.32 0.10 148)` | Texto verde sobre fondos claros | ~7.2:1 ✓ AAA |
| `--color-background` | `oklch(0.98 0.01 75)` | Fondo crema cálida | — |
| `--color-text` | `oklch(0.18 0.03 50)` | Texto principal | ~15:1 ✓ AAA |
| `--color-text-muted` | `oklch(0.50 0.03 55)` | Texto secundario | ~6.0:1 ✓ AA |

**Colores de celebración:**
- **Oro:** `oklch(0.78 0.16 85)` — trofeos, primer puesto
- **XP Purple:** `oklch(0.68 0.18 280)` — puntos, energía

**Regla de uso del primario:**
El Amanecer es energía y esperanza — úsalo en CTAs, logros, iconos activos. Nunca como fondo de pantalla completo. Nunca como texto sin verificar el ratio.

---

### 3. Tipografía — Plus Jakarta Sans

**Por qué:** Variable font (rendimiento), warm geometric sans, excelente legibilidad en mobile a 14px+, no es la Inter fría de las apps tech. Tiene personalidad sin ser extravagante.

**Escala:**
- Display / Hero: `3rem` (48px) weight 800 — onboarding, logros grandes
- H1: `2.25rem` (36px) weight 700
- H2: `1.875rem` (30px) weight 700
- H3: `1.5rem` (24px) weight 600
- H4: `1.25rem` (20px) weight 600
- Body Large: `1.125rem` (18px) weight 400
- Body: `1rem` (16px) weight 400 — texto principal
- Body Small: `0.875rem` (14px) weight 400 — metadatos
- Caption: `0.75rem` (12px) weight 500 — etiquetas, badges

**Jerarquía de pesos:**
- Información crítica, CTAs: **700-800**
- Títulos de sección: **600-700**
- Cuerpo, descripciones: **400**
- Metadatos, subtítulos: **400-500**

---

### 4. Espaciado y Densidad

**Escala base: 4px**

Densidad: **Media-baja**. Movi respira. Cada pantalla tiene un foco claro. El espacio en blanco no es vacío — es oxígeno para procesar la información.

**Regla de densidad de Movi:**
> Si tienes que preguntarte si algo cabe, no cabe. Retíralo a la siguiente pantalla.

- Padding de pantalla: `16px` horizontal
- Gap entre elementos de lista: `12px`
- Padding interno de cards: `20px`
- Separación entre secciones: `32px`
- Espacio antes de CTA principal: mínimo `24px`

---

### 5. Iconografía

**Librería: Lucide React**
- Stroke: `currentColor`
- StrokeWidth: `1.5` (el estándar — no usar 2 que es demasiado pesado para el cuerpo)
- Tamaño base: `24px`
- En bottom nav: `24px`
- En buttons: `20px`
- En badges/chips: `16px`
- Tamaño mínimo accesible: `24px` con área de toque `44px`

**Estilo según arquetipo:**
El Cuidador que Exige usa línea media. No gruesa (agresiva), no fina (frágil). Stroke 1.5 transmite seguridad y claridad sin imponer.

---

### 6. Sombras y Elevación

**Filosofía:** Elevación mínima pero significativa. Solo hay sombra cuando hay elevación real.

| Nivel | Token | Uso |
|---|---|---|
| 0 | Sin sombra | Cards en fondo, elementos planos |
| 1 | `--shadow-sm` | Cards flotantes, avatares |
| 2 | `--shadow-md` | Bottom sheets, tooltips |
| 3 | `--shadow-lg` | Modales, drawers |
| ∞ | `--shadow-primary` | CTA hero, botón de acción principal |

**Sombra de marca:** `0 4px 14px oklch(0.70 0.19 46 / 0.35)` — el Amanecer tiene su propia sombra en el botón CTA. Sutil brillo de esperanza.

---

### 7. Motion

**Arquetipo de motion: El Cuidador que Celebra**
- Base: rápido y eficiente (100-200ms) — el app no pierde tu tiempo
- Momentos importantes: expresivo con bounce (300-800ms) — la app celebra contigo
- Celebraciones grandes: cinematográfico (800-1200ms) con confetti

**La regla de oro del motion en Movi:**
> El 95% del tiempo la app se mueve rápido y se quita de en medio. El 5% restante — cuando haces algo que de verdad importa — la app te para y celebra como merece.

Ver `docs/motion.md` para tokens completos.

---

### 8. Voz y Tono

**Tres palabras: Firme. Cálido. Honesto.**

Movi habla como ese entrenador personal cariñoso que no tolera la vagancia pero que tampoco te juzga. Sabe qué decir en el momento justo. No miente diciendo que todo está bien si no lo está. No pierde tu tiempo.

**La voz nunca:**
- Insulta ni compara negativamente
- Usa positivismo vacío ("¡Eres el mejor del mundo!")
- Usa expresiones machistas, homófobas o excluyentes
- Satura con notificaciones

**La voz siempre:**
- Habla en positivo, dirigido al momento del usuario
- Usa tú (tuteo), cercano y natural
- Tiene energía cuando el usuario la necesita
- Es breve — cada palabra tiene que ganarse su lugar

Ver `docs/voice.md` para guía completa.

---

### 9. Sonido y Haptics

**Sonido OFF por defecto** — los usuarios entrenan en parques, gimnasios, entornos sociales. Respetamos el contexto.

**Activación:** El usuario elige activar sonido en el onboarding o en ajustes.

**Haptics ON por defecto** — el tacto es silencioso y contextual. En iOS con `navigator.vibrate()` donde está disponible.

Momentos de celebración tienen sonido opcional (trofeo, confetti) que el usuario puede activar.

Ver `docs/sound.md` para especificación completa.

---

## DS de referencia por dimensión

| Dimensión | Referencia principal | Qué tomamos |
|---|---|---|
| Estructura componentes | Shopify Polaris | Accesibilidad, consistencia, cuidado |
| Energía y motion | Strava | Celebración de logros, streaks |
| Calidez y espaciado | Airbnb DS | Respiración, fotografía, humanidad |
| Tipografía en mobile | Linear | Jerarquía clara, peso variable |
| Gamificación | Duolingo | Streak, celebración — pero sin infantilizar |
| Iconografía | Lucide / Linear | Línea limpia, no decorativa |

---

## Lo que Movi no es (anti-referencias)

- ❌ **Huawei / apps sobrecargadas:** interfaces con 50 elementos por pantalla, curva de aprendizaje, funcionalidades que no aportan nada
- ❌ **Nike Training Club modo agresivo:** "sin excusas", presión de rendimiento, comparación social negativa
- ❌ **Apps de salud clínicas:** blanco frío, tipografía sans genérica, cero emoción
- ❌ **Duolingo modo infantil:** animaciones para todo, tono de juego de niños — Movi es adultos reales con vidas reales
