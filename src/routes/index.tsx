import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <main className="mx-auto grid w-full max-w-5xl flex-1 p-5"></main>
}
