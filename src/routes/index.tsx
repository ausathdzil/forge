import { createFileRoute, redirect } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { AnvilIcon } from 'lucide-react'

import { getWorkoutHistory } from '#/functions/workout.functions'
import { Header, HeaderContent } from '#components/header'
import { StartButton } from '#components/home/start-button'
import { UserButton } from '#components/home/user-button'
import { WorkoutHistory } from '#components/home/workout-history'
import { Heading, Subheading } from '#components/typography'
import { Button } from '#components/ui/button'
import { Separator } from '#components/ui/separator'
import { getSession } from '#lib/auth.functions'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const session = await getSession()

    if (!session) {
      throw redirect({ to: '/sign-in' })
    }

    return { user: session.user }
  },
  loader: async () => {
    return await getWorkoutHistory({ data: {} })
  },
  component: Home,
})

function Home() {
  const today = new Date()
  const day = format(today, 'EEEE', { locale: enUS })
  const date = format(today, 'd MMMM', { locale: enUS })

  const workouts = Route.useLoaderData()

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <HeaderContent>
          <Button variant="ghost" render={<Link to="/" />} nativeButton={false}>
            <AnvilIcon />
            Forge
          </Button>
          <UserButton />
        </HeaderContent>
      </Header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 p-5">
        <div className="text-center">
          <Heading>{day}</Heading>
          <Subheading>{date}</Subheading>
        </div>
        <StartButton />
        <Separator />
        <WorkoutHistory workouts={workouts} />
      </main>
    </div>
  )
}
