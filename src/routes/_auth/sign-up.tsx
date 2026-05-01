import { createFileRoute } from '@tanstack/react-router'

import { SignUpForm } from '#/components/auth/sign-up-forn'

export const Route = createFileRoute('/_auth/sign-up')({
  component: SignUp,
})

function SignUp() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="scroll-m-20 text-center text-2xl font-medium tracking-tight text-balance">
          Create your account
        </h1>
        <p className="text-sm text-balance text-muted-foreground">
          Fill in the form below to create your account
        </p>
      </div>
      <SignUpForm />
    </div>
  )
}
