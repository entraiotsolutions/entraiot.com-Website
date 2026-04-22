import { NextResponse } from "next/server";
import { handleChat } from "@/lib/agenticChat";

export const runtime = "nodejs";

/**
 * Chat API Route
 * This route delegates logic to the local Agentic RAG engine.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = body?.message;
    const sessionId = body?.sessionId || `s_${Date.now()}`;

    if (!message) {
      return NextResponse.json(
        { 
          success: false, 
          reply: "Message is required.",
          intent: 'unclear',
          suggestedActions: ["Services", "Pricing", "Book Demo"]
        }, 
        { status: 400 }
      );
    }

    // Call the Agentic RAG system
    const response = handleChat(message, sessionId);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        reply: "I'm having trouble connecting right now. Could you try again in a moment?",
        intent: 'unclear',
        suggestedActions: ["Services", "Pricing", "Book Demo"]
      }, 
      { status: 500 }
    );
  }
}
