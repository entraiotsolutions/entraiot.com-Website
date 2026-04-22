import { knowledgeBase } from './knowledgeBase';

/**
 * Types & Interfaces
 */
export type Intent = 'greeting' | 'services' | 'pricing' | 'demo' | 'industries' | 'unclear';

export interface ChatResponse {
  success: boolean;
  reply: string;
  intent: Intent;
  suggestedActions: string[];
  leadCaptureSuggested?: boolean;
}

interface SessionData {
  lastIntent: Intent;
}

const sessionMemory = new Map<string, SessionData>();

/**
 * Detects user intent based on keyword clusters.
 */
export function getIntent(message: string): Intent {
  const msg = message.toLowerCase();

  const clusters = {
    greeting: /\b(hi|hello|hey|greetings|morning|evening|welcome)\b/,
    services: /\b(service|offer|provide|capabilities|solution|expert|do)\b/,
    pricing: /\b(price|cost|quote|how much|rate|subscription|cheap|expensive)\b/,
    demo: /\b(demo|schedule|book|meeting|call|show|trial|test)\b/,
    industries: /\b(industry|sector|vertical|manufacturing|healthcare|logistics|retail|hospital|factory|warehouse)\b/
  };

  if (clusters.greeting.test(msg)) return 'greeting';
  if (clusters.demo.test(msg)) return 'demo';
  if (clusters.pricing.test(msg)) return 'pricing';
  if (clusters.services.test(msg)) return 'services';
  if (clusters.industries.test(msg)) return 'industries';

  return 'unclear';
}

/**
 * Local RAG: Retrieves the top 2 relevant contexts from the knowledge base.
 */
export function getRelevantContext(message: string): string[] {
  const msg = message.toLowerCase();
  const words = msg.split(/\W+/);

  const scored = knowledgeBase.map(item => {
    let score = 0;
    item.keywords.forEach(kw => {
      const lowerKw = kw.toLowerCase();
      if (words.includes(lowerKw)) score += 3;
      else if (msg.includes(lowerKw)) score += 1;
    });
    return { content: item.content, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(item => item.content);
}

/**
 * Generates a human-like response based on intent and retrieved context.
 */
export function generateResponse(intent: Intent, context: string[], message: string): string {
  const greetings = [
    "Hi! How can I help you explore Entraiot's solutions today?",
    "Hello! I'm here to assist you with any questions about our AI and IoT offerings.",
    "Hey! Welcome. What's on your mind regarding our technology?"
  ];

  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  switch (intent) {
    case 'greeting':
      return pick(greetings);

    case 'services':
      return "We specialize in high-impact solutions:\n• AI Automation\n• IoT Integration\n• Real-time Dashboards\n• Predictive Maintenance\n\nWould you like a demo to see these in action?";

    case 'pricing':
      return "Our pricing is tailored to your project scale and specific needs. Could you share your requirements or project details so I can provide a better estimate?";

    case 'demo':
      return "I can definitely help schedule a demo for you! Would you like to book a session with our technical team?";

    case 'industries':
      if (context.length > 0) {
        return `${context.join(" ")} Does this align with your industry needs?`;
      }
      return "We provide specialized solutions for Manufacturing, Healthcare, Logistics, and Retail. Which sector are you interested in?";

    case 'unclear':
    default:
      if (context.length > 0) {
        return `${context[0]} Would you like more details on this?`;
      }
      return "I'm not quite sure I follow. Could you clarify your industry or the specific challenge you're looking to solve?";
  }
}

/**
 * Main Handler: Orchestrates the RAG flow.
 */
export function handleChat(message: string, sessionId: string): ChatResponse {
  try {
    if (!message || message.trim() === "") {
      throw new Error("Empty message");
    }

    const cleanMessage = message.trim();
    const lowerMsg = cleanMessage.toLowerCase();
    
    // Check for affirmative follow-up
    const isAffirmative = /\b(yes|ok|sure|yeah|yep|proceed)\b/.test(lowerMsg);
    const session = sessionMemory.get(sessionId);

    let intent = getIntent(cleanMessage);
    
    if (isAffirmative && session && session.lastIntent !== 'greeting') {
      intent = session.lastIntent;
    }

    const context = getRelevantContext(cleanMessage);
    const reply = generateResponse(intent, context, cleanMessage);

    // Persist state
    sessionMemory.set(sessionId, { lastIntent: intent });

    return {
      success: true,
      reply,
      intent,
      suggestedActions: ["Services", "Pricing", "Book Demo"],
      leadCaptureSuggested: (intent === 'pricing' || intent === 'demo')
    };

  } catch (error) {
    return {
      success: false,
      reply: "I encountered a small glitch. Could you try rephrasing that?",
      intent: 'unclear',
      suggestedActions: ["Services", "Pricing", "Book Demo"]
    };
  }
}

export default {
  handleChat,
  getIntent,
  getRelevantContext,
  generateResponse
};
