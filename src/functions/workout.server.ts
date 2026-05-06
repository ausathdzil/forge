import { and, eq } from 'drizzle-orm'

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
