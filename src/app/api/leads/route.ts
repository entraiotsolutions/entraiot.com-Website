/**
 * /src/app/api/leads/route.ts
 * ─────────────────────────────────────────────────────────────
 * Lead Capture & Storage API
 * POST /api/leads  → save lead data + trigger email notification
 * GET  /api/leads  → return all leads (admin-only via secret)
 * ─────────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getLeadLabel } from "@/lib/conversationMemory";
import { updateUserInfo } from "@/lib/chatStore";

export const runtime = "nodejs";

// ── Types ─────────────────────────────────────────────────────

export interface LeadRecord {
  id: string;
  sessionId: string;
  name?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  requirement?: string;
  intent?: string;
  business_type?: string;
  urgency?: string;
  lead_score: number;
  lead_label: "cold" | "warm" | "hot";
  source: string;
  conversation?: { role: string; content: string }[];
  created_at: string;
  updated_at: string;
}

// ── File-based storage (swap for PostgreSQL in production) ─────

const LEADS_FILE = path.join(process.cwd(), "chat-leads.json");

async function readLeads(): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: LeadRecord[]): Promise<void> {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Validation ────────────────────────────────────────────────

function validateLeadRequest(body: Record<string, unknown>): {
  valid: boolean;
  error?: string;
} {
  if (!body.email && !body.phone) {
    return { valid: false, error: "At least email or phone is required." };
  }
  if (body.email && typeof body.email === "string") {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);
    if (!emailOk) return { valid: false, error: "Invalid email address." };
  }
  return { valid: true };
}

// ── Optional: Email notification (nodemailer) ──────────────────

async function sendLeadNotificationEmail(lead: LeadRecord): Promise<void> {
  try {
    if (!process.env.SMTP_HOST || !process.env.NOTIFY_EMAIL) return;

    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.default.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subject = `🔥 New ${lead.lead_label.toUpperCase()} Lead — ${lead.name || "Anonymous"} (Score: ${lead.lead_score})`;
    const html = `
      <h2>New Lead from Entraiot Chatbot</h2>
      <table style="border-collapse:collapse;width:100%;">
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.name || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.email || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.phone || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>WhatsApp</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.whatsapp || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Industry</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.business_type || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Intent</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.intent || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Urgency</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.urgency || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Lead Score</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.lead_score} (${lead.lead_label})</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Requirement</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.requirement || "—"}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Source</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.source}</td></tr>
        <tr><td style="padding:8px;border:1px solid #eee;"><strong>Captured At</strong></td><td style="padding:8px;border:1px solid #eee;">${lead.created_at}</td></tr>
      </table>
    `;

    await transporter.sendMail({
      from:    process.env.SMTP_USER,
      to:      process.env.NOTIFY_EMAIL,
      subject,
      html,
    });
  } catch (err) {
    console.warn("[leads/route] Email notification failed:", err);
  }
}

// ── POST /api/leads ────────────────────────────────────────────

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Validate
  const validation = validateLeadRequest(body);
  if (!validation.valid) {
    return NextResponse.json(
      { success: false, error: validation.error },
      { status: 422 }
    );
  }

  const now = new Date().toISOString();
  const lead_score = typeof body.lead_score === "number" ? body.lead_score : 30;

  const lead: LeadRecord = {
    id:            generateId(),
    sessionId:     String(body.sessionId || ""),
    name:          body.name          ? String(body.name)          : undefined,
    email:         body.email         ? String(body.email)         : undefined,
    phone:         body.phone         ? String(body.phone)         : undefined,
    whatsapp:      body.whatsapp      ? String(body.whatsapp)      : undefined,
    requirement:   body.requirement   ? String(body.requirement)   : undefined,
    intent:        body.intent        ? String(body.intent)        : undefined,
    business_type: body.business_type ? String(body.business_type) : undefined,
    urgency:       body.urgency       ? String(body.urgency)       : undefined,
    lead_score,
    lead_label:    getLeadLabel(lead_score),
    source:        String(body.source || "chatbot"),
    conversation:  Array.isArray(body.conversation)
      ? (body.conversation as { role: string; content: string }[])
      : undefined,
    created_at: now,
    updated_at: now,
  };

  // Sync with chat sessions
  if (lead.sessionId) {
    updateUserInfo(lead.sessionId, { 
      email: lead.email, 
      name: lead.name, 
      intent: lead.intent 
    });
  }

  try {
    // Check for duplicate (same email or phone in last 24h)
    const existing = await readLeads();
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const isDuplicate = existing.some((l) => {
      const created = new Date(l.created_at).getTime();
      if (created < oneDayAgo) return false;
      return (
        (lead.email && l.email === lead.email) ||
        (lead.phone && l.phone === lead.phone)
      );
    });

    if (isDuplicate) {
      // Update existing record instead of creating duplicate
      const updatedLeads = existing.map((l) => {
        const isSame =
          (lead.email && l.email === lead.email) ||
          (lead.phone && l.phone === lead.phone);
        if (!isSame) return l;
        return {
          ...l,
          ...lead,
          id: l.id,
          created_at: l.created_at,
          updated_at: now,
          lead_score: Math.max(l.lead_score, lead_score),
          lead_label: getLeadLabel(Math.max(l.lead_score, lead_score)),
        };
      });
      await writeLeads(updatedLeads);
      return NextResponse.json({ success: true, id: lead.id, duplicate: true });
    }

    // Save new lead
    existing.push(lead);
    await writeLeads(existing);

    // Fire email notification (non-blocking)
    sendLeadNotificationEmail(lead).catch(() => {});

    return NextResponse.json(
      { success: true, id: lead.id, lead_label: lead.lead_label },
      { status: 201 }
    );
  } catch (err) {
    console.error("[leads/route] Save error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to save lead" },
      { status: 500 }
    );
  }
}

// ── GET /api/leads (admin, protected by secret) ────────────────

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  const adminSecret = process.env.ADMIN_SECRET;

  if (!adminSecret || secret !== adminSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await readLeads();
    const sorted = [...leads].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return NextResponse.json(
      { success: true, count: sorted.length, leads: sorted },
      { status: 200 }
    );
  } catch (err) {
    console.error("[leads/route] Read error:", err);
    return NextResponse.json({ error: "Failed to read leads" }, { status: 500 });
  }
}
