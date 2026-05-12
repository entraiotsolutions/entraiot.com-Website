"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck2,
  Loader2,
  Maximize2,
  MessageCircleMore,
  Minimize2,
  PhoneCall,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { getCallLink, getWhatsappLink } from "@/lib/assistant-config";

// ── Types ─────────────────────────────────────────────────────
type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  buttons?: string[];
}

interface CTA {
  label: string;
  action: "send_message" | "open_lead_form" | "open_url" | "whatsapp";
  payload: string;
}

interface ChatState {
  intent: string | null;
  stage: string;
  business_type: string | null;
  urgency: string | null;
  lead_captured: boolean;
  lead_score: number;
}

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  requirement: string;
}

const STORAGE_KEY = "entraiot_ai_chat_msgs";
const SESSION_KEY = "entraiot_ai_chat_session";

function generateSessionId() {
  return `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// ── Component ─────────────────────────────────────────────────
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  
  // Lead Capture State
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadFormData>({ name: "", email: "", phone: "", requirement: "" });
  const [submittingLead, setSubmittingLead] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);

  // ── Initialization ──────────────────────────────────────────
  useEffect(() => {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    setSessionId(sid);

    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored));
    } catch {}
  }, []);

  // ── Trigger Initial Message ─────────────────────────────────
  useEffect(() => {
    if (open && messages.length === 0 && !loading) {
      sendMessage("__INIT__", true);
    }
  }, [open]);

  // ── Auto-scroll & Save ──────────────────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Auto-open Timing ──────────────────────────────────────
  useEffect(() => {
    const hasBeenOpened = sessionStorage.getItem("entraiot_chat_opened");
    if (!hasBeenOpened) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("entraiot_chat_opened", "true");
      }, 5000); // Open after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // ── Send Message ────────────────────────────────────────────
  const sendMessage = async (text: string, isHidden = false) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    if (!isHidden) {
      setMessages((prev) => [
        ...prev,
        { id: `u_${Date.now()}`, role: "user", content: trimmed, createdAt: new Date().toISOString() },
      ]);
    }
    
    setInput("");
    setLoading(true);

    const startTime = Date.now();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, userId: sessionId }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error response:", text);
        throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Unexpected response format:", text);
        throw new Error("Invalid response format from server");
      }

      const data = await res.json();
      
      // Calculate elapsed time to ensure a minimum typing delay of 1s
      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(0, 1000 - elapsed);

      setTimeout(() => {
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { 
              id: `a_${Date.now()}`, 
              role: "assistant", 
              content: data.reply, 
              buttons: data.buttons,
              createdAt: new Date().toISOString() 
            },
          ]);
        }

        if (data.trigger_lead_capture) setShowLeadForm(true);
        setLoading(false);
      }, remainingDelay);
      
    } catch (err) {
      console.error("Chat error:", err);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { id: `a_${Date.now()}`, role: "assistant", content: "I'm having trouble connecting. Please try again.", createdAt: new Date().toISOString() },
      ]);
    }
  };

  // ── Handle CTAs ─────────────────────────────────────────────
  const handleCtaClick = (cta: CTA) => {
    if (cta.action === "send_message") {
      sendMessage(cta.payload);
    } else if (cta.action === "open_lead_form") {
      setShowLeadForm(true);
    } else if (cta.action === "whatsapp") {
      window.open(getWhatsappLink(cta.payload), "_blank");
    } else if (cta.action === "open_url") {
      window.open(cta.payload, "_self");
    }
  };

  // ── Submit Lead Form ────────────────────────────────────────
  const submitLead = async () => {
    if (!leadForm.name || !leadForm.email || !leadForm.phone) {
      alert("Please fill in your name, email, and phone number.");
      return;
    }

    setSubmittingLead(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          ...leadForm,
          source: "chatbot-inline-form",
        }),
      });

      if (res.ok) {
        setShowLeadForm(false);
        setMessages((prev) => [
          ...prev,
          { id: `a_${Date.now()}`, role: "assistant", content: "Thanks for sharing! Our team will be in touch shortly to help you with your custom AI plan.", createdAt: new Date().toISOString() },
        ]);
        // Also inform the chat engine
        fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "I submitted my details.", userId: sessionId, leadData: leadForm }),
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit details. Please try again.");
    } finally {
      setSubmittingLead(false);
    }
  };

  const chatWindowClass = expanded
    ? "fixed inset-3 sm:inset-6 md:inset-10 z-50"
    : "fixed right-4 bottom-24 sm:right-6 sm:bottom-28 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[min(75vh,650px)]";

  return (
    <>
      <div className="fixed right-4 bottom-6 z-50 sm:right-6 sm:bottom-6">
        <motion.button
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-2xl hover:shadow-indigo-500/50 transition-all"
        >
          {open ? <X className="h-6 w-6" /> : <MessageCircleMore className="h-6 w-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={chatWindowClass}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <header className="flex items-center justify-between bg-slate-900 px-4 py-4 text-white">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    <Sparkles className="h-3.5 w-3.5" /> AI Sales Assistant
                  </p>
                  <h3 className="text-base font-semibold">Entraiot Growth Concierge</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setExpanded(!expanded)} className="p-1.5 hover:bg-white/20 rounded-md">
                    {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </button>
                  <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/20 rounded-md">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Messages Area */}
              <div ref={messagesRef} className="flex-1 overflow-y-auto bg-slate-50 p-4 space-y-6">
                {messages.map((msg, index) => {
                  const isLast = index === messages.length - 1;
                  return (
                    <div key={msg.id} className="space-y-3">
                      <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          msg.role === "user" 
                            ? "bg-indigo-600 text-white rounded-br-sm" 
                            : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm whitespace-pre-wrap"
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                      
                      {/* Contextual Buttons - Only for last bot message */}
                      {msg.role === "assistant" && msg.buttons && isLast && !loading && (
                        <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                          {msg.buttons.map((btn, i) => (
                            <button
                              key={i}
                              onClick={() => sendMessage(btn)}
                              className="rounded-xl border border-indigo-200 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm active:scale-95"
                            >
                              {btn}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl bg-white border border-slate-200 px-4 py-2 text-sm text-slate-500 shadow-sm rounded-bl-sm">
                      <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs and Form Area */}
              <div className="bg-white border-t border-slate-100 p-3">
                {showLeadForm && (
                  <div className="mb-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                    <p className="mb-2 text-sm font-medium text-slate-800">Where should we send your AI plan?</p>
                    <div className="space-y-2">
                      <input type="text" placeholder="Your Name" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={leadForm.name} onChange={e => setLeadForm({...leadForm, name: e.target.value})} />
                      <input type="email" placeholder="Your Email" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={leadForm.email} onChange={e => setLeadForm({...leadForm, email: e.target.value})} />
                      <input type="tel" placeholder="Phone Number" className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={leadForm.phone} onChange={e => setLeadForm({...leadForm, phone: e.target.value})} />
                      <button onClick={submitLead} disabled={submittingLead} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white flex justify-center items-center gap-2 disabled:opacity-50">
                        {submittingLead ? <Loader2 className="h-4 w-4 animate-spin"/> : <CalendarCheck2 className="h-4 w-4"/>} Submit Details
                      </button>
                    </div>
                  </div>
                )}


                {/* Input Area */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-full border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                    disabled={loading || showLeadForm}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading || showLeadForm}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white disabled:bg-slate-300 transition-colors"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
