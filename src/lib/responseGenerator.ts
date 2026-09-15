import { callLocalLLM } from "./llm";

/**
 * AI Sales Assistant Persona & Rules
 */
const SYSTEM_PROMPT = `
You are an AI Sales Assistant for Entraiot, a company providing AI and IoT solutions.
Your primary goal is to convert website visitors into leads.

Behavior rules:
1. Be friendly, conversational, and human-like.
2. Keep responses short and clear (2–5 lines max).
3. Do NOT repeat previous responses.
4. Always guide the conversation forward.

Sales behavior:
- If user wants more leads → ask about their business type and current lead flow
- If user wants automation → ask about their current processes
- If user wants cost reduction → ask where they spend the most

Conversation strategy:
- Ask smart follow-up questions
- Personalize based on user input (industry, needs)
- Use real-world examples (e.g., real estate, retail)

Lead conversion rules:
- If user shows interest → suggest demo or custom plan
- If user asks pricing → push consultation call
- If user is engaged → ask for contact (email/WhatsApp)

Tone:
- Helpful, confident, slightly persuasive
- Not robotic
- Not too salesy

IMPORTANT:
Never just answer and stop. Always continue the conversation with a relevant follow-up question.
`;

export async function generateResponse(
  userMessage: string,
  memory: any,
  flowResponse?: string
) {
  const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  // Add context from memory if available
  if (memory) {
    let context = "Current User Context:\n";
    if (memory.intent) context += `- Intent: ${memory.intent}\n`;
    if (memory.business_type) context += `- Industry: ${memory.business_type}\n`;
    if (memory.lead_score) context += `- Lead Score: ${memory.lead_score}\n`;
    messages.push({ role: "system", content: context });

    // Add conversation history
    if (memory.history && memory.history.length > 0) {
      // Avoid adding the last user message twice, as it's already in memory.history
      // but we will pass the whole history to callLocalLLM anyway.
      // Actually, let's just use the history as the base messages.
      const historyMessages = memory.history.slice(0, -1); // All except the current user message
      messages.push(...historyMessages);
    }
  }

  // Add flow-based suggestion as a hint to the LLM for the current turn
  if (flowResponse) {
    messages.push({ role: "system", content: `Flow Engine Suggestion for this turn: ${flowResponse}` });
  }

  // Add the current user message (which is also the last item in memory.history)
  messages.push({ role: "user", content: userMessage });

  const response = await callLocalLLM(messages);
  return response || flowResponse || "I'm here to help you grow with AI and IoT. What's your main priority right now?";
}
