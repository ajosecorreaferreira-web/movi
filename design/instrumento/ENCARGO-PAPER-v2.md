# Encargo v2 — componentes nuevos y flujos del piloto en Paper

Para el Claude de VS Code, con el plugin de Paper conectado y Paper Desktop abierto en el archivo de Movi.

Este encargo **sustituye la fase 2** de `ENCARGO-PAPER.md` y **amplía la fase 1** con componentes nuevos. Las reglas de siempre siguen vigentes:

- Pide confirmación antes de escribir en Paper.
- No toques las páginas «Movi» ni «Descartados».
- Solo tokens de Instrumento.
- Una tecla negra y una pantalla OLED por pantalla, como máximo.
- Nada de emoji.
- Todo elemento interactivo mide al menos 44 × 44.

## Antes de empezar

1. Lee estas specs:
   - `specs/foundations/instrumento.md`
   - `specs/conexion/spec.md` (v0.2)
   - `specs/foundations/producto.md`
   - `specs/workout-engine.md` (v1.3)
2. Abre las tres referencias interactivas de `design/instrumento/referencia/`:
   - `primera-interaccion.dc.html`
   - `grabadora.dc.html`
   - `ejercicio-en-luces.dc.html`

   Son prototipos HTML con lógica. Toma de ellos los valores exactos y los estados, como hiciste con `entrenar.dc.html`.
3. Usa `/sdd:paper`.

## Fase 1b — Componentes nuevos en «DS · Instrumento»

Un frame por componente, con todos sus estados uno al lado del otro:

| Componente | Estados |
|---|---|
| `C · Grabadora` | listo · grabando · grabado · reproduciendo · recortando · guardado |
| `C · Selector de cuándo` | vacío · días elegidos · rango de horas · atajo (mañana, tarde o noche) |
| `C · Tarjeta de plan` | encaja · no encaja (atenuada) |
| `C · Punto Movi` | con foto, punto exacto y etiquetas |
| `C · Figura de luces` | frente · lado · error típico · en pareja · movimiento reducido (dos fotogramas fijos) |
| `C · Tarjeta de ejercicio` | reposo (bucle) · abierta · cámara lenta |
| `C · Tarjeta perforada` | 0, 3 y 5 sesiones usadas · cara del QR |
| `C · Sello` | un sello con su recuento (por ejemplo, «puntual ×12») |
| `C · Reputación` | verificada · sesiones · personas que repiten · sellos |
| `CM · Chat` | burbuja de texto · burbuja de audio · respuesta rápida · tarjeta de quedada (propuesta, aceptada, otra hora) · aviso al compartir el teléfono |

**Para cuando acabes la fase 1b y enséñamela.**

## Fase 2 — Flujos del piloto, en este orden

Cada flujo va en su propia página, con frames `AppM · <flujo> · <pantalla>` de 390 × 844, de izquierda a derecha y con los estados debajo. **Para después de cada flujo** y enséñamelo.

1. **Primera interacción.** Referencia: `primera-interaccion.dc.html`.
   - Cerca, sin registro: vacío, con filtro de cuándo, y sin planes (crear uno o ir a una sesión municipal).
   - Plan: de grupo y en pareja.
   - Registro: zona, nivel y selfie. En pareja es obligatorio; en grupo, con «Ahora no»; más los estados de cuenta atrás y verificada.
   - Estás dentro.
2. **Conócete.**
   - Tu saludo, con la grabadora en `modo: saludo`.
   - Una pregunta después de la sesión.
   - Conócete en un minuto, con el resultado «tu tipo de compañero».
   - Ficha de compañero.
3. **Primera vez.**
   - Propuesta («Esta es Ana», con su saludo).
   - Formato: pareja, grupo pequeño, clase o instalación municipal.
   - Punto Movi.
   - Seguridad: aviso al empezar y al terminar, y compartir ubicación.
   - Videollamada previa.
   - Mensaje a Ana, con la grabadora en `modo: mensaje`.
4. **Chat de quedada.**
   - Abierto al aceptar.
   - Tarjeta de quedada.
   - Respuestas rápidas.
   - Audio.
   - Aviso de teléfono.
   - Archivado.
5. **Ficha del entreno.** Referencia: `ejercicio-en-luces.dc.html`.
   - Lista de tarjetas.
   - Tarjeta abierta: frente o lado, cámara lenta, tu variante y la de tu compañera.
6. **Ejecución · acompañado, con figura de luces.**
   - Figura, anillo de tiempo y contador.
   - Error típico momentáneo («Así no»).
   - Reto cooperativo con el anillo compartido.
   - Modo asistido.
7. **Después de entrenar.**
   - «¿Qué tal con Ana?», con tres respuestas.
   - Compatibilidad privada.
   - Sellos.
   - Avisar de un problema.
   - Sí mutuo: programa de 3 semanas.
   - «Otra persona»: otra semana.
   - Tras tres «no», cambio de formato.
8. **Bono municipal.** Tarjeta perforada con 0, 3 y 5 sesiones, y la entrada perforando.
9. **Mi gente.**
   - Personas.
   - Reencuentros.
   - Programa activo.
10. **Perfil público.** Solo reputación positiva.

**En pausa** hasta nuevo aviso: Detalle de entrenamiento, Programa (está en `feat/programa`), Celebraciones más allá de «Estás dentro», y Ajustes de «Yo».

## Reglas nuevas para estas pantallas

- La primera pantalla al abrir son planes, nunca un formulario ni un tutorial.
- Antes de quedar, solo zona y nivel; el selfie, solo para quedar en pareja.
- El tiempo siempre en azul (`--color-tiempo`); los días son teclas.
- Nada negativo en público: ni medias, ni estrellas, ni comentarios.
- Un «no» nunca se comunica a la otra persona.
- La numerología, si aparece, va con la etiqueta «sin base científica».
- El chat solo existe a partir de una quedada aceptada.
- En la figura de luces:
  - El cuerpo va en `--color-pantalla-texto`.
  - La articulación clave, en `--color-gente`.
  - El error, en `--color-error` con el texto «Así no».
