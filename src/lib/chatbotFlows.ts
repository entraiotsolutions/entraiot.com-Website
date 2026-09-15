export type FlowStep = {
  text: string;
  options?: string[];
  capture?: "email" | "phone" | "name" | "message";
};

export const flows: Record<string, FlowStep[]> = {
  EXPLORE: [
    {
      text: "That’s great 😊 Let me quickly show how AI & IoT can help businesses like yours."
    },
    {
      text: `Here’s what most businesses achieve:
🚀 Generate leads
⚙️ Automate operations
💰 Reduce costs`,
      options: ["Yes, show me", "Maybe later"]
    },
    {
      text: "Which of these interests you the most?",
      options: ["Generate Leads", "Automate Operations", "Reduce Costs"]
    }
  ],
  LEADS: [
    {
      text: "Want more leads? 📈 Our AI can help you capture and qualify visitors 24/7."
    },
    {
      text: "Which industry are you in?",
      options: ["Manufacturing", "Logistics", "Retail", "Healthcare", "Other"]
    },
    {
      text: "Great! Our AI solutions have shown a 30% increase in lead conversion for that sector.",
      options: ["How does it work?", "Show me pricing"]
    },
    {
      text: "Where should I send your custom AI growth plan?",
      capture: "email"
    },
    {
      text: "Got it! One of our experts will reach out to you shortly. Anything else I can help with?",
      options: ["Show Demo", "Talk to Expert", "WhatsApp Help"]
    }
  ],
  AUTOMATION: [
    {
      text: "Automation is the key to scaling. ⚙️ We can automate your routine tasks and monitoring."
    },
    {
      text: "What's your biggest operational pain point?",
      options: ["Manual Data Entry", "Inventory Tracking", "Equipment Failure", "Other"]
    },
    {
      text: "We can definitely help with that using IoT sensors and AI monitoring. Would you like to see a demo?",
      options: ["See Demo", "Talk to Expert", "WhatsApp Help"]
    }
  ],
  COST: [
    {
      text: "Reducing costs is our specialty. 💰 IoT helps you find inefficiencies you didn't know existed."
    },
    {
      text: "Where would you like to save the most?",
      options: ["Energy Bills", "Maintenance Costs", "Operational Waste"]
    },
    {
      text: "Smart choice. Our clients typically see a 15-20% reduction in those areas within the first 3 months.",
      options: ["Get Estimate", "Talk to Expert"]
    },
    {
      text: "What's your current monthly spend in that area?",
      capture: "message"
    },
    {
      text: "Thanks! We'll prepare a cost-saving projection for you. Where should we send it?",
      capture: "email"
    }
  ]
};

export const FOLLOW_UP_BUTTONS = [
  "Get My AI Plan",
  "Show Demo",
  "Talk to Expert",
  "WhatsApp Help"
];
