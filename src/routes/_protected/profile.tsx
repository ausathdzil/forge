import { createFileRoute } from '@tanstack/react-router'

import { Header } from '#/components/header'

export const Route = createFileRoute('/_protected/profile')({
  component: Profile,
})

function Profile() {
  const { user } = Route.useRouteContext()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto grid w-full max-w-5xl flex-1 p-5">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </main>
    </div>
  )
}
