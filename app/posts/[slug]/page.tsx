import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import {getPost, posts} from '@/lib/posts'

export function generateStaticParams() {
  return posts.map((post) => ({slug: post.slug}))
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
    <section className="article-body wrap">{post.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</section>
    <Footer />
  </>
}
