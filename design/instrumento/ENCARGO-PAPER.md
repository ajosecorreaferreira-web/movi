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
- Un frame por componente de la tabla de la spec (`C · Rueda`, `C · Anillo`, `C · Pantalla`, `C · Tecla`, `C · Interruptor`, `C · Nivel`, `C · Secuenciador`, `C · Perfil`, `C · Etiqueta`, `C · Persona`, `C · Campo`, `C · Mapa`, `C · Pestañas`, `CM · Navegación`), con todos sus estados uno al lado del otro.

**Para cuando termines la fase 1 y enséñamela.** No sigas con los flujos hasta que la apruebe.

## Fase 2 — Una página por flujo

Cuando apruebe la fase 1. Una página por flujo, con frames `AppM · <flujo> · <pantalla>` de 390 × 844, de izquierda a derecha en el orden del flujo y los estados debajo de cada pantalla.

1. **Onboarding** — ubicación · nivel · bienvenida
2. **Cerca** — mapa con lista · sin nadie cerca · apuntado
3. **Sesión** — detalle · apuntado · sesión de partner
4. **Entrenar** — propuesta · rueda abierta ajustando · otras opciones
5. **Detalle de entrenamiento** — timeline único con fases y variantes
6. **Ejecución** — voz · tarjeta · acompañado (a la vez, cada persona con su variante; nunca por turnos, ver R14) · asistido
7. **Programa** — ¿qué tal la sesión? · propuesta con grupo · propuesta solo · semanas con constancia · Tu grupo
8. **Mi gente**
9. **Celebraciones** — primera sesión · 3ª vez con la misma persona · fin del programa
10. **Yo** — nivel · adaptaciones · sonido y vibración

Usa como referencia `Entrenar` y `Ejecución · acompañado`, que ya están resueltas en las referencias.

El contenido sale de lo que ya existe: los frames `AppM ·` actuales, `specs/workout-engine.md` y `specs/program/spec.md`. Copy en español y real, nada de lorem. Si falta un dato, déjalo marcado como `[PENDIENTE]`, no lo inventes.

**Para después de cada flujo y enséñamelo** antes de seguir con el siguiente.

## Reglas que no se rompen

- Solo tokens de la spec. Ningún color, radio ni tamaño nuevo.
- Una tecla negra y una pantalla OLED por pantalla, como máximo.
- Naranja nunca como texto sobre aluminio.
- Todo interactivo ≥ 44 × 44, etiquetas siempre visibles.
- Nada de emoji. Nada de barra de estado dibujada.
- El nivel siempre por su nombre.
- En pareja y en grupo se entrena a la vez: nadie cuenta ni espera (R14).
