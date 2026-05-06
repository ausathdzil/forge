import { createFileRoute } from '@tanstack/react-router'

import { getWorkoutByPublicId } from '#/functions/workout.functions'

export const Route = createFileRoute('/_protected/workout/$publicId')({
  loader: async ({ params }) => {
    const workout = await getWorkoutByPublicId({ data: { publicId: params.publicId } })
    return { workout }
  },
  component: Workout,
})

function Workout() {
  return <div>Hello "/_protected/workout/$id"!</div>
}
