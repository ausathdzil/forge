import * as z from 'zod/mini'

export const signupFormSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(3, 'Name must be at least 3 characters long.'),
      z.maxLength(30, 'Name must be 30 characters or fewer.'),
    ),
  email: z
    .email('Please enter a valid email.')
    .check(z.trim(), z.maxLength(255, 'Email must be 255 characters or fewer.')),
  password: z
    .string()
    .check(
      z.minLength(8, 'Password must be at least 8 characters long.'),
      z.maxLength(128, 'Password must be 128 characters or fewer.'),
      z.regex(/[a-zA-Z]/, 'Password must contain at least one letter.'),
      z.regex(/[0-9]/, 'Password must contain at least one number.'),
      z.regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character.'),
    ),
})

export const signinFormSchema = z.object({
  email: z
    .email('Please enter a valid email.')
    .check(z.trim(), z.maxLength(255, 'Email must be 255 characters or fewer.')),
  password: z.string().check(z.maxLength(128, 'Password must be 128 characters or fewer.')),
})
