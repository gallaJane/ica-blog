'use client'

import { useTransition } from 'react'
import { deletePostAction } from '@/lib/actions'
import { Button } from '@/components/ui/button'

interface DeleteButtonProps {
    id: string
}

export function DeleteButton({ id }: DeleteButtonProps) {
    const [isPending, startTransition] = useTransition()

    function handleDelete() {
        if (!window.confirm('Are you sure you want to delete this post?')) return

        startTransition(() => {
            deletePostAction(id)
        })
    }

    return (
        <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
        >
            {isPending ? 'Deleting...' : 'Delete'}
        </Button>
    )
}