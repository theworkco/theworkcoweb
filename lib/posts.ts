import type {Post} from './types'

// Add new posts here. Codex can update this file whenever you want to publish.
export const posts: Post[] = []

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
