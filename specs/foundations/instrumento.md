# instrumento.md — El sistema visual de Movi

**Versión:** 0.2
**Fecha:** 2026-11-24
**Estado:** aprobada (dirección elegida por José)
**Origen:** exploración de tres direcciones (Instrumento · Escritorio · Glyph). Elegida: **A · Instrumento**, inspirada en los productos físicos de Teenage Engineering, **con el anillo de luces de C · Glyph**, inspirado en Nothing.

---

## Principio

Movi se usa como un instrumento: cada control es un objeto físico que se ve, se oye y se siente, y cada color dice qué función tiene, para que se pueda usar sin leer.

Del mundo Teenage Engineering tomamos el **carácter** (color con función, tipografía técnica, controles físicos, sonido, humor), no lo críptico. El usuario principal es una madre con un carrito y hay un modo para personas mayores: todo control lleva etiqueta legible y mide al menos 44 px.

---

## Lo que se elimina

| Se elimina | Por qué |
|---|---|
| Crema cálida `oklch(0.98 0.01 75)` como fondo | Es el aspecto más repetido en apps ahora mismo. Lo sustituye el aluminio. |
| Naranja amanecer `oklch(0.70 0.19 46)` como color primario de marca | Un color «de marca» decorativo. El naranja nuevo tiene una función: personas y «ahora». |
| Plus Jakarta Sans | Tipografía neutra sin carácter. La sustituyen Archivo y Martian Mono. |
| Tarjetas con radio 16, píldoras y sombras difusas | Lenguaje genérico de app. Lo sustituyen módulos con línea de 1 px, radio 6/10 y la sombra física de tecla. |
| Selector de nivel como deslizador 1–5 | El nivel es una tecla con su nombre. |
| Confeti en las celebraciones | El anillo se enciende entero y suena un acorde. Detalle en una spec propia. |

---

## Modelo de datos — tokens

Fuente de verdad. Cuando se migre el código, esto sustituye a la paleta de `src/index.css`.

```css
:root {
  /* Neutros: el cuerpo de aluminio */
  --color-aluminio:          #EEEEEC;  /* fondo */
  --color-aluminio-claro:    #F7F7F5;  /* teclas, módulos, navegación */
  --color-aluminio-pulsado:  #E4E4E0;  /* tecla pulsada */
  --color-linea:             #CFCFCB;  /* bordes de 1 px, luz apagada sobre aluminio */
  --color-pista:             #D6D6D2;  /* fondo del interruptor, pasos sin hacer */
  --color-tinta:             #111111;  /* texto, tecla principal, luz encendida sobre aluminio */
  --color-tinta-2:           #3A3A3A;  /* texto secundario */
  --color-tinta-3:           #5A5A5A;  /* etiquetas, sombra de la tecla principal */

  /* Pantalla OLED */
  --color-pantalla:          #0F0E12;
  --color-pantalla-texto:    #F2F2F0;
  --color-pantalla-texto-2:  #CFCFCB;
  --color-pantalla-texto-3:  #9A9A9A;
  --color-pantalla-apagado:  #5A5A5E;  /* barras inactivas del perfil (decorativo) */
  --color-luz-apagada-pantalla: #2E2E32;

  /* Funciones: un color = una función */
  --color-tiempo:  #2B4FD8;  /* texto encima: blanco (6,5:1) */
  --color-sobre-tiempo: #FFFFFF;  /* texto y aguja sobre azul tiempo; ningún otro uso */
  --color-lugar:   #E0A21C;  /* texto encima: tinta (8,4:1) */
  --color-nivel:   #9A9A96;  /* texto encima: tinta (6,7:1) */
  --color-gente:   #FF5B1A;  /* personas y «ahora». Texto encima: tinta (6,1:1) */

  /* Estado */
  --color-error:   #B42318;  /* solo errores; siempre con icono y texto (5,7:1 sobre aluminio) */

  /* Forma */
  --radio-tecla:   6px;
  --radio-modulo:  10px;
  --sombra-tecla:            0 3px 0 var(--color-linea);
  --sombra-tecla-principal:  0 3px 0 var(--color-tinta-3);
  --brillo-led:              0 0 6px var(--color-gente);
  --sombra-capuchon:         inset 0 -3px 0 rgb(0 0 0 / 0.25);  /* volumen del capuchón de la rueda */

  /* Tipografía */
  --font-display: 'Archivo', system-ui, sans-serif;     /* 200–400 */
  --font-mono:    'Martian Mono', ui-monospace, monospace; /* 400–600 */

  /* Movimiento */
  --muelle:        cubic-bezier(.34, 1.56, .64, 1);
  --duracion-tecla:  60ms;
  --duracion-rueda:  160ms;
  --duracion-interruptor: 180ms;
}
```

### Radios

Solo existen dos: `--radio-tecla` (6 px) y `--radio-modulo` (10 px). Un contenedor con padding 4 alrededor de una tecla de radio 6 lleva radio 10, para que las esquinas sean concéntricas (6 + 4 = 10). Así van, por ejemplo, la pista del interruptor, la pantalla pequeña de la rueda y la navegación. No hay radio 8 ni 12. Las luces y los LED circulares usan `50%`: es una forma, no un radio de la escala.

### Escala tipográfica

| Rol | Fuente | Peso | Tamaños | Notas |
|---|---|---|---|---|
| Título | Archivo | 250 | 56 · 34 · 31 · 28 | Minúsculas. Interlineado 1–1,05 |
| Cifra | Archivo | 200 a partir de 40 px · 300 a 20 px | 84 · 76 · 56 · 50 · 40 · 20 | Solo números. 300 no es «letra fina» (R8 habla de 200–250) |
| Texto | Archivo | 400 | 14,5 · 15 · 16 | Interlineado 1,45 |
| Etiqueta | Martian Mono | 500 | 10 · 10,5 · 11 · 13 | Mayúsculas, espaciado 0,06–0,1 em |

### Componentes

| Componente | Prefijo Paper | Anatomía | Estados |
|---|---|---|---|
| Rueda | `C · Rueda` | Anillo de luces (270°, 15–19 luces) + capuchón del color de su función + aguja + valor + etiqueta de función | reposo · foco · ajustando · desactivada |
| Anillo | `C · Anillo` | Luces en círculo (360°, 36–48); encendidas = tiempo que queda; la naranja = ahora. Cifra en el centro | sobre aluminio · sobre pantalla · movimiento reducido |
| Pantalla | `C · Pantalla` | Módulo OLED: cabecera en mono con LED + contador; contenido; opcionalmente perfil de intensidad | — |
| Tecla | `C · Tecla` | Principal (tinta), secundaria (aluminio claro), con LED. Alturas 58 y 48 | reposo · pulsada · foco · desactivada |
| Interruptor | `C · Interruptor` | Pista + bloque de tinta en 3 posiciones (más fácil · estándar · más difícil) | 3 posiciones · foco |
| Nivel | `C · Nivel` | Tecla con luz gris + nombre del nivel | — |
| Secuenciador | `C · Secuenciador` | 16 pasos; hechos en tinta, actual en naranja con brillo, pendientes en pista | — |
| Perfil | `C · Perfil` | Barras de intensidad por fase sobre pantalla; activas en naranja | — |
| Etiqueta de función | `C · Etiqueta` | Cuadrado del color de la función + etiqueta mono | — |
| Persona | `C · Persona` | Cuadrado naranja con inicial + etiqueta mono + línea de contexto | — |
| Navegación | `CM · Navegación` | 4 destinos (Cerca · Entrenar · Mi gente · Yo), etiqueta mono siempre visible, LED naranja en el activo | 4 activos |

---

## Reglas duras

1. **R1 — Un color, una función.** Azul = tiempo, ocre = lugar, gris = nivel, naranja = personas y «ahora». Ningún otro color en componentes, salvo `--color-error` en errores.
2. **R2 — El naranja nunca es texto sobre aluminio** (2,7:1). Sí como relleno con texto en tinta, como LED, o como cifra grande sobre pantalla.
3. **R3 — Una tecla negra por pantalla**, y es la acción principal.
4. **R4 — Las ruedas no se giran en círculo.** Se ajustan arrastrando en vertical (un paso cada 12 px), con − y + o con las flechas del teclado. Llevan `role="slider"` y `aria-valuetext` con el valor dicho («25 minutos»).
5. **R5 — La escala de una rueda es un anillo de luces:** encendidas = valor, la naranja = posición actual.
6. **R6 — Anillo de cuenta atrás:** se apaga una luz por segundo y la naranja marca el ahora. Con `prefers-reduced-motion` no hay barrido: solo cambia la cifra.
7. **R7 — Como mucho una pantalla OLED por vista.** Contiene lo que «dice la máquina»: la propuesta o el ejercicio actual.
8. **R8 — Letra fina (Archivo 200–250) solo a partir de 28 px.** Texto corrido ≥ 14,5 px. Etiquetas ≥ 10 px, y nunca son la única portadora de información crítica.
9. **R9 — Modo asistido:** sin ruedas. Teclas − y + de 56 px con el valor entre ellas, texto a 20 px, etiquetas a 14 px y una decisión por pantalla.
10. **R10 — Sonido y vibración:** opcionales, con un solo interruptor de silencio. Cortos (≤ 150 ms salvo el fin del entreno). Nunca la única señal. Si el móvil está en silencio, Movi también. En iPhone una PWA no puede vibrar: nada depende de la vibración.
11. **R11 — Teclas:** radio 6, alto 58 o 48. Al pulsar bajan 3 px y pierden la sombra en 60 ms.
12. **R12 — El nivel siempre con su nombre.** Nunca números ni puntos.
13. **R13 — El contrato SDD sigue vigente:** tokens siempre, 44 × 44 mínimo, etiquetas visibles, nada de emoji, ninguna barra de estado dibujada.

### Sonido y vibración

| Momento | Sonido | Vibración |
|---|---|---|
| Mover una rueda | clic seco por luz | tic corto |
| Pulsar una tecla | «clac» mecánico | tic corto |
| Cambio de ejercicio | dos notas que suben | doble pulso |
| Cambio de rol | barrido del anillo | pulso largo |
| Fin del entreno | acorde corto | tres pulsos |

---

## Criterios de aceptación

- [ ] **C1 —** Paper tiene una página **DS · Instrumento** con un frame `F · Tokens`, uno `F · Tipografía` y un frame por componente de la tabla, con todos sus estados.
- [ ] **C2 —** Los valores de Paper coinciden exactamente con los tokens de esta spec. Ningún color, radio o tamaño inventado.
- [ ] **C3 —** Cada flujo tiene su propia página en Paper, con frames `AppM · <flujo> · <pantalla>` de 390 × 844 ordenados en el orden del flujo y los estados debajo.
- [ ] **C4 —** Ninguna pantalla tiene más de una tecla negra ni más de una pantalla OLED.
- [ ] **C5 —** Ningún texto naranja sobre aluminio.
- [ ] **C6 —** Todo elemento interactivo mide al menos 44 × 44.
- [ ] **C7 —** Las páginas antiguas de Paper («Movi» y «Descartados») no se han tocado.

---

## Fuera de alcance

- **Migración del código.** Pasar estos tokens a `src/index.css` y rehacer componentes va en una spec propia, después de revisar Paper.
- **Modo oscuro.** El contraste lo da la pantalla OLED. Si hace falta un modo noche, spec propia.
- **Nombre, logotipo e identidad de marca.** Movi se mantiene por ahora.
- **Celebraciones en detalle** (animación, secuencia, sonido). Spec propia.

---

## Trazabilidad

- Exploración y referencia visual: lienzo «Movi · Tres direcciones» en claude.ai, página **Sistema elegido**. Copia de las tres pantallas de referencia en `design/instrumento/referencia/`. **Donde las referencias choquen con esta spec, gana la spec.**
- Cambios de la 0.2 (2026-11-24), tras comparar las referencias con los tokens: se añaden `--color-sobre-tiempo` y `--sombra-capuchon`, la nota de radios y el peso 300 para la cifra de 20 px. Al pintarlo en Paper, los valores de las referencias que no están en la escala se llevan al token más cercano: 26 → 28, 48 → 56, 9,5 → 10, 11,5 → 11, el texto Archivo de 12,5–14 → 14,5, `#B8B8B4` → `--color-linea`, `#D8D8D4` → `--color-pantalla-texto-2`, y los radios 8 y 12 → 10.
- Specs relacionadas: `specs/workout-engine.md`, `specs/program/spec.md`, `specs/decisions/specs-location.md`.
- Referencias: Teenage Engineering (OP-1 field, EP-133 K.O. II, TP-7), Nothing (Glyph Matrix).
