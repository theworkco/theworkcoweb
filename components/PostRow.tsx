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

export default function PostRow({ post }: { post: Post }) {
  return (
    <Link href={`/posts/${post.slug}`} className="post-row">
      <div className="post-meta">
        {formatDate(post.published_at)}
        <span className="cat">{post.category}</span>
      </div>
      <div className="post-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
      <div className="post-arrow">→</div>
    </Link>
  );
}
