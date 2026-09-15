/**
 * agents/automationAgent.ts
 */

import { BaseAgent, AgentResponse } from "./baseAgent";
import { ConversationMemory } from "../../conversationMemory";

export class AutomationAgent extends BaseAgent {
  name = "AutomationAgent";

  handle(message: string, memory: ConversationMemory): AgentResponse | null {
    if (memory.intent !== "AUTOMATION") return null;

    // Conversion Push Logic
    if (memory.message_count >= 3 && !memory.lead_captured) {
      return {
        reply: "We can set this up for you — want a quick demo of our automation suite?",
        ctas: [
          { label: "Book Demo", action: "open_lead_form", payload: "automation_demo" },
          { label: "WhatsApp Expert", action: "whatsapp", payload: "919944442061" }
        ]
      };
    }

    // Anti-Repeat / Rephrasing Logic
    const isRepeat = memory.last_intent === "AUTOMATION";
    const mainReply = isRepeat
      ? "Scaling faster requires the right systems. Which specific workflow should we automate first?"
      : "Perfect ⚙️ Automation is how businesses scale faster.\n\n" +
        "• Automate repetitive tasks\n" +
        "• Reduce manual work\n" +
        "• Improve speed & accuracy\n" +
        "• 24/7 operations\n\n" +
        "What part of your business do you want to automate?";

    return {
      reply: mainReply,
      ctas: [
        { label: "Lead Follow-up", action: "send_message", payload: "Automate follow-ups" },
        { label: "Inventory/Ops", action: "send_message", payload: "Automate operations" },
        { label: "Customer Support", action: "send_message", payload: "Automate support" }
      ]
    };
  }
}
