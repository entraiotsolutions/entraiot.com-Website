/**
 * responseEngine.ts
 * Formats final responses and implements anti-repetition logic.
 */

import { ChatMemory } from "./memory";

export interface FinalResponse {
  reply: string;
  buttons: string[];
}

export function generateFinalResponse(
  reply: string,
  buttons: string[],
  memory: ChatMemory
): FinalResponse {
  let finalReply = reply;

  // Anti-repeat system
  if (reply === memory.last_reply) {
    finalReply = "Let me tailor this better — can you share more details about your specific situation?";
  }

  return {
    reply: finalReply,
    buttons: buttons
  };
}
