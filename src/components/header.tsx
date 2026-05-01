import { Link } from '@tanstack/react-router'
import { AnvilIcon } from 'lucide-react'

import { Button } from './ui/button'

export function Header() {
  return (
    <header className="pt-safe-top sticky top-0 z-10 bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center p-4 sm:gap-4">
        <Button variant="ghost" render={<Link to="/" />} nativeButton={false}>
          <AnvilIcon />
          Forge
        </Button>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          <Button render={<Link to="/sign-in" />} nativeButton={false}>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  )
}
