<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Auth

Email/password auth via **Supabase** (`@supabase/ssr`). No Clerk.

- Browser client: `src/lib/supabase/client.ts`
- Server client (cookie-bound): `src/lib/supabase/server.ts`
- Session refresh + route protection lives in `src/proxy.ts` — `/dashboard/**` requires a user; `/sign-in` and `/sign-up` redirect to `/dashboard` when already signed in.
- Server actions for sign-in / sign-up / sign-out: `src/app/auth/actions.ts`.
- Get the current user in a server component with `const supabase = await createClient(); const { data: { user } } = await supabase.auth.getUser();`. User profile fields (first/last name) live on `user.user_metadata`.
- Required env vars (see `.env.example`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
