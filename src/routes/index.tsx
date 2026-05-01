import { createFileRoute } from '@tanstack/react-router'

import { Header } from '#/components/header'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto grid w-full max-w-5xl flex-1 p-5"></main>
    </div>
  )
}
