import { flows, FOLLOW_UP_BUTTONS, type FlowStep } from './chatbotFlows';

export type ChatState = {
  intent: "LEADS" | "AUTOMATION" | "COST" | "EXPLORE" | null;
  step: number;
  answers: Record<string, any>;
};

export type BotResponse = {
  text: string;
  options: string[];
  state: ChatState;
  capture?: "email" | "phone" | "name" | "message";
};

/**
 * Detects user intent based on the message.
 */
export function detectIntent(message: string): ChatState["intent"] {
  const msg = message.toLowerCase();
  
  if (msg.includes("lead") || msg.includes("sales") || msg.includes("customer") || msg.includes("growth")) {
    return "LEADS";
  }
  if (msg.includes("automation") || msg.includes("workflow") || msg.includes("manual") || msg.includes("efficiency")) {
    return "AUTOMATION";
  }
  if (msg.includes("cost") || msg.includes("price") || msg.includes("save") || msg.includes("bill") || msg.includes("budget")) {
    return "COST";
  }
  
  return "EXPLORE";
}

/**
 * Main response generator logic.
 */
export function getBotResponse(state: ChatState, message: string): BotResponse {
  let { intent, step, answers } = state;

  // 1. Detect intent if not already set
  if (!intent) {
    intent = detectIntent(message);
    step = 0;
  }

  const currentFlow = flows[intent] || flows.EXPLORE;
  
  // 2. Handle data capture from previous step
  if (step > 0) {
    const prevStep = currentFlow[step - 1];
    if (prevStep && prevStep.capture) {
      answers[prevStep.capture] = message;
    }
  }

  // 3. Check if we've reached the end of the flow
  if (step >= currentFlow.length) {
    return {
      text: "Is there anything else I can help you with today? I'm here to help you grow your business with AI & IoT.",
      options: FOLLOW_UP_BUTTONS,
      state: { intent, step, answers }
    };
  }

  // 4. Get current step content
  const currentStep = currentFlow[step];
  
  // 5. Increment step for next interaction
  const nextState: ChatState = {
    intent,
    step: step + 1,
    answers
  };

  // 6. Merge step options with global follow-up buttons
  const stepOptions = currentStep.options || [];
  const finalOptions = Array.from(new Set([...stepOptions, ...FOLLOW_UP_BUTTONS])).slice(0, 6);

  // 7. Handle "Free Text" fallback
  // If user input doesn't match any option and isn't a capture step
  const isButtonMatch = stepOptions.some(opt => opt.toLowerCase() === message.toLowerCase());
  const isInitialMessage = step === 0;
  
  if (!isButtonMatch && !currentStep.capture && !isInitialMessage) {
    // If it's a random message not matching options, gently guide back
    return {
      text: "Good question 👍 Let me guide you better to find the right solution for you.",
      options: ["I want more leads", "I want automation", "Reduce cost", ...FOLLOW_UP_BUTTONS],
      state: { ...state, intent: null, step: 0 } // Reset intent to allow re-detection
    };
  }

  return {
    text: currentStep.text,
    options: finalOptions,
    capture: currentStep.capture,
    state: nextState
  };
}

/**
 * Legacy support / Wrapper for existing integrations
 */
export function handleChat(message: string, sessionId: string, currentState?: ChatState): BotResponse {
  const state = currentState || { intent: null, step: 0, answers: {} };
  return getBotResponse(state, message);
}
