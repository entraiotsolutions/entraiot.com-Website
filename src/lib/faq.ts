export type FaqEntry = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
};

export const FAQ: FaqEntry[] = [
  {
    id: "services-1",
    question: "What services does Entraiot offer?",
    answer:
      "Entraiot provides end-to-end IoT and AI solutions including sensor integration, data pipelines, predictive maintenance, analytics dashboards, and custom ML model development for industry use-cases.",
    keywords: ["services", "iot", "ai", "analytics", "predictive", "maintenance"],
  },
  {
    id: "pricing-1",
    question: "How much do your services cost?",
    answer:
      "Pricing depends on scope, scale and customization. For accurate pricing please contact our team so we can provide a tailored quote.",
    keywords: ["pricing", "cost", "price", "quote", "charges"],
  },
  {
    id: "about-1",
    question: "Who is Entraiot?",
    answer:
      "Entraiot Solutions is an enterprise IoT and AI solutions provider focused on industrial automation, predictive maintenance and smart city deployments. We help companies deploy sensors, build data infrastructure and deliver ML-driven insights.",
    keywords: ["about", "company", "who", "entrariot", "entraiot", "team"],
  },
  {
    id: "industries-1",
    question: "Which industries do you serve?",
    answer:
      "We work with manufacturing, logistics, healthcare, hospitality, smart retail, energy management and smart cities. Our solutions are tailored to industry-specific workflows and compliance requirements.",
    keywords: ["industries", "manufacturing", "logistics", "healthcare", "hospitality", "retail", "energy"],
  },
];

function normalize(text: string) {
  return (text || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}

export function findFaqMatch(query: string) {
  if (!query) return null;
  const q = normalize(query);
  const qWords = Array.from(new Set(q.split(/\s+/).filter(Boolean)));

  let best: { entry: FaqEntry; score: number } | null = null;

  for (const entry of FAQ) {
    const kws = entry.keywords.map((k) => k.toLowerCase());
    let score = 0;

    // keyword hits
    for (const w of qWords) {
      if (kws.includes(w)) score += 2;
    }

    // direct question phrase
    if (normalize(entry.question).includes(q) || q.includes(entry.question.toLowerCase())) {
      score += 5;
    }

    if (!best || score > best.score) {
      best = { entry, score };
    }
  }

  if (best && best.score >= 1) return best.entry;
  return null;
}

export default FAQ;
