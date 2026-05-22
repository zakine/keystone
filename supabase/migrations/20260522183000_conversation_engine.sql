create extension if not exists "pgcrypto";

create type public.conversation_status as enum ('open', 'pending', 'closed', 'archived');
create type public.conversation_channel as enum ('in_app', 'email', 'sms', 'whatsapp', 'voice', 'web', 'api');
create type public.participant_kind as enum ('user', 'contact', 'agent', 'system', 'external');
create type public.message_role as enum ('user', 'assistant', 'system', 'participant');
create type public.message_status as enum ('draft', 'queued', 'sent', 'delivered', 'read', 'failed');
create type public.task_status as enum ('open', 'in_progress', 'completed', 'cancelled');
create type public.workflow_status as enum ('queued', 'running', 'completed', 'failed', 'cancelled');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  workspace_id uuid,
  subject text,
  status public.conversation_status not null default 'open',
  primary_channel public.conversation_channel not null default 'in_app',
  external_thread_id text,
  last_message_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_participants (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  kind public.participant_kind not null default 'contact',
  display_name text,
  handle text,
  phone text,
  email text,
  avatar_url text,
  external_participant_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  participant_id uuid references public.conversation_participants(id) on delete set null,
  role public.message_role not null default 'participant',
  channel public.conversation_channel not null default 'in_app',
  status public.message_status not null default 'sent',
  body text,
  attachments jsonb not null default '[]'::jsonb,
  external_message_id text,
  provider text,
  provider_payload jsonb not null default '{}'::jsonb,
  ai_annotations jsonb not null default '{}'::jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_summaries (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  model text,
  summary text not null,
  facts jsonb not null default '[]'::jsonb,
  message_range jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.extracted_entities (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  message_id uuid references public.messages(id) on delete cascade,
  entity_type text not null,
  value text not null,
  normalized_value jsonb not null default '{}'::jsonb,
  confidence numeric(4, 3) check (confidence is null or (confidence >= 0 and confidence <= 1)),
  source text not null default 'ai',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.conversation_tasks (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  message_id uuid references public.messages(id) on delete set null,
  title text not null,
  description text,
  status public.task_status not null default 'open',
  due_at timestamptz,
  assigned_to uuid references auth.users(id) on delete set null,
  created_by uuid references auth.users(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.conversation_events (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  message_id uuid references public.messages(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  idempotency_key text,
  created_at timestamptz not null default now()
);

create table public.conversation_workflows (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  workflow_name text not null,
  status public.workflow_status not null default 'queued',
  trigger_event_id uuid references public.conversation_events(id) on delete set null,
  provider_run_id text,
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index conversation_events_idempotency_key_idx
  on public.conversation_events (idempotency_key)
  where idempotency_key is not null;

create index conversations_owner_status_idx on public.conversations (owner_id, status, updated_at desc);
create index conversations_workspace_updated_idx on public.conversations (workspace_id, updated_at desc);
create index participants_conversation_idx on public.conversation_participants (conversation_id);
create index messages_conversation_created_idx on public.messages (conversation_id, created_at asc);
create index messages_external_idx on public.messages (provider, external_message_id);
create index summaries_conversation_created_idx on public.conversation_summaries (conversation_id, created_at desc);
create index extracted_entities_conversation_idx on public.extracted_entities (conversation_id, entity_type);
create index tasks_conversation_status_idx on public.conversation_tasks (conversation_id, status, due_at);
create index events_conversation_created_idx on public.conversation_events (conversation_id, created_at desc);
create index workflows_conversation_status_idx on public.conversation_workflows (conversation_id, status);

create trigger conversations_set_updated_at
before update on public.conversations
for each row execute function public.set_updated_at();

create trigger participants_set_updated_at
before update on public.conversation_participants
for each row execute function public.set_updated_at();

create trigger messages_set_updated_at
before update on public.messages
for each row execute function public.set_updated_at();

create trigger tasks_set_updated_at
before update on public.conversation_tasks
for each row execute function public.set_updated_at();

create trigger workflows_set_updated_at
before update on public.conversation_workflows
for each row execute function public.set_updated_at();

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.conversation_summaries enable row level security;
alter table public.extracted_entities enable row level security;
alter table public.conversation_tasks enable row level security;
alter table public.conversation_events enable row level security;
alter table public.conversation_workflows enable row level security;

create policy "Users can read owned conversations"
on public.conversations for select
using (owner_id = auth.uid());

create policy "Users can create owned conversations"
on public.conversations for insert
with check (owner_id = auth.uid());

create policy "Users can update owned conversations"
on public.conversations for update
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can read participants for owned conversations"
on public.conversation_participants for select
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage participants for owned conversations"
on public.conversation_participants for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can read messages for owned conversations"
on public.messages for select
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage messages for owned conversations"
on public.messages for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can read summaries for owned conversations"
on public.conversation_summaries for select
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage summaries for owned conversations"
on public.conversation_summaries for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage extracted entities for owned conversations"
on public.extracted_entities for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage tasks for owned conversations"
on public.conversation_tasks for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage events for owned conversations"
on public.conversation_events for all
using (
  conversation_id is null
  or exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  conversation_id is null
  or exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

create policy "Users can manage workflows for owned conversations"
on public.conversation_workflows for all
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id and c.owner_id = auth.uid()
  )
);

alter publication supabase_realtime add table
  public.conversations,
  public.conversation_participants,
  public.messages,
  public.conversation_summaries,
  public.extracted_entities,
  public.conversation_tasks,
  public.conversation_events,
  public.conversation_workflows;
