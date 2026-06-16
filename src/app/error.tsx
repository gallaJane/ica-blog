'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface ErrorPageProps {
    error: Error & { digest?: string }
    reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error('App Error:', error)
    }, [error])

    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-center">
            <h1 className="text-3xl font-bold mb-3">Something went wrong</h1>
            <p className="text-muted-foreground mb-8">
                An unexpected error occurred. You can try again or go back home.
            </p>
            <div className="flex gap-3 justify-center">
                <Button onClick={reset}>Try again</Button>
                <Button asChild variant="outline">
                    <Link href="/">Go home</Link>
                </Button>
            </div>
        </main>
    )
}