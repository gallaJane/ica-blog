'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PostSchema } from './validations'
import { createPost, updatePost, deletePost } from './store'

export type ActionState = {
    errors?: Record<string, string[]>
}

const parseString = (v: FormDataEntryValue | null): string =>
    typeof v === 'string' ? v : ''

function parsePostForm(formData: FormData) {
    return {
        title: parseString(formData.get('title')),
        summary: parseString(formData.get('summary')),
        text: parseString(formData.get('text')),
        author: parseString(formData.get('author')),
        authorEmail: parseString(formData.get('authorEmail')),
        date: parseString(formData.get('date')),
    }
}

export async function createPostAction(
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const result = PostSchema.safeParse(parsePostForm(formData))

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    createPost(result.data)
    revalidatePath('/')
    revalidatePath('/posts')
    redirect('/')
}

export async function updatePostAction(
    id: string,
    _prevState: ActionState,
    formData: FormData
): Promise<ActionState> {
    const result = PostSchema.safeParse(parsePostForm(formData))

    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors }
    }

    const updated = updatePost(id, result.data)

    if (!updated) {
        return { errors: { general: ['Post not found'] } }
    }

    revalidatePath('/')
    revalidatePath('/posts')
    revalidatePath(`/posts/${id}`)
    redirect(`/posts/${id}`)
}

export async function deletePostAction(id: string): Promise<void> {
    deletePost(id)
    revalidatePath('/')
    revalidatePath('/posts')
    redirect('/')
}