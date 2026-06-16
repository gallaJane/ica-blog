import Link from 'next/link'
import { Post } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PostCardProps {
    post: Post
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.id}`}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {post.author} · {post.date}
                    </p>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{post.summary}</p>
                </CardContent>
            </Card>
        </Link>
    )
}