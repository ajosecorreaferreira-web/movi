# Movi — Tipografía
> **Plus Jakarta Sans** — Variable font, cálida, geométrica, humana

---

## Por qué Plus Jakarta Sans

Movi necesita una tipografía que sea:
- **Cálida** — no la Inter fría de las apps de tecnología
- **Legible a tamaños pequeños** — mobile-first, cuerpo a 16px mínimo
- **Con personalidad sin ser extravagante** — El Cuidador que Exige no usa fuentes decorativas
- **Variable font** — un solo archivo, todos los pesos, rendimiento optimizado en PWA
- **Disponible en Google Fonts** — sin coste, @fontsource compatible

Plus Jakarta Sans cumple todo esto. Tiene una ligera calidez en las curvas que la diferencia de la frialdad de Inter o DM Sans. Sus pesos funcionan perfectamente de 200 a 800 con interpolación variable.

---

## Instalación

```bash
# Opción 1 — @fontsource (recomendada para PWA)
npm install @fontsource-variable/plus-jakarta-sans

# En src/main.tsx:
import '@fontsource-variable/plus-jakarta-sans';
```

```css
/* Opción 2 — Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
```

---

## Escala tipográfica completa

| Token | Tamaño | Peso | Leading | Tracking | Uso |
|---|---|---|---|---|---|
| `--text-xs` | 12px | 500 | 1.5 | 0.025em | Etiquetas, badges, metadatos |
| `--text-sm` | 14px | 400 | 1.5 | 0 | Texto secundario, subtítulos de lista |
| `--text-base` | 16px | 400 | 1.5 | 0 | **Cuerpo principal** |
| `--text-lg` | 18px | 400 | 1.625 | -0.01em | Cuerpo grande, intro de sección |
| `--text-xl` | 20px | 600 | 1.375 | -0.01em | Subtítulos, nombres destacados |
| `--text-2xl` | 24px | 600 | 1.375 | -0.02em | H4, títulos de card |
| `--text-3xl` | 30px | 700 | 1.25 | -0.02em | H3, títulos de sección |
| `--text-4xl` | 36px | 700 | 1.25 | -0.025em | H2 |
| `--text-5xl` | 48px | 800 | 1.1 | -0.03em | H1, pantallas de logro |
| `--text-6xl` | 60px | 800 | 1.0 | -0.03em | Display hero, puntuaciones |
| `--text-7xl` | 72px | 800 | 1.0 | -0.04em | Trofeos, números de celebración |

---

## Jerarquía por nivel de énfasis

**Nivel 1 — Display / H1:** Onboarding hero, trofeo, número de racha. `48-72px` / weight 800 / tracking tight.

**Nivel 2 — H2 / H3:** Títulos de pantalla, secciones principales. `30-36px` / weight 700.

**Nivel 3 — H4 / Subtitle:** Nombres de usuario, títulos de card. `20-24px` / weight 600.

**Nivel 4 — Body:** Descripciones, instrucciones. `16-18px` / weight 400 / leading relaxed.

**Nivel 5 — Caption:** Horarios, distancias, timestamps. `12-14px` / weight 500.

---

## Aplicación por componente

- **Bottom Nav labels:** `11px` / weight 500 (excepción por espacio)
- **Botones:** `16px` / weight 600
- **Inputs:** `16px` / weight 400 — iOS no hace zoom si font-size ≥ 16px
- **Badges / chips:** `12px` / weight 600
- **Toast:** `14px` / weight 400 (body) + `14px` / weight 600 (acción)
- **Trofeo principal:** `48-72px` / weight 800

---

## Fallbacks

```css
--font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui,
             -apple-system, BlinkMacSystemFont, 'Segoe UI',
             Roboto, 'Helvetica Neue', Arial, sans-serif;
```

---

## Reglas absolutas

- ✓ Mínimo `14px` para texto de cuerpo (WCAG 1.4.4)
- ✓ Mínimo `12px` para cualquier texto en producción
- ✓ `16px` para inputs — evita zoom automático de iOS
- ✗ Nunca `font-weight: 300` en textos de información — pierde legibilidad en mobile
- ✗ Nunca más de 3 tamaños distintos en una misma pantalla
- ✗ Nunca `letter-spacing` positivo en tamaños grandes
