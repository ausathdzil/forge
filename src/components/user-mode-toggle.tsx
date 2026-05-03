import { ComputerIcon, MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '#/components/theme-provider'
import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '#/components/ui/dropdown-menu'

export function UserModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-32">
        <DropdownMenuItem closeOnClick={false} onClick={() => setTheme('light')}>
          Light
          <SunIcon className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem closeOnClick={false} onClick={() => setTheme('dark')}>
          Dark
          <MoonIcon className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem closeOnClick={false} onClick={() => setTheme('system')}>
          System
          <ComputerIcon className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
