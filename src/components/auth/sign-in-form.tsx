import { useForm } from '@tanstack/react-form-start'
import { Link, useNavigate } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Alert, AlertTitle } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group'
import { signIn } from '#/lib/auth-client'

import { signinFormSchema } from './auth-form-schema'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validators: {
      onSubmit: signinFormSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null)

      const { error } = await signIn.email(value, {
        onRequest: () => {
          setIsLoading(true)
        },
        onSuccess: () => {
          setIsLoading(false)
          void navigate({ to: '/' })
        },
        onError: () => {
          setIsLoading(false)
        },
      })

      if (error) {
        setServerError(error.message || 'An unexpected error occurred.')
      }
    },
    onSubmitInvalid() {
      const $invalidInput = document.querySelector('[aria-invalid="true"]')
      if ($invalidInput instanceof HTMLElement) {
        $invalidInput.focus()
      }
    },
  })

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        void form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  autoComplete="email"
                  maxLength={255}
                  placeholder="m@example.com"
                  required
                  type="email"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    autoComplete="current-password"
                    maxLength={128}
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword(!showPassword)}
                      size="icon-xs"
                      title={showPassword ? 'Hide password' : 'Show password'}
                      type="button"
                      variant="ghost"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <form.Field
          name="rememberMe"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid} orientation="horizontal">
                <Checkbox
                  aria-invalid={isInvalid}
                  checked={field.state.value}
                  id={field.name}
                  name={field.name}
                  onCheckedChange={(checked) => field.handleChange(checked === true)}
                />
                <FieldLabel className="font-normal" htmlFor={field.name}>
                  Remember Me
                </FieldLabel>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        />
        <Field>
          <Button type="submit" disabled={isLoading}>
            Sign In
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </FieldDescription>
          {serverError ? (
            <Alert variant="destructive">
              <AlertTitle>{serverError}</AlertTitle>
            </Alert>
          ) : null}
        </Field>
      </FieldGroup>
    </form>
  )
}
