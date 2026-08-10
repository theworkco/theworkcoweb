export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: unknown[];
  category: string;
  read_minutes: number;
  status: "draft" | "published";
  published_at: string | null; // ISO timestamp
}
