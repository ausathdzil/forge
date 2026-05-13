import { differenceInSeconds } from 'date-fns'
import { useEffect, useState } from 'react'

import { formatHhMmSs } from '#lib/workout/utils'

import { Large } from '../typography'

interface WorkoutDurationProps {
  startedAt: Date | string
  finishedAt: Date | string | null
}

export function WorkoutDuration({ startedAt, finishedAt }: WorkoutDurationProps) {
  const startedAtTime = new Date(startedAt).getTime()
  const finishedAtTime = finishedAt ? new Date(finishedAt).getTime() : null
  const [now, setNow] = useState(() => new Date(finishedAtTime ?? startedAtTime))

  useEffect(() => {
    if (finishedAtTime) return

    setNow(new Date())

    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(id)
  }, [finishedAtTime])

  const currentDuration = Math.max(0, differenceInSeconds(finishedAtTime ?? now, startedAtTime))

  return (
    <Large>
      <span className="font-normal text-muted-foreground">Duration:</span>{' '}
      <span suppressHydrationWarning>{formatHhMmSs(currentDuration)}</span>
    </Large>
  )
}
