export const knowledgeBase = [
  {
    keywords: ["service", "what do you do", "solutions"],
    answer:
      "Entraiot offers:\n- AI-based automation\n- IoT device integration\n- Real-time dashboards\n- Predictive maintenance\n- Custom software solutions\n\nThese are customized based on your business needs.",
  },
  {
    keywords: ["pricing", "cost", "price"],
    answer:
      "Our pricing depends on your business needs, scale, and customization. We usually provide the best plan after a quick discussion.",
  },
  {
    keywords: ["support"],
    answer:
      "We provide 24/7 support, system monitoring, maintenance, and continuous optimization.",
  },
  {
    keywords: ["company", "about entraiot"],
    answer:
      "Entraiot Solutions is an AI and IoT company focused on smart automation, real-time data insights, and improving business efficiency.",
  },
  {
    keywords: ["name", "who are you"],
    answer:
      "I'm Entraiot AI Assistant. I help you understand our solutions and connect you with our team.",
  },
  {
    keywords: ["seo", "ranking", "google"],
    answer:
      "Website ranking depends on SEO, content quality, backlinks, and performance. We can also help improve your digital presence.",
  },
];

// Simple in-memory chat history (keeps last 10 pairs)
export let chatHistory = [];

export function updateHistory(user, bot) {
  try {
    chatHistory.push({ user, bot, ts: new Date().toISOString() });
    if (chatHistory.length > 10) chatHistory.shift();
  } catch (err) {
    // ignore
  }
}

export function getBestMatch(message) {
  if (!message) return null;
  const msg = message.toLowerCase();

  let bestScore = 0;
  let bestAnswer = null;

  knowledgeBase.forEach((item) => {
    let score = 0;
    item.keywords.forEach((keyword) => {
      const kw = keyword.toLowerCase();
      // fuzzy check: either direction
      if (msg.includes(kw) || kw.includes(msg)) score++;
      // also check word-level matches
      const words = msg.split(/\W+/).filter(Boolean);
      if (words.includes(kw)) score++;
    });

    if (score > bestScore) {
      bestScore = score;
      bestAnswer = item.answer;
    }
  });

  return bestAnswer;
}

export function generateSmartResponse(message, history = []) {
  const match = getBestMatch(message);
  if (match) return match;

  // Controlled clarification fallback — avoid generic marketing text
  return `Can you please clarify your question? I’ll give you a clear answer.`;
}

const ROBOTIC_INTROS = [
  /^sure!\s*here'?s what i can tell you:\s*/i,
  /^great question!\s*/i,
  /^let me explain(?: that clearly)?:\s*/i,
  /^here'?s a quick overview:\s*/i,
];

export function formatResponse(answer) {
  let clean = String(answer ?? "").trim();
  ROBOTIC_INTROS.forEach((pattern) => {
    clean = clean.replace(pattern, "").trim();
  });
  return clean.replace(/\n{3,}/g, "\n\n");
}

export default {
  knowledgeBase,
  getBestMatch,
  generateSmartResponse,
  formatResponse,
  chatHistory,
  updateHistory,
};
