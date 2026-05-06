import { createFileRoute, Link } from '@tanstack/react-router'
import { differenceInSeconds } from 'date-fns'
import { ChevronLeftIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Header, HeaderContent } from '#/components/header'
import { Heading, Large } from '#/components/typography'
import { getWorkoutByPublicId } from '#/functions/workout.functions'

export const Route = createFileRoute('/_protected/workout/$publicId')({
  loader: async ({ params }) => {
    const workout = await getWorkoutByPublicId({ data: { publicId: params.publicId } })
    return { workout }
  },
  component: Workout,
})

function formatHhMmSs(totalSeconds: number) {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

function Workout() {
  const { workout } = Route.useLoaderData()

  const startedAt = new Date(workout.startedAt)
  const finishedAt = workout.finishedAt ? new Date(workout.finishedAt) : null

  const [currentDuration, setCurrentDuration] = useState(() =>
    Math.max(0, differenceInSeconds(finishedAt ?? new Date(), startedAt)),
  )

  useEffect(() => {
    if (finishedAt) return

    const intervalId = setInterval(() => {
      setCurrentDuration(Math.max(0, differenceInSeconds(new Date(), startedAt)))
    }, 1000)

    return () => clearInterval(intervalId)
  }, [finishedAt, startedAt])

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
        <Large className="text-sm text-muted-foreground">
          Duration: {formatHhMmSs(currentDuration)}
        </Large>
      </main>
    </div>
  )
}
