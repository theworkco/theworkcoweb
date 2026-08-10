import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {client, sanityConfigured} from '@/sanity/lib/client'
import type {Post} from '@/lib/types'

export const revalidate = 60

async function getPost(slug: string): Promise<Post | null> {
  if (!sanityConfigured) return null
  try {
    return await client.fetch<Post | null>(`*[_type == "post" && slug.current == $slug && defined(publishedAt)][0]{
      "id": _id, "slug": slug.current, title, excerpt, body, category,
      "read_minutes": coalesce(readMinutes, 4), "published_at": publishedAt, "status": "published"
    }`, {slug})
  } catch {
    return null
  }
}

export async function generateMetadata({params}: {params: {slug: string}}): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return {}
  return {title: `${post.title} — theworkco`, description: post.excerpt, openGraph: {title: post.title, description: post.excerpt, type: 'article', publishedTime: post.published_at || undefined}}
}

function formatDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'}) : ''
}

export default async function PostPage({params}: {params: {slug: string}}) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  return <>
    <Header />
    <section className="article-header"><div className="wrap"><div className="post-meta"><span>{formatDate(post.published_at)}</span><span className="cat">{post.category}</span><span>{post.read_minutes} min read</span></div><h1>{post.title}</h1></div></section>
    <section className="article-body wrap"><PortableText value={post.body as never} /></section>
    <Footer />
  </>
}
