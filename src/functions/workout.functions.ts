import { notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { setResponseStatus } from '@tanstack/react-start/server'

import { getSession } from '#lib/auth.functions'

import {
  GetWorkoutHistorySchema,
  GetWorkoutSchema,
  StartWorkoutSchema,
  StopWorkoutSchema,
} from './schemas'
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
  .inputValidator(StopWorkoutSchema)
  .handler(async ({ data }) => {
    const session = await getSession()

    if (!session) {
      setResponseStatus(401)
      throw new Error('Unauthorized')
    }

    const workout = await getWorkoutByPublicId({
      data: { publicId: data.publicId, userId: session.user.id },
    })

    if (session.user.id !== workout.userId) {
      setResponseStatus(403)
      throw new Error('Forbidden')
    }

    if (!workout.isActive) {
      setResponseStatus(400)
      throw new Error('Workout is already stopped')
    }

    const stoppedWorkout = await updateWorkoutStatus(session.user.id, data.publicId)

    return stoppedWorkout
  })
