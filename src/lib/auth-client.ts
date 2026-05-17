import { createAuthClient } from 'better-auth/react'

const authClient = createAuthClient()

export const { signUp, signIn, useSession, signOut } = authClient

export type User = (typeof authClient.$Infer.Session)['user']
