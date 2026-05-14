import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { GetWorkoutHistorySchema, GetWorkoutSchema, StartWorkoutSchema } from './schemas'
import {
  createWorkout,
  findWorkoutByPublicId,
  getWorkouts,
  updateWorkoutStatus,
} from './workout.server'

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
      setResponseStatus(403)
      throw new Error('Forbidden')
    }

    return workout
  })

export const getWorkoutHistory = createServerFn({ method: 'GET' })
  .inputValidator(GetWorkoutHistorySchema)
  .handler(async ({ data }) => {
    const workouts = await getWorkouts(data.userId, data.limit)
    return workouts
  })

export const stopWorkoutSession = createServerFn({ method: 'POST' })
  .inputValidator(GetWorkoutSchema)
  .handler(async ({ data }) => {
    const workout = await getWorkoutByPublicId({
      data: { publicId: data.publicId, userId: data.userId },
    })

    if (!workout.isActive) {
      setResponseStatus(400)
      throw new Error('Workout is already stopped')
    }

    const stoppedWorkout = await updateWorkoutStatus(data.userId, data.publicId)

    return stoppedWorkout
  })
