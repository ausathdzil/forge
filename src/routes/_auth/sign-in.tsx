import { createFileRoute } from '@tanstack/react-router'

import { SignInForm } from '#/components/auth/sign-in-form'

export const Route = createFileRoute('/_auth/sign-in')({
  component: SignIn,
})

function SignIn() {
  return (
    <div className="w-full max-w-xs space-y-6">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="scroll-m-20 text-center text-2xl font-medium tracking-tight text-balance">
          Sign in to your account
        </h1>
        <p className="text-sm text-balance text-muted-foreground">Enter your credentials below</p>
      </div>
      <SignInForm />
    </div>
  )
}
