import { z } from 'zod'

export const PostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(50, 'Title must be 50 characters or less'),
    summary: z.string().min(1, 'Summary is required').max(250, 'Summary must be 250 characters or less'),
    text: z.string().min(1, 'Content is required'),
    author: z.string().min(1, 'Author is required').max(40, 'Author must be 40 characters or less'),
    authorEmail: z.email('Must be a valid email address'),
    date: z.string()
        .min(1, 'Date is required')
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
})

export type PostFormData = z.infer<typeof PostSchema>