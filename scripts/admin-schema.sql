-- Run once in the Supabase SQL editor. Uses separate portfolio tables.
create table if not exists public.portfolio_content (
  id text primary key check (id = 'main'), content jsonb not null,
  revision integer not null default 1, updated_at timestamptz not null default now()
);
create table if not exists public.portfolio_messages (
  id uuid primary key default gen_random_uuid(), name text not null, email text not null,
  subject text not null, message text not null,
  status text not null default 'new' check (status in ('new','read','archived')),
  delivery text not null default 'pending', created_at timestamptz not null default now()
);
create table if not exists public.portfolio_admin_limits (
  key text primary key, started_at timestamptz not null, attempts integer not null
);
alter table public.portfolio_content enable row level security;
alter table public.portfolio_messages enable row level security;
alter table public.portfolio_admin_limits enable row level security;
revoke all on public.portfolio_content, public.portfolio_messages, public.portfolio_admin_limits from anon, authenticated;
grant all on public.portfolio_content, public.portfolio_messages, public.portfolio_admin_limits to service_role;

create or replace function public.portfolio_admin_attempt(bucket_key text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare attempts_now integer;
begin
  delete from public.portfolio_admin_limits where started_at < now() - interval '1 day';
  insert into public.portfolio_admin_limits(key,started_at,attempts) values (bucket_key,now(),1)
  on conflict(key) do update set
    attempts = case when portfolio_admin_limits.started_at < now() - interval '15 minutes' then 1 else portfolio_admin_limits.attempts+1 end,
    started_at = case when portfolio_admin_limits.started_at < now() - interval '15 minutes' then now() else portfolio_admin_limits.started_at end
  returning attempts into attempts_now;
  return attempts_now <= 8;
end $$;

create or replace function public.portfolio_save_content(next_content jsonb, expected_revision integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare row_saved public.portfolio_content;
begin
  if expected_revision = 0 then
    insert into public.portfolio_content(id,content,revision) values ('main', next_content, 1)
    on conflict(id) do nothing returning * into row_saved;
  else
    update public.portfolio_content set content=next_content, revision=revision+1, updated_at=now()
    where id='main' and revision=expected_revision returning * into row_saved;
  end if;
  if row_saved.id is null then return null; end if;
  return jsonb_build_object('revision',row_saved.revision,'updated_at',row_saved.updated_at);
end $$;
revoke all on function public.portfolio_admin_attempt(text) from public, anon, authenticated;
revoke all on function public.portfolio_save_content(jsonb,integer) from public, anon, authenticated;
grant execute on function public.portfolio_admin_attempt(text), public.portfolio_save_content(jsonb,integer) to service_role;
