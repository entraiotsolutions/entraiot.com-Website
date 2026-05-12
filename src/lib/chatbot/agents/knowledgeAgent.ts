/**
 * agents/knowledgeAgent.ts
 */

import { BaseAgent, AgentResponse } from "./baseAgent";
import { ConversationMemory } from "../../conversationMemory";
import { KnowledgeBaseEngine } from "../knowledgeBase";

export class KnowledgeAgent extends BaseAgent {
  name = "KnowledgeAgent";
  private kb: KnowledgeBaseEngine;

  constructor(kb: KnowledgeBaseEngine) {
    super();
    this.kb = kb;
  }

  handle(message: string, memory: ConversationMemory): AgentResponse | null {
    const result = this.kb.search(message);
    if (!result) return null;

    return {
      reply: `That's a great question. ${result.entry.answer}\n\nWould you like to see how this specifically applies to your business model?`,
      ctas: [
        { label: "Show me how", action: "send_message", payload: "How does this apply to me?" },
        { label: "I want more leads", action: "send_message", payload: "I want more leads" },
        { label: "Contact Expert", action: "whatsapp", payload: "919944442061" }
      ]
    };
  }
}
