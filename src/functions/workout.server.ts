import { and, desc, eq } from 'drizzle-orm'

import { db } from '#/db'
import { workout } from '#/db/schema'

export async function createWorkout(title: string, userId: string) {
  const [activeWorkout] = await db
    .select()
    .from(workout)
    .where(and(eq(workout.userId, userId), eq(workout.isActive, true)))
    .limit(1)

  if (activeWorkout) {
    await db
      .update(workout)
      .set({
        isActive: false,
        finishedAt: new Date(),
      })
      .where(and(eq(workout.id, activeWorkout.id), eq(workout.userId, userId)))
  }

  const [newWorkout] = await db
    .insert(workout)
    .values({
      title,
      userId,
    })
    .returning()

  return newWorkout
}

export async function findWorkoutByPublicId(publicId: string) {
  const [workoutData] = await db
    .select()
    .from(workout)
    .where(eq(workout.publicId, publicId))
    .limit(1)

  return workoutData
}

export async function getWorkouts(userId: string, limit = 10) {
  return await db
    .select()
    .from(workout)
    .where(eq(workout.userId, userId))
    .orderBy(desc(workout.createdAt))
    .limit(limit)
}
