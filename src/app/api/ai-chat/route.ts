import { NextResponse } from "next/server";
import { runFlow } from "@/lib/aiFlowEngine";

const MEMORY: Record<string, any> = {};

type Intent = "pricing" | "demo" | "services" | "general" | "clarify";

interface ChatRequestBody {
  message: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

function detectIntent(text: string): Intent {
  const t = (text || "").toLowerCase();
  if (/\b(price|pricing|cost|quote|estimate|subscription|fee)\b/.test(t)) return "pricing";
  if (/\b(demo|demonstration|showcase|trial|walkthrough)\b/.test(t)) return "demo";
  if (/\b(service|services|solution|solutions|implement|integration|consult)\b/.test(t)) return "services";
  if (text.trim().length < 20 || /\b(something|any|help me|what can you|not sure|clarify)\b/.test(t)) return "clarify";
  return "general";
}

function suggestedActionsForIntent(intent: Intent): string[] {
  switch (intent) {
    case "pricing":
      return ["Request a custom quote", "Share project requirements", "Schedule a pricing call"];
    case "demo":
      return ["Book a live demo", "Watch a recorded demo", "Request a PoC"];
    case "services":
      return ["Request services overview", "Schedule consultation", "Download a case study"];
    default:
      return ["Ask a follow-up question", "Schedule a demo", "Request a quote"];
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ChatRequestBody;
    const message = (body?.message || "").toString().trim();
    const userId = body.userId || "default";

    if (!message) {
      return NextResponse.json({ success: false, reply: "", intent: "", suggestedActions: [], error: "Missing `message` in request body" }, { status: 400 });
    }

    if (!MEMORY[userId]) {
      MEMORY[userId] = {
        intent: null,
        business_type: null,
        stage: "start",
        lead_score: 0,
        lead_captured: false,
      };
    }
    const memory = MEMORY[userId];

    const intent = detectIntent(message);
    memory.intent = intent;
    if (/price|cost|quote/i.test(message)) memory.lead_score += 10;
    if (/demo|call|meeting/i.test(message)) memory.lead_score += 20;
    if (/contact|phone|email/i.test(message)) memory.lead_score += 30;

    if (intent === "clarify") {
      const reply = "Could you provide a bit more detail? For example: your industry, a one-line problem statement, and the desired outcome.";
      return NextResponse.json(
        { success: true, reply, intent: "clarify", suggestedActions: ["Provide project details"], showUserMessage: true },
        { status: 200 }
      );
    }

    // 1. Get flow-based logic response
    const flowResult = runFlow(memory);

    const reply = flowResult.reply;
    const suggestedActions = suggestedActionsForIntent(intent);

    return NextResponse.json({ success: true, reply, intent, suggestedActions, showUserMessage: true });
  } catch (err: any) {
    console.error("/api/ai-chat error:", err);
    return NextResponse.json(
      { success: false, reply: "I'm having a bit of trouble connecting. How else can I help you?", error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, error: "GET not supported" },
    { status: 405 }
  );
}
