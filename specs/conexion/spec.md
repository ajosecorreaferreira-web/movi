# conexion.md — La primera vez y la siguiente

**Versión:** 0.5
**Fecha:** 2026-11-26
**Cambios 0.5:** registro sin barreras: cuenta con Google, Apple o correo con enlace mágico, sin teléfono. La verificación la revisa el equipo y ninguna otra persona ve el selfie; tres estados. Nadie ve la cara de otra persona antes de conocerse: se reconocen con la señal de encuentro (R26).
**Cambios 0.4:** el registro queda en nivel, teléfono y selfie (solo en pareja); la zona se cambia desde la cabecera de Cerca. La primera vez termina antes de anochecer. Respuestas rápidas del chat nuevas. Sin reconocimiento facial automático.
**Cambios 0.3:** gana R15. Antes de apuntarte se ve el nombre y el tipo del punto Movi y los minutos andando; el punto exacto y su foto aparecen en «Estás dentro» (pasos 3 y 5, R15 y C4).
**Cambios 0.2:** feedback de José.
- Se puede ver gente sin registrarse, y solo hay 3 pasos obligatorios.
- Puntos Movi con tipos.
- Bono municipal con pase de tarjeta perforada.
- Ficha del entreno antes de quedar.
- «Tu tipo de compañero» en lugar de la numerología.
- Chat ligado a la quedada, al estilo Wallapop.
- Valoraciones sin estrellas: privadas, sellos positivos y aviso aparte.

**Estado:** borrador (pendiente de aprobar)
**Origen:** análisis «Dónde estamos y qué falta», «Confianza, densidad y motor de entrenamiento» y «Ajustes a la spec de conexión» (claude.ai, 24–26 nov 2026).

---

## Principio

Movi convierte a un desconocido en alguien con quien entrenas. Ves quién hace deporte cerca sin registrarte, te registras solo para quedar, y la primera vez es en un sitio seguro con el entreno a la vista. Para repetir, las dos personas tienen que querer, y lo negativo nunca se hace público.

---

## La primera interacción

Es la pantalla que decide si Movi funciona. **Objetivo: que en menos de 2 minutos alguien se apunte a algo que le gusta, cerca y para hoy, mañana o esta semana.** El onboarding llega después, cuando ya quiere algo, y se siente como tocar un instrumento: rápido, con sonido y con gracia.

1. **Abres la app y ves planes, no formularios.** «Cerca de ti» con tres planes ordenados por cercanía en el tiempo: hoy, mañana, esta semana. Cada plan muestra la hora, el sitio a cuántos minutos, quién va (iniciales y nivel) y lo que se hace, con un vídeo corto en bucle.
2. **Una sola pregunta opcional para afinar: «¿Cuándo te viene bien?».** Arriba, los 7 días que vienen como teclas (HOY, VIE, SÁB…); debajo, las horas de 7 a 22 como un secuenciador de 16 pasos en azul, el color del tiempo. Se marca el rango tocando la hora de inicio y la de fin, o con tres atajos: mañana (7–13), tarde (14–19) y noche (20–22). Los planes que encajan suben y se cuentan al momento («VIE, SÁB · 7–10 H · 2 PLANES»), cada toque con su clic.
3. **Tocas un plan:** ves a la gente (su saludo, si lo tiene), la ficha del entreno, y el nombre y el tipo del punto Movi con los minutos andando, más el texto «El punto exacto lo ves al apuntarte».
4. **«Me apunto»** abre el registro, como instrumento, en tres pasos: (1) la cuenta con un toque («Continuar con Google», «Continuar con Apple» o, como alternativa, el correo con enlace mágico; sin teléfono), (2) el nivel con su tecla (al elegir pasa solo a la siguiente pantalla) y (3) solo para quedar en pareja, la verificación: «Comprobamos que eres tú», un selfie de 3 segundos con el anillo de cuenta atrás («Solo lo ve el equipo de Movi, para verificarte, y luego se borra. Nadie más lo verá nunca.»). Tras el selfie: «FOTO LISTA · LA REVISAMOS ANTES DEL VIERNES». La zona no es un paso: va en la cabecera de Cerca («LAS ROZAS · EL PINAR · CAMBIAR»).
5. **Celebración corta:** el anillo se enciende y suena el acorde: «Estás dentro. Ana te espera el viernes a las 8:00, junto al cartel de las máquinas», con la foto del punto exacto. Si la foto está en revisión: «Te avisamos cuando tu foto esté verificada».
6. **Ahora sí, si quiere:** grabar su saludo, la ficha de compañero o «tu tipo de compañero». Todo opcional y todo con su sonido.

---

## Lo que se elimina

| Se elimina | Por qué |
|---|---|
| Obligar a que la primera vez sea en grupo | Era una barrera alta. Lo que protege es el sitio y la verificación. |
| Un onboarding con 8 preguntas antes de ver a nadie | Barrera de entrada. Las preguntas llegan de una en una, después de cada sesión. |
| Numerología como juego principal | No tiene base científica. La sustituye «tu tipo de compañero» (cronotipo y rasgos); la numerología queda como guiño etiquetado. |
| Mensajes entre desconocidos antes de aceptar una quedada | El chat se abre cuando las dos personas aceptan. |
| Estrellas y medias públicas | Se inflan y castigan una mala tarde. Las sustituyen sellos positivos y señales de lo que has hecho. |
| Ofrecer primero una clase de pago a quien está solo | Lo gratis va primero (auditoría, F15). |

---

## Modelo de datos

```ts
// Registro: solo esto es obligatorio, y solo al pulsar «me apunto»
type Registro = {
  zona: { lat: number; lng: number } | { barrio: string }
  nivel: 'activo' | 'en_marcha' | 'en_forma' | 'potencia' | 'elite'
  cuenta: 'google' | 'apple' | 'correo'  // el correo, con enlace mágico; nunca visible para otras personas
  verificacion: 'sin_verificar' | 'en_revision' | 'verificada'   // obligatoria solo para quedar en pareja; fuera solo se ve «Verificada»
  avisos: 'notificacion' | 'correo'      // el SMS queda opcional y para más adelante
}

// La ficha se completa poco a poco: una pregunta después de cada sesión
type FichaCompanero = {
  disponibilidad?: { dias: ('lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom')[]; desde: number; hasta: number }  // horas 7–22
  vieneCon?: 'solo' | 'carrito' | 'perro' | 'ninos'
  charla?: 'charla' | 'un_poco' | 'silencio'
  puntualidad?: 'puntual' | 'mas_o_menos' | 'llego_cuando_llego'
  despues?: 'cafe' | 'depende' | 'a_lo_mio'
  motivacion?: 'reirme' | 'superarme' | 'desconectar'
  conQuien: 'solo_mujeres' | 'solo_hombres' | 'me_da_igual'
  franjaEdad?: '18_29' | '30_39' | '40_49' | '50_64' | '65_mas'
  tipo?: TipoCompanero
  mesNacimiento?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12   // dato curioso; nunca día ni año
  saludo?: Grabacion
}

// «Tu tipo de compañero»: cronotipo y rasgos inspirados en el TIPI (10 ítems, Gosling)
type TipoCompanero = {
  cronotipo: 'alondra' | 'buho' | 'intermedio'
  energia: 'tira_del_grupo' | 'constante' | 'a_su_ritmo'
  sociabilidad: 'charlatana' | 'equilibrada' | 'tranquila'
  arquetipo: string                      // «la alondra charlatana»
}

type Grabacion = {
  uso: 'saludo' | 'mensaje'
  duracionMs: number                     // máximo 20000
  recorte: { inicioMs: number; finMs: number }
  alternativaTexto?: string
  estado: 'activa' | 'denunciada' | 'retirada'
}

// Puntos Movi
type PuntoMovi = {
  nombre: string
  tipo: 'gimnasio_aire_libre' | 'calistenia' | 'biosaludable' | 'camino'
      | 'zona_perros' | 'pista_libre' | 'plaza' | 'instalacion_municipal' | 'local_asociado'
  puntoExacto: string                    // «junto al cartel de las máquinas»
  foto: string
  etiquetas: ('maquinas' | 'mayores' | 'perros' | 'carrito' | 'ruta' | 'ninos')[]
  equipamiento: string[]                 // lo usa el motor de entrenamiento
}

// Ayuntamiento: bono de bienvenida en compañía
type BonoBienvenida = {
  instalacion: string                    // polideportivo municipal
  sesiones: 5
  usadas: 0 | 1 | 2 | 3 | 4 | 5          // la tarjeta perforada
  titulares: [string, string]            // las dos personas
  acceso: 'qr_tornos' | 'qr_personal'
}

// La primera vez
type PrimeraVez = {
  formato: 'pareja' | 'grupo_pequeno' | 'clase_local' | 'instalacion_municipal'
  lugar: PuntoMovi
  franja: 'diurna'
  fichaEntrenoId: string                 // la ficha que las dos ven antes
  avisoInicio: boolean
  avisoFin: boolean
  ubicacionEnDirecto?: boolean           // 1 hora, el día de la quedada
  videollamadaPrevia: boolean
}

// Chat: solo a partir de una quedada aceptada
type Chat = {
  abiertoDesde: 'quedada_aceptada'
  mensajes: (
    | { tipo: 'texto'; texto: string }
    | { tipo: 'rapido'; clave: 'llego_5' | 'estoy_aqui' | 'nos_vemos' | 'otro_dia' }   // «¿Otro día?» abre la tarjeta de otra hora
    | { tipo: 'audio'; grabacion: Grabacion }
    | { tipo: 'tarjeta_quedada'; dia: string; hora: string; puntoId: string; estado: 'propuesta' | 'aceptada' | 'otra_hora' }
  )[]
  estado: 'activo' | 'archivado'         // se archiva si no hay sí mutuo
}

// Valoraciones: tres capas separadas
type Valoracion = {
  respuesta: 'repetiria' | 'otra_persona' | 'no_era_lo_mio'   // privada
  compatibilidad?: 1 | 2 | 3 | 4 | 5                          // privada, solo emparejamiento
  sellos?: ('puntual' | 'buena_conversacion' | 'me_motivo' | 'paciencia' | 'buen_humor' | 'me_enseno')[]
}

type Reputacion = {                      // lo único público
  verificada: boolean
  sesionesHechas: number
  personasQueRepiten: number
  sellos: { sello: string; veces: number }[]
}

type Aviso = { categoria: 'no_aparecio' | 'comportamiento' | 'seguridad' | 'otro'; texto?: string }   // solo lo ve el equipo
```

---

## Reglas duras

1. **R1 —** La primera vez es siempre de día y en un punto Movi, un local asociado o una instalación municipal. Quedar en pareja exige que las dos personas estén verificadas; en grupo con anfitrión, en una clase o en una instalación municipal, la verificación es opcional. En la primera vez, los planes terminan antes de anochecer: el selector de horas llega hasta la puesta de sol y el atajo NOCHE no aparece hasta después de la primera sesión.
2. **R2 —** Una pareja mixta, la primera vez, solo si las dos lo han marcado.
3. **R3 —** El formato de la primera vez lo elige la persona: pareja (por defecto), grupo pequeño, clase o instalación municipal.
4. **R4 —** Antes de la primera vez suena el saludo de la otra persona, si lo tiene.
5. **R5 —** La videollamada previa es opcional, en directo y no se graba.
6. **R6 —** El teléfono y el correo no se comparten. El chat avisa si alguien intenta escribirlos.
7. **R7 —** Bloquear y avisar de un problema están a un toque en cualquier pantalla con otra persona.
8. **R8 —** Repetir requiere un sí de las dos personas. Un «no» nunca se comunica.
9. **R9 —** Tras tres «no era lo mío» seguidos, se propone otro formato.
10. **R10 —** La numerología, si aparece, lleva la etiqueta «sin base científica» y nunca entra en el emparejamiento.
11. **R11 —** Ningún porcentaje de compatibilidad salvo el calculado de señales reales.
12. **R12 —** El saludo dura como máximo 20 s, se puede escuchar, recortar, borrar y regrabar, se puede denunciar, y tiene alternativa en texto.
13. **R13 —** A quien está solo, primero se le ofrece lo gratis: puntos Movi e instalaciones municipales.
14. **R14 —** La clase en compañía es para dos: Movi empareja antes de reservar.
15. **R15 —** Se puede ver quién entrena cerca sin registrarse: iniciales, nivel, hora y sitio aproximado. Nunca el sitio exacto ni la cara. Antes de apuntarte, del punto Movi solo se ve el nombre, el tipo y los minutos andando; el punto exacto y su foto se ven al apuntarte.
16. **R16 —** Antes de quedar hay 2 pasos obligatorios, la cuenta y el nivel, y un tercero, la verificación, solo para quedar en pareja (en grupo es opcional). La zona sale de la ubicación y se cambia desde la cabecera de Cerca. El selfie no lo ve ninguna otra persona: lo revisa el equipo para confirmar que es una persona real y se borra después. Fuera solo se ve «Verificada». Es obligatoria para quedar en pareja porque sin ella el filtro «solo mujeres» no protege.
17. **R17 —** Después de cada sesión se hace una sola pregunta de la ficha, como mucho.
18. **R18 —** El chat solo se abre cuando las dos personas aceptan una quedada, y se archiva si no hay un sí mutuo.
19. **R19 —** La ficha del entreno se ve antes de quedar, con vídeo corto por ejercicio y la variante de cada persona.
20. **R20 —** Nada negativo es público: ni medias, ni estrellas, ni comentarios. Los sellos son solo positivos y se publican cuando las dos personas han valorado, o a las 48 h.
21. **R21 —** Cada punto Movi tiene su punto exacto de encuentro, una foto y etiquetas, y el entreno usa su equipamiento.
22. **R22 —** El bono municipal es para dos personas que entran juntas: 5 sesiones en franjas de poca demanda, con la tarjeta perforada como pase.
23. **R23 —** La primera pantalla al abrir la app muestra planes concretos (hoy, mañana, esta semana), nunca un formulario ni un tutorial.
24. **R24 —** Si no hay planes cerca esta semana, se ofrece crear uno en un punto Movi o unirse a una sesión municipal gratuita, nunca una pantalla vacía.
25. **R25 —** Cada paso del registro y de la ficha se responde con una tecla o una rueda, con su sonido y su respuesta inmediata; ningún campo de texto salvo el correo, si no se entra con Google o Apple.
26. **R26 —** Ninguna persona ve la cara de otra antes de conocerse. Se reconocen con la señal de encuentro: cuando las dos pulsan «Estoy aquí», los dos móviles encienden el mismo patrón en el anillo de 40 luces y suena el mismo acorde, con la pista opcional que deja cada una («Llevo un carrito azul»). Ver `C · Señal de encuentro` en `specs/foundations/instrumento.md`.

---

## Criterios de aceptación

- [ ] **C1 —** Se puede llegar a «Cerca» y ver sesiones sin crear cuenta.
- [ ] **C2 —** «Me apunto» lleva a un registro de menos de 60 segundos: cuenta con un toque, nivel y, si es en pareja, verificación. Ninguna pantalla pide el teléfono. En planes de grupo el selfie se puede saltar («Ahora no»).
- [ ] **C3 —** Después de cada sesión hay como mucho una pregunta de la ficha; la ficha completa también se puede hacer desde «Yo».
- [ ] **C4 —** La propuesta de primera vez muestra el saludo, el formato, el nombre y el tipo del punto Movi con los minutos andando, la hora y la ficha del entreno. El punto exacto y su foto aparecen al apuntarte, en «Estás dentro».
- [ ] **C5 —** No existe ningún camino que proponga una primera vez de noche, sin verificar o fuera de un lugar seguro.
- [ ] **C6 —** El chat tiene tarjeta de quedada, respuestas rápidas y audio opcional, y no existe antes de aceptar.
- [ ] **C7 —** Después de entrenar: tres respuestas privadas, la compatibilidad opcional y los sellos. Nunca se revela nada de la otra persona.
- [ ] **C8 —** El perfil público solo muestra verificación, sesiones, personas que repiten y sellos.
- [ ] **C9 —** La tarjeta perforada del bono muestra a las dos personas, las 5 sesiones y el QR.
- [ ] **C10 —** Desde que se abre la app hasta apuntarse a un plan hay menos de 2 minutos y como mucho 4 pantallas con decisiones.
- [ ] **C11 —** Se mide el tiempo hasta la primera inscripción y el porcentaje de quienes se apuntan a algo en su primera visita.

---

## Fuera de alcance

- **Verificación con documento de identidad.** Para el piloto basta con la foto verificada.
- **Reconocimiento facial automático.** El selfie solo lo ve el equipo, que lo revisa a mano y lo borra después.
- **SMS.** Los avisos llegan por notificación o por correo; el SMS queda opcional y para más adelante.
- **Integración con los tornos municipales.** En el piloto, el personal comprueba el QR en pantalla. La integración con Deporsite depende del convenio.
- **Pagos dentro de la app.**
- **Grabar vídeos con IA para explicar ejercicios.** La técnica necesita vídeo real.

---

## Trazabilidad

- **Diseño:**
  - `AppM · Cerca` (sin registro)
  - `AppM · Registro` (3 pasos)
  - `AppM · Primera vez`
  - `AppM · Ficha del entreno`
  - `AppM · Chat de quedada`
  - `AppM · Después de entrenar`
  - `AppM · Tarjeta perforada`
  - `AppM · Mensaje a Ana`
  - Referencias: `design/instrumento/referencia/grabadora.dc.html`, `design/instrumento/referencia/primera-interaccion.dc.html` y `design/instrumento/referencia/ejercicio-en-luces.dc.html`, `design/instrumento/referencia/onda-o-puntos.html` y `design/instrumento/referencia/perfil-exploracion.html`
- **Specs relacionadas:**
  - `specs/foundations/instrumento.md` (C · Grabadora)
  - `specs/foundations/producto.md`
  - `specs/workout-engine.md` (equipamiento del punto)
  - `specs/program/spec.md` (rama `feat/programa`)
- **Fuentes:**
  - Ayuntamiento de Las Rozas: Carta de Servicios de Deportes, Normativa del Bonodeporte, notas de prensa de las zonas de calistenia (2023) y del gimnasio al aire libre (2025).
  - Comunidad de Madrid: parques biosaludables.
  - Apps: MuscleWiki API, Hyperhuman, Nike Training Club, consejos de seguridad de Wallapop, Uber (valoraciones e insignias).
  - Investigación: Fradkin, Grewal y Holtz (Airbnb); TIPI de Gosling; metaanálisis del efecto de la edad relativa (Sports Medicine, 2018).
