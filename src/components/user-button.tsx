import { Link } from '@tanstack/react-router'

import { useSession } from '#/lib/auth-client'

import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'
import { UserDropdown } from './user-dropdown'

export function UserButton() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <Skeleton className="ml-auto h-8 w-60 rounded-full" />
  }

  return (
    <div className="ml-auto flex items-center gap-4">
      {session ? (
        <>
          <p className="text-sm font-medium">👋 Hey, {session.user.name}!</p>
          <UserDropdown user={session.user} />
        </>
      ) : (
        <>
          <Button
            className="hidden sm:block"
            render={<Link to="/sign-in" />}
            nativeButton={false}
            variant="secondary"
          >
            Sign In
          </Button>
          <Button render={<Link to="/sign-up" />} nativeButton={false}>
            Get Started
          </Button>
          <ModeToggle />
        </>
      )}
    </div>
  )
}
