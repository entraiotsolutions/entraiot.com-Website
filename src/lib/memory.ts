/**
 * memory.ts
 * Manages conversation state per user.
 */

export interface ChatMemory {
  intent: "LEADS" | "AUTOMATION" | "COST" | "EXPLORE" | "DEMO" | null;
  step: number;
  subStep: number;
  business_type: string | null;
  last_reply: string | null;
  trigger_lead_capture?: boolean;
  lead_captured?: boolean;
}

const memoryStore = new Map<string, ChatMemory>();

export function getMemory(userId: string): ChatMemory {
  if (!memoryStore.has(userId)) {
    const defaultMemory: ChatMemory = {
      intent: null,
      step: 0,
      subStep: 0,
      business_type: null,
      last_reply: null
    };
    memoryStore.set(userId, defaultMemory);
  }
  return memoryStore.get(userId)!;
}

export function updateMemory(userId: string, data: Partial<ChatMemory>): ChatMemory {
  const current = getMemory(userId);
  const updated = { ...current, ...data };
  memoryStore.set(userId, updated);
  return updated;
}
