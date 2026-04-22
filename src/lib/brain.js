import { safeAIResponse } from "./localAI";
import { saveLead } from "./leadStore";
import { sendLeadEmail } from "./mailer";
import { knowledge } from "./knowledge";
import { generateResponse } from "./siteBrain";

export const brain = [
  {
    patterns: ["hi", "hello", "hey"],
    response: "Hi! How can I help you today?",
  },
  {
    patterns: ["how are you", "how r you", "how you doing"],
    response: "I'm an AI assistant — ready to help. How can I assist you today?",
  },
  {
    patterns: ["your name", "who are you"],
    response:
      "I'm Entraiot AI Assistant. I can help you understand our solutions or connect you with our team.",
  },
  {
    patterns: ["about entraiot", "what is entraiot"],
    response:
      "Entraiot Solutions builds AI and IoT systems that help businesses automate operations, monitor data in real time, and make smarter decisions.",
  },
  {
    patterns: ["services"],
    response: `Entraiot offers:

• AI automation  
• IoT integration  
• Real-time dashboards  
• Predictive maintenance  
• Custom software  

All solutions are tailored to your business needs.`,
  },
  {
    patterns: ["pricing", "cost"],
    response:
      "Pricing depends on your requirements. Share your email and our team will provide a tailored quote.",
  },
  {
    patterns: ["contact", "contact details", "how to reach", "phone", "whatsapp", "call us"],
    response: `Phone: +91 81245 45524\nEmail: bde.entraiot@gmail.com\nWhatsApp: +91 99444 42061`,
  },
  {
    patterns: ["book demo", "appointment" , "schedule demo", "book a demo", "arrange demo", "schedule a demo"],
    action: "demo",
  },
  {
    patterns: ["talk to expert", "speak to an expert", "talk to an expert", "speak to expert"],
    action: "expert",
  },
  {
    patterns: ["thanks", "thank you", "thx", "thanx"],
    response: "You're welcome — happy to help! Do you need anything else?",
  },
  {
    patterns: ["ok", "okay", "got it", "sounds good"],
    response: "Great — let me know if you'd like a demo, pricing, or more details.",
  },
  {
    patterns: ["bye", "goodbye", "see you", "talk later"],
    response: "Goodbye! Feel free to reach out anytime — I'm here to help.",
  },
  {
    patterns: ["help", "support", "assist", "how can you help"],
    response: "I can explain Entraiot's services, set up a demo, share pricing guidance, or connect you with our experts. What would you like?",
  },
];

export function matchIntent(message) {
  const msg = (message || "").toLowerCase();

  for (const item of brain) {
    for (const pattern of item.patterns || []) {
      if (!pattern) continue;
      if (msg.includes(pattern)) return item;
    }
  }

  return null;
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || ""));
}

// simple session map to avoid a single global userState
const sessions = new Map();
function getSession(id = "_global") {
  if (!sessions.has(id))
    sessions.set(id, { email: null, intent: null, lastResponse: null });
  return sessions.get(id);
}

function normalizeForCompare(t = "") {
  return String(t || "").replace(/\s+/g, " ").trim().toLowerCase();
}

function limitSentences(text, max = 3) {
  if (!text) return text;
  // preserve bullets
  if (/^\s*[-•\u2022]/m.test(text)) return text.trim();
  const parts = text.split(/(?<=[.!?])\s+/);
  if (parts.length <= max) return parts.join(" ").trim();
  return parts.slice(0, max).join(" ").trim();
}

function sanitizeAI(text) {
  if (!text) return text;
  let t = String(text || "");
  // remove obvious model prefixes or user echoes
  t = t.replace(/User asked:.*/gi, "");
  t = t.replace(/\bI am a .*writer.*\b/gi, "");
  t = t.replace(/\bI have been working on a .*\b/gi, "");
  // collapse repeated sentences
  t = t.replace(/\n{2,}/g, "\n");
  t = t.replace(/(\S.+?)\1{2,}/g, "$1");
  t = t.replace(/\s+/g, " ").trim();
  // keep short
  t = limitSentences(t, 3);
  return t;
}

export async function getAI() {
  // delegate to localAI helper
  // localAI loads @xenova/transformers dynamically
  return {
    reply: async (msg) => {
      const prompt = `Answer this clearly and professionally: ${msg}`;
      return await safeAIResponse(prompt);
    },
  };
}

export async function aiReply(message) {
  try {
    const out = await safeAIResponse(`Answer this clearly and professionally: ${message}`);
    return out ? sanitizeAI(out) : null;
  } catch (err) {
    return null;
  }
}

// ------------------ Human-style helpers ------------------
// website/domain knowledge handled by siteBrain.generateResponse

export function smartFallback(message) {
  const msg = String(message || "").toLowerCase();
  if (/\bhello\b|\bhi\b/.test(msg)) return "Hi! How can I help you today?";
  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost"))
    return "Pricing depends on your needs. I can connect you with our team for a quick quote.";
  if (msg.includes("demo") || msg.includes("book demo") || msg.includes("schedule"))
    return "We can set up a quick demo. Share your email and I’ll arrange it.";
  if (msg.includes("name")) return "I'm Entraiot AI Assistant.";

  // Controlled clarification prompt (no generic marketing text)
  return "Can you please clarify your question? I’ll give you a clear answer.";
}

export function makeHuman(text) {
  if (!text) return text;
  let t = String(text || "");
  // apply simple friendly transformations
  t = t.replace(/Entraiot provides/gi, "Entraiot helps businesses with");
  t = t.replace(/\bWe can\b/gi, "We can easily");
  t = t.replace(/\bWe provide\b/gi, "We offer");
  t = t.replace(/\bI can\b/gi, "I can");
  // remove robotic starters
  t = t.replace(/^\s*(Sure[,:]?\s*)/i, "");
  t = t.replace(/^\s*(Here('?s| is)\s*)/i, "");
  // short and tidy
  t = sanitizeAI(t);
  return t;
}

// Strict question handler — direct, human, and deterministic
export function handleSmartQuery(message) {
  const msg = String(message || "").toLowerCase().trim();

  // skip emails or phone numbers so lead flow continues
  const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (emailRegex.test(msg)) return null;
  if (/\+?\d[\d\s\-]{6,}\d/.test(msg)) return null;

  // BASIC CONVERSATION
  if (msg === "hi" || msg === "hello") {
    return "Hi! How can I help you today?";
  }

  if (msg.includes("how are you")) {
    return "I'm doing great 😊 How can I help you?";
  }

  if (msg.includes("your name")) {
    return "I'm Entraiot AI Assistant.";
  }

  if (msg.includes("what can you do")) {
    return "I can help you understand AI, IoT, automation, and how Entraiot solutions can help your business.";
  }

  // COMPANY QUESTIONS
  if (msg.includes("what is entraiot") || msg.includes("about entraiot")) {
    return "Entraiot Solutions is an AI and IoT company that helps businesses automate operations, monitor systems in real time, and make smarter decisions.";
  }

  if (msg.includes("what does your company do")) {
    return "We build AI and IoT solutions that help businesses automate processes, track data in real time, and improve efficiency.";
  }

  if (msg.includes("industries")) {
    return "We work with manufacturing, logistics, healthcare, hospitality, smart retail, energy, and smart cities.";
  }

  if (msg.includes("why choose")) {
    return "We provide customized AI and IoT solutions with real-time insights, automation, and scalable systems tailored to your business.";
  }

  // SERVICES
  if (msg.includes("services")) {
    return `We offer:\n\n• AI automation  \n• IoT integration  \n• Real-time dashboards  \n• Predictive maintenance  \n• Custom software solutions`;
  }

  if (msg.includes("predictive maintenance")) {
    return "Predictive maintenance uses AI and sensor data to detect issues early and prevent equipment failures.";
  }

  // GENERAL KNOWLEDGE
  if (msg.includes("what is ai") || msg === "what is ai") {
    return "Artificial Intelligence (AI) allows machines to learn from data, make decisions, and perform tasks similar to humans.";
  }

  if (msg.includes("what is iot") || msg === "what is iot") {
    return "IoT connects devices like sensors and machines to the internet, enabling real-time monitoring and control.";
  }

  if (msg.includes("machine learning")) {
    return "Machine learning is a type of AI where systems learn from data and improve automatically without being explicitly programmed.";
  }

  if (msg.includes("automation")) {
    return "Automation uses technology to perform tasks automatically, reducing manual work and improving efficiency.";
  }

  if (msg.includes("cloud")) {
    return "Cloud computing allows you to store and access data over the internet instead of local systems.";
  }

  // REAL WORLD QUESTIONS
  if (msg.includes("ai help business") || msg.includes("how ai help business")) {
    return "AI helps businesses by automating tasks, analyzing data, improving decision-making, and increasing efficiency.";
  }

  if (msg.includes("iot manufacturing") || msg.includes("iot in manufacturing")) {
    return "IoT in manufacturing enables real-time monitoring of machines, predictive maintenance, and improved production efficiency.";
  }

  // RANDOM QUESTIONS
  if (msg.includes("what is python")) {
    return "Python is a popular programming language used for web development, AI, automation, and data analysis.";
  }

  if (msg.includes("what is google")) {
    return "Google is a technology company known for its search engine and services like Gmail, YouTube, and cloud computing.";
  }

  // CONTACT / SALES
  if (msg.includes("contact") || msg.includes("phone")) {
    return `You can contact us at ${knowledge.contact.phone} or ${knowledge.contact.email}.`;
  }

  if (msg.includes("demo") || msg.includes("appointment")) {
    return "We can arrange a demo for you. Please share your email.";
  }

  // FINAL FALLBACK (controlled)
  return "Can you please clarify your question? I’ll give you a clear answer.";
}

export async function processMessage(message, opts = {}) {
  const sessionId = String(opts.sessionId || "_global");
  const state = getSession(sessionId);

  const msg = String(message || "").trim();

  // 0. Strict smart query handler (must run first)
  try {
    const smart = handleSmartQuery(msg);
    if (smart) {
      const n = normalizeForCompare(smart);
      if (n === normalizeForCompare(state.lastResponse)) {
        const alt = `Let me explain that differently. ${smart}`;
        state.lastResponse = normalizeForCompare(alt);
        return alt;
      }
      state.lastResponse = n;
      return smart;
    }
  } catch (e) {
    // continue to normal flow on error
  }

  // contact details request
  if (/contact|phone|email|whatsapp|call/i.test(msg) && /contact/.test(msg) === false) {
    if (/contact|contact details|how to reach/i.test(msg)) {
      const reply = `Phone: ${knowledge.contact.phone}  \nEmail: ${knowledge.contact.email}`;
      // prevent repetition
      const n = normalizeForCompare(reply);
      if (n === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${reply}`;
      state.lastResponse = n;
      return reply;
    }
  }

  // 1. EMAIL CHECK
  if (isValidEmail(msg)) {
    state.email = msg;

    // persist lead
    try {
      const record = {
        id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `id_${Date.now()}`,
        email: state.email,
        intent: state.intent || null,
        time: new Date().toISOString(),
        source: "chat-widget",
      };
      try {
        saveLead(record);
      } catch (e) {
        // ignore save errors
      }

      try {
        await sendLeadEmail(record);
      } catch (e) {
        // ignore mail errors
      }
    } catch (err) {
      // ignore
    }

    return "Got it 👍 Our team will contact you soon.";
  }

  // 2. INTENT / RULE MATCH
  const intent = matchIntent(msg);

  if (intent) {
    if (intent.action === "demo") {
      state.intent = "demo";
      const reply = "Let’s schedule a demo. Please share your email.";
      const human = makeHuman(reply);
      state.lastResponse = normalizeForCompare(human);
      return human;
    }

    if (intent.action === "expert") {
      state.intent = "expert";
      const reply = "Our expert will contact you. Please share your email.";
      const human = makeHuman(reply);
      state.lastResponse = normalizeForCompare(human);
      return human;
    }

    if (intent.response) {
      const human = makeHuman(intent.response);
      // conversion nudge when user shows interest keywords
      const interested = /demo|pricing|price|quote|book|appointment|expert|schedule/i.test(msg);
      const shouldNudge = interested && !/demo|book|appointment|pricing|quote/i.test(human);
      const final = shouldNudge ? `${human}\n\nWould you like to connect with our team or book a quick demo?` : human;
      const n = normalizeForCompare(final);
      if (n === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${final}`;
      state.lastResponse = n;
      return final;
    }
  }

  // 3. WEBSITE / DOMAIN KNOWLEDGE (siteBrain)
  const kb = generateResponse(msg);
  if (kb) {
    const human = makeHuman(kb);
    const interested = /demo|pricing|price|quote|book|appointment|expert|schedule/i.test(msg);
    const final = interested && !/demo|book|appointment|pricing|quote/i.test(human) ? `${human}\n\nWould you like to connect with our team or book a quick demo?` : human;
    const n = normalizeForCompare(final);
    if (n === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${final}`;
    state.lastResponse = n;
    return final;
  }

  // 4. SMART FALLBACK (human-friendly)
  const sf = smartFallback(msg);
  if (sf) {
    const human = makeHuman(sf);
    const n = normalizeForCompare(human);
    if (n === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${human}`;
    state.lastResponse = n;
    return human;
  }

  // 5. AI FALLBACK
  const ai = await aiReply(msg);
  if (ai) {
    const cleaned = makeHuman(ai);
    const n = normalizeForCompare(cleaned);
    if (n === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${cleaned}`;
    state.lastResponse = n;
    return cleaned;
  }

  // FINAL: very short fallback
  const final = "I didn’t fully get that. Can you rephrase it?";
  const nFinal = normalizeForCompare(final);
  if (nFinal === normalizeForCompare(state.lastResponse)) return `Let me explain that differently. ${final}`;
  state.lastResponse = nFinal;
  return final;
}

export function clean(text) {
  return String(text || "")
    .replace(/User asked:.*/g, "")
    .replace(/Sure.*:/g, "")
    .replace(/\n+/g, "\n")
    .trim();
}

export default {
  brain,
  matchIntent,
  isValidEmail,
  getAI,
  aiReply,
  processMessage,
  clean,
};
