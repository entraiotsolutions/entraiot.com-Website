/**
 * chatbotSystem.ts
 * Main Orchestrator for the deterministic chatbot.
 */

import { ConversationMemory } from "../conversationMemory";
import { KnowledgeBaseEngine, KnowledgeEntry } from "./knowledgeBase";
import { ConversationEngine, Intent } from "./conversationEngine";
import { LeadAgent } from "./agents/leadAgent";
import { KnowledgeAgent } from "./agents/knowledgeAgent";
import { AutomationAgent } from "./agents/automationAgent";
import { CostAgent } from "./agents/costAgent";
import { BaseAgent, AgentResponse } from "./agents/baseAgent";
import { runFlowEngine } from "../flowEngine";

// Example initial KB data
const INITIAL_KB: KnowledgeEntry[] = [
  {
    id: "1",
    category: "general",
    question: "What is Entraiot?",
    answer: "Entraiot provides AI and IoT solutions to help businesses automate operations and generate more leads.",
    keywords: ["entraiot", "who are you", "company"]
  },
  {
    id: "2",
    category: "services",
    question: "What services do you offer?",
    answer: "We offer IoT sensor deployment, AI-powered predictive maintenance, lead generation automation, and custom dashboard development.",
    keywords: ["services", "offer", "solutions", "what do you do"]
  }
];

export class ChatbotSystem {
  private kbEngine: KnowledgeBaseEngine;
  private convEngine: ConversationEngine;
  private agents: BaseAgent[];

  constructor() {
    this.kbEngine = new KnowledgeBaseEngine(INITIAL_KB);
    this.convEngine = new ConversationEngine();
    
    // Register agents in priority order
    this.agents = [
      new LeadAgent(),
      new AutomationAgent(),
      new CostAgent(),
      new KnowledgeAgent(this.kbEngine)
    ];
  }

  public async processMessage(userId: string, message: string, memory: ConversationMemory): Promise<AgentResponse> {
    // 1. Detect Intent & Auto Trigger (handled inside engine or here)
    const { intent: detectedIntent } = this.convEngine.detectIntent(message);
    
    // Update memory intent if something new detected, but preserve flow if active
    if (detectedIntent && detectedIntent !== "FALLBACK" && detectedIntent !== "GREETING") {
      if (memory.intent !== detectedIntent) {
        memory.intent = detectedIntent;
        memory.step = 0; // Reset for new flow
      }
    }

    // 2. Try Flow Engine
    let response = runFlowEngine(memory, message);

    // 3. Anti-Repeat Logic
    if (response && response.reply === memory.last_reply) {
      // Move to next step automatically if it's a repeat
      memory.step += 1;
      response = runFlowEngine(memory, message);
    }

    if (response) {
      // 4. Update Memory for next turn
      memory.last_reply = response.reply;
      memory.step += 1; // Always increment step after successful flow response

      return {
        reply: response.reply,
        ctas: response.buttons?.map(b => ({
          label: b,
          action: "send_message",
          payload: b
        })),
        trigger_lead_capture: response.trigger_lead_capture
      };
    }

    // 5. Fallback Rule
    // Fallback ONLY if no flow active
    return {
      reply: "I can help you with leads, automation, or cost reduction. What's your priority?",
      ctas: [
        { label: "I want more leads", action: "send_message", payload: "I want more leads" },
        { label: "I want automation", action: "send_message", payload: "I want automation" },
        { label: "Reduce operational cost", action: "send_message", payload: "Reduce operational cost" }
      ]
    };
  }

  public getKB() { return this.kbEngine; }
}

// Singleton instance
export const chatbotSystem = new ChatbotSystem();
