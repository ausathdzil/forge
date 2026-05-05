import { createFileRoute } from '@tanstack/react-router'

import { SignUpForm } from '#/components/auth/sign-up-forn'
import { Heading, Muted } from '#/components/typography'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUp,
})

function SignUp() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <Heading>Create your account</Heading>
        <Muted>Fill in the form below to create your account</Muted>
      </div>
      <SignUpForm />
    </div>
  )
}
