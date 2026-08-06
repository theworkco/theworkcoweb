# theworkco

Next.js (App Router) + Supabase, deployed on Vercel.

## What's here

```
app/
  layout.tsx           root layout, loads fonts, imports globals.css
  globals.css           ported theme (green/white, lime accent, CSS vars)
  page.tsx               placeholder home — port the hero/grid mockup here
  posts/
    page.tsx              posts index: featured post + list, queries Supabase
    [slug]/page.tsx        single post — generateStaticParams + ISR + per-post SEO
components/
  Header.tsx / Footer.tsx  shared nav + footer
  FeaturedPost.tsx         spotlighted card at the top of /posts
  PostRow.tsx               one row in the /posts list
lib/
  supabase/client.ts        browser Supabase client
  supabase/server.ts        server Supabase client (Server Components, route handlers)
  types.ts                  Post type
supabase/
  schema.sql                 posts table + RLS policy — run this first
```

## Setup

1. **Create a Supabase project** at supabase.com.
2. Open the SQL editor and run `supabase/schema.sql` — this creates the
   `posts` table and locks it down so the public (anon) key can only
   read rows where `status = 'published'`.
3. Copy `.env.local.example` to `.env.local` and fill in your project's
   URL and anon key (Project Settings → API in Supabase).
4. `npm install`
5. Add a row or two directly in Supabase's table editor (Table Editor →
   posts → Insert row) with `status` set to `published` so you have
   something to see.
6. `npm run dev` → visit `/posts`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel — it auto-detects Next.js, no config needed.
3. In the Vercel project's Environment Variables, add the same two
   `NEXT_PUBLIC_...` values from `.env.local`. Every push gets its own
   preview URL; `main` deploys to production.

## Publishing a post

For now, publishing means adding/editing a row in the Supabase table
editor and setting `status` to `published`. The `body` column is
markdown — it renders through `react-markdown` on the post page.
Pages are statically generated per slug at build time and revalidate
every 60 seconds (ISR), so a newly published post appears within a
minute without a redeploy.

## Next steps

- Port the full landing page (`theworkco-landing.html`) into `app/page.tsx`
  — hero slideshow + projects grid.
- If you want to publish from somewhere nicer than the Supabase table
  editor, add a simple authenticated `/admin` route using Supabase Auth,
  or hand-write markdown files and skip the DB for posts entirely if a
  file-based flow is preferred later.
