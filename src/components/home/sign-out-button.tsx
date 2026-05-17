import { useNavigate } from '@tanstack/react-router'
import { LogOutIcon } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { signOut } from '#lib/auth-client'

import { DropdownMenuItem } from '../ui/dropdown-menu'
import { Spinner } from '../ui/spinner'

export function SignOutButton() {
  const [isPending, startTransition] = useTransition()
  const navigate = useNavigate()

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            void navigate({ to: '/sign-in' })
          },
          onError: (ctx) => {
            toast.error(ctx.error.message || 'An unexpected error occurred.')
          },
        },
      })
    })
  }

  return (
    <DropdownMenuItem
      closeOnClick={false}
      disabled={isPending}
      variant="destructive"
      onClick={handleSignOut}
    >
      Sign Out
      {isPending ? <Spinner className="ml-auto" /> : <LogOutIcon className="ml-auto" />}
    </DropdownMenuItem>
  )
}
