import { siteKnowledge } from "./siteKnowledge";
import { domainKnowledge } from "./domainKnowledge";

export function getBestAnswer(message) {
  const msg = String(message || "").toLowerCase();

  // 1. Entraiot specific
  if (msg.includes("entraiot")) {
    return siteKnowledge.about;
  }

  // 2. Services
  for (const key in siteKnowledge.services) {
    if (Object.prototype.hasOwnProperty.call(siteKnowledge.services, key)) {
      if (msg.includes(key)) {
        return siteKnowledge.services[key];
      }
    }
  }

  // 3. Domain knowledge
  for (const item of domainKnowledge) {
    if (item.keys.some((k) => msg.includes(k))) {
      return item.answer;
    }
  }

  return null;
}

export function generateResponse(message) {
  const answer = getBestAnswer(message);

  if (answer) {
    return makeHuman(answer, message);
  }

  // no exact match — return a short heuristic explanation
  return generateSmartExplanation(message);
}

export function makeHuman(answer, message) {
  if (!answer) return answer;
  try {
    const msg = String(message || "").toLowerCase();
    if (msg.includes("what is")) {
      return answer;
    }
  } catch (e) {
    // ignore
  }

  return answer + "\n\nIf you want, I can explain how this applies to your business.";
}

export function generateSmartExplanation(message) {
  // Controlled clarification fallback — avoid vague intros
  return `Can you please clarify your question? I’ll give you a clear answer.`;
}

export default {
  getBestAnswer,
  generateResponse,
  makeHuman,
  generateSmartExplanation,
};
