export interface Exercise {
  name: string
  reps: number | null
  duration: string | null
}

export interface WorkoutBlock {
  id: string
  name: string
  emoji: string
  rounds: number
  exercises: Exercise[]
}

export const MOCK_WORKOUT_BLOCKS: WorkoutBlock[] = [
  {
    id: 'warmup',
    name: 'Calentamiento',
    emoji: '🔥',
    rounds: 2,
    exercises: [
      { name: 'Zancada de runner', reps: 12, duration: null },
      { name: 'Perro boca abajo', reps: 10, duration: null },
      { name: 'Flexión de judo', reps: 8, duration: null },
    ],
  },
  {
    id: 'circuit1',
    name: 'Circuito 1',
    emoji: '⚡',
    rounds: 3,
    exercises: [
      { name: 'Salto al cajón', reps: 10, duration: null },
      { name: 'Sentadilla con salto 180°', reps: 10, duration: null },
      { name: 'Sentadilla a una pierna izq', reps: 10, duration: null },
      { name: 'Sentadilla a una pierna der', reps: 10, duration: null },
    ],
  },
  {
    id: 'circuit2',
    name: 'Circuito 2',
    emoji: '⚡',
    rounds: 3,
    exercises: [
      { name: 'Flexiones diamante', reps: 8, duration: null },
      { name: 'Remo con mancuerna', reps: 12, duration: null },
      { name: 'Press militar', reps: 10, duration: null },
    ],
  },
  {
    id: 'finisher',
    name: 'Finisher',
    emoji: '🏁',
    rounds: 1,
    exercises: [
      { name: 'Burpees', reps: 10, duration: null },
      { name: 'Mountain climbers', reps: 20, duration: null },
    ],
  },
  {
    id: 'cooldown',
    name: 'Enfriamiento',
    emoji: '🧊',
    rounds: 1,
    exercises: [
      { name: 'Trote suave', reps: null, duration: '3 min' },
      { name: 'Respiración controlada', reps: null, duration: '2 min' },
    ],
  },
]
