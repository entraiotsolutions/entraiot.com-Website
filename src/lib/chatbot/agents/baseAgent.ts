/**
 * agents/baseAgent.ts
 */

import { ConversationMemory } from "../../conversationMemory";

export interface AgentResponse {
  reply: string;
  ctas?: {
    label: string;
    action: "send_message" | "open_lead_form" | "open_url" | "whatsapp";
    payload: string;
  }[];
  trigger_lead_capture?: boolean;
}

export abstract class BaseAgent {
  abstract name: string;
  abstract handle(message: string, memory: ConversationMemory): AgentResponse | null;
}
