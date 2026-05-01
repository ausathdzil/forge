import { Link } from '@tanstack/react-router'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Checkbox } from '#/components/ui/checkbox'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '#/components/ui/input-group'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            autoComplete="email"
            maxLength={255}
            placeholder="m@example.com"
            required
            type="email"
          />
        </Field>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <InputGroup>
            <InputGroupInput maxLength={128} required type={showPassword ? 'text' : 'password'} />
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
        </Field>
        <Field orientation="horizontal">
          <Checkbox />
          <FieldLabel className="font-normal">Remember Me</FieldLabel>
        </Field>
        <Field>
          <Button type="submit">Sign In</Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
