create type public.crm_lead_status as enum ('new', 'contacted', 'qualified', 'nurture', 'won', 'lost');
create type public.crm_pipeline_stage_kind as enum ('lead', 'qualified', 'proposal', 'negotiation', 'closed');
create type public.crm_match_status as enum ('suggested', 'shortlisted', 'dismissed', 'sent');
create type public.crm_reminder_status as enum ('open', 'snoozed', 'completed', 'cancelled');

create table public.crm_pipeline_stages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  name text not null,
  kind public.crm_pipeline_stage_kind not null,
  position integer not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  owner_id uuid references auth.users(id) on delete set null,
  conversation_id uuid references public.conversations(id) on delete set null,
  pipeline_stage_id uuid references public.crm_pipeline_stages(id) on delete set null,
  display_name text not null,
  status public.crm_lead_status not null default 'new',
  score integer not null default 0 check (score >= 0 and score <= 100),
  source text,
  email text,
  phone text,
  budget_min numeric,
  budget_max numeric,
  location_query text,
  requirements jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crm_properties (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid,
  title text not null,
  address text,
  location text,
  price numeric,
  bedrooms integer,
  area_sqm numeric,
  attributes jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crm_property_matches (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.crm_leads(id) on delete cascade,
  property_id uuid not null references public.crm_properties(id) on delete cascade,
  score integer not null check (score >= 0 and score <= 100),
  status public.crm_match_status not null default 'suggested',
  reasons jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lead_id, property_id)
);

create table public.crm_reminders (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.crm_leads(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete cascade,
  task_id uuid references public.conversation_tasks(id) on delete set null,
  title text not null,
  status public.crm_reminder_status not null default 'open',
  due_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (lead_id is not null or conversation_id is not null)
);

create index crm_pipeline_stages_workspace_position_idx on public.crm_pipeline_stages (workspace_id, position);
create index crm_leads_workspace_stage_idx on public.crm_leads (workspace_id, pipeline_stage_id, updated_at desc);
create index crm_leads_conversation_idx on public.crm_leads (conversation_id);
create index crm_properties_workspace_price_idx on public.crm_properties (workspace_id, price);
create index crm_property_matches_lead_score_idx on public.crm_property_matches (lead_id, score desc);
create index crm_reminders_due_idx on public.crm_reminders (status, due_at);

create trigger crm_pipeline_stages_set_updated_at
before update on public.crm_pipeline_stages
for each row execute function public.set_updated_at();

create trigger crm_leads_set_updated_at
before update on public.crm_leads
for each row execute function public.set_updated_at();

create trigger crm_properties_set_updated_at
before update on public.crm_properties
for each row execute function public.set_updated_at();

create trigger crm_property_matches_set_updated_at
before update on public.crm_property_matches
for each row execute function public.set_updated_at();

create trigger crm_reminders_set_updated_at
before update on public.crm_reminders
for each row execute function public.set_updated_at();

alter table public.crm_pipeline_stages enable row level security;
alter table public.crm_leads enable row level security;
alter table public.crm_properties enable row level security;
alter table public.crm_property_matches enable row level security;
alter table public.crm_reminders enable row level security;

create policy "Users can manage owned CRM leads"
on public.crm_leads for all
using (owner_id = auth.uid())
with check (owner_id = auth.uid());

create policy "Users can read CRM pipeline stages"
on public.crm_pipeline_stages for select
using (true);

create policy "Users can read CRM properties"
on public.crm_properties for select
using (true);

create policy "Users can manage matches for owned leads"
on public.crm_property_matches for all
using (
  exists (
    select 1 from public.crm_leads l
    where l.id = lead_id and l.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.crm_leads l
    where l.id = lead_id and l.owner_id = auth.uid()
  )
);

create policy "Users can manage reminders for owned leads"
on public.crm_reminders for all
using (
  lead_id is null
  or exists (
    select 1 from public.crm_leads l
    where l.id = lead_id and l.owner_id = auth.uid()
  )
)
with check (
  lead_id is null
  or exists (
    select 1 from public.crm_leads l
    where l.id = lead_id and l.owner_id = auth.uid()
  )
);

alter publication supabase_realtime add table
  public.crm_leads,
  public.crm_property_matches,
  public.crm_reminders;
