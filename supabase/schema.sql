-- Run this in the Supabase SQL editor for your project.

create table if not exists posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  excerpt       text not null,
  body          text not null,              -- markdown
  category      text not null default 'Lorem Ipsum',
  read_minutes  int not null default 5,
  status        text not null default 'draft' check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz not null default now()
);

-- Keep slugs URL-safe and queryable fast.
create index if not exists posts_slug_idx on posts (slug);
create index if not exists posts_published_at_idx on posts (published_at desc);

-- Row Level Security: the anon (public) key can only ever read
-- published posts. Drafts stay invisible until you flip the status.
alter table posts enable row level security;

create policy "Public can read published posts"
  on posts for select
  using (status = 'published');

-- No insert/update/delete policy is defined for the anon role, so writes
-- are only possible with the service role key (server-side only) or
-- directly in the Supabase Studio table editor.
