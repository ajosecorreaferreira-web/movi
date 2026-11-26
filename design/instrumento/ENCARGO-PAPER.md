# Encargo — pintar el sistema Instrumento en Paper

Para el Claude de VS Code, con el plugin de Paper conectado y Paper Desktop abierto en el archivo de Movi.

## Antes de empezar

1. Lee `specs/foundations/instrumento.md` entero. Es el contrato.
2. Lee las tres referencias de `design/instrumento/referencia/`. Son pantallas en HTML con una pequeña capa de plantillas (`{{…}}`, `<sc-for>`, un `<script>` que calcula posiciones). Toma de ellas los valores **exactos**: colores, tamaños, espaciados, radios, alturas. Las posiciones de las luces de los anillos salen de la función del `<script>`: reprodúcelas, no las aproximes.
3. Usa `/sdd:paper` para el procedimiento de escritura.
4. **Pídeme confirmación antes de escribir en Paper.**
5. **No toques las páginas existentes** «Movi» y «Descartados».

## Fase 1 — Página «DS · Instrumento»

Crea la página y dentro, en este orden, de izquierda a derecha:

- `F · Tokens` — los colores con nombre, valor y función
- `F · Tipografía` — la escala de la spec
- Un frame por componente de la tabla de la spec (`C · Rueda`, `C · Anillo`, `C · Pantalla`, `C · Tecla`, `C · Interruptor`, `C · Nivel`, `C · Secuenciador`, `C · Perfil`, `C · Etiqueta`, `C · Persona`, `C · Campo`, `C · Mapa`, `C · Pestañas`, `C · Grabadora`, `CM · Navegación`), con todos sus estados uno al lado del otro. `C · Grabadora` lleva sus 6 estados: listo · grabando · grabado · reproduciendo · recortando · guardado (referencia: `referencia/grabadora.dc.html`).

**Para cuando termines la fase 1 y enséñamela.** No sigas con los flujos hasta que la apruebe.

## Fase 2 — Una página por flujo

Cuando apruebe la fase 1. Una página por flujo, con frames `AppM · <flujo> · <pantalla>` de 390 × 844, de izquierda a derecha en el orden del flujo y los estados debajo de cada pantalla.

Primero va lo que necesita el piloto de enero; el resto queda parado hasta nuevo aviso.

1. **Onboarding** (ya pintado) — ubicación · nivel · y después de nivel: **Conocerte** (las 8 preguntas de `FichaCompanero`, una por pantalla, respuesta con tecla) · **ficha de compañero** · **Tu saludo** (`C · Grabadora`, `modo: saludo`, se puede saltar) · bienvenida
2. **Cerca** (ya pintado) — revisa que lo gratis sale primero y añade la **clase en compañía** de los locales asociados (R13 y R14 de `specs/conexion/spec.md`)
3. **Primera vez** (nuevo), en este orden:
   - Propuesta con el saludo de la otra persona («Esta es Ana»)
   - Elección de formato: pareja, grupo pequeño o clase
   - Punto Movi y hora de día
   - Aviso al empezar y al terminar, y compartir con un contacto
   - **Mensaje a Ana** (`C · Grabadora`, `modo: mensaje`)
   - Videollamada opcional
4. **Ejecución · acompañado** — con la referencia de la v0.5 (a la vez, cada persona con su variante; nunca por turnos, ver R14)
5. **Después de entrenar** (nuevo):
   - «¿Qué tal con Ana?», con tres respuestas
   - Sí mutuo → programa de 3 semanas
   - «Otra persona» → otra semana, y la otra persona nunca se entera
   - «No era lo mío» → otras opciones, y cambio de formato tras tres «no»
6. **Mi gente**

**Pausados:** Detalle de entrenamiento, Programa (está en `feat/programa`), Celebraciones, Yo.

**Sin asignar en la v0.6:** Sesión (detalle · apuntado · sesión de partner) y Entrenar (propuesta · rueda abierta ajustando · otras opciones). [PENDIENTE: José decide si entran en el piloto o se pausan.]

Usa como referencia `Entrenar` y `Ejecución · acompañado`, que ya están resueltas en las referencias.

El contenido sale de lo que ya existe: los frames `AppM ·` actuales, `specs/conexion/spec.md`, `specs/workout-engine.md` y `specs/program/spec.md`. Copy en español y real, nada de lorem. Si falta un dato, déjalo marcado como `[PENDIENTE]`, no lo inventes.

**Para después de cada flujo y enséñamelo** antes de seguir con el siguiente.

## Reglas que no se rompen

- Solo tokens de la spec. Ningún color, radio ni tamaño nuevo.
- Una tecla negra y una pantalla OLED por pantalla, como máximo.
- Naranja nunca como texto sobre aluminio.
- Todo interactivo ≥ 44 × 44, etiquetas siempre visibles.
- Nada de emoji. Nada de barra de estado dibujada.
- El nivel siempre por su nombre.
- En pareja y en grupo se entrena a la vez: nadie cuenta ni espera (R14).
- La primera vez, siempre verificada, de día y en un sitio seguro.
- Un «no» nunca se comunica a la otra persona.
- La numerología es un juego, nunca un criterio.
