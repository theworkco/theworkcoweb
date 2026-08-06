import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 60;

// Render published slugs on first request and cache them with ISR.
// The cookie-aware Supabase client requires an active request scope.
export async function generateStaticParams() {
  return [];
}

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single<Post>();

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.title + " — theworkco",
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at ?? undefined,
    },
  };
}

function formatDate(iso: string | null) {
  if (!iso) return "Draft";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <Header />

      <section className="article-header">
        <div className="wrap">
          <div className="post-meta">
            <span>{formatDate(post.published_at)}</span>
            <span className="cat">{post.category}</span>
            <span>{post.read_minutes} min read</span>
          </div>
          <h1>{post.title}</h1>
        </div>
      </section>

      <section className="article-body wrap">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </section>

      <Footer />
    </>
  );
}
