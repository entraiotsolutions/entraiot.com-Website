"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MessageCircle, Send, ChevronRight, Phone, ExternalLink,
  Sparkles, ArrowRight, User, Bot
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import flows, { ChatNode, ChatButton } from "@/lib/chatFlows";

// ─── Types ────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

interface LeadData {
  name: string;
  phone: string;
  industry?: string;
  employees?: string;
  monthlySalary?: string;
  flow?: string;
}

// ─── Constants ───────────────────────────────────────────────

const WHATSAPP_NUMBER = "+91 9944442061"; // ← update this
const STORAGE_KEY = "entraiot_lead_chat_v1";
const LEAD_DONE_KEY = "entraiot_lead_captured";

// ─── Helpers ─────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 9);

function makeBotMessages(node: ChatNode): Message[] {
  return node.messages.map((text) => ({ id: uid(), role: "bot" as const, text }));
}

// ─── Typing indicator ────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="bg-white/80 backdrop-blur border border-white/60 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-violet-400"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Lead form ────────────────────────────────────────────────

interface LeadFormProps {
  onSubmit: (name: string, phone: string) => void;
  loading: boolean;
}

function LeadForm({ onSubmit, loading }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name"); return; }
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      setError("Please enter a valid 10-digit Indian mobile number");
      return;
    }
    setError("");
    onSubmit(name.trim(), phone.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2.5 mt-1">
      <div>
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/80 backdrop-blur border border-white/60 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-300"
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Mobile number (10 digits)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          maxLength={10}
          className="w-full bg-white/80 backdrop-blur border border-white/60 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-300"
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold rounded-xl py-2.5 text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
        ) : (
          <>
            <Sparkles className="w-4 h-4" /> Get My Free AI Plan
          </>
        )}
      </button>
    </form>
  );
}

// ─── Main component ──────────────────────────────────────────

export default function LeadChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState("greeting");
  const [leadData, setLeadData] = useState<LeadData>({ name: "", phone: "" });
  const [isTyping, setIsTyping] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Load persisted state ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { msgs, nodeId, lead } = JSON.parse(saved);
        setMessages(msgs || []);
        setCurrentNodeId(nodeId || "greeting");
        setLeadData(lead || { name: "", phone: "" });
        setHasOpened(true);
      }
      setLeadCaptured(!!localStorage.getItem(LEAD_DONE_KEY));
    } catch {}
  }, []);

  // ── Persist on change ──
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        msgs: messages.slice(-60),
        nodeId: currentNodeId,
        lead: leadData,
      }));
    } catch {}
  }, [messages, currentNodeId, leadData]);

  // ── Scroll to bottom ──
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── Stop pulse after 5s ──
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 5000);
    return () => clearTimeout(t);
  }, []);

  const currentNode = flows[currentNodeId];

  // ── Deliver bot messages with typing delay ──
  const deliverMessages = useCallback((node: ChatNode, delay = 400) => {
    const botMsgs = makeBotMessages(node);
    setIsTyping(true);
    botMsgs.forEach((msg, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, msg]);
        if (i === botMsgs.length - 1) {
          setIsTyping(false);
          // Auto-advance for "bot" type nodes
          if (node.type === "bot" && node.autoNext) {
            setTimeout(() => goToNode(node.autoNext!), 500);
          }
          // Show input for "input" type nodes
          if (node.type === "input") {
            setShowInput(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }
          // End node: open WhatsApp
          if (node.type === "end") {
            setTimeout(() => {
              window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
            }, 1000);
          }
        }
      }, delay + i * 700);
    });
  }, []); // eslint-disable-line

  // ── Navigate to a node ──
  const goToNode = useCallback((nodeId: string) => {
    const node = flows[nodeId];
    if (!node) return;
    setCurrentNodeId(nodeId);
    setShowInput(false);
    deliverMessages(node);
  }, [deliverMessages]);

  // ── Initial load ──
  const handleOpen = useCallback(() => {
    setOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
      setTimeout(() => goToNode("greeting"), 400);
    }
  }, [hasOpened, goToNode]);

  // ── Button click ──
  const handleButtonClick = useCallback((btn: ChatButton) => {
    if (isTyping) return;
    // Add user message
    const userMsg: Message = { id: uid(), role: "user", text: btn.label };
    setMessages((prev) => [...prev, userMsg]);
    // Store industry in lead data
    const industryMap: Record<string, string> = {
      "Real Estate": "real_estate", "Healthcare": "healthcare",
      "IT Services": "it_services", "Retail": "retail", "Other": "other",
    };
    if (industryMap[btn.label]) {
      setLeadData((prev) => ({ ...prev, industry: industryMap[btn.label] }));
    }
    setTimeout(() => goToNode(btn.next), 300);
  }, [isTyping, goToNode]);

  // ── Text input submit ──
  const handleInputSubmit = useCallback(() => {
    const val = inputValue.trim();
    if (!val || !currentNode || currentNode.type !== "input") return;
    const userMsg: Message = { id: uid(), role: "user", text: val };
    setMessages((prev) => [...prev, userMsg]);
    // Store value
    if (currentNode.inputKey) {
      setLeadData((prev) => ({ ...prev, [currentNode.inputKey!]: val }));
    }
    setInputValue("");
    setShowInput(false);
    // Compute savings if salary input
    if (currentNode.inputKey === "monthlySalary") {
      const amount = parseInt(val.replace(/[^0-9]/g, ""));
      if (!isNaN(amount)) {
        const low = Math.round(amount * 0.2);
        const high = Math.round(amount * 0.4);
        const fmt = (n: number) => n >= 100000
          ? `₹${(n / 100000).toFixed(1)}L`
          : `₹${(n / 1000).toFixed(0)}K`;
        const resultNode = flows["cost_savings_result"];
        if (resultNode) {
          resultNode.messages[0] = `Based on ₹${parseInt(val).toLocaleString("en-IN")}/month:\n\n✅ You can save ${fmt(low)}–${fmt(high)}/month\n📈 ROI in 60–90 days\n💡 Automation pays for itself in the first month`;
        }
      }
    }
    setTimeout(() => goToNode(currentNode.inputNext || "create_plan_cta"), 300);
  }, [inputValue, currentNode, goToNode]);

  // ── Lead form submit ──
  const handleLeadSubmit = useCallback(async (name: string, phone: string) => {
    setLeadSubmitting(true);
    const updatedLead = { ...leadData, name, phone };
    setLeadData(updatedLead);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phoneNumber: phone,
          industry: updatedLead.industry || "Not specified",
          source: "Lead Chatbot",
          message: `Flow: ${updatedLead.flow || "exploring"}`,
          intent: "chatbot_lead",
        }),
      });
    } catch {}
    setLeadSubmitting(false);
    setLeadCaptured(true);
    try { localStorage.setItem(LEAD_DONE_KEY, "1"); } catch {}
    setTimeout(() => goToNode("lead_success"), 300);
  }, [leadData, goToNode]);

  // ── Reset chat ──
  const handleReset = () => {
    setMessages([]);
    setCurrentNodeId("greeting");
    setLeadData({ name: "", phone: "" });
    setShowInput(false);
    setInputValue("");
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEAD_DONE_KEY);
    } catch {}
    setLeadCaptured(false);
    setTimeout(() => goToNode("greeting"), 200);
  };

  // ── Render message bubble ──
  const renderMessage = (msg: Message) => {
    const isBot = msg.role === "bot";
    return (
      <motion.div
        key={msg.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex items-end gap-2 mb-3 ${isBot ? "" : "flex-row-reverse"}`}
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot
            ? "bg-gradient-to-br from-violet-500 to-cyan-500"
            : "bg-gradient-to-br from-green-400 to-teal-500"
        }`}>
          {isBot ? <Bot className="w-3.5 h-3.5 text-white" /> : <User className="w-3.5 h-3.5 text-white" />}
        </div>
        <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
          isBot
            ? "bg-white/80 backdrop-blur border border-white/60 rounded-bl-sm text-gray-700"
            : "bg-gradient-to-r from-violet-600 to-cyan-500 text-white rounded-br-sm"
        }`}>
          {msg.text.split("\n").map((line, i) => (
            <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
          ))}
        </div>
      </motion.div>
    );
  };

  // ── Render bottom action panel ──
  const renderActions = () => {
    if (isTyping) return null;
    const node = flows[currentNodeId];
    if (!node) return null;

    // Lead form
    if (node.type === "lead_form") {
      return (
        <div className="px-4 pb-3 pt-2">
          <LeadForm onSubmit={handleLeadSubmit} loading={leadSubmitting} />
        </div>
      );
    }

    // Text input
    if (node.type === "input" && showInput) {
      return (
        <div className="px-3 pb-3 pt-2 flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
            placeholder={node.inputPlaceholder || "Type your answer..."}
            className="flex-1 bg-white/80 backdrop-blur border border-white/60 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/50"
          />
          <button
            onClick={handleInputSubmit}
            className="w-10 h-10 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      );
    }

    // Buttons
    if (node.type === "buttons" && node.buttons) {
      return (
        <div className="px-3 pb-3 pt-1 flex flex-col gap-2">
          {node.buttons.map((btn) => (
            <button
              key={btn.next}
              onClick={() => handleButtonClick(btn)}
              className="w-full flex items-center gap-2 bg-white/80 backdrop-blur border border-white/50 hover:border-violet-300 hover:bg-violet-50/60 text-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 text-left group"
            >
              {btn.emoji && <span className="text-base leading-none">{btn.emoji}</span>}
              <span className="flex-1">{btn.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-violet-500 transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      );
    }

    // End node — show WhatsApp button
    if (node.type === "end") {
      return (
        <div className="px-3 pb-3 pt-1">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-xl py-3 text-sm hover:opacity-90 transition-opacity"
          >
            <FaWhatsapp className="w-4 h-4" />
            Open WhatsApp
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>
      );
    }

    return null;
  };

  // ────────────────────────────────────────────────────────────
  // RENDER
  // ────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
          >
            {/* Nudge bubble */}
            <AnimatePresence>
              {pulse && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/90 backdrop-blur border border-white/60 shadow-lg rounded-2xl rounded-br-sm px-4 py-2.5 text-sm text-gray-700 max-w-[200px] text-right"
                >
                  👋 Need help growing your business?
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleOpen}
              className="relative w-14 h-14 bg-gradient-to-br from-violet-600 to-cyan-500 rounded-full shadow-lg shadow-violet-300/50 flex items-center justify-center hover:scale-105 transition-transform"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 animate-ping opacity-25" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="fixed bottom-6 right-4 sm:right-6 z-50 w-[360px] sm:w-[380px] max-w-[calc(100vw-2rem)] flex flex-col rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.55)",
              maxHeight: "min(560px, calc(100dvh - 5rem))",
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3.5 flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-sm leading-tight">Entraiot AI Concierge</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                  <span className="text-white/80 text-xs">Online — typically replies instantly</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Restart chat"
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white rotate-180" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-3 pt-4 min-h-0"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(139,92,246,0.2) transparent" }}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => renderMessage(msg))}
              </AnimatePresence>
              {isTyping && <TypingIndicator />}
              <div ref={bottomRef} className="h-2" />
            </div>

            {/* Actions panel */}
            <div className="flex-shrink-0 border-t border-white/40 bg-white/30">
              {renderActions()}
            </div>

            {/* Footer branding */}
            <div className="flex-shrink-0 bg-white/20 px-4 py-2 flex items-center justify-between">
              <span className="text-[10px] text-gray-400">Powered by Entraiot AI</span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[10px] text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <FaWhatsapp className="w-3 h-3" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
