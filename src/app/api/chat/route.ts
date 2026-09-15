import { NextRequest, NextResponse } from "next/server";
import { getMemory, updateMemory } from "@/lib/memory";
import { detectIntent } from "@/lib/intentDetector";
import { runFlowEngine } from "@/lib/flowEngine";
import { sendLeadNotificationEmail, sendLeadConfirmationEmail } from "@/lib/email";
import { logInteraction, updateUserInfo } from "@/lib/chatStore";

// ── EMAIL VALIDATION ──────────────────────────────────────────
const isEmail = (text: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text.trim());
};

export async function POST(req: NextRequest) {
  try {
    const { message, userId } = await req.json();

    if (!message || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ── INITIAL MESSAGE HANDLING ────────────────────────────────
    if (message === "__INIT__") {
      const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 17) return "Good afternoon";
        return "Good evening";
      };

      return NextResponse.json({
        reply: `${getGreeting()}! 🚀 Welcome to the Entraiot Growth Concierge.\n\nWe help businesses scale using high-performance AI and Industrial IoT solutions.\n\nWhat is your primary objective today? I can prepare a custom AI-driven roadmap for you in seconds.`,
        buttons: [
          "I want more leads",
          "I want automation",
          "Reduce operational cost",
          "Just exploring"
        ]
      });
    }

    // 1. Get memory
    let memory = getMemory(userId);

    // ── 2. EMAIL DETECTION (TRIGGER) ───────────────────────────
    if (isEmail(message)) {
      // Perform ALL actions:
      const userEmail = message.trim();
      
      // Save email in memory & mark lead as captured
      updateMemory(userId, { 
        last_reply: "Thanks for sharing your email! 🎉 Our Entraiot team will contact you shortly with your custom AI plan.",
        lead_captured: true,
        business_type: memory.business_type // preserve business type if detected earlier
      });

      // Update chat session with email and score
      updateUserInfo(userId, { email: userEmail, score: 50 });

      // Send email to user & admin (Safe try/catch)
      try {
        const payload = {
          name: "Entraiot Lead",
          email: userEmail,
          phoneNumber: "Not provided",
          whatsAppNumber: "Not provided",
          intent: memory.intent || "General Inquiry",
          sessionId: userId,
          source: "Chatbot"
        };

        // Fire and forget (don't await to avoid slowing down chat)
        sendLeadNotificationEmail(payload);
        sendLeadConfirmationEmail(payload);
      } catch (err) {
        console.error("Critical: Email sending failed but continuing chat flow:", err);
      }

      return NextResponse.json({
        reply: "Thanks for sharing your email! 🎉 Our Entraiot team will contact you shortly with your custom AI plan.",
        buttons: ["Show Demo", "Talk to Expert"]
      });
    }

    // ── 2.5 SCORING (KEYWORDS) ─────────────────────────────
    let addedScore = 0;
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("pricing") || lowerMsg.includes("cost")) addedScore += 20;
    if (lowerMsg.includes("demo")) addedScore += 30;
    
    if (addedScore > 0) {
      updateUserInfo(userId, { score: addedScore });
    }

    // ── 3. NORMAL FLOW ─────────────────────────────────────────
    // 2. Try Flow Engine (Auto Intent Trigger is inside)
    let flowResult = runFlowEngine(memory, message);

    // 3. Anti-Repeat System
    if (flowResult && flowResult.reply === memory.last_reply) {
      // Rule: DO NOT send same reply twice. Move to next step or rephrase.
      memory.step += 1;
      flowResult = runFlowEngine(memory, message);
    }

    let reply = "";
    let buttons: string[] = [];
    let triggerLeadCapture = false;

    if (flowResult) {
      reply = flowResult.reply;
      buttons = flowResult.buttons || [];
      triggerLeadCapture = !!flowResult.trigger_lead_capture;
      
      // Update memory with state
      updateMemory(userId, { 
        last_reply: reply,
        step: memory.step + 1, // Always increment step
        intent: memory.intent,
        business_type: memory.business_type
      });
    } else {
      // 4. Fallback Rule
      // Fallback ONLY if no intent detected AND no flow active
      reply = "I can help you with leads, automation, or cost reduction. What’s your priority?";
      buttons = ["I want more leads", "I want automation", "Reduce operational cost"];
      
      updateMemory(userId, { 
        intent: null, 
        step: 0,
        last_reply: reply
      });
    }

    // Ensure buttons are capped
    if (buttons.length > 5) {
      buttons = buttons.slice(0, 5);
    }

    const finalResponse = {
      reply: reply,
      buttons: buttons,
      trigger_lead_capture: triggerLeadCapture
    };

    // Log the interaction for admin dashboard
    logInteraction(userId, message, reply, memory.intent);
    
    // Sync business type and other info if available
    if (memory.business_type || memory.intent) {
      updateUserInfo(userId, { 
        businessType: memory.business_type || undefined,
        intent: memory.intent || undefined
      });
    }
    
    return NextResponse.json(finalResponse);

  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}