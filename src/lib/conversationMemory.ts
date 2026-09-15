/**
 * conversationMemory.ts
 * ─────────────────────────────────────────────────────────────
 * Session State Engine for AI Chatbot
 * Manages user context across conversation turns.
 * Currently uses an in-memory store (easy to swap for Redis later).
 * ─────────────────────────────────────────────────────────────
 */

export type ConversationStage = 
  | "start" 
  | "qualification" 
  | "pitch" 
  | "cta" 
  | "lead_capture" 
  | "closed";

export interface ConversationMemory {
  intent: string | null;
  stage: ConversationStage;
  business_type: string | null;
  urgency: string | null;
  lead_captured: boolean;
  
  // Extra fields useful for tracking context
  last_message?: string;
  last_intent?: string | null;
  last_reply?: string | null;
  message_count: number;
  step: number;
  subStep: number;
  lead_score?: number;
  history?: { role: "user" | "assistant"; content: string }[];
}

// ── In-Memory Store ──────────────────────────────────────────
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

interface StoreRecord {
  memory: ConversationMemory;
  expiresAt: number;
}

const memoryStore = new Map<string, StoreRecord>();

// Simple cleanup function for expired sessions
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [userId, record] of memoryStore.entries()) {
    if (record.expiresAt < now) {
      memoryStore.delete(userId);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupExpiredSessions, 5 * 60 * 1000);

// ── Exported Functions ────────────────────────────────────────

/**
 * Retrieve a user's memory state, or initialize a fresh one if it doesn't exist.
 */
export function getMemory(userId: string): ConversationMemory {
  cleanupExpiredSessions();
  
  const record = memoryStore.get(userId);
  
  if (!record || record.expiresAt < Date.now()) {
    const freshMemory: ConversationMemory = {
      intent: null,
      stage: "start",
      business_type: null,
      urgency: null,
      lead_captured: false,
      message_count: 0,
      last_intent: null,
      last_reply: null,
      step: 0,
      subStep: 0,
      lead_score: 0
    };
    
    memoryStore.set(userId, {
      memory: freshMemory,
      expiresAt: Date.now() + SESSION_TTL_MS,
    });
    
    return freshMemory;
  }
  
  return record.memory;
}

/**
 * Update a user's memory state with new data.
 * Merges the provided partial data into the existing memory.
 */
export function updateMemory(userId: string, data: Partial<ConversationMemory>): ConversationMemory {
  const currentMemory = getMemory(userId);
  
  const updatedMemory: ConversationMemory = {
    ...currentMemory,
    ...data,
  };
  
  memoryStore.set(userId, {
    memory: updatedMemory,
    expiresAt: Date.now() + SESSION_TTL_MS, // refresh TTL on update
  });
  
  return updatedMemory;
}

/**
 * Clears a specific user's session memory.
 */
export function clearMemory(userId: string): void {
  memoryStore.delete(userId);
}

/**
 * Categorizes a lead score into cold, warm, or hot.
 */
export function getLeadLabel(score: number): "cold" | "warm" | "hot" {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}
