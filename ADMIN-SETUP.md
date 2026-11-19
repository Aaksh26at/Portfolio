# Portfolio admin

The owner workspace is at **https://www.aakshat.in/admin**. It stays locked until the server-only credentials and database are configured. The public portfolio continues to use its checked-in content until a valid content record is saved.

## One-time activation

1. Open your Supabase project → SQL Editor. Copy and run [scripts/admin-schema.sql](scripts/admin-schema.sql). This creates separate `portfolio_*` tables; it does not change job-agent tables. You can use the existing Supabase project or a separate one.
2. In Vercel → Portfolio → Settings → Environment Variables, add these for **Production**:

| Name | Value |
| --- | --- |
| `PORTFOLIO_ADMIN_PASSWORD` | A unique password of **20–256 characters**. Choose and save it privately. |
| `PORTFOLIO_ADMIN_SESSION_SECRET` | A random secret of **at least 32 characters**. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` on your own computer. |
| `PORTFOLIO_SUPABASE_URL` | The project URL, `https://YOUR_PROJECT.supabase.co`, without `/rest/v1` or a dashboard path. |
| `PORTFOLIO_SUPABASE_SERVICE_ROLE_KEY` | The project's **service_role** server API key from Supabase Settings → API Keys → legacy API keys. Keep it server-only. |

3. Redeploy the latest production commit. Visit `/admin` and sign in using the password you chose. No public registration or password appears in source code. Never paste these secrets into chat.
4. Save an initial edit. Open the public portfolio in a separate tab to confirm the update. Send a genuine test contact message to verify it appears in Inbox and that existing Resend notifications still arrive.

Use the same variables in local `.env.local` if you want to test locally. Do not commit that file. Existing `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` and `NEXT_PUBLIC_GA_ID` settings remain in use.

## What the workspace manages

- **Overview:** real published and featured project counts, new messages among the latest 100, and service configuration status.
- **Profile:** hero copy, name, role, location, public contact details and about paragraphs. Existing employment, education, social profiles and résumé file remain in their source files.
- **Projects:** add, edit, duplicate, unpublish or remove case studies; choose categories and featured cards. New entries start as unpublished drafts. Publish only complete, fact-checked entries. Changing a slug changes its URL. Homepage and case-study text use the saved data without a rebuild.
- **Inbox:** newest 100 submissions stored after activation, with read/archive controls and a reply link opening your email app. Older emails are not imported. Resend acceptance means the provider accepted the notification; it is not proof of inbox delivery.
- **Settings:** export the editor's content as JSON and open analytics, hosting and database dashboards. Backups export content only, not contact messages or credentials. Traffic totals stay in GA4 rather than displaying made-up counts.

Changes are published only by **Save changes**. Concurrent saves are checked with database revisions: if another session saved first, reload before overwriting. An unavailable database never gets a fake save confirmation. Public pages fall back to checked-in content during a storage outage.

## Access and recovery

Sessions use an HttpOnly, SameSite=Strict cookie, signed with a private server secret and bound to the password. They expire after 8 hours. All admin data routes verify the session; mutations also verify the request origin. Database RLS blocks anonymous and ordinary authenticated users, and the rate limiter permits at most 8 login attempts per IP per 15 minutes. Only the server service-role key can access these tables/functions. Admin pages are marked noindex and excluded in robots.txt; indexing controls are not used as authentication.

To change the password or revoke all existing sessions, update `PORTFOLIO_ADMIN_PASSWORD` in Vercel and redeploy. Changing the session secret also revokes sessions. There is no public password-reset endpoint.

When setting up a new environment, run the SQL before enabling the storage variables. If a migration or credential is wrong, the admin API reports a setup failure and the existing public content remains available.
