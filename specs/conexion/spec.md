# conexion.md — La primera vez y la siguiente

**Versión:** 0.1
**Fecha:** 2026-11-24
**Estado:** borrador (decisiones tomadas por José en Cowork; pendiente de aprobar como spec)
**Origen:** análisis «Dónde estamos y qué falta» y «Confianza, densidad y motor de entrenamiento» (claude.ai, 24 nov 2026). Riesgos detectados: densidad, seguridad al quedar con desconocidos y que la gente repita.

---

## Principio

Movi convierte a un desconocido en alguien con quien entrenas: te conoce jugando, te deja oír a la otra persona antes de quedar, hace que la primera vez sea segura sin obligarte a ir en grupo, y solo propone repetir cuando las dos personas quieren.

---

## Lo que se elimina

| Se elimina | Por qué |
|---|---|
| Obligar a que la primera vez sea en grupo | Era una barrera alta y exigía mucha gente desde el principio. Lo que protege es el sitio y la verificación, no el número de personas. |
| Matching por numerología o zodiaco | Se queda como juego visible, nunca como criterio. |
| Ofrecer primero una clase de pago a quien está solo | El primer contacto es gratis (auditoría, F15). |
| El chat libre entre desconocidos antes de la primera vez | Lo sustituyen el saludo en audio, el mensaje de propuesta y mensajes predefinidos. Menos acoso, menos moderación. |

---

## Modelo de datos

```ts
// Conocerte jugando: 8 preguntas, una por pantalla, respuesta con una tecla
type FichaCompanero = {
  horario: 'temprano' | 'media_manana' | 'tarde' | 'noche'
  nivel: 'activo' | 'en_marcha' | 'en_forma' | 'potencia' | 'elite'
  vieneCon: 'solo' | 'carrito' | 'perro' | 'ninos'
  charla: 'charla' | 'un_poco' | 'silencio'
  puntualidad: 'puntual' | 'mas_o_menos' | 'llego_cuando_llego'
  despues: 'cafe' | 'depende' | 'a_lo_mio'
  motivacion: 'reirme' | 'superarme' | 'desconectar'
  numeroEntreno?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9   // juego; sale de día y mes, nunca del año
  franjaEdad: '18_29' | '30_39' | '40_49' | '50_64' | '65_mas'
  conQuien: 'solo_mujeres' | 'solo_hombres' | 'me_da_igual'
  verificacion: 'foto_verificada' | 'sin_verificar'
  saludo?: Grabacion
}

// Saludo del perfil y mensaje al proponer quedada (componente C · Grabadora)
type Grabacion = {
  uso: 'saludo' | 'mensaje'
  duracionMs: number                          // máximo 20000
  recorte: { inicioMs: number; finMs: number } // pasos de 500 ms
  alternativaTexto?: string                   // para quien no puede o no quiere usar la voz
  estado: 'activa' | 'denunciada' | 'retirada'
}

// La primera vez
type PrimeraVez = {
  formato: 'pareja' | 'grupo_pequeno' | 'clase_local'  // 'pareja' por defecto
  lugar: { tipo: 'punto_movi' | 'local_asociado'; id: string }
  franja: 'diurna'                            // solo de día
  avisoInicio: boolean
  avisoFin: boolean
  compartidaCon?: 'contacto_de_confianza'
  videollamadaPrevia: boolean                 // opcional, en directo, no se graba
}

// Después de entrenar: privada siempre
type Valoracion = {
  respuesta: 'repetiria' | 'otra_persona' | 'no_era_lo_mio'
  compatibilidad: 1 | 2 | 3 | 4 | 5           // privada, alimenta el emparejamiento
}

// Locales asociados: «clase en compañía»
type LocalAsociado = {
  tipo: 'hyrox_crossfit' | 'entreno_grupo' | 'box_mujeres'
      | 'entrenamiento_personal' | 'pilates_barre_yoga' | 'baile'
  precioPrimeraVez: 'prueba_para_dos'
}
```

**Emparejamiento:** horario, distancia, nivel, etapa de vida (`vieneCon`), `charla`, `puntualidad`, `despues` y `conQuien`. Mezcla personas que hablan mucho con personas calladas. Cada grupo nuevo lleva un anfitrión. Las valoraciones privadas ajustan el siguiente emparejamiento.

---

## Reglas duras

1. **R1 — La primera vez solo se propone con las dos personas con foto verificada, de día y en un punto Movi o un local asociado.**
2. **R2 — Una pareja mixta la primera vez solo se propone si las dos personas lo han marcado** (`conQuien: 'me_da_igual'` en ambas).
3. **R3 — El formato de la primera vez lo elige la persona:** pareja (por defecto), grupo pequeño de 3 o 4 con anfitrión, o clase en un local.
4. **R4 — Antes de la primera vez, la app reproduce el saludo de la otra persona** («Esta es Ana»), si lo tiene.
5. **R5 — La videollamada previa es opcional, en directo y nunca se graba.**
6. **R6 — El teléfono no se comparte hasta que las dos personas lo acepten;** compartir datos de contacto antes muestra un aviso.
7. **R7 — Bloquear y denunciar están a un toque** desde cualquier pantalla en la que aparezca otra persona.
8. **R8 — Repetir requiere un sí de las dos personas.** Un «no» nunca se comunica a la otra persona.
9. **R9 — Después de tres «no era lo mío» seguidos, Movi propone otro formato** (grupo, clase u otra franja), nunca «has fallado».
10. **R10 — La numerología no afecta al emparejamiento** ni se usa para excluir; se pide día y mes, nunca el año.
11. **R11 — Ningún porcentaje de compatibilidad salvo el calculado de señales reales.**
12. **R12 — El saludo dura como máximo 20 s**, se puede escuchar, recortar, borrar y regrabar, se puede denunciar, y tiene alternativa en texto.
13. **R13 — A quien está solo, primero se le ofrece lo gratis** (punto Movi); la clase de pago va después y siempre con el precio de prueba para dos por delante.
14. **R14 — La clase en compañía es para dos:** Movi empareja antes de reservar; no vende clases sueltas.

---

## Criterios de aceptación

- [ ] **C1 —** El onboarding incluye las 8 preguntas de `FichaCompanero`, una por pantalla, y termina en la ficha de compañero y la grabadora del saludo (que se puede saltar).
- [ ] **C2 —** La propuesta de primera vez muestra el saludo de la otra persona, el formato, el punto Movi, la hora y las opciones de aviso y compartir.
- [ ] **C3 —** No existe ningún camino que proponga una primera vez de noche, sin verificar o fuera de un punto Movi o un local asociado.
- [ ] **C4 —** La pantalla de después de entrenar tiene las tres respuestas y nunca revela la respuesta de la otra persona.
- [ ] **C5 —** El programa de 3 semanas solo se propone con un «repetiría» mutuo.
- [ ] **C6 —** «Cerca» muestra primero las opciones gratis y, después, la clase en compañía.

---

## Fuera de alcance

- **Chat libre antes de quedar.** Solo saludo, mensaje de propuesta y mensajes predefinidos («llego 5 min tarde», «hoy no puedo, ¿movemos al jueves?»).
- **Verificación de identidad con documento.** Con la foto verificada basta para el piloto; se revisa con datos.
- **Numerología con fecha completa o carta astral.** Solo el número de entreno, como juego.
- **Pagos dentro de la app.** En el piloto, la clase en compañía se reserva y se paga en el local.

---

## Trazabilidad

- Diseño: `AppM · Onboarding` (añadir Conocerte y Saludo), `AppM · Primera vez`, `AppM · Después de entrenar`, `AppM · Mensaje a Ana`. Referencia: `design/instrumento/referencia/grabadora.dc.html` (prop `modo`: `saludo` | `mensaje`).
- Specs relacionadas: `specs/foundations/instrumento.md` (C · Grabadora, v0.6), `specs/foundations/producto.md`, `specs/program/spec.md` (rama `feat/programa`: alinear con R8 y R9).
- Referencias externas: Timeleft (grupos por test de personalidad, valoración privada), Bumble y Tinder (verificación con foto, videollamada sin dar el teléfono, bloqueo sin notificar).
