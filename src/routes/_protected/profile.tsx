import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/profile')({
  component: Profile,
})

function Profile() {
  const { user } = Route.useRouteContext()

  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 p-5">
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  )
}
