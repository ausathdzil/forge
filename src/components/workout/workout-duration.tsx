import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

import { formatHhMmSs } from '#lib/workout/utils'

interface WorkoutDurationProps {
  startedAt: Date | string
  finishedAt: Date | string | null
}

export function WorkoutDuration({ startedAt, finishedAt }: WorkoutDurationProps) {
  const startedAtTime = new Date(startedAt).getTime()
  const finishedAtTime = finishedAt ? new Date(finishedAt).getTime() : null
  const [now, setNow] = useState(() => new Date(finishedAtTime ?? Date.now()))

  useEffect(() => {
    if (finishedAtTime) return

    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(id)
  }, [finishedAtTime])

  const currentDuration = Math.max(0, differenceInSeconds(finishedAtTime ?? now, startedAtTime))

  return <span className="tabular-nums">{formatHhMmSs(currentDuration)}</span>
}
