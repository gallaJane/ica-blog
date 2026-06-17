import { Post } from './types'
import { seedPosts } from './seeds'

declare global {

    var __posts: Post[] | undefined
}

// globalThis prevents the store from resetting on hot reloads in dev mode.
// In production with a real database, this pattern wouldn't be needed.
if (!globalThis.__posts) {
    globalThis.__posts = [...seedPosts]
}

const posts = globalThis.__posts

export function getPosts(): Post[] {
    return [...posts].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

export function getPostById(id: string): Post | undefined {
    const post = posts.find((post) => post.id === id)
    return post ? { ...post } : undefined
}

export function createPost(data: Omit<Post, 'id' | 'createdAt'>): Post {
    const post: Post = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    }
    posts.push(post)
    return post
}

export function updatePost(id: string, data: Omit<Post, 'id' | 'createdAt'>): Post | null {
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) return null
    posts[index] = { ...posts[index], ...data }
    return posts[index]
}

export function deletePost(id: string): boolean {
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) return false
    posts.splice(index, 1)
    return true
}