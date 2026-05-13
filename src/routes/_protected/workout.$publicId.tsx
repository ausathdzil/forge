import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeftIcon } from 'lucide-react'

import { getWorkoutByPublicId } from '#/functions/workout.functions'
import { Header, HeaderContent } from '#components/header'
import { Heading } from '#components/typography'
import { WorkoutDuration } from '#components/workout/workout-duration'

export const Route = createFileRoute('/_protected/workout/$publicId')({
  loader: async ({ params, context }) => {
    const workout = await getWorkoutByPublicId({
      data: { userId: context.user.id, publicId: params.publicId },
    })
    return { workout }
  },
  component: Workout,
})

function Workout() {
  const { workout } = Route.useLoaderData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header className="border-b">
        <HeaderContent>
          <Link className="flex min-h-11 items-center gap-1 text-sm font-medium" to="/">
            <ChevronLeftIcon className="size-4" />
            Back
          </Link>
        </HeaderContent>
      </Header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-5">
        <Heading>{workout.title}</Heading>
        <WorkoutDuration startedAt={workout.startedAt} finishedAt={workout.finishedAt} />
        <pre>{JSON.stringify(workout, null, 2)}</pre>
      </main>
    </div>
  )
}
