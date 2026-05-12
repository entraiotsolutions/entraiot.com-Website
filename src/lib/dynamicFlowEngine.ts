/**
 * dynamicFlowEngine.ts
 * ─────────────────────────────────────────────────────────────
 * Rule-Based Decision Logic Layer (NO fixed step arrays)
 *
 * Each rule function receives the current ConversationMemory and
 * returns a FlowDecision that tells the response generator:
 *   - what raw_text to base the response on
 *   - which CTAs to suggest
 *   - what stage transition to apply
 *   - whether to trigger lead capture
 *   - the updated lead_score delta
 * ─────────────────────────────────────────────────────────────
 */

import type { ConversationMemory, ConversationStage } from "./conversationMemory";
import type { Intent, BusinessType } from "./intentDetector";

// ══════════════════════════════════════════════════════════════
// Types
// ══════════════════════════════════════════════════════════════

export interface CTA {
  label: string;
  action: "send_message" | "open_lead_form" | "open_url" | "whatsapp";
  payload: string;
}

export interface FlowDecision {
  /** Raw context text to feed the response generator */
  context: string;
  /** Suggested quick-action CTAs to show */
  ctas: CTA[];
  /** Stage to transition to after this response */
  next_stage: ConversationStage;
  /** Should the lead capture form open? */
  trigger_lead_capture: boolean;
  /** Score delta to apply */
  score_delta: number;
}

// ══════════════════════════════════════════════════════════════
// Industry-Specific Pitch Data
// ══════════════════════════════════════════════════════════════

const INDUSTRY_PITCHES: Record<BusinessType, { bullets: string[]; result: string }> = {
  real_estate: {
    bullets: [
      "Capture leads automatically from ads & website",
      "Instant WhatsApp follow-ups within 5 seconds",
      "AI-powered buyer qualification",
      "Auto-schedule site visits",
    ],
    result: "Faster deal closures & 2x more property enquiries",
  },
  healthcare: {
    bullets: [
      "Automated patient appointment scheduling",
      "AI-driven health query responses 24/7",
      "Smart reminder & follow-up system",
      "Real-time patient engagement dashboards",
    ],
    result: "30% fewer no-shows, better patient experience",
  },
  it_services: {
    bullets: [
      "AI-powered lead generation funnels",
      "Automated WhatsApp & email follow-ups",
      "Smart dashboards for pipeline tracking",
      "AI chatbot for instant client query handling",
    ],
    result: "2x–5x revenue growth within 3 months",
  },
  retail: {
    bullets: [
      "Automated customer re-engagement campaigns",
      "Smart inventory & restock alerts",
      "AI-powered upsell recommendations",
      "Real-time sales tracking dashboard",
    ],
    result: "20–35% increase in repeat purchases",
  },
  manufacturing: {
    bullets: [
      "IoT-based machine health monitoring",
      "Predictive maintenance to reduce downtime",
      "Automated production & quality reports",
      "Real-time OEE dashboards",
    ],
    result: "25–40% reduction in unplanned downtime",
  },
  logistics: {
    bullets: [
      "Real-time fleet & shipment tracking",
      "Automated delivery notifications",
      "Route optimisation with AI",
      "Live inventory & warehouse dashboards",
    ],
    result: "15–30% reduction in delivery costs",
  },
  other: {
    bullets: [
      "Custom AI lead generation system",
      "Automated customer follow-up sequences",
      "Workflow automation for any process",
      "Smart business performance dashboards",
    ],
    result: "Tailored to your exact business needs",
  },
};

// ══════════════════════════════════════════════════════════════
// CTA Presets
// ══════════════════════════════════════════════════════════════

const CTA_GET_PLAN: CTA = {
  label: "🚀 Get My Custom AI Plan",
  action: "open_lead_form",
  payload: "get_plan",
};

const CTA_BOOK_DEMO: CTA = {
  label: "📊 Book a Live Demo",
  action: "send_message",
  payload: "I want to book a demo",
};

const CTA_WHATSAPP: CTA = {
  label: "💬 Chat on WhatsApp",
  action: "whatsapp",
  payload: "Hi Entraiot team, I need help with AI automation.",
};

const CTA_TALK_EXPERT: CTA = {
  label: "📞 Talk to an Expert",
  action: "send_message",
  payload: "I want to talk to an expert",
};

const CTA_PRICING: CTA = {
  label: "💰 See Pricing Plans",
  action: "send_message",
  payload: "What are your pricing plans?",
};

const CTA_INDUSTRY: CTA = {
  label: "🏢 My Business Type",
  action: "send_message",
  payload: "Let me tell you about my business",
};

// ══════════════════════════════════════════════════════════════
// Rule Engine
// ══════════════════════════════════════════════════════════════

function buildIndustryPitchContext(biz: BusinessType): string {
  const pitch = INDUSTRY_PITCHES[biz];
  return (
    `For your industry, here's what we typically deliver:\n` +
    pitch.bullets.map((b) => `• ${b}`).join("\n") +
    `\n\n💡 Typical result: ${pitch.result}`
  );
}

/**
 * Core rule engine — returns a FlowDecision based on memory state.
 * Order matters: rules are evaluated top-to-bottom, first match wins.
 */
export function runFlowEngine(memory: ConversationMemory, userMessage: string): FlowDecision {
  const { intent, stage, business_type, urgency, lead_captured, lead_score } = memory;

  // ─── RULE 0: Lead already captured → thank + upsell ──────
  if (lead_captured) {
    return {
      context:
        "The user has already submitted their contact details. Thank them warmly, " +
        "confirm that our team will reach out within 2 hours, and offer to answer " +
        "any remaining questions or show them a demo.",
      ctas: [CTA_BOOK_DEMO, CTA_WHATSAPP],
      next_stage: "closed",
      trigger_lead_capture: false,
      score_delta: 0,
    };
  }

  // ─── RULE 1: GREETING intent ──────────────────────────────
  if (intent === "GREETING" && stage === "start") {
    return {
      context:
        "The user just said hello. Greet them warmly as the Entraiot AI Growth Assistant. " +
        "Ask what brought them here today — are they looking to generate more leads, " +
        "automate their business, reduce costs, or just exploring AI & IoT solutions?",
      ctas: [
        { label: "🚀 More Leads", action: "send_message", payload: "I want more leads" },
        { label: "⚙️ Automate My Business", action: "send_message", payload: "I want to automate" },
        { label: "💰 Reduce Costs", action: "send_message", payload: "I want to reduce costs" },
        { label: "👀 Just Exploring", action: "send_message", payload: "I am just exploring" },
      ],
      next_stage: "qualification",
      trigger_lead_capture: false,
      score_delta: 0,
    };
  }

  // ─── RULE 2: LEADS intent — no business type yet ─────────
  if (intent === "LEADS" && !business_type && stage !== "cta") {
    return {
      context:
        "The user wants to generate more leads. Express enthusiasm and ask what type of " +
        "business they run so you can give them an industry-specific solution.",
      ctas: [
        { label: "🏠 Real Estate", action: "send_message", payload: "I am in real estate" },
        { label: "🏥 Healthcare", action: "send_message", payload: "I am in healthcare" },
        { label: "💻 IT / Software", action: "send_message", payload: "I am in IT services" },
        { label: "🛍️ Retail", action: "send_message", payload: "I am in retail" },
        { label: "🏭 Manufacturing", action: "send_message", payload: "I am in manufacturing" },
        { label: "🏢 Other", action: "send_message", payload: "Other business type" },
      ],
      next_stage: "qualification",
      trigger_lead_capture: false,
      score_delta: 3,
    };
  }

  // ─── RULE 3: LEADS intent WITH business type ─────────────
  if (intent === "LEADS" && business_type) {
    const pitchCtx = buildIndustryPitchContext(business_type as BusinessType);
    return {
      context:
        `${pitchCtx}\n\n` +
        "After sharing this, ask if they are currently getting enough enquiries and " +
        "guide them toward getting a custom AI strategy plan.",
      ctas: [CTA_GET_PLAN, CTA_BOOK_DEMO, CTA_TALK_EXPERT],
      next_stage: "pitch",
      trigger_lead_capture: false,
      score_delta: 5,
    };
  }

  // ─── RULE 4: Business type identified (any intent) ───────
  if (business_type && stage === "qualification") {
    const pitchCtx = buildIndustryPitchContext(business_type as BusinessType);
    return {
      context:
        `${pitchCtx}\n\n` +
        "Show them the industry-specific results and ask if this matches what they need.",
      ctas: [CTA_GET_PLAN, CTA_BOOK_DEMO, CTA_TALK_EXPERT],
      next_stage: "pitch",
      trigger_lead_capture: false,
      score_delta: 5,
    };
  }

  // ─── RULE 5: AUTOMATION intent ────────────────────────────
  if (intent === "AUTOMATION") {
    return {
      context:
        "The user wants to automate their business processes. Explain that Entraiot " +
        "automates: lead capture, WhatsApp follow-ups, customer query handling, internal " +
        "workflows, and reporting. Ask what they want to automate most — lead handling, " +
        "customer support, or internal operations.",
      ctas: [
        { label: "🎯 Lead Handling", action: "send_message", payload: "Automate lead handling" },
        { label: "💬 Customer Support", action: "send_message", payload: "Automate customer support" },
        { label: "⚙️ Internal Ops", action: "send_message", payload: "Automate internal operations" },
        CTA_GET_PLAN,
      ],
      next_stage: "pitch",
      trigger_lead_capture: false,
      score_delta: 5,
    };
  }

  // ─── RULE 6: COST / PRICING intent ───────────────────────
  if (intent === "COST") {
    return {
      context:
        "The user is asking about pricing or ROI. Explain that Entraiot offers customised " +
        "pricing based on business size and requirements. Mention that most clients see ROI " +
        "within 60–90 days. Typical investment starts at ₹15,000/month for basic automation. " +
        "Encourage them to get a free custom quote by sharing their details.",
      ctas: [CTA_GET_PLAN, CTA_TALK_EXPERT, CTA_WHATSAPP],
      next_stage: "cta",
      trigger_lead_capture: false,
      score_delta: 10,
    };
  }

  // ─── RULE 7: DEMO intent ──────────────────────────────────
  if (intent === "DEMO") {
    return {
      context:
        "The user wants to see a demo. Act as a real AI assistant and ask them what they " +
        "are looking for today to begin the interactive demo. Show them how seamless " +
        "and intelligent AI automation feels for their business.",
      ctas: [
        { label: "Leads", action: "send_message", payload: "I want more leads" },
        { label: "Automation", action: "send_message", payload: "I want to automate" },
        CTA_GET_PLAN
      ],
      next_stage: "cta",
      trigger_lead_capture: false,
      score_delta: 20,
    };
  }

  // ─── RULE 8: CONTACT intent ───────────────────────────────
  if (intent === "CONTACT") {
    return {
      context:
        "The user wants to get in touch or speak to the team. Offer multiple contact " +
        "options: WhatsApp for instant response, booking a free 15-min strategy call, " +
        "or submitting their details for a callback within 2 hours.",
      ctas: [CTA_WHATSAPP, CTA_GET_PLAN, CTA_TALK_EXPERT],
      next_stage: "cta",
      trigger_lead_capture: false,
      score_delta: 10,
    };
  }

  // ─── RULE 9: High urgency → prioritise conversion ─────────
  if (urgency === "high" && stage !== "cta" && !lead_captured) {
    return {
      context:
        "The user has high urgency — they need a solution now. Acknowledge their urgency " +
        "with empathy and immediately offer to create a custom plan for them. " +
        "Emphasise that Entraiot can have a solution live within 7–14 days.",
      ctas: [CTA_GET_PLAN, CTA_WHATSAPP],
      next_stage: "cta",
      trigger_lead_capture: true,
      score_delta: 15,
    };
  }

  // ─── RULE 10: In pitch stage → push to CTA ────────────────
  if (stage === "pitch" && (lead_score || 0) >= 15) {
    return {
      context:
        "The user has shown strong interest. Push them toward conversion. Ask if they " +
        "want a custom AI strategy plan — it's free and tailored to their business. " +
        "Create urgency: only 5 onboarding slots available this week.",
      ctas: [CTA_GET_PLAN, CTA_BOOK_DEMO, CTA_WHATSAPP],
      next_stage: "cta",
      trigger_lead_capture: true,
      score_delta: 10,
    };
  }

  // ─── RULE 11: In CTA stage → capture lead ─────────────────
  if (stage === "cta" && !lead_captured) {
    return {
      context:
        "The user is ready to take action. Ask where you should send their free AI " +
        "strategy plan — just need their name, email, and phone number.",
      ctas: [CTA_GET_PLAN, CTA_WHATSAPP],
      next_stage: "lead_capture",
      trigger_lead_capture: true,
      score_delta: 5,
    };
  }

  // ─── RULE 12: EXPLORE intent ──────────────────────────────
  if (intent === "EXPLORE") {
    return {
      context:
        "The user is exploring. Give them an exciting overview of how Entraiot helps " +
        "businesses: generate leads automatically, automate daily operations, and reduce " +
        "costs by 20–40%. Ask which area interests them most.",
      ctas: [
        { label: "🚀 Generate More Leads", action: "send_message", payload: "I want more leads" },
        { label: "⚙️ Automate Operations", action: "send_message", payload: "I want automation" },
        { label: "💰 Reduce Costs", action: "send_message", payload: "I want to reduce costs" },
        CTA_BOOK_DEMO,
      ],
      next_stage: "qualification",
      trigger_lead_capture: false,
      score_delta: 3,
    };
  }

  // ─── RULE 13: No industry identified yet (general message) ─
  if (!business_type && stage === "qualification") {
    return {
      context:
        "The user has sent a general message. Acknowledge it briefly and ask about " +
        "their business type so you can give them a relevant solution.",
      ctas: [CTA_INDUSTRY, CTA_GET_PLAN, CTA_WHATSAPP],
      next_stage: "qualification",
      trigger_lead_capture: false,
      score_delta: 2,
    };
  }

  // ─── DEFAULT: Soft nudge toward value ─────────────────────
  return {
    context:
      "Provide a helpful, concise answer to the user's message in the context of " +
      "Entraiot's AI & IoT solutions. After answering, gently guide them toward " +
      "understanding how Entraiot can specifically help their business.",
    ctas: [CTA_GET_PLAN, CTA_BOOK_DEMO, CTA_PRICING],
    next_stage: stage,
    trigger_lead_capture: false,
    score_delta: 1,
  };
}
