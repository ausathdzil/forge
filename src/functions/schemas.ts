import * as z from 'zod'

export const StartWorkoutSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
})

export const GetWorkoutSchema = z.object({
  publicId: z.string().min(1, 'Public ID is required').max(12, 'Public ID must be 12 characters'),
})
