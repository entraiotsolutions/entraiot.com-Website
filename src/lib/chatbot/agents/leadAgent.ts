/**
 * agents/leadAgent.ts
 */

import { BaseAgent, AgentResponse } from "./baseAgent";
import { ConversationMemory } from "../../conversationMemory";

export class LeadAgent extends BaseAgent {
  name = "LeadAgent";

  handle(message: string, memory: ConversationMemory): AgentResponse | null {
    if (memory.intent !== "LEADS") return null;

    // Conversion Push Logic
    if (memory.message_count >= 3 && !memory.lead_captured) {
      return {
        reply: "I've analyzed your needs. Want me to create a custom lead generation plan for your business?",
        ctas: [
          { label: "Yes, create plan", action: "open_lead_form", payload: "lead_plan" },
          { label: "Show Demo", action: "send_message", payload: "Show me a demo" }
        ]
      };
    }

    // Anti-Repeat / Rephrasing Logic
    const isRepeat = memory.last_intent === "LEADS";
    
    if (!memory.business_type) {
      const mainReply = isRepeat 
        ? "To give you the best strategy, I need to know your field. Which industry are you in?"
        : "Great choice 🚀 Getting consistent leads is the biggest growth driver.\n\n" +
          "• Capture leads automatically from ads & website\n" +
          "• Instant WhatsApp follow-ups\n" +
          "• AI filters serious buyers\n" +
          "• No missed opportunities\n\n" +
          "Which industry are you in?";

      return {
        reply: mainReply,
        ctas: [
          { label: "Real Estate", action: "send_message", payload: "I am in Real Estate" },
          { label: "Retail", action: "send_message", payload: "Retail business" },
          { label: "Marketing", action: "send_message", payload: "Marketing agency" },
          { label: "Other", action: "send_message", payload: "Something else" }
        ]
      };
    }

    // Context-aware response
    const industry = memory.business_type;
    let industryNote = "";
    if (industry === "Real Estate") industryNote = "We specialize in property leads and automated site visit scheduling.";
    if (industry === "Retail") industryNote = "Our AI helps convert store visitors and online browsers into loyal customers.";
    if (industry === "Marketing") industryNote = "We can automate your client qualification and meeting bookings.";

    return {
      reply: `Excellent. For ${industry}, ${industryNote} Should I show you how this works in your industry?`,
      trigger_lead_capture: true,
      ctas: [
        { label: "Yes, show me", action: "open_lead_form", payload: "lead_demo" },
        { label: "Contact Expert", action: "whatsapp", payload: "919944442061" }
      ]
    };
  }
}
