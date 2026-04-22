import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  message: z.string().trim().max(2000).optional(),
});

type LeadRecord = z.infer<typeof leadSchema> & {
  id: string;
  createdAt: string;
};

async function persistLead(record: LeadRecord) {
  const filePath = path.join(process.cwd(), "info", "leads.ndjson");
  await mkdir(path.dirname(filePath), { recursive: true });
  await appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      const err = parsed.error.issues[0]?.message ?? "Invalid lead";
      return NextResponse.json({ success: false, message: err }, { status: 400 });
    }

    const record: LeadRecord = {
      ...parsed.data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    await persistLead(record);

    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    console.error("/api/leads error", err);
    return NextResponse.json({ success: false, message: "Internal error" }, { status: 500 });
  }
}
