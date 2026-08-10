import type {Metadata} from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeaturedPost from '@/components/FeaturedPost'
import PostRow from '@/components/PostRow'
import {posts} from '@/lib/posts'

export const metadata: Metadata = {title: 'Posts — theworkco'}
export default function PostsPage() {
  const [featured, ...rest] = posts
  return <>
    <Header />
    <section className="page-hero"><div className="wrap"><div className="eyebrow">Ideas & updates</div><h1>Posts</h1><p>News, thinking, projects, and useful notes from theworkco.</p></div></section>
    {featured && <FeaturedPost post={featured} />}
    <section className="post-list"><div className="wrap">
      {rest.length ? rest.map(post => <PostRow key={post.id} post={post} />) : <p style={{padding: '36px 0', color: 'rgba(27,31,20,0.5)'}}>{featured ? 'More posts are coming soon.' : 'No posts published yet.'}</p>}
    </div></section>
    <Footer />
  </>
}
