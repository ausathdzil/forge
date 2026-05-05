import { PlayIcon } from 'lucide-react'

import { Button } from '../ui/button'

/**
 * @todo: function to start a session, opens a dialog or drawer (on mobile) with the session details
 * - name of the session
 */
export function StartButton() {
  return (
    <Button className="w-fit self-center" size="lg">
      <PlayIcon />
      Start Session
    </Button>
  )
}
