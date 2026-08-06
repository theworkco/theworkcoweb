import { createBrowserClient } from "@supabase/ssr";

// Use this inside Client Components ("use client").
// Server Components / route handlers should use lib/supabase/server.ts instead.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
