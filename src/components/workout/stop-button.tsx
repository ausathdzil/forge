import { useRouter } from '@tanstack/react-router'
import { PauseIcon } from 'lucide-react'
import { useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleStartSession = async () => {
    try {
      setIsLoading(true)
      await stopWorkoutSession({ data: { userId, publicId } })
      void router.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleStartSession}
      disabled={isLoading || !isActive}
      className="w-fit"
      size="lg"
      variant="destructive"
    >
      {isLoading ? <Spinner /> : <PauseIcon />}
      Stop Session
    </Button>
  )
}
