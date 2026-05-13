import { differenceInSeconds } from 'date-fns'
import { useState, useEffect } from 'react'

import { formatHhMmSs } from '#lib/workout/utils'

import { Large } from '../typography'

interface WorkoutDurationProps {
  startedAt: Date | string
  finishedAt: Date | string | null
}

export function WorkoutDuration({ startedAt, finishedAt }: WorkoutDurationProps) {
  const [now, setNow] = useState(() => new Date())
  const startedAtDate = new Date(startedAt)
  const finishedAtDate = finishedAt ? new Date(finishedAt) : null

  useEffect(() => {
    if (finishedAtDate) return

    const intervalId = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [finishedAtDate])

  const currentDuration = Math.max(0, differenceInSeconds(finishedAtDate ?? now, startedAtDate))

  return (
    <Large>
      <span className="font-normal text-muted-foreground">Duration:</span>{' '}
      {formatHhMmSs(currentDuration)}
    </Large>
  )
}
