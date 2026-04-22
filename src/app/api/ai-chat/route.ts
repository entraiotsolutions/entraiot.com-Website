import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type Intent = "pricing" | "demo" | "services" | "general" | "clarify";

interface ChatRequestBody {
  message: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

interface ApiResponse {
  success: boolean;
  reply: string;
  intent: string;
  suggestedActions: string[];
  showUserMessage?: boolean;
  systemMessage?: string;
  error?: string;
}

const SYSTEM_PROMPT = `You are Entraiot AI Growth Concierge — an expert consultant for Entraiot Solutions.
You help users understand AI, IoT, and automation solutions and guide them toward services, demos, or consultations.
Behavior rules:
- Answer only about AI, IoT, and automation solutions.
- Help users with services, pricing guidance, and demo scheduling.
- Use a professional, human-like tone.
- Never hallucinate; if information is missing or ambiguous, ask a concise clarifying question.
- Prioritize provided context and retrieved content when available.
- Detect user intent (pricing, demo, services, general) and recommend clear next steps.
Be concise, factual, and provide suggested actions as relevant.`;

function detectIntent(text: string): Intent {
  const t = (text || "").toLowerCase();
  if (/\b(price|pricing|cost|quote|estimate|subscription|fee)\b/.test(t)) return "pricing";
  if (/\b(demo|demonstration|showcase|trial|walkthrough)\b/.test(t)) return "demo";
  if (/\b(service|services|solution|solutions|implement|integration|consult)\b/.test(t)) return "services";
  if (text.trim().length < 20 || /\b(something|any|help me|what can you|not sure|clarify)\b/.test(t)) return "clarify";
  return "general";
}

interface KnowledgeDoc {
  url?: string;
  title?: string;
  text: string;
  headings?: string[];
  keywords?: string[];
}

type VectorItem = {
  id: string;
  text: string;
  embedding: number[];
  source?: string;
  title?: string;
};

const VECTOR_STORE: VectorItem[] = [];
let VECTOR_STORE_INITIALIZED = false;

function chunkText(text: string, maxLen = 800, overlap = 100): string[] {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const chunks: string[] = [];
  for (const para of paragraphs) {
    if (para.length <= maxLen) {
      chunks.push(para);
      continue;
    }
    for (let i = 0; i < para.length; i += maxLen - overlap) {
      const chunk = para.slice(i, i + maxLen);
      chunks.push(chunk);
      if (i + maxLen >= para.length) break;
    }
  }
  return chunks;
}

async function fetchEmbeddings(inputs: string[]): Promise<number[][]> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small";
  if (!OPENAI_API_KEY) {
    return inputs.map(() => Array(1536).fill(0));
  }

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input: inputs }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || "OpenAI Embeddings API error";
    throw new Error(msg);
  }
  return data.data.map((d: { embedding: number[] }) => d.embedding);
}

function cosineSimilarity(a: number[], b: number[]) {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function initVectorStoreIfNeeded() {
  if (VECTOR_STORE_INITIALIZED) return;
  try {
    const kbPath = path.join(process.cwd(), "src", "lib", "knowledge.json");
    const raw = await fs.readFile(kbPath, "utf-8");
    const docs = JSON.parse(raw) as KnowledgeDoc[];
    const chunks: { text: string; title?: string; source?: string }[] = [];
    for (const doc of docs) {
      const parts = chunkText(doc.text || "");
      for (const part of parts) {
        chunks.push({ text: part, title: doc.title, source: doc.url });
      }
    }

    if (chunks.length === 0) {
      VECTOR_STORE_INITIALIZED = true;
      return;
    }

    // batch embeddings to avoid huge payloads
    const batchSize = 50;
    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const inputs = batch.map((c) => c.text);
      const embeddings = await fetchEmbeddings(inputs);
      for (let j = 0; j < batch.length; j++) {
        VECTOR_STORE.push({
          id: `kb-${i + j}`,
          text: batch[j].text,
          embedding: embeddings[j],
          source: batch[j].source,
          title: batch[j].title,
        });
      }
    }

    VECTOR_STORE_INITIALIZED = true;
  } catch (e) {
    console.error("Failed to initialize vector store:", e);
    VECTOR_STORE_INITIALIZED = true; // avoid retry storms; leave store empty
  }
}

async function getRelevantContext(query: string): Promise<string[]> {
  await initVectorStoreIfNeeded();
  if (!VECTOR_STORE.length) return [];

  const emb = await fetchEmbeddings([query]);
  const qEmb = emb?.[0] || Array(1536).fill(0);
  const scored = VECTOR_STORE.map((item) => ({ item, score: cosineSimilarity(qEmb, item.embedding) }));
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3).filter((s) => s.score > 0);
  return top.map((s) => {
    const meta = [s.item.title ? `Title: ${s.item.title}` : null, s.item.source ? `Source: ${s.item.source}` : null].filter(Boolean).join(" | ");
    return meta ? `${meta}\n\n${s.item.text}` : s.item.text;
  });
}

async function callOpenAI(messages: { role: "system" | "user" | "assistant"; content: string }[]): Promise<string> {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
  if (!OPENAI_API_KEY) {
    return "AI assistant is not configured yet. Please contact support.";
  }
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      temperature: 0.2,
      max_tokens: 700,
      n: 1,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    const msg = data?.error?.message || "OpenAI API error";
    throw new Error(msg);
  }

  const reply = data.choices?.[0]?.message?.content ?? "";
  return String(reply).trim();
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

    if (!message) {
      return NextResponse.json({ success: false, reply: "", intent: "", suggestedActions: [], error: "Missing `message` in request body" } as ApiResponse, { status: 400 });
    }

    const intent = detectIntent(message);

    if (intent === "clarify") {
      const reply = "Could you provide a bit more detail? For example: your industry, a one-line problem statement, and the desired outcome.";
      return NextResponse.json(
        { success: true, reply, intent: "clarify", suggestedActions: ["Provide project details"], showUserMessage: true } as ApiResponse,
        { status: 200 }
      );
    }

    let context: string[] = [];

    if (process.env.OPENAI_API_KEY) {
      context = intent === "general" ? [] : await getRelevantContext(message);
    }
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (context.length) {
      messages.push({ role: "system", content: `Retrieved context:\n${context.join("\n\n")}` });
    }

    messages.push({ role: "user", content: `User query:\n${message}\n\nAnswer concisely. Use the retrieved context when relevant. If the answer requires specifics not present in the context, ask a short clarifying question.` });

    const reply = await callOpenAI(messages);

    const suggestedActions = suggestedActionsForIntent(intent);

    const response: ApiResponse = { success: true, reply, intent, suggestedActions, showUserMessage: true };
    return NextResponse.json(response, { status: 200 });
  } catch (err: unknown) {
    console.error("/api/ai-chat error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, reply: "", intent: "", suggestedActions: [], showUserMessage: false, systemMessage: String(message), error: message } as ApiResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { success: false, reply: "", intent: "", suggestedActions: [], showUserMessage: false, systemMessage: "GET not supported. Use POST with JSON { message }", error: "GET not supported. Use POST with JSON { message }" } as ApiResponse,
    { status: 405 }
  );
}
