"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  RefreshCcw,
  MessageCircle,
  ArrowUpRight,
  RefreshCw,
  MoreVertical,
  Archive,
  Trash2,
  ShieldAlert,
  Edit2,
  Loader2,
  Star,
  Users,
  Sparkles,
  TrendingUp,
  Percent,
  Shield,
} from "lucide-react";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  time: string;
}

interface UserSession {
  userId: string;
  email?: string;
  name?: string;
  intent?: string;
  businessType?: string;
  score: number;
  leadLabel: "Cold" | "Warm" | "Hot";
  lastActive: string;
  messages: ChatMessage[];
}

interface DashboardStats {
  totalSessions: number;
  totalLeads: number;
  conversionRate: string;
  activeChats: number;
  avgResponseTime: string;
  leadsPerDay: { date: string; count: number }[];
  intentDistribution: { name: string; value: number }[];
}

const statusOptions: Array<{ label: string; value: "Cold" | "Warm" | "Hot" }> = [
  { label: "COLD", value: "Cold" },
  { label: "WARM", value: "Warm" },
  { label: "HOT", value: "Hot" },
];

const routeLabelMap = {
  Cold: { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-200" },
  Warm: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200" },
  Hot: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200" },
};

const getRouteLabelClasses = (label?: string) => {
  return routeLabelMap[label as keyof typeof routeLabelMap] ?? routeLabelMap.Cold;
};

export default function TaskManagePage() {
  const [conversations, setConversations] = useState<UserSession[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Cold" | "Warm" | "Hot" | "All">("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [editingField, setEditingField] = useState<"name" | "email" | "intent" | "leadLabel" | null>(null);
  const [draftField, setDraftField] = useState("");
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Unable to load conversations.");
      const data: UserSession[] = await res.json();
      setConversations(data);
      if (!selectedUser && data.length) {
        setSelectedUser(data[0]);
      } else if (selectedUser) {
        const refreshed = data.find((item) => item.userId === selectedUser.userId);
        if (refreshed) setSelectedUser(refreshed);
      }
    } catch (err) {
      console.error(err);
      setError("We could not load conversations right now.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Unable to load stats.");
      const data: DashboardStats = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard metrics.");
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await Promise.all([fetchConversations(), fetchStats()]);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredConversations = useMemo(() => {
    return conversations.filter((user) => {
      const matchesSearch = [user.name, user.email, user.intent, user.userId]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === "All" || user.leadLabel === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [conversations, searchTerm, statusFilter]);

  useEffect(() => {
    if (!selectedUser && filteredConversations.length > 0) {
      setSelectedUser(filteredConversations[0]);
    }
  }, [filteredConversations, selectedUser]);

  const hotLeadsCount = conversations.filter((item) => item.leadLabel === "Hot").length;
  const avgScore = conversations.length
    ? Math.round(conversations.reduce((sum, user) => sum + user.score, 0) / conversations.length)
    : 0;

  const handleSelectConversation = (userId: string) => {
    const user = conversations.find((item) => item.userId === userId);
    if (user) {
      setSelectedUser(user);
      setMenuOpen(false);
      setEditingField(null);
    }
  };

  const handleSendMessage = async () => {
    if (!selectedUser || saving) return;
    const messageText = draftField.trim();
    if (!messageText) return;

    setSaving(true);
    const now = new Date().toISOString();
    const updated: UserSession = {
      ...selectedUser,
      lastActive: now,
      messages: [
        ...selectedUser.messages,
        { role: "user", text: messageText, time: now },
        {
          role: "bot",
          text: "Thanks for your message! Our specialist will follow up shortly.",
          time: new Date().toISOString(),
        },
      ],
    };

    setSelectedUser(updated);
    setConversations((prev) => [updated, ...prev.filter((item) => item.userId !== selectedUser.userId)]);
    setDraftField("");
    setActionMessage("Message sent successfully.");

    setTimeout(() => {
      setActionMessage(null);
    }, 3000);
    setSaving(false);
  };

  const patchUser = async (payload: Partial<Omit<UserSession, "userId" | "messages">>) => {
    if (!selectedUser) return;
    setSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${selectedUser.userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json?.error || "Failed to update lead details.");
      }

      const updated = await res.json();
      setSelectedUser(updated);
      setConversations((prev) => prev.map((item) => (item.userId === updated.userId ? updated : item)));
      setActionMessage("Lead details updated.");
      setEditingField(null);
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setError("Unable to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldSave = async (field: "name" | "email" | "intent" | "leadLabel") => {
    if (!selectedUser) return;
    const value = draftField.trim();
    if (!value) {
      setEditingField(null);
      return;
    }
    await patchUser({ [field]: value } as Partial<UserSession>);
  };

  const handlePromoteLead = async () => {
    if (!selectedUser) return;
    const nextStatus = selectedUser.leadLabel === "Cold" ? "Warm" : selectedUser.leadLabel === "Warm" ? "Hot" : "Hot";
    await patchUser({ leadLabel: nextStatus } as Partial<UserSession>);
  };

  const handleQuickAction = async (action: "archive" | "spam" | "delete") => {
    if (!selectedUser) return;
    setMenuOpen(false);
    setSaving(true);
    setError(null);

    try {
      if (action === "delete") {
        const res = await fetch(`/api/admin/users/${selectedUser.userId}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete conversation.");
        setConversations((prev) => prev.filter((item) => item.userId !== selectedUser.userId));
        setSelectedUser(null);
        setActionMessage("Conversation deleted.");
      } else {
        const businessType = action === "archive" ? "Archived" : "Spam";
        const res = await fetch(`/api/admin/users/${selectedUser.userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ businessType, leadLabel: action === "spam" ? "Cold" : selectedUser.leadLabel }),
        });
        if (!res.ok) throw new Error("Failed to update conversation status.");
        const updated = await res.json();
        setSelectedUser(updated);
        setConversations((prev) => prev.map((item) => (item.userId === updated.userId ? updated : item)));
        setActionMessage(action === "archive" ? "Conversation archived." : "Marked as spam.");
      }
    } catch (err) {
      console.error(err);
      setError("We could not complete that action.");
    } finally {
      setSaving(false);
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1700px] mx-auto space-y-6">
        <section className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Entraiot Solutions</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Admin lead desk</h1>
              <p className="mt-1 text-sm text-slate-500 max-w-2xl">
                Monitor chatbot leads, respond quickly, and promote high-value prospects.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={refreshData}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white"
              >
                <RefreshCw size={16} className={`${refreshing ? "animate-spin" : ""} mr-2`} />
                Refresh
              </button>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                <Sparkles size={16} className="text-amber-300" />
                Real-time updates
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
          <aside className="flex flex-col rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Conversations</p>
                <h2 className="mt-2 text-lg font-semibold text-slate-900">Leads inbox</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                {filteredConversations.length} New
              </span>
            </div>
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-center gap-2 rounded-3xl bg-slate-100 px-3 py-2">
                <Search size={16} className="text-slate-400" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search leads, emails, intent"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 border-b border-slate-100 px-5 py-4">
              <button
                onClick={() => setStatusFilter("All")}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${statusFilter === "All" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-slate-100 text-slate-600"}`}
              >
                All
              </button>
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setStatusFilter(status.value)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    statusFilter === status.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-slate-100 text-slate-600"
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
              {loading ? (
                <div className="space-y-4 p-5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="animate-pulse rounded-3xl bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                        <div className="h-3 w-32 rounded-full bg-slate-200" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded-full bg-slate-200" />
                        <div className="h-3 w-3/4 rounded-full bg-slate-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center text-slate-500">
                  <MessageCircle size={40} className="text-slate-300" />
                  <p className="text-sm font-semibold">No conversations found.</p>
                  <p className="text-sm">Try clearing filters or refreshing the list.</p>
                </div>
              ) : (
                filteredConversations.map((user) => {
                  const lastMessage = user.messages[user.messages.length - 1];
                  const isActive = selectedUser?.userId === user.userId;
                  const lastMessageText = lastMessage?.text || "No messages yet";
                  const hasUnread = lastMessage?.role === "user";

                  return (
                    <button
                      key={user.userId}
                      type="button"
                      onClick={() => handleSelectConversation(user.userId)}
                      className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-white ${
                        isActive ? "bg-indigo-50/80 shadow-sm border-l-4 border-l-indigo-600" : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 font-semibold shadow-sm">
                            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "?"}
                          </div>
                          {hasUnread && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-semibold text-slate-900">{user.name || user.email || "Anonymous Lead"}</p>
                            <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{new Date(user.lastActive).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                          </div>
                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">{lastMessageText}</p>
                          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.24em]">
                            <span className={`rounded-full px-2 py-1 ${getRouteLabelClasses(user.leadLabel).bg} ${getRouteLabelClasses(user.leadLabel).text} ${getRouteLabelClasses(user.leadLabel).border} border`}>
                              {user.leadLabel || "Unknown"}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-1 text-slate-600">{user.intent || "No intent"}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          <section className="flex min-h-[720px] flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live chat</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedUser ? selectedUser.name || selectedUser.email : "Select a conversation"}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-500">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-600 shadow-sm">
                    <Star size={14} className="text-amber-500" />
                    Score {selectedUser?.score ?? "—"}
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                    aria-label="Actions"
                  >
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${selectedUser ? getRouteLabelClasses(selectedUser.leadLabel).bg + " " + getRouteLabelClasses(selectedUser.leadLabel).text : "bg-slate-100 text-slate-500"}`}>
                  {selectedUser?.leadLabel ?? "Status"}
                </span>
                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700">
                  {selectedUser?.intent ?? "Intent pending"}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Last seen {selectedUser ? new Date(selectedUser.lastActive).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—"}
                </span>
              </div>
            </div>

            <div className="relative flex-1 overflow-y-auto bg-[#f8fafc] p-6 custom-scrollbar">
              {menuOpen && selectedUser ? (
                <div className="absolute right-6 top-6 z-20 w-48 rounded-3xl border border-slate-200 bg-white p-2 shadow-lg">
                  <button type="button" onClick={() => handleQuickAction("archive")} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    <Archive size={16} /> Archive
                  </button>
                  <button type="button" onClick={() => handleQuickAction("spam")} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                    <ShieldAlert size={16} /> Mark as spam
                  </button>
                  <button type="button" onClick={() => handleQuickAction("delete")} className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              ) : null}

              {selectedUser ? (
                <div className="space-y-6">
                  {selectedUser.messages.length === 0 ? (
                    <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-slate-200 bg-white py-20 text-center text-slate-500">
                      <MessageCircle size={48} />
                      <p className="text-sm font-semibold">No messages yet for this lead.</p>
                      <p className="text-sm text-slate-400">Start a conversation or refresh the conversation list.</p>
                    </div>
                  ) : (
                    selectedUser.messages.map((msg, index) => {
                      const isUser = msg.role === "user";
                      return (
                        <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[86%] rounded-[24px] p-4 text-sm leading-6 shadow-sm ${isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-slate-700 rounded-bl-none border border-slate-200"}`}>
                            {msg.text}
                            <p className={`mt-2 text-[11px] ${isUser ? "text-indigo-100 text-right" : "text-slate-400 text-left"}`}>
                              {new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              ) : (
                <div className="flex min-h-[520px] flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-slate-200 bg-white py-20 text-center text-slate-500">
                  <MessageCircle size={48} />
                  <p className="text-lg font-semibold">No conversation selected.</p>
                  <p className="max-w-sm text-sm text-slate-400">Select a lead from the left to view the chat thread and lead details.</p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 bg-white p-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick reply</p>
                      <p className="mt-2 text-sm text-slate-600">Send a message into the chat thread.</p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {selectedUser?.messages.length ?? 0} messages
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                      value={draftField}
                      onChange={(event) => setDraftField(event.target.value)}
                      placeholder="Type your response..."
                      className="min-h-[52px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      disabled={saving || !selectedUser}
                      className="inline-flex h-12 items-center justify-center rounded-2xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? <Loader2 size={16} className="animate-spin" /> : "Send"}
                    </button>
                  </div>
                </div>
                <div className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Lead actions</p>
                  <div className="mt-4 space-y-3">
                    <button
                      type="button"
                      onClick={handlePromoteLead}
                      disabled={!selectedUser || saving}
                      className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                    >
                      Promote Lead
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickAction("archive")}
                      disabled={!selectedUser || saving}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                      Archive conversation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="flex flex-col overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Lead details</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">Profile snapshot</h2>
              <p className="mt-1 text-sm text-slate-500">Editable fields and scoring for quick lead qualification.</p>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-5">
              {selectedUser ? (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Full name", value: selectedUser.name || "Anonymous", field: "name", IconComponent: Edit2 },
                      { label: "Email", value: selectedUser.email || "Not provided", field: "email", IconComponent: MessageCircle },
                      { label: "Lead status", value: selectedUser.leadLabel, field: "leadLabel", IconComponent: TrendingUp },
                      { label: "Intent", value: selectedUser.intent || "Pending", field: "intent", IconComponent: ArrowUpRight },
                    ].map(({ label, value, field, IconComponent }) => (
                      <div key={field} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">{label}</p>
                            {editingField === field ? (
                              <input
                                value={draftField}
                                onChange={(event) => setDraftField(event.target.value)}
                                onBlur={() => handleFieldSave(field)}
                                onKeyDown={(event) => event.key === "Enter" && handleFieldSave(field)}
                                autoFocus
                                className="mt-3 w-full rounded-2xl border border-indigo-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                              />
                            ) : (
                              <p className="mt-3 text-sm font-semibold text-slate-900">{value}</p>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingField(field as any);
                              setDraftField(value === "Not provided" || value === "Pending" ? "" : String(value));
                            }}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                            aria-label={`Edit ${label}`}
                          >
                            <IconComponent size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Lead score</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{selectedUser.score} points</p>
                      </div>
                      <span className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${getRouteLabelClasses(selectedUser.leadLabel).bg} ${getRouteLabelClasses(selectedUser.leadLabel).text}`}>
                        {selectedUser.leadLabel || "Unknown"}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Interactions</p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">{selectedUser.messages.length}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Business type</p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">{selectedUser.businessType || "General"}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 text-center shadow-sm">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Last interaction</p>
                        <p className="mt-2 text-xl font-semibold text-slate-900">{new Date(selectedUser.lastActive).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                  <Shield size={40} />
                  <p className="text-sm font-semibold">Lead detail preview will appear here.</p>
                  <p className="text-sm">Select a conversation to update contact details and intent.</p>
                </div>
              )}
            </div>
          </aside>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          <MetricCard title="Total Leads" value={stats?.totalLeads ?? "—"} desc="All active chatbot leads" icon={<Users size={20} className="text-sky-600" />} />
          <MetricCard title="Hot Leads" value={hotLeadsCount} desc="Leads ready for immediate follow-up" icon={<Sparkles size={20} className="text-emerald-600" />} />
          <MetricCard title="Avg Score" value={`${avgScore}`} desc="Average qualification score" icon={<TrendingUp size={20} className="text-indigo-600" />} />
          <MetricCard title="Conversions" value={stats?.conversionRate ? `${stats.conversionRate}%` : "—"} desc="Lead conversion rate" icon={<Percent size={20} className="text-amber-600" />} />
        </section>

        {(actionMessage || error) && (
          <div className={`rounded-3xl border px-4 py-3 text-sm ${error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
            {error || actionMessage}
          </div>
        )}
      </div>
    </main>
  );
}

function MetricCard({ title, value, desc, icon }: { title: string; value: string | number; desc: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-[18px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">{icon}</div>
      </div>
      <div className="mt-6 text-3xl font-black tracking-tight text-slate-900">{value}</div>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </div>
  );
}
