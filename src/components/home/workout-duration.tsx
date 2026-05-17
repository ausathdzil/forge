import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

import { ItemDescription } from '#components/ui/item'
import { formatHhMmSs } from '#lib/workout/utils'

type WorkoutDurationProps = {
  startedAt: Date
  finishedAt: Date
}

export function WorkoutDuration({ startedAt, finishedAt }: WorkoutDurationProps) {
  const [duration, setDuration] = useState<string | null>(null)

  useEffect(() => {
    const seconds = Math.max(0, differenceInSeconds(new Date(finishedAt), new Date(startedAt)))
    setDuration(formatHhMmSs(seconds))
  }, [finishedAt, startedAt])

  return <ItemDescription className="tabular-nums">{duration ?? '—'}</ItemDescription>
}
