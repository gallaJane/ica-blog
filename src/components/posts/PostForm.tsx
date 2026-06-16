'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ActionState } from '@/lib/actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

function FieldError({ error }: { error?: string[] }) {
    const message = error?.[0]
    if (!message) return null
    return (
        <p className="text-sm text-destructive" role="alert">
            {message}
        </p>
    )
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus()
    return (
        <Button type="submit" disabled={pending}>
            {pending ? 'Saving...' : label}
        </Button>
    )
}

interface PostFormProps {
    action: (prevState: ActionState, formData: FormData) => Promise<ActionState>
    defaultValues?: {
        title?: string
        summary?: string
        text?: string
        author?: string
        authorEmail?: string
        date?: string
    }
    submitLabel?: string
}

export function PostForm({
    action,
    defaultValues,
    submitLabel = 'Save',
}: PostFormProps) {
    const [state, formAction] = useActionState(action, {})

    return (
        <form action={formAction} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    name="title"
                    maxLength={50}
                    defaultValue={state.values?.title ?? defaultValues?.title}
                    placeholder="Post title"
                />
                <FieldError error={state.errors?.title} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                    id="summary"
                    name="summary"
                    maxLength={250}
                    defaultValue={state.values?.summary ?? defaultValues?.summary}
                    placeholder="Short summary"
                    rows={3}
                />
                <FieldError error={state.errors?.summary} />
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="text">Content</Label>
                <Textarea
                    id="text"
                    name="text"
                    defaultValue={state.values?.text ?? defaultValues?.text}
                    placeholder="Write your post..."
                    rows={8}
                />
                <FieldError error={state.errors?.text} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                        id="author"
                        name="author"
                        maxLength={40}
                        defaultValue={state.values?.author ?? defaultValues?.author}
                        placeholder="Your name"
                    />
                    <FieldError error={state.errors?.author} />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="authorEmail">Author Email</Label>
                    <Input
                        id="authorEmail"
                        name="authorEmail"
                        type="email"
                        defaultValue={state.values?.authorEmail ?? defaultValues?.authorEmail}
                        placeholder="your@email.com"
                    />
                    <FieldError error={state.errors?.authorEmail} />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                    id="date"
                    name="date"
                    type="date"
                    defaultValue={state.values?.date ?? defaultValues?.date}
                />
                <FieldError error={state.errors?.date} />
            </div>

            <FieldError error={state.errors?.general} />

            <div className="flex gap-3">
                <SubmitButton label={submitLabel} />
            </div>
        </form>
    )
}