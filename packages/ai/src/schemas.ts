import { z } from "zod";

export const ConfidenceSchema = z.number().min(0).max(1);

export const ConversationSummarySchema = z.object({
  actionItems: z.array(z.string()).default([]),
  confidence: ConfidenceSchema,
  keyFacts: z.array(z.string()).default([]),
  nextBestAction: z.string().nullable(),
  summary: z.string(),
  tone: z.enum(["positive", "neutral", "negative", "urgent", "unclear"]),
});

export const ExtractedEntitySchema = z.object({
  confidence: ConfidenceSchema,
  entityType: z.string(),
  evidence: z.string().optional(),
  normalizedValue: z.record(z.unknown()).default({}),
  value: z.string(),
});

export const ExtractEntitiesSchema = z.object({
  entities: z.array(ExtractedEntitySchema),
});

export const GeneratedReplySchema = z.object({
  confidence: ConfidenceSchema,
  reply: z.string(),
  rationale: z.string().optional(),
  suggestedTone: z.enum(["concise", "warm", "formal", "casual", "urgent"]),
});

export const IntentSchema = z.object({
  confidence: ConfidenceSchema,
  intent: z.string(),
  reasoning: z.string().optional(),
  urgency: z.enum(["low", "medium", "high"]),
});

export const ConversationClassificationSchema = z.object({
  category: z.string(),
  confidence: ConfidenceSchema,
  priority: z.enum(["low", "medium", "high", "critical"]),
  reasons: z.array(z.string()).default([]),
  sentiment: z.enum(["positive", "neutral", "negative", "mixed", "unclear"]),
});

export const GeneratedTaskSchema = z.object({
  assigneeHint: z.string().nullable(),
  dueAt: z.string().datetime().nullable(),
  priority: z.enum(["low", "medium", "high"]),
  sourceMessageId: z.string().nullable(),
  title: z.string(),
});

export const GenerateTasksSchema = z.object({
  tasks: z.array(GeneratedTaskSchema),
});

export const FollowUpSchema = z.object({
  channel: z.enum(["in_app", "email", "sms", "whatsapp", "voice", "web", "api"]),
  confidence: ConfidenceSchema,
  message: z.string(),
  reason: z.string(),
  sendAfter: z.string().datetime().nullable(),
});

export const LeadScoreSchema = z.object({
  confidence: ConfidenceSchema,
  fit: z.number().int().min(0).max(100),
  readiness: z.number().int().min(0).max(100),
  reasons: z.array(z.string()).default([]),
  score: z.number().int().min(0).max(100),
});

export type ConversationSummaryOutput = z.infer<typeof ConversationSummarySchema>;
export type ExtractEntitiesOutput = z.infer<typeof ExtractEntitiesSchema>;
export type GeneratedReplyOutput = z.infer<typeof GeneratedReplySchema>;
export type IntentOutput = z.infer<typeof IntentSchema>;
export type ConversationClassificationOutput = z.infer<typeof ConversationClassificationSchema>;
export type GenerateTasksOutput = z.infer<typeof GenerateTasksSchema>;
export type FollowUpOutput = z.infer<typeof FollowUpSchema>;
export type LeadScoreOutput = z.infer<typeof LeadScoreSchema>;
