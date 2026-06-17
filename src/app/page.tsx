import Link from 'next/link'
import { getPosts } from '@/lib/store'
import { EmptyState } from '@/components/posts/EmptyState'
import { PostCard } from '@/components/posts/PostCard'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const posts = getPosts()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Latest Posts</h1>
        <Button asChild>
          <Link href="/posts/new">New Post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <EmptyState
          title="No posts yet."
          description="Be the first to write something."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  )
}