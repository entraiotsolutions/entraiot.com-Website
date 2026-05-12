// ─────────────────────────────────────────────────────────────
// Entraiot Visitors-to-Lead Chatbot — Full Conversation Tree
// ─────────────────────────────────────────────────────────────

export type NodeType =
  | "bot"        // bot speaks, auto-advance to next
  | "buttons"    // bot speaks + shows button choices
  | "input"      // bot asks for typed input (number / text)
  | "lead_form"  // capture name + phone
  | "end";       // terminal node

export interface ChatButton {
  label: string;
  next: string;
  emoji?: string;
}

export interface ChatNode {
  id: string;
  type: NodeType;
  messages: string[];          // one or more consecutive bot messages
  buttons?: ChatButton[];
  inputPlaceholder?: string;
  inputNext?: string;          // node after text input submitted
  inputKey?: string;           // key to store typed value in leadData
  autoNext?: string;           // for type="bot", auto-proceed to this node
}

// ─── Industry solutions copy ─────────────────────────────────

const INDUSTRY_FLOWS: Record<string, { solutions: string[]; growth: string; nextNode: string }> = {
  "real_estate": {
    solutions: [
      "✅ Auto lead capture from ads & website",
      "✅ Instant WhatsApp follow-ups",
      "✅ AI qualification of buyers",
      "✅ Site visit scheduling",
    ],
    growth: "💡 Result: Faster deal closure & more site visits",
    nextNode: "re_check",
  },
  "healthcare": {
    solutions: [
      "✅ Patient appointment automation",
      "✅ AI-driven health query responses",
      "✅ Smart reminder & follow-up system",
      "✅ Real-time patient dashboards",
    ],
    growth: "💡 Result: 30% reduction in no-shows, better engagement",
    nextNode: "generic_check",
  },
  "it_services": {
    solutions: [
      "✅ AI lead generation funnels",
      "✅ WhatsApp automated follow-ups",
      "✅ Smart dashboards for tracking",
      "✅ AI chatbot for client queries",
    ],
    growth: "💡 Expected growth: 2x–5x in 3 months",
    nextNode: "it_response_check",
  },
  "retail": {
    solutions: [
      "✅ Automated customer re-engagement",
      "✅ Smart inventory & restock alerts",
      "✅ AI-powered upsell recommendations",
      "✅ Real-time sales tracking dashboard",
    ],
    growth: "💡 Result: 20–35% increase in repeat purchases",
    nextNode: "generic_check",
  },
  "other": {
    solutions: [
      "✅ Custom AI lead generation",
      "✅ Automated customer follow-ups",
      "✅ Workflow automation",
      "✅ Smart business dashboards",
    ],
    growth: "💡 Result: Tailored to your exact business needs",
    nextNode: "generic_check",
  },
};

// ─── Helper: build industry solution node ───────────────────

function industryNode(id: string, industry: string, nextNode: string): ChatNode {
  const data = INDUSTRY_FLOWS[industry];
  return {
    id,
    type: "bot",
    messages: [
      data.solutions.join("\n") + "\n\n" + data.growth,
    ],
    autoNext: nextNode,
  };
}

// ─────────────────────────────────────────────────────────────
// THE FULL FLOW MAP
// ─────────────────────────────────────────────────────────────

const flows: Record<string, ChatNode> = {

  // ══════════════════════════════════════════════
  // ENTRY
  // ══════════════════════════════════════════════
  greeting: {
    id: "greeting",
    type: "buttons",
    messages: [
      "Hi there! 👋",
      "I can help you grow your business using AI & IoT.\n\nWhat brings you here today?",
    ],
    buttons: [
      { label: "I want more leads",        emoji: "🚀", next: "leads_industry" },
      { label: "I want automation",        emoji: "⚙️", next: "auto_what" },
      { label: "Reduce operational cost",  emoji: "💰", next: "cost_where" },
      { label: "Just exploring",           emoji: "👀", next: "explore_value" },
    ],
  },

  // ══════════════════════════════════════════════
  // FLOW 1 — JUST EXPLORING
  // ══════════════════════════════════════════════
  explore_value: {
    id: "explore_value",
    type: "bot",
    messages: [
      "That's great 😊\nLet me quickly show how AI & IoT can help businesses like yours.",
      "Here's what most businesses achieve with us:\n\n🚀 Generate leads automatically\n⚙️ Automate daily operations\n💰 Reduce costs by 20–40%",
    ],
    autoNext: "explore_cta",
  },

  explore_cta: {
    id: "explore_cta",
    type: "buttons",
    messages: ["Want to see how this works for your business?"],
    buttons: [
      { label: "Yes, show me", emoji: "✅", next: "explore_industry" },
      { label: "Maybe later",  emoji: "🕐", next: "explore_later" },
    ],
  },

  explore_later: {
    id: "explore_later",
    type: "buttons",
    messages: [
      "No worries! Whenever you're ready, we're here 😊",
      "Meanwhile, here are a few quick options:",
    ],
    buttons: [
      { label: "Show demo",          emoji: "📊", next: "demo_start" },
      { label: "Learn more",         emoji: "📖", next: "explore_value" },
      { label: "WhatsApp instant help", emoji: "💬", next: "whatsapp_cta" },
    ],
  },

  explore_industry: {
    id: "explore_industry",
    type: "buttons",
    messages: ["Awesome 👍 What type of business are you in?"],
    buttons: [
      { label: "Real Estate",  emoji: "🏠", next: "explore_sol_re" },
      { label: "Healthcare",   emoji: "🏥", next: "explore_sol_health" },
      { label: "IT Services",  emoji: "💻", next: "explore_sol_it" },
      { label: "Retail",       emoji: "🛍️", next: "explore_sol_retail" },
      { label: "Other",        emoji: "🏢", next: "explore_sol_other" },
    ],
  },

  explore_sol_re: {
    ...industryNode("explore_sol_re", "real_estate", "it_response_check"),
  },
  explore_sol_health: {
    ...industryNode("explore_sol_health", "healthcare", "it_response_check"),
  },
  explore_sol_it: {
    ...industryNode("explore_sol_it", "it_services", "it_response_check"),
  },
  explore_sol_retail: {
    ...industryNode("explore_sol_retail", "retail", "it_response_check"),
  },
  explore_sol_other: {
    ...industryNode("explore_sol_other", "other", "it_response_check"),
  },

  it_response_check: {
    id: "it_response_check",
    type: "buttons",
    messages: [
      "Most businesses lose leads because they reply late.\n\n👉 Want to check if that's happening to you?",
    ],
    buttons: [
      { label: "Yes, check now", emoji: "✅", next: "response_speed" },
      { label: "Not sure",       emoji: "🤔", next: "create_plan_cta" },
    ],
  },

  response_speed: {
    id: "response_speed",
    type: "buttons",
    messages: ["How quickly do you respond to new leads?"],
    buttons: [
      { label: "Within 5 mins", emoji: "⚡", next: "fast_responder" },
      { label: "5–30 mins",     emoji: "🕐", next: "medium_responder" },
      { label: "30+ mins",      emoji: "🐢", next: "slow_responder" },
    ],
  },

  fast_responder: {
    id: "fast_responder",
    type: "bot",
    messages: [
      "Impressive! ⚡ You're already ahead.\n\nWith our AI, you can respond in under 1 second — 24/7 — and increase conversions by 2x.",
    ],
    autoNext: "create_plan_cta",
  },

  medium_responder: {
    id: "medium_responder",
    type: "bot",
    messages: [
      "That's decent — but AI can bring this to under 5 seconds automatically.\n\n⚠️ You could still be losing 20–30% of leads in that gap.",
    ],
    autoNext: "create_plan_cta",
  },

  slow_responder: {
    id: "slow_responder",
    type: "bot",
    messages: [
      "That's where most leads drop off ⚠️\n\nYou could be losing 30–50% of potential clients just from slow response time.",
      "We fix this using instant AI responses + automation — so you never miss a lead again.",
    ],
    autoNext: "create_plan_cta",
  },

  create_plan_cta: {
    id: "create_plan_cta",
    type: "buttons",
    messages: [
      "Want a custom AI strategy plan for your business?",
      "⚡ We're onboarding only 5 clients this week\n🔥 Free consultation slots filling fast",
    ],
    buttons: [
      { label: "Yes, create my plan", emoji: "🚀", next: "lead_capture" },
      { label: "Show demo",           emoji: "📊", next: "demo_start" },
      { label: "Talk to expert",      emoji: "📞", next: "expert_cta" },
    ],
  },

  // ══════════════════════════════════════════════
  // FLOW 2 — MORE LEADS
  // ══════════════════════════════════════════════
  leads_industry: {
    id: "leads_industry",
    type: "buttons",
    messages: ["Great choice 🚀\n\nWe help businesses generate leads using AI automation.\n\n👉 What's your business?"],
    buttons: [
      { label: "Real Estate",  emoji: "🏠", next: "leads_sol_re" },
      { label: "Healthcare",   emoji: "🏥", next: "leads_sol_health" },
      { label: "IT Services",  emoji: "💻", next: "leads_sol_it" },
      { label: "Retail",       emoji: "🛍️", next: "leads_sol_retail" },
      { label: "Other",        emoji: "🏢", next: "leads_sol_other" },
    ],
  },

  leads_sol_re: {
    ...industryNode("leads_sol_re", "real_estate", "re_check"),
  },
  leads_sol_health: {
    ...industryNode("leads_sol_health", "healthcare", "generic_check"),
  },
  leads_sol_it: {
    ...industryNode("leads_sol_it", "it_services", "generic_check"),
  },
  leads_sol_retail: {
    ...industryNode("leads_sol_retail", "retail", "generic_check"),
  },
  leads_sol_other: {
    ...industryNode("leads_sol_other", "other", "generic_check"),
  },

  re_check: {
    id: "re_check",
    type: "buttons",
    messages: ["Are you currently getting enough property enquiries?"],
    buttons: [
      { label: "Yes",  emoji: "✅", next: "re_yes" },
      { label: "No",   emoji: "❌", next: "re_no" },
    ],
  },

  re_yes: {
    id: "re_yes",
    type: "bot",
    messages: [
      "Great! 🎉 Let's make sure you're converting them too.\n\nWith AI qualification and instant follow-ups, you can close 2x more deals from the same leads.",
    ],
    autoNext: "create_plan_cta",
  },

  re_no: {
    id: "re_no",
    type: "buttons",
    messages: ["That means your funnel is missing automation.\n\n👉 Want to see how we fix it?"],
    buttons: [
      { label: "Show demo",    emoji: "📊", next: "demo_start" },
      { label: "Create plan",  emoji: "🚀", next: "lead_capture" },
    ],
  },

  generic_check: {
    id: "generic_check",
    type: "buttons",
    messages: ["Does this sound like what you need?\n\n👉 What would you like to do next?"],
    buttons: [
      { label: "Get my AI plan",    emoji: "🚀", next: "lead_capture" },
      { label: "Show demo",         emoji: "📊", next: "demo_start" },
      { label: "Talk to expert",    emoji: "📞", next: "expert_cta" },
    ],
  },

  // ══════════════════════════════════════════════
  // FLOW 3 — AUTOMATION
  // ══════════════════════════════════════════════
  auto_what: {
    id: "auto_what",
    type: "buttons",
    messages: ["Nice ⚙️\n\nAutomation is where businesses save the most time.\n\nWhat do you want to automate?"],
    buttons: [
      { label: "Lead handling",    emoji: "🎯", next: "auto_leads" },
      { label: "Customer support", emoji: "💬", next: "auto_support" },
      { label: "Operations",       emoji: "🏭", next: "auto_ops" },
      { label: "All of the above", emoji: "💯", next: "auto_all" },
    ],
  },

  auto_leads: {
    id: "auto_leads",
    type: "bot",
    messages: [
      "Smart! 🎯\n\nWe automate:\n✅ Lead capture from all sources\n✅ Instant WhatsApp follow-ups\n✅ AI qualification scoring\n✅ CRM auto-update",
    ],
    autoNext: "auto_savings_prompt",
  },

  auto_support: {
    id: "auto_support",
    type: "bot",
    messages: [
      "Great choice 💬\n\nWe automate:\n✅ 24/7 AI customer query handling\n✅ Smart FAQ responses\n✅ Escalation to human when needed\n✅ Multi-channel (WhatsApp, web, email)",
    ],
    autoNext: "auto_savings_prompt",
  },

  auto_ops: {
    id: "auto_ops",
    type: "bot",
    messages: [
      "Excellent 🏭\n\nWe automate:\n✅ Internal workflow triggers\n✅ Report generation\n✅ Task assignments\n✅ Real-time monitoring dashboards",
    ],
    autoNext: "auto_savings_prompt",
  },

  auto_all: {
    id: "auto_all",
    type: "bot",
    messages: [
      "Perfect choice 💯\n\nWe automate everything:\n✅ Lead capture & follow-ups\n✅ Customer queries\n✅ Internal workflows\n\n💡 Most businesses save 30–40% of their time after full automation.",
    ],
    autoNext: "auto_savings_prompt",
  },

  auto_savings_prompt: {
    id: "auto_savings_prompt",
    type: "buttons",
    messages: ["Want to calculate how much your business can save?"],
    buttons: [
      { label: "Yes, calculate!", emoji: "💰", next: "auto_emp_input" },
      { label: "Skip",            emoji: "⏭️", next: "create_plan_cta" },
    ],
  },

  auto_emp_input: {
    id: "auto_emp_input",
    type: "input",
    messages: ["How many employees do you have?"],
    inputPlaceholder: "e.g. 10",
    inputKey: "employees",
    inputNext: "auto_savings_result",
  },

  auto_savings_result: {
    id: "auto_savings_result",
    type: "buttons",
    messages: ["Based on your team size, you could save:\n\n💰 ₹40,000–₹80,000/month\n⏱️ 30–40% of manual work hours"],
    buttons: [
      { label: "Get my full plan", emoji: "🚀", next: "lead_capture" },
      { label: "Talk to expert",   emoji: "📞", next: "expert_cta" },
    ],
  },

  // ══════════════════════════════════════════════
  // FLOW 4 — COST REDUCTION
  // ══════════════════════════════════════════════
  cost_where: {
    id: "cost_where",
    type: "buttons",
    messages: ["Smart move 💰\n\nMost businesses overspend due to manual processes.\n\nWhere do you spend the most?"],
    buttons: [
      { label: "Salaries",    emoji: "👨‍💼", next: "cost_salaries" },
      { label: "Marketing",   emoji: "📣",  next: "cost_marketing" },
      { label: "Operations",  emoji: "⚙️",  next: "cost_operations" },
    ],
  },

  cost_salaries: {
    id: "cost_salaries",
    type: "bot",
    messages: [
      "Automation can significantly reduce dependency on manpower.\n\n💡 You can save 20–40% of monthly salary costs by automating repetitive tasks.",
    ],
    autoNext: "cost_salary_input_prompt",
  },

  cost_marketing: {
    id: "cost_marketing",
    type: "bot",
    messages: [
      "AI can optimise your marketing spend by targeting the right leads at the right time.\n\n💡 Businesses typically reduce marketing waste by 30–50% with AI automation.",
    ],
    autoNext: "cost_salary_input_prompt",
  },

  cost_operations: {
    id: "cost_operations",
    type: "bot",
    messages: [
      "Operational automation eliminates errors, reduces rework, and cuts overhead.\n\n💡 Most clients save 25–35% on operational costs within the first 3 months.",
    ],
    autoNext: "cost_salary_input_prompt",
  },

  cost_salary_input_prompt: {
    id: "cost_salary_input_prompt",
    type: "buttons",
    messages: ["Want to see your exact savings estimate?"],
    buttons: [
      { label: "Yes, show me", emoji: "💰", next: "cost_salary_input" },
      { label: "Later",        emoji: "🕐", next: "create_plan_cta" },
    ],
  },

  cost_salary_input: {
    id: "cost_salary_input",
    type: "input",
    messages: ["Enter your average monthly salary expense (₹):"],
    inputPlaceholder: "e.g. 200000",
    inputKey: "monthlySalary",
    inputNext: "cost_savings_result",
  },

  cost_savings_result: {
    id: "cost_savings_result",
    type: "buttons",
    messages: [
      "Based on your inputs:\n\n✅ You can save approximately ₹40,000–₹80,000/month\n📈 ROI in 60–90 days\n💡 Automation pays for itself in the first month",
    ],
    buttons: [
      { label: "Get my AI plan",  emoji: "🚀", next: "lead_capture" },
      { label: "Speak to expert", emoji: "📞", next: "expert_cta" },
    ],
  },

  // ══════════════════════════════════════════════
  // INTERACTIVE DEMO FLOW
  // ══════════════════════════════════════════════
  demo_start: {
    id: "demo_start",
    type: "buttons",
    messages: ["Hi 👋 I'm Entraiot's AI assistant. What are you looking for today?"],
    buttons: [
      { label: "Leads",      emoji: "🚀", next: "demo_question" },
      { label: "Automation", emoji: "⚙️", next: "demo_question" },
      { label: "Support",    emoji: "💬", next: "demo_question" },
    ],
  },

  demo_question: {
    id: "demo_question",
    type: "buttons",
    messages: ["Great 👍 What’s your main goal for your business?"],
    buttons: [
      { label: "Increase Sales", emoji: "📈", next: "demo_followup" },
      { label: "Reduce Cost",    emoji: "💰", next: "demo_followup" },
    ],
  },

  demo_followup: {
    id: "demo_followup",
    type: "buttons",
    messages: ["This is how AI interacts with customers automatically — fast, accurate, and 24/7."],
    buttons: [
      { label: "Next", emoji: "➡️", next: "demo_cta" },
    ],
  },

  demo_cta: {
    id: "demo_cta",
    type: "buttons",
    messages: ["Want this for your business? I can create a custom AI strategy plan for you."],
    buttons: [
      { label: "Yes, I want this!",  emoji: "🚀", next: "lead_capture" },
      { label: "Tell me more",       emoji: "📖", next: "explore_value" },
      { label: "Talk to expert",     emoji: "📞", next: "expert_cta" },
    ],
  },

  // ══════════════════════════════════════════════
  // EXPERT / WHATSAPP CTA
  // ══════════════════════════════════════════════
  expert_cta: {
    id: "expert_cta",
    type: "buttons",
    messages: [
      "📞 Let's connect you with our AI consultant.\n\nThey'll give you a free 15-min strategy session tailored to your business.",
    ],
    buttons: [
      { label: "Book a call",            emoji: "📅", next: "lead_capture" },
      { label: "WhatsApp instantly",     emoji: "💬", next: "whatsapp_cta" },
    ],
  },

  whatsapp_cta: {
    id: "whatsapp_cta",
    type: "end",
    messages: [
      "Opening WhatsApp for you... 💬\n\nOur team typically replies in under 5 minutes.",
    ],
  },

  // ══════════════════════════════════════════════
  // LEAD CAPTURE FORM
  // ══════════════════════════════════════════════
  lead_capture: {
    id: "lead_capture",
    type: "lead_form",
    messages: [
      "Great! 🎉 I'll create a free AI strategy plan for your business.\n\nJust need a couple of quick details:",
    ],
  },

  // ══════════════════════════════════════════════
  // POST-LEAD SUCCESS
  // ══════════════════════════════════════════════
  lead_success: {
    id: "lead_success",
    type: "buttons",
    messages: [
      "✅ Perfect! We've received your details.\n\nOur AI consultant will contact you within 2 hours.",
      "⚡ We're onboarding only 5 clients this week — you're in the queue!\n🎁 Your free AI strategy plan is being prepared.",
    ],
    buttons: [
      { label: "Show demo",          emoji: "📊", next: "demo_start" },
      { label: "WhatsApp us now",    emoji: "💬", next: "whatsapp_cta" },
      { label: "Explore solutions",  emoji: "🔍", next: "explore_value" },
    ],
  },

};

export default flows;
export type { ChatNode, ChatButton };
