"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import {
  ENTRAIOT_CONTACT,
  QUICK_REPLIES,
  SalesIntent,
  getCallLink,
  getWhatsappLink,
} from "@/lib/assistant-config";

type Msg = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

type SuggestedAction = {
  id: string;
  label: string;
  href?: string;
};

type LeadFormData = {
  name: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email: string;
  requirement: string;
};

type ChatApiResponse = {
  success: boolean;
  reply?: string;
  sessionId?: string;
  message?: string;
  intent?: SalesIntent;
  userIntent?: string;
  suggestedActions?: (SuggestedAction | string)[];
  leadCaptureSuggested?: boolean;
  leadHints?: Partial<LeadFormData>;
  showUserMessage?: boolean;
  systemMessage?: string;
};

const STORAGE_KEY = "entraiot_sales_chat_v2";
const SESSION_KEY = "entraiot_sales_chat_session";
const CHAT_OPEN_KEY = "entraiot_sales_chat_auto_opened";
const EXIT_PROMPT_KEY = "entraiot_sales_chat_exit_prompt_shown";

const staticActions = [
  { id: "book-appointment", label: "Book Appointment", href: "/contact" },
  { id: "whatsapp-chat", label: "WhatsApp Chat", href: getWhatsappLink() },
  { id: "call-now", label: "Call Now", href: getCallLink() },
];

function generateSessionId() {
  try {
    return globalThis.crypto?.randomUUID?.() || `s_${Date.now()}`;
  } catch {
    return `s_${Date.now()}`;
  }
}

function buildClientFallbackResponse() {
  return "I understand your question. Could you give a little more detail so I can give a precise answer?";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ , setIntent] = useState<SalesIntent>("curious" as SalesIntent);
  const lastResponseRef = useRef<string>("");
  const userStateRef = useRef<{ intent?: string; email?: string; time?: string; sessionId?: string }>({});
  const fallbackResponses = useMemo(
    () => [
      "Please clarify whether you mean pricing, services, integration, or a demo.",
      "Do you want pricing, a demo, or implementation details?",
      "Tell me your industry or use case and I'll give a direct recommendation.",
    ],
    []
  );

  // Local rule-based knowledge engine (client-side)
  function getSmartLocalResponse(message: string): string | null {
    if (!message) return null;
    const msg = message.toLowerCase().trim();

    // avoid intercepting contact info (let server handle lead capture)
    const emailRx = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    const phoneRx = /\+?\d[\d\s\-]{6,}\d/;
    if (emailRx.test(msg) || phoneRx.test(msg)) return null;

    const match = (keywords: string[]) => keywords.some((k) => msg.includes(k));

    // BASIC
    if (match(["hi", "hello", "hey"])) return "Hi! How can I help you today?";
    if (match(["how are you"])) return "I'm doing great 😊 How can I help you?";
    if (match(["your name", "who are you"])) return "I'm Entraiot AI Assistant.";
    if (match(["what can you do"]))
      return "I can help you understand AI, IoT, automation, and how Entraiot solutions can help your business.";

    // COMPANY
    if (match(["what is entraiot", "about entraiot", "entraiot"]))
      return "Entraiot Solutions is an AI and IoT company that helps businesses automate operations, monitor systems in real time, and make smarter decisions using data.";
    if (match(["what do you do", "company work", "what does your company do"]))
      return "We design AI and IoT systems for automation, predictive maintenance, real-time monitoring, and custom business solutions.";
    if (match(["industries", "domains"]))
      return "We work with manufacturing, logistics, healthcare, hospitality, retail, energy management, and smart cities.";
    if (match(["why entraiot", "why choose"]))
      return "We provide scalable, real-time AI + IoT solutions tailored to your business needs with strong technical expertise.";

    // SERVICES
    if (match(["services", "what services", "what do you offer"]))
      return `We offer:\n\n• AI automation  \n• IoT device integration  \n• Real-time dashboards  \n• Predictive maintenance  \n• Smart analytics  \n• Custom software development`;
    if (match(["ai solutions", "ai service"]))
      return "Our AI solutions help automate decisions, analyze data, and improve business performance using machine learning models.";
    if (match(["iot solutions", "iot service"]))
      return "Our IoT solutions connect devices, collect real-time data, and enable smart monitoring and control.";
    if (match(["predictive maintenance"]))
      return "Predictive maintenance uses AI and sensor data to detect failures early and reduce downtime.";

    // GENERAL KNOWLEDGE
    if (match(["what is ai", "what is artificial intelligence", "define ai"]))
      return "Artificial Intelligence (AI) enables machines to learn, analyze data, and make decisions similar to humans.";
    if (match(["what is iot", "what is internet of things", "define iot"]))
      return "IoT connects devices to the internet to collect and exchange real-time data.";
    if (match(["machine learning"]))
      return "Machine learning is a branch of AI where systems learn patterns from data and improve automatically.";
    if (match(["automation"])) return "Automation uses technology to perform tasks without human intervention, improving efficiency.";
    if (match(["cloud"])) return "Cloud computing allows storing and accessing data over the internet instead of local systems.";
    if (match(["data science"])) return "Data science involves analyzing data to extract insights using statistics and machine learning.";
    if (match(["python"])) return "Python is a programming language widely used for AI, automation, and data analysis.";

    // BUSINESS USE CASES
    if (match(["ai help business", "how can ai help", "ai for business"]))
      return "AI helps businesses automate tasks, analyze customer data, improve decision-making, and increase efficiency.";
    if (match(["iot manufacturing", "iot in manufacturing"]))
      return "IoT in manufacturing enables real-time monitoring, predictive maintenance, and improved production efficiency.";
    if (match(["automation benefits", "benefits of automation"]))
      return "Automation reduces manual work, increases speed, minimizes errors, and improves productivity.";

    // SALES FLOW
    if (match(["demo", "book demo", "book", "schedule demo"])) return "I'll help you with a demo. Please fill the form below.";
    if (match(["pricing", "cost", "quote"])) return "Pricing depends on your requirements. Please share your details in the form below.";
    if (match(["contact", "phone", "email"])) return `You can contact us at ${ENTRAIOT_CONTACT.phoneDisplay} or ${ENTRAIOT_CONTACT.infoEmail || ENTRAIOT_CONTACT.businessEmail || "bde.entraiot@gmail.com"}.`;


    // SMART UNKNOWN HANDLER
    if (msg.startsWith("what is ")) {
      const topic = msg.replace(/^what is\s+/, "").trim();
      if (topic) {
        const capital = topic.charAt(0).toUpperCase() + topic.slice(1);
        return `${capital} is a concept in technology or business. It generally refers to systems, processes, or tools used to improve efficiency and decision-making.`;
      }
    }

    // No confident local answer
    return null;
  }

  // Small diversification to avoid verbatim repetition
  function diversify(text: string) {
    if (!text) return text;
    const variants = [
      text,
      text.replace(/helps/g, "enables"),
      text.replace(/provides/g, "delivers"),
      text.replace(/We can /g, "We can easily "),
    ];
    return variants[Math.floor(Math.random() * variants.length)];
  }
  const [suggestedActions, setSuggestedActions] = useState<(SuggestedAction | string)[]>([]);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [showExitPrompt, setShowExitPrompt] = useState(false);
  const [appointment, setAppointment] = useState<{ date: string; time: string } | null>(null);
  const [leadForm, setLeadForm] = useState<LeadFormData>({
    name: "",
    phoneNumber: "",
    whatsAppNumber: "",
    email: "",
    requirement: "",
  });

  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setMessages(JSON.parse(raw));
      const sid = sessionStorage.getItem(SESSION_KEY) || generateSessionId();
      setSessionId(sid);
      sessionStorage.setItem(SESSION_KEY, sid);
    } catch {
      // no-op
    }

    // Sync appointment from localStorage
    const syncAppointment = () => {
      try {
        const raw = localStorage.getItem("entraiot:intro-booking");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.date && parsed.time) {
            setAppointment(parsed);
          }
        }
      } catch {}
    };

    syncAppointment();
    window.addEventListener("storage", syncAppointment);
    window.addEventListener("entraiot:appointment-updated", syncAppointment);
    return () => {
      window.removeEventListener("storage", syncAppointment);
      window.removeEventListener("entraiot:appointment-updated", syncAppointment);
    };
  }, []);

  useEffect(() => {
    if (appointment?.date && appointment?.time) {
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const d = new Date(appointment.date);
      const dateStr = `${monthNames[d.getMonth()]} ${d.getDate()}`;
      const msg = `Great 👍 Your slot is reserved for ${dateStr} at ${appointment.time}.`;
      
      // Only append if last message wasn't this one
      if (messages.length > 0 && messages[messages.length - 1]?.content !== msg) {
        appendAssistantStream(msg);
      }
    }
  }, [appointment, messages]);
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}

    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!open || !input.trim()) {
      setIsUserTyping(false);
      return;
    }

    setIsUserTyping(true);
    const timer = setTimeout(() => setIsUserTyping(false), 400);
    return () => clearTimeout(timer);
  }, [input, open]);

  useEffect(() => {
    if (open) return;

    let timer: number | undefined;
    try {
      const hasAutoOpened = sessionStorage.getItem(CHAT_OPEN_KEY) === "1";
      if (!hasAutoOpened) {
        timer = window.setTimeout(() => {
          setOpen(true);
          sessionStorage.setItem(CHAT_OPEN_KEY, "1");
        }, 6000);
      }
    } catch {
      timer = window.setTimeout(() => setOpen(true), 6000);
    }

    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [open]);

  useEffect(() => {
    const onMouseOut = (event: MouseEvent) => {
      if (open || window.innerWidth < 1024) return;
      if (event.clientY > 8 || event.relatedTarget) return;
      try {
        const alreadyShown = sessionStorage.getItem(EXIT_PROMPT_KEY) === "1";
        if (alreadyShown) return;
        sessionStorage.setItem(EXIT_PROMPT_KEY, "1");
      } catch {}
      setShowExitPrompt(true);
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, [open]);

  const appendAssistantStream = useCallback(async (fullText: string) => {
  let reply = fullText || "Sorry, something went wrong.";

  const normalizeForCompare = (t = "") =>
    t.replace(/\s+/g, " ").trim().toLowerCase();

  const assistantId = `a_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (normalizeForCompare(reply) === normalizeForCompare(lastResponseRef.current)) {
    reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  setMessages((prev) => [
    ...prev,
    { id: assistantId, role: "assistant", content: "", createdAt },
  ]);

  const totalLength = reply.length;
  const step = totalLength > 800 ? 8 : 4;

  await new Promise<void>((resolve) => {
    let index = 0;
    const stream = () => {
      index = Math.min(index + step, totalLength);
      const partial = reply.slice(0, index);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId ? { ...msg, content: partial } : msg
        )
      );

      if (index < totalLength) {
        window.setTimeout(stream, 14);
        return;
      }

      resolve();
    };

    window.setTimeout(stream, 24);
  });

  lastResponseRef.current = reply;
}, [fallbackResponses]); // ✅ IMPORTANT

  const sanitizeInput = (value: string) =>
    value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  const send = async (customInput?: string) => {
    const raw = customInput ?? input;
    const cleanInput = sanitizeInput(raw);
    if (!cleanInput || loading || showLeadForm) return;

    const userMsg: Msg = {
      id: `u_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      role: "user",
      content: cleanInput,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    const lowInput = cleanInput.toLowerCase().trim();

    // Button click logic / High intent triggers
    if (lowInput === "services") {
      await appendAssistantStream("We offer AI automation, IoT integration, Real-time dashboards, and more. To get a detailed service deck, please share your details.");
      if (!leadSubmitted) setShowLeadForm(true);
      setLoading(false);
      return;
    }
    if (lowInput === "pricing") {
      await appendAssistantStream("Pricing depends on your specific requirements and scale. Please share your details so we can provide a custom quote.");
      if (!leadSubmitted) setShowLeadForm(true);
      setLoading(false);
      return;
    }
    if (lowInput === "book demo" || lowInput === "talk to expert") {
      if (!leadSubmitted) {
        setShowLeadForm(true);
      } else {
        await appendAssistantStream("You've already submitted your interest. Our team will contact you shortly.");
      }
      setLoading(false);
      return;
    }

    // Rule-based high intent detection
    const highIntentKeywords = ["pricing", "quote", "book demo", "schedule demo", "talk to expert"];
    const isHighIntent = highIntentKeywords.some(k => lowInput.includes(k));
    if (isHighIntent && !leadSubmitted) {
      setShowLeadForm(true);
      setLoading(false);
      return;
    }

    try {
      // Try local rule-based engine first
      try {
        const localReply = getSmartLocalResponse(cleanInput);
        if (localReply) {
          await appendAssistantStream(diversify(localReply));
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("local engine error:", e);
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.content,
          sessionId,
        }),
      });

      const data = (await res.json()) as ChatApiResponse;
      if (!res.ok || !data?.success || !data?.reply) {
        setError(null);
        await appendAssistantStream(buildClientFallbackResponse());
        setLoading(false);
        return;
      }

      setIntent(data.intent || "curious");
      setSuggestedActions(data.suggestedActions || []);

      if (data.userIntent) {
        userStateRef.current.intent = data.userIntent;
      } else {
        userStateRef.current.intent = data.intent || "curious";
      }

      if (!leadSubmitted && data.leadCaptureSuggested) {
        setShowLeadForm(true);
      }

      if (data.leadHints) {
        const leadHints = data.leadHints ?? {};
        setLeadForm((prev) => ({
          ...prev,
          ...Object.fromEntries(
            Object.entries(leadHints).filter(([, value]) => !!value)
          ),
        }));
      }

      if (data.showUserMessage !== false) {
        await appendAssistantStream(data.reply || "");
      }

      if (data.sessionId) {
        setSessionId(data.sessionId);
        try {
          sessionStorage.setItem(SESSION_KEY, data.sessionId);
        } catch {}
      }
    } catch (err) {
      console.error("chat error", err);
      setError(null);
      await appendAssistantStream(buildClientFallbackResponse());
    } finally {
      setLoading(false);
    }
  };

  const submitLeadData = async (formData: LeadFormData) => {
    setSubmittingLead(true);
    setError(null);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          sessionId,
          intent: "ready",
          source: "website-chatbot",
          appointment: appointment?.date && appointment?.time ? appointment : null,
          conversation: messages.map((msg) => ({
            role: msg.role,
            content: msg.content,
            createdAt: msg.createdAt,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Failed to submit lead");
      }

      setLeadSubmitted(true);
      setShowLeadForm(false);
      await appendAssistantStream("Submitted successfully 👍 Our team will contact you shortly.");
    } catch (err) {
      console.error("lead submit error", err);
      setError("Could not submit your details. Please try again.");
    } finally {
      setSubmittingLead(false);
    }
  };

  const submitLead = async () => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadForm.email);
    if (
      !leadForm.name.trim() ||
      !leadForm.phoneNumber.trim() ||
      !emailValid
    ) {
      setError("Name, Email, and Phone Number are required.");
      return;
    }
    await submitLeadData(leadForm);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const quickReplies = QUICK_REPLIES.map((text, index) => ({
    text,
    key: `qr-${text}-${index}`,
    onClick: () => send(text),
  }));

  const launcherLabel = open ? "Close assistant" : "Open assistant";
  const chatWindowClass = expanded
    ? "fixed inset-3 sm:inset-6 md:inset-10 z-50"
    : "fixed right-4 bottom-32 sm:right-6 sm:bottom-36 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[min(70vh,580px)]";

  return (
    <>
      
        {showExitPrompt && !open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 right-4 bottom-[5.5rem] sm:right-6 sm:bottom-[6.5rem] max-w-[calc(100vw-2rem)] sm:max-w-64 rounded-2xl border border-indigo-200 bg-white/95 p-3 shadow-xl backdrop-blur-md"
          >
            <p className="text-sm font-medium text-slate-800">
              Need help with AI or IoT solutions?
            </p>
            <button
              onClick={() => {
                setOpen(true);
                setShowExitPrompt(false);
              }}
              className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 py-2 text-sm font-semibold text-white"
            >
              Talk to Entraiot Assistant
            </button>
          </motion.div>
        )}
      

      <div className="fixed right-4 bottom-20 z-50 sm:right-6 sm:bottom-20">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatType: "loop" }}
          className="absolute inset-0 rounded-full bg-indigo-500/30 blur-md"
        />
        <motion.button
          suppressHydrationWarning
          aria-label={launcherLabel}
          onClick={() => {
            setOpen((current) => !current);
            setShowExitPrompt(false);
          }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 text-white shadow-2xl"
        >
          {open ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircleMore className="h-5 w-5 sm:h-6 sm:w-6" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            className={chatWindowClass}
          >
            <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_24px_80px_-28px_rgba(45,61,147,0.65)] backdrop-blur-xl">
              <header className="relative overflow-hidden border-b border-indigo-100 bg-gradient-to-r from-slate-950 via-indigo-900 to-cyan-700 px-4 py-3 text-white sm:px-5">
                <div className="absolute -right-10 -top-8 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl" />
                <div className="absolute -left-8 -bottom-8 h-24 w-24 rounded-full bg-indigo-200/20 blur-2xl" />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100/90">
                      <Sparkles className="h-3.5 w-3.5" /> AI Sales Assistant
                    </p>
                    <h3 className="truncate text-base font-semibold sm:text-lg">
                      Entraiot Growth Concierge
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setExpanded((value) => !value)}
                      aria-label={expanded ? "Collapse chat" : "Expand chat"}
                      className="rounded-lg border border-white/25 bg-white/20 p-1.5 transition hover:bg-white/30"
                    >
                      {expanded ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close chat"
                      className="rounded-lg border border-white/25 bg-white/20 p-1.5 transition hover:bg-white/30"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </header>

              <div
                ref={messagesRef}
                className="relative flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.2),transparent_40%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-3 py-4 sm:px-4"
              >
                {messages.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-sm rounded-2xl border border-indigo-100 bg-white/90 p-4 text-sm text-slate-700 shadow-md"
                  >
                    Ask me about services, industries, implementation timelines, or pricing approach. I can also connect you with our team right now.
                  </motion.div>
                )}

                {messages.map((message, index) => (
                  <motion.div
                    key={message.id || `msg-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                          : "border border-indigo-100 bg-white text-slate-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-indigo-100 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-500" />
                      Assistant is thinking
                    </div>
                  </div>
                )}

                {isUserTyping && !loading && (
                  <div className="flex justify-end">
                    <div className="rounded-xl bg-indigo-500/10 px-3 py-1 text-xs text-indigo-700">
                      Typing...
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-indigo-100 bg-white/95 px-3 py-3 sm:px-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  {quickReplies.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={item.onClick}
                      disabled={loading}
                      className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100 disabled:opacity-60"
                    >
                      {item.text}
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="mb-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                    {error}
                  </div>
                )}

                {!leadSubmitted && showLeadForm && (
                  <div className="mb-3 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-cyan-50 p-3">
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Share your details and we will connect you quickly
                    </p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input
                        value={leadForm.name}
                        onChange={(event) =>
                          setLeadForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        placeholder="Name"
                        className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2"
                      />
                      <input
                        value={leadForm.email}
                        onChange={(event) =>
                          setLeadForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        placeholder="Email"
                        type="email"
                        className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2"
                      />
                      <input
                        value={leadForm.phoneNumber}
                        onChange={(event) =>
                          setLeadForm((prev) => ({
                            ...prev,
                            phoneNumber: event.target.value,
                          }))
                        }
                        placeholder="Phone Number"
                        className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2"
                      />
                      <input
                        value={leadForm.whatsAppNumber}
                        onChange={(event) =>
                          setLeadForm((prev) => ({
                            ...prev,
                            whatsAppNumber: event.target.value,
                          }))
                        }
                        placeholder="WhatsApp Number"
                        className="rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2"
                      />
                      <textarea
                        value={leadForm.requirement}
                        onChange={(event) =>
                          setLeadForm((prev) => ({
                            ...prev,
                            requirement: event.target.value,
                          }))
                        }
                        placeholder="Requirement"
                        className="sm:col-span-2 min-h-20 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2"
                      />
                    </div>
                    <button
                      onClick={submitLead}
                      disabled={submittingLead}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-70"
                    >
                      {submittingLead ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CalendarCheck2 className="h-4 w-4" />
                      )}
                      Submit Lead
                    </button>
                  </div>
                )}

                {suggestedActions?.filter(Boolean)?.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {[...new Set(suggestedActions.map(a => typeof a === "string" ? a : a.label))]
                      .filter(label => {
                        if (!label) return false;
                        if (QUICK_REPLIES.includes(label as (typeof QUICK_REPLIES)[number])) return false;
                        if (staticActions.some(s => s.label === label)) return false;
                        return true;
                      })
                      .map((label, index) => {
                        const originalAction = suggestedActions.find(a => (typeof a === "string" ? a : a.label) === label);
                        return (
                          <button
                            key={`suggested-${label}-${index}`}
                            onClick={() => {
                              if (typeof originalAction === "string") {
                                send(label);
                              } else if (originalAction?.href) {
                                window.location.href = originalAction.href;
                              } else {
                                send(label);
                              }
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50/50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
                          >
                            <Sparkles className="h-3 w-3" />
                            {label}
                          </button>
                        );
                      })}
                  </div>
                )}

                <div className="mb-2 flex items-center justify-between gap-1">
                  {staticActions.map((action) => (
                    <a
                      key={action.id}
                      href={action.href}
                      target={action.id === "book-appointment" ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-[11px] font-medium text-indigo-700 transition hover:bg-indigo-100"
                    >
                      {action.id === "book-appointment" && (
                        <CalendarCheck2 className="h-2.5 w-2.5" />
                      )}
                      {action.id === "whatsapp-chat" && (
                        <MessageCircleMore className="h-2.5 w-2.5" />
                      )}
                      {action.id === "call-now" && <PhoneCall className="h-2.5 w-2.5" />}
                      <span>{action.label}</span>
                    </a>
                  ))}
                </div>

                <div className="flex items-end gap-2">
                  <textarea
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onKeyDown}
                    disabled={loading || showLeadForm}
                    placeholder={showLeadForm ? "Please complete the form..." : "Ask anything about Entraiot's AI + IoT solutions..."}
                    className="min-h-11 max-h-32 flex-1 resize-y rounded-xl border border-indigo-200 bg-white px-3 py-2 text-sm outline-none ring-indigo-300 focus:ring-2 disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <button
                    onClick={() => send()}
                    disabled={loading || !input.trim() || showLeadForm}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-3 text-white shadow-sm disabled:opacity-60"
                    aria-label="Send message"
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
