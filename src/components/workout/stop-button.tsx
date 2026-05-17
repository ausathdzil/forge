import { useRouter } from '@tanstack/react-router'
import { PauseIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { stopWorkoutSession } from '#/functions/workout.functions'

import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

interface StopButtonProps {
  userId: string
  publicId: string
  isActive: boolean
}

export function StopButton({ userId, publicId, isActive }: StopButtonProps) {
  const [isPending, startTransition] = useTransition()
  const { invalidate } = useRouter()

  const handleStartSession = () => {
    startTransition(async () => {
      try {
        await stopWorkoutSession({ data: { userId, publicId } })
        void invalidate()
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.')
      }
    })
  }

  return (
    <Button
      onClick={handleStartSession}
      disabled={isPending || !isActive}
      className="w-fit"
      size="lg"
      variant="destructive"
    >
      {isPending ? <Spinner /> : <PauseIcon />}
      Stop Session
    </Button>
  )
}
