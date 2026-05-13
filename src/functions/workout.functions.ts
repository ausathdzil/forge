import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { GetWorkoutHistorySchema, GetWorkoutSchema, StartWorkoutSchema } from './schemas'
import { createWorkout, findWorkoutByPublicId, getWorkouts } from './workout.server'

export const startWorkoutSession = createServerFn({ method: 'POST' })
  .inputValidator(StartWorkoutSchema)
  .handler(async ({ data }) => {
    const workout = await createWorkout(data.userId, data.title)
    setResponseStatus(201)
    return workout
  })

export const getWorkoutByPublicId = createServerFn({ method: 'GET' })
  .inputValidator(GetWorkoutSchema)
  .handler(async ({ data }) => {
    const workout = await findWorkoutByPublicId(data.publicId)

    if (!workout) {
      throw notFound()
    }

    if (workout.userId !== data.userId) {
      throw new Error('Unauthorized')
    }

    return workout
  })

export const getWorkoutHistory = createServerFn({ method: 'GET' })
  .inputValidator(GetWorkoutHistorySchema)
  .handler(async ({ data }) => {
    const workouts = await getWorkouts(data.userId, data.limit)
    return workouts
  })
