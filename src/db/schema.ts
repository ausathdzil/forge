import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  bigint,
  varchar,
  uniqueIndex,
  integer,
} from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
})

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)],
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
)

export const workout = pgTable(
  'workout',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar('public_id', { length: 12 })
      .$defaultFn(() => nanoid(12))
      .notNull()
      .unique(),
    title: varchar('title', { length: 255 }).notNull(),
    startedAt: timestamp('started_at', { withTimezone: true }).defaultNow().notNull(),
    finishedAt: timestamp('finished_at', { withTimezone: true }),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('workout_user_id_idx').on(table.userId)],
)

export const exercise = pgTable(
  'exercise',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar('public_id', { length: 12 })
      .$defaultFn(() => nanoid(12))
      .notNull()
      .unique(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('exercise_user_name_idx').on(table.userId, table.name)],
)

export const workoutExercise = pgTable(
  'workout_exercise',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar('public_id', { length: 12 })
      .$defaultFn(() => nanoid(12))
      .notNull()
      .unique(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    workoutId: bigint('workout_id', { mode: 'number' })
      .notNull()
      .references(() => workout.id, { onDelete: 'cascade' }),
    exerciseId: bigint('exercise_id', { mode: 'number' })
      .notNull()
      .references(() => exercise.id, { onDelete: 'cascade' }),
  },
  (table) => [
    uniqueIndex('workout_exercise_workout_id_order_uniq').on(table.workoutId, table.order),
    index('workout_exercise_exercise_id_idx').on(table.exerciseId),
  ],
)

export const set = pgTable(
  'set',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
    publicId: varchar('public_id', { length: 12 })
      .$defaultFn(() => nanoid(12))
      .notNull()
      .unique(),
    reps: integer('reps').notNull(),
    weight: integer('weight').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    workoutExerciseId: bigint('workout_exercise_id', { mode: 'number' })
      .notNull()
      .references(() => workoutExercise.id, { onDelete: 'cascade' }),
  },
  (table) => [
    index('set_workout_exercise_id_idx').on(table.workoutExerciseId),
    uniqueIndex('set_workout_exercise_id_order_uniq').on(table.workoutExerciseId, table.order),
  ],
)

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

export const workoutRelations = relations(workout, ({ one, many }) => ({
  user: one(user, {
    fields: [workout.userId],
    references: [user.id],
  }),
  workoutExercises: many(workoutExercise),
}))

export const exerciseRelations = relations(exercise, ({ one, many }) => ({
  user: one(user, {
    fields: [exercise.userId],
    references: [user.id],
  }),
  workoutExercises: many(workoutExercise),
}))

export const workoutExerciseRelations = relations(workoutExercise, ({ one, many }) => ({
  workout: one(workout, {
    fields: [workoutExercise.workoutId],
    references: [workout.id],
  }),
  exercise: one(exercise, {
    fields: [workoutExercise.exerciseId],
    references: [exercise.id],
  }),
  sets: many(set),
}))

export const setRelations = relations(set, ({ one }) => ({
  workoutExercise: one(workoutExercise, {
    fields: [set.workoutExerciseId],
    references: [workoutExercise.id],
  }),
}))
