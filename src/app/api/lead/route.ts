import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leadStore";
import { sendLeadEmail } from "@/lib/mailer";
import { sanitizeMultilineText, sanitizeText } from "@/lib/sanitize";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    let systemMessage = "";

    // persist lead to chat-leads.json
    try {
      saveLead(body);
      systemMessage += "lead_saved";
    } catch (err: any) {
      console.error("saveLead error:", err);
      systemMessage += `save_error:${err?.message || String(err)}`;
    }

    // send notification emails (to business and to user if email present)
    try {
      await sendLeadEmail(body);
      systemMessage += systemMessage ? ";email_sent" : "email_sent";
    } catch (err: any) {
      console.error("sendLeadEmail error:", err);
      systemMessage += `;email_error:${err?.message || String(err)}`;
    }

    // Friendly, short assistant message for the UI
    const reply = "Got it 👍 Our team will contact you shortly.";

    return NextResponse.json(
      {
        success: true,
        reply,
        intent: (body as any)?.intent || "interested",
        showUserMessage: true,
        systemMessage,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("/api/lead error:", error);
    return NextResponse.json(
      {
        success: false,
        reply: "",
        intent: "",
        showUserMessage: false,
        systemMessage: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}

