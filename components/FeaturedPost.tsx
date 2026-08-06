import Link from "next/link";
import type { Post } from "@/lib/types";

function formatDate(iso: string | null) {
  if (!iso) return "Draft";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="featured">
      <div className="wrap">
        <Link href={`/posts/${post.slug}`} className="featured-card">
          <div className="featured-meta">
            <span>{formatDate(post.published_at)}</span>
            <span className="dot-sep" />
            <span>{post.read_minutes} min read</span>
            <span className="dot-sep" />
            <span className="cat">{post.category}</span>
          </div>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <span className="featured-link">Read post →</span>
        </Link>
      </div>
    </section>
  );
}
