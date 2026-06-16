import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/store'
import { DeleteButton } from '@/components/posts/DeleteButton'
import { Button } from '@/components/ui/button'

interface PostPageProps {
    params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PostPageProps) {
    const { id } = await params
    const post = getPostById(id)

    if (!post) return notFound()

    return (
        <main className="max-w-3xl mx-auto px-4 py-10">
            <div className="mb-6">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/">← Back</Link>
                </Button>
            </div>

            <article>
                <header className="mb-8">
                    <h1 className="text-4xl font-bold mb-3">{post.title}</h1>
                    <p className="text-muted-foreground text-sm">
                        {post.author} · {post.authorEmail} · {post.date}
                    </p>
                    <p className="mt-4 text-lg text-muted-foreground">{post.summary}</p>
                </header>

                <div className="max-w-none">
                    <p>{post.text}</p>
                </div>
            </article>

            <div className="flex gap-3 mt-10 pt-6 border-t">
                <Button asChild>
                    <Link href={`/posts/${post.id}/edit`}>Edit</Link>
                </Button>
                <DeleteButton id={post.id} />
            </div>
        </main>
    )
}