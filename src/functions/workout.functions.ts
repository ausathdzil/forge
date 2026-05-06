import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { ensureSession } from '#/lib/auth.functions'

import { StartSessionSchema } from './schemas'
import { createWorkout } from './workout.server'

export const startWorkoutSession = createServerFn({ method: 'POST' })
  .inputValidator(StartSessionSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const workout = await createWorkout(data.title, session.user.id)

    setResponseStatus(201)

    return workout
  })
