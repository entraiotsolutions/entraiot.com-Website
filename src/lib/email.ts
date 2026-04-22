import nodemailer from "nodemailer";
import { ENTRAIOT_CONTACT } from "@/lib/assistant-config";
import { sanitizeMultilineText, sanitizeText } from "@/lib/sanitize";

type TranscriptMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt?: string;
};

export type ChatNotificationPayload = {
  sessionId?: string;
  intent?: string;
  language?: string;
  latestUserMessage: string;
  leadHints?: {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  conversation?: TranscriptMessage[];
};

export type LeadEmailPayload = {
  name: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email: string;
  requirement?: string;
  sessionId?: string;
  source?: string;
  intent?: string;
  language?: string;
  conversation?: TranscriptMessage[];
};

type EmailResult =
  | { sent: true; skipped: false }
  | { sent: false; skipped: true; reason: string }
  | { sent: false; skipped: false; reason?: string };

let transporterCache: nodemailer.Transporter | null | undefined;

function getTransporter() {
  if (transporterCache !== undefined) return transporterCache;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log("SMTP USER:", user);

  if (!user || !pass) {
    transporterCache = null;
    return transporterCache;
  }

  transporterCache = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
    connectionTimeout: 12000,
    greetingTimeout: 12000,
    socketTimeout: 15000,
  });

  return transporterCache;
}

function formatConversation(conversation: TranscriptMessage[] = []) {
  if (!conversation.length) return "No conversation transcript provided.";
  return conversation
    .map((line, index) => {
      const role = line.role.toUpperCase();
      const content = sanitizeMultilineText(line.content, 1500);
      const when = line.createdAt ? ` (${line.createdAt})` : "";
      return `${index + 1}. ${role}${when}: ${content}`;
    })
    .join("\n");
}

export async function sendLeadNotificationEmail(payload: LeadEmailPayload): Promise<EmailResult> {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, skipped: true, reason: "SMTP not configured" };
  }

  const to = process.env.SALES_NOTIFICATION_EMAIL || ENTRAIOT_CONTACT.businessEmail;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || ENTRAIOT_CONTACT.infoEmail;
  const subject = `New Entraiot Lead: ${sanitizeText(payload.name, 120)} (${sanitizeText(payload.intent, 40) || "chat"})`;

  const requirement = sanitizeMultilineText(payload.requirement || "Not provided", 2000);
  const conversation = formatConversation(payload.conversation || []);

  const text = [
    "A new lead was captured from Entraiot AI Assistant.",
    "",
    `Name: ${sanitizeText(payload.name, 120)}`,
    `Email: ${sanitizeText(payload.email, 180)}`,
    `Phone: ${sanitizeText(payload.phoneNumber, 40)}`,
    `WhatsApp: ${sanitizeText(payload.whatsAppNumber, 40)}`,
    `Requirement: ${requirement}`,
    `Intent: ${sanitizeText(payload.intent, 40) || "Not detected"}`,
    `Language: ${sanitizeText(payload.language, 30) || "en"}`,
    `Session ID: ${sanitizeText(payload.sessionId, 100) || "N/A"}`,
    `Source: ${sanitizeText(payload.source, 120) || "chat-widget"}`,
    "",
    "Conversation Transcript:",
    conversation,
  ].join("\n");

  try {
    await transporter.sendMail({ from, to, subject, text });
    console.log("Email sent successfully");
    return { sent: true, skipped: false };
  } catch (err) {
    console.error("sendLeadNotificationEmail error:", err);
    return { sent: false, skipped: false, reason: String(err) };
  }
}

export async function sendChatNotificationEmail(payload: ChatNotificationPayload): Promise<EmailResult> {
  const transporter = getTransporter();
  if (!transporter) {
    return { sent: false, skipped: true, reason: "SMTP not configured" };
  }

  const to = process.env.SALES_NOTIFICATION_EMAIL || ENTRAIOT_CONTACT.businessEmail;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || ENTRAIOT_CONTACT.infoEmail;
  const subject = `Entraiot Chat Alert: ${sanitizeText(payload.intent, 40) || "new inquiry"}`;
  const conversation = formatConversation(payload.conversation || []);
  const hintName = sanitizeText(payload.leadHints?.name, 120);
  const hintEmail = sanitizeText(payload.leadHints?.email, 180);
  const hintPhone = sanitizeText(payload.leadHints?.phoneNumber, 40);

  const text = [
    "A chat event was detected in Entraiot AI Assistant.",
    "",
    `Name: ${hintName || "Not provided"}`,
    `Email: ${hintEmail || "Not provided"}`,
    `Phone: ${hintPhone || "Not provided"}`,
    `Intent: ${sanitizeText(payload.intent, 40) || "Not detected"}`,
    `Language: ${sanitizeText(payload.language, 30) || "en"}`,
    `Session ID: ${sanitizeText(payload.sessionId, 100) || "N/A"}`,
    `Latest User Message: ${sanitizeMultilineText(payload.latestUserMessage, 2000)}`,
    "",
    "Conversation Transcript:",
    conversation,
  ].join("\n");

  try {
    await transporter.sendMail({ from, to, subject, text });
    console.log("Email sent successfully");
    return { sent: true, skipped: false };
  } catch (err) {
    console.error("sendChatNotificationEmail error:", err);
    return { sent: false, skipped: false, reason: String(err) };
  }
}
