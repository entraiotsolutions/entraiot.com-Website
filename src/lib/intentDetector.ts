/**
 * intentDetector.ts
 * Rule-based intent detection for the chatbot.
 */

export type Intent = "LEADS" | "AUTOMATION" | "COST" | "EXPLORE" | null;

export type BusinessType = 
  | "real_estate" 
  | "healthcare" 
  | "it_services" 
  | "retail" 
  | "manufacturing" 
  | "logistics" 
  | "other";


const KEYWORDS: Record<string, string[]> = {
  LEADS: ["lead", "customer", "sale", "growth", "client", "enquiry", "visitor", "marketing", "get more leads"],
  AUTOMATION: ["automate", "automation", "workflow", "manual", "efficiency", "process", "iot", "sensor", "automation ⚙️"],
  COST: ["cost", "price", "pricing", "budget", "save", "bill", "roi", "expensive", "reduce costs", "reduce costs 💰"],
  EXPLORE: ["explore", "know", "show", "services", "offer", "about", "company", "what", "talk to expert"]
};

export function detectIntent(message: string): Intent {
  const msg = message.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(kw => msg.includes(kw))) {
      return intent as Intent;
    }
  }
  
  return null;
}
