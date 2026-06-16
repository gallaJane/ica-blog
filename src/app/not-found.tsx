import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-center">
            <h1 className="text-3xl font-bold mb-3">Page not found</h1>
            <p className="text-muted-foreground mb-8">
                The page or post you are looking for doesn’t exist anymore or was moved.
            </p>
            <Button asChild>
                <Link href="/">Go home</Link>
            </Button>
        </main>
    )
}