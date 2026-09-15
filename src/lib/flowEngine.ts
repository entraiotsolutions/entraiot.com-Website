import { ChatMemory } from "./memory";

export interface FlowResponse {
  reply: string;
  buttons?: string[];
  trigger_lead_capture?: boolean;
}

export function runFlowEngine(memory: ChatMemory, message: string): FlowResponse | null {
  const msg = message.toLowerCase();
  
  // ── AUTO INTENT TRIGGER ─────────────────────────────────────
  if (msg.includes("want more leads") || msg.includes("get more leads")) {
    memory.intent = "LEADS";
    memory.step = 26;
  } else if (msg.includes("want automation") || msg.includes("automate")) {
    memory.intent = "AUTOMATION";
    memory.step = 51;
  } else if (msg.includes("reduce operational cost") || msg.includes("reduce cost") || msg.includes("save money")) {
    memory.intent = "COST";
    memory.step = 76;
  } else if (msg.includes("just exploring") || msg.includes("exploring")) {
    memory.intent = "EXPLORE";
    memory.step = 1;
  } else if (msg.includes("show demo") || msg.includes("see demo") || msg.includes("interactive demo")) {
    memory.intent = "DEMO";
    memory.step = 101;
  }

  const { intent, step } = memory;

  // ── FLOW 1: JUST EXPLORING (1–25) ───────────────────────────
  if (intent === "EXPLORE") {
    switch (step) {
      case 1:
        return {
          reply: "Excellent choice. Let me demonstrate how our AI & Industrial IoT framework can optimize your specific business model.",
          buttons: ["Next"]
        };
      case 2:
        return {
          reply: "Our enterprise solutions typically deliver measurable outcomes:\n\n📈 Automated Lead Acquisition\n⚙️ 24/7 Operational Autonomy\n📉 20–40% Direct Cost Reduction",
          buttons: ["Next"]
        };
      case 3:
        return {
          reply: "Would you like to see how these efficiencies apply to your organization?",
          buttons: ["Yes, demonstrate", "Maybe later"]
        };
      case 4:
        return {
          reply: "To provide a tailored strategic roadmap, could you specify your industry sector?",
          buttons: ["Real Estate", "Healthcare", "IT Services", "Retail", "Other"]
        };
      case 5:
        // Transition: User picked industry (e.g. IT Services)
        memory.business_type = message;
        if (message.toLowerCase().includes("it services")) {
          return {
            reply: "IT Services — a high-potential sector for automation.\n\nOur framework for IT firms typically includes:\n✅ Autonomous Lead Generation Funnels\n✅ Instant WhatsApp Engagement Systems\n✅ Performance Intelligence Dashboards\n✅ 24/7 AI-Driven Client Concierge\n\n💡 Average Velocity: 2x–5x growth in 90 days.",
            buttons: ["Next"]
          };
        }
        // General response for other industries
        return {
          reply: `Strategic choice. For the ${message} sector, we implement custom AI architectures and autonomous engagement layers to drive high-fidelity growth.`,
          buttons: ["Next"]
        };
      case 6:
        return {
          reply: "Most companies lose leads because they reply late.\n👉 Want to check if that’s happening in your business?",
          buttons: ["Yes, check now", "Not sure"]
        };
      case 7:
        return {
          reply: "How quickly do you respond to leads?",
          buttons: ["Within 5 mins", "5–30 mins", "30+ mins"]
        };
      case 8:
        return {
          reply: message.includes("30+") 
            ? "That’s where most leads drop off ⚠️\nYou could be losing 30–50% potential clients."
            : "That's good, but even a 5-min delay can lose you 20% of conversions. AI does it in 1 second.",
          buttons: ["Next"]
        };
      case 9:
        return {
          reply: "We fix this using instant AI responses + automation.\n👉 Want a custom plan?",
          buttons: ["Yes, create my plan", "Show demo", "Talk to expert"]
        };
      case 10:
        return {
          reply: "Great 🚀\nI can create a free AI strategy plan for your business.\n👉 Where should I send it?",
          trigger_lead_capture: true
        };
      case 11:
        return {
          reply: "⚡ We are onboarding only 5 clients this week\n🔥 Free consultation slots filling fast",
          buttons: ["Show demo", "Learn more", "WhatsApp instant help"]
        };
      case 12:
        return {
          reply: "Or you can explore more 👇",
          buttons: ["Show demo", "Learn more", "WhatsApp instant help"]
        };
      default:
        return null;
    }
  }

  // ── FLOW 2: I WANT MORE LEADS (26–50) ───────────────────────
  if (intent === "LEADS") {
    switch (step) {
      case 26:
        return {
          reply: "A high-fidelity growth strategy. 🚀\n\nWe specialize in high-conversion lead acquisition through AI-driven engagement. \n\nWhat industry are you operating in?",
          buttons: ["Real Estate", "Healthcare", "IT Services", "Retail", "Other"]
        };
      case 27:
        memory.business_type = message;
        memory.step = 28;
        return runFlowEngine(memory, message);
      case 28:
        if (message.toLowerCase().includes("real estate")) {
          return {
            reply: "Real Estate — a prime sector for AI transformation.\n\nOur implementation strategy typically includes:\n✅ Autonomous Lead Capture from Digital Assets\n✅ Instant WhatsApp Engagement Protocols\n✅ AI-Driven Buyer Qualification\n✅ Intelligent Site Visit Coordination\n\n💡 Outcome: Accelerated deal velocity and higher conversion yields.",
            buttons: ["Next"]
          };
        }
        return {
          reply: `Strategic focus. For ${message}, we architect autonomous lead management systems to ensure peak conversion performance.`,
          buttons: ["Next"]
        };
      case 29:
        return {
          reply: "Are you currently getting enough property enquiries?",
          buttons: ["Yes", "No"]
        };
      case 30:
        return {
          reply: "That means your funnel is missing automation.\n👉 Want to see how we fix it?",
          buttons: ["Show demo", "Create plan"]
        };
      case 31:
        // Instead of showing demo text, start the interactive demo
        memory.intent = "DEMO";
        memory.step = 101;
        return runFlowEngine(memory, message);
      case 32:
        return {
          reply: "This happens automatically — 24/7.\n👉 Want this for your business?",
          buttons: ["Yes", "Maybe later"]
        };
      case 33:
        if (message.toLowerCase() === "yes") {
          return {
            reply: "Great! Let's get your custom plan started.",
            trigger_lead_capture: true
          };
        }
        return null;
      default:
        return null;
    }
  }

  // ── FLOW 3: AUTOMATION (51–75) ──────────────────────────────
  if (intent === "AUTOMATION") {
    switch (step) {
      case 51:
        return {
          reply: "An insightful objective. Automation is the key to decoupling business growth from labor overhead.",
          buttons: ["Next"]
        };
      case 52:
        return {
          reply: "Which operational domain would you like to prioritize for optimization?",
          buttons: ["Lead handling", "Customer support", "Operations", "All"]
        };
      case 53:
        return {
          reply: "A comprehensive choice. Our automation framework typically integrates:\n✅ Autonomous Lead Management\n✅ Proactive Engagement Protocols\n✅ Real-time Operational Insights\n✅ Seamless Workflow Synchronization",
          buttons: ["Next"]
        };
      case 54:
        return {
          reply: "💡 Most businesses save 30–40% time after automation.",
          buttons: ["Next"]
        };
      case 55:
        return {
          reply: "Want to calculate your savings?",
          buttons: ["Yes", "Skip"]
        };
      case 56:
        return {
          reply: "How many employees do you have?",
          // Expecting numerical input
        };
      case 57:
        const emps = parseInt(message);
        const savings = isNaN(emps) ? "₹40,000–₹80,000" : `₹${emps * 5000}–₹${emps * 8000}`;
        return {
          reply: `Approx savings:\n👉 ${savings}/month 💰`,
          buttons: ["Next"]
        };
      case 58:
        return {
          reply: "Want full breakdown?",
          buttons: ["Get my plan", "Talk to expert"],
          trigger_lead_capture: true
        };
      default:
        return null;
    }
  }

  // ── FLOW 4: COST REDUCTION (76–100) ─────────────────────────
  if (intent === "COST") {
    switch (step) {
      case 76:
        return {
          reply: "An intelligent financial priority. Manual workflows are often the primary source of hidden operational leakage.",
          buttons: ["Next"]
        };
      case 77:
        return {
          reply: "Where do you spend most?",
          buttons: ["Salaries", "Marketing", "Operations"]
        };
      case 78:
        return {
          reply: "Automation can reduce dependency on manpower.",
          buttons: ["Next"]
        };
      case 79:
        return {
          reply: "💡 You can save 20–40% monthly costs",
          buttons: ["Next"]
        };
      case 80:
        return {
          reply: "Want exact savings for your business?",
          buttons: ["Yes", "Later"]
        };
      case 81:
        return {
          reply: "Enter average monthly salary:",
          // Numerical input
        };
      case 82:
        const salary = parseInt(message.replace(/[^0-9]/g, ''));
        const potSavings = isNaN(salary) ? "₹45,000" : `₹${Math.round(salary * 0.3)}`;
        return {
          reply: `You can save ${potSavings}/month using automation`,
          buttons: ["Next"]
        };
      case 83:
        return {
          reply: "Want a detailed plan?",
          buttons: ["Get my AI plan", "Speak to expert"],
          trigger_lead_capture: true
        };
      default:
        return null;
    }
  }

  // ── DEMO WOW MOMENT (101+) ──────────────────────────────────
  // ── INTERACTIVE DEMO (101+) ──────────────────────────────────
  if (intent === "DEMO" || step >= 101) {
    switch (step) {
      case 101:
        // Stage: demo_start
        return {
          reply: "Welcome. I am the Entraiot AI Concierge. Which operational efficiency domain shall we explore today?",
          buttons: ["Leads", "Automation", "Support"]
        };
      case 102:
        // Stage: demo_question
        return {
          reply: "Understood. What is the primary performance metric you aim to optimize for your organization?",
          buttons: ["Increase Sales", "Reduce Cost"]
        };
      case 103:
        // Stage: demo_followup
        return {
          reply: "As you can see, our AI interacts with millisecond precision — providing accurate, 24/7 engagement that scales seamlessly with your business needs.",
          buttons: ["Next"]
        };
      case 104:
        // Stage: cta
        return {
          reply: "Shall I architect a similar AI-driven framework for your organization? I can prepare a custom strategy roadmap for you now.",
          buttons: ["Yes, Create Plan", "Maybe later"]
        };
      case 105:
        if (message.toLowerCase().includes("yes")) {
          return {
            reply: "Excellent. Where should I deliver your custom strategy roadmap?",
            trigger_lead_capture: true
          };
        }
        return {
          reply: "Understood. Feel free to explore our solutions further or reach out with specific inquiries.",
          buttons: ["Main Menu"]
        };
      default:
        return null;
    }
  }

  return null;
}
