import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { signOut } from '#/lib/auth-client'

import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Spinner } from '../ui/spinner'

export function SignOutButton() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await signOut({
      fetchOptions: {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          void navigate({ to: '/sign-in' })
        },
        onError: () => {
          setIsLoading(false)
        },
      },
    })

    if (error) {
      toast.error(error.message || 'An unexpected error occurred.')
    }
  }

  return (
    <DropdownMenuItem
      closeOnClick={false}
      disabled={isLoading}
      variant="destructive"
      onClick={handleSignOut}
    >
      Sign Out
      {isLoading ? <Spinner className="ml-auto" /> : <LogOutIcon className="ml-auto" />}
    </DropdownMenuItem>
  )
}
