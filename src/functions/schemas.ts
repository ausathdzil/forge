import * as z from 'zod'

export const StartWorkoutSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
})

export const GetWorkoutSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  publicId: z.string().min(1, 'Public ID is required').max(12, 'Public ID must be 12 characters'),
})

export const GetWorkoutHistorySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  limit: z.int().positive().max(100).optional(),
})
