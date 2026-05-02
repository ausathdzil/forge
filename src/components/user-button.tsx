import { Link } from '@tanstack/react-router'

import { useSession } from '#/lib/auth-client'

import { ModeToggle } from './mode-toggle'
import { Button } from './ui/button'
import { UserDropdown } from './user-dropdown'

export function UserButton() {
  const { data: session } = useSession()

  return session ? (
    <UserDropdown user={session.user} />
  ) : (
    <div className="ml-auto hidden items-center gap-4 sm:flex">
      <Button render={<Link to="/sign-in" />} nativeButton={false} variant="secondary">
        Sign In
      </Button>
      <Button render={<Link to="/sign-up" />} nativeButton={false}>
        Get Started
      </Button>
      <ModeToggle />
    </div>
  )
}
