/**
 * agents/costAgent.ts
 */

import { BaseAgent, AgentResponse } from "./baseAgent";
import { ConversationMemory } from "../../conversationMemory";

export class CostAgent extends BaseAgent {
  name = "CostAgent";

  handle(message: string, memory: ConversationMemory): AgentResponse | null {
    if (memory.intent !== "COST") return null;

    // Conversion Push Logic
    if (memory.message_count >= 3 && !memory.lead_captured) {
      return {
        reply: "I can build a custom cost-reduction plan for you. Ready to see the numbers?",
        ctas: [
          { label: "Get My Plan", action: "open_lead_form", payload: "cost_plan" },
          { label: "Talk to ROI Expert", action: "whatsapp", payload: "919944442061" }
        ]
      };
    }

    // Anti-Repeat / Rephrasing Logic
    const isRepeat = memory.last_intent === "COST";
    const mainReply = isRepeat
      ? "Efficiency is the key to profitability. Which area is costing you the most right now?"
      : "Smart move 💰 Reducing operational cost directly increases profit.\n\n" +
        "• Identify hidden inefficiencies\n" +
        "• Reduce manpower dependency\n" +
        "• Optimize operations\n" +
        "• Save 20–40% monthly costs\n\n" +
        "Where are you spending the most currently?";

    return {
      reply: mainReply,
      ctas: [
        { label: "Manpower", action: "send_message", payload: "High labor costs" },
        { label: "Marketing", action: "send_message", payload: "High ad spend" },
        { label: "Operations", action: "send_message", payload: "General overhead" }
      ]
    };
  }
}
