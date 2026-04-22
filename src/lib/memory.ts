export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
};

const SESSIONS = new Map<string, ChatMessage[]>();
const MAX_MESSAGES = 15;

export function getMessages(sessionId: string): ChatMessage[] {
  if (!sessionId) return [];
  return SESSIONS.get(sessionId) ?? [];
}

export function addMessage(sessionId: string, message: ChatMessage) {
  if (!sessionId) return;
  const list = SESSIONS.get(sessionId) ?? [];
  const msg = { ...message, createdAt: new Date().toISOString() };
  list.push(msg);
  // keep only the last MAX_MESSAGES
  if (list.length > MAX_MESSAGES) list.splice(0, list.length - MAX_MESSAGES);
  SESSIONS.set(sessionId, list);
}

export function clearSession(sessionId: string) {
  SESSIONS.delete(sessionId);
}

export default {
  getMessages,
  addMessage,
  clearSession,
};
