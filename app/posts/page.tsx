import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedPost from "@/components/FeaturedPost";
import PostRow from "@/components/PostRow";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const metadata: Metadata = {
  title: "Posts — theworkco",
};

// Revalidate periodically so newly published posts in Supabase show up
// without a full redeploy (ISR).
export const revalidate = 60;

export default async function PostsPage() {
  const supabase = createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .returns<Post[]>();

  const [featured, ...rest] = posts ?? [];

  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Lorem ipsum</div>
          <h1>Posts</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {featured && <FeaturedPost post={featured} />}

      <section className="post-list">
        <div className="wrap">
          {rest.length > 0 ? (
            rest.map((post) => <PostRow key={post.id} post={post} />)
          ) : (
            <p style={{ padding: "36px 0", color: "rgba(27,31,20,0.5)" }}>
              No more posts yet — add rows to the `posts` table in Supabase.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
