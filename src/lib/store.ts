import { Post } from './types'
import { seedPosts } from './seeds'

const posts: Post[] = [...seedPosts];

export function getPosts(): Post[] {
    return [...posts]
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