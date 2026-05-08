import type { workout } from '#/db/schema'

import { Subheading } from '../typography'

export function WorkoutHistory({ workouts }: { workouts: (typeof workout.$inferSelect)[] }) {
  return (
    <div className="text-center">
      <Subheading>History</Subheading>
      <pre>{JSON.stringify(workouts, null, 2)}</pre>
    </div>
  )
}
