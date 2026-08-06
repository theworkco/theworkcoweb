import type {Metadata} from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeaturedPost from '@/components/FeaturedPost'
import PostRow from '@/components/PostRow'
import {client, sanityConfigured} from '@/sanity/lib/client'
import type {Post} from '@/lib/types'

export const metadata: Metadata = {title: 'Posts — theworkco'}
export const revalidate = 60

async function getPosts(): Promise<Post[]> {
  if (!sanityConfigured) return []
  try {
    return await client.fetch<Post[]>(`*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(featured desc, publishedAt desc){
      "id": _id, "slug": slug.current, title, excerpt, body, category,
      "read_minutes": coalesce(readMinutes, 4), "published_at": publishedAt, "status": "published"
    }`)
  } catch {
    return []
  }
}

export default async function PostsPage() {
  const [featured, ...rest] = await getPosts()
  return <>
    <Header />
    <section className="page-hero"><div className="wrap"><div className="eyebrow">Ideas & updates</div><h1>Posts</h1><p>News, thinking, projects, and useful notes from theworkco.</p></div></section>
    {featured && <FeaturedPost post={featured} />}
    <section className="post-list"><div className="wrap">
      {rest.length ? rest.map(post => <PostRow key={post.id} post={post} />) : <p style={{padding: '36px 0', color: 'rgba(27,31,20,0.5)'}}>{featured ? 'More posts are coming soon.' : 'No posts published yet. Open the Content Studio to create your first one.'}</p>}
    </div></section>
    <Footer />
  </>
}
