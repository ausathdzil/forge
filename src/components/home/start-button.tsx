import { useNavigate, useRouter } from '@tanstack/react-router'
import { PlayIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { startWorkoutSession } from '#/functions/workout.functions'

import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export function StartButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition()
  const { invalidate } = useRouter()
  const navigate = useNavigate()

  const handleStartSession = () => {
    startTransition(async () => {
      try {
        const workout = await startWorkoutSession({ data: { userId, title: 'Workout name' } })
        void invalidate()
        void navigate({ to: '/workout/$publicId', params: { publicId: workout.publicId } })
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.')
      }
    })
  }

  return (
    <Button
      onClick={handleStartSession}
      disabled={isPending}
      className="w-fit self-center"
      size="lg"
    >
      {isPending ? <Spinner /> : <PlayIcon />}
      Start Session
    </Button>
  )
}
