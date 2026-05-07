import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { AnvilIcon } from 'lucide-react'

import { Button } from '#components/ui/button'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Button render={<Link to="/" />} nativeButton={false} size="sm" variant="ghost">
            <AnvilIcon />
            Forge
          </Button>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Outlet />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block" />
    </main>
  )
}
