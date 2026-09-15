import flows from "@/data/flows.json";
import type { ConversationMemory } from "./conversationMemory";

export interface FlowResult {
  reply: string;
  ctas?: {
    label: string;
    action: "send_message" | "open_lead_form" | "open_url" | "whatsapp";
    payload: string;
  }[];
  trigger_lead_capture?: boolean;
}

export function runFlow(memory: ConversationMemory): FlowResult {
  const { intent, business_type, stage } = memory;

  // LEADS Intent Logic
  if (intent === "LEADS") {
    if (!business_type) {
      return { 
        reply: flows.LEADS.ask_business_type,
        ctas: [
          { label: "Real Estate", action: "send_message", payload: "I am in Real Estate" },
          { label: "IT Services", action: "send_message", payload: "I run an IT agency" },
          { label: "Healthcare", action: "send_message", payload: "Healthcare business" },
          { label: "Manufacturing", action: "send_message", payload: "Manufacturing" },
          { label: "Logistics", action: "send_message", payload: "Logistics & Fleet" },
          { label: "Retail", action: "send_message", payload: "Retail/Ecommerce" }
        ]
      };
    }

    // Default to the first industry pitch if specific pitch is not available in flows.json
    const industryData = (flows.LEADS.industries as Record<string, any>)[business_type];

    if (industryData) {
      return {
        reply: `Perfect. For ${business_type.replace('_', ' ')}, we typically provide:\n\n${industryData.pitch.map((p: string) => "• " + p).join("\n")}\n\n${industryData.cta}`,
        trigger_lead_capture: true,
        ctas: [
          { label: "Get My AI Plan", action: "open_lead_form", payload: "ai_plan" },
          { label: "Talk to Expert", action: "whatsapp", payload: "919944442061" }
        ]
      };
    } else {
      // Generic pitch if business type not explicitly in JSON
      return {
        reply: `Perfect. For your industry, we typically provide:\n\n• AI lead generation funnels\n• Automated follow-ups\n• Smart dashboards\n\nWant to see how we can generate more enquiries for you?`,
        trigger_lead_capture: true,
        ctas: [
          { label: "Yes, show me", action: "open_lead_form", payload: "generic_pitch" },
          { label: "Contact Us", action: "whatsapp", payload: "919944442061" }
        ]
      };
    }
  }

  // AUTOMATION Intent Logic
  if (intent === "AUTOMATION") {
    return { 
      reply: flows.AUTOMATION.ask_goal,
      ctas: [
        { label: "Lead Capture", action: "send_message", payload: "Automate lead capture" },
        { label: "Customer Support", action: "send_message", payload: "Automate support" },
        { label: "Workflows", action: "send_message", payload: "Automate internal workflows" }
      ]
    };
  }

  // COST Intent Logic
  if (intent === "COST") {
    return { 
      reply: flows.COST.ask_area,
      ctas: [
        { label: "Marketing Cost", action: "send_message", payload: "Reduce marketing spend" },
        { label: "Operations Cost", action: "send_message", payload: "Reduce operations cost" }
      ]
    };
  }

  // EXPLORE Intent Logic
  if (intent === "EXPLORE") {
    return {
      reply: `${flows.EXPLORE.intro}\n\nHere’s what you can achieve:\n${flows.EXPLORE.benefits.map((b: string) => "• " + b).join("\n")}`,
      ctas: [
        { label: "Get More Leads", action: "send_message", payload: "I want more leads" },
        { label: "Automate Operations", action: "send_message", payload: "I want automation" }
      ]
    };
  }

  // Fallback Logic
  return {
    reply: "I can help you get more leads, automate your workflows, or reduce operational costs. What's your main priority right now?",
    ctas: [
      { label: "Get Leads", action: "send_message", payload: "I want more leads" },
      { label: "Automate Work", action: "send_message", payload: "I want to automate" },
      { label: "Reduce Costs", action: "send_message", payload: "How to reduce costs?" }
    ]
  };
}