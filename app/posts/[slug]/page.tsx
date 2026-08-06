import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/types";

export const revalidate = 60;

// Pre-build a page for every published slug at deploy time. Any slug
// published later still resolves — Next just renders it on first
// request and caches it (ISR), no redeploy required.
export async function generateStaticParams() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published");

  return (posts ?? []).map((post) => ({ slug: post.slug }));
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
    title: `${post.title} — theworkco`,
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
