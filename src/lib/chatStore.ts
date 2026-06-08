import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "chat-sessions.json");

export interface ChatMessage {
  role: "user" | "bot";
  text: string;
  time: string;
}

export interface UserSession {
  userId: string;
  email?: string;
  name?: string;
  intent?: string;
  businessType?: string;
  score: number;
  leadLabel: "Cold" | "Warm" | "Hot";
  lastActive: string;
  messages: ChatMessage[];
}

export function logInteraction(userId: string, userMessage: string, botReply: string, intent: string | null) {
  const sessions = readSessions();
  const now = new Date().toISOString();

  if (!sessions[userId]) {
    sessions[userId] = {
      userId,
      score: 0,
      leadLabel: "Cold",
      lastActive: now,
      messages: []
    };
  }

  const session = sessions[userId];
  session.lastActive = now;
  if (intent) session.intent = intent;

  session.messages.push({
    role: "user",
    text: userMessage,
    time: now
  });

  session.messages.push({
    role: "bot",
    text: botReply,
    time: now
  });

  // Limit message history per user if needed, e.g., last 100
  if (session.messages.length > 100) {
    session.messages = session.messages.slice(-100);
  }

  writeSessions(sessions);
}

export function updateUserInfo(userId: string, data: { email?: string; name?: string; intent?: string; businessType?: string; score?: number; leadLabel?: "Cold" | "Warm" | "Hot" }) {
  const sessions = readSessions();
  if (sessions[userId]) {
    const session = sessions[userId];
    if (data.email !== undefined) session.email = data.email;
    if (data.name !== undefined) session.name = data.name;
    if (data.intent !== undefined) session.intent = data.intent;
    if (data.businessType !== undefined) session.businessType = data.businessType;
    if (data.score !== undefined) session.score = data.score;
    if (data.leadLabel !== undefined) {
      session.leadLabel = data.leadLabel;
    } else if (data.score !== undefined) {
      if (session.score >= 70) session.leadLabel = "Hot";
      else if (session.score >= 40) session.leadLabel = "Warm";
      else session.leadLabel = "Cold";
    }
    writeSessions(sessions);
  }
}

export function deleteSession(userId: string) {
  const sessions = readSessions();
  if (sessions[userId]) {
    delete sessions[userId];
    writeSessions(sessions);
  }
}

export function getAllSessions(): UserSession[] {
  const sessions = readSessions();
  return Object.values(sessions).sort((a, b) => 
    new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );
}

function readSessions(): Record<string, UserSession> {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8") || "{}";
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("readSessions error:", err);
  }
  return {};
}

function writeSessions(sessions: Record<string, UserSession>) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(sessions, null, 2), "utf-8");
  } catch (err) {
    console.error("writeSessions error:", err);
  }
}
