import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { ensureSession } from '#lib/auth.functions'

import { GetWorkoutHistorySchema, GetWorkoutSchema, StartWorkoutSchema } from './schemas'
import { createWorkout, findWorkoutByPublicId, getWorkouts } from './workout.server'

export const startWorkoutSession = createServerFn({ method: 'POST' })
  .inputValidator(StartWorkoutSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const workout = await createWorkout(data.title, session.user.id)

    setResponseStatus(201)

    return workout
  })

export const getWorkoutByPublicId = createServerFn({ method: 'GET' })
  .inputValidator(GetWorkoutSchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const workout = await findWorkoutByPublicId(data.publicId)

    if (!workout) {
      throw notFound()
    }

    if (workout.userId !== session.user.id) {
      throw new Error('Unauthorized')
    }

    return workout
  })

export const getWorkoutHistory = createServerFn({ method: 'GET' })
  .inputValidator(GetWorkoutHistorySchema)
  .handler(async ({ data }) => {
    const session = await ensureSession()
    const workouts = await getWorkouts(session.user.id, data.limit)

    return workouts
  })
