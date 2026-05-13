import { useNavigate, useRouter } from '@tanstack/react-router'
import { PlayIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { startWorkoutSession } from '#/functions/workout.functions'

import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export function StartButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const navigate = useNavigate()

  const handleStartSession = async () => {
    try {
      setIsLoading(true)
      const workout = await startWorkoutSession({ data: { userId, title: 'Workout name' } })
      void router.invalidate()
      void navigate({ to: '/workout/$publicId', params: { publicId: workout.publicId } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleStartSession}
      disabled={isLoading}
      className="w-fit self-center"
      size="lg"
    >
      {isLoading ? <Spinner /> : <PlayIcon />}
      Start Session
    </Button>
  )
}
