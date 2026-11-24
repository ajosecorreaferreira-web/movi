# workout-engine.md — Motor de entrenamiento de Movi

**Versión:** 1.1
**Fecha:** Agosto 2026 · **Cambios 1.1 (24 nov 2026):** en pareja y en grupo se entrena a la vez, nunca por turnos. Desaparece el rol alterno («uno trabaja, el otro cuenta»).
**Origen:** Auditoría de las 30 pantallas de Paper + benchmark de mercado
**Estado:** Propuesta aprobada para diseño; sustituye la arquitectura actual del flujo Categorías → Lista → Filtros → Detalle

Entregables asociados:
- Informe completo: https://claude.ai/code/artifact/a01d627a-71e1-4bb9-b8de-5549f8932b13
- Canvas de pantallas: https://claude.ai/code/artifact/11253719-9297-4141-9a71-89c5c05a053d

---

## El principio

**Un contenido, cinco audiencias.**

La escalabilidad no viene de tener más categorías. Viene de que el mismo esqueleto de entrenamiento se exprese distinto según quién lo abra. Una madre a los 4 meses postparto y un atleta de Hyrox hacen *el mismo entrenamiento* con distinta demanda y distinta variante.

**Movi no tiene un catálogo. Tiene un generador contextual.**
El usuario no elige de una lista: la app propone uno y él lo ajusta. La lista existe como salida de emergencia, no como camino principal.

De 6 pasos (nivel → categoría → lista → filtros → detalle → ejecución) a 3: **contexto → propuesta → ejecución**.

---

## Lo que se elimina

| Se elimina | Por qué |
|---|---|
| Rejilla de 8 categorías como eje principal | Mezcla formato, capacidad, disciplina y entorno. No tiene sitio para caminar, silla ni movilidad — deja fuera a la usuaria principal |
| «Nivel 2» numérico en sesiones y ejercicios | Tercera notación de nivel; el nivel de un ejercicio no significa nada |
| Los 5 puntitos de las cards | Cuarta notación de nivel |
| «Intensidad: Moderado» | Escala paralela redundante con demanda |
| Panel de filtros de 5 facetas | 1.440 combinaciones para un catálogo de 4 entrenamientos |
| Tabs de fase en el detalle | Duplican el acordeón de la misma pantalla |
| Emoji como sistema de iconos | Rendering inconsistente en Android, sin etiqueta accesible, no escala con el texto |
| El doble tap para fullscreen | Sin affordance, colisiona con el zoom del sistema |
| La racha como métrica principal | Se rompe la primera noche mala; el día que se rompe es el día del abandono |

---

## Modelo de datos

### Ejes de contenido — qué es el entrenamiento

```ts
type Entrenamiento = {
  intencion: 'moverme' | 'fuerza' | 'resistencia' | 'movilidad' | 'tecnica'
  modalidad: 'caminata' | 'carrera' | 'funcional' | 'hiit' | 'fuerza'
            | 'yoga' | 'pilates' | 'natacion' | 'hibrido' | 'silla'
  demanda: 1 | 2 | 3 | 4 | 5          // Activo · En marcha · En forma · Potencia · Élite
  entorno: 'calle' | 'parque_barras' | 'parque_libre'
         | 'gimnasio' | 'piscina' | 'casa' | 'silla'
  formatoSocial: 'solo' | 'pareja' | 'grupo'
  duracion: 10 | 20 | 30 | 45
  adaptaciones: Adaptacion[]
  fases: Fase[]
}

type Adaptacion =
  | 'postparto' | 'movilidad_reducida' | 'rodilla' | 'espalda'
  | 'embarazo' | 'con_carrito' | 'con_perro' | 'con_ninos'
```

**`intencion`** es el eje principal de navegación. Cinco valores, estables, entendibles por cualquiera.
**`modalidad`** es etiqueta descriptiva, no carpeta. Aquí entran `caminata` y `silla`, que hoy no existen en ningún sitio.
**`formatoSocial`** es eje de primera clase, no filtro: determina la *estructura* del entrenamiento.

### Ejes de ejecución — cómo se hace

```ts
type Fase = {
  tipo: 'calentamiento' | 'circuito' | 'finisher' | 'enfriamiento'
  orden: number
  vueltas: number
  bloques: Bloque[]
}

type Movimiento = {
  nombre: string
  medida: { tipo: 'reps' | 'tiempo', valor: number, porLado?: boolean }

  // Sustituye a «Nivel 1/2/3» por ejercicio
  variantes: {
    regresion: VarianteDetalle
    estandar:  VarianteDetalle
    progresion: VarianteDetalle
  }

  // Cuatro piezas de guía. Hoy solo existe el clip.
  guia: {
    clip: string          // vídeo corto en bucle
    audio: string         // la línea que dice la voz
    clave: string         // «rodilla detrás de la punta del pie»
    errorTipico: string   // «la rodilla se va hacia dentro»
  }

  // Cómo se hace en pareja o en grupo. Sin este campo no hay ejercicios en pareja
  enPareja?: 'a_la_vez' | 'cooperativo'
  // a_la_vez:    todos hacen el mismo movimiento al mismo tiempo, cada uno con su variante
  // cooperativo: el movimiento necesita a los dos (pasarse el balón, plancha chocando manos,
  //              sentadilla espalda con espalda) o tiene un objetivo común (100 reps entre los dos)
}
```

> **Regla dura:** en pareja y en grupo se entrena **a la vez**. Nadie espera, nadie mira y nadie cuenta mientras el otro trabaja: nada de turnos. Cada persona hace su variante (`regresion` · `estandar` · `progresion`) al mismo ritmo; así dos niveles distintos entrenan juntos.
>
> Todo entrenamiento con `formatoSocial: 'pareja'` lleva al menos un bloque `cooperativo`, normalmente el finisher. Si no, no es un entrenamiento en pareja: son dos personas entrenando en paralelo.

---

## Navegación global

Bottom nav de 4 destinos, 64 px + `safe-area-inset-bottom`.

| Destino | Contiene | Estado |
|---|---|---|
| **Cerca** | Mapa y lista de sesiones | Ya existe, bien resuelto |
| **Entrenar** | Propuesta de hoy · mis entrenamientos · explorar | Nuevo — el motor sale del formulario |
| **Mi gente** | Personas, programas activos, quedadas | Nuevo — la tesis del producto, hecha destino |
| **Yo** | Nivel, progreso, medallas, adaptaciones activas | Nuevo |

`Crear sesión` **consume** el motor. No lo contiene.

---

## Modos de ejecución

Cuatro modos, misma estructura de datos. El modo se elige por contexto, no por menú.

| Modo | Cuándo | Cómo es |
|---|---|---|
| **Voz** | Exterior, por defecto | Número enorme, la voz cuenta y anuncia, haptic al cambiar. Se entrena con el móvil en el bolsillo |
| **Tarjeta** | Móvil apoyado | Clip en bucle + reps + clave de ejecución + error típico + siguiente movimiento |
| **Acompañado** | 2+ personas | A la vez: mismo ejercicio y mismo anillo de tiempo para todos, con la variante de cada persona a la vista («Tú · con banco», «Ana · sin banco»). La pista de ritmo es poder hablar mientras se entrena. Finisher cooperativo |
| **Asistido** | Nivel Activo y mayores | Un movimiento por pantalla, título 32 px, instrucción 20 px, botón 68 px. Sin cronómetro, sin puntos, sin racha |

El modo asistido no es accesibilidad: es un modo de producto.

---

## Adaptaciones por perfil

Modificadores sobre el mismo contenido. Se activan desde «Yo» y persisten.

- **Postparto (0–6 meses)** — bloquea impacto y abdominal directo, añade suelo pélvico, progresa por semanas desde el parto, permite pausar y reanudar sin romper nada.
- **Con carrito · con perro · con niños** — filtra por entorno y añade movimientos que *usan* el carrito o el perro, en vez de tratarlos como obstáculo.
- **Mayor · movilidad reducida** — variantes en silla o con apoyo, sin suelo, sin saltos, texto grande por defecto. Lenguaje sin juicio: «con apoyo», nunca «versión fácil».
- **Adolescente** — progresión de fuerza visible, pero sin composición corporal, sin calorías, sin comparativa de cuerpo. Línea roja de seguridad.
- **Élite · Hyrox · CrossFit** — entrada directa al «entrenamiento del día» de su nivel y zona, con registro de tiempos y cargas. No pasa por el catálogo.

---

## Gamificación

Cambia el eje: de asistencia a **relación**.

- Métrica principal: **personas con las que has entrenado** y **veces con la misma persona**
- La celebración grande es «3ª vez con Ana» y «has traído a alguien nuevo», no «7 días»
- «Racha» → **constancia flexible**: «3 de las últimas 4 semanas»
- Todo el sistema de puntos, desactivable desde «Yo» sin perder funcionalidad

**Base de evidencia:** las recompensas refuerzan la motivación intrínseca (*crowding-in*) cuando son voluntarias y satisfacen la necesidad de relación. Y un meta-análisis de *Nature Human Behaviour* (2026, n≈31.600) muestra que entrenar en grupo **no** supera a entrenar solo en actividad física (g=0,086, ns) — salvo en «true groups» con membresía estable, identidad compartida e interdependencia. La pertenencia es el mecanismo, no la co-presencia.

---

## Contenido del MVP

**12 entrenamientos**, no 100.

Matriz mínima: 3 niveles de demanda × 2 entornos × 2 duraciones. Cada uno con las 3 variantes por movimiento. **Al menos 4 con `formatoSocial: 'pareja'`.**

Esto sirve a los cinco perfiles mejor que 100 entrenamientos sin variantes, y elimina la necesidad del panel de filtros por completo.

---

## Reglas para el equipo (y para los agentes)

1. Ninguna pantalla nueva sin bottom nav, salvo las pushed (detalle, ejecución, celebración).
2. Una sola notación de nivel: los 5 nombres. Nunca números, nunca puntos.
3. Los ejercicios llevan variante, no nivel.
4. Ningún icono es emoji. Lucide, `strokeWidth 1.5`, `currentColor`, con etiqueta.
5. Ningún control de navegación se identifica solo por icono.
6. Toda propuesta de IA lleva tres cosas: una razón en una línea, un botón «cambiar» que no rompe el flujo, y un «no me convence» que alimenta la siguiente.
7. Todo elemento interactivo: mínimo 44×44.
8. Nunca se pinta la barra de estado del sistema.
