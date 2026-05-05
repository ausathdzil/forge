import { createFileRoute } from '@tanstack/react-router'

import { SignInForm } from '#/components/auth/sign-in-form'
import { Heading, Muted } from '#/components/typography'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <Heading>Sign in to your account</Heading>
        <Muted>Enter your credentials below</Muted>
      </div>
      <SignInForm />
    </div>
  )
}
