import Link from 'next/link'
import { createPostAction } from '@/lib/actions'
import { PostForm } from '@/components/posts/PostForm'
import { Button } from '@/components/ui/button'

export default function NewPostPage() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/">← Back</Link>
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-8">New Post</h1>

            <PostForm
                action={createPostAction}
                submitLabel="Create Post"
                defaultValues={{
                    date: new Date().toISOString().slice(0, 10),
                }}
            />
        </main>
    )
}