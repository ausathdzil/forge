import { Link } from '@tanstack/react-router'
import { EyeOffIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Field, FieldGroup, FieldLabel, FieldDescription } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from '#/components/ui/input-group'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <form className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel>Name</FieldLabel>
          <Input
            autoComplete="name"
            maxLength={30}
            minLength={3}
            placeholder="Alice"
            required
            type="text"
          />
        </Field>
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
            <InputGroupInput
              autoComplete="new-password"
              maxLength={128}
              minLength={8}
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
        </Field>
        <Field>
          <Button type="submit">Sign Up</Button>
          <FieldDescription className="text-center">
            Already have an account? <Link to="/sign-in">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
