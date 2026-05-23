import type { CrmPipelineStageKind } from "./types";

export const crmPipelineTemplate = [
  { kind: "lead", name: "New", position: 10 },
  { kind: "qualified", name: "Qualified", position: 20 },
  { kind: "proposal", name: "Matched", position: 30 },
  { kind: "negotiation", name: "Follow-up", position: 40 },
  { kind: "closed", name: "Closed", position: 50 },
] satisfies Array<{ kind: CrmPipelineStageKind; name: string; position: number }>;

export const crmTemplateViews = {
  conversations: "Conversation-first lead history powered by @keystone/conversations.",
  followUps: "AI drafted follow-ups powered by @keystone/ai and @keystone/workflows.",
  leads: "Mobile-first lead list and pipeline.",
  matching: "Reusable property matching surface.",
  reminders: "Task-backed reminders using the conversation task model.",
} as const;

export const sampleCrmLeads = [
  {
    aiAction: "Follow up today · ask for availability",
    budget: "€950K - 1.1M",
    name: "Sophia Marchetti",
    score: 92,
    stage: "Qualified",
  },
  {
    aiAction: "Send 2 property matches",
    budget: "€700K - 850K",
    name: "Theo Beaumont",
    score: 78,
    stage: "Matched",
  },
  {
    aiAction: "Reminder · call back at 16:00",
    budget: "€1.2M - 1.5M",
    name: "Amelie Laurent",
    score: 84,
    stage: "Follow-up",
  },
] as const;
