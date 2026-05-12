/**
 * knowledgeBase.ts
 * Keyword-based deterministic search for chatbot fallback.
 */

export interface KnowledgeEntry {
  keywords: string[];
  answer: string;
}

const DATA: KnowledgeEntry[] = [
  {
    keywords: ["lead", "customer", "enquiry", "growth"],
    answer: "We automate lead generation using AI-powered funnels and WhatsApp integration to ensure you never miss a prospect."
  },
  {
    keywords: ["automation", "workflow", "process", "manual"],
    answer: "Our automation solutions replace repetitive manual tasks with smart AI workflows, saving your team hours every day."
  },
  {
    keywords: ["cost", "price", "pricing", "expensive", "save"],
    answer: "Our solutions typically pay for themselves within 3-6 months by reducing operational overhead and improving conversion rates."
  },
  {
    keywords: ["iot", "sensor", "hardware", "tracking"],
    answer: "We specialize in IoT solutions for real-time fleet tracking, industrial monitoring, and smart energy management."
  },
  {
    keywords: ["who", "company", "entraiot", "founder"],
    answer: "Entraiot is a leading AI & IoT solutions provider dedicated to transforming businesses through smart technology."
  }
];

export function searchKnowledge(query: string): string | null {
  const q = query.toLowerCase();
  let bestAnswer: string | null = null;
  let maxScore = 0;

  for (const entry of DATA) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (q.includes(keyword)) {
        score += 10;
      }
    }
    
    if (score > maxScore) {
      maxScore = score;
      bestAnswer = entry.answer;
    }
  }

  return maxScore >= 10 ? bestAnswer : null;
}