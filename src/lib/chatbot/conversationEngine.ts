/**
 * conversationEngine.ts
 * Deterministic Intent Detection and State Tracking.
 */

import { ConversationMemory, ConversationStage } from "../conversationMemory";

export type Intent = "LEADS" | "AUTOMATION" | "COST" | "KNOWLEDGE" | "GREETING" | "FALLBACK";

const INTENT_MAP: Record<Intent, string[]> = {
  LEADS: ["lead", "customer", "sale", "growth", "client", "enquiry", "visitor", "more leads"],
  AUTOMATION: ["automate", "workflow", "manual", "efficiency", "process", "iot", "automation"],
  COST: ["cost", "price", "pricing", "budget", "save", "bill", "roi", "reduce cost", "operational cost"],
  KNOWLEDGE: ["how", "what", "where", "can you", "info", "details", "about"],
  GREETING: ["hello", "hi", "hey", "greetings", "good morning"],
  FALLBACK: []
};

export class ConversationEngine {
  public detectIntent(message: string): { intent: Intent; confidence: number } {
    const msg = message.toLowerCase();
    let bestIntent: Intent = "FALLBACK";
    let maxScore = 0;

    for (const [intent, keywords] of Object.entries(INTENT_MAP)) {
      let score = 0;
      keywords.forEach(kw => {
        if (msg.includes(kw)) {
          // Boost score for exact phrase matches
          if (msg === kw || msg.startsWith(kw + " ") || msg.endsWith(" " + kw)) {
            score += 2;
          } else {
            score += 1;
          }
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestIntent = intent as Intent;
      }
    }

    return { 
      intent: bestIntent, 
      confidence: maxScore > 0 ? Math.min(maxScore * 0.2, 1) : 0 
    };
  }

  public updateState(memory: ConversationMemory, intent: Intent, message: string): ConversationMemory {
    const updatedMemory = { ...memory };
    
    // Save last intent before updating
    updatedMemory.last_intent = memory.intent;
    
    // Increment message count
    updatedMemory.message_count = (memory.message_count || 0) + 1;

    // Only update intent if it's not a generic greeting or knowledge query while we are in a flow
    if (intent !== "FALLBACK" && intent !== "GREETING") {
      updatedMemory.intent = intent;
    }

    // Entity Extraction (deterministic)
    const msg = message.toLowerCase();
    if (msg.includes("real estate")) updatedMemory.business_type = "Real Estate";
    if (msg.includes("it") || msg.includes("agency") || msg.includes("software")) updatedMemory.business_type = "IT Services";
    if (msg.includes("healthcare") || msg.includes("medical")) updatedMemory.business_type = "Healthcare";
    if (msg.includes("retail") || msg.includes("shop") || msg.includes("ecommerce")) updatedMemory.business_type = "Retail";
    if (msg.includes("marketing")) updatedMemory.business_type = "Marketing";
    if (msg.includes("operations")) updatedMemory.business_type = "Operations";

    return updatedMemory;
  }
}
