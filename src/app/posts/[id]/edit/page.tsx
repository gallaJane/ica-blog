import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/store'
import { updatePostAction } from '@/lib/actions'
import { PostForm } from '@/components/posts/PostForm'
import { Button } from '@/components/ui/button'

interface EditPostPageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params
    const post = getPostById(id)

    if (!post) return notFound()

    const boundAction = updatePostAction.bind(null, id)

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm">
                    <Link href={`/posts/${id}`}>← Back</Link>
                </Button>
            </div>

            <h1 className="text-3xl font-bold mb-8">Edit Post</h1>

            <PostForm
                action={boundAction}
                submitLabel="Save Changes"
                defaultValues={{
                    title: post.title,
                    summary: post.summary,
                    text: post.text,
                    author: post.author,
                    authorEmail: post.authorEmail,
                    date: post.date,
                }}
            />
        </main>
    )
}