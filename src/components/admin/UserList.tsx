"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { 
  Search, 
  RefreshCcw, 
  MessageSquare
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

export default function UserList() {
  const [users, setUsers] = useState<UserSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const params = useParams();
  const selectedUserId = params.userId as string;

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(u => 
    (u.email || "Anonymous").toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="w-80 md:w-96 bg-white border-r border-slate-200 flex flex-col h-full">
      <header className="p-5 border-b border-slate-100 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Conversations</h1>
          <button 
            onClick={fetchData}
            className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
          >
            <RefreshCcw size={16} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-slate-900"
          />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredUsers.length === 0 ? (
          <div className="p-10 text-center space-y-2">
            <MessageSquare className="mx-auto text-slate-200" size={32} />
            <p className="text-sm text-slate-400 font-medium">No conversations yet</p>
          </div>
        ) : (
          filteredUsers.map(user => {
            const lastMsg = user.messages[user.messages.length - 1];
            const isActive = selectedUserId === user.userId;
            
            return (
              <button
                key={user.userId}
                onClick={() => router.push(`/admin/${user.userId}`)}
                className={`w-full p-4 flex gap-3 border-b border-slate-50 text-left transition-all hover:bg-slate-50/80 ${
                  isActive ? "bg-indigo-50/50 border-l-4 border-l-indigo-600 shadow-sm" : ""
                }`}
              >
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-xs ${
                  user.email || user.name ? "bg-indigo-100 text-indigo-700 shadow-sm" : "bg-slate-100 text-slate-500"
                }`}>
                  {user.name ? user.name.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : "?")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold truncate ${isActive ? "text-indigo-900" : "text-slate-800"}`}>
                      {user.name || user.email || "Anonymous Lead"}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2 font-medium">
                      {new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate leading-relaxed">
                    {lastMsg ? lastMsg.text : "No messages"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                     <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm ${
                       user.leadLabel === "Hot" ? "bg-rose-100 text-rose-700" : 
                       user.leadLabel === "Warm" ? "bg-amber-100 text-amber-700" : 
                       "bg-slate-100 text-slate-500"
                     }`}>
                       {user.leadLabel} {user.leadLabel === "Hot" ? "🔥" : ""}
                     </span>
                     <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 uppercase tracking-tighter shadow-sm border border-indigo-100">
                       {user.messages.length} MSGS
                     </span>
                     {user.intent && (
                       <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 uppercase tracking-tighter shadow-sm">
                         {user.intent}
                       </span>
                     )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
