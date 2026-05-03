import { Link, useNavigate } from '@tanstack/react-router'
import { HomeIcon, LogOutIcon, UserCircle2Icon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import type { User } from '#/lib/auth-client'
import { signOut } from '#/lib/auth-client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Spinner } from './ui/spinner'
import { UserModeToggle } from './user-mode-toggle'

export function UserDropdown({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Menu" title="Menu" className="ml-auto">
        <Avatar>
          <AvatarImage src={user.image ?? undefined} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar>
                <AvatarImage alt={user.name} src={user.image ?? undefined} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium text-primary-foreground">{user.name}</span>
                <span className="truncate text-xs text-primary-foreground">{user.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link to="/" />}>
            Profile
            <UserCircle2Icon className="ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link to="/" />}>
            Home
            <HomeIcon className="ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UserModeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            closeOnClick={false}
            disabled={isLoading}
            variant="destructive"
            onClick={async () => {
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
            }}
          >
            Sign Out
            {isLoading ? <Spinner className="ml-auto" /> : <LogOutIcon className="ml-auto" />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
