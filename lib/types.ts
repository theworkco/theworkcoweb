export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown
  category: string;
  read_minutes: number;
  status: "draft" | "published";
  published_at: string | null; // ISO timestamp
}
